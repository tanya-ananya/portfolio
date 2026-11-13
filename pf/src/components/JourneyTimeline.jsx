/* import { useId, useRef, useState } from 'react';

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
// =======================================================================================================================

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
} */

import { useId, useRef, useState } from 'react';

const JOURNEY = [
  { id: 'webdev', period: '20XX', role: 'Web Development Intern', org: '[Company]', tags: ['React', 'JavaScript'] },
  { id: 'apprenticeship-1', period: '20XX', role: 'Technology Apprentice', org: '[Company]', tags: ['Skill'] },
  { id: 'android', period: '20XX', role: 'Android Engineering Intern', org: '[Company]', tags: ['Kotlin', 'Android'] },
  { id: 'aiml', period: '20XX', role: 'AI/ML Intern', org: '[Company]', tags: ['Python', 'ML'] },
];

// Bars above the cards. `from` and `to` are card ids; the bar spans from the first card to the last.
const DEV = [
  { id: 'dev-1', title: 'Certification or workshop title', from: 'webdev', to: 'apprenticeship-1' },
  { id: 'dev-2', title: 'Another course or training', from: 'android', to: 'aiml' },
];

const KEY = [
  { id: 'work', label: 'Experience & Development' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'dev', label: 'Professional development' },
];

export default function JourneyTimeline({ items = JOURNEY, dev = DEV }) {
  const [openId, setOpenId] = useState(null);
  const scroller = useRef(null);
  const uid = useId();

  const nudge = (dir) => scroller.current?.scrollBy({ left: dir * 320 });

  // card id -> column number (1-based)
  const col = (id) => items.findIndex((i) => i.id === id) + 1;

  return (
    <div className="journey">
      <div className="journey__header">
        <div className="journey__heading">
          <h3 className="journey__title">My Journey</h3>
          <ul className="journey__key" aria-label="Timeline key">
            {KEY.map((k) => (
              <li key={k.id} className="journey__key-item">
                <span className={`journey__key-dot journey__key-dot--${k.id}`} aria-hidden="true" />
                {k.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="journey__arrows">
          <button type="button" className="journey__arrow" aria-label="Scroll timeline left" onClick={() => nudge(-1)}>
            ←
          </button>
          <button type="button" className="journey__arrow" aria-label="Scroll timeline right" onClick={() => nudge(1)}>
            →
          </button>
        </div>
      </div>

      <div className="journey__scroller" ref={scroller}>
        <div className="journey__track">
          {/* 1. line, dots and years */}
          <ol className="journey__marks" aria-hidden="true">
            {items.map((item) => (
              <li
                key={item.id}
                className={`journey__mark${openId === item.id ? ' is-open' : ''}`}
              >
                <span className="journey__dot" />
                <span className="journey__period">{item.period}</span>
              </li>
            ))}
          </ol>

          {/* 2. professional development bars */}
          <div className="journey__dev-row">
            {dev.map((d) => {
              const start = col(d.from);
              const end = col(d.to);
              if (start < 1 || end < 1) return null;
              return (
                <div
                  key={d.id}
                  className="journey__dev"
                  style={{ gridColumn: `${Math.min(start, end)} / ${Math.max(start, end) + 1}` }}
                  title={d.title}
                >
                  {d.title}
                </div>
              );
            })}
          </div>

          {/* 3. cards */}
          <ol className="journey__list">
            {items.map((item) => {
              const isOpen = openId === item.id;
              const panelId = `${uid}-${item.id}`;

              return (
                <li key={item.id} className={`journey__item${isOpen ? ' is-open' : ''}`}>
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
    </div>
  );
}