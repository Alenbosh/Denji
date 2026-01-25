import { SubjectSummaryCards } from "../components/Subject-Dashboard/SubjectSummaryCards";
export default function SubjectDashboardPage() {
  return (
    <section className="page subject-dashboard">
      <h1 className="page-title">Subjects</h1>

      {/* =========================
          Summary cards
         ========================= */}
      <section className="dashboard-section">
        <h2 className="dashboard-title">Overview</h2>
        <div className="card">
          <p style={{ opacity: 0.6 }}>
            <SubjectSummaryCards />
          </p>
        </div>
      </section>

      {/* =========================
          Trends
         ========================= */}
      <section className="dashboard-section">
        <h2 className="dashboard-title">Focus Trends</h2>
        <div className="card">
          <p style={{ opacity: 0.6 }}>
            Subject trends will appear here.
          </p>
        </div>
      </section>

      {/* =========================
          Heatmap
         ========================= */}
      <section className="dashboard-section">
        <h2 className="dashboard-title">Consistency</h2>
        <div className="card">
          <p style={{ opacity: 0.6 }}>
            Heatmap visualization coming soon.
          </p>
        </div>
      </section>

      {/* =========================
          Subject list / drill-down
         ========================= */}
      <section className="dashboard-section">
        <h2 className="dashboard-title">Subjects</h2>
        <div className="card">
          <p style={{ opacity: 0.6 }}>
            Subject list & drill-down controls coming next.
          </p>
        </div>
      </section>
    </section>
  );
}
