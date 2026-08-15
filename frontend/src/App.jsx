import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PixelBlast from './components/PixelBlast';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Publications from './components/Publications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { portfolioData } from './data/portfolioData';

function App() {
  const about = portfolioData.about;
  const skills = portfolioData.skills;
  const projects = portfolioData.projects;
  const education = portfolioData.education;
  const certifications = portfolioData.certifications;
  const publications = portfolioData.publications;

  return (
    <div className="min-h-screen bg-background text-on-background relative overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      {/* PixelBlast background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <PixelBlast
          variant="circle"
          pixelSize={5}
          color="#D4AF37"
          patternScale={3}
          patternDensity={1.1}
          pixelSizeJitter={0.4}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          speed={0.4}
          edgeFade={0.3}
          transparent
        />
      </div>
      {/* Background grid */}
      <div className="grid-bg fixed inset-0 z-0 pointer-events-none" />
      <div className="scanline pointer-events-none" />

      <Navbar />

      <main className="relative z-10 pt-24">
        <Hero about={about} />
        <About about={about} />
        <Education education={education} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Publications publications={publications} />
        <Certifications certifications={certifications} />
        <Contact about={about} />
      </main>

      <Footer about={about} />
    </div>
  );
}

export default App;
