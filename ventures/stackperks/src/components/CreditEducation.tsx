// FICO score composition source: myFICO.com — "What's in my FICO Scores"
// https://www.myfico.com/credit-education/whats-in-your-credit-score
export default function CreditEducation() {
  return (
    <section style={{ background: '#fef9ee' }} className="py-20">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(217,119,6,0.1)', color: '#d97706' }}>
            💡 Credit Decoded
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: '#1c1917' }}>
            How Credit Actually Works
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ color: '#78716c' }}>
            Most people are losing points without knowing it. Here's what actually moves your score — and how a car-secured card helps every factor.
          </p>
        </div>

        {/* Score breakdown visual */}
        <div className="grid md:grid-cols-2 gap-10 mb-16 items-center">
          <div>
            <div className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: '#78716c' }}>What Makes Up Your Credit Score</div>
            <div className="text-xs mb-5" style={{ color: '#a8a29e' }}>Source: FICO® — myfico.com/credit-education</div>
            <div className="space-y-4">
              {[
                { label: 'Payment History', pct: 35, color: '#d97706', tip: 'The single biggest factor. According to FICO, even one missed payment can meaningfully lower your score — the impact depends on your full credit profile.' },
                { label: 'Credit Utilization', pct: 30, color: '#10b981', tip: 'Keep balances below 30% of your limit. Car-secured cards give you higher limits, which automatically helps this ratio.' },
                { label: 'Length of History', pct: 15, color: '#8b5cf6', tip: 'The longer your accounts are open, the better. Start building now.' },
                { label: 'Credit Mix', pct: 10, color: '#f59e0b', tip: 'Having a revolving card (like Yendo) improves your mix, especially if you only have loans.' },
                { label: 'New Credit', pct: 10, color: '#ef4444', tip: 'Soft checks don\'t affect your score. Yendo\'s application is soft-pull only.' },
              ].map(f => (
                <div key={f.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-semibold" style={{ color: '#1c1917' }}>{f.label}</span>
                    <span className="text-sm font-black" style={{ color: f.color }}>{f.pct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(28,25,23,0.08)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${f.pct}%`, background: f.color }}
                    />
                  </div>
                  <div className="text-xs mt-1.5 leading-snug" style={{ color: '#78716c' }}>{f.tip}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Utilization explainer */}
          <div className="space-y-5">
            <div className="rounded-2xl p-6 shadow-sm" style={{ background: 'white', border: '1px solid rgba(217,119,6,0.1)' }}>
              <div className="text-lg font-black mb-1" style={{ color: '#1c1917' }}>The Utilization Factor</div>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: '#78716c' }}>
                Credit utilization = your balance ÷ your limit. FICO says it accounts for roughly 30% of your score, and most people hurt it without realizing.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3 text-center" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
                  <div className="text-xs font-bold uppercase mb-1" style={{ color: '#ef4444' }}>Secured Card</div>
                  <div className="text-2xl font-black" style={{ color: '#dc2626' }}>80%</div>
                  <div className="text-xs" style={{ color: '#f87171' }}>$400 on $500 limit</div>
                  <div className="text-xs mt-1" style={{ color: '#78716c' }}>High utilization</div>
                </div>
                <div className="rounded-xl p-3 text-center" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                  <div className="text-xs font-bold uppercase mb-1" style={{ color: '#16a34a' }}>Car-Secured Card</div>
                  <div className="text-2xl font-black" style={{ color: '#15803d' }}>8%</div>
                  <div className="text-xs" style={{ color: '#22c55e' }}>$400 on $5,000 limit</div>
                  <div className="text-xs mt-1" style={{ color: '#78716c' }}>Lower utilization</div>
                </div>
              </div>
              <p className="text-xs mt-3 text-center" style={{ color: '#a8a29e' }}>Same spending, different utilization ratio. Lower is generally better.</p>
            </div>

            <div className="rounded-2xl p-6 shadow-sm" style={{ background: 'white', border: '1px solid rgba(217,119,6,0.1)' }}>
              <div className="text-lg font-black mb-1" style={{ color: '#1c1917' }}>How Credit Building Typically Progresses</div>
              <p className="text-sm mb-4" style={{ color: '#78716c' }}>With consistent on-time payments and low utilization — general pattern, not a guarantee:</p>
              <div className="space-y-2">
                {[
                  { month: '30 days', label: 'First payment reported', pct: '15%' },
                  { month: '90 days', label: 'Utilization pattern establishes', pct: '40%' },
                  { month: '6 months', label: 'Sustained positive history', pct: '70%' },
                  { month: '12 months', label: 'Longer-term profile builds', pct: '100%' },
                ].map(r => (
                  <div key={r.month} className="flex items-center gap-3">
                    <div className="text-xs font-bold w-20 flex-shrink-0" style={{ color: '#a8a29e' }}>{r.month}</div>
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(28,25,23,0.08)' }}>
                      <div className="h-full rounded-full" style={{ width: r.pct, background: '#d97706' }} />
                    </div>
                    <div className="text-xs w-40 text-right flex-shrink-0" style={{ color: '#78716c' }}>{r.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-3 p-3 rounded-lg" style={{ color: '#a8a29e', background: 'rgba(28,25,23,0.04)' }}>Credit score changes depend on your full credit profile. No specific improvement can be guaranteed. This is general educational information only.</p>
            </div>
          </div>
        </div>

        {/* Did you know callouts */}
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: '🔍',
              title: 'Soft Pull vs. Hard Pull',
              body: 'Most credit card applications trigger a hard inquiry. According to FICO, a hard inquiry typically has a small effect on most scores — often fewer than 5 points — though impact varies. Yendo\'s initial application uses a soft pull. Zero score impact just to check eligibility.',
              highlight: 'No score impact to check',
            },
            {
              icon: '🏦',
              title: 'Why Traditional Cards Are Hard to Get',
              body: 'Many card issuers use score-based underwriting thresholds. If your score falls below their cutoff, you\'re declined regardless of other factors. Car-secured credit is evaluated primarily on vehicle equity rather than a credit score threshold — the car is the collateral.',
              highlight: 'Different approval criteria',
            },
            {
              icon: '📈',
              title: 'Access + Credit Building',
              body: 'With a car-secured card, you get a revolving credit line (Yendo advertises up to $10,000) AND monthly reporting to all three bureaus. A higher limit means lower utilization at the same spending level, which generally helps your score over time.',
              highlight: 'Credit access + score building',
            },
          ].map(c => (
            <div key={c.title} className="rounded-2xl p-6 shadow-sm" style={{ background: 'white', border: '1px solid rgba(217,119,6,0.1)' }}>
              <div className="text-3xl mb-3">{c.icon}</div>
              <div className="text-base font-black mb-2" style={{ color: '#1c1917' }}>{c.title}</div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#78716c' }}>{c.body}</p>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: 'rgba(217,119,6,0.1)', color: '#d97706' }}>
                ✓ {c.highlight}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
