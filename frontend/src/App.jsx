import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Features from "./pages/public/Features";
import HowItWorks from "./pages/public/HowItWorks";
import Contact from "./pages/public/Contact";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

import ProtectedRoute from "./components/ProtectedRoute";

import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import NewComplaint from "./pages/citizen/NewComplaint";
import MyComplaints from "./pages/citizen/MyComplaints";
import ComplaintDetails from "./pages/citizen/ComplaintDetails";

import StaffDashboard from "./pages/staff/StaffDashboard";
import AssignedComplaints from "./pages/staff/AssignedComplaints";
import UpdateStatus from "./pages/staff/UpdateStatus";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminComplaints from "./pages/admin/AdminComplaints";
import ManageUsers from "./pages/admin/ManageUsers";

export default function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="features" element={<Features />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Protected dashboard pages */}
      <Route element={<DashboardLayout />}>
        {/* Citizen */}
        <Route
          path="citizen/dashboard"
          element={
            <ProtectedRoute allowedRoles={["citizen"]}>
              <CitizenDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="citizen/new-complaint"
          element={
            <ProtectedRoute allowedRoles={["citizen"]}>
              <NewComplaint />
            </ProtectedRoute>
          }
        />
        <Route
          path="citizen/my-complaints"
          element={
            <ProtectedRoute allowedRoles={["citizen"]}>
              <MyComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="citizen/complaints/:id"
          element={
            <ProtectedRoute allowedRoles={["citizen"]}>
              <ComplaintDetails />
            </ProtectedRoute>
          }
        />

        {/* Staff */}
        <Route
          path="staff/dashboard"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="staff/assigned"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <AssignedComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="staff/update/:id"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <UpdateStatus />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/complaints"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
