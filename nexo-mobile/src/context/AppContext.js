import React, { createContext, useState, useEffect } from 'react';
import { storage, triggerHaptic } from '../utils/nativeGuard';
import { BADGES_DEF, SUBJECTS_DATA } from '../constants/nexoData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState({ count: 0, lastDate: null });
  const [badges, setBadges] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [lessonStatus, setLessonStatus] = useState({});
  const [quizHighScores, setQuizHighScores] = useState({});
  const [flashcardSrs, setFlashcardSrs] = useState({});
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [themeMode, setThemeMode] = useState('dark');
  const [loading, setLoading] = useState(true);

  // Load state from AsyncStorage on init
  useEffect(() => {
    const loadState = async () => {
      try {
        const storedXp = await storage.getItem('nexo_xp');
        const storedStreak = await storage.getItem('nexo_streak');
        const storedBadges = await storage.getItem('nexo_badges');
        const storedBookmarks = await storage.getItem('nexo_bookmarks');
        const storedHaptics = await storage.getItem('nexo_haptics');
        const storedTheme = await storage.getItem('nexo_theme');

        if (storedXp) setXp(parseInt(storedXp));
        if (storedStreak) setStreak(JSON.parse(storedStreak));
        if (storedBadges) setBadges(JSON.parse(storedBadges));
        if (storedBookmarks) setBookmarks(JSON.parse(storedBookmarks));
        if (storedHaptics) setHapticsEnabled(storedHaptics === 'true');
        if (storedTheme) setThemeMode(storedTheme);

        // Load lesson statuses and quiz scores
        const keys = await storage.getAllKeys();
        const lessonPrefix = 'nexo_lesson_';
        const quizPrefix = 'nexo_quiz_';
        
        let lessons = {};
        let quizzes = {};

        for (const key of keys) {
          if (key.startsWith(lessonPrefix)) {
            const val = await storage.getItem(key);
            lessons[key.replace(lessonPrefix, '')] = val;
          } else if (key.startsWith(quizPrefix)) {
            const val = await storage.getItem(key);
            quizzes[key.replace(quizPrefix, '').replace('_best', '')] = parseInt(val);
          }
        }
        setLessonStatus(lessons);
        setQuizHighScores(quizzes);
        const storedFlashcardSrs = await storage.getItem('nexo_fc_srs');
        if (storedFlashcardSrs) setFlashcardSrs(JSON.parse(storedFlashcardSrs));
      } catch (err) {
        console.error('Error loading AsyncStorage state', err);
      } finally {
        setLoading(false);
      }
    };
    loadState();
  }, []);

  const appTriggerHaptic = (type = 'light') => {
    if (!hapticsEnabled) return;
    triggerHaptic(type);
  };

  const addXp = async (amount) => {
    const newXp = xp + amount;
    setXp(newXp);
    await storage.setItem('nexo_xp', newXp.toString());
  };

  // Streak verification
  const checkAndUpdateStreak = async () => {
    const todayStr = new Date().toISOString().split('T')[0];
    let newStreak = { ...streak };

    if (!streak.lastDate) {
      newStreak = { count: 1, lastDate: todayStr };
    } else {
      const last = new Date(streak.lastDate);
      const today = new Date(todayStr);
      const diffTime = Math.abs(today - last);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        newStreak = { count: streak.count + 1, lastDate: todayStr };
        // Award streak XP (+15 XP per streak day)
        addXp(15 * newStreak.count);
      } else if (diffDays > 1) {
        newStreak = { count: 1, lastDate: todayStr };
      }
    }
    
    setStreak(newStreak);
    await storage.setItem('nexo_streak', JSON.stringify(newStreak));
  };

  const updateLessonStatus = async (subjectId, lessonId, status) => {
    const key = `${subjectId}_${lessonId}`;
    const newStatus = { ...lessonStatus, [key]: status };
    setLessonStatus(newStatus);
    await storage.setItem(`nexo_lesson_${subjectId}_${lessonId}`, status);

    if (status === 'done') {
      addXp(100);
      appTriggerHaptic('success');
      checkAndAwardBadges();
    } else if (status === 'in-progress') {
      addXp(50);
      appTriggerHaptic('light');
    }
  };

  const saveQuizScore = async (subjectId, lessonId, score, totalQ) => {
    const key = `${subjectId}_${lessonId}`;
    const bestScore = quizHighScores[key] || 0;

    let xpEarned = 20 + score * 10; // 20 XP for participation + 10 XP per correct answer
    addXp(xpEarned);

    if (score > bestScore) {
      const newScores = { ...quizHighScores, [key]: score };
      setQuizHighScores(newScores);
      await storage.setItem(`nexo_quiz_${subjectId}_${lessonId}_best`, score.toString());
    }

    appTriggerHaptic(score === totalQ ? 'success' : 'medium');
    checkAndAwardBadges();
  };

  const saveFlashcardRating = async (subjectId, lessonId, cardIdx, ease) => {
    const delays = [1 * 60 * 1000, 30 * 60 * 1000, 24 * 60 * 60 * 1000];
    const key = `${subjectId}_${lessonId}_${cardIdx}`;
    const data = { ease, due: Date.now() + delays[ease] };
    const newSrs = { ...flashcardSrs, [key]: data };
    setFlashcardSrs(newSrs);
    await storage.setItem('nexo_fc_srs', JSON.stringify(newSrs));
  };

  const toggleBookmark = async (itemType, item) => {
    const itemId = item.id || `${item.subjectId}_${item.lessonId}`;
    const exists = bookmarks.find(b => b.itemId === itemId && b.type === itemType);
    let newBookmarks = [];

    if (exists) {
      newBookmarks = bookmarks.filter(b => !(b.itemId === itemId && b.type === itemType));
      appTriggerHaptic('medium');
    } else {
      newBookmarks = [...bookmarks, { itemId, type: itemType, title: item.title, desc: item.desc || item.author, data: item }];
      appTriggerHaptic('success');
    }

    setBookmarks(newBookmarks);
    await storage.setItem('nexo_bookmarks', JSON.stringify(newBookmarks));
  };

  const checkAndAwardBadges = () => {
    const totalDone = Object.values(lessonStatus).filter(s => s === 'done').length;
    
    // Count quizzes with 100%
    let perfectQuizzes = 0;
    Object.entries(quizHighScores).forEach(([key, val]) => {
      const [subj, les] = key.split('_');
      // For simplicity, verify high score equals the length of questions or standard 8
      if (val >= 8) perfectQuizzes++;
    });

    const earnedList = [...badges];
    let newlyAwarded = null;

    BADGES_DEF.forEach(b => {
      if (earnedList.includes(b.id)) return;

      let qualify = false;
      if (b.id === 'first-lesson' && totalDone >= 1) qualify = true;
      if (b.id === 'quick-learner' && totalDone >= 5) qualify = true;
      if (b.id === 'scholar' && totalDone >= 10) qualify = true;
      if (b.id === 'dedicated' && totalDone >= 20) qualify = true;
      if (b.id === 'quiz-ace' && perfectQuizzes >= 1) qualify = true;
      if (b.id === 'quiz-legend' && perfectQuizzes >= 3) qualify = true;
      if (b.id === 'streak-3' && streak.count >= 3) qualify = true;
      if (b.id === 'streak-7' && streak.count >= 7) qualify = true;
      if (b.id === 'streak-30' && streak.count >= 30) qualify = true;

      // Subject completion check
      if (b.id === 'subject-master') {
        const econDone = SUBJECTS_DATA.find(s => s.id === 'economics').lessons.every(l => lessonStatus[`economics_${l.id}`] === 'done');
        const bizDone = SUBJECTS_DATA.find(s => s.id === 'business').lessons.every(l => lessonStatus[`business_${l.id}`] === 'done');
        if (econDone || bizDone) qualify = true;
      }

      if (qualify) {
        earnedList.push(b.id);
        newlyAwarded = b;
      }
    });

    if (newlyAwarded) {
      setBadges(earnedList);
      storage.setItem('nexo_badges', JSON.stringify(earnedList));
      appTriggerHaptic('success');
      // Return details for notification inside screen
      return newlyAwarded;
    }
    return null;
  };

  const toggleHaptics = async () => {
    const val = !hapticsEnabled;
    setHapticsEnabled(val);
    await storage.setItem('nexo_haptics', val.toString());
    if (val) triggerHaptic('light');
  };

  const toggleTheme = async () => {
    const val = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(val);
    await storage.setItem('nexo_theme', val);
    triggerHaptic('light');
  };

  const resetProgress = async () => {
    try {
      await storage.clear();
      setXp(0);
      setStreak({ count: 0, lastDate: null });
      setBadges([]);
      setBookmarks([]);
      setLessonStatus({});
      setQuizHighScores({});
      setFlashcardSrs({});
      setThemeMode('dark');
      setHapticsEnabled(true);
      appTriggerHaptic('warning');
    } catch (e) {
      console.error('Failed to reset progress', e);
    }
  };

  return (
    <AppContext.Provider value={{
      xp,
      addXp,
      streak,
      checkAndUpdateStreak,
      badges,
      bookmarks,
      toggleBookmark,
      lessonStatus,
      updateLessonStatus,
      quizHighScores,
      saveQuizScore,
      hapticsEnabled,
      toggleHaptics,
      themeMode,
      toggleTheme,
      resetProgress,
      triggerHaptic: appTriggerHaptic,
      checkAndAwardBadges,
      flashcardSrs,
      saveFlashcardRating,
      loading
    }}>
      {children}
    </AppContext.Provider>
  );
};
