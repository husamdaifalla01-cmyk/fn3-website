'use client'
import { trackAffiliateClick } from '@/lib/analytics'

export default function ProductDemo({ yendoUrl }: { yendoUrl: string }) {
  return (
    <section className="py-24" style={{ background: '#1c1917' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="section-label-light mb-3">The Product</div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">What You're Actually Getting</h2>
          <p className="max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>A revolving Visa credit card secured by your vehicle — not your credit score. Reports to all three credit bureaus monthly.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Card mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl blur-2xl opacity-30" style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', transform: 'scale(0.95) translateY(12px)' }} />
              <div className="relative w-80 h-48 rounded-2xl p-6 flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, #1e3a5f, #2d1b69)', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-bold tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.45)' }}>YENDO</div>
                    <div className="w-8 h-6 rounded" style={{ background: 'linear-gradient(135deg, #d97706, #fbbf24)' }}></div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>SECURED BY</div>
                    <div className="text-xs font-bold text-white">Your Vehicle</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm tracking-widest text-white font-mono mb-3" style={{ letterSpacing: '0.2em' }}>
                    •••• •••• •••• ••••
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>CARD HOLDER</div>
                      <div className="text-sm font-bold text-white">YOUR NAME</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>CREDIT LIMIT</div>
                      <div className="text-sm font-bold" style={{ color: '#6ee7b7' }}>Up to $10,000</div>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-8 h-8 rounded-full opacity-80" style={{ background: '#ef4444' }} />
                      <div className="w-8 h-8 rounded-full opacity-80 -ml-4" style={{ background: '#f59e0b' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What it does */}
          <div>
            <h3 className="text-2xl font-black text-white mb-6">How this card works</h3>
            <div className="space-y-4">
              {[
                { icon: '🛒', title: 'Use it anywhere Visa is accepted', desc: 'In-store, online, subscriptions. Functions like any other credit card in your wallet.' },
                { icon: '📈', title: 'Reports to credit bureaus monthly', desc: 'Payment activity is reported to Equifax, Experian, and TransUnion. On-time payments can improve your credit profile over time.' },
                { icon: '🔄', title: 'Revolving line — not a one-time loan', desc: 'Pay it down, use it again. No reapplying each time you need access to credit.' },
                { icon: '🚗', title: 'You keep driving your car', desc: 'Your vehicle is collateral. You continue using it normally as long as your account is in good standing.' },
                { icon: '📱', title: 'Managed through the Yendo app', desc: 'Check your balance, make payments, and track your utilization from your phone.' },
              ].map(f => (
                <div key={f.title} className="flex gap-4">
                  <div className="text-2xl flex-shrink-0 mt-0.5">{f.icon}</div>
                  <div>
                    <div className="font-bold text-white">{f.title}</div>
                    <div className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Application flow */}
        <div>
          <div className="text-center mb-10">
            <div className="section-label-light mb-2">The Application Process</div>
            <h3 className="text-2xl font-black text-white">What Yendo's Application Looks Like</h3>
            <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Process described based on publicly available information. Subject to Yendo's current terms.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: '1', screen: 'Vehicle Info', fields: ['Year & Make', 'Estimated Mileage', 'Vehicle Condition'], color: '#2563eb' },
              { step: '2', screen: 'Your Details', fields: ['Name & Address', 'Monthly Income', 'State of Residence'], color: '#7c3aed' },
              { step: '3', screen: 'Soft Credit Check', fields: ['Initial check only', 'Does not impact score', 'Yendo reviews eligibility'], color: '#059669' },
              { step: '4', screen: 'Offer Presented', fields: ['Credit line amount', 'APR and terms disclosed', 'You choose to accept'], color: '#d97706' },
            ].map(s => (
              <div key={s.step} className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: s.color }}>{s.step}</div>
                  <div className="font-bold text-white text-sm">{s.screen}</div>
                </div>
                <div className="space-y-1.5">
                  {s.fields.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a href={yendoUrl} target="_blank" rel="nofollow noopener" className="btn-primary text-base py-4 px-10" onClick={() => trackAffiliateClick('homepage-demo')}>
            See If Your Car Qualifies →
          </a>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Checking eligibility typically uses a soft inquiry that does not affect your credit score. Confirm terms with Yendo directly. Mintbrooks is an independent educational resource and is not a lender.
          </p>
        </div>
      </div>
    </section>
  )
}
