# 🧠 Denji — Focus, Time & Study Companion

[![Try Denji](https://img.shields.io/badge/Try-Denji-blue?style=for-the-badge)](https://pochita-tau.vercel.app)

**Live MVP:** [https://pochita-tau.vercel.app](https://pochita-tau.vercel.app)

Denji is a **desktop-first productivity application** built with **React + TypeScript**, designed around deep focus, intentional time tracking, and clean state management.

At its core, Denji is a powerful **Pomodoro engine**, built to evolve into a full **Student Productivity OS** — supporting focus sessions, habits, tasks, subjects, and exam planning.

---

## ✨ Core Features

### ⏱ Pomodoro Engine

* Focus / Short Break / Long Break modes
* Automatic session transitions
* Manual reset & session control
* Persistent session tracking

### ⚙️ Intelligent State Management

* Clear separation of:

  * **Runtime state** (seconds left, running status, mode)
  * **Configuration state** (durations, preferences)
* Stable and predictable timer behavior

### 🔔 Clear UX Feedback

* Visual session state clarity
* Intentional interaction design
* No accidental timer disruptions

### 🤖 AI-Powered Focus Tips

* Integrated with **Google Gemini API**
* Generates contextual productivity and focus suggestions
* Designed to feel supportive, not distracting

---

## 🧠 Tech Stack

* **React**
* **TypeScript**
* **Vite**
* **LocalStorage** (data persistence)
* **Google Gemini API**
* **CSS (desktop-first, lightweight styling)**

---

## 🚀 MVP Scope (Submission Ready)

* Pomodoro timer engine
* Configurable durations
* Automatic session switching
* AI-powered focus tips
* Persistent state
* Clean, intentional UX

---

## 🔮 Planned Features (Future Roadmap)

* Habit tracking
* Subject-based session tracking
* Study statistics dashboard
* Task integration
* Exam countdown system
* Long-term productivity analytics

Denji is built to grow — structured, minimal, and scalable.

---

## 💻 Running Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Denji.git
cd Denji
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the root directory:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

### 4️⃣ Start the development server

```bash
npm run dev
```

### 5️⃣ Open in browser

Visit:

```
http://localhost:5173
```


