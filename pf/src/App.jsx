import NavBar from './components/NavBar';
import SkillsRibbon from './components/SkillsRibbon';
import AboutIntro from './components/AboutIntro';
import JourneyTimeline from './components/JourneyTimeline';

export default function App() {
  return (
    <>
      <NavBar />

      <main>
        <section id="home" className="section hero">
          <div className="hero__content">
            <h1 className="hero__name">Taaruni Ananya</h1>
            <p className="hero__text">
              Hi! I’m a CS student with experience from 3 tech internships and 3 tech programs, learning more and more to reach my goals of having a positive impact in tech :D
            </p>
          </div>

          <SkillsRibbon />
        </section>

        <section id="about" className="section">
          <div className="section__inner">
            <h2 className="section__title">A Little More About Me</h2>
            <AboutIntro />
            <JourneyTimeline />
          </div>
        </section>

        <section id="experience" className="section">
          <div className="section__inner">
            <h2 className="section__title">Experience</h2>
            <p className="section__text">Experience content…</p>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section__inner">
            <h2 className="section__title">Skills</h2>
            <p className="section__text">Skills content…</p>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section__inner">
            <h2 className="section__title">Projects</h2>
            <p className="section__text">Projects content…</p>
          </div>
        </section>
      </main>
    </>
  );
}