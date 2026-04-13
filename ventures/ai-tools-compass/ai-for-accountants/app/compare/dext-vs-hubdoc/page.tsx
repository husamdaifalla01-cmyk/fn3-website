import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dext vs. Hubdoc 2026: Which Receipt & Document Capture Tool Wins?",
  description:
    "Dext vs. Hubdoc side-by-side comparison: OCR accuracy, pricing, QuickBooks integration, Xero integration, receipt capture, and bank feeds. Who each tool is best for in 2026.",
  openGraph: {
    title: "Dext vs. Hubdoc 2026: Which Receipt & Document Capture Tool Wins?",
    description:
      "Complete side-by-side comparison of Dext and Hubdoc for accounting document capture — pricing, OCR accuracy, QuickBooks, Xero, receipt capture, and bank feeds.",
    type: "article",
  },
};

const comparisonRows = [
  {
    feature: "Pricing",
    dext: "From $50/mo (Starter, up to 25 clients); scales to $150+/mo for larger rosters",
    hubdoc: "Free with Xero Business plan or QuickBooks Online Plus; $25/mo standalone",
    winner: "hubdoc",
    note: "Hubdoc's inclusion in Xero/QBO Plus makes it effectively free for existing subscribers.",
  },
  {
    feature: "OCR Accuracy (clean PDFs)",
    dext: "~98% on clean, machine-generated PDFs",
    hubdoc: "~96% on clean, machine-generated PDFs",
    winner: "dext",
    note: "Both are excellent on clean scans; Dext's edge shows on edge cases.",
  },
  {
    feature: "OCR Accuracy (phone photos)",
    dext: "~90% — solid with auto-correction suggestions",
    hubdoc: "~85% — adequate but flags more for manual review",
    winner: "dext",
    note: "For clients who photograph receipts with a phone, Dext is noticeably more reliable.",
  },
  {
    feature: "QuickBooks Integration",
    dext: "Native two-way sync; auto-categorizes to QBO chart of accounts",
    hubdoc: "Native sync included with QBO Plus; slightly less category granularity",
    winner: "tie",
    note: "Both integrate natively with QBO. Dext has more granular category mapping options.",
  },
  {
    feature: "Xero Integration",
    dext: "Deep Xero integration; partner-level certification",
    hubdoc: "Built by Xero (acquired 2018); deepest possible integration",
    winner: "hubdoc",
    note: "Hubdoc is literally a Xero product. If you're a Xero shop, the integration is seamless by design.",
  },
  {
    feature: "Receipt Capture (Mobile App)",
    dext: "Dedicated iOS/Android app with smart crop, auto-submit, multi-photo mode",
    hubdoc: "iOS/Android app; functional but simpler than Dext's",
    winner: "dext",
    note: "Dext's mobile app is noticeably more polished and faster for high-volume receipt entry.",
  },
  {
    feature: "Bank Feeds / Statement Fetch",
    dext: "Fetches statements from 900+ financial institutions automatically",
    hubdoc: "Fetches from 700+ institutions; some users report slower sync times",
    winner: "dext",
    note: "Dext's financial institution coverage is broader and more consistently reliable.",
  },
  {
    feature: "Client Submission Portal",
    dext: "Unique email address per client + web upload + app; very client-friendly",
    hubdoc: "Email forwarding + web upload; slightly less intuitive for non-accountant clients",
    winner: "dext",
    note: "Dext's client onboarding flow is better designed for non-technical clients.",
  },
  {
    feature: "Missing Document Reports",
    dext: "Built-in checklist and reminder workflows per client",
    hubdoc: "Basic missing document alerts; less customizable",
    winner: "dext",
    note: "Dext's document checklist feature is a standout for tax season workflows.",
  },
  {
    feature: "Multi-Currency",
    dext: "Supported across all plans",
    hubdoc: "Supported",
    winner: "tie",
    note: "Both handle multi-currency without issues.",
  },
  {
    feature: "Audit Trail",
    dext: "Full audit trail with timestamp, submitter, and approval log",
    hubdoc: "Audit trail included but less granular",
    winner: "dext",
    note: "For firms that need to demonstrate document provenance, Dext's audit trail is more robust.",
  },
];

export default function DextVsHubdocPage() {
  const dextWins = comparisonRows.filter((r) => r.winner === "dext").length;
  const hubdocWins = comparisonRows.filter((r) => r.winner === "hubdoc").length;
  const ties = comparisonRows.filter((r) => r.winner === "tie").length;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-white/10 bg-gradient-to-b from-[#111] to-[#0a0a0a] py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span>Compare</span>
            <span>/</span>
            <span className="text-white/70">Dext vs. Hubdoc</span>
          </div>

          <div className="mb-4 inline-block rounded-full bg-[#2563eb]/10 px-3 py-1 text-xs font-medium text-[#2563eb]">
            Updated March 2026
          </div>

          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl leading-tight">
            Dext vs. Hubdoc 2026: Which Document Capture Tool Should Your Firm Use?
          </h1>

          <p className="mt-5 text-lg text-white/70 leading-relaxed">
            Both Dext and Hubdoc solve the same core problem — getting receipts, bills, and
            financial documents into your accounting software without manual data entry. But
            they differ significantly on pricing model, OCR performance, mobile experience,
            and how well they fit Xero vs. QuickBooks shops. Here&apos;s the complete breakdown.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="rounded-full bg-white/5 px-3 py-1.5 text-white/60">
              {comparisonRows.length} features compared
            </span>
            <span className="rounded-full bg-white/5 px-3 py-1.5 text-white/60">
              ~6 min read
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">

        {/* Quick Verdict Cards */}
        <div className="mb-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#2563eb]/30 bg-[#2563eb]/5 p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-[#2563eb]/20 px-2 py-0.5 text-xs font-medium text-[#2563eb]">
                Best Overall
              </span>
              <span className="text-lg font-bold text-white">Dext</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Better OCR accuracy on phone photos, stronger mobile app, broader bank feed
              coverage, and more powerful client submission workflows. The right choice for
              firms with 10+ clients who submit a mix of digital and physical documents.
            </p>
            <a
              href="https://dext.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-4 inline-block rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
            >
              Try Dext →
            </a>
          </div>

          <div className="rounded-2xl border border-white/15 bg-[#111] p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white/60">
                Best Value / Xero Shops
              </span>
              <span className="text-lg font-bold text-white">Hubdoc</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Included free with Xero or QBO Plus subscriptions, which most firms already have.
              If you&apos;re a Xero-first shop and your clients are reasonably tidy with documents,
              Hubdoc&apos;s free tier is genuinely good enough.
            </p>
            <a
              href="https://www.hubdoc.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-4 inline-block rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80 hover:border-white/40 transition-colors"
            >
              Try Hubdoc →
            </a>
          </div>
        </div>

        {/* Score Summary */}
        <div className="mb-10 rounded-xl border border-white/10 bg-[#111] p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-semibold text-white">Head-to-head score ({comparisonRows.length} features)</p>
            <div className="flex gap-4 text-sm">
              <span className="text-[#2563eb] font-bold">Dext: {dextWins} wins</span>
              <span className="text-white/50">Hubdoc: {hubdocWins} wins</span>
              <span className="text-white/30">Ties: {ties}</span>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Side-by-Side Comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-[#111]">
                  <th className="px-4 py-3 text-left font-semibold text-white w-32">Feature</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#2563eb]">
                    Dext
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-white/70">
                    Hubdoc
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-white/40 w-20">Winner</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/2">
                    <td className="px-4 py-4 font-medium text-white align-top">{row.feature}</td>
                    <td className="px-4 py-4 text-white/70 align-top leading-relaxed">{row.dext}</td>
                    <td className="px-4 py-4 text-white/70 align-top leading-relaxed">{row.hubdoc}</td>
                    <td className="px-4 py-4 align-top">
                      {row.winner === "dext" && (
                        <span className="rounded-full bg-[#2563eb]/20 px-2 py-0.5 text-xs font-medium text-[#2563eb]">
                          Dext
                        </span>
                      )}
                      {row.winner === "hubdoc" && (
                        <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
                          Hubdoc
                        </span>
                      )}
                      {row.winner === "tie" && (
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white/40">
                          Tie
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Contextual Notes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Deeper Context on Key Differences</h2>
          <div className="space-y-6">
            {comparisonRows.filter(r => r.note).map((row, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-[#111] p-5">
                <p className="font-semibold text-white mb-1">{row.feature}</p>
                <p className="text-sm text-white/60 leading-relaxed">{row.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who It's For */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Who Each Tool Is For</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#2563eb]/20 bg-[#2563eb]/5 p-6">
              <h3 className="text-lg font-bold text-white mb-3">Choose Dext if...</h3>
              <ul className="space-y-3">
                {[
                  "You have 10+ active clients submitting documents regularly",
                  "Your clients use a mix of email, mobile app, and web upload to submit",
                  "You need strong bank statement fetching across many institutions",
                  "Your clients often submit photos of physical receipts (not just digital PDFs)",
                  "You want the most complete audit trail for compliance-sensitive work",
                  "You're QBO-primary and want deeper categorization control",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#2563eb]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111] p-6">
              <h3 className="text-lg font-bold text-white mb-3">Choose Hubdoc if...</h3>
              <ul className="space-y-3">
                {[
                  "You're already on Xero or QuickBooks Online Plus (it's free with either)",
                  "You have a smaller client roster (under 20 clients) with tidy submission habits",
                  "You're a Xero-first shop and want the tightest possible integration",
                  "You're price-sensitive and the included tier covers your volume",
                  "Your clients primarily submit clean, digital PDFs rather than phone photos",
                  "You don't need advanced client workflow management features",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Bottom Verdict */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Verdict</h2>
          <div className="rounded-2xl border border-white/10 bg-[#111] p-6 leading-relaxed text-white/80">
            <p className="mb-4">
              <span className="font-semibold text-white">For most accounting firms in 2026, Dext is the better tool</span> —
              it&apos;s more powerful, more accurate on messy documents, and the client submission
              experience is meaningfully better. If you&apos;re running a firm with 15+ clients
              who submit a variety of document types, Dext pays for itself quickly in time saved.
            </p>
            <p className="mb-4">
              <span className="font-semibold text-white">Hubdoc is the right call if you&apos;re Xero-first and cost-conscious.</span>{" "}
              Being built into Xero isn&apos;t a small thing — the integration is genuinely seamless,
              and for firms where clients are submitting reasonably clean documents, Hubdoc&apos;s
              free tier handles the job well. There&apos;s no reason to pay $50+/mo for Dext if
              Hubdoc&apos;s included plan covers your workflow.
            </p>
            <p>
              The one scenario where neither is the clear winner: if you&apos;re a mixed QBO/Xero
              shop serving clients on both platforms. In that case, Dext&apos;s platform-agnostic
              integration story is an advantage, but evaluate against your actual client split
              before committing.
            </p>
          </div>
        </section>

        {/* Pricing Callout */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Current Pricing (March 2026)</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#111] p-5">
              <h3 className="font-bold text-white mb-3">Dext Pricing</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex justify-between">
                  <span>Starter (up to 25 clients)</span>
                  <span className="font-medium text-white">$50/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Grow (up to 50 clients)</span>
                  <span className="font-medium text-white">$90/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Scale (up to 100 clients)</span>
                  <span className="font-medium text-white">$150/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Enterprise</span>
                  <span className="font-medium text-white">Custom</span>
                </li>
              </ul>
              <a
                href="https://dext.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 inline-block rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
              >
                Get Dext pricing →
              </a>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#111] p-5">
              <h3 className="font-bold text-white mb-3">Hubdoc Pricing</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex justify-between">
                  <span>With Xero Business</span>
                  <span className="font-medium text-green-400">Included free</span>
                </li>
                <li className="flex justify-between">
                  <span>With QBO Plus</span>
                  <span className="font-medium text-green-400">Included free</span>
                </li>
                <li className="flex justify-between">
                  <span>Standalone</span>
                  <span className="font-medium text-white">$25/mo</span>
                </li>
              </ul>
              <a
                href="https://www.hubdoc.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 inline-block rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80 hover:border-white/40 transition-colors"
              >
                Get Hubdoc pricing →
              </a>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mb-10 border-t border-white/10 pt-10">
          <h2 className="text-xl font-bold text-white mb-4">Related Guides</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/guides/tax-season-ai-stack"
              className="group rounded-xl border border-white/10 bg-[#111] p-4 transition-all hover:border-[#2563eb]/30"
            >
              <p className="font-medium text-white group-hover:text-[#2563eb] transition-colors">
                The AI Stack That Got Our CPA Through Tax Season
              </p>
              <p className="mt-1 text-xs text-white/50">How Dext fits into a full tax season AI workflow</p>
            </Link>
            <Link
              href="/compare/best-ai-for-bookkeeping-automation"
              className="group rounded-xl border border-white/10 bg-[#111] p-4 transition-all hover:border-[#2563eb]/30"
            >
              <p className="font-medium text-white group-hover:text-[#2563eb] transition-colors">
                Best AI for Bookkeeping Automation
              </p>
              <p className="mt-1 text-xs text-white/50">Beyond document capture: full bookkeeping automation tools</p>
            </Link>
          </div>
        </section>

        {/* Disclosure */}
        <div className="rounded-xl border border-white/10 bg-[#111] p-4 text-xs text-white/40">
          <span className="font-semibold text-white/60">Affiliate Disclosure:</span>{" "}
          Links marked with an arrow (→) are affiliate links. We earn a commission if you
          sign up through these links at no cost to you. Our editorial rankings are
          independent of affiliate relationships.
        </div>
      </div>
    </>
  );
}
