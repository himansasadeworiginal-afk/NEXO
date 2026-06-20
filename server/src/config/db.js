import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.resolve(__dirname, '..', '..', 'data', 'nexo.db');

let db = null;
let ready = null;

function save() {
  fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
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
