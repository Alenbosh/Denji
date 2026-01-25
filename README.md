# 🧠 Denji — Focus, Time & Study Companion

[![Try Denji](https://img.shields.io/badge/Try-Denji-blue?style=for-the-badge)](https://pochita-tau.vercel.app)

**Live MVP:** [https://pochita-tau.vercel.app](https://pochita-tau.vercel.app)

Denji is a **desktop-first productivity application** built with React and TypeScript, centered around **deep focus, intentional time tracking, and clean state management**.

At its core, Denji is a **Pomodoro engine**, but it is intentionally designed to grow into a **student productivity OS** — supporting focus sessions, stats, habits, tasks, subjects, and exam planning over time.
@@ -25,15 +29,6 @@ At its core, Denji is a **Pomodoro engine**, but it is intentionally designed to
  * **runtime state** (seconds left, running, mode)
  * **configuration state** (durations, preferences)

### ⏳ Deferred Settings Application

* Duration changes during a running session are **not applied immediately**
* Changes are stored as **pending settings**
* Pending settings apply:

  * when a session completes
  * when the user presses Reset
* This avoids accidental timer resets and preserves focus

### 🔔 Feedback & UX Clarity

@@ -145,6 +140,17 @@ Denji avoids “everything happens instantly” design in favor of **intentional
* **LocalStorage** (persistence)
* **CSS (desktop-first, no heavy UI frameworks)**

---

## 🧠 Google Technologies Used
- Google Chrome  
- Chrome DevTools  
- Google Gemini API  

## Google AI Tools Integrated
- Google Gemini API for generating contextual productivity and focus tips


---

## 🔮 Planned / Conceptual Features (Not Implemented Yet)
@@ -179,4 +185,25 @@ but never chaotic.

---

## 📝 MVP Features (Submission-ready)
- Pomodoro Timer Engine with Focus / Break modes  
- Configurable durations  
- Automatic session transitions  
- AI-powered Focus Tips using Google Gemini  
- Clear, intentional UX and state feedback  
- Persistent session tracking

---

## 💡 How to Run Locally
1. Clone the repo:  
  ```bash
  git clone git@github.com:YOUR_USERNAME/Denji.git
2. Install dependencies:
  npm install
3. Add .env file with your Gemini API key:
  VITE_GEMINI_API_KEY=your_api_key_here
4. Start dev server:
  npm run dev
5. Open http://localhost:5173 in your browser
