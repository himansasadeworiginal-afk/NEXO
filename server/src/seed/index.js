import crypto from 'crypto';
import { init, run, get, all, query } from '../config/db.js';

async function seed() {
  await init();
  console.log('Seeding NEXO database...\n');

  const migrate = () => {
    run('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT NOT NULL, username TEXT UNIQUE NOT NULL, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, avatar_initials TEXT, avatar_color TEXT DEFAULT \'#2ea84c\', plan TEXT DEFAULT \'free\', join_date TEXT DEFAULT (datetime(\'now\')), xp INTEGER DEFAULT 0, streak_count INTEGER DEFAULT 0, streak_last_date TEXT, token_version INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime(\'now\')), updated_at TEXT DEFAULT (datetime(\'now\')))');
    run('CREATE TABLE IF NOT EXISTS subjects (id TEXT PRIMARY KEY, name TEXT NOT NULL, color TEXT NOT NULL, accent TEXT NOT NULL, total_lessons INTEGER DEFAULT 0, icon TEXT)');
    run('CREATE TABLE IF NOT EXISTS lessons (id TEXT PRIMARY KEY, subject_id TEXT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE, title TEXT NOT NULL, lesson_num INTEGER NOT NULL, path TEXT, UNIQUE(subject_id, lesson_num))');
    run('CREATE TABLE IF NOT EXISTS quizzes (id TEXT PRIMARY KEY, lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE, questions TEXT DEFAULT \'[]\', created_at TEXT DEFAULT (datetime(\'now\')))');
    run('CREATE TABLE IF NOT EXISTS flashcards (id TEXT PRIMARY KEY, lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE, front TEXT NOT NULL, back TEXT NOT NULL, hint TEXT, created_at TEXT DEFAULT (datetime(\'now\')))');
    run('CREATE TABLE IF NOT EXISTS books (id TEXT PRIMARY KEY, title TEXT NOT NULL, author TEXT, category TEXT, path TEXT, summary TEXT, created_at TEXT DEFAULT (datetime(\'now\')))');
    run('CREATE TABLE IF NOT EXISTS user_progress (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE, status TEXT DEFAULT \'not-started\', completed_at TEXT, created_at TEXT DEFAULT (datetime(\'now\')), updated_at TEXT DEFAULT (datetime(\'now\')), UNIQUE(user_id, lesson_id))');
    run('CREATE TABLE IF NOT EXISTS user_quiz_scores (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, quiz_id TEXT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE, lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE, score INTEGER NOT NULL, total INTEGER NOT NULL, answers TEXT DEFAULT \'[]\', taken_at TEXT DEFAULT (datetime(\'now\')))');
    run('CREATE TABLE IF NOT EXISTS user_activity (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, activity_type TEXT NOT NULL, label TEXT NOT NULL, subject TEXT, icon TEXT, created_at TEXT DEFAULT (datetime(\'now\')))');
    run('CREATE TABLE IF NOT EXISTS user_bookmarks (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, content_type TEXT NOT NULL CHECK (content_type IN (\'book\', \'lesson\')), content_id TEXT NOT NULL, created_at TEXT DEFAULT (datetime(\'now\')), UNIQUE(user_id, content_type, content_id))');
    run('CREATE TABLE IF NOT EXISTS user_flashcard_reviews (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, card_id TEXT NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE, ease INTEGER DEFAULT 0, due_date TEXT DEFAULT (datetime(\'now\')), review_count INTEGER DEFAULT 0, last_reviewed_at TEXT, created_at TEXT DEFAULT (datetime(\'now\')), updated_at TEXT DEFAULT (datetime(\'now\')), UNIQUE(user_id, card_id))');
    run('CREATE TABLE IF NOT EXISTS user_badges (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, badge_id TEXT NOT NULL, unlocked_at TEXT DEFAULT (datetime(\'now\')), UNIQUE(user_id, badge_id))');
    run('CREATE TABLE IF NOT EXISTS subscriptions (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, stripe_subscription_id TEXT, stripe_customer_id TEXT, status TEXT DEFAULT \'incomplete\', current_period_start TEXT, current_period_end TEXT, created_at TEXT DEFAULT (datetime(\'now\')), updated_at TEXT DEFAULT (datetime(\'now\')))');

    const subjects = [
      ['economics', 'Economics', '#2aaf8f', 'teal', 'chart'],
      ['business', 'Business Studies', '#d4a040', 'amber', 'briefcase'],
      ['ict', 'ICT', '#8a5abe', 'purple', 'code'],
    ];
    for (const [id, name, color, accent, icon] of subjects) {
      run('INSERT OR REPLACE INTO subjects (id, name, color, accent, icon) VALUES (?, ?, ?, ?, ?)', [id, name, color, accent, icon]);
    }
    console.log('Subjects seeded.');

    const lessonData = {
      economics: [
        [1, 'Introduction to Economics', '/economics/1/index.html'],
        [2, 'Demand, Supply & Market Equilibrium', '/economics/2/index.html'],
        [3, 'Government Intervention in Markets', '/economics/3/index.html'],
        [4, 'Production, Cost & Market Structures', '/economics/4/index.html'],
        [5, 'National Accounting', '/economics/5/index.html'],
        [6, 'Macroeconomic Concepts', '/economics/6/index.html'],
        [7, 'Price, Inflation, Money & Financial System', '/economics/7/index.html'],
        [8, 'Market Failure, Government & Public Finance', '/economics/8/index.html'],
        [9, 'Protectionism & Foreign Investments', '/economics/9/index.html'],
        [10, 'Foreign Exchange & Balance of Payments', '/economics/10/index.html'],
        [11, 'Economic Growth, Development & Labour', '/economics/11/index.html'],
        [12, 'Sri Lankan Economy Post-Independence', '/economics/12/index.html'],
      ],
      business: [
        [1, 'Basis of Business & Environment', '/business/1/index.html'],
        [2, 'Social Responsibility & Business Ethics', '/business/2/index.html'],
        [3, 'Business-Government Relations & Consumer Protection', '/business/3/index.html'],
        [4, 'Business Organizations', '/business/4/lesson4.html'],
        [5, 'Entrepreneurship', '/business/5/lesson5.html'],
        [6, 'Money and Financial Institutions', '/business/6/lesson6.html'],
        [7, 'Insurance', '/business/7/lesson7.html'],
        [8, 'Communication', '/business/8/index.html'],
      ],
      ict: [
        [1, 'Introduction to Python Programming', '/ict/1/index.html'],
        [2, 'Control Flow: Conditionals & Loops', '/ict/2/index.html'],
      ],
    };

    for (const [subjectId, lessons] of Object.entries(lessonData)) {
      for (const [num, title, path] of lessons) {
        run('INSERT OR REPLACE INTO lessons (id, subject_id, title, lesson_num, path) VALUES (?, ?, ?, ?, ?)', [`${subjectId}-${num}`, subjectId, title, num, path]);
      }
      run('UPDATE subjects SET total_lessons = ? WHERE id = ?', [lessons.length, subjectId]);
    }
    console.log('Lessons seeded.');

    const books = [
      ['atomic-habits', 'Atomic Habits', 'James Clear', 'productivity', '/books/atomic-habits/index.html'],
      ['building-a-second-brain', 'Building a Second Brain', 'Tiago Forte', 'productivity', '/books/building-a-second-brain/index.html'],
      ['deep-work', 'Deep Work', 'Cal Newport', 'productivity', '/books/deep-work-rules-for-focused-success-in-a-distracted-world-(cal-newport)/index.html'],
      ['hyperfocus', 'Hyperfocus', 'Chris Bailey', 'productivity', '/books/hyperfocus/index.html'],
      ['mastery', 'Mastery', 'Robert Greene', 'productivity', '/books/mastery/index.html'],
      ['ego-is-the-enemy', 'Ego Is the Enemy', 'Ryan Holiday', 'philosophy', '/books/ego-is-the-enemy-(ryan-holiday)/index.html'],
      ['power-of-now', 'The Power of Now', 'Eckhart Tolle', 'philosophy', '/books/power-of-now/index.html'],
      ['book-of-wisdom', 'Book of Wisdom', 'Harry B. Joseph', 'philosophy', '/books/book-of-wisdom/index.html'],
      ['psycho-cybernetics', 'Psycho-Cybernetics', 'Maxwell Maltz', 'psychology', '/books/psycho-cybernetics-(maxwell-maltz)/index.html'],
      ['what-every-body-is-saying', 'What Every BODY Is Saying', 'Joe Navarro', 'psychology', '/books/what-every-body-is-saying/index.html'],
      ['read-people-like-a-book', 'Read People Like a Book', 'Patrick King', 'psychology', '/books/read-people-like-a-book/index.html'],
      ['surrounded-by-idiots', 'Surrounded by Idiots', 'Thomas Erikson', 'psychology', '/books/surrounded-by-idiots/index.html'],
      ['surrounded-by-psychopaths', 'Surrounded By Psychopaths', 'Thomas Erikson', 'psychology', '/books/surrounded-by-psychopaths/index.html'],
      ['concise-laws-human-nature', 'The Concise Laws of Human Nature', 'Robert Greene', 'psychology', '/books/the-concise-laws-of-human-nature/index.html'],
      ['laws-human-nature', 'The Laws of Human Nature', 'Robert Greene', 'psychology', '/books/the-laws-of-human-nature/index.html'],
      ['48-laws-of-power', 'The 48 Laws of Power', 'Robert Greene', 'power', '/books/48-laws-of-power/index.html'],
      ['daily-robert-greene', 'Daily Robert Greene', 'Robert Greene', 'power', '/books/daily-robert-greene/index.html'],
      ['art-of-seduction', 'The Art of Seduction', 'Robert Greene', 'power', '/books/the-art-of-seduction/index.html'],
      ['the-prince', 'The Prince', 'Niccolò Machiavelli', 'power', '/books/the-prince/index.html'],
      ['money-unlocked', 'Money Unlocked', 'John Lee', 'finance', '/books/money-unlocked-(john-lee)/index.html'],
      ['changing-world-order', 'The Changing World Order', 'Ray Dalio', 'finance', '/books/the-changing-world-order-why-nations-succeed-and-fail-(ray-dalio)/index.html'],
      ['rich-dad-poor-dad', 'Rich Dad Poor Dad', 'Robert Kiyosaki', 'finance', '/books/rich-dad-poor-dad/index.html'],
      ['millionaire-master-plan', 'The Millionaire Master Plan', 'Roger James Hamilton', 'finance', '/books/the-millionaire-master-plan/index.html'],
      ['psychology-of-money', 'The Psychology of Money', 'Morgan Housel', 'finance', '/books/the-psychology-of-money/index.html'],
    ];
    for (const [id, title, author, category, path] of books) {
      run('INSERT OR REPLACE INTO books (id, title, author, category, path) VALUES (?, ?, ?, ?, ?)', [id, title, author, category, path]);
    }
    console.log('Books seeded.');
  };

  migrate();

  const bcrypt = (await import('bcrypt')).default;
  const demoHash = await bcrypt.hash('demo1234', 12);
  const existing = get('SELECT id FROM users WHERE username = ?', ['demo']);
  if (!existing) {
    run('INSERT INTO users (id, name, username, email, password_hash, avatar_initials, avatar_color, xp, streak_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      crypto.randomUUID(), 'Demo User', 'demo', 'demo@nexo.app', demoHash, 'DU', '#2ea84c', 450, 7
    ]);
  } else {
    run('UPDATE users SET name = ?, xp = ?, streak_count = ? WHERE id = ?', ['Demo User', 450, 7, existing.id]);
  }
  console.log('Demo user seeded (demo@nexo.app / demo1234).');
  console.log('\nSeed complete!');
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
