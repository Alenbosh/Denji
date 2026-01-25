import { useRef } from "react";
import { getISTTime } from "../utils/time";
import { saveSession } from "../utils/storage";
import { useSubjects } from "../features/subjects/SubjectContext";
import type { PomodoroSession } from "../types";

export function useSessionRecorder() {
  const { activeSubjectId } = useSubjects();
  const startTimeRef = useRef<string>("");

  function markSessionStart() {
    startTimeRef.current = getISTTime();
  }

  function recordSession(
    type: PomodoroSession["type"],
    duration: number
  ): PomodoroSession {
    const session: PomodoroSession = {
      type,
      duration,
      startedAtIST: startTimeRef.current,
      completedAtIST: getISTTime(),
      subjectId: activeSubjectId ?? null,
    };

    saveSession(session);
    return session;
  }

  return {
    markSessionStart,
    recordSession,
  };
}
