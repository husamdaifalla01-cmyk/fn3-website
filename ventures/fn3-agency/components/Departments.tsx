'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const departments = [
  {
    id: 'sales',
    name: 'Sales',
    agentCount: 8,
    color: '#7c5cfc',
    bgColor: 'rgba(124, 92, 252, 0.1)',
    borderColor: 'rgba(124, 92, 252, 0.2)',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
    tagline: 'Never miss a lead again.',
    description: 'Your AI sales team works the pipeline 24/7 — qualifying inbound leads, running outreach sequences, drafting proposals, and following up with every prospect on the exact right cadence.',
    capabilities: [
      'Lead qualifier — scores and routes every inbound lead',
      'Proposal generator — drafts tailored proposals in minutes',
      'Follow-up sequence — multi-touch cadences on exact timing',
      'Deal room summarizer — condenses call notes and next steps',
      'CRM updater — keeps HubSpot/Salesforce clean automatically',
      'Forecast reporter — weekly pipeline and revenue projections',
      'Competitive intel — tracks competitor moves and pricing',
      'Win/loss analyzer — diagnoses why deals close or fall apart',
    ],
    metrics: ['3.2x more follow-ups', '67% faster response time', '$180K avg pipeline added'],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    agentCount: 9,
    color: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.1)',
    borderColor: 'rgba(6, 182, 212, 0.2)',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
      </svg>
    ),
    tagline: 'Content that never stops publishing.',
    description: 'A content engine that executes your marketing calendar, optimizes for search, manages email campaigns, and writes ad copy — consistently, on brand, without waiting for someone to have time.',
    capabilities: [
      'Content calendar agent — executes your publishing schedule daily',
      'SEO optimizer — researches keywords and optimizes every page',
      'Email campaign manager — segments, writes, and sends campaigns',
      'Ad copy generator — tests headlines and copy across channels',
      'Social media scheduler — queues and publishes across platforms',
      'Brand voice enforcer — keeps all output on-tone and consistent',
      'Competitor monitor — tracks what competitors publish and rank for',
      'Analytics reporter — weekly performance summaries with insights',
      'Newsletter automator — builds and sends your subscriber digest',
    ],
    metrics: ['5x content output', '40% lower CAC', '2.8x email open rates'],
  },
  {
    id: 'support',
    name: 'Customer Support',
    agentCount: 10,
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.2)',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    tagline: '4.9 stars. Zero human tickets needed.',
    description: 'Your support team handles every ticket, every FAQ, every frustrated customer — at 3am or 3pm — with the patience and consistency no human support rep can sustain. Escalates the right things to the right people.',
    capabilities: [
      'Ticket intake agent — triages and categorizes every support request',
      'Resolution agent — handles common issues without human input',
      'Knowledge base manager — keeps FAQs and docs current',
      'Churn risk detector — flags at-risk customers for proactive outreach',
      'Sentiment monitor — reads tone across all conversations and alerts',
      'Refund enforcer — applies policy consistently on every claim',
      'Check-in campaigner — proactively reaches out to quiet customers',
      'CSAT tracker — collects and reports satisfaction scores automatically',
      'Multi-channel router — unifies email, chat, and Slack support',
      'Onboarding agent — guides new customers through activation steps',
    ],
    metrics: ['92% first-touch resolution', '4.9/5 avg CSAT', '80% fewer escalations'],
  },
  {
    id: 'operations',
    name: 'Operations',
    agentCount: 9,
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.2)',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
      </svg>
    ),
    tagline: 'The operational backbone you never had.',
    description: 'Documentation written, vendors managed, reports generated, schedules kept — operations runs like a Fortune 500 back office without the overhead of one.',
    capabilities: [
      'SOW generator — drafts scopes of work from project briefs',
      'Project tracker — monitors milestones and flags slippage',
      'Vendor communicator — manages supplier follow-ups and POs',
      'Invoice processor — routes, codes, and approves invoices',
      'Timeline monitor — alerts on deadline risk before it happens',
      'Resource allocator — matches team capacity to project demand',
      'Status reporter — auto-generates weekly progress updates',
      'Risk flagging — surfaces blockers and escalation triggers',
      'Onboarding coordinator — runs new hire and client onboarding',
    ],
    metrics: ['30hrs/week saved', '100% report on time', 'Zero dropped balls'],
  },
  {
    id: 'legal',
    name: 'Legal',
    agentCount: 6,
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.2)',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97Zm-12.5 0L8.87 15.696c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97Z" />
      </svg>
    ),
    tagline: 'Contracts reviewed. Compliance monitored.',
    description: 'Legal risk doesn\'t wait for your lawyer to be available. Your legal agents review contracts for red flags, monitor regulatory changes, and flag compliance risks before they become problems.',
    capabilities: [
      'Contract reviewer — flags red flags and suggests redlines',
      'Compliance monitor — tracks regulatory requirements and alerts',
      'Risk scorer — rates every agreement by legal exposure level',
      'NDA/MSA manager — generates and routes standard templates',
      'Regulatory tracker — monitors law changes affecting your industry',
      'IP monitor — watches for trademark and copyright infringement',
    ],
    metrics: ['80% faster contract review', 'Zero compliance misses', '$40K avg legal savings'],
  },
  {
    id: 'finance',
    name: 'Finance',
    agentCount: 6,
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
    borderColor: 'rgba(139, 92, 246, 0.2)',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
    tagline: 'Your books always clean. Your numbers always ready.',
    description: 'Expense categorization, invoice processing, P&L summaries, cash flow forecasting — your finance agents keep the books clean and produce the reports your accountant and investors need.',
    capabilities: [
      'Expense categorizer — codes every transaction with 99% accuracy',
      'Invoice agent — generates, sends, and chases unpaid invoices',
      'Reporting agent — produces P&L, balance sheet, and dashboards',
      'Cash flow forecaster — 90-day rolling projections always ready',
      'Budget tracker — flags variance from plan in real time',
      'Tax prep agent — organizes documentation for your accountant',
    ],
    metrics: ['99% categorization accuracy', '2 days faster close', 'Real-time P&L always ready'],
  },
]

export default function Departments() {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <section id="departments" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface/10 via-background to-background pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
            Six Departments
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">
            Six departments.{' '}
            <span className="gradient-text">Forty-eight agents.</span>
            <br />
            All configured for your business.
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Click any department to see what your agents will actually do.
          </p>
        </motion.div>

        {/* Department Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((dept, i) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <motion.button
                onClick={() => setActiveId(activeId === dept.id ? null : dept.id)}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden ${
                  activeId === dept.id
                    ? 'border-white/20 shadow-card-hover'
                    : 'border-white/[0.07] hover:border-white/[0.14]'
                }`}
                style={{
                  background: activeId === dept.id
                    ? `linear-gradient(135deg, ${dept.bgColor}, rgba(17,17,17,0.95))`
                    : '#111111',
                }}
              >
                {/* Card header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: dept.bgColor, border: `1px solid ${dept.borderColor}`, color: dept.color }}
                    >
                      {dept.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold" style={{ color: dept.color }}>{dept.agentCount}</div>
                      <div className="text-[10px] text-text-muted">agents</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-text-primary mb-1">{dept.name}</h3>
                  <p className="text-sm font-medium mb-3" style={{ color: dept.color }}>{dept.tagline}</p>
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">{dept.description}</p>

                  <div className="flex items-center gap-1.5 mt-4 text-xs font-medium" style={{ color: dept.color }}>
                    <span>{activeId === dept.id ? 'Hide capabilities' : 'See all capabilities'}</span>
                    <motion.svg
                      animate={{ rotate: activeId === dept.id ? 180 : 0 }}
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </motion.svg>
                  </div>
                </div>

                {/* Expanded capabilities */}
                <AnimatePresence>
                  {activeId === dept.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t" style={{ borderColor: dept.borderColor }}>
                        <div className="pt-4 space-y-2">
                          {dept.capabilities.map((cap) => (
                            <div key={cap} className="flex items-center gap-2 text-xs text-text-secondary">
                              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: dept.color }} />
                              {cap}
                            </div>
                          ))}
                        </div>

                        {/* Metrics */}
                        <div className="mt-5 pt-4 border-t" style={{ borderColor: dept.borderColor }}>
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">Typical Results</div>
                          <div className="space-y-1.5">
                            {dept.metrics.map((m) => (
                              <div key={m} className="flex items-center gap-2 text-xs font-medium" style={{ color: dept.color }}>
                                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                                {m}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Total count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-8 mt-12 p-6 bg-surface/50 border border-white/[0.06] rounded-2xl"
        >
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">48</div>
            <div className="text-xs text-text-muted mt-1">total agents</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">6</div>
            <div className="text-xs text-text-muted mt-1">departments</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">24/7</div>
            <div className="text-xs text-text-muted mt-1">active</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">1</div>
            <div className="text-xs text-text-muted mt-1">unified system</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
