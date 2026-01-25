import { useMemo } from "react";
import { usePomodoro } from "../context/PomodoroContext";
import { useSubjects } from "../features/subjects/SubjectContext";
import { getSubjectTotals } from "../utils/stats";
import { computeSubjectStreak } from "../utils/streaks";

function formatMinutes(mins: number) {
  if (mins === 0) return "—";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function SubjectSummaryCards() {
  const { sessions } = usePomodoro();
  const { subjects } = useSubjects();

  const rows = useMemo(
    () => getSubjectTotals(sessions, subjects),
    [sessions, subjects]
  );

  if (rows.length === 0) {
    return (
      <div className="card">
        <p style={{ opacity: 0.6 }}>
          No subject-linked focus sessions yet.
        </p>
      </div>
    );
  }

  return (
    <div className="subject-cards">
      {rows.map(({ subject, minutes }) => {
        const streak = computeSubjectStreak(subject.id, sessions);

        return (
          <div key={subject.id} className="card subject-card">
            <div className="subject-card-header">
              <span
                className="subject-dot"
                style={{ backgroundColor: subject.color }}
              />
              <span className="subject-name">{subject.name}</span>
            </div>

            <div className="subject-card-metrics">
              <span className="subject-time">
                {formatMinutes(minutes)}
              </span>

              {streak > 0 && (
                <span className="subject-streak">🔥 {streak}d</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
