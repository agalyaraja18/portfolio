import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'education', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, section) => {
    e.preventDefault();
    setActiveSection(section);
    const el = document.getElementById(section);
    if (el) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-primary/30 shadow-[0_0_15px_rgba(255,45,120,0.1)] ${
      scrolled 
        ? 'py-2 bg-background/95 backdrop-blur-md' 
        : 'py-4 bg-background/80 backdrop-blur-md'
    }`}>
      <div className="flex justify-between items-center px-6 max-w-7xl mx-auto">
        <a 
          className="text-2xl font-bold font-headline text-primary tracking-tighter drop-shadow-[0_0_8px_rgba(255,45,120,0.8)] transition-all duration-300 active:scale-95" 
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
        >
          AGALYA R.
        </a>
        <nav className="hidden md:flex gap-8 items-center">
          {[
            { id: 'home', label: 'Home' },
            { id: 'education', label: 'Education' },
            { id: 'skills', label: 'Skills' },
            { id: 'projects', label: 'Projects' },
            { id: 'contact', label: 'Contact' }
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`font-label transition-all duration-300 ${
                  isActive
                    ? 'text-primary font-bold border-b-2 border-primary pb-1 drop-shadow-[0_0_5px_rgba(255,45,120,0.5)]'
                    : 'text-on-surface-variant hover:text-secondary hover:drop-shadow-[0_0_8px_rgba(0,255,204,0.6)]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <button 
          className="bg-surface-container-highest neon-border-pink px-6 py-2 text-primary font-label text-sm uppercase tracking-widest hover:shadow-[0_0_16px_rgba(255,45,120,0.4)] transition-all duration-300 active:scale-95"
          onClick={() => window.open('/Agalya_R.pdf', '_blank')}
        >
          Resume
        </button>
      </div>
    </header>
  );
}
