import { useEffect, useState, useMemo } from "react";

import { Timer } from "../components/Timer";
import { Controls } from "../components/Controls";

import { usePomodoro } from "../context/PomodoroContext";
import { FocusTip } from "../components/FocusTip";

import { useSubjects } from "../features/subjects/SubjectContext";
import { useSessionRecorder } from "../hooks/useSessionRecorder";

import { recommendSubject } from "../utils/recommendation";

export default function TimerPage() {
    /* =========================
       Contexts & hooks
    ========================= */

    const { state, dispatch, start, sessions } = usePomodoro();
    const { subjects, activeSubjectId, setActiveSubject } = useSubjects();
    const { markSessionStart } = useSessionRecorder();

    const [justApplied, setJustApplied] = useState(false);

    /* =========================
       Derived state
    ========================= */

    const activeSubject = subjects.find(
        (s) => s.id === activeSubjectId
    );

    const suggestedSubject = useMemo(() => {
        if (state.mode !== "focus") return null;
        return recommendSubject(sessions, subjects);
    }, [state.mode, sessions, subjects]);

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

    /* =========================
       Effects
    ========================= */

    // Pulse ring when pending settings apply
    useEffect(() => {
        if (!state.pendingSettings) {
            setJustApplied(true);
            const t = setTimeout(() => setJustApplied(false), 800);
            return () => clearTimeout(t);
        }
    }, [state.mode]);

    /* =========================
       Render
    ========================= */

    return (
        <section className={`page timer-page mode-${state.mode}`}>
            {/* Header */}
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


            {/* Active subject badge */}
            {state.mode === "focus" && activeSubject && (
                <div
                    className="active-subject-badge"
                    style={{ borderColor: activeSubject.color }}
                >
                    <span
                        className="subject-dot"
                        style={{ backgroundColor: activeSubject.color }}
                    />
                    <span className="subject-name">{activeSubject.name}</span>
                </div>
            )}

            {/* Suggested subject */}
            {state.mode === "focus" &&
                suggestedSubject &&
                suggestedSubject.id !== activeSubjectId && (
                    <div
                        className="suggested-subject"
                        onClick={() => setActiveSubject(suggestedSubject.id)}
                    >
                        <span className="suggested-label">Suggested</span>
                        <span
                            className="subject-dot"
                            style={{ backgroundColor: suggestedSubject.color }}
                        />
                        <span className="suggested-name">
                            {suggestedSubject.name}
                        </span>
                    </div>
                )}

            {/* Badges */}
            <div className="timer-badges">
                {state.pendingSettings && (
                    <span className="pending-badge">⏳ Pending changes</span>
                )}
                {justApplied && (
                    <span className="applied-badge">✓ Settings applied</span>
                )}
            </div>

            {/* Timer */}
            <div className="timer-container">
                <Timer
                    seconds={state.secondsLeft}
                    totalSeconds={totalSeconds}
                    mode={state.mode}
                    pulse={justApplied}
                />
            </div>

            {/* Controls */}
            <Controls
                running={state.running}
                onStart={() => {
                    markSessionStart();
                    start();
                }}
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
