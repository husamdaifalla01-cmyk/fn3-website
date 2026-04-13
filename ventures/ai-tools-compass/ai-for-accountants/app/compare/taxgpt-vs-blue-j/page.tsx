import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TaxGPT vs. Blue J 2026: Which Tax Research AI Wins?",
  description:
    "TaxGPT vs. Blue J side-by-side: pricing, tax question accuracy, source citations, jurisdiction coverage (US, Canada, UK), case law access, IRS guidance, and audit support. Which AI is best for tax professionals in 2026.",
  openGraph: {
    title: "TaxGPT vs. Blue J 2026: Which Tax Research AI Wins?",
    description:
      "Complete side-by-side comparison of TaxGPT and Blue J for tax research — pricing, accuracy, source citations, jurisdiction coverage, case law, IRS guidance, and audit support.",
    type: "article",
  },
};

const comparisonRows = [
  {
    feature: "Pricing",
    taxgpt: "From $19/mo (Individual); $49/mo (Professional); Enterprise custom pricing",
    bluej: "From $250/mo per user (Professional); firm-wide contracts negotiated annually",
    winner: "taxgpt",
    note: "TaxGPT is dramatically more accessible for solo practitioners and small firms. Blue J's pricing reflects its enterprise positioning.",
  },
  {
    feature: "Tax Question Accuracy",
    taxgpt: "Strong on IRC citations and IRS guidance; occasionally hallucinates on edge-case state law",
    bluej: "Purpose-built accuracy with predictive confidence scores; strong peer review track record",
    winner: "bluej",
    note: "Blue J was founded by law professors and built specifically for tax accuracy. For high-stakes research, its answer confidence ratings are genuinely useful.",
  },
  {
    feature: "Source Citations",
    taxgpt: "Cites IRC sections, IRS publications, and Revenue Rulings; links may not always deep-link to primary source",
    bluej: "Every answer cites primary sources with direct links; court cases, rulings, and statutes all linked",
    winner: "bluej",
    note: "Blue J's citation depth is a core differentiator. If you need to hand research to a client or partner for review, Blue J's output is more defensible.",
  },
  {
    feature: "US Jurisdiction Coverage",
    taxgpt: "Federal tax law well-covered; growing state tax database",
    bluej: "Comprehensive federal + 50 state coverage; detailed state conformity analysis",
    winner: "bluej",
    note: "For multi-state clients, Blue J's state conformity tracking is a significant advantage.",
  },
  {
    feature: "Canada Jurisdiction Coverage",
    taxgpt: "Limited; US-focused with basic Canadian federal overview",
    bluej: "Deep Canadian coverage: Income Tax Act, CRA guidance, provincial rules",
    winner: "bluej",
    note: "Blue J was originally built for Canadian tax law before expanding to the US. Canadian practitioners should strongly consider Blue J.",
  },
  {
    feature: "UK Jurisdiction Coverage",
    taxgpt: "Minimal UK coverage at this time",
    bluej: "UK coverage added in 2024; HMRC guidance, case law, and legislation included",
    winner: "bluej",
    note: "UK-based firms or those with UK clients have a clear answer: Blue J is the only real option.",
  },
  {
    feature: "Case Law Access",
    taxgpt: "Access to major tax court decisions; less comprehensive on circuit splits",
    bluej: "Extensive tax court and appellate case law; predictive analysis on how courts may rule",
    winner: "bluej",
    note: "Blue J's predictive case outcome scoring — showing percentage likelihood of a given position being upheld — is unique in the market.",
  },
  {
    feature: "IRS Guidance (Rev. Procs, PLRs, etc.)",
    taxgpt: "Revenue Procedures and basic IRS guidance covered; Private Letter Rulings not consistently indexed",
    bluej: "Comprehensive IRS guidance including PLRs, TAMs, FSAs, and field memos",
    winner: "bluej",
    note: "For research requiring obscure IRS administrative guidance, Blue J's database is more complete.",
  },
  {
    feature: "Audit Support Features",
    taxgpt: "Basic IRS notice lookup and response drafting; no formal audit workflow",
    bluej: "Audit memo drafting, penalty analysis, and argument strength scoring built in",
    winner: "bluej",
    note: "If your practice handles audits and controversies, Blue J's structured audit support is a material time-saver.",
  },
  {
    feature: "Ease of Use / Learning Curve",
    taxgpt: "Chat-first interface; no training required; feels like ChatGPT for tax",
    bluej: "More structured interface; slight learning curve; onboarding materials provided",
    winner: "taxgpt",
    note: "TaxGPT's chat interface means zero onboarding friction. You can be productive immediately.",
  },
  {
    feature: "Integration with Tax Software",
    taxgpt: "Standalone; copy/paste workflow into tax prep software",
    bluej: "API available for enterprise; some workflow integrations in development",
    winner: "tie",
    note: "Neither tool has native plug-ins for ProConnect, Lacerte, or UltraTax yet. Both require manual copy/paste for now.",
  },
];

export default function TaxGPTVsBlueJPage() {
  const taxgptWins = comparisonRows.filter((r) => r.winner === "taxgpt").length;
  const bluejWins = comparisonRows.filter((r) => r.winner === "bluej").length;
  const ties = comparisonRows.filter((r) => r.winner === "tie").length;

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-white/40">
          <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/#comparisons" className="hover:text-white/70 transition-colors">Comparisons</Link>
          <span className="mx-2">/</span>
          <span className="text-white/60">TaxGPT vs. Blue J</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 inline-block rounded-full bg-[#2563eb]/10 px-3 py-1 text-xs font-medium text-[#2563eb]">
            Tax Research AI
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            TaxGPT vs. Blue J (2026): Which Tax Research AI Is Worth Your Time?
          </h1>
          <p className="mt-4 text-lg text-white/60">
            Two AI tools built specifically for tax professionals — but they serve very different users at very different price points. TaxGPT makes AI-assisted research accessible to solo and small-firm practitioners. Blue J is purpose-built for high-stakes tax controversy and multi-jurisdiction work. Here&apos;s exactly where they differ.
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-white/40">
            <span>Updated March 2026</span>
            <span>·</span>
            <span>~800 words</span>
            <span>·</span>
            <span>{comparisonRows.length} criteria compared</span>
          </div>
        </div>

        {/* Score Cards */}
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[#2563eb]/20 bg-[#2563eb]/5 p-5 text-center">
            <p className="text-3xl font-bold text-[#2563eb]">{taxgptWins}</p>
            <p className="mt-1 text-sm font-medium text-white">TaxGPT wins</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#111] p-5 text-center">
            <p className="text-3xl font-bold text-white/40">{ties}</p>
            <p className="mt-1 text-sm font-medium text-white/60">Ties</p>
          </div>
          <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-5 text-center">
            <p className="text-3xl font-bold text-purple-400">{bluejWins}</p>
            <p className="mt-1 text-sm font-medium text-white">Blue J wins</p>
          </div>
        </div>

        {/* Quick Verdict Banner */}
        <div className="mb-10 rounded-2xl border border-[#2563eb]/20 bg-[#111] p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#2563eb] mb-2">Quick Verdict</p>
          <p className="text-white/80 leading-relaxed">
            <span className="font-semibold text-white">Blue J wins on research depth and citation quality</span> — if you handle complex multi-jurisdiction or controversy work, it&apos;s the more reliable tool. <span className="font-semibold text-white">TaxGPT wins on accessibility and price</span> — for solo practitioners and small firms doing everyday federal research, it delivers 80% of the value at 10% of the cost.
          </p>
        </div>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-white">Feature-by-Feature Comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-[#111]">
                  <th className="px-4 py-3 text-left font-semibold text-white/70">Feature</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#2563eb]">TaxGPT</th>
                  <th className="px-4 py-3 text-left font-semibold text-purple-400">Blue J</th>
                  <th className="px-4 py-3 text-left font-semibold text-white/40">Winner</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-4 font-medium text-white">{row.feature}</td>
                    <td className="px-4 py-4 text-white/60">{row.taxgpt}</td>
                    <td className="px-4 py-4 text-white/60">{row.bluej}</td>
                    <td className="px-4 py-4">
                      {row.winner === "taxgpt" && (
                        <span className="rounded-full bg-[#2563eb]/10 px-2 py-0.5 text-xs font-medium text-[#2563eb]">
                          TaxGPT
                        </span>
                      )}
                      {row.winner === "bluej" && (
                        <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-400">
                          Blue J
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
          <h2 className="mb-6 text-2xl font-bold text-white">Deeper Context on Key Differences</h2>
          <div className="space-y-6">
            {comparisonRows.filter((r) => r.note).map((row, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-[#111] p-5">
                <p className="mb-1 font-semibold text-white">{row.feature}</p>
                <p className="text-sm leading-relaxed text-white/60">{row.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who It's For */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-white">Who Each Tool Is For</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#2563eb]/20 bg-[#2563eb]/5 p-6">
              <h3 className="mb-3 text-lg font-bold text-white">Choose TaxGPT if...</h3>
              <ul className="space-y-3">
                {[
                  "You're a solo practitioner or small firm doing primarily federal tax work",
                  "You want instant answers to routine IRC questions without a training curve",
                  "Your budget is under $100/mo per user",
                  "You primarily handle individual and small business returns, not complex controversy",
                  "You want to test AI-assisted research before committing to an enterprise tool",
                  "You need a chat-first experience that non-tech staff can use immediately",
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
              <h3 className="mb-3 text-lg font-bold text-white">Choose Blue J if...</h3>
              <ul className="space-y-3">
                {[
                  "You handle tax controversy, audits, or multi-jurisdiction planning",
                  "You serve Canadian or UK clients and need jurisdiction-specific research",
                  "You need defensible citations you can include in client memos",
                  "Your firm needs predictive case outcome analysis for tax positions",
                  "You're at a mid-size or large firm where per-user cost is less sensitive",
                  "You need comprehensive IRS administrative guidance including PLRs and TAMs",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Verdict */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Verdict</h2>
          <div className="rounded-2xl border border-white/10 bg-[#111] p-6 leading-relaxed text-white/80">
            <p className="mb-4">
              <span className="font-semibold text-white">Blue J is the more powerful research tool</span>, and for firms where the accuracy of a tax position genuinely matters — controversies, multi-state planning, international work — it justifies the price premium. The predictive case outcome scoring and citation depth are genuinely difficult to replicate with a cheaper tool.
            </p>
            <p className="mb-4">
              <span className="font-semibold text-white">TaxGPT is the right call for the vast majority of practitioners</span> doing everyday tax research. At $19–$49/mo, it&apos;s priced for solo CPAs and small firms. It handles the most common 80% of research questions well, and for routine federal research the answer quality is more than adequate.
            </p>
            <p>
              The honest answer: if you&apos;re unsure which camp you&apos;re in, start with TaxGPT for 30 days. If you regularly hit questions where you need a citable primary source or want to know how a court is likely to rule on a specific position, Blue J&apos;s trial will show you the gap immediately.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Current Pricing (March 2026)</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#111] p-5">
              <h3 className="mb-3 font-bold text-white">TaxGPT Pricing</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex justify-between">
                  <span>Individual</span>
                  <span className="font-medium text-white">$19/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Professional</span>
                  <span className="font-medium text-white">$49/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Enterprise</span>
                  <span className="font-medium text-white">Custom</span>
                </li>
              </ul>
              <a
                href="https://taxgpt.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 inline-block rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Get TaxGPT pricing →
              </a>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#111] p-5">
              <h3 className="mb-3 font-bold text-white">Blue J Pricing</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex justify-between">
                  <span>Professional (per user)</span>
                  <span className="font-medium text-white">From $250/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Firm-wide</span>
                  <span className="font-medium text-white">Annual contract</span>
                </li>
              </ul>
              <a
                href="https://www.bluej.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 inline-block rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/40"
              >
                Get Blue J pricing →
              </a>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mb-10 border-t border-white/10 pt-10">
          <h2 className="mb-4 text-xl font-bold text-white">Related Guides</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/guides/tax-season-ai-stack"
              className="group rounded-xl border border-white/10 bg-[#111] p-4 transition-all hover:border-[#2563eb]/30"
            >
              <p className="font-medium text-white transition-colors group-hover:text-[#2563eb]">
                The AI Stack That Got Our CPA Through Tax Season
              </p>
              <p className="mt-1 text-xs text-white/50">Where tax research AI fits in a full workflow</p>
            </Link>
            <Link
              href="/compare/botkeeper-vs-pilot"
              className="group rounded-xl border border-white/10 bg-[#111] p-4 transition-all hover:border-[#2563eb]/30"
            >
              <p className="font-medium text-white transition-colors group-hover:text-[#2563eb]">
                Botkeeper vs. Pilot
              </p>
              <p className="mt-1 text-xs text-white/50">AI bookkeeping services compared</p>
            </Link>
          </div>
        </section>

        {/* Disclosure */}
        <div className="rounded-xl border border-white/10 bg-[#111] p-4 text-xs text-white/40">
          <span className="font-semibold text-white/60">Affiliate Disclosure:</span>{" "}
          Links marked with an arrow (→) are affiliate links. We earn a commission if you sign up through these links at no cost to you. Our editorial rankings are independent of affiliate relationships.
        </div>
      </div>
    </>
  );
}
