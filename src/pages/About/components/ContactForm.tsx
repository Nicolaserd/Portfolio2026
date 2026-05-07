import './ContactForm.css';

export default function ContactForm() {
  return (
    <section className="contact-section">
      <div className="contact-card">
        <div className="contact-scanlines" />
        <h2 className="contact-title">
          <span className="material-symbols-outlined">terminal</span>
          INIT_CONEXION
        </h2>
        <form className="contact-form">
          <div className="contact-field">
            <label className="contact-label" htmlFor="name">User_Identity</label>
            <input className="contact-input" id="name" type="text" placeholder="Enter your designation" />
          </div>
          <div className="contact-field">
            <label className="contact-label" htmlFor="email">Transmission_Node</label>
            <input className="contact-input" id="email" type="email" placeholder="email@server.com" />
          </div>
          <div className="contact-field">
            <label className="contact-label" htmlFor="message">Payload_Data</label>
            <textarea className="contact-input contact-textarea" id="message" rows={4} placeholder="Input parameters here..." />
          </div>
          <button className="contact-submit" type="button">
            <span>EXECUTE</span>
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </div>
    </section>
  );
}
