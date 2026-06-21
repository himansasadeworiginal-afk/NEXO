# Next Steps — Deploy to Render

GitHub Pages won't work on your network (ESET blocks it). Use Render instead — it hosts both the frontend AND backend.

## One-Click Deploy via Blueprint

1. Go to https://render.com → Sign up with GitHub
2. Click **New +** → **Blueprint** → select `himansasadeworiginal-afk/NEXO`
3. Render auto-detects `server/render.yaml` — it will create:
   - **`nexo-frontend`** — the static site (index.html, login.html, etc.) at `https://nexo-frontend.onrender.com`
   - **`nexo-api`** — the Node.js backend at `https://nexo-api.onrender.com`
4. Confirm and deploy

## After Deploy

Update `nexo-api.js` with your actual Render URLs if they differ:

```js
const RENDER_URL = 'https://nexo-api.onrender.com';
```

## Endpoints Still Needed (Phone/OTP/Google)

- `POST /api/auth/send-code` — send SMS code to phone
- `POST /api/auth/verify-otp` — verify OTP code, return JWT
- `GET /api/auth/google` — Google OAuth flow

Marked with `// BACKEND:` in `login.html` and `signup.html`.

## Demo Credentials

- Email: `demo@nexo.app` / Password: `demo1234`
- Health check: `GET https://nexo-api.onrender.com/api/health`

## Optional

- Set Stripe keys in Render env for premium features
