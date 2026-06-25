// NEXO API Client — uses relative /api/ URLs when same-origin,
// falls back to localStorage mock when backend is unreachable.

const NEXO_API = (() => {
  const BASE = '/api';
  var onGitHubPages = window.location.hostname.includes('github.io');
  let token = localStorage.getItem('nexo_token');
  let socket = null;
  let backendOk = null;

  function headers(extra) {
    const h = { 'Content-Type': 'application/json', ...extra };
    if (token) h['Authorization'] = 'Bearer ' + token;
    return h;
  }

  async function checkBackend() {
    if (backendOk !== null) return backendOk;
    if (onGitHubPages) { backendOk = false; return false; }
    try {
      const ctrl = new AbortController();
      const id = setTimeout(function(){ ctrl.abort(); }, 2000);
      await fetch(BASE + '/health', { signal: ctrl.signal });
      clearTimeout(id);
      backendOk = true;
    } catch (e) {
      backendOk = false;
    }
    return backendOk;
  }

  async function api(method, path, body) {
    const opts = { method, headers: headers() };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(BASE + path, opts);
    const data = await res.json();
    if (!res.ok) { throw { status: res.status, ...data }; }
    return data;
  }

  function getUsers() {
    try { return JSON.parse(localStorage.getItem('nexo_mock_users') || '[]'); } catch(e) { return []; }
  }
  function saveUsers(u) { localStorage.setItem('nexo_mock_users', JSON.stringify(u)); }
  function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2,6); }

  return {
    BASE_URL: '/',
    getToken: function() { return token; },
    isAuthenticated: function() { return !!token; },

    // ── Auth ──
    register: async function(name, username, email, password) {
      const online = await checkBackend();
      if (online) {
        try {
          const data = await api('POST', '/auth/register', { name, username, email, password });
          token = data.token;
          localStorage.setItem('nexo_token', data.token);
          return data;
        } catch (e) {
          if (e.status) throw e;
        }
      }
      var users = getUsers();
      if (users.find(function(u){return u.email===email})) {
        throw { status:409, error:'Email already taken' };
      }
      var user = { id:genId(), name, username, email, password, plan:'free',
        join_date:new Date().toISOString(), xp:0, streak_count:0 };
      users.push(user);
      saveUsers(users);
      var tok = 'mock_' + user.id;
      token = tok;
      localStorage.setItem('nexo_token', tok);
      localStorage.setItem('nexo_user', JSON.stringify(user));
      return { user, token:tok };
    },

    login: async function(email, password) {
      const online = await checkBackend();
      if (online) {
        try {
          const data = await api('POST', '/auth/login', { email, password });
          token = data.token;
          localStorage.setItem('nexo_token', data.token);
          return data;
        } catch (e) {
          if (e.status) throw e;
        }
      }
      var users = getUsers();
      var user = users.find(function(u){return u.email===email && u.password===password});
      if (!user) throw { status:401, error:'Invalid email or password' };
      var tok = 'mock_' + user.id;
      token = tok;
      localStorage.setItem('nexo_token', tok);
      localStorage.setItem('nexo_user', JSON.stringify(user));
      return { user, token:tok };
    },

    me: async function() {
      const online = await checkBackend();
      if (online) {
        try { return await api('GET', '/auth/me'); } catch(e) {}
      }
      try {
        var u = JSON.parse(localStorage.getItem('nexo_user'));
        if (u) return { ...u, badges:[], recentActivity:[] };
      } catch(e){}
      return { name:'Guest', email:'', plan:'free', xp:0, streak_count:0 };
    },

    logout: function() {
      token = null;
      localStorage.removeItem('nexo_token');
      localStorage.removeItem('nexo_user');
      if (socket) { socket.disconnect(); socket = null; }
    },

    connectSocket: function(){},
    request: function(method, path, body) { return api(method, path, body); },

    // ── stubs ──
    getProfile: function(){ return this.me(); },
    updateProfile: function(d){ localStorage.setItem('nexo_user', JSON.stringify(d)); return Promise.resolve(d); },
    getXP: function(){ return Promise.resolve({xp:0}); },
    addXP: function(){ return Promise.resolve({}); },
    getStreak: function(){ return Promise.resolve({streak_count:0}); },
    updateStreak: function(){ return Promise.resolve({}); },
    getProgress: function(){ return Promise.resolve([]); },
    getSubjectProgress: function(){ return Promise.resolve([]); },
    updateLessonStatus: function(){ return Promise.resolve({}); },
    getSubjectSummary: function(){ return Promise.resolve({}); },
    submitQuiz: function(){ return Promise.resolve({}); },
    getQuizHistory: function(){ return Promise.resolve([]); },
    getBestQuiz: function(){ return Promise.resolve(null); },
    getBookmarks: function(){ return Promise.resolve([]); },
    addBookmark: function(){ return Promise.resolve({}); },
    removeBookmark: function(){ return Promise.resolve({}); },
    getFlashcards: function(){ return Promise.resolve([]); },
    reviewFlashcard: function(){ return Promise.resolve({}); },
    getDueFlashcards: function(){ return Promise.resolve([]); },
    getSubjects: function(){ return Promise.resolve([]); },
    getSubject: function(){ return Promise.resolve(null); },
    getLesson: function(){ return Promise.resolve(null); },
    getQuiz: function(){ return Promise.resolve(null); },
    getFlashcardsContent: function(){ return Promise.resolve([]); },
    getBooks: function(){ return Promise.resolve([]); },
    getBook: function(){ return Promise.resolve(null); },
    getPremiumStatus: function(){ return Promise.resolve({plan:'free', active:false}); },
    createCheckout: function(){ return Promise.resolve({url:''}); },
    joinStudyRoom: function(){},
    leaveStudyRoom: function(){},
    emitXpUpdate: function(){},
    onActivity: function(){},
  };
})();
