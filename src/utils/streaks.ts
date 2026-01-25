import type { PomodoroSession } from "../types";

function dayKey(date: Date) {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

export function computeSubjectStreak(
  subjectId: string,
  sessions: PomodoroSession[]
): number {
  const focusDays = new Set<string>();

  for (const s of sessions) {
    if (s.type !== "focus") continue;
    if (s.subjectId !== subjectId) continue;

    const day = dayKey(new Date(s.completedAtIST));
    focusDays.add(day);
  }

  let streak = 0;
  const cursor = new Date();

  while (true) {
    const key = dayKey(cursor);
    if (!focusDays.has(key)) break;

    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}
