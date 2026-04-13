import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export interface LeaseAnalysisResult {
  risk_score: number
  risk_level: 'low' | 'medium' | 'high'
  summary: string
  flagged_clauses: Array<{
    type: string
    clause: string
    risk: string
    severity: 'low' | 'medium' | 'high'
  }>
  recommendations: string[]
  renewal_terms: string
  early_termination_risk: string
  pet_policy: string
  maintenance_responsibilities: string
  rent_increase_cap: string
}

export async function analyzeLeaseDocument(leaseText: string): Promise<LeaseAnalysisResult> {
  const prompt = `You are a senior property management attorney analyzing a lease agreement on behalf of a landlord/property manager. Your job is to identify every clause that exposes the landlord to financial loss, legal liability, or operational problems.

Systematically check for ALL 15 of these high-risk clause categories — flag each one present or note if it is missing when it should be there:

1. AUTO-RENEWAL TRAPS: Does the lease auto-renew without adequate notice? Is the notice window unreasonably short (under 60 days)? Does failure to give notice lock the landlord into another full term?
2. EARLY TERMINATION EXPOSURE: Can the tenant exit without sufficient penalty? Is the early termination fee less than 2 months rent? Is there a job-relocation or military clause with no buyout?
3. ABOVE-MARKET MAINTENANCE RESPONSIBILITY: Is the tenant assigned unusually few maintenance obligations? Are appliance repairs, HVAC filters, or minor repairs not assigned? Could a court interpret ambiguous language to shift costs to the landlord?
4. PET POLICY GAPS: Is there no pet deposit or is it capped below market? Are emotional support animals addressed? Is there no clause requiring professional cleaning upon move-out? Are breed/size restrictions absent?
5. SECURITY DEPOSIT ISSUES: Is the deposit below one month's rent? Are deduction categories not explicitly listed? Is the return timeline unclear or unusually short? Does it fail to address normal wear-and-tear standards?
6. RENT INCREASE LIMITATIONS: Is there a rent increase cap that limits the landlord below market rates? Is any cap tied to CPI without a floor? Are there restrictions on pass-through costs (utilities, taxes)?
7. WAIVER OF IMPLIED WARRANTY OF HABITABILITY: Does any clause attempt to have the tenant waive habitability rights? This is unenforceable in most states and signals tenant-favorable drafting throughout.
8. SUBLETTING AND ASSIGNMENT RIGHTS: Can the tenant sublet without landlord approval? Is assignment language missing or too permissive?
9. HOLD-OVER PROVISIONS: What happens if the tenant stays past lease end? Is there a clear hold-over rent premium (typically 150% of base rent)?
10. ENTRY AND INSPECTION RIGHTS: Is the required notice period for landlord entry unusually long (over 48 hours)? Are emergency entry rights clearly stated?
11. LEASE MODIFICATION PROTECTIONS: Can either party modify lease terms without written mutual consent?
12. ATTORNEY FEES AND DISPUTE RESOLUTION: In the event of a dispute, who pays attorney fees? Is there a one-sided fee clause favoring the tenant? Is mandatory arbitration present that limits landlord remedies?
13. ABANDONMENT CLAUSES: Is there a clear definition of abandonment? Can the landlord re-enter and re-let without waiting for a formal eviction if the unit is clearly abandoned?
14. NOISE, NUISANCE, AND LEASE VIOLATIONS: Are lease violation procedures clear? Is there a cure period for violations and is it reasonable? Can repeated violations (even cured) constitute grounds for non-renewal?
15. MOVE-OUT AND DAMAGE DOCUMENTATION: Is there a move-in/move-out inspection requirement? Does the lease specify photo documentation? Are damage charge-back rates specified?

Return your analysis as a JSON object with this exact structure:
{
  "risk_score": <number 0-100, higher = more risk for landlord>,
  "risk_level": <"low" | "medium" | "high">,
  "summary": <2-3 sentence executive summary that names the top 2 specific risks>,
  "flagged_clauses": [
    {
      "type": <one of the 15 categories above or a specific sub-category>,
      "clause": <the specific problematic text verbatim, or "Not addressed in lease" if the clause is missing>,
      "risk": <specific dollar or legal consequence — e.g. "Tenant can exit with 30 days notice, exposing landlord to 1-2 months of vacancy loss at $X/month">,
      "severity": <"low" | "medium" | "high">
    }
  ],
  "recommendations": [<specific, actionable recommendations — e.g. "Add a 60-day written notice requirement for early termination with a 2-month buyout fee">],
  "renewal_terms": <description of renewal terms or "Not specified — lease likely converts to month-to-month, recommend adding auto-renewal with 60-day notice window">,
  "early_termination_risk": <specific assessment including estimated financial exposure>,
  "pet_policy": <description of pet policy or "Not addressed — add pet addendum with $500 non-refundable pet fee and $50/month pet rent">,
  "maintenance_responsibilities": <clear summary of who is responsible for what, flagging any ambiguities>,
  "rent_increase_cap": <any rent increase limitations with specific numbers, or "No cap specified">
}

Respond with only the JSON object, no markdown formatting.

LEASE DOCUMENT:
${leaseText}`

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')

  try {
    return JSON.parse(content.text) as LeaseAnalysisResult
  } catch {
    throw new Error('Failed to parse lease analysis response')
  }
}

export interface TenantResponseResult {
  response: string
  tone_used: string
  key_points: string[]
  follow_up_actions: string[]
  triggers_work_order: boolean
  work_order_details?: string
}

export async function generateTenantResponse(
  tenantMessage: string,
  context: {
    tenantName: string
    unitNumber: string
    propertyName: string
    leaseEndDate?: string
    monthlyRent?: number
    openMaintenanceItems?: number
    paymentHistory?: string
    tone?: 'firm' | 'friendly' | 'formal'
    state?: string
  }
): Promise<TenantResponseResult> {
  const toneGuide = {
    firm: 'Professional and direct. Set clear expectations. Reference lease terms when relevant. Do not be harsh, but be unambiguous.',
    friendly: 'Warm and helpful. Show genuine care for the tenant\'s experience. Solution-focused.',
    formal: 'Formal business language. Document everything clearly. Use precise legal/property management terminology.',
  }

  // Jurisdiction context for landlord-favorable vs tenant-favorable states
  const tenantFavorableStates = ['CA', 'NY', 'OR', 'WA', 'NJ', 'MA', 'CT', 'MN', 'IL', 'VT', 'ME', 'MD', 'DC']
  const landlordFavorableStates = ['TX', 'GA', 'FL', 'AZ', 'TN', 'IN', 'AL', 'MS', 'AR', 'KY', 'WY', 'ND', 'SD', 'ID']
  const state = context.state?.toUpperCase() || ''
  const isTenantFavorable = tenantFavorableStates.includes(state)
  const isLandlordFavorable = landlordFavorableStates.includes(state)

  const jurisdictionNote = state
    ? isTenantFavorable
      ? `JURISDICTION: ${state} is a TENANT-FAVORABLE state. Be careful with language around: security deposit deductions (strict timelines), eviction procedures (longer notice requirements), rent withholding rights, retaliation claims, and habitability standards. Avoid any language that could be construed as retaliatory or that minimizes tenant rights. The response must be especially precise and documented.`
      : isLandlordFavorable
        ? `JURISDICTION: ${state} is a LANDLORD-FAVORABLE state. Standard landlord protections are generally well-supported. You can reference lease terms confidently and be clear about consequences for non-compliance. Eviction procedures are typically faster and less contested.`
        : `JURISDICTION: ${state} — apply standard balanced landlord-tenant principles. Reference specific lease sections when relevant.`
    : 'JURISDICTION: Unknown — apply conservative, jurisdiction-neutral language. Avoid specific legal claims about timelines or procedures that vary by state.'

  const tone = context.tone || 'formal'

  const prompt = `You are an experienced property manager responding to a tenant message. Your response must be legally appropriate for the jurisdiction, protect the landlord's position without creating liability, and be specific to this tenant's situation.

TENANT CONTEXT:
- Tenant Name: ${context.tenantName}
- Unit: ${context.unitNumber} at ${context.propertyName}
- Monthly Rent: $${context.monthlyRent || 'N/A'}
- Lease End Date: ${context.leaseEndDate || 'N/A'}
- Open Maintenance Items: ${context.openMaintenanceItems || 0}
- Payment History: ${context.paymentHistory || 'No history available'}

${jurisdictionNote}

TONE: ${toneGuide[tone]}

CRITICAL GUIDELINES:
- Never admit fault or liability in writing
- Never promise timelines you cannot guarantee
- For maintenance issues: acknowledge receipt, state when you will respond by, do NOT say "we will fix it by X date"
- For payment issues: reference the specific lease section and be clear about consequences, but do not threaten illegal actions
- For early termination: reference the exact lease terms, state the financial obligations clearly
- For noise/nuisance complaints: acknowledge the complaint, state the lease obligation, describe the action you will take
- Always document that this communication is being retained on file
- If the issue could involve habitability (no heat, water damage, pests), treat as urgent and create a paper trail

TENANT MESSAGE:
"${tenantMessage}"

Generate a professional response and return a JSON object with this exact structure:
{
  "response": <the full response text, addressed to the tenant by name, signed "PropertyMind Management">,
  "tone_used": <brief description of tone applied>,
  "key_points": [<list of key points addressed in the response>],
  "follow_up_actions": [<list of actions the property manager should take, ordered by priority>],
  "triggers_work_order": <true if this message requires a maintenance work order>,
  "work_order_details": <brief description of the work needed, only if triggers_work_order is true>
}

The response should be legally appropriate, specific to the tenant's situation, and actionable. If the message involves maintenance, safety, or legal matters, treat them with appropriate urgency.

Respond with only the JSON object, no markdown formatting.`

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')

  try {
    return JSON.parse(content.text) as TenantResponseResult
  } catch {
    throw new Error('Failed to parse tenant response')
  }
}

export interface WorkOrderResult {
  work_order: string
  priority_justification: string
  estimated_duration: string
  vendor_communication: string
  safety_notes: string
  access_instructions: string
}

export async function generateWorkOrder(
  issue: string,
  context: {
    unitNumber: string
    propertyName: string
    propertyAddress?: string
    tenantName: string
    tenantPhone?: string
    vendorName?: string
    vendorTrade?: string
    priority?: string
  }
): Promise<WorkOrderResult> {
  // Detect issue types that carry specific liability risks
  const issueLower = issue.toLowerCase()
  const isWaterLeak = issueLower.includes('leak') || issueLower.includes('water') || issueLower.includes('flood') || issueLower.includes('pipe') || issueLower.includes('drip')
  const isHVACIssue = issueLower.includes('heat') || issueLower.includes('hvac') || issueLower.includes('furnace') || issueLower.includes('ac') || issueLower.includes('cold') || issueLower.includes('hot')
  const isElectrical = issueLower.includes('electric') || issueLower.includes('outlet') || issueLower.includes('breaker') || issueLower.includes('spark') || issueLower.includes('power')
  const isPestIssue = issueLower.includes('pest') || issueLower.includes('bug') || issueLower.includes('roach') || issueLower.includes('mice') || issueLower.includes('rat') || issueLower.includes('infestat')
  const isGasIssue = issueLower.includes('gas') || issueLower.includes('smell') || issueLower.includes('odor')
  const isMoldIssue = issueLower.includes('mold') || issueLower.includes('mildew') || issueLower.includes('fungus')

  const liabilityContext = [
    isWaterLeak ? 'WATER/MOISTURE ALERT: Water intrusion creates mold liability risk within 24-48 hours. Work order must note: (1) stop the source immediately, (2) document moisture extent with photos, (3) deploy drying equipment if standing water present, (4) schedule mold assessment if issue existed over 48 hours before discovery. Failure to address promptly can create habitability claims and significant remediation costs ($5,000–$50,000+).' : '',
    isHVACIssue ? 'HABITABILITY ALERT: Lack of adequate heat/cooling may constitute a habitability violation in most jurisdictions. This must be treated as emergency priority in cold/extreme weather. Tenant may have right to repair-and-deduct or rent withholding if not addressed promptly. Document response time.' : '',
    isElectrical ? 'ELECTRICAL SAFETY ALERT: Electrical issues carry fire and electrocution risk. Require licensed electrician only — not general handyman. Do not allow temporary fixes. If sparking or burning smell reported, advise tenant to trip the breaker and do not use outlets until inspected.' : '',
    isPestIssue ? 'PEST/HABITABILITY ALERT: Pest infestations are habitability issues in most states. Document the report date, respond within 24 hours, and engage a licensed pest control company. Failure to act can result in rent withholding claims. Get written confirmation from pest company of treatment.' : '',
    isGasIssue ? 'GAS SAFETY EMERGENCY: If gas smell is reported, this is a life-safety emergency. Instruct tenant to evacuate immediately, do not use light switches, call gas company emergency line, and do not re-enter until cleared. Dispatch only licensed gas plumber.' : '',
    isMoldIssue ? 'MOLD LIABILITY ALERT: Visible mold requires immediate professional assessment. Do not attempt to clean with bleach and call it done — this masks the issue and creates liability. Engage a licensed mold remediation company. Document with photos before and after. Mold claims can exceed $100,000 in damages.' : '',
  ].filter(Boolean).join('\n\n')

  const prompt = `You are an experienced property manager creating a formal, vendor-ready work order. The work order must: (1) give the vendor everything they need without requiring a callback, (2) not create liability for the property manager, and (3) include appropriate safety and urgency escalations.

PROPERTY DETAILS:
- Property: ${context.propertyName}
- Address: ${context.propertyAddress || 'On file'}
- Unit: ${context.unitNumber}
- Tenant: ${context.tenantName}
- Tenant Phone: ${context.tenantPhone || 'On file'}

ASSIGNED VENDOR:
- Vendor: ${context.vendorName || 'TBD'}
- Trade: ${context.vendorTrade || 'General Maintenance'}

PRIORITY: ${context.priority || 'medium'}

REPORTED ISSUE:
"${issue}"

${liabilityContext ? `SPECIAL RISK FLAGS — MUST ADDRESS IN WORK ORDER:\n${liabilityContext}` : ''}

WORK ORDER REQUIREMENTS:
- Use professional, vendor-standard language (not conversational)
- State the scope of work clearly without over-promising results
- Do NOT use language like "fix", "repair and guarantee", or "ensure it never happens again" — use "inspect and address", "assess and remediate as needed"
- Include photo documentation requirement before and after work
- Specify that all work must meet local code requirements
- State that vendor must call tenant 1 hour before arrival
- Include a line: "Do not discuss pricing, liability, or lease terms with tenant"
- If safety risk present, clearly mark SAFETY HAZARD at top of work order

Generate a professional work order and return a JSON object with this exact structure:
{
  "work_order": <complete formal work order text, ready to send to vendor — use line breaks for readability>,
  "priority_justification": <specific explanation of priority level with reference to safety, habitability, or financial risk>,
  "estimated_duration": <realistic time estimate for this type of work>,
  "vendor_communication": <professional message to send to the vendor when assigning the work — include expected response time and reporting requirements>,
  "safety_notes": <specific safety considerations — include mold risk for water leaks, fire risk for electrical, habitability risk for HVAC in extreme weather>,
  "access_instructions": <specific instructions: how vendor accesses unit, tenant notification requirement, lockbox/key procedures, what to do if tenant is not home>
}

Respond with only the JSON object, no markdown formatting.`

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')

  try {
    return JSON.parse(content.text) as WorkOrderResult
  } catch {
    throw new Error('Failed to parse work order response')
  }
}
