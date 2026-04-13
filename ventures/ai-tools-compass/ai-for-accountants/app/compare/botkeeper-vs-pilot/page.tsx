import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Botkeeper vs. Pilot 2026: Which AI Bookkeeping Service Wins?",
  description:
    "Botkeeper vs. Pilot compared: pricing, human oversight model, QuickBooks integration, industry focus, onboarding time, error rates, and catch-up bookkeeping. Which AI bookkeeping service is right for your clients in 2026.",
  openGraph: {
    title: "Botkeeper vs. Pilot 2026: Which AI Bookkeeping Service Wins?",
    description:
      "Complete side-by-side comparison of Botkeeper and Pilot for AI-powered bookkeeping — pricing, human oversight, QuickBooks integration, industry focus, onboarding time, error rates, and catch-up bookkeeping.",
    type: "article",
  },
};

const comparisonRows = [
  {
    feature: "Pricing",
    botkeeper: "From $299/mo per client (accounting firms); volume discounts at scale",
    pilot: "From $499/mo (Core plan, up to $200k revenue); scales to $849/mo+ for larger businesses",
    winner: "botkeeper",
    note: "Botkeeper is priced for accounting firms managing multiple clients. Pilot is priced for individual businesses buying bookkeeping direct. Comparing them requires understanding which model you need.",
  },
  {
    feature: "Human Oversight Model",
    botkeeper: "AI-first with accounting firm oversight; your firm retains the client relationship",
    pilot: "Dedicated bookkeeper assigned + AI automation; Pilot is the bookkeeper of record",
    winner: "tie",
    note: "This is the fundamental business model difference. Botkeeper is a B2B tool for accounting firms. Pilot sells direct to businesses and replaces your role. Choose based on whether you want to retain the client or outsource the relationship.",
  },
  {
    feature: "QuickBooks Integration",
    botkeeper: "Deep QBO integration; native sync with auto-categorization and reconciliation",
    pilot: "Native QBO integration; also supports Xero for eligible clients",
    winner: "tie",
    note: "Both integrate natively with QuickBooks Online. Botkeeper has more granular categorization control because it&apos;s designed for firm-level management of multiple clients.",
  },
  {
    feature: "Industry Focus",
    botkeeper: "Industry-agnostic; handles any client type your firm takes on",
    pilot: "Strong focus on startups, VC-backed companies, and tech businesses",
    winner: "botkeeper",
    note: "Pilot has specialized expertise in startup bookkeeping, R&D tax credits, and equity accounting. If your clients are mainly traditional SMBs, Botkeeper&apos;s flexibility is the advantage.",
  },
  {
    feature: "Onboarding Time",
    botkeeper: "2–4 weeks for firm onboarding; per-client setup averages 1 week after",
    pilot: "4–6 weeks typical; historical data review adds time for complex accounts",
    winner: "botkeeper",
    note: "Botkeeper&apos;s firm-level onboarding takes longer upfront but accelerates with each new client after the initial setup.",
  },
  {
    feature: "Error Rates",
    botkeeper: "Claims <0.05% error rate; AI flags low-confidence transactions for human review",
    pilot: "Claims high accuracy with dedicated bookkeeper review on every month-end close",
    winner: "tie",
    note: "Both services use human review as their quality backstop. Independent benchmarking of error rates is not publicly available for either.",
  },
  {
    feature: "Catch-Up Bookkeeping",
    botkeeper: "Offered through accounting firm partners; pricing varies by firm",
    pilot: "Offers catch-up bookkeeping directly; $150–$300+/mo surcharge depending on backlog",
    winner: "pilot",
    note: "Pilot&apos;s direct catch-up offering is more straightforward for businesses with messy books that need a clean start. Botkeeper routes this through firm partners.",
  },
  {
    feature: "CFO / Advisory Services",
    botkeeper: "Not included; firms can layer advisory on top",
    pilot: "Pilot Plus includes financial reporting and CFO advisory add-ons",
    winner: "pilot",
    note: "For startups needing more than bookkeeping, Pilot&apos;s CFO and tax preparation add-ons create a more complete financial operations stack.",
  },
  {
    feature: "Scalability (Client Volume)",
    botkeeper: "Designed for firms managing 20–500+ clients; pricing rewards volume",
    pilot: "Per-business pricing; not designed for firms reselling the service",
    winner: "botkeeper",
    note: "Botkeeper&apos;s entire value proposition is enabling accounting firms to scale client volume without proportionally scaling headcount.",
  },
  {
    feature: "Tax Preparation Integration",
    botkeeper: "Books hand off to your firm&apos;s tax workflow natively",
    pilot: "Tax filing offered as add-on through Pilot Tax; additional fee",
    winner: "botkeeper",
    note: "Because Botkeeper keeps the accounting firm in the loop, the tax workflow stays with your firm and integrates into your existing process.",
  },
];

export default function BotkeepervsPilotPage() {
  const botkeeperwins = comparisonRows.filter((r) => r.winner === "botkeeper").length;
  const pilotwins = comparisonRows.filter((r) => r.winner === "pilot").length;
  const ties = comparisonRows.filter((r) => r.winner === "tie").length;

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-white/40">
          <Link href="/" className="transition-colors hover:text-white/70">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/#comparisons" className="transition-colors hover:text-white/70">Comparisons</Link>
          <span className="mx-2">/</span>
          <span className="text-white/60">Botkeeper vs. Pilot</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 inline-block rounded-full bg-[#2563eb]/10 px-3 py-1 text-xs font-medium text-[#2563eb]">
            AI Bookkeeping Services
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Botkeeper vs. Pilot (2026): Two Very Different Takes on AI Bookkeeping
          </h1>
          <p className="mt-4 text-lg text-white/60">
            Botkeeper and Pilot both use AI to automate bookkeeping — but they serve fundamentally different customers. Botkeeper is a platform for accounting firms. Pilot is a bookkeeping service that sells direct to businesses. Understanding that distinction is the most important thing you can do before evaluating either.
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
            <p className="text-3xl font-bold text-[#2563eb]">{botkeeperwins}</p>
            <p className="mt-1 text-sm font-medium text-white">Botkeeper wins</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#111] p-5 text-center">
            <p className="text-3xl font-bold text-white/40">{ties}</p>
            <p className="mt-1 text-sm font-medium text-white/60">Ties</p>
          </div>
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5 text-center">
            <p className="text-3xl font-bold text-green-400">{pilotwins}</p>
            <p className="mt-1 text-sm font-medium text-white">Pilot wins</p>
          </div>
        </div>

        {/* Quick Verdict */}
        <div className="mb-10 rounded-2xl border border-[#2563eb]/20 bg-[#111] p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#2563eb]">Quick Verdict</p>
          <p className="leading-relaxed text-white/80">
            <span className="font-semibold text-white">Botkeeper is for accounting firms</span> that want to scale their bookkeeping capacity without hiring. <span className="font-semibold text-white">Pilot is for businesses</span> — especially startups — that want to outsource bookkeeping entirely and don&apos;t have an existing accounting firm relationship. If you&apos;re an accounting firm, Botkeeper is the right tool. If you&apos;re a startup founder, Pilot probably is.
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
                  <th className="px-4 py-3 text-left font-semibold text-[#2563eb]">Botkeeper</th>
                  <th className="px-4 py-3 text-left font-semibold text-green-400">Pilot</th>
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
                    <td className="px-4 py-4 text-white/60">{row.botkeeper}</td>
                    <td className="px-4 py-4 text-white/60">{row.pilot}</td>
                    <td className="px-4 py-4">
                      {row.winner === "botkeeper" && (
                        <span className="rounded-full bg-[#2563eb]/10 px-2 py-0.5 text-xs font-medium text-[#2563eb]">
                          Botkeeper
                        </span>
                      )}
                      {row.winner === "pilot" && (
                        <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400">
                          Pilot
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

        {/* Notes */}
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
              <h3 className="mb-3 text-lg font-bold text-white">Choose Botkeeper if...</h3>
              <ul className="space-y-3">
                {[
                  "You run an accounting firm and want to scale client capacity",
                  "You want to retain the client relationship while automating the work",
                  "You manage 10+ bookkeeping clients and need a multi-client dashboard",
                  "You want AI-assisted bookkeeping that integrates into your firm&apos;s tax workflow",
                  "Your clients span multiple industries (not just startups)",
                  "You need volume pricing that rewards growth",
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
              <h3 className="mb-3 text-lg font-bold text-white">Choose Pilot if...</h3>
              <ul className="space-y-3">
                {[
                  "You&apos;re a startup founder or small business owner buying bookkeeping direct",
                  "You want a fully managed service with a dedicated bookkeeper",
                  "You need catch-up bookkeeping with a clear timeline and fixed price",
                  "You want CFO advisory and tax prep bundled with your bookkeeping",
                  "Your company is VC-backed and needs equity accounting support",
                  "You don&apos;t have an existing accounting firm relationship",
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

        {/* Verdict */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Verdict</h2>
          <div className="rounded-2xl border border-white/10 bg-[#111] p-6 leading-relaxed text-white/80">
            <p className="mb-4">
              <span className="font-semibold text-white">If you&apos;re an accounting firm reading this, Botkeeper is built for you.</span> It&apos;s designed to sit inside your firm&apos;s workflow, automate the low-value transaction categorization work, and let you scale to more clients without proportionally scaling headcount. The per-client pricing rewards volume and the firm retains full ownership of the client relationship.
            </p>
            <p className="mb-4">
              <span className="font-semibold text-white">If you&apos;re a business owner reading this, Pilot is almost certainly the better choice.</span> You get a dedicated bookkeeper, a clear monthly deliverable, and optional CFO advisory services layered on top. For startups in particular, Pilot&apos;s familiarity with VC-backed company accounting (cap tables, convertible notes, R&D credits) is hard to replicate with a generalist bookkeeping firm.
            </p>
            <p>
              The one case where the lines blur: a small accounting firm whose clients are exclusively tech startups. In that scenario, Pilot&apos;s per-business pricing might actually make sense as a white-label-style solution, but you&apos;ll need to evaluate whether the economics work at your client size and whether you&apos;re comfortable giving up the direct client relationship.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Current Pricing (March 2026)</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#111] p-5">
              <h3 className="mb-3 font-bold text-white">Botkeeper Pricing</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex justify-between">
                  <span>Per client (1–10 clients)</span>
                  <span className="font-medium text-white">From $299/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Volume pricing (10+ clients)</span>
                  <span className="font-medium text-white">Negotiated</span>
                </li>
              </ul>
              <a
                href="https://botkeeper.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 inline-block rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Get Botkeeper pricing →
              </a>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#111] p-5">
              <h3 className="mb-3 font-bold text-white">Pilot Pricing</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex justify-between">
                  <span>Core (up to $200k/yr revenue)</span>
                  <span className="font-medium text-white">$499/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Select (up to $1M/yr revenue)</span>
                  <span className="font-medium text-white">$849/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Plus</span>
                  <span className="font-medium text-white">Custom</span>
                </li>
              </ul>
              <a
                href="https://pilot.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 inline-block rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/40"
              >
                Get Pilot pricing →
              </a>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mb-10 border-t border-white/10 pt-10">
          <h2 className="mb-4 text-xl font-bold text-white">Related Guides</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/compare/dext-vs-hubdoc"
              className="group rounded-xl border border-white/10 bg-[#111] p-4 transition-all hover:border-[#2563eb]/30"
            >
              <p className="font-medium text-white transition-colors group-hover:text-[#2563eb]">
                Dext vs. Hubdoc
              </p>
              <p className="mt-1 text-xs text-white/50">Receipt capture and document management compared</p>
            </Link>
            <Link
              href="/compare/taxgpt-vs-blue-j"
              className="group rounded-xl border border-white/10 bg-[#111] p-4 transition-all hover:border-[#2563eb]/30"
            >
              <p className="font-medium text-white transition-colors group-hover:text-[#2563eb]">
                TaxGPT vs. Blue J
              </p>
              <p className="mt-1 text-xs text-white/50">AI tax research tools compared</p>
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
