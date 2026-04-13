import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="mb-3 text-lg font-bold text-white">
              AI Tools<span className="text-[#2563eb]">Compass</span>
            </p>
            <p className="text-sm text-white/50">
              Independent AI tool reviews for accounting professionals. Updated weekly.
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/50">
              Top Comparisons
            </p>
            <ul className="space-y-2">
              {[
                ["Tax Prep AI", "/compare/best-ai-for-tax-preparation"],
                ["Bookkeeping AI", "/compare/best-ai-for-bookkeeping-automation"],
                ["AP Automation", "/compare/best-ai-for-accounts-payable"],
                ["Financial Reporting", "/compare/best-ai-for-financial-reporting"],
                ["Audit Prep", "/compare/best-ai-for-audit-preparation"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/50">
              Tool Reviews
            </p>
            <ul className="space-y-2">
              {[
                ["Dext Review", "/compare/ai-invoice-processing-best-tools"],
                ["Botkeeper Review", "/compare/best-ai-for-bookkeeping-automation"],
                ["Vic.ai Review", "/compare/best-ai-for-accounts-payable"],
                ["TaxGPT Review", "/compare/best-ai-for-tax-preparation"],
                ["Ramp Review", "/compare/best-free-ai-for-small-accounting-firms"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/50">
              Resources
            </p>
            <ul className="space-y-2">
              {[
                ["ChatGPT vs Claude", "/compare/chatgpt-vs-claude-for-accounting"],
                ["Free AI Tools", "/compare/best-free-ai-for-small-accounting-firms"],
                ["QuickBooks AI", "/compare/best-ai-for-quickbooks-integration"],
                ["About", "/about"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8">
          <div className="rounded-lg bg-[#111] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
              Affiliate Disclosure
            </p>
            <p className="mt-1 text-xs text-white/50">
              AI Tools Compass earns commissions when you click affiliate links and sign up for
              tools. This doesn&apos;t affect our editorial rankings — we test every tool independently
              and publish honest assessments. Affiliate revenue is what keeps our research free for
              accounting professionals. Commissions typically range from 10-30% of the first year&apos;s
              subscription.
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} AI Tools Compass. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-xs text-white/40 hover:text-white/60">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-white/40 hover:text-white/60">
                Terms
              </Link>
              <Link href="/contact" className="text-xs text-white/40 hover:text-white/60">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
