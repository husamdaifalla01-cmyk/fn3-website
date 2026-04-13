import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, ArrowRight, Shield, CheckCircle, AlertTriangle, UserCheck, XCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Screen Tenants: The Complete Landlord Guide (2026)',
  description:
    'A step-by-step tenant screening process covering application forms, credit checks, income verification, background checks, rental history, references, Fair Housing compliance, and documentation. Know what to accept, what to reject, and how to decline applicants legally.',
  keywords: [
    'how to screen tenants',
    'tenant screening process',
    'tenant background check landlord',
    'fair housing tenant screening',
    'landlord screening criteria',
  ],
}

const SCREENING_STEPS = [
  {
    step: 1,
    title: 'Use a Consistent Written Application Form',
    icon: CheckCircle,
    content: `Every applicant for the same unit must complete the same written application. Consistency is the cornerstone of Fair Housing compliance — selective application requirements are one of the most common triggers for discrimination complaints. Your application should collect: full legal name, date of birth (for background check authorization), current and previous addresses for the past 3–5 years, employment history with contact information, monthly gross income, personal and professional references, and authorization to run credit and background checks. Do not ask about protected characteristics. Questions about children, national origin, disability, or religion — even framed as "just curious" — are illegal on rental applications in every U.S. jurisdiction.`,
    accepts: ['Fully completed applications from all adults who will occupy the unit', 'Written consent signatures for background and credit checks'],
    rejects: ['Incomplete applications', 'Refusal to authorize background checks'],
  },
  {
    step: 2,
    title: 'Run a Credit Check',
    icon: CheckCircle,
    content: `A credit check reveals payment history, outstanding debts, collections, judgments, and bankruptcies. Use a tenant screening service that reports a full credit profile — not just a score. What matters most for landlords: payment history (especially rent-related collections), the debt-to-income ratio context, and whether the applicant has prior evictions or landlord judgments on record. Set a minimum credit score threshold and apply it uniformly. A common benchmark is 620–650, though this varies by market. If you set a threshold, you must apply it to every applicant — applying it selectively is a Fair Housing violation. Some jurisdictions (Seattle, Los Angeles, and others) restrict or prohibit using credit history entirely. Know your local law before setting credit criteria.`,
    accepts: ['Credit score at or above your stated minimum', 'Minor derogatory history with strong income and references', 'Explained collections with documentation'],
    rejects: ['Recent eviction judgments', 'Outstanding landlord/utility collections over your threshold', 'Active bankruptcy without court approval to lease'],
  },
  {
    step: 3,
    title: 'Verify Income',
    icon: CheckCircle,
    content: `The standard income-to-rent ratio is 3x monthly rent in gross income. An applicant with $1,800/month gross income should not be approved for a $800/month apartment — the math on debt payments, utilities, food, and transportation leaves insufficient margin. Request documentation: two most recent pay stubs, last two months of bank statements, or (for self-employed applicants) the prior year's tax return plus year-to-date profit and loss statement. Section 8 and other housing vouchers count as income in many states — refusing to accept vouchers is illegal in California, New York, Illinois, Washington, Oregon, and several other jurisdictions under source-of-income protections. For co-signers, apply the same income documentation standard (typically 5x monthly rent).`,
    accepts: ['Gross income ≥3x monthly rent with documentation', 'Multiple income sources that together meet the threshold', 'Valid housing vouchers in source-of-income protected jurisdictions'],
    rejects: ['Unverifiable income claims', 'Income that does not meet your stated ratio (applied consistently)', 'Self-reported income with no supporting documentation'],
  },
  {
    step: 4,
    title: 'Run a Background Check',
    icon: CheckCircle,
    content: `A background check covers criminal history, sex offender registry status, and in some services, prior eviction court records. The Fair Housing Act does not explicitly prohibit using criminal history, but HUD guidance (2016) makes clear that blanket "no felonies" policies can constitute illegal disparate impact discrimination if they disproportionately screen out a protected class. Best practice: evaluate criminal history on an individualized basis. Consider the nature and severity of the offense, the time elapsed, and relevance to tenancy. A conviction for property destruction is more directly relevant than a DUI from 12 years ago. Some cities and states (Seattle, San Francisco, Portland, Minnesota) have "ban the box" ordinances that restrict when and how criminal history may be used in housing decisions. Never run a background check before accepting an application — obtain written authorization first.`,
    accepts: ['Clean record applicants', 'Applicants with dated, minor offenses and strong overall profile', 'Applicants where the offense has no bearing on their ability to be a good tenant'],
    rejects: ['Recent convictions for crimes that directly threaten property safety or other residents', 'Sex offender registry listings (most jurisdictions allow this as a standalone disqualifier)', 'Falsification of application — lying about criminal history is independent grounds for denial'],
  },
  {
    step: 5,
    title: 'Verify Rental History',
    icon: CheckCircle,
    content: `Call the previous two landlords directly. Do not rely solely on written references — a poor landlord relationship will still produce a positive letter to get a difficult tenant out the door. When you call, ask specific questions: Did the tenant pay on time consistently? Were there any lease violations? How did the tenant leave the property? Would you rent to them again? If a previous landlord is unresponsive or unavailable, ask the applicant to provide lease copies or rent payment receipts. An eviction on record — even from years ago — is one of the strongest predictors of future non-payment. First-time renters without rental history can substitute with a co-signer or a larger deposit (up to your state's cap).`,
    accepts: ['Two strong landlord references who would rent to the applicant again', 'No history of evictions or eviction filings', 'Documented evidence of on-time rent payment'],
    rejects: ['Prior eviction judgments within the last 3–5 years', 'Landlords who state they would not rent to the applicant again', 'Unexplained gaps in rental history that the applicant cannot document'],
  },
  {
    step: 6,
    title: 'Check References',
    icon: CheckCircle,
    content: `Personal and professional references are often overlooked but add useful context, especially for first-time renters or self-employed applicants. Ask references: How long have you known the applicant? Have you ever observed the applicant in a housing situation? Do you know of any financial or legal issues that might affect their ability to pay rent? References who are evasive or offer only vague praise are a yellow flag. References from family members carry less weight than employer or professional references. A current employer who confirms title, tenure, and salary adds credibility to income documentation. Do not ask references about protected characteristics.`,
    accepts: ['Two or more contactable, non-family references who speak to the applicant\'s reliability', 'Employer confirmation of title and tenure'],
    rejects: ['Only family references with no other contacts provided', 'References who cannot confirm basic facts about the applicant'],
  },
  {
    step: 7,
    title: 'Apply Fair Housing Standards Consistently',
    icon: Shield,
    content: `Fair Housing compliance is not an afterthought — it is the framework around every step of the process. The core rule: whatever criteria you apply to one applicant, you must apply identically to all applicants for the same unit. Document your criteria in writing before you begin accepting applications. Write them down: minimum credit score, income ratio, rental history requirements, background check standards. Apply those criteria in the same order to every applicant. When you decline an applicant, document the specific reason as it relates to your stated criteria — not a subjective impression. If an applicant requests a reasonable accommodation (e.g., a co-signer instead of direct income because of a disability), you are required to consider it. Refusing to engage with accommodation requests is an independent FHA violation, separate from the underlying decision.`,
    accepts: ['All applicants who meet your pre-stated, written criteria', 'Reasonable accommodation requests — evaluate each on its merits'],
    rejects: ['Any applicant based on race, color, national origin, religion, sex, familial status, or disability', 'Applicants selectively based on subjective impressions not tied to written criteria'],
  },
  {
    step: 8,
    title: 'Document Everything and Decline Properly',
    icon: CheckCircle,
    content: `When you deny an applicant, you must provide an adverse action notice if the denial was based wholly or partly on a consumer report (credit or background check). Under the Fair Credit Reporting Act (FCRA), this notice must include: the name of the screening agency, a statement of the applicant's right to a free copy of the report, and their right to dispute inaccurate information. The notice must go out within a reasonable time of the denial. Use a written denial letter that cites the specific reason from your criteria (e.g., "income below the required 3x monthly rent threshold" or "credit score below minimum"). Avoid subjective or vague language. Keep a complete file for every applicant — accepted and declined — for at least 3 years. This documentation is your defense in a Fair Housing complaint.`,
    accepts: [],
    rejects: [],
    note: 'Required documents: adverse action notice (if credit/background check used), written denial letter citing criteria-based reason, copy of the completed application, notes from landlord reference calls.',
  },
]

const QUICK_REFERENCE = [
  { label: 'Income-to-Rent Ratio', standard: '3x monthly gross rent minimum', note: '5x for co-signers' },
  { label: 'Credit Score Threshold', standard: '620–650 typical benchmark', note: 'Apply to all applicants equally' },
  { label: 'Eviction History', standard: 'None in past 3–5 years', note: 'Check eviction records, not just credit' },
  { label: 'Rental History', standard: '2 verifiable landlord references', note: 'Call directly; do not rely on written letters only' },
  { label: 'Background Check', standard: 'Individualized assessment', note: 'No blanket felony bans — see HUD 2016 guidance' },
  { label: 'Decision Timeline', standard: 'First qualified applicant', note: 'Document decision date and criteria met' },
]

export default function HowToScreenTenantsPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://propertymind.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://propertymind.vercel.app/guides' },
      { '@type': 'ListItem', position: 3, name: 'How to Screen Tenants: The Complete Landlord Guide (2026)' },
    ],
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Nav */}
      <nav className="border-b border-slate-800/50 backdrop-blur-sm sticky top-0 z-50 bg-slate-950/90">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white text-lg tracking-tight">PropertyMind</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/guides/tenant-screening-checklist" className="text-sm text-slate-400 hover:text-white transition-colors hidden md:block">
              Screening Checklist
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Try PropertyMind Free
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-300 transition-colors">PropertyMind</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-slate-300 transition-colors">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">How to Screen Tenants</span>
        </div>

        {/* Header */}
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-600/10 border border-violet-500/20 rounded-full text-violet-400 text-xs font-medium mb-6">
            <UserCheck className="w-3 h-3" />
            Tenant Screening Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            How to Screen Tenants:<br />
            <span className="text-violet-400">The Complete Landlord Guide (2026)</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
            Tenant screening done right protects you from costly evictions, property damage, and Fair Housing complaints. This 8-step process covers what to check, what standards to set, and exactly how to decline applicants without violating federal law.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-slate-500">
            <span>Updated March 2026</span>
            <span>·</span>
            <span>~12 min read</span>
            <span>·</span>
            <span>FHA compliant framework</span>
          </div>
        </header>

        {/* Why Screening Matters */}
        <section className="mb-16">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Why Rigorous Screening Is the Most Important Thing a Landlord Does</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              The average eviction in the United States costs $3,500–$7,000 in lost rent, legal fees, and turnover costs — and that is for an uncontested case that resolves quickly. A contested eviction in a tenant-protective state can exceed $10,000 and take 6–12 months. The only reliable way to prevent an eviction is to not place a tenant who will require one.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              At the same time, screening that is applied inconsistently or based on protected characteristics is the fastest route to a Fair Housing complaint — which carries fines up to $21,410 for a first offense and $53,524 for repeat offenses, plus private civil liability with no cap.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Good screening is objective, documented, consistent, and based on criteria that predict tenancy success — income, credit, rental history, and references. The 8 steps below achieve all of that.
            </p>
          </div>
        </section>

        {/* Quick Reference Table */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Screening Standards Quick Reference</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="divide-y divide-slate-800">
              {QUICK_REFERENCE.map((row) => (
                <div key={row.label} className="px-6 py-4 grid md:grid-cols-[180px,1fr,180px] gap-3 items-start">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-0.5">{row.label}</span>
                  <span className="text-slate-200 text-sm">{row.standard}</span>
                  <span className="text-xs text-slate-500 italic">{row.note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8 Steps */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-3">The 8-Step Screening Process</h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            Follow these steps in order for every applicant. Consistency is both good practice and your legal protection.
          </p>

          <div className="space-y-8">
            {SCREENING_STEPS.map((step) => (
              <div key={step.step} className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-10 h-10 bg-violet-600/10 border border-violet-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-violet-400 font-bold text-sm">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white pt-1.5">{step.title}</h3>
                </div>

                <p className="text-slate-300 leading-relaxed mb-6">{step.content}</p>

                {step.note && (
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mb-5">
                    <p className="text-amber-300 text-sm leading-relaxed">{step.note}</p>
                  </div>
                )}

                {(step.accepts.length > 0 || step.rejects.length > 0) && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {step.accepts.length > 0 && (
                      <div className="bg-green-500/5 border border-green-500/15 rounded-xl p-4">
                        <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-3">Accept</p>
                        <ul className="space-y-2">
                          {step.accepts.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                              <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {step.rejects.length > 0 && (
                      <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-4">
                        <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-3">Decline</p>
                        <ul className="space-y-2">
                          {step.rejects.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                              <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* How to Decline Without Violating FHA */}
        <section className="mb-16">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h2 className="text-2xl font-bold text-white">How to Decline an Applicant Without Violating the Fair Housing Act</h2>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              Every landlord who processes multiple applications will need to decline applicants. Done wrong, a decline can become a Fair Housing complaint. Done right, it is fully protected. The key is criteria-based, documented, consistent decision-making.
            </p>
            <div className="space-y-5">
              <div>
                <h3 className="font-semibold text-white mb-2">Before you accept any applications</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Write down your screening criteria and keep a copy. This document becomes your evidence that your standards existed before you saw any applicant. If your criteria are created or modified after you see an applicant, a fair housing investigator may conclude the criteria were created to exclude that applicant.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">What your denial letter must contain</h3>
                <p className="text-slate-300 text-sm leading-relaxed">State the specific, objective reason from your criteria: "Your application was denied because your gross monthly income of $X does not meet the required threshold of 3x monthly rent ($X)." Do not write: "We have decided to go in a different direction" or "The unit has been rented." If neither of those is true, vague decline language invites scrutiny.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">When you used a consumer report</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Send the FCRA adverse action notice simultaneously with or before your denial letter. Use a standard form from your screening service or legal counsel. Failure to send this notice is a separate FCRA violation with its own damages, independent of any Fair Housing issue.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">What you cannot say</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Do not reference children ("the unit is not suitable for families"), national origin ("we prefer tenants who speak English natively"), religion, disability, or any other protected characteristic — in writing, verbally, or in your advertising. Courts have found liability for verbal statements made during showings that were later recalled by witnesses.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-violet-600/5 border border-violet-500/20 rounded-3xl p-10 text-center mb-16">
          <h2 className="text-2xl font-bold text-white mb-3">Screen tenants with AI-assisted guidance</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            PropertyMind helps you build and apply consistent screening criteria, run applicants through a structured review process, and generate compliant decline letters — all from one dashboard.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-base transition-all shadow-lg shadow-violet-600/20"
          >
            Start free trial — no credit card
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-slate-500 text-xs mt-4">14-day free trial · Cancel anytime</p>
        </section>

        {/* Related Guides */}
        <section className="pt-8 border-t border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-6">Related Landlord Resources</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { href: '/guides/tenant-screening-checklist', title: 'Tenant Screening Checklist', desc: 'The item-by-item checklist to run alongside this guide.' },
              { href: '/guides/landlord-lease-clauses', title: '15 Lease Clauses Every Landlord Must Have', desc: 'Lock in your protections before the tenancy starts.' },
              { href: '/guides/landlord-tenant-laws-by-state', title: 'Landlord-Tenant Laws by State', desc: 'State-by-state breakdown of security deposits, notices, and eviction rules.' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 transition-colors group">
                <p className="font-medium text-white text-sm group-hover:text-violet-400 transition-colors mb-1.5">{link.title}</p>
                <p className="text-xs text-slate-500">{link.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 mt-20 py-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-violet-600 rounded-md flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="font-medium text-slate-300 text-sm">PropertyMind</span>
          </Link>
          <p className="text-xs text-slate-600">This guide is for informational purposes only. Not legal advice. Consult a qualified attorney for your specific situation.</p>
        </div>
      </footer>
    </div>
  )
}
