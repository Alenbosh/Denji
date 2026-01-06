import { Timer } from "../components/Timer";
import { Controls } from "../components/Controls";
import { usePomodoro } from "../context/PomodoroContext";
import { useEffect, useState } from "react";

export default function TimerPage() {
  const { state, dispatch, start } = usePomodoro();
  const [justApplied, setJustApplied] = useState(false);

  const totalSeconds =
    state.mode === "focus"
      ? state.settings.focusMinutes * 60
      : state.mode === "shortBreak"
      ? state.settings.shortBreakMinutes * 60
      : state.settings.longBreakMinutes * 60;

  useEffect(() => {
    if (!state.pendingSettings) {
      setJustApplied(true);
      const t = setTimeout(() => setJustApplied(false), 1200);
      return () => clearTimeout(t);
    }
  }, [state.pendingSettings]);

  return (
    <section className={`page mode-${state.mode}`}>
      <h1 key={state.mode} className="page-title mode-title">
        {state.mode.toUpperCase()}
      </h1>

      {state.pendingSettings && (
        <span className="pending-badge">Pending changes</span>
      )}

      {justApplied && <span className="applied-badge">Settings applied ✓</span>}

      <Timer
        seconds={state.secondsLeft}
        totalSeconds={totalSeconds}
        mode={state.mode}
        pulse={justApplied}
      />

      <Controls
        running={state.running}
        onStart={start}
        onPause={() => dispatch({ type: "PAUSE" })}
        onReset={() => {
          dispatch({ type: "RESET" });
          dispatch({ type: "APPLY_PENDING_SETTINGS" }); // 👈 HERE
        }}
        onSkip={() => dispatch({ type: "SKIP" })}
      />
    </section>
  );
}
