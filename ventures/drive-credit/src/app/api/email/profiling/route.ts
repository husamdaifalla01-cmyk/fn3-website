
import { NextRequest, NextResponse } from 'next/server'

const FALLBACK_REDIRECT = 'https://mintbrooks.com/lifestyle'
const ALLOWED_REDIRECT_PREFIX = 'https://mintbrooks.com'

// Only these tag prefixes are accepted to prevent arbitrary tag injection
const VALID_TAG_PREFIXES = ['persona:', 'interest:', 'routing:']

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Strip any character that isn't a lowercase letter, digit, colon, underscore, or hyphen */
function sanitiseTag(raw: string): string {
  return raw.toLowerCase().replace(/[^a-z0-9:_-]/g, '')
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidTagPrefix(tag: string): boolean {
  return VALID_TAG_PREFIXES.some((prefix) => tag.startsWith(prefix))
}

function isSafeRedirect(url: string): boolean {
  return url.startsWith(ALLOWED_REDIRECT_PREFIX)
}

function nicheFromTag(tag: string): string {
  if (tag.includes('skin') || tag.includes('beauty'))              return 'beauty'
  if (tag.includes('cook') || tag.includes('kitchen'))             return 'kitchen'
  if (tag.includes('room') || tag.includes('decor'))               return 'home-decor'
  if (
    tag.includes('finance') ||
    tag.includes('invest') ||
    tag.includes('saver') ||
    tag.includes('debt')
  )                                                                  return 'finance'
  if (tag.includes('wellness') || tag.includes('fitness'))         return 'wellness'
  return 'articles'
}

function runPython(_args: string[]): Promise<{ ok: boolean; data: unknown }> {
  return Promise.resolve({ ok: false, data: null })
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const emailParam    = searchParams.get('email') ?? ''
  const tagParam      = searchParams.get('tag') ?? ''
  const redirectParam = searchParams.get('redirect') ?? ''

  // ── Validate email ──────────────────────────────────────────────────────────
  if (!emailParam || !isValidEmail(emailParam)) {
    return NextResponse.redirect(FALLBACK_REDIRECT, { status: 302 })
  }

  // ── Validate and sanitise tag ───────────────────────────────────────────────
  const cleanTag = sanitiseTag(tagParam)
  if (!cleanTag || !isValidTagPrefix(cleanTag)) {
    console.warn('[email/profiling] invalid or missing tag:', tagParam)
    return NextResponse.redirect(FALLBACK_REDIRECT, { status: 302 })
  }

  // ── Validate redirect URL (prevent open redirect) ───────────────────────────
  const redirectTarget =
    redirectParam && isSafeRedirect(redirectParam)
      ? redirectParam
      : FALLBACK_REDIRECT

  // ── Call subscriber_store (fire-and-forget style — always redirect) ─────────
  try {
    const niche = nicheFromTag(cleanTag)

    // Apply the persona/interest tag
    const tagResult = await runPython([
      'update_tags',
      '--email', emailParam,
      '--add', cleanTag,
    ])
    if (!tagResult.ok) {
      console.error('[email/profiling] update_tags failed for', emailParam, cleanTag)
    }

    // Record a quiz_answer engagement event
    await runPython([
      'record_event',
      '--email', emailParam,
      '--type', 'quiz_answer',
      '--niche', niche,
    ])
  } catch (err) {
    // Never block the redirect — just log
    console.error('[email/profiling] subscriber_store call threw:', err)
  }

  return NextResponse.redirect(redirectTarget, { status: 302 })
}
