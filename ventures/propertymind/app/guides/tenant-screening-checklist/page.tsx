import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, ArrowRight, Shield, CheckCircle, AlertTriangle, UserCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tenant Screening Checklist: What to Check Before Signing a Lease',
  description:
    'A complete tenant screening checklist covering income verification, credit check, rental history, reference questions, and Fair Housing Act compliance — everything landlords need before signing a lease.',
  keywords: [
    'tenant screening checklist',
    'how to screen tenants',
    'tenant background check landlord',
    'fair housing tenant screening',
    'rental application checklist',
  ],
}

const CHECKLIST_SECTIONS = [
  {
    step: 1,
    title: 'Application Completeness',
    icon: CheckCircle,
    color: 'violet',
    items: [
      { item: 'Full legal name (as it will appear on the lease)', required: true },
      { item: 'Date of birth (for background check authorization)', required: true },
      { item: 'Current address and how long they have lived there', required: true },
      { item: 'Previous addresses for the past 3–5 years', required: true },
      { item: 'Current employer name, address, and phone number', required: true },
      { item: 'Monthly gross income (before taxes)', required: true },
      { item: 'All adults who will occupy the unit (names and DOBs)', required: true },
      { item: 'Emergency contact information', required: false },
      { item: 'Vehicle information (if parking is assigned)', required: false },
      { item: 'Signed authorization for credit and background check', required: true },
    ],
  },
  {
    step: 2,
    title: 'Income Verification',
    icon: CheckCircle,
    color: 'green',
    items: [
      { item: 'Last 2 pay stubs from current employer', required: true },
      { item: 'Most recent W-2 or tax return (for self-employed applicants)', required: true },
      { item: 'Bank statements — last 2–3 months (confirm income deposits)', required: false },
      { item: 'Offer letter (for applicants starting a new job)', required: false },
      { item: 'Calculate income-to-rent ratio: rent should not exceed 30–33% of gross monthly income', required: true },
      { item: 'For Section 8/voucher holders: confirm voucher amount and contact housing authority', required: false },
      { item: 'Verify self-employment income with CPA letter or 2 years of tax returns', required: false },
    ],
    note: 'The 30% income-to-rent rule: a tenant with $4,500/month gross income should qualify for up to $1,485/month rent. Many landlords use 2.5x–3x monthly rent as the income threshold (e.g., $4,500 income = qualifies for up to $1,800 rent at 2.5x). Be consistent — apply the same ratio to every applicant.',
  },
  {
    step: 3,
    title: 'Credit Check',
    icon: CheckCircle,
    color: 'violet',
    items: [
      { item: 'Pull full credit report via TransUnion, Experian, or Equifax (requires applicant consent)', required: true },
      { item: 'Check credit score — minimum threshold (if any) applied consistently to all applicants', required: true },
      { item: 'Review for prior evictions on credit report', required: true },
      { item: 'Review for collections, judgments, and charge-offs (especially utilities and previous landlords)', required: true },
      { item: 'Note bankruptcy filings — Chapter 7 vs. Chapter 13, and when discharged', required: true },
      { item: 'Check debt-to-income ratio if credit report shows high revolving debt', required: false },
      { item: 'Look for patterns vs. isolated incidents — one medical collection vs. multiple missed payments', required: false },
    ],
    note: 'Important: A blanket policy of rejecting all applicants below a certain credit score may have disparate impact on protected classes under the Fair Housing Act. HUD has issued guidance that screening criteria must be business-necessity justified and the minimum threshold must be consistently applied.',
  },
  {
    step: 4,
    title: 'Criminal Background Check',
    icon: AlertTriangle,
    color: 'yellow',
    items: [
      { item: 'Run background check through a reputable third-party screening service', required: true },
      { item: 'Review for convictions relevant to tenancy safety (violence, property crimes, drug manufacturing)', required: true },
      { item: 'Note the age and nature of any convictions — recent vs. years-old offenses', required: true },
      { item: 'Check sex offender registry', required: true },
      { item: 'Do NOT reject based on arrest record alone — HUD guidance prohibits using arrests as a basis for denial', required: true },
      { item: 'Apply individualized assessment — consider time elapsed, rehabilitation, and relevance', required: true },
    ],
    note: 'HUD\'s 2016 guidance (reaffirmed in recent years) states that blanket criminal history bans likely violate the Fair Housing Act due to disparate impact. You must conduct an individualized assessment considering: the nature and severity of the crime, the time elapsed since conviction, and the bearing on tenancy safety. Document your reasoning for every denial with a criminal history component.',
  },
  {
    step: 5,
    title: 'Rental History Verification',
    icon: CheckCircle,
    color: 'green',
    items: [
      { item: 'Contact previous landlord(s) directly — verify the number on the application, not one the applicant provides', required: true },
      { item: 'Confirm tenancy dates (move-in and move-out)', required: true },
      { item: 'Ask if rent was paid on time consistently', required: true },
      { item: 'Ask if there were any lease violations (unauthorized occupants, pet issues, noise)', required: true },
      { item: 'Ask if they would rent to this applicant again', required: true },
      { item: 'Check court records for eviction filings (even dismissed cases can indicate issues)', required: false },
      { item: 'Look up applicant and address on eviction search databases (e.g., Eviction Lab)', required: false },
      { item: 'Verify current living situation — confirm applicant actually lives there', required: false },
    ],
  },
  {
    step: 6,
    title: 'Reference Calls — Questions to Ask',
    icon: UserCheck,
    color: 'violet',
    items: [
      { item: '"Did [applicant] rent from you at [address]?"', required: true },
      { item: '"What were their move-in and move-out dates?"', required: true },
      { item: '"Was rent paid consistently on time? Were there any late payments?"', required: true },
      { item: '"Were there any complaints from neighbors or other tenants?"', required: true },
      { item: '"Was the unit returned in good condition? Were any deductions made from the security deposit?"', required: true },
      { item: '"Did they provide appropriate notice before vacating?"', required: false },
      { item: '"Would you rent to this tenant again?"', required: true },
      { item: '"Was there anything that caused concern during the tenancy?"', required: false },
    ],
    note: 'Some landlords coach applicants to list a friend as a "previous landlord." Verify the property ownership via county assessor records — search the address to confirm the person you\'re calling actually owned or managed the property.',
  },
  {
    step: 7,
    title: 'Fair Housing Act Compliance',
    icon: Shield,
    color: 'red',
    items: [
      { item: 'Never ask about protected characteristics: race, color, religion, sex, national origin, disability, or familial status', required: true },
      { item: 'Do not ask how many children an applicant has or their ages', required: true },
      { item: 'Do not ask about marital status, pregnancy, or sexual orientation (protected in many states)', required: true },
      { item: 'Apply the same written criteria consistently to every applicant', required: true },
      { item: 'Document the reason for every approval and denial in writing', required: true },
      { item: 'Process applications in the order received — "first come, first qualified" is the safest standard', required: true },
      { item: 'Do not require a higher deposit or co-signer from some applicants but not others without documented objective criteria', required: true },
      { item: 'Provide reasonable accommodations for applicants with disabilities (e.g., alternative income documentation)', required: true },
    ],
    note: 'The Fair Housing Act covers the application process, not just the lease. Discriminatory questions during screening — even if the applicant is ultimately approved — can form the basis of a complaint. In addition to the federal protected classes, many states and localities add additional classes: California adds source of income, sexual orientation, and gender identity; New York adds lawful source of income and prior criminal history; Illinois adds marital status and ancestry.',
  },
  {
    step: 8,
    title: 'Decision and Documentation',
    icon: CheckCircle,
    color: 'green',
    items: [
      { item: 'Apply your written screening criteria to the completed application', required: true },
      { item: 'Document the specific reasons for approval, conditional approval, or denial', required: true },
      { item: 'If denying based on credit, provide written Adverse Action Notice per FCRA requirements', required: true },
      { item: 'Adverse Action Notice must include: reason for denial, name of CRA used, applicant\'s right to free copy of report, right to dispute inaccuracies', required: true },
      { item: 'Keep all application materials and screening documentation for at least 3 years', required: true },
      { item: 'If approving with conditions (higher deposit, co-signer), document the objective criteria that triggered the condition', required: true },
    ],
    note: 'The Fair Credit Reporting Act (FCRA) requires an Adverse Action Notice within a reasonable time whenever you deny housing or take less favorable action based on a consumer report (credit, criminal background, eviction search). Failure to provide this notice exposes you to FCRA liability of $100–$1,000 per violation.',
  },
]

export default function TenantScreeningChecklistPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://propertymind.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://propertymind.vercel.app/guides' },
      { '@type': 'ListItem', position: 3, name: 'Tenant Screening Checklist: What to Check Before Signing a Lease' },
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
            <Link href="/guides/landlord-lease-clauses" className="text-sm text-slate-400 hover:text-white transition-colors hidden md:block">
              Lease Clauses Guide
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
          <span>Landlord Guides</span>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Tenant Screening Checklist</span>
        </div>

        {/* Header */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-600/10 border border-violet-500/20 rounded-full text-violet-400 text-xs font-medium mb-6">
            <UserCheck className="w-3 h-3" />
            Fair Housing Compliant Screening Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Tenant Screening Checklist:
            <span className="text-violet-400"> What to Check Before Signing a Lease</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mb-4">
            A complete, Fair Housing Act-compliant screening process covering income verification, credit, rental history, reference questions, criminal background, and documentation requirements.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>Updated March 2026</span>
            <span>·</span>
            <span>8 screening stages</span>
            <span>·</span>
            <span>Fair Housing compliant</span>
          </div>
        </header>

        {/* Intro */}
        <section className="mb-12">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-4">Why a Written Screening Process Protects You</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              A consistent, documented screening process does two things simultaneously: it helps you select reliable tenants and it protects you from Fair Housing Act complaints. Inconsistency — applying stricter criteria to some applicants than others — is the primary source of discrimination liability in the rental application process.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Before you start screening, write down your criteria: minimum income ratio, minimum credit score (if any), rental history requirements, and any other standards. Apply these identically to every applicant. When you make a decision, document why. This checklist will guide you through each stage.
            </p>
          </div>
        </section>

        {/* Main Checklist */}
        <section className="mb-16 space-y-8">
          {CHECKLIST_SECTIONS.map((section) => (
            <div key={section.step} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              {/* Section Header */}
              <div className={`flex items-center gap-4 px-6 py-5 border-b border-slate-800 ${
                section.color === 'red' ? 'bg-red-500/5' :
                section.color === 'yellow' ? 'bg-yellow-500/5' :
                section.color === 'green' ? 'bg-green-500/5' :
                'bg-violet-600/5'
              }`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm ${
                  section.color === 'red' ? 'bg-red-500/10 border border-red-500/20 text-red-400' :
                  section.color === 'yellow' ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400' :
                  section.color === 'green' ? 'bg-green-500/10 border border-green-500/20 text-green-400' :
                  'bg-violet-600/10 border border-violet-500/20 text-violet-400'
                }`}>
                  {section.step}
                </div>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </div>

              {/* Checklist Items */}
              <div className="px-6 py-5">
                <div className="space-y-3">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center ${
                        item.required
                          ? 'border-violet-500/40 bg-violet-600/10'
                          : 'border-slate-700 bg-slate-800/50'
                      }`}>
                        {item.required && <div className="w-2 h-2 rounded-sm bg-violet-400" />}
                      </div>
                      <div>
                        <p className={`text-sm leading-relaxed ${item.required ? 'text-slate-200' : 'text-slate-400'}`}>
                          {item.item}
                          {item.required && <span className="ml-2 text-xs text-violet-400 font-medium">Required</span>}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {section.note && (
                  <div className={`mt-5 p-4 rounded-xl text-sm leading-relaxed ${
                    section.color === 'red' ? 'bg-red-500/5 border border-red-500/20 text-red-300' :
                    section.color === 'yellow' ? 'bg-yellow-500/5 border border-yellow-500/20 text-yellow-300' :
                    'bg-slate-800/50 border border-slate-700 text-slate-400'
                  }`}>
                    <p className="font-medium text-white mb-1">Note</p>
                    {section.note}
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Downloadable Checklist CTA */}
        <section className="mb-16">
          <div className="bg-slate-900 border border-violet-500/20 rounded-2xl p-8">
            <div className="flex items-start gap-6 flex-col md:flex-row md:items-center">
              <div className="w-14 h-14 bg-violet-600/10 border border-violet-500/20 rounded-2xl flex items-center justify-center shrink-0">
                <UserCheck className="w-7 h-7 text-violet-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">PropertyMind Tenant Screening Reports</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Upload your applicant information and get a Fair Housing-compliant screening summary with income ratio analysis, red flag detection, and a clear approve/decline recommendation — in under 30 seconds. Includes the reference questions most likely to uncover the issues that standard credit checks miss.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-violet-600/20"
                  >
                    Start screening tenants with PropertyMind
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/api/inspection-checklist"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium rounded-xl text-sm transition-all"
                  >
                    Download screening checklist PDF
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Red Flags Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Rental History Red Flags — What to Watch For</h2>
          <p className="text-slate-400 mb-6 leading-relaxed">
            These patterns appear frequently in problem tenancies. None of them are automatic disqualifiers — Fair Housing requires individualized assessment — but each warrants a follow-up question or additional verification.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { flag: 'Short tenancies (under 6 months) with vague explanations', implication: 'May indicate prior eviction, non-renewal, or conflict pattern' },
              { flag: 'Landlord phone number goes directly to voicemail or is "not in service"', implication: 'May be coached reference — verify ownership via county assessor' },
              { flag: '"I left because of a bad landlord" without verifiable specifics', implication: 'Common explanation that avoids discussion of their own conduct' },
              { flag: 'Unable to provide any prior landlord contact information', implication: 'May indicate no formal tenancy, prior eviction, or coached application' },
              { flag: 'Income verification shows deposits inconsistent with claimed income', implication: 'Overstated income on application; verify source of funds' },
              { flag: 'Multiple credit inquiries in past 90 days from landlords', implication: 'May be applying broadly after being denied; worth asking why' },
              { flag: 'Utility collections on credit report', implication: 'Often indicates prior unit abandonment or early lease termination' },
              { flag: '"Left previous rental early" without buyout documentation', implication: 'Possible unauthorized early termination; ask for landlord confirmation' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="flex items-start gap-3 mb-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-white">{item.flag}</p>
                </div>
                <p className="text-xs text-slate-500 pl-7">{item.implication}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <section className="mb-16">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
            <h2 className="text-xl font-bold text-white mb-5">Fair Housing Quick Reference — What You Cannot Ask</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                'Race, color, or national origin',
                'Religion or religious practices',
                'Sex, gender identity, or sexual orientation',
                'Disability or nature of disability',
                'Familial status (presence of children)',
                'How many children, their ages, or school grade',
                'Marital status or relationship to other occupants',
                'Pregnancy or intention to have children',
                'Country of birth or immigration status',
                'Whether applicant receives housing assistance',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500/10 border border-red-500/20 rounded flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-0.5 bg-red-400 rounded-full" />
                  </div>
                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-5">
              Note: Several states and municipalities add additional protected classes beyond federal law. California adds source of income, sexual orientation, and gender identity. New York City adds lawful source of income and prior arrest/conviction history. Always check your local ordinances.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-violet-600/5 border border-violet-500/20 rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Screen your next applicant in under 2 minutes</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            PropertyMind generates Fair Housing-compliant screening reports with income analysis, rental history red flag detection, and recommended reference questions tailored to your applicant.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-base transition-all shadow-lg shadow-violet-600/20"
          >
            Start your free trial
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-slate-500 text-xs mt-4">14-day free trial · No credit card required</p>
        </section>

        {/* Related */}
        <section className="mt-16 pt-16 border-t border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-6">Related Resources</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { href: '/guides/landlord-lease-clauses', title: '15 Lease Clauses Every Landlord Must Have', desc: 'Protect yourself before and after signing.' },
              { href: '/guides/rent-increase-notice-by-state', title: 'Rent Increase Notice by State (2026)', desc: 'Required notice periods for all 50 states.' },
              { href: '/state-laws', title: 'State Law Quick Reference', desc: 'Security deposits, entry rights, rent control.' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 transition-colors group">
                <p className="font-medium text-white text-sm group-hover:text-violet-400 transition-colors mb-1.5">{link.title}</p>
                <p className="text-xs text-slate-500">{link.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 mt-10 py-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-violet-600 rounded-md flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="font-medium text-slate-300 text-sm">PropertyMind</span>
          </Link>
          <p className="text-xs text-slate-600">This guide is for informational purposes only. Not legal advice. Not a substitute for consulting a fair housing attorney.</p>
        </div>
      </footer>
    </div>
  )
}
