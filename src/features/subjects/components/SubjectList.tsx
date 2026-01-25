import { useSubjects } from "../SubjectContext";
import { usePomodoro } from "../../../context/PomodoroContext";

export function SubjectList() {
  const { subjects, activeSubjectId, setActiveSubject } = useSubjects();
  const { state } = usePomodoro();

  if (subjects.length === 0) {
    return <p className="muted">No subjects yet</p>;
  }

  return (
    <div className="subject-list">
      <button
        disabled={state.running}
        className={!activeSubjectId ? "active" : ""}
        onClick={() => setActiveSubject(null)}
      >
        No Subject
      </button>
      {subjects.map((s) => (
        <button
          key={s.id}
          className={`subject-chip ${activeSubjectId === s.id ? "active" : ""}`}
          onClick={() =>
            setActiveSubject(activeSubjectId === s.id ? null : s.id)
          }
        >
          {s.name}
        </button>
      ))}
    </div>
  );
}
