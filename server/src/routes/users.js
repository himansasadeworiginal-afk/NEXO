import crypto from 'crypto';
import { Router } from 'express';
import { query, get } from '../config/db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = get(
      `SELECT id, name, username, email, avatar_initials, avatar_color, plan,
              join_date, xp, streak_count, streak_last_date
       FROM users WHERE id = ?`,
      [req.user.id]
    );

    const badges = query('SELECT badge_id, unlocked_at FROM user_badges WHERE user_id = ? ORDER BY unlocked_at', [req.user.id]).rows;
    const activity = query(
      `SELECT activity_type, label, subject, icon, created_at
       FROM user_activity WHERE user_id = ?
       ORDER BY created_at DESC LIMIT 20`,
      [req.user.id]
    ).rows;

    const progress = query(
      `SELECT up.lesson_id, up.status, l.subject_id, l.title
       FROM user_progress up
       JOIN lessons l ON l.id = up.lesson_id
       WHERE up.user_id = ?`,
      [req.user.id]
    ).rows;

    const quizScores = query(
      `SELECT uqs.quiz_id, uqs.lesson_id, uqs.score, uqs.total, uqs.taken_at, l.title AS lesson_title
       FROM user_quiz_scores uqs
       JOIN lessons l ON l.id = uqs.lesson_id
       WHERE uqs.user_id = ?
       ORDER BY uqs.taken_at DESC`,
      [req.user.id]
    ).rows;

    const bookmarks = query(
      `SELECT content_type, content_id, created_at
       FROM user_bookmarks WHERE user_id = ?
       ORDER BY created_at DESC`,
      [req.user.id]
    ).rows;

    const subscription = query(
      `SELECT status, current_period_end
       FROM subscriptions WHERE user_id = ? AND status = 'active'
       LIMIT 1`,
      [req.user.id]
    ).rows[0] || null;

    res.json({
      user,
      badges,
      recentActivity: activity,
      progress,
      quizScores,
      bookmarks,
      subscription,
    });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/profile', authenticate, async (req, res) => {
  try {
    const { name, avatar_color } = req.body;
    const fields = [];
    const values = [];

    if (name) { fields.push('name = ?'); values.push(name); }
    if (avatar_color) { fields.push('avatar_color = ?'); values.push(avatar_color); }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    fields.push("updated_at = datetime('now')");
    values.push(req.user.id);

    query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);

    const user = get(
      `SELECT id, name, username, email, avatar_initials, avatar_color, plan, join_date, xp
       FROM users WHERE id = ?`,
      [req.user.id]
    );
    res.json(user);
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/xp', authenticate, async (req, res) => {
  try {
    const user = get('SELECT xp FROM users WHERE id = ?', [req.user.id]);
    res.json({ xp: user?.xp || 0 });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/xp', authenticate, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount < 0) {
      return res.status(400).json({ error: 'Invalid XP amount' });
    }
    query('UPDATE users SET xp = xp + ? WHERE id = ?', [amount, req.user.id]);
    const user = get('SELECT xp FROM users WHERE id = ?', [req.user.id]);
    res.json({ xp: user.xp });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/streak', authenticate, async (req, res) => {
  try {
    const user = get('SELECT streak_count, streak_last_date FROM users WHERE id = ?', [req.user.id]);
    res.json(user || { streak_count: 0, streak_last_date: null });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/streak', authenticate, async (req, res) => {
  try {
    const user = get('SELECT streak_count, streak_last_date FROM users WHERE id = ?', [req.user.id]);
    const today = new Date().toISOString().split('T')[0];
    const lastDate = user.streak_last_date ? new Date(user.streak_last_date).toISOString().split('T')[0] : null;
    let newCount = 1;

    if (lastDate === today) {
      newCount = user.streak_count;
    } else if (lastDate === new Date(Date.now() - 86400000).toISOString().split('T')[0]) {
      newCount = user.streak_count + 1;
    }

    query('UPDATE users SET streak_count = ?, streak_last_date = ? WHERE id = ?', [newCount, today, req.user.id]);

    if (lastDate !== today) {
      const id = crypto.randomUUID();
      query(
        `INSERT INTO user_activity (id, user_id, activity_type, label, icon)
         VALUES (?, ?, 'lesson', ?, 'check')`,
        [id, req.user.id, `Streak updated: ${newCount} days`]
      );
    }

    res.json({ streak_count: newCount, streak_last_date: today });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
