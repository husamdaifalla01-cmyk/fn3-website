import { NextRequest, NextResponse } from 'next/server'
import { readdirSync, readFileSync, existsSync, statSync } from 'fs'
import { join } from 'path'
import os from 'os'

export const dynamic = 'force-dynamic'

const OUTPUT_DIR = join(os.homedir(), 'Downloads/amazon/output')

function findPinImage(asin: string): { path: string; type: string } | null {
  if (!existsSync(OUTPUT_DIR)) return null

  const runDirs = readdirSync(OUTPUT_DIR)
    .filter(d => {
      try {
        return statSync(join(OUTPUT_DIR, d)).isDirectory()
      } catch { return false }
    })
    .sort()
    .reverse() // most recent first

  for (const runDir of runDirs) {
    // Only serve Nano Banana lifestyle images — _original.jpg are 320px thumbnails,
    // no better than the Amazon CDN fallback. _pin.png are text-overlay graphics, never images.
    const nbPath = join(OUTPUT_DIR, runDir, 'pins', `${asin}_nb.jpg`)
    if (existsSync(nbPath)) return { path: nbPath, type: 'image/jpeg' }
  }

  return null
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ asin: string }> }
) {
  const { asin } = await params
  const image = findPinImage(asin)

  if (!image) {
    return new NextResponse(null, { status: 404 })
  }

  const buffer = readFileSync(image.path)
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': image.type,
      'Cache-Control': 'public, max-age=300',
    },
  })
}
