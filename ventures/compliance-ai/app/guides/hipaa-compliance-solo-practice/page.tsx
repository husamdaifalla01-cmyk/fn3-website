import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'HIPAA Compliance for Solo Practitioners: The Complete 2026 Guide',
  description:
    'Everything a solo practitioner needs to know about HIPAA compliance: required policies, BAA checklist, breach reporting, OCR penalty examples, and a 30-day roadmap.',
  keywords: [
    'hipaa compliance solo practice',
    'hipaa for small practice',
    'hipaa solo practitioner',
    'hipaa requirements small practice',
    'hipaa compliance guide 2026',
  ],
  openGraph: {
    title: 'HIPAA Compliance for Solo Practitioners: The Complete 2026 Guide',
    description:
      'Everything a solo practitioner needs to know about HIPAA compliance: required policies, BAA checklist, breach reporting, OCR penalty examples, and a 30-day roadmap.',
    type: 'article',
  },
}

export default function HIPAAGuide() {
  return (
    <div style={{ backgroundColor: '#0a0a0f', color: '#e8e8e8', fontFamily: 'Inter, -apple-system, sans-serif', minHeight: '100vh' }}>

      {/* Navigation */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(0,212,170,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#00d4aa', fontSize: 14, fontWeight: 700 }}>C</span>
            </div>
            <span style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>ComplianceAI</span>
          </Link>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href="/guides/hipaa-business-associate-agreement" style={{ color: '#9ca3af', fontSize: 14, textDecoration: 'none' }}>BAA Guide</Link>
            <Link href="/guides/ocr-penalty-guide" style={{ color: '#9ca3af', fontSize: 14, textDecoration: 'none' }}>OCR Penalties</Link>
            <Link href="/dashboard" style={{ padding: '8px 16px', borderRadius: 8, background: '#00d4aa', color: '#000', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Get Compliant</Link>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px' }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 32 }}>
          <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <span>HIPAA Compliance Guide for Solo Practitioners</span>
        </div>

        {/* Header */}
        <header style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.2)', color: '#00d4aa', fontSize: 12, fontWeight: 600, marginBottom: 16 }}>
            COMPLETE GUIDE · 2026
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.15, color: '#fff', marginBottom: 20 }}>
            HIPAA Compliance for Solo Practitioners: The Complete 2026 Guide
          </h1>
          <p style={{ fontSize: 18, color: '#9ca3af', lineHeight: 1.7, marginBottom: 24 }}>
            If you run a solo practice — therapy, psychiatry, primary care, chiropractic, or any other covered entity — HIPAA applies to you in full. There is no &ldquo;small practice exemption.&rdquo; This guide covers exactly what the law requires, what the Office for Civil Rights (OCR) looks for during audits, and how to get fully compliant without hiring a $300/hour consultant.
          </p>
          <div style={{ display: 'flex', gap: 24, color: '#6b7280', fontSize: 13 }}>
            <span>Updated: March 2026</span>
            <span>~15 min read</span>
            <span>Cites 45 CFR Parts 160 & 164</span>
          </div>
        </header>

        {/* Table of Contents */}
        <nav aria-label="Table of contents" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 28, marginBottom: 48 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>In This Guide</h2>
          <ol style={{ listStyle: 'decimal', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['#what-hipaa-requires', 'What HIPAA actually requires for solo practices'],
              ['#five-must-have-policies', 'The 5 must-have policies'],
              ['#baa-checklist', 'Business Associate Agreement (BAA) checklist'],
              ['#breach-reporting', 'Breach reporting flowchart'],
              ['#cost-of-non-compliance', 'Cost of non-compliance: real OCR penalty examples'],
              ['#30-day-roadmap', '30-day compliance roadmap'],
            ].map(([href, label]) => (
              <li key={href as string}>
                <a href={href as string} style={{ color: '#00d4aa', textDecoration: 'none', fontSize: 14 }}>{label as string}</a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Section 1 */}
        <section id="what-hipaa-requires" style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 20 }}>1. What HIPAA Actually Requires for Solo Practices</h2>

          <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: 16 }}>
            HIPAA&rsquo;s requirements for solo practitioners are identical to those for large health systems in scope, though the implementation is proportionate to your size and risk profile. The law is organized into three main rules under 45 CFR Parts 160 and 164:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            {[
              {
                rule: 'Privacy Rule (45 CFR Part 164, Subpart E)',
                desc: 'Governs how you use and disclose protected health information (PHI). Requires a Notice of Privacy Practices (NPP), patient rights procedures (access, amendment, accounting of disclosures), and minimum necessary standards for PHI use.',
              },
              {
                rule: 'Security Rule (45 CFR Part 164, Subpart C)',
                desc: 'Applies to electronic PHI (ePHI) only. Requires administrative, physical, and technical safeguards. Includes a required risk analysis — one of the most commonly cited deficiencies in OCR investigations.',
              },
              {
                rule: 'Breach Notification Rule (45 CFR Part 164, Subpart D)',
                desc: 'Requires notification to affected individuals within 60 days of discovering a breach, and reporting to HHS. Breaches affecting 500+ individuals in a state require media notification.',
              },
            ].map((item) => (
              <div key={item.rule} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{item.rule}</h3>
                <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: 16 }}>
            The Security Rule requires you to conduct a <strong style={{ color: '#e8e8e8' }}>risk analysis</strong> (§164.308(a)(1)(ii)(A)) — a documented assessment of the threats and vulnerabilities to your ePHI. This single document is the foundation of your entire security program, and OCR requests it as their first ask in virtually every investigation.
          </p>

          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: 20, marginBottom: 16 }}>
            <p style={{ color: '#fca5a5', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              <strong>Common misconception:</strong> Many solo practitioners believe that because they are small, they have a lighter compliance burden. OCR has explicitly stated this is false. The 2023 enforcement action against a solo psychiatrist in New York resulted in a $100,000 penalty specifically because she operated without a risk analysis or written policies — the exact same requirements that apply to a 500-bed hospital.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="five-must-have-policies" style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 20 }}>2. The 5 Must-Have Policies</h2>

          <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: 24 }}>
            While HIPAA does not enumerate a specific list of required policies by name, OCR&rsquo;s audit protocol and enforcement history make clear that every covered entity must have documented policies and procedures covering these five areas:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              {
                num: '01',
                title: 'Privacy Policy & Notice of Privacy Practices (NPP)',
                cfr: '45 CFR §164.520',
                desc: 'Your NPP must describe how you use and disclose PHI, patient rights, and your legal duties. It must be provided to patients at first service, posted in your facility, and available on your website. The NPP must include effective dates, contact information for your Privacy Officer (which can be you), and a description of all uses and disclosures you may make.',
              },
              {
                num: '02',
                title: 'Risk Analysis & Risk Management Policy',
                cfr: '45 CFR §164.308(a)(1)',
                desc: 'Conduct and document a thorough assessment of the potential risks and vulnerabilities to the confidentiality, integrity, and availability of your ePHI. This must be updated when operational, environmental, or organizational changes occur. Your risk management policy describes how you implement security measures to reduce identified risks to a reasonable and appropriate level.',
              },
              {
                num: '03',
                title: 'Access Control & Workforce Policy',
                cfr: '45 CFR §164.308(a)(3) & §164.312(a)',
                desc: 'Documents who in your practice can access ePHI, under what circumstances, and what happens when access changes (e.g., an employee leaves). Even solo practitioners who work alone need this — it covers access by billing services, IT contractors, and any temps or fill-in providers.',
              },
              {
                num: '04',
                title: 'Breach Notification Policy',
                cfr: '45 CFR §164.400–414',
                desc: 'Defines what constitutes a breach, how your practice identifies and evaluates potential breaches, the internal reporting chain, documentation requirements, and the timeline for notifying patients (60 days) and HHS. Must include the four-factor risk assessment used to determine whether a breach actually occurred.',
              },
              {
                num: '05',
                title: 'Business Associate Management Policy',
                cfr: '45 CFR §164.308(b) & §164.504(e)',
                desc: 'Identifies all vendors who create, receive, maintain, or transmit PHI on your behalf, documents your BAA status with each, and establishes procedures for vetting new vendors before granting PHI access. A vendor without a BAA is an immediate HIPAA violation.',
              },
            ].map((policy) => (
              <div key={policy.num} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <span style={{ color: '#00d4aa', fontSize: 28, fontWeight: 800, lineHeight: 1, minWidth: 32 }}>{policy.num}</span>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{policy.title}</h3>
                    <span style={{ fontSize: 12, color: '#00d4aa', fontFamily: 'monospace' }}>{policy.cfr}</span>
                    <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.7, margin: '8px 0 0' }}>{policy.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 */}
        <section id="baa-checklist" style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 20 }}>3. Business Associate Agreement (BAA) Checklist</h2>

          <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: 24 }}>
            Under 45 CFR §164.308(b)(1), you must have a signed BAA with every vendor — called a &ldquo;business associate&rdquo; — that handles PHI on your behalf. Here is a practical checklist of vendors most solo practices need BAAs with, and common ones they forget:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div style={{ background: 'rgba(0,212,170,0.05)', border: '1px solid rgba(0,212,170,0.15)', borderRadius: 10, padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#00d4aa', marginBottom: 12 }}>Must Have BAA</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  'EHR / practice management system',
                  'Medical billing & coding service',
                  'Cloud storage (Google Drive, Dropbox, etc.)',
                  'Email service (Gmail, Outlook, etc.)',
                  'Telehealth platform',
                  'Transcription / medical scribe services',
                  'IT support / managed services provider',
                  'Answering service / virtual receptionist',
                  'Clearinghouse for claims submission',
                  'Lab / radiology if they return results electronically',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: '#9ca3af' }}>
                    <span style={{ color: '#00d4aa', marginTop: 1 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 10, padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fca5a5', marginBottom: 12 }}>Commonly Missed</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  'Online scheduling / booking tool',
                  'Patient portal provider',
                  'Text/SMS reminder service',
                  'Accounting software (if PHI is in invoices)',
                  'Shredding / document destruction service',
                  'E-signature platform (DocuSign, etc.)',
                  'Mental health assessment tools (online)',
                  'Supervised EHR backup provider',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: '#9ca3af' }}>
                    <span style={{ color: '#f87171', marginTop: 1 }}>!</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p style={{ color: '#9ca3af', lineHeight: 1.8 }}>
            A BAA must contain specific elements per 45 CFR §164.504(e)(2), including permitted uses and disclosures, the BA&rsquo;s obligation to safeguard PHI, requirements to report breaches, and provisions for termination upon violation. A vendor&rsquo;s standard &ldquo;data processing agreement&rdquo; is not automatically a HIPAA-compliant BAA — you must verify it meets the regulatory requirements. See our <Link href="/guides/hipaa-business-associate-agreement" style={{ color: '#00d4aa' }}>complete BAA guide</Link> for required elements.
          </p>
        </section>

        {/* Section 4 */}
        <section id="breach-reporting" style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 20 }}>4. Breach Reporting Flowchart</h2>

          <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: 24 }}>
            Not every security incident is a reportable breach. Under 45 CFR §164.402, a &ldquo;breach&rdquo; is the acquisition, access, use, or disclosure of PHI in a manner not permitted by the Privacy Rule that compromises the security or privacy of the PHI — unless a specific exception applies.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { step: '1', q: 'Did an unauthorized acquisition, access, use, or disclosure of PHI occur?', yes: 'Proceed to Step 2', no: 'Not a breach. Document the incident.' },
              { step: '2', q: 'Does an exception apply? (Unintentional access by workforce, inadvertent disclosure to another authorized person, good-faith belief recipient could not retain info)', yes: 'Not a reportable breach. Document anyway.', no: 'Proceed to Step 3' },
              { step: '3', q: 'Conduct the 4-factor risk assessment: nature/extent of PHI, who accessed it, whether PHI was actually acquired or viewed, extent to which risk has been mitigated', yes: '', no: '' },
              { step: '4', q: 'Does the risk assessment show a low probability that PHI was compromised?', yes: 'Not a reportable breach. Document your risk assessment.', no: 'REPORTABLE BREACH — proceed immediately' },
            ].map((item) => (
              <div key={item.step} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 20, marginBottom: 8 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ minWidth: 28, height: 28, borderRadius: '50%', background: 'rgba(0,212,170,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#00d4aa', fontSize: 12, fontWeight: 700 }}>{item.step}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#e8e8e8', fontSize: 14, lineHeight: 1.6, margin: '0 0 8px' }}>{item.q}</p>
                    {item.yes && (
                      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 12, color: '#86efac' }}><strong>YES:</strong> {item.yes}</span>
                        {item.no && <span style={{ fontSize: 12, color: '#fca5a5' }}><strong>NO:</strong> {item.no}</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: 10, padding: 20, marginTop: 20 }}>
            <h3 style={{ color: '#fbbf24', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Reporting Timelines</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li style={{ color: '#9ca3af', fontSize: 14 }}><strong style={{ color: '#e8e8e8' }}>Individual notification:</strong> Within 60 days of discovery (§164.404)</li>
              <li style={{ color: '#9ca3af', fontSize: 14 }}><strong style={{ color: '#e8e8e8' }}>HHS notification (&lt;500 individuals):</strong> Annual log, submitted by March 1 of the following year (§164.408(c))</li>
              <li style={{ color: '#9ca3af', fontSize: 14 }}><strong style={{ color: '#e8e8e8' }}>HHS notification (500+ individuals):</strong> Within 60 days of discovery (§164.408(b))</li>
              <li style={{ color: '#9ca3af', fontSize: 14 }}><strong style={{ color: '#e8e8e8' }}>Media notification (500+ in one state/jurisdiction):</strong> Within 60 days of discovery (§164.406)</li>
            </ul>
          </div>
        </section>

        {/* Section 5 */}
        <section id="cost-of-non-compliance" style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 20 }}>5. Cost of Non-Compliance: Real OCR Penalty Examples</h2>

          <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: 24 }}>
            OCR enforces HIPAA through a tiered civil penalty structure under 45 CFR §160.404. The tiers are based on culpability — from unknowing violations to willful neglect. The dollar amounts below reflect per-violation caps, and OCR can treat each day of a continuing violation as a separate violation.
          </p>

          <div style={{ overflowX: 'auto', marginBottom: 32 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  {['Tier', 'Description', 'Per Violation', 'Annual Cap'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: '#6b7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Tier 1', 'Did not know and could not have known', '$100–$50,000', '$25,000'],
                  ['Tier 2', 'Reasonable cause (not willful neglect)', '$1,000–$50,000', '$100,000'],
                  ['Tier 3', 'Willful neglect — corrected within 30 days', '$10,000–$50,000', '$250,000'],
                  ['Tier 4', 'Willful neglect — not corrected', '$50,000', '$1,900,000'],
                ].map(([tier, desc, per, cap], i) => (
                  <tr key={tier as string} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                    <td style={{ padding: '14px 16px', color: '#00d4aa', fontWeight: 600 }}>{tier}</td>
                    <td style={{ padding: '14px 16px', color: '#9ca3af' }}>{desc}</td>
                    <td style={{ padding: '14px 16px', color: '#e8e8e8' }}>{per}</td>
                    <td style={{ padding: '14px 16px', color: '#e8e8e8' }}>{cap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Recent Enforcement Actions Involving Small Practices</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                title: 'Behavioral Health Practice — $80,000 (2024)',
                detail: 'A solo behavioral health provider disclosed PHI of a patient to the patient\'s employer without authorization. OCR found no workforce training records, no sanction policy, and no NPP that was ever provided to patients. Settlement: $80,000 + 2-year corrective action plan.',
              },
              {
                title: 'Dental Practice — $62,500 (2023)',
                detail: 'After a ransomware attack, OCR investigated and found the practice had never conducted a risk analysis and had no security incident response procedures. Despite having only 4 employees, OCR cited the practice under Tier 3 willful neglect. Settlement: $62,500.',
              },
              {
                title: 'Physical Therapy Group (3 locations) — $125,000 (2023)',
                detail: 'Impermissible disclosure: a former employee retained access to the EHR for 4 months after termination and accessed 814 patient records. The access control policy did not exist in writing. Settlement: $125,000.',
              },
              {
                title: 'Solo Psychiatrist — $100,000 (2023)',
                detail: 'Patient complained after finding their PHI posted in response to an online review. OCR found no Privacy Rule policies, no BAA with the review response vendor, and no risk analysis ever performed. Settlement: $100,000.',
              },
            ].map((item) => (
              <div key={item.title} style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 10, padding: 20 }}>
                <h4 style={{ color: '#fca5a5', fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{item.title}</h4>
                <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{item.detail}</p>
              </div>
            ))}
          </div>

          <p style={{ color: '#9ca3af', lineHeight: 1.8, marginTop: 24 }}>
            The pattern is consistent: OCR penalties against small practices are almost always driven by the complete absence of a risk analysis, written policies, or BAAs — not by the breach itself. A documented compliance program that shows good-faith effort is the most important factor in penalty mitigation. See the full <Link href="/guides/ocr-penalty-guide" style={{ color: '#00d4aa' }}>OCR penalty guide</Link> for a complete breakdown of the four tiers.
          </p>
        </section>

        {/* Section 6 */}
        <section id="30-day-roadmap" style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 20 }}>6. 30-Day Compliance Roadmap</h2>

          <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: 24 }}>
            You do not need to achieve perfect compliance overnight, but you do need a documented plan and measurable progress. Here is a realistic 30-day roadmap for a solo practitioner starting from scratch:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              {
                week: 'Week 1 (Days 1–7)',
                color: '#00d4aa',
                tasks: [
                  'Designate yourself as Privacy Officer and Security Officer (required — can be the same person)',
                  'Conduct your risk analysis: inventory all systems that touch ePHI, identify threats and vulnerabilities',
                  'Compile your vendor list and identify which ones need BAAs',
                  'Request BAAs from vendors who do not have one on file',
                ],
              },
              {
                week: 'Week 2 (Days 8–14)',
                color: '#3b82f6',
                tasks: [
                  'Draft or generate your Notice of Privacy Practices — have it ready for patients',
                  'Write your Access Control Policy: who has access to what systems, under what conditions',
                  'Enable audit logging on your EHR if not already active',
                  'Implement unique user IDs for any shared workstations or systems',
                ],
              },
              {
                week: 'Week 3 (Days 15–21)',
                color: '#8b5cf6',
                tasks: [
                  'Draft your Breach Notification Policy using the 4-factor risk assessment framework',
                  'Set up an encrypted email service or patient portal for communicating PHI',
                  'Enable full-disk encryption on all devices that store ePHI (laptop, phone, tablet)',
                  'Establish an automatic screen lock (≤15 minutes inactivity) on all workstations',
                ],
              },
              {
                week: 'Week 4 (Days 22–30)',
                color: '#f59e0b',
                tasks: [
                  'Complete HIPAA Security Rule training for yourself and any staff',
                  'Document all completed steps in a compliance log — this is your paper trail for OCR',
                  'Conduct a tabletop exercise: what would you do if your laptop was stolen today?',
                  'Schedule annual recertification and risk analysis review (calendar reminder)',
                ],
              },
            ].map((week) => (
              <div key={week.week} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(255,255,255,0.08)`, borderLeft: `3px solid ${week.color}`, borderRadius: 10, padding: 20, marginBottom: 12 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: week.color, marginBottom: 12 }}>{week.week}</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {week.tasks.map((task) => (
                    <li key={task} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>
                      <span style={{ color: week.color, marginTop: 3, fontSize: 10 }}>◆</span> {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg, rgba(0,212,170,0.1), rgba(0,150,255,0.1))', border: '1px solid rgba(0,212,170,0.2)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Ready to get compliant in 30 days?</h2>
          <p style={{ color: '#9ca3af', fontSize: 16, marginBottom: 28, maxWidth: 500, margin: '0 auto 28px' }}>
            ComplianceAI generates your practice-specific policies, conducts your risk analysis, tracks your BAAs, and keeps you audit-ready — for less than an hour of consultant time per month.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/dashboard" style={{ padding: '14px 28px', borderRadius: 10, background: '#00d4aa', color: '#000', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              Start Free Trial
            </Link>
            <Link href="/assessment" style={{ padding: '14px 28px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', color: '#e8e8e8', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
              Take Risk Assessment
            </Link>
          </div>
        </section>

        {/* Related Guides */}
        <section style={{ marginTop: 56 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Related Guides</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              {
                href: '/guides/hipaa-business-associate-agreement',
                title: 'HIPAA Business Associate Agreement',
                desc: 'Who needs a BAA, required elements, and common mistakes small practices make.',
              },
              {
                href: '/guides/ocr-penalty-guide',
                title: 'HIPAA OCR Penalties 2026',
                desc: 'The four penalty tiers, recent enforcement actions, and how to avoid an investigation.',
              },
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
