import React, { useState, useEffect, useCallback } from 'react';

/**
 * Fixed minimalist navigation.
 * Centered links: SUPERCAR / LUXURY / SUV
 * Scrolled: translucent black backdrop blur
 * Mobile: hamburger → full-screen overlay
 */
export function Navigation({ activeChapter, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: 'x1', label: 'SUPERCAR' },
    { id: 's7', label: 'LUXURY' },
    { id: 'r1', label: 'SUV' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = useCallback((id) => {
    setMenuOpen(false);
    if (onNavigate) onNavigate(id);
  }, [onNavigate]);

  return (
    <>
      <nav className={`nav nav-centered${scrolled ? ' scrolled' : ''}`} id="nav-main">
        {/* Centered Desktop links */}
        <ul className="nav-links">
          {links.map((link) => (
            <li
              key={link.id}
              className={`nav-link${activeChapter === link.id ? ' active' : ''}`}
              onClick={() => handleNav(link.id)}
              id={`nav-${link.id}`}
            >
              {link.label}
            </li>
          ))}
        </ul>

        {/* Hamburger for mobile */}
        <div
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          id="nav-hamburger"
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map((link) => (
          <div
            key={link.id}
            className={`mobile-menu-link${activeChapter === link.id ? ' active' : ''}`}
            onClick={() => handleNav(link.id)}
          >
            {link.label}
          </div>
        ))}
      </div>
    </>
  );
}

