import type { PomodoroSession } from "../types";
import type { Subject } from "../features/subjects/model/Subject";

/**
 * Subject-wise focus totals (in minutes)
 * Counts ONLY focus sessions with a subjectId
 */
export function getSubjectTotals(
  sessions: PomodoroSession[],
  subjects: Subject[]
) {
  const totals = new Map<string, number>();

  for (const s of sessions) {
    if (s.type !== "focus") continue;
    if (!s.subjectId) continue;

    totals.set(
      s.subjectId,
      (totals.get(s.subjectId) ?? 0) + s.duration
    );
  }

  return subjects
    .map((subject) => ({
      subject,
      minutes: totals.get(subject.id) ?? 0,
    }))
    .filter((row) => row.minutes > 0);
}


// Pomodoro related stats and workings

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isThisWeek(date: Date) {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  return date >= startOfWeek;
}

export function getSummary(sessions: PomodoroSession[]) {
  const now = new Date();

  const today = sessions.filter((s) =>
    isSameDay(new Date(s.completedAtIST), now)
  );

  const week = sessions.filter((s) =>
    isThisWeek(new Date(s.completedAtIST))
  );

  return {
    todayMinutes: today.reduce((a, s) => a + s.duration, 0),
    weekMinutes: week.reduce((a, s) => a + s.duration, 0),
    totalMinutes: sessions.reduce((a, s) => a + s.duration, 0),
  };
}

// ------------------------------
// Subject time buckets
// ------------------------------

function startOfWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun
  const diff = day === 0 ? -6 : 1 - day; // Monday start
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getSubjectTimeBuckets(
  sessions: PomodoroSession[],
  subjects: Subject[]
) {
  const now = new Date();
  const weekStart = startOfWeek(now);

  return subjects.map((subject) => {
    let todayMinutes = 0;
    let weekMinutes = 0;
    let totalMinutes = 0;

    for (const s of sessions) {
      if (s.type !== "focus") continue;
      if (s.subjectId !== subject.id) continue;

      const completed = new Date(s.completedAtIST);
      totalMinutes += s.duration;

      if (isSameDay(completed, now)) {
        todayMinutes += s.duration;
      }

      if (completed >= weekStart) {
        weekMinutes += s.duration;
      }
    }

    return {
      subject,
      todayMinutes,
      weekMinutes,
      totalMinutes,
    };
  });
}
