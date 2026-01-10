import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardLayout() {
  return (
    <div className="landing-container">
      <Navbar />
      <div style={{ padding: "30px 80px" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
