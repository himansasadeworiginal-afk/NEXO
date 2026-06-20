# Phase 7 — Search Screen Overhaul

## Objective
Upgrade the existing SearchScreen with subject filtering, notes search, query highlighting, recent searches, sort options, and search suggestions — all within the existing single-file screen.

## Data Sources
- `SUBJECTS_DATA` (3 subjects, 28 lessons) — names, descriptions
- `BOOKS_DATA` (24 books) — titles, authors, descriptions
- `LESSON_NOTES` (32 lessons) — full text content of each lesson's sections
- AsyncStorage key `nexo_recent_searches` — persists last 10 search strings

## Layout (top → bottom)

```
┌──────────────────────────────────┐
│  🔍 Search...               [✕]  │  ← existing, no change
├──────────────────────────────────┤
│ [All] [Subjects] [Lessons] [Books]│  ← existing category pills
├──────────────────────────────────┤
│ [All] [Econ] [Bus] [ICT] [Books] │  ← NEW subject chips (horizontal)
├──────────────────────────────────┤
│ Sort: Relevance │ A-Z │ Z-A      │  ← NEW sort toggle row
├──────────────────────────────────┤
│                                  │
│  ◆ RECENT SEARCHES               │  ← NEW, shown when bar focused + empty
│    "inflation"            [✕]    │
│    "monopoly"             [✕]    │
│                                  │
│  ◆ SUGGESTIONS                    │  ← NEW, shown while typing (<5 results)
│    → Economics                   │
│    → Economies of Scale          │
│                                  │
│  ◆ RESULTS                        │  ← enhanced
│    ┌──────────────────────────┐  │
│    │ 📘 **Econ**omics         │  │  ← matched text highlighted green
│    │ Economics • Lesson 3 ... │  │
│    └──────────────────────────┘  │
└──────────────────────────────────┘
```

## Feature Details

### 1. Subject filter chips
- Horizontal `ScrollView` below category pills
- Chips: All (default), Economics, Business Studies, ICT, Books
- Each chip colored per subject accent (`#2aaf8f`, `#d4a040`, `#8a5abe`, `#90b090`)
- Active chip has filled background, inactive has subtle border
- Filters `allItems` to matching subject before category + query filtering

### 2. Search within notes
- Add a toggle switch: "Search titles" / "Search full content"
- When "full content" is active, also search `LESSON_NOTES[subjectId][lessonId].sections[*].content` for query matches
- Notes matches appear in results with type "Notes", navigating to that lesson's detail
- Add `_matchField` property to results to track where the match was found (title/desc/notes)

### 3. Query highlighting
- For each result's `title` and `desc`, split on query (case-insensitive) and wrap matching segments in `<Text style={{color: '#4cd96b'}}>`
- Use `Text` component nesting, not HTML
- Only highlight in displayed text, not in stored data

### 4. Recent searches
- Store in AsyncStorage key `nexo_recent_searches` — JSON array of strings, max 10, no duplicates
- Load on mount via `useEffect`
- Displayed when search bar is focused AND query is empty
- Each entry: text + ✕ button (remove individual)
- Tapping a recent search sets it as the current query and triggers search
- "Clear all" button at bottom of list
- New searches saved when user explicitly triggers: taps a result, taps a suggestion, taps a recent search, or presses Enter/submit
- Deduplicated: if same string exists, move it to front instead of adding duplicate
- Save/load via `nativeGuard` module's AsyncStorage wrapper (already used by AppContext)

### 5. Sort
- Row of pill buttons below the subject chips: Relevance (default), A-Z, Z-A
- Relevance scoring: title match (+3), desc match (+2), notes match (+1), exact prefix match (+1 bonus)
- A-Z / Z-A sort by `item.title` alphabetically (ignores case)

### 6. Search suggestions
- While typing (query > 0 chars), compute prefix-match against all item titles
- Show max 5 suggestions in a dropdown overlay below the search bar
- Tapping a suggestion fills the search bar with that text
- Suggestions disappear when user selects one, presses Enter, or results are shown

## State Changes

New state variables to add to SearchScreen:
- `activeSubject` — string, default `'All'`
- `searchMode` — `'titles'` | `'full'`, default `'titles'`
- `sortBy` — `'relevance'` | `'alpha_asc'` | `'alpha_desc'`, default `'relevance'`
- `recentSearches` — string array, loaded from AsyncStorage
- `isFocused` — boolean, tracks TextInput focus state
- `suggestions` — filtered string array for autocomplete dropdown

## Navigation
No changes — same navigation calls as existing code:
- subject → `SubjectDetail({ subjectId })`
- lesson → `LessonDetail({ subjectId, lessonId })`
- book → `BookDetail({ bookId })`

## Styling
- Follow existing dark theme (`#080b12` background, `#111625` card surfaces)
- Subject chip colors: Econ=`#2aaf8f`, Bus=`#d4a040`, ICT=`#8a5abe`, Books=`#90b090`
- Sort pills match category pill style
- Recent searches: styled like results but slightly dimmer (`rgba(255,255,255,0.5)`)
- Suggestions dropdown: absolute positioned below search bar, same card surface
- Highlight color: `#4cd96b` (brand green)

## Files Changed

| File | Change |
|------|--------|
| `src/screens/SearchScreen.js` | All feature additions inline |
| `src/utils/nativeGuard.js` | No change needed (AsyncStorage already available) |

## Out of Scope
- Search within book HTML content (book takeaway text available in `BOOKS_DATA.desc`, but full HTML notes are in `nexoHtmlData.js` WebView strings — too heavy to search client-side)
- Voice search
- Search history sync across devices
- Fuzzy matching / typo tolerance
