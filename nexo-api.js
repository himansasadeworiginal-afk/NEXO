// NEXO API Client — replaces localStorage with backend calls
// Include this AFTER the main data constants but BEFORE functions that use them

const NEXO_API = (() => {
  // Auto-detect API URL: GitHub Pages → production Render URL, else → localhost
  // Change this after deploying to Render:
  const RENDER_URL = 'https://nexo-api.onrender.com';
  const isProduction = window.location.hostname.includes('github.io') || window.location.hostname.includes('onrender.com');
  const BASE = (isProduction ? RENDER_URL : 'http://localhost:4000') + '/api';
  let token = localStorage.getItem('nexo_token');
  let socket = null;

  function headers(extra = {}) {
    const h = { 'Content-Type': 'application/json', ...extra };
    if (token) h['Authorization'] = `Bearer ${token}`;
    return h;
  }

  async function request(method, path, body = null) {
    const opts = { method, headers: headers() };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(`${BASE}${path}`, opts);
    const data = await res.json();
    if (!res.ok) throw { status: res.status, ...data };
    return data;
  }

  function get(path) { return request('GET', path); }
  function post(path, body) { return request('POST', path, body); }
  function put(path, body) { return request('PUT', path, body); }
  function del(path, body) { return request('DELETE', path, body); }
  // Expose for external use (e.g. logout)
  function rawRequest(method, path, body) { return request(method, path, body); }

  // Socket.io connection for real-time features
  function connectSocket() {
    if (socket || !token) return;
    const script = document.createElement('script');
    script.src = 'https://cdn.socket.io/4.8.1/socket.io.min.js';
    script.onload = () => {
      socket = io('http://localhost:4000', { auth: { token } });
      socket.on('connect', () => console.log('Socket connected'));
      socket.on('disconnect', () => console.log('Socket disconnected'));
    };
    document.head.appendChild(script);
  }

  return {
    BASE_URL: BASE.replace('/api', ''),
    request: rawRequest, // for logout and custom calls
    // Auth
    async register(name, username, email, password) {
      const data = await post('/auth/register', { name, username, email, password });
      token = data.token;
      localStorage.setItem('nexo_token', data.token);
      return data;
    },
    async login(email, password) {
      const data = await post('/auth/login', { email, password });
      token = data.token;
      localStorage.setItem('nexo_token', data.token);
      connectSocket();
      return data;
    },
    async me() { return get('/auth/me'); },
    logout() {
      token = null;
      localStorage.removeItem('nexo_token');
      if (socket) { socket.disconnect(); socket = null; }
    },
    getToken() { return token; },
    isAuthenticated() { return !!token; },
    connectSocket,

    // Users / Profile
    async getProfile() { return get('/users/profile'); },
    async updateProfile(data) { return put('/users/profile', data); },
    async getXP() { return get('/users/xp'); },
    async addXP(amount) { return post('/users/xp', { amount }); },
    async getStreak() { return get('/users/streak'); },
    async updateStreak() { return post('/users/streak'); },

    // Progress
    async getProgress() { return get('/progress'); },
    async getSubjectProgress(subjectId) { return get(`/progress/${subjectId}`); },
    async updateLessonStatus(lessonId, status) { return put(`/progress/${lessonId}`, { status }); },
    async getSubjectSummary(subjectId) { return get(`/progress/summary/${subjectId}`); },

    // Quiz
    async submitQuiz(lessonId, score, total, answers = []) {
      return post('/quiz/submit', { lesson_id: lessonId, score, total, answers });
    },
    async getQuizHistory() { return get('/quiz/history'); },
    async getBestQuiz(lessonId) { return get(`/quiz/best/${lessonId}`); },

    // Bookmarks
    async getBookmarks() { return get('/bookmarks'); },
    async addBookmark(contentType, contentId) {
      return post('/bookmarks', { content_type: contentType, content_id: contentId });
    },
    async removeBookmark(contentType, contentId) {
      return del('/bookmarks', { content_type: contentType, content_id: contentId });
    },

    // Flashcards
    async getFlashcards(lessonId) { return get(`/flashcards/${lessonId}`); },
    async reviewFlashcard(cardId, ease) { return post('/flashcards/review', { card_id: cardId, ease }); },
    async getDueFlashcards(lessonId) { return get(`/flashcards/due/${lessonId}`); },

    // Content
    async getSubjects() { return get('/content/subjects'); },
    async getSubject(id) { return get(`/content/subjects/${id}`); },
    async getLesson(id) { return get(`/content/lessons/${id}`); },
    async getQuiz(lessonId) { return get(`/content/quizzes/${lessonId}`); },
    async getFlashcardsContent(lessonId) { return get(`/content/flashcards/${lessonId}`); },
    async getBooks(params = {}) {
      const qs = new URLSearchParams(params).toString();
      return get(`/content/books${qs ? '?' + qs : ''}`);
    },
    async getBook(id) { return get(`/content/books/${id}`); },

    // Premium
    async getPremiumStatus() { return get('/premium/status'); },
    async createCheckout() { return post('/premium/create-checkout'); },

    // Socket helpers
    joinStudyRoom(subjectId, lessonId) {
      if (socket) socket.emit('study:join', { subjectId, lessonId });
    },
    leaveStudyRoom(subjectId, lessonId) {
      if (socket) socket.emit('study:leave', { subjectId, lessonId });
    },
    emitXpUpdate(data) {
      if (socket) socket.emit('xp:update', data);
    },
    onActivity(cb) {
      if (socket) socket.on('activity:global', cb);
    },
  };
})();
