export default function Publications({ publications }) {
  const items = publications || [];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 border-t border-outline-variant/20" id="publications">
      <h2 className="text-3xl font-headline font-bold mb-12 flex items-center gap-4 text-white">
        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
          menu_book
        </span>
        PUBLICATIONS_&amp;_PRESENTATIONS
      </h2>
      <div className="flex flex-col gap-6">
        {items.map((pub) => (
          <div
            key={pub.id}
            className="p-8 bg-surface-container neon-border-pink group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 text-[10px] font-bold font-label tracking-widest bg-primary text-on-primary uppercase">
                {pub.type}
              </span>
              <span className="text-xs font-label text-on-surface-variant uppercase tracking-widest">
                {pub.date}
              </span>
            </div>
            <h3 className="text-xl font-bold font-headline text-white mb-3 group-hover:text-primary transition-colors duration-300">
              "{pub.title}"
            </h3>
            <p className="text-sm font-body text-on-surface-variant mb-1">
              {pub.conference}
            </p>
            <p className="text-xs font-label text-on-surface-variant mb-4">
              In association with {pub.association} · Published in {pub.publisher}
            </p>
            <a
              href={pub.doi_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-label text-primary hover:underline tracking-wider uppercase"
            >
              <span className="material-symbols-outlined text-base">open_in_new</span>
              DOI: {pub.doi}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
