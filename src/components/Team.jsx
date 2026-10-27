import { Plus } from 'lucide-react';
import { PhotoSpace, SectionHeading } from './Shared.jsx';
import { team } from './data.js';

export default function Team() {
  return (
    <>
      <section className="team section" id="team">
        <div className="container">
          <SectionHeading
            eyebrow="MEET THE PEOPLE BEHIND THE WORK"
            title="Our Expert Team"
            text="Experienced people, shared standards, and a commitment to doing things right."
          />
          <div className="team-grid">
            {team.map((person, i) => (
              <article className="team-card" key={person.name}>
                <PhotoSpace className="team-photo" />
                <div className="team-info">
                  <div>
                    <h3>{person.name}</h3>
                    <p>{person.role}</p>
                  </div>
                  <span className="team-plus">
                    <Plus size={17} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
