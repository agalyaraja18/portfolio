export default function About({ about }) {
  const bio = about?.bio || 'I am Agalya R., a developer based in the digital frontier. My mission is to bridge the gap between complex logic and stunning visual identity. I build systems that are not just functional, but performative. Driven by curiosity and fueled by caffeine, I transform wireframes into electric reality.';

  return (
    <section className="max-w-7xl mx-auto px-6 py-12" id="about">
      {/* Bio Card */}
      <div className="bg-surface-container p-8 neon-border-pink relative group overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl font-black select-none group-hover:text-primary transition-colors duration-300">01</div>
        <h2 className="text-3xl font-headline font-bold mb-4 text-primary neon-text-pink">Initiating Data...</h2>
        <p className="text-on-surface-variant leading-relaxed text-lg font-body">
          {bio}
        </p>
      </div>
    </section>
  );
}
