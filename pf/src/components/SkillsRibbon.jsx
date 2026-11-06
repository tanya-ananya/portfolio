const SKILLS = [
  'AI / ML',
  'Android Engineering',
  'UI / UX',
  'Data Science',
  'Product Management',
  'Web Development',
  'React',
  'Python',
];

export default function SkillsRibbon({ skills = SKILLS }) {
  const renderList = (hidden) => (
    <ul className="ribbon__list" aria-hidden={hidden || undefined}>
      {skills.map((s) => (
        <li key={s} className="ribbon__item">
          {s}
          <span className="ribbon__dot" aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="ribbon" role="region" aria-label="Skills">
      <div className="ribbon__track">
        {renderList(false)}
        {renderList(true)}
      </div>
    </div>
  );
}