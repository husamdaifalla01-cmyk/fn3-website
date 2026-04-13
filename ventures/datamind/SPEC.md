# DataMind — Product Specification
**Status:** Design Phase
**Last Updated:** 2026-03-24
**Version:** 0.1 (in progress — approved decisions only)

---

## What It Is

A standalone AI system that acts as a senior data scientist. It takes a user's context about their AI solution, interviews them through a minimal set of targeted questions, builds a statistical or behavioral model of their domain, and generates the highest-quality synthetic data possible — at any scale, as specific as the client needs.

Two modes:
- **Model Data Mode** — generates training/evaluation datasets for ML models
- **Agent Data Mode** — generates functional environments, trajectories, personas, and eval suites for AI agents

---

## Approved Decisions

### Product
- Standalone product with its own brand (not part of FN3)
- Target buyers: both developers (API) and non-technical AI builders (chat UI)
- Data types at launch: **tabular only**
- Data types at v1.1: tabular + text/NLP

### Business Model
- **Subscription + overage** (Option D)
- Subscription tier sets a monthly row baseline
- Excess rows charged per 1K over the limit
- Stripe handles billing; usage events written to Supabase `usage` table

### Tech Stack
- **Frontend + public API:** Next.js 15 on Vercel
- **Orchestration:** TypeScript serverless functions (Vercel)
- **Generation engine:** Python serverless functions (Vercel)
- **Database:** Supabase PostgreSQL
- **Job queue:** Supabase pgmq (built into Postgres — no Redis)
- **File storage:** Supabase Storage (Parquet, CSV, JSONL outputs)
- **Realtime job status:** Supabase Realtime → UI
- **Auth:** Supabase Auth (sessions + API key management)
- **Billing:** Stripe
- **LLM:** Anthropic (primary), Google AI (fallback)
- **Deployment:** Vercel (all compute) + Supabase (all data)

### Architecture Pattern
- **Option C:** Next.js UI + async job queue + Python generation worker
- Generation is always async — client submits job, gets job ID, receives result via Realtime or webhook
- Large jobs (>100K rows) use chunked strategy: split into N × 100K invocations, each writes a Parquet shard to Supabase Storage, final merge step assembles full dataset

---

## System Architecture

```
CLIENTS
Browser (UI)                    Developer (API key)
     │                                   │
     └──────────────┬────────────────────┘
                    ▼
┌───────────────────────────────────────────┐
│           VERCEL — NEXT.JS 15              │
│                                           │
│  /app          Chat interview UI          │
│  /dashboard    Jobs, blueprints, usage    │
│  /api/v1/*     Public REST API (TS)       │
│  /api/worker/* Python generation funcs   │
│  /api/cron/*   Vercel Cron (job polling)  │
└───────┬───────────────────┬───────────────┘
        │                   │
  TS functions         Python functions
  orchestrator         generation engine
        │                   │
        └─────────┬─────────┘
                  ▼
┌───────────────────────────────────────────┐
│              SUPABASE                      │
│                                           │
│  PostgreSQL                               │
│  ├── jobs          (queue + status)       │
│  ├── blueprints    (SDD / AED store)      │
│  ├── users         (profiles + tiers)     │
│  ├── usage         (metering table)       │
│  └── quality_reports                      │
│                                           │
│  pgmq              (job queue)            │
│  Storage           (generated datasets)   │
│  Realtime          (job status → UI)      │
│  Auth              (sessions + API keys)  │
└───────────────────────────────────────────┘

EXTERNAL
Stripe       — subscriptions + overage billing
Anthropic    — LLM calls for blueprint generation
Google AI    — fallback LLM
```

---

## Phase 1: The Statistical Design Interview

### Core Principle
Five questions maximum. Everything else is inferred from domain knowledge and statistical priors. One root question splits the entire flow.

### Root Split
```
"Are you building a model that learns from data,
 or an agent that operates inside an environment?"
       │
  ┌────┴────┐
MODEL    AGENT
MODE     MODE
```

### Model Mode — 5 Questions
Each question maps directly to a statistical parameter:

| # | Question | Determines |
|---|----------|------------|
| 1 | What is your AI trying to predict or generate? | Learning task type, label structure |
| 2 | Who/what are the entities, and is this a snapshot or time series? | Sampling unit, temporal structure |
| 3 | What is the approximate rate of the outcome you care most about? | Class imbalance ratio, sampling strategy |
| 4 | What is the rarest scenario your model absolutely must get right? | Edge case taxonomy, injection frequency |
| 5 | What's more costly: false positives or false negatives? | Class weight calibration, threshold target |

### Learning Task → Auto-Inferred Properties
```
Binary Classification  → Bernoulli target, class imbalance check,
                         precision/recall tradeoff context
Multi-class            → Categorical target, Dirichlet prior
Regression             → Continuous target, heteroskedasticity check
Survival               → Weibull/log-logistic hazard, censoring mechanism
Anomaly Detection      → Extreme imbalance (0.1-2%), heavy tail distributions
LLM Fine-tuning        → Instruction-response pairs, diversity + perplexity metrics
```

### Agent Mode — 5 Questions

| # | Question | Determines |
|---|----------|------------|
| 1 | What is your agent's primary job? | World schema, tool set, trajectory structure |
| 2 | What tools does your agent have access to? | Tool response generators, response schemas |
| 3 | Who does your agent interact with? | Persona diversity, communication style distribution |
| 4 | What are the two most dangerous things your agent could do wrong? | Adversarial eval suite, world state constraints |
| 5 | Does your agent need consistent state across sessions, or is each interaction independent? | Stateless vs stateful world generation |

### Phase 1 Outputs

**Model Mode → Statistical Design Document (SDD)**
Contains: Data Generating Process, target variable spec, feature marginal distributions, causal structure (DAG), copula structure (Kendall's τ matrix), edge case taxonomy, noise profile (MCAR/MAR/MNAR), validation criteria.

**Agent Mode → Agent Environment Document (AED)**
Contains: World schema (entities, cardinality, relationships), tool contracts, state consistency model, persona distribution, evaluation suite spec.

---

## Phase 2: The Generation Factory

### Principle
Every generation run follows the same Standardized Generation Protocol (SGP). Domain knowledge lives in the blueprint. Statistical rigor lives in the protocol. They never mix.

### Standardized Generation Protocol (SGP) — Model Mode

**Step 1: SCM Construction**
Build the Structural Causal Model formally: `X_i = f_i(PA_i, ε_i)`
- `PA_i` = parent variables in DAG
- `ε_i` = exogenous noise term
- `f_i` = structural equation
- Library: pgmpy BayesianNetwork + DoWhy
- Validation: d-separation tests

**Step 2: Exogenous Variable Sampling**
For each root node: `X_i ~ F_i(θ_i)` using scipy.stats
- Continuous: Normal, LogNormal, Gamma, Beta, Weibull, Pareto, Student-t, Cauchy
- Discrete: Poisson, NegBinomial, ZeroInflated, Geometric, Hypergeometric
- Categorical: Dirichlet-Multinomial, Zipf

**Step 3: Copula-Based Joint Sampling**
Apply Gaussian Copula for residual correlations:
`C(u₁,...,uₙ) = Φₙ(Φ⁻¹(u₁),...,Φ⁻¹(uₙ); Σ)`
- Σ = Kendall's τ matrix from SDD, converted via `ρ = sin(π/2 × τ)`
- Copula selection: Gaussian (default), Clayton (lower tail), Gumbel (upper tail), Frank (light tail)
- Library: SDV copulas + statsmodels

**Step 4: Causal Propagation**
For each endogenous variable in topological order:
- Linear: `X_i = β₀ + Σ βⱼ·PA_ij + ε_i`
- Non-linear: `X_i = f(PA_i; θ) + ε_i`
- Constraint enforcement: rejection sampling (max 100 attempts), then boundary value

**Step 5: Edge Case Injection**
- `n_inject = ceil(frequency × total_rows)`
- Select random indices, apply scenario overrides
- Optional `_edge_case_type` column for downstream filtering

**Step 6: Noise & Imperfection Layer**
- MCAR: `P(missing) = π`
- MAR: `P(missing | X_obs) = σ(β·X_obs)`
- MNAR: custom domain rule
- Measurement error: `X_obs = X_true + ε_meas, ε_meas ~ N(0, σ²_meas)`
- Format noise: Faker corruption layer (typos, format inconsistencies)

**Step 7: Validation Battery**
| Test | Metric | Pass Threshold |
|------|--------|---------------|
| Marginal distributions | KS statistic D | D < 0.05 (p > 0.05) |
| Categorical distributions | χ²(k-1) | p > 0.05 |
| Correlation structure | Frobenius norm ‖Σ_syn - Σ_spec‖_F | < ε |
| Non-linear relationships | Mutual Information | I_syn ≈ I_spec ± 0.05 |
| Causal structure | DoWhy ATE | Within 15% of specified |
| TSTR (if ref data available) | AUC_TSTR / AUC_TRTR | ≥ 0.90 |
| Privacy (DCR) | Distance to closest record | median(DCR) > 5th pct of real-real |
| Constraint compliance | Domain rules | 100% |

**Step 8: Quality Score & Reflexion Loop**
```
Q = 0.25·D_score + 0.25·C_score + 0.20·Causal_score
  + 0.15·TSTR_score + 0.15·Privacy_score

Q ≥ 0.92  → CERTIFIED ✓
Q < 0.92  → identify failing component
            adjust parameters
            regenerate failing component only
            max 3 iterations → human escalation
```

### SGP Agent Mode — Additional Generators

**World State Generator**
1. Generate root entities using SCM + copula engine
2. Generate dependent entities conditioned on parent profiles
3. Build consistency index (hash table: entity_id → full object)
4. Temporal ordering pass (enforce causal timestamp ordering)
- Output: fully consistent world state, queryable as mock API or seeded test DB
- Library: networkx for graph structure

**Trajectory Generator**
Multi-role LLM simulation:
- Role 1 (User): persona-driven, matches persona profile distribution
- Role 2 (Oracle Agent): ideal policy adherence → "chosen" response
- Role 3 (Suboptimal Agent): specific failure mode → "rejected" response
- Output per trajectory: `{ system_prompt, conversation_history, tool_calls, chosen_response, rejected_response, reward_signal, success_criteria_met }`
- Formats: OpenAI fine-tuning JSONL, Anthropic format, raw

**Evaluation Suite Generator**
- Coverage-driven scenario design
- Maximize failure mode coverage at realistic distribution
- Normal (60%), edge (30%), adversarial (10%)
- Each scenario tagged: expected behavior, success/failure criteria, difficulty (1-5), failure mode targeted
- Compatible with: Braintrust, LangSmith, PromptFoo, Inspect AI

### Agent Quality Score
```
Q_agent = 0.30 × State_Consistency_Score
        + 0.25 × Behavioral_Realism_Score
        + 0.25 × Failure_Mode_Coverage
        + 0.20 × Persona_Diversity_Score

State_Consistency:      All relational lookups resolve. Zero temporal paradoxes. 100% constraint compliance.
Behavioral_Realism:     Task completion rate vs benchmark. Failure pattern distribution matches production rates.
Failure_Mode_Coverage:  % of specified failure modes in eval suite. Target: 100%.
Persona_Diversity:      KL divergence < 0.05 between generated and specified distributions.
```

### Python Libraries
| Library | Role |
|---------|------|
| SDV (Synthetic Data Vault) | GaussianCopulaSynthesizer, CTGANSynthesizer |
| pgmpy | Bayesian networks, causal graph construction |
| DoWhy | Causal effect estimation, ATE validation |
| scipy.stats | Distribution fitting and sampling |
| Faker | Realistic text fields, format noise |
| Great Expectations | Data validation, constraint checking |
| networkx | Graph structure for world state generation |
| pandas / numpy | Data manipulation and numerical computation |

---

## Output Package

Every generation job produces:

```
/job-{id}/
├── data.parquet           ← the dataset
├── data_sample.csv        ← 100-row preview
├── quality_report.json    ← all test scores, pass/fail
├── schema.json            ← field definitions + constraints
├── blueprint.json         ← the SDD or AED used
├── generation_notes.md    ← methodology, assumptions, limitations
└── recommended_splits.json ← suggested train/val/test ratios
```

---

## Roadmap

| Phase | Scope |
|-------|-------|
| v1.0 | Tabular (model mode + agent mode), Vercel + Supabase, subscription + overage billing |
| v1.1 | Text/NLP data type added |
| v2.0 | Real dataset anchoring — public datasets (Census, WHO, World Bank) as calibration |
| v3.0 | Hybrid mode — client contributes anonymized real data, system fills gaps |

---

*This document is updated continuously as design decisions are approved.*
*Pending sections: API design, database schema, agent orchestration detail, UI/UX flows.*

---

## API Design (Approved)

### Base URL & Auth
```
https://api.datamind.ai/v1
Authorization: Bearer <api_key>
```

All responses include `X-Request-ID` and `X-RateLimit-Remaining` headers.

### Core Resources
- **JOBS** — async generation runs
- **BLUEPRINTS** — saved SDDs and AEDs
- **INTERVIEW** — guided blueprint creation sessions
- **INTEGRATIONS** — external database connections
- **USAGE** — metering and billing data
- **WEBHOOKS** — job completion callbacks

### Jobs API
```
POST   /v1/jobs              Submit generation job (blueprint_id or inline blueprint)
GET    /v1/jobs              List jobs (paginated)
GET    /v1/jobs/:id          Job status + quality report
GET    /v1/jobs/:id/download Signed download URL (expires 24h)
DELETE /v1/jobs/:id          Cancel queued job
```

Job status values: `queued → building → generating → validating → packaging → complete | failed | cancelled`

Job submission accepts either:
- `blueprint_id` — use a saved blueprint
- `blueprint` — inline SDD/AED
- `integration_id` + `source_table` — derive blueprint from connected database

Quality report included on completion:
```json
{
  "quality_score": 0.94,
  "quality_report": {
    "distribution_score": 0.97,
    "correlation_score": 0.95,
    "causal_score": 0.91,
    "constraint_compliance": 1.0,
    "privacy_score": 0.93,
    "tstr_score": 0.92,
    "tests_passed": 6,
    "tests_total": 6
  }
}
```

### Blueprints API
```
POST   /v1/blueprints            Save blueprint (SDD or AED)
GET    /v1/blueprints            List saved blueprints
GET    /v1/blueprints/:id        Get blueprint
PUT    /v1/blueprints/:id        Update blueprint
DELETE /v1/blueprints/:id        Delete blueprint
POST   /v1/blueprints/validate   Validate without generating
```

### Interview API
```
POST /v1/interview/start           Begin session
POST /v1/interview/:id/respond     Answer current question
GET  /v1/interview/:id             Get session state
POST /v1/interview/:id/finalize    Accept blueprint
```

Session returns `inferences_made` array on completion — shows every automatic decision and its source, allowing user to override before generating.

### Integrations API (Supabase + future DBs)
```
POST   /v1/integrations                    Add connection
GET    /v1/integrations                    List connections
GET    /v1/integrations/:id                Connection + status
DELETE /v1/integrations/:id                Remove connection
GET    /v1/integrations/:id/schema         Browse connected schema
POST   /v1/integrations/:id/profile        Run data profiling on a table
GET    /v1/integrations/:id/profile/:table Get existing profile
```

Integration connection accepts: `project_url`, `service_role_key`, `allowed_tables`, `max_sample_rows`.

Profile output per column: fitted distribution + parameters, fit score, stats (mean/std/min/max/nulls/outliers), PII detection flag + generation strategy.

Profile output cross-column: Pearson + Spearman correlation matrix, mutual information scores, causal hints from foreign key graph.

### Webhooks API
```
POST   /v1/webhooks     Register endpoint
GET    /v1/webhooks     List webhooks
DELETE /v1/webhooks/:id Remove webhook
```

Payload signed with HMAC `X-DataMind-Signature`. Events: `job.complete`, `job.failed`, `job.cancelled`.

### Usage API
```
GET /v1/usage           Current period usage + billing
GET /v1/usage/history   Historical by month
```

### Rate Limits
| Tier | Jobs/day | Rows/job | Rows/month |
|------|----------|----------|------------|
| Free | 10 | 10K | 100K |
| Pro | 100 | 500K | 5M |
| Scale | Unlimited | 10M | Custom |

### Error Format
All errors return consistent shape:
```json
{
  "error": {
    "code": "INSUFFICIENT_CREDITS",
    "message": "Human readable with context",
    "details": {}
  },
  "request_id": "req_xxx"
}
```

Error codes: `INVALID_BLUEPRINT`, `BLUEPRINT_NOT_FOUND`, `INSUFFICIENT_CREDITS`, `JOB_NOT_FOUND`, `QUALITY_GATE_FAILED`, `RATE_LIMIT_EXCEEDED`, `INVALID_API_KEY`, `INTERVIEW_NOT_FOUND`.

---

## Supabase Integration — How It Works (Approved)

### What It Unlocks
When a client connects their Supabase project, DataMind reads their schema and profiles their real data. This:
- Reduces the interview from 5-6 questions to 2-3
- Replaces assumed distributions with empirically fitted ones
- Computes actual correlation matrix from real rows
- Uses foreign keys as causal structure hints
- Enables TSTR validation against real holdout data

### Integration Pipeline
1. **Connect** — client provides project URL + service role key (SELECT only, never writes)
2. **Schema introspection** — reads tables, columns, types, constraints, foreign keys via `information_schema`
3. **Data profiling** — samples up to 10K rows, fits distributions, computes correlations
4. **PII detection** — scans samples before any storage; PII columns flagged, excluded, replaced with Faker in generation
5. **Profile stored** — only computed stats, never raw rows
6. **Blueprint auto-generated** — from profile + 2-3 interview answers

### Shortened Interview With Integration
```
Q1: Which table/query represents your entities?
Q2: What is your AI trying to predict?
Q3: Which column is your label, and what value means positive?
```
Everything else read from the data profile.

### Security Constraints
- Credentials encrypted at rest (Supabase Vault)
- Never logged or returned in API responses
- SELECT only — no INSERT/UPDATE/DELETE/DDL ever
- Sample rows processed in memory, never persisted
- PII detected → excluded → discarded
- Max 10K rows per table (configurable down, not up)
- Full audit log of every schema read and profile run
- Each integration scoped to one DataMind workspace

---

## MCP Integration (Approved)

DataMind exposes itself as an MCP server. Any MCP-compatible agent (Claude Code, Cursor, custom agents) can call DataMind as a native tool — no HTTP client code, no manual API key wiring.

### MCP Server Name
`datamind`

### Exposed Tools

| Tool | Description |
|------|-------------|
| `datamind__start_interview` | Begin guided blueprint creation session |
| `datamind__answer_question` | Respond to current interview question |
| `datamind__generate` | Submit generation job from blueprint_id, inline blueprint, or integration |
| `datamind__job_status` | Check job progress and quality score |
| `datamind__get_download_url` | Get signed download URL when job is complete |
| `datamind__list_blueprints` | Browse saved blueprints |
| `datamind__connect_database` | Add a Supabase integration |
| `datamind__profile_table` | Run data profiling on a connected table |
| `datamind__validate_blueprint` | Validate a blueprint without generating |

### Configuration (added to ~/.claude/mcp.json)
```json
{
  "mcpServers": {
    "datamind": {
      "command": "npx",
      "args": ["-y", "@datamind/mcp-server@latest"],
      "env": {
        "DATAMIND_API_KEY": "dm_xxx"
      }
    }
  }
}
```

### Example Agent Usage
An agent building a fraud detection model calls:
```
datamind__generate({
  mode: "model",
  volume: 50000,
  blueprint: { ...inline SDD... },
  output_format: "parquet"
})
→ { job_id: "job_xxx", status: "queued" }

datamind__job_status({ job_id: "job_xxx" })
→ { status: "complete", quality_score: 0.94, download_url: "..." }
```
Full pipeline — no human in the loop.

---

## Database Schema (Approved)

### Tables

**users** — one per account. Holds plan tier and Stripe customer ID.

**api_keys** — API keys stored as bcrypt hash + visible prefix only. Never plain text.

**blueprints** — stores full SDD or AED as jsonb. Source field tracks origin: manual, interview, or integration. Versioned.

**jobs** — every generation run. Tracks status through full lifecycle, chunk progress for large jobs, quality score + full report on completion. Storage path points to Supabase Storage object.

**interview_sessions** — full answer history + inferences array (what the system decided automatically and why). Links to blueprint on completion.

**integrations** — external DB connections. Credentials encrypted via Supabase Vault. allowed_tables scopes access.

**data_profiles** — computed stats from profiling runs. One per table per integration (unique constraint). Stores column distributions, correlations, causal hints, PII column list. Never stores raw rows.

**usage_events** — one row per generation job. `stripe_reported_at` is null until reported. Partial index on null values for fast unreported event queries.

**webhooks** — registered endpoints with HMAC signing secret (hashed). Scoped to event types.

**audit_log** — every integration schema read and profile run logged. 1-year retention.

### Key Decisions
- `blueprints.spec` and `jobs.quality_report` stored as jsonb — queryable, no migrations as formats evolve
- Partial index on `usage_events(stripe_reported_at) where null` — fast billing run queries
- Supabase Vault for integration credential encryption
- Unique constraint on `data_profiles(integration_id, table_name)` — prevents duplicate profile runs
- Jobs archived after 90 days, audit log retained 1 year

---

## Spec Corrections & Clarifications (Post-Review)

### ISSUE-01 FIX: Full Database DDL

```sql
-- USERS & AUTH

create table users (
  id                   uuid primary key default gen_random_uuid(),
  email                text unique not null,
  name                 text,
  plan                 text not null default 'free', -- 'free'|'pro'|'scale'
  stripe_customer_id   text unique,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create table api_keys (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references users(id) on delete cascade,
  name          text not null,
  key_hash      text unique not null,   -- bcrypt hash
  key_prefix    text not null,          -- 'dm_live_xxxx' shown in UI
  last_used_at  timestamptz,
  expires_at    timestamptz,
  created_at    timestamptz not null default now()
);

-- BLUEPRINTS

create table blueprints (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references users(id) on delete cascade,
  name           text not null,
  mode           text not null,          -- 'model' | 'agent'
  domain         text,
  spec           jsonb not null,         -- full SDD or AED
  version        integer not null default 1,
  source         text not null default 'manual', -- 'manual'|'interview'|'integration'
  integration_id uuid references integrations(id) on delete set null,
  is_public      boolean not null default false,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index blueprints_user_id_idx on blueprints(user_id);
create index blueprints_mode_idx    on blueprints(mode);
create index blueprints_domain_idx  on blueprints(domain);

-- BLUEPRINT VERSION HISTORY (WARN-09 fix)

create table blueprint_versions (
  id           uuid primary key default gen_random_uuid(),
  blueprint_id uuid not null references blueprints(id) on delete cascade,
  version      integer not null,
  spec         jsonb not null,
  changed_by   uuid references users(id) on delete set null,
  created_at   timestamptz not null default now(),
  unique(blueprint_id, version)
);

-- JOBS

create table jobs (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references users(id) on delete cascade,
  blueprint_id     uuid references blueprints(id) on delete set null,
  integration_id   uuid references integrations(id) on delete set null,
  mode             text not null,           -- 'model' | 'agent'
  status           text not null default 'queued',
  -- 'queued'|'building'|'generating'|'validating'|'packaging'|'complete'|'failed'|'cancelled'
  stage            text,
  progress_pct     integer not null default 0,
  volume           integer not null,
  rows_generated   integer not null default 0,
  output_format    text not null default 'parquet',
  -- 'parquet'|'csv'|'jsonl'|'jsonl_openai'|'jsonl_anthropic' (jsonl variants for agent mode)
  storage_path     text,
  download_expires_at timestamptz,
  quality_score    numeric(4,3),
  quality_report   jsonb,
  billed           boolean not null default false, -- false if job failed (ISSUE-12 fix)
  error_message    text,
  webhook_url      text,
  webhook_sent_at  timestamptz,
  chunk_total      integer not null default 1,
  chunk_complete   integer not null default 0,
  credits_charged  integer not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  completed_at     timestamptz
);

create index jobs_user_id_idx    on jobs(user_id);
create index jobs_status_idx     on jobs(status);
create index jobs_created_at_idx on jobs(created_at desc);

-- JOB CHUNKS (for large job tracking)

create table job_chunks (
  id          uuid primary key default gen_random_uuid(),
  job_id      uuid not null references jobs(id) on delete cascade,
  chunk_index integer not null,
  status      text not null default 'queued',
  -- 'queued'|'processing'|'complete'|'failed'
  storage_path text,
  rows_generated integer not null default 0,
  error_message  text,
  created_at  timestamptz not null default now(),
  completed_at timestamptz,
  unique(job_id, chunk_index)
);

-- INTERVIEW SESSIONS

create table interview_sessions (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references users(id) on delete cascade,
  integration_id uuid references integrations(id) on delete set null,
  mode           text,
  status         text not null default 'active', -- 'active'|'complete'|'abandoned'
  current_step   integer not null default 1,
  total_steps    integer not null default 6,
  answers        jsonb not null default '[]',
  -- [{ question_id, question_text, answer, answered_at }]
  inferences     jsonb not null default '[]',
  -- [{ field, value, source, reasoning }]
  blueprint_id   uuid references blueprints(id) on delete set null,
  expires_at     timestamptz not null default now() + interval '7 days', -- WARN-10 fix
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index interview_sessions_user_id_idx  on interview_sessions(user_id);
create index interview_sessions_expires_at_idx on interview_sessions(expires_at)
  where status = 'active'; -- for TTL cleanup cron

-- INTEGRATIONS

create table integrations (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references users(id) on delete cascade,
  name              text not null,
  type              text not null default 'supabase', -- 'supabase'|'postgres'
  project_url       text not null,
  encrypted_key     text not null,   -- Supabase Vault encrypted service key
  allowed_tables    text[],          -- null = all tables
  max_sample_rows   integer not null default 1000,
  status            text not null default 'connected', -- 'connected'|'error'|'revoked'
  last_used_at      timestamptz,
  created_at        timestamptz not null default now()
);

create index integrations_user_id_idx on integrations(user_id);

-- DATA PROFILES

create table data_profiles (
  id             uuid primary key default gen_random_uuid(),
  integration_id uuid not null references integrations(id) on delete cascade,
  user_id        uuid not null references users(id) on delete cascade,
  table_name     text not null,
  row_count_est  bigint,
  columns        jsonb not null,
  -- [{ name, type, fitted_distribution: { type, params, fit_score },
  --    stats: { mean, std, min, max, null_rate, outlier_rate },
  --    pii_detected, pii_type, generation_strategy }]
  correlations   jsonb not null,
  -- { pearson: { "col_a__col_b": 0.71, ... },
  --   spearman: { ... }, mutual_info: { ... } }
  causal_hints   jsonb not null default '[]',
  pii_columns    text[] not null default '{}',
  sample_rows    integer not null,
  created_at     timestamptz not null default now(),
  unique(integration_id, table_name)
);

-- USAGE METERING

create table usage_events (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references users(id) on delete cascade,
  job_id             uuid references jobs(id) on delete set null,
  event_type         text not null, -- 'generation' | 'profiling'
  rows               integer not null default 0,
  period             text not null, -- '2026-03'
  stripe_reported_at timestamptz,
  created_at         timestamptz not null default now()
);

create index usage_events_user_period_idx on usage_events(user_id, period);
create index usage_events_unreported_idx  on usage_events(created_at)
  where stripe_reported_at is null;

-- WEBHOOKS

create table webhooks (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references users(id) on delete cascade,
  name            text not null,
  url             text not null,
  encrypted_secret text not null, -- ISSUE-08 fix: encrypted (not hashed) for HMAC signing
  events          text[] not null, -- ['job.complete', 'job.failed', 'job.cancelled']
  is_active       boolean not null default true,
  created_at      timestamptz not null default now()
);

-- WEBHOOK DELIVERY LOG (ISSUE-09 fix)

create table webhook_deliveries (
  id           uuid primary key default gen_random_uuid(),
  webhook_id   uuid not null references webhooks(id) on delete cascade,
  job_id       uuid references jobs(id) on delete set null,
  event        text not null,
  attempt      integer not null default 1,   -- max 3
  status       text not null,                -- 'success'|'failed'|'pending'
  http_status  integer,
  response_body text,
  next_retry_at timestamptz,                 -- null if success or max attempts reached
  created_at   timestamptz not null default now()
);

create index webhook_deliveries_retry_idx on webhook_deliveries(next_retry_at)
  where status = 'pending';

-- AUDIT LOG

create table audit_log (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references users(id) on delete set null,
  action        text not null,
  -- 'integration.schema_read' | 'integration.profile_run' | 'integration.connected'
  -- 'integration.revoked' | 'job.created' | 'job.complete' | 'job.failed'
  -- 'blueprint.created' | 'blueprint.exported' | 'api_key.created' | 'api_key.revoked'
  resource_type text not null,   -- 'integration'|'job'|'blueprint'|'api_key'
  resource_id   uuid,
  metadata      jsonb not null default '{}',
  ip_address    inet,
  created_at    timestamptz not null default now()
);

create index audit_log_user_id_idx    on audit_log(user_id);
create index audit_log_created_at_idx on audit_log(created_at desc);
```

---

### ISSUE-02 + ISSUE-03 FIX: Job Submission Full Request Body

```json
POST /v1/jobs
{
  "mode": "model",             // REQUIRED. 'model' | 'agent'
  "volume": 50000,             // REQUIRED. integer, rows to generate
  "output_format": "parquet",  // OPTIONAL. default 'parquet'
                               // model: 'parquet' | 'csv'
                               // agent: 'parquet' | 'csv' | 'jsonl' | 'jsonl_openai' | 'jsonl_anthropic'
  "blueprint_id": "bpt_xxx",   // ONE OF: blueprint_id, blueprint, or integration_id required
  "blueprint": { ...SDD/AED }, // inline — see SDD/AED schema below
  "integration_id": "int_xxx", // use connected DB to derive blueprint automatically
  "source_table": "users",     // required if integration_id provided
  "source_query": null,        // optional custom SQL instead of table name
  "tstr_validation": false,    // OPTIONAL. default false. if true + integration_id,
                               // uses real data as TSTR reference
  "webhook_url": "https://...", // OPTIONAL. overrides registered webhooks for this job
  "chunk_size": 100000         // OPTIONAL. default 100000. min 10000, max 500000
}
```

**SDD (Statistical Design Document) — inline schema:**
```json
{
  "name": "string",
  "mode": "model",
  "domain": "string",
  "learning_task": "binary_classification|multiclass|regression|survival|anomaly|llm_finetuning",
  "dgp": {
    "sampling_unit": "string",
    "observation_type": "snapshot|time_series",
    "temporal_scope_months": 24
  },
  "target": {
    "name": "string",
    "type": "binary|continuous|categorical",
    "distribution": { "type": "bernoulli|normal|categorical", "params": {} },
    "imbalance_strategy": "none|stratified|smote",
    "smote_ratio": 0.15
  },
  "fields": [{
    "name": "string",
    "type": "continuous|discrete|categorical|text|boolean",
    "distribution": { "type": "string", "params": {} },
    "constraints": [{ "op": "gt|lt|gte|lte|ne|in|not_in", "value": "any" }],
    "unit": "string",
    "source": "string"
  }],
  "causal_graph": {
    "edges": [{ "from": "string", "to": "string", "beta": 0.0 }]
  },
  "copula": {
    "type": "gaussian|clayton|gumbel|frank",
    "pairs": [{ "fields": ["a","b"], "tau": 0.0 }]
  },
  "edge_cases": [{
    "name": "string",
    "frequency": 0.0,
    "overrides": {}
  }],
  "noise_profile": {
    "missing": [{ "field": "string", "mechanism": "mcar|mar|mnar", "rate": 0.0, "rule": "string" }],
    "measurement_error": [{ "field": "string", "type": "additive|multiplicative", "sigma_factor": 0.0 }],
    "duplicate_rate": 0.0
  },
  "validation": {
    "quality_score_min": 0.92,
    "ks_p_value_min": 0.05,
    "tstr_ratio_min": 0.90
  }
}
```

**AED (Agent Environment Document) — inline schema:**
```json
{
  "name": "string",
  "mode": "agent",
  "agent_task": "customer_service|coding|research|financial|ops|custom",
  "world_schema": {
    "entities": [{
      "name": "string",
      "count": 500,
      "fields": [{ "name": "string", "type": "string", "distribution": {} }]
    }],
    "relationships": [{ "from": "string", "to": "string", "cardinality": "1:N|N:1|M:N" }]
  },
  "tools": [{
    "name": "string",
    "input_schema": {},
    "response_schema": {},
    "error_rate": 0.02,
    "latency_ms_p50": 80
  }],
  "personas": [{
    "name": "string",
    "frequency": 0.55,
    "technical_level": "low|medium|high",
    "tone": "polite|frustrated|adversarial|non_native",
    "goals": ["string"]
  }],
  "failure_modes": [{ "name": "string", "description": "string" }],
  "stateful": false,
  "eval_suite": {
    "normal_pct": 0.60,
    "edge_pct": 0.30,
    "adversarial_pct": 0.10
  }
}
```

---

### ISSUE-04 FIX: Interview API Request/Response Shapes

```json
POST /v1/interview/:id/respond
{ "answer": "string" }   // free text or one of the provided options

→ {
  "session_id": "int_xxx",
  "complete": false,
  "question": {
    "id": "q3",
    "text": "string",
    "type": "choice|text",
    "options": ["string"] | null
  },
  "progress": { "step": 3, "total": 6 }
}

// When complete:
→ {
  "session_id": "int_xxx",
  "complete": true,
  "question": null,
  "blueprint_id": "bpt_xxx",
  "blueprint": { ...full SDD or AED... },
  "inferences_made": [
    {
      "field": "target.distribution.p",
      "value": 0.042,
      "source": "ChartMogul 2024 SaaS Benchmarks",
      "reasoning": "Monthly churn rate for SMB SaaS is 3-7%; 4.2% used as midpoint"
    }
  ]
}
```

---

### ISSUE-05 FIX: Quality Score Formula

Corrected formula with all 6 components:

```
Q = 0.20·distribution_score
  + 0.20·correlation_score
  + 0.20·causal_score
  + 0.15·tstr_score
  + 0.15·privacy_score
  + 0.10·constraint_compliance

Q ≥ 0.92 → CERTIFIED ✓
Q < 0.92 → reflexion loop (max 3 iterations)

If tstr_score unavailable (no reference data): redistribute weight:
Q = 0.25·distribution_score + 0.25·correlation_score + 0.25·causal_score
  + 0.15·privacy_score + 0.10·constraint_compliance
```

---

### ISSUE-06 FIX: Frobenius Norm Threshold

```
‖Σ_syn - Σ_spec‖_F < ε  where ε = 0.10
```
If the correlation matrix has >20 features, threshold relaxed to ε = 0.15.

---

### ISSUE-07 FIX: Chunked Job Strategy

- Chunk size: 100K rows default, configurable via `chunk_size` in job request (min 10K, max 500K)
- Jobs with `volume > chunk_size` are automatically split
- Each chunk is a separate pgmq message processed by the Python worker
- Chunk status tracked in `job_chunks` table
- Merge trigger: Vercel Cron runs every 60s, queries `jobs` where `chunk_complete = chunk_total` and `status = 'generating'`, fires merge function
- Merge function: reads all Parquet shards from Storage, concatenates via pandas, writes final file, updates job status to `validating`
- Chunk failure behavior: retry chunk up to 3 times; if still failing, mark job as `failed`, delete partial shards, do not bill user

---

### ISSUE-08 FIX: Webhook Secret Storage

Webhook signing secret is **encrypted** (not hashed) using Supabase Vault so it can be retrieved for HMAC computation on outgoing requests. Only a masked preview (`whs_xxxx...`) is returned to the user in API responses. The full secret is shown once at creation and never again.

---

### ISSUE-09 FIX: Webhook Retry Behavior

- Max attempts: 3
- Backoff: immediate → 30s → 5min
- Success: HTTP 200–299
- Failure: any other status or timeout (10s timeout per attempt)
- After 3 failures: delivery marked dead, no further retries, `job.failed` event emitted to user's dashboard
- All delivery attempts logged in `webhook_deliveries` table

---

### ISSUE-10 FIX: Integration Security Model

DataMind accepts a service role key but **only ever executes read-only queries** via prepared statements using `SET TRANSACTION READ ONLY` before every connection. Additionally, users are encouraged (not required) to create a dedicated read-only Postgres role. Both approaches are documented in the integration setup UI.

---

### ISSUE-11 FIX: Pagination

All list endpoints use **cursor-based pagination**:

```json
GET /v1/jobs?limit=20&cursor=job_2k4xp9

→ {
  "data": [...],
  "meta": {
    "count": 20,
    "has_more": true,
    "next_cursor": "job_9x2mk1"
  }
}
```

Default limit: 20. Max limit: 100. Cursor is the ID of the last item in the previous page.

---

### ISSUE-12 FIX: Quality Gate Failure — Billing Behavior

If a job fails the quality gate after 3 reflexion iterations:
- Job status set to `failed`
- `jobs.billed = false`
- No usage event created
- Client is **not charged**
- Error code `QUALITY_GATE_FAILED` returned with the failing component and its score
- The partial quality report (showing which test failed) is available on the job

---

### WARN-01 FIX: output_format Enum

| Value | Mode | Description |
|-------|------|-------------|
| `parquet` | both | Apache Parquet (default) |
| `csv` | both | Comma-separated |
| `jsonl` | agent | Newline-delimited JSON (generic) |
| `jsonl_openai` | agent | OpenAI fine-tuning format |
| `jsonl_anthropic` | agent | Anthropic fine-tuning format |

---

### WARN-02 FIX: Free Tier

Free tier is a Stripe product with $0 price. Account creation flow: sign up → Stripe customer created → free plan assigned automatically. No credit card required for free tier.

---

### WARN-03 FIX: Rate Limit Window

- Job rate limits: per **calendar day** (UTC)
- API request rate limits: 100 req/min (all tiers), enforced at Vercel edge

---

### WARN-04 FIX: Download Before Complete

```json
GET /v1/jobs/:id/download (while status != 'complete')
→ 409 Conflict
{
  "error": {
    "code": "JOB_NOT_COMPLETE",
    "message": "Job is currently generating. Check job status for progress.",
    "details": { "current_status": "generating", "progress_pct": 45 }
  }
}
```

---

### WARN-05 FIX: Reflexion Loop — "Failing Component"

A "component" = one SGP step identified by its validation score. The step with the lowest score below threshold is regenerated first. Regeneration is targeted: only the sub-process responsible for that metric is re-run (e.g., if correlation_score fails → re-run copula step only, not full generation).

---

### WARN-08 FIX: LLM Fallback Trigger

Switch from Anthropic to Google AI on: HTTP 429 (rate limit), HTTP 5xx, or response timeout >8s. Circuit breaker resets after 60s.

---

### WARN-09 FIX: Blueprint Versioning

`PUT /v1/blueprints/:id` increments `version`, writes old spec to `blueprint_versions`, updates `blueprints.spec` to new value. Version history available via `GET /v1/blueprints/:id/versions`. No rollback endpoint in v1 — users must re-submit old version as new job.

---

### WARN-10 FIX: Interview Session TTL

Sessions expire after 7 days of inactivity (`expires_at` column). Vercel Cron runs nightly, marks expired active sessions as `abandoned`, does not delete (kept for analytics).

---

### WARN-11 FIX: Cancel In-Progress Jobs

`DELETE /v1/jobs/:id` cancels jobs in any pre-complete status (`queued`, `building`, `generating`, `validating`). For in-progress jobs: pgmq message flagged as cancelled, Python worker checks cancellation flag before each chunk, partial Storage shards deleted on cancellation. Client not billed.

---

### WARN-12 FIX: MCP Transport

`@datamind/mcp-server` is an npm package using **stdio transport**. It is a thin proxy: translates MCP tool calls to DataMind REST API calls, returns structured responses. Requires `DATAMIND_API_KEY` env var. No separate compute — runs in the agent's process.

---

### WARN-13 FIX: Agent Mode Quality Threshold

```
Q_agent ≥ 0.90 → CERTIFIED ✓
Q_agent < 0.90 → reflexion loop (max 3 iterations)
```

Agent mode threshold is 0.90 (vs 0.85 for model mode) reflecting the additional complexity of behavioral validation.

---

## Spec Corrections — Patch 2

### WARN-06 FIX: data_profiles column distribution jsonb schema

Each entry in `data_profiles.columns` jsonb array:
```json
{
  "name": "monthly_revenue",
  "type": "continuous",
  "fitted_distribution": {
    "type": "lognormal",
    "params": { "loc": 0, "scale": 1802.4, "s": 1.21 },
    "fit_score": 0.96,
    "scipy_name": "lognorm"
  },
  "stats": {
    "mean": 2940.0, "std": 4820.0, "min": 9.0, "max": 98000.0,
    "p25": 420.0, "p50": 980.0, "p75": 3200.0,
    "skew": 3.4, "kurtosis": 18.2,
    "null_rate": 0.0, "outlier_rate": 0.031
  },
  "pii_detected": false,
  "pii_type": null,
  "generation_strategy": null
}
```
`scipy_name` is the exact `scipy.stats` distribution name used for sampling, enabling the generation engine to reconstruct the distribution directly from the profile without re-inference.

### WARN-07 FIX: audit_log columns

Already defined in full DDL (ISSUE-01 fix). For clarity:
- `action` — action type string (full enum listed in DDL comments)
- `resource_type` — 'integration'|'job'|'blueprint'|'api_key'
- `resource_id` — UUID of affected resource
- `metadata` — jsonb, action-specific context (e.g., table name profiled, rows sampled, job volume)
- `ip_address` — inet, from request headers
- Retention: 1 year (pg_partman partition by month, drop partitions >12 months old)

### NEW-01 + WARN-13 FIX: Agent mode threshold comparison

Corrected: Agent mode threshold is **0.90**, model mode threshold is **0.92**. The value 0.85 was a typo. Final thresholds:
- Model mode: `Q ≥ 0.92 → CERTIFIED`
- Agent mode: `Q_agent ≥ 0.90 → CERTIFIED`

### NEW-02 FIX: Interview session ID prefix

Interview sessions use prefix `ses_` (e.g., `ses_p3k8wx`). Integration IDs use `int_`. No overlap.

### NEW-03 FIX: Webhook death notification

When a webhook delivery exhausts all 3 retries, the failure is recorded in `webhook_deliveries` with `status = 'failed'` and surfaced as an **in-app dashboard notification only**. It does not trigger another outgoing webhook event. No loop possible.

### NEW-04 FIX: Merge cron race condition

Merge cron uses `SELECT ... FOR UPDATE SKIP LOCKED` on the `jobs` table when querying for ready-to-merge jobs. Job status is immediately updated to `'merging'` within the same transaction before the cron releases the lock. Subsequent cron invocations skip already-locked rows. `'merging'` is added to the valid job status enum.

Updated job status flow:
```
queued → building → generating → merging → validating → packaging → complete
                                                                   → failed
                                                                   → cancelled
```

---

## Homepage Experience (Approved)

The homepage is functional, not a marketing page. The primary element is a live chat box that runs the full interview flow without requiring sign-up.

### Flow
1. User lands on homepage — chat box is immediately visible and active
2. User types their AI project context and goes through the full interview
3. System produces a complete blueprint (SDD or AED) and shows it live
4. To actually generate the dataset (run a job), user is prompted to sign up
5. Sign-up pre-loads their session so the blueprint is ready to generate immediately

### Why This Works
- Users experience the core product value before any friction
- The blueprint output is the "aha moment" — they see exactly what the system inferred about their domain
- Conversion happens at the highest-intent moment: after they've seen the result, not before

### Technical Implications
- Interview API must support unauthenticated sessions (`POST /v1/interview/start` is public, rate-limited by IP)
- Anonymous sessions stored with TTL of 24h (vs 7 days for authenticated)
- On sign-up, anonymous session linked to new user account via session handoff token
- Homepage chat is the same component used in the authenticated dashboard — no duplicate UI
- Blueprint generated from anonymous interview is saved and attached to user account on sign-up
