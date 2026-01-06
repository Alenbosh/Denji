import { buildHeatmap } from "../utils/heatmap";
import type { PomodoroSession } from "../types";

export function Heatmap({ sessions }: { sessions: PomodoroSession[] }) {
  const data = buildHeatmap(sessions);
  const days = Object.keys(data).sort();
  const max = Math.max(...Object.values(data), 1);

  return (
    <div className="card heatmap">
      <h3>Focus Heatmap</h3>

      <div className="heatmap-grid">
        {days.map((day) => {
          const intensity = data[day] / max;

          return (
            <div
              key={day}
              className="heatmap-cell"
              style={{
                opacity: 0.2 + intensity * 0.8,
              }}
              title={`${day}: ${data[day]} min`}
            />
          );
        })}
      </div>
    </div>
  );
}
