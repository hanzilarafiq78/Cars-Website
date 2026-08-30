import React, { useState, useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { VideoBackground } from './components/VideoBackground';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { VehicleChapter } from './components/VehicleChapter';
import { ScrollProgress } from './components/ScrollProgress';
import { LoadingScreen } from './components/LoadingScreen';
import { useScrollProgress } from './hooks/useScrollProgress';
import { vehicles } from './data/vehicles';
import { SCROLL_CONFIG } from './config/scrollSettings';

gsap.registerPlugin(ScrollTrigger);

/**
 * VANTA — Root Application (Unpinned Natural Scrolling)
 *
 * Continuous cinematic journey with:
 * 1. Opening 3-Car Showcase Hero
 * 2. 01 / SUPERCAR (VANTA X1)
 * 3. 02 / LUXURY   (VANTA S7)
 * 4. 03 / SUV      (VANTA R1)
 * 5. Minimalist Grand Finale Frame
 */
export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeChapter, setActiveChapter] = useState('hero');
  const { progress } = useScrollProgress();

  const lenisRef = useRef(null);
  const fadeDur = SCROLL_CONFIG.sectionFadeDuration || 1.0;

  // Initialize Lenis smooth scroll from SCROLL_CONFIG
  useEffect(() => {
    const lenis = new Lenis({
      duration: SCROLL_CONFIG.duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: SCROLL_CONFIG.wheelMultiplier,
      touchMultiplier: SCROLL_CONFIG.touchMultiplier,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Cinematic initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Navigation click handler with exact absolute coordinate calculation
  const handleNavigate = useCallback((id) => {
    if (id === 'top' || id === 'hero') {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { duration: 1.4 });
      }
      return;
    }

    const targetEl = document.getElementById(`chapter-${id}`);
    if (targetEl && lenisRef.current) {
      const topOffset = targetEl.getBoundingClientRect().top + window.scrollY;
      lenisRef.current.scrollTo(topOffset, { duration: 1.6 });
    }
  }, []);

  // Vehicle chapter scroll callback (kept for navigation sync, but simplified)
  const handleScrollUpdate = useCallback((state) => {
    // Just sync the active chapter if needed
  }, []);

  // Chapter and section detection for Navigation & Video Background
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // 1. Hero Section Scroll Fade-Out (Unpinned)
      ScrollTrigger.create({
        trigger: '#hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          // Smooth fade-out as user scrolls past hero
          gsap.to('.hero-content', {
            opacity: 1 - p * 1.5,
            y: -p * 80,
            filter: `blur(${p * 12}px)`,
            overwrite: 'auto',
            duration: 0.1,
          });
        },
        onEnter: () => setActiveChapter('hero'),
        onEnterBack: () => setActiveChapter('hero'),
        onLeave: () => setActiveChapter('x1'),
      });

      // 2. Track each vehicle chapter for navigation
      vehicles.forEach((v) => {
        ScrollTrigger.create({
          trigger: `#chapter-${v.id}`,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveChapter(v.id),
          onEnterBack: () => setActiveChapter(v.id),
        });
      });

      // 3. Finale Section (Unpinned)
      const finalSection = document.querySelector('.final-section');
      if (finalSection) {
        const finalContent = finalSection.querySelector('.final-content');
        if (finalContent) {
          gsap.set(finalContent, { opacity: 0, y: 40, filter: 'blur(8px)' });
        }

        const finalTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#final-section',
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 1,
            onUpdate: (self) => {
              if (self.progress > 0.15 && self.progress < 0.85) {
                setActiveChapter('finale');
              } else if (self.progress <= 0.15) {
                setActiveChapter('r1');
              }
            }
          },
        });

        finalTl.to(finalContent, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.15,
          ease: 'none',
        })
        .to(finalContent, { opacity: 1, duration: 0.70 })
        .to(finalContent, { opacity: 0, y: -40, filter: 'blur(8px)', duration: 0.15, ease: 'none' });
      }
    });

    return () => ctx.revert();
  }, [isLoaded, fadeDur]);

  return (
    <>
      {/* Cinematic Loading Screen */}
      <LoadingScreen loaded={isLoaded} />

      {/* Natural-Speed Video Background Layer */}
      <VideoBackground
        activeChapter={activeChapter}
        isLoaded={isLoaded}
      />

      {/* Minimalist Navigation */}
      <Navigation
        activeChapter={activeChapter}
        onNavigate={handleNavigate}
      />

      {/* 1px Vertical Scroll Progress */}
      <ScrollProgress progress={progress} />

      {/* Continuous Main Journey */}
      <main>
        {/* Grand 3-Car Showcase Opening Hero */}
        <HeroSection onNavigate={handleNavigate} />

        {/* 3 Dedicated Vehicle Chapters (Unpinned Natural Flow) */}
        {vehicles.map((vehicle, index) => (
          <VehicleChapter
            key={vehicle.id}
            vehicle={vehicle}
            vehicleIndex={index}
            onScrollUpdate={handleScrollUpdate}
            isFirst={index === 0}
          />
        ))}

        {/* Final Cinematic Frame */}
        <section className="final-section" id="final-section">
          <div className="final-content">
            <h2 className="final-brand">VANTA</h2>
            <div className="final-tagline">
              THREE MACHINES.<br />
              ONE <span className="serif-accent">VISION.</span>
            </div>
            <div className="final-credits">
              <span>VANTA AUTOMOTIVE &copy; 2026</span>
              <span className="credits-dot">&bull;</span>
              <span>ALL RIGHTS RESERVED</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
