import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { SUBJECTS_DATA, BOOKS_DATA, LESSON_NOTES } from '../constants/nexoData';
import { storage } from '../utils/nativeGuard';

const SearchScreen = ({ navigation }) => {
  const { triggerHaptic } = useContext(AppContext);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubject, setActiveSubject] = useState('All');
  const [searchMode, setSearchMode] = useState('titles');
  const [sortBy, setSortBy] = useState('relevance');
  const [recentSearches, setRecentSearches] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

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

  const highlightText = (text, queryStr, style) => {
    if (!queryStr.trim()) return <Text style={style}>{text}</Text>;
    const lower = text.toLowerCase();
    const qLower = queryStr.toLowerCase();
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

  // Flatten all searchable items
  const getSearchableItems = () => {
    let items = [];

    // 1. Subjects
    SUBJECTS_DATA.forEach(subj => {
      items.push({
        id: `subj_${subj.id}`,
        type: 'subject',
        title: subj.name,
        desc: `${subj.lessons.length} lessons available`,
        data: subj
      });

      // 2. Lessons
      subj.lessons.forEach(les => {
        items.push({
          id: `les_${subj.id}_${les.id}`,
          type: 'lesson',
          title: les.title,
          desc: `${subj.name} &bull; Lesson ${les.id} &bull; ${les.desc}`,
          data: { ...les, subjectId: subj.id }
        });
      });
    });

    // 3. Books
    BOOKS_DATA.forEach(book => {
      items.push({
        id: `book_${book.id}`,
        type: 'book',
        title: book.title,
        desc: `By ${book.author} &bull; ${book.desc}`,
        data: book
      });
    });

    return items;
  };

  const allItems = getSearchableItems();

  const handleSearchItemPress = (item) => {
    triggerHaptic('medium');
    saveRecentSearch(query);
    if (item.type === 'subject') {
      navigation.navigate('SubjectDetail', { subjectId: item.data.id });
    } else if (item.type === 'lesson') {
      navigation.navigate('LessonDetail', { subjectId: item.data.subjectId, lessonId: item.data.id });
    } else if (item.type === 'book') {
      navigation.navigate('BookDetail', { bookId: item.data.id });
    }
  };

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

  const results = getFilteredResults();

  const getCategoryIcon = (type) => {
    switch (type) {
      case 'subject': return 'school-outline';
      case 'lesson': return 'book-outline';
      case 'book': return 'library-outline';
      default: return 'document-outline';
    }
  };

  const getCategoryColor = (type) => {
    switch (type) {
      case 'subject': return '#2aaf8f';
      case 'lesson': return '#4cd96b';
      case 'book': return '#d4a040';
      default: return '#90b090';
    }
  };

  const subjectChips = [
    { id: 'All', label: 'All', color: '#90b090' },
    { id: 'economics', label: 'Economics', color: '#2aaf8f' },
    { id: 'business', label: 'Business', color: '#d4a040' },
    { id: 'ict', label: 'ICT', color: '#8a5abe' },
    { id: 'books', label: 'Books', color: '#90b090' }
  ];

  const sortOptions = [
    { key: 'relevance', label: 'Relevance' },
    { key: 'alpha_asc', label: 'A-Z' },
    { key: 'alpha_desc', label: 'Z-A' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* SEARCH INPUT HEADER */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#90b090" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search lessons, subjects, books..."
            placeholderTextColor="#90b090"
            style={styles.input}
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              if (text.length > 0 && text.length % 3 === 0) {
                triggerHaptic('light');
              }
              if (text.trim().length > 0) {
                const q = text.toLowerCase();
                const matches = allItems
                  .map(i => i.title)
                  .filter((title, idx, self) => self.indexOf(title) === idx)
                  .filter(title => title.toLowerCase().startsWith(q))
                  .slice(0, 5);
                setSuggestions(matches);
              } else {
                setSuggestions([]);
              }
            }}
            autoCorrect={false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {query.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                triggerHaptic('light');
                setQuery('');
              }}
            >
              <Ionicons name="close-circle" size={18} color="#90b090" />
            </TouchableOpacity>
          )}
        </View>
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
      </View>

      {/* FILTER CATEGORY PILLS */}
      <View style={styles.categoryContainer}>
        {['All', 'Subjects', 'Lessons', 'Books'].map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryPill,
              activeCategory === cat && styles.categoryPillActive
            ]}
            onPress={() => {
              triggerHaptic('light');
              setActiveCategory(cat);
            }}
          >
            <Text style={[
              styles.categoryPillText,
              activeCategory === cat && styles.categoryPillTextActive
            ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SUBJECT FILTER CHIPS */}
      <View style={styles.subjectContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {subjectChips.map(subj => (
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

      {/* SORT ROW */}
      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Sort:</Text>
        {sortOptions.map(s => (
          <TouchableOpacity
            key={s.key}
            style={[styles.sortPill, sortBy === s.key && styles.sortPillActive]}
            onPress={() => { triggerHaptic('light'); setSortBy(s.key); }}
          >
            <Text style={[styles.sortPillText, sortBy === s.key && styles.sortPillTextActive]}>
              {s.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* RESULTS / PLACEHOLDER / RECENT SEARCHES */}
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
                  onPress={(e) => { e.stopPropagation(); triggerHaptic('light'); removeRecentSearch(term); }}
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
      ) : results.length === 0 ? (
        <View style={styles.placeholderContainer}>
          <Ionicons name="search-outline" size={64} color="rgba(255,255,255,0.06)" style={{ marginBottom: 12 }} />
          <Text style={styles.placeholderTitle}>No Results Found</Text>
          <Text style={styles.placeholderDesc}>
            We couldn't find anything matching "{query}". Try checking your spelling or search another term.
          </Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const color = getCategoryColor(item.type);
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.resultItem}
                onPress={() => handleSearchItemPress(item)}
              >
                <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
                  <Ionicons name={getCategoryIcon(item.type)} size={20} color={color} />
                </View>

                <View style={styles.resultInfo}>
                  <View style={styles.resultHeaderRow}>
                    <Text style={styles.resultTitle} numberOfLines={1}>
                      {highlightText(item.title, query, styles.resultTitle)}
                    </Text>
                    <View style={[styles.typeBadge, { borderColor: `${color}40`, backgroundColor: `${color}10` }]}>
                      <Text style={[styles.typeBadgeText, { color }]}>{item.type.toUpperCase()}</Text>
                    </View>
                  </View>
                  <Text style={styles.resultDesc} numberOfLines={2}>
                    {highlightText(item.desc.replace(/&bull;/g, '•'), query, styles.resultDesc)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080b12',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111625',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    zIndex: 200,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
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
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#111625',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  categoryPillActive: {
    backgroundColor: '#4cd96b',
    borderColor: '#4cd96b',
  },
  categoryPillText: {
    color: '#90b090',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryPillTextActive: {
    color: '#080b12',
  },
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
  listContent: {
    padding: 16,
  },
  resultItem: {
    flexDirection: 'row',
    backgroundColor: '#111625',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  resultInfo: {
    flex: 1,
  },
  resultHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  resultTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Bold',
    flex: 1,
    marginRight: 8,
  },
  typeBadge: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  typeBadgeText: {
    fontSize: 8,
    fontWeight: '700',
  },
  resultDesc: {
    color: '#90b090',
    fontSize: 12,
    lineHeight: 16,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 80,
  },
  placeholderTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Bold',
    marginBottom: 8,
  },
  placeholderDesc: {
    color: '#90b090',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },
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
});

export default SearchScreen;
