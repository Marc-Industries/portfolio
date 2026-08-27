'use client';

import Link from 'next/link';
import { data } from '@/lib/data';

export default function RecruiterView() {
  return (
    <main className="relative min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/"
          className="mono text-[10px] tracking-widest2 text-text-2 hover:text-accent-cyan inline-block mb-6"
        >
          ← BACK TO PORTFOLIO
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <span className="dot cyan" />
          <span className="mono text-[10px] tracking-widest2 text-text-2">RECRUITER VIEW · LOW ANIMATION</span>
        </div>

        <h1 className="h-display text-4xl md:text-5xl text-balance">
          {data.owner.name}
        </h1>
        <p className="text-text-1 mt-2 text-lg">
          Aerospace & Systems Engineer · Software · AI Automation
        </p>
        <p className="text-text-2 mt-1">{data.owner.location}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href={data.owner.linkedin} target="_blank" rel="noreferrer" className="btn btn-primary">LinkedIn ↗</a>
          <a href={data.owner.github} target="_blank" rel="noreferrer" className="btn">GitHub ↗</a>
          <a href={`mailto:${data.owner.email}`} className="btn">Email →</a>
          <a href="#" className="btn" onClick={(e) => { e.preventDefault(); window.print(); }}>Download CV (Print) ⤓</a>
        </div>

        <Section title="SUMMARY">
          <p>
            Final-year Aerospace Engineering student at the University of Padua with a strong
            software and AI-integration background. Active contributor to BEPI, a production
            multi-tenant system-engineering platform for CubeSat and SmallSat teams.
            Experience across the full ECSS lifecycle, FEM and vibration-test correlation
            (AlbaSat STM, 4S Symposium 2026), full-stack web development, event-driven
            integrations, and AI/automation workflows.
          </p>
        </Section>

        <Section title="EDUCATION">
          {data.education.map(e => (
            <div key={e.id} className="flex items-start justify-between gap-3 py-2 border-b border-line">
              <div>
                <div className="text-text-0 font-medium">{e.degree} — {e.field}</div>
                <div className="text-sm text-accent-cyan">{e.institution}</div>
                {e.notes && <div className="text-xs text-text-2 mt-1">{e.notes}</div>}
              </div>
              <div className="mono text-[10px] tracking-widest2 text-text-3 shrink-0">
                {e.start} → {e.end ?? 'PRESENT'} · {e.status.toUpperCase()}
              </div>
            </div>
          ))}
        </Section>

        <Section title="EXPERIENCE">
          {data.experience.map(e => (
            <div key={e.id} className="py-3 border-b border-line">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-text-0 font-medium">{e.role}</div>
                  <div className="text-sm text-accent-cyan">{e.company}</div>
                </div>
                <div className="mono text-[10px] tracking-widest2 text-text-3 shrink-0">
                  {e.start} → {e.end ?? 'PRESENT'}
                </div>
              </div>
              <p className="text-sm text-text-1 mt-2">{e.summary}</p>
              <ul className="mt-2 space-y-1 text-xs text-text-2">
                {e.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent-cyan shrink-0">›</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        <Section title="SELECTED PROJECTS">
          {data.projects.filter(p => p.featured).map(p => (
            <div key={p.id} className="py-3 border-b border-line">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-text-0 font-medium">{p.name}</div>
                  <div className="text-xs text-text-2 mt-0.5">{p.tagline}</div>
                </div>
                <div className="mono text-[10px] tracking-widest2 text-text-3 shrink-0">{p.year}</div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 6).map(s => (
                  <span key={s} className="mono text-[9px] tracking-widest2 px-2 py-0.5 border border-line text-text-1">{s}</span>
                ))}
              </div>
              <p className="text-xs text-text-1 mt-2 text-pretty">{p.result}</p>
            </div>
          ))}
        </Section>

        <Section title="CERTIFICATIONS">
          <ul className="space-y-1 text-sm text-text-1">
            {data.certifications.map(c => (
              <li key={c.id} className="flex items-center justify-between">
                <span>{c.name} — <span className="text-text-2">{c.issuer}</span></span>
                <span className="mono text-[10px] tracking-widest2 text-text-3">
                  {c.status === 'completed' ? 'VERIFIED' : c.status.toUpperCase()}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="SKILLS">
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-text-1">
            {Object.entries(data.skills).map(([k, v]) => (
              <div key={k}>
                <div className="mono text-[10px] tracking-widest2 text-text-2 mb-1">{k.toUpperCase()}</div>
                <div>{v.join(' · ')}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="PUBLICATION">
          <div className="text-text-1">
            <div className="text-text-0 font-medium">{data.publication.title}</div>
            <div className="text-xs text-text-2 mt-1">{data.publication.venue} · {data.publication.year}</div>
            <p className="text-xs text-text-2 mt-2 text-pretty">{data.publication.note}</p>
          </div>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <div className="flex items-center gap-3 mb-3">
        <span className="section-index">·</span>
        <span className="hairline w-12" />
        <span className="section-index opacity-60">{title}</span>
      </div>
      <div>{children}</div>
    </section>
  );
}
