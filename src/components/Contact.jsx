import { useState } from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost/constructify-api/api/contact.php';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: '', message: '' });
    setIsSubmitting(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || 'Your inquiry could not be sent. Please try again.'
        );
      }

      setStatus({
        type: 'success',
        message:
          result.message || 'Thanks! Your inquiry was sent successfully.',
      });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error.message ||
          'Could not connect to the backend. Check that WampServer and the PHP API are running.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="contact section" id="contact">
      <div className="container contact-grid">
        <div>
          <span className="eyebrow">GET IN TOUCH</span>
          <h2>
            Let's Talk About
            <br />
            Your Next Project
          </h2>
          <p className="muted">
            Have a question or ready to get started? Our team is here to help
            you move forward.
          </p>
          <div className="contact-detail">
            <span>
              <Phone />
            </span>
            <div>
              <small>Call Us</small>
              <strong>+1 (555) 123-4567</strong>
            </div>
          </div>
          <div className="contact-detail">
            <span>
              <Mail />
            </span>
            <div>
              <small>Email Us</small>
              <strong>info@constructify.com</strong>
            </div>
          </div>
          <div className="contact-detail">
            <span>
              <MapPin />
            </span>
            <div>
              <small>Visit Us</small>
              <strong>123 Builder Avenue, Your City</strong>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Request a Free Estimate</h3>
          <p>Share a few details and we'll be in touch.</p>

          {status.message && (
            <div
              className={`form-status ${status.type}`}
              role="status"
              aria-live="polite"
            >
              {status.message}
            </div>
          )}

          <div className="form-row">
            <label>
              Your Name
              <input
                name="name"
                value={form.name}
                onChange={updateField}
                required
                maxLength="120"
                autoComplete="name"
                placeholder="Full name"
              />
            </label>
            <label>
              Email Address
              <input
                name="email"
                value={form.email}
                onChange={updateField}
                required
                type="email"
                maxLength="190"
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Phone Number
              <input
                name="phone"
                value={form.phone}
                onChange={updateField}
                maxLength="40"
                autoComplete="tel"
                placeholder="Your phone number"
              />
            </label>
            <label>
              Project Type
              <select
                name="projectType"
                value={form.projectType}
                onChange={updateField}
                required
              >
                <option value="" disabled>
                  Select project type
                </option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Renovation">Renovation</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
          <label>
            Tell Us About Your Project
            <textarea
              name="message"
              value={form.message}
              onChange={updateField}
              rows="4"
              maxLength="5000"
              placeholder="A few details about your project..."
            />
          </label>
          <button
            className="btn btn-orange"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Inquiry'}{' '}
            <ArrowRight size={15} />
          </button>
        </form>
      </div>
    </section>
  );
}
