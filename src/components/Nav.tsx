'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = [
  { id: 'hero',        label: 'Identity' },
  { id: 'about',       label: 'About' },
  { id: 'aerospace',   label: 'Aerospace' },
  { id: 'mbse',        label: 'MBSE' },
  { id: 'software',    label: 'Software' },
  { id: 'automation',  label: 'AI/Auto' },
  { id: 'projects',    label: 'Projects' },
  { id: 'experience',  label: 'Experience' },
  { id: 'publication', label: 'Paper' },
  { id: 'education',   label: 'Education' },
  { id: 'contact',     label: 'Contact' },
];

export function Nav() {
  const [active, setActive] = useState<string>('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id);
          }
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all ${
          scrolled ? 'backdrop-blur-md bg-space-950/70 border-b border-line' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 group">
            <span className="w-2 h-2 bg-accent-crimson rotate-45" />
            <span className="font-display text-sm tracking-[0.32em] text-space-50 group-hover:text-accent-crimson transition-colors">
              M·M
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {SECTIONS.slice(1).map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`mono text-[10px] tracking-[0.28em] uppercase px-3 py-2 transition-colors ${
                    active === s.id ? 'text-accent-crimson' : 'text-space-300 hover:text-space-50'
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden mono text-[10px] tracking-[0.28em] text-space-50 border border-line px-3 py-1.5"
            aria-label="Menu"
          >
            {mobileOpen ? '✕' : '≡ MENU'}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-space-950/95 backdrop-blur-md lg:hidden pt-20 px-6"
          >
            <ul className="space-y-1">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 mono text-sm tracking-[0.24em] uppercase border-b border-line ${
                      active === s.id ? 'text-accent-crimson' : 'text-space-200'
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
