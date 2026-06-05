# NEXO — Agent Instructions

## Token-Saving Rules

1. **DO NOT read book directories or Study Notes content unless the task explicitly requires editing them.** These are content files (book summaries, PDFs, lesson HTML pages). The app logic lives in `index.html`.

2. **Always read `index.html` first** — it's a single-file app containing all HTML, CSS, and JS inline (~4600 lines). This is the only file that matters for most tasks.

3. **`account.html`** is a separate profile page (~1330 lines). Skip unless the task involves account/profile features.

4. **`content-manifest.json`** lists every book and lesson with its paths and file types. Read this instead of globbing content directories.

## Key Code Locations in `index.html`

| What | Lines (approx) |
|------|----------------|
| CSS (styles) | top of file before `<script>` |
| `SUBJECTS_DATA` | ~2138 |
| `QUIZ_DATA` | ~2189 |
| `FLASHCARDS_DATA` | ~2373 |
| Quiz engine | ~2517 |
| Study Hub render | ~2684 |
| Dashboard render | ~4000 |
| Flashcard engine | ~4165 |
| Account sidebar | ~4352 |
| Keyboard shortcuts | ~2660 (quiz), ~4311 (flashcards) |
| Theme/font settings | ~4570 |
| XP & Badges system | ~4084 (before Dashboard) |
| Init block | ~4334 |

## Data Constants

- `SUBJECTS_DATA` — subjects, lessons, paths, accents
- `QUIZ_DATA` — per-lesson quiz questions
- `FLASHCARDS_DATA` — per-lesson flashcard front/back pairs
- `BOOKS_DATA` — book metadata (in `index.html`)
- `NEXO_MOCK_USER` — mock profile data for account sidebar

## localStorage Keys (`nexo_*` prefix)

- `nexo_lesson_{subject}_{id}` → `"not-started"|"in-progress"|"done"`
- `nexo_quiz_{subject}_{id}_best` → integer best score
- `nexo_fc_{subject}_{id}_{idx}` → `{ease, due}` flashcard SRS data
- `nexo_streak` → `{count, lastDate}`
- `nexo_last_lesson` → `{subjectId, lessonId, title, time}`
- `nexo_xp` → total XP earned
- `nexo_badges` → JSON array of earned badge IDs
- `nexo_fc_reviewed` → total flashcard reviews
- `nexo_xp_streak_date` → last date streak XP was awarded
- `nexo_theme` → saved theme preferences

## CSS Conventions

- Dark theme using CSS variables (`--bg`, `--surface`, `--text`, `--teal`, `--amber`, `--purple`, etc.)
- Glass/frosted effect via `backdrop-filter: blur()`
- Subject accent colors: teal (Economics), amber (Business), purple (ICT)
- Dashboard CSS class prefix: `dashboard-`
- Flashcard CSS class prefix: `flashcard-`, `fc-`, `flip-`

## Build / Commands

- No build step. Open `index.html` in a browser.
- Git repo at root. Deploy: `git push origin main` → GitHub Pages.
