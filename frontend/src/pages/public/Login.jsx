import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext"; 

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const user = await login(form);

      if (user.role === "citizen") {
        navigate("/citizen/dashboard");
      } else if (user.role === "staff") {
        navigate("/staff/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card scroll-section visible">
        <h2>Login</h2>
        <p>Access your dashboard based on your role.</p>

        <form onSubmit={submit}>
          <input
            name="email"
            value={form.email}
            onChange={handle}
            type="email"
            placeholder="Email"
            required
          />
          <input
            name="password"
            value={form.password}
            onChange={handle}
            type="password"
            placeholder="Password"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
