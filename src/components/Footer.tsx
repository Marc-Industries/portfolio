'use client';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line mt-24 pt-12 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 bg-accent-crimson rotate-45" />
              <span className="font-display text-sm tracking-[0.32em] text-space-50">M·M</span>
            </div>
            <p className="text-xs text-space-400 leading-relaxed max-w-xs">
              Aerospace & systems engineer building software, MBSE platforms and AI-driven automation.
            </p>
          </div>

          <div>
            <div className="mono text-[10px] tracking-[0.32em] text-accent-crimson mb-3">NAVIGATE</div>
            <ul className="space-y-1.5">
              {['Projects', 'Experience', 'Education', 'Contact'].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="mono text-[11px] tracking-[0.24em] text-space-300 hover:text-accent-crimson transition-colors"
                  >
                    → {l}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/recruiter"
                  className="mono text-[11px] tracking-[0.24em] text-space-300 hover:text-accent-crimson transition-colors"
                >
                  → Recruiter Brief
                </a>
              </li>
              <li>
                <a
                  href="/engineering"
                  className="mono text-[11px] tracking-[0.24em] text-space-300 hover:text-accent-crimson transition-colors"
                >
                  → Engineering Notes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="mono text-[10px] tracking-[0.32em] text-accent-crimson mb-3">CHANNELS</div>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://www.linkedin.com/in/matteo-marcon-287999368/"
                  target="_blank"
                  rel="noreferrer"
                  className="mono text-[11px] tracking-[0.24em] text-space-300 hover:text-accent-crimson transition-colors"
                >
                  ↗ LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Marc-Industries"
                  target="_blank"
                  rel="noreferrer"
                  className="mono text-[11px] tracking-[0.24em] text-space-300 hover:text-accent-crimson transition-colors"
                >
                  ↗ GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mb-6" />

        <div className="flex flex-wrap items-center justify-between gap-3 mono text-[9px] tracking-[0.28em] text-space-500">
          <div>© {year} MATTEO MARCON · ALL RIGHTS RESERVED</div>
          <div className="flex items-center gap-4">
            <span>v1.0 · RED/BLACK BUILD</span>
            <span className="flex items-center gap-2">
              <span className="dot fire" />
              SYSTEMS NOMINAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
