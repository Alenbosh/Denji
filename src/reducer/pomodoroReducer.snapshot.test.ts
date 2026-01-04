import { describe, it, expect } from "vitest"
import {
  pomodoroReducer,
  createInitialState
} from "./pomodoroReducer"
import type { PomodoroSettings } from "../types"

const settings: PomodoroSettings = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4
}

describe("Reducer snapshots", () => {
  it("focus → shortBreak snapshot", () => {
    const state = {
      ...createInitialState(settings),
      mode: "focus" as const,
      focusCount: 0
    }

    const next = pomodoroReducer(state, { type: "COMPLETE" })
    expect(next).toMatchSnapshot()
  })
})
