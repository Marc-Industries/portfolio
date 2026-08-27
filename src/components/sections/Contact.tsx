'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/Section';

export function Contact() {
  return (
    <Section
      id="contact"
      num="10"
      eyebrow="// CONTACT"
      title="Let's build something."
      lede="Open to aerospace systems, software, MBSE, or AI automation roles — and to interesting collaborations."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 card corner-brackets relative overflow-hidden"
        >
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-accent-crimson/10 blur-3xl" />
          <div className="mono text-[10px] tracking-[0.32em] text-accent-crimson mb-4">CHANNELS</div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.linkedin.com/in/matteo-marcon-287999368/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              LinkedIn <span>↗</span>
            </a>
            <a
              href="https://github.com/Marc-Industries"
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              GitHub <span>↗</span>
            </a>
            <a
              href="/recruiter"
              className="btn"
            >
              Recruiter Brief <span>→</span>
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { k: 'EMAIL',     v: 'via LinkedIn', dot: 'fire' },
              { k: 'TIMEZONE',  v: 'CET · UTC+1',  dot: 'amber' },
              { k: 'RESPONSE',  v: '~24h',         dot: 'ember' },
            ].map((c) => (
              <div key={c.k} className="border border-line p-3">
                <div className="mono text-[9px] tracking-[0.28em] text-space-400">{c.k}</div>
                <div className="mt-1 font-display text-sm text-space-50 flex items-center justify-between">
                  <span>{c.v}</span>
                  <span className={`dot ${c.dot}`} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* System status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="card corner-brackets"
        >
          <div className="mono text-[10px] tracking-[0.32em] text-accent-crimson mb-4">SYSTEM STATUS</div>
          <div className="space-y-3">
            {[
              { k: 'AVAILABILITY', v: 'Open to opportunities', dot: 'fire' },
              { k: 'RELOCATION',   v: 'Open',                  dot: 'ember' },
              { k: 'REMOTE',       v: 'Yes',                   dot: 'amber' },
              { k: 'LOCATION',     v: 'Padova, IT',            dot: 'fire' },
            ].map((r) => (
              <div key={r.k} className="flex items-center justify-between text-xs">
                <span className="mono text-[10px] tracking-[0.28em] text-space-400">{r.k}</span>
                <span className="flex items-center gap-2 text-space-100">
                  {r.v}
                  <span className={`dot ${r.dot}`} />
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom strip */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 mono text-[10px] tracking-[0.28em] text-space-400">
        <div>END OF TRANSMISSION · 10 SECTIONS</div>
        <div>UTC <Clock /></div>
      </div>
    </Section>
  );
}

function Clock() {
  return <ClockInner />;
}

function ClockInner() {
  if (typeof window === 'undefined') return <span>—</span>;
  // Render placeholder during SSR; client mounts with live time
  return <span suppressHydrationWarning>{new Date().toISOString().slice(11, 19)}</span>;
}
