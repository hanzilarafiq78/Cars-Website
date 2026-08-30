import React from 'react';

/**
 * 1px vertical scroll progress line on the right edge.
 */
export function ScrollProgress({ progress }) {
  return (
    <div className="scroll-progress" id="scroll-progress">
      <div
        className="scroll-progress-fill"
        style={{ height: `${progress * 100}%` }}
      />
    </div>
  );
}
