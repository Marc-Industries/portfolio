'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionProps {
  id: string;
  num: string;
  eyebrow: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
  align?: 'left' | 'center';
}

export function Section({ id, num, eyebrow, title, lede, children, align = 'left' }: SectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });

  return (
    <section
      id={id}
      ref={ref}
      className="relative z-10 py-24 md:py-32 scroll-mt-32"
    >
      <div className={`mx-auto max-w-7xl px-6 ${align === 'center' ? 'text-center' : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="mono text-[11px] tracking-[0.32em] text-accent-crimson">{num}</span>
          <span className="h-px w-12 bg-accent-crimson/40" />
          <span className="mono text-[11px] tracking-[0.32em] text-space-300 uppercase">{eyebrow}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.05, ease: 'easeOut' }}
          className="h-display text-3xl md:text-5xl text-balance text-space-50"
        >
          {title}
        </motion.h2>

        {lede && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="mt-4 text-space-200 max-w-2xl text-pretty text-base md:text-lg leading-relaxed"
          >
            {lede}
          </motion.p>
        )}

        <div className="mt-12">
          {children}
        </div>
      </div>
    </section>
  );
}
