import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Agency Pricing Guide 2026: What to Charge for AI Automation',
  description:
    'The 3 pricing models for AI automation agencies, example calculations, competitor benchmarks, and why value-based pricing beats hourly every time.',
  keywords: [
    'ai agency pricing',
    'how much to charge for ai automation',
    'ai automation pricing 2026',
    'ai consulting rates',
    'ai agency rates',
  ],
  openGraph: {
    title: 'AI Agency Pricing Guide 2026: What to Charge for AI Automation',
    description:
      'The 3 pricing models, example calculations, competitor analysis, and why value-based pricing beats hourly for AI automation work.',
    type: 'article',
  },
}

export default function AIAgencyPricingGuide() {
  return (
    <main className="min-h-screen bg-background text-text-primary antialiased">
      {/* Nav */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to FN3 Agency
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        {/* Header */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            Pricing Guide · 2026
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-6">
            AI Agency Pricing Guide 2026: What to Charge for AI Automation
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Pricing is the most commonly mishandled part of starting an AI automation agency. Most new operators
            charge hourly, undercharge, and burn out. This guide covers the three pricing models that work, with real
            numbers and the math behind them.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-text-muted">
            <span>~1,200 words</span>
            <span>·</span>
            <span>5 min read</span>
            <span>·</span>
            <span>Updated March 2026</span>
          </div>
        </header>

        {/* The mistake */}
        <section className="mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-5">
            The pricing mistake most AI agencies make
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Charging by the hour. It feels safe — you get paid for your time — but it creates a ceiling on what
            you can earn, penalizes you for getting faster, and makes your income unpredictable. Worse, it
            communicates to clients that your value is measured in hours rather than outcomes.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            AI automation work is outcome work. The client does not care how many hours it took you to configure
            the workflow — they care that their sales agent qualifies 50 leads a day without a human touching it.
            Price the outcome, not the effort.
          </p>
          <div className="bg-surface border border-white/[0.08] rounded-xl p-5">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              <div>
                <div className="font-semibold text-text-primary text-sm mb-1">Hourly pricing example</div>
                <p className="text-sm text-text-secondary">You build a lead qualification agent in 8 hours. You charge $150/hr = $1,200. The agent runs for 2 years and generates $200K in pipeline. You captured 0.6% of the value you created.</p>
              </div>
            </div>
          </div>
        </section>

        {/* The 3 models */}
        <section className="mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-5">
            The 3 pricing models that work
          </h2>

          {/* Model 1 */}
          <div className="bg-surface border border-accent/20 rounded-2xl p-7 mb-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">1</div>
              <h3 className="font-display text-xl font-bold text-text-primary">Value-based retainer</h3>
              <span className="ml-auto text-xs font-medium text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">Recommended</span>
            </div>
            <p className="text-text-secondary leading-relaxed mb-5">
              A one-time setup fee to build and deploy the system, followed by a monthly retainer to maintain,
              monitor, and improve it. Price the retainer at roughly one-fifth of the monthly value you create
              (see the 1/5th rule in the{' '}
              <Link href="/guides/ai-automation-agency#pricing" className="text-accent hover:underline">
                full agency guide
              </Link>
              ).
            </p>

            <div className="space-y-3 mb-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-text-muted">Example: E-commerce client (12 employees)</div>
              <div className="bg-surface-2 rounded-xl p-4 space-y-2.5 text-sm">
                {[
                  ['Value created per month', '$4,200 (35 hours @ $30/hr avg + $1,100 pipeline value)'],
                  ['Setup fee', '$2,500 (one-time)'],
                  ['Monthly retainer', '$850 (1/5th of value)'],
                  ['Client payback period', '~3 months'],
                  ['Year-1 gross margin (your side)', '~72%'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-b border-white/[0.05] pb-2 last:border-0 last:pb-0">
                    <span className="text-text-secondary">{label}</span>
                    <span className="text-text-primary font-medium text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 text-sm">
              <div>
                <div className="text-xs text-text-muted mb-1">Best for</div>
                <div className="text-text-secondary">Long-term relationships, ongoing optimization work</div>
              </div>
              <div>
                <div className="text-xs text-text-muted mb-1">Risk</div>
                <div className="text-text-secondary">Requires demonstrating ROI clearly upfront</div>
              </div>
            </div>
          </div>

          {/* Model 2 */}
          <div className="bg-surface border border-white/[0.08] rounded-2xl p-7 mb-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-text-secondary font-bold text-sm">2</div>
              <h3 className="font-display text-xl font-bold text-text-primary">Project-based pricing</h3>
            </div>
            <p className="text-text-secondary leading-relaxed mb-5">
              A fixed fee to deliver a defined scope: build the automation, integrate it, train the client, and
              hand it over. No ongoing retainer. Good for clients who are not ready to commit to a retainer yet,
              or for agencies that want straightforward cash flow in early stages.
            </p>

            <div className="bg-surface-2 rounded-xl p-4 mb-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Typical project ranges (2026 market rates)</div>
              <div className="space-y-2 text-sm">
                {[
                  ['Single workflow automation', '$800 – $2,500'],
                  ['One-department agent setup', '$2,000 – $5,000'],
                  ['Multi-department AI workforce', '$5,000 – $15,000'],
                  ['Enterprise implementation', '$15,000 – $50,000+'],
                ].map(([scope, range]) => (
                  <div key={scope} className="flex justify-between gap-4 border-b border-white/[0.05] pb-2 last:border-0 last:pb-0">
                    <span className="text-text-secondary">{scope}</span>
                    <span className="text-text-primary font-medium">{range}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-text-secondary">
              The downside: you trade the compounding value of a retainer for one-time revenue. Consider adding an
              optional maintenance add-on at $300–$600/month even on project engagements — most clients will take it
              once they see the system working.
            </p>
          </div>

          {/* Model 3 */}
          <div className="bg-surface border border-white/[0.08] rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-text-secondary font-bold text-sm">3</div>
              <h3 className="font-display text-xl font-bold text-text-primary">Percentage of savings</h3>
            </div>
            <p className="text-text-secondary leading-relaxed mb-5">
              You take a percentage — typically 15–25% — of the measurable savings generated. No upfront cost for the
              client. You only get paid when the automation delivers.
            </p>

            <div className="bg-surface-2 rounded-xl p-4 mb-5 text-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Example</div>
              <p className="text-text-secondary leading-relaxed">
                Client is spending $8,000/month on manual data entry. You automate it, reducing cost to $1,200/month
                in tooling. Monthly savings: $6,800. At 20%, you earn $1,360/month. Over 12 months: $16,320 — with
                zero upfront friction for the client.
              </p>
            </div>

            <div className="flex gap-4 text-sm">
              <div>
                <div className="text-xs text-text-muted mb-1">Best for</div>
                <div className="text-text-secondary">Risk-averse clients, high-conviction opportunities</div>
              </div>
              <div>
                <div className="text-xs text-text-muted mb-1">Risk</div>
                <div className="text-text-secondary">Hard to verify savings; needs trust and measurement framework</div>
              </div>
            </div>
          </div>
        </section>

        {/* Competitor analysis */}
        <section className="mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-5">
            What the market charges (2026 benchmarks)
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Market rates for AI automation work have risen sharply since 2024. Here is where pricing is landing
            for different types of providers:
          </p>

          <div className="bg-surface border border-white/[0.08] rounded-2xl overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] bg-surface-2/40">
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Provider type</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Setup</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Monthly</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Freelancer (Upwork)', '$500–$1,500', '$200–$600'],
                  ['Boutique AI agency', '$2,000–$8,000', '$600–$2,500'],
                  ['Full-service agency (FN3-style)', '$2,000–$5,000', '$500–$1,500'],
                  ['Big 4 consulting', '$50,000+', '$15,000+'],
                  ['In-house AI developer', '$0 upfront', '$7,500–$12,500 (salary/12)'],
                ].map(([type, setup, monthly], i) => (
                  <tr key={type} className={`border-b border-white/[0.05] ${i === 4 ? 'border-b-0' : ''}`}>
                    <td className="px-5 py-3.5 text-text-primary font-medium">{type}</td>
                    <td className="px-5 py-3.5 text-text-secondary">{setup}</td>
                    <td className="px-5 py-3.5 text-text-secondary">{monthly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-text-secondary leading-relaxed">
            The market sweet spot for SMB clients is a $2,000–$5,000 setup fee and $500–$1,500/month in retainer.
            This is the range where you are priced well below in-house hiring costs but still far enough above
            freelancer rates to signal quality and seriousness. It is also where{' '}
            <Link href="/#pricing" className="text-accent hover:underline">FN3 Agency&rsquo;s pricing</Link>{' '}
            sits — with documented case studies showing consistent 3–6 week payback periods.
          </p>
        </section>

        {/* Why value-based wins */}
        <section className="mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-5">
            Why value-based pricing beats hourly, always
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Three structural reasons value-based pricing outperforms hourly for AI automation work:
          </p>

          <div className="space-y-4">
            <div className="bg-surface border border-white/[0.08] rounded-xl p-5">
              <h3 className="font-semibold text-text-primary mb-2">AI makes you faster over time</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                As you build more automations, you reuse components, frameworks, and templates. A workflow that took
                you 10 hours to build in month 1 takes 3 hours in month 6. Hourly pricing punishes this. Value-based
                pricing rewards it — you earn more per hour as you get better.
              </p>
            </div>
            <div className="bg-surface border border-white/[0.08] rounded-xl p-5">
              <h3 className="font-semibold text-text-primary mb-2">You are competing on outcomes, not cost</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                When clients see hourly rates, they compare you to other hourly contractors. When they see value-based
                pricing with an ROI projection, they compare you to the alternative (doing nothing, hiring someone,
                staying manual). You win that comparison every time.
              </p>
            </div>
            <div className="bg-surface border border-white/[0.08] rounded-xl p-5">
              <h3 className="font-semibold text-text-primary mb-2">Retainers create compounding revenue</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                A 10-client agency at $800/month average retainer generates $8,000/month in predictable, recurring
                revenue. That is a business you can plan around, hire for, and sell. Ten hourly clients mean ten
                uncertain project pipelines.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/[0.08] pt-12">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
            See value-based pricing in practice
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            FN3 Agency uses a value-based setup + retainer model across all three of its pricing tiers. The ROI
            calculator on the homepage shows clients their projected savings before they ever get on a call.
            Browse the full pricing breakdown and case studies to see how the numbers work in production.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/#pricing"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-accent text-sm"
            >
              See FN3 Pricing
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/guides/ai-automation-agency"
              className="inline-flex items-center justify-center gap-2 border border-white/[0.12] hover:border-accent/40 text-text-secondary hover:text-text-primary font-medium px-6 py-3.5 rounded-xl transition-all duration-200 text-sm"
            >
              How to Start an AI Automation Agency
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
