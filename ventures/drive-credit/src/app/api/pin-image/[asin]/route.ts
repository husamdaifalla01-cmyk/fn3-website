import { NextRequest, NextResponse } from 'next/server'

// Pin images are served directly from Amazon's CDN.
// This route redirects to the standard Amazon product image URL.
// next.config.ts already allows m.media-amazon.com as a remote pattern.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ asin: string }> }
) {
  const { asin } = await params
  // Standard Amazon product image URL — works for all ASINs
  const amazonImageUrl = `https://m.media-amazon.com/images/P/${asin}.01._SCLZZZZZZZ_.jpg`
  return NextResponse.redirect(amazonImageUrl, { status: 302 })
}
