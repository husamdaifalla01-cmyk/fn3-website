export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'

/**
 * MaxBounty postback endpoint.
 * They hit: /api/postback?subid=CLICK_ID&payout=1.50&offer_id=12345&status=approved&token=SECRET
 * We log it and return 200.
 */
export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl
    const token = url.searchParams.get('token')
    const secret = process.env.MAXBOUNTY_POSTBACK_SECRET

    if (!secret || token !== secret) {
      return new NextResponse('unauthorized', { status: 401 })
    }

    const subid = url.searchParams.get('subid') || ''
    const payout = url.searchParams.get('payout') || '0'
    const offer_id = url.searchParams.get('offer_id') || ''
    const status = url.searchParams.get('status') || 'approved'

    if (!subid) {
      return new NextResponse('missing subid', { status: 400 })
    }

    const entry = {
      type: 'conversion',
      subid,
      payout: parseFloat(payout) || 0,
      offer_id,
      status,
      timestamp: new Date().toISOString(),
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '',
      ua: req.headers.get('user-agent') || '',
    }

    // Log as structured JSON — captured by Cloudflare's log stream.
    // Connect a log drain (Axiom, Datadog, etc.) to persist conversion data.
    console.log(JSON.stringify(entry))

    return new NextResponse('ok', { status: 200 })
  } catch {
    return new NextResponse('error', { status: 500 })
  }
}
