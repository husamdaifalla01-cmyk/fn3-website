# FN3 Website Revamp — Design Spec
**Date:** 2026-03-17
**Status:** Approved by user
**Scope:** Full site — 5 pages (Homepage + 4 Chapter pages)

---

## 1. Project Context

### What We're Building
A complete rebuild of the FlowNexis3 (FN3) public website. The current site copies internal documentation verbatim, uses generic AI-default design patterns (rounded cards, sky-blue gradients, shadcn defaults), and does not reflect FN3's actual identity or product offering.

### What FN3 Actually Is
FN3 is a lean operational holding company whose **product is the operating system itself** — not the portfolio ventures. FN3 builds and deploys operational intelligence through:
- **Agents** — persistent AI agents with memory and capability running operations 24/7
- **Systems** — connected infrastructure that eliminates gaps between tools and teams
- **Operations** — frameworks, SLAs, and decision architecture that enable scale without overhead

The ventures (SUBZII, DETAILMAPS, DRYJETS, DAWA, BIO) are **proof that the system works**, not the product offering.

### Primary Goal
Conviction-building. Visitors should leave understanding exactly what FN3 is and forming strong conviction about it — not confused about which category it belongs to.

### Audiences
All three simultaneously: potential partners, investors, and external clients seeking operational intelligence services.

---

## 2. Design System

### Brand Colors
| Token | Value | Usage |
|---|---|---|
| `--red` | `#b91c1c` | Nav, hero backgrounds, brand accents, CTAs, footer logo, active states |
| `--red-light` | `#f87171` | Section labels on warm-white and white sections, capability numbers |
| `--red-faint` | `#fde8e8` | Borders on warm-white sections, column dividers on warm-white sections |
| `--warm-white` | `#fffbfb` | Philosophy sections, identity strips, contact section |
| `--white` | `#ffffff` | Content sections, capability lists, venture lists, chapter entry |
| `--near-black` | `#0c0a0a` | Numbers strips, process sections, footer |
| `--text-primary` | `#1c1917` | Headings, body copy on light backgrounds |
| `--text-secondary` | `#78716c` | Body copy on light backgrounds |
| `--text-muted` | `#9ca3af` | Captions, sub-labels on white sections |
| `--text-ghost` | `#d1d5db` | Section labels on **white/warm-white** sections only (e.g. `Enter the site`, chapter number labels). Do NOT use on near-black sections — see `--dark-label` instead. |
| `--dark-border` | `#1a1212` | Column dividers and row borders on near-black (`#0c0a0a`) sections |
| `--dark-label` | `#2a1a1a` | Ghost labels on near-black sections (Numbers strip `At a glance`, Principles, Process). Intentionally near-invisible — do not increase contrast. |
| `--dark-text` | `#3f3232` | Body copy and sub-labels on near-black sections (Principles body, Process step body, Numbers strip labels) |
| `--dark-white` | `#ffffff` | Headings on near-black sections |

### Section Background Sequence
The page alternates tonal backgrounds as it scrolls. The pattern is:

```
Red → Warm-White → White → Near-Black → White → [repeat as needed]
```

Each section's border colour matches its background context (see colour tokens above).

### Typography
- **Display headings:** `-apple-system, Inter, sans-serif`, `font-weight: 800`, letter-spacing: `−2px` to `−1.5px`
- **Section headlines:** same, `font-weight: 700`, letter-spacing: `−0.5px` to `−1px`
- **Manifesto / italic moments:** `Georgia, serif`, `font-style: italic`
- **Labels / mono:** `font-family: monospace`, `letter-spacing: 0.2–0.3em`, `text-transform: uppercase`, 9–11px
- **Body text:** 14–16px, `color: #78716c` (`--text-secondary`) on light, `color: #3f3232` (`--dark-text`) on dark, `line-height: 1.75`

### Hero Text Sizing (Responsive)
- Hero statement: `clamp(40px, 5.5vw, 68px)`, `letter-spacing: −2.5px`
- Page chapter titles: `clamp(40px, 5vw, 64px)`, `letter-spacing: −2px`
- Section headlines: `clamp(28px, 3.5vw, 48px)`, `letter-spacing: −1.5px`

### Layout Rules
- Content padding: `80px 48px` on desktop, `48px 24px` on tablet, `40px 20px` on mobile
- No `border-radius` larger than `2px` anywhere on the site
- No gradient icon containers
- No shadcn `Badge` component
- No `hover:scale` card effects
- No aurora/glow background effects
- No social icon clusters in footer
- Column dividers use `1px solid` matching section context (see colour tokens)

---

## 3. Navigation

### Desktop (≥1024px)
- **Background:** `#b91c1c` — sticky, no scroll state change ever
- **Height:** 52px
- **Left:** `FN3` — monospace, `#fff`, 15px, `font-weight: 800`, `letter-spacing: 0.05em`
- **Centre links:** Chapter names — 11px, monospace, uppercase, `letter-spacing: 0.12em`
  - Colour at rest: `rgba(255,255,255,0.5)`
  - Colour on hover: `rgba(255,255,255,1.0)`
  - Colour when active (current page): `rgba(255,255,255,1.0)`
  - Links: What We Are | What We've Built | How We Work
- **Right CTA:** `Work With Us →` — 11px, monospace, uppercase, `#fff`, bottom-border underline only (`border-bottom: 1px solid rgba(255,255,255,0.6)`), no fill/background

### Mobile (<1024px)
- Hamburger icon (3 horizontal lines), `#fff`, 24px, right-aligned
- On open: icon changes to X; a full-width dropdown overlay appears below nav, `background: #b91c1c`
- Dropdown closes on: tap X, tap any link, tap outside overlay
- Mobile menu items stack vertically, `padding: 16px 24px` each, same colour rules as desktop
- `Work With Us →` appears as last item in mobile menu, with top border `1px solid rgba(255,255,255,0.15)`
- Breakpoint: `1024px`

### Chapter Page Navigation Variant
On all chapter pages (`/what-we-are`, `/what-weve-built`, `/how-we-work`, `/work-with-us`), the **centre nav links are replaced** with a single back-link:
- `← Back to Home` — 11px, monospace, uppercase, `rgba(255,255,255,0.5)`, hover to full white
- This keeps the nav uncluttered on deep pages while providing a clear escape path
- The right CTA (`Work With Us →`) remains on all pages
- Mobile: same hamburger, back-link appears as first item in dropdown

---

## 4. Site Map & Page Titles

| URL | Page | `<title>` | Meta Description |
|---|---|---|---|
| `/` | Homepage | `FN3 — Operational Intelligence` | `FN3 is a lean tech holding company that builds and deploys AI-powered operational intelligence. Agents, systems, and frameworks that make businesses run at a level most teams never reach.` |
| `/what-we-are` | What We Are | `What We Are — FN3` | `FN3 is not an agency, a studio, or a fund. It's an operational holding company built to prove that AI-first operations at scale are possible with a small, precise team.` |
| `/what-weve-built` | What We've Built | `What We've Built — FN3` | `Five ventures running on the FN3 operating model. Different industries, same infrastructure. Proof the system works.` |
| `/how-we-work` | How We Work | `How We Work — FN3` | `Six capabilities. One integrated system. The same operational intelligence FN3 uses to run its ventures, available to external clients.` |
| `/work-with-us` | Work With Us | `Work With Us — FN3` | `No intake form. No discovery call widget. If FN3 is the right fit, reach out directly.` |

Open Graph: title = same as `<title>`, image = FN3 logo on `#b91c1c` background (1200×630px).

---

## 5. Homepage (`/`)

### Section 1 — Hero (full viewport)
- **Background:** `#b91c1c`
- **Layout:** Single column, left-aligned, `padding: 100px 48px 120px`, `min-height: 90vh`
- **Eyebrow:** `FlowNexis3 — Operational Intelligence` — 9px monospace, `rgba(255,255,255,0.3)`, `margin-bottom: 56px`
- **Manifesto (ghost italic):**
  ```
  Not an agency.
  Not a studio.
  Not a fund.
  ```
  Georgia serif, 24px italic, `rgba(255,255,255,0.35)`, `line-height: 1.6`, `margin-bottom: 24px`
- **Rule:** `width: 40px`, `height: 1px`, `background: rgba(255,255,255,0.4)`, `margin-bottom: 28px`
- **Statement:**
  ```
  FN3 is what you build
  when you're done
  choosing between them.
  ```
  Sans-serif, `clamp(40px, 5.5vw, 68px)`, `font-weight: 800`, `#fff`, `letter-spacing: −2.5px`, `line-height: 1.02`, `margin-bottom: 56px`
- **Sub-headline:** "We build the operating system behind the business — agents, automation, and systems that make operations run at a level most teams never reach." — 16px, `rgba(255,255,255,0.5)`, `max-width: 480px`, `line-height: 1.7`
- **Scroll hint:** `Scroll to enter ↓` — 9px monospace, `rgba(255,255,255,0.18)`, `position: absolute`, `bottom: 36px`, `left: 48px`

### Section 2 — Identity Strip
- **Background:** `#fffbfb`
- **Border-bottom:** `1px solid #fde8e8`
- **Padding:** `80px 48px`
- **Label:** `The FN3 Operating Model` — `#f87171`
- **Layout:** 3 equal columns, `gap: 0`, with `border-right: 1px solid #fde8e8` between columns
- **Content:**

  | Column | Mono Label | Title | Body |
  |---|---|---|---|
  | 1 | `01 — AGENTS` | AI Workforce | Persistent agents with memory and capability running operations around the clock. Not tools you prompt — a workforce you deploy. |
  | 2 | `02 — SYSTEMS` | Connected Infrastructure | Every process, every data flow, every decision point connected. An operating system that eliminates the gaps between tools and teams. |
  | 3 | `03 — OPERATIONS` | Execution at Scale | The frameworks, the SLAs, the transfer pricing — a management layer built to run multiple businesses without adding management overhead. |

### Section 3 — Method
- **Background:** `#ffffff`
- **Border-bottom:** `1px solid #f3f4f6`
- **Padding:** `80px 48px`
- **Layout:** 2-column header, `grid-template-columns: 1fr 1fr`, `gap: 80px`, `align-items: start`
- **Left — Headline:** "The same system that runs **our** businesses runs yours." — `clamp(32px, 3.5vw, 48px)`, `font-weight: 800`, `letter-spacing: −1.5px`. The word `our` is in `#b91c1c`.
- **Right — Body:** "FN3 built an operational intelligence layer to run its own portfolio. Every tool, agent, and system was designed to be externalizable from day one. What powers our ventures powers our clients." — 15px, `#78716c`, `line-height: 1.8`
- **Below header:** 3-column grid of capability preview items, `background: #fffbfb`, `border: 1px solid #fde8e8`, `padding: 28px`, no border-radius
  - `CAPABILITY 01` / Automation Integration / Map, design, and deploy automation into existing operations without rebuilding what's working.
  - `CAPABILITY 02` / Agent Deployment / Purpose-built agents for specific operational roles — not generic AI, configured workforce.
  - `CAPABILITY 03` / Operating System Design / The frameworks, decision layers, and systems architecture that make scale possible without chaos.

### Section 4 — Numbers Strip
- **Background:** `#0c0a0a`
- **Padding:** `80px 48px`
- **Label:** `At a glance` — 9px monospace, `#2a1a1a` (ghost label — intentionally very low contrast, barely visible)
- **Layout:** 4 equal columns, `border-right: 1px solid #1a1212` (`--dark-border`) between columns
- **Numbers:** Georgia serif, 72px, `#fff`, `font-weight: 400`. First number in `#b91c1c`.
- **Content:**
  - `5` (red) — `Ventures Running the System`
  - `200+` — `Agent Vision`
  - `6` — `Service Capabilities`
  - `24/7` — `Autonomous Operations`
- **Number labels:** 9px monospace, uppercase, `#3f3232` (`--dark-text`), `margin-top: 14px`
- **Animation:** Count-up from 0 on scroll entry, 1200ms duration, `ease-out` easing. `24/7` does not count — it appears with the same scroll fade-in as the other elements but no numeric animation.

### Section 5 — Chapter Entry
- **Background:** `#ffffff`
- **Padding:** `88px 48px`
- **Label:** `Enter the site` — 9px monospace, `#d1d5db`
- **Layout:** 4 rows. Each row: `display: flex`, `justify-content: space-between`, `align-items: center`, `padding: 24px 0`, `border-top: 1px solid #f3f4f6`
- Last row has `border-bottom: 1px solid #f3f4f6` as well
- **Hover state:** Row background shifts to `#fffbfb`. No scale. Transition: `background 150ms ease`.
- **Left side:** `[monospace number — #d1d5db]` + `[chapter title — 22px, font-weight: 700, #111, letter-spacing: −0.5px]`
- **Right side:** Description label in 11px, `#9ca3af`
- **"Work With Us" title:** `#b91c1c` instead of `#111`
- **Rows:**
  | Num | Title | Right label |
  |---|---|---|
  | 01 | What We Are | Philosophy + Structure → |
  | 02 | What We've Built | Ventures + Proof of System → |
  | 03 | How We Work | Capabilities + Operating Model → |
  | 04 | Work With Us (red) | Bring FN3 Into Your Operations → |

### Footer
- **Background:** `#0c0a0a`
- **Padding:** `28px 48px`
- **Left:** `FN3` — 12px monospace, `font-weight: 700`, `#b91c1c`, `letter-spacing: 0.1em`
- **Right:** `© FlowNexis3 2026 — All Rights Reserved` — 9px monospace, uppercase, `#2a1a1a`
- Copyright year: static `2026` — update to dynamic `new Date().getFullYear()` during implementation

---

## 6. Chapter 01 — What We Are (`/what-we-are`)

### Page Hero
- **Background:** `#b91c1c`, `padding: 72px 48px 80px`
- **Layout:** 2-column, `grid-template-columns: 1fr 1fr`, `gap: 80px`, `align-items: end`
- **Left:** Chapter label (`Chapter 01 — What We Are`, 9px monospace, `rgba(255,255,255,0.3)`) + Title (`The Company Behind the System`, `clamp(40px, 5vw, 64px)`, `font-weight: 800`, `#fff`)
- **Right:** "FN3 is a lean operational holding company. Not defined by its ventures — defined by the operating model that runs them. Built to prove that AI-first operations at scale are possible with a small, precise team." — 16px, `rgba(255,255,255,0.55)`, aligned to bottom of grid

### Philosophy Section
- **Background:** `#fffbfb`, `border-bottom: 1px solid #fde8e8`, `padding: 80px 48px`
- **Label:** `The Philosophy` — `#f87171`
- **Layout:** 2-column, `grid-template-columns: 2fr 3fr`, `gap: 80px`
- **Headline:** "Built to run many things without becoming many things." — `font-weight: 800`, `clamp(28px, 3vw, 36px)`, `letter-spacing: −1px`, `#1c1917`. The word `becoming` in `#b91c1c`.
- **Body:** "Most companies scale by adding people, layers, and complexity. FN3 scales by deepening the system. Every process is designed to be automated before it's designed to be staffed. Every service is built as an API before it's built as a team.\n\nThe result: a holding company that runs like software. Lean by design. Compound by nature. AI-native from the ground up." — 16px, `#78716c`, `line-height: 1.8`

### Reference Models Section
- **Background:** `#ffffff`, `border-bottom: 1px solid #f3f4f6`, `padding: 80px 48px`
- **Label:** `Informed By` — `#f87171`
- **Layout:** 5 equal columns, `border-right: 1px solid #f3f4f6` between columns
- **Content:**
  | Model | Description |
  |---|---|
  | Constellation Software | Acquire and compound. Never sell. Operational discipline over growth theatre. |
  | Berkshire Hathaway | Autonomous business units. Capital allocation as the core skill. Trust the operator. |
  | Amazon | API mandate. Every service externalizable. Build platforms, not products. |
  | Danaher | The Business System. A replicable operating model applied across every acquisition. |
  | IAC | Build, spin, repeat. Incubate internally. Spin out when ready. Never stop building. |
- Model name: 13px, `font-weight: 700`, `#1c1917`, `margin-bottom: 8px`
- Model description: 12px, `#9ca3af`, `line-height: 1.6`

### Operating Principles Section
- **Background:** `#0c0a0a`, `padding: 80px 48px`
- **Label:** `Operating Principles` — 9px monospace, `#3f3232` (`--dark-text`, ghost label)
- **Layout:** 2×2 grid, `gap: 48px`, `margin-top: 40px`
- **Each principle:** `border-top: 1px solid #1a1212` (`--dark-border`), `padding-top: 24px`
- **Principle number:** 9px monospace, `#b91c1c`, `letter-spacing: 0.2em`, `margin-bottom: 12px`
- **Principle title:** 18px, `font-weight: 700`, `#fff`, `letter-spacing: −0.3px`, `margin-bottom: 10px`
- **Principle body:** 13px, `#3f3232` (`--dark-text`), `line-height: 1.7`
- **Content:**
  | Num | Title | Body |
  |---|---|---|
  | PRINCIPLE 01 | Automate Before You Staff | Every process gets designed for automation first. Humans handle judgment. Systems handle execution. |
  | PRINCIPLE 02 | Build APIs, Not Teams | Every service interface is designed to be externalizable from day one. Nothing is siloed by default. |
  | PRINCIPLE 03 | Compound With Every Venture | Each new business makes the operating system stronger. Infrastructure invested once, leveraged across all. |
  | PRINCIPLE 04 | Decisions From Frameworks | No gut calls on strategy. Regret minimization, Anand-Collis framework, capital allocation rules — all documented, all applied. |

---

## 7. Chapter 02 — What We've Built (`/what-weve-built`)

### Page Hero
- Same structure as Ch.01 hero
- **Title:** `The System In The Wild`
- **Description:** "Five ventures. Each one a live test of the FN3 operating model. Different industries, same infrastructure. This is what the system looks like when it runs."

### Intro Section
- **Background:** `#fffbfb`, `border-bottom: 1px solid #fde8e8`, `padding: 80px 48px`
- **Label:** `Why This Page Exists` — `#f87171`
- **Statement:** "These aren't investments. They're **proof**. Each venture runs on the same agent infrastructure, the same operational frameworks, the same decision architecture. When a client asks 'does this actually work?' — this page is the answer." — 24px, `font-weight: 400`, `color: #1c1917`, `max-width: 680px`, `line-height: 1.6`. The word `proof` in `#b91c1c`, `font-weight: 700`.

### Ventures List
- **Background:** `#ffffff`, `padding: 80px 48px`
- **Label:** `Active Ventures` — `#f87171`
- **Row layout:** `grid-template-columns: 200px 1fr 160px`, `gap: 48px`, `align-items: start`
- **Row borders:** `border-top: 1px solid #f3f4f6`, last row also has `border-bottom`
- **Row padding:** `40px 0`
- **Left — Venture name:** 22px, `font-weight: 800`, `#1c1917`, `letter-spacing: −0.5px`. Sector below in 9px monospace, `#d1d5db`, uppercase.
- **Centre — Description:** 14px, `#78716c`, `line-height: 1.75`
- **Right — Status:** Status dot (8px circle) + label (10px monospace, uppercase, `#9ca3af`), right-aligned
- **Content:**
  | Name | Sector | Description | Status | Dot Color |
  |---|---|---|---|---|
  | SUBZII | Event Ticketing | Live entertainment ticketing platform. AI-optimized pricing, inventory management, and demand forecasting. The FN3 agent layer runs demand prediction and operational workflows end-to-end. | Growth | `#4ade80` |
  | DETAILMAPS | Auto-Care | Vehicle maintenance platform connecting auto-care providers with customers. Intelligent scheduling, route optimization, and service automation driven by the FN3 operations layer. | Active | `#60a5fa` |
  | DRYJETS | On-Demand Services | On-demand service coordination platform. Resource matching, real-time dispatch, and contractor management — operational complexity handled by systems, not headcount. | Contracting | `#fbbf24` |
  | DAWA | Healthcare Infrastructure | Morocco healthcare infrastructure modernization. AI-driven workflow optimization and patient coordination systems. The FN3 model applied to public sector operational transformation. | Concept | `#a78bfa` |
  | BIO | To Be Announced | Early concept stage. The FN3 operating model is being applied to a new vertical. Details to follow. | Concept | `#374151` |

---

## 8. Chapter 03 — How We Work (`/how-we-work`)

### Page Hero
- **Title:** `The Operating Model, Available`
- **Description:** "The same operational intelligence FN3 uses to run its ventures is available to external clients. Six service capabilities. One integrated system. No agency overhead."

### Statement Section
- **Background:** `#fffbfb`, `border-bottom: 1px solid #fde8e8`, `padding: 80px 48px`
- **Label:** `The Offer` — `#f87171`
- **Headline:** "You don't hire us. You **integrate** us." — `clamp(32px, 3.5vw, 40px)`, `font-weight: 800`, `letter-spacing: −1.5px`, `#1c1917`. The word `integrate` in `#b91c1c`.
- **Sub:** "FN3 doesn't parachute in with slide decks. We plug the operating system directly into your business — agents, automation, and frameworks that run alongside your team, not above it." — 16px, `#78716c`, `max-width: 520px`, `line-height: 1.75`

### Six Capabilities
- **Background:** `#ffffff`, `border-bottom: 1px solid #f3f4f6`, `padding: 80px 48px`
- **Label:** `Six Capabilities` — `#f87171`
- **Row layout:** `grid-template-columns: 240px 1fr`, `gap: 48px`, `align-items: start`
- **Row borders:** `border-top: 1px solid #f3f4f6` per row, last row also `border-bottom`
- **Row padding:** `36px 0`
- **Left — Capability number:** 9px monospace, `#f87171`, `letter-spacing: 0.2em`, `margin-bottom: 8px`. Title below: 16px, `font-weight: 700`, `#1c1917`, `letter-spacing: −0.3px`
- **Right — Description:** 14px, `#78716c`, `line-height: 1.75`
- **Content:**
  | Num | Title | Description |
  |---|---|---|
  | CAPABILITY 01 | Automation Integration | Map existing operations. Identify automation opportunities. Design and deploy automation that eliminates manual work without disrupting what's working. Built for operations teams, not IT departments. |
  | CAPABILITY 02 | Agent Deployment | Purpose-built AI agents for specific operational roles. Not generic chatbots — configured agents with memory, context, and defined responsibilities. A workforce extension, not a tool upgrade. |
  | CAPABILITY 03 | Operating System Design | The frameworks, decision layers, and systems architecture behind how FN3 runs. Applied to your business. Includes SLA design, transfer pricing models, and the management layer that makes scale possible without chaos. |
  | CAPABILITY 04 | Context Engineering | Building the living context layer that keeps AI systems accurate, current, and operationally relevant. The difference between AI that hallucinates and AI that actually runs your business. |
  | CAPABILITY 05 | Infrastructure & Observability | Cloud infrastructure, database architecture, and observability pipelines. Built with the same standards FN3 uses internally — OpenTelemetry, traces, metrics, and alerting that actually tells you what's happening. |
  | CAPABILITY 06 | Product & Platform Strategy | From concept to operating platform. Product architecture, roadmap design, and platform strategy informed by the FN3 holding company model. For founders and operators who are building something that needs to scale. |

### Engagement Process
- **Background:** `#0c0a0a`, `padding: 80px 48px`
- **Label:** `How an Engagement Works` — 9px monospace, `#3f3232` (`--dark-text`, ghost label)
- **Layout:** 4 equal columns, `border-right: 1px solid #1a1212` (`--dark-border`) between columns, `margin-top: 40px`
- **Step number:** 9px monospace, `#b91c1c`, `letter-spacing: 0.2em`, `margin-bottom: 16px`
- **Step title:** 15px, `font-weight: 700`, `#fff`, `margin-bottom: 10px`
- **Step body:** 12px, `#3f3232` (`--dark-text`), `line-height: 1.65`
- **Content:**
  | Num | Title | Body |
  |---|---|---|
  | STEP 01 | Operational Audit | We map your current operations. Where the gaps are, where the leverage is, what's ready for automation now. |
  | STEP 02 | System Design | We design the operational layer — agents, automations, frameworks — tailored to your business, not templated. |
  | STEP 03 | Integration & Deploy | We build and deploy directly into your stack. No handoff decks. We run it until it runs itself. |
  | STEP 04 | Compound & Expand | The system learns. Each month it does more. Capabilities expand as confidence in the foundation grows. |

---

## 9. Chapter 04 — Work With Us (`/work-with-us`)

### Page Hero
- **Title:** `Let's Talk Operations`
- **Description:** "No intake form. No discovery call booking widget. If you've read this far, you know if FN3 is the right fit. Reach out directly."

### Contact Section
- **Background:** `#fffbfb`, `padding: 100px 48px`, `min-height: 60vh`
- **Label:** `Get In Touch` — `#f87171`
- **Question:** "Ready to bring operational intelligence into your business?" — Georgia serif italic, `clamp(32px, 4vw, 52px)`, `#1c1917`, `letter-spacing: −1px`, `max-width: 600px`, `margin-bottom: 48px`
- **Email:** `hello@flownexis3.com →` — 28px, `font-weight: 800`, `#b91c1c`, `letter-spacing: −0.5px`, `border-bottom: 2px solid #fde8e8`, inline-block, `padding-bottom: 4px`, `margin-bottom: 48px`. Hover: `border-bottom-color: #b91c1c`
- **Three paths:** `display: flex`, `gap: 48px`
  - Each column: `border-top: 1px solid #fde8e8`, `padding-top: 20px`, `width: 200px`
  - Label: 9px monospace, `#f87171`, uppercase, `letter-spacing: 0.2em`, `margin-bottom: 8px`
  - Text: 13px, `#78716c`, `line-height: 1.6`
  - **For Clients:** Tell us what you're building and where operations are breaking down. We'll respond within 48 hours.
  - **For Partners:** Strategic partnerships, joint ventures, and collaborative builds. We're selective but always open to the right conversation.
  - **For Investors:** FN3 is not actively raising. If you're building a long-term thesis around operational AI, we want to know you.

---

## 10. Motion & Interaction

### Scroll Animations
| Trigger | Elements | Animation |
|---|---|---|
| Scroll into view | All section headings, body text, labels | `translateY(20px) → 0` + `opacity: 0 → 1`, 600ms, `ease-out` |
| Scroll into view | Numbers strip | Count-up from 0, 1200ms, `ease-out`. `24/7` fades in without count-up. |
| Page load | Hero eyebrow, manifesto lines, rule, statement, sub-headline | Staggered appearance: 200ms initial delay, each element staggered 80ms apart, in top-to-bottom order. Animation: `opacity: 0 → 1`, 600ms `ease-out` — no translateY on page load |

### Hover States
| Element | Hover Behaviour |
|---|---|
| Nav links | Colour change: `rgba(255,255,255,0.5) → rgba(255,255,255,1.0)`, implement as `color` transition not element `opacity`, `transition: color 150ms` |
| Nav CTA `Work With Us →` | `border-bottom-color: rgba(255,255,255,1.0)` |
| Chapter entry rows | `background: #fffbfb`, `transition: background 150ms ease` |
| Email link | `border-bottom-color: #b91c1c` full opacity |
| Back to Home (chapter nav) | Colour change: `rgba(255,255,255,0.5) → rgba(255,255,255,1.0)` — implement as a `color` property transition, not element-level `opacity` (to avoid dimming child elements) |

### Eliminated
- No `transition-all`
- No `hover:scale`
- No spring/bounce physics
- No aurora or radial glow backgrounds

---

## 11. Tech Stack

- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS with custom tokens in `tailwind.config.js`
- **Animation:** Framer Motion — `useInView` for scroll triggers, `useScroll` + `useTransform` for any parallax
- **Fonts:** Inter via `next/font` (primary), Georgia via system stack (manifesto moments), monospace via system stack
- **No new UI component libraries** — all components custom-built
- **Deployment:** Vercel (existing setup)

---

## 12. Copy Rules (For Implementation)

- No verbatim text from `FlowNexis3.md` or `FN3 Command Center.md`
- Ventures described as proof of system, not as products
- Prohibited words: "revolutionizing," "transforming," "innovative," "streamline," "optimize," "leverage" (as a verb), "cutting-edge," "best-in-class"
- Voice: direct, confident, architectural — not startup-hype
- CTAs: action + what they get ("Bring FN3 Into Your Operations" not "Get Started")
- Numbers not yet confirmed (e.g., agent count) framed as vision: "200+ Agent Vision", not stated as fact
