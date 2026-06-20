# NEXO — Agent Instructions

## Repo Map

```
nexo/                        # Web app (single-file HTML, GitHub Pages)
├── index.html               # All CSS/JS inline (~4600 lines)
├── account.html → account/  # Profile page
├── content-manifest.json    # Book & lesson paths
├── economics/ business/ ict/ books/  # Lesson/book content
│
└── nexo-mobile/             # Expo React Native app (mobile port)
    ├── App.js → AppNavigator.js  # Entry → bottom tabs + native stack
    ├── src/constants/nexoData.js # All subjects, quizzes, flashcards, books
    ├── src/constants/nexoHtmlData.js # Generated HTML for WebView (run scripts/generateHtmlData.js)
    ├── src/context/AppContext.js    # State: AsyncStorage-backed, no API
    ├── src/utils/nativeGuard.js    # AsyncStorage + haptics cross-platform wrapper
    └── scripts/generateHtmlData.js # Codegen: extracts web HTML into nexoHtmlData.js
```

## Web App (root)

- **Single-file**: `index.html` has all HTML/CSS/JS inline. Read this for most tasks.
- **Data constants**: `SUBJECTS_DATA`, `QUIZ_DATA`, `FLASHCARDS_DATA`, `BOOKS_DATA`, `NEXO_MOCK_USER`
- **localStorage keys**: all `nexo_*` prefix — lesson status, quiz scores, flashcard SRS, streak, XP, badges, theme, bookmarks
- **No build step**. Open in browser. Deploy: `git push origin main` → GitHub Pages (`.nojekyll` at root)
- **Don't read** book directories or lesson HTML pages unless the task requires editing them (`content-manifest.json` lists everything)

## Mobile App (`nexo-mobile/`)

- Expo SDK 54, React Navigation (bottom tabs: Home/Search/Settings + native stack for detail screens)
- **All data is embedded** in `nexoData.js` — no API, no backend. Change data there for any content update.
- Lesson/book content renders in **WebView** using `nexoHtmlData.js` (generated inline HTML strings, not live URLs)
- **Regenerate HTML** after editing web lesson/book content: `node scripts/generateHtmlData.js` (outputs `nexoHtmlData.js`)
- **xState**: React Context (`AppContext.js`) persisted via AsyncStorage. Keys match the web app's `nexo_*` localStorage keys.
- **Cross-platform**: `nativeGuard.js` wraps AsyncStorage with localStorage fallback for web, and wraps expo-haptics/LinearGradient with graceful fallbacks.

### Dev Commands (run from `nexo-mobile/`)

| Command | Purpose |
|---------|---------|
| `npm start` or `npx expo start` | Start dev server (LAN QR code) |
| `npx expo start --tunnel` | Start with ngrok tunnel (works over internet) |
| `npm run android` / `npm run ios` | Build native binary |

- Requires **Expo Go** app on phone. Same network for LAN mode.
- `@expo/ngrok` dev dependency enables tunnel mode.
