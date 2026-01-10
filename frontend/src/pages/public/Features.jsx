export default function Features() {
  return (
    <section className="features" style={{ paddingTop: 60 }}>
      <h2>Key Features</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <img src="https://cdn-icons-png.flaticon.com/512/1055/1055646.png" alt="Citizen" />
          <h3>Citizen Dashboard</h3>
          <p>Submit and track your complaints easily with real-time updates</p>
        </div>
        <div className="feature-card">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Admin" />
          <h3>Admin Panel</h3>
          <p>Monitor performance, assign cases and manage all users.</p>
        </div>
        <div className="feature-card">
          <img src="https://cdn-icons-png.flaticon.com/512/1256/1256650.png" alt="Dept" />
          <h3>Department Portal</h3>
          <p>Respond faster with case prioritization and progress tracking tools.</p>
        </div>
      </div>
    </section>
  );
}
