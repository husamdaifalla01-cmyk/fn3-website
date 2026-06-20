import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Prime for Young Adults Explained: Is the $7.49/mo Plan Worth It? (Ages 18–24)',
  description:
    'An independent guide to the Prime young-adult plan: who qualifies (ages 18–24), what $7.49/month gets you, how the 6-month free trial works, and how it compares to Prime Student and standard Prime.',
  openGraph: {
    title: 'Prime for Young Adults Explained: Eligibility, Pricing & How to Claim',
    description: 'Independent guide for 18–24-year-olds: eligibility, the $7.49/mo price, the 6-month free trial, and how it stacks up against Prime Student.',
    type: 'article',
  },
}

const PRIME_URL = 'https://www.amazon.com/joinyoungadult?tag=mintbrooks-20'

const FAQ = [
  {
    q: 'Who qualifies for Prime for Young Adults?',
    a: 'Anyone aged 18–24 with a valid Amazon account. You must not currently have an active Prime membership.',
  },
  {
    q: 'How long is the free trial?',
    a: 'The trial is 6 months — completely free. After 6 months it auto-renews at $7.49/month (or $69/year) unless you cancel.',
  },
  {
    q: 'What happens when I turn 25?',
    a: 'Your plan automatically converts to standard Prime ($14.99/month). Amazon emails you in advance.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel any time before the trial ends and you won\'t be charged. No cancellation fee.',
  },
  {
    q: 'Is this different from Prime Student?',
    a: 'Both cost $7.49/month (50% off standard Prime). The difference is eligibility: Prime Student requires a valid .edu enrollment, while Prime for Young Adults just requires verifying you are 18–24 with a government ID — no student status needed.',
  },
]

export default function PrimeYoungAdultsPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 px-4"
        style={{ background: 'linear-gradient(145deg, #0d0c1d 0%, #111130 100%)' }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-20%', left: '-5%', width: '50%', height: '100%',
            background: 'radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 65%)',
          }}
        />
        <div className="max-w-4xl mx-auto relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: 'rgba(240,238,255,0.35)' }}>
            <Link href="/" className="no-underline hover:text-white transition-colors" style={{ color: 'inherit' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'rgba(240,238,255,0.7)' }}>Prime for Young Adults</span>
          </div>

          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
              style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }}
            >
              ✦ Verified Live
            </span>
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.25)' }}
            >
              Ages 18–24 only
            </span>
          </div>

          <h1
            className="font-black text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
          >
            Prime for <span style={{ color: '#34d399' }}>Young Adults</span>,<br />
            explained — is $7.49/mo worth it?
          </h1>
          <p
            className="mb-8 leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', color: 'rgba(240,238,255,0.62)', maxWidth: '540px' }}
          >
            Half-price Prime with a 6-month free trial. Free 2-day shipping, Prime Video, Prime Music,
            Prime Gaming, and more — built for 18–24-year-olds.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={PRIME_URL}
              target="_blank"
              rel="nofollow noopener"
              className="btn-emerald text-base font-bold py-4 px-10 text-center"
            >
              See the offer on Amazon →
            </a>
          </div>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.22)' }}>
            No credit card needed for trial · We earn a commission if you sign up
          </p>
        </div>
      </section>

      {/* Plan comparison */}
      <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-black mb-10 text-center"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--text)', letterSpacing: '-0.025em' }}
          >
            How much do you save?
          </h2>

          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {[
              { label: 'Standard Prime', price: '$14.99/mo', badge: null, highlight: false, note: 'Any age, full price' },
              { label: 'Prime Student', price: '$7.49/mo', badge: null, highlight: false, note: 'Requires .edu email' },
              {
                label: 'Prime for Young Adults',
                price: '$7.49/mo',
                badge: 'Best deal',
                highlight: true,
                note: 'No .edu needed — just age 18–24',
              },
            ].map((plan) => (
              <div
                key={plan.label}
                className="rounded-2xl p-6 text-center"
                style={{
                  background: plan.highlight ? 'linear-gradient(135deg, #0d2a1d, #0a1e28)' : 'var(--surface)',
                  border: plan.highlight ? '1.5px solid rgba(16,185,129,0.4)' : '1px solid rgba(124,58,237,0.10)',
                  boxShadow: plan.highlight ? '0 8px 40px rgba(16,185,129,0.12)' : '0 2px 12px rgba(15,10,30,0.05)',
                }}
              >
                {plan.badge && (
                  <div
                    className="text-xs font-bold px-2.5 py-1 rounded-full inline-block mb-3"
                    style={{ background: '#10b981', color: 'white' }}
                  >
                    ⚡ {plan.badge}
                  </div>
                )}
                <div
                  className="text-sm font-semibold mb-2"
                  style={{ color: plan.highlight ? 'rgba(240,238,255,0.6)' : 'var(--text-muted)' }}
                >
                  {plan.label}
                </div>
                <div
                  className="text-3xl font-black mb-2"
                  style={{ color: plan.highlight ? 'white' : 'var(--text)' }}
                >
                  {plan.price}
                </div>
                <div
                  className="text-xs"
                  style={{ color: plan.highlight ? 'rgba(240,238,255,0.4)' : 'var(--text-soft)' }}
                >
                  {plan.note}
                </div>
              </div>
            ))}
          </div>

          {/* Savings callout */}
          <div
            className="rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.07), rgba(16,185,129,0.05))', border: '1px solid rgba(124,58,237,0.12)' }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl"
              style={{ background: 'linear-gradient(135deg, #7c3aed22, #10b98122)', border: '1px solid rgba(124,58,237,0.2)' }}
            >
              💰
            </div>
            <div>
              <div className="text-xl font-black mb-1" style={{ color: 'var(--text)' }}>
                You save <span style={{ color: '#10b981' }}>$90/year</span> vs standard Prime
              </div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                That&apos;s $7.50/month back in your pocket — and the 6-month free trial saves you
                about $45 before you pay a cent.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What&apos;s included */}
      <section className="py-14 px-4" style={{ background: 'linear-gradient(180deg, #f8f7ff 0%, #f1eeff 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-black mb-10 text-center"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--text)', letterSpacing: '-0.025em' }}
          >
            Everything you get
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: '📦', title: 'Free 2-day shipping', body: 'On millions of items with no minimum order. Same-day available in many cities.' },
              { icon: '🎬', title: 'Prime Video', body: 'Streaming movies, shows, and Amazon Originals. Includes download for offline viewing.' },
              { icon: '🎵', title: 'Prime Music', body: '100M+ songs, ad-free. Plus podcasts and stations.' },
              { icon: '🎮', title: 'Prime Gaming', body: 'Free games and in-game loot every month. Twitch channel subscription included.' },
              { icon: '📚', title: 'Prime Reading', body: 'Thousands of books, magazines, and comics on Kindle at no extra cost.' },
              { icon: '📸', title: 'Amazon Photos', body: 'Unlimited full-resolution photo storage. Family vault for sharing.' },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 rounded-2xl"
                style={{ background: 'var(--surface)', border: '1px solid rgba(124,58,237,0.08)', boxShadow: '0 2px 12px rgba(15,10,30,0.04)' }}
              >
                <div className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</div>
                <div>
                  <div className="font-bold text-base mb-1" style={{ color: 'var(--text)' }}>{item.title}</div>
                  <div className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section
        className="py-14 px-4 text-center"
        style={{ background: 'linear-gradient(145deg, #0d0c1d, #150e2e)' }}
      >
        <div className="max-w-xl mx-auto">
          <div className="text-4xl mb-4">⚡</div>
          <h2
            className="font-black text-white mb-3"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', letterSpacing: '-0.025em' }}
          >
            Ready to claim your 6 free months?
          </h2>
          <p className="mb-7 text-sm" style={{ color: 'rgba(240,238,255,0.50)' }}>
            Takes 2 minutes. No credit card needed to start. Cancel before 6 months and pay nothing.
          </p>
          <a
            href={PRIME_URL}
            target="_blank"
            rel="nofollow noopener"
            className="btn-emerald text-base font-bold py-4 px-12"
          >
            See the offer on Amazon →
          </a>
          <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.18)' }}>
            Amazon affiliate link · We earn $30 when you sign up · No cost to you
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
        <div className="max-w-2xl mx-auto">
          <h2
            className="font-black mb-10 text-center"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', color: 'var(--text)', letterSpacing: '-0.025em' }}
          >
            Frequently asked questions
          </h2>

          <div className="space-y-4">
            {FAQ.map((item) => (
              <div
                key={item.q}
                className="p-6 rounded-2xl"
                style={{ background: 'var(--surface)', border: '1px solid rgba(124,58,237,0.08)', boxShadow: '0 2px 12px rgba(15,10,30,0.04)' }}
              >
                <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>{item.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FTC disclosure */}
      <div
        className="px-4 py-6 text-center text-xs"
        style={{ background: '#f1eeff', color: 'var(--text-muted)', borderTop: '1px solid rgba(124,58,237,0.08)' }}
      >
        <strong>Affiliate Disclosure:</strong> Stackperks is an Amazon Associate. We earn a commission of approximately $30 when
        you register for Amazon Prime for Young Adults through our links. This comes at no additional cost to you.
        Amazon Prime membership terms, pricing, and eligibility are set by Amazon and may change. Always verify current
        pricing on Amazon&apos;s website before signing up.
      </div>
    </>
  )
}
