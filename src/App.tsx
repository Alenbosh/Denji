import { useReducer, useEffect, useRef } from "react";
import { Timer } from "./components/Timer";
import { Controls } from "./components/Controls";
import { Stats } from "./components/Stats";
import { Settings } from "./components/Settings";
import { initAudio,playBeepSafe } from "./utils/sound";
import { getISTTime } from "./utils/time";
import { saveSession, loadSettings, saveSettings } from "./utils/storage";

import { pomodoroReducer, createInitialState } from "./reducer/pomodoroReducer";

import { usePomodoroEngine } from "./hooks/usePomodoroEngine";
import type { PomodoroSettings } from "./types";

const DEFAULT_SETTINGS: PomodoroSettings = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4,
};

export default function App() {
  const settings = loadSettings(DEFAULT_SETTINGS);
  const [state, dispatch] = useReducer(
    pomodoroReducer,
    createInitialState(settings)
  );

  const startTimeRef = useRef<string>("");

  usePomodoroEngine(state.running, dispatch);

  useEffect(() => {
    if (state.secondsLeft === 0 && !state.running) {
      playBeepSafe(state.soundEnabled, state.volume, 660);

      if (Notification.permission === "granted") {
        new Notification("Session complete", {
          body: state.mode === "focus" ? "Time for a break" : "Back to focus",
        });
      }

      dispatch({ type: "COMPLETE" });
    }
  }, [state.secondsLeft]);

  
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // When timer hits 0 → COMPLETE
  useEffect(() => {
    if (state.secondsLeft === 0 && !state.running) {
      saveSession({
        type: state.mode,
        duration:
          state.mode === "focus"
            ? state.settings.focusMinutes
            : state.mode === "shortBreak"
            ? state.settings.shortBreakMinutes
            : state.settings.longBreakMinutes,
        startedAtIST: startTimeRef.current,
        completedAtIST: getISTTime(),
      });

      dispatch({ type: "COMPLETE" });
    }
  }, [state.secondsLeft]);

  useEffect(() => {
    document.documentElement.dataset.theme = state.darkMode ? "dark" : "light";
  }, [state.darkMode]);

  useEffect(() => {
    function onVisibility() {
      if (document.hidden) {
        dispatch({ type: "PAUSE" });
      }
    }

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement) return;

      if (e.code === "Space") {
        e.preventDefault();
        dispatch({ type: state.running ? "RESET" : "START" });
      }

      if (e.key === "r") dispatch({ type: "RESET" });
      if (e.key === "s") dispatch({ type: "SKIP" });
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.running]);

  function start() {
    initAudio();
    startTimeRef.current = getISTTime();
    dispatch({ type: "START" });
  }

  function reset() {
    dispatch({ type: "RESET" });
  }

  function updateSettings(s: PomodoroSettings) {
    saveSettings(s);
    dispatch({ type: "UPDATE_SETTINGS", payload: s });
  }

  return (
    <div>
      <h2
        key={state.mode}
        style={{
          animation: "fadeSlide 0.3s ease",
        }}
      >
        {state.mode.toUpperCase()}
      </h2>

      <Timer seconds={state.secondsLeft} />

      <Controls
        running={state.running}
        onStart={start}
        onPause={() => dispatch({ type: "RESET" })}
        onReset={reset}
        onSkip={() => dispatch({ type: "SKIP" })}
      />

      <Settings
        settings={state.settings}
        autoStartNext={state.autoStartNext}
        soundEnabled={state.soundEnabled}
        volume={state.volume}
        darkMode={state.darkMode}
        onToggleDarkMode={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
        onChange={updateSettings}
        onToggleAutoStart={() => dispatch({ type: "TOGGLE_AUTO_START" })}
        onToggleSound={() => dispatch({ type: "TOGGLE_SOUND" })}
        onVolumeChange={(v) => dispatch({ type: "SET_VOLUME", payload: v })}
      />

      <Stats />
    </div>
  );
}
