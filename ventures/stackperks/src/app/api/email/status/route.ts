import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

type ProbeResult = {
  ok: boolean
  status: number
  body?: unknown
  error?: string
}

async function probe(url: string, key: string): Promise<ProbeResult> {
  try {
    const r = await fetch(url, { headers: { Authorization: `Bearer ${key}` } })
    const text = await r.text()
    let body: unknown = text
    try { body = JSON.parse(text) } catch {}
    return { ok: r.ok, status: r.status, body }
  } catch (e) {
    return { ok: false, status: 0, error: String(e) }
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const guard = process.env.EMAIL_STATUS_TOKEN
  if (guard && url.searchParams.get('token') !== guard) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  const sendKey = process.env.RESEND_API_KEY
  const adminKey = process.env.RESEND_ADMIN_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  const result: Record<string, unknown> = {
    checked_at: new Date().toISOString(),
    env: {
      RESEND_API_KEY: !!sendKey,
      RESEND_ADMIN_API_KEY: !!adminKey,
      RESEND_AUDIENCE_ID: !!audienceId,
    },
  }

  if (!sendKey && !adminKey) {
    result.live = false
    result.blocker = 'No Resend API key in env — funnel is dark.'
    return NextResponse.json(result, { status: 200 })
  }

  if (audienceId) {
    const key = adminKey || sendKey!
    result.audience = await probe(
      `https://api.resend.com/audiences/${audienceId}`,
      key
    )
  }

  if (adminKey) {
    result.broadcasts = await probe('https://api.resend.com/broadcasts', adminKey)
  }

  const audienceOk = audienceId
    ? (result.audience as ProbeResult | undefined)?.ok === true
    : false
  result.live = !!sendKey && audienceOk
  if (!result.live) {
    result.blocker = !audienceId
      ? 'RESEND_AUDIENCE_ID missing — list cannot grow.'
      : 'Audience probe failed — verify key scope and audience id.'
  }

  return NextResponse.json(result, { status: 200 })
}
