'use client';

import Link from 'next/link';
import { data } from '@/lib/data';

export default function EngineeringView() {
  const bepi = data.projects.find(p => p.id === 'bepi')!;
  const sim = data.projects.find(p => p.id === 'space-mission-sim')!;

  return (
    <main className="relative min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <Link
          href="/"
          className="mono text-[10px] tracking-widest2 text-text-2 hover:text-accent-cyan inline-block mb-6"
        >
          ← BACK TO PORTFOLIO
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <span className="dot amber" />
          <span className="mono text-[10px] tracking-widest2 text-text-2">ENGINEERING VIEW · DEEP TECHNICAL</span>
        </div>

        <h1 className="h-display text-4xl md:text-5xl text-balance">
          Engineering notes
        </h1>
        <p className="text-text-2 mt-2">
          Architecture, stack, deployment and lessons for the flagship projects.
        </p>

        <Case title={bepi.name} subtitle={bepi.tagline} demo={bepi.demo}>
          <Grid items={[
            { k: 'STACK',         v: 'Python 3.11 · Streamlit 1.59 · Supabase · FastAPI · Plotly · Pydantic' },
            { k: 'DB',            v: 'PostgreSQL 15 via Supabase (PostgREST)' },
            { k: 'AUTH',          v: 'Supabase GoTrue + JWT + cookie-based session restore (7d TTL)' },
            { k: 'MULTI-TENANT',  v: 'Row Level Security on every mission-scoped table' },
            { k: 'RBAC',          v: '8 roles (ADMIN, PM, SE, SSL, QA, CM, AIT, USER) with per-action permissions' },
            { k: 'DEPLOY',        v: 'Streamlit Cloud (auto-deploy from main) + Supabase Cloud' },
            { k: 'TESTING',       v: 'pytest unit + integration with fake client in memory' },
          ]} />
          <div className="mt-6">
            <Sub>Architecture</Sub>
            <p className="text-sm text-text-1">
              Streamlit front-end with @st.dialog and @st.cache_resource; Supabase as the
              source of truth for missions, product tree, budgets (mass + per-mode power),
              requirements, risks, FMECA, schedule (CPM/Gantt), reviews, and team. FastAPI
              optional backend for non-Streamlit clients. Edge Functions (Deno) for trust
              boundaries like email invitations. Migrations are SQL files applied with
              <span className="mono"> supabase db push</span>; the live schema snapshot
              lives in <span className="mono"> supabase/schema.sql</span>.
            </p>
          </div>
          <div className="mt-6">
            <Sub>Security notes</Sub>
            <ul className="text-sm text-text-1 space-y-1.5">
              <li>· Service client (SUPABASE_SERVICE_ROLE_KEY) is reserved for migrations and Edge Functions only. All user writes go through the user client (anon key + JWT) so RLS is always enforced.</li>
              <li>· Authoritative role lives in <span className="mono">mission_members</span> under RLS — never in <span className="mono">user_metadata</span> (privilege-escalation vector, fixed).</li>
              <li>· JWT refresh handled in <span className="mono">supabase_client.py</span> with token rotation in <span className="mono">st.session_state</span>; refresh token also persisted in a cookie to survive F5.</li>
              <li>· Audit log (<span className="mono">approval_log</span>) tracks critical changes.</li>
            </ul>
          </div>
          <div className="mt-6">
            <Sub>Performance</Sub>
            <ul className="text-sm text-text-1 space-y-1.5">
              <li>· <span className="mono">@st.cache_resource</span> for the service client (1 instance per process).</li>
              <li>· Per-session caching of product tree and equipment budgets with explicit invalidation on every save point — avoids the 18× reload / render antipattern.</li>
              <li>· All scientific deps pinned to a tested set, with pre-deploy import check on a clean venv.</li>
            </ul>
          </div>
          <div className="mt-6">
            <Sub>Notable engineering decisions</Sub>
            <ul className="text-sm text-text-1 space-y-1.5">
              <li>· Operating-Modes as a per-equipment power × mode matrix, with UNIQUE <span className="mono">(node_id, budget_type, operating_mode_id)</span>.</li>
              <li>· Settings UI enforces a hard cap of 10 modes per mission.</li>
              <li>· ECSS margins rolled up per ECSS-E-ST-10-12C; deliverable versioning per phase A → E.</li>
            </ul>
          </div>
        </Case>

        <Case title={sim.name} subtitle={sim.tagline} repo={sim.repo}>
          <Grid items={[
            { k: 'FRONTEND', v: 'React + Vite + Tailwind, deployed on GitHub Pages' },
            { k: 'BACKEND',  v: 'FastAPI on Render, configurable via .env' },
            { k: 'ROLE',     v: sim.role },
          ]} />
          <div className="mt-6">
            <Sub>Architecture</Sub>
            <p className="text-sm text-text-1">
              Split frontend / backend with a clear API contract. The frontend handles
              visualization and timeline scrubbing; the backend runs propagators and returns
              structured mission events. This separation makes it cheap to swap either side
              independently (different propagator, different visualization library).
            </p>
          </div>
          <div className="mt-6">
            <Sub>Deployment</Sub>
            <ul className="text-sm text-text-1 space-y-1.5">
              <li>· GitHub Pages auto-deploys on push to <span className="mono">gh-pages</span> branch.</li>
              <li>· Render runs the FastAPI service via <span className="mono">start.sh</span>.</li>
              <li>· All environment values are .env-driven.</li>
            </ul>
          </div>
        </Case>

        <div className="mt-12 flex gap-3">
          <Link href="/" className="btn">← Back to portfolio</Link>
          <Link href="/recruiter.html" className="btn">Recruiter View →</Link>
        </div>
      </div>
    </main>
  );
}

function Case({ title, subtitle, demo, repo, children }: {
  title: string; subtitle: string; demo?: string; repo?: string; children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <div className="flex items-center gap-3 mb-3">
        <span className="section-index">·</span>
        <span className="hairline w-12" />
        <span className="section-index opacity-60">CASE STUDY</span>
      </div>
      <h2 className="h-display text-2xl md:text-3xl">{title}</h2>
      <p className="text-text-2 mt-1 text-pretty">{subtitle}</p>
      {(demo || repo) && (
        <div className="mt-3 flex flex-wrap gap-3">
          {demo && <a href={demo} target="_blank" rel="noreferrer" className="btn btn-primary">Live Demo ↗</a>}
          {repo && <a href={repo} target="_blank" rel="noreferrer" className="btn">Source ↗</a>}
        </div>
      )}
      <div className="mt-6 card !p-6">{children}</div>
    </section>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return <h3 className="mono text-[10px] tracking-widest2 text-text-2 mb-2">{children}</h3>;
}

function Grid({ items }: { items: { k: string; v: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
      {items.map(i => (
        <div key={i.k} className="flex flex-col">
          <span className="mono text-[10px] tracking-widest2 text-text-3">{i.k}</span>
          <span className="text-text-0 mt-0.5">{i.v}</span>
        </div>
      ))}
    </div>
  );
}
