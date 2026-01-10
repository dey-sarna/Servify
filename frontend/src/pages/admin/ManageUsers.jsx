import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load users");
      }
    };
    load();
  }, []);

  return (
    <section className="dashboard-section scroll-section visible">
      <h2 className="dashboard-title">Manage Users</h2>

      {users.length === 0 ? (
        <p style={{ marginTop: "20px", color: "#555", fontSize: "14px" }}>
          No users found.
        </p>
      ) : (
        <div className="user-list">
          {users.map((u) => (
            <div key={u.id} className="user-item">
              <div>
                <div className="complaint-title">
                  #{u.id} • {u.name}
                </div>
                <div className="complaint-meta">{u.email}</div>
              </div>
              <span className="role-pill-small">{u.role}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
