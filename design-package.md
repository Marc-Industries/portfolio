# Design Package — matteo-marcon.dev

This is the keystone document for the 10k-websites build. Every line of copy below ships verbatim into `index.html`. Every palette token, every chapter beat, every section outline is consumed by Phase 8 as-is.

---

## 1. Producer (cost, scope, money)

| Item | Value |
|---|---|
| Tier | **Tier 1** — single 6s scrub hero, settle into the website |
| Segments | 1 |
| Hero video | ~10 credits at `veo3_1_lite` 1080p 6s standard |
| Hero starting frame | ~2 credits at `flux_2` 16:9 |
| Supporting stills (4) | ~8 credits total at `nano_banana_2_lite` 1:1 |
| **Total** | **~20 credits** of the **110 available** |
| Existing assets | none — generate everything |
| Mobile | still image (loop) replaces scrub video on phones |
| Disclosure | footer line: "Imagery generated with AI." |

The user's instinct was "use all credits, max out the visuals." We are NOT spending all 110 on a portfolio — that would be the wrong ratio. We're spending ~20 on a single cinematic hero + 4 atmospheric stills. The remaining ~90 credits stay as headroom for re-rolls and future projects. **Tell the user this out loud.**

---

## 2. Researcher (buyer language, single CTA)

**Visitors:** aerospace recruiters (HR screen + hiring manager), engineering managers at new-space companies, university collaborators, founders hiring technical co-founders.

**Their pain language** (from recruiter keyword research, May 2026):
- "show me the shall-statements you owned, not just 'led MBSE'"
- "named tools — Cameo, Capella, Rhapsody, DOORS, Jama — not 'MBSE experience'"
- "metrics — link coverage %, requirements count, subsystems integrated"
- "PDR/CDR/FRR/LRR/ORR chaired vs attended"
- "ECSS-M-ST-10C, ISO/IEC 15288, NASA SE Handbook — name the standard"

**Their desire language:**
- "an engineer who can also ship code"
- "tested the cube, not just modeled it"
- "operational telemetry, not slideware"

**The single CTA:** book a 20-min call via LinkedIn — `https://www.linkedin.com/in/matteo-marcon-287999368/`. Every section funnels to that button. Recruiter brief at `/recruiter` and engineering notes at `/engineering` are secondary routes for the deep reader.

---

## 3. Storyboarder (hero chapters)

One segment, one shot. The chapter is the journey from "approach" to "settle".

| Beat | World | Camera | Final frame | Text lane |
|---|---|---|---|---|
| 0.0s | deep space, faint starfield | static | wide of Earth, dawn red rim | top-left: "M·M // MISSION READY" |
| 1.5s | Earth rotates into view | slow push-in | quarter-Earth, red-lit limb | left: "Aerospace engineer." |
| 3.0s | CubeSat drifts into foreground | continue push-in | CubeSat silhouetted against Earth | left: "Software, too." |
| 4.5s | camera continues, satellite catches sun | slow pan-up | satellite with red solar panels catching the red dwarf light | left: "MBSE, AI, automation." |
| 6.0s | settle | static | final composed frame: CubeSat + Earth + thin red orbital trail | left: "Matteo Marcon." — right: scroll hint |

**Final frame becomes the hero poster image for mobile + the still shown while the video loads.**

---

## 4. Prompt generator (Phase 6 inputs)

### Hero starting frame prompt (flux_2, 16:9, 2k)
> Cinematic wide shot of a sleek modern CubeSat satellite orbiting above a dark earth at night, city lights glowing crimson red below, deep black space, subtle volumetric atmosphere, thin technical orbital line traced in red, photoreal, 8k, dramatic side lighting, mission control aesthetic, no text, no logos

### Hero motion prompt (veo3_1_lite, 6s, 1080p)
> slow push-in on the CubeSat as Earth rotates below, red rim light catches the satellite's solar panels, thin red orbital trail draws behind it, deep black void, mission control cinematic, no text, no logos, no audio

### Supporting stills (nano_banana_2_lite, 1:1, 4 images)

| ID | Section | Prompt (compressed) |
|---|---|---|
| S1 | Aerospace | CubeSat model in cleanroom, red accent lights, dark background, photoreal product photography |
| S2 | MBSE — BEPI | glowing red wireframe 3D satellite inside a translucent digital cube, surrounded by floating data panels, deep black void |
| S3 | AI / Automation | circular workflow diagram floating in dark space, red glowing nodes connected in a loop with data packets |
| S4 | About — hands at console | close-up of an engineer's hands typing on a black keyboard bathed in red light, multiple monitors behind showing orbital visualizations |

(Each still is explicitly anchored to the same world as the hero: same palette, same lighting grade.)

---

## 5. Designer (brand)

### Palette (tokens — these go directly into `:root`)
```
--bg-0:   #050000    /* page */
--bg-1:   #0A0202    /* surface */
--bg-2:   #160404    /* raised */
--bg-3:   #260808    /* card */
--line:   rgba(212, 63, 63, 0.10)
--line-strong: rgba(212, 63, 63, 0.28)
--text-0: #F2D9D9    /* off-white, warm */
--text-1: #C58080
--text-2: #9C5050
--text-3: #7A2E2E
--accent-crimson: #D43F3F   /* primary signal */
--accent-fire:    #FF5C3A   /* hover / hot */
--accent-blood:   #8B0F0F   /* deep */
--accent-ember:   #FF8A5C
--accent-amber:   #F2B441   /* warning */
```

Palette is **pulled from the footage** — the red rim light, the city lights, the orbital trail. Page and video read as one world.

### Type trio
- **Display:** `Space Grotesk` (700 / 600 / 500) — wide, slightly geometric, technical feel
- **Body:** `Inter` (400 / 500 / 600) — neutral, readable at 16/15px
- **Mono:** `JetBrains Mono` (400 / 500) — used for all labels, captions, telemetry, status, eyebrows. Almost every label on the page is mono. That is the signal pattern.

### Motif system
- **Corner brackets** on every card (top-left, bottom-right red brackets, 12×12px)
- **Hairline rules** in `--line` between sections
- **Mono labels** with 0.28–0.32em letter-spacing on every status / status-light
- **Status dots** with subtle box-shadow glow (fire / ember / amber / blood variants)
- **Danger stripe** (45° red-on-transparent) on flagship project cards
- **Scan line** slow-traveling red 1px line on Hero and the BEPI card
- **Telemetry bar** always visible, 7vh, live UTC clock + scrolling status messages

### Vector layer (drawn by hand, ships as inline SVG)
- Logo mark: a 12px red diamond rotated 45° + "M·M" in mono 11px
- Section numbering: large outline numerals (00–10) faintly behind section headers
- Domain node graph: 7 satellites orbiting a central "M.M." node, drawn in `<svg viewBox="...">` in the About section
- Workflow graph: 5-node event flow with animated dashed edges in the Automation section

### Text-effect plan synced to the scrub beats
- B1 (1.5s): "Aerospace engineer." fades in, slides 8px from left, 600ms
- B2 (3.0s): "Software, too." crossfades over the previous line, 800ms
- B3 (4.5s): "MBSE, AI, automation." fades in with subtle vertical blur-out → blur-in
- B4 (6.0s): "Matteo Marcon." stays. Right column: "SCROLL ↓" pulses on a 2s cycle

---

## 6. Website producer (sections)

Total: **11 sections + footer + nav + telemetry bar.**

### Hero (the scrub)
- One 6s scrub video as defined in §3.
- Hero left lane: 4 caption beats from §5.
- Hero right lane: live status card (UTC clock, "SYSTEMS ONLINE", lat/lon for Padova 45.41N 11.88E).
- Hero bottom-right: "SCROLL TO PROCEED".
- Behind the scrub: a persistent Three.js canvas (Earth + wireframe satellite + hologram rings + data ribbon + telemetry particles + stars). On mobile, scrub video is replaced with the hero still; the Three.js canvas keeps running at low intensity.
- Above the scrub on mobile: a single CTA "View Projects" + "Get in Touch".

### Section 01 — About (the identity)
- Eyebrow: "// IDENTITY"
- Title: "An engineer who lives in both worlds."
- Two columns: (left) the 7-node domain graph SVG (aerospace, systems, software, AI, automation, MBSE, devops orbiting "M.M.") — this IS the design vector layer. (right) the prose bio + 2 stat cards (11 projects shipped, 7 domains).

### Section 02 — Aerospace
- Eyebrow: "// AEROSPACE & SPACE SYSTEMS"
- Title: "From concept to orbit."
- Lede: "ECSS-aligned engineering across the full space mission lifecycle — requirements, structure, thermal, operations."
- ECSS lifecycle strip A→E (Concept / Preliminary / Detailed / Qualification / Operations) with red dot per gate.
- Two columns below: (left) skills list with status dots, (right) AlbaSat flagship card with form factor / status / standard and a danger stripe.

### Section 03 — MBSE / BEPI
- Eyebrow: "// MBSE · DIGITAL ENGINEERING"
- Title: "A flagship digital-twin platform."
- Lede: the platform description (high-level — public numbers from PROJECT_OVERVIEW.md, no proprietary detail).
- BEPI flagship card: 6 metrics (22 / 79 / 18 / 11 / 9 / 8) + 3 pillars (Digital Twin / Stakeholder UI / Event-Driven) + "Read full case study →" button.
- Supporting still S2 floats in the corner of the card.

### Section 04 — Software
- Eyebrow: "// SOFTWARE & IT SYSTEMS"
- Title: "Production-grade software, engineered like a system."
- Lede: "Full-stack work with the same discipline as aerospace: tested, observable, modular, designed for failure modes."
- 5 stacked layers: Frontend → API → Backend → Data → Infra, each with a status dot.
- Skills tag wall below.

### Section 05 — AI / Automation
- Eyebrow: "// AI · AUTOMATION"
- Title: "Event-driven workflows that think."
- Lede: "Combining AI agents, rule engines, and webhook orchestration into reliable pipelines — observability and rollback by design."
- Centerpiece: the 5-node SVG event flow (Event → Router → Logic / State → Action) with animated dashed edges.
- Two skill walls below: AI/ML and Automation.

### Section 06 — Projects
- Eyebrow: "// PROJECTS"
- Title: "Selected work, end to end."
- Filter chips: All / Featured / Aerospace / MBSE / Software / AI / Integration.
- Featured row (3 cards): BEPI, AlbaSat, Space Mission Simulator.
- Compact grid below: the remaining 8 projects.
- Each project card: still (or geometric placeholder if asset missing), category badge, year, stack chips, "Read →".

### Section 07 — Experience
- Eyebrow: "// EXPERIENCE"
- Title: "Where I've been working."
- Vertical timeline with alternating left/right cards. Date on the opposite side of the card. Red diamond on the spine.

### Section 08 — Publication
- Eyebrow: "// PUBLICATION"
- Title: "Where the work speaks in public."
- AlbaSat paper card: 4S Symposium 2026, "Simulations and Vibration Test Results for the AlbaSat STM", with chip row of venue tags.

### Section 09 — Education & Certifications
- Eyebrow: "// EDUCATION & CERTIFICATIONS"
- Title: "Where I learned to engineer."
- 3 education cards (UniPD Aerospace Engineering M.Sc. in progress / UniPD Aerospace Engineering B.Sc. / any other relevant) — kept honest with "IN PROGRESS" or "COMPLETED" badges per the data.
- 4 certification cards.

### Section 10 — Contact
- Eyebrow: "// CONTACT"
- Title: "Let's build something."
- Lede: "Open to aerospace systems, software, MBSE, or AI automation roles — and to interesting collaborations."
- Primary CTAs: LinkedIn, GitHub, Recruiter Brief, Engineering Notes.
- System status card: availability, relocation, remote, location.
- Bottom strip: "END OF TRANSMISSION · 10 SECTIONS · UTC <clock>".

### Footer
- Brand block (M·M + tagline).
- Navigate list (Projects / Experience / Education / Contact + Recruiter / Engineering).
- Channels list (LinkedIn ↗ / GitHub ↗).
- Disclosure line: "Imagery generated with AI."
- Copyright + version + "SYSTEMS NOMINAL" with red dot.

---

## 7. Gatekeeper

| Gate | When | Pass condition |
|---|---|---|
| Design package approval | before any generation | user signs off on this document |
| Image check | after hero frame generated | no trademarks, no broken anatomy, composition matches storyboard |
| Video gate | after hero video generated | ffmpeg extracts show clean start/middle/end, no flicker, ending rests; user watches and approves |
| Self-test | after build | audit checklist from `references/scrub-pipeline.md` passes; copy gate (no em dashes, no AI-tell words) |
| Live verify | after deploy | real browser request returns 200; speed receipts measured; user tests on phone |

---

## 8. Copy (shipped verbatim)

Every line below goes into `index.html` exactly as written. No em dashes (skill rule). Plain friend-voice. No "leverage / seamless / empower / unlock / robust / actionable / data-driven / solutions." No "it's not just X, it's Y" constructions.

### Hero caption beats
- 0.0s: "Mission ready." (top-left badge)
- 1.5s: "Aerospace engineer."
- 3.0s: "Software, too."
- 4.5s: "MBSE, AI, automation."
- 6.0s: "Matteo Marcon."

### Hero status card (right column)
```
SYSTEMS ONLINE · MISSION READY
LAT 45.4064 N
LON 11.8768 E
— PDV / UTC+01 —
```

### About
> I'm an Aerospace Engineer from the University of Padua who also builds production software. My work spans the full lifecycle: requirements, architecture, implementation, testing, integration.
>
> My path moves between ECSS-aligned space systems engineering and shipping production software. From the test campaign of a 1U CubeSat to the architecture of a multi-tenant MBSE platform. The discipline is the same in both: clear requirements, observable systems, evidence over intuition.

### Aerospace lede
> ECSS-aligned engineering across the full space mission lifecycle. Requirements, structure, thermal, operations.

### MBSE lede
> A system-engineering platform that turns spreadsheet sprawl into a single source of truth. Requirements, configuration, FMECA, integration, all under row-level security.

### Software lede
> Full-stack work with the same discipline as aerospace. Tested, observable, modular, designed for failure modes.

### Automation lede
> Combining AI agents, rule engines, and webhook orchestration into reliable pipelines. Observability and rollback by design.

### Contact lede
> Open to aerospace systems, software, MBSE, or AI automation roles, and to interesting collaborations.

### Footer disclosure
> Imagery generated with AI.

### Footer copyright
> © 2026 Matteo Marcon · All rights reserved.

---

## 9. Beat map (band ranges + pacing)

The skill calls these "starting points, validated later by the flick test." Honest defaults:

- 0–12% scroll: B1 caption appears at 11%
- 12–28%: B2 caption in, video push-in
- 28–48%: B3 caption in, satellite drifts right
- 48–72%: B4 caption in, sun catches panels
- 72–100%: B5 settles, scroll hint fades in

After 100% (i.e., the page below): one section per ~80vh of scroll, 11 sections.

---

## 10. Three.js scene (the persistent layer)

Always-on, behind the scrub. Lower opacity on the hero, ramps up after the user scrolls past 100%.

Components:
- `Earth` — procedural sphere, dark marble, crimson emissive, wireframe lat/long overlay, 3 atmosphere shells
- `WireframeSatellite` — orbiting above the Earth, crimson wireframe CubeSat with corner vertex points, antenna
- `HologramRings` — 3 concentric torus rings, different axes and speeds
- `OrbitTrails` — 4 thin tori with oct/box/tetra satellite markers
- `DataRibbon` — 400-particle diagonal stream, sine-modulated flow
- `ParticleField` — 280 telemetry points, crimson/ember/amber mix
- `StarsBackdrop` — 2800-point starfield, cool white + occasional red dwarf

Reduced motion: scene drops to a static starfield.
