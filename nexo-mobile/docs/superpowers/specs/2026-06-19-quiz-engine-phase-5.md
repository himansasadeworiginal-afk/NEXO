# Phase 5: Quiz Engine Overhaul

## Goals
- Replace all placeholder quiz questions (1 each) with full 8-question sets
- Add an end-of-quiz review screen showing all answers with correct/incorrect indicators
- Add explicit pass/fail threshold (60%) with different UX outcomes
- No timer, no random mode, no history graphs

## Data Changes (`src/constants/nexoData.js`)

### Placeholder lessons to fill
**Economics 3-12** (10 lessons), **Business 3-8** (6 lessons) — currently have 1 placeholder question each. Replace with 8 real questions per lesson, matching the existing format:
```js
{q: '<question>', options: ['A','B','C','D'], answer: <0-3>, explain: '<explanation>'}
```

Questions must be based on the lesson title/description from `SUBJECTS_DATA`. Each lesson's question set covers distinct subtopics from that lesson's syllabus.

### No structural changes
`QUIZ_DATA` object keys, nesting (subjectId → lessonId → array), option format, and `answer` index are preserved. No new fields added.

## UI Changes (`src/screens/QuizScreen.js`)

### New state
- `reviewMode` (boolean) — shows review screen after all questions answered
- `answers` (array) — records `{ selected, isCorrect }` per question for the review

### Modified flow
```
question → question → ... → last question answered
    → REVIEW SCREEN (all questions listed)
        → "See Results" button
            → RESULTS SCREEN (existing, unchanged)
                → Retake or Close
```

### Review screen
- Full-screen ScrollView after the last question is answered
- Shows each question with:
  - Question number and text
  - All 4 options with correct highlighted green, user's wrong pick (if any) highlighted rose
  - Explanation block below each question
- Footer: single green "See Results" button
- No progress bar or header (back to the start of the quiz flow)

### Pass/fail UX
- Threshold: 60% (i.e., ≥5/8 correct)
- **Pass**: `getResultsFeedback()` returns `{ label, color: '#4cd96b' }`, trophy icon green, "Great work!" message, XP award displayed
- **Fail**: `getResultsFeedback()` returns `{ label, color: '#d4a040' }`, revised message encouraging review and retake, XP still awarded (participation + per-correct)
- Both paths use the same results screen component (existing), just different colors/text

### Visual styling
- Review screen uses existing style patterns: `#080b12` bg, `#111625` cards, `#4cd96b` correct borders, `#d4606a` wrong borders, `#90b090` text
- Each review item is a card with question text, options grid, explanation block
- Pass/fail uses existing `feedback.color` in results screen — no new components

## Files Modified
1. `src/constants/nexoData.js` — replace placeholder quiz data with full 8-question sets for econ 3-12, bus 3-8
2. `src/screens/QuizScreen.js` — add review screen state, review screen component, pass-through to existing results
3. `src/context/AppContext.js` — no changes needed (existing `saveQuizScore` and `checkAndAwardBadges` work as-is)

## Verification
- `npx expo export --platform web` succeeds
- All lesson quizzes show 8 questions (not 1)
- Review screen appears after last question
- Results screen appears after "See Results"
- Retake flow works end-to-end
