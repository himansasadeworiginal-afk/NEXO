import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { BOOKS_DATA } from '../constants/nexoData';

const SettingsScreen = ({ navigation }) => {
  const {
    bookmarks,
    toggleBookmark,
    hapticsEnabled,
    toggleHaptics,
    themeMode,
    toggleTheme,
    resetProgress,
    triggerHaptic
  } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState('Preferences');
  const [activeBookFilter, setActiveBookFilter] = useState('All');

  const handleResetPress = () => {
    triggerHaptic('warning');
    Alert.alert(
      "Reset Progress?",
      "This will permanently erase all earned XP, streaks, unlocked badges, and lesson progress. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Reset Everything", 
          style: "destructive",
          onPress: () => {
            resetProgress();
            Alert.alert("Progress Reset", "All learning data has been cleared.");
          }
        }
      ]
    );
  };

  const getFilteredBooks = () => {
    if (activeBookFilter === 'All') return BOOKS_DATA;
    return BOOKS_DATA.filter(b => b.filter === activeBookFilter.toLowerCase());
  };

  const filteredBooks = getFilteredBooks();

  const handleBookPress = (book) => {
    triggerHaptic('medium');
    navigation.navigate('BookDetail', { bookId: book.id });
  };

  const handleSavedPress = (savedItem) => {
    triggerHaptic('medium');
    if (savedItem.type === 'lesson') {
      navigation.navigate('LessonDetail', { subjectId: savedItem.data.subjectId, lessonId: savedItem.data.lessonId });
    } else if (savedItem.type === 'book') {
      navigation.navigate('BookDetail', { bookId: savedItem.data.id || savedItem.itemId });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account &amp; Library</Text>
      </View>

      {/* TOP NAVIGATION TABS */}
      <View style={styles.tabBar}>
        {['Preferences', 'Saved Items', 'Book Library'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
            onPress={() => {
              triggerHaptic('light');
              setActiveTab(tab);
            }}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* TAB 1: PREFERENCES */}
        {activeTab === 'Preferences' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>User Preferences</Text>
            
            <View style={styles.preferenceItem}>
              <View style={styles.prefLeft}>
                <Ionicons name="finger-print" size={20} color="#4cd96b" style={{ marginRight: 12 }} />
                <View>
                  <Text style={styles.prefTitle}>Haptic Feedback</Text>
                  <Text style={styles.prefDesc}>Vibrate on quiz answers &amp; actions</Text>
                </View>
              </View>
              <Switch
                value={hapticsEnabled}
                onValueChange={toggleHaptics}
                trackColor={{ false: '#111625', true: '#4cd96b' }}
                thumbColor={hapticsEnabled ? '#080b12' : '#90b090'}
              />
            </View>

            <View style={styles.preferenceItem}>
              <View style={styles.prefLeft}>
                <Ionicons name="moon" size={20} color="#2aaf8f" style={{ marginRight: 12 }} />
                <View>
                  <Text style={styles.prefTitle}>Deep Dark Mode</Text>
                  <Text style={styles.prefDesc}>OLED-friendly dark theme visual style</Text>
                </View>
              </View>
              <Switch
                value={themeMode === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{ false: '#111625', true: '#2aaf8f' }}
                thumbColor={themeMode === 'dark' ? '#080b12' : '#90b090'}
              />
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Danger Zone</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.resetBtn}
              onPress={handleResetPress}
            >
              <Ionicons name="trash-outline" size={18} color="#d4606a" style={{ marginRight: 8 }} />
              <Text style={styles.resetBtnText}>Reset Learning Progress</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* TAB 2: SAVED ITEMS */}
        {activeTab === 'Saved Items' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Bookmarks ({bookmarks.length})</Text>
            {bookmarks.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="bookmark-outline" size={48} color="rgba(255,255,255,0.06)" style={{ marginBottom: 12 }} />
                <Text style={styles.emptyText}>No bookmarked items yet</Text>
                <Text style={styles.emptyDesc}>Save lessons or books from their detail views to view shortcuts here.</Text>
              </View>
            ) : (
              bookmarks.map((bookmark) => (
                <TouchableOpacity
                  key={bookmark.itemId}
                  style={styles.bookmarkCard}
                  activeOpacity={0.7}
                  onPress={() => handleSavedPress(bookmark)}
                >
                  <View style={styles.bookmarkLeft}>
                    <View style={[styles.bookmarkIconBg, { backgroundColor: bookmark.type === 'lesson' ? 'rgba(0, 229, 195, 0.1)' : 'rgba(255, 159, 67, 0.1)' }]}>
                      <Ionicons
                        name={bookmark.type === 'lesson' ? 'book' : 'library'}
                        size={18}
                        color={bookmark.type === 'lesson' ? '#4cd96b' : '#d4a040'}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.bookmarkTitle} numberOfLines={1}>{bookmark.title}</Text>
                      <Text style={styles.bookmarkDesc} numberOfLines={1}>{bookmark.desc}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.bookmarkRemove}
                    onPress={() => toggleBookmark(bookmark.type, bookmark.data)}
                  >
                    <Ionicons name="trash-outline" size={18} color="#d4606a" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}

        {/* TAB 3: BOOK LIBRARY */}
        {activeTab === 'Book Library' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nexo Summaries Library</Text>
            
            {/* HORIZONTAL FILTERS */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {['All', 'Productivity', 'Philosophy', 'Finance', 'Psychology', 'Power'].map(filter => (
                <TouchableOpacity
                  key={filter}
                  style={[styles.filterPill, activeBookFilter === filter && styles.filterPillActive]}
                  onPress={() => {
                    triggerHaptic('light');
                    setActiveBookFilter(filter);
                  }}
                >
                  <Text style={[styles.filterPillText, activeBookFilter === filter && styles.filterPillTextActive]}>
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* BOOKS LIST */}
            <View style={styles.booksList}>
              {filteredBooks.map((book) => (
                <TouchableOpacity
                  key={book.id}
                  style={styles.bookCard}
                  activeOpacity={0.8}
                  onPress={() => handleBookPress(book)}
                >
                  <View style={styles.bookIconContainer}>
                    <Text style={styles.bookLabelChar}>{book.title.charAt(0)}</Text>
                  </View>
                  <View style={styles.bookInfo}>
                    <Text style={styles.bookTitle} numberOfLines={1}>{book.title}</Text>
                    <Text style={styles.bookAuthor} numberOfLines={1}>By {book.author}</Text>
                    <View style={styles.filterTag}>
                      <Text style={styles.filterTagText}>{book.filter.toUpperCase()}</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#90b090" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    backgroundColor: '#0d121f',
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: '#4cd96b',
  },
  tabText: {
    color: '#90b090',
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#4cd96b',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {},
  sectionTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 16,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111625',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  prefLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  prefTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  prefDesc: {
    color: '#90b090',
    fontSize: 11,
    marginTop: 2,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(214, 48, 49, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(214, 48, 49, 0.2)',
    paddingVertical: 14,
    borderRadius: 12,
  },
  resetBtnText: {
    color: '#d4606a',
    fontWeight: '700',
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: '#111625',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  emptyText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyDesc: {
    color: '#90b090',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    marginHorizontal: 20,
    lineHeight: 16,
  },
  bookmarkCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111625',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  bookmarkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  bookmarkIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bookmarkTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  bookmarkDesc: {
    color: '#90b090',
    fontSize: 11,
    marginTop: 2,
  },
  bookmarkRemove: {
    padding: 8,
  },
  filterScroll: {
    marginBottom: 16,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#111625',
    marginRight: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  filterPillActive: {
    backgroundColor: '#d4a040',
    borderColor: '#d4a040',
  },
  filterPillText: {
    color: '#90b090',
    fontSize: 12,
    fontWeight: '600',
  },
  filterPillTextActive: {
    color: '#080b12',
  },
  booksList: {
    gap: 10,
  },
  bookCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111625',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  bookIconContainer: {
    width: 44,
    height: 60,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 159, 67, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 159, 67, 0.2)',
    marginRight: 14,
  },
  bookLabelChar: {
    color: '#d4a040',
    fontSize: 20,
    fontWeight: '700',
  },
  bookInfo: {
    flex: 1,
    marginRight: 8,
  },
  bookTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  bookAuthor: {
    color: '#90b090',
    fontSize: 11,
    marginTop: 2,
  },
  filterTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  filterTagText: {
    color: '#90b090',
    fontSize: 8,
    fontWeight: '700',
  }
});

export default SettingsScreen;
