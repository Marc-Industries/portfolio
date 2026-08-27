'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface CaseStudyProps {
  project: {
    name: string;
    tagline: string;
    role: string;
    problem: string;
    architecture: string;
    stack: string[];
    result: string;
    metrics?: { label: string; value: string }[];
    repo?: string;
    demo?: string;
    year: string;
    visibility: string;
  };
  challenges: string[];
  solution: string;
  lessons: string[];
}

const SECTION_LABELS = [
  '01 PROBLEM',
  '02 ARCHITECTURE',
  '03 TECHNOLOGIES',
  '04 MY ROLE',
  '05 ENGINEERING CHALLENGES',
  '06 SOLUTION',
  '07 RESULT',
  '08 LESSONS LEARNED',
  '09 DEMO / REPOSITORY',
];

export function CaseStudy({ project, challenges, solution, lessons }: CaseStudyProps) {
  return (
    <main className="relative min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <Link
          href="/"
          className="mono text-[10px] tracking-widest2 text-text-2 hover:text-accent-cyan inline-block mb-8"
        >
          ← BACK TO PORTFOLIO
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className={`dot ${project.visibility === 'PUBLIC' ? 'emerald' : 'amber'}`} />
            <span className="mono text-[10px] tracking-widest2 text-text-2">
              {project.visibility.toUpperCase()} · {project.year}
            </span>
          </div>
          <h1 className="h-display text-4xl md:text-6xl text-balance">{project.name}</h1>
          <p className="text-text-1 mt-3 text-lg max-w-3xl text-pretty">{project.tagline}</p>
        </motion.div>

        {/* Metrics strip */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {project.metrics.map(m => (
              <div key={m.label} className="card !p-3 text-center">
                <div className="text-2xl mono text-accent-cyan">{m.value}</div>
                <div className="mono text-[9px] tracking-widest2 text-text-3 mt-1">
                  {m.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 space-y-16">
          <Block num="01" label="PROBLEM" body={project.problem} />
          <Block num="02" label="ARCHITECTURE" body={project.architecture} />
          <Block num="03" label="TECHNOLOGIES" body={
            <div className="flex flex-wrap gap-2">
              {project.stack.map(s => (
                <span key={s} className="mono text-[10px] tracking-widest2 px-2.5 py-1.5 border border-line text-text-0">
                  {s}
                </span>
              ))}
            </div>
          } />
          <Block num="04" label="MY ROLE" body={project.role} />
          <Block num="05" label="ENGINEERING CHALLENGES" body={
            <ul className="space-y-2">
              {challenges.map((c, i) => (
                <li key={i} className="flex gap-2 text-sm text-text-1">
                  <span className="text-accent-cyan shrink-0">›</span>
                  <span className="text-pretty">{c}</span>
                </li>
              ))}
            </ul>
          } />
          <Block num="06" label="SOLUTION" body={solution} />
          <Block num="07" label="RESULT" body={project.result} />
          <Block num="08" label="LESSONS LEARNED" body={
            <ul className="space-y-2">
              {lessons.map((l, i) => (
                <li key={i} className="flex gap-2 text-sm text-text-1">
                  <span className="text-accent-amber shrink-0">›</span>
                  <span className="text-pretty">{l}</span>
                </li>
              ))}
            </ul>
          } />

          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="section-index">09</span>
              <span className="hairline w-12" />
              <span className="section-index opacity-60">DEMO / REPOSITORY</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
                  Live Demo ↗
                </a>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noreferrer" className="btn">
                  Source ↗
                </a>
              )}
              <Link href="/" className="btn">← Back to portfolio</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Block({ num, label, body }: { num: string; label: string; body: React.ReactNode }) {
  return (
    <section className="grid md:grid-cols-12 gap-6">
      <div className="md:col-span-3">
        <div className="flex items-center gap-3">
          <span className="section-index">{num}</span>
          <span className="hairline w-8" />
        </div>
        <div className="mt-2 mono text-[10px] tracking-widest2 text-text-2">{label}</div>
      </div>
      <div className="md:col-span-9 text-text-1 leading-relaxed text-pretty">
        {body}
      </div>
    </section>
  );
}
