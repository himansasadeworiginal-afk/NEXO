# Next Steps — After Break

## 1. Deploy Backend to Render

1. Go to https://render.com → Sign up with GitHub
2. Click **New +** → **Blueprint** → select `himansasadeworiginal-afk/NEXO`
3. Render auto-detects `server/render.yaml` — just confirm
4. After deploy, go to Dashboard → `nexo-api` → Environment
5. Set `JWT_SECRET` to a strong random string
6. Copy your Render URL (looks like `https://nexo-api.onrender.com`)

## 2. Update Render URL in nexo-api.js

Open `nexo-api.js` and change the `RENDER_URL` constant at the top to your actual Render URL:

```js
const RENDER_URL = 'https://nexo-api.onrender.com'; // ← change this
```

## 3. Backend Endpoints Still Needed

Phone/OTP and Google OAuth are still simulated (no server routes). You'll need to add:

- `POST /api/auth/send-code` — send SMS code to phone
- `POST /api/auth/verify-otp` — verify OTP code, return JWT
- `GET /api/auth/google` — Google OAuth redirect/flow

These are marked with `// BACKEND:` comments in `login.html` and `signup.html`.

## 4. Demo Credentials

- Email: `demo@nexo.app` / Password: `demo1234`
- API health check: `GET <render-url>/api/health`

## 5. Optional

- Set up Stripe keys in Render env for premium features
- Update `CORS_ORIGIN` on Render if cross-origin errors appear
