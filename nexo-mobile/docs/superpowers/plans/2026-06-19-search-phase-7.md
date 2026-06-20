# Phase 7 — Search Screen Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade SearchScreen with 6 features: subject filters, notes search, highlighting, recent searches, sort, and suggestions.

**Architecture:** All changes in `src/screens/SearchScreen.js` — incremental additions to existing 345-line file. AsyncStorage via existing `nativeGuard` wrapper for recent searches.

**Tech Stack:** React Native, Expo, AsyncStorage (via `nativeGuard.js`)

**Files:**
- Modify: `src/screens/SearchScreen.js`
- Reference: `src/constants/nexoData.js` (LESSON_NOTES, SUBJECTS_DATA, BOOKS_DATA)

---

### Task 1: Subject Filter Chips + State Setup

**Files:** Modify `src/screens/SearchScreen.js`

- [ ] **Step 1: Add new state variables**

After existing `const [activeCategory, setActiveCategory] = useState('All')`:

```js
const [activeSubject, setActiveSubject] = useState('All');
const [searchMode, setSearchMode] = useState('titles');
const [sortBy, setSortBy] = useState('relevance');
const [recentSearches, setRecentSearches] = useState([]);
const [isFocused, setIsFocused] = useState(false);
const [suggestions, setSuggestions] = useState([]);
```

- [ ] **Step 2: Add subject filter chips UI** (after the category pills `</View>` closing tag)

```js
{/* SUBJECT FILTER CHIPS */}
<View style={styles.subjectContainer}>
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
    {[{ id: 'All', label: 'All', color: '#90b090' }, { id: 'economics', label: 'Economics', color: '#2aaf8f' }, { id: 'business', label: 'Business', color: '#d4a040' }, { id: 'ict', label: 'ICT', color: '#8a5abe' }, { id: 'books', label: 'Books', color: '#90b090' }].map(subj => (
      <TouchableOpacity
        key={subj.id}
        style={[styles.subjectChip, { borderColor: subj.color }, activeSubject === subj.id && { backgroundColor: subj.color }]}
        onPress={() => { triggerHaptic('light'); setActiveSubject(subj.id); }}
      >
        <Text style={[styles.subjectChipText, { color: activeSubject === subj.id ? '#080b12' : subj.color }]}>{subj.label}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
</View>
```

- [ ] **Step 3: Add styles for subject chips**

```js
subjectContainer: {
  paddingHorizontal: 16,
  marginBottom: 12,
},
subjectChip: {
  paddingHorizontal: 14,
  paddingVertical: 6,
  borderRadius: 15,
  borderWidth: 1,
},
subjectChipText: {
  fontSize: 12,
  fontWeight: '700',
},
```

- [ ] **Step 4: Extend `getFilteredResults` to filter by subject**

Replace the existing `getFilteredResults` to add subject filtering before category + query:

```js
const getFilteredResults = () => {
  if (!query.trim()) return [];

  const searchLower = query.toLowerCase();

  // Step 1: filter by subject
  let subjectFiltered = allItems;
  if (activeSubject !== 'All') {
    if (activeSubject === 'books') {
      subjectFiltered = allItems.filter(i => i.type === 'book');
    } else {
      subjectFiltered = allItems.filter(i => {
        if (i.type === 'subject') return i.data.id === activeSubject;
        if (i.type === 'lesson') return i.data.subjectId === activeSubject;
        return false;
      });
    }
  }

  // Step 2: filter by query + category (existing logic)
  return subjectFiltered.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(searchLower);
    const descMatch = item.desc.toLowerCase().includes(searchLower);
    const categoryMatch = activeCategory === 'All' || item.type === activeCategory.toLowerCase().slice(0, -1);
    return (titleMatch || descMatch) && categoryMatch;
  });
};
```

- [ ] **Step 5: Verify build**

```bash
npx expo export --platform web --output-dir /tmp/nexo-p7-t1 2>&1 | tail -5
```
Expected: No errors, build completes.

---

### Task 2: Search Within Notes + Sort

**Files:** Modify `src/screens/SearchScreen.js`

- [ ] **Step 1: Import LESSON_NOTES**

Add to the existing import line:
```js
import { SUBJECTS_DATA, BOOKS_DATA, LESSON_NOTES } from '../constants/nexoData';
```

- [ ] **Step 2: Add search mode toggle UI** (between subject chips and search results)

After the subject container `</View>` closing tag:
```js
{/* SEARCH MODE TOGGLE */}
<View style={styles.modeRow}>
  <TouchableOpacity
    style={[styles.modePill, searchMode === 'titles' && styles.modePillActive]}
    onPress={() => { triggerHaptic('light'); setSearchMode('titles'); }}
  >
    <Text style={[styles.modePillText, searchMode === 'titles' && styles.modePillTextActive]}>Titles</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={[styles.modePill, searchMode === 'full' && styles.modePillActive]}
    onPress={() => { triggerHaptic('light'); setSearchMode('full'); }}
  >
    <Text style={[styles.modePillText, searchMode === 'full' && styles.modePillTextActive]}>Full Content</Text>
  </TouchableOpacity>
</View>
```

- [ ] **Step 3: Add sort pills UI** (after mode row)

```js
{/* SORT ROW */}
<View style={styles.sortRow}>
  <Text style={styles.sortLabel}>Sort:</Text>
  {['relevance', 'alpha_asc', 'alpha_desc'].map(s => (
    <TouchableOpacity
      key={s}
      style={[styles.sortPill, sortBy === s && styles.sortPillActive]}
      onPress={() => { triggerHaptic('light'); setSortBy(s); }}
    >
      <Text style={[styles.sortPillText, sortBy === s && styles.sortPillTextActive]}>
        {s === 'relevance' ? 'Relevance' : s === 'alpha_asc' ? 'A-Z' : 'Z-A'}
      </Text>
    </TouchableOpacity>
  ))}
</View>
```

- [ ] **Step 4: Extend `getFilteredResults` with notes search + sort**

```js
const getFilteredResults = () => {
  if (!query.trim()) return [];

  const searchLower = query.toLowerCase();
  const now = Date.now();

  // Step 1: filter by subject
  let subjectFiltered = allItems;
  if (activeSubject !== 'All') {
    if (activeSubject === 'books') {
      subjectFiltered = allItems.filter(i => i.type === 'book');
    } else {
      subjectFiltered = allItems.filter(i => {
        if (i.type === 'subject') return i.data.id === activeSubject;
        if (i.type === 'lesson') return i.data.subjectId === activeSubject;
        return false;
      });
    }
  }

  // Step 2: filter by query + category + compute matchField + score
  const scored = [];
  subjectFiltered.forEach(item => {
    const titleLC = item.title.toLowerCase();
    const descLC = item.desc.toLowerCase();
    const titleMatch = titleLC.includes(searchLower);
    const descMatch = descLC.includes(searchLower);
    const categoryMatch = activeCategory === 'All' || item.type === activeCategory.toLowerCase().slice(0, -1);
    if (!categoryMatch) return;

    let matchField = null;
    let score = 0;

    if (titleMatch) {
      matchField = 'title';
      score += 3;
      if (titleLC.startsWith(searchLower)) score += 1;
    }
    if (descMatch) {
      matchField = matchField || 'desc';
      score += 2;
    }

    // Search notes/full content
    if (searchMode === 'full' && item.type === 'lesson' && !titleMatch && !descMatch) {
      const notes = LESSON_NOTES[item.data.subjectId]?.[item.data.id];
      if (notes) {
        const allText = notes.sections.map(s => s.title + ' ' + (s.content || '')).join(' ').toLowerCase();
        if (allText.includes(searchLower)) {
          matchField = 'notes';
          score += 1;
        }
      }
    }

    if (matchField) {
      scored.push({ ...item, _score: score, _matchField: matchField });
    }
  });

  // Step 3: sort
  if (sortBy === 'alpha_asc') {
    scored.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === 'alpha_desc') {
    scored.sort((a, b) => b.title.localeCompare(a.title));
  } else {
    scored.sort((a, b) => b._score - a._score);
  }

  return scored;
};
```

- [ ] **Step 5: Add mode/sort styles**

```js
modeRow: {
  flexDirection: 'row',
  paddingHorizontal: 16,
  marginBottom: 8,
  gap: 8,
},
modePill: {
  paddingHorizontal: 14,
  paddingVertical: 5,
  borderRadius: 12,
  backgroundColor: '#111625',
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.06)',
},
modePillActive: {
  backgroundColor: '#2aaf8f',
  borderColor: '#2aaf8f',
},
modePillText: {
  color: '#90b090',
  fontSize: 11,
  fontWeight: '600',
},
modePillTextActive: {
  color: '#080b12',
},
sortRow: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  marginBottom: 12,
  gap: 8,
},
sortLabel: {
  color: '#90b090',
  fontSize: 11,
  fontWeight: '600',
  marginRight: 4,
},
sortPill: {
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 10,
  backgroundColor: '#111625',
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.04)',
},
sortPillActive: {
  backgroundColor: '#4cd96b20',
  borderColor: '#4cd96b',
},
sortPillText: {
  color: '#90b090',
  fontSize: 10,
  fontWeight: '600',
},
sortPillTextActive: {
  color: '#4cd96b',
},
```

- [ ] **Step 6: Verify build**

```bash
npx expo export --platform web --output-dir /tmp/nexo-p7-t2 2>&1 | tail -5
```
Expected: No errors, build completes.

---

### Task 3: Query Highlighting

**Files:** Modify `src/screens/SearchScreen.js`

- [ ] **Step 1: Add `highlightText` helper function** (before the component or inside it)

```js
const highlightText = (text, query, style) => {
  if (!query.trim()) return <Text style={style}>{text}</Text>;
  const lower = text.toLowerCase();
  const qLower = query.toLowerCase();
  const parts = [];
  let idx = lower.indexOf(qLower);
  let last = 0;
  while (idx !== -1) {
    if (idx > last) parts.push(text.slice(last, idx));
    parts.push(text.slice(idx, idx + qLower.length));
    last = idx + qLower.length;
    idx = lower.indexOf(qLower, last);
  }
  if (last < text.length) parts.push(text.slice(last));
  if (parts.length === 0) return <Text style={style}>{text}</Text>;
  return (
    <Text style={style}>
      {parts.map((p, i) =>
        p.toLowerCase() === qLower
          ? <Text key={i} style={{ color: '#4cd96b' }}>{p}</Text>
          : p
      )}
    </Text>
  );
};
```

- [ ] **Step 2: Wrap result title and desc with `highlightText`**

In the renderItem, replace:
```js
<Text style={styles.resultTitle} numberOfLines={1}>{item.title}</Text>
```
with:
```js
<Text style={styles.resultTitle} numberOfLines={1}>
  {highlightText(item.title, query, styles.resultTitle)}
</Text>
```

Replace:
```js
<Text style={styles.resultDesc} numberOfLines={2}>
  {item.desc.replace(/&bull;/g, '•')}
</Text>
```
with:
```js
<Text style={styles.resultDesc} numberOfLines={2}>
  {highlightText(item.desc.replace(/&bull;/g, '•'), query, styles.resultDesc)}
</Text>
```

- [ ] **Step 3: Verify build**

```bash
npx expo export --platform web --output-dir /tmp/nexo-p7-t3 2>&1 | tail -5
```
Expected: No errors, build completes.

---

### Task 4: Recent Searches

**Files:** Modify `src/screens/SearchScreen.js`

- [ ] **Step 1: Import AsyncStorage from nativeGuard**

Add to existing imports:
```js
import { storage } from '../utils/nativeGuard';
```

- [ ] **Step 2: Load recent searches on mount + save helper**

Add before the `getSearchableItems` function:
```js
useEffect(() => {
  loadRecentSearches();
}, []);

const loadRecentSearches = async () => {
  try {
    const data = await storage.getItem('nexo_recent_searches');
    if (data) setRecentSearches(JSON.parse(data));
  } catch {}
};

const saveRecentSearch = (term) => {
  const trimmed = term.trim();
  if (!trimmed) return;
  setRecentSearches(prev => {
    const filtered = prev.filter(s => s.toLowerCase() !== trimmed.toLowerCase());
    const next = [trimmed, ...filtered].slice(0, 10);
    storage.setItem('nexo_recent_searches', JSON.stringify(next));
    return next;
  });
};

const removeRecentSearch = (term) => {
  setRecentSearches(prev => {
    const next = prev.filter(s => s !== term);
    storage.setItem('nexo_recent_searches', JSON.stringify(next));
    return next;
  });
};

const clearRecentSearches = () => {
  setRecentSearches([]);
  storage.setItem('nexo_recent_searches', JSON.stringify([]));
};
```

- [ ] **Step 3: Track focus on TextInput**

Add `onFocus` and `onBlur` to the TextInput component:
```js
<TextInput
  ...
  onFocus={() => setIsFocused(true)}
  onBlur={() => setIsFocused(false)}
/>
```

- [ ] **Step 4: Add recent searches UI section** (replace the no-query placeholder section)

Replace the existing `{query.trim().length === 0 ? (...)` section with:
```js
{query.trim().length === 0 ? (
  isFocused && recentSearches.length > 0 ? (
    <View style={styles.recentContainer}>
      <View style={styles.recentHeader}>
        <Text style={styles.recentTitle}>Recent Searches</Text>
        <TouchableOpacity onPress={() => { triggerHaptic('light'); clearRecentSearches(); }}>
          <Text style={styles.recentClear}>Clear All</Text>
        </TouchableOpacity>
      </View>
      {recentSearches.map((term, i) => (
        <TouchableOpacity
          key={i}
          style={styles.recentItem}
          onPress={() => { triggerHaptic('light'); setQuery(term); saveRecentSearch(term); }}
        >
          <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.3)" style={{ marginRight: 10 }} />
          <Text style={styles.recentItemText} numberOfLines={1}>{term}</Text>
          <TouchableOpacity
            onPress={() => { triggerHaptic('light'); removeRecentSearch(term); }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="close" size={14} color="rgba(255,255,255,0.2)" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  ) : (
    <View style={styles.placeholderContainer}>
      <Ionicons name="compass-outline" size={64} color="rgba(255,255,255,0.06)" style={{ marginBottom: 12 }} />
      <Text style={styles.placeholderTitle}>Discover Learning Assets</Text>
      <Text style={styles.placeholderDesc}>
        Type anything above to search across our Commerce and Technology subjects, lessons, and library of book summaries.
      </Text>
    </View>
  )
) : ...}
```

- [ ] **Step 5: Add recent search styles**

```js
recentContainer: {
  flex: 1,
  paddingHorizontal: 16,
  paddingTop: 8,
},
recentHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
},
recentTitle: {
  color: 'rgba(255,255,255,0.4)',
  fontSize: 11,
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: 1,
},
recentClear: {
  color: '#4cd96b',
  fontSize: 11,
  fontWeight: '600',
},
recentItem: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: 'rgba(255,255,255,0.04)',
},
recentItemText: {
  flex: 1,
  color: 'rgba(255,255,255,0.6)',
  fontSize: 13,
  fontWeight: '500',
},
```

- [ ] **Step 6: Wire saveRecentSearch into the flow**

When user taps a result, save the query:
```js
const handleSearchItemPress = (item) => {
  triggerHaptic('medium');
  saveRecentSearch(query);
  // ... existing navigation
};
```

- [ ] **Step 7: Verify build**

```bash
npx expo export --platform web --output-dir /tmp/nexo-p7-t4 2>&1 | tail -5
```
Expected: No errors, build completes.

---

### Task 5: Search Suggestions Dropdown

**Files:** Modify `src/screens/SearchScreen.js`

- [ ] **Step 1: Add suggestion computation in onChangeText**

Extend the existing `onChangeText` handler:
```js
onChangeText={(text) => {
  setQuery(text);
  if (text.length > 0 && text.length % 3 === 0) {
    triggerHaptic('light');
  }
  // Compute suggestions
  if (text.trim().length > 0) {
    const q = text.toLowerCase();
    const matches = allItems
      .map(i => i.title)
      .filter((title, idx, self) => self.indexOf(title) === idx) // unique
      .filter(title => title.toLowerCase().startsWith(q))
      .slice(0, 5);
    setSuggestions(matches);
  } else {
    setSuggestions([]);
  }
}}
```

- [ ] **Step 2: Add suggestions dropdown UI** (after `onChangeText` and before the closing `</View>` of the searchBar)

Add as a sibling after the search bar View:
```js
{suggestions.length > 0 && (
  <View style={styles.suggestionsContainer}>
    {suggestions.map((s, i) => (
      <TouchableOpacity
        key={i}
        style={styles.suggestionItem}
        onPress={() => {
          triggerHaptic('light');
          setQuery(s);
          setSuggestions([]);
          saveRecentSearch(s);
        }}
      >
        <Ionicons name="search" size={14} color="rgba(255,255,255,0.3)" style={{ marginRight: 8 }} />
        <Text style={styles.suggestionText} numberOfLines={1}>{s}</Text>
      </TouchableOpacity>
    ))}
  </View>
)}
```

- [ ] **Step 3: Add suggestion styles**

```js
suggestionsContainer: {
  position: 'absolute',
  top: 60,
  left: 16,
  right: 16,
  backgroundColor: '#1a1f2e',
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.08)',
  borderRadius: 12,
  zIndex: 100,
  overflow: 'hidden',
},
suggestionItem: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderBottomWidth: 1,
  borderBottomColor: 'rgba(255,255,255,0.04)',
},
suggestionText: {
  color: 'rgba(255,255,255,0.7)',
  fontSize: 13,
  fontWeight: '500',
  flex: 1,
},
```

- [ ] **Step 4: Verify build**

```bash
npx expo export --platform web --output-dir /tmp/nexo-p7-t5 2>&1 | tail -5
```
Expected: No errors, build completes.

---

### Task 6: Final Verification

- [ ] **Step 1: Verify all features coexist**

```bash
npx expo export --platform web --output-dir /tmp/nexo-p7-final 2>&1 | tail -5
```
Expected: No errors, build completes. Bundle size reported.

- [ ] **Step 2: Verify key strings in bundle**

```bash
node -e "
const fs = require('fs');
const dir = fs.readdirSync('/tmp/nexo-p7-final/_expo/static/js/web');
const jsFile = dir.find(f => f.endsWith('.js'));
const content = fs.readFileSync('/tmp/nexo-p7-final/_expo/static/js/web/' + jsFile, 'utf8');
const checks = [
  'nexo_recent_searches',
  'Discover Learning Assets',
  'Recent Searches',
  'Clear All',
  'Full Content',
  'Relevance',
  'All Caught Up',
];
for (const s of checks) console.log(content.includes(s) ? 'OK' : 'MISSING', s);
"
```
Expected: All strings present.
