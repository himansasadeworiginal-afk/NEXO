import React, { useContext, useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { SUBJECTS_DATA, FLASHCARDS_DATA } from '../constants/nexoData';

const { width } = Dimensions.get('window');

const FlashcardScreen = ({ route, navigation }) => {
  const { subjectId, lessonId } = route.params || {};
  const { addXp, triggerHaptic, saveFlashcardRating, flashcardSrs } = useContext(AppContext);

  const subject = SUBJECTS_DATA.find(s => s.id === subjectId) || SUBJECTS_DATA[0];
  const lesson = subject.lessons.find(l => l.id === lessonId) || subject.lessons[0];

  const cards = FLASHCARDS_DATA[subjectId]?.[lessonId] || [];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [finished, setFinished] = useState(false);
  const [dueCards, setDueCards] = useState([]);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [noCardsDue, setNoCardsDue] = useState(false);

  // Animated setup for Flip transition
  const flipAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (cards.length === 0) {
      setNoCardsDue(true);
      return;
    }
    const now = Date.now();
    const due = cards
      .map((card, origIdx) => ({ ...card, _origIdx: origIdx }))
      .filter((_, idx) => {
        const key = `${subjectId}_${lessonId}_${idx}`;
        const srs = flashcardSrs[key];
        return !srs || !srs.due || srs.due <= now;
      });
    for (let i = due.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [due[i], due[j]] = [due[j], due[i]];
    }
    if (due.length === 0) {
      setNoCardsDue(true);
    } else {
      setDueCards(due);
    }
  }, []);

  const pan = useRef(new Animated.ValueXY()).current;
  const handleRateRef = useRef(handleRate);
  handleRateRef.current = handleRate;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gs) => Math.abs(gs.dx) > 10,
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: (_, gs) => pan.setValue({ x: gs.dx, y: 0 }),
      onPanResponderRelease: (_, gs) => {
        if (Math.abs(gs.dx) > 80) {
          const ease = gs.dx > 0 ? 2 : 0;
          Animated.timing(pan, {
            toValue: { x: gs.dx > 0 ? 500 : -500, y: 0 },
            duration: 200,
            useNativeDriver: true
          }).start(() => {
            handleRateRef.current(ease);
            pan.setValue({ x: 0, y: 0 });
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: true
          }).start();
        }
      }
    })
  ).current;

  const handleFlip = () => {
    triggerHaptic('light');
    if (isFlipped) {
      // Flip back to front
      Animated.spring(flipAnim, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    } else {
      // Flip to back
      Animated.spring(flipAnim, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  const handleRate = (ease) => {
    let gained = 10;
    if (ease === 2) gained = 30;
    else if (ease === 1) gained = 15;

    triggerHaptic('medium');
    addXp(gained);
    setXpEarned(prev => prev + gained);
    saveFlashcardRating(subjectId, lessonId, dueCards[currentIdx]._origIdx, ease);

    flipAnim.setValue(0);
    setIsFlipped(false);

    if (currentIdx < dueCards.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setReviewedCount(prev => prev + 1);
    } else {
      setReviewedCount(prev => prev + 1);
      setFinished(true);
    }
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg']
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }]
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }]
  };

  if (noCardsDue) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.finishedContainer}>
          <Ionicons name="checkmark-done-outline" size={80} color="#2aaf8f" style={{ marginBottom: 20 }} />
          <Text style={styles.finishedTitle}>All Caught Up!</Text>
          <Text style={styles.finishedSubtitle}>No flashcards due for this lesson right now. Come back later!</Text>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => { triggerHaptic('light'); navigation.goBack(); }}
          >
            <Text style={styles.closeBtnText}>Return to Lesson</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (finished) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.finishedContainer}>
          <Ionicons name="sparkles-outline" size={80} color="#4cd96b" style={{ marginBottom: 20 }} />
          <Text style={styles.finishedTitle}>All Done!</Text>
          <Text style={styles.finishedSubtitle}>{lesson.title}</Text>
          <View style={styles.statsCard}>
            <View style={styles.statCol}>
              <Text style={styles.statVal}>{reviewedCount}</Text>
              <Text style={styles.statLbl}>Cards Reviewed</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCol}>
              <Text style={styles.statVal}>+{xpEarned}</Text>
              <Text style={styles.statLbl}>XP Earned</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => { triggerHaptic('light'); navigation.goBack(); }}
          >
            <Text style={styles.closeBtnText}>Return to Lesson</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentCard = dueCards[currentIdx];
  if (!currentCard) return null;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => {
            triggerHaptic('light');
            navigation.goBack();
          }}
        >
          <Ionicons name="close" size={22} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerBreadcrumb}>{subject.name} &bull; Lesson {lessonId}</Text>
          <Text style={styles.headerTitle} numberOfLines={1}>Flashcards</Text>
        </View>
        <View style={styles.counterBadge}>
          <Text style={styles.counterText}>{currentIdx + 1}/{dueCards.length}</Text>
        </View>
      </View>

      {/* FLASHCARD BODY AREA */}
      <View style={styles.cardArea} {...panResponder.panHandlers}>
        <Animated.View style={[styles.cardWrapper, { transform: [{ translateX: pan.x }] }]}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.cardFull}
            onPress={handleFlip}
          >
            {/* FRONT SIDE */}
            <Animated.View style={[styles.cardSide, styles.cardFront, frontAnimatedStyle, {
              opacity: flipAnim.interpolate({
                inputRange: [89, 90],
                outputRange: [1, 0]
              })
            }]}>
              <Text style={[styles.cardType, { color: '#2aaf8f' }]}>CONCEPT / QUESTION</Text>
              <Text style={styles.cardContentText}>{currentCard.front}</Text>
              <View style={styles.flipPrompt}>
                <Ionicons name="swap-horizontal-outline" size={14} color="#90b090" style={{ marginRight: 6 }} />
                <Text style={styles.flipPromptText}>Tap to reveal answer</Text>
              </View>
            </Animated.View>

            {/* BACK SIDE */}
            <Animated.View style={[styles.cardSide, styles.cardBack, backAnimatedStyle, {
              opacity: flipAnim.interpolate({
                inputRange: [89, 90],
                outputRange: [0, 1]
              })
            }]}>
              <Text style={[styles.cardType, { color: '#4cd96b' }]}>DEFINITION / ANSWER</Text>
              <Text style={styles.cardContentText}>{currentCard.back}</Text>
              <View style={styles.flipPrompt}>
                <Ionicons name="swap-horizontal-outline" size={14} color="#90b090" style={{ marginRight: 6 }} />
                <Text style={styles.flipPromptText}>Tap to flip back</Text>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* FOOTER SRS ACTIONS */}
      <View style={styles.footer}>
        {isFlipped ? (
          <View style={styles.srsRow}>
            <TouchableOpacity
              style={[styles.srsBtn, styles.srsHard]}
              onPress={() => handleRate(0)}
            >
              <Text style={styles.srsBtnText}>Again</Text>
              <Text style={styles.srsXpText}>+10 XP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.srsBtn, styles.srsMedium]}
              onPress={() => handleRate(1)}
            >
              <Text style={styles.srsBtnText}>Hard</Text>
              <Text style={styles.srsXpText}>+15 XP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.srsBtn, styles.srsEasy]}
              onPress={() => handleRate(2)}
            >
              <Text style={styles.srsBtnText}>Easy</Text>
              <Text style={styles.srsXpText}>+30 XP</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.tapToRevealBtn}
            onPress={handleFlip}
          >
            <Text style={styles.tapToRevealText}>Tap to Reveal</Text>
          </TouchableOpacity>
        )}
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
  headerBtn: {
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
    alignItems: 'center',
  },
  headerBreadcrumb: {
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
  counterBadge: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  counterText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  cardArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  cardWrapper: {
    width: '100%',
    height: width * 0.95,
  },
  cardSide: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: 24,
    padding: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  cardFront: {
    backgroundColor: '#111625',
    borderColor: 'rgba(42, 175, 143, 0.3)',
  },
  cardBack: {
    backgroundColor: '#0d1622',
    borderColor: 'rgba(76, 217, 107, 0.3)',
  },
  cardType: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
  cardContentText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    textAlign: 'center',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  flipPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flipPromptText: {
    color: '#90b090',
    fontSize: 12,
  },
  footer: {
    padding: 24,
    backgroundColor: '#080b12',
  },
  tapToRevealBtn: {
    backgroundColor: '#2aaf8f',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapToRevealText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  srsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  srsBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  srsHard: {
    backgroundColor: 'rgba(212, 96, 106, 0.1)',
    borderColor: 'rgba(212, 96, 106, 0.3)',
  },
  srsMedium: {
    backgroundColor: 'rgba(212, 160, 64, 0.1)',
    borderColor: 'rgba(212, 160, 64, 0.3)',
  },
  srsEasy: {
    backgroundColor: 'rgba(76, 217, 107, 0.1)',
    borderColor: 'rgba(76, 217, 107, 0.3)',
  },
  srsBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
  },
  srsXpText: {
    fontSize: 10,
    color: '#90b090',
    marginTop: 2,
  },
  finishedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  finishedTitle: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Bold',
    marginBottom: 4,
  },
  finishedSubtitle: {
    color: '#90b090',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#111625',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  statCol: {
    alignItems: 'center',
  },
  statVal: {
    color: '#4cd96b',
    fontSize: 28,
    fontWeight: '700',
  },
  statLbl: {
    color: '#90b090',
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  closeBtn: {
    backgroundColor: '#2ea84c',
    paddingVertical: 14,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#080b12',
    fontWeight: '700',
    fontSize: 15,
  },
  cardFull: {
    width: '100%',
    height: '100%',
  },
});

export default FlashcardScreen;
