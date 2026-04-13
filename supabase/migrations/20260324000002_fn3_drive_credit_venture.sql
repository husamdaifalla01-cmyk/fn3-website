-- FN3: Register DriveCredit Venture
-- Affiliate marketing site (CPL model) — Yendo ($112.50) + Slam Dunk Loans ($9.00)
-- Deployed at mintbrooks.com

-- ============================================================
-- VENTURE ROW
-- ============================================================

INSERT INTO fn3_ventures (id, name, status, departments_enabled, auto_provisioned) VALUES (
  '00000000-0000-0000-0000-000000000007',
  'DRIVE-CREDIT',
  'active',
  '["exec","marketing","leadgen","acquisition","legal"]'::jsonb,
  false
);

-- ============================================================
-- AGENT REGISTRY — DRIVE-CREDIT
-- Key departments: marketing (content/TikTok), leadgen (traffic),
-- acquisition (funnel/CRO), legal (compliance), exec (direction)
-- ============================================================

-- EXEC
INSERT INTO fn3_agent_registry (agent_name, agent_type, department, venture_id) VALUES
  ('dc-exec-director',          'supervisor', 'exec',        '00000000-0000-0000-0000-000000000007'),
  ('dc-exec-strategy',          'worker',     'exec',        '00000000-0000-0000-0000-000000000007'),
  ('dc-exec-analytics',         'worker',     'exec',        '00000000-0000-0000-0000-000000000007'),
  ('dc-exec-revenue-tracker',   'worker',     'exec',        '00000000-0000-0000-0000-000000000007');

-- MARKETING (primary engine — TikTok content, SEO, email)
INSERT INTO fn3_agent_registry (agent_name, agent_type, department, venture_id) VALUES
  ('dc-marketing-cmo',          'supervisor', 'marketing',   '00000000-0000-0000-0000-000000000007'),
  ('dc-marketing-tiktok',       'worker',     'marketing',   '00000000-0000-0000-0000-000000000007'),
  ('dc-marketing-content',      'worker',     'marketing',   '00000000-0000-0000-0000-000000000007'),
  ('dc-marketing-seo',          'worker',     'marketing',   '00000000-0000-0000-0000-000000000007'),
  ('dc-marketing-email',        'worker',     'marketing',   '00000000-0000-0000-0000-000000000007'),
  ('dc-marketing-copywriter',   'worker',     'marketing',   '00000000-0000-0000-0000-000000000007');

-- LEADGEN (audience targeting, ICP research, organic traffic)
INSERT INTO fn3_agent_registry (agent_name, agent_type, department, venture_id) VALUES
  ('dc-leadgen-growth-lead',    'supervisor', 'leadgen',     '00000000-0000-0000-0000-000000000007'),
  ('dc-leadgen-icp-researcher', 'worker',     'leadgen',     '00000000-0000-0000-0000-000000000007'),
  ('dc-leadgen-keyword-miner',  'worker',     'leadgen',     '00000000-0000-0000-0000-000000000007'),
  ('dc-leadgen-hook-tester',    'worker',     'leadgen',     '00000000-0000-0000-0000-000000000007');

-- ACQUISITION (funnel CRO, affiliate tracking, UTM, email capture)
INSERT INTO fn3_agent_registry (agent_name, agent_type, department, venture_id) VALUES
  ('dc-acquisition-director',   'supervisor', 'acquisition', '00000000-0000-0000-0000-000000000007'),
  ('dc-acquisition-funnel',     'worker',     'acquisition', '00000000-0000-0000-0000-000000000007'),
  ('dc-acquisition-landing-page','worker',    'acquisition', '00000000-0000-0000-0000-000000000007'),
  ('dc-acquisition-utm-tracker','worker',     'acquisition', '00000000-0000-0000-0000-000000000007'),
  ('dc-acquisition-ab-test',    'worker',     'acquisition', '00000000-0000-0000-0000-000000000007');

-- LEGAL (FTC compliance, affiliate disclosures, state eligibility)
INSERT INTO fn3_agent_registry (agent_name, agent_type, department, venture_id) VALUES
  ('dc-legal-counsel',          'supervisor', 'legal',       '00000000-0000-0000-0000-000000000007'),
  ('dc-legal-compliance',       'worker',     'legal',       '00000000-0000-0000-0000-000000000007'),
  ('dc-legal-ftc-disclosure',   'worker',     'legal',       '00000000-0000-0000-0000-000000000007');

-- ============================================================
-- AGENT STATE INITIALIZATION
-- ============================================================

INSERT INTO fn3_agent_state (agent_name, status)
SELECT agent_name, 'idle'
FROM fn3_agent_registry
WHERE venture_id = '00000000-0000-0000-0000-000000000007';

-- ============================================================
-- PRD — Q1 2026 OBJECTIVES
-- ============================================================

INSERT INTO fn3_prd (venture_id, department, priority, objective, kpis, constraints, status, owner_agent) VALUES

  -- Objective 1: First $1,000 in affiliate commissions (~9 Yendo leads)
  (
    '00000000-0000-0000-0000-000000000007',
    'acquisition',
    10,
    'Generate first $1,000 in affiliate commissions — drive traffic to mintbrooks.com, optimize Yendo click-through rate, target 9+ Yendo leads at $112.50 CPL',
    '{"affiliate_revenue_usd": 1000, "yendo_leads": 9, "yendo_ctr": 0.15, "affiliate_clicks": 60}'::jsonb,
    '{"no_paid_ads": true, "organic_only": true, "primary_offer": "Yendo", "fallback_offer": "Slam Dunk Loans", "excluded_states": ["AK","HI","IA","LA","ME","MD","MA","MN","MO","NJ","NY","OK","SD","WI"]}'::jsonb,
    'active',
    'dc-acquisition-director'
  ),

  -- Objective 2: Produce 4 TikTok videos via nanobanana/Remotion pipeline
  (
    '00000000-0000-0000-0000-000000000007',
    'marketing',
    9,
    'Produce 4 TikTok videos (9:16, 30–60s) via nanobanana/Remotion pipeline — one per content pillar: Education, Empathy, Proof, Urgency. Each video gets unique UTM link for attribution.',
    '{"videos_produced": 4, "pillars_covered": ["education","empathy","proof","urgency"], "utm_tracked": true}'::jsonb,
    '{"format": "9:16 vertical", "duration_range": "30-60s", "captions": true, "no_face_required": true, "cta": "link in bio", "brand_voice": "relatable financial empowerment, not corporate"}'::jsonb,
    'active',
    'dc-marketing-cmo'
  ),

  -- Objective 3: Wire email capture to ESP
  (
    '00000000-0000-0000-0000-000000000007',
    'acquisition',
    8,
    'Connect ExitIntentPopup email capture to ESP — add email input field to popup, create /api/subscribe Next.js route, wire to Resend or chosen ESP, set up welcome sequence',
    '{"email_capture_live": true, "welcome_sequence_configured": true, "popup_conversion_rate": 0.05}'::jsonb,
    '{"esp_preference": "Resend", "popup_trigger": "mouse leave viewport", "double_opt_in": false}'::jsonb,
    'active',
    'dc-acquisition-landing-page'
  ),

  -- Objective 4: UTM tracking on all affiliate links
  (
    '00000000-0000-0000-0000-000000000007',
    'acquisition',
    8,
    'Set up UTM tracking on all affiliate links — pre-build per-video UTM URLs (utm_source=tiktok, utm_medium=video, utm_campaign per video slug), add analytics script (Plausible or GA4) to landing page',
    '{"utm_links_created": 4, "analytics_script_live": true, "tiktok_attribution_working": true}'::jsonb,
    '{"utm_source": "tiktok", "utm_medium": "video", "analytics_tool": "Plausible preferred", "must_not_break_existing_organic_tracking": true}'::jsonb,
    'active',
    'dc-acquisition-utm-tracker'
  ),

  -- Ongoing: Legal compliance review
  (
    '00000000-0000-0000-0000-000000000007',
    'legal',
    7,
    'Audit all DriveCredit landing page copy and TikTok video scripts for FTC compliance — verify affiliate disclosure present, no guaranteed approval language, soft inquiry claims accurate, excluded states handled correctly',
    '{"ftc_disclosure_present": true, "no_guarantee_language": true, "soft_inquiry_accurate": true, "state_routing_correct": true}'::jsonb,
    '{"ftc_rules": "16 CFR Part 255", "state_excluded": ["AK","HI","IA","LA","ME","MD","MA","MN","MO","NJ","NY","OK","SD","WI"], "must_not_guarantee_approval": true}'::jsonb,
    'active',
    'dc-legal-counsel'
  ),

  -- Ongoing: SEO content
  (
    '00000000-0000-0000-0000-000000000007',
    'marketing',
    6,
    'Produce 3 long-tail SEO articles targeting: "bad credit credit card with car", "car equity credit card no credit check", "credit card for car owners with bad credit" — minimum 1,200 words each, publish to site',
    '{"articles_published": 3, "target_keywords": ["bad credit credit card car","car equity credit card","credit card car owners bad credit"], "min_word_count": 1200}'::jsonb,
    '{"tone": "relatable, not corporate", "compliance": "no guaranteed approval language", "internal_links": "link to calculator"}'::jsonb,
    'active',
    'dc-marketing-seo'
  );
