import { FadeInSection } from '@/components/ui/fade-in-section'

const models = [
  { name: 'Constellation Software', desc: 'Acquire and compound. Never sell. Operational discipline over growth theatre.' },
  { name: 'Berkshire Hathaway', desc: 'Autonomous business units. Capital allocation as the core skill. Trust the operator.' },
  { name: 'Amazon', desc: 'API mandate. Every service externalizable. Build platforms, not products.' },
  { name: 'Danaher', desc: 'The Business System. A replicable operating model applied across every acquisition.' },
  { name: 'IAC', desc: 'Build, spin, repeat. Incubate internally. Spin out when ready. Never stop building.' },
]

export function ReferenceModels() {
  return (
    <section className="bg-white border-b border-[#f3f4f6] px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-fn3-red-light mb-12">Informed By</p>
      </FadeInSection>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {models.map((model, i) => (
          <FadeInSection key={model.name} delay={i * 0.08}>
            <div className={`${i > 0 ? 'pt-8 lg:pt-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-[#f3f4f6]' : ''} ${i < models.length - 1 ? 'pb-8 lg:pb-0 lg:pr-6' : ''}`}>
              <h3 className="text-[13px] font-bold text-[#1c1917] mb-2">{model.name}</h3>
              <p className="text-[12px] text-[#9ca3af] leading-[1.6]">{model.desc}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
