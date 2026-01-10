import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";  

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "citizen",
  });

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    try {
     
      await api.post("/auth/register", form);

      alert("Registration successful! Please login to continue.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card scroll-section visible">
        <h2>Register</h2>
        <p>Create your account and start reporting issues.</p>

        <form onSubmit={submit}>
          <input
            name="name"
            value={form.name}
            onChange={handle}
            placeholder="Name"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handle}
            type="email"
            placeholder="Email"
            required
          />
          <input
            name="address"
            value={form.address}
            onChange={handle}
            placeholder="Address"
          />
          <input
            name="password"
            value={form.password}
            onChange={handle}
            type="password"
            placeholder="Password"
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handle}
          >
            <option value="citizen">Citizen</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
