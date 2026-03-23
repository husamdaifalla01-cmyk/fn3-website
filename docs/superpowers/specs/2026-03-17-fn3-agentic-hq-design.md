# FN3 Agentic HQ — System Design Spec

**Date:** 2026-03-17
**Status:** Approved
**Author:** Husam Ahmed

---

## Vision

FN3 operates as a multi-venture tech holding company (SUBZII, DETAILMAPS, DRYJETS, DAWA, BIO, and future ventures). This system replaces the need for a large human team with a fully autonomous agentic workforce — a team of AI employees organized into departments, running 24/7, improving themselves over time, and operating across all ventures in parallel.

The mental model: **hire a team of employees that generate work, produce profit, and compound in intelligence over time.**

---

## Architecture Overview

```
FN3 AGENTIC HQ
│
├── MASTER ORCHESTRATOR (Node.js daemon — Supabase Edge Function, always-on)
│   ├── Heartbeat: every 15 minutes (scheduled via Supabase pg_cron)
│   ├── Reads fn3_prd → venture-scoped objectives
│   ├── Dispatches jobs to 9 departments × N ventures
│   ├── Manages worker pool (max 10 concurrent claude sessions per instance)
│   └── Routes escalations → Husam via Telegram
│
├── VENTURES (auto-provisioned per fn3_ventures row)
│   ├── SUBZII, DETAILMAPS, DRYJETS, DAWA, BIO
│   ├── HQ (cross-venture lane, always active)
│   └── Future ventures: one DB insert → full team auto-provisioned
│
├── 9 DEPARTMENTS (per venture — see canonical list below)
│
├── DEV TEAM (platform-wide — builds and maintains FN3 itself)
│
├── SUPABASE (company brain — state, memory, intelligence, learning)
│
├── EXECUTION (Claude Code SDK + Claude Max subscription, no API keys)
│
└── SELF-LEARNING LOOP (every 24h per agent)
```

---

## Canonical Department List

There are **9 departments**. Each has a canonical slug used in all Supabase columns, agent registry entries, and dispatch logic.

| # | Department Name | Slug | Scope |
|---|---|---|---|
| 1 | Executive | `exec` | Per-venture + HQ |
| 2 | Product Management | `product` | Per-venture |
| 3 | Sales | `sales` | Per-venture |
| 4 | Marketing | `marketing` | Per-venture |
| 5 | Lead Generation | `leadgen` | Per-venture |
| 6 | Customer Acquisition | `acquisition` | Per-venture |
| 7 | Customer Support | `support` | Per-venture |
| 8 | Legal | `legal` | Per-venture + HQ |
| 9 | QA | `qa` | Platform-wide (shared across all ventures) |

**QA is platform-wide.** One QA department serves all ventures. It does not duplicate per venture. All other 8 departments are provisioned per venture.

---

## The Heartbeat PRD

The living source of truth for the entire organization. The Master Orchestrator reads this on every tick before dispatching any work.

### Table: `fn3_prd`

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| venture_id | uuid | FK to fn3_ventures (NULL = HQ-level objective) |
| department | text | One of the 9 canonical slugs above |
| priority | int | 1–10 |
| objective | text | What must be achieved this cycle |
| kpis | jsonb | Metrics that define success |
| constraints | jsonb | Budget limits, brand rules, legal guardrails |
| status | text | `active` / `paused` / `completed` / `blocked` |
| last_reviewed_at | timestamptz | Orchestrator updates on every tick |
| owner_agent | text | Which supervisor agent owns this objective |
| created_at | timestamptz | |
| updated_at | timestamptz | |

**Rule:** All agents read their relevant PRD rows before starting any task. This ensures every agent across every venture is aligned to current company priorities without manual coordination.

---

## Ventures Registry

### Table: `fn3_ventures`

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| name | text | `SUBZII`, `DETAILMAPS`, `DRYJETS`, `DAWA`, `BIO`, `HQ` |
| status | text | `active` / `concept` / `paused` / `exited` |
| departments_enabled | jsonb | Array of enabled department slugs |
| created_at | timestamptz | |
| auto_provisioned | bool | True if orchestrator spun this up from a new ventures row |

**Seed rows:** SUBZII, DETAILMAPS, DRYJETS, DAWA, BIO, HQ — all inserted at setup.

**HQ venture:** Covers cross-venture work for `exec` and `legal` departments. Legal and Exec agents assigned to HQ can be tasked against any venture when needed.

---

## Agent Registry

### Table: `fn3_agent_registry`

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| agent_name | text | e.g. `subzii-sales-pipeline-agent` |
| agent_type | text | `supervisor` / `worker` |
| department | text | Canonical department slug |
| venture_id | uuid | FK to fn3_ventures |
| skill_version_id | uuid | FK to fn3_skill_versions — current active skill |
| status | text | `active` / `paused` / `deprecated` |
| created_at | timestamptz | |
| last_run_at | timestamptz | |

**Naming convention:** `{venture_slug}-{department_slug}-{role}-agent`
Example: `subzii-sales-pipeline-agent`, `hq-legal-contract-agent`, `platform-qa-gate-agent`

---

## Master Orchestrator

A Node.js + TypeScript daemon deployed as a Supabase Edge Function (always-on via pg_cron trigger, auto-restart on crash).

### Heartbeat Cycle (every 15 minutes)

```
TICK START
│
├── 1. Read fn3_prd → get all active objectives grouped by venture_id + department
├── 2. Read fn3_agent_state → which agents are idle / busy / failed
├── 3. Read fn3_venture_metrics → what's working, what's degraded
├── 4. Compute dispatch plan (priority-weighted, venture-aware)
├── 5. Write jobs to fn3_dispatch_queue for each supervisor
├── 6. Supabase Realtime notifies supervisors instantly (no blocking wait)
├── 7. Supervisors update fn3_agent_state to 'busy' on pickup (acknowledgement)
├── 8. After 2 minutes: check fn3_agent_state for un-acknowledged jobs → re-queue
└── TICK END — write summary to fn3_heartbeat_log
```

**Acknowledgement:** The orchestrator does not block waiting for supervisors. After dispatching, it polls `fn3_agent_state` 2 minutes into the next tick cycle. Jobs not picked up are re-queued and the failed agent is flagged.

### Venture Lanes

```
├── SUBZII lane        → 8 per-venture departments
├── DETAILMAPS lane    → 8 per-venture departments
├── DRYJETS lane       → 8 per-venture departments
├── DAWA lane          → 8 per-venture departments
├── BIO lane           → 8 per-venture departments
├── [NEW VENTURE]      → auto-provisioned on new row in fn3_ventures
└── HQ lane            → exec + legal (cross-venture, always active)
```

### Escalation Flow

1. Agent writes to `fn3_escalations`
2. Supabase Edge Function fires immediately → sends Telegram message to Husam
3. Telegram message includes: venture, department, agent name, decision required, context summary, action options (A/B/C)
4. Husam replies in Telegram with chosen option (e.g. "A")
5. Telegram bot webhook writes response to `fn3_escalations.resolved_action`
6. Orchestrator detects resolution on next tick → unblocks the agent with the decision

### Failure Recovery

If a supervisor crashes or times out: orchestrator marks it `failed` in `fn3_agent_state`, logs to `fn3_heartbeat_log`, and retries on the next tick. No single agent failure stops the company.

---

## Dispatch Queue

### Table: `fn3_dispatch_queue`

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| venture_id | uuid | FK to fn3_ventures |
| department | text | Canonical department slug |
| supervisor_agent | text | FK to fn3_agent_registry.agent_name |
| task_payload | jsonb | PRD objectives, context, constraints for this job |
| priority | int | Inherited from fn3_prd.priority |
| status | text | `queued` / `picked_up` / `completed` / `failed` |
| created_at | timestamptz | |
| picked_up_at | timestamptz | |
| completed_at | timestamptz | |
| tick_id | uuid | FK to fn3_heartbeat_log — which tick created this job |

---

## Agent State

### Table: `fn3_agent_state`

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| agent_name | text | FK to fn3_agent_registry.agent_name |
| status | text | `idle` / `busy` / `failed` / `learning` |
| current_job_id | uuid | FK to fn3_dispatch_queue (null if idle) |
| last_heartbeat | timestamptz | Agent updates this every 30s while running |
| failure_reason | text | Populated on failure |
| updated_at | timestamptz | |

---

## The 9 Departments

### 1. Executive (`exec`)
- **Supervisor:** Chief of Staff Agent
- **Workers:** CPO Agent, CTO Agent, CFO Agent, Strategy Agent
- **Scope:** Venture + HQ
- **Responsibilities:** Venture strategy, resource allocation, cross-department coordination, executive reporting

### 2. Product Management (`product`)
- **Supervisor:** Head of Product Agent
- **Workers:** PM Agent, Roadmap Agent, Spec Writer Agent, Idea Validation Agent
- **Responsibilities:** Feature prioritization, PRD writing, sprint planning, idea validation via FN3 5-test framework

### 3. Sales (`sales`)
- **Supervisor:** Sales Director Agent
- **Workers:** Pipeline Agent, Proposal Agent, Follow-up Agent, CRM Agent
- **Responsibilities:** Deal pipeline management, proposal generation, follow-up sequences, CRM maintenance

### 4. Marketing (`marketing`)
- **Supervisor:** CMO Agent
- **Workers:** Content Agent, SEO Agent, Social Agent, Email Agent, Copywriter Agent
- **Responsibilities:** Content creation, SEO optimization, social publishing, email campaigns, brand voice

### 5. Lead Generation (`leadgen`)
- **Supervisor:** Growth Lead Agent
- **Workers:** Scraper Agent, Qualifier Agent, ICP Matcher Agent, Outreach Agent
- **Responsibilities:** Prospect discovery, lead qualification, ICP matching, initial outreach

### 6. Customer Acquisition (`acquisition`)
- **Supervisor:** Acquisition Director Agent
- **Workers:** Paid Ads Agent, Funnel Agent, Landing Page Agent, A/B Test Agent
- **Responsibilities:** Paid campaigns, funnel optimization, landing page creation and testing

### 7. Customer Support (`support`)
- **Supervisor:** Head of Support Agent
- **Workers:** Ticket Agent, FAQ Agent, Escalation Agent, Churn Risk Agent
- **Responsibilities:** Ticket resolution, FAQ maintenance, escalation handling, churn prediction and prevention

### 8. Legal (`legal`)
- **Supervisor:** General Counsel Agent
- **Workers:** Contract Agent, Compliance Agent, IP Agent, Risk Agent
- **Scope:** Per-venture + HQ
- **Responsibilities:** Contract drafting and review, compliance monitoring, IP protection, risk assessment

### 9. QA (`qa`) — Platform-Wide
- **Supervisor:** QA Director Agent
- **Workers:** Output Validator, Code Reviewer, Brand Checker, Self-Learning Gate Agent
- **Scope:** Shared across all ventures (one instance)
- **Responsibilities:** Output quality, code review, brand consistency, self-learning proposal review + approval

---

## Dev Team — Platform-Wide Engineering

The Dev Team builds and maintains the FN3 platform itself. It operates as a 10th department (platform-scoped, not per-venture) with 7 agents total. This team uses Claude's official MCP integrations to connect to the real tools — no paid third-party plugins.

**Total crew: 24 agents** (17 HQ business team + 7 Dev Team)

### Dev Lead Agent (Supervisor)
- Owns the FN3 platform roadmap (separate from venture PRDs)
- Receives bug reports, feature requests, and architectural decisions from the orchestrator
- Dispatches tasks to the 6 dev workers
- Writes to `fn3_department_logs` under department slug `dev`

### Frontend / UI Agent
- **Tools:** `generative-artist` skill, `frontend-design` skill
- Builds venture-facing UI, dashboards, and landing pages
- Applies Bob Ross light physics + Ogilvy psychology + Framer Motion spring physics
- Mobile-first, breathing space, CVA component system
- Output: React/Next.js components committed to the fn3 repo

### React / Codebase Agent
- **Tools:** GitHub MCP (Anthropic official)
- Owns the React codebase: component architecture, compound patterns, state machines, TypeScript strictness
- Performs refactors, dependency upgrades, code reviews of frontend output
- Enforces compound component patterns and CVA variant system from `react-architecture.md`

### Backend Agent
- **Tools:** GitHub MCP (Anthropic official)
- Owns Node.js + TypeScript server code: Edge Functions, APIs, middleware, business logic
- Writes and maintains Supabase Edge Functions for orchestration, escalation, and webhooks
- Enforces type safety, error handling, and API contract design

### Database Agent
- **Tools:** Supabase MCP (Anthropic official — `@anthropic/mcp-server-supabase`)
- Schema design, query optimization, migration writing, RLS policy management
- Primary interface for all Supabase schema changes — runs `supabase migration new` flows
- Monitors slow queries, index gaps, and table bloat via Supabase metrics

### Supabase Agent
- **Tools:** Supabase MCP (Anthropic official — `@anthropic/mcp-server-supabase`)
- Dedicated to Supabase-specific operations: Realtime subscriptions, Edge Function deployment, Storage, pgvector tuning
- Manages the `fn3-production` Supabase project config, secrets, environment variables
- Handles Supabase-level incidents: connection pool exhaustion, Realtime reconnect, Edge Function cold starts

### Platform QA Agent
- Works alongside the main QA dept but focuses exclusively on FN3 platform code (not venture output)
- Runs integration tests against the Supabase schema, orchestrator heartbeat, and Edge Functions
- Validates migrations before `supabase db push` to production

### Dev Team Tool Registry

| Agent | MCP / Skill | Source |
|---|---|---|
| Frontend / UI Agent | `generative-artist` | FN3 local skill |
| Frontend / UI Agent | `frontend-design` | Anthropic plugins |
| React / Codebase Agent | GitHub MCP | Anthropic official |
| Backend Agent | GitHub MCP | Anthropic official |
| Database Agent | Supabase MCP | Anthropic official |
| Supabase Agent | Supabase MCP | Anthropic official |

---

## Supabase Schema — Company Brain

### Company State
```
fn3_ventures            — all ventures + status
fn3_prd                 — living heartbeat PRD per dept per venture
fn3_agent_registry      — every agent, role, venture, department, skill version
```

### Orchestration
```
fn3_dispatch_queue      — jobs from orchestrator to supervisors
fn3_agent_state         — live status of every agent
fn3_heartbeat_log       — full tick audit trail
fn3_escalations         — decisions requiring Husam's approval + response loop
```

### Work Product

#### Table: `fn3_agent_outputs`

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| agent_name | text | FK to fn3_agent_registry.agent_name |
| venture_id | uuid | FK to fn3_ventures |
| department | text | Canonical department slug |
| dispatch_job_id | uuid | FK to fn3_dispatch_queue |
| output_type | text | `content` / `report` / `email` / `proposal` / `code` / `analysis` / `decision` / `lead` / `ticket` / `ad_copy` / `misc` — extensible, `misc` as catch-all |
| output_body | text | The actual output |
| output_metadata | jsonb | Tags, word count, target URL, etc. |
| quality_score | float | Set by QA agent after review |
| created_at | timestamptz | |
| embedding | vector(1536) | pgvector embedding for semantic memory |

#### Table: `fn3_conversations`

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| venture_id | uuid | FK to fn3_ventures |
| channel | text | `email` / `chat` / `ticket` / `social` |
| contact_id | text | External customer/prospect identifier |
| messages | jsonb | Array of {role, content, timestamp} |
| status | text | `open` / `resolved` / `escalated` |
| owner_agent | text | Which support agent owns this |
| created_at | timestamptz | |
| updated_at | timestamptz | |

```
fn3_department_logs     — supervisor summaries per tick per venture
```

### Intelligence

#### Table: `fn3_agent_metrics`

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| agent_name | text | FK to fn3_agent_registry.agent_name |
| venture_id | uuid | FK to fn3_ventures |
| department | text | Canonical department slug |
| metric_date | date | Day this metric row covers |
| output_count | int | Number of outputs produced |
| avg_quality_score | float | Average QA score for the day (0–10) |
| task_completion_rate | float | % of assigned tasks completed (0–1) |
| escalation_rate | float | % of tasks that required escalation (0–1) |
| downstream_success_rate | float | % of tasks where downstream agents succeeded using this output (0–1) |
| baseline_quality | float | Rolling 30-day average quality score — used as backtest pass threshold |
| created_at | timestamptz | |

```
fn3_venture_metrics     — revenue, leads, churn per venture
fn3_market_signals      — external data agents scraped/researched
```

### Self-Learning

#### Table: `fn3_skill_proposals`

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| agent_name | text | FK to fn3_agent_registry.agent_name |
| current_skill_version_id | uuid | FK to fn3_skill_versions |
| proposed_skill_diff | text | Unified diff of the proposed change |
| proposed_skill_full | text | Full proposed skill content |
| evidence | jsonb | Metrics justifying the change |
| confidence_score | float | Agent's confidence (0–1) |
| status | text | `pending` / `approved` / `rejected` / `rolled_back` |
| reviewer_agent | text | QA Gate Agent that reviewed |
| rejection_reason | text | Populated on rejection |
| backtest_result_id | uuid | FK to fn3_backtest_results |
| approved_at | timestamptz | |
| deployed_at | timestamptz | |
| monitoring_until | timestamptz | approved_at + 48h — rollback window |
| created_at | timestamptz | |

#### Table: `fn3_skill_versions`

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| agent_name | text | FK to fn3_agent_registry.agent_name |
| version | int | Auto-incrementing per agent |
| skill_content | text | Full skill/system prompt content |
| is_active | bool | Only one active version per agent |
| deployed_at | timestamptz | |
| rolled_back_at | timestamptz | Null if still active |
| created_from_proposal_id | uuid | FK to fn3_skill_proposals |
| created_at | timestamptz | |

#### Table: `fn3_learning_log`

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| agent_name | text | FK to fn3_agent_registry.agent_name |
| cycle_date | date | Date of this learning cycle |
| metrics_summary | jsonb | Snapshot of fn3_agent_metrics used as input |
| patterns_found | text | Agent's diagnosis — what worked, what failed |
| action_taken | text | `proposed_improvement` / `no_change_needed` / `retry_previous` |
| proposal_id | uuid | FK to fn3_skill_proposals (null if no_change_needed) |
| created_at | timestamptz | |

#### Table: `fn3_backtest_results`

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| proposal_id | uuid | FK to fn3_skill_proposals |
| task_ids_tested | jsonb | Array of fn3_agent_outputs.id used as test cases |
| per_task_scores | jsonb | Array of {task_id, score} for each test run |
| aggregate_score | float | Mean score across all test tasks |
| baseline_score | float | Agent's baseline_quality from fn3_agent_metrics at time of test |
| passed | bool | aggregate_score >= baseline_score |
| reviewer_notes | text | QA Gate Agent's notes |
| created_at | timestamptz | |

#### Table: `fn3_heartbeat_log`

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| tick_at | timestamptz | When the tick started |
| ventures_active | int | Number of active ventures processed |
| jobs_dispatched | int | Total jobs written to fn3_dispatch_queue |
| jobs_failed | int | Jobs that were not acknowledged |
| agents_busy | int | Agents in busy state at tick start |
| agents_failed | int | Agents in failed state at tick start |
| tick_duration_ms | int | How long the tick computation took |
| notes | text | Any anomalies or warnings |
| created_at | timestamptz | |

### Real-Time Layer
- **Supabase Realtime** — supervisors subscribe to `fn3_dispatch_queue` filtered by their `supervisor_agent` name. Wake instantly on new jobs, no polling.
- **Supabase Edge Functions** — fires on `fn3_escalations` INSERT → sends Telegram message immediately
- **pgvector** — `fn3_agent_outputs.embedding` enables semantic memory queries before each task

### Row-Level Security (RLS)

All tables with `venture_id` enforce venture-level isolation:

```sql
-- Agents authenticated with a JWT that includes venture_id claim
-- Policy pattern for per-venture tables:
CREATE POLICY venture_isolation ON fn3_agent_outputs
  USING (venture_id = (current_setting('request.jwt.claims', true)::jsonb->>'venture_id')::uuid);

-- QA department and orchestrator use service_role key (bypass RLS) since they are platform-wide
-- All other agents use anon/authenticated role with venture_id claim in JWT
```

The orchestrator and QA agents use the Supabase `service_role` key (stored as a Supabase Edge Function secret). Per-venture agents use JWTs with a `venture_id` claim scoped to their venture.

### RLS Coverage Matrix

| Table | RLS? | Policy Type |
|---|---|---|
| fn3_ventures | No | Service role only (orchestrator manages) |
| fn3_prd | Yes | venture_id claim |
| fn3_agent_registry | No | Service role only |
| fn3_dispatch_queue | No | Service role only (orchestrator + supervisors both use service role) |
| fn3_agent_state | No | Service role only |
| fn3_heartbeat_log | No | Service role only |
| fn3_escalations | No | Service role only |
| fn3_agent_outputs | Yes | venture_id claim |
| fn3_conversations | Yes | venture_id claim |
| fn3_department_logs | Yes | venture_id claim |
| fn3_agent_metrics | Yes | venture_id claim |
| fn3_venture_metrics | Yes | venture_id claim |
| fn3_market_signals | Yes | venture_id claim |
| fn3_learning_log | No | Service role only (self-learning is platform-level) |
| fn3_skill_proposals | No | Service role only |
| fn3_skill_versions | No | Service role only |
| fn3_backtest_results | No | Service role only |

### Schema Migrations

Supabase migrations are managed via the Supabase CLI (`supabase migration new`, `supabase db push`). Migration files live in `/supabase/migrations/` in the fn3-orchestrator repo. All schema changes go through migration files — no direct schema edits in production.

---

## Execution Layer

### Runtime: Claude Code SDK + Claude Max Subscription

No API keys. Every agent runs as a Claude Code subprocess via the `@anthropic-ai/claude-code` SDK. The Claude Max subscription covers all agent execution.

**Note:** Validate the exact call signature against the installed SDK version before build. The representative pattern below may require adjustment:

```typescript
import { query } from "@anthropic-ai/claude-code"

// Each agent is a streaming query — SDK version to be confirmed at build time
for await (const event of query({
  prompt: agentSystemPrompt + "\n\n" + JSON.stringify(taskContext),
  abortController: new AbortController(),
  options: {
    maxTurns: 20,
    allowedTools: ["Read", "Write", "Edit", "Bash", "Agent"],
    cwd: `/ventures/${ventureSlug}/${departmentSlug}`,
  }
})) {
  // handle streaming events
}
```

### Worker Pool

- Max 10 concurrent `claude` subprocesses **per Edge Function instance**
- If the worker pool is scaled to multiple instances, a distributed lock in Supabase (`fn3_agent_state`) prevents two instances from dispatching to the same agent simultaneously — the orchestrator checks `fn3_agent_state.status = 'busy'` before assigning
- Orchestrator queues jobs in `fn3_dispatch_queue` when all workers are saturated
- `fn3_dispatch_queue` has no hardcoded depth limit — jobs accumulate and are drained on subsequent ticks

**On concurrency at scale:** 5 ventures × 8 per-venture departments × 1 supervisor = 40 supervisors. With 10 concurrent workers, each tick dispatches in batches. Average job duration target: under 5 minutes. At 10 workers, all 40 supervisors complete within 2 ticks (30 min). Worker agents run inside supervisor sessions (as subagents), not as separate pool slots, so the 10 limit applies to supervisor sessions only.

### Skill File Storage

Skill files live in **two places, kept in sync:**

1. **Supabase** (`fn3_skill_versions.skill_content`) — the authoritative live version. Agents read their current skill via a Supabase query using their `fn3_agent_registry.skill_version_id`.
2. **Git repository** (fn3-orchestrator repo, `/skills/{venture}/{department}/{agent}.md`) — version history and rollback safety net. Every approved skill update triggers a git commit via the orchestrator.

**Read path:** Agent reads `fn3_skill_versions` where `is_active = true` for its `agent_name` → uses as system prompt.
**Write path:** QA Gate approves proposal → orchestrator updates `fn3_skill_versions`, sets new row `is_active = true`, previous row `is_active = false`, commits to git.
**Rollback path:** If 48h monitoring detects metric degradation → orchestrator sets previous `fn3_skill_versions` row back to `is_active = true`, updates `fn3_agent_registry.skill_version_id`, writes `rolled_back_at` timestamp.

### Agent Tool Set

Every agent can call:
```
read_supabase         — read venture-scoped tables (RLS enforced)
write_supabase        — write outputs, metrics, proposals
search_web            — Brave Search API for market intelligence
send_email            — Resend for outreach and support
scrape_url            — Playwright for lead gen
read_own_skill        — query fn3_skill_versions for own active skill
propose_skill_update  — write to fn3_skill_proposals
escalate              — write to fn3_escalations → triggers Telegram to Husam
```

---

## Self-Learning Loop

Runs every 24 hours per agent, triggered by a dedicated node-cron job in the orchestrator (separate from the 15-minute heartbeat).

```
SELF-LEARNING CYCLE
│
├── 1. MEASURE
│   Agent queries fn3_agent_metrics (last 7 days, own agent_name)
│   ├── output quality scores (from QA reviews)
│   ├── task completion rate
│   ├── escalation rate (lower = better)
│   ├── venture KPI impact (joined with fn3_venture_metrics)
│   └── downstream success (did agents using my output succeed?)
│
├── 2. DIAGNOSE
│   Semantic search on fn3_agent_outputs (pgvector) for own past work
│   Identifies: what worked, what failed, repeating failure patterns
│   Writes structured diagnosis → fn3_learning_log
│
├── 3. PROPOSE
│   Generates improved skill via diff against current fn3_skill_versions
│   Writes to fn3_skill_proposals:
│   ├── proposed_skill_diff + proposed_skill_full
│   ├── evidence (jsonb with supporting metric data)
│   └── confidence_score (0–1)
│
├── 4. QA GATE (Self-Learning Gate Agent, platform-wide QA dept)
│   ├── Reviews proposal for safety, brand alignment, constraint compliance
│   ├── BACKTEST: spawns sandboxed claude session with proposed skill
│   │   Re-runs 5 representative past tasks from fn3_agent_outputs
│   │   Scores outputs → writes to fn3_backtest_results
│   │   Pass threshold: average quality score ≥ current baseline
│   ├── APPROVED → orchestrator deploys, sets monitoring_until = now + 48h
│   └── REJECTED → logs rejection_reason, agent retries next 24h cycle
│
└── 5. DEPLOY + MONITOR
    New skill written to fn3_skill_versions (is_active = true)
    Git commit pushed to fn3-orchestrator repo
    Orchestrator checks monitoring window every tick for 48h
    If venture KPI metrics degrade >10% during window → auto-rollback
    Rollback: previous fn3_skill_versions row set active, git revert committed
```

### Backtest Execution Detail

The Self-Learning Gate Agent:
1. Reads the 5 most recent outputs from `fn3_agent_outputs` for the proposing agent
2. Spawns a sandboxed `claude` subprocess using the `proposed_skill_full` as system prompt
3. Sends each original task as input, captures output
4. Scores output quality (using QA scoring rubric from `fn3_skill_versions` for the QA agent)
5. Writes results to `fn3_backtest_results` with per-task scores and aggregate
6. Approves if aggregate score ≥ current agent baseline from `fn3_agent_metrics`

### Compounding Effect
- **Week 1:** Agents operate on baseline skills
- **Week 4:** Each agent has completed 4 learning cycles on real venture data
- **Month 3:** Venture-specific agents carry learned patterns no generic AI has
- **Month 6:** Per-venture specialized teams — defensible competitive moat

---

## Tech Stack

| Layer | Technology |
|---|---|
| Orchestrator runtime | Node.js + TypeScript |
| Scheduling | Supabase pg_cron (15-min heartbeat + 24h learning cycle) |
| Agent execution | Claude Code SDK (`@anthropic-ai/claude-code`) |
| AI model | Claude Max subscription (no API keys) |
| Database | Supabase (Postgres + Realtime + Edge Functions + pgvector + Storage) |
| Schema migrations | Supabase CLI |
| Deploy | Supabase Edge Functions (all server-side logic and orchestration) |
| Email | Resend |
| Web scraping | Playwright |
| Web search | Brave Search API |
| Escalation notifications | Telegram Bot API + webhook |
| Skill version control | Git (fn3-orchestrator repo) |
| Dev team database access | Supabase MCP (`@anthropic/mcp-server-supabase`) |
| Dev team codebase access | GitHub MCP (Anthropic official) |

---

## Deployment Topology

```
Supabase (managed) — everything runs here
├── fn3-production (Supabase project)
│   ├── Postgres           — 17 tables, RLS per venture, pgvector enabled
│   ├── Realtime           — supervisor job delivery, escalation events
│   ├── pg_cron            — 15-min heartbeat trigger, 24h learning cycle trigger
│   └── Storage            — skill file backups, agent output attachments
│
└── Edge Functions
    ├── fn3-orchestrator   — heartbeat daemon, dispatch logic, failure recovery
    ├── fn3-learning       — 24h self-learning cycle per agent
    ├── fn3-escalation     — fires on fn3_escalations INSERT → Telegram message
    ├── fn3-telegram-hook  — receives Telegram replies → resolves escalation
    └── fn3-api            — thin REST API for dashboard + status reads
```

**Scale-out:** Additional Edge Function instances run the orchestrator in parallel. Distributed lock via `fn3_agent_state` prevents double-dispatch. No external infrastructure required — purely Supabase.

---

## Escalations Table

### Table: `fn3_escalations`

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| agent_name | text | Agent that escalated |
| venture_id | uuid | FK to fn3_ventures |
| department | text | Department slug |
| decision_required | text | What the agent needs decided |
| context | text | Full context for Husam |
| options | jsonb | Array of {label, description} action choices |
| status | text | `pending` / `resolved` / `expired` |
| resolved_action | text | Husam's chosen option (set by Telegram webhook) |
| created_at | timestamptz | |
| resolved_at | timestamptz | |
| telegram_message_id | text | For message threading |

---

## Division of Responsibility

| Husam | Agents |
|---|---|
| Set PRD objectives | Execute all work |
| Review escalations via Telegram | Generate all outputs |
| Approve high-stakes actions | Learn and improve themselves |
| Add new ventures (one DB insert) | Run 24/7 across all ventures |
| Monitor venture metrics dashboard | Update their own skill files |

---

## Build Order

1. **Supabase schema** — all 17 tables, RLS policies, Realtime subscriptions, pgvector extension, Edge Functions skeleton
2. **Master Orchestrator** — heartbeat daemon, venture lanes, dispatch logic, failure recovery, acknowledgement poll
3. **QA Department** — built here (not step 9) because Self-Learning Gate Agent is required for step 5
4. **Department Supervisors** — one per department (8 per-venture supervisors + QA already built)
5. **Self-Learning Loop** — metrics collection, diagnosis, proposal system, QA gate, deploy + monitor + rollback
6. **Escalation + Notification** — Telegram bot, webhook, response loop, fn3_escalations integration
7. **Worker Agents** — starting with Sales + Marketing + Lead Gen (highest revenue impact), then rolling out remaining departments
8. **fn3-api + Dashboard** — read-only view of agent activity, venture metrics, escalations, skill versions
9. **Remaining worker agents** — fill out all departments for all ventures
10. **Load testing + tuning** — validate worker pool sizing, tick cadence, backtest thresholds
