import ShiftBackground from './components/ShiftBackground';
import Navbar from './components/NavBar';
import GlassCard from './components/GlassCard';
import ProjectCard from './components/ProjectCard';
import SkillsRibbon from './components/SkillsRibbon';

/* const LIGHT_PALETTE = [270, 308, 308, 0, 39, 195];
const DARK_PALETTE = [243, 270, 308, 0]; */
const LIGHT_COLORS = ['#FD6E6E', '#c793c0', '#9277a5', '#d4f4ff', '#FD6E6E', '#c793c0'];
const DARK_COLORS = ['#5f5d86', '#9277a5', '#c793c0', '#FD6E6E'];

export default function App() {
  return (
    <>
      {/* <ShiftBackground
        palette={LIGHT_PALETTE}
        saturation={70}
        lightness={78}
        maxAlpha={0.65}
        backgroundColor="hsla(39,100%,96%,1)"
      />
      <ShiftBackground
        palette={DARK_PALETTE}
        saturation={55}
        lightness={38}
        maxAlpha={0.6}
        backgroundColor="hsla(202,100%,13%,1)"
      /> */}

      <ShiftBackground
        colors={LIGHT_COLORS}
        maxAlpha={0.6}
        backgroundColor="#FFF8EC"
        speed={2.5}
      />

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