'use client'

import { motion } from 'framer-motion'

const industries = [
  {
    icon: '🛒',
    industry: 'E-commerce',
    result: 'Reduced customer service tickets from 340/week to 23/week. Manual review eliminated.',
    metric: '93%',
    metricLabel: 'ticket reduction',
    color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    accentColor: '#06b6d4',
  },
  {
    icon: '⚖️',
    industry: 'Law Firm',
    result: 'Contract review time cut from 4 hours to 12 minutes per document. 80% of standard contracts automated.',
    metric: '95%',
    metricLabel: 'faster reviews',
    color: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    accentColor: '#f43f5e',
  },
  {
    icon: '🚀',
    industry: 'SaaS Startup',
    result: 'Lead qualification automated. SDR team refocused on $10K+ deals only. Pipeline grew 3.4x.',
    metric: '3.4x',
    metricLabel: 'pipeline growth',
    color: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    accentColor: '#7c5cfc',
  },
  {
    icon: '📣',
    industry: 'Marketing Agency',
    result: 'Proposal generation: 3 hours → 20 minutes. Close rate improved 40% with AI-personalized decks.',
    metric: '40%',
    metricLabel: 'higher close rate',
    color: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    accentColor: '#f59e0b',
  },
  {
    icon: '🏥',
    industry: 'Healthcare Practice',
    result: 'Scheduling, follow-ups, and billing comms fully automated. Front desk reduced from 3 FTEs to 1.',
    metric: '67%',
    metricLabel: 'headcount savings',
    color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    accentColor: '#10b981',
  },
  {
    icon: '🏠',
    industry: 'Real Estate',
    result: 'CMA reports automated. Listing descriptions generated in 90 seconds. 47% more listings closed per agent.',
    metric: '47%',
    metricLabel: 'more closings/agent',
    color: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
    accentColor: '#38bdf8',
  },
]

export default function IndustryResults() {
  return (
    <section id="industry-results" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21 8.954 8.955c.44-.439 1.152-.439 1.591 0l3.197 3.197a1.125 1.125 0 0 0 1.591 0L21.75 3" />
            </svg>
            Results by Industry
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight">
            Results across{' '}
            <span className="gradient-text">6 industries</span>
          </h2>
          <p className="text-text-secondary mt-4 text-lg max-w-2xl mx-auto">
            FN3 has deployed AI workforces across industries. These are the outcomes our clients reported.
          </p>
        </motion.div>

        {/* Industry grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((item, i) => (
            <motion.div
              key={item.industry}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-surface border border-white/[0.08] hover:border-white/[0.16] rounded-2xl p-6 transition-all duration-300 group"
            >
              {/* Industry label + icon */}
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${item.color}`}>
                  {item.industry}
                </span>
                <span className="text-2xl">{item.icon}</span>
              </div>

              {/* Key metric */}
              <div className="mb-4">
                <span className="text-4xl font-bold gradient-text">{item.metric}</span>
                <span className="text-sm text-text-muted ml-2">{item.metricLabel}</span>
              </div>

              {/* Result */}
              <p className="text-sm text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors duration-200">
                {item.result}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-text-secondary mb-6">
            Don&rsquo;t see your industry?{' '}
            <button
              onClick={() => document.querySelector('#apply')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-accent hover:text-accent-light underline underline-offset-2 transition-colors"
            >
              Apply and we&rsquo;ll scope it for you.
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
