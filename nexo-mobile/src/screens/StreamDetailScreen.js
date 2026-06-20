import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { STREAMS_DATA } from '../constants/nexoData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.78;

const StreamDetailScreen = ({ route, navigation }) => {
  const { streamId, autoShowNotify } = route.params || {};
  const { lessonStatus, triggerHaptic } = useContext(AppContext);
  const [subscribedSubjects, setSubscribedSubjects] = useState({});

  const stream = STREAMS_DATA.find(s => s.id === streamId) || STREAMS_DATA[0];

  useEffect(() => {
    if (autoShowNotify) {
      handleNotifyPress(autoShowNotify, true);
    }
  }, [autoShowNotify]);

  const handleNotifyPress = (subjectId, silent = false) => {
    if (subscribedSubjects[subjectId]) return;

    triggerHaptic('success');
    setSubscribedSubjects(prev => ({
      ...prev,
      [subjectId]: true
    }));

    if (!silent) {
      Alert.alert(
        "Notification Set",
        "We will alert you as soon as this subject's materials are available!",
        [{ text: "Awesome" }]
      );
    }
  };

  const getSubjectStatus = (subjId) => {
    if (subjId === 'economics') {
      const statuses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(id => lessonStatus[`economics_${id}`]);
      const doneCount = statuses.filter(s => s === 'done').length;
      if (doneCount === 12) return 'Done';
      if (doneCount > 0 || statuses.some(s => s === 'in-progress')) return 'In Progress';
      return 'Not Started';
    }
    if (subjId === 'business') {
      const statuses = [1, 2, 3, 4, 5, 6, 7, 8].map(id => lessonStatus[`business_${id}`]);
      const doneCount = statuses.filter(s => s === 'done').length;
      if (doneCount === 8) return 'Done';
      if (doneCount > 0 || statuses.some(s => s === 'in-progress')) return 'In Progress';
      return 'Not Started';
    }
    if (subjId === 'ict') {
      const statuses = [1, 2].map(id => lessonStatus[`ict_${id}`]);
      const doneCount = statuses.filter(s => s === 'done').length;
      if (doneCount === 2) return 'Done';
      if (doneCount > 0 || statuses.some(s => s === 'in-progress')) return 'In Progress';
      return 'Not Started';
    }
    return 'Coming Soon';
  };

  const handleCardPress = (subject) => {
    triggerHaptic('medium');
    if (subject.comingSoon) {
      handleNotifyPress(subject.id);
    } else {
      navigation.navigate('SubjectDetail', { subjectId: subject.id });
    }
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
        <Text style={styles.headerTitle}>{stream.name} Stream</Text>
        <View style={{ width: 40 }} /> {/* Spacer */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subText}>
          Explore subjects under the {stream.name} study pathway. Swipe through the catalog to begin studying or unlock notifications for upcoming content.
        </Text>

        {/* HORIZONTAL CARDS SCROLL */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          decelerationRate="fast"
          contentContainerStyle={styles.cardsScroll}
        >
          {stream.subjects.map(subject => {
            const status = getSubjectStatus(subject.id);
            const isLocked = subject.comingSoon;
            const isSubscribed = !!subscribedSubjects[subject.id];

            return (
              <TouchableOpacity
                key={subject.id}
                activeOpacity={0.9}
                style={[
                  styles.subjectCard,
                  { borderTopColor: subject.accent }
                ]}
                onPress={() => handleCardPress(subject)}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.accentIndicator, { backgroundColor: subject.accent }]} />
                  <Text style={[styles.statusTag, 
                    status === 'Done' ? styles.statusDone :
                    status === 'In Progress' ? styles.statusInProgress :
                    isLocked ? styles.statusComingSoon : styles.statusNotStarted
                  ]}>
                    {status}
                  </Text>
                </View>

                <Text style={styles.subjectName}>{subject.name}</Text>
                
                {isLocked ? (
                  <View style={styles.lockedContainer}>
                    <Ionicons name="lock-closed-outline" size={48} color="rgba(255, 255, 255, 0.2)" />
                    <Text style={styles.lockedMessage}>Materials are currently being prepared by our instructors.</Text>
                    
                    <TouchableOpacity
                      style={[styles.notifyBtn, isSubscribed && styles.notifyBtnSubscribed]}
                      onPress={() => handleNotifyPress(subject.id)}
                    >
                      <Ionicons 
                        name={isSubscribed ? "checkmark-circle" : "notifications"} 
                        size={16} 
                        color={isSubscribed ? "#4cd96b" : "#ffffff"} 
                        style={{ marginRight: 6 }} 
                      />
                      <Text style={[styles.notifyBtnText, isSubscribed && styles.notifyBtnTextSubscribed]}>
                        {isSubscribed ? "Subscribed" : "Notify Me"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.activeContentContainer}>
                    <Text style={styles.subjectLessonsInfo}>
                      Contains full interactive study notes, SRS study decks, and multiple-choice quizzes.
                    </Text>
                    <View style={styles.statsRow}>
                      <View style={styles.statBox}>
                        <Text style={styles.statVal}>{subject.totalLessons}</Text>
                        <Text style={styles.statLbl}>Lessons</Text>
                      </View>
                      <View style={styles.statDivider} />
                      <View style={styles.statBox}>
                        <Text style={styles.statVal}>8</Text>
                        <Text style={styles.statLbl}>SRS Cards</Text>
                      </View>
                    </View>

                    <View style={styles.startStudyingRow}>
                      <Text style={styles.startStudyingText}>Open Subject Hub</Text>
                      <Ionicons name="arrow-forward-circle" size={24} color="#4cd96b" />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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
    paddingBottom: 40,
  },
  subText: {
    color: '#90b090',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  cardsScroll: {
    paddingVertical: 10,
    paddingLeft: 4,
  },
  subjectCard: {
    width: CARD_WIDTH,
    backgroundColor: '#111625',
    borderRadius: 20,
    padding: 24,
    marginRight: 20,
    borderTopWidth: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'space-between',
    height: 380,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  accentIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusTag: {
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statusDone: {
    backgroundColor: 'rgba(76, 217, 107, 0.15)',
    color: '#4cd96b',
  },
  statusInProgress: {
    backgroundColor: 'rgba(42, 175, 143, 0.15)',
    color: '#2aaf8f',
  },
  statusNotStarted: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: '#90b090',
  },
  statusComingSoon: {
    backgroundColor: 'rgba(212, 160, 64, 0.15)',
    color: '#d4a040',
  },
  subjectName: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Bold',
    marginBottom: 12,
  },
  lockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  lockedMessage: {
    color: '#90b090',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 20,
    lineHeight: 16,
  },
  notifyBtn: {
    backgroundColor: '#2aaf8f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '100%',
  },
  notifyBtnSubscribed: {
    backgroundColor: 'rgba(76, 217, 107, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(76, 217, 107, 0.3)',
  },
  notifyBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
  },
  notifyBtnTextSubscribed: {
    color: '#4cd96b',
  },
  activeContentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  subjectLessonsInfo: {
    color: '#90b090',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
    marginBottom: 16,
  },
  statBox: {
    alignItems: 'center',
  },
  statVal: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  statLbl: {
    color: '#90b090',
    fontSize: 11,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  startStudyingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: 16,
  },
  startStudyingText: {
    color: '#4cd96b',
    fontWeight: '700',
    fontSize: 14,
  }
});

export default StreamDetailScreen;
