import type { PomodoroSession } from "../types";
import type { Subject } from "../features/subjects/model/Subject";

export function computeSubjectTotals(
  sessions: PomodoroSession[],
  subjects: Subject[]
) {
  const map: Record<string, number> = {};

  for (const s of sessions) {
    if (!s.subjectId) continue;
    map[s.subjectId] = (map[s.subjectId] ?? 0) + s.duration;
  }

  return subjects.map((subject) => ({
    subject,
    minutes: map[subject.id] ?? 0,
  }));
}
