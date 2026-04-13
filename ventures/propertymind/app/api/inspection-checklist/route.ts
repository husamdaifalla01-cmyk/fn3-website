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

    const { unitType, state, moveType } = await request.json()
    if (!unitType || !state || !moveType) {
      return NextResponse.json({ error: 'Unit type, state, and move type are required' }, { status: 400 })
    }

    const prompt = `You are an experienced property manager creating a comprehensive move-in/move-out inspection checklist. This checklist will be used to document unit condition and protect both landlord and tenant in security deposit disputes.

INSPECTION DETAILS:
- Unit Type: ${unitType}
- State: ${state}
- Inspection Type: ${moveType === 'in' ? 'Move-In' : 'Move-Out'}

STATE-SPECIFIC SECURITY DEPOSIT RULES (apply accurately):
- California: 21 calendar days to return deposit; itemized statement required; tenant has right to pre-move-out inspection
- New York: 14 days to return deposit with itemized statement
- Texas: 30 days to return; must provide itemized deductions
- Florida: 15 days if no deductions; 30 days with itemized deductions claim
- Illinois: 30 days with itemized statement; 45 days if repairs needed
- Washington: 21 days to return
- Oregon: 31 days to return; pre-move-out walkthrough required if requested by tenant
- All other states: Standard 30 days unless state law specifies otherwise

Generate a room-by-room inspection checklist and return a JSON object with this exact structure:
{
  "inspection_type": "${moveType === 'in' ? 'Move-In' : 'Move-Out'}",
  "unit_type": "${unitType}",
  "state": "${state}",
  "security_deposit_rules": {
    "return_deadline": "<number of days>",
    "itemization_required": <true | false>,
    "state_statute": "<relevant statute citation>",
    "special_requirements": "<any unique ${state} requirements>"
  },
  "general_instructions": "<brief instructions for conducting the inspection properly>",
  "rooms": [
    {
      "room": "<room name, e.g. Living Room, Kitchen, Bedroom 1, Bathroom, etc.>",
      "items": [
        {
          "item": "<specific item to inspect, e.g. Carpet condition>",
          "what_to_check": "<specific things to document>",
          "photo_required": <true | false>,
          "condition_options": ["Excellent", "Good", "Fair", "Poor", "Damaged", "N/A"]
        }
      ]
    }
  ],
  "photo_documentation_requirements": [
    "<specific photo documentation requirement>"
  ],
  "normal_wear_and_tear_examples": [
    "<example of what constitutes normal wear and tear vs. damage>"
  ],
  "signature_fields": [
    {
      "label": "<e.g. Tenant Signature>",
      "purpose": "<what signing this acknowledges>"
    }
  ],
  "landlord_notes_section": true,
  "disclaimer": "<legal disclaimer that should appear at bottom of checklist>"
}

Include all rooms appropriate for a ${unitType}. Be thorough — include items like walls, ceilings, floors, windows, doors, fixtures, appliances, smoke detectors, and any unit-specific features.

Respond with only the JSON object, no markdown formatting.`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = message.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response type')

    const result = JSON.parse(content.text)
    return NextResponse.json({ checklist: result })
  } catch (error) {
    console.error('Inspection checklist error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    )
  }
}
