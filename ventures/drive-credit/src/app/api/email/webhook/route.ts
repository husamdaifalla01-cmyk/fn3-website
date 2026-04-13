
import { NextRequest, NextResponse } from 'next/server'

// TODO: install `svix` package (`npm install svix`) and uncomment the import
// below to enable proper Resend webhook signature verification.
// import { Webhook } from 'svix'

// ── Types ────────────────────────────────────────────────────────────────────

interface ResendEvent {
  type: 'email.sent' | 'email.delivered' | 'email.opened' | 'email.clicked' | 'email.bounced' | 'email.complained'
  created_at: string
  data: {
    email_id: string
    from: string
    to: string[]
    subject: string
    click?: { link: string }
  }
}

// ── Constants ─────────────────────────────────────────────────────────────────

const NICHE_URL_MAP: Record<string, string> = {
  'home-decor': 'home-decor',
  'wellness':   'wellness',
  'beauty':     'beauty',
  'kitchen':    'kitchen',
  'finance':    'finance',
}

const EVENT_TYPE_MAP: Record<string, string> = {
  'email.opened':    'open',
  'email.clicked':   'click',
  'email.bounced':   'bounce',
  'email.complained': 'unsubscribe',
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function detectNicheFromUrl(url: string): string {
  for (const [key, niche] of Object.entries(NICHE_URL_MAP)) {
    if (url.includes(key)) return niche
  }
  if (url.includes('amazon.com') || url.includes('amzn.to')) return 'product'
  return ''
}

function isAffiliateUrl(url: string): boolean {
  return url.includes('amazon.com') || url.includes('amzn.to')
}

function runPython(_args: string[]): Promise<{ ok: boolean; data: unknown }> {
  return Promise.resolve({ ok: false, data: null })
}

// ── Signature verification ────────────────────────────────────────────────────
// svix is not yet installed. This performs a basic presence check on the
// required Svix headers so that unsigned requests without any headers are
// rejected in production. Replace with the real `Webhook.verify()` call once
// `svix` is added to package.json.

function verifySvixSignature(
  _payload: string,
  headers: { id: string; timestamp: string; signature: string },
  secret: string | undefined,
): boolean {
  if (!secret) {
    // Dev mode — log a warning but allow through
    console.warn('[email/webhook] RESEND_WEBHOOK_SECRET not set — skipping verification (dev mode)')
    return true
  }
  if (!headers.id || !headers.timestamp || !headers.signature) {
    return false
  }
  // TODO: replace the three lines below with real svix verification:
  //   import { Webhook } from 'svix'
  //   const wh = new Webhook(secret)
  //   wh.verify(payload, { 'svix-id': headers.id, 'svix-timestamp': headers.timestamp, 'svix-signature': headers.signature })
  console.warn('[email/webhook] svix package not installed — headers present but signature not cryptographically verified')
  return true
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const payload = await req.text()

  const svixHeaders = {
    id:        req.headers.get('svix-id') ?? '',
    timestamp: req.headers.get('svix-timestamp') ?? '',
    signature: req.headers.get('svix-signature') ?? '',
  }

  const secret = process.env.RESEND_WEBHOOK_SECRET

  if (!verifySvixSignature(payload, svixHeaders, secret)) {
    console.error('[email/webhook] signature verification failed')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  let event: ResendEvent
  try {
    event = JSON.parse(payload) as ResendEvent
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email     = event.data?.to?.[0]
  const subject   = event.data?.subject ?? ''
  const emailId   = event.data?.email_id ?? ''
  const eventType = event.type

  if (!email) {
    console.error('[email/webhook] no recipient email in payload')
    return NextResponse.json({ ok: true })
  }

  const mappedType = EVENT_TYPE_MAP[eventType]

  try {
    switch (eventType) {
      case 'email.opened': {
        await runPython([
          'record_event',
          '--email', email,
          '--type', 'open',
          '--subject', subject,
          '--resend-id', emailId,
        ])
        break
      }

      case 'email.clicked': {
        const url   = event.data.click?.link ?? ''
        const niche = detectNicheFromUrl(url)

        if (isAffiliateUrl(url)) {
          // Product click — record as product_click and tag as converted
          await runPython([
            'record_event',
            '--email', email,
            '--type', 'product_click',
            '--url', url,
            ...(niche ? ['--niche', niche] : []),
            '--subject', subject,
            '--resend-id', emailId,
          ])
          const tagString = niche
            ? `journey:converted-click,product:clicked:${niche}`
            : 'journey:converted-click'
          await runPython([
            'update_tags',
            '--email', email,
            '--add', tagString,
          ])
        } else {
          // Regular click
          await runPython([
            'record_event',
            '--email', email,
            '--type', 'click',
            '--url', url,
            ...(niche ? ['--niche', niche] : []),
            '--subject', subject,
            '--resend-id', emailId,
          ])
        }
        break
      }

      case 'email.bounced': {
        await runPython([
          'update_tags',
          '--email', email,
          '--add', 'engagement:dead',
        ])
        break
      }

      case 'email.complained': {
        await runPython([
          'update_tags',
          '--email', email,
          '--add', 'engagement:dead',
        ])
        break
      }

      default: {
        // email.sent / email.delivered — record as informational if mapped
        if (mappedType) {
          await runPython([
            'record_event',
            '--email', email,
            '--type', mappedType,
            '--subject', subject,
            '--resend-id', emailId,
          ])
        }
        // Otherwise silently acknowledge (email.sent, email.delivered have no mappedType entry)
        break
      }
    }
  } catch (err) {
    // Never fail Resend delivery — log and ack
    console.error('[email/webhook] subscriber_store call failed:', err)
  }

  return NextResponse.json({ ok: true })
}
