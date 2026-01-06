import type { PomodoroSession } from "../types";

export function StatsTimeline({
  sessions,
}: {
  sessions: PomodoroSession[];
}) {
  if (sessions.length === 0) {
    return <p>No sessions yet.</p>;
  }

  return (
    <div className="card timeline">
      <h3>Timeline</h3>
      <ul>
        {[...sessions].reverse().map((s, i) => (
          <li key={i}>
            <strong>{s.type}</strong> · {s.duration} min
            <span>{new Date(s.completedAtIST).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
