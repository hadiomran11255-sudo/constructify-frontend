import { CheckCircle2, ArrowRight } from 'lucide-react';
import { PhotoSpace } from './Shared.jsx';

export default function Why() {
  return (
    <>
      <section className="why section">
        <div className="container why-grid">
          <div className="why-copy">
            <span className="eyebrow">WHY CHOOSE US</span>
            <h2>
              Built on Trust.
              <br />
              Driven by Excellence.
            </h2>
            <p className="muted">
              We believe the best structures begin with strong relationships.
              Our collaborative approach keeps your vision, budget, and timeline
              at the center of every decision.
            </p>
            <div className="why-points">
              <p>
                <CheckCircle2 /> Transparent communication at every stage
              </p>
              <p>
                <CheckCircle2 /> Safety-first planning and execution
              </p>
              <p>
                <CheckCircle2 /> Lasting quality with no shortcuts
              </p>
            </div>
            <a className="btn btn-orange" href="#contact">
              Let's Build Together <ArrowRight size={15} />
            </a>
          </div>
          <PhotoSpace className="why-photo" />
        </div>
      </section>
    </>
  );
}
