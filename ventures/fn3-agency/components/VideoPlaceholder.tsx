'use client'

import { motion } from 'framer-motion'

export default function VideoPlaceholder() {
  return (
    <section id="watch" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-surface/20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82Z" />
            </svg>
            See It In Action
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight">
            Watch how we built an AI workforce{' '}
            <span className="gradient-text">in 5 days</span>
          </h2>
        </motion.div>

        {/* Video embed placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative bg-surface border border-white/[0.1] rounded-2xl overflow-hidden shadow-card aspect-video flex items-center justify-center group cursor-pointer hover:border-accent/30 transition-all duration-300">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-surface-2/60" />

            {/* Fake thumbnail lines for visual interest */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-0 right-0 h-px bg-white/30" />
              <div className="absolute top-2/4 left-0 right-0 h-px bg-white/20" />
              <div className="absolute top-3/4 left-0 right-0 h-px bg-white/10" />
            </div>

            {/* Play button */}
            <div className="relative z-10 flex flex-col items-center gap-5">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 rounded-full bg-accent/90 hover:bg-accent flex items-center justify-center shadow-accent transition-all duration-200 group-hover:shadow-[0_0_40px_rgba(124,92,252,0.5)]"
              >
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82Z" />
                </svg>
              </motion.div>
              <div className="text-center px-4">
                <div className="text-sm font-medium text-text-primary">Coming soon — walkthrough being recorded</div>
                <div className="text-xs text-text-muted mt-1">Notify me when it&rsquo;s live</div>
              </div>
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm border border-white/10 text-white text-xs font-medium px-2.5 py-1 rounded-md">
              3:00
            </div>
          </div>

          {/* Caption */}
          <p className="text-center text-sm text-text-muted mt-4">
            3-minute walkthrough: From bottleneck audit to 6 agents live in one week.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(124, 92, 252, 0.35)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#apply')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-accent"
          >
            Book a call to see it built for your business
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
