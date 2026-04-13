import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lofty vs. Follow Up Boss 2026: Which Real Estate CRM Actually Wins?",
  description:
    "Lofty vs. Follow Up Boss compared on pricing, lead routing, AI features, integrations, mobile app, and support quality. The complete breakdown for real estate agents and teams in 2026.",
  openGraph: {
    title: "Lofty vs. Follow Up Boss 2026: Which Real Estate CRM Actually Wins?",
    description:
      "Side-by-side comparison of Lofty and Follow Up Boss: pricing, AI features, lead routing, integrations, mobile app quality, and support. Which CRM is right for your team?",
    type: "article",
  },
};

const comparisonRows = [
  {
    feature: "Pricing",
    lofty: "From $449/mo (1-3 agents); scales to $1,200+/mo for larger teams",
    fub: "From $69/mo (up to 1 user); $83/mo/user (Platform); enterprise custom",
    winner: "fub",
    note: "Follow Up Boss is dramatically more affordable for solo agents and small teams. Lofty's pricing reflects its all-in-one nature (website, IDX, ads, CRM), which may be worth the premium if you're replacing multiple tools.",
  },
  {
    feature: "Lead Routing",
    lofty: "Smart routing rules with round-robin, geographic, and source-based assignment; AI priority scoring",
    fub: "Excellent routing engine with ponds, round-robin, and team/agent assignment; highly customizable rules",
    winner: "tie",
    note: "Both platforms have mature, reliable lead routing. Lofty's AI priority scoring gives agents a ranked call list; Follow Up Boss's flexibility appeals to teams that want granular control over routing logic.",
  },
  {
    feature: "AI Features",
    lofty: "AI-generated listing descriptions, predictive lead scoring, automated follow-up sequences, AI call insights",
    fub: "AI-powered smart lists, automated action plans, conversation intelligence (via integrations)",
    winner: "lofty",
    note: "Lofty has invested more in native AI features, particularly the predictive lead scoring and AI listing copy generation. FUB's AI story is improving but more dependent on integrations like Structurely for AI conversations.",
  },
  {
    feature: "IDX Website Included",
    lofty: "Yes — IDX website with property search and lead capture included",
    fub: "No — FUB is CRM-only; requires separate IDX website",
    winner: "lofty",
    note: "This is a major differentiator. Lofty's included IDX website with lead capture means your entire lead-to-close funnel is in one platform. FUB requires a separate Showcase IDX, Real Geeks, or similar subscription.",
  },
  {
    feature: "Integrations",
    lofty: "Built-in integrations with major portals (Zillow, Realtor.com), Google, Facebook; API available",
    fub: "250+ integrations including all major lead sources, Google/Facebook, Zapier, and most MLS systems",
    winner: "fub",
    note: "Follow Up Boss has a significantly broader integration ecosystem. If you use niche lead sources or specialized tools, FUB is more likely to have a native connection.",
  },
  {
    feature: "Mobile App",
    lofty: "Full-featured iOS/Android app; includes lead contact, action plans, and calling",
    fub: "Highly rated iOS/Android app (4.8+ App Store); fast, reliable, used heavily by field agents",
    winner: "fub",
    note: "Both apps are solid, but Follow Up Boss's mobile app is frequently cited by agents as one of the best in the category. If your team is heavily mobile, FUB has the edge.",
  },
  {
    feature: "Dialer / Calling",
    lofty: "Built-in power dialer with call recording and AI call insights",
    fub: "Built-in calling with recording; integrates with dedicated dialers like Mojo and REDX for power dialing",
    winner: "lofty",
    note: "Lofty's native power dialer is more capable out-of-the-box. FUB's native calling is solid but for serious call volume, most agents add a dedicated dialer integration.",
  },
  {
    feature: "Automated Follow-Up",
    lofty: "Automated drip campaigns, AI-triggered follow-up based on lead behavior and scoring",
    fub: "Action plans with multi-channel automation (email, text, task); behavior-triggered triggers",
    winner: "tie",
    note: "Both platforms have mature automation. Lofty's behavior-triggered AI sequences are slightly more hands-off; FUB's action plans are more customizable for agents who want fine-grained control.",
  },
  {
    feature: "Team Management",
    lofty: "Team dashboards, accountability tools, lead pipeline by agent; built for team leads",
    fub: "Team collaboration, reporting, and lead assignment; used extensively by large brokerages",
    winner: "tie",
    note: "Both are strong for teams. Lofty adds accountability-specific features (daily activity targets, leaderboards) that appeal to more structured team environments.",
  },
  {
    feature: "Support Quality",
    lofty: "Live chat, phone, dedicated onboarding; mixed reviews on response times at scale",
    fub: "Phone support, chat, email; consistently rated highly by users; strong community/training",
    winner: "fub",
    note: "Follow Up Boss has a reputation for being highly responsive and genuinely helpful. User reviews consistently rate their support higher than Lofty's, especially for larger accounts.",
  },
  {
    feature: "Onboarding / Setup",
    lofty: "More complex to set up (more features to configure); dedicated onboarding included",
    fub: "Faster to get running; intuitive interface; most teams operational within days",
    winner: "fub",
    note: "If you want to be running quickly with minimal configuration, FUB wins. Lofty's depth is also its complexity — plan for a longer setup phase.",
  },
];

export default function LoftyVsFollowUpBossPage() {
  const loftyWins = comparisonRows.filter((r) => r.winner === "lofty").length;
  const fubWins = comparisonRows.filter((r) => r.winner === "fub").length;
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
            <span className="text-white/70">Lofty vs. Follow Up Boss</span>
          </div>

          <div className="mb-4 inline-block rounded-full bg-[#059669]/10 px-3 py-1 text-xs font-medium text-[#059669]">
            Updated March 2026
          </div>

          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl leading-tight">
            Lofty vs. Follow Up Boss 2026: Which Real Estate CRM Should Your Team Use?
          </h1>

          <p className="mt-5 text-lg text-white/70 leading-relaxed">
            Lofty and Follow Up Boss are the two dominant CRM platforms for serious real estate
            teams. Both have strong followings, real AI features, and the ability to handle
            high-volume lead operations. But they have fundamentally different philosophies —
            Lofty is an all-in-one platform, FUB is the best-in-class CRM that integrates with
            everything else. Here&apos;s the complete comparison.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="rounded-full bg-white/5 px-3 py-1.5 text-white/60">
              {comparisonRows.length} features compared
            </span>
            <span className="rounded-full bg-white/5 px-3 py-1.5 text-white/60">
              ~8 min read
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">

        {/* Quick Verdict */}
        <div className="mb-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#059669]/30 bg-[#059669]/5 p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-[#059669]/20 px-2 py-0.5 text-xs font-medium text-[#059669]">
                Best All-in-One
              </span>
              <span className="text-lg font-bold text-white">Lofty</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Better choice for teams who want an IDX website, CRM, lead ads, and AI all
              in one platform. More native AI features including predictive scoring and
              listing copy generation. Higher price tag reflects the all-in-one value.
            </p>
            <a
              href="https://www.lofty.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-4 inline-block rounded-lg bg-[#059669] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
            >
              Try Lofty →
            </a>
          </div>

          <div className="rounded-2xl border border-white/15 bg-[#111] p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white/60">
                Best Pure CRM
              </span>
              <span className="text-lg font-bold text-white">Follow Up Boss</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              The right choice for agents and teams who already have an IDX website and want
              the most flexible, best-supported CRM. Lower price point, faster setup,
              excellent mobile app, and 250+ integrations.
            </p>
            <a
              href="https://www.followupboss.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-4 inline-block rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80 hover:border-white/40 transition-colors"
            >
              Try Follow Up Boss →
            </a>
          </div>
        </div>

        {/* Score summary */}
        <div className="mb-10 rounded-xl border border-white/10 bg-[#111] p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-semibold text-white">Head-to-head score ({comparisonRows.length} features)</p>
            <div className="flex gap-4 text-sm">
              <span className="text-[#059669] font-bold">Lofty: {loftyWins} wins</span>
              <span className="text-white/50">Follow Up Boss: {fubWins} wins</span>
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
                  <th className="px-4 py-3 text-left font-semibold text-white w-36">Feature</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#059669]">Lofty</th>
                  <th className="px-4 py-3 text-left font-semibold text-white/70">Follow Up Boss</th>
                  <th className="px-4 py-3 text-left font-semibold text-white/40 w-24">Winner</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/2">
                    <td className="px-4 py-4 font-medium text-white align-top">{row.feature}</td>
                    <td className="px-4 py-4 text-white/70 align-top leading-relaxed">{row.lofty}</td>
                    <td className="px-4 py-4 text-white/70 align-top leading-relaxed">{row.fub}</td>
                    <td className="px-4 py-4 align-top">
                      {row.winner === "lofty" && (
                        <span className="rounded-full bg-[#059669]/20 px-2 py-0.5 text-xs font-medium text-[#059669]">
                          Lofty
                        </span>
                      )}
                      {row.winner === "fub" && (
                        <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400">
                          FUB
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
          <h2 className="text-2xl font-bold text-white mb-6">Key Decision Factors</h2>
          <div className="space-y-4">
            {comparisonRows.filter(r => r.note).map((row, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-[#111] p-5">
                <p className="font-semibold text-white mb-1">{row.feature}</p>
                <p className="text-sm text-white/60 leading-relaxed">{row.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who it's for */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Who Each Platform Is For</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#059669]/20 bg-[#059669]/5 p-6">
              <h3 className="text-lg font-bold text-white mb-3">Choose Lofty if...</h3>
              <ul className="space-y-3">
                {[
                  "You don't have an IDX website and want everything in one platform",
                  "You want the most AI features available natively (scoring, copy gen, call insights)",
                  "You're running a team of 5+ agents who benefit from built-in accountability tools",
                  "You're running paid ads and want ad management + CRM in one place",
                  "You're willing to pay a premium to reduce the number of vendor relationships you manage",
                  "You want a built-in power dialer without a separate subscription",
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
              <h3 className="text-lg font-bold text-white mb-3">Choose Follow Up Boss if...</h3>
              <ul className="space-y-3">
                {[
                  "You already have an IDX website you like (Real Geeks, Showcase, etc.)",
                  "Budget matters and you want CRM-only pricing without bundled features you won't use",
                  "Your agents are heavily mobile and need the best field-facing app",
                  "You use niche lead sources or tools that need to integrate with your CRM",
                  "You want to get up and running quickly without a lengthy configuration phase",
                  "Support responsiveness and quality is a high priority for your team",
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

        {/* Pricing */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Current Pricing (March 2026)</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#111] p-5">
              <h3 className="font-bold text-white mb-3">Lofty Pricing</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex justify-between">
                  <span>Starter (1-3 agents)</span>
                  <span className="font-medium text-white">$449/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Advanced (up to 10 agents)</span>
                  <span className="font-medium text-white">$899/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Professional (up to 25 agents)</span>
                  <span className="font-medium text-white">$1,299/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Enterprise</span>
                  <span className="font-medium text-white">Custom</span>
                </li>
              </ul>
              <p className="mt-3 text-xs text-white/40">Includes IDX website, CRM, dialer, and AI features</p>
              <a
                href="https://www.lofty.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 inline-block rounded-lg bg-[#059669] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
              >
                Get Lofty pricing →
              </a>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#111] p-5">
              <h3 className="font-bold text-white mb-3">Follow Up Boss Pricing</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex justify-between">
                  <span>Grow (up to 1 user)</span>
                  <span className="font-medium text-white">$69/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Platform ($83/user/mo)</span>
                  <span className="font-medium text-white">from $249/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Pro (all features)</span>
                  <span className="font-medium text-white">Custom</span>
                </li>
              </ul>
              <p className="mt-3 text-xs text-white/40">CRM only; IDX website sold separately</p>
              <a
                href="https://www.followupboss.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 inline-block rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80 hover:border-white/40 transition-colors"
              >
                Get Follow Up Boss pricing →
              </a>
            </div>
          </div>
        </section>

        {/* Verdict */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Bottom Line</h2>
          <div className="rounded-2xl border border-white/10 bg-[#111] p-6 leading-relaxed text-white/80">
            <p className="mb-4">
              <span className="font-semibold text-white">Lofty wins on features per dollar if you&apos;re building from scratch.</span>{" "}
              If you&apos;re a new team or currently paying for a separate IDX website, CRM, and dialer,
              Lofty&apos;s consolidated pricing often makes financial sense — and you get more AI
              functionality natively than you would assembling separate tools.
            </p>
            <p className="mb-4">
              <span className="font-semibold text-white">Follow Up Boss wins on flexibility and support.</span>{" "}
              If you have an existing tech stack you&apos;re happy with, FUB&apos;s integration depth means
              you can slot it in without disruption. And consistently strong user reviews on support
              quality matter when something breaks at 9pm before a big presentation.
            </p>
            <p>
              The agents who are unhappiest with their CRM are usually the ones who switched for
              price without auditing their workflow first. Before committing to either platform,
              take both free trials and run your most common weekly tasks through each. That test
              will tell you more than any comparison table.
            </p>
          </div>
        </section>

        {/* Related */}
        <section className="mb-10 border-t border-white/10 pt-10">
          <h2 className="text-xl font-bold text-white mb-4">Related Guides</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/guides/listing-description-ai-workflow"
              className="group rounded-xl border border-white/10 bg-[#111] p-4 transition-all hover:border-[#059669]/30"
            >
              <p className="font-medium text-white group-hover:text-[#059669] transition-colors">
                AI Listing Description Workflow
              </p>
              <p className="mt-1 text-xs text-white/50">Write better descriptions in 5 minutes with AI</p>
            </Link>
            <Link
              href="/compare/best-ai-for-real-estate-lead-generation"
              className="group rounded-xl border border-white/10 bg-[#111] p-4 transition-all hover:border-[#059669]/30"
            >
              <p className="font-medium text-white group-hover:text-[#059669] transition-colors">
                Best AI for Real Estate Lead Generation
              </p>
              <p className="mt-1 text-xs text-white/50">Top-rated AI tools for finding and converting leads</p>
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
