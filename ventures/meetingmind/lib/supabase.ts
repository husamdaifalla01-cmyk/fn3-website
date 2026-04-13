import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Meeting = {
  id: string
  user_id: string
  title: string
  transcript: string
  summary: string
  action_items: ActionItem[]
  decisions: Decision[]
  follow_up_email: string
  created_at: string
}

export type ActionItem = {
  task: string
  owner: string
  deadline: string
  priority: 'high' | 'medium' | 'low'
}

export type Decision = {
  decision: string
  context: string
}
