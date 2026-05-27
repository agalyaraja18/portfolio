export default function Certifications({ certifications }) {
  const items = certifications || [];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 border-t border-outline-variant/20" id="certifications">
      <h2 className="text-3xl font-headline font-bold mb-12 flex items-center gap-4 text-white">
        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
          verified
        </span>
        VERIFIED_CREDENTIALS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((cert, idx) => (
          <div 
            key={cert.id || idx}
            className="p-6 bg-surface-container neon-border-cyan group hover:-translate-y-2 transition-all duration-300 cursor-default"
          >
            <p className="text-xs font-label text-secondary mb-2 uppercase tracking-widest">
              {cert.issuer}
            </p>
            <h4 className="font-bold text-sm text-white">
              {cert.name}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
}
