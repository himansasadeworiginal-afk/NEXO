import crypto from 'crypto';
import { Router } from 'express';
import { query, get } from '../config/db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/status', authenticate, async (req, res) => {
  try {
    const sub = get(
      `SELECT status, current_period_end, stripe_subscription_id
       FROM subscriptions WHERE user_id = ? AND status = 'active'
       LIMIT 1`,
      [req.user.id]
    );

    if (sub) {
      return res.json({ plan: 'premium', status: sub.status, currentPeriodEnd: sub.current_period_end });
    }

    res.json({ plan: 'free', status: 'not_subscribed' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/create-checkout', authenticate, async (req, res) => {
  try {
    const stripe = req.app.get('stripe');
    if (!stripe) {
      return res.status(503).json({ error: 'Payment not configured', demoMode: true });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${(process.env.CORS_ORIGIN || '').split(',')[0] || 'http://localhost:5500'}/account/index.html?premium=success`,
      cancel_url: `${(process.env.CORS_ORIGIN || '').split(',')[0] || 'http://localhost:5500'}/account/index.html?premium=cancel`,
      customer_email: req.user.email,
      metadata: { userId: req.user.id },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Checkout error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/webhook', async (req, res) => {
  const stripe = req.app.get('stripe');
  if (!stripe) return res.status(503).json({ error: 'Stripe not configured' });

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return res.status(400).json({ error: 'Webhook signature verification failed' });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const now = new Date().toISOString();
    const endDate = new Date(Date.now() + 30 * 86400000).toISOString();

    const existing = get('SELECT id FROM subscriptions WHERE user_id = ? AND stripe_subscription_id = ?', [userId, session.subscription]);
    if (existing) {
      query("UPDATE subscriptions SET status = 'active', current_period_end = ?, updated_at = ? WHERE id = ?", [endDate, now, existing.id]);
    } else {
      const id = crypto.randomUUID();
      query(
        `INSERT INTO subscriptions (id, user_id, stripe_subscription_id, stripe_customer_id, status, current_period_start, current_period_end)
         VALUES (?, ?, ?, ?, 'active', ?, ?)`,
        [id, userId, session.subscription, session.customer, now, endDate]
      );
    }

    query("UPDATE users SET plan = 'premium' WHERE id = ?", [userId]);
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object;
    query("UPDATE subscriptions SET status = 'canceled' WHERE stripe_subscription_id = ?", [sub.id]);
    const subscription = get('SELECT user_id FROM subscriptions WHERE stripe_subscription_id = ?', [sub.id]);
    if (subscription) {
      query("UPDATE users SET plan = 'free' WHERE id = ?", [subscription.user_id]);
    }
  }

  res.json({ received: true });
});

export default router;
