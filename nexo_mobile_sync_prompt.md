## NEXO Mobile — Sync App With Website (Content, Branding, Pipeline)

You are upgrading the nexo-mobile Expo app so it matches the NEXO website's actual content and identity, while keeping the mobile app's existing navigation shell (bottom tabs, stream accordion, stack screens). This is NOT a rewrite of the app's architecture — it is a content and branding sync, plus a fix to the HTML generation pipeline so it actually pulls from the real website files.

Read AGENTS.md, the full nexo-mobile/src directory, and the website's index.html, economics/, business/, ict/, and books/ folders before changing anything. Do not guess at content — extract it from the real source files.

---

### CONTEXT — WHY THIS IS NEEDED

The mobile app was built separately and currently has placeholder or different content from the actual website. The website is the source of truth for all subjects, lessons, books, quizzes, and study notes. This task makes the mobile app a true mirror of the website's content while preserving the mobile-native UX (bottom tabs, accordion home, swipeable streams, quiz/flashcard screens) that already works well.

Backend is handled separately by someone else — do not add any networking, API calls, or backend integration. Everything stays local, embedded in JS constants, exactly as it is now.

---

### PART 1 — FIX THE CONTENT GENERATION PIPELINE

The current scripts/generateHtmlData.js extracts HTML from the web app but is not pulling in the full, current website content. Fix this script so it correctly walks the real website folder structure and produces accurate output.

#### What the script must do

1. Read the website's content-manifest.json at the project root to get the authoritative list of every subject, lesson, and book path.

2. For each entry in the manifest, read the corresponding HTML file from its real location:
   - economics/lessons/{n}/index.html
   - business/lessons/{n}/index.html
   - ict/lessons/{n}/index.html
   - books/{slug}/index.html

3. Extract ONLY the lesson/book content body from each HTML file — not the navbar, not the theme system script, not the particle canvas, not the footer. Identify the main content container in the website's lesson page template (look for the primary content wrapper div used consistently across lesson pages — likely something like a div with a class such as "lesson-content" or "content-card" or similar; inspect 2–3 real lesson files to confirm the exact selector before writing the extraction logic) and pull only its innerHTML.

4. Strip out any inline `<script>` tags from the extracted content (the mobile WebView does not need the website's interactive JS — quizzes and flashcards are handled natively in the mobile app, not inside the WebView).

5. Sanitize the extracted HTML so it renders cleanly inside a WebView at mobile width:
   - Remove fixed widths and replace with responsive (100%, max-width) rules
   - Ensure all images have a max-width: 100% rule
   - Remove any `position: fixed` elements from the extracted fragment (navbar remnants, scroll progress bars) since these don't belong inside a content fragment
   - Keep all headings, paragraphs, lists, code blocks, and styled callout boxes — these are real content and must be preserved exactly

6. Wrap each extracted fragment in a minimal, self-contained HTML document for the WebView, with embedded CSS matching the website's dark theme variables (re-declare the NEXO CSS variables — background, surface, border, text, text-dim, green, teal, amber, purple, rose — at the top of a `<style>` block in this wrapper) so lesson content displays in NEXO's actual color scheme inside the WebView, not default browser styling.

7. Output the result into src/constants/nexoHtmlData.js as a single exported object, keyed by a stable ID matching each lesson/book's ID used elsewhere in nexoData.js. Example shape:

```js
export const NEXO_HTML_DATA = {
  "economics-1": "<!doctype html>...",
  "economics-2": "<!doctype html>...",
  "business-1": "<!doctype html>...",
  "ict-8": "<!doctype html>...",
  "book-atomic-habits": "<!doctype html>...",
  // ...
};
```

8. Log a summary at the end of the script run: total lessons processed, total books processed, any manifest entries that failed to find a matching HTML file (these must be printed as warnings, not silently skipped).

9. The script remains a manual run: `node scripts/generateHtmlData.js`. Do not add file watchers or automation beyond this single command. After adding new lesson content to the website in the future, the workflow is: write the website lesson HTML → run this script → nexoHtmlData.js regenerates → mobile app picks up new content on next build.

#### Constraints for this script

- Use Node's built-in fs module and a lightweight HTML parser (cheerio if already a devDependency, otherwise use a simple regex-based extraction only as a fallback — prefer adding cheerio as a devDependency since it makes extraction far more reliable)
- The script must be idempotent — running it twice produces the same output
- The script must not modify any website source files — read-only access to the website folders
- If content-manifest.json is missing an entry that exists as a folder on disk, log a warning but do not crash

---

### PART 2 — REBUILD nexoData.js FROM REAL WEBSITE DATA

The current nexoData.js does not reflect the real subjects, lessons, and books. Rebuild its data constants using the actual content from the website.

#### SUBJECTS_DATA

Extract subject and lesson metadata directly from each website hub page's JavaScript (economics/index.html, business/index.html, ict/index.html each contain a hardcoded lesson list with id, title, description). Read these and produce:

```js
export const SUBJECTS_DATA = [
  {
    id: "economics",
    name: "Economics",
    accentColor: "#2aaf8f",
    description: "Macroeconomics & Microeconomics",
    lessons: [
      { id: "economics-1", title: "Introduction to Economics", description: "...", htmlKey: "economics-1" },
      // ... all 12, matching the real titles/descriptions from economics/index.html
    ]
  },
  {
    id: "business",
    name: "Business Studies",
    accentColor: "#d4a040",
    description: "Core business concepts",
    lessons: [ /* all 8, from business/index.html */ ]
  },
  {
    id: "ict",
    name: "ICT",
    accentColor: "#2aaf8f",
    description: "Programming & systems",
    lessons: [ /* all 12, from ict/index.html — mark lessons 8 and 10 with hasTerminal: true */ ]
  }
];
```

Do not invent lesson titles or descriptions. Copy them exactly from the website's hub page source. If a lesson is a placeholder/"coming soon" on the website, mark it `comingSoon: true` in the mobile data so the UI can show the same gold "Coming Soon" status already designed into the app.

#### BOOKS_DATA

Extract from books/index.html's book data array — all 24+ books with their real title, author, category, description, and slug-based path. Produce:

```js
export const BOOKS_DATA = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Productivity",
    description: "...",
    htmlKey: "book-atomic-habits"
  },
  // ... every book on the website, matching real data exactly
];
```

Match the categories already used on the website (Productivity, Philosophy, Psychology, Power, Finance) so filtering logic in SettingsScreen's Book Library tab continues to work without modification.

#### QUIZ_DATA — handle the gap honestly

The website's QUIZ_DATA likely has real questions for some lessons and placeholder questions for others (per earlier work on this project, Economics 1–2 and Business 1–2 have real questions, the rest are placeholders marked with TODO comments).

Port over whatever real quiz questions exist in the website's QUIZ_DATA object into the mobile app's QUIZ_DATA, preserving the exact question text, options, and correct answer index. For lessons that only have placeholder questions on the website, port the placeholders over too but keep them clearly marked:

```js
"economics-3": [
  // TODO: Replace with real questions — ported from website placeholder
  { q: "Placeholder question for Government Intervention in Markets 1", options: ["A","B","C","D"], answer: 0 },
  // ...
]
```

Do not fabricate new quiz questions beyond what already exists on the website. This keeps mobile and web content honestly in sync — when real questions get written on the website later, this script/process re-syncs them.

#### FLASHCARDS_DATA

If the website does not yet have a flashcard data source (per the project history, flashcards were a planned Phase 2 feature on web), do not invent flashcard content from nothing. Instead:
- Keep the existing FLASHCARDS_DATA structure/shape already in the mobile app
- For lessons with real quiz questions, auto-generate a basic flashcard set by converting each quiz question into a front/back pair (front = question, back = correct answer text) as a temporary measure
- Mark auto-generated flashcard sets with a `autoGenerated: true` flag so they can be replaced with hand-authored flashcards later without breaking the data shape
- Add a comment block at the top of the FLASHCARDS_DATA export explaining this is a temporary bridge until the website has a dedicated FLASHCARDS_DATA source to sync from

#### LESSON_NOTES

If this constant currently holds separate short-form notes distinct from the full lesson HTML, and the website has no equivalent separate "notes" content, either remove this constant (if nothing in the UI reads from it independently) or repurpose it to hold the lesson's `description` field as a short summary. Check actual usages in the screens before deciding — do not remove something still being read by a screen component.

#### STREAMS_DATA

Keep this constant's existing shape (it drives the HomeScreen accordion). Update its content so the streams reference the real subjects: Economics, Business Studies, ICT, and Books, instead of whatever placeholder streams currently exist. Preserve the stream-grouping concept (it's a nice mobile-native pattern not present on the website) — just point it at real data now.

---

### PART 3 — HOMEPAGE BRANDING UPDATE

Update HomeScreen.js so it visually identifies as NEXO. Keep the existing layout (XP card, badges row, stream accordion) — only update the header/branding area.

#### Header changes

- Add the NEXO wordmark at the top of the screen: "NEXO" in bold SpaceGrotesk, with a two-tone color treatment matching the website's gradient heading (teal #00e5c3 to blue #4f8ef7, or use a Text component with two adjacent styled spans if a true gradient text isn't easily done in RN — if expo-linear-gradient is available via nativeGuard.js, use MaskedView + LinearGradient for a true gradient text effect matching the website's green-to-teal heading gradient, substituting the mobile app's existing teal/blue accent pair)
- Below the wordmark: a small tagline matching the website's: "Turn Books and Notes Into Interactive Pages" in the existing subtext color (#8ba2b9), small font size
- Keep the existing XP/level card exactly as it is below this new header — do not restructure it

#### Status bar / safe area

Ensure the new header respects the safe area inset at the top (use the existing SafeAreaView or useSafeAreaInsets pattern already used elsewhere in the app) so it doesn't collide with the phone's notch/status bar.

#### App icon and splash screen

Check app.json for the current icon and splash screen configuration. If they are still Expo's default placeholder assets, flag this clearly to the user with a comment in app.json:
```
// TODO: replace icon.png and splash.png in assets/ with the real NEXO logo mark before production build
```
Do not generate placeholder icon images yourself — this requires real brand assets the user will provide separately.

---

### PART 4 — LESSON CONTENT RENDERING (HYBRID APPROACH)

This confirms and hardens the existing hybrid pattern: WebView for the lesson content body, native React Native for everything surrounding it.

#### LessonDetailScreen.js

Keep the existing screen structure:
- Native header: lesson title, subject badge, back button (unchanged)
- Native status cycler pill (not-started → in-progress → done) (unchanged)
- WebView rendering the lesson's HTML content from NEXO_HTML_DATA, keyed by the lesson's htmlKey
- Native CTA buttons at the bottom: "Take Quiz" and "Flashcards" (unchanged), only shown if QUIZ_DATA or FLASHCARDS_DATA has an entry for this lesson; if a lesson is comingSoon, hide both CTAs and instead show a native "Coming Soon" badge using the existing gold (#ff9f43) status color

WebView configuration:
- `originWhitelist={['*']}`
- `source={{ html: NEXO_HTML_DATA[lesson.htmlKey] }}`
- Enable `scalesPageToFit={false}` and instead rely on the wrapper HTML's responsive CSS from Part 1 so content sizes correctly without pinch-zoom needed
- Set a dynamic height: since WebView in RN doesn't auto-size to content by default, inject a small script via `injectedJavaScript` that posts the scrollHeight of the document back via `window.ReactNativeWebView.postMessage`, and use `onMessage` in the screen to set the WebView's height dynamically so it doesn't scroll inside a fixed box and doesn't get cut off — the whole screen should scroll naturally with the WebView sized to fit its content
- Background: match `#080b12` so there's no white flash while the WebView loads
- Show a loading spinner (use the existing app's loading pattern if one exists, otherwise a simple ActivityIndicator in the teal accent color) while the WebView content loads

#### BookDetailScreen.js

Same hybrid pattern:
- Native header: book title, author, category badge, bookmark toggle (unchanged)
- WebView rendering the book's HTML content from NEXO_HTML_DATA keyed by htmlKey
- Native "3 Key Takeaways" card below the WebView (unchanged) — if the website book pages don't have a clearly extractable "3 takeaways" section, keep whatever takeaways content already exists in the mobile app for now, or derive 3 bullet points from the first 3 headings/key points in the extracted HTML content as a reasonable default. Mark these as `// TODO: confirm takeaways match curated website content` if auto-derived.

---

### PART 5 — QUIZ AND FLASHCARD SCREENS (NO CHANGE TO MECHANICS, ONLY DATA)

QuizScreen.js and FlashcardScreen.js logic, animations, haptics, and scoring stay exactly as they are. The only change is that they now pull from the rebuilt QUIZ_DATA and FLASHCARDS_DATA constants from Part 2. Verify after the data rebuild that:

- Every lesson with `comingSoon: true` is excluded from quiz/flashcard navigation entry points (SubjectDetailScreen and LessonDetailScreen should not show CTAs for lessons that don't have real content yet)
- The three-tier feedback messaging (Outstanding / Great work / Good effort / Keep studying) continues to work unchanged with the ported quiz data
- XP awarding logic (20 + 10×score for quizzes, 10-30 per flashcard) is untouched

---

### PART 6 — SEARCH SCREEN DATA SYNC

SearchScreen.js currently searches across subjects/lessons/books. After the data rebuild in Part 2, verify the search index logic still works against the new SUBJECTS_DATA and BOOKS_DATA shapes without modification to the search logic itself — only confirm field names match (e.g. if search reads `lesson.title` and `lesson.description`, ensure the rebuilt data still uses those exact field names).

If book search currently searches by `book.title` and `book.author`, confirm the rebuilt BOOKS_DATA preserves those field names exactly.

---

### PART 7 — SETTINGS SCREEN BOOK LIBRARY TAB

The Book Library sub-tab in SettingsScreen.js filters by category. After rebuilding BOOKS_DATA in Part 2, verify the category filter pills (Productivity, Philosophy, Psychology, Power, Finance) still match the real category values now present in the data. If the website uses slightly different category label casing or naming, normalize the rebuilt data to match whatever the existing filter UI expects — do not change the filter UI itself.

---

### PART 8 — APPCONTEXT VERIFICATION (NO LOGIC CHANGES)

Do not modify AppContext.js's gamification logic, AsyncStorage key naming, or state shape. Only verify:

- Lesson status keys (`not-started` / `in-progress` / `done`) align with the lesson IDs now coming from the rebuilt SUBJECTS_DATA (e.g. `economics-1`, `ict-8`) so progress tracking continues to work per-lesson correctly
- Bookmark toggle keys align with the rebuilt lesson and book IDs
- Badge milestone logic (lessons completed 1/5/10/20, perfect quizzes 1/3, streaks 3/7/30) is unaffected by the data rebuild — these are counters based on user actions, not content, so they should need no changes

---

### FUTURE CONTENT WORKFLOW — DOCUMENT THIS

At the end of this task, create or update a short section in AGENTS.md (or create nexo-mobile/CONTENT_SYNC.md if AGENTS.md doesn't already cover this) explaining the manual content pipeline going forward:

```markdown
## Adding New Content to NEXO Mobile

1. Write the new lesson/book page on the website first (in economics/, business/, ict/, or books/), following the existing HTML structure of other lesson pages.
2. Add the new lesson/book entry to content-manifest.json.
3. Run `node scripts/generateHtmlData.js` from nexo-mobile/ to regenerate nexoHtmlData.js.
4. Manually add the lesson/book's metadata (id, title, description) to the matching subject/book array in nexoData.js — this step is NOT automated, copy the title/description from the website hub page by hand.
5. If the lesson has quiz questions on the website, manually copy them into QUIZ_DATA in nexoData.js, matching the lesson's id.
6. If you want flashcards beyond the auto-generated quiz-based ones, manually add them to FLASHCARDS_DATA.
7. Restart the Expo dev server (`npx expo start`) to see the new content.
```

---

### CONSTRAINTS

- No backend, no networking, no API calls — this stays a fully local, offline-first app
- Do not change AppContext.js's state logic, AsyncStorage key formats, or gamification math
- Do not change navigation structure — bottom tabs, stack screens, and screen flow stay exactly as they are
- Do not change QuizScreen.js or FlashcardScreen.js interaction logic, haptics, or animations — only the data they consume changes
- Do not fabricate content — every lesson title, description, quiz question, and book detail must trace back to a real source file on the website; where the website itself only has placeholders, port the placeholder honestly rather than inventing finished content
- SpaceGrotesk font usage stays as-is — do not introduce a new font
- The existing color system (#080b12 background, #111625 cards, #00e5c3 teal, #4f8ef7 blue, #ff9f43 gold, #d63031 red, plus the three subject accents) is not changed — branding update in Part 3 must use these existing colors, not introduce new ones
- Test on Expo Go after each part: Part 1–2 verify by running the generation script and checking the JS output is valid and non-empty; Part 3 verify visually on device/simulator; Part 4 verify by opening at least one Economics lesson, one ICT lesson (with terminal badge), and one book detail screen to confirm WebView content renders correctly at readable size with no horizontal scroll and no white flash
- If at any point a website source file referenced by content-manifest.json cannot be found, stop and report the missing file rather than silently generating empty content for it
