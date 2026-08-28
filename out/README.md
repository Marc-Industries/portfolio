# Matteo Marcon — Portfolio

Premium interactive 3D portfolio for **Matteo Marcon** — Aerospace & Systems Engineer, with a strong software and AI-integration background.

> “Building engineering systems where aerospace, software and intelligent automation meet.”

## Stack

- **Next.js 14** (App Router) + **TypeScript** — static export ready
- **Tailwind CSS** for design system
- **@react-three/fiber** + **@react-three/drei** for the 3D experience
- **Framer Motion** for reveal animations
- **Lenis**-friendly smooth scrolling (CSS `scroll-behavior` + custom hooks)
- **GSAP** available for advanced timelines
- All 3D assets are **procedural** (no external models, no licensing concerns)

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build (static export)

```bash
npm run build
# outputs to ./out — drop on any static host
```

Or in one command:

```bash
npm run export
```

## Deploy

The `out/` directory is a fully static site. Drop it on:

- Vercel — `vercel deploy --prebuilt` (or import the repo)
- Netlify — drag the `out/` folder
- Cloudflare Pages — upload `out/`
- GitHub Pages — push `out/` to a `gh-pages` branch

## Project structure

```
src/
  app/
    layout.tsx              # SEO metadata, fonts, background
    page.tsx                # Cinematic home
    projects/[slug]/        # Per-project case study route
    recruiter/              # Low-animation recruiter view
    engineering/            # Deep technical view
    not-found.tsx
  components/
    Nav.tsx                 # Floating section nav
    TelemetryBar.tsx        # Persistent status ticker
    Footer.tsx
    Section.tsx             # Reusable animated section header
    CaseStudyLayout.tsx
    sections/
      Hero.tsx
      About.tsx
      Aerospace.tsx
      MBSE.tsx              # BEPI flagship + digital twin graph
      Software.tsx
      Automation.tsx
      Projects.tsx
      Experience.tsx        # 3D-style vertical timeline
      Education.tsx
      Publication.tsx
      Contact.tsx
    three/
      Scene.tsx             # Persistent Canvas
      Earth.tsx             # Procedural Earth + atmosphere
      OrbitTrails.tsx       # Faint orbital trails
      StarsBackdrop.tsx     # Starfield
      ParticleField.tsx     # Telemetry particles
      ScrollCameraRig.tsx
      hooks.ts              # useScroll, useDeviceProfile, useSmoothedScroll
  lib/
    data.ts                 # Single source of truth
public/
  manifest.webmanifest
  robots.txt
  sitemap.xml
```

## Performance

- 3D scene is `next/dynamic` with `ssr: false` — no WebGL on the server
- Adaptive DPR, reduced particle counts on mobile, lower-end profile detected at runtime
- `prefers-reduced-motion` honored globally
- CSS containment + GPU-friendly transforms
- Lazy loading per section

## Accessibility

- Semantic HTML, ARIA labels on interactive nodes
- Visible focus states, keyboard navigation
- Reduced-motion support
- All 3D scenes have a text equivalent in the same section
- Sufficient color contrast (WCAG AA on the primary palette)

## SEO

- `metadata` set per page (title template, OpenGraph, Twitter, keywords)
- JSON-LD-ready content
- `sitemap.xml` + `robots.txt` in `public/`
- `manifest.webmanifest` for PWA install

## Recruiter / Engineering views

- `/recruiter.html` — low-animation summary, printable as CV
- `/engineering.html` — deep technical notes per flagship project

## 3D asset strategy

All 3D assets in this site are **procedural** (custom geometry in `@react-three/fiber`).
There are no external GLB / GLTF downloads, no license issues, no missing-asset risk.

The provided `turbine-turbofan-engine-jet-engine/source/turbine-01.zip` in the
parent directory can be optionally converted to a GLB and dropped in `public/`
if a turbine hero asset is desired — it is not required for the current build.

## Credits

- 3D engine: `three`, `@react-three/fiber`, `@react-three/drei`
- Animation: `framer-motion`, `gsap`
- Fonts: Inter (UI), JetBrains Mono (telemetry) — Google Fonts
- Icons: inline SVG (no icon library dependency)

## License

Code: MIT. Content & project descriptions © Matteo Marcon.
