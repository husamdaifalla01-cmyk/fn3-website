import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nabla vs. Suki 2026: Which Clinical AI Assistant Wins?",
  description:
    "Nabla vs. Suki compared: pricing, EHR integrations, ambient documentation quality, specialty coverage, setup time, HIPAA compliance, and mobile app quality. Which clinical AI saves physicians more time in 2026.",
  openGraph: {
    title: "Nabla vs. Suki 2026: Which Clinical AI Assistant Wins?",
    description:
      "Complete side-by-side comparison of Nabla and Suki for clinical AI documentation — pricing, EHR integrations, ambient documentation, specialty coverage, setup time, HIPAA compliance, and mobile app quality.",
    type: "article",
  },
};

const comparisonRows = [
  {
    feature: "Pricing",
    nabla: "From $99/mo per provider (individual); enterprise pricing for health systems",
    suki: "From $149/mo per provider; discounts for large group practices and health systems",
    winner: "nabla",
    note: "Nabla is modestly cheaper at the individual provider level. For large health systems, both offer volume pricing that brings the per-provider cost down significantly — request quotes before assuming either is out of budget.",
  },
  {
    feature: "EHR Integrations",
    nabla: "Epic, Cerner, Athenahealth, eClinicalWorks, Modernizing Medicine; broad integration library",
    suki: "Epic, Cerner, Meditech, Greenway, and 40+ others; deep Epic integration with in-workflow embedding",
    winner: "suki",
    note: "Suki&apos;s Epic integration is particularly deep — it embeds directly into the Epic workflow rather than requiring a separate window. For Epic-heavy health systems, this reduces context-switching friction considerably.",
  },
  {
    feature: "Ambient Documentation Quality",
    nabla: "Generates SOAP notes, HPI, assessment/plan; strong on primary care and multi-speaker conversations",
    suki: "Ambient note generation with voice command editing; strong on structured data capture",
    winner: "tie",
    note: "Both tools produce clinically accurate ambient documentation. Nabla has a slight edge on multi-speaker conversation handling (important in team-based care settings). Suki&apos;s voice command editing is more natural for physicians who prefer to correct as they go.",
  },
  {
    feature: "Specialty Coverage",
    nabla: "Strong across primary care, internal medicine, psychiatry, and behavioral health",
    suki: "Broad specialty coverage including surgery, orthopedics, cardiology, and primary care",
    winner: "suki",
    note: "Suki has invested more in surgical and procedural specialty templates. For non-primary care specialties, Suki&apos;s pre-built note structures are more likely to match your documentation style out of the box.",
  },
  {
    feature: "Setup Time",
    nabla: "Typical live in 1–2 weeks; IT involvement minimal for non-Epic configurations",
    suki: "2–4 weeks for full deployment; Epic configurations may require IT coordination",
    winner: "nabla",
    note: "Nabla&apos;s lighter-weight integration approach means faster time-to-value, particularly for smaller practices. The trade-off is less deep EHR embedding.",
  },
  {
    feature: "HIPAA Compliance",
    nabla: "HIPAA BAA available; SOC 2 Type II certified; data processed and stored in US",
    suki: "HIPAA BAA available; SOC 2 Type II certified; ONC Health IT certified",
    winner: "tie",
    note: "Both tools meet the bar for clinical deployment. Suki&apos;s ONC Health IT certification is an additional credential that may matter for certain health system procurement processes.",
  },
  {
    feature: "Mobile App Quality",
    nabla: "iOS and Android apps with ambient recording; UI highly rated by physicians for simplicity",
    suki: "iOS and Android; voice-first design; consistently top-rated in App Store reviews",
    winner: "suki",
    note: "Suki&apos;s mobile app has consistently better App Store ratings and is often cited by physicians as feeling more like a consumer product. For providers who use the mobile app as their primary interface, Suki&apos;s UX is materially better.",
  },
  {
    feature: "Multilingual Support",
    nabla: "Supports 45+ languages; strong on non-English patient conversations",
    suki: "English-primary; limited multilingual support",
    winner: "nabla",
    note: "For practices serving non-English-speaking populations, Nabla&apos;s multilingual capability is a significant differentiator. Suki&apos;s multilingual support is limited.",
  },
  {
    feature: "Customization / Training",
    nabla: "Learning mode that adapts to physician documentation style over time",
    suki: "Physician-specific preferences and custom vocabulary training",
    winner: "tie",
    note: "Both tools personalize over time. Suki tends to adapt faster in early use; Nabla&apos;s learning compounds more over longer periods.",
  },
  {
    feature: "Mental Health / Behavioral Health",
    nabla: "Specific templates for psychiatry, therapy notes, and behavioral health documentation",
    suki: "General psychiatry support; less specialized for behavioral health workflows",
    winner: "nabla",
    note: "If your practice includes significant behavioral health or psychiatry volume, Nabla&apos;s purpose-built templates for that specialty are a meaningful advantage.",
  },
];

export default function NablaVsSukiPage() {
  const nablaWins = comparisonRows.filter((r) => r.winner === "nabla").length;
  const sukiWins = comparisonRows.filter((r) => r.winner === "suki").length;
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
          <span className="text-white/60">Nabla vs. Suki</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 inline-block rounded-full bg-[#0891b2]/10 px-3 py-1 text-xs font-medium text-[#0891b2]">
            Clinical AI Documentation
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Nabla vs. Suki (2026): Which Clinical AI Saves Physicians More Time?
          </h1>
          <p className="mt-4 text-lg text-white/60">
            Both Nabla and Suki use ambient AI to cut documentation time by 2+ hours per physician per day. Both are HIPAA-compliant and EHR-integrated. The differences are in the details: specialty coverage, mobile app quality, multilingual support, and EHR embedding depth. Here&apos;s the complete breakdown.
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
          <div className="rounded-xl border border-[#0891b2]/20 bg-[#0891b2]/5 p-5 text-center">
            <p className="text-3xl font-bold text-[#0891b2]">{nablaWins}</p>
            <p className="mt-1 text-sm font-medium text-white">Nabla wins</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#111] p-5 text-center">
            <p className="text-3xl font-bold text-white/40">{ties}</p>
            <p className="mt-1 text-sm font-medium text-white/60">Ties</p>
          </div>
          <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5 text-center">
            <p className="text-3xl font-bold text-violet-400">{sukiWins}</p>
            <p className="mt-1 text-sm font-medium text-white">Suki wins</p>
          </div>
        </div>

        {/* Quick Verdict */}
        <div className="mb-10 rounded-2xl border border-[#0891b2]/20 bg-[#111] p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#0891b2]">Quick Verdict</p>
          <p className="leading-relaxed text-white/80">
            <span className="font-semibold text-white">Nabla is the better choice for multilingual practices, behavioral health, and faster deployment.</span> <span className="font-semibold text-white">Suki wins on mobile app quality, surgical specialty coverage, and deep Epic integration.</span> For most primary care and internal medicine practices, either tool delivers comparable documentation time savings — the decision comes down to your EHR, specialty mix, and patient population.
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
                  <th className="px-4 py-3 text-left font-semibold text-[#0891b2]">Nabla</th>
                  <th className="px-4 py-3 text-left font-semibold text-violet-400">Suki</th>
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
                    <td className="px-4 py-4 text-white/60">{row.nabla}</td>
                    <td className="px-4 py-4 text-white/60">{row.suki}</td>
                    <td className="px-4 py-4">
                      {row.winner === "nabla" && (
                        <span className="rounded-full bg-[#0891b2]/10 px-2 py-0.5 text-xs font-medium text-[#0891b2]">
                          Nabla
                        </span>
                      )}
                      {row.winner === "suki" && (
                        <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-xs font-medium text-violet-400">
                          Suki
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
            <div className="rounded-2xl border border-[#0891b2]/20 bg-[#0891b2]/5 p-6">
              <h3 className="mb-3 text-lg font-bold text-white">Choose Nabla if...</h3>
              <ul className="space-y-3">
                {[
                  "You serve a multilingual patient population (45+ languages supported)",
                  "Your practice includes behavioral health or psychiatry",
                  "You want to be live faster without complex IT involvement",
                  "You&apos;re on a non-Epic EHR and want broad integration options",
                  "You prefer a lighter-weight tool that doesn&apos;t require deep EHR embedding",
                  "Budget sensitivity makes the lower per-provider cost meaningful",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0891b2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#111] p-6">
              <h3 className="mb-3 text-lg font-bold text-white">Choose Suki if...</h3>
              <ul className="space-y-3">
                {[
                  "You&apos;re an Epic shop and want the deepest possible in-workflow integration",
                  "Your physicians will use the mobile app as their primary interface",
                  "You have surgical or procedural specialties that need structured templates",
                  "You want voice-command note editing as a first-class feature",
                  "Your health system procurement requires ONC Health IT certification",
                  "You have cardiology, orthopedics, or other surgical specialties to document",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
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
              <span className="font-semibold text-white">For most primary care practices and community health centers, Nabla is the stronger value.</span> The multilingual support alone sets it apart for practices serving diverse populations. The faster deployment timeline means physicians are saving time sooner, and the behavioral health templates are notably more developed than Suki&apos;s.
            </p>
            <p className="mb-4">
              <span className="font-semibold text-white">For Epic-heavy health systems and surgical specialties, Suki is likely the better fit.</span> The depth of the Epic integration reduces friction in ways that matter at scale — physicians stay in their EHR workflow rather than switching to a separate app. The mobile app quality is genuinely superior, and for health system CIOs evaluating enterprise tools, Suki&apos;s certifications and integration depth make procurement easier.
            </p>
            <p>
              The good news: both tools offer trials. We recommend piloting both with 3–5 physicians for 30 days before committing to an enterprise contract. The productivity difference will be visible quickly, and physician preference carries a lot of weight in successful AI adoption.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Current Pricing (March 2026)</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#111] p-5">
              <h3 className="mb-3 font-bold text-white">Nabla Pricing</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex justify-between">
                  <span>Individual provider</span>
                  <span className="font-medium text-white">From $99/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Group practice</span>
                  <span className="font-medium text-white">Volume pricing</span>
                </li>
                <li className="flex justify-between">
                  <span>Health system</span>
                  <span className="font-medium text-white">Enterprise contract</span>
                </li>
              </ul>
              <a
                href="https://nabla.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 inline-block rounded-lg bg-[#0891b2] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Get Nabla pricing →
              </a>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#111] p-5">
              <h3 className="mb-3 font-bold text-white">Suki Pricing</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex justify-between">
                  <span>Individual provider</span>
                  <span className="font-medium text-white">From $149/mo</span>
                </li>
                <li className="flex justify-between">
                  <span>Group practice</span>
                  <span className="font-medium text-white">Volume pricing</span>
                </li>
                <li className="flex justify-between">
                  <span>Health system</span>
                  <span className="font-medium text-white">Enterprise contract</span>
                </li>
              </ul>
              <a
                href="https://suki.ai"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 inline-block rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/40"
              >
                Get Suki pricing →
              </a>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mb-10 border-t border-white/10 pt-10">
          <h2 className="mb-4 text-xl font-bold text-white">Related Guides</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/compare/nuance-dax-vs-abridge"
              className="group rounded-xl border border-white/10 bg-[#111] p-4 transition-all hover:border-[#0891b2]/30"
            >
              <p className="font-medium text-white transition-colors group-hover:text-[#0891b2]">
                Nuance DAX vs. Abridge
              </p>
              <p className="mt-1 text-xs text-white/50">More ambient documentation tools compared</p>
            </Link>
            <Link
              href="/compare/lightbeam-vs-veradigm"
              className="group rounded-xl border border-white/10 bg-[#111] p-4 transition-all hover:border-[#0891b2]/30"
            >
              <p className="font-medium text-white transition-colors group-hover:text-[#0891b2]">
                Lightbeam vs. Veradigm
              </p>
              <p className="mt-1 text-xs text-white/50">Population health AI platforms compared</p>
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
