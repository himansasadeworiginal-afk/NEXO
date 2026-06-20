# NEXO 2.0

Master any subject — lessons, quizzes, and book summaries in one page.

<p align="center">
  <a href="https://himansasadeworiginal-afk.github.io/NEXO/">
    <img src="https://img.shields.io/badge/Live-GitHub%20Pages-2ea84c?style=for-the-badge" alt="Live on GitHub Pages">
  </a>
  <a href="https://himansasadeworiginal-afk.github.io/NEXO/account/index.html">
    <img src="https://img.shields.io/badge/Account-Profile-2aaf8f?style=for-the-badge" alt="Account Page">
  </a>
</p>

## Overview

Self-contained HTML learning platform. Open `index.html` in any browser — no frameworks, no CDN, no server. [Live site](https://himansasadeworiginal-afk.github.io/NEXO/).

5 tabs: **Dashboard** (XP, badges, streak, rings, quiz summary), **Study Hub** (lessons, quizzes, flashcards), **Library** (24 book summaries), **Bookmarks** (saved items), **Glossary** (key terms across subjects).

**AI agents**: Read `AGENTS.md` first for token-saving navigation rules. `content-manifest.json` lists all book/lesson paths.

## Directory

```
nexo/
├── index.html                     # Main app (all HTML+CSS+JS inline)
├── account.html                   # Redirects → account/index.html
├── AGENTS.md                      # AI agent instructions
├── README.md
├── content-manifest.json          # Books & lessons listed compactly
│
├── economics/
│   ├── index.html                 # Section hub — 12 lessons, progress, search
│   └── lessons/{n}/index.html     # Lesson content pages
│
├── business/
│   ├── index.html                 # Section hub — 8 lessons, progress, search
│   └── lessons/{n}/index.html     # Lesson content pages
│
├── ict/
│   ├── index.html                 # Section hub — 12 lessons, terminal badges
│   ├── lessons/{n}/index.html     # Lesson content pages
│   └── components/
│       ├── nexo-terminal.html     # Standalone terminal
│       └── nexo-terminal-embed.js # Embeddable terminal via <script>
│
├── books/
│   ├── index.html                 # Section hub — 24 books, filters, search
│   └── {slug}/index.html          # 24 interactive book summaries (kebab-case)
│
├── account/
│   └── index.html                 # Full account page (Dashboard, Progress, Quizzes, etc.)
│
└── shared/                        # Reserved for future shared assets
```

## Subjects

| Subject | Lessons | Hub Accent | Quiz | Flashcards |
|---------|---------|--------|------|------------|
| Economics | 12 | Teal | 8 real (L1–2), placeholder (L3–12) | 8 cards/lesson |
| Business Studies | 8 | Amber | 8 real (L1–2), placeholder (L3–8) | 3–6 cards/lesson |
| ICT | 12 (2 built) | Purple | 8 real (L1–2) | 8 cards/lesson |

Each subject has a dedicated section hub (`economics/`, `business/`, `ict/`) with progress tracking, search, and quiz score badges. Add subjects via `SUBJECTS_DATA` in `index.html`.

## Books Library

24 books across 5 categories:
- **Productivity** — Atomic Habits, Building a Second Brain, Deep Work, Hyperfocus, Mastery
- **Philosophy** — Ego Is the Enemy, The Power of Now, Book of Wisdom
- **Psychology** — Psycho-Cybernetics, What Every BODY Is Saying, Read People Like a Book, Surrounded by Idiots, Surrounded By Psychopaths, The Concise Laws of Human Nature, The Laws of Human Nature
- **Power** — The 48 Laws of Power, Daily Robert Greene, The Art of Seduction, The Prince
- **Finance** — Money Unlocked, The Changing World Order, Rich Dad Poor Dad, The Millionaire Master Plan, The Psychology of Money

## Lessons Per Subject

Lessons live in `{subject}/lessons/{n}/index.html`. Each lesson page is self-contained with its own styling.

- **Business Studies** (8): Basis of Business & Environment, Social Responsibility & Business Ethics, Business-Government Relations & Consumer Protection, Business Organizations, Entrepreneurship, Money and Financial Institutions, Insurance, Communication
- **Economics** (12): Introduction to Economics, Demand Supply & Market Equilibrium, Government Intervention in Markets, Production Cost & Market Structures, National Accounting, Macroeconomic Concepts, Price Inflation Money & Financial System, Market Failure Government & Public Finance, Protectionism & Foreign Investments, Foreign Exchange & Balance of Payments, Economic Growth Development & Labour, Sri Lankan Economy Post-Independence
- **ICT** (2 built, 12 planned): Introduction to Python Programming, Control Flow: Conditionals & Loops

## Usage

- **Section Hubs** — Each subject (`economics/`, `business/`, `ict/`) and the book library (`books/`) have dedicated hub pages with progress bars, search, and quick access to all content.
- **Dark/Light Mode** — Moon/sun icon in navbar toggles background. Saved to `nexo_bg_mode` in localStorage. Shared across all hub pages.
- **Dashboard** — XP level, badges, streak, last lesson, completion rings, quiz scores (auto-updates on progress/quiz events)
- **Study Hub** — Expand subject panels, Start to open lesson, Quiz to test, Flashcards for SRS review
- **Library** — Filter by category (Productivity, Philosophy, Psychology, Power, Finance), search by title, grid/list toggle
- **Flashcard modal** — Click/Space/Enter to flip, 1/2/3 or Easy/Hard/Again to rate (intervals: 1min/30min/24h). Escape to close
- **Quiz modal** — 1–4 to answer, instant feedback with explanations, best score tracked in localStorage
- **Status tracking** — Click status pill to cycle: Not Started → In Progress → Done
- **Global search** — `Cmd+K` / `Ctrl+K` opens spotlight overlay; search lessons, books, and glossary terms

### ICT Terminal

Embed per-lesson. Blank editor starts empty.

```html
<script>window.NEXO_TERMINAL_CONFIG={lang:'python',lesson:{title:'Your Challenge',challenge:'...',expectedOutput:'...',hint:'...',starterCode:{python:'',pseudocode:'',javascript:''}}};</script>
<script src="https://skulpt.org/js/skulpt.min.js"></script>
<script src="https://skulpt.org/js/skulpt-stdlib.js"></script>
<div id="nexo-terminal-mount"></div>
<script src="../../components/nexo-terminal-embed.js"></script>
```

Presets: `py-hello-world`, `py-variables`, `py-input`, `py-if-else`, `py-for-loop`, `py-while-loop`, `py-functions`, `psc-variables`, `psc-loop`

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Cmd+K` / `Ctrl+K` | Open global search |
| `/` | Focus library search bar |
| `↑`/`↓` | Navigate search results |
| `Enter` | Open selected result |
| `Space`/`Enter` | Flip flashcard |
| `Escape` | Close overlay / clear search |
| `1` `2` `3` `4` | Quiz answer A/B/C/D |
| `1` `2` `3` | Rate flashcard Again/Hard/Easy |
| `Ctrl+Enter` | Run code (terminal) |
| `Ctrl+L` | Clear output (terminal) |
| `Ctrl+R` | Reset editor (terminal) |

## Technical Notes

- Single-file HTML: all CSS/JS inline in `index.html`
- Data constants: `BOOKS_DATA`, `SUBJECTS_DATA`, `QUIZ_DATA`, `FLASHCARDS_DATA`
- localStorage keys (`nexo_*` prefix): lesson status, quiz best scores, flashcard SRS, streak, last lesson, background mode, bookmarks, XP, badges
- Flashcard SRS: `again` = 1min, `hard` = 30min, `easy` = 24h; per-card `{ease, due}` stored as `nexo_fc_{subject}_{lesson}_{idx}`
- Canvas particles + mouse glow on background
- ICT Terminal: Skulpt CDN for Python in-browser execution
- `NEXO_MOCK_USER` with `// BACKEND:` marks auth integration points

## Account Page

`account/index.html` — 6 sections in a sidebar layout:
- **Dashboard** — Quick stats, subject progress, recent activity
- **Progress** — Per-subject lesson dots, progress bars, overall completion ring
- **Quizzes** — Best score card, full history table with score bars
- **Bookmarks** — Saved books and lessons grid
- **Activity** — Timeline with lesson, quiz, and bookmark events
- **Premium** — Feature list and upgrade CTA

Shares the dark/light mode toggle from `index.html` via `nexo_bg_mode` localStorage.

## Deployment

Static site on GitHub Pages: https://himansasadeworiginal-afk.github.io/NEXO/

```bash
git add -A && git commit -m "Update NEXO" && git push origin main
```

`.nojekyll` at root for GitHub Pages file serving.

## Roadmap

### Phase 1 — Done
- Bookmarks & Reading List, Lesson Completion Tracker, Quiz Best Score Badges, ICT Section + Terminal, Dark/Light Mode Toggle

### Phase 2 — Done
- Flashcard System (CSS flip cards, SRS intervals in localStorage)
- Study Dashboard (streak, rings, quiz summary, last lesson)
- Glossary System (per-subject keyword tooltips + glossary page)
- Subject Progress Bars (live bars updating with lesson status)
- XP & Achievement Badges (12 badges with level progression and unlock notifications)

### Phase 3 — Content
- [ ] Fill all quiz placeholders (Econ L3–12, Business L3–8)
- [ ] ICT lesson content (algorithms, data types, networks, hardware)
- [ ] Glossary data for all subjects

### Phase 4 — Hard
- [ ] Timed Exam Mode — Time limit, randomized questions, no mid-exam feedback
- [ ] Past Paper / Structured Questions — Mark allocations, model answer reveal
- [ ] Study Planner — Exam date → day-by-day revision schedule
- [ ] Concept Map Viewer — Interactive SVG node-link diagrams

## Credits

Book summaries, interactive pages, and quizzes built from study notes on each respective work.
