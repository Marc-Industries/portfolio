import { data } from '@/lib/data';
import { CaseStudy } from '@/components/CaseStudyLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return data.projects.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = data.projects.find(p => p.slug === params.slug);
  if (!p) return { title: 'Project not found' };
  return {
    title: `${p.name} — Case Study`,
    description: p.tagline,
  };
}

const CHALLENGES: Record<string, string[]> = {
  bepi: [
    'Operating-Modes feature required per-equipment power × mode matrix — every equipment could have N rows in the budgets table per mode, with cache invalidation across save points.',
    'Privilege escalation via Supabase user_metadata — a user could self-promote to ADMIN. The fix: make mission_members the authoritative role source under RLS.',
    'RLS policy coverage for multi-tenant data (missions, equipment, budgets, requirements) with separate user / service clients.',
    'Plotly / Streamlit Cloud regressions breaking deploys; pinning all scientific dependencies after a venv rebuild.',
  ],
  'space-mission-sim': [
    'Decoupling orbital math from the UI so the same backend can serve a web UI today and other clients later.',
    'Keeping the bundle small and deployable on GitHub Pages while the backend runs on Render.',
    'Designing a clean API surface for mission events, propagators and timeline scrubbing.',
  ],
  albasat: [
    'FEM correlation: matching simulated modal parameters against measured vibration test data within engineering tolerance.',
    'ECSS-aligned documentation flow from CAD (SolidWorks) to FE (ANSYS) to test campaign to PDR/CDR deliverables.',
    'Working inside a student team with limited test resources — every test had to count.',
  ],
  'vsl-visualizer': [
    'Rendering an async pipeline as a node graph that stays readable at any stage count.',
    'Streaming live throughput / latency / error rate from a backend pipeline.',
  ],
  drivegen: [
    'Connecting an LLM to the Google Drive API via OAuth2 with refresh-token rotation.',
    'Producing reliable document structure (sections, headings) from arbitrary input payloads.',
  ],
  'instant-translate': [
    'Building a translation helper with plural / gender / context variants without runtime dependencies.',
    'Keeping the bundle under 2 KB minified.',
  ],
  'spese-smart': [
    'Categorization rules that the user can override without breaking the import flow.',
    'A local-first design that keeps financial data private.',
  ],
  neurolex: [
    'Implementing a credible SM-2-inspired spaced-repetition scheduler in pure JavaScript.',
  ],
  fullship: [
    'Tolerating carrier-portal UI changes with headless browser collectors.',
    'Normalizing events from multiple carriers into a single feed.',
  ],
  poodl: [
    'Visualizing timezone overlap on a 3D globe in a static page (no backend).',
    'Generating ICS files client-side with the correct UTC offsets.',
  ],
  'ghl-orchestrator': [
    'Round-robin distribution that survives vendor flakiness and webhook retries without double-assigning.',
    'Bidirectional operational sync without feedback loops.',
    'Edge cases: missing fields, retried events, manual overrides — all needed stable idempotency keys.',
  ],
};

const SOLUTIONS: Record<string, string> = {
  bepi:
    'Operating-Modes delivered as a dedicated settings UI + budget editor matrix, with a UNIQUE (node_id, budget_type, operating_mode_id) constraint and explicit session_state invalidation on every save point. The privilege-escalation vector was closed by making mission_members the single source of truth for role, with all writes forced through the user client (RLS-aware) and only the service client reserved for migrations and Edge Functions. All scientific dependencies are pinned to a tested set, with a pre-deploy import check.',
  'space-mission-sim':
    'A clean split: a React + Tailwind frontend on GitHub Pages for visualization and timeline scrubbing, and a FastAPI backend on Render that runs propagators and returns structured mission events. Configurable via .env, deployable with the included start.sh.',
  albasat:
    'A SolidWorks mechanical model fed into ANSYS for modal analysis, then a vibration test campaign to measure the actual modal parameters. Correlation of FE vs test data informed the STM design and the publication at 4S Symposium 2026.',
  'vsl-visualizer':
    'A real-time event stream rendered as an interactive node graph with live throughput / error / latency. Built to be both an ops tool and a stakeholder demo surface.',
  drivegen:
    'A cloud function that takes a template + payload, calls the LLM with structured output, and pushes the rendered file into a user-authorized Google Drive folder via the Drive API.',
  'instant-translate':
    'A tiny key-lookup library with plural / gender / context variants and zero dependencies. < 2 KB minified.',
  'spese-smart':
    'A local-first SPA with CSV import, rule-based categorization, and monthly trend visualization. All data stays in the browser.',
  neurolex:
    'CRA-based SPA with localStorage for decks and an SM-2-inspired scheduler.',
  fullship:
    'Headless browser collectors that push normalized events into Postgres; FastAPI exposes a query layer for the dashboard.',
  poodl:
    'A static page with a 3D globe; users click their cities to see working-hour overlap and copy an ICS file.',
  'ghl-orchestrator':
    'Event-driven lead distribution with idempotency keys, round-robin assignment, and bidirectional operational sync guarded against feedback loops. Production-stable for the client team.',
};

const LESSONS: Record<string, string[]> = {
  bepi: [
    'RLS alone is not enough — refresh-token rotation and cookie persistence are needed to avoid reading another tenant\'s data on an expired JWT.',
    'Cache invalidation is the hard part of Streamlit. Pop session_state on every save point.',
    'Pin every scientific dependency. Plotly deprecations can silently break a deploy.',
    'Never trust user-writable metadata for role. The authoritative role must live in a table under RLS.',
  ],
  'space-mission-sim': [
    'Decoupling visualization from math lets you swap either side independently — useful for future mission types.',
    'Tiny `.env`-driven deploys are easier to hand off than Dockerized monoliths.',
  ],
  albasat: [
    'Test correlation is the only thing that proves your FEM is right. Build the test plan alongside the model.',
    'ECSS documentation looks heavy at first but pays off when the review gate comes.',
  ],
  'vsl-visualizer': [
    'Make the graph readable first; decoration later.',
  ],
  drivegen: [
    'OAuth refresh tokens must be stored securely and rotated. Drive API rate limits are real.',
  ],
  'instant-translate': [
    'Small libraries with zero dependencies are easier to keep correct long-term.',
  ],
  'spese-smart': [
    'Local-first designs age well — privacy is a feature, not a marketing line.',
  ],
  neurolex: [
    'Spaced repetition only works if the user actually opens the app. UX > algorithm.',
  ],
  fullship: [
    'Headless browser collectors are brittle — invest in observability.',
  ],
  poodl: [
    '3D on a static page is enough for many demos. Don\'t over-engineer.',
  ],
  'ghl-orchestrator': [
    'Idempotency keys are the difference between "works" and "works in production".',
    'Anti-loop guards belong in the integration layer, not the source system.',
  ],
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = data.projects.find(p => p.slug === params.slug);
  if (!project) notFound();

  return (
    <CaseStudy
      project={project}
      challenges={CHALLENGES[params.slug] ?? ['Detail coming soon.']}
      solution={SOLUTIONS[params.slug] ?? 'Detail coming soon.'}
      lessons={LESSONS[params.slug] ?? ['Detail coming soon.']}
    />
  );
}
