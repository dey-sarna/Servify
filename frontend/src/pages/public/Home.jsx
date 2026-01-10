import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll(".scroll-section");

    const revealSection = () => {
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 100) {
          section.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", revealSection);
    revealSection();

    return () => window.removeEventListener("scroll", revealSection);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section id="home" className="hero scroll-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Empowering Citizens. Improving Communities.</h1>
          <p>We connect your voice directly to the right authority.</p>
          <Link to="/login" className="btn">Get Started</Link>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about scroll-section">
        <h2>About Servify</h2>
        <p>
          Servify is an efficient Public Complaint Management System built to improve communication
          between citizens and authorities. It provides a structured and transparent way to submit,
          monitor, and resolve public complaints.
        </p>
        <img src="/About.jpg" alt="About" />
      </section>

      {/* Features */}
      <section id="features" className="features scroll-section">
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

      {/* How It Works */}
      <section id="how" className="how scroll-section">
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

      {/* Contact */}
      <section id="contact" className="contact scroll-section">
        <h2>Contact Us</h2>
        <p>We’d love to hear from you! Share your feedback or queries below.</p>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
}

export default Home;
