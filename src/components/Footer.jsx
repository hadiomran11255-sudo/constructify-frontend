import { Phone, Mail, MapPin, Plus, Building2 } from 'lucide-react';

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <a className="brand" href="#home">
              <span className="brand-mark">
                <Building2 size={21} />
              </span>
              <span>
                Constructify<small>BUILDING EXCELLENCE</small>
              </span>
            </a>
            <p>
              Building with purpose. Creating spaces that stand the test of
              time.
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <a href="#about">About Us</a>
            <a href="#services">Our Services</a>
            <a href="#projects">Our Projects</a>
            <a href="#team">Our Team</a>
          </div>
          <div>
            <h4>Our Services</h4>
            <a href="#services">Residential Building</a>
            <a href="#services">Commercial Projects</a>
            <a href="#services">Renovation</a>
            <a href="#services">Infrastructure</a>
          </div>
          <div>
            <h4>Contact Info</h4>
            <p>
              <Phone size={14} /> +1 (555) 123-4567
            </p>
            <p>
              <Mail size={14} /> info@constructify.com
            </p>
            <p>
              <MapPin size={14} /> 123 Builder Avenue
            </p>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Constructify. All rights reserved.</span>
          <span>Built with care, made to last.</span>
          <a href="#home" className="back-top">
            Back to top ↑
          </a>
        </div>
      </footer>
      <a href="#contact" className="floating-contact" aria-label="Contact us">
        <Plus size={20} />
      </a>
    </>
  );
}
