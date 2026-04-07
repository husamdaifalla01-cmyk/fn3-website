import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'
import path from 'path'
import os from 'os'

const PYTHON  = path.join(os.homedir(), 'Downloads/amazon/.venv/bin/python3')
const SCRIPT  = path.join(os.homedir(), 'Downloads/amazon/email_system/send_sequence.py')

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

function runSequence(email: string, niche: string, name: string): Promise<{ ok: boolean; output: string }> {
  return new Promise((resolve) => {
    const args = ['--email', email, '--niche', niche]
    if (name) args.push('--name', name)

    const proc = spawn(PYTHON, [SCRIPT, ...args], {
      env: {
        ...process.env,
        HOME: os.homedir(),
        RESEND_API_KEY: process.env.RESEND_API_KEY ?? '',
        RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID ?? '',
      },
    })

    let output = ''
    proc.stdout.on('data', (d: Buffer) => { output += d.toString() })
    proc.stderr.on('data', (d: Buffer) => { output += d.toString() })
    proc.on('close', (code) => resolve({ ok: code === 0, output }))
    proc.on('error', (err) => resolve({ ok: false, output: String(err) }))
  })
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
