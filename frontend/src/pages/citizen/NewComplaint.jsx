import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function NewComplaint() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "road",
    location_text: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/complaints", form);
      alert("Complaint submitted successfully.");
      navigate("/citizen/my-complaints");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit complaint");
    }
  };

  return (
    <section className="dashboard-section scroll-section visible">
      <p className="dashboard-subtitle">
        Please fill in the details below to submit a new complaint.
      </p>

      <div className="complaint-form-wrap">
        <form className="complaint-form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Short title of your complaint"
              required
            />
          </div>

          <div className="field">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe the issue in detail"
              required
            />
          </div>

          <div className="field">
            <label>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="road">Road</option>
              <option value="water">Water</option>
              <option value="light">Street Light</option>
              <option value="water_supply">Water Supply</option>
              <option value="waste_management">Waste Management</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="field">
            <label>Location</label>
            <input
              name="location_text"
              value={form.location_text}
              onChange={handleChange}
              placeholder="Area / street / landmark"
              required
            />
          </div>

          <button type="submit" className="btn-primary full">
            Submit Complaint
          </button>
        </form>
      </div>
    </section>
  );
}
