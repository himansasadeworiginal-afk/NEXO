import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import Stripe from 'stripe';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import progressRoutes from './routes/progress.js';
import quizRoutes from './routes/quiz.js';
import bookmarkRoutes from './routes/bookmarks.js';
import flashcardRoutes from './routes/flashcards.js';
import contentRoutes from './routes/content.js';
import premiumRoutes from './routes/premium.js';

const app = express();

const corsOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5500,http://127.0.0.1:5500,https://nexo-learning.netlify.app,https://himansasadeworiginal-afk.github.io').split(',');

app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(express.json({ limit: '10mb' }));

const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { error: 'Too many requests' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', globalLimiter);

if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_placeholder') {
  app.set('stripe', new Stripe(process.env.STRIPE_SECRET_KEY));
}

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/flashcards', flashcardRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/premium', premiumRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0', timestamp: new Date().toISOString() });
});

export default app;
