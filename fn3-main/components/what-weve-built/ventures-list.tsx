import { FadeInSection } from '@/components/ui/fade-in-section'

const ventures = [
  {
    name: 'SUBZII',
    sector: 'Event Ticketing',
    desc: 'Live entertainment ticketing platform. AI-optimized pricing, inventory management, and demand forecasting. The FN3 agent layer runs demand prediction and operational workflows end-to-end.',
    status: 'Growth',
    dotColor: '#4ade80',
  },
  {
    name: 'DETAILMAPS',
    sector: 'Auto-Care',
    desc: 'Vehicle maintenance platform connecting auto-care providers with customers. Intelligent scheduling, route optimization, and service automation driven by the FN3 operations layer.',
    status: 'Active',
    dotColor: '#60a5fa',
  },
  {
    name: 'DRYJETS',
    sector: 'On-Demand Services',
    desc: 'On-demand service coordination platform. Resource matching, real-time dispatch, and contractor management — operational complexity handled by systems, not headcount.',
    status: 'Contracting',
    dotColor: '#fbbf24',
  },
  {
    name: 'DAWA',
    sector: 'Healthcare Infrastructure',
    desc: 'Morocco healthcare infrastructure modernization. AI-driven workflow optimization and patient coordination systems. The FN3 model applied to public sector operational transformation.',
    status: 'Concept',
    dotColor: '#a78bfa',
  },
  {
    name: 'BIO',
    sector: 'To Be Announced',
    desc: 'Early concept stage. The FN3 operating model is being applied to a new vertical. Details to follow.',
    status: 'Concept',
    dotColor: '#374151',
  },
]

export function VenturesList() {
  return (
    <section className="bg-white px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-fn3-red-light mb-10">Active Ventures</p>
      </FadeInSection>
      <div>
        {ventures.map((v, i) => (
          <FadeInSection key={v.name} delay={i * 0.08}>
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_160px] gap-6 lg:gap-12 py-10 border-t border-[#f3f4f6] last:border-b items-start">
              {/* Name + sector */}
              <div>
                <h3 className="text-[22px] font-bold text-[#1c1917] tracking-tight mb-2">{v.name}</h3>
                <p className="label-mono text-[#d1d5db]">{v.sector}</p>
              </div>
              {/* Description */}
              <p className="text-[14px] text-[#78716c] leading-[1.75]">{v.desc}</p>
              {/* Status */}
              <div className="flex items-center gap-2 lg:justify-end">
                <span
                  className="w-2 h-2 rounded-full inline-block flex-shrink-0"
                  style={{ backgroundColor: v.dotColor }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#9ca3af]">
                  {v.status}
                </span>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
