# NEXO 2.0

Turn books and notes into interactive learning experiences.

<p align="center">
  <a href="https://himansasadeworiginal-afk.github.io/NEXO/">
    <img src="https://img.shields.io/badge/Live-GitHub%20Pages-2ea84c?style=for-the-badge" alt="Live on GitHub Pages">
  </a>
</p>

## Overview

Nexo is a self-contained, single-file HTML learning platform — no frameworks, no CDN, no server needed. Open `index.html` in any browser and start learning, or visit the **[live site](https://himansasadeworiginal-afk.github.io/NEXO/)**.

It has three main sections:
- **Study Hub** — structured lessons organized by subject, each with interactive summary pages and built-in quizzes
- **Book Library** — 24 interactive book summaries filterable by category
- **ICT Terminal** — in-browser code playground for programming lessons (blank editor, students write their own code)

## Features

- **Global Navigation Bar** — Fixed smart-hide navbar with frosted glass effect, gradient logo, section links with active detection (IntersectionObserver), and action icons
- **Global Search (Cmd+K)** — Full-screen search overlay that searches lessons, books, and glossary with scored results, highlight matching, keyboard navigation, and recent searches
- **Theme Colour Wheel** — Accent colour picker (5 colours), text size presets (S/M/L), and reduced motion toggle — all persisted to localStorage
- **Study Hub** — Subject-first layout with collapsible panels, progress tracking, and lesson cards
- **Interactive Quizzes** — Multiple-choice quiz per lesson with instant feedback, explanations, and best score tracking (stored in localStorage)
- **Book Library** — All 24 book summaries with category filters, search, and grid/list toggle
- **ICT Terminal** — Blank-editor code playground with Python (Skulpt), Pseudocode tracer, and JavaScript sandbox execution — starts empty so students write their own code
- **Progress Tracking** — Mark lessons as Not Started / In Progress / Done; progress rings per subject
- **Keyboard Shortcuts** — `Cmd+K` for global search, `/` to focus inline search, `Escape` to clear, arrow keys to navigate, `1-4` for quiz answers, `Ctrl+Enter` to run code
- **Expand/Collapse All** — Toggle all subject panels at once
- **Ambient Environment** — Particle network, floating orbs, mouse-reactive glow, animated gradients, noise texture
- **Dark Theme** — Green/teal/purple/amber color palette with smooth animations throughout
- **Count-up Animation** — Hero stats animate on scroll into view
- **Typewriter Effect** — Subtitle types itself in on page load
- **Sticky Subject Nav** — Quick-jump pill nav appears when scrolling past the hero
- **Scroll Progress** — Gradient progress bar with percentage tooltip on hover
- **Account Sidebar** — Slide-in panel with quick stats, subject progress, recent activity, and links to full profile
- **Mobile Responsive** — Hamburger menu, adaptive layout, reduced particle count on mobile
- **Fully Offline** — Everything runs from a single HTML file via `file://` protocol

## Structure

```
nexo 2.0/
├── index.html                       # Main app — hub, study hub, book library, quizzes
├── account.html                     # Full account/profile page with progress, history, bookmarks
├── README.md
├── nexo-2.0-upgrade-prompt.txt
├── nexo-ict-terminal-prompt.txt
├── nexo-global-nav-prompt.txt
├── components/
│   ├── nexo-terminal.html           # Standalone iframe-ready terminal
│   └── nexo-terminal-embed.js       # Embeddable terminal via <script> tag
├── <Book Title>/                    # Each book's interactive summary folder
│   ├── index.html
│   ├── <summary>.txt
│   └── <book>.(pdf|epub)
├── Study Notes/
│   ├── Business/                    # Business Studies lessons (1-8)
│   │   └── <n>/
│   │       ├── index.html
│   │       └── <n>.pdf
│   ├── Econ/                        # Economics lessons (1-12)
│   │   └── <n>/
│   │       ├── index.html
│   │       └── <n>.pdf
│   └── ICT/                         # ICT / Programming lessons
│       ├── 1/ (Introduction to Python Programming)
│       └── 2/ (Control Flow: Conditionals & Loops)
└── ...
```

## Subjects

| Subject | Lessons | Accent Color | Quiz Questions |
|---------|---------|-------------|----------------|
| Economics | 12 | Teal | 8 real (L1-2) + 4 placeholder (L3-12) |
| Business Studies | 8 | Amber | 8 real (L1-2) + 4 placeholder (L3-8) |
| ICT | 2 | Purple | 8 real (L1-2) |

> Future subjects slot into `SUBJECTS_DATA` in `index.html` at the marked `// == TODO:` comment.

## Books Library

24 books across 5 categories:

| Category | Books |
|----------|-------|
| Productivity | Atomic Habits, Building a Second Brain, Deep Work, Hyperfocus, Mastery |
| Philosophy | Ego Is the Enemy, The Power of Now, Book of Wisdom |
| Psychology | Psycho-Cybernetics, What Every BODY Is Saying, Read People Like a Book, Surrounded by Idiots, Surrounded By Psychopaths, The Concise Laws of Human Nature, The Laws of Human Nature |
| Power | The 48 Laws of Power, Daily Robert Greene, The Art of Seduction, The Prince |
| Finance | Money Unlocked, The Changing World Order, Rich Dad Poor Dad, The Millionaire Master Plan, The Psychology of Money |

## Study Notes

### Business Studies (8 Lessons)
1. Basis of Business & Environment
2. Social Responsibility & Business Ethics
3. Business-Government Relations & Consumer Protection
4. Business Organizations
5. Entrepreneurship
6. Money and Financial Institutions
7. Insurance
8. Communication

### Economics (12 Lessons)
1. Introduction to Economics
2. Demand, Supply & Market Equilibrium
3. Government Intervention in Markets
4. Production, Cost & Market Structures
5. National Accounting
6. Macroeconomic Concepts
7. Price, Inflation, Money & Financial System
8. Market Failure, Government & Public Finance
9. Protectionism & Foreign Investments
10. Foreign Exchange & Balance of Payments
11. Economic Growth, Development & Labour
12. Sri Lankan Economy Post-Independence

### ICT — Programming (2 Lessons)
1. Introduction to Python Programming — variables, data types, input/output, first programs
2. Control Flow: Conditionals & Loops — if/elif/else, for/while loops, comparison operators

## Usage

Open `index.html` in any browser or visit the **[live site](https://himansasadeworiginal-afk.github.io/NEXO/)**. The app loads immediately — no install, no build, no server.

- **Study Hub tab** — Browse subjects, expand panels, click Start to open a lesson or Quiz to test your knowledge
- **Book Library tab** — Browse 24 book summaries, filter by category, search by title or author
- **Quiz modal** — Answer questions, get instant feedback, track your best score (stored in your browser's localStorage)
- **Status tracking** — Click the status pill on any lesson card to cycle: Not Started → In Progress → Done

### ICT Terminal Usage

Each ICT lesson page embeds a terminal configured for that lesson. The editor starts **blank** — students write their own code from scratch.

```html
<script>
  window.NEXO_TERMINAL_CONFIG = {
    lang: 'python',
    lesson: {
      title: 'Your Challenge',
      challenge: 'Describe what the student needs to build.',
      expectedOutput: 'Expected output text',
      hint: 'A helpful hint.',
      starterCode: { python: '', pseudocode: '', javascript: '' }
    }
  };
</script>
<script src="https://skulpt.org/js/skulpt.min.js"></script>
<script src="https://skulpt.org/js/skulpt-stdlib.js"></script>
<div id="nexo-terminal-mount"></div>
<script src="../../components/nexo-terminal-embed.js"></script>
```

Or use the standalone iframe version:
```html
<iframe src="../../components/nexo-terminal.html?lesson=py-hello-world"
  width="100%" height="600px" style="border:none;border-radius:4px;"></iframe>
```

### Pre-loaded Challenges
Challenges are defined per-lesson in `NEXO_TERMINAL_CONFIG`. Built-in presets (with blank editors):
- Python: `py-hello-world`, `py-variables`, `py-input`, `py-if-else`, `py-for-loop`, `py-while-loop`, `py-functions`
- Pseudocode: `psc-variables`, `psc-loop`

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Cmd+K` / `Ctrl+K` | Open global search overlay |
| `/` | Focus search bar |
| `Escape` | Clear search / reset view / close overlay |
| `↑` / `↓` | Navigate results / lesson cards |
| `Enter` | Open selected search result |
| `1` `2` `3` `4` | Select quiz answer A/B/C/D |

### Terminal Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl+Enter` | Run code |
| `Ctrl+L` | Clear output |
| `Ctrl+R` | Reset editor (clear code) |
| `Tab` | Indent (4 spaces) |
| `Shift+Tab` | Unindent |
| `Ctrl+/` | Toggle line comment |
| `Ctrl+Plus` | Increase font size |
| `Ctrl+Minus` | Decrease font size |

## Technical Notes

- Single-file HTML — everything inline (HTML + CSS + JS)
- All data in JS constants at the top of the script: `BOOKS_DATA`, `SUBJECTS_DATA`, `QUIZ_DATA`
- localStorage keys use the `nexo_` prefix to avoid collisions
- Canvas particle system auto-reduces to 20 particles on mobile (main hub only; lesson pages omit particles for performance)
- Data-driven design — adding a subject only requires a new entry in `SUBJECTS_DATA`
- ICT Terminal uses Skulpt (CDN) for Python execution, runs entirely client-side
- ICT Terminal editor starts blank — no pre-written code; students write everything from scratch
- Error messages are parsed and displayed with line numbers, error type, and student-friendly tips
- Syntax highlighting is debounced via `requestAnimationFrame` to reduce lag while typing
- Error lines are highlighted in the editor with a red border after a failed run
- All component IDs use the `nxt-` prefix to avoid name collisions

## Deployment

This is a static site hosted on **GitHub Pages**. The live site is at:

➡️ **https://himansasadeworiginal-afk.github.io/NEXO/**

To deploy updates:

```bash
# From the nexo directory:
git add -A
git commit -m "Update NEXO"
git push origin main
```

Changes go live automatically after pushing to `main`. Make sure `.nojekyll` is present at the root for proper file serving.

## Phase 1 — Quick Wins

| Task | Difficulty | Status |
|------|-----------|--------|
| **Bookmarks & Reading List** — Bookmark icon on every card, saved to localStorage. "My List" tab in the hub nav. | Easy | Done |
| **Lesson Completion Tracker** — Dot/pill on each lesson card cycles: Not started → In Progress → Done. Saves to localStorage. | Easy | Done |
| **Quiz Best Score Badges** — Show "Best: 7/8" on lesson cards after a quiz is completed, pulled from existing localStorage quiz data. | Easy | Done |
| **ICT Section + Terminal Component** — Add ICT as a new subject. Embed the nexo-terminal in programming lessons. Skulpt for Python execution. | Easy | Done |
| **Theme Customiser** — Accent colour picker (green/teal/purple/amber), font size toggle, reduced-motion switch. All in localStorage. | Easy | Done |

## Phase 2 — Meaningful Features (half a day each)

| Task | Difficulty | Status |
|------|-----------|--------|
| **Glossary System** — Per-subject keyword lists with inline tooltip popovers on lesson pages. Standalone glossary page per subject. | Medium | Pending |
| **Subject Progress Bars** — Live progress bars on each subject panel in the Study Hub, updating as lessons are marked done. | Medium | Pending |
| **Flashcard System** — CSS flip cards with Easy/Hard/Again buttons. FLASHCARDS array per lesson. Deck overview with due count. | Medium | Pending |
| **Study Dashboard Home Screen** — Personalised home for returning users: streak, last lesson, completion rings per subject, quiz scores summary. | Medium | Pending |
| **Timed Exam Mode** — User picks subject + time limit. Randomised questions, no mid-exam feedback, full results report at the end. | Medium | Pending |
| **Past Paper / Structured Questions** — Written practice questions with mark allocations. Textarea for answers, "Show model answer" reveal, self-mark checklist. | Medium | Pending |
| **XP & Achievement Badges** — Earn XP for completing lessons, acing quizzes, streaks. Badge collection shown in the Study Dashboard. | Medium | Pending |

## Phase 3 — Content Work (writing-heavy)

| Task | Difficulty | Status |
|------|-----------|--------|
| **Fill All Quiz Placeholders** — Replace TODO placeholder questions with real curriculum questions across all Economics and Business lessons. | Content | Pending |
| **Add ICT Lesson Notes Content** — Write the actual lesson HTML pages for ICT — algorithms, data types, networks, hardware, etc. | Content | Pending |
| **Populate Glossary Data** — Write the GLOSSARY_DATA arrays for Economics, Business, and ICT — terms, definitions, lesson references. | Content | Pending |

## Phase 4 — Hard / Future (full day+)

| Task | Difficulty | Status |
|------|-----------|--------|
| **Study Planner** — User sets an exam date + subjects. NEXO generates a day-by-day revision schedule covering all lessons in time. | Hard | Pending |
| **Concept Map Viewer** — Interactive SVG node-link diagrams per lesson. Clickable nodes, pan/zoom, defined as JSON edge lists. | Hard | Pending |
| **Global Cmd+K Search** — Spotlight-style overlay searching all lessons, glossary, books. Arrow-key navigation, grouped results. Build last — needs full content first. | Hardest | Pending |

## Account & Profile System

NEXO includes a full account page (`account.html`) and a slide-in sidebar panel integrated into `index.html` for viewing study progress at a glance.

### Account Page (`account.html`)

- **Left sidebar navigation** — fixed sidebar (220px) with avatar, user info, and 6 navigation sections: Overview, My Progress, Quiz History, Bookmarks, Activity Feed, Premium
- **Overview** — stat cards (streak, lessons done, quizzes taken, avg score), subject progress bars, recent activity feed
- **My Progress** — detailed per-subject breakdown with progress bars and lesson status dot grids
- **Quiz History** — table of all quiz attempts with score bars and color-coded results
- **Bookmarks** — grid of bookmarked books and lessons
- **Activity Feed** — full timeline view with day grouping and type filters
- **Premium** — upgrade UI with feature list and mock pricing
- **Mobile responsive** — sidebar collapses to horizontal tab bar on small screens
- **All data mocked** — `NEXO_MOCK_USER` object with `// BACKEND:` comments marking every integration point

### Account Sidebar (in `index.html`)

- **Avatar button** — in the navbar, 30px circle with user initials
- **Slide-in panel** — 320px wide, slides from right, dark overlay behind
- **Quick stats** — 2x2 grid of compact stat cards
- **Subject progress** — compact progress bars per subject
- **Recent activity** — last 3 items
- **Quick links** — icon buttons for Quiz History, Bookmarks, Premium sections
- **View full profile** link → `account.html`
- **Keyboard shortcut**: Escape closes the sidebar

## Credits

Summaries, interactive pages, and quizzes built from notes on each respective work.
