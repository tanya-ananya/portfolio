import { useEffect, useState } from 'react';

export const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About me' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
];

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const IDS = SECTIONS.map((s) => s.id);

export default function Navbar() {
  const active = useActiveSection(IDS);

  return (
    <nav className="nav glass" aria-label="Primary">
      <ul className="nav__list">
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="nav__pill"
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