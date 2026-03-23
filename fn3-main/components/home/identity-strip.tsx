import { FadeInSection } from '@/components/ui/fade-in-section'

const pillars = [
  {
    num: '01 — AGENTS',
    title: 'AI Workforce',
    body: 'Persistent agents with memory and capability running operations around the clock. Not tools you prompt — a workforce you deploy.',
  },
  {
    num: '02 — SYSTEMS',
    title: 'Connected Infrastructure',
    body: 'Every process, every data flow, every decision point connected. An operating system that eliminates the gaps between tools and teams.',
  },
  {
    num: '03 — OPERATIONS',
    title: 'Execution at Scale',
    body: 'The frameworks, the SLAs, the transfer pricing — a management layer built to run multiple businesses without adding management overhead.',
  },
]

export function IdentityStrip() {
  return (
    <section className="bg-fn3-warm-white border-b border-fn3-red-faint px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="font-display text-[clamp(28px,3vw,42px)] text-fn3-red leading-none tracking-tight mb-12">The FN3 Operating Model</p>
      </FadeInSection>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {pillars.map((pillar, i) => (
          <FadeInSection key={pillar.num} delay={i * 0.1}>
            <div className={`pr-0 lg:pr-12 ${i > 0 ? 'pt-10 lg:pt-0 lg:pl-12 border-t lg:border-t-0 lg:border-l border-fn3-red-faint' : ''}`}>
              <p className="font-display text-[28px] lg:text-[32px] text-fn3-red leading-none tracking-tight mb-4">{pillar.num}</p>
              <h3 className="text-[18px] font-bold text-[#1c1917] tracking-tight mb-3">{pillar.title}</h3>
              <p className="text-[14px] text-[#78716c] leading-[1.75]">{pillar.body}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
