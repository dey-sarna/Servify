import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  
  const getDashboardPath = () => {
    if (!user) return "/";
    if (user.role === "citizen") return "/citizen/dashboard";
    if (user.role === "staff") return "/staff/dashboard";
    if (user.role === "admin") return "/admin/dashboard";
    return "/";
  };

  return (
    <nav className="navbar">
      <div className="logo">Servify</div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/features">Features</Link>
        </li>
        <li>
          <Link to="/how-it-works">How It Works</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register" className="btn">
                Register
              </Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <Link to={getDashboardPath()} className="btn">
                Dashboard
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="nav-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
