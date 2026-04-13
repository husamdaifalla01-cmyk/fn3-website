-- InvoiceFlow v3 Schema — Accounting Firm Features

-- 1. Clients table
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations NOT NULL,
  name TEXT NOT NULL,
  industry TEXT DEFAULT 'Other',
  target_system TEXT DEFAULT 'quickbooks', -- quickbooks | xero | generic
  custom_gl_mappings JSONB DEFAULT '{}',
  invoice_count_this_month INTEGER DEFAULT 0,
  total_processed INTEGER DEFAULT 0,
  last_activity TIMESTAMPTZ,
  status TEXT DEFAULT 'active', -- active | inactive
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "org clients" ON clients FOR ALL USING (
  org_id IN (SELECT id FROM organizations WHERE owner_id = auth.uid())
);

-- 2. Invoice approvals table (audit trail)
CREATE TABLE IF NOT EXISTS invoice_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES invoices NOT NULL UNIQUE,
  org_id UUID REFERENCES organizations,
  status TEXT NOT NULL, -- approved | flagged | reassigned
  approved_by TEXT NOT NULL, -- email of reviewer
  approved_at TIMESTAMPTZ DEFAULT NOW(),
  reviewer_note TEXT,
  new_gl_code TEXT,
  new_category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE invoice_approvals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "org approvals" ON invoice_approvals FOR ALL USING (
  org_id IN (SELECT id FROM organizations WHERE owner_id = auth.uid())
);

-- 3. Categorization rules table
CREATE TABLE IF NOT EXISTS categorization_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations NOT NULL,
  name TEXT NOT NULL,
  rule_type TEXT NOT NULL, -- vendor_contains | vendor_exact | amount_gt | amount_lt | category_contains
  condition_value TEXT NOT NULL,
  action TEXT NOT NULL, -- assign_gl | flag_review | skip_duplicate
  action_value TEXT,
  gl_code TEXT,
  gl_category TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  priority INTEGER DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE categorization_rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "org rules" ON categorization_rules FOR ALL USING (
  org_id IN (SELECT id FROM organizations WHERE owner_id = auth.uid())
);

-- 4. Optional: add client_id to invoices for per-client tracking
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS client_id UUID REFERENCES clients;

-- Index for client invoice queries
CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_clients_org_id ON clients(org_id);
CREATE INDEX IF NOT EXISTS idx_rules_org_id_active ON categorization_rules(org_id, is_active, priority);
CREATE INDEX IF NOT EXISTS idx_approvals_invoice_id ON invoice_approvals(invoice_id);
