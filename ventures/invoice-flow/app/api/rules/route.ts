import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const orgId = searchParams.get('org_id')
    if (!orgId) return NextResponse.json({ success: false, error: 'org_id required' }, { status: 400 })

    const supabase = createServerSupabase()
    const { data, error } = await supabase
      .from('categorization_rules')
      .select('*')
      .eq('org_id', orgId)
      .eq('is_active', true)
      .order('priority', { ascending: true })

    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Rules GET error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch rules' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { org_id, name, rule_type, condition_value, action, action_value, gl_code, gl_category, priority } = body

    if (!org_id || !name || !rule_type || !condition_value || !action) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServerSupabase()
    const { data, error } = await supabase.from('categorization_rules').insert({
      org_id,
      name,
      rule_type,
      condition_value,
      action,
      action_value: action_value || null,
      gl_code: gl_code || null,
      gl_category: gl_category || null,
      is_active: true,
      priority: priority || 10,
    }).select().single()

    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Rules POST error:', error)
    return NextResponse.json({ success: false, error: 'Failed to create rule' }, { status: 500 })
  }
}

// Apply rules to an invoice (used by extraction pipeline)
export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { org_id, vendor_name, amount, category } = body as {
      org_id: string
      vendor_name?: string
      amount?: number
      category?: string
    }

    if (!org_id) return NextResponse.json({ success: false, error: 'org_id required' }, { status: 400 })

    const supabase = createServerSupabase()
    const { data: rules } = await supabase
      .from('categorization_rules')
      .select('*')
      .eq('org_id', org_id)
      .eq('is_active', true)
      .order('priority', { ascending: true })

    if (!rules || rules.length === 0) {
      return NextResponse.json({ success: true, data: { matched: false } })
    }

    // Evaluate rules in priority order
    for (const rule of rules) {
      let matches = false

      switch (rule.rule_type) {
        case 'vendor_contains':
          matches = !!vendor_name && vendor_name.toLowerCase().includes(rule.condition_value.toLowerCase())
          break
        case 'vendor_exact':
          matches = !!vendor_name && vendor_name.toLowerCase() === rule.condition_value.toLowerCase()
          break
        case 'amount_gt':
          matches = !!amount && amount > parseFloat(rule.condition_value)
          break
        case 'amount_lt':
          matches = !!amount && amount < parseFloat(rule.condition_value)
          break
        case 'category_contains':
          matches = !!category && category.toLowerCase().includes(rule.condition_value.toLowerCase())
          break
      }

      if (matches) {
        return NextResponse.json({
          success: true,
          data: {
            matched: true,
            rule_id: rule.id,
            rule_name: rule.name,
            action: rule.action,
            gl_code: rule.gl_code,
            gl_category: rule.gl_category,
            action_value: rule.action_value,
          },
        })
      }
    }

    return NextResponse.json({ success: true, data: { matched: false } })
  } catch (error) {
    console.error('Rules PUT error:', error)
    return NextResponse.json({ success: false, error: 'Failed to apply rules' }, { status: 500 })
  }
}
