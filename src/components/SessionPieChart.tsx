import { PieChart, Pie, Cell } from "recharts";
import type { PomodoroSession } from "../types";

const COLORS = {
  focus: "#ff6b6b",
  shortBreak: "#4ade80",
  longBreak: "#60a5fa",
};

export function SessionPieChart({
  sessions,
}: {
  sessions: PomodoroSession[];
}) {
  const data = Object.entries(
    sessions.reduce((acc, s) => {
      acc[s.type] = (acc[s.type] || 0) + s.duration;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="card">
      <h3>Session Split</h3>
      <PieChart width={300} height={200}>
        <Pie data={data} dataKey="value" outerRadius={80}>
          {data.map((d) => (
            <Cell key={d.name} fill={COLORS[d.name as keyof typeof COLORS]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
