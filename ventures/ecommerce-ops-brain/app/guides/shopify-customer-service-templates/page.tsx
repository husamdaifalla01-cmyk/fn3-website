import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '15 Shopify Customer Service Templates (WISMO, Refunds, Damaged Items)',
  description: 'Copy-paste Shopify customer service templates for every ticket type: WISMO responses, damaged item, wrong item, refund approved, refund denied, delay notifications, review requests, and win-back emails.',
}

const TEMPLATES = [
  {
    id: 'wismo-1',
    category: 'WISMO',
    title: 'WISMO — Standard (Order in Transit)',
    template: `Hi [Customer Name],

Thanks for reaching out! Your order #[ORDER_NUMBER] is on its way.

Here's where things stand:
- Order placed: [ORDER_DATE]
- Shipped: [SHIP_DATE]
- Carrier: [CARRIER]
- Tracking number: [TRACKING_NUMBER]
- Estimated delivery: [DELIVERY_DATE]

You can track your package in real time here: [TRACKING_LINK]

If your order doesn't arrive by [DELIVERY_DATE + 2 DAYS], reply to this email and I'll personally investigate. We're here to make sure this lands in your hands.

Warm regards,
[YOUR_NAME]
[STORE_NAME] Customer Support`,
  },
  {
    id: 'wismo-2',
    category: 'WISMO',
    title: 'WISMO — Delayed (Carrier Issue)',
    template: `Hi [Customer Name],

I completely understand the frustration — I'd want to know too.

Your order #[ORDER_NUMBER] was shipped on [SHIP_DATE], but it looks like [CARRIER] is showing a delay. The updated estimated delivery is now [NEW_DATE].

What I've done: I've flagged your order for monitoring. If it doesn't move in the next 48 hours, I'll escalate directly with the carrier on your behalf.

You don't need to do anything. I'll follow up by [DATE] with an update either way.

I'm sorry for the extra wait — and I appreciate your patience while we sort this out.

[YOUR_NAME]
[STORE_NAME] Support`,
  },
  {
    id: 'wismo-3',
    category: 'WISMO',
    title: 'WISMO — High-AOV Customer (Priority Handling)',
    template: `Hi [Customer Name],

Thank you so much for your order — I want to make sure this reaches you without any issues.

Your order #[ORDER_NUMBER] is currently in transit with [CARRIER]. Tracking: [TRACKING_LINK]

Estimated delivery: [DELIVERY_DATE]

Given the value of your order, I've made a note to personally follow up if anything looks off. If you have any questions at all before it arrives, reply directly here and I'll respond within [X] hours — no ticket queue.

Looking forward to you receiving it.

[YOUR_NAME]
[STORE_NAME] | Direct Support Line`,
  },
  {
    id: 'damaged-1',
    category: 'Damaged Item',
    title: 'Damaged Item — Replacement Offered',
    template: `Hi [Customer Name],

Oh no — I'm so sorry. That is absolutely not the experience we want you to have, and I completely understand how frustrating it is to receive something damaged.

Here's what I'd like to do: I'll send you a replacement [PRODUCT_NAME] immediately, at no extra cost. No need to return the damaged item — just dispose of it however is easiest for you.

To get this moving, can you confirm your shipping address? I'll get the replacement out within 1 business day.

[SHIPPING ADDRESS FROM ORDER? OR ASK TO CONFIRM]

Again, I'm really sorry this happened. We take quality seriously and I appreciate you letting us know.

[YOUR_NAME]
[STORE_NAME] Support`,
  },
  {
    id: 'damaged-2',
    category: 'Damaged Item',
    title: 'Damaged Item — Refund Option',
    template: `Hi [Customer Name],

I'm really sorry to hear your [PRODUCT_NAME] arrived damaged — that's on us, and I want to make it right immediately.

You have two options, and I'll do whichever works best for you:

Option A: Replacement — I'll ship a new [PRODUCT_NAME] to you right away, free of charge. No return required.

Option B: Full refund — I'll process a complete refund back to your original payment method within 3–5 business days.

Just reply with which you'd prefer and I'll take care of it today.

[YOUR_NAME]
[STORE_NAME]`,
  },
  {
    id: 'wrong-item',
    category: 'Wrong Item',
    title: 'Wrong Item Sent',
    template: `Hi [Customer Name],

I sincerely apologize — it looks like we sent you the wrong item, and that's entirely our mistake.

Here's my plan to fix this:

1. I'll ship the correct item ([CORRECT_PRODUCT]) to you today, with expedited shipping so you're not waiting even longer.
2. For the incorrect item — no need to return it unless you'd like to. I'll send a prepaid return label if you'd prefer not to keep it.

You'll get a shipping confirmation with tracking as soon as it's packed.

Once again, I'm really sorry for the confusion. This is getting fixed right now.

[YOUR_NAME]
[STORE_NAME] Support`,
  },
  {
    id: 'refund-approved',
    category: 'Refunds',
    title: 'Refund Approved',
    template: `Hi [Customer Name],

Good news — your refund for order #[ORDER_NUMBER] has been approved and processed.

Refund amount: $[AMOUNT]
Back to: [PAYMENT_METHOD / last 4 digits]
Timeline: 3–5 business days to appear, depending on your bank

You should see it by [EXPECTED_DATE]. If it hasn't appeared by then, your bank can usually trace it with the reference number: [REFUND_REF].

Is there anything else I can help with? If you ever want to give us another try, we'd love the chance to do better.

[YOUR_NAME]
[STORE_NAME]`,
  },
  {
    id: 'refund-denied',
    category: 'Refunds',
    title: 'Refund Denied (Outside Policy)',
    template: `Hi [Customer Name],

Thank you for reaching out about order #[ORDER_NUMBER]. I've reviewed your request and I want to be upfront with you.

Our return window is [X] days from delivery, and your order was delivered on [DELIVERY_DATE] — [X] days ago. Because we're outside that window, I'm unfortunately unable to process a standard refund.

That said, I don't want to leave you with nothing. Here's what I can offer:

- Store credit for the full purchase amount, valid for 12 months
- An exchange for a different size or style if that's helpful

I know this isn't the answer you were hoping for, and I'm sorry I can't do more. If you'd like to take either of the above options, just reply here and I'll set it up immediately.

[YOUR_NAME]
[STORE_NAME]`,
  },
  {
    id: 'delay-notification',
    category: 'Proactive',
    title: 'Delay Notification (Pre-emptive)',
    template: `Hi [Customer Name],

I'm reaching out because I want to give you a heads-up before you have to ask.

Your order #[ORDER_NUMBER] is experiencing a delay due to [REASON: carrier backlog / supply chain issue / high demand]. Your original estimated delivery was [ORIGINAL_DATE]. The updated estimate is [NEW_DATE].

I know this is inconvenient, and I'm sorry. Here are your options:

1. Wait for the updated delivery (no action needed from you)
2. Cancel for a full refund — just reply "cancel" and I'll process it today

If you'd like to wait, I'll send you a personal update on [DATE] with the latest status.

Thank you for your patience — we genuinely appreciate it.

[YOUR_NAME]
[STORE_NAME]`,
  },
  {
    id: 'review-request',
    category: 'Post-Purchase',
    title: 'Review Request (Post-Delivery)',
    template: `Hi [Customer Name],

I hope your [PRODUCT_NAME] arrived in perfect condition!

If you have 60 seconds, we'd love to hear what you think. Honest reviews help other shoppers make good decisions — and they help us keep improving.

Leave a review here: [REVIEW_LINK]

If anything wasn't right with your order, please reply to this email before you review — I'd much rather fix it than have you left with a bad experience.

Thank you so much for choosing [STORE_NAME].

[YOUR_NAME]`,
  },
  {
    id: 'win-back',
    category: 'Retention',
    title: 'Win-Back (Lapsed Customer)',
    template: `Hi [Customer Name],

It's been a while since your last order and I wanted to reach out personally.

Since you last shopped with us, we've added [NEW_PRODUCT_CATEGORY / improvement / feature]. I think you'd particularly like [SPECIFIC_PRODUCT] based on what you ordered before.

As a thank you for being a past customer, here's 15% off your next order:

Code: COMEBACK15
Expires: [DATE]

No pressure at all — but if there's anything that put you off last time, I'd genuinely like to know. Just reply to this email.

[YOUR_NAME]
[STORE_NAME]`,
  },
]

const CATEGORIES = ['WISMO', 'Damaged Item', 'Wrong Item', 'Refunds', 'Proactive', 'Post-Purchase', 'Retention']

export default function CustomerServiceTemplatesGuide() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '15 Shopify Customer Service Templates (WISMO, Refunds, Damaged Items)',
    description: 'Ready-to-use customer service response templates for Shopify merchants covering WISMO, damaged items, refunds, delays, review requests, and win-back emails.',
    author: { '@type': 'Organization', name: 'E-commerce Ops Brain' },
    publisher: { '@type': 'Organization', name: 'E-commerce Ops Brain' },
    datePublished: '2026-03-01',
    dateModified: '2026-03-21',
  }

  return (
    <div style={{ background: '#080c14', color: '#f1f5f9', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      {/* Navigation */}
      <nav style={{ borderBottom: '1px solid #1e293b', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(8, 12, 20, 0.95)', backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #f97316, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
              🧠
            </div>
            <span style={{ fontWeight: 700, fontSize: '18px' }}>Ops Brain</span>
          </Link>
          <Link href="/auth/signup" style={{
            background: '#f97316',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
          }}>
            Start Free Trial
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '64px 24px 48px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '32px', fontSize: '13px', color: '#64748b' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#94a3b8' }}>Shopify Guides</span>
          <span>/</span>
          <span style={{ color: '#f97316' }}>Customer Service Templates</span>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '100px', padding: '5px 14px', marginBottom: '20px' }}>
          <span style={{ fontSize: '12px', color: '#f97316', fontWeight: 600 }}>FREE TEMPLATE LIBRARY</span>
        </div>

        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-0.02em' }}>
          15 Shopify Customer Service Templates<br />
          <span style={{ background: 'linear-gradient(135deg, #f97316, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            WISMO, Refunds, Damaged Items + More
          </span>
        </h1>

        <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.7, maxWidth: '680px', marginBottom: '32px' }}>
          Copy-paste templates for every customer service scenario Shopify merchants face. Written to resolve tickets fast, protect LTV, and sound like a human — not a helpdesk bot.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          {CATEGORIES.map(cat => (
            <span key={cat} style={{
              background: '#0f1624',
              border: '1px solid #1e293b',
              borderRadius: '100px',
              padding: '5px 14px',
              fontSize: '13px',
              color: '#94a3b8',
            }}>
              {cat}
            </span>
          ))}
        </div>

        <p style={{ fontSize: '13px', color: '#475569', marginBottom: '0' }}>
          11 ready-to-use templates below. For all 15 templates — including 4 additional scenarios — plus AI-powered auto-generation tailored to your store&apos;s voice, see the{' '}
          <Link href="/customer-service" style={{ color: '#f97316', textDecoration: 'none' }}>Customer Service module</Link>.
        </p>
      </div>

      {/* How to Use */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px 48px' }}>
        <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px' }}>
          <p style={{ fontWeight: 700, fontSize: '14px', color: '#f1f5f9', marginBottom: '12px' }}>How to use these templates</p>
          <ul style={{ color: '#94a3b8', margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
            <li>Replace all <code style={{ background: '#1e293b', padding: '1px 6px', borderRadius: '4px', color: '#f97316', fontSize: '13px' }}>[BRACKETED FIELDS]</code> with your order-specific details before sending</li>
            <li>Adjust tone to match your brand — these are starting points, not scripts</li>
            <li>For high-AOV customers (&gt;$200 orders), always personalize beyond the template</li>
            <li>Save variants that work well for your store — response consistency reduces re-opens</li>
          </ul>
        </div>
      </div>

      {/* Templates */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px 100px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {TEMPLATES.map((template, i) => (
            <div key={template.id} style={{
              background: '#0f1624',
              border: '1px solid #1e293b',
              borderRadius: '16px',
              overflow: 'hidden',
            }}>
              {/* Template header */}
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 800, fontSize: '13px', color: '#475569' }}>#{String(i + 1).padStart(2, '0')}</span>
                <span style={{
                  background: 'rgba(249, 115, 22, 0.1)',
                  border: '1px solid rgba(249, 115, 22, 0.25)',
                  color: '#f97316',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '100px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}>
                  {template.category}
                </span>
                <h2 style={{ fontWeight: 700, fontSize: '16px', margin: 0, color: '#f1f5f9', flex: 1 }}>
                  {template.title}
                </h2>
              </div>

              {/* Template body */}
              <div style={{ padding: '24px' }}>
                <pre style={{
                  background: '#080c14',
                  border: '1px solid #1e293b',
                  borderRadius: '10px',
                  padding: '20px',
                  fontSize: '13px',
                  lineHeight: 1.7,
                  color: '#cbd5e1',
                  overflowX: 'auto',
                  whiteSpace: 'pre-wrap',
                  margin: 0,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                }}>
                  {template.template}
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Want the rest CTA */}
        <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '16px', padding: '32px 24px', textAlign: 'center', marginTop: '48px' }}>
          <p style={{ fontWeight: 700, fontSize: '12px', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Remaining 4 templates
          </p>
          <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>
            Exchange Offer, Subscription Cancellation, Chargeback Response, VIP Apology
          </h3>
          <p style={{ color: '#64748b', marginBottom: '0', fontSize: '14px' }}>
            Available in the{' '}
            <Link href="/customer-service" style={{ color: '#f97316', textDecoration: 'none' }}>
              Ops Brain Customer Service module
            </Link>
            {' '}— plus AI-personalized variants tailored to each ticket automatically.
          </p>
        </div>

        {/* Main CTA */}
        <div style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(139,92,246,0.08))', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '16px', padding: '48px 24px', textAlign: 'center', marginTop: '32px' }}>
          <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '12px' }}>
            Stop Copy-Pasting. Let AI Generate the Right Reply in 4 Seconds.
          </h3>
          <p style={{ color: '#94a3b8', marginBottom: '28px', fontSize: '15px', maxWidth: '520px', margin: '0 auto 28px', lineHeight: 1.7 }}>
            Paste any Shopify ticket into Ops Brain and get a ready-to-send reply in under 4 seconds. It handles WISMO, damaged items, refunds, escalations, and more — tailored to your store&apos;s tone. The average merchant saves 3 hours a day.
          </p>
          <Link href="/auth/signup" style={{
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            color: 'white',
            padding: '14px 32px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 700,
            boxShadow: '0 0 40px rgba(249, 115, 22, 0.3)',
            display: 'inline-block',
          }}>
            Try the Customer Service AI Free for 14 Days
          </Link>
          <p style={{ marginTop: '14px', fontSize: '13px', color: '#64748b' }}>No credit card required.</p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1e293b', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #f97316, #8b5cf6)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
              🧠
            </div>
            <span style={{ fontWeight: 700, fontSize: '16px' }}>E-commerce Ops Brain</span>
          </Link>
          <p style={{ color: '#475569', fontSize: '14px', margin: 0 }}>
            © 2026 E-commerce Ops Brain. Built for merchants who mean business.
          </p>
        </div>
      </footer>
    </div>
  )
}
