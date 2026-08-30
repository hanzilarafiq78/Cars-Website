import React, { useState, useEffect } from 'react';

/**
 * Cinematic loading screen.
 * Shows VANTA wordmark with a thin loading bar.
 * Fades out when loaded prop becomes true.
 */
export function LoadingScreen({ loaded }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loaded) {
      setProgress(100);
      return;
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [loaded]);

  return (
    <div className={`loading-screen${loaded ? ' loaded' : ''}`} id="loading-screen">
      <div className="loading-logo">VANTA</div>
      <div className="loading-bar-track">
        <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="loading-percent">{Math.round(progress)}%</div>
    </div>
  );
}
