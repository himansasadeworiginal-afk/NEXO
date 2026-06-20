import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from '../utils/nativeGuard';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { STREAMS_DATA, BADGES_DEF } from '../constants/nexoData';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HomeScreen = ({ navigation }) => {
  const { xp, streak, badges, lessonStatus, triggerHaptic } = useContext(AppContext);
  const [selectedStreamFilter, setSelectedStreamFilter] = useState('All');
  const [expandedStreams, setExpandedStreams] = useState({});

  const level = Math.floor(xp / 1000) + 1;
  const xpInCurrentLevel = xp % 1000;
  const xpProgress = xpInCurrentLevel / 1000;

  const toggleStreamExpand = (streamId) => {
    triggerHaptic('light');
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedStreams(prev => ({
      ...prev,
      [streamId]: !prev[streamId]
    }));
  };

  const handleSubjectPress = (subject) => {
    triggerHaptic('medium');
    if (subject.comingSoon) {
      navigation.navigate('StreamDetail', { streamId: subject.streamId, autoShowNotify: subject.id });
    } else {
      navigation.navigate('SubjectDetail', { subjectId: subject.id });
    }
  };

  const filteredStreams = selectedStreamFilter === 'All'
    ? STREAMS_DATA
    : STREAMS_DATA.filter(s => s.name === selectedStreamFilter || s.id === selectedStreamFilter.toLowerCase());

  const getSubjectStatus = (subjId) => {
    // Economics or Business or ICT status
    if (subjId === 'economics') {
      const statuses = ['economics_1', 'economics_2'].map(id => lessonStatus[id]);
      if (statuses.every(s => s === 'done')) return 'Completed';
      if (statuses.some(s => s === 'in-progress' || s === 'done')) return 'In Progress';
      return 'Not Started';
    }
    return 'Not Started';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* HEADER / PROFILE SECTION */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.profileName}>Aiden Silva</Text>
            <View style={styles.tierBadge}>
              <Text style={styles.tierText}>FREE ACCOUNT</Text>
            </View>
          </View>
          <View style={styles.streakWrapper}>
            <Ionicons name="flame" size={24} color="#d4a040" />
            <Text style={styles.streakCount}>{streak.count || 7}d streak</Text>
          </View>
        </View>

        {/* HERO XP CARD */}
        <LinearGradient
          colors={['#0c110c', '#060906']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.xpCard}
        >
          <View style={styles.xpHeader}>
            <View>
              <Text style={styles.xpLabel}>CURRENT LEVEL</Text>
              <Text style={styles.levelText}>Lvl {level}</Text>
            </View>
            <View style={styles.xpValueWrapper}>
              <Text style={styles.xpValueText}>{xp} XP</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${xpProgress * 100}%` }]} />
          </View>
          <Text style={styles.xpMutedText}>{1000 - xpInCurrentLevel} XP until Level {level + 1}</Text>
        </LinearGradient>

        {/* BADGES PREVIEW */}
        {badges.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Badges Unlocked ({badges.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badgesScroll}>
              {badges.map(bId => {
                const badgeDef = BADGES_DEF.find(b => b.id === bId);
                if (!badgeDef) return null;
                return (
                  <View key={bId} style={styles.badgeItem}>
                    <Text style={styles.badgeIcon}>{badgeDef.icon}</Text>
                    <Text style={styles.badgeName} numberOfLines={1}>{badgeDef.name}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* STICKY STREAM FILTER TABS */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {['All', 'Commerce', 'Technology', 'Science / Maths', 'Humanities / Arts'].map(tab => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.filterTab,
                  selectedStreamFilter === tab && styles.filterTabActive
                ]}
                onPress={() => {
                  triggerHaptic('light');
                  setSelectedStreamFilter(tab);
                }}
              >
                <Text style={[
                  styles.filterTabText,
                  selectedStreamFilter === tab && styles.filterTabTextActive
                ]}>
                  {tab === 'Science / Maths' ? 'Science' : tab === 'Humanities / Arts' ? 'Humanities' : tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* STREAM GRID */}
        <View style={styles.streamsContainer}>
          <Text style={styles.sectionTitle}>Study Streams</Text>
          {filteredStreams.map(stream => {
            const isExpanded = !!expandedStreams[stream.id];
            return (
              <View key={stream.id} style={styles.streamCardWrapper}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.streamCard}
                  onPress={() => toggleStreamExpand(stream.id)}
                >
                  <View style={styles.streamLeft}>
                    <View style={styles.streamIconBg}>
                      <Ionicons name={stream.icon} size={22} color="#4cd96b" />
                    </View>
                    <View>
                      <Text style={styles.streamName}>{stream.name}</Text>
                      <Text style={styles.streamSub}>{stream.subjects.length} Subjects</Text>
                    </View>
                  </View>
                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#90b090"
                  />
                </TouchableOpacity>

                {/* Expanded Subject List */}
                {isExpanded && (
                  <View style={styles.expandedContent}>
                    {stream.subjects.map(subject => {
                      const isLocked = subject.comingSoon;
                      return (
                        <TouchableOpacity
                          key={subject.id}
                          style={styles.subjectItemRow}
                          onPress={() => handleSubjectPress({ ...subject, streamId: stream.id })}
                          activeOpacity={0.7}
                        >
                          <View style={styles.subjectRowLeft}>
                            <View style={[styles.subjectIndicator, { backgroundColor: subject.accent }]} />
                            <View>
                              <Text style={styles.subjectItemName}>{subject.name}</Text>
                              <Text style={styles.subjectItemSub}>
                                {isLocked ? 'Coming Soon' : `${subject.totalLessons} Lessons`}
                              </Text>
                            </View>
                          </View>

                          {isLocked ? (
                            <View style={styles.lockedBadge}>
                              <Ionicons name="lock-closed" size={12} color="#90b090" style={{ marginRight: 4 }} />
                              <Text style={styles.lockedText}>Locked</Text>
                            </View>
                          ) : (
                            <Ionicons name="chevron-forward" size={16} color="#90b090" />
                          )}
                        </TouchableOpacity>
                      );
                    })}
                    
                    <TouchableOpacity
                      style={styles.viewStreamDetailsBtn}
                      onPress={() => {
                        triggerHaptic('medium');
                        navigation.navigate('StreamDetail', { streamId: stream.id });
                      }}
                    >
                      <Text style={styles.viewStreamDetailsText}>View Stream Details</Text>
                      <Ionicons name="arrow-forward" size={14} color="#4cd96b" style={{ marginLeft: 6 }} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080b12',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    color: '#90b090',
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  profileName: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  tierBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(76, 217, 107, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  tierText: {
    color: '#4cd96b',
    fontSize: 10,
    fontWeight: '600',
  },
  streakWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 159, 67, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 159, 67, 0.2)',
  },
  streakCount: {
    color: '#d4a040',
    fontWeight: '700',
    marginLeft: 6,
    fontSize: 14,
  },
  xpCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  xpLabel: {
    color: '#90b090',
    fontSize: 11,
    letterSpacing: 1,
  },
  levelText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  xpValueWrapper: {
    backgroundColor: 'rgba(42, 175, 143, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  xpValueText: {
    color: '#2aaf8f',
    fontWeight: '700',
    fontSize: 14,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4cd96b',
    borderRadius: 4,
  },
  xpMutedText: {
    color: '#90b090',
    fontSize: 12,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  badgesScroll: {
    paddingVertical: 4,
  },
  badgeItem: {
    backgroundColor: '#111625',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: 90,
    marginRight: 10,
  },
  badgeIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  badgeName: {
    color: '#ffffff',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterScroll: {
    paddingVertical: 4,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#111625',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  filterTabActive: {
    backgroundColor: '#2aaf8f',
    borderColor: '#2aaf8f',
  },
  filterTabText: {
    color: '#90b090',
    fontWeight: '600',
    fontSize: 13,
  },
  filterTabTextActive: {
    color: '#ffffff',
  },
  streamsContainer: {
    marginBottom: 20,
  },
  streamCardWrapper: {
    backgroundColor: '#111625',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  streamCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  streamLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streamIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(76, 217, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  streamName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  streamSub: {
    color: '#90b090',
    fontSize: 12,
  },
  expandedContent: {
    backgroundColor: '#0d121f',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  subjectItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.03)',
  },
  subjectRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectIndicator: {
    width: 6,
    height: 24,
    borderRadius: 3,
    marginRight: 10,
  },
  subjectItemName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  subjectItemSub: {
    color: '#90b090',
    fontSize: 11,
  },
  lockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lockedText: {
    color: '#90b090',
    fontSize: 10,
    fontWeight: '600',
  },
  viewStreamDetailsBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
  },
  viewStreamDetailsText: {
    color: '#4cd96b',
    fontWeight: '700',
    fontSize: 13,
  }
});

export default HomeScreen;
