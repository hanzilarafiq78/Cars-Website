import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { vehicles } from '../data/vehicles';

/**
 * HeroSection — Grand Opening featuring all three cars.
 *
 * Sits directly above the scroll-scrubbed 3-car finale video background.
 * - Center-aligned editorial typography with dynamic staggered reveal animation
 * - 3-Vehicle quick-switch selector
 * - Animated scroll indicator
 */
export function HeroSection({ onNavigate }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        '.hero-title',
        { opacity: 0, y: 35, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out' }
      )
      .fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 25, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(
        '.hero-cta-button',
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power2.out' },
        '-=0.6'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero hero-centered" id="hero-section">
      <div className="hero-content hero-content-center">
        <h1 className="hero-title">
          THE ART OF <span className="serif-accent">PERFORMANCE.</span>
        </h1>
        <p className="hero-subtitle">
          Engineered without compromise. Experience three distinct philosophies of power, craft, and intelligence.
        </p>

        {/* View More Button (Clean Minimalist Text Style) */}
        <button
          className="hero-cta-button"
          onClick={() => onNavigate && onNavigate('x1')}
          id="hero-view-more"
        >
          <span>VIEW MORE</span>
        </button>
      </div>
    </section>
  );
}



