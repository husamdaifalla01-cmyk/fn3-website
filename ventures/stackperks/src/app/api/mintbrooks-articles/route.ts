
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { origin } = new URL(request.url)
    const res = await fetch(`${origin}/articles/manifest.json`, { cache: 'no-store' })
    if (!res.ok) return NextResponse.json({ articles: [], total: 0 })
    const articles = await res.json()
    return NextResponse.json({ articles, total: Array.isArray(articles) ? articles.length : 0 })
  } catch {
    return NextResponse.json({ articles: [], total: 0, error: 'Could not load articles' })
  }
}
