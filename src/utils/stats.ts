import type { PomodoroSession } from "../types";

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
