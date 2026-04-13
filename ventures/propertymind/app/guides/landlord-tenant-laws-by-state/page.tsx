import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, ArrowRight, Shield, MapPin, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Landlord-Tenant Laws by State: The Complete 2026 Comparison',
  description:
    'Security deposit rules, notice periods, entry rights, habitability standards, and eviction procedures for the 10 most landlord-relevant states — plus an overview of the federal framework that applies everywhere.',
  keywords: [
    'landlord tenant laws by state',
    'tenant rights by state',
    'landlord tenant law',
    'state landlord tenant law comparison',
    'security deposit laws by state',
  ],
}

const STATE_PROFILES = [
  {
    state: 'California',
    abbr: 'CA',
    securityDeposit: '2 months (unfurnished) / 3 months (furnished). Must be returned within 21 days of move-out with itemized deductions. Penalty: 2x deposit for bad-faith withholding.',
    noticePeriods: '30 days to terminate month-to-month (tenancy <1 year); 60 days (tenancy ≥1 year). 3-day notice for nonpayment. Rent increase: 30 days for <10%, 90 days for ≥10%.',
    entryRights: '24 hours written notice required except in emergencies. Entry must be during normal business hours. No exceptions for repeated "quick checks."',
    habitability: 'Strong implied warranty. Landlord must maintain weatherproofing, plumbing, heating, electrical, and common areas. Tenants may repair-and-deduct (up to 1 month\'s rent) after reasonable notice.',
    eviction: '3-day notice for nonpayment, 3-day cure-or-quit for lease violations, 30/60-day no-fault notice. AB 1482 requires "just cause" for evictions in covered buildings. Unlawful detainer hearing within 20 days.',
    notes: 'AB 1482 caps rent increases at 5% + CPI (max 10%) for covered units. Local rent control in Los Angeles, San Francisco, Oakland, and dozens of other cities adds additional layers.',
  },
  {
    state: 'New York',
    abbr: 'NY',
    securityDeposit: '1 month maximum statewide (Housing Stability and Tenant Protection Act 2019). Return within 14 days of vacating with itemized statement. Failure: forfeiture of right to deductions.',
    noticePeriods: '30 days (tenancy <1 year); 60 days (1–2 years); 90 days (≥2 years). 14-day notice for nonpayment. Landlord must accept late rent through 5th day.',
    entryRights: 'No statewide statute specifying notice period, but landlords must provide "reasonable" notice. Courts typically enforce 24 hours. Entries without notice can support harassment claims.',
    habitability: 'Warranty of habitability is non-waivable. HPD (NYC) and local code enforcement agencies can issue violations directly to landlords. Rent abatement available for uninhabitable conditions.',
    eviction: '14-day pay-or-quit notice. 10-day cure-or-quit for other violations. Full eviction requires court proceeding. Self-help eviction (changing locks, removing belongings) is illegal and carries treble damages.',
    notes: 'Rent stabilization covers approximately 1 million NYC apartments. Good Cause Eviction law (2024) extends just-cause protections broadly across the state. Highly tenant-protective jurisdiction.',
  },
  {
    state: 'Texas',
    abbr: 'TX',
    securityDeposit: 'No statutory cap. Return within 30 days with itemized deductions. Penalty for bad-faith withholding: 3x deposit plus $100 and attorney fees.',
    noticePeriods: 'Month-to-month: 1 month notice by either party (waivable by agreement). Nonpayment: 3-day notice (unless lease specifies longer). No statewide rent control.',
    entryRights: 'No statutory notice period specified. However, entries without consent can constitute a "lockout" claim. Lease should specify reasonable notice (24–48 hours recommended).',
    habitability: 'Landlord must make diligent efforts to repair conditions that materially affect health/safety after written notice. Tenant remedies: repair-and-deduct (up to 1 month), rent withholding, or termination — after 7-day cure period.',
    eviction: '3-day notice for nonpayment. Written notice of breach required before eviction for other violations. Justice of the Peace court handles eviction filings. Writ of possession issues after judgment.',
    notes: 'Texas preempts local rent control ordinances. No statewide limit on late fees, though courts void "unreasonable" amounts. Generally considered a landlord-friendly state compared to the coasts.',
  },
  {
    state: 'Florida',
    abbr: 'FL',
    securityDeposit: 'No statutory cap. Landlord must hold deposit in a separate account (or purchase surety bond) and notify tenant in writing within 30 days of where it is held. Return within 15 days if no deductions; 30 days with deductions.',
    noticePeriods: 'Month-to-month: 15-day notice. Nonpayment: 3-day notice (excluding weekends and legal holidays). Lease termination for other violations: 7-day cure or 7-day unconditional quit.',
    entryRights: '12 hours notice required. Entry during 7:30 a.m.–8:00 p.m. period only, unless emergency or tenant consents. Landlord may not abuse entry rights to harass.',
    habitability: 'Landlord must maintain property in compliance with building codes and in good repair. Tenant must give 7 days written notice before exercising repair-and-deduct remedy (max $500 or half monthly rent).',
    eviction: '3-day nonpayment notice, 7-day cure or unconditional notice for other violations. County court eviction filing. Landlord-friendly courts; typical eviction timeline is 3–5 weeks for uncontested cases.',
    notes: 'Rent control ordinances ruled unconstitutional statewide in 2023. No just-cause eviction requirement. Florida consistently ranks as one of the most landlord-friendly states.',
  },
  {
    state: 'Washington',
    abbr: 'WA',
    securityDeposit: 'No statutory cap. Must be held in a trust account. Return within 30 days (21 days in some cities). Itemized statement required. Non-refundable fees must be disclosed in writing.',
    noticePeriods: 'Month-to-month: 20 days. Nonpayment: 14-day notice. For cause violations: 10-day cure notice. Just-cause eviction required for many tenancy types under 2021 law.',
    entryRights: '2 days (48 hours) notice required. Entry must be at reasonable times. Emergency exception applies. Seattle adds additional tenant protections beyond state law.',
    habitability: 'Landlord must keep premises fit for human habitation and in compliance with applicable codes. Duty is non-waivable. Tenant remedies include rent withholding after 10-day notice to landlord.',
    eviction: 'Just Cause Eviction Act (2021) applies to month-to-month tenancies and fixed-term renewals in most cases. Grounds must be stated in writing. Non-payment, lease violations, owner move-in, and substantial renovation are recognized just causes.',
    notes: 'Seattle has its own additional tenant protections including mandatory payment plans for overdue rent and winter eviction limitations. One of the more tenant-protective states in the West.',
  },
  {
    state: 'Oregon',
    abbr: 'OR',
    securityDeposit: 'No statutory cap. Accounting statement required at the start of tenancy documenting pre-existing damage. Return within 31 days. Failure: tenant may recover twice the deposit.',
    noticePeriods: 'Month-to-month: 30 days (no-cause, first year); 90 days (no-cause, after first year of tenancy). Nonpayment: 72-hour or 144-hour notice depending on notice type. Statewide rent control applies.',
    entryRights: '24 hours notice required. Emergency exception. Oregon courts treat repeated short-notice entries as harassment.',
    habitability: 'Non-waivable warranty. Landlord must maintain premises in habitable condition. Tenant may repair-and-deduct after 7-day notice for emergency repairs; 30-day notice for non-emergency.',
    eviction: 'Just-cause eviction required after first year of tenancy. Accepted grounds: nonpayment, lease violations (with cure opportunity), substantial damage, end of employment relationship (for employee housing), owner move-in. Portland adds additional tenant relocation assistance requirements.',
    notes: 'Oregon\'s rent control law (2019) caps annual rent increases at 7% + CPI for buildings over 15 years old. One of a small number of states with statewide rent control.',
  },
  {
    state: 'Illinois',
    abbr: 'IL',
    securityDeposit: 'No statewide cap. Chicago: landlord must hold in an interest-bearing account. Return within 30 days (45 days if deductions). Penalty for wrongful withholding: 2x deposit + attorney fees (Chicago).',
    noticePeriods: 'Month-to-month: 30 days. Nonpayment: 5-day notice. Lease violation: 10-day cure notice. Chicago requires 30-day notice for lease non-renewal for tenants with 1+ year tenancy.',
    entryRights: 'No statewide notice statute; Chicago: 2 days notice. Courts generally apply a 24-hour standard outside Chicago. Emergency exceptions.',
    habitability: 'Non-waivable warranty under the Chicago Residential Landlord-Tenant Ordinance (RLTO). Statewide: courts apply implied warranty. Chicago tenants may withhold rent, repair-and-deduct, or terminate for habitability failures.',
    eviction: 'Statewide: 5-day pay-or-quit, 10-day cure-or-quit. Chicago RLTO adds additional procedural requirements. Cook County courts handle evictions; generally 4–8 weeks for uncontested proceedings.',
    notes: 'Chicago\'s RLTO is among the most comprehensive tenant protection ordinances in the country. Landlords with properties in Chicago must know the RLTO as well as state law. Evanston and other suburbs have their own ordinances.',
  },
  {
    state: 'Colorado',
    abbr: 'CO',
    securityDeposit: 'No statutory cap. Return within 30 days (60 days if lease specifies). After 1 year, landlord must provide written statement of reasons for deductions. Penalty: treble damages for willful retention.',
    noticePeriods: 'Month-to-month: 21 days (SB 23-184, effective 2024). Nonpayment: 10-day notice (changed from 3-day in 2023). Lease violation: 10-day cure notice.',
    entryRights: '24 hours notice required. Must be at reasonable times. Denver has additional tenant-protective measures.',
    habitability: 'Non-waivable warranty. HB 22-1399 (2022) strengthened tenant rights and created a state-level process for habitability complaints. Repair-and-deduct up to $2,000 after 14-day notice.',
    eviction: '10-day pay-or-quit (post-2023 reform). Cure-or-quit for other violations. County court filing. HB 21-1121 added additional protections against retaliatory evictions. Denver has its own supplemental ordinances.',
    notes: 'Colorado significantly strengthened tenant protections in 2021–2024. The shift from 3-day to 10-day nonpayment notice was a major change landlords must observe. Denver and Boulder have additional local protections.',
  },
  {
    state: 'Arizona',
    abbr: 'AZ',
    securityDeposit: 'Capped at 1.5 months rent. Return within 14 business days. Itemized statement required. Double damages for wrongful withholding.',
    noticePeriods: 'Month-to-month: 30 days. Nonpayment: 5-day notice. Other lease violations: 10-day cure notice; 5-day unconditional quit for materially irreparable violations.',
    entryRights: '2 days (48 hours) notice required, except in emergencies. Entry between 8 a.m.–6 p.m. only unless agreed otherwise.',
    habitability: 'Non-waivable warranty. Landlord has 10 days to remedy after written notice (5 days for emergency conditions). Tenant may terminate if landlord fails to remedy. Repair-and-deduct capped at $300 or half monthly rent.',
    eviction: '5-day pay-or-quit for nonpayment. 10-day cure for other violations. Justice court eviction proceedings. Arizona generally handles evictions within 3–6 weeks for uncontested cases.',
    notes: 'Rent control is preempted by state law. Arizona is generally considered landlord-friendly with clear statutory processes. The A.R.S. Title 33 Residential Landlord-Tenant Act is the primary statute.',
  },
  {
    state: 'Georgia',
    abbr: 'GA',
    securityDeposit: 'No statutory cap. No statutory requirement on where deposit is held. Return within 30 days (with itemized list) or 1 month (if landlord provides list within 3 days).',
    noticePeriods: 'No statutory notice requirement for rent increases. Month-to-month termination: 60 days is standard practice though not legislatively mandated. Nonpayment: demand for possession before dispossessory filing.',
    entryRights: 'No statutory notice requirement. Courts apply a reasonableness standard. Recommended: 24 hours written notice.',
    habitability: 'Implied warranty recognized by courts. Landlord must maintain property fit for the use intended. Tenant remedies are somewhat limited compared to other states — repair-and-deduct is not clearly authorized by statute.',
    eviction: 'Dispossessory process: landlord files in magistrate court after proper demand. Summary proceedings; typical timeline 2–4 weeks for uncontested cases. No just-cause eviction requirement.',
    notes: 'Georgia has minimal landlord-tenant statutory framework compared to most states. This can be a double-edged sword: fewer requirements, but also less clarity. The lease contract controls in most disputes.',
  },
]

export default function LandlordTenantLawsByStatePage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://propertymind.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://propertymind.vercel.app/guides' },
      { '@type': 'ListItem', position: 3, name: 'Landlord-Tenant Laws by State: The Complete 2026 Comparison' },
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
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white text-lg tracking-tight">PropertyMind</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/state-laws" className="text-sm text-slate-400 hover:text-white transition-colors hidden md:block">
              50-State Reference Tool
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

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-300 transition-colors">PropertyMind</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-slate-300 transition-colors">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Landlord-Tenant Laws by State</span>
        </div>

        {/* Header */}
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-600/10 border border-violet-500/20 rounded-full text-violet-400 text-xs font-medium mb-6">
            <MapPin className="w-3 h-3" />
            State Law Comparison
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Landlord-Tenant Laws by State:<br />
            <span className="text-violet-400">The Complete 2026 Comparison</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
            Security deposits, notice periods, entry rights, habitability requirements, and eviction procedures vary dramatically by state. Here is what landlords need to know about the 10 highest-impact jurisdictions — plus the federal framework that applies everywhere.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-slate-500">
            <span>Updated March 2026</span>
            <span>·</span>
            <span>~18 min read</span>
            <span>·</span>
            <span>10 state deep dives</span>
          </div>
        </header>

        {/* Federal Framework */}
        <section className="mb-16">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-5">The Federal Framework: What Applies in Every State</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Before diving into state-specific rules, landlords need to understand the federal laws that supersede state and local statutes. These apply regardless of which state your property is in.
            </p>
            <div className="space-y-5 mt-6">
              <div className="flex gap-4">
                <div className="w-1 bg-violet-500/40 rounded-full shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Fair Housing Act (FHA)</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">Prohibits discrimination based on race, color, national origin, religion, sex, familial status, and disability. Applies to advertising, tenant screening, lease terms, and enforcement. Many states and cities add protected classes — sexual orientation, source of income, and veteran status are common additions.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 bg-violet-500/40 rounded-full shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Americans with Disabilities Act (ADA) + Fair Housing Amendments Act</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">Requires landlords to allow reasonable modifications for tenants with disabilities (at tenant expense, generally). Reasonable accommodations in rules and policies are also required — this is why "no pets" policies cannot be applied to service animals and emotional support animals.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 bg-violet-500/40 rounded-full shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Lead Paint Disclosure (EPA/HUD)</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">Properties built before 1978 must include the EPA lead paint disclosure form and the "Protect Your Family from Lead in Your Home" pamphlet in every lease signing. Failure to disclose can result in fines up to $16,773 per violation and civil liability.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 bg-violet-500/40 rounded-full shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">SCRA (Servicemembers Civil Relief Act)</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">Active-duty military personnel may terminate a lease with 30-days written notice (plus deployment orders) regardless of lease terms. A landlord cannot charge early termination penalties or hold SCRA terminations against a tenant in court.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Read the Profiles */}
        <section className="mb-12">
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-slate-300 text-sm leading-relaxed">
              <span className="text-amber-400 font-medium">Important: </span>
              State laws change. Local ordinances frequently add requirements that exceed state law — always check your city and county in addition to the state profile. These summaries are for orientation, not legal advice. Consult a licensed attorney in your jurisdiction before making compliance decisions.
            </p>
          </div>
        </section>

        {/* State Profiles */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-3">10 State Deep Dives</h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            The profiles below cover the five categories most relevant to independent landlords: security deposit rules, required notice periods, entry rights, habitability duties, and the eviction process.
          </p>

          <div className="space-y-10">
            {STATE_PROFILES.map((profile) => (
              <div key={profile.abbr} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-4 px-7 py-5 border-b border-slate-800 bg-slate-900/50">
                  <div className="w-12 h-12 bg-violet-600/10 border border-violet-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-violet-400 font-bold text-sm">{profile.abbr}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{profile.state}</h3>
                  </div>
                </div>

                <div className="divide-y divide-slate-800">
                  {[
                    { label: 'Security Deposit', content: profile.securityDeposit },
                    { label: 'Notice Periods', content: profile.noticePeriods },
                    { label: 'Entry Rights', content: profile.entryRights },
                    { label: 'Habitability', content: profile.habitability },
                    { label: 'Eviction Process', content: profile.eviction },
                    { label: 'Key Notes', content: profile.notes },
                  ].map((row) => (
                    <div key={row.label} className="px-7 py-5 grid md:grid-cols-[160px,1fr] gap-3">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider pt-0.5">{row.label}</span>
                      <p className="text-slate-300 text-sm leading-relaxed">{row.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Comparison Summary */}
        <section className="mb-16">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">What the Comparison Reveals</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-semibold text-white mb-2">Security Deposit Caps Vary from None to 2 Months</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Arizona caps deposits at 1.5x monthly rent. California caps at 2x (unfurnished). New York caps at 1x. Texas, Florida, and Georgia have no cap. The higher the cap, the more leverage you have — but the more procedural compliance the return process requires.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Nonpayment Notice Periods: 3 to 14 Days</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Texas (3 days), Florida (3 days), and Arizona (5 days) allow fast action. Colorado reformed from 3 days to 10 days in 2023. New York requires 14 days. California requires 3 days. If cash flow is a concern, state nonpayment notice requirements are a material factor in where to invest.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Just-Cause Eviction is Expanding</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Oregon (2019), California (AB 1482, 2020), Washington (2021), and New York (Good Cause, 2024) have all enacted just-cause eviction protections at the state level. These laws limit your ability to terminate tenancies without a legally recognized reason, even at the end of a lease term.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Local Law Can Override Everything</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Chicago, Los Angeles, San Francisco, Seattle, Portland, and Denver all have ordinances that provide greater tenant protections than state law. A California landlord outside Los Angeles has different obligations than one inside the city. Always layer city/county rules on top of the state profile.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-violet-600/5 border border-violet-500/20 rounded-3xl p-10 text-center mb-16">
          <h2 className="text-2xl font-bold text-white mb-3">Get instant answers for your specific state</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            PropertyMind knows the landlord-tenant law for all 50 states — and responds to your specific situation with jurisdiction-aware guidance. No more legal research rabbit holes.
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
              { href: '/guides/landlord-lease-clauses', title: '15 Lease Clauses Every Landlord Must Have', desc: 'The protective clauses courts enforce — and 5 that get landlords sued.' },
              { href: '/guides/rent-increase-notice-by-state', title: 'Rent Increase Notice Requirements by State', desc: 'Required notice periods and rent control rules for all 50 states.' },
              { href: '/guides/how-to-screen-tenants', title: 'How to Screen Tenants: The Complete Guide', desc: '8-step screening process with Fair Housing compliance guidance.' },
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
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
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
