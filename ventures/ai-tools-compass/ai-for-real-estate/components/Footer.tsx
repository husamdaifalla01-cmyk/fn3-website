import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="mb-3 text-lg font-bold text-white">
              AI Tools<span className="text-[#059669]">Compass</span>
            </p>
            <p className="text-sm text-white/50">
              Independent AI tool reviews for real estate professionals. Updated weekly.
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/50">Top Comparisons</p>
            <ul className="space-y-2">
              {[
                ["Best AI CRM", "/compare/best-ai-crm-for-real-estate-agents"],
                ["Lead Generation AI", "/compare/best-ai-for-lead-generation-real-estate"],
                ["Listing Descriptions", "/compare/best-ai-for-real-estate-listing-descriptions"],
                ["Email Marketing AI", "/compare/best-ai-for-real-estate-email-marketing"],
                ["Open House Follow-Up", "/compare/best-ai-for-open-house-followup"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/50">Tool Reviews</p>
            <ul className="space-y-2">
              {[
                ["Follow Up Boss", "/compare/best-ai-crm-for-real-estate-agents"],
                ["Lofty Review", "/compare/best-ai-crm-for-real-estate-agents"],
                ["Structurely Review", "/compare/best-ai-for-lead-generation-real-estate"],
                ["Homebot Review", "/compare/best-ai-for-real-estate-email-marketing"],
                ["Listing AI Review", "/compare/best-ai-for-real-estate-listing-descriptions"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/50">Resources</p>
            <ul className="space-y-2">
              {[
                ["ChatGPT vs Claude", "/compare/chatgpt-vs-claude-for-real-estate"],
                ["AI for Investors", "/compare/ai-tools-for-real-estate-investors"],
                ["Property Valuations", "/compare/best-ai-for-property-valuations"],
                ["About", "/about"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8">
          <div className="rounded-lg bg-[#111] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#059669]">Affiliate Disclosure</p>
            <p className="mt-1 text-xs text-white/50">
              AI Tools Compass earns commissions when you click affiliate links and sign up for tools. This doesn&apos;t affect our editorial rankings — we test every tool independently. Affiliate revenue keeps our research free for real estate professionals.
            </p>
          </div>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} AI Tools Compass. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-xs text-white/40 hover:text-white/60">Privacy Policy</Link>
              <Link href="/terms" className="text-xs text-white/40 hover:text-white/60">Terms</Link>
              <Link href="/contact" className="text-xs text-white/40 hover:text-white/60">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
