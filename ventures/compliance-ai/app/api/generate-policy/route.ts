import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { practiceId, documentType, practiceInfo } = await req.json()

    if (!documentType || !practiceInfo) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const client = new Anthropic()

    const prompts: Record<string, string> = {
      privacy_policy: `Generate a comprehensive, professional HIPAA Notice of Privacy Practices for a ${practiceInfo.type} practice called "${practiceInfo.name}" in ${practiceInfo.state} with ${practiceInfo.providerCount} provider(s).

Include all required elements under 45 CFR 164.520:
- Header with practice name, effective date, and "THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY."
- Description of how PHI may be used and disclosed (treatment, payment, healthcare operations, required by law, public health, abuse/neglect, research, serious threats)
- Patient rights:
  * Right to inspect and copy PHI
  * Right to request amendment
  * Right to accounting of disclosures
  * Right to request restrictions
  * Right to request confidential communications
  * Right to a paper copy
- Practice's legal duties (maintain privacy, notify of breaches, abide by current notice)
- How to file a complaint with HHS and the practice
- Contact information section (placeholder for Privacy Officer name, address, phone)
- Effective date

Make it specific to a ${practiceInfo.type} practice. Use professional legal language while remaining readable. Format with clear section headers.`,

      security_policy: `Generate a comprehensive HIPAA Security Policy and Procedures document for a ${practiceInfo.type} practice called "${practiceInfo.name}" in ${practiceInfo.state} with ${practiceInfo.providerCount} provider(s).

Cover all Security Rule requirements (45 CFR 164.308-316):

ADMINISTRATIVE SAFEGUARDS:
- Security Officer designation and responsibilities
- Risk analysis procedures (annual requirement)
- Risk management plan
- Sanction policy for violations
- Information system activity review
- Workforce authorization and supervision
- Workforce clearance procedures
- Workforce training requirements and schedule
- Access authorization and modification procedures
- Security incident procedures
- Contingency plan (data backup, disaster recovery, emergency mode operation)
- Evaluation procedures (annual security review)

PHYSICAL SAFEGUARDS:
- Facility access controls (who can access, how)
- Workstation use policy
- Workstation security requirements
- Device and media controls (disposal, re-use, accountability, data backup)

TECHNICAL SAFEGUARDS:
- Access control (unique user IDs, emergency access, automatic logoff, encryption)
- Audit controls (system activity logs)
- Integrity controls (PHI alteration/destruction protection)
- Transmission security (encryption in transit)

ORGANIZATIONAL REQUIREMENTS:
- Business Associate Agreement requirements
- Documentation retention (6 years)
- Policy review and update procedures

Be specific and actionable for a small ${practiceInfo.type} practice with ${practiceInfo.providerCount} provider(s). Include actual procedures, not just policy statements. Format with numbered sections.`,

      workforce_training: `Create a comprehensive HIPAA Workforce Training Policy and Program for a ${practiceInfo.type} practice called "${practiceInfo.name}" in ${practiceInfo.state}.

Include:

1. POLICY STATEMENT
- Purpose and scope
- Who must complete training
- Frequency requirements (initial + annual)

2. TRAINING CURRICULUM (detailed outline)
- HIPAA overview and importance
- What constitutes PHI
- Minimum necessary standard
- Patient rights
- Proper handling of PHI (paper, electronic, verbal)
- Computer and device security
- Password policies
- Email and text messaging rules
- Social media prohibited uses
- Physical security
- Incident recognition and reporting
- Consequences of violations

3. TRAINING SCHEDULE
- New hire training timeline (within first day/week)
- Annual refresher requirements
- Role-specific training requirements

4. DOCUMENTATION REQUIREMENTS
- Training log template
- Attestation form that employees must sign

5. ATTESTATION FORM TEMPLATE
Include a fill-in form that employees sign confirming completion

6. SANCTION POLICY
- Verbal warning
- Written warning
- Termination
- Legal/civil liability notice

Make it practical and usable for a small ${practiceInfo.type} practice.`,

      baa_template: `Create a comprehensive, legally rigorous Business Associate Agreement (BAA) template for a ${practiceInfo.type} practice called "${practiceInfo.name}" in ${practiceInfo.state}.

This BAA must fully comply with 45 CFR 164.504(e)(2) and HITECH Act requirements. Every section must reference the specific CFR citation.

REQUIRED SECTIONS — include all of the following with the exact regulatory requirements:

1. RECITALS AND DEFINITIONS (45 CFR 164.504(e))
- Covered Entity: ${practiceInfo.name} as a HIPAA Covered Entity
- Business Associate: full definition per 45 CFR 160.103
- Protected Health Information (PHI): full definition per 45 CFR 160.103
- Electronic PHI (ePHI): per 45 CFR 160.103
- Breach: per 45 CFR 164.402
- Security Incident: per 45 CFR 164.304
- Subcontractor: per 45 CFR 160.103

2. PERMITTED USES AND DISCLOSURES (45 CFR 164.504(e)(2)(i))
- Enumerate specific permitted purposes (e.g., billing, IT support, cloud storage, EHR hosting)
- Explicitly prohibit all uses not listed
- Include minimum necessary standard requirement
- Prohibit sale of PHI, use for marketing without authorization
- Reference 45 CFR 164.504(e)(2)(i) for each permitted use category

3. BUSINESS ASSOCIATE OBLIGATIONS (45 CFR 164.504(e)(2)(ii))
SAFEGUARDS — cite NIST SP 800-66 Rev. 2 standards:
- Administrative safeguards: risk analysis per NIST SP 800-30, security officer designation, workforce training per NIST SP 800-50, access management
- Physical safeguards: facility access controls, workstation security, device controls (NIST SP 800-124 for mobile)
- Technical safeguards: access controls with unique user IDs, audit logs, integrity controls, transmission encryption (AES-256 minimum), automatic logoff
- Reference NIST Cybersecurity Framework (CSF) 2.0 for overall security program requirements

REPORTING OBLIGATIONS:
- Breach notification to Covered Entity within 60 days of discovery (45 CFR 164.410(b)) — but recommend immediate notification upon discovery
- Security incident reporting without unreasonable delay (45 CFR 164.308(a)(6))
- Provide identity of each individual affected and PHI involved
- Include elements required by 45 CFR 164.410(c): description of breach, PHI types involved, individuals affected, steps taken

SUBCONTRACTOR FLOW-DOWN (45 CFR 164.504(e)(2)(ii)(D) and 45 CFR 164.308(b)):
- Business Associate must obtain HIPAA-compliant BAA from all subcontractors who create, receive, maintain, or transmit PHI on its behalf
- Subcontractor BAAs must contain equivalent protections to this Agreement
- Business Associate remains liable for subcontractor breaches
- Business Associate must provide list of subcontractors with PHI access upon request
- Subcontractors include cloud service providers, offshore vendors, downstream service providers

PATIENT RIGHTS SUPPORT (45 CFR 164.504(e)(2)(ii)(E)–(G)):
- Make PHI available for patient access requests within 30 days
- Support amendment requests
- Provide accounting of disclosures
- HHS audit access within 10 business days

4. BREACH NOTIFICATION PROCEDURES (45 CFR 164.400–414)
- Business Associate must notify Covered Entity of any breach of unsecured PHI without unreasonable delay and no later than 60 days after discovery (45 CFR 164.410)
- Notification must include: (a) description of breach, (b) PHI types involved, (c) number of individuals, (d) steps BA has taken, (e) recommended steps for Covered Entity
- Business Associate must cooperate fully with OCR investigations
- Include 4-factor risk assessment methodology per 45 CFR 164.402: (1) nature/extent of PHI, (2) unauthorized person, (3) whether PHI was acquired/viewed, (4) mitigation
- Reference OCR breach portal: https://ocrportal.hhs.gov/ocr/breach/wizard_breach.jsf

5. TERM AND TERMINATION
TERM: Effective upon execution and co-terminus with the underlying services agreement.

TERMINATION FOR CAUSE (45 CFR 164.504(e)(2)(iii)):
- Covered Entity may terminate immediately upon discovery of a pattern of activity or practice by Business Associate that violates this Agreement
- Covered Entity must provide written notice of material breach
- Business Associate has THIRTY (30) DAYS to cure the breach after written notice
- If breach is not cured within 30 days, Covered Entity may terminate this Agreement immediately without further notice
- For breaches that cannot be cured, Covered Entity may terminate immediately

EFFECT OF TERMINATION (45 CFR 164.504(e)(2)(ii)(J)):
- Upon termination, Business Associate must return or destroy all PHI received from or created on behalf of Covered Entity
- PHI must be returned or destroyed within 30 days of termination
- If return or destruction is not feasible, Business Associate must extend protections indefinitely and limit further uses/disclosures
- Business Associate must certify in writing that all PHI has been returned or destroyed, specifying method of destruction
- Paper records: cross-cut shredding to DIN 66399 Level P-4 or higher
- Electronic media: DoD 5220.22-M standard wiping or physical destruction
- Cloud data: cryptographic erasure with certificate of deletion

DATA RETURN/DESTRUCTION CERTIFICATION:
Include a fill-in certification template that Business Associate must complete upon termination, listing all PHI destroyed, destruction method, and date.

6. GENERAL PROVISIONS
- Governing law: ${practiceInfo.state}
- Entire agreement and supersedes prior BAAs
- No third-party beneficiaries except individuals whose PHI is protected
- Severability
- Amendment requires written agreement signed by both parties
- Waiver
- Counterparts and electronic signatures (valid per E-SIGN Act)
- Integration with underlying services agreement

7. SIGNATURE BLOCKS
Include complete signature blocks for both Covered Entity (${practiceInfo.name}) and Business Associate with: name, title, organization, date, address.

Format as a complete, execution-ready legal document with numbered sections, clear headers, and all blank fields clearly marked with [BRACKETS]. Include a document header showing: "BUSINESS ASSOCIATE AGREEMENT" and "Pursuant to 45 CFR 164.504(e) and HITECH Act of 2009."`,

      risk_assessment: `Create a comprehensive HIPAA Annual Risk Assessment template and completed sample for a ${practiceInfo.type} practice called "${practiceInfo.name}" in ${practiceInfo.state} with ${practiceInfo.providerCount} provider(s).

Per 45 CFR 164.308(a)(1), this must cover:

1. SCOPE OF ASSESSMENT
- Systems that create, receive, maintain, or transmit PHI
- Inventory of all PHI locations (EHR, billing, email, paper, mobile)

2. THREAT IDENTIFICATION
For a ${practiceInfo.type} practice, list realistic threats:
- Natural disasters (floods, fires)
- Human threats (unauthorized access, malicious insiders, hackers)
- Environmental threats (power failures, equipment failures)
- For each: likelihood (H/M/L) and impact (H/M/L)

3. VULNERABILITY IDENTIFICATION
- Technical vulnerabilities (outdated software, weak passwords, no encryption)
- Physical vulnerabilities (unlocked rooms, visible screens)
- Administrative vulnerabilities (no training, no policies)

4. CURRENT CONTROLS ASSESSMENT
- Existing safeguards in place
- Effectiveness rating

5. RISK LEVEL DETERMINATION MATRIX
- Risk rating = likelihood x impact
- Risk level categories (Critical, High, Medium, Low)

6. RISK MITIGATION PLAN
- For each identified risk: mitigation action, responsible party, target date

7. RESIDUAL RISK ASSESSMENT
- Remaining risk after controls

8. CONCLUSION AND SIGN-OFF
- Assessor signature block
- Management review and approval

Format as a professional assessment document with tables where appropriate.`,

      sanctions_policy: `Create a comprehensive HIPAA Workforce Sanctions Policy for a ${practiceInfo.type} practice called "${practiceInfo.name}" in ${practiceInfo.state}.

Include:

1. PURPOSE AND SCOPE
2. POLICY STATEMENT
3. DEFINITIONS (violation types, workforce member categories)

4. VIOLATION CATEGORIES AND SANCTIONS
Category 1 - Minor/Unintentional Violations:
- Examples specific to ${practiceInfo.type} practice
- Sanctions: verbal warning, mandatory retraining

Category 2 - Moderate Violations:
- Examples
- Sanctions: written warning, suspension, mandatory retraining

Category 3 - Serious Violations:
- Examples
- Sanctions: immediate suspension, termination, possible criminal referral

Category 4 - Egregious Violations:
- Examples (selling PHI, malicious access)
- Sanctions: immediate termination, law enforcement referral

5. INVESTIGATION PROCEDURES
- How violations are investigated
- Who investigates
- Documentation requirements
- Employee rights during investigation

6. APPEAL PROCESS

7. DOCUMENTATION AND RECORDKEEPING
- What gets documented
- Retention period (6 years)

8. WORKFORCE ACKNOWLEDGMENT FORM
(template employees sign)

Make it comprehensive enough to satisfy OCR audit requirements.`
    }

    const prompt = prompts[documentType] || prompts.privacy_policy

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const content =
      message.content[0].type === 'text' ? message.content[0].text : ''

    // Save to database if practiceId provided
    if (practiceId && content) {
      const documentTitles: Record<string, string> = {
        privacy_policy: 'Notice of Privacy Practices',
        security_policy: 'HIPAA Security Policy',
        workforce_training: 'Workforce Training Policy',
        baa_template: 'Business Associate Agreement Template',
        risk_assessment: 'Annual Risk Assessment',
        sanctions_policy: 'Workforce Sanctions Policy',
      }

      return NextResponse.json({
        content,
        title: documentTitles[documentType] || documentType,
        documentType,
        practiceId,
      })
    }

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Policy generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate policy document' },
      { status: 500 }
    )
  }
}
