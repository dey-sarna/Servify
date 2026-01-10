import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function CitizenDashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/complaints/citizen/summary");
        setSummary(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load dashboard");
      }
    };
    load();
  }, []);

  return (
    <section className="dashboard-section scroll-section visible">
      

      {/* Top actions */}
      <div className="dash-actions">
        <Link to="/citizen/new-complaint" className="dash-btn primary">
          + New Complaint
        </Link>
        <Link to="/citizen/my-complaints" className="dash-btn outline">
          View My Complaints
        </Link>
      </div>

      {/* Summary cards */}
      {!summary ? (
        <p style={{ marginTop: "20px", color: "#555", fontSize: "14px" }}>
          Loading your dashboard...
        </p>
      ) : (
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-label">Total Complaints</div>
            <div className="summary-value">{summary.total}</div>
            <p className="summary-hint">All complaints submitted by you.</p>
          </div>

          <div className="summary-card">
            <div className="summary-label">Pending</div>
            <div className="summary-value pending">{summary.pending}</div>
            <p className="summary-hint">Waiting to be assigned or reviewed.</p>
          </div>

          <div className="summary-card">
            <div className="summary-label">In Progress</div>
            <div className="summary-value progress">{summary.inProgress}</div>
            <p className="summary-hint">Currently being worked on.</p>
          </div>

          <div className="summary-card">
            <div className="summary-label">Resolved</div>
            <div className="summary-value resolved">{summary.resolved}</div>
            <p className="summary-hint">Successfully closed issues.</p>
          </div>
        </div>
      )}

    </section>
  );
}
