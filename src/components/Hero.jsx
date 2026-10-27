import { ArrowRight, ArrowUpRight } from 'lucide-react';
export default function Hero({ data = {} }) {
  const stats = [1, 2, 3, 4];
  return (
    <section
      className="hero"
      id="home"
      style={
        data.image_url
          ? {
              backgroundImage: `linear-gradient(rgba(12,28,55,.70),rgba(12,28,55,.70)),url(${data.image_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }
    >
      <div className="hero-shade" />
      <div className="container hero-content">
        <span className="pill">
          <span className="pill-dot" />
          {data.eyebrow}
        </span>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <div className="hero-actions">
          <a className="btn btn-orange" href="#projects">
            {data.button1}
            <ArrowRight size={15} />
          </a>
          <a className="btn btn-outline" href="#contact">
            {data.button2}
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
      <div className="container hero-stats">
        {stats.map(n => (
          <div key={n}>
            <strong>{data['counter' + n]}</strong>
            <small>{data['label' + n]}</small>
          </div>
        ))}
      </div>
      <a href="#about" className="scroll-cue">
        SCROLL TO EXPLORE <span />
      </a>
    </section>
  );
}
