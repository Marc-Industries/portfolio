'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { data } from '@/lib/data';

const METRICS = [
  { k: 'Tables',   v: '22', d: 'Reusable schema across all subsystems.' },
  { k: 'RLS',      v: '79', d: 'Row-level security policies, end-to-end.' },
  { k: 'Triggers', v: '18', d: 'Event-driven automation across the platform.' },
  { k: 'Pages',    v: '11', d: 'Operational views for every engineering role.' },
  { k: 'Integrations', v: '9', d: 'External systems connected via webhooks.' },
  { k: 'Stakeholder roles', v: '8', d: 'Granular permissions and audit trails.' },
];

export function MBSE() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section
      id="mbse"
      num="03"
      eyebrow="// MBSE · DIGITAL ENGINEERING"
      title="A flagship digital-twin platform."
      lede="A system-engineering platform that turns spreadsheet sprawl into a single source of truth — requirements, configuration, FMECA, integration, all under row-level security."
    >
      <div ref={ref} className="space-y-10">
        {/* BEPI flagship card */}
        <div className="card corner-brackets relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-crimson to-transparent" />
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="mono text-[10px] tracking-[0.32em] text-accent-crimson mb-2">FLAGSHIP PLATFORM · PROFESSIONAL</div>
              <h3 className="text-3xl font-display text-space-50">BEPI · System Engineering Platform</h3>
            </div>
            <span className="mono text-[10px] tracking-[0.28em] text-space-400">CASE STUDY</span>
          </div>

          <p className="text-base text-space-200 leading-relaxed max-w-4xl text-pretty">
            A digital twin of a satellite programme: requirements, FMECA, configuration baselines,
            reviews, and a stakeholder-facing dashboard — all backed by event-driven logic. This is
            a high-level case study; specific implementation details remain proprietary.
          </p>

          {/* Metrics grid */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-line">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.k}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="bg-space-900 p-4"
              >
                <div className="font-display text-3xl text-accent-crimson">{m.v}</div>
                <div className="mt-1 mono text-[9px] tracking-[0.28em] text-space-300 uppercase">{m.k}</div>
                <div className="mt-2 text-[11px] text-space-400 leading-snug">{m.d}</div>
              </motion.div>
            ))}
          </div>

          {/* Pillars */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { t: 'Digital Twin',  d: 'Single source of truth for requirements, configuration and review state.' },
              { t: 'Stakeholder UI', d: 'Role-aware dashboards; everyone sees exactly what their role permits.' },
              { t: 'Event-Driven',  d: 'Webhooks, triggers and integrations automate the engineering workflow end-to-end.' },
            ].map((p, i) => (
              <motion.div
                key={p.t}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="border border-line p-4 relative group hover:border-line-strong transition-colors"
              >
                <div className="absolute -top-2 left-3 w-2 h-2 bg-accent-crimson rotate-45" />
                <div className="font-display text-lg text-space-50 mb-1">{p.t}</div>
                <div className="text-xs text-space-300 leading-relaxed">{p.d}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <a href="/projects/bepi" className="btn btn-primary">
              Read full case study <span>→</span>
            </a>
          </div>
        </div>

        {/* Skills grid */}
        <div className="card corner-brackets">
          <div className="mono text-[10px] tracking-[0.32em] text-space-300 mb-4">SYSTEMS ENGINEERING TOOLBOX</div>
          <div className="flex flex-wrap gap-2">
            {data.skills['systems'].map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.5 + i * 0.04 }}
                className="border border-line-strong px-3 py-1.5 text-xs mono text-space-200 hover:border-accent-crimson hover:text-accent-crimson transition-colors"
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
