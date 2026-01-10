import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function MyComplaints() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/complaints/mine");
        setItems(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load complaints");
      }
    };
    load();
  }, []);

  return (
    <section className="dashboard-section scroll-section visible">
      <h2 className="dashboard-title">My Complaints</h2>
     

      {items.length === 0 ? (
        <p style={{ marginTop: "20px", color: "#555", fontSize: "14px" }}>
          You haven&apos;t submitted any complaints yet.
        </p>
      ) : (
        <div className="complaints-list">
          {items.map((c) => (
            <Link
              key={c.id}
              to={`/citizen/complaints/${c.id}`}
              className="complaint-item"
            >
              <div>
                <div className="complaint-title">
                  #{c.id} • {c.title}
                </div>
                <div className="complaint-meta">
                  Category: {c.category || "N/A"}
                </div>
              </div>

              <span className={`status-pill s-${c.status}`}>
                {c.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
