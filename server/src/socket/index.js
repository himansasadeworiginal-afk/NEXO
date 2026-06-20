import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'nexo-dev-secret-change-in-production';

export function setupSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5500'],
      methods: ['GET', 'POST'],
    },
  });

  const onlineUsers = new Map();

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (token) {
        const decoded = jwt.verify(token, JWT_SECRET);
        socket.userId = decoded.id;
        socket.username = decoded.username;
      }
      next();
    } catch {
      next();
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.userId;

    if (userId) {
      onlineUsers.set(userId, { id: userId, username: socket.username, socketId: socket.id });
      io.emit('users:online', Array.from(onlineUsers.values()));
    }

    socket.on('study:join', ({ subjectId, lessonId }) => {
      const room = `study:${subjectId}:${lessonId}`;
      socket.join(room);
      socket.to(room).emit('study:user-joined', {
        userId,
        username: socket.username || 'Anonymous',
      });
    });

    socket.on('study:leave', ({ subjectId, lessonId }) => {
      const room = `study:${subjectId}:${lessonId}`;
      socket.leave(room);
      socket.to(room).emit('study:user-left', {
        userId,
        username: socket.username || 'Anonymous',
      });
    });

    socket.on('study:progress', ({ subjectId, lessonId, status }) => {
      const room = `study:${subjectId}:${lessonId}`;
      socket.to(room).emit('study:progress-update', {
        userId,
        username: socket.username || 'Anonymous',
        status,
      });
    });

    socket.on('leaderboard:subscribe', () => {
      socket.join('leaderboard');
    });

    socket.on('leaderboard:unsubscribe', () => {
      socket.leave('leaderboard');
    });

    socket.on('xp:update', (data) => {
      socket.to('leaderboard').emit('xp:updated', {
        userId,
        username: socket.username || 'Anonymous',
        ...data,
      });
    });

    socket.on('activity:new', (data) => {
      io.emit('activity:global', {
        userId,
        username: socket.username || 'Anonymous',
        ...data,
      });
    });

    socket.on('disconnect', () => {
      if (userId) {
        onlineUsers.delete(userId);
        io.emit('users:online', Array.from(onlineUsers.values()));
      }
    });
  });

  return io;
}
