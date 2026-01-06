import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
  pomodoroReducer,
  createInitialState,
} from "./pomodoroReducer";
import type { PomodoroSettings } from "../types";

const settings: PomodoroSettings = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4,
};

/* =========================
   Property-based tests
========================= */

describe("Property tests", () => {
  it("secondsLeft never goes below 0", () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 5000 }), (seconds) => {
        const state = {
          ...createInitialState(settings),
          running: true,
          secondsLeft: seconds,
        };

        const next = pomodoroReducer(state, { type: "TICK" });
        expect(next.secondsLeft).toBeGreaterThanOrEqual(0);
      })
    );
  });
});

/* =========================
   Reducer behavior tests
========================= */

describe("Pomodoro reducer", () => {
  it("starts timer", () => {
    const state = createInitialState(settings);
    const next = pomodoroReducer(state, { type: "START" });
    expect(next.running).toBe(true);
  });

  it("ticks down seconds", () => {
    const state = {
      ...createInitialState(settings),
      running: true,
      secondsLeft: 10,
    };
    const next = pomodoroReducer(state, { type: "TICK" });
    expect(next.secondsLeft).toBe(9);
  });

  it("transitions focus → short break", () => {
    const state = {
      ...createInitialState(settings),
      mode: "focus" as const,
      focusCount: 0,
    };
    const next = pomodoroReducer(state, { type: "COMPLETE" });
    expect(next.mode).toBe("shortBreak");
  });

  it("transitions to long break on 4th focus", () => {
    const state = {
      ...createInitialState(settings),
      mode: "focus" as const,
      focusCount: 3,
    };
    const next = pomodoroReducer(state, { type: "COMPLETE" });
    expect(next.mode).toBe("longBreak");
  });

  it("skips session correctly", () => {
    const state = {
      ...createInitialState(settings),
      mode: "shortBreak" as const,
    };
    const next = pomodoroReducer(state, { type: "SKIP" });
    expect(next.mode).toBe("focus");
  });

  it("toggles dark mode", () => {
    const state = createInitialState(settings);
    const next = pomodoroReducer(state, {
      type: "TOGGLE_DARK_MODE",
    });
    expect(next.darkMode).toBe(!state.darkMode);
  });
});

/* =========================
   Pending settings behavior
========================= */

describe("Pending settings behavior", () => {
  it("stores pending settings when running and applyAfterSession is true", () => {
    const state = {
      ...createInitialState(settings),
      running: true,
      applyAfterSession: true,
    };

    const newSettings = {
      ...settings,
      focusMinutes: 30,
    };

    const next = pomodoroReducer(state, {
      type: "UPDATE_SETTINGS",
      payload: newSettings,
    });

    expect(next.settings.focusMinutes).toBe(25);
    expect(next.pendingSettings).toEqual(newSettings);
  });

  it("applies settings immediately when not running", () => {
    const state = {
      ...createInitialState(settings),
      running: false,
    };

    const newSettings = {
      ...settings,
      focusMinutes: 30,
    };

    const next = pomodoroReducer(state, {
      type: "UPDATE_SETTINGS",
      payload: newSettings,
    });

    expect(next.settings.focusMinutes).toBe(30);
    expect(next.pendingSettings).toBeUndefined();
  });

  it("applies pending settings when APPLY_PENDING_SETTINGS is dispatched", () => {
    const pending = {
      ...settings,
      focusMinutes: 30,
    };

    const state = {
      ...createInitialState(settings),
      pendingSettings: pending,
    };

    const next = pomodoroReducer(state, {
      type: "APPLY_PENDING_SETTINGS",
    });

    expect(next.settings).toEqual(pending);
    expect(next.pendingSettings).toBeUndefined();
  });

  it("does nothing when APPLY_PENDING_SETTINGS is dispatched with no pending settings", () => {
    const state = createInitialState(settings);

    const next = pomodoroReducer(state, {
      type: "APPLY_PENDING_SETTINGS",
    });

    expect(next).toEqual(state);
  });
});
