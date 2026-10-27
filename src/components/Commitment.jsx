import {
  Building2,
  Users,
  HardHat,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

export default function Commitment() {
  return (
    <>
      <section className="commitment section">
        <div className="container commitment-grid">
          <div>
            <span className="eyebrow">OUR TRACK RECORD</span>
            <h2>
              Numbers That Speak for
              <br />
              Our Commitment
            </h2>
            <p className="muted">
              Every number represents a promise kept, a partnership built, and a
              project delivered with care.
            </p>
            <a className="text-link" href="#projects">
              View Our Projects <ArrowRight size={15} />
            </a>
          </div>
          <div className="metrics-grid">
            <div className="metric">
              <span className="metric-icon">
                <Building2 />
              </span>
              <strong>
                850<span>+</span>
              </strong>
              <small>Projects Delivered</small>
            </div>
            <div className="metric">
              <span className="metric-icon">
                <Users />
              </span>
              <strong>
                620<span>+</span>
              </strong>
              <small>Satisfied Clients</small>
            </div>
            <div className="metric">
              <span className="metric-icon">
                <HardHat />
              </span>
              <strong>
                120<span>+</span>
              </strong>
              <small>Expert Team Members</small>
            </div>
            <div className="metric">
              <span className="metric-icon">
                <ShieldCheck />
              </span>
              <strong>
                35<span>+</span>
              </strong>
              <small>Industry Awards</small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
