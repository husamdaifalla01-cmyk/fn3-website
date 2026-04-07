export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'

interface ClickPayload {
  click_id: string
  placement: string
  offer: string
  timestamp: string
  referrer?: string
  url?: string
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ClickPayload

    if (!body.click_id || !body.placement || !body.offer) {
      return NextResponse.json({ error: 'missing fields' }, { status: 400 })
    }

    const entry = {
      type: 'click',
      click_id: body.click_id,
      placement: body.placement,
      offer: body.offer,
      timestamp: body.timestamp || new Date().toISOString(),
      referrer: body.referrer || '',
      url: body.url || '',
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '',
      ua: req.headers.get('user-agent') || '',
    }

    // Log as structured JSON — captured by Vercel's log stream
    // Can be piped to any log drain (Datadog, Axiom, etc.)
    console.log(JSON.stringify(entry))

    return NextResponse.json({ ok: true, click_id: entry.click_id })
  } catch {
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}
