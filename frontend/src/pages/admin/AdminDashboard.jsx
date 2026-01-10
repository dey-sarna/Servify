import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function AdminDashboard() {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/admin/overview");
        setOverview(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load admin overview");
      }
    };
    load();
  }, []);

  return (
    <section className="dashboard-section scroll-section visible">

      <div className="dash-actions">
        <Link to="/admin/complaints" className="dash-btn primary">
          Manage Complaints
        </Link>
        <Link to="/admin/users" className="dash-btn outline">
          Manage Users
        </Link>
      </div>

      {!overview ? (
        <p style={{ marginTop: "20px", color: "#555", fontSize: "14px" }}>
          Loading overview...
        </p>
      ) : (
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-label">Total Complaints</div>
            <div className="summary-value">{overview.totalComplaints}</div>
          </div>

          <div className="summary-card">
            <div className="summary-label">Pending</div>
            <div className="summary-value pending">{overview.pending}</div>
          </div>

          <div className="summary-card">
            <div className="summary-label">Resolved</div>
            <div className="summary-value resolved">{overview.resolved}</div>
          </div>

          <div className="summary-card">
            <div className="summary-label">Users</div>
            <div className="summary-value">
              {overview.totalCitizens + overview.totalStaff}
            </div>
            <p className="summary-hint">
              Citizens: {overview.totalCitizens} • Staff: {overview.totalStaff}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
