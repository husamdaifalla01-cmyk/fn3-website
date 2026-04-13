-- FN3 Row Level Security Policies
-- Enforces venture-scoped data isolation for per-venture tables
-- Platform-wide tables use service_role only (no RLS needed)

-- ============================================================
-- ENABLE RLS ON VENTURE-SCOPED TABLES
-- ============================================================

ALTER TABLE fn3_prd ENABLE ROW LEVEL SECURITY;
ALTER TABLE fn3_agent_outputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE fn3_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE fn3_department_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE fn3_agent_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE fn3_venture_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE fn3_market_signals ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- HELPER FUNCTION: Extract venture_id from JWT
-- ============================================================

CREATE OR REPLACE FUNCTION fn3_venture_id_from_jwt()
RETURNS uuid
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(
    (current_setting('request.jwt.claims', true)::jsonb->>'venture_id')::uuid,
    NULL
  );
$$;

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- fn3_prd: agents can only read their venture's objectives
CREATE POLICY fn3_prd_venture_isolation ON fn3_prd
  FOR ALL
  USING (
    venture_id = fn3_venture_id_from_jwt()
    OR venture_id IS NULL  -- HQ-level objectives visible to all
  );

-- fn3_agent_outputs: agents can only read/write their venture's outputs
CREATE POLICY fn3_agent_outputs_venture_isolation ON fn3_agent_outputs
  FOR ALL
  USING (venture_id = fn3_venture_id_from_jwt());

-- fn3_conversations: venture-scoped customer conversations
CREATE POLICY fn3_conversations_venture_isolation ON fn3_conversations
  FOR ALL
  USING (venture_id = fn3_venture_id_from_jwt());

-- fn3_department_logs: venture-scoped logs
CREATE POLICY fn3_department_logs_venture_isolation ON fn3_department_logs
  FOR ALL
  USING (venture_id = fn3_venture_id_from_jwt());

-- fn3_agent_metrics: venture-scoped metrics
CREATE POLICY fn3_agent_metrics_venture_isolation ON fn3_agent_metrics
  FOR ALL
  USING (venture_id = fn3_venture_id_from_jwt() OR venture_id IS NULL);

-- fn3_venture_metrics: venture-scoped revenue data
CREATE POLICY fn3_venture_metrics_venture_isolation ON fn3_venture_metrics
  FOR ALL
  USING (venture_id = fn3_venture_id_from_jwt());

-- fn3_market_signals: venture-scoped signals (or platform-wide if no venture)
CREATE POLICY fn3_market_signals_venture_isolation ON fn3_market_signals
  FOR ALL
  USING (venture_id = fn3_venture_id_from_jwt() OR venture_id IS NULL);

-- ============================================================
-- TABLES WITH NO RLS (service_role only)
-- These are platform-wide — orchestrator + QA + dev team only
-- ============================================================
-- fn3_ventures          — service_role manages all ventures
-- fn3_agent_registry    — service_role manages agent roster
-- fn3_dispatch_queue    — service_role orchestrates all jobs
-- fn3_agent_state       — service_role tracks all agent states
-- fn3_heartbeat_log     — service_role writes all tick logs
-- fn3_escalations       — service_role manages all escalations
-- fn3_skill_versions    — service_role manages all skill versions
-- fn3_skill_proposals   — service_role manages proposal pipeline
-- fn3_learning_log      — service_role manages learning cycles
-- fn3_backtest_results  — service_role manages QA gate
-- fn3_tool_calls        — service_role tracks all tool usage
-- fn3_tool_permissions  — service_role manages permissions
