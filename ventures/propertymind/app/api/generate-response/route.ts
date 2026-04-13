import { NextRequest, NextResponse } from 'next/server'
import { generateTenantResponse } from '@/lib/claude'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { tenantMessage, context, messageId } = await request.json()
    if (!tenantMessage || !context) {
      return NextResponse.json({ error: 'Message and context are required' }, { status: 400 })
    }

    const result = await generateTenantResponse(tenantMessage, context)

    if (messageId) {
      await supabase
        .from('pm_messages')
        .update({ ai_draft: result.response })
        .eq('id', messageId)
    }

    return NextResponse.json({ result })
  } catch (error) {
    console.error('Response generation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    )
  }
}
