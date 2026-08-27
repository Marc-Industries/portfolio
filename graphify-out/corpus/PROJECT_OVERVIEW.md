# BEPI — Project Overview

> Documento di presentazione del progetto per portfolio web, LinkedIn e CV.
> Versione del documento: Luglio 2026 (build `2026-07-18-r5`).
> Stack: Python · Streamlit · Supabase · FastAPI · ECSS.

---

## 1. TL;DR (3 righe)

**BEPI** (Budget, Engineering & Project Integration) è una piattaforma full-stack per la gestione di progetti aerospaziali che automatizza il calcolo di budget massa/potenza, la verifica di requisiti, l'analisi di rischio, la pianificazione con CPM e la generazione di deliverable PDR/CDR secondo gli standard ECSS. Pensata come "single source of truth" per team di system engineering che lavorano su piccoli satelliti (CubeSat, SmallSat).

---

## 2. Scopo del progetto

### Problema che risolve

La system engineering di una missione spaziale richiede di tenere sotto controllo simultaneamente molti aspetti eterogenei:

- Budget di massa e potenza con margini che cambiano in funzione della fase di missione (ECSS prevede margini diversi per B2, C/D, ecc.).
- Requisiti che devono essere tracciati, verificati e coperti dai test.
- Rischi con probabilità/impatto e mitigazioni documentate.
- Pianificazione delle attività (WBS + Gantt).
- Albero del prodotto (product tree) con relazioni padre/figlio e codici WBS.
- Documenti di review (PDR, CDR) secondo template ECSS.

Senza uno strumento dedicato, questi dati vivono in Excel sparsi, file Word, fogli Google — con tutti i problemi di consistenza, accesso concorrente e audit che ne derivano.

**BEPI centralizza tutto questo in un'unica applicazione web multi-missione**, con calcoli automatici basati su standard ECSS (European Cooperation for Space Standardization).

### Pubblico target

- System engineer di piccole missioni spaziali (CubeSat, SmallSat, constellation).
- Project manager che devono avere visibilità su massa, potenza, costi e avanzamento.
- Team QA che verifica la copertura dei requisiti.
- Ricercatori e studenti che lavorano a tesi o progetti su航天 missions.

---

## 3. Architettura tecnica

### Stack

| Layer | Tecnologia | Perché |
|---|---|---|
| Frontend / App | **Streamlit 1.59** | Python-only, deploy su Streamlit Cloud, perfetto per dashboard data-heavy |
| Backend API (opzionale) | **FastAPI** + **SQLAlchemy** | Per client non-Streamlit (CLI, integrazioni) |
| Database | **Supabase PostgreSQL** | Row Level Security nativa, Edge Functions, Auth gestita |
| Cache | `st.session_state` + `@st.cache_resource` | Invalidazione manuale sui save points |
| Auth | **Supabase Auth** (GoTrue) + JWT | Multi-tenant con RLS, cookie persistiti per long-session |
| Deploy | **Streamlit Cloud** (auto-deploy da `main`) | Zero build locale |
| Test | **pytest** | Unit + integration, eseguibili senza Docker |

### Schema DB (20+ tabelle, principali)

- `missions` — metadata missioni (nome, fase, ECSS baseline, propellant_kg).
- `product_tree_nodes` — albero prodotto gerarchico con `parent_id`, `level` (satellite/subsystem/equipment/component), WBS codes.
- `budgets` — budget per equipment (mass + power per mode). Schema: `nominal_value`, `budget_type`, `operating_mode_id` (NULL per massa).
- `operating_modes` — modalità operative mission-scoped (Commissioning, Recovery, Operation). Hard cap 10 per missione.
- `budget_limits` — limiti di potenza per missione e per mode.
- `requirements` — requisiti con verification method e status.
- `risks` — rischi con mitigazioni e FMECA.
- `tasks` — task WBS con CPM (predecessori, Gantt).
- `team_members` / `mission_members` — RBAC per missione (8 ruoli).
- `invitations` — inviti email con codice.
- `approval_log` — audit delle modifiche.
- `reviews` / `review_deliverables` — gate PDR/CDR.

### Multi-tenancy e sicurezza

- **Row Level Security (RLS)** su tutte le tabelle mission-scoped: una policy `is_mission_member(mission_id)` filtra SELECT/INSERT/UPDATE; DELETE ristretto a PM/SE per entità sensibili.
- **8 ruoli RBAC**: ADMIN, PM, SE, SSL, QA, CM, AIT, USER con permessi granulari (`can(action)` in `role_permissions.py`).
- **Service role client** (`SUPABASE_SERVICE_ROLE_KEY`) per le Edge Functions e le migration; **user client** (anon key + JWT) per tutte le azioni utente — audit S4 (luglio 2026) ha tolto il service client dalle azioni utente per non aggirare RLS.
- **JWT refresh** gestito in `supabase_client.py`: `set_session()` fa refresh automatico del token scaduto e lo ruota in `st.session_state` per evitare logout a ~1h.
- **Cookie-based session restore** via `streamlit-cookies-controller` (7gg TTL).

---

## 4. Funzionalità

### 11 pagine Streamlit (tutte CRUD)

| Pagina | Cosa fa |
|---|---|
| **Overview** | KPI missione: massa totale, potenza per mode (gauge + bar chart per mode), timeline review. Mode selector funzionante (era hardcoded). |
| **Product Tree** | Editor drag-and-drop dell'albero prodotto, dialog Add/Edit/Delete con campi per livello, code, parent, TRL, qty, mass, **power per mode (N input)**. |
| **Budgets** | Tab Mass / Power / Edit Equipment. Edit Equipment: tabella summary `Code × Mode (W)` + radio picker equipment → expander con N input per mode. |
| **Requirements** | Tracciamento requisiti con verification matrix, coverage %, owner, verification method. |
| **Risks** | Risk register con FMECA, matrice probabilità × impatto, criticality auto-computata. |
| **Schedule** | CPM con calcolo critical path, Gantt chart, predecessors/successors. |
| **ECSS** | Compliance checker (margini, deliverable per gate, tailoring per product type, lessons learned). 3 tab nuovi: Deliverables & Progress, Tailoring, Lessons Learned (contrib. Jacopo Coccimiglio). |
| **Reports** | Generazione LaTeX + DOCX per PDR/CDR. Template ECSS-compliant. |
| **Integrations** | GMAT script gen, FreeFlyer mission plan, MATLAB sizing, 3D orbit viz (Plotly), thermal model (steady/transient), solar array sizing, openLCA export, SPENVIS radiation, DRAMA debris. |
| **Warehouse** | Procurement tracking, warehouse items, purchase orders. |
| **Team** | Inviti via email (Brevo SMTP via Edge Function), gestione ruoli RBAC per missione. |

### Feature distintive

- **Operating modes per equipment** (feature principale del lavoro recente): ogni equipment può avere un consumo di potenza diverso per ogni modalità operativa (Commissioning, Recovery, Operation). Schema `budgets.operating_mode_id` con UNIQUE `(node_id, budget_type, operating_mode_id)`. Settings UI per aggiungere/cancellare/rinominare i mode (hard cap 10).
- **Multi-mission** con selettore: un utente può lavorare su più missioni con ruoli diversi per ciascuna.
- **ECSS margins**: rollup automatico dei margini componente/sistema secondo standard ECSS-E-ST-10-12C.
- **ECSS corpus** (Phase A → E): 37 deliverable (DRD-*) con versioning, tailoring matrix, lessons learned — pensato come "second brain" per la produzione di deliverable.
- **Migration story**: 5 fasi completate (Core → Reports+MATLAB → Integrazioni → Auth+CRUD → Multi-mission RBAC).

---

## 5. Cose tecniche interessanti (per CV/portfolio)

### Stack

- **Python 3.11+** asincrono + sync (FastAPI + Streamlit)
- **Streamlit 1.59** con `@st.dialog`, `st.data_editor`, `st.plotly_chart`
- **Supabase** (PostgREST + GoTrue Auth + Edge Functions Deno)
- **PostgreSQL 15** con RLS, UNIQUE indexes parziali, `ON DELETE SET NULL` su FK
- **Plotly** per grafici interattivi (gauge, indicator, Gantt, 3D orbit)
- **Pydantic v2** per schemas e validation
- **pytest** con fake client in-memory per test isolati

### Pattern implementati

1. **Dual-client Supabase**: `get_service_client()` (process-global, cached) vs `get_supabase()` (per-session, RLS-aware). Service client usato solo per bootstrap/Edge Functions/migration.
2. **Cache invalidation esplicita**: `st.session_state.pop("equip_budgets", None)` ad ogni save point (Product Tree Add/Edit, Settings rename, etc.) → niente dati stale.
3. **Migration via SQL files** (`supabase/migrations/`): ogni cambiamento di schema è versionato, applicato con `supabase db push`. Schema snapshot in `supabase/schema.sql` rigenerato dal DB live.
4. **RLS-aware writes**: tutte le mutation passano per user client (eccetto Edge Function `send-invitation` che valida server-side l'`invite_code`).
5. **GDPR / cookie session**: refresh token persistito in cookie browser per evitare logout dopo F5.
6. **Audit log**: tabella `approval_log` per tracciare le modifiche critiche.
7. **Versioning ECSS**: ogni deliverable ha una `revision`, le missioni pinnano una baseline in `metadata.ecss_baseline`. Mappature e metadati, non prosa — link al PDF ufficiale.

### Bug fix degni di nota

- **🔴 Privilege escalation** (lug 2026): `user_metadata.role` era scrivibile dall'utente → chiunque poteva auto-promuoversi ADMIN. Fix: ruolo autorevole è `mission_members` sotto RLS, ignora i metadata.
- **🟠 Dipendenze non pinnate**: `requirements.txt` lasciava plotly/pandas/numpy senza versione, ogni rebuild rompeva il deploy. Pinnati a set verificato in venv pulito.
- **🟡 Duplicati budget**: il Save di Edit Equipment faceva `.upsert()` senza UNIQUE constraint → ogni Save inseriva una nuova riga. Fix: vincolo `UNIQUE (node_id, budget_type)` + update-then-insert logic.
- **🟡 Missioni duplicate**: `_user_has_missions()` ritornava `[]` su errore DB → l'onboarding partiva → duplicati. Fix: ritorna `None` su errore ≠ `[]`.
- **🟢 Power per mode**: prima il power era un singolo valore per equipment; ora è una matrice `equipment × mode` con N righe in `budgets`.

### Performance

- Cache `@st.cache_resource` sul service client (1 sola istanza per processo).
- `_get_product_tree()` e `_get_equip_budgets()` con cache in session_state e invalidazione esplicita (era ricaricato 18×/render → ora 1×).
- User client cached per-session (era 40-100×/render).

---

## 6. Integrazioni esterne

- **GMAT** (General Mission Analysis Tool): generazione script per propagazione orbitale, ΔV, station-keeping.
- **FreeFlyer**: export mission plan per propagazione orbitale di precisione.
- **MATLAB**: bridge per sizing termico e strutturale (Octave come fallback).
- **SPICE kernels**: caricamento kernel per calcoli di posizione pianeta/satellite.
- **openLCA**: export per analisi Life Cycle Assessment.
- **SPENVIS**: tool ESA per analisi radiazione.
- **DRAMA**: tool ESA per analisi detriti orbitali.
- **Brevo (ex-Sendinblue)**: SMTP per email inviti (300 mail/giorno free tier).
- **Plotly**: 3D orbit viz, gauge per indicator, Gantt per schedule.

---

## 7. Metriche del progetto

| Metrica | Valore |
|---|---|
| Linee di codice (Streamlit app) | ~8,200 righe |
| Tabelle DB | 22 + 25 enum |
| Policy RLS | 79 |
| Funzioni DB | 5 |
| Trigger DB | 18 |
| Migration files | ~15 (in `supabase/migrations/`) |
| Test | pytest suite (unit + integration) |
| Pagine Streamlit | 11 |
| Integrazioni esterne | 9 (GMAT, FreeFlyer, MATLAB, SPICE, openLCA, SPENVIS, DRAMA, Brevo, Plotly) |
| Ruoli RBAC | 8 |
| Contributing developers | 3 (Federico Toson, Matteo Marcon, Jacopo Coccimiglio) |

---

## 8. Cosa ho fatto io su questo progetto

*(adatta liberamente alla tua situazione reale)*

### Sviluppo frontend / Streamlit

- Manutenzione e refactor di `streamlit_app.py` (~8,200 righe).
- **Feature Operating Modes per equipment**: full UI in Settings (Add/Delete/Rename con cap 10) + matrice power-per-mode in Budget Editor. Schema migration `20260717170000_power_budget_operating_modes.sql`. Fix di N bug correlati (cache invalidation, RLS DELETE, propagazione rename).
- **Multi-UX improvements** su Overview: selettore Power mode funzionante (era hardcoded), gauge auto-scale (era fissato a 600W), bar chart per mode, summary table cliccabile in Edit Equipment.
- **Cleanup di Next.js**: rimozione del frontend alternativo archiviato (branch `archive/nextjs-frontend`), setup di Streamlit come unico runtime, documentazione aggiornata.
- **Knowledge graph** del progetto (`graphify-out/`): 1,300+ nodi, 2,700+ edges, 82 community. Riduce drasticamente il consumo di token nelle sessioni di sviluppo future.

### Quality / DevOps

- Pinning delle dipendenze UI/scientifiche (`requirements.txt`) dopo che il rebuild automatico di Streamlit Cloud aveva rotto il deploy (plotly 6.x aveva rimosso `go.layout.template.Data`).
- Audit di sicurezza e fix: privilege escalation via `user_metadata` (🔴), fix di RLS su `operating_modes` per UPDATE/DELETE.
- Documentazione di bug fix + root cause in `CLAUDE.md` con tag di severità (🔴🟠🟡🟢) per il prossimo dev.

### Collaboration

- Lavoro su git dual-remote (`origin` + `backup`), workflow rebase + force-with-lease.
- Sincronizzazione con i contributi di Jacopo Coccimiglio (ECSS corpus) e Federico Toson (lead architettura).

---

## 9. Demo e link

- **App live**: https://bepi-space.streamlit.app/
- **Repository**: [link GitHub privato]
- **Stack**: Python 3.11, Streamlit 1.59, Supabase, FastAPI, Plotly, PostgreSQL 15
- **Deploy**: Streamlit Cloud (auto-deploy da `main`) + Supabase Cloud

---

## 10. Lezioni apprese (per il CV: problem solving)

1. **RLS non basta**: la policy `is_mission_member(mission_id)` filtra le righe ma non impedisce di leggere dati di altre missioni se il JWT è scaduto. Soluzione: refresh token rotation + cookie persistenza.
2. **Cache invalidation è la parte difficile**: in Streamlit, `st.session_state` persiste tra i rerun. Se non pop'pi la cache dopo un save, l'utente vede dati vecchi. Pattern: pop su tutti i save points + reload esplicito.
3. **Plotly deprecation**: anche una libreria matura rompe la tua app. Soluzione: pinning esplicito + verifica di import in venv pulito.
4. **Privilege escalation via metadata**: non fidarti mai dei metadata scrivibili dall'utente (GoTrue `update_user`). La fonte autorevole del ruolo deve essere una tabella sotto RLS.
5. **Migration via SQL files** > Alembic per progetti streamlit: meno magia, più controllo.
6. **Edge Functions come trust boundary**: `send-invitation` validava lato client (insicuro). Fix: validare server-side il codice invito + escape HTML + CORS ristretto.

---

## 11. Boilerplate per LinkedIn / portfolio

### Versione LinkedIn (descrizione post)

> 🚀 **BEPI — Budget, Engineering & Project Integration**
>
> Piattaforma full-stack per la gestione di progetti aerospaziali che ho contribuito a sviluppare come **frontend engineer / full-stack dev**.
>
> - **Stack**: Python 3.11, Streamlit 1.59, Supabase PostgreSQL, FastAPI, Plotly
> - **Database**: 22 tabelle con Row Level Security, multi-mission RBAC (8 ruoli)
> - **Feature principale**: gestione Operating Modes (Commissioning/Recovery/Operation) con matrice power-per-mode per equipment
> - **Standards**: ECSS-E-ST-10-12C per margini, FMECA per risk, CPM per schedule
> - **Integrazioni**: GMAT, FreeFlyer, MATLAB, SPICE, openLCA, SPENVIS, DRAMA
> - **Deploy**: Streamlit Cloud + Supabase Cloud
>
> Live: https://bepi-space.streamlit.app/

### Versione breve CV (1 riga)

> BEPI — Piattaforma web multi-missione per system engineering aerospaziale (Streamlit + Supabase + ECSS); manutenzione frontend, feature Operating Modes, bug-fix su RLS e JWT refresh.

### Versione portfolio web (paragrafo)

> BEPI è una piattaforma di system engineering per progetti aerospaziali che ho contribuito a sviluppare per [nome team/azienda]. Stack Python/Streamlit/Supabase con 22 tabelle e RLS multi-tenant. La mia parte principale: feature Operating Modes per equipment (matrice power × mode), bug fix critici su RLS e privilege escalation, gestione cache Streamlit e deploy automatico su Streamlit Cloud. Demo live: https://bepi-space.streamlit.app/

---

## 12. Disclaimer

- Il progetto è in produzione ma in fase attiva di sviluppo. Il frontend Next.js è stato archiviato a giugno 2026; ora Streamlit è l'unico runtime.
- Le credenziali mostrate in `report-sicurezza.md` sono state revocate dopo l'audit di luglio 2026.
- Le specifiche ECSS sono un sottoinsieme dello standard, non l'implementazione completa.

---

*Documento generato il 18 Luglio 2026. Per dettagli tecnici vedi `CLAUDE.md` (project instructions) e `OPERATING_MODES_FEATURE.md`.*