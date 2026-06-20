import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Share
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { AppContext } from '../context/AppContext';
import { BOOKS_DATA } from '../constants/nexoData';
import { BOOK_HTML } from '../constants/nexoHtmlData';

const BOOK_SLUG_MAP = {
  '01': '48-laws-of-power',
  '02': 'atomic-habits',
  '03': 'building-a-second-brain',
  '04': 'deep-work',
  '05': 'ego-is-the-enemy',
  '06': 'hyperfocus',
  '07': 'money-unlocked',
  '08': 'power-of-now',
  '09': 'psycho-cybernetics',
  '10': 'the-changing-world-order',
  '11': 'what-every-body-is-saying',
  '12': 'book-of-wisdom',
  '13': 'daily-robert-greene',
  '14': 'mastery',
  '15': 'read-people-like-a-book',
  '16': 'rich-dad-poor-dad',
  '17': 'surrounded-by-idiots',
  '18': 'surrounded-by-psychopaths',
  '19': 'the-art-of-seduction',
  '20': 'the-concise-laws',
  '21': 'the-laws-of-human-nature',
  '22': 'the-millionaire-master-plan',
  '23': 'the-prince',
  '24': 'the-psychology-of-money'
};

const BookDetailScreen = ({ route, navigation }) => {
  const { bookId } = route.params || {};
  const { bookmarks, toggleBookmark, triggerHaptic } = useContext(AppContext);

  const book = BOOKS_DATA.find(b => b.id === bookId) || BOOKS_DATA[0];
  const isBookmarked = !!bookmarks.find(b => b.itemId === book.id && b.type === 'book');

  const bookSlug = BOOK_SLUG_MAP[book.id];
  const htmlContent = bookSlug ? BOOK_HTML[bookSlug] : null;

  const getBookTakeaways = () => {
    switch (book.title) {
      case 'Atomic Habits':
        return [
          { title: "1% Better Every Day", desc: "Compounding self-improvement: tiny changes (habits) accumulate over time to produce massive transformations." },
          { title: "The 4 Laws of Behavior Change", desc: "Make habits: 1. Obvious, 2. Attractive, 3. Easy, and 4. Satisfying. Invert these laws to break bad habits." },
          { title: "System Over Goals", desc: "You do not rise to the level of your goals; you fall to the level of your systems. Focus on who you want to become." }
        ];
      case 'Deep Work':
        return [
          { title: "High-Quality Work Formula", desc: "High-Quality Work Produced = (Time Spent) x (Intensity of Focus). Eliminate distractions to maximize output." },
          { title: "Embrace Boredom", desc: "Train your brain to resist the urge for instant distraction. Boredom is the playground of deep thought." },
          { title: "Schedule Every Minute", desc: "Structure your workday by block-scheduling tasks to protect time blocks for intense, uninterrupted concentration." }
        ];
      case 'The Psychology of Money':
        return [
          { title: "Wealth is What You Don't See", desc: "True wealth is the asset base not spent on items. Spending money to show people how much money you have is the fastest way to have less money." },
          { title: "Reasonable > Rational", desc: "Do not aim to be coldly rational when managing your money; aim to be reasonable. Peace of mind beats optimal math." },
          { title: "Freedom is the Highest Dividend", desc: "The greatest value of money is the ability to control your time, do what you want, when you want, with whom you want." }
        ];
      case 'Ego Is the Enemy':
        return [
          { title: "Aspire: Talk Less, Do More", desc: "When beginning, let actions speak. Talking is easy, doing is hard. Stay a perpetual student." },
          { title: "Success: Maintain Humility", desc: "Once successful, ego tries to convince us we are infallible. Focus on organizing systems, not enjoying praise." },
          { title: "Failure: Learn from Setbacks", desc: "When hitting roadblocks, ego leads to self-pity and blame. Choose to learn, adjust, and continue without taking it personally." }
        ];
      default:
        return [
          { title: "Focus on Implementation", desc: "Acquiring knowledge is only the first step. The true value lies in execution and daily practice of these principles." },
          { title: "Core Concept Mastery", desc: "Isolate the most critical 20% of ideas (Pareto principle) that yield 80% of the practical real-world benefits." },
          { title: "Continuous Reflection", desc: "Review summaries regularly. Re-examine details periodically to reinforce cognitive pathways and retention." }
        ];
    }
  };

  const takeaways = getBookTakeaways();

  const handleShare = async () => {
    triggerHaptic('light');
    try {
      await Share.share({
        message: `Reading the summary of "${book.title}" by ${book.author} on Nexo!`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.circleBtn}
          onPress={() => {
            triggerHaptic('light');
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={20} color="#ffffff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>Book Summary</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.circleBtn, { marginRight: 8 }]}
            onPress={handleShare}
          >
            <Ionicons name="share-social-outline" size={20} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => toggleBookmark('book', book)}
          >
            <Ionicons
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={20}
              color={isBookmarked ? "#d4a040" : "#ffffff"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {htmlContent ? (
        <WebView
          source={{ html: htmlContent }}
          style={styles.webview}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          javaScriptEnabled={false}
          domStorageEnabled={false}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.bookCoverCard}>
            <View style={styles.bookIconLarge}>
              <Text style={styles.bookIconText}>{book.title.charAt(0)}</Text>
            </View>
            <Text style={styles.bookTitleText}>{book.title}</Text>
            <Text style={styles.bookAuthorText}>By {book.author}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{book.filter.toUpperCase()}</Text>
            </View>
          </View>

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <View style={styles.titleUnderline} />
            <Text style={styles.bookDescText}>{book.desc}</Text>
          </View>

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Top 3 Takeaways</Text>
            <View style={styles.titleUnderline} />

            {takeaways.map((takeaway, idx) => (
              <View key={idx} style={styles.takeawayItem}>
                <View style={styles.takeawayNumContainer}>
                  <Text style={styles.takeawayNum}>{idx + 1}</Text>
                </View>
                <View style={styles.takeawayContent}>
                  <Text style={styles.takeawayTitle}>{takeaway.title}</Text>
                  <Text style={styles.takeawayDesc}>{takeaway.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#111625',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  headerActions: {
    flexDirection: 'row',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  bookCoverCard: {
    backgroundColor: '#111625',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 20,
  },
  bookIconLarge: {
    width: 70,
    height: 96,
    borderRadius: 12,
    backgroundColor: 'rgba(212, 160, 64, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 160, 64, 0.3)',
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  bookIconText: {
    color: '#d4a040',
    fontSize: 36,
    fontWeight: '700',
  },
  bookTitleText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  bookAuthorText: {
    color: '#90b090',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: 'rgba(212, 160, 64, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 160, 64, 0.3)',
  },
  categoryBadgeText: {
    color: '#d4a040',
    fontSize: 10,
    fontWeight: '700',
  },
  sectionBlock: {
    backgroundColor: '#111625',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Bold',
    marginBottom: 6,
  },
  titleUnderline: {
    height: 2,
    backgroundColor: '#d4a040',
    width: 40,
    borderRadius: 1,
    marginBottom: 16,
  },
  bookDescText: {
    color: '#90b090',
    fontSize: 14,
    lineHeight: 22,
  },
  takeawayItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  takeawayNumContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(212, 160, 64, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 160, 64, 0.3)',
  },
  takeawayNum: {
    color: '#d4a040',
    fontSize: 12,
    fontWeight: '700',
  },
  takeawayContent: {
    flex: 1,
  },
  takeawayTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  takeawayDesc: {
    color: '#90b090',
    fontSize: 12,
    lineHeight: 18,
  }
});

export default BookDetailScreen;
