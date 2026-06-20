import { Router } from 'express';
import { query, get, all } from '../config/db.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

router.get('/subjects', async (req, res) => {
  try {
    const rows = query('SELECT * FROM subjects ORDER BY name').rows;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/subjects/:id', async (req, res) => {
  try {
    const subject = get('SELECT * FROM subjects WHERE id = ?', [req.params.id]);
    if (!subject) return res.status(404).json({ error: 'Not found' });

    const lessons = query(
      'SELECT id, title, lesson_num, path FROM lessons WHERE subject_id = ? ORDER BY lesson_num',
      [req.params.id]
    ).rows;

    res.json({ ...subject, lessons });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/lessons/:id', async (req, res) => {
  try {
    const result = get(
      'SELECT l.*, s.name AS subject_name, s.color AS subject_color FROM lessons l JOIN subjects s ON s.id = l.subject_id WHERE l.id = ?',
      [req.params.id]
    );
    if (!result) return res.status(404).json({ error: 'Not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/quizzes/:lessonId', async (req, res) => {
  try {
    const result = get('SELECT * FROM quizzes WHERE lesson_id = ?', [req.params.lessonId]);
    if (!result) {
      const lesson = get('SELECT id FROM lessons WHERE id = ?', [req.params.lessonId]);
      if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
      return res.json(null);
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/flashcards/:lessonId', async (req, res) => {
  try {
    const rows = query(
      'SELECT id, front, back, hint FROM flashcards WHERE lesson_id = ? ORDER BY id',
      [req.params.lessonId]
    ).rows;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/books', async (req, res) => {
  try {
    const { category, search } = req.query;
    let sql = 'SELECT * FROM books';
    const params = [];
    const conds = [];

    if (category) {
      params.push(category);
      conds.push(`category = ?`);
    }
    if (search) {
      params.push(`%${search}%`);
      conds.push(`(title LIKE ? OR author LIKE ?)`);
      params.push(`%${search}%`);
    }

    if (conds.length > 0) sql += ' WHERE ' + conds.join(' AND ');
    sql += ' ORDER BY title';

    const rows = query(sql, params).rows;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/books/:id', async (req, res) => {
  try {
    const result = get('SELECT * FROM books WHERE id = ?', [req.params.id]);
    if (!result) return res.status(404).json({ error: 'Not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
