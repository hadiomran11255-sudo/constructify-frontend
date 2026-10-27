import React, { useState } from 'react';
import { Menu, X, Phone, Mail, ArrowUpRight, Building2 } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <>
      <div className="topline">
        <div className="container top-inner">
          <span>
            <Mail size={13} /> info@constructify.com
          </span>
          <span>
            <Phone size={13} /> +1 (555) 123-4567
          </span>
          <span className="top-note">Building trust. Creating tomorrow.</span>
        </div>
      </div>
      <header className="header">
        <div className="container nav-wrap">
          <a className="brand" href="#home" onClick={closeMenu}>
            <span className="brand-mark">
              <Building2 size={21} />
            </span>
            <span>
              Constructify<small>BUILDING EXCELLENCE</small>
            </span>
          </a>
          <button
            className="mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
            {[
              ['Home', '#home'],
              ['About', '#about'],
              ['Services', '#services'],
              ['Projects', '#projects'],
              ['Team', '#team'],
              ['Pages', '#contact'],
              ['Contact', '#contact'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={closeMenu}
                className={label === 'Home' ? 'active' : ''}
              >
                {label}
                {label === 'Pages' && <span className="tiny-chevron">⌄</span>}
              </a>
            ))}
            <a className="nav-phone" href="tel:+15551234567">
              <Phone size={13} /> +1 (555) 123-4567
            </a>
            <a className="btn btn-orange nav-cta" href="#contact">
              Get Estimate <ArrowUpRight size={14} />
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
