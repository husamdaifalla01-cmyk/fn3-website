import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'GL Coding Best Practices for Accounting Firms (2026 Guide)',
  description: 'Master general ledger coding with standard GL code ranges, industry-specific codes, common mistakes to avoid, and how AI improves accuracy. Chart of accounts setup guide.',
  keywords: ['gl coding best practices', 'general ledger coding accounting', 'GL code ranges', 'chart of accounts setup', 'GL code automation'],
  openGraph: {
    title: 'GL Coding Best Practices for Accounting Firms (2026 Guide)',
    description: 'Master general ledger coding with standard GL code ranges, industry-specific codes, common mistakes to avoid, and how AI improves accuracy.',
    type: 'article',
  },
}

const glCodeRanges = [
  { range: '1000–1999', category: 'Assets', examples: 'Cash, Accounts Receivable, Inventory, Equipment', color: 'text-[#4f8ef7]', border: 'border-[#4f8ef7]/20', bg: 'bg-[#4f8ef7]/5' },
  { range: '2000–2999', category: 'Liabilities', examples: 'Accounts Payable, Credit Cards, Loans Payable', color: 'text-yellow-400', border: 'border-yellow-400/20', bg: 'bg-yellow-400/5' },
  { range: '3000–3999', category: 'Equity', examples: "Owner's Equity, Retained Earnings, Common Stock", color: 'text-purple-400', border: 'border-purple-400/20', bg: 'bg-purple-400/5' },
  { range: '4000–4999', category: 'Revenue', examples: 'Service Revenue, Product Sales, Interest Income', color: 'text-green-400', border: 'border-green-400/20', bg: 'bg-green-400/5' },
  { range: '5000–5999', category: 'Cost of Goods Sold', examples: 'Direct Labor, Raw Materials, Manufacturing Overhead', color: 'text-orange-400', border: 'border-orange-400/20', bg: 'bg-orange-400/5' },
  { range: '6000–6999', category: 'Operating Expenses', examples: 'Rent, Software, Salaries, Marketing, Utilities', color: 'text-red-400', border: 'border-red-400/20', bg: 'bg-red-400/5' },
]

export default function GLCodingBestPracticesGuide() {
  return (
    <div className="min-h-screen bg-[#0f0f14] text-[#e2e8f0]">
      <Navbar variant="landing" />

      <main className="max-w-3xl mx-auto px-6 py-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-white/30 mb-10">
          <Link href="/" className="hover:text-white/60 transition-colors">InvoiceFlow</Link>
          <span>›</span>
          <Link href="/guides" className="hover:text-white/60 transition-colors">Guides</Link>
          <span>›</span>
          <span className="text-white/50">GL Coding Best Practices</span>
        </nav>

        {/* Header */}
        <header className="mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4f8ef7]/10 border border-[#4f8ef7]/20 rounded-full text-xs text-[#4f8ef7] font-medium mb-6">
            Guide · 6 min read
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            GL Coding Best Practices for Accounting Firms (2026 Guide)
          </h1>
          <p className="text-xl text-white/50 leading-relaxed">
            Consistent general ledger coding is the foundation of accurate financial reporting. Whether you&apos;re setting up a new chart of accounts or cleaning up an existing one, these practices will save hours of reconciliation and produce cleaner books.
          </p>
        </header>

        <article className="space-y-12">

          {/* Section 1: Standard GL Code Ranges */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Standard GL Code Ranges</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              Most accounting systems follow a standardized numbering convention for GL codes. Understanding the ranges makes your chart of accounts intuitive for any accountant who works with your books — and makes it significantly easier to automate coding rules.
            </p>
            <div className="space-y-3">
              {glCodeRanges.map((item) => (
                <div key={item.range} className={`${item.bg} border ${item.border} rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3`}>
                  <div className={`font-mono font-bold ${item.color} text-sm w-24 flex-shrink-0`}>{item.range}</div>
                  <div className="flex-1">
                    <span className={`font-semibold ${item.color} text-sm`}>{item.category}</span>
                    <span className="text-white/40 text-sm ml-3">{item.examples}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-white/60 leading-relaxed mt-6">
              Within the 6000–6999 operating expenses range, most firms further subdivide by function: 6000–6099 for facilities, 6100–6199 for logistics and shipping, 6200–6299 for payroll, 6300–6399 for marketing, and so on. Consistent sub-ranges make reporting by department or function trivial.
            </p>
          </section>

          {/* Section 2: Industry-Specific Codes */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Industry-Specific GL Codes</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              Different industries need different GL structures. Here are common additions beyond the standard ranges:
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  industry: 'SaaS / Technology Companies',
                  codes: [
                    { code: '6020', desc: 'Software & SaaS subscriptions' },
                    { code: '6025', desc: 'Cloud infrastructure (AWS, GCP, Azure)' },
                    { code: '6030', desc: 'API and third-party services' },
                    { code: '6035', desc: 'Developer tools and licenses' },
                  ],
                },
                {
                  industry: 'Professional Services Firms',
                  codes: [
                    { code: '6200', desc: 'Professional development & CPE' },
                    { code: '6205', desc: 'Professional liability insurance' },
                    { code: '6210', desc: 'Client entertainment & meals' },
                    { code: '6215', desc: 'Business travel & conferences' },
                  ],
                },
                {
                  industry: 'E-Commerce / Retail',
                  codes: [
                    { code: '5010', desc: 'Product cost of goods sold' },
                    { code: '5020', desc: 'Packaging materials' },
                    { code: '5030', desc: 'Fulfillment and warehousing' },
                    { code: '6110', desc: 'Outbound shipping costs' },
                  ],
                },
                {
                  industry: 'Healthcare / Medical',
                  codes: [
                    { code: '5100', desc: 'Medical supplies and consumables' },
                    { code: '5110', desc: 'Lab and diagnostic services' },
                    { code: '6300', desc: 'Regulatory compliance costs' },
                    { code: '6305', desc: 'Medical waste disposal' },
                  ],
                },
              ].map((sector) => (
                <div key={sector.industry} className="bg-[#1a1a24] border border-white/10 rounded-2xl p-5">
                  <h3 className="text-white font-semibold text-sm mb-4">{sector.industry}</h3>
                  <div className="space-y-2">
                    {sector.codes.map((c) => (
                      <div key={c.code} className="flex items-center gap-3 text-xs">
                        <span className="font-mono text-[#4f8ef7] w-10 flex-shrink-0">{c.code}</span>
                        <span className="text-white/50">{c.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Common Mistakes */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Common GL Coding Mistakes (and How to Fix Them)</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              These are the most frequent GL coding errors that create reconciliation headaches and distort financial reports:
            </p>
            <div className="space-y-4">
              {[
                {
                  mistake: 'Miscoding capital expenses as operating expenses',
                  impact: 'Depreciable assets expensed immediately distort P&L and create tax filing errors.',
                  fix: 'Any purchase over your capitalization threshold (commonly $2,500–$5,000) should go to an asset account (1xxx), not expenses (6xxx).',
                },
                {
                  mistake: 'Using a single "Miscellaneous Expense" catch-all code',
                  impact: 'Makes it impossible to analyze spending by category and flags as unusual in audits.',
                  fix: 'Create specific sub-codes for each expense type. If you\'re using Miscellaneous more than 2% of the time, your chart of accounts needs more granularity.',
                },
                {
                  mistake: 'Inconsistent vendor-to-GL mapping across staff',
                  impact: 'The same vendor (e.g., Stripe) might be coded as 4100 (revenue) by one person and 6120 (bank charges) by another.',
                  fix: 'Document vendor GL rules in a shared reference and use automation to enforce consistency.',
                },
                {
                  mistake: 'Coding intercompany transactions to regular expense accounts',
                  impact: 'Inflates expenses and creates eliminations problems in consolidated financials.',
                  fix: 'Maintain separate intercompany accounts (typically 1500–1599 for receivables, 2500–2599 for payables).',
                },
                {
                  mistake: 'Not splitting mixed invoices by line item',
                  impact: 'An AWS invoice with EC2, S3, and support costs all coded to one account loses useful detail.',
                  fix: 'Split line items to their appropriate sub-accounts: compute to 6025, storage to 6025, support to 6020.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-[#1a1a24] border border-red-400/20 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-red-400/10 text-red-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">!</span>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">{item.mistake}</h3>
                      <p className="text-red-400/70 text-xs mb-2">{item.impact}</p>
                      <p className="text-white/50 text-xs"><span className="text-green-400 font-medium">Fix: </span>{item.fix}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: How AI Improves Accuracy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">How AI Improves GL Coding Accuracy</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              AI-powered GL coding works differently from rule-based systems. Instead of requiring you to define every possible vendor and category combination upfront, the AI learns from your existing coding patterns and applies them consistently.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              The approach has three layers: First, vendor-level rules you define explicitly (AWS always → 6025). Second, AI inference for new vendors based on invoice content — a vendor sending invoices mentioning &quot;virtual private server,&quot; &quot;compute instances,&quot; and &quot;bandwidth&quot; will be classified as cloud infrastructure even if you&apos;ve never seen them before. Third, confidence scoring that flags low-confidence assignments for human review.
            </p>
            <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-5 my-6">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-4">Example: AI GL assignment for a new vendor invoice</p>
              <div className="font-mono text-xs space-y-2">
                <p><span className="text-white/30">vendor:</span> <span className="text-green-400">DigitalOcean, Inc.</span> <span className="text-white/20">(first time seen)</span></p>
                <p><span className="text-white/30">invoice_content:</span> <span className="text-white/50">&quot;Droplets, Spaces Object Storage, Managed Databases&quot;</span></p>
                <p><span className="text-white/30">ai_classification:</span> <span className="text-[#4f8ef7]">Cloud Infrastructure</span></p>
                <p><span className="text-white/30">suggested_gl:</span> <span className="text-[#4f8ef7]">6025 – Cloud Infrastructure</span></p>
                <p><span className="text-white/30">confidence:</span> <span className="text-green-400">94%</span></p>
                <p><span className="text-white/30">basis:</span> <span className="text-white/40">Similar to AWS, GCP, Azure invoices in training set</span></p>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed">
              Over time, as you confirm or correct AI suggestions, the model refines its rules. Firms using AI-assisted GL coding report accuracy rates above 97% after the first month of use — significantly better than the 85–90% accuracy typical of manual coding by junior staff.
            </p>
          </section>

          {/* Section 5: Chart of Accounts Setup */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Setting Up Your Chart of Accounts for Automation</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              The way you structure your chart of accounts directly affects how well automation works. These principles make automation more effective:
            </p>
            <div className="space-y-3">
              {[
                { title: 'Use consistent naming conventions', desc: 'Account names should clearly describe the type of expense. "Software & SaaS" is better than "Computer Expenses" — it unambiguously describes what belongs there.' },
                { title: 'Create vendor-specific sub-accounts sparingly', desc: 'Vendor-specific accounts (like "AWS Costs") add unnecessary complexity. Better to use a single cloud infrastructure account and rely on memos for vendor detail.' },
                { title: 'Plan for sub-account expansion', desc: 'Leave gaps in your numbering. If you assign 6020 to Software and 6025 to Cloud Infrastructure, you have room for 6021–6024 as you identify sub-categories.' },
                { title: 'Align accounts with your reporting needs', desc: 'Structure your COA around the financial reports you actually produce. If you report marketing spend by channel, you need accounts that map to those channels.' },
                { title: 'Document your rules in the system', desc: 'For every account, document which vendors and expense types belong there. This reference makes onboarding new staff and configuring automation rules much faster.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-[#1a1a24] border border-white/5 rounded-xl p-4">
                  <span className="w-5 h-5 rounded-full bg-[#4f8ef7]/10 text-[#4f8ef7] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-[#1a1a24] border border-[#4f8ef7]/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Put your GL coding on autopilot</h2>
            <p className="text-white/50 mb-6">InvoiceFlow&apos;s rules engine applies your GL codes automatically to every invoice. Define your rules once — never manually code an invoice again.</p>
            <Link
              href="/auth/signup"
              className="inline-flex px-7 py-3.5 bg-[#4f8ef7] hover:bg-[#4f8ef7]/80 text-white font-semibold rounded-xl transition-all hover:scale-[1.02]"
            >
              Start free trial →
            </Link>
            <p className="mt-3 text-xs text-white/30">14-day free trial · No credit card required</p>
          </section>

        </article>
      </main>

      <footer className="border-t border-white/5 py-8">
        <div className="max-w-3xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#4f8ef7] rounded-md flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">InvoiceFlow</span>
          </Link>
          <div className="flex items-center gap-6 text-xs text-white/30">
            <Link href="/guides/invoice-processing-automation" className="hover:text-white/60 transition-colors">AP Automation Guide</Link>
            <Link href="/pricing" className="hover:text-white/60 transition-colors">Pricing</Link>
            <Link href="/auth/signup" className="hover:text-white/60 transition-colors">Start free trial</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
