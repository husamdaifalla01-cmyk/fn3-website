'use client'
import Link from 'next/link'

export default function StackperksHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #0d0c1d 0%, #150e2e 50%, #0a0d1f 100%)' }}
    >
      {/* Violet glow — top left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-15%',
          left: '-5%',
          width: '55%',
          height: '90%',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 65%)',
        }}
      />
      {/* Emerald glow — bottom right */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%',
          right: '-5%',
          width: '40%',
          height: '70%',
          background: 'radial-gradient(ellipse, rgba(16,185,129,0.10) 0%, transparent 65%)',
        }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(167,139,250,0.07) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 min-h-[640px] items-center py-20 lg:py-28">

          {/* ── LEFT: Copy ── */}
          <div>
            {/* Badge */}
            <div className="flex items-center gap-3 mb-7 flex-wrap">
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
                style={{ background: 'rgba(124,58,237,0.18)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.35)' }}
              >
                ✦ Deals built for you
              </span>
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.25)' }}
              >
                18–24? You qualify.
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-black leading-tight mb-5 text-white"
              style={{ fontSize: 'clamp(2.2rem, 4.8vw, 3.6rem)', letterSpacing: '-0.03em' }}
            >
              Stack every perk.<br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #a78bfa, #34d399)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Pay nothing.
              </span>
            </h1>

            <p
              className="mb-3 leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', color: 'rgba(240,238,255,0.68)', maxWidth: '480px' }}
            >
              The best deals for 18–24-year-olds — Amazon Prime at half price, student credit bonuses,
              and cash-back offers — all in one place. No gimmicks, no hidden fees.
            </p>
            <p
              className="mb-8 text-sm"
              style={{ color: 'rgba(240,238,255,0.35)' }}
            >
              Free to use · FTC-compliant · Updated weekly
            </p>

            {/* Feature bullets */}
            <ul className="mb-9 space-y-2.5">
              {[
                ['Prime for Young Adults', 'save $70/year — most people don\'t know this exists'],
                ['Student credit cards', '$50–$200 sign-up bonuses, no credit history needed'],
                ['Cash-back CPA offers', 'insurance, finance, lifestyle — zero cost to claim'],
              ].map(([kw, rest]) => (
                <li key={kw} className="flex items-start gap-2.5 text-sm">
                  <span style={{ color: '#34d399', fontSize: '15px', flexShrink: 0, marginTop: '2px' }}>✓</span>
                  <span>
                    <strong className="text-white font-semibold">{kw}</strong>
                    <span style={{ color: 'rgba(240,238,255,0.38)' }}> — {rest}</span>
                  </span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Link href="/prime-young-adults" className="btn-emerald text-base font-bold py-4 px-8 text-center">
                Claim Prime for $0 Today →
              </Link>
              <Link href="/student-credit-cards" className="btn-ghost-dark text-base py-4 px-7">
                Browse Student Cards
              </Link>
            </div>

            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.22)' }}>
              We earn a commission when you sign up · No cost to you
            </p>
          </div>

          {/* ── RIGHT: Featured offer card ── */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-[400px]"
              style={{ filter: 'drop-shadow(0 24px 60px rgba(124,58,237,0.28))' }}
            >
              {/* Prime offer card */}
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #1a1035 0%, #0f0a24 100%)',
                  border: '1px solid rgba(167,139,250,0.18)',
                }}
              >
                {/* Card header */}
                <div
                  className="px-6 pt-6 pb-5"
                  style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(16,185,129,0.10))' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                        style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}
                      >
                        ⚡
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#34d399' }}>
                        Top Deal
                      </span>
                    </div>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.25)' }}
                    >
                      $30 earned
                    </span>
                  </div>
                  <div className="text-2xl font-black text-white mb-1">Amazon Prime</div>
                  <div className="text-sm font-semibold" style={{ color: '#a78bfa' }}>Young Adults Edition</div>
                </div>

                {/* Card body */}
                <div className="px-6 py-5">
                  <div className="flex items-end gap-3 mb-4">
                    <div>
                      <div className="text-3xl font-black text-white">$7.49</div>
                      <div className="text-xs" style={{ color: 'rgba(240,238,255,0.4)' }}>/month (ages 18–24)</div>
                    </div>
                    <div className="mb-1">
                      <div className="text-sm line-through" style={{ color: 'rgba(240,238,255,0.3)' }}>$14.99</div>
                      <div className="text-xs font-bold" style={{ color: '#34d399' }}>Save 50%</div>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-5">
                    {[
                      'Free 2-day shipping',
                      'Prime Video included',
                      'Prime Music + Gaming',
                      '6-month FREE trial',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(240,238,255,0.65)' }}>
                        <span style={{ color: '#34d399' }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/prime-young-adults"
                    className="block w-full btn-emerald text-sm text-center py-3.5 font-bold"
                  >
                    Start Free 6-Month Trial →
                  </Link>

                  <p className="text-center text-xs mt-3" style={{ color: 'rgba(240,238,255,0.25)' }}>
                    Must be 18–24 · Amazon affiliate link
                  </p>
                </div>
              </div>

              {/* Floating: savings badge */}
              <div
                className="absolute -top-3 -right-3 rounded-2xl px-3.5 py-2.5 text-center"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  boxShadow: '0 8px 24px rgba(245,158,11,0.40)',
                }}
              >
                <div className="text-xs font-black text-white leading-tight">$70</div>
                <div className="text-xs font-bold text-white leading-tight" style={{ opacity: 0.85 }}>saved/yr</div>
              </div>

              {/* Floating: verified badge */}
              <div
                className="absolute -bottom-3 -left-3 rounded-2xl px-3.5 py-2.5"
                style={{
                  background: 'rgba(13,12,29,0.95)',
                  border: '1px solid rgba(167,139,250,0.25)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="text-xs font-bold text-white">✓ Verified live</div>
                <div className="text-xs" style={{ color: 'rgba(240,238,255,0.4)' }}>Updated today</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
