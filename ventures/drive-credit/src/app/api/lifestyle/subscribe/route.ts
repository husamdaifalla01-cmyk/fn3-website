export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'

/** Map the form source → email system niche slug */
const SOURCE_TO_NICHE: Record<string, string> = {
  beauty:       'beauty',
  'home-decor': 'home-decor',
  kitchen:      'kitchen',
  wellness:     'wellness',
  finance:      'finance',
  articles:     'articles',
  default:      'default',
}

function runSequence(_email: string, _niche: string, _name: string): Promise<{ ok: boolean; output: string }> {
  return Promise.resolve({ ok: false, output: 'Python not available in edge runtime' })
}

export async function POST(req: NextRequest) {
  const { email, source = 'default', name = '' } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const niche = SOURCE_TO_NICHE[source] ?? 'default'
  const { ok, output } = await runSequence(email, niche, name)

  if (!ok) {
    console.error('[lifestyle/subscribe] sequence error:', output)
    return NextResponse.json({ error: 'Failed to schedule sequence' }, { status: 500 })
  }

  try {
    const result = JSON.parse(output.trim().split('\n').slice(-1)[0] || '{}')
    return NextResponse.json({ success: true, scheduled: result.sent?.length ?? 0 })
  } catch {
    return NextResponse.json({ success: true })
  }
}
