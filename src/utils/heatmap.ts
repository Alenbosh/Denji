import type { PomodoroSession } from "../types";

export function buildHeatmap(sessions: PomodoroSession[]) {
  const map: Record<string, number> = {};

  for (const s of sessions) {
    if (s.type !== "focus") continue;

    const d = new Date(s.completedAtIST)
      .toISOString()
      .slice(0, 10);

    map[d] = (map[d] || 0) + s.duration;
  }

  return map;
}
