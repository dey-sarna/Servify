import { Link } from "react-router-dom";

export default function StaffDashboard() {
  return (
    <section className="dashboard-section scroll-section visible">
      <div className="dash-actions">
        <Link to="/staff/assigned" className="dash-btn primary">
          View Assigned Complaints
        </Link>
      </div>

    </section>
  );
}

