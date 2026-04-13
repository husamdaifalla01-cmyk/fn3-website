import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cetrxwtmzrogbbrblkys.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key-replace-before-deploy'

let _supabase: SupabaseClient | null = null

export const getSupabase = (): SupabaseClient => {
  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
  return _supabase
}

// Named export for direct use (lazy singleton)
export const supabase = {
  from: (table: string) => getSupabase().from(table),
}

export type ApplicationFormData = {
  company_name: string
  industry: string
  employee_count: string
  monthly_revenue: string
  departments: string[]
  bottleneck: string
  created_at?: string
}
