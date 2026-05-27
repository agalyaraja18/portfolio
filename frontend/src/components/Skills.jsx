export default function Skills({ skills }) {
  const items = skills || [];

  // Categorize skills dynamically
  const programmingSkills = items.filter(s => s.category === 'programming');
  const frontendSkills = items.filter(s => s.category === 'frontend');
  const backendSkills = items.filter(s => s.category === 'backend');
  const nonTechnicalSkills = items.filter(s => s.category === 'non_technical');
  const softSkills = items.filter(s => s.category === 'soft_skills');
  const toolsSkills = items.filter(s => s.category === 'tools');

  const categories = [
    {
      title: 'Programming Language',
      icon: 'code',
      accentClass: 'text-secondary',
      borderClass: 'neon-border-cyan',
      hoverGlowClass: 'hover:shadow-[0_0_20px_rgba(0,255,204,0.15)]',
      list: programmingSkills.length > 0 ? programmingSkills : [{ id: 1, name: 'Python' }]
    },
    {
      title: 'Frontend Technologies',
      icon: 'web',
      accentClass: 'text-primary',
      borderClass: 'neon-border-pink',
      hoverGlowClass: 'hover:shadow-[0_0_20px_rgba(255,45,120,0.15)]',
      list: frontendSkills.length > 0 ? frontendSkills : [
        { id: 2, name: 'HTML' },
        { id: 3, name: 'Bootstrap' },
        { id: 4, name: 'Flutter' },
        { id: 5, name: 'Flask' }
      ]
    },
    {
      title: 'Backend Technologies',
      icon: 'terminal',
      accentClass: 'text-secondary',
      borderClass: 'neon-border-cyan',
      hoverGlowClass: 'hover:shadow-[0_0_20px_rgba(0,255,204,0.15)]',
      list: backendSkills.length > 0 ? backendSkills : [
        { id: 6, name: 'Django' },
        { id: 7, name: 'PHP' },
        { id: 8, name: 'SQL' }
      ]
    },
    {
      title: 'Non Technical Skills',
      icon: 'palette',
      accentClass: 'text-primary',
      borderClass: 'neon-border-pink',
      hoverGlowClass: 'hover:shadow-[0_0_20px_rgba(255,45,120,0.15)]',
      list: nonTechnicalSkills.length > 0 ? nonTechnicalSkills : [{ id: 9, name: 'UI/UX design' }]
    },
    {
      title: 'Soft Skills',
      icon: 'psychology',
      accentClass: 'text-secondary',
      borderClass: 'neon-border-cyan',
      hoverGlowClass: 'hover:shadow-[0_0_20px_rgba(0,255,204,0.15)]',
      list: softSkills.length > 0 ? softSkills : [
        { id: 10, name: 'Fast learner' },
        { id: 11, name: 'Good communication' },
        { id: 12, name: 'Collaborative worker' },
        { id: 13, name: 'Adaptability' },
        { id: 14, name: 'Flexibility' },
        { id: 15, name: 'Time management' }
      ]
    },
    {
      title: 'Tools',
      icon: 'construction',
      accentClass: 'text-primary',
      borderClass: 'neon-border-pink',
      hoverGlowClass: 'hover:shadow-[0_0_20px_rgba(255,45,120,0.15)]',
      list: toolsSkills.length > 0 ? toolsSkills : [
        { id: 16, name: 'Canva' },
        { id: 17, name: 'Figma' },
        { id: 18, name: 'Unity (basics)' },
        { id: 19, name: 'Blender (basics)' }
      ]
    }
  ];

  return (
    <section className="bg-surface-container-low py-24" id="skills">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-headline font-black mb-2 text-white">
            NEURAL<span className="text-primary neon-text-pink">_UPLOADS</span>
          </h2>
          <p className="font-label text-on-surface-variant tracking-widest uppercase">Skillset Inventory</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              className={`p-6 bg-background ${cat.borderClass} ${cat.hoverGlowClass} transition-all duration-300`}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-2xl" style={{ color: cat.accentClass.includes('primary') ? '#ff2d78' : '#00ffcc' }}>
                  {cat.icon}
                </span>
                <h3 className="font-bold font-headline uppercase text-lg tracking-wide text-white">
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.list.map((skill) => (
                  <span 
                    key={skill.id || skill.name} 
                    className={`px-3 py-1 bg-surface-container-highest ${cat.accentClass} text-xs font-label`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
