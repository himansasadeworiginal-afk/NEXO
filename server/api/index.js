import serverless from 'serverless-http';
import app from '../src/app.js';
import { init } from '../src/config/db.js';

let initialized = false;

app.use(async (req, res, next) => {
  if (!initialized) {
    await init();
    initialized = true;
  }
  next();
});

export const handler = serverless(app);
