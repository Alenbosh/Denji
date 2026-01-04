import type { PomodoroSession, PomodoroSettings } from "../types"

const SESSION_KEY = "pomoSessions"
const SETTINGS_KEY = "pomoSettings"

export function saveSession(session: PomodoroSession) {
  const existing = JSON.parse(localStorage.getItem(SESSION_KEY) || "[]")
  existing.push(session)
  localStorage.setItem(SESSION_KEY, JSON.stringify(existing))
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
