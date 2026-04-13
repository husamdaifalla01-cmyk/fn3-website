'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface Module {
  id: number
  title: string
  citation: string
  description: string
  slides: { title: string; content: string }[]
  quiz: QuizQuestion[]
}

const MODULES: Module[] = [
  {
    id: 1,
    title: 'What is PHI?',
    citation: '45 CFR 164.514',
    description: 'Understand Protected Health Information and the 18 HIPAA identifiers',
    slides: [
      {
        title: 'What is Protected Health Information (PHI)?',
        content: `PHI is any information that relates to a patient's past, present, or future health condition, the provision of care, or payment for care — AND can be used to identify the individual.

PHI can be in any format:
• Electronic (ePHI) — stored in EHR, email, databases
• Paper — charts, lab results, billing records
• Verbal — conversations about patient care

HIPAA protects PHI whether it's created, received, maintained, or transmitted by your practice.`,
      },
      {
        title: 'The 18 PHI Identifiers',
        content: `Any of these 18 identifiers, when combined with health information, creates PHI:

1. Names
2. Geographic data (address, zip code, etc.)
3. Dates (except year) — birth, admission, discharge, death
4. Phone numbers
5. Fax numbers
6. Email addresses
7. Social Security numbers
8. Medical record numbers
9. Health plan beneficiary numbers
10. Account numbers
11. Certificate/license numbers
12. Vehicle identifiers (VINs, license plates)
13. Device identifiers and serial numbers
14. Web URLs
15. IP addresses
16. Biometric identifiers (fingerprints, voice prints)
17. Full-face photographs
18. Any other unique identifying number or code`,
      },
      {
        title: 'Special Categories: Substance Abuse Records',
        content: `Substance use disorder records have EXTRA protections under 42 CFR Part 2 (beyond HIPAA):

• Records from federally-assisted substance use disorder programs require specific patient consent before disclosure
• This applies to: alcohol/drug treatment programs, detox facilities, opioid treatment programs
• Violation penalties are separate from and in addition to HIPAA penalties

If your practice provides or refers patients for substance use treatment, you must comply with BOTH HIPAA and 42 CFR Part 2.

Mental health records (therapy notes) also have heightened protections — psychotherapy notes are excluded from the "treatment, payment, operations" exception and require specific authorization.`,
      },
      {
        title: 'What is NOT PHI',
        content: `Not everything in your practice is PHI:

De-identified data — information with ALL 18 identifiers removed is NOT PHI (safe harbor method under 45 CFR 164.514(b))

Employment records — your staff's own HR records are not covered by HIPAA

Education records — covered by FERPA, not HIPAA

Deceased patients — PHI protection applies for 50 years after death

Key test: "Could a reasonable person use this information to identify the patient?" If yes, it's PHI. When in doubt, treat it as PHI.`,
      },
    ],
    quiz: [
      {
        question: 'A patient\'s zip code combined with their diagnosis is considered PHI.',
        options: ['True', 'False', 'Only if the zip code is specific to one person', 'Only if it\'s electronic'],
        correct: 0,
        explanation: 'True. A zip code is one of the 18 HIPAA identifiers. When combined with health information (like a diagnosis), it becomes PHI regardless of format.',
      },
      {
        question: 'How many identifiers does HIPAA define that, when combined with health data, create PHI?',
        options: ['12', '15', '18', '21'],
        correct: 2,
        explanation: 'HIPAA defines exactly 18 identifiers under 45 CFR 164.514. All must be removed for information to be considered de-identified (safe harbor method).',
      },
      {
        question: 'Psychotherapy notes (therapy session notes) require a patient authorization separate from the standard treatment/payment/operations exception.',
        options: ['True — they have heightened protection', 'False — they\'re covered by the standard TPO exception', 'Only in states with mental health privacy laws', 'Only if the patient requests it'],
        correct: 0,
        explanation: 'True. Psychotherapy notes are explicitly excluded from the standard TPO exception and require a specific patient authorization before disclosure, per 45 CFR 164.508(a)(2).',
      },
    ],
  },
  {
    id: 2,
    title: 'Minimum Necessary Rule',
    citation: '45 CFR 164.502(b)',
    description: 'Learn to limit PHI access and disclosures to what is needed',
    slides: [
      {
        title: 'The Minimum Necessary Standard',
        content: `The minimum necessary standard requires that covered entities make reasonable efforts to limit PHI use, disclosure, and requests to the minimum necessary to accomplish the intended purpose.

This applies to:
• Disclosures to third parties (use only what they need for their job)
• Internal access (staff should only access PHI for patients they treat)
• Requests for PHI from other providers

It does NOT apply to:
• Disclosures to the treating provider (treatment purposes)
• Patient-requested disclosures
• HHS audit/enforcement activities`,
      },
      {
        title: 'Practical Application in Your Practice',
        content: `How to apply the minimum necessary standard daily:

ROLE-BASED ACCESS: Your front desk staff needs scheduling info but not clinical notes. Configure your EHR to match access to job function.

VERBAL DISCLOSURES: When discussing a patient with a specialist, share only what's relevant to the referral — not the patient's entire history.

FAX/EMAIL: Only include the specific records being requested. Don't send the entire chart when only labs were requested.

PAPER RECORDS: Leave only necessary records on desks. File everything else.

KEY QUESTION to ask: "Does this person need this information to do their job right now?"`,
      },
      {
        title: 'Workforce Roles and Access Levels',
        content: `Define access levels for each role in your practice:

PROVIDERS (Physicians, NPs, PAs):
• Full clinical record access for their own patients
• Limited access to other providers' patients (emergency only)

CLINICAL SUPPORT (MAs, nurses):
• Scheduling, vitals, medication lists, treatment plans
• Billing codes for services rendered

FRONT DESK / ADMINISTRATIVE:
• Scheduling, contact information, insurance
• No clinical notes unless necessary

BILLING STAFF:
• Claims-related information only
• Diagnosis codes, procedure codes, authorization

DOCUMENT YOUR ACCESS POLICY in writing. Review and update when roles change.`,
      },
    ],
    quiz: [
      {
        question: 'A billing specialist needs to verify a patient\'s diagnosis to submit a claim. Under minimum necessary, they should:',
        options: [
          'Request the full patient chart to ensure accuracy',
          'Access only the diagnosis code and procedure information relevant to the claim',
          'Ask the provider to review the entire record with them',
          'Decline to access any PHI since billing is not clinical',
        ],
        correct: 1,
        explanation: 'The minimum necessary standard requires billing staff to access only the specific information needed for the billing purpose — diagnosis codes and procedure information — not the entire chart.',
      },
      {
        question: 'The minimum necessary standard applies to disclosures for treatment purposes (e.g., sending records to a specialist).',
        options: [
          'True — it always applies',
          'False — treatment is explicitly exempt from minimum necessary',
          'Only if the patient requests it',
          'Only for paper records',
        ],
        correct: 1,
        explanation: 'False. Treatment disclosures are explicitly exempt from the minimum necessary standard under 45 CFR 164.502(b)(2)(i). Providers can share full records when treating a patient.',
      },
      {
        question: 'Your receptionist accesses a celebrity patient\'s chart out of curiosity. This violates:',
        options: [
          'Nothing — it\'s an internal access so it\'s allowed',
          'Only HIPAA\'s Privacy Rule if the celebrity finds out',
          'The minimum necessary standard and potentially the sanction policy',
          'Only state law, not federal HIPAA',
        ],
        correct: 2,
        explanation: 'Accessing PHI out of curiosity with no legitimate job purpose violates the minimum necessary standard (45 CFR 164.502(b)) and your practice\'s sanctions policy. This is a reportable HIPAA violation.',
      },
    ],
  },
  {
    id: 3,
    title: 'Patient Records Requests',
    citation: '45 CFR 164.524',
    description: 'Handle patient access requests correctly and on time',
    slides: [
      {
        title: 'The Patient Right of Access',
        content: `Patients have an enforceable right to access their own PHI under 45 CFR 164.524.

WHAT PATIENTS CAN REQUEST:
• Medical records (clinical notes, lab results, imaging)
• Billing records
• Any PHI in your designated record set

YOUR OBLIGATIONS:
• Provide access within 30 days of request (one 30-day extension allowed with written notice)
• Provide records in the format the patient requests (electronic if requested and available)
• Charge only a reasonable, cost-based fee (no markup)
• Cannot require patients to explain why they want their records

OCR has aggressively enforced this right — fines as high as $240,000 for individual violations.`,
      },
      {
        title: 'The 30-Day Rule and Deadlines',
        content: `Timing requirements for patient access requests:

STANDARD: Provide access within 30 days of receiving the request.

EXTENSION: You can take ONE additional 30-day extension, but you must:
• Notify the patient in writing before the initial 30 days expires
• Explain the reason for the delay
• Give a specific expected date for fulfillment

ELECTRONIC RECORDS: When a patient requests their records electronically and you have them in electronic format, you must provide them electronically.

DENIED REQUESTS: If you deny a request (limited circumstances), you must:
• Provide the denial in writing
• Explain the basis for denial
• Inform the patient of their right to have the denial reviewed
• Provide information about how to file a complaint with HHS

START THE CLOCK when you receive the written request, not when you "decide" to process it.`,
      },
      {
        title: 'Fees and Format Requirements',
        content: `You may charge patients for copies of their records — but only a reasonable, cost-based fee.

ALLOWABLE COSTS:
• Labor for copying (paper or electronic)
• Supplies for paper copies
• Postage if mailed
• Preparing an explanation or summary if the patient requests one

NOT ALLOWABLE:
• Search and retrieval fees
• A "per page" fee that exceeds actual cost
• Fees that discourage patients from getting their records
• Fees for electronic records when the cost is minimal

CURRENT GUIDANCE: OCR has stated that fees for electronic records should typically be close to zero.

SUMMARY OR EXPLANATION: If a patient requests a summary instead of full records, you can charge for preparation time — but only if you told them the fee in advance and they agreed.`,
      },
      {
        title: 'Denying Access Requests',
        content: `You may deny access in limited circumstances only:

REVIEWABLE GROUNDS (patient can request review by a licensed professional):
• Likely to endanger life or physical safety of the patient or another person
• PHI about another person (not a healthcare provider) could cause harm
• Only applies to "personal notes" maintained separately, not the general record

NON-REVIEWABLE GROUNDS (no review right):
• Correctional institution request that could jeopardize health/safety/security
• Research that the patient agreed to restrict access during the study
• PHI obtained under a promise of confidentiality that would be violated

IMPORTANT: Denials should be rare. When in doubt, provide the records. The cost of a denial complaint far exceeds the cost of compliance.`,
      },
    ],
    quiz: [
      {
        question: 'A patient submits a written records request on Monday. When must you provide access?',
        options: [
          'Within 7 business days',
          'Within 30 days, with the possibility of one 30-day extension with written notice',
          'Within 60 days for all requests',
          'As soon as reasonably possible but no specific deadline',
        ],
        correct: 1,
        explanation: 'Per 45 CFR 164.524(b)(2), you must act on an access request within 30 days. You may take ONE additional 30-day extension, but must notify the patient in writing before the initial deadline expires.',
      },
      {
        question: 'A patient requests their records in electronic format. You have their records in your EHR. You must:',
        options: [
          'Provide a paper copy — electronic format is optional for you',
          'Provide electronic records if you have them in electronic form',
          'Charge double the normal fee for electronic records',
          'Only provide electronic records if the patient pays upfront',
        ],
        correct: 1,
        explanation: 'Under 45 CFR 164.524(c)(2)(ii), if records exist in electronic format and the patient requests electronic access, you must provide them electronically. You cannot default to paper when electronic records are available.',
      },
      {
        question: 'You may charge a patient a $50 "search and retrieval fee" for finding their records in your system.',
        options: [
          'True — your time has value',
          'False — search and retrieval fees are not permitted under HIPAA',
          'Only if your state law allows it',
          'Only for requests over 50 pages',
        ],
        correct: 1,
        explanation: 'False. HIPAA only permits cost-based fees for actual labor of copying, supplies, and postage. Search and retrieval fees are explicitly not permitted. Only the direct cost of producing the copy is allowed.',
      },
    ],
  },
  {
    id: 4,
    title: 'Breach Reporting Procedures',
    citation: '45 CFR 164.400–414',
    description: 'Know when and how to report a HIPAA breach',
    slides: [
      {
        title: 'What is a HIPAA Breach?',
        content: `A breach is the acquisition, access, use, or disclosure of PHI in a manner not permitted by HIPAA that compromises the security or privacy of PHI.

THE PRESUMPTION RULE: Under HIPAA, you must assume a breach has occurred UNLESS you can demonstrate that there is a low probability that PHI was compromised based on a 4-factor risk assessment.

FOUR FACTORS to assess probability of compromise:
1. Nature and extent of the PHI involved (what types of data, sensitivity level)
2. Who accessed or used the PHI (known unauthorized person vs. unknown)
3. Whether PHI was actually acquired or viewed (or just potentially accessible)
4. Extent to which risk has been mitigated (e.g., encryption, recipient trained)

EXCEPTIONS (not a breach):
• Unintentional access by an employee acting in good faith within scope
• Inadvertent disclosure between authorized workforce members
• Recipient couldn't reasonably have retained information`,
      },
      {
        title: 'Notification Timelines',
        content: `Once you discover a breach, strict timelines apply:

AFFECTED INDIVIDUALS:
• Must be notified without unreasonable delay AND within 60 days of discovery
• Written notice by first-class mail (or email if patient agreed)
• Must include: description of breach, PHI involved, steps to protect themselves, what you're doing, contact info for questions

500+ INDIVIDUALS AFFECTED:
• Same 60-day individual notification
• ALSO notify major media outlets in the affected state/jurisdiction
• ALSO notify HHS within 60 days (not the annual log)

FEWER THAN 500 INDIVIDUALS:
• Notify individuals within 60 days
• Add to your annual breach log
• Submit annual log to HHS by March 1 of the following calendar year

BUSINESS ASSOCIATE BREACHES:
• BA must notify you without unreasonable delay, within 60 days of their discovery
• Your notification clock starts when YOU discover or are notified`,
      },
      {
        title: 'Documenting the Breach',
        content: `Every breach investigation must be documented, even if you determine no breach occurred.

REQUIRED DOCUMENTATION:
• Date of discovery
• Description of what happened
• PHI types involved and number of individuals affected
• 4-factor risk assessment with analysis and conclusion
• Actions taken (containment, remediation)
• Notification letters sent (copies)
• OCR submission confirmation (if applicable)
• Workforce members involved in response

RETAIN ALL BREACH DOCUMENTATION FOR 6 YEARS from date of creation or last effective date (45 CFR 164.530(j)).

INTERNAL REPORTING: Your practice must have a procedure for workforce members to report potential breaches to the Privacy Officer immediately upon discovery. Do not wait to investigate — start the clock.`,
      },
    ],
    quiz: [
      {
        question: 'You discover a breach affecting 600 patients in California. In addition to notifying patients, you must:',
        options: [
          'Only file the annual HHS log by March 1',
          'Notify HHS within 60 days AND notify major media outlets in California',
          'Notify law enforcement within 24 hours',
          'File a police report and notify state medical board',
        ],
        correct: 1,
        explanation: 'For breaches affecting 500+ individuals in a state/jurisdiction, you must: notify patients within 60 days, notify HHS within 60 days (not the annual log), AND notify prominent media outlets in the affected state (45 CFR 164.406).',
      },
      {
        question: 'A staff member accidentally emails a patient\'s lab results to the wrong patient. This is automatically a reportable breach.',
        options: [
          'True — any accidental disclosure is a breach',
          'False — you must first conduct a 4-factor risk assessment to determine if breach notification is required',
          'Only if the receiving patient views the email',
          'Only if more than 10 records were sent',
        ],
        correct: 1,
        explanation: 'False. Under 45 CFR 164.402, you must conduct a 4-factor risk assessment. If you can demonstrate low probability of compromise (e.g., recipient quickly deleted the email), it may not be a reportable breach. But you must document the analysis either way.',
      },
      {
        question: 'Breach documentation must be retained for how long?',
        options: [
          '3 years from the date of the incident',
          '5 years from the date of the incident',
          '6 years from the date of creation or last effective date',
          'Indefinitely',
        ],
        correct: 2,
        explanation: 'HIPAA requires all documentation — including breach records — to be retained for 6 years from the date of creation or the date it was last in effect, whichever is later (45 CFR 164.530(j)).',
      },
    ],
  },
  {
    id: 5,
    title: 'Workstation & Device Security',
    citation: '45 CFR 164.310, 164.312',
    description: 'Protect PHI on computers, phones, and all practice devices',
    slides: [
      {
        title: 'Workstation Security Requirements',
        content: `HIPAA requires physical and technical safeguards for all workstations that access PHI (45 CFR 164.310(b) and 164.310(c)).

PHYSICAL SAFEGUARDS:
• Position screens so patients/visitors cannot see PHI (use privacy screens if needed)
• Lock workstations when stepping away — ALWAYS
• Do not leave patient records visible on screen when unattended
• Secure paper records — don't leave them on desks

TECHNICAL SAFEGUARDS:
• Auto-lock after 15 minutes of inactivity (configure in system settings)
• Unique usernames and passwords — NO shared accounts
• Complex passwords or passphrase + MFA
• Do not allow personal devices to access PHI unless BYOD policy is in place

PHYSICAL ENVIRONMENT:
• Computer screens facing away from public waiting areas
• Separate workstations for tasks involving PHI vs. public-facing areas`,
      },
      {
        title: 'Mobile Devices and Remote Work',
        content: `Mobile devices (phones, tablets, laptops) used for PHI require special attention (45 CFR 164.312, NIST SP 800-124):

REQUIRED FOR ALL MOBILE DEVICES:
• Full-disk encryption enabled (required, not optional)
• PIN/password/biometric lock enabled
• Remote wipe capability set up
• Auto-lock after inactivity (5 minutes recommended)
• Do not store PHI locally if avoidable — use secure EHR app

LOST OR STOLEN DEVICES:
• Report immediately to your Privacy/Security Officer
• Remotely wipe if possible
• Document the incident
• Evaluate if a breach has occurred (4-factor assessment)

PERSONAL DEVICES (BYOD):
• Must meet all the same security requirements
• Must be enrolled in MDM (mobile device management) if used for PHI
• Employee must agree to remote wipe of work data`,
      },
      {
        title: 'Disposal and Media Reuse',
        content: `When retiring or repurposing devices that stored PHI, proper disposal is legally required (45 CFR 164.310(d)(2)).

HARD DRIVES / COMPUTERS:
• NEVER donate or discard computers without destroying the hard drive
• Use DoD 5220.22-M wiping standard (3-pass overwrite minimum)
• Or physically destroy the drive (shredding/degaussing)
• Get a certificate of destruction from the service provider

PAPER RECORDS:
• Use a HIPAA-compliant certified shredding service
• Do not use strip shredders — cross-cut or micro-cut only
• Get a certificate of destruction

PHONES AND TABLETS:
• Factory reset alone is NOT sufficient — use secure erase
• For iPhones: Settings > General > Transfer or Reset iPhone > Erase All Content
• Enable encryption first, then wipe (this renders data unrecoverable)

DOCUMENT EVERYTHING: Keep a device inventory log with serial numbers, assignment dates, and disposal/transfer records.`,
      },
      {
        title: 'Passwords and Authentication',
        content: `Strong authentication is a technical safeguard required by HIPAA (45 CFR 164.312(d)).

PASSWORD REQUIREMENTS (NIST SP 800-63B guidance):
• Minimum 12 characters for healthcare accounts with PHI
• Use passphrases (random words) — easier to remember, harder to crack
• Do not require frequent forced changes (leads to predictable patterns)
• Do not reuse recent passwords
• Use a password manager (1Password, Bitwarden) for unique passwords per service

MULTI-FACTOR AUTHENTICATION (MFA):
• Enable on ALL accounts with PHI access — EHR, email, billing
• Authenticator apps (Google Authenticator, Authy) are more secure than SMS
• Hardware keys (YubiKey) for highest security needs

SHARED ACCOUNTS ARE PROHIBITED:
• Every user must have their own unique login (45 CFR 164.312(a)(2)(i))
• No exceptions — even for "temporary" staff or after-hours access
• Shared accounts make audit trails meaningless`,
      },
    ],
    quiz: [
      {
        question: 'A staff member leaves their workstation briefly to grab a patient from the waiting room. They should:',
        options: [
          'Leave the screen on — they\'ll be right back',
          'Lock the workstation or activate the screensaver before leaving',
          'Turn the monitor off',
          'Log out completely every single time',
        ],
        correct: 1,
        explanation: 'Any time a workstation is unattended, even briefly, it should be locked. HIPAA requires workstation security controls (45 CFR 164.310(c)), and leaving PHI visible on an unattended screen is a violation. Lock (not log out) is the practical solution for brief departures.',
      },
      {
        question: 'Your practice gets a new computer for the front desk. The old computer is donated to a local school without wiping it. This:',
        options: [
          'Is fine — schools are trusted institutions',
          'Is a HIPAA violation requiring breach notification evaluation and secure disposal procedures',
          'Is only a problem if the school accesses the records',
          'Is acceptable if the hard drive is password-protected',
        ],
        correct: 1,
        explanation: 'Donating a computer that contained PHI without proper media sanitization (DoD-level wipe or physical destruction) is a HIPAA violation under 45 CFR 164.310(d)(2). You must evaluate whether a breach occurred and document the incident.',
      },
      {
        question: 'Two receptionists share a single login to the EHR system for convenience. This violates:',
        options: [
          'Nothing — they work at the same practice',
          'HIPAA\'s requirement for unique user identification (45 CFR 164.312(a)(2)(i)) and makes audit trails meaningless',
          'Only your practice\'s internal policy, not HIPAA itself',
          'HIPAA only if a patient complains',
        ],
        correct: 1,
        explanation: 'HIPAA explicitly requires unique user identification — every user must have their own login (45 CFR 164.312(a)(2)(i)). Shared accounts are a direct violation, as they prevent you from knowing which individual accessed PHI, making audit logs useless.',
      },
    ],
  },
]

interface TrainingRecord {
  moduleId: number
  completedAt: string
  score: number
  passed: boolean
}

export default function TrainingPage() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [phase, setPhase] = useState<'slides' | 'quiz' | 'result'>('slides')
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null])
  const [completedModules, setCompletedModules] = useState<TrainingRecord[]>([])
  const [showCertificate, setShowCertificate] = useState(false)
  const [practiceName, setPracticeName] = useState('Your Practice')
  const [staffName, setStaffName] = useState('')
  const [nameInput, setNameInput] = useState('')

  const startModule = (mod: Module) => {
    setSelectedModule(mod)
    setCurrentSlide(0)
    setPhase('slides')
    setAnswers([null, null, null])
  }

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = answerIndex
    setAnswers(newAnswers)
  }

  const submitQuiz = () => {
    if (!selectedModule) return
    const score = selectedModule.quiz.reduce((acc, q, i) => {
      return acc + (answers[i] === q.correct ? 1 : 0)
    }, 0)
    const passed = score >= 2
    const record: TrainingRecord = {
      moduleId: selectedModule.id,
      completedAt: new Date().toISOString(),
      score,
      passed,
    }
    setCompletedModules(prev => {
      const filtered = prev.filter(r => r.moduleId !== selectedModule.id)
      return [...filtered, record]
    })
    setPhase('result')
  }

  const getModuleRecord = (moduleId: number) => completedModules.find(r => r.moduleId === moduleId)

  const allPassed = MODULES.every(m => {
    const r = getModuleRecord(m.id)
    return r?.passed
  })

  const currentResult = selectedModule ? getModuleRecord(selectedModule.id) : null

  if (showCertificate) {
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#12121a] border-2 border-teal-500/40 rounded-3xl p-12 text-center"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(0,212,170,0.15)' }}>
              <span className="text-3xl">🏆</span>
            </div>
            <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-2">Certificate of Completion</p>
            <h1 className="text-3xl font-bold text-white mb-2">HIPAA Workforce Training</h1>
            <p className="text-gray-400 mb-8">Satisfies 45 CFR 164.530(b) Annual Training Requirement</p>

            <div className="border-t border-b border-white/10 py-8 my-8">
              <p className="text-gray-400 text-sm mb-2">This certifies that</p>
              <p className="text-2xl font-bold text-white mb-2">{staffName || 'Workforce Member'}</p>
              <p className="text-gray-400 text-sm">has successfully completed all 5 HIPAA training modules at</p>
              <p className="text-lg font-semibold text-teal-400 mt-1">{practiceName}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8 text-sm">
              <div>
                <p className="text-gray-500">Date Completed</p>
                <p className="text-white font-medium">{date}</p>
              </div>
              <div>
                <p className="text-gray-500">Modules Completed</p>
                <p className="text-white font-medium">5 of 5</p>
              </div>
              <div>
                <p className="text-gray-500">Regulatory Basis</p>
                <p className="text-white font-medium">45 CFR 164.530(b)</p>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: 'rgba(0,212,170,0.15)', color: '#00d4aa', border: '1px solid rgba(0,212,170,0.3)' }}
              >
                Print Certificate
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="px-6 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-gray-400 hover:text-gray-200 transition-all"
              >
                Back to Training
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (selectedModule) {
    const mod = selectedModule
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <header className="border-b border-white/8 bg-[#0a0a0f]/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setSelectedModule(null)} className="text-gray-400 hover:text-gray-200 transition-colors text-sm">
                ← Back
              </button>
              <span className="text-gray-600">/</span>
              <span className="text-white text-sm font-medium">{mod.title}</span>
            </div>
            <span className="text-xs text-gray-500 bg-white/5 px-3 py-1.5 rounded-full">{mod.citation}</span>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <AnimatePresence mode="wait">
            {phase === 'slides' && (
              <motion.div key={`slide-${currentSlide}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-teal-400 uppercase tracking-widest mb-1">Slide {currentSlide + 1} of {mod.slides.length}</p>
                    <div className="flex gap-1">
                      {mod.slides.map((_, i) => (
                        <div key={i} className="h-1 w-12 rounded-full" style={{ background: i <= currentSlide ? '#00d4aa' : 'rgba(255,255,255,0.1)' }} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#12121a] border border-white/10 rounded-2xl p-8 mb-6">
                  <h2 className="text-xl font-bold text-white mb-6">{mod.slides[currentSlide].title}</h2>
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed font-sans">{mod.slides[currentSlide].content}</pre>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                    disabled={currentSlide === 0}
                    className="px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-gray-400 hover:text-gray-200 transition-all disabled:opacity-30"
                  >
                    Previous
                  </button>
                  {currentSlide < mod.slides.length - 1 ? (
                    <button
                      onClick={() => setCurrentSlide(s => s + 1)}
                      className="px-6 py-2.5 rounded-xl text-sm font-medium"
                      style={{ background: 'rgba(0,212,170,0.15)', color: '#00d4aa', border: '1px solid rgba(0,212,170,0.3)' }}
                    >
                      Next Slide →
                    </button>
                  ) : (
                    <button
                      onClick={() => setPhase('quiz')}
                      className="px-6 py-2.5 rounded-xl text-sm font-medium"
                      style={{ background: 'rgba(0,212,170,0.2)', color: '#00d4aa', border: '1px solid rgba(0,212,170,0.4)' }}
                    >
                      Take Quiz →
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {phase === 'quiz' && (
              <motion.div key="quiz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-white mb-1">Knowledge Check</h2>
                  <p className="text-gray-500 text-sm">Answer 3 questions to complete this module. You need 2/3 to pass.</p>
                </div>

                <div className="space-y-8">
                  {mod.quiz.map((q, qi) => (
                    <div key={qi} className="bg-[#12121a] border border-white/10 rounded-2xl p-6">
                      <p className="text-white font-medium mb-4">
                        <span className="text-teal-400 mr-2">Q{qi + 1}.</span>
                        {q.question}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((opt, oi) => (
                          <button
                            key={oi}
                            onClick={() => handleAnswer(qi, oi)}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all border ${
                              answers[qi] === oi
                                ? 'border-teal-500/50 bg-teal-500/10 text-teal-300'
                                : 'border-white/8 text-gray-400 hover:border-white/20 hover:text-gray-200'
                            }`}
                          >
                            <span className="mr-3 text-xs opacity-60">{String.fromCharCode(65 + oi)}.</span>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <button onClick={() => setPhase('slides')} className="px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-gray-400 hover:text-gray-200 transition-all">
                    Review Slides
                  </button>
                  <button
                    onClick={submitQuiz}
                    disabled={answers.some(a => a === null)}
                    className="px-6 py-2.5 rounded-xl text-sm font-medium disabled:opacity-40 transition-all"
                    style={{ background: 'rgba(0,212,170,0.15)', color: '#00d4aa', border: '1px solid rgba(0,212,170,0.3)' }}
                  >
                    Submit Answers →
                  </button>
                </div>
              </motion.div>
            )}

            {phase === 'result' && currentResult && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
                <div className={`rounded-2xl p-8 mb-8 text-center ${currentResult.passed ? 'bg-teal-500/10 border border-teal-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                  <div className="text-5xl mb-4">{currentResult.passed ? '✓' : '✗'}</div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {currentResult.passed ? 'Module Passed!' : 'Review Required'}
                  </h2>
                  <p className="text-gray-400">
                    You scored {currentResult.score}/3 — {currentResult.passed ? 'Well done!' : 'You need 2/3 to pass. Review the slides and try again.'}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {mod.quiz.map((q, qi) => {
                    const isCorrect = answers[qi] === q.correct
                    return (
                      <div key={qi} className={`p-5 rounded-xl border ${isCorrect ? 'border-teal-500/20 bg-teal-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
                        <p className="text-sm font-medium text-white mb-2">Q{qi + 1}: {q.question}</p>
                        <p className={`text-sm mb-2 ${isCorrect ? 'text-teal-400' : 'text-red-400'}`}>
                          {isCorrect ? '✓ Correct' : `✗ You selected: ${q.options[answers[qi] ?? 0]}`}
                        </p>
                        {!isCorrect && <p className="text-xs text-gray-400">Correct answer: {q.options[q.correct]}</p>}
                        <p className="text-xs text-gray-500 mt-2">{q.explanation}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="flex gap-3">
                  {!currentResult.passed && (
                    <button
                      onClick={() => { setAnswers([null, null, null]); setPhase('slides') }}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-gray-400 hover:text-gray-200 transition-all"
                    >
                      Review & Retry
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedModule(null)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium"
                    style={{ background: 'rgba(0,212,170,0.15)', color: '#00d4aa', border: '1px solid rgba(0,212,170,0.3)' }}
                  >
                    Back to All Modules
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <header className="border-b border-white/8 bg-[#0a0a0f]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-gray-400 hover:text-gray-200 transition-colors text-sm">← Dashboard</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white text-sm font-medium">Employee Training</span>
          </div>
          <span className="text-xs text-gray-500 bg-white/5 px-3 py-1.5 rounded-full">45 CFR 164.530(b)</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">HIPAA Workforce Training</h1>
          <p className="text-gray-500">Complete all 5 modules to satisfy the OCR annual training requirement (45 CFR 164.530(b)). A certificate of completion is generated upon passing all modules.</p>
        </div>

        {/* Progress overview */}
        <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-300">Training Progress</p>
              <p className="text-xs text-gray-500">{completedModules.filter(r => r.passed).length} of {MODULES.length} modules passed</p>
            </div>
            {allPassed && (
              <button
                onClick={() => setShowCertificate(true)}
                className="px-4 py-2 rounded-xl text-sm font-medium"
                style={{ background: 'rgba(0,212,170,0.15)', color: '#00d4aa', border: '1px solid rgba(0,212,170,0.3)' }}
              >
                View Certificate
              </button>
            )}
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-teal-400"
              initial={{ width: 0 }}
              animate={{ width: `${(completedModules.filter(r => r.passed).length / MODULES.length) * 100}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>

          {allPassed && !staffName && (
            <div className="mt-4 flex gap-3">
              <input
                type="text"
                placeholder="Enter your name for the certificate"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                className="flex-1 bg-[#0d0d14] border border-white/10 text-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500/50 placeholder-gray-600"
              />
              <button
                onClick={() => setStaffName(nameInput)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: 'rgba(0,212,170,0.15)', color: '#00d4aa', border: '1px solid rgba(0,212,170,0.3)' }}
              >
                Save
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES.map((mod) => {
            const record = getModuleRecord(mod.id)
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: mod.id * 0.05 }}
                className="bg-[#12121a] border border-white/10 rounded-2xl p-6 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(0,212,170,0.1)' }}>
                    {['🧬', '⚖️', '📋', '🚨', '💻'][mod.id - 1]}
                  </div>
                  {record && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${record.passed ? 'bg-teal-500/15 text-teal-400' : 'bg-red-500/15 text-red-400'}`}
                    >
                      {record.passed ? `Passed ${record.score}/3` : `Failed ${record.score}/3`}
                    </span>
                  )}
                </div>
                <p className="text-xs text-teal-400 font-mono mb-1">{mod.citation}</p>
                <h3 className="text-base font-semibold text-white mb-2">Module {mod.id}: {mod.title}</h3>
                <p className="text-sm text-gray-500 flex-1 mb-5">{mod.description}</p>
                <div className="text-xs text-gray-600 mb-4">
                  {mod.slides.length} slides · {mod.quiz.length} questions
                </div>
                <button
                  onClick={() => startModule(mod)}
                  className="w-full py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: record?.passed ? 'rgba(0,212,170,0.08)' : 'rgba(0,212,170,0.15)',
                    color: '#00d4aa',
                    border: '1px solid rgba(0,212,170,0.3)',
                  }}
                >
                  {record ? (record.passed ? 'Review Module' : 'Retry Module') : 'Start Module →'}
                </button>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-10 p-5 bg-[#12121a] border border-white/8 rounded-2xl">
          <p className="text-xs text-gray-500">
            <span className="text-gray-400 font-medium">Regulatory basis: </span>
            45 CFR 164.530(b) requires covered entities to train all workforce members on HIPAA policies and procedures. Training must occur within a reasonable time of hiring and when policies materially change. Records of training must be retained for 6 years.
          </p>
        </div>
      </div>
    </div>
  )
}
