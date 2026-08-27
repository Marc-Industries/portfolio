'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Project } from '@/lib/data';
import { imgCandidates } from '@/lib/assets';

const FILTERS = [
  { id: 'all',         label: 'All' },
  { id: 'featured',    label: 'Featured' },
  { id: 'aerospace',   label: 'Aerospace' },
  { id: 'mbse',        label: 'MBSE' },
  { id: 'software',    label: 'Software' },
  { id: 'ai',          label: 'AI' },
  { id: 'integration', label: 'Integration' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

export function Projects({ data }: { data: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState<FilterId>('all');

  const filtered = data.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'featured') return p.featured;
    return p.category === filter;
  });

  return (
    <Section
      id="projects"
      num="06"
      eyebrow="// PROJECTS"
      title="Selected work, end to end."
      lede="From a 1U CubeSat structural qualification to a multi-tenant MBSE platform and a network of automation tools."
    >
      <div ref={ref} className="space-y-8">
        {/* Filter chips */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`mono text-[11px] tracking-[0.24em] uppercase px-3 py-1.5 border transition-all ${
                filter === f.id
                  ? 'bg-accent-crimson border-accent-crimson text-space-50'
                  : 'border-line text-space-300 hover:border-accent-crimson hover:text-accent-crimson'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Featured row (always 3 cols when present) */}
        {data.filter((p) => p.featured).length > 0 && (filter === 'all' || filter === 'featured') && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.filter((p) => p.featured).map((p, i) => (
              <FeaturedCard key={p.id} project={p} index={i} inView={inView} />
            ))}
          </div>
        )}

        {/* Non-featured grid */}
        {(filter !== 'all' && filter !== 'featured') && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p, i) => (
              <CompactCard key={p.id} project={p} index={i} inView={inView} />
            ))}
          </div>
        )}

        {/* All + Featured: also show compact below */}
        {(filter === 'all' || filter === 'featured') && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.filter((p) => !p.featured).map((p, i) => (
              <CompactCard key={p.id} project={p} index={i} inView={inView} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

function FeaturedCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  const [src, setSrc] = useState<string | null>(null);
  useState(() => { /* placeholder for image probe */ });

  // Probe for project-specific still (P1, P2, ...)
  if (typeof window !== 'undefined' && src === null) {
    const probeKey = project.id === 'bepi' ? 'P1' :
                     project.id === 'albasat' ? 'P2' :
                     project.id === 'space-mission-sim' ? 'P3' :
                     project.id === 'drivegen' ? 'P4' :
                     project.id === 'instant-translate' ? 'P5' :
                     project.id === 'vsl-visualizer' ? 'P6' :
                     project.id === 'poodl-meeting' ? 'P7' :
                     project.id === 'fullship' ? 'P8' :
                     project.id === 'spese-smart' ? 'P9' :
                     project.id === 'neurolex' ? 'P10' :
                     project.id === 'ghl-orchestrator' ? 'P11' : null;
    if (probeKey) {
      // Use imgCandidates via direct fetch check would need Promise — keep simple:
      // Try the most common ext via dynamic img
      const testImg = new Image();
      testImg.onload = () => setSrc(`/assets/img/${probeKey}.jpg`);
      testImg.onerror = () => setSrc('');
      testImg.src = `/assets/img/${probeKey}.jpg`;
    } else {
      setSrc('');
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="card corner-brackets group relative overflow-hidden h-full flex flex-col"
    >
      {/* Visual area */}
      <div className="relative h-48 -m-6 mb-4 overflow-hidden border-b border-line">
        {src ? (
          <img src={src} alt="" className="w-full h-full object-cover" style={{ filter: 'contrast(1.05) saturate(1.1) brightness(0.7)' }} />
        ) : (
          <ProjectVisualPlaceholder visual={project.visual} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-space-900/40 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="mono text-[9px] tracking-[0.32em] text-accent-crimson bg-space-900/80 px-2 py-1 border border-line">
            {project.category.toUpperCase()}
          </span>
          {project.visibility !== 'PUBLIC' && (
            <span className="mono text-[9px] tracking-[0.28em] text-space-300 bg-space-900/80 px-2 py-1 border border-line">
              {project.visibility === 'PRIVATE / REDACTED' ? 'PRIVATE' : 'HIGH-LEVEL'}
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3 mono text-[9px] tracking-[0.28em] text-space-300">
          {project.year}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="font-display text-xl text-space-50 group-hover:text-accent-crimson transition-colors">
          {project.name}
        </h3>
        <p className="mt-1 text-xs text-space-300 leading-relaxed">{project.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((s) => (
            <span key={s} className="mono text-[9px] px-1.5 py-0.5 border border-line text-space-400">
              {s}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="mono text-[9px] px-1.5 py-0.5 text-space-500">+{project.stack.length - 4}</span>
          )}
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <a href={`/projects/${project.slug}`} className="mono text-[10px] tracking-[0.28em] text-accent-crimson hover:text-accent-fire transition-colors uppercase">
            Case Study →
          </a>
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className="mono text-[10px] tracking-[0.28em] text-space-400 hover:text-accent-crimson transition-colors uppercase">
              Repo ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function CompactCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="card corner-brackets group hover:border-line-strong"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="mono text-[9px] tracking-[0.32em] text-accent-crimson">{project.category.toUpperCase()}</span>
        <span className="mono text-[9px] tracking-[0.28em] text-space-500">{project.year}</span>
      </div>
      <h3 className="font-display text-base text-space-50 group-hover:text-accent-crimson transition-colors">
        {project.name}
      </h3>
      <p className="mt-1 text-xs text-space-300 leading-snug line-clamp-2">{project.tagline}</p>
      <div className="mt-3 flex items-center justify-between">
        <a href={`/projects/${project.slug}`} className="mono text-[10px] tracking-[0.28em] text-accent-crimson uppercase">
          Read →
        </a>
        {project.visibility !== 'PUBLIC' && (
          <span className="mono text-[9px] tracking-[0.28em] text-space-500">
            {project.visibility === 'PRIVATE / REDACTED' ? 'PRIVATE' : 'CASE'}
          </span>
        )}
      </div>
    </motion.article>
  );
}

/** Fallback geometric placeholder when no project still is present yet. */
function ProjectVisualPlaceholder({ visual }: { visual: Project['visual'] }) {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-space-900 via-space-950 to-space-900">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        {visual === 'satellite' && (
          <g>
            <rect x="80" y="40" width="40" height="20" fill="none" stroke="#D43F3F" strokeWidth={0.5} />
            <rect x="50" y="45" width="30" height="10" fill="none" stroke="#FF5C3A" strokeWidth={0.5} />
            <rect x="120" y="45" width="30" height="10" fill="none" stroke="#FF5C3A" strokeWidth={0.5} />
            <line x1="100" y1="35" x2="100" y2="20" stroke="#D43F3F" strokeWidth={0.5} />
            <circle cx="100" cy="18" r="2" fill="#FF5C3A" />
          </g>
        )}
        {visual === 'orbit' && (
          <g>
            <ellipse cx="100" cy="50" rx="60" ry="20" fill="none" stroke="#D43F3F" strokeWidth={0.5} />
            <ellipse cx="100" cy="50" rx="40" ry="13" fill="none" stroke="#FF5C3A" strokeWidth={0.5} />
            <circle cx="100" cy="50" r="8" fill="none" stroke="#D43F3F" strokeWidth={0.5} />
            <circle cx="160" cy="50" r="2" fill="#FF5C3A" />
          </g>
        )}
        {visual === 'language' && (
          <g>
            <text x="100" y="55" textAnchor="middle" fill="#D43F3F" fontFamily="JetBrains Mono" fontSize="24" fontWeight="600">Aa</text>
          </g>
        )}
        {visual === 'finance' && (
          <g>
            <polyline points="20,80 50,60 80,70 110,40 140,55 170,30" fill="none" stroke="#D43F3F" strokeWidth={1} />
            <line x1="20" y1="80" x2="180" y2="80" stroke="#7A2E2E" strokeWidth={0.5} />
          </g>
        )}
        {visual === 'workflow' && (
          <g>
            <circle cx="40" cy="50" r="8" fill="none" stroke="#D43F3F" />
            <circle cx="100" cy="50" r="8" fill="none" stroke="#FF5C3A" />
            <circle cx="160" cy="50" r="8" fill="none" stroke="#D43F3F" />
            <line x1="48" y1="50" x2="92" y2="50" stroke="#7A2E2E" />
            <line x1="108" y1="50" x2="152" y2="50" stroke="#7A2E2E" />
          </g>
        )}
        {visual === 'cloud' && (
          <g>
            <ellipse cx="100" cy="50" rx="50" ry="20" fill="none" stroke="#D43F3F" />
            <circle cx="80" cy="50" r="3" fill="#FF5C3A" />
            <circle cx="120" cy="50" r="3" fill="#F2B441" />
            <circle cx="100" cy="45" r="3" fill="#FF5C3A" />
          </g>
        )}
        {visual === 'shipping' && (
          <g>
            <rect x="60" y="40" width="80" height="30" fill="none" stroke="#D43F3F" />
            <line x1="100" y1="40" x2="100" y2="70" stroke="#FF5C3A" />
            <line x1="60" y1="55" x2="140" y2="55" stroke="#7A2E2E" />
          </g>
        )}
        {visual === 'timezone' && (
          <g>
            <circle cx="100" cy="50" r="30" fill="none" stroke="#D43F3F" />
            <ellipse cx="100" cy="50" rx="30" ry="10" fill="none" stroke="#FF5C3A" />
            <line x1="70" y1="50" x2="130" y2="50" stroke="#D43F3F" />
          </g>
        )}
        {visual === 'automation' && (
          <g>
            <path d="M 100 25 A 25 25 0 1 1 75 50" fill="none" stroke="#D43F3F" />
            <polygon points="75,45 75,55 65,50" fill="#FF5C3A" />
          </g>
        )}
      </svg>
      {/* Subtle scan line */}
      <div className="scan-line" aria-hidden="true" />
    </div>
  );
}
