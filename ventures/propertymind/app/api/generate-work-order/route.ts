import { NextRequest, NextResponse } from 'next/server'
import { generateWorkOrder } from '@/lib/claude'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { issue, context, maintenanceId } = await request.json()
    if (!issue || !context) {
      return NextResponse.json({ error: 'Issue and context are required' }, { status: 400 })
    }

    const result = await generateWorkOrder(issue, context)

    if (maintenanceId) {
      await supabase
        .from('pm_maintenance')
        .update({ work_order: result.work_order })
        .eq('id', maintenanceId)
    }

    return NextResponse.json({ result })
  } catch (error) {
    console.error('Work order generation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    )
  }
}
