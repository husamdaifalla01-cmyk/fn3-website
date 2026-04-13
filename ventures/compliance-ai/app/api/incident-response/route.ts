import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

interface IncidentData {
  incidentType: string
  description: string
  affectedCount: number
  discoveryDate: string
  practiceInfo: {
    name: string
    type: string
    state: string
  }
}

export async function POST(req: Request) {
  try {
    const data: IncidentData = await req.json()

    const { incidentType, description, affectedCount, discoveryDate, practiceInfo } = data

    if (!incidentType || !description) {
      return NextResponse.json({ error: 'Missing required incident details' }, { status: 400 })
    }

    const client = new Anthropic()

    // Determine breach notification requirements
    const requiresImmediateNotification = affectedCount >= 500
    const discoveryDateObj = new Date(discoveryDate || new Date())
    const notificationDeadline60 = new Date(discoveryDateObj)
    notificationDeadline60.setDate(notificationDeadline60.getDate() + 60)
    const annualReportDeadline = new Date(discoveryDateObj.getFullYear() + 1, 1, 28) // Feb 28 of next year

    const notificationContext = requiresImmediateNotification
      ? `This incident affects ${affectedCount} individuals and REQUIRES IMMEDIATE ACTION:
         - Individual notifications: Must be sent within 60 days of discovery (by ${notificationDeadline60.toLocaleDateString()})
         - OCR notification: Must be submitted within 60 days of discovery (by ${notificationDeadline60.toLocaleDateString()})
         - Media notification: Required if 500+ residents in a state/jurisdiction are affected
         - Prominent media notification required in affected state`
      : `This incident affects fewer than 500 individuals (${affectedCount} individuals):
         - Individual notifications: Must be sent without unreasonable delay and within 60 days of discovery
         - OCR notification: Add to annual breach log due to HHS by March 1 of the following year (${annualReportDeadline.toLocaleDateString()})
         - No immediate OCR notification required unless you determine it's a reportable breach`

    const prompt = `You are a HIPAA compliance expert. A healthcare practice has experienced a potential HIPAA incident and needs immediate, specific response guidance.

PRACTICE INFORMATION:
- Practice Name: ${practiceInfo.name}
- Practice Type: ${practiceInfo.type}
- State: ${practiceInfo.state}

INCIDENT DETAILS:
- Type: ${incidentType}
- Description: ${description}
- Number of individuals potentially affected: ${affectedCount}
- Discovery date: ${discoveryDate || 'Today'}

BREACH NOTIFICATION REQUIREMENTS:
${notificationContext}

Please provide:

1. IMMEDIATE RISK ASSESSMENT
- Is this a reportable breach under HIPAA? (analyze the 4-factor test: nature/extent of PHI, unauthorized person, whether PHI was actually acquired/viewed, extent to which risk has been mitigated)
- Severity level (Critical/High/Medium/Low)
- Estimated risk to affected individuals

2. STEP-BY-STEP RESPONSE WORKFLOW
Provide a numbered list of specific, actionable steps with:
- Step title
- Detailed action description
- Responsible party (Privacy Officer, IT, Practice Manager, etc.)
- Deadline (specific dates where applicable)

Include at minimum:
- Immediate containment steps
- Evidence preservation
- Internal investigation steps
- Affected individual notification process (template language if applicable)
- OCR breach portal submission guidance (if required)
- Media notification guidance (if required)
- Workforce documentation requirements
- Remediation steps to prevent recurrence

3. REQUIRED DOCUMENTATION CHECKLIST
List every document that must be created and retained (minimum 6 years per HIPAA)

4. NOTIFICATION LETTER TEMPLATE
If breach notification is required, provide a draft notification letter to affected individuals (must include all required HIPAA elements: description of breach, PHI involved, steps taken, steps individuals should take, what practice is doing, contact information)

5. OCR BREACH REPORT GUIDANCE
- Whether to file at hhs.gov/hipaa/for-professionals/breach-notification/breach-reporting
- Key information to include in the report

Format your response in clear sections. Be specific, actionable, and err on the side of caution with legal requirements. This is for a real healthcare practice.`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const responseContent =
      message.content[0].type === 'text' ? message.content[0].text : ''

    // Determine severity based on incident type and count
    let severity: string
    if (affectedCount >= 500 || incidentType.toLowerCase().includes('ransomware') || incidentType.toLowerCase().includes('hack')) {
      severity = 'critical'
    } else if (affectedCount >= 50 || incidentType.toLowerCase().includes('unauthorized')) {
      severity = 'high'
    } else if (affectedCount >= 10 || incidentType.toLowerCase().includes('lost')) {
      severity = 'medium'
    } else {
      severity = 'low'
    }

    return NextResponse.json({
      responseGuidance: responseContent,
      severity,
      requiresImmediateNotification,
      notificationDeadline: notificationDeadline60.toISOString(),
      annualReportDeadline: annualReportDeadline.toISOString(),
      affectedCount,
      incidentType,
      ocrPortalUrl: 'https://ocrportal.hhs.gov/ocr/breach/wizard_breach.jsf',
    })
  } catch (error) {
    console.error('Incident response error:', error)
    return NextResponse.json(
      { error: 'Failed to generate incident response guidance' },
      { status: 500 }
    )
  }
}
