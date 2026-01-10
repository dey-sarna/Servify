import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [filters, setFilters] = useState({ status: "", category: "" });
  const [assign, setAssign] = useState({ complaintId: null, staff_id: "" });

  const loadComplaints = async () => {
    const params = {};
    if (filters.status) params.status = filters.status;
    if (filters.category) params.category = filters.category;

    const res = await api.get("/admin/complaints", { params });
    setComplaints(res.data);
  };

  const loadStaff = async () => {
    const res = await api.get("/admin/users");
    setStaffList(res.data.filter((u) => u.role === "staff"));
  };

  useEffect(() => {
    const load = async () => {
      try {
        await loadStaff();
        await loadComplaints();
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load admin data");
      }
    };
    load();

  }, []);

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const applyFilter = async () => {
    try {
      await loadComplaints();
    } catch (err) {
      alert(err.response?.data?.message || "Filter failed");
    }
  };

  const openAssign = (complaintId) => {
    setAssign({ complaintId, staff_id: "" });
  };

  const doAssign = async () => {
    if (!assign.staff_id) return alert("Select a staff first");
    try {
      await api.patch(`/admin/complaints/${assign.complaintId}/assign`, {
        staff_id: Number(assign.staff_id),
      });
      alert("Assigned");
      setAssign({ complaintId: null, staff_id: "" });
      await loadComplaints();
    } catch (err) {
      alert(err.response?.data?.message || "Assign failed");
    }
  };

  return (
    <section className="dashboard-section scroll-section visible">
      <h2 className="dashboard-title">Manage Complaints</h2>

      {/* Filters */}
      <div className="filter-row">
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option value="">All Category</option>
          <option value="road">Road</option>
          <option value="water">Water</option>
          <option value="light">Street Light</option>
          <option value="water_supply">Water Supply</option>
          <option value="waste_management">Waste Management</option>
          <option value="other">Other</option>
        </select>

        <button className="dash-btn primary" onClick={applyFilter}>
          Apply
        </button>
      </div>

      {/* List */}
      {complaints.length === 0 ? (
        <p style={{ marginTop: "20px", color: "#555", fontSize: "14px" }}>
          No complaints found.
        </p>
      ) : (
        <div className="complaints-list">
          {complaints.map((c) => (
            <div key={c.id} className="complaint-item">
              <div>
                <div className="complaint-title">
                  #{c.id} • {c.title}
                </div>
                <div className="complaint-meta">
                  Citizen: {c.citizen_name || "N/A"} • Category:{" "}
                  {c.category || "N/A"}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                <span className={`status-pill s-${c.status}`}>
                  {c.status}
                </span>
                <button
                  className="dash-btn outline"
                  style={{ fontSize: 11 }}
                  onClick={() => openAssign(c.id)}
                >
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Assign panel */}
      {assign.complaintId && (
        <div className="assign-panel">
          <h3>Assign Complaint #{assign.complaintId}</h3>

          <select
            value={assign.staff_id}
            onChange={(e) =>
              setAssign({ ...assign, staff_id: e.target.value })
            }
          >
            <option value="">Select staff</option>
            {staffList.map((s) => (
              <option key={s.id} value={s.id}>
                #{s.id} - {s.name} ({s.email})
              </option>
            ))}
          </select>

          <div className="assign-actions">
            <button className="dash-btn primary" onClick={doAssign}>
              Confirm Assign
            </button>
            <button
              className="dash-btn outline"
              onClick={() => setAssign({ complaintId: null, staff_id: "" })}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
