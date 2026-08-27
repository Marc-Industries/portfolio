'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { data } from '@/lib/data';

const LAYERS = [
  { t: 'Frontend',  d: 'React, Next.js, TypeScript, Tailwind, Framer Motion.' },
  { t: 'API',       d: 'FastAPI, Node.js, REST + webhooks, serverless functions.' },
  { t: 'Backend',   d: 'Python services, scheduled jobs, async workers.' },
  { t: 'Data',      d: 'Postgres / Supabase, schema design, RLS, migrations.' },
  { t: 'Infra',     d: 'Git, CI/CD, containers, observability, secrets.' },
];

export function Software() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section
      id="software"
      num="04"
      eyebrow="// SOFTWARE & IT SYSTEMS"
      title="Production-grade software, engineered like a system."
      lede="Full-stack work with the same discipline as aerospace: tested, observable, modular, designed for failure modes."
    >
      <div ref={ref} className="space-y-10">
        {/* Layered architecture */}
        <div className="space-y-3">
          <div className="mono text-[10px] tracking-[0.32em] text-accent-crimson mb-4">ARCHITECTURE</div>
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.t}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="flex items-center gap-4">
                <div className="mono text-[10px] tracking-[0.28em] text-space-400 w-12">L{i}</div>
                <div className="flex-1 glass corner-brackets px-5 py-4 flex items-center justify-between group-hover:border-accent-crimson transition-colors">
                  <div>
                    <div className="font-display text-lg text-space-50">{layer.t}</div>
                    <div className="mt-1 text-xs text-space-300">{layer.d}</div>
                  </div>
                  <span className="dot fire" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills */}
        <div className="card corner-brackets">
          <div className="mono text-[10px] tracking-[0.32em] text-space-300 mb-4">LANGUAGES & FRAMEWORKS</div>
          <div className="flex flex-wrap gap-2">
            {data.skills['frontend'].map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5 + i * 0.03 }}
                className="border border-line px-3 py-1 text-[11px] mono text-space-200 hover:border-accent-crimson hover:text-accent-crimson transition-colors"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
