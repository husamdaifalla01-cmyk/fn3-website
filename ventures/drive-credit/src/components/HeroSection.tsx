'use client'
import Image from 'next/image'
import { trackAffiliateClick } from '@/lib/analytics'

interface HeroProps {
  yendoUrl: string
  calculatorHref: string
}

export default function HeroSection({ yendoUrl, calculatorHref }: HeroProps) {
  return (
    <section
      className="relative overflow-x-hidden"
      style={{ background: 'linear-gradient(150deg, #1c1917 0%, #292524 55%, #1c1917 100%)' }}
    >
      {/* Warm amber glow — subtle */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-20%',
          left: '-10%',
          width: '60%',
          height: '100%',
          background: 'radial-gradient(ellipse, rgba(217,119,6,0.12) 0%, transparent 65%)',
        }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(251,191,36,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-0 min-h-[640px] items-center">

          {/* ── LEFT: Copy ── */}
          <div className="py-20 lg:py-28 pr-0 lg:pr-14">

            {/* Trust badge */}
            <div className="flex items-center gap-3 mb-7 flex-wrap">
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
                style={{ background: 'rgba(217,119,6,0.15)', color: '#fbbf24', border: '1px solid rgba(217,119,6,0.3)' }}
              >
                🚗 Car-Secured Credit
              </span>
              <a
                href="#disclosure"
                className="text-xs underline-offset-2 underline"
                style={{ color: 'rgba(255,255,255,0.28)' }}
              >
                Affiliate resource
              </a>
            </div>

            {/* Headline — 2-second skim */}
            <h1
              className="font-black leading-tight mb-5 text-white"
              style={{
                fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)',
                letterSpacing: '-0.025em',
              }}
            >
              Credit rejected?<br />
              <span style={{ color: '#fbbf24' }}>Your car</span> can say yes.
            </h1>

            {/* Emotional hook — lifestyle angle */}
            <p
              className="mb-2 leading-relaxed"
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                color: 'rgba(255,255,255,0.62)',
                maxWidth: '460px',
              }}
            >
              Stop worrying about money. Start focusing on what matters — your family, your life, your future.
            </p>
            <p
              className="mb-7 leading-relaxed"
              style={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.42)',
                maxWidth: '440px',
              }}
            >
              Car-secured credit uses your <strong style={{ color: 'rgba(255,255,255,0.7)' }}>vehicle equity</strong> — not your score. Up to $10,000. No deposit. Keep driving.
            </p>

            {/* Skim bullets — keyword first, 4 words, fast */}
            <ul className="mb-9 space-y-2.5">
              {[
                ['No hard credit pull', 'checking won\'t hurt your score'],
                ['No cash deposit', 'nothing locked up upfront'],
                ['Builds credit history', 'every on-time payment counts'],
                ['Available in 36+ states', 'see eligibility in minutes'],
              ].map(([kw, rest]) => (
                <li key={kw} className="flex items-start gap-2.5 text-sm">
                  <span style={{ color: '#34d399', fontSize: '15px', flexShrink: 0, marginTop: '2px' }}>✓</span>
                  <span>
                    <strong className="text-white font-semibold">{kw}</strong>
                    <span style={{ color: 'rgba(255,255,255,0.38)' }}> — {rest}</span>
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA stack */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <a
                href={yendoUrl}
                target="_blank"
                rel="nofollow noopener"
                className="btn-primary text-base font-bold py-4 px-8"
                onClick={() => trackAffiliateClick('homepage-hero')}
              >
                Check My Car's Eligibility →
              </a>
              <a
                href={calculatorHref}
                className="btn-ghost-dark text-base py-4 px-7"
              >
                Estimate My Limit Free
              </a>
            </div>

            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Soft inquiry only · No score impact · We may earn a commission
            </p>
          </div>

          {/* ── RIGHT: Lifestyle image ── */}
          <div className="relative hidden lg:flex items-end justify-center h-full pt-12">
            {/* Wrapper: position context for floating badges, no overflow clip */}
            <div
              className="relative"
              style={{ width: '430px', maxWidth: '100%' }}
            >
              {/* Image card — only this clips */}
              <div
                className="relative rounded-t-3xl overflow-hidden"
                style={{
                  height: '520px',
                  boxShadow: '0 -24px 80px rgba(217,119,6,0.12), 0 0 0 1px rgba(255,255,255,0.06)',
                }}
              >
                {/* Family/friends lifestyle photo */}
                <Image
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=860&q=85&fit=crop&crop=faces,center"
                  alt="People enjoying life with financial freedom"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 430px"
                  className="object-cover object-top"
                />
                {/* Warm gradient overlay at bottom */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(28,25,23,0.65) 0%, rgba(28,25,23,0.1) 40%, transparent 65%)' }}
                />
                {/* Left gradient bleed into hero */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to right, rgba(28,25,23,0.3) 0%, transparent 30%)' }}
                />
              </div>

              {/* Floating: No deposit — outside image clip div */}
              <div
                className="absolute top-7 -left-7 rounded-2xl px-4 py-3"
                style={{
                  background: 'rgba(28,25,23,0.92)',
                  border: '1px solid rgba(217,119,6,0.3)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                <div className="text-xs font-bold text-white">No Deposit</div>
                <div className="text-xs" style={{ color: '#fbbf24' }}>Required upfront</div>
              </div>

              {/* Floating: Credit range — outside image clip div */}
              <div
                className="absolute bottom-10 -left-8 rounded-2xl px-4 py-3.5"
                style={{
                  background: 'rgba(28,25,23,0.94)',
                  border: '1px solid rgba(52,211,153,0.28)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                }}
              >
                <div className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Estimated credit range</div>
                <div className="text-xl font-black text-white">$500 – $10,000</div>
                <div className="text-xs mt-0.5" style={{ color: '#34d399' }}>Based on your vehicle equity</div>
              </div>

              {/* Floating: Soft inquiry — outside image clip div */}
              <div
                className="absolute top-7 -right-7 rounded-xl px-3.5 py-2.5"
                style={{
                  background: 'rgba(28,25,23,0.92)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="text-xs font-semibold" style={{ color: '#34d399' }}>✓ Soft inquiry</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Score not affected</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
