import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { PhotoSpace, SectionHeading } from './Shared.jsx';
export default function Projects({
  data = {},
  items = [],
  activeFilter,
  setActiveFilter,
}) {
  const filtered =
    activeFilter === 'All Projects'
      ? items
      : items.filter(p => p.category === activeFilter);
  const filters = [
    'All Projects',
    ...new Set(items.map(p => p.category).filter(Boolean)),
  ];
  return (
    <section className="projects section" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          text={data.description}
        />
        <div className="project-filters">
          {filters.map(filter => (
            <button
              key={filter}
              className={activeFilter === filter ? 'selected' : ''}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="project-grid">
          {filtered.map((project, i) => (
            <article className="project-card" key={project.id || i}>
              {project.image_url ? (
                <img
                  className="project-photo"
                  src={project.image_url}
                  alt={project.title}
                />
              ) : (
                <PhotoSpace className="project-photo" />
              )}
              <div className="project-overlay">
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <a
                className="project-arrow"
                href="#contact"
                aria-label={`Ask about ${project.title}`}
              >
                <ArrowUpRight size={17} />
              </a>
            </article>
          ))}
        </div>
        <div className="center">
          <a href="#contact" className="btn btn-orange">
            View All Projects <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
