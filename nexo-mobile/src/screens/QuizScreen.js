import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { SUBJECTS_DATA, QUIZ_DATA } from '../constants/nexoData';

const { width } = Dimensions.get('window');

const QuizScreen = ({ route, navigation }) => {
  const { subjectId, lessonId } = route.params || {};
  const { saveQuizScore, triggerHaptic } = useContext(AppContext);

  const subject = SUBJECTS_DATA.find(s => s.id === subjectId) || SUBJECTS_DATA[0];
  const lesson = subject.lessons.find(l => l.id === lessonId) || subject.lessons[0];

  const questions = QUIZ_DATA[subjectId]?.[lessonId] || [
    { q: 'Placeholder Question. What is the capital of Economics?', options: ['Capitalism', 'Scarcity', 'Wealth', 'Supply'], answer: 1, explain: 'Scarcity is the baseline.' }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [answers, setAnswers] = useState([]);

  const currentQ = questions[currentIdx];
  const totalQuestions = questions.length;
  const progressPercent = (currentIdx + 1) / totalQuestions;

  const handleOptionSelect = (optIndex) => {
    if (answered) return;
    
    setAnswered(true);
    setSelectedOpt(optIndex);
    setAnswers(prev => [...prev, { selected: optIndex, isCorrect: optIndex === currentQ.answer }]);

    const isCorrect = optIndex === currentQ.answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      triggerHaptic('success');
    } else {
      triggerHaptic('error');
    }
  };

  const handleNext = () => {
    triggerHaptic('light');
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setAnswered(false);
    } else {
      setReviewMode(true);
    }
  };

  const handleRetake = () => {
    triggerHaptic('heavy');
    setCurrentIdx(0);
    setSelectedOpt(null);
    setAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const getResultsFeedback = () => {
    const pct = score / totalQuestions;
    if (pct >= 0.6) return { label: 'You passed! Great work on this quiz.', color: '#4cd96b' };
    return { label: 'Review the lesson notes and retake the quiz to improve your score.', color: '#d4a040' };
  };

  const feedback = getResultsFeedback();

  if (reviewMode) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerBreadcrumb} numberOfLines={1}>Quiz Review</Text>
            <Text style={styles.headerTitle} numberOfLines={1}>{totalQuestions} Questions</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.reviewContent} showsVerticalScrollIndicator={false}>
          {questions.map((q, qIdx) => {
            const userAnswer = answers[qIdx];
            return (
              <View key={qIdx} style={styles.reviewCard}>
                <View style={styles.reviewCardHeader}>
                  <View style={[styles.reviewStatusBadge, {
                    backgroundColor: userAnswer?.isCorrect ? 'rgba(76, 217, 107, 0.15)' : 'rgba(212, 96, 106, 0.15)',
                    borderColor: userAnswer?.isCorrect ? '#4cd96b' : '#d4606a',
                  }]}>
                    <Ionicons
                      name={userAnswer?.isCorrect ? 'checkmark-circle' : 'close-circle'}
                      size={16}
                      color={userAnswer?.isCorrect ? '#4cd96b' : '#d4606a'}
                    />
                  </View>
                  <Text style={styles.reviewQNum}>Q{qIdx + 1}</Text>
                </View>

                <Text style={styles.reviewQText}>{q.q}</Text>

                <View style={styles.reviewOptions}>
                  {q.options.map((opt, oIdx) => {
                    const isUserAnswer = userAnswer?.selected === oIdx;
                    const isCorrectAnswer = oIdx === q.answer;
                    let optBoxStyle = styles.reviewOpt;
                    let optTextStyle = styles.reviewOptText;
                    let optLabelStyle = styles.reviewOptLabel;

                    if (isCorrectAnswer) {
                      optBoxStyle = [styles.reviewOpt, styles.reviewOptCorrect];
                      optTextStyle = [styles.reviewOptText, styles.reviewOptTextCorrect];
                      optLabelStyle = [styles.reviewOptLabel, styles.reviewOptLabelCorrect];
                    } else if (isUserAnswer) {
                      optBoxStyle = [styles.reviewOpt, styles.reviewOptWrong];
                      optTextStyle = [styles.reviewOptText, styles.reviewOptTextWrong];
                      optLabelStyle = [styles.reviewOptLabel, styles.reviewOptLabelWrong];
                    }

                    const optionLabel = ['A', 'B', 'C', 'D'][oIdx];

                    return (
                      <View key={oIdx} style={optBoxStyle}>
                        <View style={optLabelStyle}>
                          <Text style={styles.reviewOptLabelContent}>{optionLabel}</Text>
                        </View>
                        <Text style={optTextStyle}>{opt}</Text>
                      </View>
                    );
                  })}
                </View>

                {q.explain && (
                  <View style={styles.reviewExplain}>
                    <Text style={styles.reviewExplainTitle}>Explanation</Text>
                    <Text style={styles.reviewExplainText}>{q.explain}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => {
              triggerHaptic('light');
              saveQuizScore(subjectId, lessonId, score, totalQuestions);
              setQuizFinished(true);
            }}
          >
            <Text style={styles.nextBtnText}>See Results</Text>
            <Ionicons name="arrow-forward" size={18} color="#080b12" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (quizFinished) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultsContainer}>
          <Ionicons name="trophy-outline" size={80} color="#4cd96b" style={{ marginBottom: 20 }} />
          <Text style={styles.resultsTitle}>Quiz Completed!</Text>
          <Text style={styles.resultsSubtitle}>{lesson.title}</Text>
          
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreText}>{score}</Text>
            <Text style={styles.scoreMaxText}>/ {totalQuestions}</Text>
          </View>

          <Text style={[styles.resultsMsg, { color: feedback.color }]}>{feedback.label}</Text>
          <Text style={styles.xpAwardText}>+{20 + score * 10} XP Awarded!</Text>

          <View style={styles.resultsActions}>
            <TouchableOpacity
              style={[styles.resultsBtn, styles.retakeBtn]}
              onPress={handleRetake}
            >
              <Text style={styles.retakeBtnText}>Retake Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.resultsBtn, styles.closeBtn]}
              onPress={() => {
                triggerHaptic('light');
                navigation.goBack();
              }}
            >
              <Text style={styles.closeBtnText}>Back to Lesson</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeBtnCircle}
          onPress={() => {
            triggerHaptic('light');
            navigation.goBack();
          }}
        >
          <Ionicons name="close" size={22} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerBreadcrumb} numberOfLines={1}>{subject.name} &bull; Lesson {lessonId}</Text>
          <Text style={styles.headerTitle} numberOfLines={1}>Quiz: {lesson.title}</Text>
        </View>
        <View style={{ width: 38 }} />
      </View>

      {/* PROGRESS BAR */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: `${progressPercent * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* QUESTION COUNTER */}
        <Text style={styles.questionCounter}>Question {currentIdx + 1} of {totalQuestions}</Text>

        {/* QUESTION TEXT */}
        <Text style={styles.questionText}>{currentQ.q}</Text>

        {/* OPTIONS LIST */}
        <View style={styles.optionsList}>
          {currentQ.options.map((opt, index) => {
            const isSelected = selectedOpt === index;
            const isCorrectAnswer = index === currentQ.answer;
            const optionLabel = ['A', 'B', 'C', 'D'][index];

            let buttonStyle = styles.optionBtn;
            let labelStyle = styles.optionLabelText;
            let textStyle = styles.optionText;

            if (answered) {
              if (isCorrectAnswer) {
                buttonStyle = [styles.optionBtn, styles.optionCorrect];
                labelStyle = [styles.optionLabelText, styles.optionLabelCorrect];
                textStyle = [styles.optionText, styles.optionTextCorrect];
              } else if (isSelected) {
                buttonStyle = [styles.optionBtn, styles.optionWrong];
                labelStyle = [styles.optionLabelText, styles.optionLabelWrong];
                textStyle = [styles.optionText, styles.optionTextWrong];
              } else {
                buttonStyle = [styles.optionBtn, styles.optionDisabled];
              }
            }

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={answered ? 1 : 0.7}
                style={buttonStyle}
                onPress={() => handleOptionSelect(index)}
              >
                <View style={styles.optionContent}>
                  <View style={labelStyle}>
                    <Text style={styles.optionLabelTextContent}>{optionLabel}</Text>
                  </View>
                  <Text style={textStyle}>{opt}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* EXPLANATION */}
        {answered && currentQ.explain && (
          <View style={styles.explainBlock}>
            <View style={styles.explainHeader}>
              <Ionicons name="information-circle-outline" size={16} color="#2aaf8f" style={{ marginRight: 6 }} />
              <Text style={styles.explainTitle}>Explanation</Text>
            </View>
            <Text style={styles.explainText}>{currentQ.explain}</Text>
          </View>
        )}
      </ScrollView>

      {/* FOOTER ACTION */}
      {answered && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={handleNext}
          >
            <Text style={styles.nextBtnText}>
              {currentIdx === totalQuestions - 1 ? 'Review Answers' : 'Next Question'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#080b12" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>
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
  },
  closeBtnCircle: {
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
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4cd96b',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  questionCounter: {
    color: '#4cd96b',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  questionText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Bold',
    lineHeight: 28,
    marginBottom: 24,
  },
  optionsList: {
    marginBottom: 24,
  },
  optionBtn: {
    backgroundColor: '#111625',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLabelText: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  optionLabelTextContent: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  optionText: {
    color: '#90b090',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  optionCorrect: {
    backgroundColor: 'rgba(76, 217, 107, 0.08)',
    borderColor: '#4cd96b',
  },
  optionLabelCorrect: {
    backgroundColor: '#4cd96b',
  },
  optionTextCorrect: {
    color: '#ffffff',
  },
  optionWrong: {
    backgroundColor: 'rgba(212, 96, 106, 0.08)',
    borderColor: '#d4606a',
  },
  optionLabelWrong: {
    backgroundColor: '#d4606a',
  },
  optionTextWrong: {
    color: '#ffffff',
  },
  optionDisabled: {
    opacity: 0.5,
  },
  explainBlock: {
    backgroundColor: 'rgba(79, 142, 247, 0.08)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(42, 175, 143, 0.2)',
  },
  explainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  explainTitle: {
    color: '#2aaf8f',
    fontWeight: '700',
    fontSize: 13,
  },
  explainText: {
    color: '#90b090',
    fontSize: 13,
    lineHeight: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#080b12',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  nextBtn: {
    backgroundColor: '#2ea84c',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 25,
  },
  nextBtnText: {
    color: '#080b12',
    fontWeight: '700',
    fontSize: 14,
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  resultsTitle: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Bold',
    marginBottom: 4,
  },
  resultsSubtitle: {
    color: '#90b090',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    borderColor: '#4cd96b',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 24,
  },
  scoreText: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: '700',
  },
  scoreMaxText: {
    color: '#90b090',
    fontSize: 18,
    marginLeft: 2,
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  resultsMsg: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: 12,
    marginBottom: 8,
  },
  xpAwardText: {
    color: '#d4a040',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 32,
  },
  resultsActions: {
    width: '100%',
    gap: 12,
  },
  resultsBtn: {
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  retakeBtn: {
    backgroundColor: '#111625',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  retakeBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  closeBtn: {
    backgroundColor: '#2ea84c',
  },
  closeBtnText: {
    color: '#080b12',
    fontWeight: '700',
    fontSize: 14,
  },
  reviewContent: {
    padding: 16,
    paddingBottom: 100,
  },
  reviewCard: {
    backgroundColor: '#111625',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  reviewCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewStatusBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  reviewQNum: {
    color: '#90b090',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  reviewQText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 12,
  },
  reviewOptions: {
    marginBottom: 12,
  },
  reviewOpt: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#080b12',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  reviewOptCorrect: {
    backgroundColor: 'rgba(76, 217, 107, 0.08)',
    borderColor: '#4cd96b',
  },
  reviewOptWrong: {
    backgroundColor: 'rgba(212, 96, 106, 0.08)',
    borderColor: '#d4606a',
  },
  reviewOptLabel: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewOptLabelContent: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  reviewOptLabelCorrect: {
    backgroundColor: '#4cd96b',
  },
  reviewOptLabelWrong: {
    backgroundColor: '#d4606a',
  },
  reviewOptText: {
    color: '#90b090',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  reviewOptTextCorrect: {
    color: '#ffffff',
  },
  reviewOptTextWrong: {
    color: '#ffffff',
  },
  reviewExplain: {
    backgroundColor: 'rgba(42, 175, 143, 0.06)',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(42, 175, 143, 0.15)',
  },
  reviewExplainTitle: {
    color: '#2aaf8f',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  reviewExplainText: {
    color: '#90b090',
    fontSize: 12,
    lineHeight: 17,
  },
});

export default QuizScreen;
