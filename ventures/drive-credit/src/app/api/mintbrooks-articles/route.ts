import { NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export const dynamic = 'force-dynamic'

const MANIFEST_PATH = join(process.cwd(), 'public/articles/manifest.json')

export async function GET() {
  try {
    if (!existsSync(MANIFEST_PATH)) {
      return NextResponse.json({ articles: [], total: 0 })
    }
    const raw = readFileSync(MANIFEST_PATH, 'utf-8')
    const articles = JSON.parse(raw)
    return NextResponse.json({ articles, total: articles.length })
  } catch (err) {
    return NextResponse.json({ articles: [], total: 0, error: 'Could not load articles' })
  }
}
