export default function Projects({ projects }) {
  const items = projects || [];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24" id="projects">
      <h2 className="text-4xl md:text-6xl font-black font-headline mb-16 text-center text-white">
        PROJECT<span className="text-primary neon-text-pink">_MATRIX</span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {items.map((project, idx) => {
          const isLast = idx === items.length - 1 && items.length > 1;
          const isEven = idx % 2 === 0;
          const accentColorClass = isEven ? 'text-primary' : 'text-secondary';
          const neonTextClass = isEven ? 'neon-text-pink' : 'neon-text-cyan';
          const borderHoverClass = isEven ? 'hover:border-primary/50' : 'hover:border-secondary/50';
          const badgeBgClass = isEven ? 'bg-primary text-on-primary' : 'bg-secondary text-on-secondary';
          const badgeText = project.badge || (isEven ? 'SYSTEM ACTIVE' : 'BETA v1.2');
          
          if (isLast) {
            // Wide Card Layout
            return (
              <div 
                key={project.id || idx}
                className="lg:col-span-2 group relative bg-surface-container/40 backdrop-blur-xl border border-white/10 p-1 transition-all duration-300 hover:border-primary/50 overflow-hidden flex flex-col md:flex-row"
              >
                <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                    src={project.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c'} 
                    alt={project.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                </div>
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                  <h3 className="text-3xl font-black font-headline mb-4 group-hover:text-primary transition-colors duration-300 text-white">
                    {project.title}
                  </h3>
                  <p className="text-on-surface-variant mb-6 font-body">
                    {project.description}
                  </p>
                  
                  {project.tech_stack && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech_stack.map((tech) => (
                        <span 
                          key={tech}
                          className="bg-surface-container-highest px-3 py-1 text-[10px] font-bold text-primary neon-border-pink font-label"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-4 items-center">
                    {project.live_url && (
                      <a 
                        href={project.live_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-fit neon-border-cyan px-6 py-2 text-secondary font-label uppercase tracking-widest hover:bg-secondary/10 transition-all duration-300"
                      >
                        Project Dossier
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          }

          // Standard Grid Card Layout
          return (
            <div 
              key={project.id || idx}
              className={`group relative bg-surface-container/40 backdrop-blur-xl border border-white/10 p-1 transition-all duration-300 ${borderHoverClass} overflow-hidden`}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                  src={project.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c'} 
                  alt={project.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                <span className={`absolute top-4 right-4 px-3 py-1 text-[10px] font-bold font-label tracking-widest ${badgeBgClass}`}>
                  {badgeText}
                </span>
              </div>
              <div className="p-8">
                <h3 className={`text-3xl font-black font-headline mb-4 group-hover:${accentColorClass} transition-colors duration-300 text-white`}>
                  {project.title}
                </h3>
                <p className="text-on-surface-variant mb-6 font-body">
                  {project.description}
                </p>

                {project.tech_stack && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech_stack.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2 py-0.5 bg-surface-container-highest text-on-surface-variant text-[10px] font-label border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    {project.live_url && (
                      <a 
                        href={project.live_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="material-symbols-outlined text-secondary hover:scale-125 transition-transform duration-300 cursor-pointer"
                        title="Live Demo"
                      >
                        link
                      </a>
                    )}
                  </div>
                  <span className={`font-label text-xs uppercase ${accentColorClass} tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    {isEven ? 'Accessing...' : 'Deploying...'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
