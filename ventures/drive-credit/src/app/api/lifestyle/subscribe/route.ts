
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

import articlesSeq  from '@/lib/email-sequences/articles_sequence.json'
import beautySeq    from '@/lib/email-sequences/beauty_sequence.json'
import financeSeq   from '@/lib/email-sequences/finance_sequence.json'
import homeDecorSeq from '@/lib/email-sequences/home_decor_sequence.json'
import kitchenSeq   from '@/lib/email-sequences/kitchen_sequence.json'
import wellnessSeq  from '@/lib/email-sequences/wellness_sequence.json'

// ── Types ─────────────────────────────────────────────────────────────────────

type ProductSlot = {
  slot_id: string             // "product_1", "product_2", …
  amazon_search_term: string
}

type EmailEntry = {
  email_number: number
  send_day: number
  subject_line: string
  html_body: string
  from_name?: string
  product_slots?: ProductSlot[]
}

type Sequence = { emails: EmailEntry[] }

// ── Sequences keyed by form source ───────────────────────────────────────────

const SEQUENCES: Record<string, Sequence> = {
  beauty:       beautySeq    as unknown as Sequence,
  'home-decor': homeDecorSeq as unknown as Sequence,
  kitchen:      kitchenSeq   as unknown as Sequence,
  wellness:     wellnessSeq  as unknown as Sequence,
  finance:      financeSeq   as unknown as Sequence,
  articles:     articlesSeq  as unknown as Sequence,
  default:      articlesSeq  as unknown as Sequence,
}

const NICHE_URL: Record<string, string> = {
  beauty:       'https://mintbrooks.com/lifestyle/beauty',
  'home-decor': 'https://mintbrooks.com/lifestyle/home-decor',
  kitchen:      'https://mintbrooks.com/lifestyle/kitchen',
  wellness:     'https://mintbrooks.com/lifestyle/wellness',
  finance:      'https://mintbrooks.com/lifestyle/finance',
  articles:     'https://mintbrooks.com',
  default:      'https://mintbrooks.com',
}

const AMAZON_TAG = 'mintbrooks-20'

// ── HTML resolution ───────────────────────────────────────────────────────────

/** Build an Amazon affiliate search URL for a product search term */
function amazonSearchUrl(term: string): string {
  return `https://www.amazon.com/s?k=${encodeURIComponent(term)}&tag=${AMAZON_TAG}`
}

// Segmentation tag → persona tag + redirect URL
const SEG_MAP: Record<string, { tag: string; redirect: string }> = {
  SEG_IDEAS:     { tag: 'persona:ideas-first',    redirect: 'https://mintbrooks.com/articles' },
  SEG_PRACTICAL: { tag: 'persona:practical-first', redirect: 'https://mintbrooks.com' },
  SEG_STORIES:   { tag: 'persona:stories-first',   redirect: 'https://mintbrooks.com/articles' },
  SEG_ALL:       { tag: 'persona:all-of-it',        redirect: 'https://mintbrooks.com' },
}

/**
 * Replace all {{PLACEHOLDER}} tokens in an email HTML body:
 *   {{P1_URL}}, {{P2_URL}} … → real Amazon affiliate search URLs per product slot
 *   {{SEG_IDEAS}} etc.      → /api/email/profiling URL that tags subscriber + redirects to niche
 *   any remaining {{*}}     → niche landing page
 */
function resolveHtml(html: string, niche: string, slots: ProductSlot[], email: string): string {
  const nicheUrl = NICHE_URL[niche] ?? 'https://mintbrooks.com'
  let out = html

  // Product slots: product_N → {{PN_URL}}
  for (const slot of slots) {
    const m = slot.slot_id.match(/product_(\d+)/)
    if (m) {
      const url = amazonSearchUrl(slot.amazon_search_term)
      out = out.split(`{{P${m[1]}_URL}}`).join(url)
    }
  }

  // Any unresolved product URLs → niche page
  out = out.replace(/\{\{P\d+_URL\}\}/g, nicheUrl)

  // Segmentation links → profiling endpoint (tags subscriber + redirects)
  out = out.replace(/\{\{(SEG_\w+)\}\}/g, (_, key) => {
    const seg = SEG_MAP[key]
    if (!seg) return nicheUrl
    const base = 'https://mintbrooks.com/api/email/profiling'
    return `${base}?email=${encodeURIComponent(email)}&tag=${encodeURIComponent(seg.tag)}&redirect=${encodeURIComponent(seg.redirect)}`
  })

  // Catch-all for any remaining placeholders
  out = out.replace(/\{\{[^}]+\}\}/g, nicheUrl)

  return out
}

// ── Footer ────────────────────────────────────────────────────────────────────

function footerHtml(email: string): string {
  const unsub = `https://mintbrooks.com/unsubscribe?email=${encodeURIComponent(email)}`
  return `
    <hr style="border:none;border-top:1px solid #e7e5e4;margin:24px 0" />
    <p style="color:#a8a29e;font-size:11px;line-height:1.5">
      You subscribed at
      <a href="https://mintbrooks.com" style="color:#a8a29e">mintbrooks.com</a>.
    </p>
    <p style="color:#a8a29e;font-size:11px;line-height:1.5">
      <a href="${unsub}" style="color:#a8a29e">Unsubscribe</a>
      &nbsp;|&nbsp; Mintbrooks
    </p>
  `
}

// ── Scheduling ────────────────────────────────────────────────────────────────

function daysFromNow(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString()
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Parse body
  let body: { email?: string; source?: string; name?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { email = '', source = 'default', name = '' } = body

  // Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })
  }

  const resend    = new Resend(apiKey)
  const audienceId = process.env.RESEND_AUDIENCE_ID
  const niche     = source in SEQUENCES ? source : 'default'
  const sequence  = SEQUENCES[niche]
  const cleanEmail = email.trim().toLowerCase()

  // Add to Resend audience — non-blocking, never kills the sequence
  if (audienceId) {
    try {
      await resend.contacts.create({
        email: cleanEmail,
        audienceId,
        ...(name.trim() ? { firstName: name.trim() } : {}),
        unsubscribed: false,
      })
    } catch (err) {
      // Log but do not fail — audience add is best-effort
      console.error('[lifestyle/subscribe] contacts.create failed:', err)
    }
  }

  // Send/schedule each email in the sequence independently.
  // One failed scheduled email must NOT block the rest.
  const sent: string[] = []

  for (const entry of sequence.emails) {
    const fromName = (entry.from_name ?? 'Mintbrooks').trim()
    const html     = resolveHtml(entry.html_body, niche, entry.product_slots ?? [], cleanEmail)
                   + footerHtml(cleanEmail)

    const { data, error } = await resend.emails.send({
      from:    `${fromName} <support@mintbrooks.com>`,
      to:      cleanEmail,
      subject: entry.subject_line,
      html,
      ...(entry.send_day > 0 ? { scheduledAt: daysFromNow(entry.send_day) } : {}),
    })

    if (error) {
      console.error(
        `[lifestyle/subscribe] niche=${niche} email_number=${entry.email_number} send_day=${entry.send_day} error:`,
        error,
      )
      // Welcome email (day 0) failing = subscriber gets nothing → hard fail
      if (entry.send_day === 0) {
        return NextResponse.json({ error: 'Failed to send welcome email' }, { status: 500 })
      }
      // Scheduled emails: log and continue — subscriber still gets the welcome
    } else if (data?.id) {
      sent.push(data.id)
    }
  }

  return NextResponse.json({ success: true, scheduled: sent.length })
}
