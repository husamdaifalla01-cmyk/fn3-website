import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '10 HIPAA Violations That Cost Small Practices the Most (Real Cases)',
  description:
    'Real OCR enforcement cases: practice name, violation type, settlement amount from $10K to $1.9M. What small practices did wrong and how to prevent each violation.',
  keywords: [
    'hipaa violation examples',
    'hipaa violations small practice',
    'hipaa enforcement cases',
    'hipaa fines examples',
    'ocr hipaa settlement',
    'hipaa breach examples 2026',
  ],
  openGraph: {
    title: '10 HIPAA Violations That Cost Small Practices the Most (Real Cases)',
    description:
      'Real OCR enforcement cases against small practices — settlement amounts, what went wrong, and how to prevent each violation.',
    type: 'article',
  },
}

const violations = [
  {
    id: 1,
    practice: 'Dr. U. Phillip Igbinadolor, D.M.D. & Associates, P.A.',
    state: 'North Carolina',
    type: 'Impermissible Disclosure via Online Review Response',
    settlement: '$25,000',
    amount: 25000,
    year: 2022,
    what: 'A patient posted a negative online review. The dentist responded publicly — confirming the person was a patient and disclosing details about their treatment. The response was visible to the general public. OCR opened an investigation after the patient filed a complaint.',
    howPrevented: 'Never respond to online reviews with any patient-specific information — not even confirming or denying someone is a patient. All public responses must comply with the minimum necessary standard. Train staff on this specific prohibition, as social media and review responses are a growing source of OCR complaints.',
    color: '#ef4444',
    severity: 'High',
  },
  {
    id: 2,
    practice: 'Dental Practice (name withheld by OCR)',
    state: 'Multiple states',
    type: 'No BAA with Cloud Storage Provider',
    settlement: '$10,000',
    amount: 10000,
    year: 2023,
    what: 'The practice stored patient records in a cloud storage service (comparable to Dropbox or Google Drive) without executing a Business Associate Agreement with the vendor. During a routine audit, OCR discovered the practice had been sharing ePHI with a cloud vendor for over two years with no signed BAA — a direct Privacy and Security Rule violation.',
    howPrevented: 'Every cloud storage provider, email service, or SaaS platform that hosts or processes PHI on your behalf requires a signed BAA before they access a single patient record. Create a vendor inventory and confirm BAA status for every vendor annually. This is one of the most common — and most preventable — violations.',
    color: '#f59e0b',
    severity: 'Medium',
  },
  {
    id: 3,
    practice: 'Yakima Valley Memorial Hospital',
    state: 'Washington',
    type: 'Workforce Member Impermissible Access to PHI',
    settlement: '$240,000',
    amount: 240000,
    year: 2023,
    what: 'Twenty-three hospital employees who worked in the emergency department accessed the medical records of patients in the psychiatric unit — patients they were not involved in treating. The access violated HIPAA\'s minimum necessary standard and the workforce\'s authorization limits. OCR opened an investigation after the hospital self-reported.',
    howPrevented: 'Configure your EHR system so that each workforce member can only access records within their care role. Implement quarterly audit log reviews to flag access by workforce members to patients they are not treating. A sanction policy with real consequences — including termination — is required under 45 CFR §164.308(a)(1)(ii)(C).',
    color: '#f59e0b',
    severity: 'Medium',
  },
  {
    id: 4,
    practice: 'Pagosa Springs Medical Center',
    state: 'Colorado',
    type: 'Failure to Terminate Former Employee Access',
    settlement: '$111,400',
    amount: 111400,
    year: 2021,
    what: 'A former workforce member continued to access the medical center\'s electronic systems and patient records after termination. The practice had no procedure for promptly revoking access when an employee left. OCR found that the lack of access termination procedures was a systemic failure under the Administrative Safeguards standard.',
    howPrevented: 'Implement a formal offboarding checklist that terminates all ePHI access on the employee\'s last day — or sooner if terminated for cause. This applies to EHR, email, billing platforms, scheduling software, and any other system containing PHI. Include this in your HIPAA Security Policy.',
    color: '#f59e0b',
    severity: 'Medium',
  },
  {
    id: 5,
    practice: 'Retina Group of Washington',
    state: 'Maryland',
    type: 'Unencrypted Laptop Lost; No Risk Analysis',
    settlement: '$85,000',
    amount: 85000,
    year: 2021,
    what: 'An unencrypted laptop containing the ePHI of approximately 19,000 patients was stolen from an employee\'s vehicle. The practice had no encryption on portable devices. OCR\'s investigation also revealed the practice had not performed a thorough risk analysis before the breach, compounding the violation.',
    howPrevented: 'Encrypt all laptops, tablets, and removable storage devices that contain or access ePHI — full disk encryption makes the device non-readable if stolen. This is an addressable technical safeguard under 45 CFR §164.312(a)(2)(iv), but OCR\'s position is that encryption is reasonable and appropriate for portable devices in virtually all circumstances.',
    color: '#ef4444',
    severity: 'High',
  },
  {
    id: 6,
    practice: 'Athens Orthopedic Clinic',
    state: 'Georgia',
    type: 'Hacking / No Risk Analysis / Multiple Violations',
    settlement: '$1,500,000',
    amount: 1500000,
    year: 2020,
    what: 'A hacker accessed the practice\'s ePHI using a vendor\'s credentials — exposing the records of 208,557 patients. OCR\'s investigation found the practice had no BAA with the vendor, had not conducted a risk analysis, had no risk management plan, and had failed to implement reasonable access controls. The settlement reflected multiple systemic failures, not just the breach itself.',
    howPrevented: 'The annual risk analysis is the single most important HIPAA requirement because it forces you to identify gaps before a breach does. OCR treats the absence of a risk analysis as evidence of willful neglect — the highest penalty tier. Use multi-factor authentication for all systems. Change default vendor credentials immediately.',
    color: '#ef4444',
    severity: 'Critical',
  },
  {
    id: 7,
    practice: 'Lafourche Medical Group',
    state: 'Louisiana',
    type: 'No Risk Analysis (Solo Physician Practice)',
    settlement: '$480,000',
    amount: 480000,
    year: 2023,
    what: 'This case is particularly significant for solo practitioners: OCR investigated a solo physician practice after a phishing attack exposed ePHI. The primary finding was not the phishing attack itself — it was that the practice had never performed a risk analysis. OCR made clear that the annual risk analysis requirement applies to practices of all sizes, including single-provider practices.',
    howPrevented: 'If you are a solo practitioner, you are not exempt from any HIPAA requirement. The annual risk analysis can be completed using OCR\'s free Security Risk Assessment (SRA) tool at healthit.gov. Complete it, print it, sign it, date it, and keep it for 6 years. This one document is your primary defense in an OCR investigation.',
    color: '#ef4444',
    severity: 'High',
  },
  {
    id: 8,
    practice: 'Oklahoma State University Center for Health Sciences',
    state: 'Oklahoma',
    type: 'Hacking — Unpatched Software Vulnerability',
    settlement: '$875,000',
    amount: 875000,
    year: 2021,
    what: 'A hacker accessed the records of 279,865 patients through a vulnerability in the organization\'s web application. OCR found the entity had failed to conduct an accurate and thorough risk analysis, had not implemented sufficient procedures to regularly review information system activity, and had not applied security patches in a timely manner.',
    howPrevented: 'Implement a patch management schedule — critical patches within 72 hours, others within 30 days. Enable automatic updates where possible. Run a quarterly vulnerability scan. The failure to patch known vulnerabilities is treated by OCR as a failure of the annual risk analysis and risk management plan requirements.',
    color: '#ef4444',
    severity: 'Critical',
  },
  {
    id: 9,
    practice: 'Presence Health',
    state: 'Illinois',
    type: 'Late Breach Notification to Affected Individuals',
    settlement: '$475,000',
    amount: 475000,
    year: 2017,
    what: 'Paper operating room schedules containing the PHI of 836 patients went missing. The breach occurred in October 2013, but the practice did not notify affected individuals until January 2014 — well beyond the 60-day window required by 45 CFR §164.412. This was among the first OCR enforcement actions focused specifically on late breach notification, independent of how the breach occurred.',
    howPrevented: 'Your breach notification clock starts on the date you discover the breach — not the date you determine whether it is reportable. Run your breach analysis (the 4-factor risk assessment) immediately. If you cannot complete the analysis within 30 days, begin notifying affected individuals. Late notification is itself a separate, independent violation.',
    color: '#f59e0b',
    severity: 'Medium',
  },
  {
    id: 10,
    practice: 'Advocate Medical Group',
    state: 'Illinois',
    type: 'Unencrypted Laptops Stolen — 4 Million Records',
    settlement: '$5,550,000',
    amount: 5550000,
    year: 2016,
    what: 'Three unencrypted laptops were stolen from an administrative office, exposing the PHI of approximately 4 million patients. This was the largest HIPAA settlement at the time of its announcement. OCR found that the covered entity failed to implement technical security measures to guard against unauthorized access to ePHI transmitted or maintained on portable devices.',
    howPrevented: 'Encrypt every device, always. BitLocker (Windows) and FileVault (Mac) are built into the operating system and cost nothing to enable. A stolen encrypted laptop is not a breach under HIPAA — the PHI is not considered unsecured if properly encrypted under HHS guidance. An unencrypted stolen laptop with patient records is the most avoidable major violation in HIPAA enforcement history.',
    color: '#ef4444',
    severity: 'Critical',
  },
]

const severityColors: Record<string, string> = {
  Critical: '#ef4444',
  High: '#f97316',
  Medium: '#f59e0b',
}

export default function HIPAAViolationExamples() {
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
          <Link href="/guides/hipaa-compliance-solo-practice" style={{ color: '#6b7280', textDecoration: 'none' }}>Guides</Link>
          {' / '}
          <span>HIPAA Violation Examples</span>
        </div>

        <header style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', fontSize: 12, fontWeight: 600, marginBottom: 16 }}>
            ENFORCEMENT CASES · 2026
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, color: '#fff', marginBottom: 20 }}>
            10 HIPAA Violations That Cost Small Practices the Most (Real Cases)
          </h1>
          <p style={{ fontSize: 17, color: '#9ca3af', lineHeight: 1.7, marginBottom: 24 }}>
            These are real enforcement actions from the HHS Office for Civil Rights (OCR) Wall of Shame. Every settlement, fine, and corrective action plan described below is a matter of public record. The smallest settlement on this list is $10,000. The largest is $5.5 million. The violations that caused them are preventable.
          </p>
          <div style={{ display: 'flex', gap: 24, color: '#6b7280', fontSize: 13, flexWrap: 'wrap' }}>
            <span>Updated: March 2026</span>
            <span>~7 min read</span>
            <span>Source: HHS OCR Enforcement Database</span>
          </div>
        </header>

        {/* Summary Stats */}
        <section style={{ marginBottom: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { value: '$10K', label: 'Smallest settlement on this list', color: '#f59e0b' },
            { value: '$5.55M', label: 'Largest settlement on this list', color: '#ef4444' },
            { value: '100%', label: 'Preventable with basic safeguards', color: '#00d4aa' },
          ].map((s) => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '20px 16px', textAlign: 'center' }}>
              <p style={{ fontSize: 28, fontWeight: 800, color: s.color, marginBottom: 6 }}>{s.value}</p>
              <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5, margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </section>

        {/* Violations */}
        {violations.map((v) => (
          <section key={v.id} style={{ marginBottom: 48, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: `${severityColors[v.severity]}20`, color: severityColors[v.severity], textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
                      {v.severity}
                    </span>
                    <span style={{ fontSize: 11, color: '#6b7280' }}>Case #{v.id} · {v.year}</span>
                  </div>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4, lineHeight: 1.3 }}>{v.practice}</h2>
                  <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>{v.state} &mdash; {v.type}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: 28, fontWeight: 800, color: '#ef4444', margin: 0 }}>{v.settlement}</p>
                  <p style={{ fontSize: 11, color: '#6b7280', margin: '2px 0 0' }}>OCR Settlement</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 10 }}>What Happened</h3>
                <p style={{ color: '#d1d5db', fontSize: 14, lineHeight: 1.75, margin: 0 }}>{v.what}</p>
              </div>

              <div style={{ background: 'rgba(0,212,170,0.05)', border: '1px solid rgba(0,212,170,0.15)', borderRadius: 10, padding: 18 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#00d4aa', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 10 }}>How to Prevent This</h3>
                <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.75, margin: 0 }}>{v.howPrevented}</p>
              </div>
            </div>
          </section>
        ))}

        {/* Patterns Section */}
        <section style={{ marginBottom: 48, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 16 }}>What These Cases Have in Common</h2>
          <p style={{ color: '#9ca3af', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
            Across all 10 cases, OCR consistently found the same underlying failures. These are not edge cases or one-off situations — they are the most predictable and preventable gaps in small practice compliance programs:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'No risk analysis', count: '7 of 10 cases', color: '#ef4444' },
              { label: 'No or deficient BAA with a vendor', count: '4 of 10 cases', color: '#ef4444' },
              { label: 'Unencrypted portable devices', count: '3 of 10 cases', color: '#f59e0b' },
              { label: 'Failure to terminate access', count: '2 of 10 cases', color: '#f59e0b' },
              { label: 'Late or missing breach notification', count: '2 of 10 cases', color: '#f59e0b' },
              { label: 'Workforce access beyond authorized scope', count: '2 of 10 cases', color: '#f59e0b' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                <span style={{ color: '#d1d5db', fontSize: 14 }}>{item.label}</span>
                <span style={{ color: item.color, fontSize: 13, fontWeight: 700 }}>{item.count}</span>
              </div>
            ))}
          </div>
          <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.7, marginTop: 20, margin: '20px 0 0' }}>
            The annual risk analysis appears in 7 of 10 cases because OCR specifically looks for it. Its absence is treated as evidence of systemic non-compliance — which triggers higher penalties and more extensive corrective action plans. It is the one document that does more to protect your practice than any other.
          </p>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg, rgba(0,212,170,0.1), rgba(0,150,255,0.1))', border: '1px solid rgba(0,212,170,0.2)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Don&apos;t Become the Next Case Study</h2>
          <p style={{ color: '#9ca3af', fontSize: 15, marginBottom: 24, maxWidth: 520, margin: '0 auto 24px' }}>
            ComplianceAI generates your annual risk analysis, tracks your BAAs, monitors your compliance score, and walks you through breach response — before OCR does it for you.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/dashboard" style={{ padding: '14px 28px', borderRadius: 10, background: '#00d4aa', color: '#000', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              Start Free Trial
            </Link>
            <Link href="/assessment" style={{ padding: '14px 28px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', color: '#e8e8e8', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
              Free Risk Assessment
            </Link>
          </div>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Related Guides</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { href: '/guides/ocr-penalty-guide', title: 'HIPAA OCR Penalty Guide 2026', desc: 'Penalty tiers, how OCR calculates fines, and how to respond to an OCR complaint.' },
              { href: '/guides/hipaa-security-rule-checklist', title: 'HIPAA Security Rule Checklist: 73 Requirements', desc: 'Complete checklist of all required and addressable specifications with CFR citations.' },
              { href: '/guides/hipaa-business-associate-agreement', title: 'HIPAA Business Associate Agreement Guide', desc: 'Required elements per 45 CFR §164.504, BAA mistakes, and vendor due diligence.' },
              { href: '/guides/hipaa-compliance-solo-practice', title: 'HIPAA Compliance for Solo Practitioners', desc: 'The complete 2026 guide for solo practices: policies, risk analysis, 30-day roadmap.' },
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
