-- Practices
CREATE TABLE IF NOT EXISTS practices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  practice_type TEXT NOT NULL, -- medical, dental, mental_health, chiropractic, etc
  provider_count INTEGER DEFAULT 1,
  state TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- HIPAA Compliance Areas
CREATE TABLE IF NOT EXISTS compliance_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID REFERENCES practices NOT NULL,
  area TEXT NOT NULL, -- administrative, physical, technical, organizational
  category TEXT NOT NULL, -- e.g. "Risk Analysis", "Workforce Training"
  status TEXT DEFAULT 'not_started', -- compliant, partial, non_compliant, not_started
  notes TEXT,
  last_reviewed TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generated Policy Documents
CREATE TABLE IF NOT EXISTS policy_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID REFERENCES practices NOT NULL,
  document_type TEXT NOT NULL, -- privacy_policy, security_policy, baa_template, etc
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  version INTEGER DEFAULT 1
);

-- Incident Log
CREATE TABLE IF NOT EXISTS incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID REFERENCES practices NOT NULL,
  incident_type TEXT NOT NULL,
  description TEXT,
  severity TEXT, -- low, medium, high, critical
  status TEXT DEFAULT 'open', -- open, investigating, resolved, reported
  response_steps JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Reports
CREATE TABLE IF NOT EXISTS audit_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID REFERENCES practices NOT NULL,
  report_type TEXT NOT NULL,
  compliance_score INTEGER,
  findings JSONB,
  recommendations JSONB,
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE practices ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their practices" ON practices FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Practice compliance areas" ON compliance_areas FOR ALL USING (practice_id IN (SELECT id FROM practices WHERE user_id = auth.uid()));
CREATE POLICY "Practice policies" ON policy_documents FOR ALL USING (practice_id IN (SELECT id FROM practices WHERE user_id = auth.uid()));
CREATE POLICY "Practice incidents" ON incidents FOR ALL USING (practice_id IN (SELECT id FROM practices WHERE user_id = auth.uid()));
CREATE POLICY "Practice reports" ON audit_reports FOR ALL USING (practice_id IN (SELECT id FROM practices WHERE user_id = auth.uid()));
