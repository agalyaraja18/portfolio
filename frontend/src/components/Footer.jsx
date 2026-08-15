export default function Footer({ about }) {
  const name = about?.name || 'AGALYA R.';
  const email = about?.email || 'agalyar717@gmail.com';
  const linkedin = about?.linkedin || 'https://www.linkedin.com/in/agalya-r-48600029a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app';
  const github = about?.github || 'https://github.com/agalyaraja18?';

  return (
    <footer className="bg-surface-container-lowest py-8 border-t border-outline-variant/20 relative z-20">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl mx-auto gap-4">
        <div className="flex items-center gap-2">
          <span className="font-label text-primary font-bold tracking-widest">{name}</span>
          <span className="w-2 h-2 bg-secondary rounded-full animate-pulse shadow-[0_0_8px_rgba(245,242,235,0.5)]"></span>
        </div>
        <p className="font-body text-on-surface-variant text-sm">
          © 2026 {name} Built in Neo-Tokyo.
        </p>
        <div className="flex gap-6">
          <a 
            className="text-on-surface-variant hover:text-secondary hover:drop-shadow-[0_0_8px_rgba(0,255,204,0.6)] transition-all duration-200 font-label text-sm" 
            href={linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a 
            className="text-on-surface-variant hover:text-secondary hover:drop-shadow-[0_0_8px_rgba(0,255,204,0.6)] transition-all duration-200 font-label text-sm" 
            href={`mailto:${email}`}
          >
            Email
          </a>
          <a 
            className="text-on-surface-variant hover:text-secondary hover:drop-shadow-[0_0_8px_rgba(0,255,204,0.6)] transition-all duration-200 font-label text-sm" 
            href={github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
