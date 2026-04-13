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

    const { tenantName, unitNumber, propertyName, currentRent, leaseEndDate, daysRemaining } = await request.json()
    if (!tenantName || !currentRent || !leaseEndDate) {
      return NextResponse.json({ error: 'Tenant name, current rent, and lease end date are required' }, { status: 400 })
    }

    const prompt = `You are an experienced property manager helping prepare a lease renewal strategy. Based on the tenant and property details, provide a data-driven renewal recommendation with a draft offer letter.

LEASE DETAILS:
- Tenant: ${tenantName}
- Unit: ${unitNumber} at ${propertyName}
- Current Monthly Rent: $${currentRent}
- Lease Expiration: ${leaseEndDate}
- Days Until Expiration: ${daysRemaining}

Using current market context (assume 3-7% annual rent growth in most US markets, higher in high-demand metros), provide a renewal strategy.

Return a JSON object with this exact structure:
{
  "market_analysis": "<2-3 sentence market analysis explaining the current rental market context and why the suggested increase is appropriate — reference realistic market conditions>",
  "suggested_rent": <suggested monthly rent as a number — typically 3-7% above current rent for standard market>,
  "suggested_increase_percent": "<percentage increase as a string, e.g. '4.5'>",
  "offer_letter": "<complete formal renewal offer letter addressed to the tenant, including: current rent, new rent, new lease term options (12-month or month-to-month), deadline to respond (typically 30-60 days before expiration), benefits of renewing, and a professional closing. Sign as 'Your Property Management Team'>",
  "renewal_options": [
    {
      "option": "<e.g. 12-Month Renewal>",
      "description": "<brief description of terms>",
      "pros": ["<advantage for landlord>"],
      "cons": ["<disadvantage or risk>"]
    },
    {
      "option": "<e.g. Month-to-Month Renewal>",
      "description": "<brief description of terms>",
      "pros": ["<advantage for landlord>"],
      "cons": ["<disadvantage or risk>"]
    },
    {
      "option": "<e.g. Non-Renewal / Vacancy>",
      "description": "<brief description>",
      "pros": ["<advantage>"],
      "cons": ["<risk — vacancy cost, turnover time, etc.>"]
    }
  ],
  "recommended_option": "<name of the recommended option from above>",
  "negotiation_tips": [
    "<specific tactical advice for negotiating with this tenant given the ${daysRemaining}-day timeline>"
  ]
}

Make the offer letter warm but professional. Include a clear call to action (respond by a specific deadline). Respond with only the JSON object, no markdown formatting.`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = message.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response type')

    const result = JSON.parse(content.text)
    return NextResponse.json({ offer: result })
  } catch (error) {
    console.error('Lease renewal offer error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    )
  }
}
