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

    const { applicantName, monthlyIncome, requestedRent, creditScore, rentalHistory } = await request.json()
    if (!applicantName || !monthlyIncome || !requestedRent) {
      return NextResponse.json({ error: 'Applicant name, monthly income, and requested rent are required' }, { status: 400 })
    }

    const incomeRatio = ((requestedRent / monthlyIncome) * 100).toFixed(1)

    const prompt = `You are a professional property manager conducting a tenant screening analysis. Your job is to evaluate the applicant fairly and consistently, following Fair Housing Act guidelines, and provide a clear, actionable recommendation.

APPLICANT INFORMATION:
- Applicant Name: ${applicantName}
- Monthly Gross Income: $${monthlyIncome}
- Requested Monthly Rent: $${requestedRent}
- Income-to-Rent Ratio: ${incomeRatio}% (industry standard: rent should be ≤30% of gross income)
- Self-Reported Credit Score: ${creditScore || 'Not provided'}
- Rental History: ${rentalHistory || 'Not provided'}

Analyze this application and return a JSON object with this exact structure:
{
  "income_ratio": {
    "percentage": ${incomeRatio},
    "monthly_income": ${monthlyIncome},
    "requested_rent": ${requestedRent},
    "assessment": "<Pass / Marginal / Fail>",
    "note": "<1-2 sentence explanation of the income ratio finding>"
  },
  "credit_assessment": {
    "score_provided": ${creditScore ? `"${creditScore}"` : 'null'},
    "assessment": "<Strong / Acceptable / Marginal / Weak / Not Provided>",
    "note": "<brief interpretation of the credit score range, or note that verification is needed>"
  },
  "red_flags": [
    {
      "flag": "<specific concern identified from rental history or application>",
      "severity": "<high | medium | low>",
      "explanation": "<why this is a concern and what to investigate>"
    }
  ],
  "positive_indicators": [
    "<specific positive factors identified from the application>"
  ],
  "reference_questions": [
    "<specific question to ask prior landlord references, relevant to the rental history provided>"
  ],
  "fair_housing_note": "<reminder about Fair Housing Act compliance — which protected classes to avoid in decision-making, and that the recommendation is based solely on financial and tenancy criteria>",
  "recommendation": "<Approve | Approve with Conditions | Need More Information | Decline>",
  "recommendation_rationale": "<2-3 sentence explanation of the recommendation based on financial criteria and rental history only — no protected class language>",
  "conditions": ["<any conditions if recommendation is Approve with Conditions, e.g. additional deposit, co-signer required>"]
}

CRITICAL: Do NOT reference or imply any protected class characteristics (race, color, national origin, religion, sex, familial status, disability). Base all analysis solely on financial qualifications and documented tenancy history. Respond with only the JSON object, no markdown formatting.`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = message.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response type')

    const result = JSON.parse(content.text)
    return NextResponse.json({ screening: result })
  } catch (error) {
    console.error('Tenant screening error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Screening failed' },
      { status: 500 }
    )
  }
}
