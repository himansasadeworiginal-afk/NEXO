import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Share,
  Modal,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { AppContext } from '../context/AppContext';
import { SUBJECTS_DATA, LESSON_NOTES } from '../constants/nexoData';
import { LESSON_HTML } from '../constants/nexoHtmlData';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const LessonDetailScreen = ({ route, navigation }) => {
  const { subjectId, lessonId } = route.params || {};
  const { lessonStatus, updateLessonStatus, bookmarks, toggleBookmark, triggerHaptic } = useContext(AppContext);
  const [showNotes, setShowNotes] = useState(false);

  const subject = SUBJECTS_DATA.find(s => s.id === subjectId) || SUBJECTS_DATA[0];
  const lesson = subject.lessons.find(l => l.id === lessonId) || subject.lessons[0];

  const currentStatus = lessonStatus[`${subject.id}_${lesson.id}`] || 'not-started';
  const htmlContent = LESSON_HTML[subject.id]?.[String(lesson.id)];

  useEffect(() => {
    if (currentStatus === 'not-started') {
      updateLessonStatus(subject.id, lesson.id, 'in-progress');
    }
  }, []);

  const handleStatusCycle = () => {
    let nextStatus = 'not-started';
    if (currentStatus === 'not-started') nextStatus = 'in-progress';
    else if (currentStatus === 'in-progress') nextStatus = 'done';
    else if (currentStatus === 'done') nextStatus = 'not-started';

    triggerHaptic('medium');
    updateLessonStatus(subject.id, lesson.id, nextStatus);
  };

  const getStatusDetails = () => {
    switch (currentStatus) {
      case 'done':
        return { label: 'Done', icon: 'checkmark-circle', color: '#4cd96b', bgColor: 'rgba(76, 217, 107, 0.15)' };
      case 'in-progress':
        return { label: 'In Progress', icon: 'play-circle', color: '#2aaf8f', bgColor: 'rgba(42, 175, 143, 0.15)' };
      default:
        return { label: 'Not Started', icon: 'ellipse-outline', color: '#90b090', bgColor: 'rgba(255, 255, 255, 0.05)' };
    }
  };

  const statusDetails = getStatusDetails();
  const isBookmarked = !!bookmarks.find(b => b.itemId === `${subject.id}_${lesson.id}` && b.type === 'lesson');

  const notes = LESSON_NOTES[subject.id]?.[lesson.id] || {
    title: lesson.title,
    sections: [{ title: 'Overview', type: 'text', content: 'Materials are currently in development. You can practice with the lesson Quiz and Flashcards below!' }]
  };

  const getAccentColor = () => {
    if (subject.id === 'economics') return '#2aaf8f';
    if (subject.id === 'business') return '#d4a040';
    if (subject.id === 'ict') return '#8a5abe';
    return '#2aaf8f';
  };
  const accentColor = getAccentColor();

  const handleShare = async () => {
    triggerHaptic('light');
    try {
      await Share.share({
        message: `Studying "${lesson.title}" under ${subject.name} on Nexo!`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderSectionContent = (sec, idx) => {
    if (sec.type === 'text') {
      return <Text key={idx} style={styles.sectionParagraph}>{sec.content}</Text>;
    }

    if (sec.type === 'comparison') {
      return (
        <View key={idx} style={styles.comparisonWrapper}>
          <View style={styles.comparisonHalf}>
            <Text style={[styles.comparisonHeader, { color: accentColor }]}>{sec.leftTitle}</Text>
            {sec.leftItems.map((item, i) => (
              <Text key={i} style={styles.bulletItem}>• {item}</Text>
            ))}
          </View>
          <View style={styles.comparisonDivider} />
          <View style={styles.comparisonHalf}>
            <Text style={[styles.comparisonHeader, { color: '#4cd96b' }]}>{sec.rightTitle}</Text>
            {sec.rightItems.map((item, i) => (
              <Text key={i} style={styles.bulletItem}>• {item}</Text>
            ))}
          </View>
        </View>
      );
    }

    if (sec.type === 'cards') {
      return (
        <View key={idx} style={styles.cardsGrid}>
          {sec.items.map((item, i) => (
            <View key={i} style={styles.infoCard}>
              <Text style={[styles.infoCardLabel, { color: accentColor }]}>{item.label}</Text>
              <Text style={styles.infoCardDesc}>{item.desc}</Text>
            </View>
          ))}
        </View>
      );
    }

    return null;
  };

  const renderNotes = () => (
    <View style={styles.notesContainer}>
      {notes.sections.map((sec, idx) => (
        <View key={idx} style={styles.sectionBlock}>
          <Text style={styles.sectionBlockTitle}>{sec.title}</Text>
          <View style={[styles.sectionDivider, { backgroundColor: accentColor }]} />
          {renderSectionContent(sec, idx)}
        </View>
      ))}
    </View>
  );

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

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerSub}>{subject.name} &bull; Lesson {lesson.id}</Text>
          <Text style={styles.headerTitle} numberOfLines={1}>{lesson.title}</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.circleBtn, { marginRight: 8 }]}
            onPress={handleShare}
          >
            <Ionicons name="share-social-outline" size={20} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => toggleBookmark('lesson', { subjectId: subject.id, lessonId: lesson.id, title: lesson.title, desc: lesson.desc })}
          >
            <Ionicons
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={20}
              color={isBookmarked ? "#4cd96b" : "#ffffff"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statusSection}>
        <Text style={styles.statusLabelText}>Status:</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleStatusCycle}
          style={[styles.statusPill, { backgroundColor: statusDetails.bgColor }]}
        >
          <Ionicons name={statusDetails.icon} size={14} color={statusDetails.color} style={{ marginRight: 6 }} />
          <Text style={[styles.statusPillText, { color: statusDetails.color }]}>{statusDetails.label}</Text>
          <Ionicons name="swap-horizontal" size={12} color={statusDetails.color} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>

      {htmlContent ? (
        <View style={styles.contentArea}>
          <WebView
            source={{ html: htmlContent }}
            style={styles.webview}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
          <TouchableOpacity
            style={styles.notesFab}
            activeOpacity={0.8}
            onPress={() => {
              triggerHaptic('light');
              setShowNotes(true);
            }}
          >
            <Ionicons name="document-text-outline" size={22} color="#080b12" />
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {renderNotes()}
        </ScrollView>
      )}

      <Modal
        visible={showNotes}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNotes(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setShowNotes(false)}
        >
          <View />
        </TouchableOpacity>
        <View style={styles.modalSheet}>
          <View style={styles.modalHandleWrapper}>
            <View style={styles.modalHandle} />
          </View>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Study Notes</Text>
            <TouchableOpacity
              onPress={() => setShowNotes(false)}
              style={styles.modalCloseBtn}
            >
              <Ionicons name="close" size={22} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScroll}>
            {renderNotes()}
          </ScrollView>
        </View>
      </Modal>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.bottomBtn, styles.quizBtn]}
          onPress={() => {
            triggerHaptic('medium');
            navigation.navigate('Quiz', { subjectId: subject.id, lessonId: lesson.id });
          }}
        >
          <Ionicons name="help-circle" size={18} color="#080b12" style={{ marginRight: 6 }} />
          <Text style={styles.quizBtnText}>Start Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.bottomBtn, styles.flashcardBtn]}
          onPress={() => {
            triggerHaptic('medium');
            navigation.navigate('Flashcard', { subjectId: subject.id, lessonId: lesson.id });
          }}
        >
          <Ionicons name="copy" size={18} color="#4cd96b" style={{ marginRight: 6 }} />
          <Text style={styles.flashcardBtnText}>Review Cards</Text>
        </TouchableOpacity>
      </View>
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
  headerTitleContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  headerSub: {
    color: '#90b090',
    fontSize: 10,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  headerActions: {
    flexDirection: 'row',
  },
  statusSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#111625',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  statusLabelText: {
    color: '#90b090',
    fontSize: 13,
    marginRight: 10,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusPillText: {
    fontWeight: '700',
    fontSize: 12,
  },
  contentArea: {
    flex: 1,
    position: 'relative',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  notesFab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4cd96b',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  notesContainer: {},
  sectionBlock: {
    backgroundColor: '#111625',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  sectionBlockTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Bold',
    marginBottom: 6,
  },
  sectionDivider: {
    height: 2,
    borderRadius: 1,
    width: 40,
    marginBottom: 16,
  },
  sectionParagraph: {
    color: '#90b090',
    fontSize: 14,
    lineHeight: 22,
  },
  comparisonWrapper: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  comparisonHalf: {
    flex: 1,
    padding: 12,
  },
  comparisonHeader: {
    fontWeight: '700',
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'center',
  },
  bulletItem: {
    color: '#90b090',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 4,
  },
  comparisonDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardsGrid: {
    gap: 10,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
  },
  infoCardLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  infoCardDesc: {
    color: '#90b090',
    fontSize: 12,
    lineHeight: 16,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: SCREEN_HEIGHT * 0.75,
    backgroundColor: '#111625',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 100,
  },
  modalHandleWrapper: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 4,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalScroll: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#080b12',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    gap: 12,
  },
  bottomBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 25,
  },
  quizBtn: {
    backgroundColor: '#2ea84c',
  },
  quizBtnText: {
    color: '#080b12',
    fontWeight: '700',
    fontSize: 14,
  },
  flashcardBtn: {
    backgroundColor: 'rgba(76, 217, 107, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(76, 217, 107, 0.3)',
  },
  flashcardBtnText: {
    color: '#4cd96b',
    fontWeight: '700',
    fontSize: 14,
  }
});

export default LessonDetailScreen;
