export default function HowItWorks() {
  return (
    <section className="how" style={{ paddingTop: 60 }}>
      <h2>How It Works</h2>
      <div className="steps">
        <div className="step">
          <span>1</span>
          <h4>Register / Login</h4>
          <p>Sign up and access your personalized dashboard.</p>
        </div>
        <div className="step">
          <span>2</span>
          <h4>Submit Complaint</h4>
          <p>Describe issue, attach image and select department.</p>
        </div>
        <div className="step">
          <span>3</span>
          <h4>Track Progress</h4>
          <p>Receive real-time updates until your issue is resolved.</p>
        </div>
      </div>
    </section>
  );
}
