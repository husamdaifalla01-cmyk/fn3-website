import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      practices: {
        Row: {
          id: string
          user_id: string
          name: string
          practice_type: string
          provider_count: number
          state: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['practices']['Row'], 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Database['public']['Tables']['practices']['Insert']>
      }
      compliance_areas: {
        Row: {
          id: string
          practice_id: string
          area: string
          category: string
          status: string
          notes: string | null
          last_reviewed: string | null
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['compliance_areas']['Row'], 'id' | 'updated_at'> & { id?: string; updated_at?: string }
        Update: Partial<Database['public']['Tables']['compliance_areas']['Insert']>
      }
      policy_documents: {
        Row: {
          id: string
          practice_id: string
          document_type: string
          title: string
          content: string
          generated_at: string
          version: number
        }
        Insert: Omit<Database['public']['Tables']['policy_documents']['Row'], 'id' | 'generated_at'> & { id?: string; generated_at?: string }
        Update: Partial<Database['public']['Tables']['policy_documents']['Insert']>
      }
      incidents: {
        Row: {
          id: string
          practice_id: string
          incident_type: string
          description: string | null
          severity: string | null
          status: string
          response_steps: unknown
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['incidents']['Row'], 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Database['public']['Tables']['incidents']['Insert']>
      }
      audit_reports: {
        Row: {
          id: string
          practice_id: string
          report_type: string
          compliance_score: number
          findings: unknown
          recommendations: unknown
          generated_at: string
        }
        Insert: Omit<Database['public']['Tables']['audit_reports']['Row'], 'id' | 'generated_at'> & { id?: string; generated_at?: string }
        Update: Partial<Database['public']['Tables']['audit_reports']['Insert']>
      }
    }
  }
}
