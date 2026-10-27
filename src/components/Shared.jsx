import React from 'react';

export function PhotoSpace({ className = '' }) {
  return (
    <div
      className={`photo-space ${className}`}
      aria-label="Photo placeholder"
    />
  );
}

export function SectionHeading({ eyebrow, title, text, light = false }) {
  return (
    <div className={`section-heading ${light ? 'light' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      <span className="heading-line" />
      {text && <p>{text}</p>}
    </div>
  );
}
