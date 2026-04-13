'use client'

import { motion } from 'framer-motion'

const proofData = [
  {
    department: 'Sales',
    process: 'Proposal generation',
    before: '3 hours',
    after: '20 minutes',
    monthlySavings: '47 hours/month',
    savingsValue: '$3,760/mo',
  },
  {
    department: 'Operations',
    process: 'Weekly reporting',
    before: '6 hours',
    after: '12 minutes',
    monthlySavings: '95 hours/month',
    savingsValue: '$7,600/mo',
  },
  {
    department: 'Customer Support',
    process: 'Ticket triage & first response',
    before: '4 min/ticket',
    after: 'Instant',
    monthlySavings: '130 hours/month',
    savingsValue: '$5,200/mo',
  },
  {
    department: 'Marketing',
    process: 'Content drafting (blog/social)',
    before: '5 hours/piece',
    after: '25 minutes',
    monthlySavings: '72 hours/month',
    savingsValue: '$5,760/mo',
  },
  {
    department: 'Finance',
    process: 'Invoice processing & reconciliation',
    before: '2.5 hours',
    after: '8 minutes',
    monthlySavings: '53 hours/month',
    savingsValue: '$4,240/mo',
  },
  {
    department: 'Sales',
    process: 'Lead qualification & scoring',
    before: '45 min/lead',
    after: '90 seconds',
    monthlySavings: '88 hours/month',
    savingsValue: '$7,040/mo',
  },
  {
    department: 'Operations',
    process: 'Onboarding new clients',
    before: '3 hours',
    after: '22 minutes',
    monthlySavings: '62 hours/month',
    savingsValue: '$4,960/mo',
  },
  {
    department: 'Marketing',
    process: 'SEO audit & optimization',
    before: '8 hours',
    after: '35 minutes',
    monthlySavings: '45 hours/month',
    savingsValue: '$3,600/mo',
  },
]

const deptColors: Record<string, string> = {
  Sales: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  Operations: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'Customer Support': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Marketing: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  Finance: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
}

export default function ROIProof() {
  return (
    <section id="roi-proof" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
            Real Deployment Numbers
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight">
            Real numbers from real deployments
          </h2>
          <p className="text-text-secondary mt-4 text-lg max-w-2xl mx-auto">
            Every row below is a process we have automated for a client. These are median results — not best-case.
          </p>
        </motion.div>

        {/* Table — desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="hidden md:block bg-surface border border-white/[0.08] rounded-2xl overflow-hidden shadow-card"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08] bg-surface-2/60">
                <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Department</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Process automated</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Time before</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Time after</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Monthly savings</th>
              </tr>
            </thead>
            <tbody>
              {proofData.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="border-b border-white/[0.05] hover:bg-surface-2/40 transition-colors duration-150 group"
                >
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${deptColors[row.department] || 'text-text-secondary bg-surface-3 border-white/10'}`}>
                      {row.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary group-hover:text-text-primary transition-colors">{row.process}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-red-400/80 font-medium line-through decoration-red-400/40">{row.before}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-emerald-400 font-semibold">{row.after}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm font-bold gradient-text">{row.savingsValue}</div>
                    <div className="text-[11px] text-text-muted">{row.monthlySavings}</div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {/* Source note */}
          <div className="px-6 py-4 border-t border-white/[0.05] bg-surface-2/30 flex items-center justify-between">
            <p className="text-xs text-text-muted">
              Based on median results across 12 deployments, Q4 2025. Hourly savings valued at $80/hr blended rate.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <svg className="w-3.5 h-3.5 text-accent/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Verified by FN3 founders
            </div>
          </div>
        </motion.div>

        {/* Cards — mobile */}
        <div className="md:hidden space-y-4">
          {proofData.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-surface border border-white/[0.08] rounded-xl p-5 shadow-card"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${deptColors[row.department] || 'text-text-secondary bg-surface-3 border-white/10'}`}>
                  {row.department}
                </span>
                <span className="text-sm font-bold gradient-text">{row.savingsValue}</span>
              </div>
              <p className="text-sm text-text-primary font-medium mb-3">{row.process}</p>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-red-400/80 line-through">{row.before}</span>
                <svg className="w-3.5 h-3.5 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
                <span className="text-emerald-400 font-semibold">{row.after}</span>
                <span className="text-text-muted ml-auto">{row.monthlySavings}</span>
              </div>
            </motion.div>
          ))}
          <p className="text-xs text-text-muted text-center pt-2">
            Based on median results across 12 deployments, Q4 2025.
          </p>
        </div>

        {/* Aggregate callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 grid sm:grid-cols-3 gap-4"
        >
          {[
            { value: '12', label: 'Deployments measured', sub: 'Q4 2025 cohort' },
            { value: '$42K+', label: 'Avg monthly savings', sub: 'across all departments' },
            { value: '6.2 wks', label: 'Median payback period', sub: 'setup cost recovered' },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface border border-white/[0.08] rounded-xl p-5 text-center shadow-card">
              <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-text-primary">{stat.label}</div>
              <div className="text-xs text-text-muted mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
