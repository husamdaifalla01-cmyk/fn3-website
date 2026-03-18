import { FadeInSection } from '@/components/ui/fade-in-section'

const capabilities = [
  {
    num: 'CAPABILITY 01',
    title: 'Automation Integration',
    body: "Map existing operations. Identify automation opportunities. Design and deploy automation that eliminates manual work without disrupting what's working. Built for operations teams, not IT departments.",
  },
  {
    num: 'CAPABILITY 02',
    title: 'Agent Deployment',
    body: 'Purpose-built AI agents for specific operational roles. Not generic chatbots — configured agents with memory, context, and defined responsibilities. A workforce extension, not a tool upgrade.',
  },
  {
    num: 'CAPABILITY 03',
    title: 'Operating System Design',
    body: 'The frameworks, decision layers, and systems architecture behind how FN3 runs. Applied to your business. Includes SLA design, transfer pricing models, and the management layer that makes scale possible without chaos.',
  },
  {
    num: 'CAPABILITY 04',
    title: 'Context Engineering',
    body: 'Building the living context layer that keeps AI systems accurate, current, and operationally relevant. The difference between AI that hallucinates and AI that actually runs your business.',
  },
  {
    num: 'CAPABILITY 05',
    title: 'Infrastructure & Observability',
    body: "Cloud infrastructure, database architecture, and observability pipelines. Built with the same standards FN3 uses internally — OpenTelemetry, traces, metrics, and alerting that actually tells you what's happening.",
  },
  {
    num: 'CAPABILITY 06',
    title: 'Product & Platform Strategy',
    body: 'From concept to operating platform. Product architecture, roadmap design, and platform strategy informed by the FN3 holding company model. For founders and operators who are building something that needs to scale.',
  },
]

export function CapabilitiesList() {
  return (
    <section className="bg-white border-b border-[#f3f4f6] px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-fn3-red-light mb-10">Six Capabilities</p>
      </FadeInSection>
      <div>
        {capabilities.map((cap, i) => (
          <FadeInSection key={cap.num} delay={i * 0.06}>
            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4 lg:gap-12 py-9 border-t border-[#f3f4f6] last:border-b items-start">
              <div>
                <p className="label-mono text-fn3-red-light mb-2">{cap.num}</p>
                <h3 className="text-[16px] font-bold text-[#1c1917] tracking-tight">{cap.title}</h3>
              </div>
              <p className="text-[14px] text-[#78716c] leading-[1.75]">{cap.body}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
