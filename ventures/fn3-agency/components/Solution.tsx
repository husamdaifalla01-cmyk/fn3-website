'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'We learn your business',
    description:
      'A structured intake process — we map your workflows, understand your tools, audit your biggest time drains, and define exactly what each agent will own. This isn\'t a template. It\'s built around how you actually work.',
    items: ['Discovery call', 'Workflow mapping', 'Tool audit', 'Agent scope definition'],
    duration: '1–2 days',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'We configure your AI workforce',
    description:
      'We build each agent with custom system prompts trained on your business context, connect them to your existing tools, run QA testing across real scenarios, and configure handoffs between agents so the whole system works as one team.',
    items: ['Custom agent configuration', 'Tool integrations (CRM, email, Slack)', 'Multi-agent workflow setup', 'QA and testing'],
    duration: '2–3 days',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Your agents start working',
    description:
      'Monday morning, your AI workforce is live. They\'re in your inbox, your CRM, your Slack. They\'re following up on leads, resolving support tickets, generating reports — autonomously, while you focus on what only you can do.',
    items: ['Agents go live', 'Real-time activity dashboard', 'Weekly performance reports', 'Ongoing optimization'],
    duration: 'Monday morning',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
]

const beforeItems = [
  'Manually follow up with every lead',
  'Write every piece of content yourself',
  'Answer the same support questions daily',
  'Build reports from scratch each week',
  'Miss opportunities while you sleep',
  'Hire more staff to scale',
]

const afterItems = [
  'Sales agent nurtures leads automatically',
  'Content agent runs your full calendar',
  'Support agent resolves tickets 24/7',
  'Ops agent generates reports instantly',
  'Agents work while you sleep — and after',
  'Scale with agents, not headcount',
]

export default function Solution() {
  return (
    <section id="solution" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-surface/20 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[100px] pointer-events-none" />

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
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            The Solution
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight">
            We build it. We configure it.
            <br />
            <span className="gradient-text">It runs your business.</span>
          </h2>
        </motion.div>

        {/* Before/After */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-1 rounded-2xl overflow-hidden border border-white/[0.07] mb-20"
        >
          {/* Before */}
          <div className="bg-surface p-8 md:p-10 relative">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Before FN3
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-6">You doing everything manually</h3>
            <ul className="space-y-3">
              {beforeItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 text-sm text-text-secondary"
                >
                  <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-0.5 bg-red-400 rounded-full" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Divider arrow */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-accent">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>

          {/* After */}
          <div className="bg-surface-2 p-8 md:p-10 relative border-t md:border-t-0 md:border-l border-white/[0.07]">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              After FN3
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-6">Your AI workforce handling it</h3>
            <ul className="space-y-3">
              {afterItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 text-sm text-text-primary"
                >
                  <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* 3 Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-8 top-12 bottom-12 w-px bg-gradient-to-b from-accent/30 via-accent/20 to-transparent hidden md:block" style={{ left: '11px' }} />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative flex gap-6 md:gap-10"
              >
                {/* Step indicator */}
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shadow-accent-sm z-10">
                    <span className="text-white text-[10px] font-bold">{i + 1}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-surface border border-white/[0.07] hover:border-accent/20 rounded-2xl p-7 transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                        {step.icon}
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-accent uppercase tracking-wider">Step {step.number}</div>
                        <h3 className="text-lg font-semibold text-text-primary">{step.title}</h3>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-surface-3 border border-white/[0.06] text-text-muted text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap self-start">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      {step.duration}
                    </div>
                  </div>

                  <p className="text-sm text-text-secondary leading-relaxed mb-5">{step.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {step.items.map((item) => (
                      <span key={item} className="inline-flex items-center gap-1.5 text-[11px] text-text-secondary bg-surface-3 border border-white/[0.06] px-2.5 py-1 rounded-md">
                        <svg className="w-2.5 h-2.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
