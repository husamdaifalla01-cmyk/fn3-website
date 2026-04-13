import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FN3 Agency vs. Hiring an AI Developer | AI Automation Agency',
  description:
    'Compare FN3 Agency to hiring a full-time AI developer. See the cost difference, time to results, maintenance model, and ongoing support — and why most businesses choose FN3.',
  keywords: [
    'FN3 Agency vs AI developer',
    'hire AI developer vs agency',
    'AI automation agency',
    'AI workforce for business',
    'AI deployment cost',
  ],
  openGraph: {
    title: 'FN3 Agency vs. Hiring an AI Developer | AI Automation Agency',
    description:
      'Compare FN3 Agency to hiring a full-time AI developer. Cost, time to results, maintenance, and support — side by side.',
    type: 'website',
  },
}

const rows = [
  {
    category: 'Upfront cost',
    fn3: '$2,000 – $5,000 setup fee',
    hiring: '$0 upfront, but 3–6 month recruiting process',
    winner: 'fn3',
  },
  {
    category: 'Ongoing cost',
    fn3: '$500 – $1,500 / month',
    hiring: '$90,000 – $150,000 / year salary + benefits + equity',
    winner: 'fn3',
  },
  {
    category: 'Time to first results',
    fn3: 'Live in 5 business days',
    hiring: '3–6 months to hire, then ramp-up time',
    winner: 'fn3',
  },
  {
    category: 'Departments covered',
    fn3: 'All 6: Sales, Marketing, Support, Operations, Finance, Legal',
    hiring: 'One specialist — deep in one area only',
    winner: 'fn3',
  },
  {
    category: 'Maintenance & updates',
    fn3: 'Included. We maintain, retrain, and update agents continuously.',
    hiring: 'On you — or hire again when technology changes',
    winner: 'fn3',
  },
  {
    category: 'Ongoing optimization',
    fn3: 'Monthly strategy calls. Weekly on Growth+. Agents tuned every sprint.',
    hiring: 'Depends entirely on the individual hire',
    winner: 'fn3',
  },
  {
    category: 'Support model',
    fn3: 'Dedicated team with founder-level accountability',
    hiring: 'Single point of failure — what if they leave?',
    winner: 'fn3',
  },
  {
    category: 'Integration breadth',
    fn3: '30+ integrations covered on Growth plan and above',
    hiring: 'Skilled in whatever stack they know',
    winner: 'fn3',
  },
  {
    category: 'Risk',
    fn3: 'Month-to-month. No lock-in. Full handover if you cancel.',
    hiring: 'Severance, IP disputes, knowledge locked in one person',
    winner: 'fn3',
  },
  {
    category: 'Scale',
    fn3: 'Upgrade plan to add agents across any department in days',
    hiring: 'Hire another developer — start the 6-month process again',
    winner: 'fn3',
  },
]

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-background text-text-primary antialiased">
      {/* Nav back link */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            Side-by-Side Comparison
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-5">
            FN3 Agency vs.{' '}
            <span className="gradient-text">Hiring an AI Developer</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Both get you AI in your business. The cost, speed, and risk profile are very different. Here&rsquo;s the honest comparison.
          </p>
        </div>

        {/* Summary cost callout */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="bg-surface border border-white/[0.08] rounded-2xl p-6 text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Hiring an AI Developer</div>
            <div className="text-4xl font-bold text-red-400 mb-1">$90K–$150K</div>
            <div className="text-sm text-text-secondary">per year in salary alone</div>
            <div className="text-xs text-text-muted mt-2">+ 3–6 months to hire + benefits + equity</div>
          </div>
          <div className="bg-surface border border-accent/25 rounded-2xl p-6 text-center shadow-accent-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">FN3 Agency</div>
            <div className="text-4xl font-bold gradient-text mb-1">$2K–$5K</div>
            <div className="text-sm text-text-secondary">one-time setup + $500–$1,500/month</div>
            <div className="text-xs text-text-muted mt-2">Live in 5 days. All 6 departments covered.</div>
          </div>
        </div>

        {/* Comparison table — desktop */}
        <div className="hidden md:block bg-surface border border-white/[0.08] rounded-2xl overflow-hidden shadow-card mb-10">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08] bg-surface-2/60">
                <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider w-1/4">Category</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider w-[37.5%]">
                  <span className="gradient-text">FN3 Agency</span>
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider w-[37.5%]">Hiring an AI Developer</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.category}
                  className={`border-b border-white/[0.05] hover:bg-surface-2/30 transition-colors duration-150 ${i === rows.length - 1 ? 'border-b-0' : ''}`}
                >
                  <td className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-muted">{row.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span className="text-sm text-text-primary">{row.fn3}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-red-400/60 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                      <span className="text-sm text-text-secondary">{row.hiring}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Comparison cards — mobile */}
        <div className="md:hidden space-y-4 mb-10">
          {rows.map((row) => (
            <div key={row.category} className="bg-surface border border-white/[0.08] rounded-xl p-5">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">{row.category}</div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <div>
                    <div className="text-[10px] text-accent font-semibold uppercase tracking-wide mb-0.5">FN3 Agency</div>
                    <p className="text-sm text-text-primary">{row.fn3}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-400/60 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                  <div>
                    <div className="text-[10px] text-text-muted font-semibold uppercase tracking-wide mb-0.5">Hiring a Developer</div>
                    <p className="text-sm text-text-secondary">{row.hiring}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="bg-surface border border-white/[0.07] rounded-2xl p-8 mb-10">
          <h2 className="font-display text-xl font-bold text-text-primary mb-3">
            When does it make sense to hire an AI developer?
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            If you need deeply custom AI infrastructure, are building an AI-native product, or have engineering resources to support and scale AI systems internally — hiring may be right for you.
          </p>
          <p className="text-sm text-text-secondary leading-relaxed">
            If you run a business that needs AI automation across multiple functions, wants results in days not months, and doesn&rsquo;t want to manage technical infrastructure — FN3 is built for you.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-text-secondary mb-6 text-lg">
            Ready to see what&rsquo;s possible for your business?
          </p>
          <Link
            href="/#apply"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-accent"
          >
            Apply for Your AI Workforce
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  )
}
