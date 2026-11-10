const ABOUT = {
  paragraphs: [
    "I'm a software engineer who has been exploring tech since 3rd grade. With the help of my Software Engineer father, I've been various websites, games, and systems for years -- all spurred by my curiousity and excitement for the future through technology.",
    "Besides building for a hobby, I'm contributing my skills to engineering in the corporate world. Starting from a **Web Dev internship**, to **two technology apprenticeships**, then a **UI/UX design program**, to an **Android Engineering internship**, & finally an **AI/ML internship**. Expand the tabs below for more on my journey or scroll to 'Experience' for more on my career!",
  ],
  facts: [
    { label: 'Based in', value: 'Atlanta, Georgia' },
    { label: 'Latest', value: 'AI/ML intern @ Honeywell Technologies' },
    { label: 'Open to', value: 'New grad roles for SWE, AI/ML, UI/UX, & Product Management' },
  ],
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/taaruni-ananya' },
    { label: 'GitHub', href: 'https://github.com/tanya-ananya' },
    { label: 'Resume', href: `${import.meta.env.BASE_URL}resume.pdf` },
    ],
};

function renderRich(text) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

export default function AboutIntro() {
  return (
    <div className="about">
      <div className="about-copy">
        {ABOUT.paragraphs.map((p, i) => (
            <p key={i}>{renderRich(p)}</p>
        ))}
      </div>

      <aside className="card" aria-label="Quick facts">
        <h3>Quick Facts</h3>
        <dl className="facts">
          {ABOUT.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
          <div>
            <dt className="find-me">Find Me In</dt>
            <dd className="facts-list">
              {ABOUT.links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                  <mark>{l.label}</mark>
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}