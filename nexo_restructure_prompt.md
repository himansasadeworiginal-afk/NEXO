## NEXO — Project File Structure Reorganization

You are reorganizing the NEXO project into a clean folder structure where each major section lives in its own self-contained folder. This is a file move and link-update task — you are NOT rewriting any page content or styling. Read every file carefully before touching anything. Every path change must be tracked and every internal link updated to match.

---

### WHAT YOU ARE DOING

Moving all section content into dedicated top-level folders, creating a hub index.html for each section, and updating every internal link across the entire project so nothing is broken after the move.

The main index.html at the project root stays exactly as it is — same code, same features, same design. You are only reorganizing what lives inside subfolders.

---

### FINAL FOLDER STRUCTURE

After this task is complete, the project must look exactly like this:

```
nexo/
│
├── index.html                          ← UNCHANGED (main NEXO hub)
├── account.html                        ← UNCHANGED (account page)
├── README.md
├── .gitignore
├── .nojekyll
│
├── shared/
│   └── (empty for now — reserved for future shared assets)
│
├── economics/
│   ├── index.html                      ← NEW: Economics section hub
│   ├── lessons/
│   │   ├── 1/index.html                ← MOVED from Study Notes/Econ/1/
│   │   ├── 2/index.html                ← MOVED from Study Notes/Econ/2/
│   │   ├── 3/index.html
│   │   ├── 4/index.html
│   │   ├── 5/index.html
│   │   ├── 6/index.html
│   │   ├── 7/index.html
│   │   ├── 8/index.html
│   │   ├── 9/index.html
│   │   ├── 10/index.html
│   │   ├── 11/index.html
│   │   └── 12/index.html               ← MOVED from Study Notes/Econ/12/
│
├── business/
│   ├── index.html                      ← NEW: Business Studies section hub
│   ├── lessons/
│   │   ├── 1/index.html                ← MOVED from Study Notes/Business/1/
│   │   ├── 2/index.html
│   │   ├── 3/index.html
│   │   ├── 4/index.html
│   │   ├── 5/index.html
│   │   ├── 6/index.html
│   │   ├── 7/index.html
│   │   └── 8/index.html                ← MOVED from Study Notes/Business/8/
│
├── ict/
│   ├── index.html                      ← NEW: ICT section hub
│   ├── components/
│   │   └── nexo-terminal.html          ← MOVED from Study Notes/ICT/components/
│   ├── lessons/
│   │   ├── 1/index.html                ← MOVED from Study Notes/ICT/1/
│   │   ├── 2/index.html
│   │   ├── 3/index.html
│   │   ├── 4/index.html
│   │   ├── 5/index.html
│   │   ├── 6/index.html
│   │   ├── 7/index.html
│   │   ├── 8/index.html
│   │   ├── 9/index.html
│   │   ├── 10/index.html
│   │   ├── 11/index.html
│   │   └── 12/index.html               ← MOVED from Study Notes/ICT/12/
│
├── books/
│   ├── index.html                      ← NEW: Books section hub
│   ├── 48-laws-of-power/               ← MOVED from "48 Laws of power/"
│   │   └── index.html
│   ├── atomic-habits/                  ← MOVED from "atomic habbits/"
│   │   └── index.html
│   ├── book-of-wisdom/                 ← MOVED from "Book of Wisdom/"
│   │   └── index.html
│   ├── building-a-second-brain/        ← MOVED from "Building a second brain/"
│   │   └── index.html
│   ├── daily-robert-greene/            ← MOVED from "Daily Robert Greene/"
│   │   └── index.html
│   ├── deep-work/                      ← MOVED from "Deep Work Rules..."
│   │   └── index.html
│   ├── ego-is-the-enemy/               ← MOVED from "Ego Is the Enemy..."
│   │   └── index.html
│   ├── hyperfocus/                     ← MOVED from "Hyperfocus/"
│   │   └── index.html
│   ├── mastery/                        ← MOVED from "Mastery/"
│   │   └── index.html
│   ├── money-unlocked/                 ← MOVED from "Money Unlocked..."
│   │   └── index.html
│   ├── power-of-now/                   ← MOVED from "Power of Now/"
│   │   └── index.html
│   ├── psycho-cybernetics/             ← MOVED from "Psycho-Cybernetics..."
│   │   └── index.html
│   ├── read-people-like-a-book/        ← MOVED from "Read People Like a Book/"
│   │   └── index.html
│   ├── rich-dad-poor-dad/              ← MOVED from "Rich Dad Poor Dad/"
│   │   └── index.html
│   ├── surrounded-by-idiots/           ← MOVED from "Surrounded by Idiots/"
│   │   └── index.html
│   ├── surrounded-by-psychopaths/      ← MOVED from "Surrounded By Psychopaths/"
│   │   └── index.html
│   ├── the-art-of-seduction/           ← MOVED from "The Art of Seduction/"
│   │   └── index.html
│   ├── the-changing-world-order/       ← MOVED from "The Changing World Order..."
│   │   └── index.html
│   ├── the-concise-laws/               ← MOVED from "The Concise Laws of Human Nature/"
│   │   └── index.html
│   ├── the-laws-of-human-nature/       ← MOVED from "The Laws of Human Nature/"
│   │   └── index.html
│   ├── the-millionaire-master-plan/    ← MOVED from "The Millionaire Master Plan/"
│   │   └── index.html
│   ├── the-prince/                     ← MOVED from "The Prince/"
│   │   └── index.html
│   ├── the-psychology-of-money/        ← MOVED from "The Psychology of Money/"
│   │   └── index.html
│   └── what-every-body-is-saying/      ← MOVED (if exists)
│       └── index.html
│
└── account/
    └── index.html                      ← account.html MOVED here and renamed
                                           (account.html at root becomes a redirect)
```

---

### STEP-BY-STEP TASK LIST

Work through these steps in order. Complete and verify each step before moving to the next.

---

#### STEP 1 — Rename and sanitize folder names for book moves

Before moving any book folders, rename them to the clean slug names shown in the structure above. Folder names with spaces, special characters, typos, or excessively long names must be renamed:

- "48 Laws of power" → "48-laws-of-power"
- "atomic habbits" → "atomic-habits" (fix typo)
- "Book of Wisdom" → "book-of-wisdom"
- "Building a second brain" → "building-a-second-brain"
- "Daily Robert Greene" → "daily-robert-greene"
- "Deep Work Rules for Focused Success in a Distracted World..." → "deep-work"
- "Ego Is the Enemy (Ryan Holiday)" → "ego-is-the-enemy"
- "Hyperfocus" → "hyperfocus"
- "Mastery" → "mastery"
- "Money Unlocked (John Lee)" → "money-unlocked"
- "Power of Now" → "power-of-now"
- "Psycho-Cybernetics (Maxwell Maltz)" → "psycho-cybernetics"
- "Read People Like a Book" → "read-people-like-a-book"
- "Rich Dad Poor Dad" → "rich-dad-poor-dad"
- "Surrounded by Idiots" → "surrounded-by-idiots"
- "Surrounded By Psychopaths" → "surrounded-by-psychopaths"
- "The Art of Seduction" → "the-art-of-seduction"
- "The Changing World Order Why Nations Succeed and Fail..." → "the-changing-world-order"
- "The Concise Laws of Human Nature" → "the-concise-laws"
- "The Laws of Human Nature" → "the-laws-of-human-nature"
- "The Millionaire Master Plan" → "the-millionaire-master-plan"
- "The Prince" → "the-prince"
- "The Psychology of Money" → "the-psychology-of-money"

After renaming, move all book folders into the books/ directory.

---

#### STEP 2 — Move Economics lesson files

Move the contents of Study Notes/Econ/ into economics/lessons/:
- Study Notes/Econ/1/ → economics/lessons/1/
- Study Notes/Econ/2/ → economics/lessons/2/
- ... (all 12 lessons)

After moving, delete the now-empty Study Notes/Econ/ directory.

---

#### STEP 3 — Move Business lesson files

Move the contents of Study Notes/Business/ into business/lessons/:
- Study Notes/Business/1/ → business/lessons/1/
- Study Notes/Business/2/ → business/lessons/2/
- ... (all 8 lessons)

Note: some Business lesson files are named lesson4.html, lesson5.html etc. instead of index.html. Rename them all to index.html during the move so every lesson follows the same pattern.

After moving, delete the now-empty Study Notes/Business/ directory.

---

#### STEP 4 — Move ICT lesson files

Move the contents of Study Notes/ICT/ into ict/:
- Study Notes/ICT/components/ → ict/components/
- Study Notes/ICT/1/ → ict/lessons/1/
- Study Notes/ICT/2/ → ict/lessons/2/
- ... (all 12 lessons)

After moving, delete the now-empty Study Notes/ICT/ directory.
After all Study Notes subfolders are empty, delete the Study Notes/ directory entirely.

---

#### STEP 5 — Move account.html

Move account.html from the project root into account/index.html.
Create a redirect file at the original location (account.html in root) so any existing links still work:

```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0; url=account/index.html">
  <title>Redirecting...</title>
</head>
<body></body>
</html>
```

---

#### STEP 6 — Update all internal links in moved lesson files

After every file move, update the relative paths inside those files.

For every lesson file that was moved, check and fix these link types:

**Back to hub links** — any link pointing to the old root index.html:
- Old: `../../index.html` or `../../../index.html` (varies by old depth)
- New economics lessons: `../../../index.html` (economics/lessons/1/ is 3 levels deep)
- New business lessons: `../../../index.html`
- New ICT lessons: `../../../index.html`
- New book pages: `../../index.html` (books/atomic-habits/ is 2 levels deep)

**Terminal component links** in ICT lesson files — the iframe src pointing to the terminal:
- Old: `../components/nexo-terminal.html`
- New: `../../components/nexo-terminal.html` (now at ict/components/)

**Cross-lesson links** — if any lesson links to another lesson in the same subject:
- Update relative paths to match new sibling structure: `../2/index.html` etc.

**Any PDF, image, or asset files** inside lesson folders — these move with the folder so relative paths within the same folder stay correct. Only paths that cross folder boundaries need updating.

---

#### STEP 7 — Update main index.html paths

In the root index.html, find the SUBJECTS_DATA and BOOKS_DATA JavaScript objects. Update every `path` property to point to the new locations:

Economics lessons:
- Old: `"Study Notes/Econ/1/index.html"`
- New: `"economics/lessons/1/index.html"`

Business lessons:
- Old: `"Study Notes/Business/1/index.html"`
- New: `"business/lessons/1/index.html"`

ICT lessons:
- Old: `"Study Notes/ICT/1/index.html"`
- New: `"ict/lessons/1/index.html"`

Books — update every book path:
- Old: `"48 Laws of power/index.html"`
- New: `"books/48-laws-of-power/index.html"`

Apply the same slug mapping from Step 1 to every book path. Go through every single book entry — do not miss any.

Also update the account link in the navbar:
- Old: `"account.html"`
- New: `"account/index.html"`

---

#### STEP 8 — Update account/index.html paths

The account page moved from root to account/index.html — it is now one level deeper. Update:

- Back to NEXO link: was `"index.html"`, now `"../index.html"`
- Any other links to root-level files: add `../` prefix

---

#### STEP 9 — Create the 5 section hub pages

Create a hub index.html for each of the 5 sections. Each hub must:
- Match NEXO's exact visual design (copy the CSS variables, font stack, background, color palette)
- Include the full navbar (copy from root index.html — navbar HTML + hide/show JS + all navbar CSS)
- Include the theme system (copy NEXO_THEMES const + applyTheme function + flash prevention head script)
- Have a "← Back to NEXO" button in the navbar left side that links to `../index.html`
- Be fully self-contained — works by opening directly in a browser via file://

---

**economics/index.html — Economics Hub**

Page title: "Economics" with the subject badge and lesson count.

Hero area (compact, not full-height):
- Heading: "Economics" in gradient text
- Subheading: "12 Lessons · Macroeconomics & Microeconomics"
- A subject description: 1–2 sentences about the economics content

Progress bar (reads from localStorage):
- Count lessons with nexo_lesson_econ-* keys set to "done"
- Show: "{N} / 12 lessons completed" with a full-width animated progress bar
- Color: teal (#2aaf8f)

Lessons grid:
- All 12 lessons as cards in a responsive grid (minmax 300px, 1fr)
- Each card: lesson number badge, title, description, status dot (reads nexo_lesson_{id} from localStorage), "Open" button linking to lessons/{N}/index.html, quiz best score badge (reads nexo_quiz_economics_{id}_best from localStorage)
- Cards are identical in style to lesson cards in root index.html

Search bar at the top of the grid: filters lesson cards by title in real time.

Lesson data (hardcode in the hub — copy from root index.html SUBJECTS_DATA for the economics subject):
```
1  — Introduction to Economics
2  — Demand, Supply & Market Equilibrium
3  — Government Intervention in Markets
4  — Production, Cost & Market Structures
5  — National Accounting
6  — Macroeconomic Concepts
7  — Price, Inflation, Money & Financial System
8  — Market Failure, Government & Public Finance
9  — Protectionism & Foreign Investments
10 — Foreign Exchange & Balance of Payments
11 — Economic Growth, Development & Labour
12 — Sri Lankan Economy Post-Independence
```

---

**business/index.html — Business Studies Hub**

Same structure as economics hub. Amber accent (#d4a040). 8 lessons.

Lesson data:
```
1 — Basis of Business & Environment
2 — Social Responsibility & Business Ethics
3 — Business-Government Relations & Consumer Protection
4 — Business Organizations
5 — Entrepreneurship
6 — Money and Financial Institutions
7 — Insurance
8 — Communication
```

localStorage key prefix for progress: nexo_lesson_business-*
localStorage key prefix for quiz scores: nexo_quiz_business_*

---

**ict/index.html — ICT Hub**

Same structure. Teal accent (#2aaf8f). 12 lessons.

Lesson data:
```
1  — Data Representation
2  — Data Transmission
3  — Hardware
4  — Software
5  — Networks
6  — Security and Ethics
7  — Databases
8  — Algorithms and Pseudocode
9  — Programming Concepts
10 — Python — Basics
11 — Python — Functions and Files
12 — Web Technologies
```

For lessons 8 and 10 (the ones with the terminal): add a small "Terminal" badge on the card in teal, indicating interactive practice is available.

localStorage key prefix: nexo_lesson_ict-*
Quiz prefix: nexo_quiz_ict_*

---

**books/index.html — Books Hub**

Same NEXO design. Amber accent.

Hero area:
- Heading: "Book Library"
- Subheading: "24 Books · Summaries & Key Insights"
- Description: 1 sentence about the book collection

Filter buttons above the grid — one per category:
All | Productivity | Philosophy | Psychology | Power | Finance

Search bar: filters by title or author in real time.

Book grid: all 24 books as cards. Each card:
- Accent line at top (color matches category)
- Title, author, category badge, description (2-line clamp)
- "Open" button linking to the book's folder index.html using the new slug paths
- Bookmark button (reads/writes nexo_bookmark_{id} in localStorage)

Book data: copy the full BOOKS_DATA array from root index.html into this file. Update all path values to use relative paths from books/ — e.g. `"48-laws-of-power/index.html"` (not the full path from root).

---

**account/index.html — Account Page**

This is just the moved account.html. No new hub needed — Step 5 already handles this. Only path updates required (Step 8).

---

#### STEP 10 — Add section cards to root index.html

In root index.html, add a new "Sections" row between the About section and the Categories section. This is a simple 5-card grid (or 4+1 layout) showing the 5 sections:

Each section card:
- Icon, section name, one-line description, lesson/book count
- "Explore →" button linking to the section hub
- Same card style as the About section cards
- Accent color matching the section (Economics=teal, Business=amber, ICT=teal, Books=amber, Account=purple)

Cards:
1. Economics — "12 lessons · Macro & Micro" → economics/index.html
2. Business Studies — "8 lessons · Core business concepts" → business/index.html
3. ICT — "12 lessons · Programming & systems" → ict/index.html
4. Books — "24 books · Summaries & insights" → books/index.html
5. Account — "Your profile & progress" → account/index.html

This section has a heading: "Explore Sections" with a subtitle "Jump directly into a subject or the book library."

---

### PATH REFERENCE TABLE

Use this as a checklist. Every path in this column must be updated:

| File | What changes |
|---|---|
| index.html | All SUBJECTS_DATA paths, all BOOKS_DATA paths, account link |
| account/index.html | Back to NEXO link |
| economics/lessons/*/index.html | Back to hub link, back to root link |
| business/lessons/*/index.html | Back to hub link, back to root link |
| ict/lessons/*/index.html | Back to hub link, terminal component path, back to root link |
| ict/lessons/8/index.html | Terminal iframe src |
| ict/lessons/10/index.html | Terminal iframe src |
| books/*/index.html | Back to hub link, back to root link |

---

### VERIFICATION CHECKLIST

After completing all steps, verify the following before finishing:

- [ ] Opening index.html in a browser — every "Open" button on lesson and book cards navigates correctly
- [ ] Opening economics/index.html — all 12 lesson "Open" buttons work, back button returns to root index.html
- [ ] Opening business/index.html — all 8 lesson "Open" buttons work
- [ ] Opening ict/index.html — all 12 lesson buttons work, lessons 8 and 10 show terminal badge
- [ ] Opening ict/lessons/8/index.html — terminal iframe loads correctly from ict/components/nexo-terminal.html
- [ ] Opening ict/lessons/10/index.html — terminal iframe loads correctly
- [ ] Opening books/index.html — all 24 book cards link correctly to their slug folders
- [ ] Opening account/index.html — back to NEXO link works, no broken assets
- [ ] The old Study Notes/ directory no longer exists
- [ ] No book folder with spaces or typos remains at the root level
- [ ] The root account.html redirect forwards to account/index.html
- [ ] Theme system works on all 5 hub pages (applyTheme reads nexo_theme from localStorage)
- [ ] localStorage keys are consistent — lesson progress saved from root index.html is readable by section hub pages (they use the same nexo_lesson_* key format)

---

### CONSTRAINTS

- Do not change any lesson page content — only move files and update paths
- Do not change root index.html's design, features, or JavaScript — only update data paths and add the Sections row
- Folder names must use lowercase kebab-case slugs — no spaces, no parentheses, no special characters
- All pages must work via file:// protocol with no server
- The shared/ folder is created but left empty — it is reserved for Phase 2 when shared components are extracted
- If any book folder does not contain an index.html (the "Not implemented" folder), create a placeholder index.html matching the style of ICT placeholder pages: title, "Coming soon" message, back buttons to both books/index.html and ../index.html
- After every file move, immediately update all links in that file before moving to the next file — do not batch link updates at the end
