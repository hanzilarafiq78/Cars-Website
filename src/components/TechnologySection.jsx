import React from 'react';

/**
 * TechnologySection — Exploded view assembly, electronic architecture, and powertrain tech.
 * Layout: Car Left, Text Right.
 */
export function TechnologySection({ vehicle, layout = 'right' }) {
  const tech = vehicle.technology;


  return (
    <div className={`section-wrapper layout-${layout}`} data-section="technology">
      <div className="section-content">

        <h2 className="section-headline">
          {tech.headline.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </h2>


        {/* Feature Cards Grid */}
        <div className="tech-features">
          {tech.features.map((feature, i) => (
            <div key={i} className="tech-feature">
              <div className="tech-feature-header">
                <span className="tech-feature-index">MOD // 0{i + 1}</span>
                <span className="tech-feature-label">{feature.label}</span>
              </div>
              <div className="tech-feature-name">{feature.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

