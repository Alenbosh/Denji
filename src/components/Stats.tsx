import type { PomodoroSession } from "../types";

interface Props {
  sessions: PomodoroSession[];
}

export function Stats({ sessions }: Props) {
  if (sessions.length === 0) {
    return <p>No sessions yet.</p>;
  }

  return (
    <ul>
      {sessions.map((s, i) => (
        <li key={i}>
          {s.type} — {s.duration} min
        </li>
      ))}
    </ul>
  );
}
