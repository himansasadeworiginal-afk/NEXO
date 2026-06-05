# NEXO 2.0

Turn books and notes into interactive learning experiences.

<p align="center">
  <a href="https://himansasadeworiginal-afk.github.io/NEXO/">
    <img src="https://img.shields.io/badge/Live-GitHub%20Pages-2ea84c?style=for-the-badge" alt="Live on GitHub Pages">
  </a>
</p>

## Overview

Self-contained single-file HTML platform. Open `index.html` in any browser — no frameworks, no CDN, no server. [Live site](https://himansasadeworiginal-afk.github.io/NEXO/).

4 sections: **Dashboard** (XP, badges, streak, rings, quiz summary), **Study Hub** (lessons, quizzes, flashcards), **Book Library** (24 summaries), **ICT Terminal** (browser code playground).

**AI agents**: Read `AGENTS.md` first for token-saving navigation rules. `content-manifest.json` lists all book/lesson paths — don't glob content directories.

## Directory

```
nexo/
├── index.html                       # Main app (all HTML+CSS+JS inline)
├── account.html                     # Full profile page
├── AGENTS.md                    # AI agent instructions (read this first)
├── README.md
├── content-manifest.json        # All books & lessons listed compactly
├── components/
│   ├── nexo-terminal.html           # Standalone iframe terminal
│   └── nexo-terminal-embed.js       # Embeddable terminal via <script>
├── Study Notes/
│   ├── Business/<n>/index.html      # 8 lessons
│   ├── Econ/<n>/index.html          # 12 lessons
│   └── ICT/<n>/index.html           # 2 lessons
├── <Book Title>/index.html          # 24 interactive book summaries

```

## Subjects

| Subject | Lessons | Accent | Quiz | Flashcards |
|---------|---------|--------|------|------------|
| Economics | 12 | Teal | 8 real (L1-2), 4 placeholder (L3-12) | 8 cards/lesson (L1-12) |
| Business Studies | 8 | Amber | 8 real (L1-2), 4 placeholder (L3-8) | 3-6 cards/lesson (L1-8) |
| ICT | 2 | Purple | 8 real (L1-2) | 8 cards/lesson (L1-2) |

Add subjects via `SUBJECTS_DATA` in `index.html` (`// == TODO:`).

## Books Library

24 books, 5 categories:
- **Productivity**: Atomic Habits, Building a Second Brain, Deep Work, Hyperfocus, Mastery
- **Philosophy**: Ego Is the Enemy, The Power of Now, Book of Wisdom
- **Psychology**: Psycho-Cybernetics, What Every BODY Is Saying, Read People Like a Book, Surrounded by Idiots, Surrounded By Psychopaths, The Concise Laws of Human Nature, The Laws of Human Nature
- **Power**: The 48 Laws of Power, Daily Robert Greene, The Art of Seduction, The Prince
- **Finance**: Money Unlocked, The Changing World Order, Rich Dad Poor Dad, The Millionaire Master Plan, The Psychology of Money

## Study Notes

- **Business Studies** (8): Basis of Business & Environment, Social Responsibility & Business Ethics, Business-Government Relations & Consumer Protection, Business Organizations, Entrepreneurship, Money and Financial Institutions, Insurance, Communication
- **Economics** (12): Introduction to Economics, Demand Supply & Market Equilibrium, Government Intervention in Markets, Production Cost & Market Structures, National Accounting, Macroeconomic Concepts, Price Inflation Money & Financial System, Market Failure Government & Public Finance, Protectionism & Foreign Investments, Foreign Exchange & Balance of Payments, Economic Growth Development & Labour, Sri Lankan Economy Post-Independence
- **ICT** (2): Introduction to Python Programming (variables, data types, I/O), Control Flow: Conditionals & Loops (if/elif/else, for/while, operators)

## Usage

- **Dashboard** — XP level, badges, streak, last lesson, completion rings, quiz scores (auto-updates on progress/quiz events)
- **Study Hub** — Expand subject panels, Start to open lesson, Quiz to test, Flashcards for SRS review
- **Book Library** — Filter by category, search by title, grid/list toggle
- **Flashcard modal** — Click/Space/Enter to flip, 1/2/3 or Easy/Hard/Again to rate (intervals: 1min/30min/24h). Escape to close
- **Quiz modal** — 1-4 to answer, instant feedback with explanations, best score tracked in localStorage
- **Status tracking** — Click status pill to cycle: Not Started → In Progress → Done

### ICT Terminal

Embed per-lesson. Blank editor starts empty — students write from scratch.

```html
<script>window.NEXO_TERMINAL_CONFIG={lang:'python',lesson:{title:'Your Challenge',challenge:'...',expectedOutput:'...',hint:'...',starterCode:{python:'',pseudocode:'',javascript:''}}};</script>
<script src="https://skulpt.org/js/skulpt.min.js"></script>
<script src="https://skulpt.org/js/skulpt-stdlib.js"></script>
<div id="nexo-terminal-mount"></div>
<script src="../../components/nexo-terminal-embed.js"></script>
```

iframe: `<iframe src="../../components/nexo-terminal.html?lesson=py-hello-world" width="100%" height="600px" style="border:none;border-radius:4px;"></iframe>`

Presets: `py-hello-world`, `py-variables`, `py-input`, `py-if-else`, `py-for-loop`, `py-while-loop`, `py-functions`, `psc-variables`, `psc-loop`

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Cmd+K` / `Ctrl+K` | Open global search |
| `/` | Focus search bar |
| `↑`/`↓` | Navigate results/cards |
| `Enter` | Open selected result |
| `Space`/`Enter` | Flip flashcard |
| `Escape` | Close overlay / clear search |
| `1` `2` `3` `4` | Quiz answer A/B/C/D |
| `1` `2` `3` | Rate flashcard Easy/Hard/Again |
| `Ctrl+Enter` | Run code (terminal) |
| `Ctrl+L` | Clear output (terminal) |
| `Ctrl+R` | Reset editor (terminal) |

## Technical Notes

- Single-file HTML: all CSS/JS inline in `index.html`
- Data constants: `BOOKS_DATA`, `SUBJECTS_DATA`, `QUIZ_DATA`, `FLASHCARDS_DATA`
- localStorage (`nexo_*` prefix): lesson status, quiz best scores, flashcard SRS data, streak, last lesson, theme/bookmarks, XP, badges
- Flashcard SRS: `again`=1min, `hard`=30min, `easy`=24h; per-card `{ease,due}` stored as `nexo_fc_{subject}_{lesson}_{idx}`
- Canvas particles: 20 on mobile (hub only; lesson pages omit for perf)
- ICT Terminal: Skulpt CDN for Python, blank editor, error display with line numbers, requestAnimationFrame-debounced highlighting
- Component IDs use `nxt-` prefix
- `NEXO_MOCK_USER` with `// BACKEND:` marks integration points for auth

## Deployment

Static site on GitHub Pages: https://himansasadeworiginal-afk.github.io/NEXO/

```bash
git add -A && git commit -m "Update NEXO" && git push origin main
```

`.nojekyll` at root for proper file serving.

## Roadmap

### Phase 1 — Done
- Bookmarks & Reading List, Lesson Completion Tracker, Quiz Best Score Badges, ICT Section + Terminal, Theme Customiser

### Phase 2
- [x] Flashcard System — CSS flip cards, easy/hard/again, SRS intervals in localStorage
- [x] Study Dashboard — Streak, rings, quiz summary, last lesson
- [x] Glossary System — Per-subject keyword tooltips + glossary page
- [x] Subject Progress Bars — Live bars updating with lesson status
- [x] XP & Achievement Badges — Earn XP via lessons, quizzes, streaks, flashcards; 12 badges with level progression and unlock notifications

### Phase 3 — Content
- [ ] Fill all quiz placeholders (Econ L3-12, Business L3-8)
- [ ] ICT lesson content (algorithms, data types, networks, hardware)
- [ ] Glossary data for all subjects

### Phase 4 — Hard
- [ ] Timed Exam Mode — Time limit, randomized questions, no mid-exam feedback, full results report
- [ ] Past Paper / Structured Questions — Mark allocations, textarea answers, model answer reveal, self-mark checklist
- [ ] Study Planner — Exam date → day-by-day revision schedule
- [ ] Concept Map Viewer — Interactive SVG node-link diagrams
- [ ] Global Cmd+K Search — Spotlight overlay (needs full content first)

## Account System

`account.html` + sidebar in `index.html`.

**Account page**: Left nav (6 sections): Overview, My Progress, Quiz History, Bookmarks, Activity Feed, Premium. All data from `NEXO_MOCK_USER`. Mobile: sidebar collapses to horizontal tabs.

**Sidebar** (index.html): Avatar button in navbar → 320px slide-in panel with quick stats (2x2 grid), subject progress bars, recent activity (3 items), quick links, full profile link. Escape closes.

## Credits

Summaries, interactive pages, and quizzes built from notes on each respective work.
