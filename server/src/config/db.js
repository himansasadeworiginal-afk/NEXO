import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isVercel = !!(process.env.VERCEL);
const DB_PATH = isVercel
  ? path.resolve('/tmp', 'nexo.db')
  : path.resolve(__dirname, '..', '..', 'data', 'nexo.db');

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT NOT NULL, username TEXT UNIQUE NOT NULL, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, avatar_initials TEXT, avatar_color TEXT DEFAULT '#2ea84c', plan TEXT DEFAULT 'free', join_date TEXT DEFAULT (datetime('now')), xp INTEGER DEFAULT 0, streak_count INTEGER DEFAULT 0, streak_last_date TEXT, token_version INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS subjects (id TEXT PRIMARY KEY, name TEXT NOT NULL, color TEXT NOT NULL, accent TEXT NOT NULL, total_lessons INTEGER DEFAULT 0, icon TEXT);
CREATE TABLE IF NOT EXISTS lessons (id TEXT PRIMARY KEY, subject_id TEXT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE, title TEXT NOT NULL, lesson_num INTEGER NOT NULL, path TEXT, UNIQUE(subject_id, lesson_num));
CREATE TABLE IF NOT EXISTS quizzes (id TEXT PRIMARY KEY, lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE, questions TEXT DEFAULT '[]', created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS flashcards (id TEXT PRIMARY KEY, lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE, front TEXT NOT NULL, back TEXT NOT NULL, hint TEXT, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS books (id TEXT PRIMARY KEY, title TEXT NOT NULL, author TEXT, category TEXT, path TEXT, summary TEXT, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS user_progress (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE, status TEXT DEFAULT 'not-started', completed_at TEXT, created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')), UNIQUE(user_id, lesson_id));
CREATE TABLE IF NOT EXISTS user_quiz_scores (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, quiz_id TEXT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE, lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE, score INTEGER NOT NULL, total INTEGER NOT NULL, answers TEXT DEFAULT '[]', taken_at TEXT DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS user_activity (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, activity_type TEXT NOT NULL, label TEXT NOT NULL, subject TEXT, icon TEXT, created_at TEXT DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS user_bookmarks (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, content_type TEXT NOT NULL CHECK (content_type IN ('book', 'lesson')), content_id TEXT NOT NULL, created_at TEXT DEFAULT (datetime('now')), UNIQUE(user_id, content_type, content_id));
CREATE TABLE IF NOT EXISTS user_flashcard_reviews (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, card_id TEXT NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE, ease INTEGER DEFAULT 0, due_date TEXT DEFAULT (datetime('now')), review_count INTEGER DEFAULT 0, last_reviewed_at TEXT, created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')), UNIQUE(user_id, card_id));
CREATE TABLE IF NOT EXISTS user_badges (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, badge_id TEXT NOT NULL, unlocked_at TEXT DEFAULT (datetime('now')), UNIQUE(user_id, badge_id));
CREATE TABLE IF NOT EXISTS subscriptions (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, stripe_subscription_id TEXT, stripe_customer_id TEXT, status TEXT DEFAULT 'incomplete', current_period_start TEXT, current_period_end TEXT, created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')));
`;

const SEED = [
  // subjects
  ['INSERT OR REPLACE INTO subjects (id, name, color, accent, icon) VALUES (?, ?, ?, ?, ?)', ['economics', 'Economics', '#2aaf8f', 'teal', 'chart']],
  ['INSERT OR REPLACE INTO subjects (id, name, color, accent, icon) VALUES (?, ?, ?, ?, ?)', ['business', 'Business Studies', '#d4a040', 'amber', 'briefcase']],
  ['INSERT OR REPLACE INTO subjects (id, name, color, accent, icon) VALUES (?, ?, ?, ?, ?)', ['ict', 'ICT', '#8a5abe', 'purple', 'code']],

  // economics lessons
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['econ-L1', 'economics', 'Introduction to Economics', 1, '/economics/1/index.html']],
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['econ-L2', 'economics', 'Demand, Supply & Market Equilibrium', 2, '/economics/2/index.html']],
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['econ-L3', 'economics', 'Government Intervention in Markets', 3, '/economics/3/index.html']],
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['econ-L4', 'economics', 'Production, Cost & Market Structures', 4, '/economics/4/index.html']],
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['econ-L5', 'economics', 'National Accounting', 5, '/economics/5/index.html']],
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['econ-L6', 'economics', 'Macroeconomic Concepts', 6, '/economics/6/index.html']],
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['econ-L7', 'economics', 'Price, Inflation, Money & Financial System', 7, '/economics/7/index.html']],
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['econ-L8', 'economics', 'Market Failure, Government & Public Finance', 8, '/economics/8/index.html']],
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['econ-L9', 'economics', 'Protectionism & Foreign Investments', 9, '/economics/9/index.html']],
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['econ-L10', 'economics', 'Foreign Exchange & Balance of Payments', 10, '/economics/10/index.html']],
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['econ-L11', 'economics', 'Economic Growth, Development & Labour', 11, '/economics/11/index.html']],
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['econ-L12', 'economics', 'Sri Lankan Economy Post-Independence', 12, '/economics/12/index.html']],

  // business lessons
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['bus-L1', 'business', 'Basis of Business & Environment', 1, '/business/1/index.html']],
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['bus-L2', 'business', 'Social Responsibility & Business Ethics', 2, '/business/2/index.html']],
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['bus-L3', 'business', 'Business Ownership & Management', 3, '/business/3/index.html']],
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['bus-L4', 'business', 'Production & Operations Management', 4, '/business/4/index.html']],
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['bus-L5', 'business', 'Human Resource Management', 5, '/business/5/index.html']],
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['bus-L6', 'business', 'Marketing & Financial Management', 6, '/business/6/index.html']],
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['bus-L7', 'business', 'Financial Management', 7, '/business/7/index.html']],
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['bus-L8', 'business', 'Risk & Insurance', 8, '/business/8/index.html']],

  // ict lessons
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['ict-L1', 'ict', 'ICT & Computer Systems', 1, '/ict/1/index.html']],
  ['INSERT OR IGNORE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', ['ict-L2', 'ict', 'Data & Databases', 2, '/ict/2/index.html']],
];

let db = null;
let ready = null;

function save() {
  const data = db.export();
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

async function init() {
  if (ready) return ready;
  ready = (async () => {
    const SQL = await initSqlJs();
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    if (fs.existsSync(DB_PATH)) {
      db = new SQL.Database(fs.readFileSync(DB_PATH));
    } else {
      db = new SQL.Database();
      db.run('PRAGMA foreign_keys = ON');
      for (const stmt of SCHEMA.split(';').filter(s => s.trim())) {
        db.run(stmt.trim() + ';');
      }
      for (const [sql, params] of SEED) {
        const stmt = db.prepare(sql);
        stmt.bind(params);
        stmt.run();
        stmt.free();
      }
    }
    db.run('PRAGMA foreign_keys = ON');
    save();
  })();
  return ready;
}

function query(sql, params = []) {
  if (!db) throw new Error('DB not initialized. Call init() first.');
  const isWrite = !sql.trim().toUpperCase().startsWith('SELECT');
  if (isWrite) {
    const stmt = db.prepare(sql);
    stmt.bind(params);
    stmt.run();
    stmt.free();
    save();
    return { changes: db.getRowsModified() };
  }
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return { rows };
}

function get(sql, params = []) {
  const r = query(sql, params);
  return r.rows[0] || null;
}

function all(sql, params = []) {
  return query(sql, params).rows;
}

function run(sql, params = []) {
  if (!db) throw new Error('DB not initialized');
  const stmt = db.prepare(sql);
  stmt.bind(params);
  stmt.run();
  stmt.free();
  save();
  return { changes: db.getRowsModified() };
}

function transaction(fn) {
  return (...args) => {
    db.run('BEGIN');
    try {
      fn(...args);
      db.run('COMMIT');
      save();
    } catch (e) {
      db.run('ROLLBACK');
      throw e;
    }
  };
}

export { init, query, get, all, run, transaction };
