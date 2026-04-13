-- InvoiceFlow Database Schema

CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  plan TEXT DEFAULT 'solo',
  invoice_count_this_month INTEGER DEFAULT 0,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_status TEXT DEFAULT 'trialing',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations NOT NULL,
  uploaded_by UUID REFERENCES auth.users NOT NULL,
  file_path TEXT,
  file_name TEXT,
  file_url TEXT,
  status TEXT DEFAULT 'processing', -- processing, extracted, reviewed, exported, rejected

  -- Extracted data
  vendor_name TEXT,
  vendor_address TEXT,
  invoice_number TEXT,
  invoice_date DATE,
  due_date DATE,
  subtotal DECIMAL(12,2),
  tax_amount DECIMAL(12,2),
  total_amount DECIMAL(12,2),
  currency TEXT DEFAULT 'USD',
  payment_terms TEXT,
  notes TEXT,

  -- AI analysis
  gl_code TEXT,
  expense_category TEXT,
  is_duplicate BOOLEAN DEFAULT FALSE,
  duplicate_of UUID REFERENCES invoices,
  anomalies JSONB DEFAULT '[]',
  confidence_score INTEGER, -- 0-100

  raw_extraction JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES invoices NOT NULL,
  description TEXT,
  quantity DECIMAL(10,3),
  unit_price DECIMAL(12,2),
  total DECIMAL(12,2),
  gl_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chart_of_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations NOT NULL,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  account_type TEXT, -- asset, liability, equity, revenue, expense
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Default chart of accounts template
CREATE TABLE IF NOT EXISTS default_chart_of_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  account_type TEXT,
  keywords TEXT[] -- for AI matching
);

-- Insert default COA
INSERT INTO default_chart_of_accounts (code, name, account_type, keywords) VALUES
  ('6000', 'Operating Expenses', 'expense', ARRAY['general', 'operating']),
  ('6010', 'Office Supplies', 'expense', ARRAY['office', 'supplies', 'stationery', 'paper']),
  ('6020', 'Software & Subscriptions', 'expense', ARRAY['software', 'subscription', 'saas', 'cloud', 'license']),
  ('6030', 'Professional Services', 'expense', ARRAY['consulting', 'legal', 'accounting', 'professional']),
  ('6040', 'Marketing & Advertising', 'expense', ARRAY['marketing', 'advertising', 'ads', 'promotion']),
  ('6050', 'Travel & Entertainment', 'expense', ARRAY['travel', 'hotel', 'flight', 'restaurant', 'entertainment']),
  ('6060', 'Utilities', 'expense', ARRAY['electric', 'gas', 'water', 'internet', 'phone', 'utility']),
  ('6070', 'Rent & Facilities', 'expense', ARRAY['rent', 'lease', 'facilities', 'office space']),
  ('6080', 'Insurance', 'expense', ARRAY['insurance', 'liability', 'coverage']),
  ('6090', 'Equipment & Hardware', 'expense', ARRAY['equipment', 'hardware', 'computer', 'device', 'machinery']),
  ('6100', 'Repairs & Maintenance', 'expense', ARRAY['repair', 'maintenance', 'service', 'fix']),
  ('6110', 'Shipping & Postage', 'expense', ARRAY['shipping', 'postage', 'freight', 'delivery', 'fedex', 'ups', 'usps']),
  ('6120', 'Bank & Finance Charges', 'expense', ARRAY['bank', 'finance', 'interest', 'fee', 'charge']),
  ('2000', 'Accounts Payable', 'liability', ARRAY['payable', 'vendor', 'owed']),
  ('1000', 'Cash & Bank', 'asset', ARRAY['cash', 'bank', 'checking', 'savings'])
ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE chart_of_accounts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "org owners" ON organizations FOR ALL USING (auth.uid() = owner_id);
CREATE POLICY "org invoices" ON invoices FOR ALL USING (org_id IN (SELECT id FROM organizations WHERE owner_id = auth.uid()));
CREATE POLICY "invoice line items" ON line_items FOR ALL USING (invoice_id IN (SELECT i.id FROM invoices i JOIN organizations o ON i.org_id = o.id WHERE o.owner_id = auth.uid()));
CREATE POLICY "org coa" ON chart_of_accounts FOR ALL USING (org_id IN (SELECT id FROM organizations WHERE owner_id = auth.uid()));

-- Storage bucket for invoices
INSERT INTO storage.buckets (id, name, public) VALUES ('invoices', 'invoices', false) ON CONFLICT DO NOTHING;

CREATE POLICY "org invoice files" ON storage.objects FOR ALL USING (
  bucket_id = 'invoices' AND auth.uid() IS NOT NULL
);

-- Functions
CREATE OR REPLACE FUNCTION increment_invoice_count(org_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE organizations SET invoice_count_this_month = invoice_count_this_month + 1 WHERE id = org_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION reset_monthly_counts()
RETURNS void AS $$
BEGIN
  UPDATE organizations SET invoice_count_this_month = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
