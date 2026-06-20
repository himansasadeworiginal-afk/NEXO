import { Router } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import rateLimit from 'express-rate-limit';
import { query, get } from '../config/db.js';
import { generateToken, authenticate } from '../middleware/auth.js';
import { z } from 'zod';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts, try again in 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Too many accounts from this IP' },
  standardHeaders: true,
  legacyHeaders: false,
});

const registerSchema = z.object({
  name: z.string().min(1).max(100),
  username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email().max(255),
  password: z.string().min(8).max(128),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post('/register', registerLimiter, async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);

    const initials = (data.name.match(/\b\w/g) || []).join('').toUpperCase().substring(0, 2) || 'U';
    const password_hash = await bcrypt.hash(data.password, 12);
    const id = crypto.randomUUID();

    const result = query(
      `INSERT INTO users (id, name, username, email, password_hash, avatar_initials, avatar_color)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, data.name, data.username, data.email, password_hash, initials, '#2ea84c']
    );

    const user = get('SELECT id, name, username, email, avatar_initials, avatar_color, plan, join_date, xp, streak_count FROM users WHERE id = ?', [id]);
    const token = generateToken(user);

    res.status(201).json({ user, token });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: err.errors });
    }
    if (err.message?.includes('UNIQUE')) {
      return res.status(409).json({ error: 'Email or username already taken' });
    }
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', loginLimiter, async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = get(
      `SELECT id, name, username, email, password_hash, avatar_initials, avatar_color,
              plan, join_date, xp, streak_count, streak_last_date, token_version
       FROM users WHERE email = ?`,
      [data.email]
    );

    let valid = false;
    if (user) {
      valid = await bcrypt.compare(data.password, user.password_hash);
    }

    if (!user || !valid) {
      await bcrypt.compare(data.password, '$2b$12$LJ3m4ys3Lg3YOCwAT2qJCOQPX0HFXHKqfGaqTkVf5F5p5H5e5H5e5');
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    delete user.password_hash;
    const token = generateToken(user);

    res.json({ user, token });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: err.errors });
    }
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/me', authenticate, async (req, res) => {
  try {
    const user = get(
      `SELECT id, name, username, email, avatar_initials, avatar_color, plan,
              join_date, xp, streak_count, streak_last_date, created_at
       FROM users WHERE id = ?`,
      [req.user.id]
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const badges = query('SELECT badge_id, unlocked_at FROM user_badges WHERE user_id = ? ORDER BY unlocked_at', [req.user.id]).rows;
    const activity = query(
      `SELECT activity_type, label, subject, icon, created_at
       FROM user_activity WHERE user_id = ?
       ORDER BY created_at DESC LIMIT 10`,
      [req.user.id]
    ).rows;

    res.json({ ...user, badges, recentActivity: activity });
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/logout', authenticate, async (req, res) => {
  try {
    query('UPDATE users SET token_version = token_version + 1 WHERE id = ?', [req.user.id]);
    res.json({ message: 'Logged out. All existing tokens revoked.' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
