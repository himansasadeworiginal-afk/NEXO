import crypto from 'crypto';
import { Router } from 'express';
import { query, get } from '../config/db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/submit', authenticate, async (req, res) => {
  try {
    const { lesson_id, score, total, answers } = req.body;
    if (!lesson_id || score === undefined || !total) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const quiz = get('SELECT id FROM quizzes WHERE lesson_id = ? LIMIT 1', [lesson_id]);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const id = crypto.randomUUID();
    query(
      `INSERT INTO user_quiz_scores (id, user_id, quiz_id, lesson_id, score, total, answers)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, req.user.id, quiz.id, lesson_id, score, total, JSON.stringify(answers || [])]
    );

    const pct = Math.round((score / total) * 100);
    const aid = crypto.randomUUID();
    query(
      `INSERT INTO user_activity (id, user_id, activity_type, label, subject, icon)
       VALUES (?, ?, 'quiz', ?, ?, 'quiz')`,
      [aid, req.user.id, `Quiz passed: ${lesson_id} — ${score}/${total}`, lesson_id]
    );

    const xpGain = Math.max(10, Math.floor(pct / 10) * 5);
    query('UPDATE users SET xp = xp + ? WHERE id = ?', [xpGain, req.user.id]);

    const result = get('SELECT * FROM user_quiz_scores WHERE id = ?', [id]);
    res.json({ ...result, xp_gained: xpGain });
  } catch (err) {
    console.error('Quiz submit error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/history', authenticate, async (req, res) => {
  try {
    const rows = query(
      `SELECT uqs.*, l.title AS lesson_title, l.subject_id
       FROM user_quiz_scores uqs
       JOIN lessons l ON l.id = uqs.lesson_id
       WHERE uqs.user_id = ?
       ORDER BY uqs.taken_at DESC
       LIMIT 50`,
      [req.user.id]
    ).rows;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/best/:lessonId', authenticate, async (req, res) => {
  try {
    const result = get(
      `SELECT score, total, taken_at FROM user_quiz_scores
       WHERE user_id = ? AND lesson_id = ?
       ORDER BY CAST(score AS REAL) / CAST(total AS REAL) DESC
       LIMIT 1`,
      [req.user.id, req.params.lessonId]
    );
    res.json(result || { score: 0, total: 0 });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
