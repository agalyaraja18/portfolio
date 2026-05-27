import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { portfolioData } from './data/portfolioData';

function App() {
  const about = portfolioData.about;
  const skills = portfolioData.skills;
  const projects = portfolioData.projects;
  const education = portfolioData.education;
  const certifications = portfolioData.certifications;

  return (
    <div className="min-h-screen bg-background text-on-background relative overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      {/* Background patterns */}
      <div className="grid-bg fixed inset-0 z-0 pointer-events-none" />
      <div className="scanline pointer-events-none" />

      <Navbar />

      <main className="relative z-10 pt-24">
        <Hero about={about} />
        <About about={about} />
        <Education education={education} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Certifications certifications={certifications} />
        <Contact about={about} />
      </main>

      <Footer about={about} />
    </div>
  );
}

export default App;
