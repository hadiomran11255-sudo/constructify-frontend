import {
  ArrowUpRight,
  Building2,
  HardHat,
  Ruler,
  ShieldCheck,
} from 'lucide-react';
import { PhotoSpace, SectionHeading } from './Shared.jsx';
export default function Services({ data = {}, items = [] }) {
  const icons = [Building2, HardHat, Ruler, ShieldCheck];
  return (
    <section className="services section" id="services">
      <div className="container">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          text={data.description}
        />
        <div className="services-layout">
          {data.image_url ? (
            <img
              className="service-feature-photo"
              src={data.image_url}
              alt="Services"
            />
          ) : (
            <PhotoSpace className="service-feature-photo" />
          )}
          <div className="service-cards">
            {items.map((item, i) => {
              const Icon = icons[i % icons.length];
              return (
                <article className="service-card" key={item.id || i}>
                  <span className="service-icon">
                    <Icon size={21} />
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <a
                      href="#contact"
                      aria-label={`Learn more about ${item.title}`}
                    >
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                  <span className="service-number">0{i + 1}</span>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
