export const runtime = 'edge'

import { NextResponse } from 'next/server'

/**
 * Health check endpoint — used by Cloudflare uptime monitors and external pings.
 * Returns service status, env var presence (no values), and timestamp.
 */
export async function GET() {
  const checks = {
    resend: !!process.env.RESEND_API_KEY,
    resend_audience: !!process.env.RESEND_AUDIENCE_ID,
    ga4: !!process.env.NEXT_PUBLIC_GA_ID,
    maxbounty: !!process.env.NEXT_PUBLIC_MAXBOUNTY_OFFER_ID,
  }

  const allHealthy = Object.values(checks).every(Boolean)

  return NextResponse.json(
    {
      status: allHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      version: process.env.CF_PAGES_COMMIT_SHA?.slice(0, 7) || 'local',
      env: checks,
    },
    {
      status: allHealthy ? 200 : 207,
      headers: {
        'Cache-Control': 'no-store, no-cache',
      },
    }
  )
}
