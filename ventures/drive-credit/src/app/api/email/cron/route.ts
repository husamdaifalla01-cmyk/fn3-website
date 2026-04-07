export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'

// Python runner is not available in Cloudflare Workers environment
function runPython(_scriptArgs: string[]): Promise<{ ok: boolean; output: string }> {
  return Promise.resolve({ ok: false, output: 'Python not available in edge runtime' })
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
