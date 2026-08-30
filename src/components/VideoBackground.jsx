import React, { useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { continuousVideos, heroImages } from '../data/videoAssets';

gsap.registerPlugin(ScrollTrigger);

/**
 * VideoBackground — Natural scroll-scrubbed cinematic layer.
 * 
 * 1. ONE continuous video per chapter (supercar, luxury, suv).
 * 2. Videos are absolutely positioned layers.
 * 3. Opacity crossfades are triggered by activeChapter.
 * 4. Playhead (currentTime) is directly mapped to the user's scroll position via scrub: 1.
 */
export function VideoBackground({ activeChapter, isLoaded }) {
  const videoRefs = {
    hero: useRef(null),
    x1: useRef(null),
    s7: useRef(null),
    r1: useRef(null),
    finale: useRef(null),
  };

  // Determine poster image
  const posterSrc = useMemo(() => {
    if (activeChapter === 'hero' || activeChapter === 'finale') return heroImages.finale;
    return heroImages[activeChapter] || heroImages.x1;
  }, [activeChapter]);

  // Handle cinematic crossfades when active chapter changes
  useEffect(() => {
    Object.entries(videoRefs).forEach(([key, ref]) => {
      const vid = ref.current;
      if (!vid) return;

      if (key === activeChapter) {
        // Bring to front, scale to normal, fade in
        vid.style.zIndex = '3';
        gsap.to(vid, {
          opacity: 1,
          scale: 1,
          filter: 'brightness(1)',
          duration: 1.5,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        // Push back, subtle scale up, fade into darkness
        vid.style.zIndex = '1';
        gsap.to(vid, {
          opacity: 0,
          scale: 1.05,
          filter: 'brightness(0.2)',
          duration: 1.5,
          ease: 'power2.inOut',
          overwrite: 'auto'
        });
      }
    });
  }, [activeChapter]);

  // Setup Scroll-Scrubbing for all videos
  useEffect(() => {
    const ctx = gsap.context(() => {
      const chapters = ['hero', 'x1', 's7', 'r1', 'finale'];

      chapters.forEach(ch => {
        const triggerId = ch === 'hero' ? '#hero-section' :
                          ch === 'finale' ? '#final-section' :
                          `#chapter-${ch}`;
        
        const vid = videoRefs[ch]?.current;
        if (!vid) return;

        ScrollTrigger.create({
          trigger: triggerId,
          start: 'top bottom', // Start scrubbing when section enters from bottom
          end: 'bottom top',   // End scrubbing when section leaves from top
          scrub: 1,            // Smooth interpolation
          onUpdate: (self) => {
            if (vid.readyState >= 2 && vid.duration) {
              // Directly scrub the video timeline
              gsap.to(vid, {
                currentTime: self.progress * vid.duration,
                duration: 0.2, // Small smoothing window
                ease: 'none',
                overwrite: 'auto'
              });
            }
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={`video-background ${isLoaded ? 'visible' : ''}`}>
      {/* Poster image fallback */}
      <div
        className="video-bg-poster"
        style={{ backgroundImage: `url(${posterSrc})` }}
      />

      {/* Layered Videos */}
      {Object.entries(continuousVideos).map(([ch, url]) => (
        <video
          key={ch}
          ref={videoRefs[ch]}
          className="video-layer"
          src={url}
          muted
          playsInline
          preload="auto"
        />
      ))}

      {/* Cinematic contrast gradients (Rendered ON TOP of video layers) */}
      <div className="video-bg-gradient-bottom" />
      <div className="video-bg-gradient-top" />
      <div className="video-bg-gradient-left" />
      <div className="video-bg-gradient-right" />
      <div className="video-bg-vignette" />
    </div>
  );
}
