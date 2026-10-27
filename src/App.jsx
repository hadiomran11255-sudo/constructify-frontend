import React, { useEffect, useState } from 'react';
import './styles.css';
import { api, defaults } from './content.js';
import {
  services as fallbackServices,
  projects as fallbackProjects,
} from './components/data.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Commitment from './components/Commitment.jsx';
import Projects from './components/Projects.jsx';
import Why from './components/Why.jsx';
import Team from './components/Team.jsx';
import CTA from './components/CTA.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Admin from './components/Admin.jsx';
export default function App() {
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [sections, setSections] = useState(defaults);
  const [items, setItems] = useState({ services: [], projects: [] });
  const [error, setError] = useState('');
  useEffect(() => {
    Promise.all([
      api('content'),
      api('items', { section: 'services' }),
      api('items', { section: 'projects' }),
    ])
      .then(([content, services, projects]) => {
        setSections(
          Object.fromEntries(
            Object.keys(defaults).map(k => [
              k,
              { ...defaults[k], ...(content.sections[k] || {}) },
            ])
          )
        );
        setItems({ services: services.items, projects: projects.items });
      })
      .catch(e => setError(e.message));
  }, []);
  if (window.location.pathname.replace(/\/$/, '') === '/admin')
    return <Admin />;
  return (
    <>
      <Header />
      {error && (
        <div className="api-warning">
          Portfolio API unavailable: {error}. Check backend installation.
        </div>
      )}
      <main>
        <Hero data={sections.hero} />
        <About data={sections.about} />
        <Services
          data={sections.services}
          items={
            items.services.length
              ? items.services
              : fallbackServices.map((x, i) => ({
                  id: i,
                  title: x.title,
                  description: x.desc,
                }))
          }
        />
        <Commitment />
        <Projects
          data={sections.projects}
          items={
            items.projects.length
              ? items.projects
              : fallbackProjects.map((x, i) => ({
                  id: i,
                  title: x.name,
                  description: x.note,
                  category: x.type,
                }))
          }
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <Why />
        <Team />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
