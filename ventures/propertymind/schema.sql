-- PropertyMind Database Schema
-- Run this in your Supabase SQL editor

CREATE TABLE pm_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  units_count INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE pm_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES pm_properties(id) ON DELETE CASCADE,
  unit_number TEXT NOT NULL,
  monthly_rent DECIMAL(10,2),
  status TEXT DEFAULT 'vacant' CHECK (status IN ('occupied', 'vacant', 'maintenance')),
  tenant_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE pm_tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  unit_id UUID REFERENCES pm_units(id),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  lease_start DATE,
  lease_end DATE,
  monthly_rent DECIMAL(10,2),
  lease_text TEXT,
  lease_analysis JSONB,
  risk_score INT CHECK (risk_score BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE pm_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES pm_tenants(id) ON DELETE CASCADE,
  direction TEXT CHECK (direction IN ('inbound', 'outbound')),
  channel TEXT CHECK (channel IN ('email', 'sms', 'portal')),
  content TEXT NOT NULL,
  ai_draft TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE pm_maintenance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID REFERENCES pm_units(id),
  tenant_id UUID REFERENCES pm_tenants(id),
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT CHECK (priority IN ('emergency', 'high', 'medium', 'low')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'assigned', 'in_progress', 'completed')),
  vendor_id UUID,
  work_order TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE pm_vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  trade TEXT,
  phone TEXT,
  email TEXT,
  rating DECIMAL(2,1),
  notes TEXT
);

-- Row Level Security
ALTER TABLE pm_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE pm_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE pm_tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE pm_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE pm_maintenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE pm_vendors ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users own their properties" ON pm_properties FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their units" ON pm_units FOR ALL USING (
  property_id IN (SELECT id FROM pm_properties WHERE user_id = auth.uid())
);
CREATE POLICY "Users own their tenants" ON pm_tenants FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their messages" ON pm_messages FOR ALL USING (
  tenant_id IN (SELECT id FROM pm_tenants WHERE user_id = auth.uid())
);
CREATE POLICY "Users own their maintenance" ON pm_maintenance FOR ALL USING (
  unit_id IN (SELECT id FROM pm_units WHERE property_id IN (SELECT id FROM pm_properties WHERE user_id = auth.uid()))
);
CREATE POLICY "Users own their vendors" ON pm_vendors FOR ALL USING (auth.uid() = user_id);
