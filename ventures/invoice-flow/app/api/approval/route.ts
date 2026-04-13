import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const orgId = searchParams.get('org_id')
    const status = searchParams.get('status') // pending | approved | flagged | reassigned

    if (!orgId) return NextResponse.json({ success: false, error: 'org_id required' }, { status: 400 })

    const supabase = createServerSupabase()

    let query = supabase
      .from('invoices')
      .select('*, line_items(*)')
      .eq('org_id', orgId)
      .in('status', ['extracted', 'reviewed'])
      .order('created_at', { ascending: false })

    const { data: invoices, error } = await query

    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 })

    const { data: approvals } = await supabase
      .from('invoice_approvals')
      .select('*')
      .in('invoice_id', (invoices || []).map((i: { id: string }) => i.id))

    const approvalMap = new Map((approvals || []).map((a: { invoice_id: string }) => [a.invoice_id, a]))

    let items = (invoices || []).map((inv: { id: string }) => {
      const approval = approvalMap.get(inv.id)
      return {
        ...inv,
        approval_status: (approval as { status?: string } | undefined)?.status || 'pending',
        approved_by: (approval as { approved_by?: string } | undefined)?.approved_by,
        approved_at: (approval as { approved_at?: string } | undefined)?.approved_at,
        reviewer_note: (approval as { reviewer_note?: string } | undefined)?.reviewer_note,
      }
    })

    if (status) {
      items = items.filter((i: { approval_status: string }) => i.approval_status === status)
    }

    return NextResponse.json({ success: true, data: items })
  } catch (error) {
    console.error('Approval GET error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch approval queue' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { invoice_id, org_id, action, approved_by, reviewer_note, new_gl_code, new_category } = body

    if (!invoice_id || !action || !approved_by) {
      return NextResponse.json({ success: false, error: 'invoice_id, action, and approved_by required' }, { status: 400 })
    }

    const validActions = ['approve', 'flag', 'reassign']
    if (!validActions.includes(action)) {
      return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 })
    }

    const supabase = createServerSupabase()

    const approvalStatus = action === 'approve' ? 'approved' : action === 'flag' ? 'flagged' : 'reassigned'

    const { error: approvalError } = await supabase.from('invoice_approvals').upsert({
      invoice_id,
      org_id,
      status: approvalStatus,
      approved_by,
      approved_at: new Date().toISOString(),
      reviewer_note: reviewer_note || null,
      new_gl_code: action === 'reassign' ? new_gl_code : null,
      new_category: action === 'reassign' ? new_category : null,
    }, { onConflict: 'invoice_id' })

    if (approvalError) return NextResponse.json({ success: false, error: approvalError.message }, { status: 500 })

    if (action === 'reassign' && new_gl_code) {
      await supabase.from('invoices').update({
        gl_code: new_gl_code,
        expense_category: new_category,
        status: 'reviewed',
        updated_at: new Date().toISOString(),
      }).eq('id', invoice_id)
    } else if (action === 'approve') {
      await supabase.from('invoices').update({
        status: 'reviewed',
        updated_at: new Date().toISOString(),
      }).eq('id', invoice_id)
    }

    return NextResponse.json({ success: true, data: { invoice_id, status: approvalStatus, approved_by, approved_at: new Date().toISOString() } })
  } catch (error) {
    console.error('Approval POST error:', error)
    return NextResponse.json({ success: false, error: 'Approval action failed' }, { status: 500 })
  }
}
