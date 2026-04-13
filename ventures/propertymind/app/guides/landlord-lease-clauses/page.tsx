import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, CheckCircle, AlertTriangle, ArrowRight, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: '15 Lease Clauses Every Landlord Must Have (And 5 That Get You Sued)',
  description:
    'A landlord-focused guide to the 15 protective lease clauses that prevent costly disputes — and the 5 clauses that routinely expose landlords to tenant lawsuits and liability.',
  keywords: [
    'landlord lease clauses',
    'lease agreement clauses',
    'lease clause examples',
    'landlord protection clauses',
    'lease clause liability',
  ],
}

const MUST_HAVE_CLAUSES = [
  {
    number: 1,
    title: 'Late Fee Language',
    content:
      'A properly written late fee clause specifies the exact dollar amount, the grace period (typically 3–5 days), and whether the fee compounds daily after a certain threshold. Vague language like "a reasonable late fee will apply" is routinely unenforceable. Many states cap late fees at a percentage of monthly rent (California: 5–6% is typical; Texas: no statutory cap but courts void "unreasonable" fees). Write it out: "A late fee of $75 will be assessed on the 6th day of the month. An additional $10/day will accrue for each day rent remains unpaid after the 10th."',
  },
  {
    number: 2,
    title: 'Security Deposit Terms',
    content:
      'Beyond the deposit amount, specify: what the deposit may be applied toward (unpaid rent, damages beyond normal wear-and-tear, cleaning costs, unreturned keys), the return timeline per state law, and the itemization requirement. Courts in California, New York, and Massachusetts have penalized landlords 2–3x the deposit amount for failing to comply with return timelines — even when the deductions themselves were legitimate.',
  },
  {
    number: 3,
    title: 'Entry Notice Requirements',
    content:
      'Most states require 24–48 hours written notice before landlord entry (California, New York, and Illinois: 24 hours minimum; Florida: 12 hours). Your lease should mirror the statute and specify the permitted purposes (repairs, inspections, showing the unit). Emergency entry exceptions should also be defined. Entering without notice — even for legitimate reasons — can constitute constructive eviction in some states.',
  },
  {
    number: 4,
    title: 'Pet Policy',
    content:
      'A complete pet clause covers: permitted pet types and sizes, pet deposit amount (separate from security deposit), monthly pet rent, breed restrictions, number of pets, damage liability language, and the consequence for unauthorized pets. Note: emotional support animals (ESAs) and service animals are NOT covered by pet policies — they are governed by the Fair Housing Act regardless of any "no pets" clause.',
  },
  {
    number: 5,
    title: 'Maintenance Responsibility Matrix',
    content:
      'Ambiguity about who fixes what generates more landlord-tenant disputes than almost any other lease issue. Your lease should explicitly assign responsibility for: appliances (landlord-owned vs. tenant-owned), HVAC filter changes, pest control, lawn/landscaping, minor repairs under a dollar threshold, and smoke detector batteries. Courts generally default to landlord liability when the lease is silent.',
  },
  {
    number: 6,
    title: 'Subletting and Assignment Prohibition',
    content:
      'Without an explicit prohibition, tenants in many states may sublet freely. Your clause should state that subletting, roommate additions, and assignment of the lease all require prior written landlord consent. Specify that unauthorized occupants constitute a material lease breach and grounds for eviction. This also protects you from Airbnb liability.',
  },
  {
    number: 7,
    title: 'Early Termination Penalty',
    content:
      'A well-drafted early termination clause protects you from tenants who walk mid-lease. Common structures: liquidated damages equal to 2 months rent, requirement to continue paying rent until a replacement tenant is found (up to the lease end), or a flat buy-out fee. Without this clause, your damages may be limited to your actual losses — which you must document and prove.',
  },
  {
    number: 8,
    title: 'Lease Renewal and Rent Increase Notice',
    content:
      'Specify the lease renewal terms clearly: does the lease auto-renew (month-to-month or fixed term), what notice is required to non-renew, and what process governs rent increases on renewal. Some states (New York, California, Oregon) have mandatory renewal notice requirements for long-term tenants — your lease should not contradict these. A good clause sets the procedural expectation from day one.',
  },
  {
    number: 9,
    title: 'Alterations and Modifications',
    content:
      'Tenants routinely paint walls, hang shelves, install fixtures, or change locks without permission. Your clause should require written landlord approval for any alteration, specify that unauthorized changes must be restored to original condition at tenant expense, and include language about who owns improvements (landlord, as a default, in most states). Define what constitutes an "alteration" — even nail holes above a threshold count.',
  },
  {
    number: 10,
    title: 'Smoking Policy',
    content:
      'Specify whether smoking is permitted anywhere on the property — including outdoor common areas, balconies, and garages. Smoke damage (nicotine staining, odor remediation) can cost $3,000–$8,000 per unit and is explicitly excluded from "normal wear and tear" in most jurisdictions, making it recoverable from the deposit. Your lease must say so explicitly.',
  },
  {
    number: 11,
    title: 'Renter\'s Insurance Requirement',
    content:
      'Requiring tenants to carry renter\'s insurance (typically $15–$25/month) shifts liability for tenant-caused damage, theft, and certain injuries away from your landlord policy. Specify the minimum coverage amount ($100,000 liability is standard), require you to be listed as an additional interested party, and mandate proof of coverage before occupancy. Without this, your policy absorbs costs it should not.',
  },
  {
    number: 12,
    title: 'Reporting Maintenance Issues Promptly',
    content:
      'A clause requiring tenants to report maintenance issues within a specific timeframe (e.g., within 24 hours for water/heat/safety issues) creates a documented obligation that strengthens your defense if a minor issue escalates into a major loss. "Tenant failed to report the slow leak for 6 weeks" is not a defense without a clause establishing the reporting duty.',
  },
  {
    number: 13,
    title: 'Right to Inspect with Proper Notice',
    content:
      'Beyond entry notice, specify your right to conduct periodic inspections (move-in, mid-lease, move-out) with appropriate notice periods. Scheduled inspections catch lease violations, unreported damage, and unauthorized occupants — and their documentation is critical evidence if disputes arise at move-out.',
  },
  {
    number: 14,
    title: 'Holdover Provisions',
    content:
      'A holdover clause governs what happens when a tenant remains in the unit after the lease ends without signing a renewal. Without one, state law controls — which often defaults to a month-to-month tenancy at the same rent. A well-drafted holdover clause can specify a higher holdover rate (1.5–2x monthly rent is common) and preserve your right to evict on short notice.',
  },
  {
    number: 15,
    title: 'Governing Law and Attorney Fees',
    content:
      'Specify that the lease is governed by the law of the state where the property is located, and — where permitted — include a prevailing-party attorney fees clause. Some states (California, for instance) limit fee-shifting in residential leases, but where enforceable, it deters frivolous tenant lawsuits and small-dollar disputes that would otherwise be uneconomical to defend.',
  },
]

const DANGEROUS_CLAUSES = [
  {
    number: 1,
    title: 'Waiving the Implied Warranty of Habitability',
    danger: 'Unenforceable in all 50 states',
    content:
      'Language like "Tenant accepts the property in as-is condition and waives all claims related to property condition" is void as a matter of public policy in every U.S. jurisdiction. Courts routinely strike it — and some judges treat its presence as evidence of bad faith, which can result in enhanced damages. You cannot contract around the duty to maintain habitable conditions.',
  },
  {
    number: 2,
    title: 'Overbroad Entry Rights',
    danger: 'Constructive eviction risk',
    content:
      'A clause granting you the right to enter "at any time for any reason" directly conflicts with state tenant protection statutes. Even if your lease says it, courts will apply the statutory minimum notice requirement — and if you exercise the overbroad language, you may face claims of harassment, invasion of privacy, or constructive eviction. California has assessed $1,000+ per incident in small claims cases for illegal entries.',
  },
  {
    number: 3,
    title: 'Automatic Lease Renewal Without Notice',
    danger: 'Tenant trap — and often unenforceable',
    content:
      'A clause that automatically renews the lease for another full fixed term without any tenant action — and without requiring you to provide advance notice — has been voided in multiple states. Courts view these as unconscionable where the renewal mechanism is buried in fine print. In California, New York, and Illinois, there are affirmative disclosure requirements for automatic renewal clauses. If unenforceable, you may lose your right to hold the tenant to the new term AND face statutory damages.',
  },
  {
    number: 4,
    title: 'Waiving the Right to a Security Deposit Accounting',
    danger: 'Statutory penalty of 2–3x deposit',
    content:
      'Clauses stating "Landlord may retain the security deposit for any reason at landlord\'s discretion" or that waive the itemized accounting requirement are unenforceable in virtually every state. More dangerously, many states impose automatic penalties of 2–3x the deposit amount for non-compliance — regardless of whether the underlying deductions were legitimate. The clause itself can trigger the penalty.',
  },
  {
    number: 5,
    title: 'Shifting Statutory Landlord Duties to Tenants',
    danger: 'Void and creates Fair Housing exposure',
    content:
      'Language that attempts to make tenants responsible for maintaining structural elements, common areas, plumbing, or electrical systems — duties assigned to landlords by statute — is void. More dangerously, if such clauses are applied selectively (e.g., only to certain tenants), they can form the basis of a Fair Housing Act disparate impact claim. Document every maintenance obligation assignment carefully, and never include clauses that contradict your jurisdiction\'s landlord-tenant code.',
  },
]

export default function LandlordLeaseClausesPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://propertymind.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://propertymind.vercel.app/guides' },
      { '@type': 'ListItem', position: 3, name: '15 Lease Clauses Every Landlord Must Have (And 5 That Get You Sued)' },
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
            <Link href="/guides/rent-increase-notice-by-state" className="text-sm text-slate-400 hover:text-white transition-colors hidden md:block">
              Rent Increase Guide
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
          <span className="text-slate-300">Lease Clauses</span>
        </div>

        {/* Header */}
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-600/10 border border-violet-500/20 rounded-full text-violet-400 text-xs font-medium mb-6">
            <Shield className="w-3 h-3" />
            Landlord Resource Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            15 Lease Clauses Every Landlord Must Have
            <span className="text-red-400"> (And 5 That Get You Sued)</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
            Most lease disputes come down to one thing: missing or unenforceable lease language. This guide covers the 15 clauses that protect you from the most common landlord-tenant conflicts — and the 5 that routinely backfire in court.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-slate-500">
            <span>Updated March 2026</span>
            <span>·</span>
            <span>~15 min read</span>
            <span>·</span>
            <span>Covers all 50 states</span>
          </div>
        </header>

        {/* Intro */}
        <section className="mb-16 prose prose-invert max-w-none">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Why Lease Language Matters More Than You Think</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              The average residential lease used by independent landlords has 3–5 clauses that either create unintended landlord liability, fail to protect against predictable tenant behaviors, or are outright unenforceable under state law. The consequences range from losing a security deposit dispute to facing a Fair Housing Act complaint.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              A well-drafted lease is not about being aggressive toward tenants. It is about being precise. Courts enforce clear, specific language. They strike vague, overbroad, or contradictory clauses — and when they do, they typically default to tenant-protective interpretations.
            </p>
            <p className="text-slate-300 leading-relaxed">
              The clauses below are drawn from thousands of lease disputes, court decisions, and state landlord-tenant statutes. None of them substitute for a qualified real estate attorney reviewing your specific lease — but understanding them will help you ask better questions and catch the most common problems.
            </p>
          </div>
        </section>

        {/* The 15 Must-Have Clauses */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">The 15 Clauses That Protect You</h2>
          </div>

          <div className="space-y-8">
            {MUST_HAVE_CLAUSES.map((clause) => (
              <div key={clause.number} className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-violet-600/10 border border-violet-500/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-violet-400 text-sm font-bold">{clause.number}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">{clause.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{clause.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The 5 Dangerous Clauses */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">The 5 Clauses That Get Landlords Sued</h2>
          </div>
          <p className="text-slate-400 mb-8 leading-relaxed">
            These clauses appear in real leases used by real landlords today. All five are either unenforceable, void under state law, or actively create liability. Their presence signals to courts and opposing counsel that the landlord is either uninformed or acting in bad faith.
          </p>

          <div className="space-y-8">
            {DANGEROUS_CLAUSES.map((clause) => (
              <div key={clause.number} className="bg-red-500/5 border border-red-500/20 rounded-2xl p-7">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-red-400 text-sm font-bold">{clause.number}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-semibold text-white">{clause.title}</h3>
                      <span className="px-2.5 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium rounded-full">
                        {clause.danger}
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{clause.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-16">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">What to Do With This Information</h2>
            <div className="space-y-4">
              {[
                'Pull your current lease and check it against the 15 protective clauses. Missing language in even one area creates exposure.',
                'Review the 5 dangerous clauses against your lease text. If any of them appear in any form, have them removed before your next signing.',
                'State law supersedes your lease. When in doubt, look up your jurisdiction\'s landlord-tenant statute. Your local bar association or legal aid organization can help.',
                'Analyze every new lease you receive from a tenant or management company. PropertyMind\'s lease analyzer flags problematic clauses and missing protections in under 30 seconds.',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-violet-400 mt-0.5 shrink-0" />
                  <p className="text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-violet-600/5 border border-violet-500/20 rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Analyze your lease in 30 seconds</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            PropertyMind flags missing protections, risky clauses, and jurisdiction-specific issues — before they become a $4,200 problem.
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
        <section className="mt-16 pt-16 border-t border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-6">Related Landlord Resources</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { href: '/guides/rent-increase-notice-by-state', title: 'Rent Increase Notice Requirements by State (2026)', desc: 'Notice periods, statute citations, and max increase rules for all 50 states.' },
              { href: '/guides/tenant-screening-checklist', title: 'Tenant Screening Checklist', desc: 'What to check before signing a lease — Fair Housing compliant.' },
              { href: '/state-laws', title: 'State Law Quick Reference', desc: 'Security deposit limits, entry rights, and rent control by state.' },
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
