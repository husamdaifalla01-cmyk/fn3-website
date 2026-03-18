import { FadeInSection } from '@/components/ui/fade-in-section'

const principles = [
  {
    num: 'PRINCIPLE 01',
    title: 'Automate Before You Staff',
    body: 'Every process gets designed for automation first. Humans handle judgment. Systems handle execution.',
  },
  {
    num: 'PRINCIPLE 02',
    title: 'Build APIs, Not Teams',
    body: 'Every service interface is designed to be externalizable from day one. Nothing is siloed by default.',
  },
  {
    num: 'PRINCIPLE 03',
    title: 'Compound With Every Venture',
    body: 'Each new business makes the operating system stronger. Infrastructure invested once, leveraged across all.',
  },
  {
    num: 'PRINCIPLE 04',
    title: 'Decisions From Frameworks',
    body: 'No gut calls on strategy. Regret minimization, Anand-Collis framework, capital allocation rules — all documented, all applied.',
  },
]

export function OperatingPrinciples() {
  return (
    <section className="bg-fn3-near-black px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-fn3-dark-label mb-10">Operating Principles</p>
      </FadeInSection>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {principles.map((p, i) => (
          <FadeInSection key={p.num} delay={i * 0.1}>
            <div className="border-t border-fn3-dark-border pt-6">
              <p className="label-mono text-fn3-red mb-3">{p.num}</p>
              <h3 className="text-[18px] font-bold text-white tracking-tight mb-2">{p.title}</h3>
              <p className="text-[13px] text-fn3-dark-text leading-[1.7]">{p.body}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
