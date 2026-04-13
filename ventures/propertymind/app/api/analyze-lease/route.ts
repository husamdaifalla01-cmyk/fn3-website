import { NextRequest, NextResponse } from 'next/server'
import { analyzeLeaseDocument } from '@/lib/claude'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { leaseText, tenantId } = await request.json()
    if (!leaseText) {
      return NextResponse.json({ error: 'Lease text is required' }, { status: 400 })
    }

    const analysis = await analyzeLeaseDocument(leaseText)

    if (tenantId) {
      await supabase
        .from('pm_tenants')
        .update({
          lease_text: leaseText,
          lease_analysis: analysis as unknown as Record<string, unknown>,
          risk_score: analysis.risk_score,
        })
        .eq('id', tenantId)
        .eq('user_id', user.id)
    }

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error('Lease analysis error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Analysis failed' },
      { status: 500 }
    )
  }
}
