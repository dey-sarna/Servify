export default function Contact() {
  return (
    <section className="contact" style={{ paddingTop: 60 }}>
      <h2>Contact Us</h2>
      <p>We’d love to hear from you! Share your feedback or queries below.</p>
      <form>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}
