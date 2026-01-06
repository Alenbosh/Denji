import { usePomodoro } from "../context/PomodoroContext";
import { StatsSummary } from "../components/StatsSummary";
import { StatsTimeline } from "../components/StatsTimeline";
import { FocusBarChart } from "../components/FocusBarChart";
import { SessionPieChart } from "../components/SessionPieChart";
import { clearSessions } from "../utils/storage";
import { useMemo } from "react";
import { computeAggregates } from "../utils/aggregates";
import {Heatmap} from "../components/HeatMap"


export default function StatsPage() {
  const { sessions, setSessions } = usePomodoro();
  const aggregates = useMemo(() => computeAggregates(sessions), [sessions]);

  return (
    <section className="page">
      <h1 className="page-title">Stats</h1>

      <StatsSummary aggregates={aggregates} />

      <div className="stats-grid">
        <StatsTimeline sessions={sessions} />

        <div className="stats-charts">
          <FocusBarChart sessions={sessions} />
          <SessionPieChart sessions={sessions} />
          <Heatmap sessions={sessions} />

        </div>
      </div>

      <button
        className="danger-btn"
        onClick={() => {
          if (confirm("Clear all session history?")) {
            clearSessions();
            setSessions([]);
          }
        }}
      >
        Reset stats
      </button>
    </section>
  );
}
