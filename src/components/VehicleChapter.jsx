import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PerformanceSection } from './PerformanceSection';
import { DesignSection } from './DesignSection';
import { TechnologySection } from './TechnologySection';
import { SpecificationSection } from './SpecificationSection';
import { SCROLL_CONFIG } from '../config/scrollSettings';

gsap.registerPlugin(ScrollTrigger);

/**
 * VehicleChapter — Natural unpinned scroll flow for ONE vehicle.
 *
 * Distinct Storytelling Beats:
 *   1. PERFORMANCE  (Car Left, Text Right) → 360° Turntable Rotation
 *   2. DESIGN       (Car Right, Text Left) → Close-Up Craftsmanship & Details
 *   3. TECHNOLOGY   (Car Left, Text Right) → Exploded Assembly / Tech Features
 *   4. SPECS        (Car Center)          → Giant Viewport-Filling Numbers
 *
 * Every section flows smoothly with 1s fade-in on enter and 1s fade-out on exit.
 */
export function VehicleChapter({ vehicle, vehicleIndex, onScrollUpdate }) {
  const chapterRef = useRef(null);
  const perfRef = useRef(null);
  const designRef = useRef(null);
  const techRef = useRef(null);
  const specRef = useRef(null);

  const fadeDur = SCROLL_CONFIG.sectionFadeDuration || 1.0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Helper to create smooth scroll-scrubbed entrance and exit reveals ---
      const createSceneTimeline = (sceneEl, phaseName) => {
        if (!sceneEl) return;
        const contentBox = sceneEl.querySelector('.section-content') || sceneEl;

        // Set initial state (invisible and shifted down)
        gsap.set(contentBox, { opacity: 0, y: 40, filter: 'blur(8px)' });

        // Create a single scrubbed timeline for the full lifecycle of the scene
        const sceneTl = gsap.timeline({
          scrollTrigger: {
            trigger: sceneEl,
            start: 'top 85%',   // Start fading in when top hits 85% of screen
            end: 'bottom 15%',  // Finish fading out when bottom hits 15% of screen
            scrub: 1,           // Silky smooth interpolation tied to scroll speed
            onUpdate: (self) => {
              // Update phase only when scene is clearly visible
              if (onScrollUpdate && self.progress > 0.15 && self.progress < 0.85) {
                onScrollUpdate({ vehicleIndex, phase: phaseName, phaseProgress: self.progress });
              }
            },
          },
        });

        // 15% Timeline: Fade In & Float Up
        sceneTl.to(contentBox, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.15,
          ease: 'none',
        })
        // 70% Timeline: Hold steady on screen
        .to(contentBox, {
          opacity: 1,
          y: 0,
          duration: 0.70,
        })
        // 15% Timeline: Fade Out & Float Up
        .to(contentBox, {
          opacity: 0,
          y: -40,
          filter: 'blur(8px)',
          duration: 0.15,
          ease: 'none',
        });
      };

      // 1. Performance Scene
      createSceneTimeline(perfRef.current, 'performance');

      // 2. Design Scene
      createSceneTimeline(designRef.current, 'design');

      // 3. Technology Scene
      createSceneTimeline(techRef.current, 'technology');

      // 4. Specifications Sequence
      if (specRef.current) {
        const specCards = specRef.current.querySelectorAll('.spec-fullscreen');
        const nums = specRef.current.querySelectorAll('.spec-number');

        gsap.set(specCards, { opacity: 0, y: 50, filter: 'blur(10px)' });

        const specTl = gsap.timeline({
          scrollTrigger: {
            trigger: specRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 1,
          },
        });
        
        specTl.to(specCards, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.15,
          stagger: 0.05,
          ease: 'none',
        })
        .to(specCards, { opacity: 1, duration: 0.60 })
        .to(specCards, { opacity: 0, y: -40, filter: 'blur(10px)', duration: 0.15, ease: 'none' });
        
        // Smooth scale scrub for the numbers
        gsap.timeline({
          scrollTrigger: { trigger: specRef.current, start: 'top 85%', end: 'bottom 15%', scrub: 1 }
        }).fromTo(nums, { scale: 0.85 }, { scale: 1.05, ease: 'none' });
      }

    }, chapterRef);

    return () => ctx.revert();
  }, [vehicle, vehicleIndex, onScrollUpdate, fadeDur]);

  return (
    <section
      ref={chapterRef}
      className="vehicle-chapter"
      id={`chapter-${vehicle.id}`}
      data-vehicle-id={vehicle.id}
    >
      {/* 1. Performance Scene — Car Left, Text Right */}
      <div ref={perfRef} className="chapter-scene scene-perf">
        <div className="scene-sticky-wrap">
          <PerformanceSection vehicle={vehicle} layout="right" />
        </div>
      </div>

      {/* 2. Design Scene — Car Right, Text Left */}
      <div ref={designRef} className="chapter-scene scene-design">
        <div className="scene-sticky-wrap">
          <DesignSection vehicle={vehicle} layout="left" />
        </div>
      </div>

      {/* 3. Technology Scene — Car Left, Text Right */}
      <div ref={techRef} className="chapter-scene scene-tech">
        <div className="scene-sticky-wrap">
          <TechnologySection vehicle={vehicle} layout="right" />
        </div>
      </div>

      {/* 4. Specifications Sequence — Car Center, Giant Numbers */}
      <div ref={specRef} className="chapter-scene scene-specs">
        <SpecificationSection vehicle={vehicle} />
      </div>
    </section>
  );
}
