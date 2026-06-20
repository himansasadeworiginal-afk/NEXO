# Phase 3: Brand Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the mobile app's blue-teal color palette with the web app's green/teal brand system across 11 files — color-value replacements only, no logic or layout changes.

**Architecture:** All screens use inline StyleSheet objects in their respective files. No shared theme/constants file exists. Changes are individual color-value swaps per file using `edit` tool with exact string matches.

**Tech Stack:** React Native, Expo SDK 54, no tests needed (verify via `npx expo start`)

---

### Task 1: nativeGuard.js — Gradient Fallback Colors

**Files:**
- Modify: `src/utils/nativeGuard.js:41`

- [ ] **Replace LinearGradient fallback colors**

Change the web platform fallback gradient from `#4f8ef7, #00e5c3` to `#2ea84c, #4cd96b`.

### Task 2: AppNavigator.js — Tab Bar Colors

**Files:**
- Modify: `src/navigation/AppNavigator.js:38-46`

- [ ] **Replace tab bar colors**

Change:
- `tabBarActiveTintColor: '#00e5c3'` → `"#4cd96b"`
- `tabBarInactiveTintColor: '#888'` → `"#90b090"`
- `backgroundColor: '#080b12'` stays unchanged

### Task 3: HomeScreen.js — XP Card, Progress, Stream Icons, Filters, Badges

**Files:**
- Modify: `src/screens/HomeScreen.js`

- [ ] **Replace XP card gradient and progress bar**

Change:
- `colors={['#111625', '#080b12']}` → `colors={['#0c110c', '#060906']}`
- `backgroundColor: '#00e5c3'` (progress bar fill, line 335) → `backgroundColor: '#4cd96b'`
- `borderColor: 'rgba(0, 229, 195, 0.2)'` (tier badge) → `borderColor: 'rgba(76, 217, 107, 0.2)'`
- `backgroundColor: 'rgba(0, 229, 195, 0.15)'` (tier badge bg) → `backgroundColor: 'rgba(76, 217, 107, 0.15)'`
- `color: '#00e5c3'` (tier text + view stream details text + stream icon) → `color: '#4cd96b'`

- [ ] **Replace stream icon background**

Change:
- `backgroundColor: 'rgba(0, 229, 195, 0.1)'` (stream icon bg) → `backgroundColor: 'rgba(76, 217, 107, 0.1)'`

- [ ] **Replace filter tab active colors**

Change:
- `backgroundColor: '#4f8ef7'` (filter tab active) → `backgroundColor: '#2aaf8f'`
- `borderColor: '#4f8ef7'` (filter tab active border) → `borderColor: '#2aaf8f'`

- [ ] **Replace XP value colors**

Change:
- `backgroundColor: 'rgba(79, 142, 247, 0.15)'` (XP value wrapper) → `backgroundColor: 'rgba(42, 175, 143, 0.15)'`
- `color: '#4f8ef7'` (XP value text) → `color: '#2aaf8f'`

### Task 4: SubjectDetailScreen.js — Progress, Status, Buttons

**Files:**
- Modify: `src/screens/SubjectDetailScreen.js`

- [ ] **Replace status label and icon colors**

Change:
- `color: '#00e5c3'` (Done status icon, line 38) → `color: '#4cd96b'`
- `color: '#4f8ef7'` (In Progress status icon, line 40) → `color: '#2aaf8f'`
- `color: '#8ba2b9'` (Not Started status icon, line 42) → `color: '#90b090'`

- [ ] **Replace action button borders and text**

Change:
- `borderColor: 'rgba(0, 229, 195, 0.2)'` (quiz button) → `borderColor: 'rgba(76, 217, 107, 0.2)'`
- `color: '#00e5c3'` (quiz button text) → `color: '#4cd96b'`
- `borderColor: 'rgba(79, 142, 247, 0.2)'` (flashcard button) → `borderColor: 'rgba(42, 175, 143, 0.2)'`
- `color: '#4f8ef7'` (flashcard button text) → `color: '#2aaf8f'`

### Task 5: StreamDetailScreen.js — Status Tags, Notify Buttons

**Files:**
- Modify: `src/screens/StreamDetailScreen.js`

- [ ] **Replace status tag colors**

Change:
- `backgroundColor: 'rgba(0, 229, 195, 0.15)'` (Done status) → `backgroundColor: 'rgba(76, 217, 107, 0.15)'`
- `color: '#00e5c3'` (Done status text) → `color: '#4cd96b'`
- `backgroundColor: 'rgba(79, 142, 247, 0.15)'` (In Progress status) → `backgroundColor: 'rgba(42, 175, 143, 0.15)'`
- `color: '#4f8ef7'` (In Progress status text) → `color: '#2aaf8f'`
- `backgroundColor: 'rgba(255, 159, 67, 0.15)'` (Coming Soon status) → `backgroundColor: 'rgba(212, 160, 64, 0.15)'`
- `color: '#ff9f43'` (Coming Soon status text) → `color: '#d4a040'`

- [ ] **Replace start studying colors**

Change:
- `color: '#00e5c3'` (start studying text + arrow) → `color: '#4cd96b'`
- `backgroundColor: '#4f8ef7'` (notify btn) → `backgroundColor: '#2aaf8f'`
- `backgroundColor: 'rgba(0, 229, 195, 0.15)'` (subscribed notify) → `backgroundColor: 'rgba(76, 217, 107, 0.15)'`
- `borderColor: 'rgba(0, 229, 195, 0.3)'` (subscribed border) → `borderColor: 'rgba(76, 217, 107, 0.3)'`
- `color: '#00e5c3'` (subscribed text) → `color: '#4cd96b'`

### Task 6: LessonDetailScreen.js — Status Pills, Quiz/Flashcard Buttons

**Files:**
- Modify: `src/screens/LessonDetailScreen.js`

- [ ] **Replace status colors**

Change:
- `color: '#00e5c3'` (Done status icon/text) → `color: '#4cd96b'`
- `backgroundColor: 'rgba(0, 229, 195, 0.15)'` (Done bg) → `backgroundColor: 'rgba(76, 217, 107, 0.15)'`
- `color: '#4f8ef7'` (In Progress icon/text) → `color: '#2aaf8f'`
- `backgroundColor: 'rgba(79, 142, 247, 0.15)'` (In Progress bg) → `backgroundColor: 'rgba(42, 175, 143, 0.15)'`
- `color: '#8ba2b9'` (Not Started status text) → `color: '#90b090'`

- [ ] **Replace comparison header and bookmark colors**

Change:
- `color: '#00e5c3'` (comparison right title) → `color: '#4cd96b'`
- `color: '#00e5c3'` (bookmarked icon) → `color: '#4cd96b'`

- [ ] **Replace bottom bar button colors**

Change:
- `backgroundColor: '#00e5c3'` (quiz btn bg) → `backgroundColor: '#2ea84c'`
- `color: '#00e5c3'` (flashcard btn text) → `color: '#4cd96b'`
- `backgroundColor: 'rgba(0, 229, 195, 0.08)'` (flashcard btn bg) → `backgroundColor: 'rgba(76, 217, 107, 0.08)'`
- `borderColor: 'rgba(0, 229, 195, 0.3)'` (flashcard btn border) → `borderColor: 'rgba(76, 217, 107, 0.3)'`

### Task 7: QuizScreen.js — Progress, Correct/Wrong, CTA

**Files:**
- Modify: `src/screens/QuizScreen.js`

- [ ] **Replace quiz accent colors**

Change:
- `backgroundColor: '#00e5c3'` (progress bar fill) → `backgroundColor: '#4cd96b'`
- `color: '#00e5c3'` (question counter) → `color: '#4cd96b'`
- `backgroundColor: 'rgba(0, 229, 195, 0.08)'` (correct option) → `backgroundColor: 'rgba(76, 217, 107, 0.08)'`
- `borderColor: '#00e5c3'` (correct border) → `borderColor: '#4cd96b'`
- `backgroundColor: '#00e5c3'` (correct label bg) → `backgroundColor: '#4cd96b'`

- [ ] **Replace results screen colors**

Change:
- `color: '#00e5c3'` (trophy icon, scoreCircle border, closeBtn bg, results feedback text) → `color: '#4cd96b'` (icons/text) / `backgroundColor: '#4cd96b'` (bg uses)
- `borderColor: '#00e5c3'` (score circle) → `borderColor: '#4cd96b'`
- `backgroundColor: '#00e5c3'` (close btn bg) → `backgroundColor: '#2ea84c'`
- `color: '#4f8ef7'` (feedback "great work" text) → `color: '#2aaf8f'`
- `color: '#ff9f43'` (feedback "good effort") → `color: '#d4a040'`
- `color: '#d63031'` (feedback "keep studying") → `color: '#d4606a'`

- [ ] **Replace next button color**

Change:
- `backgroundColor: '#00e5c3'` (next btn) → `backgroundColor: '#2ea84c'`

### Task 8: FlashcardScreen.js — Card Borders, SRS Buttons, Deck Complete

**Files:**
- Modify: `src/screens/FlashcardScreen.js`

- [ ] **Replace card front/back colors**

Change:
- `color: '#4f8ef7'` (front card type label) → `color: '#2aaf8f'`
- `borderColor: 'rgba(79, 142, 247, 0.3)'` (front border) → `borderColor: 'rgba(42, 175, 143, 0.3)'`
- `color: '#00e5c3'` (back card type label) → `color: '#4cd96b'`
- `borderColor: 'rgba(0, 229, 195, 0.3)'` (back border) → `borderColor: 'rgba(76, 217, 107, 0.3)'`

- [ ] **Replace SRS button colors**

Change:
- `backgroundColor: 'rgba(214, 48, 49, 0.1)'` (Hard bg) → `backgroundColor: 'rgba(212, 96, 106, 0.1)'`
- `borderColor: 'rgba(214, 48, 49, 0.3)'` (Hard border) → `borderColor: 'rgba(212, 96, 106, 0.3)'`
- `backgroundColor: 'rgba(255, 159, 67, 0.1)'` (Medium/Good bg) → `backgroundColor: 'rgba(212, 160, 64, 0.1)'`
- `borderColor: 'rgba(255, 159, 67, 0.3)'` (Medium border) → `borderColor: 'rgba(212, 160, 64, 0.3)'`
- `backgroundColor: 'rgba(0, 229, 195, 0.1)'` (Easy bg) → `backgroundColor: 'rgba(76, 217, 107, 0.1)'`
- `borderColor: 'rgba(0, 229, 195, 0.3)'` (Easy border) → `borderColor: 'rgba(76, 217, 107, 0.3)'`

- [ ] **Replace tap to reveal button**

Change:
- `backgroundColor: '#4f8ef7'` → `backgroundColor: '#2aaf8f'`

- [ ] **Replace deck completed screen colors**

Change:
- `color: '#00e5c3'` (sparkles icon, stat values) → `color: '#4cd96b'`
- `backgroundColor: '#00e5c3'` (close btn) → `backgroundColor: '#2ea84c'`

### Task 9: BookDetailScreen.js — Book Icons, Category Badges, Underlines

**Files:**
- Modify: `src/screens/BookDetailScreen.js`

- [ ] **Replace book accent colors**

Change:
- `backgroundColor: 'rgba(255, 159, 67, 0.1)'` (book icon bg, existing) → `backgroundColor: 'rgba(212, 160, 64, 0.1)'`
- `borderColor: 'rgba(255, 159, 67, 0.3)'` (book icon/badge borders) → `borderColor: 'rgba(212, 160, 64, 0.3)'`
- `color: '#ff9f43'` (book icon text, badge text, takeaway numbers) → `color: '#d4a040'`
- `backgroundColor: 'rgba(255, 159, 67, 0.15)'` (category badge bg) → `backgroundColor: 'rgba(212, 160, 64, 0.15)'`
- `backgroundColor: '#ff9f43'` (title underline) → `backgroundColor: '#d4a040'`
- `backgroundColor: 'rgba(255, 159, 67, 0.15)'` (takeaway num bg) → `backgroundColor: 'rgba(212, 160, 64, 0.15)'`

### Task 10: SearchScreen.js — Category Pills, Icons, Badges

**Files:**
- Modify: `src/screens/SearchScreen.js`

- [ ] **Replace search accent colors**

Change:
- `color: '#4f8ef7'` (subject type color) → `color: '#2aaf8f'`
- `color: '#00e5c3'` (lesson type color) → `color: '#4cd96b'`
- `color: '#ff9f43'` (book type color) → `color: '#d4a040'`
- `color: '#8ba2b9'` (default type color) → `color: '#90b090'`
- `backgroundColor: '#00e5c3'` (category pill active, line 259) → `backgroundColor: '#4cd96b'`
- `borderColor: '#00e5c3'` (category pill active border, line 260) → `borderColor: '#4cd96b'`
- `color: '#00e5c3'` (category pill active text becomes...) — these are white-on-green, so the text color `#080b12` stays (it's the dark text on the active pill)

### Task 11: SettingsScreen.js — Tab Bar, Toggles, Bookmarks

**Files:**
- Modify: `src/screens/SettingsScreen.js`

- [ ] **Replace settings accent colors**

Change:
- `borderBottomColor: '#00e5c3'` (active tab underline) → `borderBottomColor: '#4cd96b'`
- `color: '#00e5c3'` (active tab text, haptic icon, Switch trackColor true) → `color: '#4cd96b'`
- `trackColor={{ false: '#111625', true: '#00e5c3' }}` → `trackColor={{ false: '#111625', true: '#4cd96b' }}`
- `color: '#4f8ef7'` (moon icon) → `color: '#2aaf8f'`
- `trackColor={{ false: '#111625', true: '#4f8ef7' }}` → `trackColor={{ false: '#111625', true: '#2aaf8f' }}`
- `color: '#ff9f43'` (bookmark lesson icon/book icon) → `color: '#d4a040'`

- [ ] **Replace book list accent colors**

Change:
- `backgroundColor: '#ff9f43'` (filter pill active) → `backgroundColor: '#d4a040'`
- `borderColor: '#ff9f43'` (filter pill active border) → `borderColor: '#d4a040'`
- `backgroundColor: 'rgba(255, 159, 67, 0.1)'` (book icon bg) → `backgroundColor: 'rgba(212, 160, 64, 0.1)'`
- `borderColor: 'rgba(255, 159, 67, 0.2)'` (book icon border) → `borderColor: 'rgba(212, 160, 64, 0.2)'`
- `color: '#ff9f43'` (book label char) → `color: '#d4a040'`

## Verification

After all tasks:

- [ ] **Run `npx expo export --platform web --output-dir /tmp/nexo-export 2>&1 || npx expo start --no-dev 2>&1` to verify no syntax/import errors**

Run: `node -e "const files = ['src/utils/nativeGuard.js','src/navigation/AppNavigator.js','src/screens/HomeScreen.js','src/screens/SubjectDetailScreen.js','src/screens/StreamDetailScreen.js','src/screens/LessonDetailScreen.js','src/screens/QuizScreen.js','src/screens/FlashcardScreen.js','src/screens/BookDetailScreen.js','src/screens/SearchScreen.js','src/screens/SettingsScreen.js']; files.forEach(f => { try { require('/home/wolf/Projects/nexo/nexo-mobile/' + f); } catch(e) { if (!e.message.includes('Cannot find module') && !e.message.includes('useContext')) { console.log('ISSUE:', f, e.message); } else { console.log('OK:', f); } } })" 2>&1 | head -20`
Expected: All 11 files load without syntax errors.

- [ ] **Visual sanity check**: For each file, verify no `#00e5c3`, `#4f8ef7`, `#ff9f43`, `#d63031`, `#8ba2b9` remain except in comments or unchanged subject accents.
