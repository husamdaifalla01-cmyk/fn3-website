
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { OFFERS, buildAffiliateUrl } from '@/lib/offers'

const YENDO_EMAIL_WELCOME = buildAffiliateUrl(OFFERS.yendo.url, 'email', 'welcome', 'exit-intent-signup')
const YENDO_EMAIL_DAY3 = buildAffiliateUrl(OFFERS.yendo.url, 'email', 'nurture-d3', 'objection-handler')
const YENDO_EMAIL_DAY7 = buildAffiliateUrl(OFFERS.yendo.url, 'email', 'nurture-d7', 'last-chance')

function footerHtml(email: string) {
  return `
    <hr style="border:none;border-top:1px solid #e7e5e4;margin:24px 0" />
    <p style="color:#a8a29e;font-size:11px;line-height:1.5">
      <strong>Advertising Disclosure:</strong> Mintbrooks may receive compensation
      when you click on links and apply for products featured on this site.
      This compensation may influence the selection, appearance, and order of
      offers. Not all available financial products or offers are represented.
    </p>
    <p style="color:#a8a29e;font-size:11px;line-height:1.5">
      You're receiving this because you signed up at
      <a href="https://mintbrooks.com" style="color:#a8a29e">mintbrooks.com</a>.
    </p>
    <p style="color:#a8a29e;font-size:11px;line-height:1.5">
      <a href="https://mintbrooks.com/unsubscribe?email=${encodeURIComponent(email)}" style="color:#a8a29e">Unsubscribe</a>
      &nbsp;|&nbsp; Mintbrooks &bull; 651 N Broad St, Suite 201, Middletown, DE 19709
    </p>
  `
}

/** ISO timestamp N days from now */
function daysFromNow(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString()
}

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })
  }
  const resend = new Resend(apiKey)
  const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  try {
    if (AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        audienceId: AUDIENCE_ID,
        unsubscribed: false,
      })
    }

    // ── Email 1: Welcome (immediate) ─────────────────────────────────────────
    await resend.emails.send({
      from: 'Mintbrooks <support@mintbrooks.com>',
      to: email,
      subject: 'Your car could be worth up to $10,000 in credit',
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1c1917">
          <h1 style="font-size:22px;font-weight:800;margin-bottom:8px">
            Your car could unlock a real Visa credit card
          </h1>
          <p style="color:#57534e;line-height:1.6">
            Most people don't know this: if you own a car, you may qualify for a
            <strong>$500&ndash;$10,000 Visa credit card</strong> &mdash; using your vehicle as collateral
            instead of your credit score.
          </p>
          <p style="color:#57534e;line-height:1.6">
            It's called a <strong>car-secured credit card</strong>. You keep driving your car.
            No title loan. No hard inquiry to check eligibility.
          </p>
          <a
            href="${YENDO_EMAIL_WELCOME}"
            style="display:inline-block;background:#d97706;color:#fff;text-decoration:none;font-weight:700;padding:14px 28px;border-radius:10px;margin:20px 0"
          >
            Check My Car's Eligibility &rarr;
          </a>
          <p style="color:#57534e;line-height:1.6;font-size:14px">
            Takes 30 seconds. Soft inquiry only &mdash; won't affect your credit score.
            Available in 36+ states.
          </p>
          ${footerHtml(email)}
        </div>
      `,
    })

    // ── Email 2: Day 3 — Objection Handler ("Is This a Scam?") ───────────────
    await resend.emails.send({
      from: 'Mintbrooks <support@mintbrooks.com>',
      to: email,
      subject: 'Is car-secured credit legit? (Honest answer)',
      scheduledAt: daysFromNow(3),
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1c1917">
          <h1 style="font-size:20px;font-weight:800;margin-bottom:8px">
            "This sounds too good to be true."
          </h1>
          <p style="color:#57534e;line-height:1.6">
            We hear that a lot. So let's be direct.
          </p>
          <p style="color:#57534e;line-height:1.6">
            Yendo is a licensed financial technology company. The car-secured Visa
            is a real Visa credit card &mdash; works at any store, reported to all 3 credit bureaus,
            with a real credit limit ($500&ndash;$10K) based on your car's value.
          </p>
          <p style="color:#57534e;line-height:1.6">
            <strong>The trade-offs you should know:</strong>
          </p>
          <ul style="color:#57534e;line-height:1.8;padding-left:20px">
            <li>Yendo places a lien on your car's title. You keep driving it &mdash; no repossession risk from just using the card.</li>
            <li>If you default on the card balance (like any credit card), there are consequences. Pay your bill and it's a non-issue.</li>
            <li>APR is higher than prime cards. It's designed for credit building, not long-term balance carrying.</li>
            <li>Eligibility check is a soft pull. Full application may involve a hard pull.</li>
          </ul>
          <p style="color:#57534e;line-height:1.6">
            If you've been rejected by banks, don't have a deposit for a secured card,
            or just need to start rebuilding &mdash; this is one of the few real options.
          </p>
          <a
            href="${YENDO_EMAIL_DAY3}"
            style="display:inline-block;background:#d97706;color:#fff;text-decoration:none;font-weight:700;padding:14px 28px;border-radius:10px;margin:20px 0"
          >
            See If My Car Qualifies &rarr;
          </a>
          <p style="color:#57534e;line-height:1.6;font-size:13px">
            30-second check. No deposit. No hard pull to see eligibility.
          </p>
          ${footerHtml(email)}
        </div>
      `,
    })

    // ── Email 3: Day 7 — Last Push ("Here's Exactly What Happens") ───────────
    await resend.emails.send({
      from: 'Mintbrooks <support@mintbrooks.com>',
      to: email,
      subject: 'Step by step: what happens when you apply',
      scheduledAt: daysFromNow(7),
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1c1917">
          <h1 style="font-size:20px;font-weight:800;margin-bottom:8px">
            Here's exactly what applying looks like
          </h1>
          <p style="color:#57534e;line-height:1.6">
            A lot of people get to the eligibility page and freeze because they
            don't know what comes next. Here's the whole thing, step by step.
          </p>
          <div style="background:#fef9ee;border-radius:12px;padding:20px;margin:20px 0;border:1px solid rgba(217,119,6,0.2)">
            <p style="color:#1c1917;font-weight:700;margin:0 0 12px 0">The 4 Steps</p>
            <p style="color:#57534e;line-height:1.8;margin:0">
              <strong>1. Check eligibility (30 sec, soft pull)</strong> &mdash; Enter your car details. See
              if your vehicle qualifies. Zero effect on your credit score.<br/><br/>
              <strong>2. Confirm your identity</strong> &mdash; Basic info. They verify it's you.<br/><br/>
              <strong>3. Get your credit limit</strong> &mdash; Based on your car's appraised value
              ($500&ndash;$10,000). A hard inquiry may occur at this step.<br/><br/>
              <strong>4. Card ships in 7&ndash;10 days</strong> &mdash; Standard Visa. Works everywhere.
              Reported to all 3 bureaus every month.
            </p>
          </div>
          <p style="color:#57534e;line-height:1.6">
            That's it. If you qualify, you can have a real credit card in under 2 weeks &mdash;
            no deposit, no credit score requirement.
          </p>
          <a
            href="${YENDO_EMAIL_DAY7}"
            style="display:inline-block;background:#d97706;color:#fff;text-decoration:none;font-weight:700;padding:14px 28px;border-radius:10px;margin:20px 0"
          >
            Start My Eligibility Check &rarr;
          </a>
          <p style="color:#57534e;line-height:1.6;font-size:13px">
            Available in 36+ states &middot; Keep driving your car &middot; Builds real credit
          </p>
          ${footerHtml(email)}
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[subscribe] error:', err)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}

