import ShiftBackground from './components/ShiftBackground';
import Navbar from './components/NavBar';
import GlassCard from './components/GlassCard';
import ProjectCard from './components/ProjectCard';
import SkillsRibbon from './components/SkillsRibbon';

export default function App() {
  return (
    <>
      <ShiftBackground />
      <div className="grain" aria-hidden="true" />
      <Navbar />

      <main>
        <section id="home" className="section">
          <div className="section__inner">
            <GlassCard className='home-card'>
              <h1>Taaruni Ananya</h1>
              <p className='home-desc home-desc--first'>Hi! I’m a CS student at Georgia State University’s Honors College graduating this December.  </p>
              <p className='home-desc'>With experience from 3 tech internships and 3 tech programs so far, I‘m learning more and more to reach my goals of having a positive impact in tech :D</p>
            </GlassCard>
          </div>

          <SkillsRibbon />
        </section>

        <section id="about" className="section">
          <div className="section__inner">
            <GlassCard>About me content…</GlassCard>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="section__inner card-grid">
            <GlassCard>Role one…</GlassCard>
            <GlassCard>Role two…</GlassCard>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section__inner">
            <GlassCard>Skills…</GlassCard>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section__inner card-grid">
            <ProjectCard
              title="Project name"
              description="One or two lines on what it does."
              tags={['React', 'Python']}
              repo="https://github.com/you/repo"
            />
          </div>
        </section>
      </main>
    </>
  );
}