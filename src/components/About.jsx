import {
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Users,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { PhotoSpace } from './Shared.jsx';
export default function About({ data = {} }) {
  const features = [
    [
      CheckCircle2,
      'Licensed & Insured',
      'Peace of mind from planning to handover.',
    ],
    [
      Clock3,
      'On-Time Delivery',
      'Clear timelines and reliable project management.',
    ],
    [
      ShieldCheck,
      'Expert Workmanship',
      'Quality materials and attention to every detail.',
    ],
    [
      Users,
      'Award Winning Team',
      'Professionals working together for better results.',
    ],
  ];
  return (
    <section className="about section" id="about">
      <div className="container about-grid">
        <div className="about-visual">
          {data.image_url ? (
            <img
              className="about-photo-main"
              src={data.image_url}
              alt="About us"
            />
          ) : (
            <PhotoSpace className="about-photo-main" />
          )}
          {data.image_url_2 ? (
            <img
              className="about-photo-small"
              src={data.image_url_2}
              alt="Our work"
            />
          ) : (
            <PhotoSpace className="about-photo-small" />
          )}
          <div className="experience-badge">
            <strong>
              25<span>+</span>
            </strong>
            <small>
              Years of
              <br />
              Excellence
            </small>
          </div>
        </div>
        <div className="about-copy">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2>{data.title}</h2>
          <p className="muted">{data.description}</p>
          <div className="feature-list">
            {features.map(([Icon, title, desc]) => (
              <div className="feature" key={title}>
                <span className="feature-icon">
                  <Icon />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="about-actions">
            <a className="btn btn-orange" href="#contact">
              Start Your Project <ArrowRight size={15} />
            </a>
            <a className="text-link" href="#team">
              View Our Work <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
