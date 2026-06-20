import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { SUBJECTS_DATA } from '../constants/nexoData';

const SubjectDetailScreen = ({ route, navigation }) => {
  const { subjectId } = route.params || {};
  const { lessonStatus, triggerHaptic } = useContext(AppContext);
  const [activeLessonCollapse, setActiveLessonCollapse] = useState(null);

  const subject = SUBJECTS_DATA.find(s => s.id === subjectId) || SUBJECTS_DATA[0];

  const getAccentColor = () => {
    if (subject.id === 'economics') return '#2aaf8f';
    if (subject.id === 'business') return '#d4a040';
    if (subject.id === 'ict') return '#8a5abe';
    return '#2aaf8f';
  };

  const accentColor = getAccentColor();

  const getLessonState = (lessonId) => {
    return lessonStatus[`${subject.id}_${lessonId}`] || 'not-started';
  };

  const getStatusLabelAndIcon = (state) => {
    switch (state) {
      case 'done':
        return { label: 'Done', icon: 'checkmark-circle', color: '#4cd96b' };
      case 'in-progress':
        return { label: 'In Progress', icon: 'play-circle', color: '#2aaf8f' };
      default:
        return { label: 'Not Started', icon: 'ellipse-outline', color: '#90b090' };
    }
  };

  const getSubjectProgress = () => {
    const total = subject.lessons.length;
    const completed = subject.lessons.filter(l => getLessonState(l.id) === 'done').length;
    const percent = total > 0 ? completed / total : 0;
    return { total, completed, percent };
  };

  const progress = getSubjectProgress();

  const handleStartStudying = () => {
    // Find first incomplete lesson
    const nextLesson = subject.lessons.find(l => getLessonState(l.id) !== 'done') || subject.lessons[0];
    triggerHaptic('heavy');
    navigation.navigate('LessonDetail', { subjectId: subject.id, lessonId: nextLesson.id });
  };

  const handleLessonPress = (lessonId) => {
    triggerHaptic('light');
    setActiveLessonCollapse(prev => (prev === lessonId ? null : lessonId));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            triggerHaptic('light');
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{subject.name} Hub</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* SUBJECT BANNER CARD */}
        <View style={[styles.bannerCard, { borderLeftColor: accentColor }]}>
          <Text style={[styles.bannerStreamText, { color: accentColor }]}>SUBJECT DASHBOARD</Text>
          <Text style={styles.bannerTitle}>{subject.name}</Text>
          
          <View style={styles.progressSection}>
            <View style={styles.progressRow}>
              <Text style={styles.progressText}>Lessons Completed</Text>
              <Text style={styles.progressCount}>{progress.completed} / {progress.total}</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressIndicator, { width: `${progress.percent * 100}%`, backgroundColor: accentColor }]} />
            </View>
          </View>
        </View>

        {/* LESSONS LIST */}
        <Text style={styles.sectionTitle}>Syllabus Lessons</Text>
        {subject.lessons.map((lesson) => {
          const state = getLessonState(lesson.id);
          const statusInfo = getStatusLabelAndIcon(state);
          const isCollapsed = activeLessonCollapse === lesson.id;

          return (
            <View key={lesson.id} style={styles.lessonCard}>
              <TouchableOpacity
                style={styles.lessonCardHeader}
                activeOpacity={0.8}
                onPress={() => handleLessonPress(lesson.id)}
              >
                <View style={styles.lessonCardLeft}>
                  <View style={styles.lessonNumBox}>
                    <Text style={[styles.lessonNumText, { color: accentColor }]}>
                      {lesson.id < 10 ? `0${lesson.id}` : lesson.id}
                    </Text>
                  </View>
                  <View style={styles.lessonTitleWrapper}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <View style={styles.statusRow}>
                      <Ionicons name={statusInfo.icon} size={12} color={statusInfo.color} style={{ marginRight: 4 }} />
                      <Text style={[styles.statusText, { color: statusInfo.color }]}>{statusInfo.label}</Text>
                    </View>
                  </View>
                </View>
                <Ionicons
                  name={isCollapsed ? 'chevron-up' : 'chevron-down'}
                  size={18}
                    color="#90b090"
                />
              </TouchableOpacity>

              {isCollapsed && (
                <View style={styles.lessonCardBody}>
                  <Text style={styles.lessonDesc}>{lesson.desc}</Text>
                  <View style={styles.lessonActionsRow}>
                    <TouchableOpacity
                      style={[styles.actionBtn, { borderColor: 'rgba(255,255,255,0.08)' }]}
                      onPress={() => {
                        triggerHaptic('medium');
                        navigation.navigate('LessonDetail', { subjectId: subject.id, lessonId: lesson.id });
                      }}
                    >
                      <Ionicons name="book-outline" size={14} color="#ffffff" style={{ marginRight: 6 }} />
                      <Text style={styles.actionBtnText}>Read Notes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.actionBtn, {     borderColor: 'rgba(76, 217, 107, 0.2)' }]}
                      onPress={() => {
                        triggerHaptic('medium');
                        navigation.navigate('Quiz', { subjectId: subject.id, lessonId: lesson.id });
                      }}
                    >
                      <Ionicons name="help-circle-outline" size={14} color="#4cd96b" style={{ marginRight: 6 }} />
                       <Text style={[styles.actionBtnText, { color: '#4cd96b' }]}>Take Quiz</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.actionBtn, {     borderColor: 'rgba(42, 175, 143, 0.2)' }]}
                      onPress={() => {
                        triggerHaptic('medium');
                        navigation.navigate('Flashcard', { subjectId: subject.id, lessonId: lesson.id });
                      }}
                    >
                      <Ionicons name="copy-outline" size={14} color="#2aaf8f" style={{ marginRight: 6 }} />
                       <Text style={[styles.actionBtnText, { color: '#2aaf8f' }]}>Flashcards</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* FOOTER CTA */}
      <View style={styles.footerCTA}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.ctaButton, { backgroundColor: accentColor }]}
          onPress={handleStartStudying}
        >
          <Text style={styles.ctaButtonText}>
            {progress.completed === 0 ? "Start Studying" : "Continue Studying"}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#ffffff" style={{ marginLeft: 8 }} />
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
  backButton: {
    padding: 8,
    backgroundColor: '#111625',
    borderRadius: 20,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Leave room for footer CTA
  },
  bannerCard: {
    backgroundColor: '#111625',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 24,
  },
  bannerStreamText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  bannerTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Bold',
    marginBottom: 16,
  },
  progressSection: {},
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    color: '#90b090',
    fontSize: 12,
  },
  progressCount: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressIndicator: {
    height: '100%',
    borderRadius: 3,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Bold',
    marginBottom: 12,
  },
  lessonCard: {
    backgroundColor: '#111625',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 10,
    overflow: 'hidden',
  },
  lessonCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  lessonCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonNumBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lessonNumText: {
    fontSize: 14,
    fontWeight: '700',
  },
  lessonTitleWrapper: {
    flex: 1,
    marginRight: 8,
  },
  lessonTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  lessonCardBody: {
    backgroundColor: '#0d121f',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.03)',
  },
  lessonDesc: {
    color: '#90b090',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 16,
  },
  lessonActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  actionBtnText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  footerCTA: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#080b12',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  ctaButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  }
});

export default SubjectDetailScreen;
