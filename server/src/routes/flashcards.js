import crypto from 'crypto';
import { Router } from 'express';
import { query, get } from '../config/db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/:lessonId', authenticate, async (req, res) => {
  try {
    const cards = query(
      'SELECT id, lesson_id, front, back, hint FROM flashcards WHERE lesson_id = ? ORDER BY id',
      [req.params.lessonId]
    ).rows;

    const cardIds = cards.map(c => c.id);
    const reviewMap = {};

    if (cardIds.length > 0) {
      const placeholders = cardIds.map(() => '?').join(',');
      const reviews = query(
        `SELECT card_id, ease, due_date, review_count, last_reviewed_at
         FROM user_flashcard_reviews
         WHERE user_id = ? AND card_id IN (${placeholders})`,
        [req.user.id, ...cardIds]
      ).rows;
      reviews.forEach(r => { reviewMap[r.card_id] = r; });
    }

    const result = cards.map(card => ({
      ...card,
      review: reviewMap[card.id] || { ease: 0, due_date: new Date().toISOString(), review_count: 0, last_reviewed_at: null },
    }));

    res.json(result);
  } catch (err) {
    console.error('Flashcards error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/review', authenticate, async (req, res) => {
  try {
    const { card_id, ease } = req.body;
    if (!card_id || ease === undefined || ease < 0 || ease > 2) {
      return res.status(400).json({ error: 'Invalid card_id or ease (0=again, 1=hard, 2=easy)' });
    }

    const intervals = [1, 30, 1440];
    const dueDate = new Date(Date.now() + intervals[ease] * 60000).toISOString();

    const existing = get('SELECT id FROM user_flashcard_reviews WHERE user_id = ? AND card_id = ?', [req.user.id, card_id]);

    if (existing) {
      query(
        `UPDATE user_flashcard_reviews
         SET ease = ?, due_date = ?, review_count = review_count + 1, last_reviewed_at = datetime('now'), updated_at = datetime('now')
         WHERE id = ?`,
        [ease, dueDate, existing.id]
      );
    } else {
      const id = crypto.randomUUID();
      query(
        `INSERT INTO user_flashcard_reviews (id, user_id, card_id, ease, due_date, review_count, last_reviewed_at)
         VALUES (?, ?, ?, ?, ?, 1, datetime('now'))`,
        [id, req.user.id, card_id, ease, dueDate]
      );
    }

    const result = get('SELECT * FROM user_flashcard_reviews WHERE user_id = ? AND card_id = ?', [req.user.id, card_id]);
    res.json(result);
  } catch (err) {
    console.error('Flashcard review error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/due/:lessonId', authenticate, async (req, res) => {
  try {
    const rows = query(
      `SELECT fc.id, fc.front, fc.back, fc.hint
       FROM flashcards fc
       LEFT JOIN user_flashcard_reviews ufr ON ufr.card_id = fc.id AND ufr.user_id = ?
       WHERE fc.lesson_id = ?
       AND (ufr.due_date IS NULL OR ufr.due_date <= datetime('now'))
       ORDER BY fc.id`,
      [req.user.id, req.params.lessonId]
    ).rows;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
