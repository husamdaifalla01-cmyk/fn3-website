import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createServerSupabaseClient } from '@/lib/supabase-server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { tenantName, unit, currentRent, newRent, effectiveDate, state } = await request.json()
    if (!tenantName || !unit || !currentRent || !newRent || !effectiveDate || !state) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const increaseAmount = newRent - currentRent
    const increasePercent = ((increaseAmount / currentRent) * 100).toFixed(1)

    const prompt = `You are an experienced property attorney generating a legally compliant rent increase notice. You must provide accurate, state-specific requirements.

NOTICE DETAILS:
- Tenant Name: ${tenantName}
- Unit: ${unit}
- Current Monthly Rent: $${currentRent}
- New Monthly Rent: $${newRent}
- Increase Amount: $${increaseAmount} (${increasePercent}%)
- Effective Date: ${effectiveDate}
- State: ${state}

STATE-SPECIFIC NOTICE REQUIREMENTS (apply accurately):
- California (CA): 30 days for increases ≤10%; 90 days for increases >10% of rent paid in prior 12 months. AB 1482 rent cap (5% + CPI, max 10%) applies to covered units.
- New York (NY): Month-to-month tenants: 30 days if <1yr tenancy, 60 days if 1-2yrs, 90 days if 2+yrs. Rent-stabilized units have specific rules.
- Oregon (OR): 90 days written notice required. 7% + CPI annual cap for non-exempt units.
- Washington (WA): 20 days notice (changing to 180 days for increases ≥10% under SB 5197).
- Florida (FL): 30 days notice for month-to-month; 60 days for fixed-term if lease silent.
- Texas (TX): Notice equal to the rental period (typically 30 days) unless lease specifies otherwise.
- Illinois (IL): 30 days notice for month-to-month; Chicago requires 30-day notice.
- All other states: Standard minimum is 30 days written notice unless state law specifies longer.

Generate a professional rent increase notice and return a JSON object with this exact structure:
{
  "notice_period_required": "<state-required notice period, e.g. '90 days' or '30 days'>",
  "notice_period_days": <number>,
  "earliest_send_date": "<calculated date: effective date minus required notice period in YYYY-MM-DD format>",
  "state_law_citation": "<specific statute or code section governing rent increase notice in ${state}, e.g. 'California Civil Code § 827'>",
  "notice_letter": "<complete formal rent increase notice letter, properly formatted with date placeholder, property address placeholder, all required legal language, and signature block for landlord>",
  "mailing_instructions": "<specific instructions for how to properly serve this notice — certified mail, personal delivery, posting requirements for ${state}>",
  "return_receipt_recommended": <true | false>,
  "important_notes": ["<any additional state-specific warnings, caps, or compliance requirements the landlord must know>"],
  "compliance_checklist": [
    "<specific action the landlord must take before sending this notice>"
  ]
}

The notice letter must:
1. Be properly formatted as a formal letter
2. Include correct state-required notice language
3. State the current rent, new rent, and effective date clearly
4. Include any required statutory language for ${state}
5. Be signed "Your Property Management Team" with blanks for actual name/address

Respond with only the JSON object, no markdown formatting.`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = message.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response type')

    const result = JSON.parse(content.text)
    return NextResponse.json({ notice: result })
  } catch (error) {
    console.error('Rent increase error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    )
  }
}
