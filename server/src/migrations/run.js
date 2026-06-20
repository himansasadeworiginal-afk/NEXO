import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { init, run } from '../config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runMigrations() {
  await init();

  const files = fs.readdirSync(__dirname)
    .filter(f => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(__dirname, file), 'utf-8');
    console.log(`Running migration: ${file}`);
    const statements = sql.split(';').filter(s => s.trim());
    for (const stmt of statements) {
      run(stmt.trim() + ';');
    }
    console.log(`  Done: ${file}`);
  }
  console.log('All migrations complete.');
}

runMigrations();
