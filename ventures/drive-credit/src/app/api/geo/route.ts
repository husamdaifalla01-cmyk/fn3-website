import { NextRequest, NextResponse } from 'next/server'

// US state codes where Yendo is available
const YENDO_ELIGIBLE_STATES = new Set([
  'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'ID', 'IL', 'IN',
  'KS', 'KY', 'MI', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NM', 'NV', 'OH', 'OR',
  'PA', 'RI', 'SC', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WV', 'WY',
])

export async function GET(request: NextRequest) {
  // Vercel injects these headers on all requests (Edge Network)
  // x-vercel-ip-country: "US"
  // x-vercel-ip-country-region: "TX" (ISO 3166-2 subdivision code)
  const country = request.headers.get('x-vercel-ip-country') ?? ''
  const region = request.headers.get('x-vercel-ip-country-region') ?? ''

  // Only return state if user is in the US
  if (country !== 'US' || !region) {
    return NextResponse.json({ state: null, eligible: null })
  }

  const state = region.toUpperCase()
  const eligible = YENDO_ELIGIBLE_STATES.has(state)

  return NextResponse.json(
    { state, eligible },
    {
      headers: {
        // Cache for 1 hour — IP rarely changes mid-session
        'Cache-Control': 'private, max-age=3600',
      },
    }
  )
}
