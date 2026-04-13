import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rezi vs. Addressable 2026: Which AI Listing & Marketing Tool Wins?",
  description:
    "Rezi vs. Addressable compared: listing description quality, social media content, direct mail integration, MLS compliance, pricing, and brokerage vs. agent focus. Which AI marketing tool is right for real estate in 2026.",
  openGraph: {
    title: "Rezi vs. Addressable 2026: Which AI Listing & Marketing Tool Wins?",
    description:
      "Complete side-by-side comparison of Rezi and Addressable for AI real estate marketing — listing descriptions, social content, direct mail, MLS compliance, pricing, and who each tool serves.",
    type: "article",
  },
};

const comparisonRows = [
  {
    feature: "Listing Description Quality",
    rezi: "AI generates SEO-optimized MLS copy, property highlight summaries, and feature callouts from structured inputs",
    addressable: "Generates listing-specific social posts and direct mail copy; less focused on MLS description writing",
    winner: "rezi",
    note: "Rezi is specifically built for listing copy. You input property details and it produces MLS-ready descriptions with neighborhood context and SEO structure. Addressable's strength is marketing the listing after it&apos;s live, not writing the MLS copy.",
  },
  {
    feature: "Social Media Content",
    rezi: "Generates captions for Instagram, Facebook, and LinkedIn; requires manual scheduling",
    addressable: "Automated social campaigns tied to listing milestones (just listed, price reduction, open house, sold)",
    winner: "addressable",
    note: "Addressable wins social media content by design — it automates the full campaign, not just the copywriting. Milestone-triggered posts mean you set it up once and the content publishes automatically throughout the listing lifecycle.",
  },
  {
    feature: "Direct Mail Integration",
    rezi: "No native direct mail features",
    addressable: "Core feature: generates and sends automated direct mail campaigns (just listed, just sold) to surrounding properties",
    winner: "addressable",
    note: "Direct mail is Addressable&apos;s flagship feature. Just-listed and just-sold campaigns to neighbors are automated and personalized — this is the core use case the tool was built for.",
  },
  {
    feature: "MLS Compliance",
    rezi: "Built with MLS character limits and disclosure requirements in mind; outputs formatted for direct paste",
    addressable: "Not designed for MLS submission; marketing content only",
    winner: "rezi",
    note: "If MLS-compliant listing copy is your primary need, Rezi is purpose-built for it. Addressable explicitly positions itself as a marketing tool, not a listing input tool.",
  },
  {
    feature: "Pricing",
    rezi: "From $29/mo (Starter, 5 listings/mo); $79/mo (Pro, unlimited listings); team plans available",
    addressable: "From $199/mo (Agent plan); $399/mo (Team); includes direct mail production costs",
    winner: "rezi",
    note: "Rezi is significantly cheaper, but the comparison is somewhat unfair — Addressable includes actual mail production costs in its pricing, not just software access.",
  },
  {
    feature: "Brokerage vs. Agent Focus",
    rezi: "Individual agent tool; team accounts available but not brokerage-native",
    addressable: "Designed for both individual agents and brokerages; brokerage compliance controls included",
    winner: "addressable",
    note: "Brokerages with compliance requirements around agent marketing materials should look at Addressable. It has approval workflows and brand control features that Rezi lacks.",
  },
  {
    feature: "Input Flexibility",
    rezi: "Accepts address + manual feature input or basic MLS data paste; quick to use",
    addressable: "Pulls listing data from MLS automatically via integration; less manual data entry",
    winner: "addressable",
    note: "Addressable&apos;s MLS integration means listing data flows in automatically. Rezi requires more manual input, though the interface is simple enough that this isn&apos;t a major friction point.",
  },
  {
    feature: "Neighborhood / Local Context",
    rezi: "Pulls in walkability scores, school ratings, and neighborhood POI data automatically",
    addressable: "Limited neighborhood context in generated content",
    winner: "rezi",
    note: "Rezi&apos;s neighborhood data enrichment is a standout — it automatically incorporates walk score, transit, and local amenity context into listing descriptions without you having to research it.",
  },
  {
    feature: "Video / Reel Scripts",
    rezi: "Generates property video scripts and tour narration copy",
    addressable: "Basic social video caption support; no full video scripting",
    winner: "rezi",
    note: "For agents who do Reels or YouTube property tours, Rezi&apos;s video script generation is a useful add-on that Addressable doesn&apos;t offer.",
  },
  {
    feature: "Brand Consistency",
    rezi: "Custom tone of voice settings; limited brand asset management",
    addressable: "Full brand kit support: logo, colors, fonts, disclaimers applied to all output",
    winner: "addressable",
    note: "Addressable&apos;s brand consistency controls are more developed — important for teams where multiple agents need to produce on-brand marketing materials.",
  },
];

export default function ReziVsAddressablePage() {
  const reziWins = comparisonRows.filter((r) => r.winner === "rezi").length;
  const addressableWins = comparisonRows.filter((r) => r.winner === "addressable").length;
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
          <span className="text-white/60">Rezi vs. Addressable</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 inline-block rounded-full bg-[#059669]/10 px-3 py-1 text-xs font-medium text-[#059669]">
            AI Listing & Marketing
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Rezi vs. Addressable (2026): AI Listing Copy vs. AI Marketing Automation
          </h1>
          <p className="mt-4 text-lg text-white/60">
            Rezi and Addressable both promise to save agents hours on property marketing — but they attack different parts of the problem. Rezi is a listing copywriting tool: it writes your MLS descriptions, video scripts, and social captions. Addressable is a marketing automation platform: it runs your just-listed campaigns, direct mail, and social posts on autopilot. They&apos;re more complementary than competitive.
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
            <p className="text-3xl font-bold text-[#059669]">{reziWins}</p>
            <p className="mt-1 text-sm font-medium text-white">Rezi wins</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#111] p-5 text-center">
            <p className="text-3xl font-bold text-white/40">{ties}</p>
            <p className="mt-1 text-sm font-medium text-white/60">Ties</p>
          </div>
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 text-center">
            <p className="text-3xl font-bold text-blue-400">{addressableWins}</p>
            <p className="mt-1 text-sm font-medium text-white">Addressable wins</p>
          </div>
        </div>

        {/* Quick Verdict */}
        <div className="mb-10 rounded-2xl border border-[#059669]/20 bg-[#111] p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#059669]">Quick Verdict</p>
          <p className="leading-relaxed text-white/80">
            <span className="font-semibold text-white">Choose Rezi if you need better listing copy, faster</span> — it&apos;s the specialist tool for MLS descriptions, video scripts, and SEO-optimized property narratives. <span className="font-semibold text-white">Choose Addressable if you want automated marketing campaigns</span> including direct mail that runs itself after you take a listing. Many agents ultimately use both: Rezi for the MLS description and Addressable for the marketing campaign around it.
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
                  <th className="px-4 py-3 text-left font-semibold text-[#059669]">Rezi</th>
                  <th className="px-4 py-3 text-left font-semibold text-blue-400">Addressable</th>
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
                    <td className="px-4 py-4 text-white/60">{row.rezi}</td>
                    <td className="px-4 py-4 text-white/60">{row.addressable}</td>
                    <td className="px-4 py-4">
                      {row.winner === "rezi" && (
                        <span className="rounded-full bg-[#059669]/10 px-2 py-0.5 text-xs font-medium text-[#059669]">
                          Rezi
                        </span>
                      )}
                      {row.winner === "addressable" && (
                        <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-400">
                          Addressable
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
              <h3 className="mb-3 text-lg font-bold text-white">Choose Rezi if...</h3>
              <ul className="space-y-3">
                {[
                  "You want better MLS listing descriptions without spending 45 minutes writing",
                  "You create property video tours and need scripts quickly",
                  "You want neighborhood data automatically incorporated in your copy",
                  "You have a tight budget ($29–$79/mo vs. $199+/mo for Addressable)",
                  "Your primary pain point is writing speed, not marketing automation",
                  "You want individual agent-level tool without team infrastructure",
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
              <h3 className="mb-3 text-lg font-bold text-white">Choose Addressable if...</h3>
              <ul className="space-y-3">
                {[
                  "You want automated direct mail campaigns that run after every listing",
                  "You need social campaigns to trigger automatically at listing milestones",
                  "You&apos;re building a farming strategy and want AI to handle the marketing",
                  "You manage multiple agents or need brokerage-level brand controls",
                  "You want MLS data to flow in automatically without manual entry",
                  "You&apos;re willing to pay more for a set-it-and-forget-it marketing system",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
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
              <span className="font-semibold text-white">Rezi is the right call for agents who need to write better listing copy faster.</span> At $29–$79/mo, it&apos;s one of the best-value AI tools in real estate. The neighborhood data enrichment and video script features are genuinely useful, and the MLS compliance formatting means output is ready to paste rather than requiring reformatting.
            </p>
            <p className="mb-4">
              <span className="font-semibold text-white">Addressable is for agents who want their marketing to run on autopilot.</span> The direct mail automation is the killer feature — just-listed and just-sold campaigns to surrounding homes are one of the most effective farming tactics in the business, and Addressable makes them nearly effortless. If you take 2+ listings per month and want each one to automatically generate a neighborhood marketing campaign, the ROI math on Addressable works quickly.
            </p>
            <p>
              The honest recommendation: if you can only pick one, ask yourself whether your biggest time suck is writing listing copy (pick Rezi) or managing marketing campaigns (pick Addressable). If you do 5+ listings a month, consider using both — the combined cost is under $300/mo and the time savings justify it.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Current Pricing (March 2026)</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#111] p-5">
              <h3 className="mb-3 font-bold text-white">Rezi Pricing</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex justify-between">
                  <span>Starter (5 listings/mo)</span>
                  <span className="font-medium text-white">$29/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Pro (unlimited)</span>
                  <span className="font-medium text-white">$79/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Team</span>
                  <span className="font-medium text-white">Custom</span>
                </li>
              </ul>
              <a
                href="https://rezi.ai"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 inline-block rounded-lg bg-[#059669] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Get Rezi pricing →
              </a>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#111] p-5">
              <h3 className="mb-3 font-bold text-white">Addressable Pricing</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex justify-between">
                  <span>Agent plan</span>
                  <span className="font-medium text-white">From $199/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Team plan</span>
                  <span className="font-medium text-white">From $399/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Brokerage</span>
                  <span className="font-medium text-white">Custom</span>
                </li>
              </ul>
              <a
                href="https://addressable.app"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 inline-block rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/40"
              >
                Get Addressable pricing →
              </a>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mb-10 border-t border-white/10 pt-10">
          <h2 className="mb-4 text-xl font-bold text-white">Related Guides</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/compare/structurely-vs-ylopo"
              className="group rounded-xl border border-white/10 bg-[#111] p-4 transition-all hover:border-[#059669]/30"
            >
              <p className="font-medium text-white transition-colors group-hover:text-[#059669]">
                Structurely vs. Ylopo
              </p>
              <p className="mt-1 text-xs text-white/50">AI lead nurturing tools compared</p>
            </Link>
            <Link
              href="/compare/lofty-vs-follow-up-boss"
              className="group rounded-xl border border-white/10 bg-[#111] p-4 transition-all hover:border-[#059669]/30"
            >
              <p className="font-medium text-white transition-colors group-hover:text-[#059669]">
                Lofty vs. Follow Up Boss
              </p>
              <p className="mt-1 text-xs text-white/50">AI CRM platforms for real estate agents compared</p>
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
