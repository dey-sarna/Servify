import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function AssignedComplaints() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/complaints");
        setItems(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load assigned complaints");
      }
    };
    load();
  }, []);

  return (
    <section className="dashboard-section scroll-section visible">
      <h2 className="dashboard-title">Assigned Complaints</h2>

      {items.length === 0 ? (
        <p style={{ marginTop: "20px", color: "#555", fontSize: "14px" }}>
          No complaints assigned yet.
        </p>
      ) : (
        <div className="complaints-list">
          {items.map((c) => (
            <div key={c.id} className="complaint-item">
              <div>
                <div className="complaint-title">
                  #{c.id} • {c.title}
                </div>
                <div className="complaint-meta">
                  Citizen: {c.citizen_name || "N/A"} • Category: {c.category || "N/A"}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                <span className={`status-pill s-${c.status}`}>{c.status}</span>
                <Link to={`/staff/update/${c.id}`} className="dash-btn outline" style={{ fontSize: 11 }}>
                  Update
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
