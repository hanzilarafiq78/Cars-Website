import { useState, useEffect } from 'react';

/**
 * Track overall scroll progress as a normalized 0–1 value.
 * Also exposes raw scrollY and document height.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollY(y);
      setProgress(maxScroll > 0 ? Math.min(y / maxScroll, 1) : 0);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return { progress, scrollY };
}
