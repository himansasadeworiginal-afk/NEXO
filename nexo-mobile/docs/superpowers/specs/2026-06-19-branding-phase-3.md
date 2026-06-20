# Phase 3: Mobile Brand Alignment

**Date:** 2026-06-19
**Status:** Approved for implementation

## Goal

Align nexo-mobile's visual branding (colors, gradients, icons, typography) with the web app's established brand identity while preserving mobile-native optimizations for OLED screens and readability.

## Source Palette (from `nexo/index.html` CSS vars)

| Token | Color | Usage |
|---|---|---|
| `--green` | `#2ea84c` | Primary brand — solid buttons, CTA |
| `--green-light` | `#4cd96b` | Primary accent — progress bars, active states, icons |
| `--teal` | `#2aaf8f` | Secondary accent — info blocks, XP display |
| `--teal-light` | `#4cdbb8` | Teal variant |
| `--amber` | `#d4a040` | Warning/streak, business subject |
| `--amber-light` | `#e8c060` | Amber variant |
| `--purple` | `#8a5abe` | ICT subject |
| `--purple-light` | `#b07ae0` | Purple variant |
| `--rose` | `#d4606a` | Danger/error/deletion |
| `--bg` | `#060906` | Page background (web) |
| `--surface` | `#0c110c` | Card surface (web) |
| `--text` | `#e0f0e0` | Primary text (web) |
| `--text-dim` | `#90b090` | Muted/secondary text (web) |
| `--border` | `#182218` | Border color (web) |

## Mobile-Adapted Palette

| Token | Value | Replaces |
|---|---|---|
| Background | `#080b12` (unchanged) | OLED-optimized dark |
| Surface | `#111625` (unchanged) | Card backgrounds |
| Primary accent (solid) | `#2ea84c` | `#00e5c3` — CTAs, tab active, buttons |
| Primary accent (light) | `#4cd96b` | `#00e5c3` — progress bars, icons, active states |
| Secondary accent | `#2aaf8f` | `#4f8ef7` — info, flashcard front, XP card |
| Danger/error | `#d4606a` | `#d63031` — deletion, quiz wrong |
| Warning/streak | `#d4a040` | `#ff9f43` — streak counter, warning text |
| Muted text | `#90b090` | `#8ba2b9` — secondary labels, descriptions |
| Subject economics | `#2aaf8f` (unchanged) | Teal |
| Subject business | `#d4a040` (unchanged) | Amber |
| Subject ict | `#8a5abe` (unchanged) | Purple |

## Gradients

- **XP card**: `['#0c110c', '#060906']` with `#182218` border
- **LinearGradient fallback** (nativeGuard.js): `linear-gradient(135deg, #2ea84c, #4cd96b)`
- **Tab bar active tint**: `#4cd96b`
- **CTA buttons**: `#2ea84c` solid (was `#00e5c3`)

## Files to Modify

All changes are color-value replacements only — no logic, layout, or component refactoring.

1. `src/utils/nativeGuard.js` — gradient fallback colors
2. `src/navigation/AppNavigator.js` — tabBarActiveTintColor, tabBarInactiveTintColor, tabBarStyle
3. `src/screens/HomeScreen.js` — XP card gradient, progress bar, stream icons, filter tabs, badges
4. `src/screens/SubjectDetailScreen.js` — progress indicator, lesson status colors, action buttons, footer CTA
5. `src/screens/StreamDetailScreen.js` — status tags, notify buttons, accent indicators, stat values
6. `src/screens/LessonDetailScreen.js` — status pill colors, quiz/flashcard buttons, bookmark icon
7. `src/screens/QuizScreen.js` — progress bar, correct/wrong highlights, footer buttons
8. `src/screens/FlashcardScreen.js` — card borders (front/back), SRS buttons, deck completed screen
9. `src/screens/BookDetailScreen.js` — book icon background, category badges, section underlines
10. `src/screens/SearchScreen.js` — category pills, icon backgrounds, result type badges
11. `src/screens/SettingsScreen.js` — tab bar switches, bookmark icons, book filter pills

## Exclusion

- `src/constants/nexoData.js` — no changes (subject accents already match)
- `src/constants/nexoHtmlData.js` — regenerated data, not branded
- `src/context/AppContext.js` — no visual branding
- Font family stays SpaceGrotesk, icon set stays Ionicons

## Verification

After all 11 files are updated:
- `npx expo start` should load without errors
- Visual: all `#00e5c3` / `#4f8ef7` / `#8ba2b9` / `#ff9f43` / `#d63031` replaced with new palette
