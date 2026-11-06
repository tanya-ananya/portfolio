import GlassCard from './GlassCard';

export default function ProjectCard({ title, description, tags, repo, demo }) {
  return (
    <GlassCard as="article">
      <h3 style={{ fontFamily: 'Oswald, sans-serif', margin: '0 0 8px' }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', margin: '0 0 16px' }}>{description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {tags.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
      <a href={repo} target="_blank" rel="noreferrer">GitHub</a>
      {demo && <> · <a href={demo} target="_blank" rel="noreferrer">Live demo</a></>}
    </GlassCard>
  );
}