import type { PomodoroSession, PomodoroSettings } from "../types"

const SESSION_KEY = "pomoSessions"
const SETTINGS_KEY = "pomoSettings"

export function saveSession(session: PomodoroSession) {
  const existing = loadSessions();
  const updated = [...existing, session];
  localStorage.setItem("sessions", JSON.stringify(updated));
}

export function getSessions(): PomodoroSession[] {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || "[]")
}

export function saveSettings(settings: PomodoroSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

export function loadSettings(defaults: PomodoroSettings): PomodoroSettings {
  return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null") ?? defaults
}

export function resetSettings(defaults: PomodoroSettings) {
  localStorage.setItem("settings", JSON.stringify(defaults))
}

export function loadSessions(): PomodoroSession[] {
  const raw = localStorage.getItem("sessions");
  return raw ? JSON.parse(raw) : [];
}


export function clearSessions() {
  localStorage.removeItem("sessions")
}
