import crypto from 'crypto';
import { Router } from 'express';
import { query } from '../config/db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const rows = query(
      'SELECT content_type, content_id, created_at FROM user_bookmarks WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    ).rows;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const { content_type, content_id } = req.body;
    if (!content_type || !content_id) {
      return res.status(400).json({ error: 'content_type and content_id required' });
    }
    if (!['book', 'lesson'].includes(content_type)) {
      return res.status(400).json({ error: 'content_type must be "book" or "lesson"' });
    }

    const existing = query(
      'SELECT id FROM user_bookmarks WHERE user_id = ? AND content_type = ? AND content_id = ?',
      [req.user.id, content_type, content_id]
    ).rows;
    if (existing.length > 0) {
      return res.json({ message: 'Already bookmarked' });
    }

    const id = crypto.randomUUID();
    query(
      `INSERT INTO user_bookmarks (id, user_id, content_type, content_id)
       VALUES (?, ?, ?, ?)`,
      [id, req.user.id, content_type, content_id]
    );

    const label = content_type === 'book' ? `Bookmarked: ${content_id}` : `Bookmarked lesson: ${content_id}`;
    const aid = crypto.randomUUID();
    query(
      `INSERT INTO user_activity (id, user_id, activity_type, label, subject, icon)
       VALUES (?, ?, 'bookmark', ?, ?, 'bookmark')`,
      [aid, req.user.id, label, content_type === 'book' ? 'Books' : content_id]
    );

    res.status(201).json({ id, content_type, content_id });
  } catch (err) {
    console.error('Bookmark error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/', authenticate, async (req, res) => {
  try {
    const { content_type, content_id } = req.body;
    query(
      'DELETE FROM user_bookmarks WHERE user_id = ? AND content_type = ? AND content_id = ?',
      [req.user.id, content_type, content_id]
    );
    res.json({ message: 'Bookmark removed' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
