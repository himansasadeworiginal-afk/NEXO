# NEXO 2.0

Turn books and notes into interactive learning experiences.

## Overview

Nexo is a self-contained, single-file HTML learning platform — no frameworks, no CDN, no server needed. Open `index.html` in any browser and start learning.

It has three main sections:
- **Study Hub** — structured lessons organized by subject, each with interactive summary pages and built-in quizzes
- **Book Library** — 24 interactive book summaries filterable by category
- **ICT Terminal** — in-browser code playground for programming lessons

## Features

- **Study Hub** — Subject-first layout with collapsible panels, progress tracking, and lesson cards
- **Interactive Quizzes** — Multiple-choice quiz per lesson with instant feedback, explanations, and best score tracking (stored in localStorage)
- **Book Library** — All 24 book summaries with category filters, search, and grid/list toggle
- **ICT Terminal** — Interactive code editor with Python (Skulpt), Pseudocode tracer, and JavaScript sandbox execution
- **Progress Tracking** — Mark lessons as Not Started / In Progress / Done; progress rings per subject
- **Keyboard Shortcuts** — `/` to search, `Escape` to clear, arrow keys to navigate lesson cards, `1-4` for quiz answers
- **Expand/Collapse All** — Toggle all subject panels at once
- **Ambient Environment** — Particle network, floating orbs, mouse-reactive glow, animated gradients, noise texture
- **Dark Theme** — Green/teal/purple/amber color palette with smooth animations throughout
- **Count-up Animation** — Hero stats animate on scroll into view
- **Typewriter Effect** — Subtitle types itself in on page load
- **Sticky Subject Nav** — Quick-jump pill nav appears when scrolling past the hero
- **Scroll Progress** — Gradient progress bar with percentage tooltip on hover
- **Fully Offline** — Everything runs from a single HTML file via `file://` protocol

## Structure

```
nexo 2.0/
├── index.html                # Main app — hub, study hub, book library, quizzes
├── README.md
├── nexo-2.0-upgrade-prompt.txt
├── nexo-ict-terminal-prompt.txt
├── components/
│   ├── nexo-terminal.html          # Standalone iframe-ready terminal
│   └── nexo-terminal-embed.js      # Embeddable terminal via <script> tag
├── <Book Title>/             # Each book's interactive summary folder
│   ├── index.html
│   ├── <summary>.txt
│   └── <book>.(pdf|epub)
├── Study Notes/
│   ├── Business/             # Business Studies lessons (1-8)
│   │   └── <n>/
│   │       ├── index.html
│   │       └── <n>.pdf
│   ├── Econ/                 # Economics lessons (1-12)
│   │   └── <n>/
│   │       ├── index.html
│   │       └── <n>.pdf
│   └── ICT/                  # ICT / Programming lessons
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

Open `index.html` in any browser. The app loads immediately — no install, no build, no server.

- **Study Hub tab** — Browse subjects, expand panels, click Start to open a lesson or Quiz to test your knowledge
- **Book Library tab** — Browse 24 book summaries, filter by category, search by title or author
- **Quiz modal** — Answer questions, get instant feedback, track your best score (stored in your browser's localStorage)
- **Status tracking** — Click the status pill on any lesson card to cycle: Not Started → In Progress → Done

### ICT Terminal Usage

The NEXO Terminal can be embedded in any lesson page:

```html
<script>
  window.NEXO_TERMINAL_CONFIG = {
    lang: 'python',
    lesson: {
      title: 'Your Challenge',
      challenge: 'Description of the coding task.',
      expectedOutput: 'Expected output text',
      hint: 'Helpful hint for the student.',
      starterCode: {
        python: '# Starter code here\n',
        pseudocode: 'BEGIN\n  // Starter code\nEND',
        javascript: '// Starter code here\n'
      }
    }
  };
</script>
<script src="../../components/nexo-terminal-embed.js"></script>
<div id="nexo-terminal-mount"></div>
```

Or use the standalone iframe version:
```html
<iframe src="../../components/nexo-terminal.html?lesson=py-hello-world"
  width="100%" height="600px" style="border:none;border-radius:4px;"></iframe>
```

### Pre-loaded Challenges
- `py-hello-world`, `py-variables`, `py-input`, `py-if-else`
- `py-for-loop`, `py-while-loop`, `py-functions`
- `psc-variables`, `psc-loop`

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search bar |
| `Escape` | Clear search / reset view |
| `↑` / `↓` | Navigate lesson cards (when search focused) |
| `1` `2` `3` `4` | Select quiz answer A/B/C/D |

### Terminal Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl+Enter` | Run code |
| `Ctrl+L` | Clear output |
| `Ctrl+R` | Reset to starter code |
| `Tab` | Indent (4 spaces) |
| `Shift+Tab` | Unindent |
| `Ctrl+/` | Toggle line comment |
| `Ctrl+Plus` | Increase font size |
| `Ctrl+Minus` | Decrease font size |

## Technical Notes

- Single-file HTML — everything inline (HTML + CSS + JS)
- All data in JS constants at the top of the script: `BOOKS_DATA`, `SUBJECTS_DATA`, `QUIZ_DATA`
- localStorage keys use the `nexo_` prefix to avoid collisions
- Canvas particle system auto-reduces to 20 particles on mobile
- Data-driven design — adding a subject only requires a new entry in `SUBJECTS_DATA`
- ICT Terminal uses Skulpt (CDN) for Python execution, runs entirely client-side
- All component IDs use the `nxt-` prefix to avoid name collisions

## Deployment

This is a static site. Deploy to GitHub Pages:

```bash
# From the nexo directory:
git add -A
git commit -m "Update NEXO"
git push origin main
```

Then enable GitHub Pages in repo Settings → Pages → deploy from `main` branch root.

## Planned Enhancements

- Replace placeholder quiz questions with real questions (Econ L3-12, Business L3-8)
- Add new subjects (Psychology, Philosophy, Power, Finance as structured subjects with lessons)
- More ICT lessons (functions, lists, OOP, algorithms)
- Keyboard shortcut cheat sheet overlay in Study Hub
- Dark/light theme toggle
- Lesson bookmarking / favorites

## Credits

Summaries, interactive pages, and quizzes built from notes on each respective work.
