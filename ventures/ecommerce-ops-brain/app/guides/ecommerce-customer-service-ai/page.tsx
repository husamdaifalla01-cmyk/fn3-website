import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Customer Service for E-commerce: How to Automate 74% of Tickets',
  description: 'Learn how to automate WISMO, refund, and product question tickets with AI. Covers Gorgias and Zendesk integrations, Claude system prompts, resolution rate benchmarks, and human escalation rules.',
}

export default function EcommerceCustomerServiceAI() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AI Customer Service for E-commerce: How to Automate 74% of Tickets',
    description: 'A complete guide to automating Shopify customer service with AI — including which ticket types to automate, system prompt patterns, tool stack, and cost comparison.',
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
          <span style={{ color: '#f97316' }}>AI Customer Service</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '100px', padding: '5px 14px', marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: 600 }}>CUSTOMER SERVICE GUIDE</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-0.02em' }}>
            AI Customer Service for E-commerce: How to Automate 74% of Tickets
          </h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.7 }}>
            Most Shopify merchants are paying humans to answer the same six questions, over and over, every day. AI can handle the majority of these tickets completely — with better response times, consistent brand voice, and zero additional headcount.
          </p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px', fontSize: '13px', color: '#475569' }}>
            <span>11 min read</span>
            <span>·</span>
            <span>Updated March 2026</span>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px', marginBottom: '48px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', textAlign: 'center' }}>
          {[
            { stat: '74%', label: 'of tickets automatable' },
            { stat: '< 90s', label: 'AI response time' },
            { stat: '60%', label: 'cost reduction vs. human agents' },
          ].map((item, i) => (
            <div key={i}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#f97316', marginBottom: '4px' }}>{item.stat}</div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* TOC */}
        <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px', marginBottom: '48px' }}>
          <p style={{ fontWeight: 700, fontSize: '14px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>In this guide</p>
          <ol style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px' }}>
            {[
              'The 74% rule: which tickets AI handles best',
              'Ticket types that still require humans',
              'Resolution rate benchmarks by ticket type',
              'The system prompt pattern that works',
              'Tool stack: Gorgias vs. Zendesk + Claude',
              'Cost comparison: AI vs. human agents',
              'Implementation checklist',
            ].map((item, i) => (
              <li key={i}><span style={{ color: '#94a3b8' }}>{item}</span></li>
            ))}
          </ol>
        </div>

        {/* Content */}
        <div style={{ lineHeight: 1.8, fontSize: '16px' }}>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            The 74% Rule: Which Tickets AI Handles Best
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            The exact percentage varies by store, but data from merchants using AI-powered customer service consistently shows that 70–80% of inbound tickets fall into categories where AI outperforms human agents: faster, more consistent, available 24/7, and never having a bad day.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            These automatable ticket types share a common characteristic: the correct response can be determined by looking up structured data (order status, return policy, product specs) and applying a clear rule set. There&apos;s no ambiguity, no judgment call, no relationship to manage.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            {[
              {
                type: 'WISMO (Where Is My Order)',
                pct: '~38% of all tickets',
                color: '#f97316',
                bg: 'rgba(249, 115, 22, 0.08)',
                border: 'rgba(249, 115, 22, 0.25)',
                why: 'Pure data lookup. The AI connects to your order management system, pulls the tracking status, formats a clear response with the tracking link and estimated delivery date. No judgment required. Resolution rate with AI: 94%.',
              },
              {
                type: 'Refund status and policy questions',
                pct: '~15% of all tickets',
                color: '#8b5cf6',
                bg: 'rgba(139, 92, 246, 0.08)',
                border: 'rgba(139, 92, 246, 0.25)',
                why: 'The AI knows your refund policy verbatim and can look up whether a specific order is within the return window. For straightforward approved refunds, it can initiate the process. Resolution rate: 87%.',
              },
              {
                type: 'Product questions (size, specs, compatibility)',
                pct: '~12% of all tickets',
                color: '#06b6d4',
                bg: 'rgba(6, 182, 212, 0.08)',
                border: 'rgba(6, 182, 212, 0.25)',
                why: 'With your product catalog in its context, AI answers "will this fit a size 10?" or "is this compatible with X?" accurately and with product links. Resolution rate: 82%.',
              },
              {
                type: 'Order modification requests',
                pct: '~9% of all tickets',
                color: '#10b981',
                bg: 'rgba(16, 185, 129, 0.08)',
                border: 'rgba(16, 185, 129, 0.25)',
                why: 'Address changes, size swaps before shipment, cancellations within your cancellation window — all rule-based decisions the AI can execute or deny with a clear explanation. Resolution rate: 79%.',
              },
            ].map((item, i) => (
              <div key={i} style={{ background: item.bg, border: `1px solid ${item.border}`, borderRadius: '12px', padding: '20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <p style={{ fontWeight: 700, color: item.color, margin: 0, fontSize: '15px' }}>{item.type}</p>
                  <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: '3px 10px', color: '#94a3b8' }}>{item.pct}</span>
                </div>
                <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.7, fontSize: '15px' }}>{item.why}</p>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            Ticket Types That Still Require Humans
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            The 26% of tickets that AI should not handle alone share a different characteristic: they require judgment, empathy, or risk assessment that exceeds rule-following. Trying to automate these leads to responses that feel cold, make the situation worse, or create legal liability.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            {[
              {
                type: 'Fraud and chargeback disputes',
                reason: 'Requires pattern recognition across order history, IP data, and behavioral signals. AI can flag and summarize, but a human must make the call on whether to fight the chargeback or absorb the loss.',
              },
              {
                type: 'Highly emotional escalations',
                reason: 'A customer who lost a birthday gift in shipping, or whose medication accessory arrived broken before a procedure, needs a human voice. AI can acknowledge distress but cannot provide the emotional resolution these situations require.',
              },
              {
                type: 'Unusual refund requests outside policy',
                reason: 'Any refund request that falls outside your standard rules requires discretion. Should you make an exception for a loyal customer\'s first complaint? AI cannot weigh lifetime value, brand reputation, and policy precedent simultaneously.',
              },
              {
                type: 'Product liability or safety complaints',
                reason: 'If a customer reports a product caused injury or illness, every word of your response carries legal weight. Only trained humans with legal guidance should handle these.',
              },
              {
                type: 'Media, influencer, or PR-sensitive contacts',
                reason: 'A journalist writing a piece about your brand, or a 500k-follower creator with a complaint, requires a different response than a standard ticket. AI cannot identify these contacts without an explicit escalation trigger.',
              },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '10px', padding: '16px 20px' }}>
                <p style={{ fontWeight: 600, color: '#f87171', marginBottom: '6px', margin: '0 0 6px', fontSize: '14px' }}>{item.type}</p>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px', lineHeight: 1.6 }}>{item.reason}</p>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            Resolution Rate Benchmarks by Ticket Type
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            &quot;Resolution rate&quot; means the customer&apos;s issue was fully resolved without needing a human agent. These benchmarks are based on well-implemented AI systems with proper system prompts, tool access, and escalation rules in place:
          </p>

          <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '12px', overflow: 'hidden', marginBottom: '32px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#0a0f1a' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#64748b', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ticket Type</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: '#64748b', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Resolution Rate</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: '#64748b', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Human Baseline</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: 'WISMO (in transit)', ai: '94%', human: '98%', diff: 'neutral' },
                  { type: 'WISMO (delayed)', ai: '81%', human: '89%', diff: 'slight' },
                  { type: 'Refund policy questions', ai: '87%', human: '91%', diff: 'slight' },
                  { type: 'Return initiation', ai: '83%', human: '87%', diff: 'slight' },
                  { type: 'Product questions', ai: '82%', human: '85%', diff: 'neutral' },
                  { type: 'Order cancellation', ai: '79%', human: '82%', diff: 'slight' },
                  { type: 'Damaged item (non-emotional)', ai: '71%', human: '86%', diff: 'gap' },
                  { type: 'Fraud/chargeback dispute', ai: '18%', human: '74%', diff: 'major' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b' }}>
                    <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{row.type}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: row.diff === 'major' ? '#f87171' : row.diff === 'gap' ? '#fbbf24' : '#10b981', fontWeight: 600 }}>{row.ai}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: '#64748b' }}>{row.human}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            The WISMO and standard refund categories show AI nearly matching human performance — at a fraction of the cost and with 24/7 availability. The fraud category illustrates why escalation rules matter: a poorly configured AI handling fraud disputes will cause more problems than it solves.
          </p>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            The System Prompt Pattern That Works
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            The single biggest determinant of AI customer service quality is the system prompt. A well-structured system prompt gives the AI its identity, its constraints, its tools, and its escalation logic. A bad one produces generic, off-brand responses that customers can immediately identify as automated.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            The pattern that works consistently has five sections:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            {[
              {
                section: '1. Identity and brand voice',
                content: 'Define who the AI is. Brand name, tone (e.g., "warm and direct, never corporate"), and what it can claim to be. "You are [Name], [Brand]\'s customer experience assistant. You\'re helpful, human-sounding, and get to the point."',
              },
              {
                section: '2. Policy reference block',
                content: 'Paste your return policy, shipping policy, and warranty terms verbatim. The AI should answer policy questions by citing this section, not from general knowledge.',
              },
              {
                section: '3. Available tools and when to use them',
                content: 'List exactly what systems the AI can query (order lookup, tracking, return initiation) and what it cannot do (issue refunds above $X without approval, modify orders already shipped).',
              },
              {
                section: '4. Escalation triggers',
                content: 'Define the exact conditions that should hand off to a human: customer explicitly asks for human, ticket involves injury/illness, refund request exceeds $[threshold], 3+ contacts on same issue, any mention of legal action.',
              },
              {
                section: '5. Tone guardrails',
                content: 'What the AI should never say. No apologies that imply liability ("we apologize for the harm caused"). No promises about delivery dates it cannot verify. No discounts without explicit authorization.',
              },
            ].map((item, i) => (
              <div key={i} style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px 24px' }}>
                <p style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: '8px', fontSize: '15px' }}>{item.section}</p>
                <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.7, fontSize: '14px' }}>{item.content}</p>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            Tool Stack: Gorgias vs. Zendesk + Claude
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            The two dominant approaches for Shopify merchants are Gorgias (which has native Shopify integration and built-in AI features) and a custom stack using Zendesk or Freshdesk with Claude via API. Each has distinct tradeoffs:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
            {[
              {
                name: 'Gorgias + AI Automate',
                color: '#f97316',
                pros: ['Native Shopify data access', 'Fastest setup (days, not weeks)', 'Pre-built WISMO and return flows', 'Lower technical overhead'],
                cons: ['Less flexible system prompts', 'AI quality capped by Gorgias engine', 'Higher per-ticket cost at scale', 'Limited customization for edge cases'],
              },
              {
                name: 'Zendesk / Freshdesk + Claude API',
                color: '#8b5cf6',
                pros: ['Full control over AI behavior', 'Claude\'s reasoning handles complex tickets better', 'Cheaper at high volume', 'Custom escalation logic'],
                cons: ['Requires engineering to set up', '4–8 week implementation', 'You manage Shopify API connection', 'More ongoing maintenance'],
              },
            ].map((stack, i) => (
              <div key={i} style={{ background: '#0f1624', border: `1px solid rgba(${i === 0 ? '249,115,22' : '139,92,246'},0.25)`, borderRadius: '12px', padding: '20px' }}>
                <p style={{ fontWeight: 700, color: stack.color, marginBottom: '16px', fontSize: '14px' }}>{stack.name}</p>
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ fontSize: '12px', color: '#10b981', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Strengths</p>
                  <ul style={{ color: '#94a3b8', paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px' }}>
                    {stack.pros.map((p, j) => <li key={j}>{p}</li>)}
                  </ul>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#f87171', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tradeoffs</p>
                  <ul style={{ color: '#94a3b8', paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px' }}>
                    {stack.cons.map((c, j) => <li key={j}>{c}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            For merchants under $3M ARR or with fewer than 100 daily tickets, Gorgias is usually the right answer — faster to value, lower engineering cost. For merchants above $5M ARR with a technical team, the Claude API approach delivers meaningfully better resolution rates on complex tickets.
          </p>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            Cost Comparison: AI vs. Human Agents
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            The economics of AI customer service are compelling even when the automation rate is conservative. Here&apos;s a representative comparison for a Shopify store processing 2,000 tickets per month:
          </p>

          <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '12px', overflow: 'hidden', marginBottom: '32px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#0a0f1a' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#64748b', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cost Category</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: '#64748b', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Human-Only</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: '#64748b', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI + Human Hybrid</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cat: 'Agent labor (2,000 tickets @ $4/ticket)', human: '$8,000/mo', ai: '$2,100/mo' },
                  { cat: 'Help desk software', human: '$200/mo', ai: '$300/mo' },
                  { cat: 'AI platform / API costs', human: '—', ai: '$400/mo' },
                  { cat: 'Response time (avg)', human: '4.2 hours', ai: '< 90 seconds' },
                  { cat: 'After-hours coverage', human: 'None or overtime', ai: '24/7 included' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b' }}>
                    <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{row.cat}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: '#94a3b8' }}>{row.human}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: '#10b981', fontWeight: 600 }}>{row.ai}</td>
                  </tr>
                ))}
                <tr style={{ borderTop: '2px solid #334155', background: '#0a0f1a' }}>
                  <td style={{ padding: '14px 16px', color: '#f1f5f9', fontWeight: 700 }}>Monthly Total</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', color: '#f87171', fontWeight: 700 }}>$8,200</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', color: '#10b981', fontWeight: 700 }}>$2,800</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            The hybrid model reduces cost by roughly 65% while actually improving response time and coverage. The human agents who remain focus exclusively on escalated tickets — the complex, high-value interactions where their judgment and empathy are genuinely needed.
          </p>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '48px', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            Implementation Checklist
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            Before going live with AI customer service, verify each of these is in place:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
            {[
              'System prompt written and reviewed by a human agent — not just the founder',
              'All policy documents (returns, shipping, warranty) are current and loaded into the prompt',
              'Order lookup and tracking tools tested on 20+ real order numbers',
              'Escalation triggers defined and tested — especially the "angry escalation" and "legal mention" scenarios',
              'Human agent fallback queue configured and staffed',
              'Tone reviewed: AI responses read by a person who doesn\'t know they\'re reading AI-generated text',
              'Monitoring dashboard set up to track resolution rate, escalation rate, and customer satisfaction per ticket type',
              'First two weeks: human review of all AI-resolved tickets before closure',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: '#0f1624', borderRadius: '10px', padding: '14px 16px', border: '1px solid #1e293b' }}>
                <div style={{ flexShrink: 0, width: '20px', height: '20px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '1px' }}></div>
                </div>
                <p style={{ color: '#cbd5e1', margin: 0, fontSize: '14px', lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(139,92,246,0.08))', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>
              Automate Your Customer Service in Days, Not Months
            </h3>
            <p style={{ color: '#94a3b8', marginBottom: '28px', fontSize: '15px', maxWidth: '480px', margin: '0 auto 28px' }}>
              E-commerce Ops Brain connects to your Shopify store and your help desk to handle WISMO, returns, and product questions automatically — with the escalation rules and brand voice dialed in from day one.
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
              Start Free Trial — Automate Your CS Today
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
