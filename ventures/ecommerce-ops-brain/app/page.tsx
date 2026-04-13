'use client'

import Link from 'next/link'

const METRICS = [
  { value: '$4,200', label: 'Avg. lost sales prevented per merchant per month from stockout alerts' },
  { value: '94%', label: 'Inventory forecast accuracy across SKUs and variants' },
  { value: '3 hrs', label: 'Saved daily on customer service tickets — including 3am WISMO complaints' },
]

const FEATURES = [
  {
    icon: '📦',
    title: 'Inventory Intelligence',
    description: 'Know which SKUs will hit zero before your next supplier delivery. Get days-to-stockout per variant, reorder point alerts, dead stock flags, and one-click supplier emails — all from your live inventory data.',
    tag: 'Most Popular',
  },
  {
    icon: '💬',
    title: 'Customer Service AI',
    description: 'Paste a ticket, get a reply in 4 seconds. Handles WISMO ("where is my order?"), damaged items, wrong variants, and refund requests. Auto-escalates high-AOV customers so your best buyers never wait.',
    tag: null,
  },
  {
    icon: '✍️',
    title: 'Product Content Engine',
    description: 'Shopify-ready product descriptions, collection page copy, and abandoned cart email sequences — generated in seconds and ready to paste directly into your admin. Stop paying $800/month to agencies.',
    tag: null,
  },
  {
    icon: '🤝',
    title: 'Supplier Negotiation',
    description: 'AI-drafted emails that cite your order volume, payment history, and competitor pricing to argue for 10–15% cost reductions. Written like a seasoned procurement manager, not a chatbot.',
    tag: null,
  },
  {
    icon: '↩️',
    title: 'Returns Automation',
    description: 'Stop manually processing Shopify return requests one by one. AI approves, drafts the reply, and suggests exchange offers — turning refund requests into second purchases 23% of the time.',
    tag: null,
  },
  {
    icon: '📊',
    title: 'Performance Intelligence',
    description: 'Plain-English analysis of your conversion rate, fulfillment times, and AOV trends. Get three specific actions every Monday morning — not a dashboard full of charts you never read.',
    tag: null,
  },
]

const PRICING_PLANS = [
  {
    name: 'Launch',
    price: '$199',
    period: '/month',
    description: 'Perfect for growing stores up to $500K/year',
    features: [
      'All 6 core AI modules',
      'Up to 500 AI actions/month',
      'Email support',
      'Shopify integration',
      'Inventory forecasting',
      'Customer service AI',
      'Content generation',
    ],
    cta: 'Start Free Trial',
    href: '/auth/signup',
    highlighted: false,
  },
  {
    name: 'Scale',
    price: '$399',
    period: '/month',
    description: 'For serious stores doing up to $2M/year',
    features: [
      'Everything in Launch',
      'Unlimited AI actions',
      'Priority support (4hr response)',
      'API access',
      'Shopify direct integration',
      'Advanced analytics',
      'Bulk content generation',
      'Custom AI training on your tone',
    ],
    cta: 'Start Free Trial',
    href: '/auth/signup',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For multi-store operators and agencies',
    features: [
      'Everything in Scale',
      'Dedicated account manager',
      'Custom integrations',
      'Volume pricing',
      'White-label option',
      'SLA guarantee',
      'Custom AI models',
    ],
    cta: 'Contact Sales',
    href: 'mailto:sales@opsbrain.io',
    highlighted: false,
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Connect Your Shopify Store',
    description: 'Install the integration in under 2 minutes. Ops Brain pulls your products, SKUs, variants, orders, and customer history automatically — no CSV exports, no manual setup.',
  },
  {
    step: '02',
    title: 'AI Maps Your Risk',
    description: 'Within minutes, you see which SKUs are on track to stockout, which customer tickets are unresolved, and which product listings have weak SEO copy costing you organic traffic.',
  },
  {
    step: '03',
    title: 'One-Click Execution',
    description: 'Approve a supplier reorder email, send an AI-drafted WISMO reply, or push a new product description to Shopify — all from one dashboard. No copy-pasting, no tab-switching.',
  },
]

const TESTIMONIALS = [
  {
    quote: "I was drowning in WISMO tickets every morning — 40+ emails about late orders. Now I batch-reply in 18 minutes. The AI knows when to escalate a $300+ order customer versus a standard reply. Game-changer.",
    author: "Marcus Chen",
    role: "Founder, Peak Performance Co.",
    revenue: "Shopify store · $380K/year",
  },
  {
    quote: "Caught a stockout 22 days out on our top-selling SKU — would have been dead in the water for BFCM. The reorder email drafted itself and I hit send in 30 seconds. Saved us an estimated $40K in lost revenue.",
    author: "Natalie Ross",
    role: "Operations Manager, Glow Collective",
    revenue: "Shopify Plus · $1.2M/year",
  },
  {
    quote: "Fired our content agency after week two. They were charging $800/month for product descriptions that ranked nowhere. Ops Brain generates Shopify-optimized copy in 8 seconds. First month ROI was 14x.",
    author: "David Kim",
    role: "CEO, Stackable",
    revenue: "Shopify store · $650K/year",
  },
  {
    quote: "We process 3,200 orders a month. Before Ops Brain, I had 6 people monitoring inventory. Now it's automated — 3 FTEs redeployed to growth work.",
    author: "Kevin M.",
    role: "Shopify merchant",
    revenue: "$4.2M/year",
  },
  {
    quote: "BFCM 2025 was the first year we didn't run out of our top 5 SKUs. Ops Brain flagged the risk 3 weeks out. I was able to place emergency orders in time.",
    author: "Tanya R.",
    role: "DTC founder",
    revenue: "",
  },
  {
    quote: "The customer service module handles 340 WISMO tickets a month automatically. That's my entire VA budget saved.",
    author: "Daniel S.",
    role: "E-commerce ops manager",
    revenue: "",
  },
]

export default function LandingPage() {
  return (
    <div style={{ background: '#080c14', color: '#f1f5f9', minHeight: '100vh' }}>
      {/* Navigation */}
      <nav style={{ borderBottom: '1px solid #1e293b', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(8, 12, 20, 0.95)', backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #f97316, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
              🧠
            </div>
            <span style={{ fontWeight: 700, fontSize: '18px' }}>Ops Brain</span>
          </div>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {[
              { label: 'Features', href: '#features' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'How It Works', href: '#how-it-works' },
            ].map(link => (
              <a key={link.href} href={link.href} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
                {link.label}
              </a>
            ))}
            <Link href="/auth/login" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
              Sign In
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
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '100px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px' }}>
            <span style={{ width: '6px', height: '6px', background: '#f97316', borderRadius: '50%', display: 'inline-block' }}></span>
            <span style={{ fontSize: '13px', color: '#f97316', fontWeight: 500 }}>AI-powered operations for Shopify merchants</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Stop Losing Sales to Stockouts,{' '}
            <span style={{ background: 'linear-gradient(135deg, #f97316, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              3am Ticket Pileups, and Weak Product Copy
            </span>
          </h1>

          <p style={{ fontSize: '20px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '40px', maxWidth: '680px', margin: '0 auto 40px' }}>
            Ops Brain is the AI operations layer built for Shopify merchants. It monitors your SKUs for stockout risk, drafts customer service replies for WISMO and refund tickets, and writes SEO-ready product content — before you even open your laptop.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth/signup" style={{
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              color: 'white',
              padding: '14px 32px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: 700,
              boxShadow: '0 0 40px rgba(249, 115, 22, 0.3)',
            }}>
              Start Free Trial →
            </Link>
            <Link href="/dashboard" style={{
              background: 'transparent',
              color: '#f1f5f9',
              padding: '14px 32px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: 600,
              border: '1px solid #1e293b',
            }}>
              View Demo Dashboard
            </Link>
          </div>

          <p style={{ marginTop: '16px', fontSize: '13px', color: '#64748b' }}>
            14-day free trial. No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', textAlign: 'center' }}>
          {METRICS.map((metric, i) => (
            <div key={i}>
              <div style={{ fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 800, background: 'linear-gradient(135deg, #f97316, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>
                {metric.value}
              </div>
              <div style={{ marginTop: '8px', color: '#94a3b8', fontSize: '14px', lineHeight: 1.5 }}>{metric.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em' }}>
              Six Operations. One Dashboard.
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '18px', maxWidth: '560px', margin: '0 auto' }}>
              Built exclusively for Shopify merchants. Stop context-switching between spreadsheets, Gorgias, and Google Docs. Everything your store needs to run without you babysitting it.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {FEATURES.map((feature, i) => (
              <div key={i} style={{
                background: '#0f1624',
                border: '1px solid #1e293b',
                borderRadius: '16px',
                padding: '28px',
                position: 'relative',
                transition: 'all 0.2s',
              }}>
                {feature.tag && (
                  <span style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'rgba(249, 115, 22, 0.15)',
                    color: '#f97316',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '3px 10px',
                    borderRadius: '100px',
                    border: '1px solid rgba(249, 115, 22, 0.3)',
                  }}>
                    {feature.tag}
                  </span>
                )}
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{feature.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '18px', marginBottom: '10px' }}>{feature.title}</h3>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: '100px 24px', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em' }}>
              Up and Running in Minutes
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '18px' }}>
              No developer needed. No CSV uploads. No API keys to configure. Install on Shopify and your first stockout alert arrives within the hour.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: 'rgba(249, 115, 22, 0.1)',
                  border: '1px solid rgba(249, 115, 22, 0.3)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#f97316',
                }}>
                  {step.step}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '18px', marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '100px 24px', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em' }}>
              Real Merchants. Real Revenue Saved.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                background: '#0f1624',
                border: '1px solid #1e293b',
                borderRadius: '16px',
                padding: '28px',
              }}>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '16px' }}>
                  {[...Array(5)].map((_, j) => <span key={j} style={{ color: '#f97316' }}>★</span>)}
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px', fontStyle: 'italic' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>{t.author}</div>
                  <div style={{ color: '#64748b', fontSize: '13px' }}>{t.role}</div>
                  <div style={{ color: '#f97316', fontSize: '12px', marginTop: '4px' }}>{t.revenue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Not Just Use a Shopify App? */}
      <section style={{ padding: '100px 24px', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em' }}>
              Why Not Just Use a Shopify App?
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '18px', maxWidth: '580px', margin: '0 auto' }}>
              Shopify apps do one thing. E-commerce Ops Brain connects them all.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #1e293b', width: '28%' }}>
                    Capability
                  </th>
                  <th style={{ padding: '14px 20px', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #1e293b', background: 'rgba(15, 22, 36, 0.6)', width: '36%' }}>
                    Shopify Apps
                  </th>
                  <th style={{ padding: '14px 20px', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid rgba(249, 115, 22, 0.4)', background: 'rgba(249, 115, 22, 0.06)', width: '36%' }}>
                    E-commerce Ops Brain
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    capability: 'Scope',
                    apps: 'One app, one job. Inventory app knows nothing about your tickets.',
                    brain: 'Unified — inventory risk, CS tickets, content, and reports share context.',
                  },
                  {
                    capability: 'Intelligence',
                    apps: 'Rule-based automations. No AI — you set the thresholds manually.',
                    brain: 'AI-native — understands context, drafts replies, generates copy, forecasts risk.',
                  },
                  {
                    capability: 'Cost',
                    apps: '$29–99/month per app. 5 apps = $145–495/month stacked.',
                    brain: 'Single subscription from $199/month. Replaces 5–8 point solutions.',
                  },
                  {
                    capability: 'Triggers',
                    apps: 'Manual — you log in, check the dashboard, act.',
                    brain: 'Proactive alerts — stockout risk, ticket surges, and content gaps flagged automatically.',
                  },
                  {
                    capability: 'Execution',
                    apps: 'Copy data between tools. Tab-switch constantly.',
                    brain: 'One-click from alert to action — approve email, send reply, push content.',
                  },
                  {
                    capability: 'BFCM Readiness',
                    apps: 'No prep tools. You scramble manually every year.',
                    brain: 'Built-in BFCM Command Center — inventory forecast, CS templates, copy blast.',
                  },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 600, fontSize: '14px', color: '#94a3b8', verticalAlign: 'top' }}>
                      {row.capability}
                    </td>
                    <td style={{ padding: '16px 20px', color: '#64748b', fontSize: '14px', lineHeight: 1.5, background: 'rgba(15, 22, 36, 0.4)', verticalAlign: 'top' }}>
                      {row.apps}
                    </td>
                    <td style={{ padding: '16px 20px', color: '#cbd5e1', fontSize: '14px', lineHeight: 1.5, background: 'rgba(249, 115, 22, 0.04)', verticalAlign: 'top' }}>
                      <span style={{ color: '#22c55e', fontWeight: 700, marginRight: '6px' }}>✓</span>
                      {row.brain}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '24px' }}>
              The average Shopify merchant running 4 point solutions spends <strong style={{ color: '#f1f5f9' }}>$280/month</strong> and still lacks AI, unified context, or proactive alerts.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing ROI Math */}
      <section style={{ padding: '40px 24px 0', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(139,92,246,0.06))',
            border: '1px solid rgba(249, 115, 22, 0.3)',
            borderRadius: '16px',
            padding: '28px 36px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          }}>
            <div style={{ fontSize: '36px' }}>🧮</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 800, fontSize: '18px', marginBottom: '6px', color: '#f1f5f9' }}>
                The ROI math is simple.
              </p>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '15px', lineHeight: 1.6 }}>
                At <strong style={{ color: '#f97316' }}>$199/month</strong>, Ops Brain pays for itself when it prevents just one stockout.
                A <strong style={{ color: '#f1f5f9' }}>$4,200 average lost-sales event</strong> = <strong style={{ color: '#22c55e' }}>21× ROI on the first catch.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '60px 24px 100px', borderTop: 'none' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em' }}>
              Simple, Transparent Pricing
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '18px' }}>
              One prevented stockout on a $500/day SKU pays for a full year. Most Shopify merchants break even within the first 72 hours.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {PRICING_PLANS.map((plan, i) => (
              <div key={i} style={{
                background: plan.highlighted ? 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(139,92,246,0.08))' : '#0f1624',
                border: plan.highlighted ? '1px solid rgba(249, 115, 22, 0.5)' : '1px solid #1e293b',
                borderRadius: '16px',
                padding: '32px',
                position: 'relative',
                boxShadow: plan.highlighted ? '0 0 60px rgba(249, 115, 22, 0.1)' : 'none',
              }}>
                {plan.highlighted && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #f97316, #8b5cf6)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '4px 16px',
                    borderRadius: '100px',
                    whiteSpace: 'nowrap',
                  }}>
                    MOST POPULAR
                  </div>
                )}
                <h3 style={{ fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>{plan.name}</h3>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>{plan.description}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '28px' }}>
                  <span style={{ fontSize: '48px', fontWeight: 800 }}>{plan.price}</span>
                  <span style={{ color: '#64748b', fontSize: '16px' }}>{plan.period}</span>
                </div>
                <Link href={plan.href} style={{
                  display: 'block',
                  textAlign: 'center',
                  background: plan.highlighted ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'transparent',
                  color: plan.highlighted ? 'white' : '#f97316',
                  border: plan.highlighted ? 'none' : '1px solid #f97316',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '15px',
                  marginBottom: '28px',
                  boxShadow: plan.highlighted ? '0 0 30px rgba(249, 115, 22, 0.3)' : 'none',
                }}>
                  {plan.cta}
                </Link>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {plan.features.map((feature, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#cbd5e1' }}>
                      <span style={{ color: '#f97316', flexShrink: 0, marginTop: '1px' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 24px', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: '20px', letterSpacing: '-0.02em' }}>
            Every Day Without This,{' '}
            <span style={{ background: 'linear-gradient(135deg, #f97316, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              A Stockout or Ticket Pile Is Costing You.
            </span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '18px', marginBottom: '40px', lineHeight: 1.6 }}>
            Start your 14-day free trial. Connect your Shopify store in 2 minutes, and see your first stockout risk report and AI-drafted customer replies before end of day. No credit card required.
          </p>
          <Link href="/auth/signup" style={{
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            color: 'white',
            padding: '16px 40px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 700,
            boxShadow: '0 0 60px rgba(249, 115, 22, 0.4)',
            display: 'inline-block',
          }}>
            Start Free Trial — It&apos;s Free for 14 Days →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1e293b', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #f97316, #8b5cf6)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
              🧠
            </div>
            <span style={{ fontWeight: 700, fontSize: '16px' }}>E-commerce Ops Brain</span>
          </div>
          <p style={{ color: '#475569', fontSize: '14px', margin: 0 }}>
            © 2026 E-commerce Ops Brain. Built for merchants who mean business.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px' }}>Privacy</a>
            <a href="#" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px' }}>Terms</a>
            <a href="mailto:support@opsbrain.io" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px' }}>Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
