# Graph Report - graphify-out/corpus  (2026-08-26)

## Corpus Check
- Corpus is ~7,678 words - fits in a single context window. You may not need a graph.

## Summary
- 81 nodes · 101 edges · 13 communities (8 shown, 5 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Identity · Education · Certifications
- BEPI — MBSE flagship stack
- Software · Aerospace domains
- AI & Automation projects
- ECSS · PDR/CDR · Mission lifecycle
- Portfolio navigation (hyperedge)
- CubeSat structural stack
- Domain map · Digital Twin
- Hero section
- Education section
- GSAP (animation)
- Next.js (site framework)
- R3F (3D engine)

## God Nodes (most connected - your core abstractions)
1. `Matteo Marcon` - 27 edges
2. `BEPI` - 27 edges
3. `AlbaSat CubeSat` - 8 edges
4. `AI / Automation` - 7 edges
5. `Space Mission Simulator` - 5 edges
6. `Software Engineering` - 5 edges
7. `Lead Distribution & Sync Orchestrator` - 4 edges
8. `PostgreSQL 15` - 4 edges
9. `About / Identity` - 4 edges
10. `Aerospace / Space Systems section` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Matteo Marcon` --PRACTICES--> `Aerospace Engineering`  [EXTRACTED]
  corpus/data.ts → corpus/prompt.txt
- `Matteo Marcon` --PRACTICES--> `Systems Engineering`  [EXTRACTED]
  corpus/data.ts → corpus/prompt.txt
- `Matteo Marcon` --CO_AUTHOR--> `Simulations and Vibration Test Results for the AlbaSat STM`  [EXTRACTED]
  corpus/data.ts → corpus/prompt.txt
- `AlbaSat CubeSat` --OWNED_BY--> `AlbaSat team (UniPD)`  [EXTRACTED]
  corpus/data.ts → corpus/prompt.txt
- `Matteo Marcon` --PRACTICES--> `AI / Automation`  [EXTRACTED]
  corpus/data.ts → corpus/prompt.txt

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **be:bepi_stack** — project:bepi, tech:python, tech:streamlit, tech:supabase, tech:fastapi, tech:postgresql, tech:rls, concept:rbac [INFERRED]
- **be:portfolio_sections** — section:hero, section:about, section:aerospace, section:mbse, section:software, section:ai_automation, section:projects, section:experience, section:education, section:contact [INFERRED]

## Communities (13 total, 5 thin omitted)

### Community 0 - "Identity · Education · Certifications"
Cohesion: 0.12
Nodes (18): English B2 (Cambridge), IBM SkillsBuild — AI Fundamentals, IBM Full Stack Developer, Team Management training, AlbaSat team (UniPD), University of Padua, Matteo Marcon, B.Sc. Aerospace Engineering (UniPD) (+10 more)

### Community 1 - "BEPI — MBSE flagship stack"
Cohesion: 0.13
Nodes (15): BEPI team, CPM / Critical Path, FMECA, Product tree (WBS), RBAC (8 roles), BEPI, DRAMA, FreeFlyer (+7 more)

### Community 2 - "Software · Aerospace domains"
Cohesion: 0.18
Nodes (11): Aerospace Engineering, Software Engineering, Systems Engineering, Space Mission Simulator, About / Identity, Projects section, Software / IT Systems section, FastAPI (+3 more)

### Community 3 - "AI & Automation projects"
Cohesion: 0.22
Nodes (10): AI / Automation, DriveGen, Lead Distribution & Sync Orchestrator, AI / Automation section, Google Apps Script, Gemini API, GoHighLevel, Make (automation) (+2 more)

### Community 4 - "ECSS · PDR/CDR · Mission lifecycle"
Cohesion: 0.32
Nodes (8): ECSS standards, PDR / CDR deliverable gates, FEM ↔ vibration test correlation, AlbaSat CubeSat, Simulations and Vibration Test Results for the AlbaSat STM, Aerospace / Space Systems section, ANSYS (FEM), SolidWorks

### Community 5 - "Portfolio navigation (hyperedge)"
Cohesion: 0.29
Nodes (6): Certification, data, Education, Experience, Project, ProjectVisibility

### Community 6 - "CubeSat structural stack"
Cohesion: 0.67
Nodes (4): Operating Modes (per-equipment), PostgreSQL 15, Row Level Security, Supabase PostgreSQL

### Community 7 - "Domain map · Digital Twin"
Cohesion: 0.67
Nodes (3): Digital Twin, MBSE / Digital Engineering, MBSE / Digital Engineering section

## Knowledge Gaps
- **44 isolated node(s):** `ProjectVisibility`, `Project`, `Experience`, `Education`, `Certification` (+39 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Matteo Marcon` connect `Identity · Education · Certifications` to `BEPI — MBSE flagship stack`, `Software · Aerospace domains`, `AI & Automation projects`, `ECSS · PDR/CDR · Mission lifecycle`, `Domain map · Digital Twin`?**
  _High betweenness centrality (0.519) - this node is a cross-community bridge._
- **Why does `BEPI` connect `BEPI — MBSE flagship stack` to `Identity · Education · Certifications`, `Software · Aerospace domains`, `ECSS · PDR/CDR · Mission lifecycle`, `CubeSat structural stack`, `Domain map · Digital Twin`?**
  _High betweenness centrality (0.384) - this node is a cross-community bridge._
- **Why does `AlbaSat CubeSat` connect `ECSS · PDR/CDR · Mission lifecycle` to `Identity · Education · Certifications`, `Software · Aerospace domains`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **What connects `ProjectVisibility`, `Project`, `Experience` to the rest of the system?**
  _44 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Identity · Education · Certifications` be split into smaller, more focused modules?**
  _Cohesion score 0.12418300653594772 - nodes in this community are weakly interconnected._
- **Should `BEPI — MBSE flagship stack` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._