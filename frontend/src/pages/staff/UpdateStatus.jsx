import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../api/axios";

export default function UpdateStatus() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [form, setForm] = useState({
    new_status: "in_progress",
    note: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/complaints/${id}`);
        setComplaint(res.data.complaint);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load complaint");
      }
    };
    load();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/complaints/${id}/status`, form);
      alert("Status updated.");
      navigate("/staff/assigned");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <section className="dashboard-section scroll-section visible">
      <p className="dashboard-subtitle">
        Change the status and add a helpful note for the citizen.
      </p>

      <div className="dash-actions">
        <Link to="/staff/assigned" className="dash-btn outline">
          ← Back to Assigned List
        </Link>
      </div>

      {complaint && (
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

          <p className="detail-description">{complaint.description}</p>
        </div>
      )}

      <div className="complaint-form-wrap" style={{ marginTop: 20 }}>
        <form className="complaint-form" onSubmit={handleSubmit}>
          <div className="field">
            <label>New Status</label>
            <select
              name="new_status"
              value={form.new_status}
              onChange={handleChange}
            >
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="field">
            <label>Note</label>
            <textarea
              name="note"
              rows="3"
              value={form.note}
              onChange={handleChange}
              placeholder="Write a short note for this update (optional)"
            />
          </div>

          <button type="submit" className="btn-primary full">
            Save Update
          </button>
        </form>
      </div>
    </section>
  );
}
