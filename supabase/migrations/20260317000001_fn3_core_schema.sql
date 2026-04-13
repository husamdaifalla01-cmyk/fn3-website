-- FN3 Core Schema Migration
-- Creates all 19 tables for the FN3 Agentic Workforce system

-- Enable required extensions

CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pg_cron";

-- ============================================================
-- COMPANY STATE
-- ============================================================

-- All FN3 ventures
CREATE TABLE fn3_ventures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'concept' CHECK (status IN ('active', 'concept', 'paused', 'exited')),
  departments_enabled jsonb NOT NULL DEFAULT '["exec","product","sales","marketing","leadgen","acquisition","support","legal","qa"]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  auto_provisioned bool NOT NULL DEFAULT false
);

-- Living heartbeat PRD per dept per venture
CREATE TABLE fn3_prd (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id uuid REFERENCES fn3_ventures(id) ON DELETE CASCADE,
  department text NOT NULL CHECK (department IN ('exec','product','sales','marketing','leadgen','acquisition','support','legal','qa','dev')),
  priority int NOT NULL CHECK (priority BETWEEN 1 AND 10),
  objective text NOT NULL,
  kpis jsonb NOT NULL DEFAULT '{}'::jsonb,
  constraints jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','paused','completed','blocked')),
  last_reviewed_at timestamptz,
  owner_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Every agent in the registry
CREATE TABLE fn3_agent_registry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name text NOT NULL UNIQUE,
  agent_type text NOT NULL CHECK (agent_type IN ('supervisor','worker')),
  department text NOT NULL CHECK (department IN ('exec','product','sales','marketing','leadgen','acquisition','support','legal','qa','dev')),
  venture_id uuid REFERENCES fn3_ventures(id) ON DELETE CASCADE,
  skill_version_id uuid, -- FK added after fn3_skill_versions is created
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','paused','deprecated')),
  created_at timestamptz NOT NULL DEFAULT now(),
  last_run_at timestamptz
);

-- ============================================================
-- ORCHESTRATION
-- ============================================================

-- Jobs from orchestrator to supervisors
CREATE TABLE fn3_dispatch_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id uuid NOT NULL REFERENCES fn3_ventures(id) ON DELETE CASCADE,
  department text NOT NULL CHECK (department IN ('exec','product','sales','marketing','leadgen','acquisition','support','legal','qa','dev')),
  supervisor_agent text NOT NULL REFERENCES fn3_agent_registry(agent_name) ON DELETE CASCADE,
  task_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  priority int NOT NULL DEFAULT 5 CHECK (priority BETWEEN 1 AND 10),
  status text NOT NULL DEFAULT 'queued' CHECK (status IN ('queued','picked_up','completed','failed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  picked_up_at timestamptz,
  completed_at timestamptz,
  tick_id uuid -- FK added after fn3_heartbeat_log is created
);

-- Live status of every agent
CREATE TABLE fn3_agent_state (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name text NOT NULL UNIQUE REFERENCES fn3_agent_registry(agent_name) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'idle' CHECK (status IN ('idle','busy','failed','learning')),
  current_job_id uuid REFERENCES fn3_dispatch_queue(id) ON DELETE SET NULL,
  last_heartbeat timestamptz NOT NULL DEFAULT now(),
  failure_reason text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Full tick audit trail
CREATE TABLE fn3_heartbeat_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tick_at timestamptz NOT NULL DEFAULT now(),
  ventures_active int NOT NULL DEFAULT 0,
  jobs_dispatched int NOT NULL DEFAULT 0,
  jobs_failed int NOT NULL DEFAULT 0,
  agents_busy int NOT NULL DEFAULT 0,
  agents_failed int NOT NULL DEFAULT 0,
  tick_duration_ms int,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Add FK from dispatch_queue → heartbeat_log now that both tables exist
ALTER TABLE fn3_dispatch_queue
  ADD CONSTRAINT fk_dispatch_tick FOREIGN KEY (tick_id) REFERENCES fn3_heartbeat_log(id) ON DELETE SET NULL;

-- Decisions requiring Husam via Telegram
CREATE TABLE fn3_escalations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name text NOT NULL,
  venture_id uuid REFERENCES fn3_ventures(id) ON DELETE CASCADE,
  department text NOT NULL,
  decision_required text NOT NULL,
  context text NOT NULL,
  options jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','resolved','expired')),
  resolved_action text,
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  telegram_message_id text
);

-- ============================================================
-- WORK PRODUCT
-- ============================================================

-- All agent output artifacts
CREATE TABLE fn3_agent_outputs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name text NOT NULL,
  venture_id uuid NOT NULL REFERENCES fn3_ventures(id) ON DELETE CASCADE,
  department text NOT NULL,
  dispatch_job_id uuid REFERENCES fn3_dispatch_queue(id) ON DELETE SET NULL,
  output_type text NOT NULL CHECK (output_type IN ('content','report','email','proposal','code','analysis','decision','lead','ticket','ad_copy','misc')),
  output_body text NOT NULL,
  output_metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  quality_score float CHECK (quality_score BETWEEN 0 AND 10),
  created_at timestamptz NOT NULL DEFAULT now(),
  embedding vector(1536)
);

-- Customer and prospect conversations
CREATE TABLE fn3_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id uuid NOT NULL REFERENCES fn3_ventures(id) ON DELETE CASCADE,
  channel text NOT NULL CHECK (channel IN ('email','chat','ticket','social')),
  contact_id text NOT NULL,
  messages jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','resolved','escalated')),
  owner_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Supervisor summaries per tick per venture
CREATE TABLE fn3_department_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id uuid NOT NULL REFERENCES fn3_ventures(id) ON DELETE CASCADE,
  department text NOT NULL,
  tick_id uuid REFERENCES fn3_heartbeat_log(id) ON DELETE SET NULL,
  summary text NOT NULL,
  tasks_completed int NOT NULL DEFAULT 0,
  tasks_failed int NOT NULL DEFAULT 0,
  escalations_raised int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- INTELLIGENCE
-- ============================================================

-- Per-agent daily metrics
CREATE TABLE fn3_agent_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name text NOT NULL,
  venture_id uuid REFERENCES fn3_ventures(id) ON DELETE CASCADE,
  department text NOT NULL,
  metric_date date NOT NULL DEFAULT CURRENT_DATE,
  output_count int NOT NULL DEFAULT 0,
  avg_quality_score float CHECK (avg_quality_score BETWEEN 0 AND 10),
  task_completion_rate float CHECK (task_completion_rate BETWEEN 0 AND 1),
  escalation_rate float CHECK (escalation_rate BETWEEN 0 AND 1),
  downstream_success_rate float CHECK (downstream_success_rate BETWEEN 0 AND 1),
  baseline_quality float CHECK (baseline_quality BETWEEN 0 AND 10),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(agent_name, metric_date)
);

-- Revenue and growth per venture
CREATE TABLE fn3_venture_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id uuid NOT NULL REFERENCES fn3_ventures(id) ON DELETE CASCADE,
  metric_date date NOT NULL DEFAULT CURRENT_DATE,
  mrr numeric(12,2) NOT NULL DEFAULT 0,
  new_mrr numeric(12,2) NOT NULL DEFAULT 0,
  churned_mrr numeric(12,2) NOT NULL DEFAULT 0,
  expansion_mrr numeric(12,2) NOT NULL DEFAULT 0,
  active_customers int NOT NULL DEFAULT 0,
  new_customers int NOT NULL DEFAULT 0,
  churned_customers int NOT NULL DEFAULT 0,
  leads_generated int NOT NULL DEFAULT 0,
  trials_started int NOT NULL DEFAULT 0,
  cac numeric(12,2),
  ltv numeric(12,2),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(venture_id, metric_date)
);

-- External data agents scraped/researched
CREATE TABLE fn3_market_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id uuid REFERENCES fn3_ventures(id) ON DELETE CASCADE,
  signal_type text NOT NULL CHECK (signal_type IN ('competitor_move','market_trend','regulatory','customer_insight','opportunity')),
  source text NOT NULL,
  source_url text,
  summary text NOT NULL,
  raw_content text,
  relevance_score float CHECK (relevance_score BETWEEN 0 AND 1),
  actioned bool NOT NULL DEFAULT false,
  agent_name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- SELF-LEARNING
-- ============================================================

-- Skill file versions per agent
CREATE TABLE fn3_skill_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name text NOT NULL,
  version int NOT NULL,
  skill_content text NOT NULL,
  is_active bool NOT NULL DEFAULT false,
  deployed_at timestamptz,
  rolled_back_at timestamptz,
  created_from_proposal_id uuid, -- FK added after fn3_skill_proposals is created
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(agent_name, version)
);

-- Add FK from agent_registry → skill_versions now that skill_versions exists
ALTER TABLE fn3_agent_registry
  ADD CONSTRAINT fk_skill_version FOREIGN KEY (skill_version_id) REFERENCES fn3_skill_versions(id) ON DELETE SET NULL;

-- Proposed improvements submitted by agents
CREATE TABLE fn3_skill_proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name text NOT NULL,
  current_skill_version_id uuid REFERENCES fn3_skill_versions(id) ON DELETE SET NULL,
  proposed_skill_diff text NOT NULL,
  proposed_skill_full text NOT NULL,
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  confidence_score float CHECK (confidence_score BETWEEN 0 AND 1),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','rolled_back')),
  reviewer_agent text,
  rejection_reason text,
  backtest_result_id uuid, -- FK added after fn3_backtest_results is created
  approved_at timestamptz,
  deployed_at timestamptz,
  monitoring_until timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Add FK from skill_versions → skill_proposals now that skill_proposals exists
ALTER TABLE fn3_skill_versions
  ADD CONSTRAINT fk_created_from_proposal FOREIGN KEY (created_from_proposal_id) REFERENCES fn3_skill_proposals(id) ON DELETE SET NULL;

-- Self-learning cycle audit log
CREATE TABLE fn3_learning_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name text NOT NULL,
  cycle_date date NOT NULL DEFAULT CURRENT_DATE,
  metrics_summary jsonb NOT NULL DEFAULT '{}'::jsonb,
  patterns_found text NOT NULL,
  action_taken text NOT NULL CHECK (action_taken IN ('proposed_improvement','no_change_needed','retry_previous')),
  proposal_id uuid REFERENCES fn3_skill_proposals(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Backtest results for proposed skill improvements
CREATE TABLE fn3_backtest_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id uuid NOT NULL REFERENCES fn3_skill_proposals(id) ON DELETE CASCADE,
  task_ids_tested jsonb NOT NULL DEFAULT '[]'::jsonb,
  per_task_scores jsonb NOT NULL DEFAULT '[]'::jsonb,
  aggregate_score float NOT NULL CHECK (aggregate_score BETWEEN 0 AND 10),
  baseline_score float NOT NULL CHECK (baseline_score BETWEEN 0 AND 10),
  passed bool NOT NULL DEFAULT false,
  reviewer_notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Add FK from skill_proposals → backtest_results now that backtest_results exists
ALTER TABLE fn3_skill_proposals
  ADD CONSTRAINT fk_backtest_result FOREIGN KEY (backtest_result_id) REFERENCES fn3_backtest_results(id) ON DELETE SET NULL;

-- ============================================================
-- TOOL TRACKING
-- ============================================================

-- All external tool calls made by agents
CREATE TABLE fn3_tool_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name text NOT NULL,
  venture_id uuid REFERENCES fn3_ventures(id) ON DELETE CASCADE,
  tool_name text NOT NULL,
  tool_input jsonb NOT NULL DEFAULT '{}'::jsonb,
  tool_output jsonb,
  success bool,
  error_message text,
  duration_ms int,
  cost_cents int DEFAULT 0,
  dispatch_job_id uuid REFERENCES fn3_dispatch_queue(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Tool permissions per agent
CREATE TABLE fn3_tool_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name text NOT NULL REFERENCES fn3_agent_registry(agent_name) ON DELETE CASCADE,
  tool_name text NOT NULL,
  allowed bool NOT NULL DEFAULT true,
  rate_limit_per_hour int,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(agent_name, tool_name)
);

-- ============================================================
-- INDEXES
-- ============================================================

-- fn3_prd
CREATE INDEX idx_fn3_prd_venture_dept ON fn3_prd(venture_id, department);
CREATE INDEX idx_fn3_prd_status ON fn3_prd(status) WHERE status = 'active';
CREATE INDEX idx_fn3_prd_priority ON fn3_prd(priority DESC);

-- fn3_dispatch_queue
CREATE INDEX idx_fn3_dispatch_queue_supervisor ON fn3_dispatch_queue(supervisor_agent);
CREATE INDEX idx_fn3_dispatch_queue_status ON fn3_dispatch_queue(status) WHERE status = 'queued';
CREATE INDEX idx_fn3_dispatch_queue_venture ON fn3_dispatch_queue(venture_id);

-- fn3_agent_state
CREATE INDEX idx_fn3_agent_state_status ON fn3_agent_state(status);

-- fn3_agent_outputs
CREATE INDEX idx_fn3_agent_outputs_venture ON fn3_agent_outputs(venture_id);
CREATE INDEX idx_fn3_agent_outputs_agent ON fn3_agent_outputs(agent_name);
CREATE INDEX idx_fn3_agent_outputs_type ON fn3_agent_outputs(output_type);
CREATE INDEX idx_fn3_agent_outputs_created ON fn3_agent_outputs(created_at DESC);

-- pgvector index for semantic memory
CREATE INDEX idx_fn3_agent_outputs_embedding ON fn3_agent_outputs
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- fn3_agent_metrics
CREATE INDEX idx_fn3_agent_metrics_agent_date ON fn3_agent_metrics(agent_name, metric_date DESC);

-- fn3_venture_metrics
CREATE INDEX idx_fn3_venture_metrics_venture_date ON fn3_venture_metrics(venture_id, metric_date DESC);

-- fn3_conversations
CREATE INDEX idx_fn3_conversations_venture ON fn3_conversations(venture_id);
CREATE INDEX idx_fn3_conversations_contact ON fn3_conversations(contact_id);
CREATE INDEX idx_fn3_conversations_status ON fn3_conversations(status) WHERE status = 'open';

-- fn3_escalations
CREATE INDEX idx_fn3_escalations_status ON fn3_escalations(status) WHERE status = 'pending';
CREATE INDEX idx_fn3_escalations_venture ON fn3_escalations(venture_id);

-- fn3_skill_versions
CREATE INDEX idx_fn3_skill_versions_agent_active ON fn3_skill_versions(agent_name) WHERE is_active = true;

-- fn3_skill_proposals
CREATE INDEX idx_fn3_skill_proposals_agent ON fn3_skill_proposals(agent_name);
CREATE INDEX idx_fn3_skill_proposals_status ON fn3_skill_proposals(status) WHERE status = 'pending';

-- fn3_tool_calls
CREATE INDEX idx_fn3_tool_calls_agent ON fn3_tool_calls(agent_name);
CREATE INDEX idx_fn3_tool_calls_created ON fn3_tool_calls(created_at DESC);
