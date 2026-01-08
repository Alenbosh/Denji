import { Timer } from "../components/Timer";
import { Controls } from "../components/Controls";
import { usePomodoro } from "../context/PomodoroContext";
import { useEffect, useState } from "react";
import { FocusTip } from "../components/FocusTip";


export default function TimerPage() {
  const { state, dispatch, start } = usePomodoro();
  const [justApplied, setJustApplied] = useState(false);

  const effectiveSettings = state.pendingSettings ?? state.settings;

  const totalSeconds =
    state.mode === "focus"
      ? effectiveSettings.focusMinutes * 60
      : state.mode === "shortBreak"
      ? effectiveSettings.shortBreakMinutes * 60
      : effectiveSettings.longBreakMinutes * 60;

  useEffect(() => {
    if (!state.pendingSettings) {
      setJustApplied(true);
      const t = setTimeout(() => setJustApplied(false), 800);
      return () => clearTimeout(t);
    }
  }, [state.mode]);

  const modeLabels = {
    focus: "Focus",
    shortBreak: "Short Break",
    longBreak: "Long Break",
  };

  return (
    <section className={`page timer-page mode-${state.mode}`}>
      <div className="timer-header">
        <h1 key={state.mode} className="page-title mode-title">
          {modeLabels[state.mode]}
        </h1>
        <p className="mode-subtitle">
          {state.mode === "focus" 
            ? "Time to focus and get things done" 
            : state.mode === "shortBreak"
            ? "Take a quick break to recharge"
            : "Enjoy a longer break"}
        </p>
      </div>

      {state.mode === "focus" && <FocusTip />}


      <div className="timer-badges">
        {state.pendingSettings && (
          <span className="pending-badge">⏳ Pending changes</span>
        )}
        {justApplied && <span className="applied-badge">✓ Settings applied</span>}
      </div>

      <div className="timer-container">
        <Timer
          seconds={state.secondsLeft}
          totalSeconds={totalSeconds}
          mode={state.mode}
          pulse={justApplied}
        />
      </div>

      <Controls
        running={state.running}
        onStart={start}
        onPause={() => dispatch({ type: "PAUSE" })}
        onReset={() => {
          dispatch({ type: "RESET" });
          dispatch({ type: "APPLY_PENDING_SETTINGS" });
        }}
        onSkip={() => dispatch({ type: "SKIP" })}
      />
    </section>
  );
}
