'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { imgCandidates } from '@/lib/assets';

/**
 * Hero — cinematic identity section.
 * Stays above the persistent 3D scene. Pulls H1/H2/H3 from /assets/img/.
 */
export function Hero() {
  const [src, setSrc] = useState<string | null>(null);

  // Probe candidates in order — first one that loads wins.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const candidate of imgCandidates('H1')) {
        if (cancelled) return;
        const ok = await checkImage(candidate);
        if (cancelled) return;
        if (ok) { setSrc(candidate); return; }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end pb-24 pt-32 overflow-hidden">
      {/* Optional background still */}
      {src && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover opacity-50"
            style={{ filter: 'contrast(1.05) saturate(1.1) brightness(0.6)' }}
          />
          {/* Vignette + red tint over still */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 60%, transparent 0%, rgba(5,0,0,0.85) 70%), ' +
                'linear-gradient(180deg, rgba(5,0,0,0.4) 0%, rgba(5,0,0,0.2) 50%, rgba(5,0,0,0.95) 100%)',
            }}
          />
          <div
            className="absolute inset-0 mix-blend-screen"
            style={{
              background:
                'radial-gradient(ellipse at 50% 30%, rgba(212,63,63,0.18), transparent 60%)',
            }}
          />
        </div>
      )}

      {/* Top-left status badge */}
      <div className="absolute top-32 left-6 md:left-12 z-10 flex items-center gap-3">
        <span className="dot fire" />
        <span className="mono text-[10px] tracking-[0.28em] text-space-200">SYSTEMS ONLINE · MISSION READY</span>
      </div>

      {/* Top-right corner mark */}
      <div className="absolute top-32 right-6 md:right-12 z-10 mono text-[10px] tracking-[0.28em] text-space-300 text-right">
        <div>LAT 45.4064 N</div>
        <div>LON 11.8768 E</div>
        <div className="mt-1 text-accent-crimson">— PDV / UTC+01 —</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-accent-crimson" />
            <span className="mono text-[11px] tracking-[0.32em] text-accent-crimson">
              AEROSPACE · SYSTEMS · SOFTWARE · AI
            </span>
          </div>

          {/* Main headline */}
          <h1 className="h-display text-[clamp(3rem,9vw,8.5rem)] text-balance leading-[0.95]">
            <span className="block text-space-50">Matteo</span>
            <span className="block text-space-50 italic font-light">Marcon</span>
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-10 max-w-3xl text-lg md:text-xl text-space-100 leading-relaxed text-pretty"
          >
            I engineer <span className="text-accent-crimson">aerospace systems</span> and
            <span className="text-accent-crimson"> software platforms</span> — from CubeSats and
            digital twins to event-driven automation and AI workflows.
          </motion.p>

          {/* Status cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px max-w-4xl"
          >
            {[
              { k: 'STATUS', v: 'Active', dot: 'fire' },
              { k: 'FOCUS', v: 'MBSE · Aerospace SW', dot: 'amber' },
              { k: 'LOCATION', v: 'Padova, IT', dot: 'ember' },
            ].map((c) => (
              <div key={c.k} className="glass corner-brackets px-5 py-4 flex items-center justify-between">
                <div>
                  <div className="mono text-[9px] tracking-[0.32em] text-space-300">{c.k}</div>
                  <div className="mt-1 text-space-50 font-display">{c.v}</div>
                </div>
                <span className={`dot ${c.dot}`} />
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href="#projects" className="btn btn-primary">
              <span>View Projects</span>
              <span className="ml-2">→</span>
            </a>
            <a href="#contact" className="btn">Get in Touch</a>
            <a
              href="https://www.linkedin.com/in/matteo-marcon-287999368/"
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/Marc-Industries"
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              GitHub ↗
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom-right tag */}
        <div className="absolute bottom-6 right-6 md:right-12 mono text-[10px] tracking-[0.28em] text-space-400 text-right">
          <div>SECTION 00 · IDENTITY</div>
          <div className="mt-1 text-space-500">SCROLL TO PROCEED</div>
        </div>
      </div>

      {/* Subtle scan line */}
      <div className="scan-line" aria-hidden="true" />
    </section>
  );
}

/** Probe whether an image URL is reachable. */
function checkImage(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
