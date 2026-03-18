'use client'

import { CountUp } from '@/components/ui/count-up'

const stats = [
  { value: 5, suffix: '', label: 'Ventures Running the System', accent: true },
  { value: 200, suffix: '+', label: 'Agent Vision', accent: false },
  { value: 6, suffix: '', label: 'Service Capabilities', accent: false },
  { value: null, suffix: '24/7', label: 'Autonomous Operations', accent: false },
]

export function NumbersStrip() {
  return (
    <section className="bg-fn3-near-black px-6 lg:px-12 py-20">
      <p className="label-mono text-fn3-dark-label mb-12">At a glance</p>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`${i < stats.length - 1 ? 'pb-10 lg:pb-0 lg:pr-10 lg:border-r border-fn3-dark-border' : 'pt-10 lg:pt-0 lg:pl-10'} ${i > 0 && i < stats.length ? 'border-t lg:border-t-0 border-fn3-dark-border mt-0 pt-10 lg:pt-0' : ''}`}
          >
            <div className={`font-serif text-[64px] font-normal leading-none ${stat.accent ? 'text-fn3-red' : 'text-white'}`}>
              {stat.value !== null ? (
                <CountUp to={stat.value} suffix={stat.suffix} />
              ) : (
                stat.suffix
              )}
            </div>
            <p className="label-mono text-fn3-dark-text mt-3">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
