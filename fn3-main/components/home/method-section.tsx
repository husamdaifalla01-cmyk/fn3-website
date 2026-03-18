import { FadeInSection } from '@/components/ui/fade-in-section'

const capabilities = [
  {
    num: 'CAPABILITY 01',
    title: 'Automation Integration',
    body: "Map, design, and deploy automation into existing operations without rebuilding what's working.",
  },
  {
    num: 'CAPABILITY 02',
    title: 'Agent Deployment',
    body: 'Purpose-built agents for specific operational roles — not generic AI, configured workforce.',
  },
  {
    num: 'CAPABILITY 03',
    title: 'Operating System Design',
    body: 'The frameworks, decision layers, and systems architecture that make scale possible without chaos.',
  },
]

export function MethodSection() {
  return (
    <section className="bg-white border-b border-[#f3f4f6] px-6 lg:px-12 py-20">
      {/* Two-col header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
        <FadeInSection>
          <h2 className="font-display text-[clamp(32px,3.5vw,48px)] text-[#1c1917] leading-[1.05] tracking-tight">
            The same system that runs{' '}
            <span className="text-fn3-red">our</span>{' '}
            businesses runs yours.
          </h2>
        </FadeInSection>
        <FadeInSection delay={0.1}>
          <p className="text-[15px] text-[#78716c] leading-[1.8] lg:pt-2">
            FN3 built an operational intelligence layer to run its own portfolio.
            Every tool, agent, and system was designed to be externalizable from day one.
            What powers our ventures powers our clients.
          </p>
        </FadeInSection>
      </div>

      {/* Capability preview cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {capabilities.map((cap, i) => (
          <FadeInSection key={cap.num} delay={i * 0.1}>
            <div className="bg-fn3-warm-white border border-fn3-red-faint p-7">
              <p className="label-mono text-fn3-red-light mb-3">{cap.num}</p>
              <h3 className="text-[15px] font-bold text-[#1c1917] mb-2">{cap.title}</h3>
              <p className="text-[13px] text-[#9ca3af] leading-[1.65]">{cap.body}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
