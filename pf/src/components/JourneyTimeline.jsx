import { useId, useRef, useState } from 'react';

const JOURNEY = [
  {
    id: 'ht',
    period: 'Summer 2026',
    role: 'AI/ML Intern',
    org: 'Honeywell Technologies',
    tags: ['AI/ML', 'Data Analysis', 'Product Management', 'UI/UX'],
  },
  {
    id: 'comcast',
    period: 'Fall 2025',
    role: 'First Tech Conference',
    org: 'NBCUniversal, Comcast, & Xfinity',
    tags: ['Product Planning', 'UI/UX', 'AI/ML'],
  },
  {
    id: 'thd',
    period: 'Summer 2025',
    role: 'SWE - Android Engineer',
    org: 'The Home Depot',
    tags: ['Android', 'Kotlin', 'JetPack Compose', 'XML', 'OpenAI API'],
  },
  {
    id: 'uiux',
    period: '20XX',
    role: 'UI/UX Design Program',
    org: '[Company]',
    tags: ['Figma', 'User research'],
  },
  {
    id: 'android',
    period: '20XX',
    role: 'Android Engineering Intern',
    org: '[Company]',
    tags: ['Kotlin', 'Android'],
  },
  {
    id: 'aiml',
    period: '20XX',
    role: 'AI/ML Intern',
    org: '[Company]',
    tags: ['Python', 'ML'],
  },
];

export default function JourneyTimeline({ items = JOURNEY }) {
  const [openId, setOpenId] = useState(null);
  const scroller = useRef(null);
  const uid = useId();

  // behavior follows the CSS scroll-behavior, so reduced-motion is respected
  const nudge = (dir) => scroller.current?.scrollBy({ left: dir * 320 });

  return (
    <div className="journey">
      <div className="journey__header">
        <h3 className="journey__title">My journey</h3>
        <div className="journey__arrows">
          <button
            type="button"
            className="journey__arrow"
            aria-label="Scroll timeline left"
            onClick={() => nudge(-1)}
          >
            ←
          </button>
          <button
            type="button"
            className="journey__arrow"
            aria-label="Scroll timeline right"
            onClick={() => nudge(1)}
          >
            →
          </button>
        </div>
      </div>

      <div className="journey__scroller" ref={scroller}>
        <ol className="journey__list">
          {items.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${uid}-${item.id}`;

            return (
              <li key={item.id} className={`journey__item${isOpen ? ' is-open' : ''}`}>
                <span className="journey__dot" aria-hidden="true" />
                <span className="journey__period">{item.period}</span>

                <div className="journey__card">
                  <button
                    type="button"
                    className="journey__toggle"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    <span className="journey__text">
                      <span className="journey__role">{item.role}</span>
                      <span className="journey__org">{item.org}</span>
                    </span>
                    <span className="journey__chevron" aria-hidden="true" />
                  </button>

                  <div id={panelId} className="journey__panel">
                    <div className="journey__panel-inner">
                      <div className="journey__content">
                        <ul className="journey__tags">
                          {item.tags.map((t, i) => (
                            <li key={`${t}-${i}`} className="journey__tag">{t}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}