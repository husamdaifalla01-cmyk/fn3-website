'use client'
import { trackAffiliateClick } from '@/lib/analytics'

// Scenarios are illustrative composites representing common situations described by car-secured credit applicants.
// They are not based on specific individuals. Names and photos are fictional.
const SCENARIOS = [
  {
    initials: 'MT',
    name: 'Marcus T.',
    location: 'Houston, TX',
    car: '2019 Honda Accord',
    quote: "I got declined for a Capital One card three times. My buddy told me about using my car and I thought it was a scam. Turned out to be a legitimate option I hadn't heard of before — used my car equity instead of my credit score.",
    situation: 'Variable-income worker',
    tag: 'Car Equity Credit',
  },
  {
    initials: 'PS',
    name: 'Priya S.',
    location: 'Atlanta, GA',
    car: '2021 Toyota Camry',
    quote: "With gas costs eating into my delivery income I needed a credit buffer. The concept of using my car as collateral was new to me — but it made sense once I understood how it works. Worth looking into if you're in a similar spot.",
    situation: 'Self-employed, delivery work',
    tag: 'Vehicle-Secured Card',
  },
  {
    initials: 'DR',
    name: 'David R.',
    location: 'Phoenix, AZ',
    car: '2018 F-150',
    quote: "Between rent going up and fuel costs at job sites, I was stretched thin. I didn't know you could use your vehicle as collateral for revolving credit — not just a title loan. A completely different product than I expected.",
    situation: 'Contractor, project-based income',
    tag: 'Revolving Credit Line',
  },
]

export default function TestimonialsSection({ yendoUrl }: { yendoUrl: string }) {
  return (
    <section className="py-24" style={{ background: '#fef9ee' }}>
      <div className="max-w-6xl mx-auto px-4">

        {/* FTC-compliant disclosure bar */}
        <div className="text-center mb-4">
          <span className="text-xs px-4 py-1.5 rounded-full inline-block" style={{ background: 'rgba(217,119,6,0.1)', color: '#92400e' }}>
            ℹ️ Illustrative scenarios based on common situations. Names and images are fictional representations, not real users.
          </span>
        </div>

        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 px-4 py-2 rounded-full" style={{ background: 'rgba(217,119,6,0.1)', color: '#d97706' }}>
            Common Situations
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: '#1c1917' }}>
            Who This Is Typically For
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#78716c' }}>
            Car-secured credit tends to work well for people in these kinds of situations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {SCENARIOS.map((t, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid rgba(217,119,6,0.1)', boxShadow: '0 4px 20px rgba(28,25,23,0.06)' }}>

              {/* Tag */}
              <div className="px-6 pt-5 pb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(217,119,6,0.08)', color: '#d97706' }}>
                  {t.tag}
                </span>
              </div>

              {/* Quote */}
              <div className="px-6 pb-5">
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#374151' }}>
                  "{t.quote}"
                </p>

                {/* Person avatar */}
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid #fef9ee' }}>
                  <div
                    className="rounded-full flex-shrink-0 flex items-center justify-center text-sm font-black"
                    style={{ width: 44, height: 44, background: 'rgba(217,119,6,0.15)', color: '#d97706', border: '2px solid rgba(217,119,6,0.2)' }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: '#1c1917' }}>{t.name}</div>
                    <div className="text-xs" style={{ color: '#a8a29e' }}>{t.location} · {t.situation}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#d97706' }}>{t.car}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Soft CTA */}
        <div className="text-center">
          <a
            href={yendoUrl}
            target="_blank"
            rel="nofollow noopener"
            className="btn-primary py-3 px-8 text-sm"
            onClick={() => trackAffiliateClick('homepage-testimonials')}
          >
            Learn If Your Car Qualifies →
          </a>
          <p className="text-xs mt-4" style={{ color: '#a8a29e' }}>
            Scenarios above are illustrative composites representing common applicant situations. Names and personas are fictional. Mintbrooks is an independent educational resource. We do not guarantee approval or any specific credit outcome. Affiliate link.
          </p>
        </div>

      </div>
    </section>
  )
}
