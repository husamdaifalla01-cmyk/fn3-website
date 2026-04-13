import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'HIPAA Security Rule Checklist: 73 Requirements for Small Practices (2026)',
  description:
    'Complete HIPAA Security Rule checklist covering all 73 required and addressable safeguards — administrative, physical, and technical — with CFR citations for every item.',
  keywords: [
    'hipaa security rule checklist',
    'hipaa technical safeguards checklist',
    'hipaa administrative safeguards checklist',
    'hipaa physical safeguards checklist',
    'hipaa security rule requirements',
    'hipaa compliance checklist 2026',
  ],
  openGraph: {
    title: 'HIPAA Security Rule Checklist: 73 Requirements for Small Practices (2026)',
    description:
      'All 73 HIPAA Security Rule requirements with CFR citations — administrative, physical, and technical safeguards for small practices.',
    type: 'article',
  },
}

const adminRequired = [
  { id: 1, item: 'Designate a Security Officer responsible for HIPAA Security Rule compliance', cfr: '45 CFR §164.308(a)(2)' },
  { id: 2, item: 'Conduct and document an annual risk analysis covering all ePHI systems', cfr: '45 CFR §164.308(a)(1)(ii)(A)' },
  { id: 3, item: 'Implement a risk management plan that reduces identified risks to a reasonable level', cfr: '45 CFR §164.308(a)(1)(ii)(B)' },
  { id: 4, item: 'Implement a sanction policy for workforce members who violate security policies', cfr: '45 CFR §164.308(a)(1)(ii)(C)' },
  { id: 5, item: 'Conduct regular reviews of information system activity (audit log reviews)', cfr: '45 CFR §164.308(a)(1)(ii)(D)' },
  { id: 6, item: 'Implement procedures for authorizing access to ePHI based on workforce role', cfr: '45 CFR §164.308(a)(3)(ii)(A)' },
  { id: 7, item: 'Establish procedures for granting and modifying workforce access to ePHI', cfr: '45 CFR §164.308(a)(4)(ii)(C)' },
  { id: 8, item: 'Implement policies for workforce clearance (background checks, access review)', cfr: '45 CFR §164.308(a)(3)(ii)(B)' },
  { id: 9, item: 'Terminate access to ePHI immediately upon workforce member termination', cfr: '45 CFR §164.308(a)(3)(ii)(C)' },
  { id: 10, item: 'Provide initial HIPAA security training to all new workforce members before ePHI access', cfr: '45 CFR §164.308(a)(5)(i)' },
  { id: 11, item: 'Provide annual HIPAA security refresher training to all workforce members', cfr: '45 CFR §164.308(a)(5)(i)' },
  { id: 12, item: 'Document all training completions and retain for 6 years', cfr: '45 CFR §164.308(a)(5)(i); §164.316(b)' },
  { id: 13, item: 'Implement policies for reporting and responding to security incidents', cfr: '45 CFR §164.308(a)(6)(i)' },
  { id: 14, item: 'Document all security incidents and their outcomes', cfr: '45 CFR §164.308(a)(6)(ii)' },
  { id: 15, item: 'Establish a data backup plan to create retrievable exact copies of ePHI', cfr: '45 CFR §164.308(a)(7)(ii)(A)' },
  { id: 16, item: 'Establish a disaster recovery plan to restore lost ePHI', cfr: '45 CFR §164.308(a)(7)(ii)(B)' },
  { id: 17, item: 'Establish an emergency mode operation plan for critical business process continuity', cfr: '45 CFR §164.308(a)(7)(ii)(C)' },
  { id: 18, item: 'Perform and document periodic technical and non-technical evaluation of security controls', cfr: '45 CFR §164.308(a)(8)' },
  { id: 19, item: 'Obtain Business Associate Agreements from all vendors who handle ePHI', cfr: '45 CFR §164.308(b)(1)' },
]

const adminAddressable = [
  { id: 20, item: 'Implement procedures to create and maintain a list of authorized users for each system containing ePHI', cfr: '45 CFR §164.308(a)(3)(ii)(A)' },
  { id: 21, item: 'Implement access establishment and modification procedures tied to workforce change notifications', cfr: '45 CFR §164.308(a)(4)(ii)(C)' },
  { id: 22, item: 'Implement protection from malicious software (antivirus, endpoint detection)', cfr: '45 CFR §164.308(a)(5)(ii)(B)' },
  { id: 23, item: 'Implement procedures for monitoring login attempts and reporting discrepancies', cfr: '45 CFR §164.308(a)(5)(ii)(C)' },
  { id: 24, item: 'Implement procedures for creating, changing, and safeguarding passwords', cfr: '45 CFR §164.308(a)(5)(ii)(D)' },
  { id: 25, item: 'Implement testing and revision procedures for contingency plans', cfr: '45 CFR §164.308(a)(7)(ii)(D)' },
  { id: 26, item: 'Implement an applications and data criticality analysis to prioritize restoration', cfr: '45 CFR §164.308(a)(7)(ii)(E)' },
]

const physicalRequired = [
  { id: 27, item: 'Implement policies governing who may access facilities where ePHI systems are housed', cfr: '45 CFR §164.310(a)(1)' },
  { id: 28, item: 'Implement policies governing use and positioning of workstations that access ePHI', cfr: '45 CFR §164.310(b)' },
  { id: 29, item: 'Implement policies governing the physical safeguards for all workstations that access ePHI', cfr: '45 CFR §164.310(c)' },
  { id: 30, item: 'Implement policies for final disposition of ePHI and hardware/media containing ePHI', cfr: '45 CFR §164.310(d)(1)' },
  { id: 31, item: 'Implement procedures for removal of ePHI from electronic media before reuse', cfr: '45 CFR §164.310(d)(2)(i)' },
]

const physicalAddressable = [
  { id: 32, item: 'Implement contingency operations — access during emergencies (e.g., fire, flood)', cfr: '45 CFR §164.310(a)(2)(i)' },
  { id: 33, item: 'Implement a facility security plan (locks, visitor logs, alarm systems)', cfr: '45 CFR §164.310(a)(2)(ii)' },
  { id: 34, item: 'Implement access control and validation procedures (badge access, key management)', cfr: '45 CFR §164.310(a)(2)(iii)' },
  { id: 35, item: 'Maintain maintenance records documenting repairs and modifications to physical security', cfr: '45 CFR §164.310(a)(2)(iv)' },
  { id: 36, item: 'Maintain an accountability log for hardware and electronic media movements', cfr: '45 CFR §164.310(d)(2)(iii)' },
  { id: 37, item: 'Create retrievable exact backup copies of ePHI before movement of equipment', cfr: '45 CFR §164.310(d)(2)(iv)' },
]

const technicalRequired = [
  { id: 38, item: 'Assign a unique name and/or number to each user for tracking identity', cfr: '45 CFR §164.312(a)(2)(i)' },
  { id: 39, item: 'Implement emergency access procedures for obtaining ePHI in an emergency', cfr: '45 CFR §164.312(a)(2)(ii)' },
  { id: 40, item: 'Implement technical policies and procedures for electronic information systems that maintain ePHI to only allow access to those with access rights', cfr: '45 CFR §164.312(a)(1)' },
  { id: 41, item: 'Implement hardware, software, and/or procedural mechanisms to record and examine access to ePHI', cfr: '45 CFR §164.312(b)' },
  { id: 42, item: 'Implement policies and procedures to protect ePHI from improper alteration or destruction', cfr: '45 CFR §164.312(c)(1)' },
  { id: 43, item: 'Implement technical security measures to guard against unauthorized access to ePHI transmitted over electronic communications networks', cfr: '45 CFR §164.312(e)(1)' },
]

const technicalAddressable = [
  { id: 44, item: 'Implement automatic logoff after a period of user inactivity', cfr: '45 CFR §164.312(a)(2)(iii)' },
  { id: 45, item: 'Implement encryption and decryption of ePHI at rest', cfr: '45 CFR §164.312(a)(2)(iv)' },
  { id: 46, item: 'Implement electronic mechanisms to corroborate that ePHI has not been altered or destroyed in an unauthorized manner', cfr: '45 CFR §164.312(c)(2)' },
  { id: 47, item: 'Implement a mechanism to authenticate ePHI — verify that ePHI has not been altered or destroyed', cfr: '45 CFR §164.312(d)' },
  { id: 48, item: 'Implement encryption of ePHI in transit (TLS 1.2+ for email, data transfers)', cfr: '45 CFR §164.312(e)(2)(ii)' },
]

const orgAndDocs = [
  { id: 49, item: 'Maintain written BAAs with all business associates who create, receive, maintain, or transmit ePHI', cfr: '45 CFR §164.314(a)(1)' },
  { id: 50, item: 'Maintain group health plan documents that limit disclosure of PHI', cfr: '45 CFR §164.314(b)(1)' },
  { id: 51, item: 'Maintain written policies and procedures in accordance with the Security Rule', cfr: '45 CFR §164.316(a)' },
  { id: 52, item: 'Maintain documentation of policies and procedures for 6 years from creation or last effective date', cfr: '45 CFR §164.316(b)(1)' },
  { id: 53, item: 'Make documentation available to those responsible for implementing the procedures', cfr: '45 CFR §164.316(b)(2)(i)' },
  { id: 54, item: 'Review documentation periodically and update in response to environmental or operations changes', cfr: '45 CFR §164.316(b)(2)(iii)' },
]

const practiceSpecific = [
  { id: 55, item: 'Screen and password-protect all computers visible to patients in waiting areas or exam rooms', cfr: 'Physical Safeguard — §164.310(b)' },
  { id: 56, item: 'Implement a "clean desk" policy: no PHI left visible on unattended desks or workstations', cfr: 'Physical Safeguard — §164.310(c)' },
  { id: 57, item: 'Encrypt all laptops, tablets, and mobile devices that access or store ePHI', cfr: 'Technical Safeguard — §164.312(a)(2)(iv)' },
  { id: 58, item: 'Implement a BYOD (Bring Your Own Device) policy if staff use personal devices for work email', cfr: 'Administrative Safeguard — §164.308(a)(5)' },
  { id: 59, item: 'Configure your EHR system to log all access and export activity and review logs quarterly', cfr: 'Technical Safeguard — §164.312(b)' },
  { id: 60, item: 'Use TLS-encrypted email (not standard Gmail/Yahoo) for any email containing PHI', cfr: 'Technical Safeguard — §164.312(e)(2)(ii)' },
  { id: 61, item: 'Implement a patient portal with MFA (multi-factor authentication) if used', cfr: 'Technical Safeguard — §164.312(d)' },
  { id: 62, item: 'Shred all paper PHI using a cross-cut shredder — do not place in regular recycling', cfr: 'Physical Safeguard — §164.310(d)(1)' },
  { id: 63, item: 'Document how old hard drives and copier hard drives are wiped or destroyed', cfr: 'Physical Safeguard — §164.310(d)(2)(i)' },
  { id: 64, item: 'Ensure your WiFi network is segregated — separate network for patient/guest WiFi vs. clinical systems', cfr: 'Technical Safeguard — §164.312(e)(1)' },
  { id: 65, item: 'Implement automatic screen lock on all workstations after 15 minutes of inactivity', cfr: 'Technical Safeguard — §164.312(a)(2)(iii)' },
  { id: 66, item: 'Conduct a tabletop exercise for your disaster recovery plan at least annually', cfr: 'Administrative Safeguard — §164.308(a)(7)(ii)(D)' },
  { id: 67, item: 'Verify that your cloud storage provider (Google Drive, Dropbox, OneDrive) has a signed BAA in place', cfr: 'Administrative Safeguard — §164.308(b)(1)' },
  { id: 68, item: 'Verify that your telehealth platform has a signed BAA in place', cfr: 'Administrative Safeguard — §164.308(b)(1)' },
  { id: 69, item: 'Verify that your billing service or clearinghouse has a signed BAA in place', cfr: 'Administrative Safeguard — §164.308(b)(1)' },
  { id: 70, item: 'Review user access lists quarterly — remove access for anyone who no longer needs it', cfr: 'Administrative Safeguard — §164.308(a)(3)(ii)(A)' },
  { id: 71, item: 'Maintain a written inventory of all devices (laptops, phones, tablets) that access ePHI', cfr: 'Physical Safeguard — §164.310(d)(2)(iii)' },
  { id: 72, item: 'Implement a procedure for reporting and responding to a lost or stolen device within 24 hours', cfr: 'Administrative Safeguard — §164.308(a)(6)' },
  { id: 73, item: 'Complete and sign the annual risk assessment — retain the signed copy for 6 years', cfr: 'Administrative Safeguard — §164.308(a)(1)' },
]

function ChecklistItem({ item, cfr, id }: { item: string; cfr: string; id: number }) {
  return (
    <div style={{
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
      padding: '14px 16px',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 10,
      marginBottom: 8,
    }}>
      <div style={{
        width: 22,
        height: 22,
        borderRadius: 4,
        border: '2px solid rgba(0,212,170,0.4)',
        flexShrink: 0,
        marginTop: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,212,170,0.05)',
      }}>
        <span style={{ color: '#00d4aa', fontSize: 12, fontWeight: 700 }}>✓</span>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ color: '#d1d5db', fontSize: 14, lineHeight: 1.6, margin: '0 0 4px' }}>
          <span style={{ color: '#6b7280', fontSize: 11, fontFamily: 'monospace', marginRight: 8 }}>#{id}</span>
          {item}
        </p>
        <span style={{ color: '#4b5563', fontSize: 11, fontFamily: 'monospace' }}>{cfr}</span>
      </div>
    </div>
  )
}

export default function SecurityRuleChecklist() {
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
            <Link href="/guides/hipaa-violation-examples" style={{ color: '#9ca3af', fontSize: 14, textDecoration: 'none' }}>Violation Examples</Link>
            <Link href="/dashboard" style={{ padding: '8px 16px', borderRadius: 8, background: '#00d4aa', color: '#000', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Get Compliant</Link>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 32 }}>
          <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <Link href="/guides/hipaa-compliance-solo-practice" style={{ color: '#6b7280', textDecoration: 'none' }}>Guides</Link>
          {' / '}
          <span>HIPAA Security Rule Checklist</span>
        </div>

        <header style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.2)', color: '#00d4aa', fontSize: 12, fontWeight: 600, marginBottom: 16 }}>
            CHECKLIST · 2026
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, color: '#fff', marginBottom: 20 }}>
            HIPAA Security Rule Checklist: 73 Requirements for Small Practices (2026)
          </h1>
          <p style={{ fontSize: 17, color: '#9ca3af', lineHeight: 1.7, marginBottom: 24 }}>
            The HIPAA Security Rule (45 CFR Parts 160 and 164) contains required and addressable specifications across three safeguard categories: administrative, physical, and technical. This checklist covers all 73 requirements applicable to small covered entities and business associates, with the CFR citation for each item so you can reference the primary source.
          </p>
          <div style={{ display: 'flex', gap: 24, color: '#6b7280', fontSize: 13, flexWrap: 'wrap' }}>
            <span>Updated: March 2026</span>
            <span>~14 min read</span>
            <span>Covers 45 CFR §§164.308–316</span>
            <span>73 checklist items</span>
          </div>
        </header>

        {/* What "Required" vs "Addressable" Means */}
        <section style={{ marginBottom: 48, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Required vs. Addressable: What These Labels Actually Mean</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'rgba(0,212,170,0.05)', border: '1px solid rgba(0,212,170,0.15)', borderRadius: 10, padding: 16 }}>
              <h3 style={{ color: '#00d4aa', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Required</h3>
              <p style={{ color: '#9ca3af', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                No flexibility. You must implement this specification regardless of practice size, cost, or technical capability. There is no documented exception available. OCR treats failure to implement a required specification as a direct violation.
              </p>
            </div>
            <div style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, padding: 16 }}>
              <h3 style={{ color: '#f59e0b', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Addressable</h3>
              <p style={{ color: '#9ca3af', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                Does NOT mean optional. You must either: (1) implement as written, (2) implement an equivalent alternative measure, or (3) document in writing why it is not reasonable and appropriate and implement a compensating control. Addressable specifications require a documented decision.
              </p>
            </div>
          </div>
          <p style={{ color: '#ef4444', fontSize: 13, lineHeight: 1.7, marginTop: 16, margin: '16px 0 0' }}>
            <strong style={{ color: '#fca5a5' }}>Common mistake:</strong> Many practices skip addressable specifications entirely, assuming they are optional. OCR has cited this misunderstanding in enforcement actions. Every addressable item on this list requires a documented decision, even if the decision is to use an alternative control.
          </p>
        </section>

        {/* Section 1: Administrative Safeguards */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
            <div style={{ padding: '6px 16px', borderRadius: 20, background: 'rgba(0,212,170,0.12)', border: '1px solid rgba(0,212,170,0.25)', color: '#00d4aa', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
              Administrative Safeguards
            </div>
            <span style={{ color: '#4b5563', fontSize: 13 }}>45 CFR §164.308</span>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Administrative Safeguards</h2>
          <p style={{ color: '#9ca3af', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
            Administrative safeguards are policies, procedures, and management oversight activities that govern how you select, develop, implement, and maintain security measures — and how you manage your workforce&apos;s conduct regarding ePHI protection. These are the foundation of your security program. OCR audits consistently find administrative safeguard gaps as the most common deficiency.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
            Required Specifications
            <span style={{ marginLeft: 10, fontSize: 12, color: '#00d4aa', fontWeight: 600, background: 'rgba(0,212,170,0.1)', padding: '2px 8px', borderRadius: 10 }}>Must implement</span>
          </h3>
          <div style={{ marginBottom: 32 }}>
            {adminRequired.map((r) => (
              <ChecklistItem key={r.id} id={r.id} item={r.item} cfr={r.cfr} />
            ))}
          </div>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
            Addressable Specifications
            <span style={{ marginLeft: 10, fontSize: 12, color: '#f59e0b', fontWeight: 600, background: 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: 10 }}>Implement or document alternative</span>
          </h3>
          <div>
            {adminAddressable.map((r) => (
              <ChecklistItem key={r.id} id={r.id} item={r.item} cfr={r.cfr} />
            ))}
          </div>
        </section>

        {/* Section 2: Physical Safeguards */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
            <div style={{ padding: '6px 16px', borderRadius: 20, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', color: '#a78bfa', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
              Physical Safeguards
            </div>
            <span style={{ color: '#4b5563', fontSize: 13 }}>45 CFR §164.310</span>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Physical Safeguards</h2>
          <p style={{ color: '#9ca3af', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
            Physical safeguards govern the physical protection of electronic systems and related buildings and equipment from natural and environmental hazards and unauthorized intrusion. For small practices, the most commonly missed physical safeguards involve workstation positioning, device disposal, and media re-use — not just server room locks.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
            Required Specifications
            <span style={{ marginLeft: 10, fontSize: 12, color: '#00d4aa', fontWeight: 600, background: 'rgba(0,212,170,0.1)', padding: '2px 8px', borderRadius: 10 }}>Must implement</span>
          </h3>
          <div style={{ marginBottom: 32 }}>
            {physicalRequired.map((r) => (
              <ChecklistItem key={r.id} id={r.id} item={r.item} cfr={r.cfr} />
            ))}
          </div>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
            Addressable Specifications
            <span style={{ marginLeft: 10, fontSize: 12, color: '#f59e0b', fontWeight: 600, background: 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: 10 }}>Implement or document alternative</span>
          </h3>
          <div>
            {physicalAddressable.map((r) => (
              <ChecklistItem key={r.id} id={r.id} item={r.item} cfr={r.cfr} />
            ))}
          </div>
        </section>

        {/* Section 3: Technical Safeguards */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
            <div style={{ padding: '6px 16px', borderRadius: 20, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', color: '#60a5fa', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
              Technical Safeguards
            </div>
            <span style={{ color: '#4b5563', fontSize: 13 }}>45 CFR §164.312</span>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Technical Safeguards</h2>
          <p style={{ color: '#9ca3af', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
            Technical safeguards are the technology and the policies and procedures governing its use that protect ePHI and control access to it. For small practices, the most critical technical safeguards are encryption, access controls with unique user IDs, and audit logging. OCR&apos;s Wall of Shame is full of cases where unencrypted laptops were lost or stolen.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
            Required Specifications
            <span style={{ marginLeft: 10, fontSize: 12, color: '#00d4aa', fontWeight: 600, background: 'rgba(0,212,170,0.1)', padding: '2px 8px', borderRadius: 10 }}>Must implement</span>
          </h3>
          <div style={{ marginBottom: 32 }}>
            {technicalRequired.map((r) => (
              <ChecklistItem key={r.id} id={r.id} item={r.item} cfr={r.cfr} />
            ))}
          </div>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
            Addressable Specifications
            <span style={{ marginLeft: 10, fontSize: 12, color: '#f59e0b', fontWeight: 600, background: 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: 10 }}>Implement or document alternative</span>
          </h3>
          <div>
            {technicalAddressable.map((r) => (
              <ChecklistItem key={r.id} id={r.id} item={r.item} cfr={r.cfr} />
            ))}
          </div>
        </section>

        {/* Section 4: Organizational and Documentation */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
            <div style={{ padding: '6px 16px', borderRadius: 20, background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)', color: '#fb923c', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
              Organizational &amp; Documentation
            </div>
            <span style={{ color: '#4b5563', fontSize: 13 }}>45 CFR §§164.314–316</span>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Organizational Requirements &amp; Documentation</h2>
          <p style={{ color: '#9ca3af', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
            The Security Rule requires covered entities and business associates to maintain written policies and procedures, retain documentation for 6 years, and ensure BAAs are in place for all business associates. These requirements are entirely separate from the Administrative, Physical, and Technical safeguard categories.
          </p>
          <div>
            {orgAndDocs.map((r) => (
              <ChecklistItem key={r.id} id={r.id} item={r.item} cfr={r.cfr} />
            ))}
          </div>
        </section>

        {/* Section 5: Practice-Specific Items */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 12 }}>19 Additional Requirements Commonly Missed by Small Practices</h2>
          <p style={{ color: '#9ca3af', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
            The following items derive from the safeguard categories above but are expressed as the specific, practical actions OCR most frequently cites in enforcement actions against small practices. Each cites the underlying safeguard that compels the action.
          </p>
          <div>
            {practiceSpecific.map((r) => (
              <ChecklistItem key={r.id} id={r.id} item={r.item} cfr={r.cfr} />
            ))}
          </div>
        </section>

        {/* How to Use This Checklist */}
        <section style={{ marginBottom: 48, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 16 }}>How to Use This Checklist in Your Annual Risk Assessment</h2>
          <p style={{ color: '#9ca3af', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
            Your annual risk assessment under 45 CFR §164.308(a)(1) should reference this checklist as a starting point. For each item:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Mark items as Implemented, Partially Implemented, or Not Implemented.',
              'For addressable specifications marked Not Implemented, document your rationale and the alternative control in writing. Keep this documentation for 6 years.',
              'For required specifications marked Not Implemented, immediately add them to your risk mitigation plan with a target implementation date.',
              'Review your completed checklist annually and after any significant environmental or operational change.',
              'The signed, dated checklist with your risk analysis is your primary defense document if OCR investigates your practice.',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 14, color: '#d1d5db' }}>
                <span style={{ color: '#00d4aa', fontWeight: 800, flexShrink: 0, marginTop: 1 }}>{i + 1}.</span>
                {item}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 10, padding: 16 }}>
            <p style={{ color: '#fca5a5', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Documentation Retention Requirement</p>
            <p style={{ color: '#9ca3af', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              Under 45 CFR §164.316(b), all HIPAA Security Rule documentation must be retained for 6 years from the date of creation or the date it was last in effect, whichever is later. This includes your risk assessments, training records, policy documents, and BAAs.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg, rgba(0,212,170,0.1), rgba(0,150,255,0.1))', border: '1px solid rgba(0,212,170,0.2)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Complete Your Security Rule Checklist Automatically</h2>
          <p style={{ color: '#9ca3af', fontSize: 15, marginBottom: 24, maxWidth: 520, margin: '0 auto 24px' }}>
            ComplianceAI walks you through every item on this checklist, generates the required documentation, and tracks your compliance score in real time. No spreadsheets. No generic templates.
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
              { href: '/guides/hipaa-compliance-solo-practice', title: 'HIPAA Compliance for Solo Practitioners', desc: 'The complete 2026 guide: policies, risk analysis, breach reporting, and a 30-day roadmap.' },
              { href: '/guides/hipaa-violation-examples', title: '10 HIPAA Violations That Cost Small Practices the Most', desc: 'Real OCR enforcement cases, settlement amounts, and how to prevent each violation.' },
              { href: '/guides/hipaa-business-associate-agreement', title: 'HIPAA Business Associate Agreement Guide', desc: 'Who needs a BAA, required elements per 45 CFR §164.504, and common mistakes.' },
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
