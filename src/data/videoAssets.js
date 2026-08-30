/* ==========================================================================
   VANTA — Video & Image Asset Configuration
   Maps each chapter to its continuous cinematic video asset.
   All paths reference files in public/ served by Vite at root.
   ========================================================================== */

export const heroImages = {
  x1: '/images/x1-hero.jpeg',
  s7: '/images/s7-hero.jpeg',
  r1: '/images/r1-hero.jpeg',
  finale: '/images/finale.jpeg',
};

/**
 * Continuous cinematic videos for each chapter.
 */
export const continuousVideos = {
  hero: '/videos/finale.mp4',    // using finale as the opening loop placeholder
  x1: '/videos/supercar.mp4',
  s7: '/videos/luxury.mp4',
  r1: '/videos/suv.mp4',
  finale: '/videos/finale.mp4'
};

/**
 * Returns all video URLs for preloading.
 */
export function getAllVideoUrls() {
  return Object.values(continuousVideos);
}

/**
 * Returns all image URLs for preloading.
 */
export function getAllImageUrls() {
  return Object.values(heroImages);
}
