import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'HIPAA Business Associate Agreement: What Small Practices Must Know',
  description:
    'Who needs a HIPAA BAA, required elements per 45 CFR 164.504, common BAA mistakes, subcontractor flow-down rules, and what happens when a business associate has a breach.',
  keywords: [
    'hipaa business associate agreement',
    'baa hipaa requirements',
    'hipaa baa template',
    'business associate agreement requirements',
    'hipaa baa checklist',
  ],
  openGraph: {
    title: 'HIPAA Business Associate Agreement: What Small Practices Must Know',
    description:
      'Who needs a HIPAA BAA, required elements per 45 CFR 164.504, common BAA mistakes, and what happens when a business associate has a breach.',
    type: 'article',
  },
}

export default function BAAGuide() {
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
            <Link href="/guides/ocr-penalty-guide" style={{ color: '#9ca3af', fontSize: 14, textDecoration: 'none' }}>OCR Penalties</Link>
            <Link href="/dashboard" style={{ padding: '8px 16px', borderRadius: 8, background: '#00d4aa', color: '#000', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Get Compliant</Link>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 32 }}>
          <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <span>HIPAA Business Associate Agreement Guide</span>
        </div>

        <header style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.2)', color: '#00d4aa', fontSize: 12, fontWeight: 600, marginBottom: 16 }}>
            GUIDE · 2026
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, color: '#fff', marginBottom: 20 }}>
            HIPAA Business Associate Agreement: What Small Practices Must Know
          </h1>
          <p style={{ fontSize: 17, color: '#9ca3af', lineHeight: 1.7, marginBottom: 24 }}>
            A missing or defective Business Associate Agreement is one of the most common — and most avoidable — HIPAA violations. This guide explains who qualifies as a business associate, what a legally sufficient BAA must contain under 45 CFR §164.504, and the mistakes that turn a vendor relationship into an OCR investigation.
          </p>
          <div style={{ display: 'flex', gap: 24, color: '#6b7280', fontSize: 13 }}>
            <span>Updated: March 2026</span>
            <span>~8 min read</span>
            <span>Cites 45 CFR §164.504</span>
          </div>
        </header>

        {/* Who Needs a BAA */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Who Needs a BAA?</h2>

          <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: 16 }}>
            Under 45 CFR §160.103, a <strong style={{ color: '#e8e8e8' }}>business associate</strong> is any person or entity that performs functions or activities on behalf of a covered entity that involve the use or disclosure of PHI. The key test is not whether the vendor is in healthcare — it is whether they <em>handle PHI</em> as part of their work for you.
          </p>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <h3 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Business Associate Examples (BAA Required)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                'Medical billing services', 'Practice management software', 'EHR/EMR vendors', 'Clearinghouses',
                'Cloud storage providers', 'Email providers hosting PHI', 'Transcription services', 'IT support firms',
                'Telehealth platforms', 'Patient scheduling tools', 'Lab result portals', 'SMS reminder platforms',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: '#9ca3af' }}>
                  <span style={{ color: '#00d4aa' }}>◆</span> {item}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(107,114,128,0.1)', border: '1px solid rgba(107,114,128,0.2)', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Not Business Associates (No BAA Needed)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                'Your employees (covered by workforce training and sanctions policies instead)',
                'Covered entities you share patients with (a BAA is optional but a data use agreement may be needed)',
                'The US Postal Service or courier services that transport sealed PHI without opening it',
                'Janitorial staff with incidental access to patient areas but not to PHI systems',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: '#9ca3af', lineHeight: 1.6 }}>
                  <span style={{ color: '#6b7280', marginTop: 2 }}>—</span> {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Required Elements */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Required Elements Per 45 CFR §164.504(e)(2)</h2>

          <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: 20 }}>
            A HIPAA-compliant BAA must establish the permitted and required uses and disclosures of PHI by the business associate. OCR has found that many vendor-provided &ldquo;data agreements&rdquo; fail to meet these requirements. Verify every BAA contains the following:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              {
                label: 'Permitted Uses & Disclosures',
                desc: 'The agreement must specify the purposes for which the BA may use or disclose PHI — and must limit those uses to what is necessary to perform the contracted services (§164.504(e)(2)(i)).',
              },
              {
                label: 'Appropriate Safeguards',
                desc: 'The BA must agree to implement appropriate administrative, physical, and technical safeguards to protect the confidentiality, integrity, and availability of ePHI it creates, receives, maintains, or transmits (§164.504(e)(2)(ii)(B)).',
              },
              {
                label: 'Breach Reporting Obligation',
                desc: 'The BA must report to the covered entity any use or disclosure not provided for in the agreement, any security incident, and any breach of unsecured PHI, without unreasonable delay and within 60 days of discovery (§164.504(e)(2)(ii)(C)).',
              },
              {
                label: 'Subcontractor Flow-Down',
                desc: 'If the BA uses subcontractors that will access PHI, the BA must obtain satisfactory assurances from each subcontractor — in the form of a written agreement that mirrors the BA\'s obligations — before the subcontractor accesses PHI (§164.504(e)(2)(ii)(D)).',
              },
              {
                label: 'Patient Rights Support',
                desc: 'The BA must make PHI available as required to enable the covered entity to fulfill its obligations under the Privacy Rule — including patient access requests, amendments, and accountings of disclosures (§164.504(e)(2)(ii)(E)–(G)).',
              },
              {
                label: 'HHS Access',
                desc: 'The BA must make its internal practices, books, and records relating to PHI available to HHS for purposes of determining compliance (§164.504(e)(2)(ii)(H)).',
              },
              {
                label: 'Return or Destruction of PHI at Termination',
                desc: 'Upon termination of the contract, the BA must return or destroy all PHI it received or created. If return or destruction is not feasible, the BA must extend protections and limit further use or disclosure (§164.504(e)(2)(ii)(J)).',
              },
            ].map((item, i) => (
              <div key={item.label} style={{ display: 'flex', gap: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: 18 }}>
                <span style={{ color: '#00d4aa', fontSize: 14, fontWeight: 800, minWidth: 24 }}>{i + 1}</span>
                <div>
                  <strong style={{ color: '#e8e8e8', fontSize: 14 }}>{item.label}</strong>
                  <p style={{ color: '#9ca3af', fontSize: 13, lineHeight: 1.7, margin: '6px 0 0' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common BAA Mistakes */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Common BAA Mistakes That Create OCR Exposure</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              {
                mistake: 'Using a vendor\'s generic "data processing agreement"',
                why: 'DPAs are designed for GDPR compliance. They rarely include HIPAA-specific obligations like the 60-day breach notification requirement, HHS access provisions, or the PHI destruction-at-termination clause. Always verify against 45 CFR §164.504.',
              },
              {
                mistake: 'Not obtaining a BAA before sharing PHI',
                why: 'Sharing PHI with a vendor before a BAA is signed is itself a violation of the Privacy Rule. OCR has cited this as a separate violation from the underlying breach in multiple enforcement actions. The BAA must precede PHI access.',
              },
              {
                mistake: 'Failing to track BAA expiration and renewal',
                why: 'BAAs that reference specific contract terms can expire when the underlying contract expires. Maintain a BAA tracker with renewal dates, and confirm active BAA status annually — especially for cloud services renewed on annual subscription cycles.',
              },
              {
                mistake: 'Ignoring subcontractor flow-down',
                why: 'If your EHR vendor uses AWS for hosting, AWS is technically a subcontractor BA. Your EHR vendor is responsible for having a BAA with AWS — but you should verify this is in place, as the covered entity remains responsible for ensuring the chain of BAAs exists.',
              },
              {
                mistake: 'Treating a BAA as "set and forget"',
                why: 'BAAs must be updated when the vendor\'s services change materially, when they change subprocessors who access PHI, or when regulatory requirements change. The 2013 Omnibus Rule significantly expanded BA obligations — BAAs signed before 2013 almost certainly need updating.',
              },
            ].map((item) => (
              <div key={item.mistake} style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 10, padding: 20 }}>
                <h3 style={{ color: '#fca5a5', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{item.mistake}</h3>
                <p style={{ color: '#9ca3af', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{item.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What Happens When a BA Has a Breach */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 16 }}>What Happens When a Business Associate Has a Breach?</h2>

          <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: 20 }}>
            The 2013 HITECH Omnibus Rule made business associates directly liable for HIPAA compliance — they can now be fined directly by OCR. But the covered entity (your practice) remains exposed in the following ways:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            {[
              'If the BA notifies you of a breach, your 60-day clock for patient notification starts on the day the BA discovered the breach — not the day they notified you. Delayed BA notification does not extend your deadline.',
              'If your BAA did not require timely breach notification, OCR may find you contributed to the violation by entering into a deficient agreement.',
              'If you cannot produce a signed BAA at all, you face liability for an impermissible disclosure in addition to whatever violations the BA committed.',
              'You are responsible for ensuring that a BA has appropriate safeguards before sharing PHI — if the BA had obvious security gaps you should have identified during vendor vetting, OCR may hold you partially responsible.',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: 16 }}>
                <span style={{ color: '#f59e0b', fontSize: 18, lineHeight: 1 }}>!</span>
                <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(0,212,170,0.05)', border: '1px solid rgba(0,212,170,0.15)', borderRadius: 10, padding: 20 }}>
            <h3 style={{ color: '#00d4aa', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Best Practice: Due Diligence Before Sharing PHI</h3>
            <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              Before granting any new vendor access to PHI, request their most recent SOC 2 Type II report or HITRUST certification, confirm they carry cyber liability insurance, and document your review. This due diligence record is the single most effective tool for demonstrating good faith to OCR if that vendor later has a breach.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg, rgba(0,212,170,0.1), rgba(0,150,255,0.1))', border: '1px solid rgba(0,212,170,0.2)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Track All Your BAAs in One Place</h2>
          <p style={{ color: '#9ca3af', fontSize: 15, marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
            ComplianceAI includes a vendor BAA tracker, pre-built HIPAA-compliant BAA templates, and automated reminders for renewals and missing agreements.
          </p>
          <Link href="/vendors" style={{ padding: '14px 28px', borderRadius: 10, background: '#00d4aa', color: '#000', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
            Manage Your BAAs
          </Link>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Related Guides</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { href: '/guides/hipaa-compliance-solo-practice', title: 'HIPAA Compliance for Solo Practitioners', desc: 'The complete 2026 guide: policies, risk analysis, breach reporting, and a 30-day roadmap.' },
              { href: '/guides/ocr-penalty-guide', title: 'HIPAA OCR Penalties 2026', desc: 'Penalty tiers, recent enforcement actions, and how to avoid an investigation.' },
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
