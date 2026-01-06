import type { PomodoroSession } from "../types";

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function startOfWeek(d: Date) {
  const s = startOfDay(d);
  s.setDate(s.getDate() - s.getDay());
  return s;
}

export function computeAggregates(sessions: PomodoroSession[]) {
  const now = new Date();
  const todayStart = startOfDay(now);
  const weekStart = startOfWeek(now);

  let today = 0;
  let week = 0;
  let total = 0;

  for (const s of sessions) {
    const completed = new Date(s.completedAtIST);
    total += s.duration;

    if (completed >= todayStart) {
      today += s.duration;
    }
    if (completed >= weekStart) {
      week += s.duration;
    }
  }

  return { today, week, total };
}
