import { ArrowUpRight } from 'lucide-react';

export default function CTA() {
  return (
    <>
      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <span className="eyebrow">HAVE A PROJECT IN MIND?</span>
            <h2>Let's Build Something Great Together.</h2>
            <p>
              Tell us what you're planning. We'll help you take the next step.
            </p>
          </div>
          <a href="#contact" className="btn btn-white">
            Request a Free Estimate <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
