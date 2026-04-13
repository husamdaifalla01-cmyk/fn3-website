import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, ArrowRight, Shield, AlertTriangle, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Rent Increase Notice Requirements by State (2026 Guide)',
  description:
    'Complete table of rent increase notice requirements for all 50 states — required notice period, statute citation, rent control status, and maximum increase rules where applicable.',
  keywords: [
    'rent increase notice requirements',
    'how much notice for rent increase',
    'rent increase notice by state',
    'landlord rent increase law',
    'notice period rent increase 2026',
  ],
}

const STATE_DATA = [
  { state: 'Alabama', notice: '7 days (month-to-month)', fixedTerm: 'At renewal', rentControl: 'None', statute: 'Ala. Code § 35-9A-163', notes: 'No statewide cap' },
  { state: 'Alaska', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'None', statute: 'Alaska Stat. § 34.03.160', notes: 'No statewide cap' },
  { state: 'Arizona', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'None', statute: 'A.R.S. § 33-1348', notes: 'Rent control preempted by state law' },
  { state: 'Arkansas', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'None', statute: 'Ark. Code Ann. § 18-17-704', notes: 'No statewide cap' },
  { state: 'California', notice: '30 days (<10% increase) / 90 days (≥10% increase)', fixedTerm: 'At renewal', rentControl: 'AB 1482: max 5% + CPI, cap 10%', statute: 'Cal. Civ. Code § 827', notes: 'Local rent control also applies in many cities. AB 1482 exempts SFRs built after 2/1/1995 and units <15 years old.' },
  { state: 'Colorado', notice: '21 days', fixedTerm: 'At renewal', rentControl: 'None statewide; Denver has limited tenant protections', statute: 'C.R.S. § 38-12-701', notes: 'SB 23-184 changed notice requirements in 2024' },
  { state: 'Connecticut', notice: '3 days (weekly) / 30 days (monthly)', fixedTerm: 'At renewal', rentControl: 'Local (Hartford, New Haven)', statute: 'Conn. Gen. Stat. § 47a-14', notes: 'No statewide cap outside rent control municipalities' },
  { state: 'Delaware', notice: '60 days', fixedTerm: 'At renewal', rentControl: 'None', statute: '25 Del. C. § 5501', notes: 'Increased to 60 days in 2022' },
  { state: 'Florida', notice: '15 days', fixedTerm: 'At renewal', rentControl: 'Preempted by state law', statute: 'Fla. Stat. § 83.46', notes: 'Rent control ordinances were ruled unconstitutional in 2023' },
  { state: 'Georgia', notice: '60 days (recommended; no statute)', fixedTerm: 'At renewal', rentControl: 'None', statute: 'O.C.G.A. § 44-7-7', notes: 'No notice requirement in statute; 60 days is standard market practice' },
  { state: 'Hawaii', notice: '45 days', fixedTerm: 'At renewal', rentControl: 'None statewide; Maui County has emergency rules', statute: 'Haw. Rev. Stat. § 521-21', notes: 'No statewide cap' },
  { state: 'Idaho', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'Preempted by state law', statute: 'Idaho Code § 55-307', notes: 'No statewide cap' },
  { state: 'Illinois', notice: '30 days (Chicago: 30 days general, 90 days for seniors/disabled)', fixedTerm: 'At renewal', rentControl: 'Chicago: tenant protections apply', statute: '765 ILCS 720', notes: 'Chicago Residential Landlord Ordinance imposes additional notice rules' },
  { state: 'Indiana', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'None', statute: 'Ind. Code § 32-31-5-4', notes: 'No statewide cap' },
  { state: 'Iowa', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'None', statute: 'Iowa Code § 562A.13', notes: 'No statewide cap' },
  { state: 'Kansas', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'None', statute: 'K.S.A. § 58-2570', notes: 'No statewide cap' },
  { state: 'Kentucky', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'None', statute: 'KRS § 383.695', notes: 'No statewide cap' },
  { state: 'Louisiana', notice: '10 days (weekly) / 30 days (monthly)', fixedTerm: 'At renewal', rentControl: 'None', statute: 'La. R.S. § 9:3260', notes: 'No statewide cap' },
  { state: 'Maine', notice: '45 days', fixedTerm: 'At renewal', rentControl: 'None', statute: '14 M.R.S. § 6015', notes: 'Increased to 45 days in 2023' },
  { state: 'Maryland', notice: '90 days (Montgomery County: longer notice for seniors)', fixedTerm: 'At renewal', rentControl: 'Baltimore City, Takoma Park, Montgomery County', statute: 'Md. Code, Real Prop. § 8-401', notes: 'Statewide 90-day notice enacted 2023' },
  { state: 'Massachusetts', notice: 'One full rental period (typically 30 days)', fixedTerm: 'At renewal', rentControl: 'None statewide; Boston had rent control, repealed 1994', statute: 'M.G.L. c. 186 § 12', notes: 'No statewide cap; Cambridge/Somerville exploring local rules' },
  { state: 'Michigan', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'Preempted by state law', statute: 'MCL § 554.134', notes: 'No statewide cap' },
  { state: 'Minnesota', notice: '3 months (for tenants with >1 year tenancy)', fixedTerm: 'At renewal', rentControl: 'St. Paul: 3% cap; Minneapolis: ballot measure pending', statute: 'Minn. Stat. § 504B.155', notes: 'Longer notice requirement enacted 2023 for long-term tenants' },
  { state: 'Mississippi', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'None', statute: 'Miss. Code Ann. § 89-8-19', notes: 'No statewide cap' },
  { state: 'Missouri', notice: 'One rental period (typically 30 days)', fixedTerm: 'At renewal', rentControl: 'Preempted by state law', statute: 'Mo. Rev. Stat. § 441.060', notes: 'No statewide cap' },
  { state: 'Montana', notice: '15 days', fixedTerm: 'At renewal', rentControl: 'None', statute: 'Mont. Code Ann. § 70-24-313', notes: 'No statewide cap' },
  { state: 'Nebraska', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'None', statute: 'Neb. Rev. Stat. § 76-1414', notes: 'No statewide cap' },
  { state: 'Nevada', notice: '60 days', fixedTerm: 'At renewal', rentControl: 'None statewide', statute: 'NRS § 118A.300', notes: 'No statewide cap' },
  { state: 'New Hampshire', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'None', statute: 'RSA § 540-A:6', notes: 'No statewide cap' },
  { state: 'New Jersey', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'Many municipalities: Newark, Jersey City, Hoboken', statute: 'N.J.S.A. § 2A:18-61.1', notes: 'Anti-Eviction Protection Act limits grounds for non-renewal' },
  { state: 'New Mexico', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'None statewide; Santa Fe has limited protections', statute: 'NMSA 1978 § 47-8-15', notes: 'No statewide cap' },
  { state: 'New York', notice: '<1 yr tenancy: 30 days / 1–2 yr: 60 days / >2 yr: 90 days', fixedTerm: 'At renewal', rentControl: 'NYC: Rent Stabilization (RS) and Rent Control (RC)', statute: 'NY RPL § 226-c', notes: 'RS units: increases set annually by NYC Rent Guidelines Board. Notice tiers enacted 2019.' },
  { state: 'North Carolina', notice: '7 days (week-to-week) / 30 days (month-to-month)', fixedTerm: 'At renewal', rentControl: 'None', statute: 'N.C. Gen. Stat. § 42-46', notes: 'No statewide cap' },
  { state: 'North Dakota', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'None', statute: 'N.D. Cent. Code § 47-16-15', notes: 'No statewide cap' },
  { state: 'Ohio', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'Preempted by state law', statute: 'Ohio Rev. Code § 5321.13', notes: 'No statewide cap' },
  { state: 'Oklahoma', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'None', statute: '41 O.S. § 116', notes: 'No statewide cap' },
  { state: 'Oregon', notice: '90 days', fixedTerm: 'At renewal', rentControl: 'Statewide: 7% + CPI, max 10%', statute: 'ORS § 90.600', notes: 'First statewide rent control in US. Enacted 2019. Exempts units <15 years old.' },
  { state: 'Pennsylvania', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'None statewide; Philly has Longtime Owner Occupied Benefits', statute: '68 Pa. Cons. Stat. § 250.501', notes: 'No statewide cap' },
  { state: 'Rhode Island', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'None', statute: 'R.I. Gen. Laws § 34-18-16.1', notes: 'No statewide cap' },
  { state: 'South Carolina', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'Preempted by state law', statute: 'S.C. Code Ann. § 27-40-710', notes: 'No statewide cap' },
  { state: 'South Dakota', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'None', statute: 'SDCL § 43-32-13', notes: 'No statewide cap' },
  { state: 'Tennessee', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'Preempted by state law', statute: 'Tenn. Code Ann. § 66-28-512', notes: 'No statewide cap' },
  { state: 'Texas', notice: 'One rental period (typically 30 days)', fixedTerm: 'At renewal', rentControl: 'Preempted by state law (except during declared disaster)', statute: 'Tex. Prop. Code § 91.001', notes: 'No statewide cap. Emergency price gouging rules during disasters.' },
  { state: 'Utah', notice: '15 days', fixedTerm: 'At renewal', rentControl: 'Preempted by state law', statute: 'Utah Code Ann. § 57-22-4', notes: 'No statewide cap' },
  { state: 'Vermont', notice: '60 days (or lease term if <60 days)', fixedTerm: 'At renewal', rentControl: 'None', statute: '9 V.S.A. § 4467', notes: 'No statewide cap' },
  { state: 'Virginia', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'None statewide; Alexandria has limited rules', statute: 'Va. Code Ann. § 55.1-1204', notes: 'No statewide cap' },
  { state: 'Washington', notice: '20 days (<10%) / 180 days (≥10%)', fixedTerm: 'At renewal', rentControl: 'Seattle: winter eviction moratorium; no cap statewide', statute: 'RCW § 59.18.140', notes: 'HB 1110 (2023): 180-day notice for large increases' },
  { state: 'West Virginia', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'None', statute: 'W. Va. Code § 37-6-5', notes: 'No statewide cap' },
  { state: 'Wisconsin', notice: '28 days', fixedTerm: 'At renewal', rentControl: 'Preempted by state law', statute: 'Wis. Stat. § 704.19', notes: 'No statewide cap' },
  { state: 'Wyoming', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'None', statute: 'Wyo. Stat. Ann. § 1-21-1206', notes: 'No statewide cap' },
  { state: 'Washington D.C.', notice: '30 days', fixedTerm: 'At renewal', rentControl: 'Yes: CPI-based cap for covered units', statute: 'D.C. Code § 42-3502.08', notes: 'Extensive rent control. Exempts units built after 1975 and SFRs owned by small landlords.' },
]

const HIGH_RISK_STATES = ['California', 'New York', 'Oregon', 'Washington', 'New Jersey', 'Minnesota', 'Maryland', 'Washington D.C.']

export default function RentIncreaseNoticeByStatePage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://propertymind.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://propertymind.vercel.app/guides' },
      { '@type': 'ListItem', position: 3, name: 'Rent Increase Notice Requirements by State (2026 Guide)' },
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
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white text-lg tracking-tight">PropertyMind</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/state-laws" className="text-sm text-slate-400 hover:text-white transition-colors hidden md:block">
              State Law Reference
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

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-300 transition-colors">PropertyMind</Link>
          <span className="mx-2">/</span>
          <span>Landlord Guides</span>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Rent Increase Notice by State</span>
        </div>

        {/* Header */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-600/10 border border-violet-500/20 rounded-full text-violet-400 text-xs font-medium mb-6">
            <Shield className="w-3 h-3" />
            2026 Landlord Reference Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Rent Increase Notice Requirements by State
            <span className="text-violet-400"> (2026 Guide)</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mb-4">
            Required notice periods, statute citations, rent control status, and maximum increase rules for all 50 states and Washington D.C. — updated for 2026.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>Updated March 2026</span>
            <span>·</span>
            <span>All 50 states + D.C.</span>
            <span>·</span>
            <span>Statute citations included</span>
          </div>
        </header>

        {/* Intro / Key Facts */}
        <section className="mb-12">
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'States with rent control or caps', value: '~8', color: 'red', note: 'CA, OR, NY, NJ, MD, MN, WA D.C., + some cities' },
              { label: 'States requiring 60+ day notice', value: '9', color: 'yellow', note: 'DE, MD, MN, NV, NY (varies), OR, VT, WA, IL (some)' },
              { label: 'States with 30-day standard notice', value: '30+', color: 'green', note: 'Most states default to 30 days for month-to-month' },
            ].map((item) => (
              <div key={item.label} className={`bg-slate-900 border rounded-xl p-5 ${item.color === 'red' ? 'border-red-500/20' : item.color === 'yellow' ? 'border-yellow-500/20' : 'border-slate-800'}`}>
                <div className={`text-3xl font-bold mb-1 ${item.color === 'red' ? 'text-red-400' : item.color === 'yellow' ? 'text-yellow-400' : 'text-green-400'}`}>{item.value}</div>
                <div className="text-sm font-medium text-white mb-1">{item.label}</div>
                <div className="text-xs text-slate-500">{item.note}</div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-400 font-medium text-sm mb-1">High-Complexity States</p>
              <p className="text-slate-300 text-sm leading-relaxed">
                California, New York, Oregon, Washington, New Jersey, Minnesota, Maryland, and Washington D.C. have layered rent increase rules with state-level caps, local ordinances, and tiered notice requirements. If you own property in these states, verify your specific city and county rules in addition to the statewide statute.
              </p>
            </div>
          </div>
        </section>

        {/* Main Table */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">All 50 States + D.C. — Rent Increase Notice Requirements</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-xs uppercase tracking-wider">State</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-xs uppercase tracking-wider">Notice Required</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-xs uppercase tracking-wider">Rent Control</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-xs uppercase tracking-wider">Key Statute</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-xs uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {STATE_DATA.map((row) => {
                  const isHighRisk = HIGH_RISK_STATES.includes(row.state)
                  return (
                    <tr key={row.state} className={`hover:bg-slate-900/50 transition-colors ${isHighRisk ? 'bg-red-500/3' : ''}`}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{row.state}</span>
                          {isHighRisk && (
                            <span className="px-1.5 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded">Complex</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{row.notice}</td>
                      <td className="py-3.5 px-4">
                        {row.rentControl === 'None' || row.rentControl.startsWith('None') || row.rentControl.startsWith('Preempted') ? (
                          <span className="text-slate-500">{row.rentControl}</span>
                        ) : (
                          <span className="text-yellow-400">{row.rentControl}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-violet-400 text-xs font-mono">{row.statute}</td>
                      <td className="py-3.5 px-4 text-slate-400 text-xs">{row.notes}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* State Deep Dives */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Deep Dives: High-Complexity States</h2>
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
              <h3 className="text-xl font-semibold text-white mb-3">California</h3>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>California has a two-tier notice system under Civil Code § 827: increases of less than 10% require 30 days notice; increases of 10% or more require 90 days. This calculation is cumulative over the preceding 12 months — multiple smaller increases that total 10% or more trigger the 90-day rule.</p>
                <p>AB 1482 (Tenant Protection Act) caps annual rent increases at 5% + local CPI, with a maximum of 10%, for most units built before January 1, 2005. Single-family homes owned by corporate landlords and condos are also covered. Homes owned by individual landlords with fewer than two properties may qualify for an exemption if disclosed in writing.</p>
                <p>Many cities — including Los Angeles, San Francisco, Oakland, San Jose, and Santa Monica — have stricter local rent control with lower caps and "just cause" eviction requirements. Always check city ordinance in addition to state law.</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
              <h3 className="text-xl font-semibold text-white mb-3">New York</h3>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>The Housing Stability and Tenant Protection Act of 2019 (HSTPA) established tiered notice requirements based on tenancy length: tenants with less than one year of tenancy require 30 days notice; 1–2 year tenants require 60 days; tenants with more than 2 years require 90 days.</p>
                <p>New York City has two primary rent regulation programs: Rent Stabilization (covering ~1 million units built between 1947–1974 or those that received certain tax benefits) and Rent Control (a smaller, older program). Stabilization caps are set annually by the NYC Rent Guidelines Board — 2025 caps were 2.75% for one-year leases and 5.25% for two-year leases.</p>
                <p>New York City also requires "Good Cause Eviction" protections for most non-regulated tenants, effectively creating soft rent cap of 10% before a landlord can seek eviction for non-acceptance of an increase.</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
              <h3 className="text-xl font-semibold text-white mb-3">Oregon</h3>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>Oregon enacted the first statewide rent control in the U.S. in 2019 (HB 2001). Annual increases are capped at 7% plus the Consumer Price Index (CPI), with an absolute maximum of 10%, regardless of CPI. The cap applies to residential tenancies occupied for more than 12 months.</p>
                <p>Exemptions apply to units that received their Certificate of Occupancy within the prior 15 years, and to certain subsidized housing. The 90-day notice requirement applies to all covered units.</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
              <h3 className="text-xl font-semibold text-white mb-3">Washington</h3>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>Washington's HB 1110 (2023) created a bifurcated notice system: increases less than 10% require 20 days notice; increases of 10% or more require 180 days notice. This was a dramatic change — the prior standard was 30 days regardless of amount.</p>
                <p>No statewide rent cap exists, but the 180-day notice requirement for large increases effectively slows implementation. Seattle has additional tenant protections including restrictions on move-in fees and eviction rules.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">5 Common Rent Increase Mistakes That Cost Landlords Legal Standing</h2>
          <div className="space-y-4">
            {[
              { title: 'Wrong notice period', desc: 'The most common error. In multi-state portfolios, landlords often apply one state\'s rules to another. A 30-day notice in California for a 10% increase is legally invalid — it should be 90 days. Invalid notice means the increase cannot be enforced and you lose the right to collect the difference.' },
              { title: 'Notice sent mid-month', desc: 'In most states, the notice period runs from the next rent due date after delivery, not from the date of delivery. Sending a 30-day notice on the 15th often means a 45+ day effective wait. Some states require that notice be received by a specific date relative to the rent cycle.' },
              { title: 'Improper delivery method', desc: 'Most states specify how notice must be delivered — personal service, certified mail, first-class mail, or posting on the door. Emailing a rent increase notice is not valid service in most jurisdictions unless the lease specifically authorizes electronic notice.' },
              { title: 'Increasing rent during a fixed-term lease', desc: 'You cannot increase rent during a fixed-term lease without tenant consent unless your lease explicitly provides a mechanism for mid-term increases (CPI-adjustment clauses, for example). Attempting to increase rent mid-term is grounds for a material breach claim.' },
              { title: 'Retaliatory timing', desc: 'A rent increase issued within 60–120 days of a tenant filing a habitability complaint, requesting repairs, or organizing with other tenants is presumed retaliatory in most states. Even if the increase was planned, document your independent business rationale before issuing.' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-start gap-4">
                <div className="w-7 h-7 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-red-400 text-xs font-bold">{i + 1}</span>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">{item.title}</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-violet-600/5 border border-violet-500/20 rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Generate a state-specific rent increase notice in under 60 seconds</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            PropertyMind handles the correct notice period, legal language, and delivery instructions for your state automatically. No research required.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-base transition-all shadow-lg shadow-violet-600/20"
          >
            Generate your notice now
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-slate-500 text-xs mt-4">14-day free trial · No credit card required</p>
        </section>

        {/* Related */}
        <section className="mt-16 pt-16 border-t border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-6">Related Resources</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { href: '/guides/landlord-lease-clauses', title: '15 Lease Clauses Every Landlord Must Have', desc: 'The protective clauses and the dangerous ones.' },
              { href: '/guides/tenant-screening-checklist', title: 'Tenant Screening Checklist', desc: 'Fair Housing compliant screening process.' },
              { href: '/state-laws', title: 'State Law Quick Reference', desc: 'Security deposits, entry rights, and more by state.' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 transition-colors group">
                <p className="font-medium text-white text-sm group-hover:text-violet-400 transition-colors mb-1.5">{link.title}</p>
                <p className="text-xs text-slate-500">{link.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <p className="text-xs text-slate-600 text-center mt-12">
          This table is for informational purposes only and reflects laws as of March 2026. Laws change — always verify current statutes and consult a licensed attorney in your jurisdiction before issuing a rent increase notice.
        </p>
      </main>

      <footer className="border-t border-slate-800 mt-10 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-violet-600 rounded-md flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="font-medium text-slate-300 text-sm">PropertyMind</span>
          </Link>
          <p className="text-xs text-slate-600">© 2026 PropertyMind. All rights reserved. Not legal advice.</p>
        </div>
      </footer>
    </div>
  )
}
