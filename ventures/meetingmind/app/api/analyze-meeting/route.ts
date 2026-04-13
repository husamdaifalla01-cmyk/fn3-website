import { NextRequest, NextResponse } from 'next/server'
import { MEETING_ANALYSIS_PROMPT } from '@/lib/claude'

export async function POST(req: NextRequest) {
  try {
    const { transcript, title, participants } = await req.json()

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json({ error: 'Transcript is required' }, { status: 400 })
    }

    // Lazy init Anthropic client inside handler
    const Anthropic = (await import('@anthropic-ai/sdk')).default
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    const participantsContext = participants && participants.length > 0
      ? `\n\nKnown participants: ${participants.join(', ')}`
      : ''

    const titleContext = title ? `\n\nMeeting title: ${title}` : ''

    const userMessage = `${titleContext}${participantsContext}\n\nMEETING TRANSCRIPT:\n${transcript}

Please analyze this transcript and return your response in the following exact format:

SUMMARY:
[Your 3-5 sentence summary here]

ACTION_ITEMS:
[JSON array of action items]

DECISIONS:
[JSON array of decisions]

FOLLOW_UP_EMAIL:
[Complete follow-up email]`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: MEETING_ANALYSIS_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    })

    const responseText = message.content[0].type === 'text' ? message.content[0].text : ''

    // Parse sections from response
    const summaryMatch = responseText.match(/SUMMARY:\s*([\s\S]*?)(?=ACTION_ITEMS:|$)/i)
    const actionItemsMatch = responseText.match(/ACTION_ITEMS:\s*([\s\S]*?)(?=DECISIONS:|$)/i)
    const decisionsMatch = responseText.match(/DECISIONS:\s*([\s\S]*?)(?=FOLLOW_UP_EMAIL:|$)/i)
    const followUpMatch = responseText.match(/FOLLOW_UP_EMAIL:\s*([\s\S]*?)$/i)

    const summary = summaryMatch ? summaryMatch[1].trim() : ''

    let actionItems = []
    if (actionItemsMatch) {
      try {
        const jsonStr = actionItemsMatch[1].trim()
        const arrayMatch = jsonStr.match(/\[[\s\S]*\]/)
        if (arrayMatch) {
          actionItems = JSON.parse(arrayMatch[0])
        }
      } catch {
        actionItems = []
      }
    }

    let decisions = []
    if (decisionsMatch) {
      try {
        const jsonStr = decisionsMatch[1].trim()
        const arrayMatch = jsonStr.match(/\[[\s\S]*\]/)
        if (arrayMatch) {
          decisions = JSON.parse(arrayMatch[0])
        }
      } catch {
        decisions = []
      }
    }

    const followUpEmail = followUpMatch ? followUpMatch[1].trim() : ''

    return NextResponse.json({
      summary,
      actionItems,
      decisions,
      followUpEmail,
    })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze meeting. Please try again.' },
      { status: 500 }
    )
  }
}
