import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About me' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
];

const IDS = SECTIONS.map((s) => s.id);

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const line = 140;

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1];

      setActive(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  return active;
}

export default function NavBar() {
  const active = useActiveSection(IDS);
  const listRef = useRef(null);
  const linkRefs = useRef({});
  const [pill, setPill] = useState({ x: 0, w: 0 });
  const [animate, setAnimate] = useState(false);

  // Measure the active pill and move the highlight to it
  useLayoutEffect(() => {
    const measure = () => {
      const el = linkRefs.current[active];
      const list = listRef.current;
      if (!el || !list) return;

      setPill({ x: el.offsetLeft, w: el.offsetWidth });

      // on narrow screens the pills scroll sideways: keep the active one in view
      if (list.scrollWidth > list.clientWidth) {
        list.scrollTo({
          left: el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2,
          behavior: 'smooth',
        });
      }
    };

    measure();
    window.addEventListener('resize', measure);
    // pill widths change once the web fonts finish loading
    document.fonts?.ready.then(measure);

    return () => window.removeEventListener('resize', measure);
  }, [active]);

  // Turn the transition on only after the first position is set,
  // so the highlight doesn't slide in from the left on page load
  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <nav className="nav" aria-label="Primary">
      <ul className="nav__list" ref={listRef}>
        <li
          className={`nav__highlight${animate ? ' is-animated' : ''}`}
          aria-hidden="true"
          style={{ width: pill.w, transform: `translateX(${pill.x}px)` }}
        />
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="nav__pill"
              ref={(el) => (linkRefs.current[id] = el)}
              aria-current={active === id ? 'true' : undefined}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}