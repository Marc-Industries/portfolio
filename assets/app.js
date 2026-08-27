/**
 * Portfolio site runtime.
 *
 * Loaded as ES module from /index.html.
 *
 * Owns:
 *   - In-view section observer (toggles .in-view on every .block)
 *   - Nav active state via IntersectionObserver
 *   - Nav scrolled shadow toggle
 *   - Telemetry UTC clock + ticker content
 *   - Hero scroll-scrub video: video.currentTime is driven by page scroll
 *     progress (rAF lerp), not by autoplay. The satellite plays forward as
 *     the user scrolls, holds when they hold, and rewinds when they scroll up.
 *     Captions are beat-mapped to the same scroll progress.
 *   - Hero poster fallback when video file is absent or fails
 *     (also used when prefers-reduced-motion is set)
 *   - Counter animation for [data-count]
 *   - About-graph SVG (M.M. at center, 7 domain nodes, animated edges)
 *   - Automation flow SVG (5 nodes + animated edges + legend counter)
 *   - Projects filter chips + featured + compact grid render
 *   - Timeline alternating rows
 *   - Education + certification cards
 *   - Mobile nav drawer
 *   - Footer year
 *
 * Notes:
 *   - Respects prefers-reduced-motion: scrub video becomes still poster,
 *     counter animates snap, no graph/flow edge animation.
 *   - Hero video lookup is generous: tries .mp4, .webm, .mov.
 *   - This file is the only place mutations happen; everything else is markup + CSS.
 */

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const MOBILE  = innerWidth < 768;

// =============================================================================
// DATA
// =============================================================================
const PROJECTS = [
  {
    id: 'albasat',
    name: 'AlbaSat',
    year: '2026',
    domain: 'aerospace',
    domainLabel: 'AEROSPACE',
    headline: '1U CubeSat Structural Thermal Model',
    body: 'Structural design, FEM modal analysis, vibration test campaign, ECSS-aligned documentation. STM qualification and 4S Symposium 2026 paper.',
    tags: ['CubeSat', 'FEM', 'Vibration', 'ECSS'],
    featured: true,
    image: '/assets/img/still-aerospace.jpg',
  },
  {
    id: 'bepi',
    name: 'BEPI',
    year: '2024',
    domain: 'systems',
    domainLabel: 'MBSE',
    headline: 'System Engineering Platform',
    body: 'Multi-tenant MBSE platform: 22 tables, 79 RLS policies, 18 triggers, 11 pages, 9 integrations, 8 RBAC roles. High-level case study only.',
    tags: ['Supabase', 'Postgres', 'RLS', 'Digital Twin', 'FMECA'],
    featured: true,
    image: '/assets/img/still-mbse.jpg',
  },
  {
    id: 'autoworkflow',
    name: 'AutoWorkflow',
    year: '2024',
    domain: 'automation',
    domainLabel: 'AUTOMATION',
    headline: 'AI-driven engineering workflows',
    body: 'Network of n8n + Make + webhook pipelines for engineering review automation, scheduling, and observability.',
    tags: ['n8n', 'Webhooks', 'OpenAI', 'Make'],
    featured: true,
    image: '/assets/img/still-automation.jpg',
  },
  {
    id: 'satviz',
    name: 'SatViz',
    year: '2025',
    domain: 'frontend',
    domainLabel: '3D / WEB',
    headline: 'Orbital visualisation engine',
    body: 'Real-time Three.js scene for satellite tracking with shader-driven atmosphere and procedural Earth.',
    tags: ['Three.js', 'R3F', 'WebGL'],
    featured: false,
  },
  {
    id: 'cubeops',
    name: 'CubeOps',
    year: '2025',
    domain: 'backend',
    domainLabel: 'BACKEND',
    headline: 'Mission-ops scheduling service',
    body: 'FastAPI service that schedules CubeSat passes against TLE-derived visibility windows and emits webhooks for ground segment.',
    tags: ['FastAPI', 'Python', 'TLE', 'SGP4'],
    featured: false,
  },
  {
    id: 'traceforge',
    name: 'TraceForge',
    year: '2025',
    domain: 'systems',
    domainLabel: 'MBSE',
    headline: 'Requirements traceability tool',
    body: 'Requirements graph with verification matrix and impact analysis. Lightweight, exportable, version-controlled.',
    tags: ['MBSE', 'Graph', 'Verification'],
    featured: false,
  },
  {
    id: 'cadops',
    name: 'CADOps',
    year: '2023',
    domain: 'aerospace',
    domainLabel: 'AEROSPACE',
    headline: 'SolidWorks + ANSYS automation',
    body: 'Scripts that turn manual CAD/CAE iteration into reproducible pipelines. Parametric sweeps, automatic meshing.',
    tags: ['SolidWorks', 'ANSYS', 'Python'],
    featured: false,
  },
  {
    id: 'learnpad',
    name: 'LearnPad',
    year: '2024',
    domain: 'frontend',
    domainLabel: 'FRONTEND',
    headline: 'React study app',
    body: 'Personal learning tool with spaced repetition. React, TypeScript, Tailwind, local-first storage.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    featured: false,
  },
  {
    id: 'pulseloop',
    name: 'PulseLoop',
    year: '2024',
    domain: 'ai',
    domainLabel: 'AI',
    headline: 'Streamlit observability dashboard',
    body: 'Internal AI service health dashboard. Token use, latency, error rates, model-version drift.',
    tags: ['Streamlit', 'Python', 'AI Ops'],
    featured: false,
  },
  {
    id: 'firmgen',
    name: 'FirmwareGen',
    year: '2023',
    domain: 'integration',
    domainLabel: 'EMBEDDED',
    headline: 'CubeSat firmware skeleton',
    body: 'Bare-metal C skeleton for the AlbaSat on-board computer. Watchdog, command pipeline, telemetry formatter.',
    tags: ['Embedded C', 'STM32', 'Watchdog'],
    featured: false,
  },
  {
    id: 'reqsync',
    name: 'ReqSync',
    year: '2023',
    domain: 'data',
    domainLabel: 'DATA',
    headline: 'Requirements sync engine',
    body: 'Two-way sync between Jama Connect and a Postgres mirror with conflict resolution and audit log.',
    tags: ['Postgres', 'REST', 'Sync'],
    featured: false,
  },
];

const DOMAINS = [
  { id: 'all',         label: 'ALL',         count: PROJECTS.length },
  { id: 'aerospace',   label: 'AEROSPACE',   count: PROJECTS.filter(p => p.domain === 'aerospace').length },
  { id: 'systems',     label: 'MBSE',        count: PROJECTS.filter(p => p.domain === 'systems').length },
  { id: 'frontend',    label: 'FRONTEND',    count: PROJECTS.filter(p => p.domain === 'frontend').length },
  { id: 'backend',     label: 'BACKEND',     count: PROJECTS.filter(p => p.domain === 'backend').length },
  { id: 'data',        label: 'DATA',        count: PROJECTS.filter(p => p.domain === 'data').length },
  { id: 'integration', label: 'EMBEDDED',    count: PROJECTS.filter(p => p.domain === 'integration').length },
  { id: 'automation',  label: 'AUTOMATION',  count: PROJECTS.filter(p => p.domain === 'automation').length },
  { id: 'ai',          label: 'AI',          count: PROJECTS.filter(p => p.domain === 'ai').length },
];

const EXPERIENCE = [
  {
    role: 'System Engineering Lead',
    company: 'BEPI Programme',
    domain: 'SYSTEMS ENGINEERING',
    location: 'Padova, IT',
    dates: '2024 to Present',
    summary: 'Designed and shipped the multi-tenant MBSE platform: 22 tables, 79 RLS policies, 18 triggers, 11 pages, 9 integrations, 8 RBAC roles.',
    bullets: [
      'Requirements, FMECA and configuration baselines under one row-level-secure schema',
      'Role-aware dashboards for engineering, QA, programme management',
      'Event-driven automation with webhooks and triggers across the platform',
    ],
  },
  {
    role: 'Aerospace Engineer · AlbaSat',
    company: 'University of Padua · ESA / ASI',
    domain: 'AEROSPACE · STRUCTURES',
    location: 'Padova, IT',
    dates: '2023 to 2026',
    summary: 'Structural Thermal Model design and qualification for a 1U CubeSat. FEM modal analysis correlated with measured vibration test data, presented at 4S Symposium 2026.',
    bullets: [
      'ECSS-aligned documentation across phases A–D',
      'Modal parameter extraction and test-to-analysis agreement',
      'Student-friendly ground segment integration',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Independent + Collaborations',
    domain: 'SOFTWARE · FULL-STACK',
    location: 'Remote',
    dates: '2022 to Present',
    summary: 'Production web apps with React, Next.js, TypeScript, Tailwind, FastAPI, Postgres, Supabase. Three.js / R3F for 3D-heavy interfaces.',
    bullets: [
      'Multi-tenant SaaS with row-level security and event-driven integrations',
      'Mission-ops scheduling service for satellite pass prediction',
      'Internal AI observability dashboards',
    ],
  },
  {
    role: 'Automation Engineer',
    company: 'Research + Industry Projects',
    domain: 'AI · AUTOMATION',
    location: 'Padova, IT',
    dates: '2023 to Present',
    summary: 'Built n8n + Make + Apps Script networks for engineering review automation, scheduling, observability, and report generation.',
    bullets: [
      'Webhook orchestration with retry, idempotency and rollback',
      'Prompt-engineered AI pipelines for classification and synthesis',
      'Internal tooling for ops, QA, programme management',
    ],
  },
];

const EDUCATION = [
  {
    degree: 'M.Sc. Aerospace Engineering',
    field: 'Aerospace Engineering',
    inst: 'University of Padua',
    dates: '2023 to 2026 (in progress)',
    status: 'in-progress',
    notes: 'Thesis on CubeSat STM structural qualification and FEM / test correlation.',
  },
  {
    degree: 'B.Sc. Aerospace Engineering',
    field: 'Aerospace Engineering',
    inst: 'University of Padua',
    dates: '2020 to 2023',
    status: 'completed',
    notes: 'Curriculum across structures, propulsion, systems, and space mission design.',
  },
  {
    degree: 'Scientific High School Diploma',
    field: 'Scientific Lyceum',
    inst: 'Liceo Scientifico',
    dates: '2015 to 2020',
    status: 'completed',
    notes: 'Mathematics, physics, science track.',
  },
];

const CERTIFICATIONS = [
  { name: 'ECSS-M-ST-10C Systems Engineering', issuer: 'ESA', status: 'COMPLETED', dot: 'fire'  },
  { name: 'Supabase RLS & Postgres',          issuer: 'SUPABASE', status: 'COMPLETED', dot: 'fire'  },
  { name: 'React + TypeScript Professional',   issuer: 'META', status: 'COMPLETED', dot: 'fire'  },
  { name: 'Generative AI with LLMs',           issuer: 'DEEPLEARNING.AI', status: 'COMPLETED', dot: 'fire'  },
];

const TICKER_ITEMS = [
  'M.M. // IDENTITY · ONLINE',
  'SYSTEMS // NOMINAL',
  'AEROSPACE // LIFECYCLE A–E',
  'MBSE // 22 / 79 / 18 / 11 / 9 / 8',
  'AUTOMATION // 5 NODES · 120ms p99',
  'EDUCATION // UNIPD · IN PROGRESS',
  'PUBLICATION // 4S SYMPOSIUM 2026',
  'CHANNELS // LINKEDIN · GITHUB',
];

const NAV_LINKS = [
  { href: '#about',      label: '01 IDENTITY'  },
  { href: '#aerospace',  label: '02 AEROSPACE' },
  { href: '#mbse',       label: '03 MBSE'      },
  { href: '#software',   label: '04 SOFTWARE'  },
  { href: '#automation', label: '05 AUTOMATION'},
  { href: '#projects',   label: '06 PROJECTS'  },
  { href: '#experience', label: '07 EXPERIENCE'},
  { href: '#education',  label: '09 EDUCATION' },
  { href: '#contact',    label: '10 CONTACT'   },
];

// =============================================================================
// UTILITIES
// =============================================================================
const $  = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k === 'text') node.textContent = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v);
  }
  for (const c of children) {
    if (c == null) continue;
    node.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return node;
};

// =============================================================================
// NAV
// =============================================================================
function renderNav() {
  const list = $('#nav-links');
  if (!list) return;
  for (const link of NAV_LINKS) {
    list.append(el('li', {}, el('a', { href: link.href, class: 'nav-link', 'data-target': link.href.slice(1) }, link.label)));
  }

  const toggle = $('#nav-toggle');
  toggle?.addEventListener('click', () => {
    list.classList.toggle('open');
    toggle.classList.toggle('open');
  });

  // Smooth scroll for in-page anchors (offset for fixed nav)
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + scrollY - 72;
      scrollTo({ top: y, behavior: REDUCED ? 'auto' : 'smooth' });
      list.classList.remove('open');
      toggle.classList.remove('open');
    });
  });

  // Active section via IntersectionObserver
  const sections = NAV_LINKS.map(l => document.getElementById(l.href.slice(1))).filter(Boolean);
  const setActive = (id) => {
    $$('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.target === id));
  };
  const navObs = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActive(visible.target.id);
  }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });
  sections.forEach(s => navObs.observe(s));

  // Scrolled shadow
  const onScroll = () => {
    $('#nav').classList.toggle('scrolled', scrollY > 24);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// =============================================================================
// TELEMETRY — clock + ticker
// =============================================================================
function renderTelemetry() {
  const tickClock = () => {
    const d = new Date();
    const hh = String(d.getUTCHours()).padStart(2, '0');
    const mm = String(d.getUTCMinutes()).padStart(2, '0');
    const ss = String(d.getUTCSeconds()).padStart(2, '0');
    const v = `${hh}:${mm}:${ss}`;
    $('#utc-clock').textContent = v;
    const bottom = $('#utc-clock-bottom');
    if (bottom) bottom.textContent = v;
  };
  tickClock();
  setInterval(tickClock, 1000);

  const ticker = $('#ticker');
  if (!ticker) return;
  const items = TICKER_ITEMS.concat(TICKER_ITEMS);
  ticker.innerHTML = items.map(t => `<span>${t}</span>`).join('');
}

// =============================================================================
// COUNTERS
// =============================================================================
function animateCounters() {
  const targets = $$('[data-count]');
  if (!targets.length) return;

  const animate = (node) => {
    const target = Number(node.dataset.count);
    if (Number.isNaN(target)) return;
    if (REDUCED) { node.textContent = target; return; }
    const duration = 1200;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      node.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.4 });
  targets.forEach(t => io.observe(t));
}

// =============================================================================
// ABOUT GRAPH — 7 nodes around M.M. center
// =============================================================================
function renderAboutGraph() {
  const root = $('#about-graph');
  if (!root) return;

  const NODES = [
    { id: 'aero',    label: 'AERO',    angle: -90 },
    { id: 'mbse',    label: 'MBSE',    angle: -30 },
    { id: 'soft',    label: 'SOFT',    angle:  30 },
    { id: 'ai',      label: 'AI',      angle:  90 },
    { id: 'auto',    label: 'AUTO',    angle: 150 },
    { id: 'data',    label: 'DATA',    angle: 210 },
    { id: 'embed',   label: 'EMBED',   angle: 270 },
  ];

  const R = 90; // node distance from center (viewBox is 240)
  const cx = 120, cy = 120;

  const nodePos = NODES.map(n => {
    const rad = (n.angle * Math.PI) / 180;
    return { ...n, x: cx + Math.cos(rad) * R, y: cy + Math.sin(rad) * R };
  });

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 240 240');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Skills graph centered on Matteo Marcon');

  // Edges
  const edges = document.createElementNS(svg.namespaceURI, 'g');
  edges.setAttribute('stroke', '#D43F3F');
  edges.setAttribute('stroke-width', '1');
  edges.setAttribute('fill', 'none');
  for (const n of nodePos) {
    const line = document.createElementNS(svg.namespaceURI, 'line');
    line.setAttribute('x1', cx); line.setAttribute('y1', cy);
    line.setAttribute('x2', n.x); line.setAttribute('y2', n.y);
    line.setAttribute('opacity', '0.35');
    edges.appendChild(line);
  }
  svg.appendChild(edges);

  // Center node
  const center = document.createElementNS(svg.namespaceURI, 'g');
  const c1 = document.createElementNS(svg.namespaceURI, 'circle');
  c1.setAttribute('cx', cx); c1.setAttribute('cy', cy); c1.setAttribute('r', 28);
  c1.setAttribute('fill', '#050000'); c1.setAttribute('stroke', '#D43F3F'); c1.setAttribute('stroke-width', '1.5');
  center.appendChild(c1);
  const c2 = document.createElementNS(svg.namespaceURI, 'circle');
  c2.setAttribute('cx', cx); c2.setAttribute('cy', cy); c2.setAttribute('r', 28);
  c2.setAttribute('fill', 'none'); c2.setAttribute('stroke', '#FF5C3A'); c2.setAttribute('stroke-width', '0.5');
  c2.classList.add('node-pulse');
  center.appendChild(c2);
  const cText = document.createElementNS(svg.namespaceURI, 'text');
  cText.setAttribute('x', cx); cText.setAttribute('y', cy + 4);
  cText.setAttribute('text-anchor', 'middle');
  cText.setAttribute('fill', '#F5E6E6');
  cText.setAttribute('font-family', 'JetBrains Mono, monospace');
  cText.setAttribute('font-size', '12');
  cText.setAttribute('letter-spacing', '0.18em');
  cText.textContent = 'M·M';
  center.appendChild(cText);
  svg.appendChild(center);

  // Domain nodes
  const group = document.createElementNS(svg.namespaceURI, 'g');
  for (const n of nodePos) {
    const g = document.createElementNS(svg.namespaceURI, 'g');
    const dot = document.createElementNS(svg.namespaceURI, 'circle');
    dot.setAttribute('cx', n.x); dot.setAttribute('cy', n.y); dot.setAttribute('r', 6);
    dot.setAttribute('fill', '#D43F3F');
    g.appendChild(dot);
    const ring = document.createElementNS(svg.namespaceURI, 'circle');
    ring.setAttribute('cx', n.x); ring.setAttribute('cy', n.y); ring.setAttribute('r', 6);
    ring.setAttribute('fill', 'none');
    ring.setAttribute('stroke', '#FF5C3A');
    ring.setAttribute('stroke-width', '0.5');
    ring.classList.add('node-pulse');
    g.appendChild(ring);
    const text = document.createElementNS(svg.namespaceURI, 'text');
    text.setAttribute('x', n.x); text.setAttribute('y', n.y - 12);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', '#C0A8A8');
    text.setAttribute('font-family', 'JetBrains Mono, monospace');
    text.setAttribute('font-size', '8');
    text.setAttribute('letter-spacing', '0.24em');
    text.textContent = n.label;
    g.appendChild(text);
    group.appendChild(g);
  }
  svg.appendChild(group);

  root.appendChild(svg);
}

// =============================================================================
// AUTOMATION FLOW — 5 nodes + animated edges
// =============================================================================
function renderFlow() {
  const svg = $('#flow-svg');
  if (!svg) return;

  const nodes = [
    { id: 'trigger',  label: 'TRIGGER',  x: 100, y: 160 },
    { id: 'agent',    label: 'AGENT',    x: 250, y: 80  },
    { id: 'rules',    label: 'RULES',    x: 400, y: 160 },
    { id: 'notify',   label: 'NOTIFY',   x: 550, y: 80  },
    { id: 'audit',    label: 'AUDIT',    x: 700, y: 160 },
  ];

  // Build edges
  const edges = $('#flow-edges', svg);
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    const b = nodes[(i + 1) % nodes.length];
    const path = document.createElementNS(svg.namespaceURI, 'path');
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2 - 40;
    path.setAttribute('d', `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`);
    path.setAttribute('stroke', '#D43F3F');
    path.setAttribute('stroke-width', '1');
    path.setAttribute('fill', 'none');
    path.setAttribute('opacity', '0.45');
    edges.appendChild(path);

    // Animated packet
    if (!REDUCED) {
      const dot = document.createElementNS(svg.namespaceURI, 'circle');
      dot.setAttribute('r', '3');
      dot.setAttribute('fill', '#FF5C3A');
      const animateMotion = document.createElementNS(svg.namespaceURI, 'animateMotion');
      animateMotion.setAttribute('dur', `${2.5 + i * 0.3}s`);
      animateMotion.setAttribute('repeatCount', 'indefinite');
      animateMotion.setAttribute('path', `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`);
      dot.appendChild(animateMotion);
      edges.appendChild(dot);
    }
  }

  // Build nodes
  const nodeGroup = $('#flow-nodes', svg);
  for (const n of nodes) {
    const g = document.createElementNS(svg.namespaceURI, 'g');
    const rect = document.createElementNS(svg.namespaceURI, 'rect');
    rect.setAttribute('x', n.x - 50); rect.setAttribute('y', n.y - 22);
    rect.setAttribute('width', '100'); rect.setAttribute('height', '44');
    rect.setAttribute('fill', '#0E0202');
    rect.setAttribute('stroke', '#D43F3F'); rect.setAttribute('stroke-width', '1');
    g.appendChild(rect);

    // Corner brackets
    const cornerLen = 6;
    for (const [dx, dy, sx, sy] of [[0,0,1,1],[100,0,-1,1],[0,44,1,-1],[100,44,-1,-1]]) {
      const ln = document.createElementNS(svg.namespaceURI, 'path');
      ln.setAttribute('d', `M ${n.x - 50 + dx} ${n.y - 22 + dy} l ${sx * cornerLen} 0 M ${n.x - 50 + dx} ${n.y - 22 + dy} l 0 ${sy * cornerLen}`);
      ln.setAttribute('stroke', '#FF5C3A');
      ln.setAttribute('stroke-width', '1.2');
      g.appendChild(ln);
    }

    const text = document.createElementNS(svg.namespaceURI, 'text');
    text.setAttribute('x', n.x); text.setAttribute('y', n.y + 4);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', '#F5E6E6');
    text.setAttribute('font-family', 'JetBrains Mono, monospace');
    text.setAttribute('font-size', '11');
    text.setAttribute('letter-spacing', '0.18em');
    text.textContent = n.label;
    g.appendChild(text);

    nodeGroup.appendChild(g);
  }

  // Live legend counter
  if (!REDUCED) {
    const el = $('#flow-legend-v');
    const updateLegend = () => {
      const ms = 100 + Math.floor(Math.random() * 50);
      if (el) el.textContent = `~${ms}ms · p99`;
      requestAnimationFrame(() => setTimeout(updateLegend, 1500));
    };
    updateLegend();
  }
}

// =============================================================================
// PROJECTS — filter + featured + grid
// =============================================================================
let activeFilter = 'all';

function renderProjects() {
  const filterBar = $('#filter-bar');
  const featured = $('#projects-featured');
  const grid = $('#projects-grid');
  if (!filterBar || !featured || !grid) return;

  const draw = () => {
    // Filter chips
    filterBar.innerHTML = '';
    for (const d of DOMAINS) {
      const chip = document.createElement('button');
      chip.className = 'filter-chip' + (d.id === activeFilter ? ' active' : '');
      chip.type = 'button';
      chip.textContent = `${d.label} · ${d.count}`;
      chip.addEventListener('click', () => { activeFilter = d.id; draw(); });
      filterBar.appendChild(chip);
    }

    const filtered = PROJECTS.filter(p => activeFilter === 'all' || p.domain === activeFilter);

    // Featured row
    featured.innerHTML = '';
    const featuredItems = filtered.filter(p => p.featured);
    for (const p of featuredItems) featured.appendChild(projectCard(p, true));

    // Compact grid
    grid.innerHTML = '';
    const compactItems = filtered.filter(p => !p.featured);
    for (const p of compactItems) grid.appendChild(projectCard(p, false));
  };

  draw();
}

function projectCard(p, featured) {
  const card = el('div', { class: 'card corner-brackets' + (featured ? ' project-featured' : '') });

  if (featured) {
    const visual = el('div', { class: 'project-visual' });
    if (p.image) {
      const img = el('img', { src: p.image, alt: '', loading: 'lazy' });
      visual.appendChild(img);
    } else {
      const placeholder = el('div', { class: 'project-visual-placeholder' });
      placeholder.innerHTML = `
        <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="g${p.id}" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stop-color="#8B0F0F" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#050000" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="320" height="240" fill="url(#g${p.id})"/>
          <g stroke="#D43F3F" stroke-width="0.6" fill="none" opacity="0.45">
            <circle cx="160" cy="120" r="40"/>
            <circle cx="160" cy="120" r="70"/>
            <circle cx="160" cy="120" r="100"/>
          </g>
          <g stroke="#FF5C3A" stroke-width="0.4" fill="none" opacity="0.6">
            <path d="M 30 180 L 290 100"/>
            <path d="M 60 60 L 280 200"/>
          </g>
          <text x="160" y="124" text-anchor="middle" fill="#F5E6E6"
                font-family="JetBrains Mono, monospace" font-size="14" letter-spacing="0.32em">${p.name.toUpperCase()}</text>
        </svg>`;
      visual.appendChild(placeholder);
    }
    const overlay = el('div', { class: 'project-visual-overlay' });
    visual.appendChild(overlay);

    const meta = el('div', { class: 'project-visual-meta' },
      el('span', { class: 'badge' }, p.domainLabel)
    );
    visual.appendChild(meta);

    const year = el('div', { class: 'project-visual-year mono' }, p.year);
    visual.appendChild(year);

    card.appendChild(visual);
  }

  card.appendChild(el('div', { class: 'project-name' }, p.name));
  card.appendChild(el('div', { class: 'project-headline' }, p.headline));
  card.appendChild(el('p', { class: 'project-body muted' }, p.body));

  const tags = el('div', { class: 'tag-wall' });
  for (const t of p.tags) tags.appendChild(el('span', { class: 'tag' }, t));
  card.appendChild(tags);

  return card;
}

// =============================================================================
// TIMELINE
// =============================================================================
function renderTimeline() {
  const root = $('#timeline');
  if (!root) return;

  EXPERIENCE.forEach((item, i) => {
    const row = el('div', { class: `timeline-row ${i % 2 === 0 ? 'rtl' : 'ltr'}` });

    const side = el('div', { class: 'timeline-side' });
    side.appendChild(el('div', { class: 'timeline-dates' }, item.dates));
    side.appendChild(el('div', { class: 'timeline-loc' }, item.location));
    side.appendChild(el('div', { class: 'spine-wrap', style: 'position:relative' },
      el('div', { class: 'timeline-spine' })
    ));

    const content = el('div', { class: 'timeline-content card corner-brackets' });
    content.appendChild(el('div', { class: 'timeline-domain' }, item.domain));
    content.appendChild(el('div', { class: 'timeline-role' }, item.role));
    content.appendChild(el('div', { class: 'timeline-company' }, item.company));
    content.appendChild(el('div', { class: 'timeline-summary' }, item.summary));

    if (item.bullets?.length) {
      const list = el('ul', { class: 'timeline-bullets' });
      for (const b of item.bullets) {
        list.appendChild(el('li', {},
          el('span', { class: 'dot fire' }),
          el('span', {}, b)
        ));
      }
      content.appendChild(list);
    }

    row.appendChild(side);
    row.appendChild(content);
    root.appendChild(row);
  });
}

// =============================================================================
// EDUCATION + CERTIFICATIONS
// =============================================================================
function renderEducation() {
  const edu = $('#edu-grid');
  if (edu) {
    for (const e of EDUCATION) {
      const card = el('div', { class: 'card corner-brackets' });
      card.appendChild(el('div', { class: 'edu-status' },
        el('div', { class: 'mono', style: 'font-size: 9px; letter-spacing: 0.28em; color: var(--text-3);' }, '// DEGREE'),
        el('div', { class: `status-badge ${e.status}` }, e.status === 'in-progress' ? 'IN PROGRESS' : 'COMPLETED')
      ));
      card.appendChild(el('div', { class: 'edu-degree' }, e.degree));
      card.appendChild(el('div', { class: 'edu-field' }, e.field));
      card.appendChild(el('div', { class: 'edu-inst' }, e.inst));
      card.appendChild(el('div', { class: 'edu-dates' }, e.dates));
      if (e.notes) card.appendChild(el('div', { class: 'edu-notes' }, e.notes));
      edu.appendChild(card);
    }
  }

  const cert = $('#cert-grid');
  if (cert) {
    for (const c of CERTIFICATIONS) {
      const row = el('div', { class: 'cert-row' });
      row.appendChild(el('div', {},
        el('div', { class: 'cert-name' }, c.name),
        el('div', { class: 'cert-issuer' }, c.issuer)
      ));
      row.appendChild(el('div', { class: 'cert-status' },
        el('span', { class: `dot ${c.dot}` }),
        document.createTextNode(' ' + c.status)
      ));
      cert.appendChild(row);
    }
  }
}

// =============================================================================
// HERO — normal autoplay video + auto-cycling captions + poster fallback
//
// The hero satellite video plays normally (autoplay, muted, loop). The four
// hero captions ("Aerospace engineer.", "Software, too.", "MBSE, AI, automation.",
// "Matteo Marcon.") cycle automatically every 2.4s so the user reads the whole
// identity statement even without touching the scroll. When the user scrolls
// past the hero, the auto-cycle pauses; when they scroll back, it resumes.
// =============================================================================
function setupHero() {
  const video = $('#hero-video');
  const poster = $('#hero-poster');
  const load = $('#hero-load');
  const captions = $$('#hero-captions .hero-caption');

  if (!video) return;

  const usePoster = () => {
    load?.classList.add('hidden');
    if (poster) poster.hidden = false;
    startCaptionCycle();
  };

  if (REDUCED) { usePoster(); return; }

  const onLoaded = () => {
    video.hidden = false;
    // Normal autoplay (muted + loop + playsinline = safe in all browsers).
    video.play().catch(() => { /* autoplay blocked: poster still works */ });
    setTimeout(() => load?.classList.add('hidden'), 400);
    startCaptionCycle();
  };

  video.addEventListener('loadeddata', onLoaded);
  video.addEventListener('error', usePoster);

  video.load();

  // ---------------------------------------------------------------------------
  // Auto-cycling captions.
  // ---------------------------------------------------------------------------
  function startCaptionCycle() {
    if (!captions.length) return;

    // Show beat 1 immediately so the first frame is never empty.
    let active = 1;
    captions.forEach(c => c.classList.toggle('show', Number(c.dataset.beat) === active));

    const total = captions.length;
    const interval = 2400; // ms per beat
    let timer = null;

    const show = (n) => {
      active = ((n - 1 + total) % total) + 1; // wrap 1..total
      captions.forEach(c => c.classList.toggle('show', Number(c.dataset.beat) === active));
    };

    const tick = () => {
      show(active + 1);
    };
    const start = () => { if (!timer) timer = setInterval(tick, interval); };
    const stop  = () => { if (timer) { clearInterval(timer); timer = null; } };

    start();

    // Pause when the hero is offscreen so we don't waste cycles.
    const inHero = () => {
      const hero = $('#hero');
      if (!hero) return true;
      const r = hero.getBoundingClientRect();
      return r.bottom > 0 && r.top < innerHeight;
    };

    const maybeToggle = () => {
      if (inHero()) start(); else stop();
    };
    addEventListener('scroll', maybeToggle, { passive: true });
    addEventListener('resize', maybeToggle, { passive: true });
  }
}

// =============================================================================
// PLANET STAGE — scroll-scrubbed video behind section 01 (Identity).
//
// The planet video lives inside the #about section. Its `currentTime` is
// lerped toward a target derived from the section's scroll progress:
// 0 when the top of the section is at the top of the viewport, full
// duration when the bottom of the section has scrolled out. The video is
// kept paused to give the scrub loop exclusive control over playback.
// =============================================================================
function setupPlanetScrub() {
  const video = $('#planet-video');
  const section = $('#about');
  if (!video || !section) return;

  const onLoaded = () => {
    try { video.pause(); video.removeAttribute('autoplay'); } catch {}
    startScrub();
  };
  const onError = () => { /* poster remains */ };

  video.addEventListener('loadeddata', onLoaded);
  video.addEventListener('error', onError);
  video.load();

  function startScrub() {
    if (REDUCED) return; // reduced-motion users see the poster, no scrub

    let target = 0;
    let current = 0;

    const setTarget = () => {
      if (!video.duration || !isFinite(video.duration)) {
        target = 0;
        return;
      }
      // Progress = how far the section has scrolled past the viewport top,
      // clamped 0..1 across the section's own height.
      const r = section.getBoundingClientRect();
      const total = r.height + innerHeight;
      const scrolled = Math.min(Math.max(-r.top, 0), total);
      const t = scrolled / total;
      target = t * video.duration;
    };

    addEventListener('scroll', setTarget, { passive: true });
    addEventListener('resize', setTarget, { passive: true });
    setTarget();

    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      current = lerp(current, target, 0.25);
      if (Math.abs(current - target) > 0.004 && video.duration) {
        try { video.currentTime = current; } catch {}
      }
      requestAnimationFrame(tick);
    };
    tick();
  }
}

// =============================================================================
// IN-VIEW OBSERVER for blocks
// =============================================================================
function setupInView() {
  const blocks = $$('.block');
  if (!blocks.length) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
  blocks.forEach(b => io.observe(b));
}

// =============================================================================
// FOOTER
// =============================================================================
function setupFooter() {
  const year = $('#footer-year');
  if (year) year.textContent = new Date().getFullYear();
}

// =============================================================================
// BOOT
// =============================================================================
function boot() {
  renderNav();
  renderTelemetry();
  animateCounters();
  renderAboutGraph();
  renderFlow();
  renderProjects();
  renderTimeline();
  renderEducation();
  setupHero();
  setupPlanetScrub();
  setupInView();
  setupFooter();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}