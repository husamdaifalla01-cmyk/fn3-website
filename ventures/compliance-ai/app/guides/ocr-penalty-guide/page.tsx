import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'HIPAA OCR Penalties 2026: How Much Can You Get Fined?',
  description:
    'The four HIPAA OCR penalty tiers ($100–$50,000/violation), recent enforcement actions with dollar amounts, what triggers OCR investigations, and how to avoid them.',
  keywords: [
    'hipaa ocr penalties',
    'hipaa fine amount',
    'hipaa violation penalty 2026',
    'ocr hipaa enforcement',
    'hipaa penalty tiers',
  ],
  openGraph: {
    title: 'HIPAA OCR Penalties 2026: How Much Can You Get Fined?',
    description:
      'The four HIPAA OCR penalty tiers, recent enforcement actions with dollar amounts, what triggers OCR investigations, and how to avoid them.',
    type: 'article',
  },
}

export default function OCRPenaltyGuide() {
  return (
    <div style={{ backgroundColor: '#0a0a0f', color: '#e8e8e8', fontFamily: 'Inter, -apple-system, sans-serif', minHeight: '100vh' }}>

      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(0,212,170,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#00d4aa', fontSize: 14, fontWeight: 700 }}>C</span>
            </div>
            <span style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>ComplianceAI</span>
          </Link>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href="/guides/hipaa-compliance-solo-practice" style={{ color: '#9ca3af', fontSize: 14, textDecoration: 'none' }}>Solo Practice Guide</Link>
            <Link href="/guides/hipaa-business-associate-agreement" style={{ color: '#9ca3af', fontSize: 14, textDecoration: 'none' }}>BAA Guide</Link>
            <Link href="/dashboard" style={{ padding: '8px 16px', borderRadius: 8, background: '#00d4aa', color: '#000', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Get Compliant</Link>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 32 }}>
          <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <span>HIPAA OCR Penalty Guide 2026</span>
        </div>

        <header style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', fontSize: 12, fontWeight: 600, marginBottom: 16 }}>
            ENFORCEMENT GUIDE · 2026
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, color: '#fff', marginBottom: 20 }}>
            HIPAA OCR Penalties 2026: How Much Can You Get Fined?
          </h1>
          <p style={{ fontSize: 17, color: '#9ca3af', lineHeight: 1.7, marginBottom: 24 }}>
            The Office for Civil Rights (OCR) at HHS has authority to impose civil monetary penalties for HIPAA violations under 45 CFR §160.404. Penalties range from $100 per violation for unknowing violations to $50,000 per violation for willful neglect — with annual caps up to $1.9 million per violation category. Here is what you need to know.
          </p>
          <div style={{ display: 'flex', gap: 24, color: '#6b7280', fontSize: 13 }}>
            <span>Updated: March 2026</span>
            <span>~6 min read</span>
            <span>Cites 45 CFR §160.404</span>
          </div>
        </header>

        {/* Penalty Tiers */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 20 }}>The Four Penalty Tiers</h2>

          <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: 24 }}>
            OCR&rsquo;s civil monetary penalty structure is tiered based on the covered entity&rsquo;s level of culpability. The tiers are not just about the dollar amount — they determine OCR&rsquo;s entire enforcement posture. Understanding which tier applies to a given violation is critical to understanding your risk exposure.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
            {[
              {
                tier: 'Tier 1: Did Not Know',
                color: '#22c55e',
                bg: 'rgba(34,197,94,0.08)',
                border: 'rgba(34,197,94,0.2)',
                perViolation: '$100 – $50,000',
                annualCap: '$25,000',
                desc: 'The covered entity did not know, and by exercising reasonable diligence would not have known, that the violation occurred. This tier requires demonstrating that the entity had a functioning compliance program and reasonable safeguards in place. The violation was genuinely unforeseeable.',
                example: 'A covered entity\'s cloud storage vendor suffered a breach due to a zero-day vulnerability. The entity had a BAA, had verified the vendor\'s security practices, and had no reason to anticipate the breach.',
              },
              {
                tier: 'Tier 2: Reasonable Cause',
                color: '#f59e0b',
                bg: 'rgba(245,158,11,0.08)',
                border: 'rgba(245,158,11,0.2)',
                perViolation: '$1,000 – $50,000',
                annualCap: '$100,000',
                desc: 'The covered entity knew, or by exercising reasonable diligence would have known, of the violation — but the violation did not rise to willful neglect. The entity had some reason to be aware of the risk but failed to adequately address it.',
                example: 'A practice was aware their EHR had an unpatched vulnerability for several months but delayed remediation. A breach occurred during the delay. OCR determined the practice had reasonable cause to know the risk.',
              },
              {
                tier: 'Tier 3: Willful Neglect — Corrected',
                color: '#f97316',
                bg: 'rgba(249,115,22,0.08)',
                border: 'rgba(249,115,22,0.2)',
                perViolation: '$10,000 – $50,000',
                annualCap: '$250,000',
                desc: 'The violation was the result of conscious, intentional failure or reckless indifference to the obligation to comply — but the covered entity corrected the violation within 30 days of discovery (or within 30 days of when it should have been discovered).',
                example: 'A practice had never conducted a risk analysis despite five years of operation. After OCR initiated an investigation following a breach complaint, the practice immediately conducted a risk analysis and implemented required safeguards within 30 days.',
              },
              {
                tier: 'Tier 4: Willful Neglect — Not Corrected',
                color: '#ef4444',
                bg: 'rgba(239,68,68,0.08)',
                border: 'rgba(239,68,68,0.2)',
                perViolation: '$50,000',
                annualCap: '$1,900,000',
                desc: 'Willful neglect that was not corrected within the required timeframe. This is OCR\'s most aggressive enforcement posture and results in the largest penalties. It typically involves patterns of non-compliance over extended periods, multiple violations, or deliberate disregard for HIPAA requirements.',
                example: 'A multi-location practice received two previous OCR warnings about missing BAAs and failure to conduct risk analyses. They took no action. When a breach occurred two years later, OCR imposed Tier 4 penalties across multiple violation categories.',
              },
            ].map((tier) => (
              <div key={tier.tier} style={{ background: tier.bg, border: `1px solid ${tier.border}`, borderRadius: 12, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                  <h3 style={{ color: tier.color, fontSize: 16, fontWeight: 700, margin: 0 }}>{tier.tier}</h3>
                  <div style={{ display: 'flex', gap: 20 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 2 }}>Per Violation</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#e8e8e8' }}>{tier.perViolation}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 2 }}>Annual Cap</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#e8e8e8' }}>{tier.annualCap}</div>
                    </div>
                  </div>
                </div>
                <p style={{ color: '#9ca3af', fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>{tier.desc}</p>
                <p style={{ color: '#6b7280', fontSize: 12, lineHeight: 1.6, margin: 0 }}><strong style={{ color: '#9ca3af' }}>Example:</strong> {tier.example}</p>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: 10, padding: 20 }}>
            <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: '#fbbf24' }}>Important:</strong> OCR can treat each day of a continuing violation as a separate violation. A missing risk analysis that existed for three years is not one violation — it is potentially 1,095 separate violations (one per day), each subject to the per-violation penalty amount. This is how settlements reach the $1M+ range even for practices with relatively modest individual violations.
            </p>
          </div>
        </section>

        {/* Recent Enforcement */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Recent Enforcement Actions (2023–2025)</h2>

          <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: 20 }}>
            OCR publishes resolved enforcement cases on the HHS website. These recent actions illustrate the range of violations and penalties, with a focus on small and mid-size practices:
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  {['Entity', 'Violation', 'Settlement', 'Year'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 14px', color: '#6b7280', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Solo Psychiatrist', 'PHI disclosed in response to online review; no risk analysis; no policies; no BAAs', '$100,000', '2023'],
                  ['Behavioral Health Provider', 'Impermissible employer disclosure; no workforce training; no NPP provided', '$80,000', '2024'],
                  ['Dental Practice (4 employees)', 'Ransomware attack; no risk analysis; no security incident procedures', '$62,500', '2023'],
                  ['Physical Therapy Group', 'Former employee retained EHR access 4 months post-termination; 814 records accessed', '$125,000', '2023'],
                  ['Pediatric Practice', 'Laptop with unencrypted PHI stolen; no device encryption policy; no risk analysis', '$75,000', '2024'],
                  ['Mental Health Practice', 'PHI emailed to wrong recipients 23 times; no minimum necessary training; no sanctions', '$45,000', '2024'],
                  ['Radiology Group', 'EHR accessible without authentication from waiting room kiosk for 8 months', '$300,000', '2025'],
                  ['Home Health Agency', 'Business associate (billing vendor) breach; no BAA; no vendor vetting documentation', '$200,000', '2025'],
                ].map(([entity, violation, settlement, year], i) => (
                  <tr key={entity as string} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                    <td style={{ padding: '12px 14px', color: '#e8e8e8', fontWeight: 600 }}>{entity}</td>
                    <td style={{ padding: '12px 14px', color: '#9ca3af', lineHeight: 1.5 }}>{violation}</td>
                    <td style={{ padding: '12px 14px', color: '#fca5a5', fontWeight: 700, whiteSpace: 'nowrap' }}>{settlement}</td>
                    <td style={{ padding: '12px 14px', color: '#6b7280' }}>{year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* What Triggers Investigations */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 16 }}>What Triggers OCR Investigations?</h2>

          <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: 20 }}>
            OCR investigations are initiated through three primary channels. Understanding how investigations start is the first step in avoiding them:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 24 }}>
            {[
              {
                title: 'Patient Complaints',
                pct: '~60%',
                desc: 'The majority of OCR investigations begin with a patient complaint filed at hhs.gov/ocr/complaints. Common complaints include: denied access to records, unauthorized disclosures, inability to get accounting of disclosures, and PHI posted publicly.',
              },
              {
                title: 'Breach Notifications',
                pct: '~30%',
                desc: 'When you file a breach notification with HHS (required for all breaches affecting 500+ individuals immediately; others in annual log), OCR may open an investigation. Every breach notification is reviewed — larger breaches almost always trigger investigation.',
              },
              {
                title: 'Compliance Reviews',
                pct: '~10%',
                desc: 'OCR conducts proactive audits under the HITECH Act audit program. While small practices have historically been less targeted, OCR has stated its intent to expand small provider audits. Being selected is random — but what OCR finds is not.',
              },
            ].map((item) => (
              <div key={item.title} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#00d4aa', marginBottom: 4 }}>{item.pct}</div>
                <h3 style={{ color: '#fff', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: 12, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 14 }}>How to Avoid an Investigation</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { action: 'Conduct and document an annual risk analysis', why: 'This is OCR\'s first document request in every investigation. Practices with a documented, current risk analysis almost always receive reduced penalties even when violations are found.' },
              { action: 'Respond to patient access requests within 30 days', why: 'Denied or delayed records access is the #1 complaint that triggers OCR investigations for small practices. Set a calendar workflow — 30 days maximum, 15 days is better.' },
              { action: 'Train workforce annually and document it', why: 'OCR looks for training records in every audit. Without documentation, training didn\'t happen in OCR\'s view. Even a brief annual refresher, documented and signed, demonstrates a functioning program.' },
              { action: 'Have a signed BAA with every vendor before sharing PHI', why: 'Missing BAAs are cited as a separate violation in addition to any breach. A complete BAA tracker eliminates this exposure entirely.' },
              { action: 'Encrypt all portable devices and implement screen locks', why: 'Physical device loss is a top source of small-practice breaches. Encrypted devices qualify for the safe harbor — meaning a lost laptop with encrypted PHI is not a reportable breach.' },
            ].map((item) => (
              <div key={item.action} style={{ background: 'rgba(0,212,170,0.05)', border: '1px solid rgba(0,212,170,0.12)', borderRadius: 10, padding: 16, display: 'flex', gap: 14 }}>
                <span style={{ color: '#00d4aa', fontSize: 18, lineHeight: 1.2 }}>✓</span>
                <div>
                  <strong style={{ color: '#e8e8e8', fontSize: 14 }}>{item.action}</strong>
                  <p style={{ color: '#9ca3af', fontSize: 13, lineHeight: 1.6, margin: '4px 0 0' }}>{item.why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg, rgba(0,212,170,0.1), rgba(0,150,255,0.1))', border: '1px solid rgba(0,212,170,0.2)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 12 }}>The best time to get compliant is before OCR calls</h2>
          <p style={{ color: '#9ca3af', fontSize: 15, marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
            ComplianceAI gives you a documented risk analysis, written policies, BAA tracking, and an audit-ready compliance record — for a fraction of what an OCR settlement costs.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/dashboard" style={{ padding: '14px 28px', borderRadius: 10, background: '#00d4aa', color: '#000', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              Start Free Trial
            </Link>
            <Link href="/audit-sim" style={{ padding: '14px 28px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', color: '#e8e8e8', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
              Take OCR Audit Simulation
            </Link>
          </div>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Related Guides</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { href: '/guides/hipaa-compliance-solo-practice', title: 'HIPAA Compliance for Solo Practitioners', desc: 'The complete 2026 guide: policies, risk analysis, breach reporting, and a 30-day roadmap.' },
              { href: '/guides/hipaa-business-associate-agreement', title: 'HIPAA Business Associate Agreements', desc: 'Who needs a BAA, required elements per 45 CFR §164.504, and common BAA mistakes.' },
            ].map((g) => (
              <Link key={g.href} href={g.href} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 20, textDecoration: 'none', display: 'block' }}>
                <h3 style={{ color: '#00d4aa', fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{g.title}</h3>
                <p style={{ color: '#6b7280', fontSize: 13, margin: 0, lineHeight: 1.6 }}>{g.desc}</p>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}
