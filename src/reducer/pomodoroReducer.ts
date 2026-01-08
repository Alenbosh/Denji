import type { Mode, PomodoroSettings } from "../types";
import { minutesToSeconds } from "../utils/time";
import { DEFAULT_SETTINGS } from "../types";



export interface PomodoroState {
  mode: Mode;
  secondsLeft: number;
  focusCount: number;
  running: boolean;

  settings: PomodoroSettings;
  defaultSettings: PomodoroSettings;

  pendingSettings?: PomodoroSettings;

  autoStartNext: boolean;
  soundEnabled: boolean;
  volume: number;
  darkMode: boolean;
}



export type PomodoroAction =
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "RESET" }
  | { type: "TICK" }
  | { type: "COMPLETE" }
  | { type: "SKIP" }
  | { type: "UPDATE_SETTINGS"; payload: PomodoroSettings }
  | { type: "RESET_SETTINGS" }
  | { type: "TOGGLE_AUTO_START" }
  | { type: "TOGGLE_SOUND" }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "TOGGLE_DARK_MODE" }
  | { type: "APPLY_PENDING_SETTINGS" };



export function createInitialState(
  settings: PomodoroSettings
): PomodoroState {
  return {
    mode: "focus",
    secondsLeft: minutesToSeconds(settings.focusMinutes),
    focusCount: 0,
    running: false,

    settings,
    defaultSettings: DEFAULT_SETTINGS,

    pendingSettings: undefined,

    autoStartNext: true,
    darkMode: true,
    soundEnabled: true,
    volume: 0.5,
  };
}



function getDuration(mode: Mode, s: PomodoroSettings): number {
  switch (mode) {
    case "focus":
      return minutesToSeconds(s.focusMinutes);
    case "shortBreak":
      return minutesToSeconds(s.shortBreakMinutes);
    case "longBreak":
      return minutesToSeconds(s.longBreakMinutes);
  }
}

function getEffectiveSettings(state: PomodoroState): PomodoroSettings {
  return state.pendingSettings ?? state.settings;
}

function assertNever(x: never): never {
  throw new Error(`Unhandled action: ${JSON.stringify(x)}`);
}



export function pomodoroReducer(
  state: PomodoroState,
  action: PomodoroAction
): PomodoroState {
  switch (action.type) {


    case "START":
      return { ...state, running: true };

    case "PAUSE":
      return { ...state, running: false };

    case "TICK":
      if (!state.running) return state;
      if (state.secondsLeft > 1) {
        return { ...state, secondsLeft: state.secondsLeft - 1 };
      }
      return { ...state, secondsLeft: 0};



    case "COMPLETE": {
      const effective = getEffectiveSettings(state);
      const shouldRun = state.autoStartNext;

      if (state.mode === "focus") {
        const nextFocus = state.focusCount + 1;
        const nextMode =
          nextFocus % effective.sessionsBeforeLongBreak === 0
            ? "longBreak"
            : "shortBreak";

        return {
          ...state,
          mode: nextMode,
          focusCount: nextFocus,
          settings: effective,
          pendingSettings: undefined,
          secondsLeft: getDuration(nextMode, effective),
          running: shouldRun,
        };
      }

      return {
        ...state,
        mode: "focus",
        settings: effective,
        pendingSettings: undefined,
        secondsLeft: getDuration("focus", effective),
        running: shouldRun,
      };
    }

    case "SKIP": {
      const effective = getEffectiveSettings(state);
      const shouldRun = state.autoStartNext;

      if (state.mode === "focus") {
        const nextFocus = state.focusCount + 1;
        const nextMode =
          nextFocus % effective.sessionsBeforeLongBreak === 0
            ? "longBreak"
            : "shortBreak";

        return {
          ...state,
          mode: nextMode,
          focusCount: nextFocus,
          settings: effective,
          pendingSettings: undefined,
          secondsLeft: getDuration(nextMode, effective),
          running: shouldRun,
        };
      }

      return {
        ...state,
        mode: "focus",
        settings: effective,
        pendingSettings: undefined,
        secondsLeft: getDuration("focus", effective),
        running: shouldRun,
      };
    }

    case "RESET": {
      const effective = getEffectiveSettings(state);

      return {
        ...state,
        running: false,
        settings: effective,
        pendingSettings: undefined,
        secondsLeft: getDuration(state.mode, effective),
      };
    }



    case "UPDATE_SETTINGS":

      if (state.running) {
        return {
          ...state,
          pendingSettings: action.payload,
        };
      }

      return {
        ...state,
        settings: action.payload,
        pendingSettings: undefined,
        secondsLeft: getDuration(state.mode, action.payload),
      };

    case "APPLY_PENDING_SETTINGS":
      if (!state.pendingSettings) return state;
      return {
        ...state,
        settings: state.pendingSettings,
        pendingSettings: undefined,
        secondsLeft: getDuration(state.mode, state.pendingSettings),
      };

    case "RESET_SETTINGS":
      return {
        ...state,
        settings: state.defaultSettings,
        pendingSettings: undefined,
        secondsLeft: getDuration(state.mode, state.defaultSettings),
      };



    case "TOGGLE_AUTO_START":
      return { ...state, autoStartNext: !state.autoStartNext };

    case "TOGGLE_SOUND":
      return { ...state, soundEnabled: !state.soundEnabled };

    case "SET_VOLUME":
      return {
        ...state,
        volume: Math.min(1, Math.max(0, action.payload)),
      };

    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };

    default:
      return assertNever(action);
  }
}
