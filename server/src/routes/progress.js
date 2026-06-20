import crypto from 'crypto';
import { Router } from 'express';
import { query, get } from '../config/db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const rows = query(
      `SELECT up.*, l.title AS lesson_title, l.subject_id
       FROM user_progress up
       JOIN lessons l ON l.id = up.lesson_id
       WHERE up.user_id = ?
       ORDER BY up.updated_at DESC`,
      [req.user.id]
    ).rows;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:subjectId', authenticate, async (req, res) => {
  try {
    const rows = query(
      `SELECT up.*, l.title AS lesson_title
       FROM user_progress up
       JOIN lessons l ON l.id = up.lesson_id
       WHERE up.user_id = ? AND l.subject_id = ?
       ORDER BY l.lesson_num`,
      [req.user.id, req.params.subjectId]
    ).rows;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:lessonId', authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    const valid = ['not-started', 'in-progress', 'done'];
    if (!valid.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const existing = get('SELECT id FROM user_progress WHERE user_id = ? AND lesson_id = ?', [req.user.id, req.params.lessonId]);
    const now = new Date().toISOString();

    if (existing) {
      query(
        `UPDATE user_progress SET status = ?, completed_at = CASE WHEN ? = 'done' AND completed_at IS NULL THEN ? ELSE completed_at END, updated_at = ? WHERE id = ?`,
        [status, status, now, now, existing.id]
      );
    } else {
      const id = crypto.randomUUID();
      query(
        `INSERT INTO user_progress (id, user_id, lesson_id, status, completed_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id, req.user.id, req.params.lessonId, status, status === 'done' ? now : null, now]
      );
    }

    if (status === 'done') {
      const aid = crypto.randomUUID();
      query(
        `INSERT INTO user_activity (id, user_id, activity_type, label, icon)
         VALUES (?, ?, 'lesson', ?, 'check')`,
        [aid, req.user.id, `Completed: ${req.params.lessonId}`]
      );
    }

    const result = get('SELECT * FROM user_progress WHERE user_id = ? AND lesson_id = ?', [req.user.id, req.params.lessonId]);
    res.json(result);
  } catch (err) {
    console.error('Progress update error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/summary/:subjectId', authenticate, async (req, res) => {
  try {
    const total = get('SELECT COUNT(*) AS total FROM lessons WHERE subject_id = ?', [req.params.subjectId]);
    const done = get(
      `SELECT COUNT(*) AS done FROM user_progress up
       JOIN lessons l ON l.id = up.lesson_id
       WHERE up.user_id = ? AND l.subject_id = ? AND up.status = 'done'`,
      [req.user.id, req.params.subjectId]
    );

    res.json({
      subjectId: req.params.subjectId,
      total: total.total,
      completed: done.done,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
