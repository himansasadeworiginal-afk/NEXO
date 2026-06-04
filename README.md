# NEXO 2.0

Turn books and notes into interactive learning experiences.

## Overview

Nexo is a self-contained, single-file HTML learning platform — no frameworks, no CDN, no server needed. Open `index.html` in any browser and start learning.

It has two main sections:
- **Study Hub** — structured lessons organized by subject, each with interactive summary pages and built-in quizzes
- **Book Library** — 24 interactive book summaries filterable by category

## Features

- **Study Hub** — Subject-first layout with collapsible panels, progress tracking, and lesson cards
- **Interactive Quizzes** — Multiple-choice quiz per lesson with instant feedback, explanations, and best score tracking (stored in localStorage)
- **Book Library** — All 24 book summaries with category filters, search, and grid/list toggle
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
├── <Book Title>/             # Each book's interactive summary folder
│   ├── index.html
│   ├── <summary>.txt
│   └── <book>.(pdf|epub)
├── Study Notes/
│   ├── Business/             # Business Studies lessons (1-8)
│   │   ├── <n>/
│   │   │   ├── index.html    # or lesson<n>.html
│   │   │   └── <n>.pdf
│   └── Econ/                 # Economics lessons (1-12)
│       ├── <n>/
│       │   ├── index.html
│       │   └── <n>.pdf
└── ...
```

## Subjects

| Subject | Lessons | Accent Color | Quiz Questions |
|---------|---------|-------------|----------------|
| Economics | 12 | Teal | 8 real (L1-2) + 4 placeholder (L3-12) |
| Business Studies | 8 | Amber | 8 real (L1-2) + 4 placeholder (L3-8) |

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

## Usage

Open `index.html` in any browser. The app loads immediately — no install, no build, no server.

- **Study Hub tab** — Browse subjects, expand panels, click Start to open a lesson or Quiz to test your knowledge
- **Book Library tab** — Browse 24 book summaries, filter by category, search by title or author
- **Quiz modal** — Answer questions, get instant feedback, track your best score (stored in your browser's localStorage)
- **Status tracking** — Click the status pill on any lesson card to cycle: Not Started → In Progress → Done

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search bar |
| `Escape` | Clear search / reset view |
| `↑` / `↓` | Navigate lesson cards (when search focused) |
| `1` `2` `3` `4` | Select quiz answer A/B/C/D |

## Technical Notes

- Single-file HTML — everything inline (HTML + CSS + JS)
- All data in JS constants at the top of the script: `BOOKS_DATA`, `SUBJECTS_DATA`, `QUIZ_DATA`
- localStorage keys use the `nexo_` prefix to avoid collisions
- Canvas particle system auto-reduces to 20 particles on mobile
- Data-driven design — adding a subject only requires a new entry in `SUBJECTS_DATA`

## Credits

Summaries, interactive pages, and quizzes built from notes on each respective work.
