# 🧠 Denji — Focus, Time & Study Companion

**Live MVP:** [https://pochita-tau.vercel.app](https://pochita-tau.vercel.app)

Denji is a **desktop-first** productivity app built with **React + TypeScript**. It centers on deep focus, intentional time tracking, and clean state management.

At its core, Denji is a **Pomodoro engine** built to evolve into a full **Student Productivity OS** — supporting focus sessions, habits, tasks, subjects, and exam planning.

---

## ✨ Core Features

### ⏱ Pomodoro Engine

- **Focus / Short Break / Long Break** modes with automatic transitions
- Configurable durations (focus, short break, long break, sessions before long break)
- Manual reset, skip, and session control
- Persistent session tracking (LocalStorage)

### 📊 Stats Dashboard

- **Today / This Week / Total** focus minutes
- **Timeline** of past sessions
- **Charts:** focus over time, session-type breakdown (pie), **heatmap**
- Reset stats option

### ⚙️ Settings

- **Durations:** focus, short break, long break, sessions before long break
- **Preferences:** auto-start next session, sound on/off, volume, dark mode
- Changes apply after the current session (or immediately when stopped)

### 🤖 AI-Powered Focus Tips

- Integrated with **Google Gemini API** (serverless `/api/focus-tip`)
- Daily productivity tips on the Timer page (focus mode only)
- Cached per day; new tip each day

### 🔔 UX & Feedback

- Clear visual session state
- Completion sound & optional notifications
- Keyboard shortcuts (space: start/pause, `r`: reset, `s`: skip)
- Pause on tab blur

---

## 🧠 Tech Stack

| Layer        | Tech |
|-------------|------|
| **UI**      | React 19, TypeScript |
| **Build**   | Vite 7 |
| **Routing** | React Router 7 |
| **Charts**  | Recharts |
| **Data**    | LocalStorage |
| **AI**      | Google Gemini API (gemini-2.5-flash) via Vercel serverless |
| **Deploy**  | Vercel (frontend + `api/` functions) |
| **Test**    | Vitest |
| **Lint**    | ESLint |

---

## 🚀 MVP Scope (Submission Ready)

- [x] Pomodoro timer with configurable durations
- [x] Automatic session switching (focus → short/long break → focus)
- [x] Stats dashboard (summary, timeline, bar chart, pie chart, heatmap)
- [x] AI-powered daily focus tips (Gemini)
- [x] Settings (durations + preferences)
- [x] Persistent state (sessions, settings)
- [x] Clean, intentional UX

---

## 🔮 Planned / Future

- Habit tracking
- Subject-based session tracking
- Task integration
- Exam countdown
- Long-term productivity analytics

---

## 💻 Running Locally

### 1. Clone & install

```bash
git clone https://github.com/YOUR_USERNAME/Denji.git
cd Denji
npm install
```

### 2. Start the app

```bash
npm run dev
```

Then open **http://localhost:5173**.

- **Timer, Stats, Settings** work fully. Sessions and settings persist in LocalStorage.
- **Focus tips** will show the fallback (“Focus on one task…”) because the app calls `/api/focus-tip`, which is **not** run by `vite`.

### 3. (Optional) Focus tips locally

To use **real** Gemini tips locally:

1. Install [Vercel CLI](https://vercel.com/docs/cli) and log in.
2. Add `GEMINI_API_KEY` in [Vercel Project → Settings → Environment Variables](https://vercel.com/docs/projects/environment-variables) (or use a `.env` when running `vercel dev`).
3. Run:

   ```bash
   vercel dev
   ```

   This runs both the Vite app and the `api/focus-tip` serverless function.

**No `.env` or API key** is required for `npm run dev`; only for focus tips (and only when using the API).

---

## 🧪 Scripts

| Command        | Description |
|----------------|-------------|
| `npm run dev`  | Start Vite dev server |
| `npm run build`| TypeScript check + production build |
| `npm run preview` | Serve production build locally |
| `npm run test` | Run Vitest tests |
| `npm run lint` | Run ESLint |

---

## 📁 Project Structure

```
Denji/
├── api/
│   └── focus-tip.js       # Vercel serverless: Gemini focus tips
├── src/
│   ├── app/               # App root, layout, routing
│   ├── components/        # Timer, Controls, Stats, Settings, FocusTip, etc.
│   ├── context/           # PomodoroContext
│   ├── features/subjects/ # (WIP) Subject tracking
│   ├── hooks/             # usePomodoroEngine
│   ├── pages/             # Timer, Stats, Settings
│   ├── reducer/           # Pomodoro state logic + tests
│   ├── styles/
│   ├── utils/             # storage, ai, stats, time, etc.
│   └── types.ts
├── vercel.json            # SPA rewrites (exclude /api)
├── vite.config.ts
└── package.json
```

---

## 🚀 Deploying to Vercel

1. Push the repo to GitHub and [import](https://vercel.com/docs/git) it in Vercel.
2. Add **`GEMINI_API_KEY`** (from [Google AI Studio](https://aistudio.google.com/apikey)) in **Project → Settings → Environment Variables** for **Production** (and Preview if you use it).
3. Deploy. The `api/` folder is used as serverless functions; `vercel.json` keeps `/api` out of SPA rewrites.

See [docs/focus-tip-fix-notes.md](docs/focus-tip-fix-notes.md) for details on the focus-tip API, troubleshooting, and checklist.

---

## 📜 License

MIT License © Manish (Alen)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software, to deal in the software without restriction

See the [LICENSE](LICENSE) file for details

---

*Denji is built to grow — structured, minimal, and scalable.*
