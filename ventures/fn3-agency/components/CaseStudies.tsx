'use client'

import { motion } from 'framer-motion'

const caseStudies = [
  {
    company: 'Coastal Thread Co.',
    industry: 'E-commerce',
    size: '12 employees',
    departments: ['Sales', 'Marketing'],
    deptColors: ['#7c5cfc', '#06b6d4'],
    challenge:
      'Coastal Thread was drowning in manual work — their team of 12 was spending 40+ hours a week on tasks that were clearly automatable: writing product descriptions, sending abandoned cart follow-ups, qualifying inbound wholesale leads, and building weekly performance reports. The founders knew AI could help but had zero bandwidth to figure out how.',
    outcome:
      'After FN3 deployment, their Sales agent handles the entire wholesale inquiry pipeline — qualifying leads, sending proposals, and following up on a structured cadence. Their Marketing agent executes the full content calendar, manages email sequences, and optimizes product listings. The result: 40 hours a week reclaimed, $18K/month in pipeline automation, and their first $1M quarter.',
    metrics: [
      { value: '40 hrs/week', label: 'Reclaimed' },
      { value: '$18K/mo', label: 'Pipeline automated' },
      { value: '3.2x', label: 'Faster lead response' },
    ],
    quote:
      '"We were skeptical because we\'d tried other AI tools and always ended up back to manual. FN3 actually deployed a system that runs without us touching it."',
    author: 'Marcus R., Co-founder',
    timeToROI: '6 weeks',
    plan: 'Growth',
    planColor: '#7c5cfc',
  },
  {
    company: 'Prentice & Hollis LLP',
    industry: 'Law Firm',
    size: '8 people',
    departments: ['Legal', 'Support'],
    deptColors: ['#ef4444', '#10b981'],
    challenge:
      'A boutique law firm spending 60% of attorney time on contract review, client onboarding paperwork, compliance calendar management, and repetitive client communications. Partners were doing admin. Associates were doing what paralegals should do. The whole leverage model was broken.',
    outcome:
      'FN3 deployed a Legal department agent handling first-pass contract review with risk flagging and redline suggestions, plus a Support agent managing all client intake, status updates, and standard communications. Contract review time dropped 80%. Zero compliance issues in 6 months. Partners reclaimed 12 hours a week each for billable work.',
    metrics: [
      { value: '80%', label: 'Faster contract review' },
      { value: '0', label: 'Compliance issues (6 mo)' },
      { value: '12 hrs/wk', label: 'Reclaimed per partner' },
    ],
    quote:
      '"The contract review agent catches things my associates miss — not because they\'re bad, but because they\'re reading the 40th NDA of the month. The agent is always fresh."',
    author: 'Sarah P., Managing Partner',
    timeToROI: '4 weeks',
    plan: 'Starter',
    planColor: '#7c5cfc',
  },
  {
    company: 'Stackify (SaaS)',
    industry: 'B2B SaaS',
    size: '5 people',
    departments: ['Support', 'Operations'],
    deptColors: ['#10b981', '#f59e0b'],
    challenge:
      'A 5-person SaaS startup with 800 active customers and no full-time support person. The founders were personally handling tickets, which meant support quality was inconsistent — sometimes instant, sometimes 48 hours late. They were also drowning in repetitive operational work: onboarding emails, usage reports, churn alerts.',
    outcome:
      'FN3 deployed a Support team that handles all Tier 1 tickets without human touch, automatically escalates complex issues, and runs proactive check-in campaigns for at-risk accounts. The Ops agent manages onboarding sequences, generates weekly usage reports, and monitors churn indicators. Result: 94% of tickets resolved without human involvement, and they\'ve maintained a 4.9-star rating through 3x growth.',
    metrics: [
      { value: '94%', label: 'Tickets resolved auto' },
      { value: '4.9 ★', label: 'Rating maintained' },
      { value: '3x growth', label: 'With same team size' },
    ],
    quote:
      '"We went from personally answering support tickets at midnight to not thinking about support at all. The agents handle it and escalate the rare things that genuinely need us."',
    author: 'Dev K., CEO & Co-founder',
    timeToROI: '3 weeks',
    plan: 'Starter',
    planColor: '#7c5cfc',
  },
]

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background pointer-events-none" />

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
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Case Studies
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight">
            Real deployments.{' '}
            <span className="gradient-text">Real results.</span>
          </h2>
        </motion.div>

        {/* Case study cards */}
        <div className="space-y-8">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-surface border border-white/[0.08] hover:border-white/[0.14] rounded-2xl overflow-hidden transition-all duration-300 group"
            >
              <div className="grid lg:grid-cols-[1fr_1px_340px]">
                {/* Main content */}
                <div className="p-7 md:p-10">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                          <span className="text-sm font-bold gradient-text">{cs.company.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-text-primary">{cs.company}</h3>
                          <div className="text-xs text-text-muted">{cs.industry} · {cs.size}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {cs.departments.map((dept, di) => (
                          <span
                            key={dept}
                            className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                            style={{
                              color: cs.deptColors[di],
                              backgroundColor: `${cs.deptColors[di]}15`,
                              borderColor: `${cs.deptColors[di]}30`,
                            }}
                          >
                            {dept}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right sm:text-right flex sm:flex-col items-center sm:items-end gap-4 sm:gap-1">
                      <div className="text-[10px] text-text-muted uppercase tracking-wider">Plan</div>
                      <div className="text-sm font-semibold text-accent">{cs.plan}</div>
                    </div>
                  </div>

                  {/* Challenge + Outcome */}
                  <div className="grid md:grid-cols-2 gap-6 mb-7">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-red-400 mb-2">The Challenge</div>
                      <p className="text-sm text-text-secondary leading-relaxed">{cs.challenge}</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-green-400 mb-2">The Outcome</div>
                      <p className="text-sm text-text-secondary leading-relaxed">{cs.outcome}</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="border-l-2 border-accent/40 pl-4 py-1">
                    <p className="text-sm text-text-secondary italic leading-relaxed mb-2">{cs.quote}</p>
                    <div className="text-xs text-text-muted">— {cs.author}</div>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden lg:block bg-white/[0.06]" />

                {/* Metrics */}
                <div className="lg:p-10 p-7 lg:border-t-0 border-t border-white/[0.07] flex flex-col justify-center">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-5">Results at a Glance</div>

                  <div className="space-y-5 mb-8">
                    {cs.metrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="text-2xl font-bold gradient-text">{metric.value}</div>
                        <div className="text-xs text-text-muted mt-0.5">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-surface-2 border border-white/[0.06] rounded-xl">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <div>
                      <div className="text-[10px] text-text-muted">Time to ROI</div>
                      <div className="text-sm font-semibold text-green-400">{cs.timeToROI}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14"
        >
          <p className="text-text-secondary mb-6 text-lg">
            Your business could be the next case study.
          </p>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(124, 92, 252, 0.4)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#apply')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-accent"
          >
            Apply for Your AI Workforce
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
