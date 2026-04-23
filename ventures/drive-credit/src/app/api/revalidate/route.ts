import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { pingIndexNow, pingGoogleSitemap } from '@/lib/indexnow'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret')
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const body = (await req.json().catch(() => ({}))) as {
    paths?: string[]
    urls?: string[]
  }

  const paths = body.paths ?? []
  const urls = body.urls ?? paths.map((p) => `https://mintbrooks.com${p.startsWith('/') ? p : `/${p}`}`)

  for (const p of paths) {
    try {
      revalidatePath(p)
    } catch {}
  }

  await Promise.allSettled([pingIndexNow(urls), pingGoogleSitemap()])

  return NextResponse.json({ ok: true, revalidated: paths, pinged: urls.length })
}
