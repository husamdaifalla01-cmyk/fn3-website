import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shopify Stockout Prevention: How to Never Lose a Sale to Out-of-Stock',
  description: 'Learn how to prevent Shopify stockouts with velocity-based forecasting, days-to-stockout formulas, reorder point calculations, and automated alerts. Stop losing revenue to empty shelves.',
}

export default function ShopifyStockoutPreventionGuide() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Shopify Stockout Prevention: How to Never Lose a Sale to Out-of-Stock',
    description: 'A complete guide to preventing stockouts on Shopify using velocity data, reorder point formulas, and automated inventory alerts.',
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

      {/* Article */}
      <article style={{ maxWidth: '780px', margin: '0 auto', padding: '64px 24px 100px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '32px', fontSize: '13px', color: '#64748b' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#94a3b8' }}>Shopify Guides</span>
          <span>/</span>
          <span style={{ color: '#f97316' }}>Stockout Prevention</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '100px', padding: '5px 14px', marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', color: '#f97316', fontWeight: 600 }}>INVENTORY GUIDE</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-0.02em' }}>
            Shopify Stockout Prevention: How to Never Lose a Sale to Out-of-Stock
          </h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.7 }}>
            Most Shopify merchants don&apos;t run out of stock because they ordered too little. They run out because they ordered based on gut feel instead of velocity data. This guide fixes that.
          </p>
        </div>

        {/* TOC */}
        <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px', marginBottom: '48px' }}>
          <p style={{ fontWeight: 700, fontSize: '14px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>In this guide</p>
          <ol style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px' }}>
            {[
              'Why stockouts keep happening to smart merchants',
              'The gut-feel vs. velocity gap',
              'Days-to-stockout formula',
              'Reorder point calculation',
              'BFCM stockout war stories',
              'How to set up automated alerts',
            ].map((item, i) => (
              <li key={i}><span style={{ color: '#94a3b8' }}>{item}</span></li>
            ))}
          </ol>
        </div>

        {/* Content */}
        <div style={{ lineHeight: 1.8, fontSize: '16px' }}>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            Why Stockouts Keep Happening to Smart Merchants
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            You&apos;re not careless. You check your inventory dashboard. You reorder regularly. And yet, every few months, a top-selling SKU goes to zero and you spend two weeks explaining to angry customers why their order won&apos;t ship for another three weeks.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            The culprit is almost never bad intentions. It&apos;s a data gap. Most merchants look at a raw inventory count — say, 80 units — and interpret that as &quot;we&apos;re fine.&quot; But 80 units means nothing without context. Are you selling 4 units a day or 40? Is demand accelerating because of a TikTok mention? When does your supplier need the next PO to hit your warehouse before a holiday rush?
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            A raw count tells you where you are. Velocity data tells you where you&apos;re going.
          </p>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            The Gut-Feel vs. Velocity Gap
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            The standard reorder workflow at most Shopify stores looks something like this: a merchant logs into the admin, scrolls the product list, sees a low number on something, and places an order. This process has three fatal flaws.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            <strong style={{ color: '#f1f5f9' }}>First, you only see what you remember to check.</strong> Shopify has hundreds of SKUs and dozens of variants. Nobody manually reviews all of them every morning. You spot-check the products you&apos;re worried about, which means you have systematic blind spots everywhere else.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            <strong style={{ color: '#f1f5f9' }}>Second, raw counts don&apos;t account for velocity shifts.</strong> A product you sell 2 units a day normally might sell 20 units a day after a press mention. If your mental model is anchored to last month&apos;s pace, you&apos;re already behind.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            <strong style={{ color: '#f1f5f9' }}>Third, supplier lead time is almost never factored in.</strong> Ordering today doesn&apos;t mean inventory arrives tomorrow. If your supplier takes 21 days to ship and you reorder when you have 5 units left, you will stock out. Every time.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Velocity-based forecasting closes this gap. Instead of asking &quot;how many do we have?&quot;, it asks: &quot;at current sell-through rate, how many days until we hit zero — and does that happen before or after our next shipment arrives?&quot;
          </p>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            Days-to-Stockout Formula
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            The core metric you need for every SKU is <strong style={{ color: '#f1f5f9' }}>days-to-stockout</strong>. It&apos;s calculated as:
          </p>

          <div style={{ background: '#0f1624', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '17px', color: '#f97316', margin: 0, textAlign: 'center' }}>
              Days to Stockout = Current Stock ÷ Average Daily Units Sold
            </p>
          </div>

          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Example: You have 120 units of your best-selling joggers. Over the last 14 days you sold 84 units, which is 6 units per day. 120 ÷ 6 = <strong style={{ color: '#f1f5f9' }}>20 days to stockout</strong>.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Now compare that to your supplier lead time. If your supplier takes 18 days, you need to place that PO today — not next week. You have a 2-day buffer. That&apos;s not comfortable; that&apos;s a crisis waiting to happen.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Use a 14-day rolling window for your velocity calculation, not a 30-day or 90-day average. Short windows catch demand acceleration early. A TikTok video can triple your sell rate overnight; a 90-day average will mask that signal completely until you&apos;re already empty.
          </p>

          <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '12px', padding: '20px 24px', marginBottom: '32px' }}>
            <p style={{ fontWeight: 700, color: '#f87171', marginBottom: '8px' }}>Red flag thresholds to set:</p>
            <ul style={{ color: '#cbd5e1', margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Days to stockout &lt; supplier lead time + 7 days = place order now</li>
              <li>Days to stockout &lt; 14 days on any top-20 SKU = urgent alert</li>
              <li>Sell rate increased &gt;50% week-over-week = investigate and update forecast</li>
            </ul>
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            Reorder Point Calculation
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Days-to-stockout tells you when you&apos;ll run out. <strong style={{ color: '#f1f5f9' }}>Reorder point</strong> tells you the inventory level at which you must place a new order to avoid going to zero. Here&apos;s the formula:
          </p>

          <div style={{ background: '#0f1624', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '15px', color: '#f97316', margin: '0 0 12px', textAlign: 'center' }}>
              Reorder Point = (Average Daily Sales × Lead Time in Days) + Safety Stock
            </p>
            <p style={{ fontFamily: 'monospace', fontSize: '15px', color: '#94a3b8', margin: 0, textAlign: 'center' }}>
              Safety Stock = (Max Daily Sales − Average Daily Sales) × Lead Time
            </p>
          </div>

          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Using our jogger example: average daily sales = 6 units. Supplier lead time = 18 days. Max daily sales in the last 30 days = 12 units.
          </p>
          <ul style={{ color: '#cbd5e1', paddingLeft: '24px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Safety stock = (12 − 6) × 18 = <strong style={{ color: '#f1f5f9' }}>108 units</strong></li>
            <li>Reorder point = (6 × 18) + 108 = 108 + 108 = <strong style={{ color: '#f1f5f9' }}>216 units</strong></li>
          </ul>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            That means the moment your jogger inventory drops to 216 units, you need to trigger a purchase order. If you wait until 120 units — which &quot;feels like a lot&quot; — you&apos;re already in the danger zone.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Most merchants who do this math for the first time are shocked by how high the reorder point is. Safety stock feels wasteful until the one time it saves you from an $80,000 lost-revenue event during a peak season.
          </p>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            BFCM Stockout War Stories
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Black Friday and Cyber Monday are where the stockout math gets brutal. Here are patterns we see every year:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
            {[
              {
                title: 'The "We Had Enough in September" Mistake',
                text: 'A merchant checks inventory in late September and sees 400 units of their hero product. They order 200 more "to be safe." But BFCM velocity is 8× a normal November day. They sell 1,800 units in 4 days and are out of stock on November 27th — the biggest day of the year. The lesson: BFCM forecasting requires a completely different demand multiplier, not just a top-up.',
              },
              {
                title: 'The Split-SKU Blindspot',
                text: 'A DTC apparel brand stocks 3 colorways of their best-selling product. Total inventory looks fine — 900 units across all colors. But Navy sells at 3× the rate of Olive and Cream. By Friday afternoon, Navy is sold out while 600 units of the slow colors sit in the warehouse. Velocity must be tracked at the variant level, not the product level.',
              },
              {
                title: 'The Supplier Communication Failure',
                text: 'A merchant places a BFCM top-up order in mid-October — plenty of time for the 3-week lead time, they think. But their supplier is also serving 200 other merchants preparing for BFCM. The order ships 11 days late. Inventory arrives November 30th. They missed the entire event. During peak seasons, add a 1.5× buffer to your normal lead time.',
              },
            ].map((story, i) => (
              <div key={i} style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px 24px' }}>
                <p style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: '10px' }}>{story.title}</p>
                <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.7, fontSize: '15px' }}>{story.text}</p>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            How to Set Up Automated Stockout Alerts
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Manual inventory reviews don&apos;t scale. Once you have more than 50 SKUs, the only reliable approach is automated monitoring that calculates days-to-stockout continuously and alerts you when any SKU crosses a threshold.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Here&apos;s what an effective alert setup needs:
          </p>

          <ol style={{ color: '#cbd5e1', paddingLeft: '24px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><strong style={{ color: '#f1f5f9' }}>Per-SKU velocity tracking</strong> — daily sell-through rate recalculated on a rolling 14-day window, updated automatically from Shopify order data</li>
            <li><strong style={{ color: '#f1f5f9' }}>Lead time database</strong> — each supplier&apos;s average and maximum lead time stored so reorder point calculations are accurate</li>
            <li><strong style={{ color: '#f1f5f9' }}>Threshold alerts</strong> — email or Slack notification the moment any SKU&apos;s projected stockout date is within your safety window</li>
            <li><strong style={{ color: '#f1f5f9' }}>One-click PO drafting</strong> — when an alert fires, you should be able to approve a supplier email in seconds, not spend 20 minutes building a purchase order from scratch</li>
            <li><strong style={{ color: '#f1f5f9' }}>Seasonal adjustment</strong> — BFCM and Q4 demand multipliers should be built in so the system knows not to use August velocity to forecast November risk</li>
          </ol>

          <p style={{ color: '#cbd5e1', marginBottom: '40px' }}>
            The manual version of this is a spreadsheet that takes 2–3 hours to update weekly and is always slightly out of date. The automated version runs continuously and flags risks the moment they emerge.
          </p>

          {/* CTA */}
          <div style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(139,92,246,0.08))', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>
              See Your Days-to-Stockout for Every SKU in 2 Minutes
            </h3>
            <p style={{ color: '#94a3b8', marginBottom: '28px', fontSize: '15px', maxWidth: '480px', margin: '0 auto 28px' }}>
              E-commerce Ops Brain connects to your Shopify store and calculates days-to-stockout, reorder points, and BFCM risk across every SKU automatically. The first stockout alert typically pays for 6+ months of the subscription.
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
              Start Free Trial — See Your Inventory Risk Now
            </Link>
            <p style={{ marginTop: '14px', fontSize: '13px', color: '#64748b' }}>14-day free trial. No credit card required.</p>
          </div>
        </div>
      </article>

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
