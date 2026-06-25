import http from 'http';
import { init } from './config/db.js';
import { setupSocket } from './socket/index.js';
import app from './app.js';

const server = http.createServer(app);
setupSocket(server);

const PORT = parseInt(process.env.PORT || '4000');

async function start() {
  await init();
  server.listen(PORT, () => {
    console.log(`NEXO API running on http://localhost:${PORT}`);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
