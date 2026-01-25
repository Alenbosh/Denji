import { useMemo } from "react";
import { usePomodoro } from "../context/PomodoroContext";
import { useSubjects } from "../features/subjects/SubjectContext";
import { getSubjectTimeBuckets } from "../utils/stats";
import { computeSubjectStreak } from "../utils/streaks";

function format(mins: number) {
  if (mins === 0) return "—";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function SubjectStatsSummary() {
  const { sessions } = usePomodoro();
  const { subjects } = useSubjects();

  const rows = useMemo(
    () => getSubjectTimeBuckets(sessions, subjects),
    [sessions, subjects]
  );

  if (subjects.length === 0) {
    return (
      <div className="card">
        <p style={{ opacity: 0.6 }}>No subjects created yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Subject Focus</h2>

      <table className="subject-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Today</th>
            <th>Week</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(({ subject, todayMinutes, weekMinutes, totalMinutes }) => {
            const streak = computeSubjectStreak(subject.id, sessions); // 👈 HERE

            return (
              <tr key={subject.id}>
                <td className="subject-cell">
                  <span
                    className="subject-dot"
                    style={{ backgroundColor: subject.color }}
                  />
                  {subject.name}

                  {streak > 0 && (
                    <span className="subject-streak">🔥 {streak}d</span>
                  )}
                </td>

                <td>{format(todayMinutes)}</td>
                <td>{format(weekMinutes)}</td>
                <td>{format(totalMinutes)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
