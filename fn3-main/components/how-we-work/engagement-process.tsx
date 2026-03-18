import { FadeInSection } from '@/components/ui/fade-in-section'

const steps = [
  {
    num: 'STEP 01',
    title: 'Operational Audit',
    body: "We map your current operations. Where the gaps are, where the leverage is, what's ready for automation now.",
  },
  {
    num: 'STEP 02',
    title: 'System Design',
    body: 'We design the operational layer — agents, automations, frameworks — tailored to your business, not templated.',
  },
  {
    num: 'STEP 03',
    title: 'Integration & Deploy',
    body: "We build and deploy directly into your stack. No handoff decks. We run it until it runs itself.",
  },
  {
    num: 'STEP 04',
    title: 'Compound & Expand',
    body: 'The system learns. Each month it does more. Capabilities expand as confidence in the foundation grows.',
  },
]

export function EngagementProcess() {
  return (
    <section className="bg-fn3-near-black px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-fn3-dark-label mb-10">How an Engagement Works</p>
      </FadeInSection>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <FadeInSection key={step.num} delay={i * 0.1}>
            <div className={`${i > 0 ? 'pt-10 lg:pt-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-fn3-dark-border' : ''} ${i < steps.length - 1 ? 'pb-10 lg:pb-0 lg:pr-8' : ''}`}>
              <p className="label-mono text-fn3-red mb-4">{step.num}</p>
              <h3 className="text-[15px] font-bold text-white mb-3">{step.title}</h3>
              <p className="text-[12px] text-fn3-dark-text leading-[1.65]">{step.body}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
