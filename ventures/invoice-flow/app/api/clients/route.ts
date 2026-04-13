import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const orgId = searchParams.get('org_id')
    if (!orgId) return NextResponse.json({ success: false, error: 'org_id required' }, { status: 400 })

    const supabase = createServerSupabase()
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('org_id', orgId)
      .order('created_at', { ascending: false })

    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Clients GET error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch clients' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { org_id, name, industry, target_system, custom_gl_mappings } = body

    if (!org_id || !name) {
      return NextResponse.json({ success: false, error: 'org_id and name required' }, { status: 400 })
    }

    const supabase = createServerSupabase()
    const { data, error } = await supabase.from('clients').insert({
      org_id,
      name,
      industry: industry || 'Other',
      target_system: target_system || 'quickbooks',
      custom_gl_mappings: custom_gl_mappings || {},
      invoice_count_this_month: 0,
      total_processed: 0,
      last_activity: null,
      status: 'active',
    }).select().single()

    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Clients POST error:', error)
    return NextResponse.json({ success: false, error: 'Failed to create client' }, { status: 500 })
  }
}
