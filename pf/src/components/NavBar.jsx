import { useEffect, useState } from 'react';

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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      // a section is "active" while it crosses the middle band of the viewport
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

export default function NavBar() {
  const active = useActiveSection(IDS);

  return (
    <nav className="nav" aria-label="Primary">
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