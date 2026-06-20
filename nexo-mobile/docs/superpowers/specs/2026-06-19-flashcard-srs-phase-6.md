# Phase 6: Flashcard SRS Overhaul

## Goals
- Fill all placeholder flashcard decks with real card sets (economics 3-12, business 3-8)
- Add per-card SRS scheduling with 3-tier delay (Again / Hard / Easy)
- Add swipe gesture UX (left=Again, right=Easy)
- Persist SRS state across sessions via AsyncStorage
- Do not add SM-2 progressive intervals, history graphs, or multi-deck review

## Data Changes (`src/constants/nexoData.js`)

### Placeholder lessons to fill
**Economics 3-12** (10 lessons), **Business 3-8** (6 lessons) — currently have 1 placeholder card each. Replace with ~6 real cards per lesson, matching existing format:
```js
{ front: '<concept/question>', back: '<definition/answer>' }
```
Cards drawn from each lesson's topic area (same source material as Phase 5 quiz content — `SUBJECTS_DATA` lesson titles/descriptions). No new fields added to `FLASHCARDS_DATA`.

## SRS State (`src/context/AppContext.js`)

### New state
- `flashcardSrs` — object keyed by `{subjectId}_{lessonId}_{idx}`, value `{ ease: 0-2, due: <timestamp> | null }`
- Loaded from AsyncStorage key `nexo_fc_srs` on init (JSON parse)
- Saved to AsyncStorage after each rating

### Rating → delay mapping
| Rating | Delay | XP |
|--------|-------|----|
| Again (swipe left / tap) | 1 minute | +10 |
| Hard (tap) | 30 minutes | +15 |
| Easy (swipe right / tap) | 24 hours | +30 |

### Card selection on open
1. Load `flashcardSrs` state
2. Filter flashcards where `due === null || due <= Date.now()`
3. Fisher-Yates shuffle the due cards
4. If zero cards due: show "No cards due right now!" message
5. Track `fcState` locally: current index, due cards array, flipped state

## UI Changes (`src/screens/FlashcardScreen.js`)

### Swipe gesture
- `PanResponder` on the card area tracks horizontal `dx`
- Card follows finger with `Animated.Value` (translateX)
- Beyond 80px threshold: card tilts via rotateZ, shows colored hint overlay (rose for Again left, green for Easy right)
- Release beyond threshold → animate card offscreen → save SRS → load next card
- Release below threshold → spring back to center (`Animated.spring`)
- Tap to flip still works (detect vertical vs horizontal gesture, or short tap with minimal dx)

### Button naming / alignment
- Rename buttons: `Hard` → `Again`, keep `Good` → `Hard`, keep `Easy` → `Easy`
- XP values unchanged (+10 / +15 / +30)
- Buttons always visible, even during swipe

### Deck completed states
- **No cards due initially**: "No cards due right now! Come back later." with return button
- **All reviewed**: "All done! Great job!" with cards-reviewed stat and XP earned, return button

### No structural changes elsewhere
Navigation to FlashcardScreen from LessonDetailScreen and SubjectDetailScreen unchanged. No new screens, no new navigation routes.

## Implementation Order

1. Fill flashcard data in `nexoData.js` (economics 3-12, business 3-8)
2. Add `flashcardSrs` state + helpers to `AppContext.js` (load, save, getDueCards)
3. Rewrite `FlashcardScreen.js` — SRS filtering, swipe gesture, button renaming, empty states
