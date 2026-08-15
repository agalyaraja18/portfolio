import ScrollStack, { ScrollStackItem } from './ScrollStack';

export default function Projects({ projects }) {
  const items = projects || [];

  return (
    <section id="projects" className="py-24">
      {/* Heading outside the scroller so it stays in normal page flow */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-4xl md:text-6xl font-black font-headline text-center text-white">
          PROJECT<span className="text-primary neon-text-pink">_MATRIX</span>
        </h2>
      </div>

      {/* ScrollStack needs a fixed height container */}
      <div style={{ height: '70vh' }} className="w-full max-w-4xl mx-auto px-6">
        <ScrollStack
          itemDistance={60}
          itemScale={0.04}
          itemStackDistance={20}
          stackPosition="15%"
          scaleEndPosition="8%"
          baseScale={0.88}
          rotationAmount={0}
          blurAmount={0}
        >
          {items.map((project, idx) => {
            const isEven = idx % 2 === 0;
            const badgeText = project.badge || 'PROJECT';
            const badgeBg = isEven ? 'bg-primary text-on-primary' : 'bg-secondary text-on-secondary';

            return (
              <ScrollStackItem key={project.id || idx}>
                {/* Card inner — themed to match portfolio */}
                <div className="flex flex-col md:flex-row h-full bg-surface-container border border-white/10 neon-border-pink overflow-hidden">
                  {/* Image */}
                  <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden flex-shrink-0">
                    <img
                      src={project.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c'}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-container/60" />
                    <span className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-bold font-label tracking-widest ${badgeBg}`}>
                      {badgeText}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center p-8 flex-1">
                    <h3 className="text-2xl md:text-3xl font-black font-headline text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {project.tech_stack && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech_stack.map(tech => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-surface-container-highest text-primary text-[10px] font-label border border-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-fit neon-border-cyan px-6 py-2 text-secondary font-label text-xs uppercase tracking-widest hover:bg-secondary/10 transition-all duration-300"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </section>
  );
}
