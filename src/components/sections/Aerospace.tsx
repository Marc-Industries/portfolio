'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { data } from '@/lib/data';

const PHASES = [
  { id: 'A', label: 'Concept',  desc: 'Mission analysis, feasibility, concept-of-operations.' },
  { id: 'B', label: 'Preliminary', desc: 'Requirements baseline, breadboards, trade studies.' },
  { id: 'C', label: 'Detailed', desc: 'Design, FMECA, qualification, integration testing.' },
  { id: 'D', label: 'Qualification', desc: 'Qualification & acceptance reviews (QR / AR).' },
  { id: 'E', label: 'Operations', desc: 'Launch, commissioning, in-orbit ops, end-of-life.' },
];

export function Aerospace() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section
      id="aerospace"
      num="02"
      eyebrow="// AEROSPACE & SPACE SYSTEMS"
      title="From concept to orbit."
      lede="ECSS-aligned engineering across the full space mission lifecycle — requirements, structure, thermal, and operations."
    >
      <div ref={ref} className="space-y-12">
        {/* ECSS lifecycle */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="mono text-[11px] tracking-[0.32em] text-accent-crimson">ECSS LIFECYCLE</div>
            <div className="h-px flex-1 bg-gradient-to-r from-accent-crimson/40 to-transparent" />
          </div>

          <div className="relative">
            {/* Horizontal line */}
            <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-accent-blood via-accent-crimson to-accent-blood" />

            <div className="grid grid-cols-5 gap-2 relative">
              {PHASES.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="relative pt-14"
                >
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full glass-strong border-2 border-accent-crimson flex items-center justify-center mono text-[10px] text-accent-crimson">
                    {p.id}
                  </div>
                  <div className="text-center">
                    <div className="font-display text-base text-space-50">{p.label}</div>
                    <div className="mt-2 text-xs text-space-300 leading-relaxed">{p.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Two columns: skills + flagship */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Skills */}
          <div className="lg:col-span-2 card corner-brackets">
            <div className="mono text-[10px] tracking-[0.32em] text-space-300 mb-4">CORE STACK</div>
            <div className="space-y-3">
              {data.skills['aerospace'].map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="dot fire" />
                  <span className="text-sm text-space-100">{s}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Flagship: AlbaSat */}
          <div className="lg:col-span-3 card corner-brackets relative overflow-hidden">
            <div className="absolute top-0 right-0 danger-stripe w-1.5 h-full" aria-hidden="true" />
            <div className="flex items-center justify-between mb-4">
              <div className="mono text-[10px] tracking-[0.32em] text-accent-crimson">FLAGSHIP · CUBESAT</div>
              <span className="mono text-[10px] tracking-[0.28em] text-space-400">PHASE C</span>
            </div>
            <h3 className="text-2xl font-display text-space-50 mb-3">AlbaSat</h3>
            <p className="text-sm text-space-200 leading-relaxed">
              A 1U CubeSat designed, integrated and qualified as part of an ECSS-aligned university
              team project. Mission: low-cost Earth observation with on-board processing and a
              student-friendly ground segment.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="border border-line p-3">
                <div className="mono text-[9px] tracking-[0.28em] text-space-400">FORM FACTOR</div>
                <div className="mt-1 font-display text-space-50">1U</div>
              </div>
              <div className="border border-line p-3">
                <div className="mono text-[9px] tracking-[0.28em] text-space-400">STATUS</div>
                <div className="mt-1 font-display text-accent-crimson">Phase C</div>
              </div>
              <div className="border border-line p-3">
                <div className="mono text-[9px] tracking-[0.28em] text-space-400">STANDARD</div>
                <div className="mt-1 font-display text-space-50">ECSS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
