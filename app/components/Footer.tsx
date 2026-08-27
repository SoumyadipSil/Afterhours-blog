import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border relative overflow-hidden bg-bg-surface">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-xl font-semibold text-text-primary mb-3">AfterHours</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Late-night reflections on code, life, and everything in between.
            </p>
          </div>
          <div>
            <h4 className="text-text-primary font-medium mb-3">Navigation</h4>
            <ul className="flex flex-col gap-2">
              <li><Link href="/" className="text-text-secondary hover:text-accent-amber text-sm transition-colors">Home</Link></li>
              <li><Link href="/blog" className="text-text-secondary hover:text-accent-amber text-sm transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-text-secondary hover:text-accent-amber text-sm transition-colors">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-text-primary font-medium mb-3">Connect</h4>
            <ul className="flex flex-col gap-2">
              <li><a href="https://soumyadipsil-devfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-amber text-sm transition-colors">Portfolio</a></li>
              <li><a href="https://github.com/SoumyadipSil" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-amber text-sm transition-colors">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/soumyadip-sil-bb0935385/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-amber text-sm transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-tertiary">
          <p>© {new Date().getFullYear()} Soumyadip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
