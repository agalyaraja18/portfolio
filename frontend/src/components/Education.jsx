export default function Education({ education }) {
  const items = education || [];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24" id="education">
      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-black font-headline text-white">
          ACADEMY<span className="text-secondary neon-text-cyan">.LOG</span>
        </h2>
        <div className="h-1 flex-1 bg-gradient-to-r from-secondary to-transparent"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {items.map((edu, idx) => {
          const isPrimary = idx === 0;
          return (
            <div 
              key={edu.id || idx}
              className={`relative pl-8 border-l-2 group ${
                isPrimary ? 'border-primary/50' : 'border-outline/30'
              } ${idx === 1 ? 'md:mt-24' : ''}`}
            >
              {/* Timeline marker */}
              <div 
                className={`absolute -left-[9px] top-0 w-4 h-4 transition-colors duration-300 ${
                  isPrimary 
                    ? 'bg-primary shadow-[0_0_10px_rgba(255,45,120,1)]' 
                    : 'bg-outline group-hover:bg-secondary'
                }`}
              />
              
              {/* Year */}
              <span className={`font-label text-sm tracking-widest ${
                isPrimary ? 'text-primary' : 'text-on-surface-variant'
              }`}>
                {edu.start_year && edu.end_year 
                  ? `${edu.start_year} — ${edu.end_year}` 
                  : edu.end_year 
                    ? `Graduated ${edu.end_year}` 
                    : `${edu.start_year} — Present`
                }
              </span>
              
              {/* Institution */}
              <h3 className={`text-2xl font-bold font-headline mt-2 transition-colors duration-300 text-white ${
                isPrimary ? 'group-hover:text-primary' : 'group-hover:text-secondary'
              }`}>
                {edu.institution}
              </h3>
              
              {/* Degree */}
              <p className="text-on-surface-variant mt-2 font-body">{edu.degree}</p>
              
              {/* Field / Focus */}
              {edu.field && (
                <p className={`text-sm mt-4 font-label ${
                  isPrimary ? 'text-secondary/70' : 'text-on-surface-variant/70'
                }`}>
                  Focus: {edu.field}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
