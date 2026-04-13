import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '10 Shopify Inventory Management Tips That Prevent Lost Revenue',
  description: 'Practical Shopify inventory management tips including safety stock formulas, ABC analysis, seasonal adjustment, multi-location tracking, and dead stock strategy. Stop losing revenue to poor inventory decisions.',
}

export default function ShopifyInventoryManagementTips() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '10 Shopify Inventory Management Tips That Prevent Lost Revenue',
    description: 'A practical guide to Shopify inventory best practices: safety stock formulas, ABC analysis, seasonal adjustments, supplier lead time tracking, and dead stock recovery.',
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
          <Link href="/guides" style={{ color: '#64748b', textDecoration: 'none' }}>Guides</Link>
          <span>/</span>
          <span style={{ color: '#f97316' }}>Inventory Management Tips</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '100px', padding: '5px 14px', marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', color: '#f97316', fontWeight: 600 }}>INVENTORY GUIDE</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-0.02em' }}>
            10 Shopify Inventory Management Tips That Prevent Lost Revenue
          </h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.7 }}>
            Poor inventory management doesn&apos;t just cause stockouts — it ties up cash in dead stock, creates supplier chaos, and destroys customer trust. These ten tips address every major failure point, with formulas you can implement today.
          </p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px', fontSize: '13px', color: '#475569' }}>
            <span>12 min read</span>
            <span>·</span>
            <span>Updated March 2026</span>
          </div>
        </div>

        {/* TOC */}
        <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px', marginBottom: '48px' }}>
          <p style={{ fontWeight: 700, fontSize: '14px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>In this guide</p>
          <ol style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px' }}>
            {[
              'Calculate safety stock with a real formula',
              'Run ABC analysis on your catalog (Hero / Steady / Dead)',
              'Apply seasonal demand multipliers',
              'Track supplier lead time, not just delivery date',
              'Manage multi-location inventory without spreadsheets',
              'Set reorder points at the variant level',
              'Flag velocity shifts before they become stockouts',
              'Build a dead stock liquidation strategy',
              'Time your BFCM inventory buys correctly',
              'Automate your daily inventory brief',
            ].map((item, i) => (
              <li key={i}><span style={{ color: '#94a3b8' }}>{i + 1}. {item}</span></li>
            ))}
          </ol>
        </div>

        {/* Content */}
        <div style={{ lineHeight: 1.8, fontSize: '16px' }}>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            1. Calculate Safety Stock with a Real Formula
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Safety stock is the buffer inventory you hold to absorb demand spikes and supplier delays. Most merchants either hold too little (and stock out) or too much (and tie up cash unnecessarily). The right amount is calculated, not guessed.
          </p>

          <div style={{ background: '#0f1624', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '15px', color: '#f97316', margin: '0 0 12px', textAlign: 'center' }}>
              Safety Stock = (Max Daily Sales − Avg Daily Sales) × Max Lead Time
            </p>
            <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#64748b', margin: 0, textAlign: 'center' }}>
              Example: (18 − 6) × 21 days = 252 units of safety stock
            </p>
          </div>

          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            In this example, your average daily sales are 6 units, but on a strong day you sell 18. Your supplier&apos;s slowest delivery was 21 days. Your safety stock needs to cover both variables simultaneously — the worst-case demand during the worst-case lead time.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Recalculate safety stock quarterly. If your velocity has grown 40% in the last 90 days, last quarter&apos;s safety stock number is dangerously low.
          </p>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            2. Run ABC Analysis on Your Catalog
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Not all SKUs deserve the same inventory attention. ABC analysis — or what we call the Hero / Steady / Dead framework — divides your catalog into three tiers based on revenue contribution:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            {[
              {
                label: 'Hero SKUs (A)',
                color: '#f97316',
                bg: 'rgba(249, 115, 22, 0.08)',
                border: 'rgba(249, 115, 22, 0.25)',
                text: 'Top 10–20% of SKUs driving 70–80% of revenue. These get full safety stock calculation, weekly velocity reviews, and direct supplier relationships. A stockout on a Hero SKU is an emergency.',
              },
              {
                label: 'Steady SKUs (B)',
                color: '#8b5cf6',
                bg: 'rgba(139, 92, 246, 0.08)',
                border: 'rgba(139, 92, 246, 0.25)',
                text: 'Middle 30–40% of SKUs driving 15–25% of revenue. These get monthly velocity reviews and moderate safety stock. Automated reorder triggers handle most of the management.',
              },
              {
                label: 'Dead SKUs (C)',
                color: '#64748b',
                bg: 'rgba(100, 116, 139, 0.08)',
                border: 'rgba(100, 116, 139, 0.25)',
                text: 'Bottom 40–50% of SKUs driving under 5% of revenue. Do not reorder automatically. Evaluate quarterly — these either get discontinued, bundled with heroes, or liquidated. They are silently eating your working capital.',
              },
            ].map((tier, i) => (
              <div key={i} style={{ background: tier.bg, border: `1px solid ${tier.border}`, borderRadius: '12px', padding: '20px 24px' }}>
                <p style={{ fontWeight: 700, color: tier.color, marginBottom: '8px', fontSize: '15px' }}>{tier.label}</p>
                <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.7, fontSize: '15px' }}>{tier.text}</p>
              </div>
            ))}
          </div>

          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            The classification should drive your purchasing decisions. A well-managed catalog puts 80% of its inventory budget into A-tier products and less than 5% into C-tier reorders.
          </p>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            3. Apply Seasonal Demand Multipliers
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Inventory forecasting that uses flat historical averages will fail you every season. A swimwear brand forecasting August inventory based on January data will over-buy; a candle brand doing the reverse will stock out before December.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Seasonal adjustment works by applying a multiplier to your base velocity for each calendar period. Build these from at least two years of Shopify order data so you can distinguish genuine seasonal patterns from one-off events.
          </p>

          <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <p style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: '12px', fontSize: '14px' }}>Example seasonal multipliers for a DTC apparel brand:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '13px' }}>
              {[
                { period: 'Jan–Feb', mult: '0.7×', note: 'Post-holiday slowdown' },
                { period: 'Mar–Apr', mult: '1.0×', note: 'Baseline' },
                { period: 'May–Jun', mult: '1.3×', note: 'Spring/summer ramp' },
                { period: 'Jul–Aug', mult: '1.5×', note: 'Peak summer' },
                { period: 'Sep–Oct', mult: '1.2×', note: 'Back to school, fall' },
                { period: 'Nov–Dec', mult: '3.5×', note: 'BFCM + holiday' },
              ].map((row, i) => (
                <div key={i} style={{ background: '#0a0f1a', borderRadius: '8px', padding: '10px 12px' }}>
                  <div style={{ color: '#f1f5f9', fontWeight: 600 }}>{row.period}</div>
                  <div style={{ color: '#f97316', fontWeight: 700, fontSize: '15px' }}>{row.mult}</div>
                  <div style={{ color: '#475569', fontSize: '12px' }}>{row.note}</div>
                </div>
              ))}
            </div>
          </div>

          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Apply these multipliers to your safety stock calculation and your reorder quantities — not just to your forecast. Safety stock in November should be 3× your August safety stock.
          </p>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            4. Track Supplier Lead Time, Not Just Delivery Date
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Most merchants track when an order arrives. Fewer track how long it actually took from PO to delivery — and almost none track how that number varies by season, order size, or product category.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            You need three lead time numbers for each supplier: average, maximum, and peak-season maximum. Your reorder point calculations should use the worst-case scenario (maximum), not the average. Using average lead time means you&apos;ll stock out roughly half the time.
          </p>

          <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '12px', padding: '20px 24px', marginBottom: '32px' }}>
            <p style={{ fontWeight: 700, color: '#f87171', marginBottom: '8px' }}>What to log for every PO:</p>
            <ul style={{ color: '#cbd5e1', margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Date PO was sent to supplier</li>
              <li>Date supplier confirmed the order</li>
              <li>Date inventory shipped from supplier</li>
              <li>Date inventory arrived at your warehouse or 3PL</li>
              <li>Any delays and stated reason (production, shipping, customs)</li>
            </ul>
          </div>

          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            After 8–10 POs, you&apos;ll have a lead time distribution that&apos;s far more useful than any supplier&apos;s quoted timeline. Suppliers systematically underestimate lead time — your own data is the only reliable source.
          </p>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            5. Manage Multi-Location Inventory Without Spreadsheets
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            If you fulfill from multiple warehouses, 3PLs, or a combination of owned and third-party locations, your inventory management complexity multiplies. The core challenge: a SKU might have 400 units across all locations but only 12 at the location closest to your highest-demand region.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Shopify&apos;s multi-location inventory tracks stock by location natively, but it doesn&apos;t tell you whether distribution across locations is optimal. You need a rule set that defines:
          </p>
          <ul style={{ color: '#cbd5e1', paddingLeft: '24px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><strong style={{ color: '#f1f5f9' }}>Primary fulfillment location per region</strong> — which warehouse ships to which zip code ranges by default</li>
            <li><strong style={{ color: '#f1f5f9' }}>Transfer trigger thresholds</strong> — when location A drops below X units and location B has surplus, initiate a transfer</li>
            <li><strong style={{ color: '#f1f5f9' }}>Emergency split-ship policy</strong> — when a customer&apos;s order can&apos;t be fulfilled from one location, the cost threshold at which you split the shipment vs. consolidate</li>
          </ul>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            The merchants who get this right treat their total network inventory as a single pool with intelligent routing — not as separate silos that each need their own management.
          </p>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            6. Set Reorder Points at the Variant Level
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Reorder points set at the product level are dangerously misleading. A t-shirt with 300 units in inventory sounds healthy — until you realize 200 are size XXL and you have 8 units of Medium, your fastest-selling size.
          </p>

          <div style={{ background: '#0f1624', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '15px', color: '#f97316', margin: '0 0 12px', textAlign: 'center' }}>
              Reorder Point = (Avg Daily Sales × Lead Time) + Safety Stock
            </p>
            <p style={{ color: '#64748b', fontSize: '13px', margin: 0, textAlign: 'center' }}>
              Calculate this independently for each size/color/variant combination
            </p>
          </div>

          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            For a catalog with 50 products and 4 variants each, that&apos;s 200 separate reorder points to maintain. This is impossible to manage manually — it requires automated calculation that pulls from Shopify variant-level sales data and recalculates continuously.
          </p>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            7. Flag Velocity Shifts Before They Become Stockouts
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            A TikTok mention, a press feature, or a competitor going out of stock can triple your sell rate on a SKU overnight. If your reorder point is based on last month&apos;s velocity and current velocity is 3× higher, you&apos;re already in trouble before any alert fires.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            The fix is a velocity shift alert that fires when a SKU&apos;s 7-day sell rate deviates significantly from its 30-day baseline. A 50% or greater week-over-week acceleration should trigger an immediate review — not just a note to check on it later.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            When a velocity shift fires, you need two pieces of information immediately: the new projected days-to-stockout at the current burn rate, and whether you have time to place an emergency PO before going to zero.
          </p>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            8. Build a Dead Stock Liquidation Strategy
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Dead stock — inventory that hasn&apos;t moved in 90+ days — isn&apos;t just a storage cost. It&apos;s working capital that could be funding your next Hero SKU reorder. Most merchants ignore dead stock until it becomes a write-off.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            A proactive dead stock strategy has three stages:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            {[
              { stage: '60–90 days no movement', action: 'Bundle with a Hero SKU as a gift-with-purchase or add-on. No margin sacrifice required — you are moving inventory while adding perceived value.' },
              { stage: '90–120 days no movement', action: 'Flash sale to your email list at 20–30% off. Segment to customers who bought the product category before. Lower the price enough to clear, not just to create noise.' },
              { stage: '120+ days no movement', action: 'Wholesale liquidation, donate for tax write-off, or destroy if storage cost exceeds recovery value. Sunk cost thinking keeps dead inventory alive too long.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', background: '#0f1624', borderRadius: '12px', padding: '16px 20px', border: '1px solid #1e293b' }}>
                <div style={{ flexShrink: 0, width: '28px', height: '28px', background: 'rgba(249, 115, 22, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316', fontWeight: 700, fontSize: '13px' }}>{i + 1}</div>
                <div>
                  <p style={{ fontWeight: 600, color: '#f97316', marginBottom: '6px', fontSize: '14px' }}>{item.stage}</p>
                  <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px', lineHeight: 1.6 }}>{item.action}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            9. Time Your BFCM Inventory Buys Correctly
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Black Friday / Cyber Monday is the single most common cause of inventory disasters for Shopify merchants. The compounding factors: demand is 3–8× normal, suppliers are overwhelmed, and shipping networks are congested. Every part of your supply chain is stressed simultaneously.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            The BFCM inventory timeline that works:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '32px' }}>
            {[
              { date: 'August 1', action: 'Finalize BFCM demand forecast. Use prior year BFCM data, not September/October baseline.' },
              { date: 'August 15', action: 'Place Hero SKU purchase orders. Apply 1.5× buffer to your standard lead time.' },
              { date: 'September 1', action: 'Confirm supplier order acknowledgments. If a supplier is behind, escalate immediately — you have time to find alternatives.' },
              { date: 'October 1', action: 'Inventory should be received. If anything is delayed, you still have time to air freight.' },
              { date: 'October 15', action: 'Final top-up orders for any SKUs that have sold faster than forecast since August.' },
              { date: 'November 1', action: 'Inventory freeze. No new orders can arrive in time. Sell what you have.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0', borderLeft: '2px solid rgba(249, 115, 22, 0.3)' }}>
                <div style={{ width: '110px', flexShrink: 0, padding: '12px 16px 12px 0', paddingLeft: '0', marginLeft: '-1px', borderLeft: '2px solid #f97316', paddingRight: '20px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#f97316' }}>{item.date}</span>
                </div>
                <div style={{ padding: '12px 0 12px 20px' }}>
                  <p style={{ color: '#cbd5e1', margin: 0, fontSize: '14px', lineHeight: 1.6 }}>{item.action}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            10. Automate Your Daily Inventory Brief
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Manual inventory reviews don&apos;t scale past 50 SKUs. The merchants who stay on top of their inventory consistently are the ones who receive a structured daily brief that surfaces only what needs attention — not a spreadsheet dump that requires 45 minutes to interpret.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            An effective daily inventory brief should include, in priority order:
          </p>
          <ol style={{ color: '#cbd5e1', paddingLeft: '24px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><strong style={{ color: '#f1f5f9' }}>Critical stockout alerts</strong> — any SKU with fewer than 14 days of inventory at current velocity</li>
            <li><strong style={{ color: '#f1f5f9' }}>Velocity anomalies</strong> — SKUs where 7-day sell rate is 50%+ above or below the 30-day baseline</li>
            <li><strong style={{ color: '#f1f5f9' }}>Pending PO status</strong> — outstanding purchase orders and their projected arrival dates vs. current inventory runway</li>
            <li><strong style={{ color: '#f1f5f9' }}>Dead stock list</strong> — SKUs with zero movement in the last 30 days, sorted by inventory value</li>
          </ol>
          <p style={{ color: '#cbd5e1', marginBottom: '40px' }}>
            When this brief lands in your inbox every morning, you spend 10 minutes on inventory management instead of 2 hours. And you catch problems days before they cost you revenue — not after a customer emails to ask why their order was cancelled.
          </p>

          {/* CTA */}
          <div style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(139,92,246,0.08))', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>
              Get Your Daily Inventory Brief Automated
            </h3>
            <p style={{ color: '#94a3b8', marginBottom: '28px', fontSize: '15px', maxWidth: '480px', margin: '0 auto 28px' }}>
              E-commerce Ops Brain monitors every SKU across your Shopify store — calculating safety stock, flagging velocity shifts, and drafting POs when reorder points are crossed. No spreadsheets. No manual checks.
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
              Start Free Trial — Automate Your Inventory
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
