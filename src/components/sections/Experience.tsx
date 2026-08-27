'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { Experience as ExperienceT } from '@/lib/data';

export function Experience({ data }: { data: ExperienceT[] }) {
  return (
    <Section
      id="experience"
      num="07"
      eyebrow="// EXPERIENCE"
      title="Where I've been working."
      lede="Roles, missions, and the people I've built with."
    >
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-crimson via-accent-blood to-transparent" />

        <div className="space-y-12">
          {data.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start ${
                i % 2 === 0 ? '' : 'md:rtl'
              }`}
            >
              {/* Timeline node */}
              <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 w-3 h-3 bg-accent-crimson rotate-45 z-10" />

              {/* Date column */}
              <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12 md:text-left'}`}>
                <div className="mono text-[10px] tracking-[0.28em] text-accent-crimson">
                  {e.start} → {e.end ?? 'PRESENT'}
                </div>
                {e.location && (
                  <div className="mt-1 mono text-[10px] tracking-[0.28em] text-space-400">{e.location}</div>
                )}
              </div>

              {/* Content card */}
              <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pl-12' : 'md:order-1 md:pr-12'}`}>
                <div className="card corner-brackets relative">
                  <div className="mono text-[9px] tracking-[0.32em] text-space-400 mb-2">
                    {e.domain.toUpperCase()} · {e.visibility}
                  </div>
                  <h3 className="font-display text-xl text-space-50">{e.role}</h3>
                  <div className="mt-1 mono text-xs text-accent-crimson">{e.company}</div>
                  <p className="mt-4 text-sm text-space-200 leading-relaxed text-pretty">{e.summary}</p>
                  {e.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {e.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-space-300 leading-relaxed">
                          <span className="dot fire mt-1.5 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
