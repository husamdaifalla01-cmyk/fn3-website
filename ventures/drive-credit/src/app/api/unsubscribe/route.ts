
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (!apiKey || !audienceId) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })
  }

  const resend = new Resend(apiKey)

  try {
    // List contacts to find the one matching this email
    const { data: contacts } = await resend.contacts.list({ audienceId })
    const contact = contacts?.data?.find(
      (c: { email: string }) => c.email.toLowerCase() === email.toLowerCase()
    )

    if (contact) {
      await resend.contacts.update({
        id: contact.id,
        audienceId,
        unsubscribed: true,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[unsubscribe] error:', err)
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 })
  }
}
