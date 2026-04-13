import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Store = {
  id: string
  owner_id: string
  store_name: string
  shopify_domain: string | null
  annual_revenue_estimate: string | null
  plan: string
  created_at: string
}

export type Product = {
  id: string
  store_id: string
  shopify_product_id: string | null
  title: string
  sku: string | null
  current_stock: number
  reorder_point: number | null
  avg_daily_sales: number | null
  supplier: string | null
  lead_time_days: number | null
  created_at: string
}

export type CustomerTicket = {
  id: string
  store_id: string
  customer_email: string | null
  customer_name: string | null
  subject: string | null
  original_message: string | null
  ai_draft_reply: string | null
  status: 'pending' | 'replied' | 'resolved'
  ticket_type: 'return' | 'shipping' | 'product_question' | 'complaint' | null
  created_at: string
}

export type ContentGeneration = {
  id: string
  store_id: string
  content_type: string
  input_context: string | null
  generated_content: string | null
  created_at: string
}
