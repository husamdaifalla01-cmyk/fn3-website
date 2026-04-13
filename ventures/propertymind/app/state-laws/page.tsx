'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, ArrowRight, Shield, AlertTriangle, CheckCircle, ChevronDown } from 'lucide-react'

const STATE_LAW_DATA: Record<string, {
  securityDeposit: string
  depositStatute: string
  depositReturn: string
  entryNotice: string
  entryStatute: string
  emergencyEntry: string
  rentControl: string
  habitability: string
  habitabilityStatute: string
  antiRetaliationDays: number
  selfHelpEviction: string
  notableRules: string[]
}> = {
  'Alabama': {
    securityDeposit: '1 month\'s rent',
    depositStatute: 'Ala. Code § 35-9A-201',
    depositReturn: '35 days after move-out',
    entryNotice: '2 days',
    entryStatute: 'Ala. Code § 35-9A-303',
    emergencyEntry: 'Immediate for emergency',
    rentControl: 'None — state law does not authorize rent control',
    habitability: 'Implied warranty of habitability — landlord must maintain fit and habitable premises',
    habitabilityStatute: 'Ala. Code § 35-9A-204',
    antiRetaliationDays: 30,
    selfHelpEviction: 'Prohibited — must use court process',
    notableRules: ['No rent control', '35-day deposit return window', '2-day entry notice required'],
  },
  'Alaska': {
    securityDeposit: '2 months\' rent',
    depositStatute: 'Alaska Stat. § 34.03.070',
    depositReturn: '14 days (with itemization) / 30 days (with deductions)',
    entryNotice: '24 hours',
    entryStatute: 'Alaska Stat. § 34.03.140',
    emergencyEntry: 'Immediate for emergency',
    rentControl: 'None',
    habitability: 'Landlord must maintain premises in habitable condition — Alaska URLTA applies',
    habitabilityStatute: 'Alaska Stat. § 34.03.100',
    antiRetaliationDays: 90,
    selfHelpEviction: 'Prohibited',
    notableRules: ['High security deposit cap (2 months)', '24-hour entry notice', 'Strong anti-retaliation protections'],
  },
  'Arizona': {
    securityDeposit: '1.5 months\' rent',
    depositStatute: 'A.R.S. § 33-1321',
    depositReturn: '14 days after move-out',
    entryNotice: '48 hours',
    entryStatute: 'A.R.S. § 33-1343',
    emergencyEntry: 'Immediate for emergency',
    rentControl: 'Preempted by state law — cities cannot enact rent control',
    habitability: 'Landlord must maintain habitable premises per Arizona ARLTA',
    habitabilityStatute: 'A.R.S. § 33-1324',
    antiRetaliationDays: 60,
    selfHelpEviction: 'Prohibited',
    notableRules: ['Rent control preempted statewide', '14-day deposit return', '48-hour entry notice'],
  },
  'California': {
    securityDeposit: '2 months\' rent (unfurnished) / 3 months\' (furnished) — AB 12 (2024): 1 month unfurnished, 2 months furnished',
    depositStatute: 'Cal. Civ. Code § 1950.5',
    depositReturn: '21 days after move-out with itemized statement',
    entryNotice: '24 hours (written preferred)',
    entryStatute: 'Cal. Civ. Code § 1954',
    emergencyEntry: 'Immediate for fire, flood, or emergency',
    rentControl: 'AB 1482: 5% + CPI, max 10% for units 15+ years old. Many cities: lower caps (LA: 3%, SF: CPI-based, Oakland: 3%)',
    habitability: 'Strict warranty of habitability. Tenant may repair-and-deduct up to 1 month\'s rent. Tenant may withhold rent for serious habitability violations.',
    habitabilityStatute: 'Cal. Civ. Code § 1941, § 1942',
    antiRetaliationDays: 180,
    selfHelpEviction: 'Strictly prohibited — $100/day minimum damages',
    notableRules: [
      'AB 12 (2024): reduced deposit cap to 1 month unfurnished',
      'AB 1482: rent caps for most units 15+ years old',
      '180-day anti-retaliation window',
      'Repair-and-deduct remedy up to 1 month rent',
      'Local ordinances often stricter than state (LA, SF, Oakland, San Jose)',
    ],
  },
  'Colorado': {
    securityDeposit: 'No statutory cap',
    depositStatute: 'C.R.S. § 38-12-102',
    depositReturn: '30 days (or lease term if shorter)',
    entryNotice: '24 hours',
    entryStatute: 'C.R.S. § 38-12-1000',
    emergencyEntry: 'Immediate for emergency',
    rentControl: 'None statewide. Denver has tenant screening ordinance.',
    habitability: 'Warranty of habitability — HB 21-1121 strengthened tenant remedies significantly',
    habitabilityStatute: 'C.R.S. § 38-12-503',
    antiRetaliationDays: 90,
    selfHelpEviction: 'Prohibited',
    notableRules: ['No deposit cap', 'Strengthened habitability statute (2021)', '24-hour entry notice', 'Denver tenant screening protections'],
  },
  'Florida': {
    securityDeposit: 'No statutory cap',
    depositStatute: 'Fla. Stat. § 83.49',
    depositReturn: '15 days (if no deductions) / 30 days (with deductions)',
    entryNotice: '12 hours',
    entryStatute: 'Fla. Stat. § 83.53',
    emergencyEntry: 'Immediate for emergency',
    rentControl: 'Preempted — 2023 court ruling struck down local rent control ordinances',
    habitability: 'Landlord must maintain premises in compliance with building codes affecting health and safety',
    habitabilityStatute: 'Fla. Stat. § 83.51',
    antiRetaliationDays: 90,
    selfHelpEviction: 'Prohibited — triple damages for self-help eviction',
    notableRules: [
      'No deposit cap — but must hold in separate account',
      '12-hour entry notice (shorter than most states)',
      'Rent control preempted statewide',
      'Triple damages for self-help eviction',
    ],
  },
  'New York': {
    securityDeposit: '1 month\'s rent (statewide standard post-HSTPA 2019)',
    depositStatute: 'NY RPL § 7-108',
    depositReturn: '14 days after move-out with itemized statement',
    entryNotice: 'Reasonable notice (no specific statutory period; 24 hours standard)',
    entryStatute: 'NY RPL § 235-b',
    emergencyEntry: 'Immediate for emergency',
    rentControl: 'NYC: Rent Stabilization (~1M units); Rent Control (older, smaller program). NYC RGB sets annual increases.',
    habitability: 'Strict warranty of habitability. Tenant may withhold rent or petition for rent reduction. HPD enforcement in NYC.',
    habitabilityStatute: 'NY RPL § 235-b',
    antiRetaliationDays: 90,
    selfHelpEviction: 'Strictly prohibited — significant damages exposure',
    notableRules: [
      '1-month deposit cap statewide (HSTPA 2019)',
      '14-day deposit return window (HSTPA 2019)',
      'Tiered notice for non-renewal: 30/60/90 days by tenancy length',
      'Good Cause Eviction protections in many areas',
      'NYC has extensive tenant rights beyond state baseline',
    ],
  },
  'Texas': {
    securityDeposit: 'No statutory cap',
    depositStatute: 'Tex. Prop. Code § 92.102',
    depositReturn: '30 days after move-out with itemized deductions',
    entryNotice: 'Reasonable notice (no specific statutory requirement)',
    entryStatute: 'Tex. Prop. Code § 92.0081',
    emergencyEntry: 'Immediate for emergency',
    rentControl: 'Preempted by state law (with exception during declared disaster)',
    habitability: 'Landlord must maintain premises in compliance with applicable codes. Specific duties listed in Texas Property Code.',
    habitabilityStatute: 'Tex. Prop. Code § 92.052–92.061',
    antiRetaliationDays: 90,
    selfHelpEviction: 'Prohibited',
    notableRules: [
      'No deposit cap',
      'No statutory entry notice period — "reasonable notice" standard',
      'Rent control preempted (emergency exception)',
      '30-day deposit return with itemized deductions',
      'Tenant remedies: repair-and-deduct, lease termination for serious habitability issues',
    ],
  },
  'Washington': {
    securityDeposit: 'No statutory cap — but detailed move-in inspection required',
    depositStatute: 'RCW § 59.18.260',
    depositReturn: '21 days after move-out',
    entryNotice: '48 hours (general) / 24 hours (repairs)',
    entryStatute: 'RCW § 59.18.150',
    emergencyEntry: 'Immediate for emergency',
    rentControl: 'None statewide. Seattle: various tenant protections, winter eviction moratorium.',
    habitability: 'Landlord must maintain premises in habitable condition. Tenant may repair-and-deduct for essential services.',
    habitabilityStatute: 'RCW § 59.18.060',
    antiRetaliationDays: 90,
    selfHelpEviction: 'Prohibited',
    notableRules: [
      'HB 1110 (2023): 180-day notice for rent increases ≥10%',
      '48-hour entry notice standard',
      'Written move-in checklist required for deposit retention',
      'Seattle has additional tenant protections',
      'No statewide rent cap but long notice period for large increases',
    ],
  },
  'Illinois': {
    securityDeposit: 'No statutory cap statewide. Chicago: no cap but interest accrues on deposits held 6+ months.',
    depositStatute: '765 ILCS 720',
    depositReturn: '30 days after move-out (statewide) / 30 days with itemization (Chicago)',
    entryNotice: 'Reasonable notice (statewide). Chicago: 2 days.',
    entryStatute: '765 ILCS 735/5; Chicago RLTO § 5-12-050',
    emergencyEntry: 'Immediate for emergency',
    rentControl: 'Chicago has tenant protections; no rent cap. State law preempts rent control.',
    habitability: 'Implied warranty of habitability. Chicago RLTO provides additional tenant remedies.',
    habitabilityStatute: '765 ILCS 735; Chicago RLTO § 5-12-110',
    antiRetaliationDays: 90,
    selfHelpEviction: 'Prohibited',
    notableRules: [
      'Chicago RLTO adds significant requirements for Chicago landlords',
      'Chicago: interest must accrue on security deposits',
      'Chicago: 30-day notice for some rent increases; 90 days for seniors/disabled',
      'State law preempts rent control outside Chicago exemptions',
    ],
  },
}

const US_STATES = Object.keys(STATE_LAW_DATA).sort()

export default function StateLawsPage() {
  const [selectedState, setSelectedState] = useState<string>('')
  const data = selectedState ? STATE_LAW_DATA[selectedState] : null

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
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

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-300 transition-colors">PropertyMind</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">State Law Quick Reference</span>
        </div>

        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-600/10 border border-violet-500/20 rounded-full text-violet-400 text-xs font-medium mb-6">
            <Shield className="w-3 h-3" />
            Landlord Legal Reference Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            State Law Quick Reference
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Security deposit limits, required notice periods, rent control status, landlord entry rights, and habitability standards — by state, with statute citations.
          </p>
        </header>

        {/* State Selector */}
        <section className="mb-10">
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-slate-300 mb-2">Select your state</label>
            <div className="relative">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3.5 pr-10 text-base appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent cursor-pointer"
              >
                <option value="">Choose a state...</option>
                {US_STATES.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
            {!selectedState && (
              <p className="text-xs text-slate-500 mt-2 text-center">
                Detailed data available for {US_STATES.length} states. Full 50-state rent increase notice table →{' '}
                <Link href="/guides/rent-increase-notice-by-state" className="text-violet-400 hover:text-violet-300">view guide</Link>
              </p>
            )}
          </div>
        </section>

        {/* State Data Cards */}
        {data && selectedState && (
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-white">{selectedState} — Landlord Law Reference</h2>
            </div>

            {/* Security Deposit */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-violet-600/10 border border-violet-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Security Deposit</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wide">Maximum Deposit</p>
                  <p className="text-slate-200 text-sm font-medium">{data.securityDeposit}</p>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wide">Return Timeline</p>
                  <p className="text-slate-200 text-sm font-medium">{data.depositReturn}</p>
                </div>
              </div>
              <div className="mt-3 px-1">
                <p className="text-xs text-violet-400 font-mono">{data.depositStatute}</p>
              </div>
            </div>

            {/* Landlord Entry Rights */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Landlord Entry Rights</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wide">Standard Notice</p>
                  <p className="text-slate-200 text-sm font-medium">{data.entryNotice}</p>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wide">Emergency Entry</p>
                  <p className="text-slate-200 text-sm font-medium">{data.emergencyEntry}</p>
                </div>
              </div>
              <div className="mt-3 px-1">
                <p className="text-xs text-violet-400 font-mono">{data.entryStatute}</p>
              </div>
            </div>

            {/* Rent Control */}
            <div className={`border rounded-2xl p-6 ${data.rentControl.startsWith('None') || data.rentControl.startsWith('Preempted') ? 'bg-green-500/3 border-green-500/20' : 'bg-yellow-500/5 border-yellow-500/20'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${data.rentControl.startsWith('None') || data.rentControl.startsWith('Preempted') ? 'bg-green-500/10 border border-green-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'}`}>
                  <CheckCircle className={`w-5 h-5 ${data.rentControl.startsWith('None') || data.rentControl.startsWith('Preempted') ? 'text-green-400' : 'text-yellow-400'}`} />
                </div>
                <h3 className="text-lg font-semibold text-white">Rent Control Status</h3>
              </div>
              <p className={`text-sm leading-relaxed ${data.rentControl.startsWith('None') || data.rentControl.startsWith('Preempted') ? 'text-green-300' : 'text-yellow-300'}`}>
                {data.rentControl}
              </p>
            </div>

            {/* Habitability */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-slate-700 border border-slate-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-slate-300" />
                </div>
                <h3 className="text-lg font-semibold text-white">Habitability Standards</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-2">{data.habitability}</p>
              <p className="text-xs text-violet-400 font-mono">{data.habitabilityStatute}</p>
            </div>

            {/* Anti-Retaliation & Self-Help */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wide">Anti-Retaliation Window</p>
                <p className="text-2xl font-bold text-white mb-1">{data.antiRetaliationDays} days</p>
                <p className="text-xs text-slate-400">Rent increases within this window after a tenant complaint are presumed retaliatory</p>
              </div>
              <div className="bg-slate-900 border border-red-500/20 rounded-xl p-5">
                <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wide">Self-Help Eviction</p>
                <p className="text-sm font-bold text-red-400 mb-1">{data.selfHelpEviction}</p>
                <p className="text-xs text-slate-400">Changing locks, removing belongings, or cutting utilities to force a tenant out</p>
              </div>
            </div>

            {/* Notable Rules */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Key Rules for {selectedState} Landlords</h3>
              <div className="space-y-2.5">
                {data.notableRules.map((rule, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300">{rule}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-violet-600/5 border border-violet-500/20 rounded-2xl p-7 flex flex-col md:flex-row items-start md:items-center gap-5">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1.5">Generate your {selectedState}-specific lease and notices</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  PropertyMind applies {selectedState} law automatically — correct notice periods, statute citations, and compliant language for every document you generate.
                </p>
              </div>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-violet-600/20 whitespace-nowrap shrink-0"
              >
                Try PropertyMind free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        )}

        {/* Empty state */}
        {!selectedState && (
          <section className="text-center py-16">
            <div className="w-16 h-16 bg-violet-600/10 border border-violet-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-violet-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-3">Select a state above to view its landlord laws</h2>
            <p className="text-slate-400 max-w-md mx-auto mb-8">
              Detailed data on security deposits, entry rights, rent control, and habitability standards — with statute citations you can verify.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/guides/rent-increase-notice-by-state" className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-sm transition-colors">
                All 50 states: rent increase notice table
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/guides/landlord-lease-clauses" className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-sm transition-colors">
                Lease clause guide
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        )}

        {/* Related Resources */}
        <section className="mt-16 pt-16 border-t border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-6">Landlord Resource Guides</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { href: '/guides/landlord-lease-clauses', title: '15 Lease Clauses Every Landlord Must Have', desc: 'Protective clauses and dangerous ones.' },
              { href: '/guides/rent-increase-notice-by-state', title: 'Rent Increase Notice by State (2026)', desc: 'All 50 states with statute citations.' },
              { href: '/guides/tenant-screening-checklist', title: 'Tenant Screening Checklist', desc: 'Fair Housing compliant screening process.' },
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
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-violet-600 rounded-md flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="font-medium text-slate-300 text-sm">PropertyMind</span>
          </Link>
          <p className="text-xs text-slate-600">For informational purposes only. Not legal advice. Verify statutes with your state\'s official code before acting.</p>
        </div>
      </footer>
    </div>
  )
}
