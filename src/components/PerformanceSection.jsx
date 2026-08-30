import React from 'react';

/**
 * PerformanceSection — Detailed powertrain, chassis, and speed metrics.
 * Layout: Car Left (55-60%), Text Right.
 */
export function PerformanceSection({ vehicle, layout = 'right' }) {
  const stats = vehicle.performance;
  const statEntries = Object.values(stats);

  const narrativeByVehicle = {
    x1: 'A bespoke 4.0L twin-turbocharged hybrid V8 delivering 612 HP directly to an intelligent all-wheel-drive system. Housed within an ultra-lightweight carbon monocoque chassis, every kilowatt is converted into instantaneous, forward momentum.',
    s7: 'Dual ultra-dense electric motors generating 580 horsepower in whisper-quiet harmony. Tuned for effortless continental touring with 720 km of verified electric range and instant multi-link torque vectoring.',
    r1: 'Dual-boosted hybrid powertrain producing 800 Nm of relentless low-end torque. Designed to conquer extreme gradients and high-speed highway cruising with equal poise and unwavering stability.',
  };

  return (
    <div className={`section-wrapper layout-${layout}`} data-section="performance">
      <div className="section-content perf-content">

        <h2 className="section-headline">
          {vehicle.headline.map((line, i) => (
            <div key={i}>
              {line.split(' ').map((word, j) => (
                <React.Fragment key={j}>
                  {j > 0 && ' '}
                  {word === vehicle.editorialWord ? (
                    <span className="serif-accent">{word}</span>
                  ) : word}
                </React.Fragment>
              ))}
            </div>
          ))}
        </h2>

        <p className="section-body">
          {narrativeByVehicle[vehicle.id] || 'Engineered without compromise to redefine the boundaries of automotive performance.'}
        </p>

      </div>
    </div>
  );
}

