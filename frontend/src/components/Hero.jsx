export default function Hero({ about }) {
  const name = about?.name || 'AGALYA R.';
  const tagline = about?.tagline || 'Enthusiastic and devoted beginner with a solid background in web development and design. Eager to put academic knowledge to use in a work environment. Aimed to producing top-notch work and helping the team succeed. Able to quickly adjust to changing technologies and novel challenges. Passionate about continuous learning and improving technical skills';
  const profileImage = about?.profile_image || '/Me.jpg.jpeg';

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const offset = 80;
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
    <section className="max-w-7xl mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row items-center gap-12 min-h-[80vh]" id="home">
      <div className="flex-1 space-y-6">
        <p className="font-label text-secondary tracking-[0.3em] uppercase animate-pulse">Available for Projects</p>
        <h1 className="text-6xl md:text-8xl font-black font-headline leading-tight">
          <span className="block text-white">UI/UX</span>
          <span className="text-primary neon-text-pink">DESIGNER</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
          {tagline}
        </p>
        <div className="flex gap-4 pt-4">
          <a 
            className="group relative px-8 py-4 bg-primary text-on-primary font-bold overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,45,120,0.6)] flex items-center justify-center" 
            href="#projects"
            onClick={(e) => handleScroll(e, 'projects')}
          >
            <span className="relative z-10 font-headline tracking-wider">VIEW WORK</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
          <a 
            className="px-8 py-4 neon-border-cyan text-secondary font-bold hover:bg-secondary/10 transition-all duration-300 flex items-center justify-center font-headline tracking-wider" 
            href="#contact"
            onClick={(e) => handleScroll(e, 'contact')}
          >
            GET IN TOUCH
          </a>
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
        <div className="relative w-full aspect-square md:w-[450px] md:h-[450px] overflow-hidden neon-border-pink p-2 bg-surface-container">
          <img 
            alt={name} 
            className="w-full h-full object-cover filter contrast-125 saturate-110" 
            src={profileImage}
          />
        </div>
        <div className="absolute bottom-4 -right-4 bg-surface-container p-6 neon-border-cyan hidden md:block">
          <span className="block text-4xl font-black text-secondary neon-text-cyan">3+</span>
          <span className="text-xs font-label uppercase tracking-tighter">Years Crafting Code</span>
        </div>
      </div>
    </section>
  );
}
