import React from 'react';

/**
 * DesignSection — Editorial craftsmanship, aerodynamic surfacing, and material details.
 * Layout: Car Right, Text Left.
 */
export function DesignSection({ vehicle, layout = 'left' }) {
  const design = vehicle.design;

  const designStories = {
    x1: 'Every intake, vent, and negative surface on the X1 serves a thermodynamic or aerodynamic imperative. Air flows through front wing ducts, over carbon ceramic brakes, and exits through the active rear diffuser generating 480 kg of downforce at track speeds.',
    s7: 'Rooted in sculptural minimalism, the S7 presents an unbroken shoulder line that stretches from headlight to taillight. Acoustic laminated glass and hand-finished cabin surfaces create an oasis of tranquility at any velocity.',
    r1: 'A commanding stance sculpted with purposeful muscularity. Reinforced rocker panels and high-approach geometric angles meet precision LED light blades that cast a razor-sharp beam 600 meters down unlit mountain passes.',
  };

  const renderHeadline = (words, editorialWord) => {
    return words.map((line, i) => (
      <div key={i}>
        {line.split(' ').map((word, j) => (
          <React.Fragment key={j}>
            {j > 0 && ' '}
            {word === editorialWord ? (
              <span className="serif-accent">{word}</span>
            ) : word}
          </React.Fragment>
        ))}
      </div>
    ));
  };

  return (
    <div className={`section-wrapper layout-${layout}`} data-section="design">
      <div className="section-content">

        <div className="design-text-group">
          <h2 className="section-headline">
            {renderHeadline(design.headline, design.editorialWord)}
          </h2>
        </div>

        <p className="section-body">
          {designStories[vehicle.id] || 'Sculpted with ruthless precision to balance aerodynamic efficiency with timeless aesthetic poise.'}
        </p>



        {/* Craftsmanship Elements */}
        <div className="design-details-grid">
          {design.details.map((detail, i) => (
            <div key={i} className="design-detail">
              <div className="design-detail-dot" />
              <div className="design-detail-content">
                <span className="design-detail-index">0{i + 1}</span>
                <span className="design-detail-text">{detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

