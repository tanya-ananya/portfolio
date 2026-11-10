import { useId, useRef, useState } from 'react';

const JOURNEY = [
  {
    id: 'ht',
    period: 'Summer 2026',
    role: 'AI/ML Intern',
    org: 'Honeywell Technologies',
    tags: ['AI/ML', 'Data Analysis', 'SQL', 'Product Management', 'Data Visualization', 'UI/UX'],
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
    id: 'amzn',
    period: 'Winter 2024',
    role: 'UI/UX Design Program',
    org: 'Amazon (w/ CodePath)',
    tags: ['Figma', 'User research', 'UI/UX', 'customer reserach', 'project planning', 'multi-device design', 'customer testing'],
  },
  {
    id: 'jpmc',
    period: 'Fall 2024',
    role: 'Technology Career.edYOU Scholar',
    org: 'JP Morgan & Chase',
    tags: ['Corporate Practices', 'Collaboration', 'Programming', 'Large Applications', 'Large Database'],
  },
  {
    id: 'ah',
    period: 'Fall 2024',
    role: 'Technology Apprentice',
    org: 'athenahealth (w/ Girls Who Code)',
    tags: ['Figma', 'Project Planning', 'Interviews', 'UI/UX'],
  },
  {
    id: 'hl',
    period: 'Summer 2024',
    role: 'Software Engineer Intern',
    org: 'Holistic Learning',
    tags: ['JavaScript', 'Bootstrap', 'AI-assisted Programming', 'Figma'],
  },
  {
    id: 'gwc',
    period: 'Summer 2022 & 2023',
    role: 'Software Engineering Summer Program',
    org: 'Girls Who Code',
    tags: ['JavaScript', 'Python', 'Cryptography'],
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
        <h3 className="journey__title">My Journey</h3>
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