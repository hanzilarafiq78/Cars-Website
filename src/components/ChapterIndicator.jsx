import React from 'react';

/**
 * Pinned Sidebar Chapter Indicator.
 * Displays interactive timeline dots for Hero (00), X1 (01), S7 (02), R1 (03), Finale (04).
 */
export function ChapterIndicator({ activeChapter, visible, onNavigate }) {
  const chapters = [
    { id: 'hero', number: '00', label: 'TRILOGY' },
    { id: 'x1', number: '01', label: 'SUPERCAR' },
    { id: 's7', number: '02', label: 'LUXURY' },
    { id: 'r1', number: '03', label: 'SUV' },
    { id: 'finale', number: '04', label: 'FINALE' },
  ];

  return (
    <aside className={`chapter-indicator${visible ? ' visible' : ''}`} id="chapter-indicator" aria-label="Chapter navigation">
      <div className="chapter-indicator-line" />
      {chapters.map((ch) => {
        const isActive = activeChapter === ch.id;
        return (
          <div
            key={ch.id}
            className={`chapter-dot${isActive ? ' active' : ''}`}
            onClick={() => onNavigate && onNavigate(ch.id)}
            id={`indicator-${ch.id}`}
            title={`${ch.number} ${ch.label}`}
          >
            <div className="chapter-dot-circle" />
            <span className="chapter-dot-label">
              <span className="chapter-dot-num">{ch.number}</span> {ch.label}
            </span>
          </div>
        );
      })}
    </aside>
  );
}

