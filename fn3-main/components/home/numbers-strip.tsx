'use client'

import { FadeInSection } from '@/components/ui/fade-in-section'
import { CountUp } from '@/components/ui/count-up'

const stats = [
  { value: 5,    suffix: '',     label: 'Ventures Running the System', accent: true  },
  { value: 200,  suffix: '+',    label: 'Agent Workflows',             accent: false },
  { value: 6,    suffix: '',     label: 'Service Capabilities',        accent: false },
  { value: null, suffix: '24/7', label: 'Autonomous Operations',       accent: false },
]

export function NumbersStrip() {
  return (
    <section className="bg-white border-y border-fn3-red-faint px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-fn3-red-light mb-14">At a glance</p>
      </FadeInSection>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <FadeInSection key={stat.label} delay={i * 0.08}>
            <div className={[
              'flex flex-col justify-between h-[120px]',
              i < stats.length - 1 ? 'lg:pr-12 lg:border-r lg:border-fn3-red-faint' : '',
              i > 0 ? 'lg:pl-12' : '',
              i === 1 ? 'pl-6 border-l border-fn3-red-faint' : '',
              // mobile-only top border for second row items
              i >= 2 ? 'pt-10 lg:pt-0 border-t lg:border-t-0 border-fn3-red-faint' : '',
            ].filter(Boolean).join(' ')}>
              {/* Number */}
              <div className={`font-serif text-[64px] font-normal leading-none ${stat.accent ? 'text-fn3-red' : 'text-[#1c1917]'}`}>
                {stat.value !== null ? (
                  <CountUp to={stat.value} suffix={stat.suffix} />
                ) : (
                  stat.suffix
                )}
              </div>
              {/* Label — pinned to bottom of fixed-height cell */}
              <p className="text-[15px] font-medium text-[#1c1917]">{stat.label}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
