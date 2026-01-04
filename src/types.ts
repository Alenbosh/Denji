export type Mode = "focus" | "shortBreak" | "longBreak"

export interface PomodoroSettings {
  focusMinutes: number
  shortBreakMinutes: number
  longBreakMinutes: number
  sessionsBeforeLongBreak: number
}

export interface PomodoroSession {
  type: Mode
  duration: number
  startedAtIST: string
  completedAtIST: string
}
