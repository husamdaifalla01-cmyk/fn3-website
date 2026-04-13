-- FN3 Seed Data
-- Initial ventures, HQ row, and core agent registry entries

-- ============================================================
-- VENTURES
-- ============================================================

INSERT INTO fn3_ventures (id, name, status, departments_enabled, auto_provisioned) VALUES
  ('00000000-0000-0000-0000-000000000001', 'HQ', 'active', '["exec","legal","qa","dev"]'::jsonb, false),
  ('00000000-0000-0000-0000-000000000002', 'SUBZII', 'active', '["exec","product","sales","marketing","leadgen","acquisition","support","legal"]'::jsonb, false),
  ('00000000-0000-0000-0000-000000000003', 'DETAILMAPS', 'active', '["exec","product","sales","marketing","leadgen","acquisition","support","legal"]'::jsonb, false),
  ('00000000-0000-0000-0000-000000000004', 'DRYJETS', 'concept', '["exec","product","sales","marketing","leadgen","acquisition","support","legal"]'::jsonb, false),
  ('00000000-0000-0000-0000-000000000005', 'DAWA', 'concept', '["exec","product","sales","marketing","leadgen","acquisition","support","legal"]'::jsonb, false),
  ('00000000-0000-0000-0000-000000000006', 'BIO', 'concept', '["exec","product","sales","marketing","leadgen","acquisition","support","legal"]'::jsonb, false);

-- ============================================================
-- AGENT REGISTRY — HQ + Platform Agents
-- (venture_id = HQ for cross-venture agents, NULL for platform-wide)
-- ============================================================

-- EXEC Department (HQ scope)
INSERT INTO fn3_agent_registry (agent_name, agent_type, department, venture_id) VALUES
  ('hq-exec-chief-of-staff', 'supervisor', 'exec', '00000000-0000-0000-0000-000000000001'),
  ('hq-exec-cpo', 'worker', 'exec', '00000000-0000-0000-0000-000000000001'),
  ('hq-exec-cto', 'worker', 'exec', '00000000-0000-0000-0000-000000000001'),
  ('hq-exec-cfo', 'worker', 'exec', '00000000-0000-0000-0000-000000000001'),
  ('hq-exec-strategy', 'worker', 'exec', '00000000-0000-0000-0000-000000000001');

-- LEGAL Department (HQ scope)
INSERT INTO fn3_agent_registry (agent_name, agent_type, department, venture_id) VALUES
  ('hq-legal-general-counsel', 'supervisor', 'legal', '00000000-0000-0000-0000-000000000001'),
  ('hq-legal-contract', 'worker', 'legal', '00000000-0000-0000-0000-000000000001'),
  ('hq-legal-compliance', 'worker', 'legal', '00000000-0000-0000-0000-000000000001'),
  ('hq-legal-ip', 'worker', 'legal', '00000000-0000-0000-0000-000000000001'),
  ('hq-legal-risk', 'worker', 'legal', '00000000-0000-0000-0000-000000000001');

-- QA Department (platform-wide, NULL venture_id)
INSERT INTO fn3_agent_registry (agent_name, agent_type, department, venture_id) VALUES
  ('platform-qa-director', 'supervisor', 'qa', NULL),
  ('platform-qa-output-validator', 'worker', 'qa', NULL),
  ('platform-qa-code-reviewer', 'worker', 'qa', NULL),
  ('platform-qa-brand-checker', 'worker', 'qa', NULL),
  ('platform-qa-self-learning-gate', 'worker', 'qa', NULL);

-- DEV Department (platform-wide, NULL venture_id)
INSERT INTO fn3_agent_registry (agent_name, agent_type, department, venture_id) VALUES
  ('platform-dev-lead', 'supervisor', 'dev', NULL),
  ('platform-dev-frontend-ui', 'worker', 'dev', NULL),
  ('platform-dev-react-codebase', 'worker', 'dev', NULL),
  ('platform-dev-backend', 'worker', 'dev', NULL),
  ('platform-dev-database', 'worker', 'dev', NULL),
  ('platform-dev-supabase', 'worker', 'dev', NULL),
  ('platform-dev-platform-qa', 'worker', 'dev', NULL);

-- SUBZII Per-Venture Departments
INSERT INTO fn3_agent_registry (agent_name, agent_type, department, venture_id) VALUES
  -- Product
  ('subzii-product-head', 'supervisor', 'product', '00000000-0000-0000-0000-000000000002'),
  ('subzii-product-pm', 'worker', 'product', '00000000-0000-0000-0000-000000000002'),
  ('subzii-product-roadmap', 'worker', 'product', '00000000-0000-0000-0000-000000000002'),
  ('subzii-product-spec-writer', 'worker', 'product', '00000000-0000-0000-0000-000000000002'),
  ('subzii-product-idea-validation', 'worker', 'product', '00000000-0000-0000-0000-000000000002'),
  -- Sales
  ('subzii-sales-director', 'supervisor', 'sales', '00000000-0000-0000-0000-000000000002'),
  ('subzii-sales-pipeline', 'worker', 'sales', '00000000-0000-0000-0000-000000000002'),
  ('subzii-sales-proposal', 'worker', 'sales', '00000000-0000-0000-0000-000000000002'),
  ('subzii-sales-followup', 'worker', 'sales', '00000000-0000-0000-0000-000000000002'),
  ('subzii-sales-crm', 'worker', 'sales', '00000000-0000-0000-0000-000000000002'),
  -- Marketing
  ('subzii-marketing-cmo', 'supervisor', 'marketing', '00000000-0000-0000-0000-000000000002'),
  ('subzii-marketing-content', 'worker', 'marketing', '00000000-0000-0000-0000-000000000002'),
  ('subzii-marketing-seo', 'worker', 'marketing', '00000000-0000-0000-0000-000000000002'),
  ('subzii-marketing-social', 'worker', 'marketing', '00000000-0000-0000-0000-000000000002'),
  ('subzii-marketing-email', 'worker', 'marketing', '00000000-0000-0000-0000-000000000002'),
  ('subzii-marketing-copywriter', 'worker', 'marketing', '00000000-0000-0000-0000-000000000002'),
  -- Lead Gen
  ('subzii-leadgen-growth-lead', 'supervisor', 'leadgen', '00000000-0000-0000-0000-000000000002'),
  ('subzii-leadgen-scraper', 'worker', 'leadgen', '00000000-0000-0000-0000-000000000002'),
  ('subzii-leadgen-qualifier', 'worker', 'leadgen', '00000000-0000-0000-0000-000000000002'),
  ('subzii-leadgen-icp-matcher', 'worker', 'leadgen', '00000000-0000-0000-0000-000000000002'),
  ('subzii-leadgen-outreach', 'worker', 'leadgen', '00000000-0000-0000-0000-000000000002'),
  -- Acquisition
  ('subzii-acquisition-director', 'supervisor', 'acquisition', '00000000-0000-0000-0000-000000000002'),
  ('subzii-acquisition-paid-ads', 'worker', 'acquisition', '00000000-0000-0000-0000-000000000002'),
  ('subzii-acquisition-funnel', 'worker', 'acquisition', '00000000-0000-0000-0000-000000000002'),
  ('subzii-acquisition-landing-page', 'worker', 'acquisition', '00000000-0000-0000-0000-000000000002'),
  ('subzii-acquisition-ab-test', 'worker', 'acquisition', '00000000-0000-0000-0000-000000000002'),
  -- Support
  ('subzii-support-head', 'supervisor', 'support', '00000000-0000-0000-0000-000000000002'),
  ('subzii-support-ticket', 'worker', 'support', '00000000-0000-0000-0000-000000000002'),
  ('subzii-support-faq', 'worker', 'support', '00000000-0000-0000-0000-000000000002'),
  ('subzii-support-escalation', 'worker', 'support', '00000000-0000-0000-0000-000000000002'),
  ('subzii-support-churn-risk', 'worker', 'support', '00000000-0000-0000-0000-000000000002');

-- Initialize agent_state for all registered agents
INSERT INTO fn3_agent_state (agent_name, status)
SELECT agent_name, 'idle' FROM fn3_agent_registry;

-- ============================================================
-- INITIAL PRD ENTRIES (HQ objectives to bootstrap system)
-- ============================================================

INSERT INTO fn3_prd (venture_id, department, priority, objective, kpis, status, owner_agent) VALUES
  -- HQ Exec objectives
  (NULL, 'exec', 10,
   'Stand up FN3 platform: all 19 tables deployed, orchestrator running, all agents registered',
   '{"platform_uptime": "99%", "agents_registered": 53, "first_heartbeat": "within_24h"}'::jsonb,
   'active', 'hq-exec-chief-of-staff'),
  (NULL, 'dev', 10,
   'Deploy Supabase schema, Edge Functions, and orchestrator heartbeat',
   '{"schema_deployed": true, "heartbeat_firing": true, "edge_functions_live": true}'::jsonb,
   'active', 'platform-dev-lead'),
  -- SUBZII first objectives
  ('00000000-0000-0000-0000-000000000002', 'product', 9,
   'Validate SUBZII product-market fit: 10 customer interviews, 3 demand signals, go/no-go decision',
   '{"interviews_completed": 10, "demand_signals": 3, "decision": "go_or_no_go"}'::jsonb,
   'active', 'subzii-product-head'),
  ('00000000-0000-0000-0000-000000000002', 'sales', 9,
   'Build SUBZII initial sales pipeline: 50 qualified prospects, 10 engaged, 3 proposals sent',
   '{"prospects": 50, "engaged": 10, "proposals": 3, "target_mrr": 1000}'::jsonb,
   'active', 'subzii-sales-director'),
  ('00000000-0000-0000-0000-000000000002', 'marketing', 8,
   'Launch SUBZII brand presence: landing page live, 5 SEO articles, email list started',
   '{"landing_page_live": true, "articles_published": 5, "email_subscribers": 100}'::jsonb,
   'active', 'subzii-marketing-cmo');
