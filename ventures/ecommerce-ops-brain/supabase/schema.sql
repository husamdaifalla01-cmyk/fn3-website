CREATE TABLE IF NOT EXISTS stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users NOT NULL,
  store_name TEXT NOT NULL,
  shopify_domain TEXT,
  annual_revenue_estimate TEXT,
  plan TEXT DEFAULT 'launch',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores NOT NULL,
  shopify_product_id TEXT,
  title TEXT NOT NULL,
  sku TEXT,
  current_stock INTEGER DEFAULT 0,
  reorder_point INTEGER,
  avg_daily_sales DECIMAL(10,2),
  supplier TEXT,
  lead_time_days INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customer_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores NOT NULL,
  customer_email TEXT,
  customer_name TEXT,
  subject TEXT,
  original_message TEXT,
  ai_draft_reply TEXT,
  status TEXT DEFAULT 'pending', -- pending, replied, resolved
  ticket_type TEXT, -- return, shipping, product_question, complaint
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores NOT NULL,
  content_type TEXT NOT NULL, -- product_description, ad_copy, email_sequence, social_post
  input_context TEXT,
  generated_content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "store owners" ON stores FOR ALL USING (auth.uid() = owner_id);
CREATE POLICY "store products" ON products FOR ALL USING (store_id IN (SELECT id FROM stores WHERE owner_id = auth.uid()));
CREATE POLICY "store tickets" ON customer_tickets FOR ALL USING (store_id IN (SELECT id FROM stores WHERE owner_id = auth.uid()));
CREATE POLICY "store content" ON content_generations FOR ALL USING (store_id IN (SELECT id FROM stores WHERE owner_id = auth.uid()));
