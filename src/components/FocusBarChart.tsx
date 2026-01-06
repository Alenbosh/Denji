import { BarChart, Bar, XAxis, Tooltip } from "recharts";
import type { PomodoroSession } from "../types";

export function FocusBarChart({ sessions }: { sessions: PomodoroSession[] }) {
  const data = Object.values(
    sessions.reduce((acc, s) => {
      const day = new Date(s.completedAtIST).toLocaleDateString();
      acc[day] ??= { day, minutes: 0 };
      acc[day].minutes += s.duration;
      return acc;
    }, {} as Record<string, { day: string; minutes: number }>)
  );

  return (
    <div className="card">
      <h3>Daily Focus</h3>
      <BarChart width={350} height={200} data={data}>
        <XAxis dataKey="day" hide />
        <Tooltip />
        <Bar dataKey="minutes" fill="#ff6b6b" />
      </BarChart>
    </div>
  );
}
