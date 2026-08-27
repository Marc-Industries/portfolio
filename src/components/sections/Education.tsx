'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { Education as EducationT, Certification } from '@/lib/data';

export function Education({
  data,
  certifications,
}: {
  data: EducationT[];
  certifications: Certification[];
}) {
  return (
    <Section
      id="education"
      num="08"
      eyebrow="// EDUCATION & CERTIFICATIONS"
      title="Where I learned to engineer."
    >
      <div className="space-y-10">
        {/* Education */}
        <div className="space-y-4">
          <div className="mono text-[10px] tracking-[0.32em] text-accent-crimson">EDUCATION</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card corner-brackets"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`mono text-[9px] tracking-[0.32em] ${
                    e.status === 'ongoing' ? 'text-accent-amber' : 'text-accent-crimson'
                  }`}>
                    {e.status === 'ongoing' ? 'IN PROGRESS' : 'COMPLETED'}
                  </span>
                  <span className="dot fire" />
                </div>
                <h3 className="font-display text-lg text-space-50">{e.degree}</h3>
                <div className="mt-1 text-xs text-space-300">{e.field}</div>
                <div className="mt-3 mono text-[10px] tracking-[0.24em] text-space-400">{e.institution}</div>
                <div className="mt-1 mono text-[10px] tracking-[0.24em] text-space-500">
                  {e.start} → {e.end ?? 'PRESENT'}
                </div>
                {e.notes && <p className="mt-3 text-xs text-space-300 leading-relaxed">{e.notes}</p>}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-4">
          <div className="mono text-[10px] tracking-[0.32em] text-accent-crimson">CERTIFICATIONS</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {certifications.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="border border-line p-3 flex items-start justify-between hover:border-line-strong transition-colors"
              >
                <div className="flex-1">
                  <div className="font-display text-sm text-space-50">{c.name}</div>
                  <div className="mt-1 mono text-[10px] tracking-[0.24em] text-space-400">
                    {c.issuer}{c.year ? ` · ${c.year}` : ''}
                  </div>
                </div>
                <span className={`mono text-[9px] tracking-[0.32em] ml-3 ${
                  c.status === 'completed' ? 'text-accent-crimson' :
                  c.status === 'in-progress' ? 'text-accent-amber' : 'text-space-500'
                }`}>
                  {c.status === 'completed'   ? 'DONE' :
                   c.status === 'in-progress' ? 'ACTIVE' : 'PLANNED'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
