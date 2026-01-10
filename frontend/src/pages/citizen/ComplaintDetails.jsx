import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";

export default function ComplaintDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/complaints/${id}`);
        setData(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load complaint details");
      }
    };
    load();
  }, [id]);

  if (!data) {
    return (
      <section className="dashboard-section">
        <p style={{ color: "#555", fontSize: "14px" }}>Loading details...</p>
      </section>
    );
  }

  const { complaint, updates } = data;

  return (
    <section className="dashboard-section scroll-section visible">
      <h2 className="dashboard-title">Complaint Details</h2>
      <p className="dashboard-subtitle">
        Full information and status history for complaint #{complaint.id}.
      </p>

      {/* Top actions */}
      <div className="dash-actions">
        <Link to="/citizen/my-complaints" className="dash-btn outline">
          ← Back to My Complaints
        </Link>
      </div>

      <div className="complaint-detail-card">
        <div className="detail-header">
          <div>
            <div className="complaint-title">
              #{complaint.id} • {complaint.title}
            </div>
            <div className="complaint-meta">
              Category: {complaint.category || "N/A"}
            </div>
          </div>

          <span className={`status-pill s-${complaint.status}`}>
            {complaint.status}
          </span>
        </div>

        <div className="detail-body">
          <p>
            <b>Location:</b> {complaint.location_text}
          </p>
          <p>
            <b>Description:</b>
          </p>
          <p className="detail-description">{complaint.description}</p>
        </div>
      </div>

      {/* Updates timeline */}
      <div className="updates-section">
        <h3>Status Updates</h3>

        {updates.length === 0 ? (
          <p className="no-updates">No updates added yet.</p>
        ) : (
          <div className="updates-list">
            {updates.map((u) => (
              <div key={u.id} className="update-item">
                <div className="update-badge">
                  {u.old_status} → {u.new_status}
                </div>
                {u.note && <div className="update-note">{u.note}</div>}
                <div className="update-time">
                  {new Date(u.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
