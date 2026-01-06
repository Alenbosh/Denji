import { createContext, useContext } from "react"
import type { PomodoroState, PomodoroAction } from "../reducer/pomodoroReducer"
import type { PomodoroSession } from "../types";


interface PomodoroContextValue {
  state: PomodoroState;
  dispatch: React.Dispatch<PomodoroAction>;
  start: () => void;

  sessions: PomodoroSession[];
  setSessions: React.Dispatch<React.SetStateAction<PomodoroSession[]>>;
}


export const PomodoroContext =
  createContext<PomodoroContextValue | null>(null)

export function usePomodoro() {
  const ctx = useContext(PomodoroContext)
  if (!ctx) {
    throw new Error("usePomodoro must be used inside PomodoroProvider")
  }
  return ctx
}
