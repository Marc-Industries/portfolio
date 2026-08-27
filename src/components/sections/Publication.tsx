'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/Section';

export function Publication() {
  return (
    <Section
      id="publication"
      num="09"
      eyebrow="// PUBLICATION"
      title="Where the work speaks in public."
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card corner-brackets relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 danger-stripe w-1.5 h-full" aria-hidden="true" />
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-accent-crimson/10 blur-3xl" />

        <div className="flex items-start justify-between gap-6 relative">
          <div className="flex-1">
            <div className="mono text-[10px] tracking-[0.32em] text-accent-crimson mb-3">
              CONFERENCE PAPER · ACCEPTED
            </div>
            <h3 className="font-display text-2xl text-space-50 text-balance leading-tight">
              Simulations and Vibration Test Results for the AlbaSat STM
            </h3>
            <p className="mt-3 text-sm text-space-300 leading-relaxed max-w-3xl text-pretty">
              Structural dynamics FEM predictions correlated with measured vibration test data on the
              AlbaSat Structural Thermal Model. Modal parameters, mode shapes, and test-to-analysis
              agreement are presented within an ECSS-aligned qualification flow.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="border border-line px-3 py-1.5 mono text-[10px] tracking-[0.28em] text-space-300">
                4S SYMPOSIUM 2026
              </div>
              <div className="border border-line px-3 py-1.5 mono text-[10px] tracking-[0.28em] text-space-300">
                SMALL SATELLITES
              </div>
              <div className="border border-line px-3 py-1.5 mono text-[10px] tracking-[0.28em] text-space-300">
                ESA · ASI · UNIPD
              </div>
            </div>
          </div>

          <div className="hidden md:block flex-shrink-0">
            <div className="w-32 h-32 border border-line-strong relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mono text-[9px] tracking-[0.32em] text-accent-crimson">PAPER</div>
                  <div className="font-display text-4xl text-space-50 mt-1">2026</div>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent-crimson" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-accent-crimson" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-accent-crimson" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-accent-crimson" />
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
