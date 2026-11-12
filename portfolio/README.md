# Personal Portfolio (React + Vite + Express)

```
portfolio/
├── frontend/   React + Vite website
└── backend/    Express API (contact form)
```

## Requirements
- Node.js 18 or newer (check with `node -v`)

## Run the backend
```bash
cd backend
npm install
cp .env.example .env     # Windows: copy .env.example .env
npm start                # http://localhost:5000
```
Open http://localhost:5000/api/health. `"email": true` means SMTP is configured.
Without SMTP settings, messages are saved to `backend/messages.json` only.

### Email setup (Gmail)
1. Turn on 2-Step Verification in your Google account.
2. Create an App Password (Google Account > Security > App passwords).
3. Put it in `backend/.env` as `SMTP_PASS`, and set `SMTP_USER` and `MAIL_TO`.

## Run the frontend (second terminal)
```bash
cd frontend
npm install
npm run dev              # http://localhost:5173
```
Vite proxies `/api` to the backend, so start the backend first.

## Before deploying
- Edit `frontend/src/data/content.js` (name, about, skills, projects, links).
- Add your CV as `frontend/public/resume.pdf` (the "Download CV" button needs it).
- Optionally add `frontend/public/og-image.png` (1200x630) for link previews.
- Replace `your-domain.com` in `frontend/index.html` with your real URL.

## Build for production
```bash
cd frontend
npm run build            # output in frontend/dist
```

## Theme
Colors live in the variables at the top of `frontend/src/styles/global.css`
(`:root` for dark, `[data-theme="light"]` for light).
