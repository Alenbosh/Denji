export function StatsSummary({
  aggregates,
}: {
  aggregates: { today: number; week: number; total: number };
}) {
  return (
    <div className="stats-summary">
      <div className="card stat-card">
        <h3>Today</h3>
        <p>{aggregates.today} min</p>
      </div>
      <div className="card stat-card">
        <h3>This Week</h3>
        <p>{aggregates.week} min</p>
      </div>
      <div className="card stat-card">
        <h3>Total</h3>
        <p>{aggregates.total} min</p>
      </div>
    </div>
  );
}

