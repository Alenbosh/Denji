# 🧠 Denji — Focus, Time & Study Companion

Denji is a **desktop-first productivity application** built with React and TypeScript, centered around **deep focus, intentional time tracking, and clean state management**.

At its core, Denji is a **Pomodoro engine**, but it is intentionally designed to grow into a **student productivity OS** — supporting focus sessions, stats, habits, tasks, subjects, and exam planning over time.

---

## ✨ Current Features (Implemented)

### ⏱️ Pomodoro Timer Engine

* Focus / Short Break / Long Break modes
* Configurable durations
* Automatic mode transitions
* Cycle tracking (long break after N focus sessions)
* Auto-start next session (optional)

### 🧠 State-Driven Architecture

* Reducer-based finite state machine
* Explicit lifecycle boundaries (start, reset, complete)
* Clear separation between:

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

* Visual **“Pending changes”** badge near the timer
* Animated **“Settings applied”** confirmation
* Timer ring pulses briefly when new settings take effect
* Mode-based ring colors for visual context

### 📊 Session Tracking & Stats

* Each completed session is recorded with:

  * type (focus / break)
  * duration
  * start & completion time (IST)
* Sessions persist across refresh using local storage
* Stats page with reset functionality

### 🎧 Sound & Notifications

* Optional ticking / completion sound
* Volume control
* Browser notifications on session completion
* Audio safely initialized on user interaction

### 🌗 Appearance & Accessibility

* Light / Dark mode support
* Reduced surprise effects (animations are subtle and intentional)
* Desktop-focused layout (not mobile-first)

### ⌨️ Productivity Enhancements

* Keyboard shortcuts:

  * Space → start / pause
  * `r` → reset
  * `s` → skip session
* Timer automatically pauses when tab loses focus

---

## 🧪 Testing & Reliability

Denji emphasizes **correctness over hacks**.

### Reducer Tests

* Unit tests for all core state transitions
* Tests for pending-settings behavior
* Guard against accidental regressions

### Property-Based Testing

* Ensures timer values never go negative
* Tests reducer invariants under random input

### Snapshot Testing

* Verifies reducer state shape
* Snapshots updated only for intentional changes

### Continuous Integration

* GitHub Actions runs tests on every push and PR

---

## 🗂️ Project Structure (Current)

```
src/
├── app/                # App entry, routing, layout
├── components/         # Reusable UI components
├── context/            # PomodoroContext (global state)
├── hooks/              # Custom hooks (timer engine)
├── pages/              # Route-level pages (Timer, Stats, Settings)
├── reducer/            # Pomodoro reducer + tests
├── styles/             # Global & component styles
├── utils/              # Storage, sound, time helpers
├── types.ts            # Shared domain types
└── main.tsx            # React bootstrap
```

The project follows a **feature-first mindset** while keeping shared logic isolated and testable.

---

## 🧠 Design Philosophy

* **Predictability over magic**
* **Explicit state transitions**
* **No hidden side effects**
* **Focus should never be broken by settings changes**
* **UX feedback should explain behavior, not surprise users**

Denji avoids “everything happens instantly” design in favor of **intentional boundaries**.

---

## 🚀 Tech Stack

* **React** (with hooks)
* **TypeScript**
* **Vite**
* **React Router**
* **Vitest**
* **fast-check** (property-based testing)
* **LocalStorage** (persistence)
* **CSS (desktop-first, no heavy UI frameworks)**

---

## 🔮 Planned / Conceptual Features (Not Implemented Yet)

> These are ideas, not promises.

* Tasks & daily goals
* Habit / streak tracking
* Subject-wise dashboards
* Assignment due tracking
* Exam schedules & countdowns
* Study time analytics per subject
* Calendar & timeline views

The current architecture is designed to support these **without rewrites**.

---

## 🧭 Status

Denji is currently in **active development**.

The Pomodoro engine and state architecture are considered **stable**.
Future work will focus on **study planning features**, not reworking the core.

---

## 📌 Why “Denji”?

Because focus should feel **controlled, powerful, and a little unhinged** —
but never chaotic.

---


