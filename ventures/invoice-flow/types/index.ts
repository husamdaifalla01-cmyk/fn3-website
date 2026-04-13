export type Plan = 'solo' | 'team' | 'firm'
export type InvoiceStatus = 'processing' | 'extracted' | 'reviewed' | 'exported' | 'rejected'
export type AccountType = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense'

export interface Organization {
  id: string
  owner_id: string
  name: string
  plan: Plan
  invoice_count_this_month: number
  stripe_customer_id?: string
  stripe_subscription_id?: string
  subscription_status?: string
  created_at: string
  updated_at: string
}

export interface Invoice {
  id: string
  org_id: string
  uploaded_by: string
  file_path?: string
  file_name?: string
  file_url?: string
  status: InvoiceStatus

  // Extracted data
  vendor_name?: string
  vendor_address?: string
  invoice_number?: string
  invoice_date?: string
  due_date?: string
  subtotal?: number
  tax_amount?: number
  total_amount?: number
  currency: string
  payment_terms?: string
  notes?: string

  // AI analysis
  gl_code?: string
  expense_category?: string
  is_duplicate: boolean
  duplicate_of?: string
  anomalies: Anomaly[]
  confidence_score?: number

  raw_extraction?: ExtractedInvoiceData
  created_at: string
  updated_at: string

  // Joined data
  line_items?: LineItem[]
}

export interface LineItem {
  id: string
  invoice_id: string
  description?: string
  quantity?: number
  unit_price?: number
  total?: number
  gl_code?: string
  created_at: string
}

export interface ChartOfAccount {
  id: string
  org_id: string
  code: string
  name: string
  account_type?: AccountType
  created_at: string
}

export interface Anomaly {
  type: string
  description: string
  severity: 'low' | 'medium' | 'high'
}

export interface ExtractedInvoiceData {
  vendor_name: string
  vendor_address: string
  invoice_number: string
  invoice_date: string
  due_date: string
  subtotal: number
  tax_amount: number
  total_amount: number
  currency: string
  line_items: ExtractedLineItem[]
  payment_terms: string
  notes: string
  confidence: number
}

export interface ExtractedLineItem {
  description: string
  quantity: number
  unit_price: number
  total: number
}

export interface CategorizationResult {
  gl_code: string
  expense_category: string
  confidence: number
  reasoning: string
  anomalies: Anomaly[]
}

export const PLAN_LIMITS: Record<Plan, { invoices: number; users: number; api: boolean }> = {
  solo: { invoices: 500, users: 1, api: false },
  team: { invoices: 2000, users: 5, api: false },
  firm: { invoices: Infinity, users: Infinity, api: true },
}

export const PLAN_PRICES = {
  solo: { monthly: 149, annual: 119 },
  team: { monthly: 299, annual: 239 },
  firm: { monthly: 499, annual: 399 },
}
