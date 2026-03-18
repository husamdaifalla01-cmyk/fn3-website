'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const stagger: Variants = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

const fadeUp: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

export function HomeHero() {
  return (
    <section className="relative bg-fn3-red px-6 lg:px-12 pt-[100px] pb-[120px] min-h-[90vh] flex flex-col justify-center overflow-hidden">
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="max-w-[760px]"
      >
        {/* Eyebrow */}
        <motion.p variants={fadeUp} className="label-mono text-white/30 mb-14">
          FlowNexis3 — Operational Intelligence
        </motion.p>

        {/* Ghost manifesto */}
        <motion.p variants={fadeUp} className="font-serif-italic text-[24px] text-white/35 leading-[1.6] mb-6">
          Not an agency.<br />
          Not a studio.<br />
          Not a fund.
        </motion.p>

        {/* Rule */}
        <motion.div variants={fadeUp} className="w-10 h-px bg-white/40 mb-7" />

        {/* Main statement */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-[clamp(40px,5.5vw,68px)] text-white leading-[1.02] tracking-[-0.05em] mb-14"
        >
          FN3 is what you build<br />
          when you&apos;re done<br />
          choosing between them.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p variants={fadeUp} className="text-base text-white/50 leading-[1.7] max-w-[480px]">
          We build the operating system behind the business — agents, automation,
          and systems that make operations run at a level most teams never reach.
        </motion.p>
      </motion.div>

      {/* Scroll hint */}
      <p className="label-mono text-white/18 absolute bottom-9 left-6 lg:left-12">
        Scroll to enter ↓
      </p>
    </section>
  )
}
