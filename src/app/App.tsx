import { useState, useReducer, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Layout from "./Layout";
import TimerPage from "../pages/TimerPage";
import StatsPage from "../pages/StatsPage";
import SettingsPage from "../pages/SettingsPage";
import { initAudio, playBeepSafe } from "../utils/sound";
import { getISTTime } from "../utils/time";
import { saveSession, loadSettings } from "../utils/storage";
import type { PomodoroSession } from "../types";
import { loadSessions } from "../utils/storage";
import { SubjectProvider } from "../features/subjects/SubjectContext";
import SubjectStatsPage from "../pages/SubjectStatsPage";
import { Analytics } from "@vercel/analytics/react"



import {
    pomodoroReducer,
    createInitialState,
} from "../reducer/pomodoroReducer";

import { usePomodoroEngine } from "../hooks/usePomodoroEngine";
import type { PomodoroSettings } from "../types";

import { PomodoroContext } from "../context/PomodoroContext";


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

    const [sessions, setSessions] = useState<PomodoroSession[]>(() =>
        loadSessions()
    );

    usePomodoroEngine(state.running, dispatch);

    // 🔔 Completion (ONE effect)
    const prevSecondsLeftRef = useRef<number>(state.secondsLeft);

    useEffect(() => {
        // Update ref to track previous value
        const prevSeconds = prevSecondsLeftRef.current;
        prevSecondsLeftRef.current = state.secondsLeft;

        // Only trigger completion if:
        // 1. secondsLeft is 0
        // 2. It was previously > 0 (meaning it just reached 0, not already 0)
        if (state.secondsLeft !== 0 || prevSeconds === 0) {
            return;
        }

        // 🔔 feedback
        initAudio(); // Ensure AudioContext is initialized and resumed
        playBeepSafe(state.soundEnabled, state.volume, 660).catch(() => {
            // Silently fail if audio can't play (e.g., browser autoplay restrictions)
        });

        if (Notification.permission === "granted") {
            new Notification("Session complete", {
                body: state.mode === "focus" ? "Time for a break" : "Back to focus",
            });
        }


        const newSession: PomodoroSession = {
            type: state.mode,
            duration:
                state.mode === "focus"
                    ? state.settings.focusMinutes
                    : state.mode === "shortBreak"
                        ? state.settings.shortBreakMinutes
                        : state.settings.longBreakMinutes,
            startedAtIST: startTimeRef.current,
            completedAtIST: getISTTime(),
            subjectId: null,
        };

        setSessions((prev) => [...prev, newSession]);
        saveSession(newSession);

        // 🔁 transition (NOT stop)
        dispatch({ type: "COMPLETE" });

        // If auto-start is enabled, update startTimeRef for the new session
        if (state.autoStartNext) {
            startTimeRef.current = getISTTime();
        } else {
            startTimeRef.current = "";
        }
    }, [state.secondsLeft, state.mode, state.settings, state.soundEnabled, state.volume, state.autoStartNext, dispatch]);

    // 🔔 Ask notification permission
    useEffect(() => {
        if ("Notification" in window) {
            Notification.requestPermission();
        }
    }, []);

    // 🌗 Dark mode
    useEffect(() => {
        document.documentElement.dataset.theme = state.darkMode ? "dark" : "light";
    }, [state.darkMode]);

    // 👀 Pause on tab blur
    useEffect(() => {
        const onVisibility = () => {
            if (document.hidden) dispatch({ type: "PAUSE" });
        };
        document.addEventListener("visibilitychange", onVisibility);
        return () => document.removeEventListener("visibilitychange", onVisibility);
    }, []);

    // ⌨️ Keyboard shortcuts
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement) return;

            if (e.code === "Space") {
                e.preventDefault();
                dispatch({ type: state.running ? "PAUSE" : "START" });
            }
            if (e.key === "r") {
                dispatch({ type: "RESET" });
                dispatch({ type: "APPLY_PENDING_SETTINGS" }); // 👈 HERE
            }

            if (e.key === "s") dispatch({ type: "SKIP" });
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [state.running]);

    function start() {
        initAudio();
        startTimeRef.current = getISTTime();
        dispatch({ type: "START" });
    }

    return (
        <PomodoroContext.Provider
            value={{
                state,
                dispatch,
                start,
                sessions,
                setSessions,
            }}
        >
            <SubjectProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<TimerPage />} />
                        <Route path="/stats" element={<StatsPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/subjects" element={<SubjectStatsPage />} />
                    </Route>
                </Routes>
                <Analytics/>
                <SpeedInsights />
            </SubjectProvider>
        </PomodoroContext.Provider>
    );
}