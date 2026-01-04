import type { Mode, PomodoroSettings } from "../types"
import { minutesToSeconds } from "../utils/time"

export interface PomodoroState {
  mode: Mode
  secondsLeft: number
  focusCount: number
  running: boolean
  settings: PomodoroSettings
  autoStartNext: boolean
  soundEnabled: boolean
  volume: number
  darkMode: boolean
}


export type PomodoroAction =
  | { type: "START" }
  | { type: "TICK" }
  | { type: "COMPLETE" }
  | { type: "RESET" }
  | { type: "UPDATE_SETTINGS"; payload: PomodoroSettings }
  | { type: "TOGGLE_AUTO_START" }
  | { type: "SKIP" }
  | { type: "PAUSE" }
  | { type: "TOGGLE_SOUND" }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "TOGGLE_DARK_MODE" }






export function createInitialState(
  settings: PomodoroSettings
): PomodoroState {
  return {
    mode: "focus",
    secondsLeft: minutesToSeconds(settings.focusMinutes),
    focusCount: 0,
    running: false,
    settings,
    autoStartNext: true,
    darkMode: true,
    soundEnabled: true,   // 🔊 default ON
    volume: 0.5           // 🎛 50%
  }

}


function assertNever(x: never): never {
  throw new Error("Unhandled action: " + JSON.stringify(x))
}


function getDuration(mode: Mode, s: PomodoroSettings) {
  if (mode === "focus") return minutesToSeconds(s.focusMinutes)
  if (mode === "shortBreak") return minutesToSeconds(s.shortBreakMinutes)
  return minutesToSeconds(s.longBreakMinutes)
}

export function pomodoroReducer(
  state: PomodoroState,
  action: PomodoroAction
): PomodoroState {
  switch (action.type) {
    case "START":
      return { ...state, running: true }

    case "TICK":
      if (!state.running) return state
      if (state.secondsLeft > 1) {
        return { ...state, secondsLeft: state.secondsLeft - 1 }
      }
      return { ...state, secondsLeft: 0, running: false }
    case "COMPLETE": {
      const shouldRun = state.autoStartNext

      if (state.mode === "focus") {
        const nextFocus = state.focusCount + 1
        const nextMode =
          nextFocus % state.settings.sessionsBeforeLongBreak === 0
            ? "longBreak"
            : "shortBreak"

        return {
          ...state,
          mode: nextMode,
          focusCount: nextFocus,
          secondsLeft: getDuration(nextMode, state.settings),
          running: shouldRun
        }
      }

      return {
        ...state,
        mode: "focus",
        secondsLeft: getDuration("focus", state.settings),
        running: shouldRun
      }
    }


    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode }


    case "SKIP": {
      const shouldRun = state.autoStartNext

      if (state.mode === "focus") {
        const nextFocus = state.focusCount + 1
        const nextMode =
          nextFocus % state.settings.sessionsBeforeLongBreak === 0
            ? "longBreak"
            : "shortBreak"

        return {
          ...state,
          mode: nextMode,
          focusCount: nextFocus,
          secondsLeft: getDuration(nextMode, state.settings),
          running: shouldRun
        }
      }

      return {
        ...state,
        mode: "focus",
        secondsLeft: getDuration("focus", state.settings),
        running: shouldRun
      }
    }

    case "RESET":
      return {
        ...state,
        secondsLeft: getDuration(state.mode, state.settings),
        running: false
      }

    case "TOGGLE_AUTO_START":
      return {
        ...state,
        autoStartNext: !state.autoStartNext
      }

    case "PAUSE":
      return { ...state, running: false }
    case "TOGGLE_SOUND":
      return {
        ...state,
        soundEnabled: !state.soundEnabled
      }

    case "SET_VOLUME":
      return {
        ...state,
        volume: Math.min(1, Math.max(0, action.payload))
      }


    case "UPDATE_SETTINGS":
      return createInitialState(action.payload)

    default:
      return assertNever(action)

  }
}
