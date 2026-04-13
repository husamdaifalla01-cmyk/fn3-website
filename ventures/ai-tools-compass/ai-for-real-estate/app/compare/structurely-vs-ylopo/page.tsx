import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Structurely vs. Ylopo 2026: Which AI Lead Nurturing Tool Wins?",
  description:
    "Structurely vs. Ylopo compared: pricing, response speed, qualification depth, CRM integrations, follow-up sequences, languages, and SMS vs. email. Which AI lead nurturing tool is right for real estate agents in 2026.",
  openGraph: {
    title: "Structurely vs. Ylopo 2026: Which AI Lead Nurturing Tool Wins?",
    description:
      "Complete side-by-side comparison of Structurely and Ylopo for AI lead nurturing — pricing, response speed, qualification depth, CRM integrations, follow-up sequences, languages, and SMS vs. email.",
    type: "article",
  },
};

const comparisonRows = [
  {
    feature: "Pricing",
    structurely: "From $499/mo (individual agent); team plans from $999/mo; volume pricing for brokerages",
    ylopo: "From $600/mo base + $250–$600/mo in ad spend management; typically $1,200–$2,000/mo all-in",
    winner: "structurely",
    note: "Structurely is simpler to price: you pay a SaaS fee. Ylopo's pricing is more complex because it bundles lead generation advertising with the nurturing platform. If you already generate your own leads, Structurely is the cleaner fit.",
  },
  {
    feature: "Response Speed",
    structurely: "Responds in under 60 seconds via SMS and email; AI handles initial contact around the clock",
    ylopo: "Sub-minute response via SMS; Raiya AI (their bot) initiates contact immediately on lead capture",
    winner: "tie",
    note: "Both tools respond to new leads within minutes. In practice, neither gives you a meaningful edge on raw response speed — the difference is in what the conversation does after that first touch.",
  },
  {
    feature: "Qualification Depth",
    structurely: "Collects timeline, budget, pre-approval status, property criteria; passes HLQL score to CRM",
    ylopo: "Qualification focuses on engagement and search behavior; less structured conversational qualification",
    winner: "structurely",
    note: "Structurely's conversational AI is specifically designed to qualify leads — it runs a structured question flow and scores them. Ylopo's strength is retargeting and re-engagement, not deep initial qualification.",
  },
  {
    feature: "CRM Integrations",
    structurely: "Native integrations with Follow Up Boss, kvCORE, Sierra, LionDesk, Salesforce, and more",
    ylopo: "Deepest integration with Follow Up Boss and kvCORE; other CRMs via Zapier",
    winner: "structurely",
    note: "Structurely's broader native CRM integration list gives it an edge for teams on less common CRM platforms.",
  },
  {
    feature: "Follow-Up Sequences",
    structurely: "AI continues following up for up to 12 months; sequences adapt based on response",
    ylopo: "Long-term retargeting via dynamic ads + drip campaigns; Raiya AI re-engages non-responders",
    winner: "tie",
    note: "Both tools have strong long-term follow-up. Structurely does it via conversational AI messaging. Ylopo does it via a combination of AI messaging and retargeted Facebook/Google ads.",
  },
  {
    feature: "Languages Supported",
    structurely: "English, Spanish; more in development",
    ylopo: "English primary; limited Spanish support",
    winner: "structurely",
    note: "For agents serving Spanish-speaking markets, Structurely's Spanish support is a practical differentiator.",
  },
  {
    feature: "SMS vs. Email",
    structurely: "SMS-first with email fallback; text response rates are significantly higher",
    ylopo: "SMS + dynamic ad retargeting; email drip included",
    winner: "tie",
    note: "Both tools correctly prioritize SMS as the primary channel. Ylopo adds retargeted social ads as an additional re-engagement layer, which Structurely does not.",
  },
  {
    feature: "Lead Generation (Built-in)",
    structurely: "None — pure nurturing tool; you bring your own leads",
    ylopo: "Includes IDX website and paid ad management to generate leads",
    winner: "ylopo",
    note: "This is the biggest functional difference. Ylopo is a full lead generation + nurturing platform. Structurely is nurturing only. If you don&apos;t have a reliable lead source, Ylopo&apos;s end-to-end system has a real advantage.",
  },
  {
    feature: "Reporting & Analytics",
    structurely: "Dashboard shows conversation outcomes, HLQL scores, conversion rates",
    ylopo: "Detailed ad performance, lead pipeline analytics, and behavioral tracking",
    winner: "ylopo",
    note: "Ylopo&apos;s reporting is more comprehensive because it tracks the full journey from ad impression to conversation to pipeline.",
  },
  {
    feature: "Setup & Onboarding",
    structurely: "CRM connection + phone number setup; live in 1–2 weeks",
    ylopo: "4–6 weeks for full setup; IDX site build, ad campaigns, and CRM integration all required",
    winner: "structurely",
    note: "Structurely&apos;s simpler scope means faster activation. Ylopo&apos;s longer setup reflects the broader platform being configured.",
  },
];

export default function StructurelyVsYlopoPage() {
  const structurelyWins = comparisonRows.filter((r) => r.winner === "structurely").length;
  const ylopoWins = comparisonRows.filter((r) => r.winner === "ylopo").length;
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
          <span className="text-white/60">Structurely vs. Ylopo</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 inline-block rounded-full bg-[#059669]/10 px-3 py-1 text-xs font-medium text-[#059669]">
            AI Lead Nurturing
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Structurely vs. Ylopo (2026): Which AI Lead Nurturing Tool Actually Converts?
          </h1>
          <p className="mt-4 text-lg text-white/60">
            Structurely and Ylopo both use AI to keep real estate leads engaged — but they serve different stages of the pipeline and different types of agents. Structurely is a pure nurturing tool you plug into your existing lead sources. Ylopo is a full platform that generates leads and nurtures them. Here&apos;s exactly where they differ.
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
          <div className="rounded-xl border border-[#059669]/20 bg-[#059669]/5 p-5 text-center">
            <p className="text-3xl font-bold text-[#059669]">{structurelyWins}</p>
            <p className="mt-1 text-sm font-medium text-white">Structurely wins</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#111] p-5 text-center">
            <p className="text-3xl font-bold text-white/40">{ties}</p>
            <p className="mt-1 text-sm font-medium text-white/60">Ties</p>
          </div>
          <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5 text-center">
            <p className="text-3xl font-bold text-orange-400">{ylopoWins}</p>
            <p className="mt-1 text-sm font-medium text-white">Ylopo wins</p>
          </div>
        </div>

        {/* Quick Verdict */}
        <div className="mb-10 rounded-2xl border border-[#059669]/20 bg-[#111] p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#059669]">Quick Verdict</p>
          <p className="leading-relaxed text-white/80">
            <span className="font-semibold text-white">Structurely is the better pure-play nurturing tool</span> — stronger qualification, faster setup, and more CRM integrations. <span className="font-semibold text-white">Ylopo wins if you need a full lead generation + nurturing system</span> and don&apos;t already have a reliable source of internet leads. The wrong choice is using Ylopo when you already have lead gen dialed in, or using Structurely when you don&apos;t have enough lead volume to nurture.
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
                  <th className="px-4 py-3 text-left font-semibold text-[#059669]">Structurely</th>
                  <th className="px-4 py-3 text-left font-semibold text-orange-400">Ylopo</th>
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
                    <td className="px-4 py-4 text-white/60">{row.structurely}</td>
                    <td className="px-4 py-4 text-white/60">{row.ylopo}</td>
                    <td className="px-4 py-4">
                      {row.winner === "structurely" && (
                        <span className="rounded-full bg-[#059669]/10 px-2 py-0.5 text-xs font-medium text-[#059669]">
                          Structurely
                        </span>
                      )}
                      {row.winner === "ylopo" && (
                        <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-xs font-medium text-orange-400">
                          Ylopo
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
            <div className="rounded-2xl border border-[#059669]/20 bg-[#059669]/5 p-6">
              <h3 className="mb-3 text-lg font-bold text-white">Choose Structurely if...</h3>
              <ul className="space-y-3">
                {[
                  "You already generate 30+ leads per month from Zillow, Realtor.com, or your own ads",
                  "You want AI to handle the first 5–10 conversations before you step in",
                  "You need deep qualification data passed directly into your CRM",
                  "You serve Spanish-speaking markets",
                  "You want to be live within 2 weeks without a lengthy setup process",
                  "You want to pay a flat SaaS fee without managing ad spend",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#111] p-6">
              <h3 className="mb-3 text-lg font-bold text-white">Choose Ylopo if...</h3>
              <ul className="space-y-3">
                {[
                  "You need an end-to-end system: lead gen + IDX website + nurturing",
                  "You don&apos;t have a reliable source of internet buyer leads yet",
                  "You want retargeted Facebook and Google ads re-engaging your database",
                  "Your team is on Follow Up Boss or kvCORE (Ylopo&apos;s native integrations)",
                  "You want behavioral lead data from property search activity",
                  "You&apos;re a team leader building a scalable ISA-replacement workflow",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
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
              <span className="font-semibold text-white">Structurely is the cleaner tool if lead generation isn&apos;t your problem.</span> Agents who already have Zillow Premier Agent, a referral network, or paid social campaigns running should choose Structurely. It does one thing — AI lead nurturing and qualification — and it does it very well. The CRM integration depth and Spanish language support give it a practical edge for the typical individual agent or small team.
            </p>
            <p className="mb-4">
              <span className="font-semibold text-white">Ylopo is for teams who want to build a full internet lead machine.</span> The platform generates its own leads through IDX and paid ads, then nurtures them with Raiya AI, and retargets non-responders through social ads. If you&apos;re a team leader trying to build a predictable pipeline from scratch, Ylopo&apos;s integrated approach is genuinely powerful — but you&apos;re paying $1,500+/mo and committing to a 6-week onboarding.
            </p>
            <p>
              Bottom line: lead nurturing without lead generation is like a funnel with no top. Before choosing, honestly assess your lead volume. If you have enough leads but need better follow-up, Structurely. If you need both, Ylopo — but go in knowing you&apos;re buying a platform, not a simple AI chatbot.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Current Pricing (March 2026)</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#111] p-5">
              <h3 className="mb-3 font-bold text-white">Structurely Pricing</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex justify-between">
                  <span>Individual agent</span>
                  <span className="font-medium text-white">From $499/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Team plan</span>
                  <span className="font-medium text-white">From $999/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Brokerage / Enterprise</span>
                  <span className="font-medium text-white">Custom</span>
                </li>
              </ul>
              <a
                href="https://structurely.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 inline-block rounded-lg bg-[#059669] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Get Structurely pricing →
              </a>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#111] p-5">
              <h3 className="mb-3 font-bold text-white">Ylopo Pricing</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex justify-between">
                  <span>Platform base</span>
                  <span className="font-medium text-white">From $600/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Required ad spend</span>
                  <span className="font-medium text-white">$250–$600/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Typical all-in cost</span>
                  <span className="font-medium text-white">$1,200–$2,000/mo</span>
                </li>
              </ul>
              <a
                href="https://ylopo.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 inline-block rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/40"
              >
                Get Ylopo pricing →
              </a>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mb-10 border-t border-white/10 pt-10">
          <h2 className="mb-4 text-xl font-bold text-white">Related Guides</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/compare/lofty-vs-follow-up-boss"
              className="group rounded-xl border border-white/10 bg-[#111] p-4 transition-all hover:border-[#059669]/30"
            >
              <p className="font-medium text-white transition-colors group-hover:text-[#059669]">
                Lofty vs. Follow Up Boss
              </p>
              <p className="mt-1 text-xs text-white/50">AI CRM platforms for real estate agents compared</p>
            </Link>
            <Link
              href="/compare/rezi-vs-addressable"
              className="group rounded-xl border border-white/10 bg-[#111] p-4 transition-all hover:border-[#059669]/30"
            >
              <p className="font-medium text-white transition-colors group-hover:text-[#059669]">
                Rezi vs. Addressable
              </p>
              <p className="mt-1 text-xs text-white/50">AI listing and marketing tools compared</p>
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
