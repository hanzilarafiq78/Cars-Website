import React from 'react';

/**
 * SpecificationSection — Viewport-filling editorial numbers with animated reveal.
 * Layout: Car Centered behind large numbers.
 */
export function SpecificationSection({ vehicle }) {
  const specs = vehicle.specs;

  return (
    <div className="specs-sequence-container" data-section="specifications">
      {specs.map((spec, i) => (
        <div key={i} className="spec-fullscreen">

          <div className="spec-number" data-target={spec.number}>
            {spec.decimals
              ? spec.number.toFixed(spec.decimals)
              : spec.number}
          </div>
          <div className="spec-unit">{spec.unit}</div>
          <div className="spec-description">{spec.description}</div>
        </div>
      ))}
    </div>
  );
}

