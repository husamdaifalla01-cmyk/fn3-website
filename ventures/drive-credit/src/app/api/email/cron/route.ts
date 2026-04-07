export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'
import path from 'path'
import os from 'os'

const PYTHON      = path.join(os.homedir(), 'Downloads/amazon/.venv/bin/python3')
const SCRIPTS_DIR = path.join(os.homedir(), 'Downloads/amazon/email_system')

// ── Python runner ─────────────────────────────────────────────────────────────

function runPython(scriptArgs: string[]): Promise<{ ok: boolean; output: string }> {
  return new Promise((resolve) => {
    const [script, ...args] = scriptArgs
    const scriptPath = path.join(SCRIPTS_DIR, script)

    const proc = spawn(PYTHON, [scriptPath, ...args], {
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
    proc.on('error', (err)  => resolve({ ok: false, output: String(err) }))
  })
}

// ── Cron handler ──────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  // Verify this request comes from Vercel Cron
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results: Record<string, unknown> = {}

  // Always: re-engagement check
  const reEngagementResult = await runPython(['re_engagement.py'])
  results.reEngagement = {
    ok: reEngagementResult.ok,
    output: (() => {
      try {
        return JSON.parse(reEngagementResult.output.trim().split('\n').pop() ?? '{}')
      } catch {
        return reEngagementResult.output
      }
    })(),
  }

  // Sundays only (0 = Sunday): weekly digest
  const dayOfWeek = new Date().getDay()
  if (dayOfWeek === 0) {
    const digestResult = await runPython(['weekly_digest.py'])
    results.weeklyDigest = {
      ok: digestResult.ok,
      output: (() => {
        try {
          return JSON.parse(digestResult.output.trim().split('\n').pop() ?? '{}')
        } catch {
          return digestResult.output
        }
      })(),
    }
  }

  return NextResponse.json({ ok: true, ...results })
}
