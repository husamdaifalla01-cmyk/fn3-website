'use client'

import { motion } from 'framer-motion'

const painPoints = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
    headline: 'You\'ve tried ChatGPT.',
    body: 'It helps sometimes. But copy-pasting prompts into a chat window is not running your business. It\'s one conversation at a time, manually, by you. That\'s not a workforce — that\'s a better Google.',
    tag: 'The Tooling Trap',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    ),
    headline: 'Setting up real AI agents requires expertise.',
    body: 'Configuring multi-agent systems, building tool integrations, writing system prompts that actually work, connecting to your CRM, your email, your calendar — this is a full-time technical job. You\'re not a prompt engineer.',
    tag: 'The Complexity Wall',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    headline: 'Every week you wait, the gap widens.',
    body: 'Your competitors who figured out AI aren\'t just saving time — they\'re compounding it. While you\'re manually following up on leads, their AI already did it at 2am. While you\'re writing SOPs, their AI already documented everything.',
    tag: 'The Compounding Gap',
  },
]

export default function Problem() {
  return (
    <section id="problem" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            The Problem
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-text-primary">
            You know you need AI.
            <br />
            <span className="text-text-secondary font-normal italic">You don&apos;t have time to figure it out.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, i) => (
            <motion.div
              key={point.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative bg-surface border border-white/[0.07] hover:border-red-500/20 rounded-2xl p-7 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(239,68,68,0.06)]"
            >
              {/* Tag */}
              <div className="inline-flex items-center gap-1.5 bg-red-500/10 text-red-400 text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5">
                {point.tag}
              </div>

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-5 group-hover:bg-red-500/15 transition-colors">
                {point.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-text-primary mb-3 leading-tight">
                {point.headline}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {point.body}
              </p>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-red-500/40" />
                <div className="absolute bottom-4 right-8 w-1 h-1 rounded-full bg-red-500/20" />
                <div className="absolute bottom-8 right-4 w-1 h-1 rounded-full bg-red-500/20" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bridge to solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-text-secondary text-lg">
            We built FN3 because this problem has a clean answer.
          </p>
          <div className="flex items-center justify-center mt-6 gap-3">
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-white/10" />
            <motion.button
              onClick={() => document.querySelector('#solution')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-accent text-sm font-medium hover:text-accent-light transition-colors"
            >
              See the solution
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </motion.button>
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-white/10" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
