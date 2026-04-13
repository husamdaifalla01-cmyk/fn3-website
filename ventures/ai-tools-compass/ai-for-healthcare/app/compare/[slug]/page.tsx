import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ComparisonTable from "@/components/ComparisonTable";
import { getComparisonBySlug, getAllSlugs, healthcareComparisons } from "@/data/comparisons";
import { getToolById } from "@/data/tools";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const comparison = getComparisonBySlug(params.slug);
  if (!comparison) return {};

  return {
    title: comparison.title,
    description: comparison.metaDescription,
    openGraph: {
      title: comparison.title,
      description: comparison.metaDescription,
      type: "article",
      publishedTime: comparison.lastUpdated,
    },
  };
}

export default function ComparisonPage({ params }: Props) {
  const comparison = getComparisonBySlug(params.slug);
  if (!comparison) notFound();

  const tools = comparison.toolIds
    .map((id) => getToolById(id))
    .filter(Boolean) as ReturnType<typeof getToolById>[];

  const winner = getToolById(comparison.winnerToolId);
  const runnerUp = getToolById(comparison.runnerUpToolId);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comparison.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const relatedComparisons = healthcareComparisons
    .filter((c) => c.slug !== comparison.slug && c.category === comparison.category)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="border-b border-white/10 bg-gradient-to-b from-[#111] to-[#0a0a0a] py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="capitalize">{comparison.category.replace(/-/g, " ")}</span>
            <span>/</span>
            <span className="text-white/70">{comparison.title}</span>
          </div>

          <div className="mb-3 inline-block rounded-full bg-[#0891b2]/10 px-3 py-1 text-xs font-medium text-[#0891b2]">
            Last updated: {comparison.lastUpdated}
          </div>

          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {comparison.h1}
          </h1>

          <p className="mt-4 text-lg text-white/70">{comparison.summary}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Quick Recommendation Box */}
        {winner && (
          <div className="mb-10 rounded-2xl border border-[#0891b2]/30 bg-[#0891b2]/5 p-6">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#0891b2]">
              Our Recommendation
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-green-500/20 bg-[#111] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">Winner</span>
                  <span className="font-semibold text-white">{winner.name}</span>
                </div>
                <p className="text-sm text-white/70">{comparison.winnerReason}</p>
                <a
                  href={winner.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="mt-3 inline-block rounded-lg bg-[#0891b2] px-4 py-2 text-sm font-medium text-white"
                >
                  Learn More →
                </a>
              </div>
              {runnerUp && (
                <div className="rounded-xl border border-white/10 bg-[#111] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white/60">Runner-Up</span>
                    <span className="font-semibold text-white">{runnerUp.name}</span>
                  </div>
                  <p className="text-sm text-white/70">{comparison.runnerUpReason}</p>
                  <a
                    href={runnerUp.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="mt-3 inline-block rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80"
                  >
                    Learn More →
                  </a>
                </div>
              )}
            </div>
            <div className="mt-4 rounded-lg bg-amber-500/10 p-3">
              <p className="text-sm text-amber-400">
                <span className="font-semibold">Not for you if:</span>{" "}
                {comparison.notForProfile}
              </p>
            </div>
          </div>
        )}

        {/* Intro */}
        <div className="mb-10">
          <p className="text-lg text-white/80 leading-relaxed">{comparison.introContent}</p>
        </div>

        {/* Comparison Table */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Side-by-Side Comparison</h2>
          {tools.length > 0 && (
            <ComparisonTable tools={tools as any} accentColor="#0891b2" />
          )}
        </div>

        {/* Individual Tool Reviews */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-white">Individual Tool Reviews</h2>
          <div className="space-y-8">
            {tools.map((tool) => {
              if (!tool) return null;
              return (
                <div key={tool.id} className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0891b2]/20 text-base font-bold text-[#0891b2]">
                        {tool.logoPlaceholder}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                          {tool.badge && (
                            <span className="rounded-full bg-[#0891b2]/20 px-2 py-0.5 text-xs font-medium text-[#0891b2]">
                              {tool.badge}
                            </span>
                          )}
                          {tool.hipaaCompliant && (
                            <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
                              HIPAA
                            </span>
                          )}
                        </div>
                        <p className="text-white/60">{tool.tagline}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">
                        {tool.pricing.startingPrice}
                        {tool.pricing.startingPrice !== "Custom" && (
                          <span className="text-sm font-normal text-white/50">{tool.pricing.priceUnit}</span>
                        )}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-yellow-400">
                        {"★".repeat(Math.round(tool.rating))}
                        <span className="ml-1 text-white/60">{tool.rating}/5</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-white/80 leading-relaxed">{tool.longDescription}</p>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-sm font-semibold text-green-400">Pros</p>
                      <ul className="space-y-1.5">
                        {tool.pros.map((pro) => (
                          <li key={pro} className="flex items-start gap-2 text-sm text-white/70">
                            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-semibold text-red-400">Cons</p>
                      <ul className="space-y-1.5">
                        {tool.cons.map((con) => (
                          <li key={con} className="flex items-start gap-2 text-sm text-white/70">
                            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 rounded-lg bg-[#0a0a0a] p-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-medium text-white/40">Best for</p>
                      <p className="mt-0.5 text-sm text-white/80">{tool.bestFor}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/40">Not for</p>
                      <p className="mt-0.5 text-sm text-white/80">{tool.notFor}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow"
                      className="rounded-lg bg-[#0891b2] px-5 py-2.5 text-sm font-medium text-white">
                      Learn More →
                    </a>
                    <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer"
                      className="rounded-lg border border-white/15 px-5 py-2.5 text-sm text-white/70">
                      Website
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Buying Guide */}
        {comparison.buyingGuide && comparison.buyingGuide.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-white">How to Choose the Right Tool</h2>
            <div className="space-y-4">
              {comparison.buyingGuide.map((tip, i) => {
                const [boldPart, rest] = tip.split(": ");
                return (
                  <div key={i} className="flex gap-4 rounded-xl border border-white/10 bg-[#111] p-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0891b2]/20 text-sm font-bold text-[#0891b2]">
                      {i + 1}
                    </div>
                    <div>
                      <span className="font-semibold text-white">{boldPart}:</span>{" "}
                      <span className="text-white/70">{rest}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {comparison.faqs.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-white/10 bg-[#111]">
                <summary className="flex cursor-pointer items-center justify-between p-5 text-left font-medium text-white hover:text-[#0891b2]">
                  {faq.question}
                  <svg className="h-5 w-5 flex-shrink-0 text-white/40 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-relaxed text-white/70">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Related Comparisons */}
        {relatedComparisons.length > 0 && (
          <div className="border-t border-white/10 pt-10">
            <h2 className="mb-6 text-xl font-bold text-white">Related Comparisons</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {relatedComparisons.map((c) => (
                <Link key={c.slug} href={`/compare/${c.slug}`}
                  className="rounded-xl border border-white/10 bg-[#111] p-4 transition-all hover:border-[#0891b2]/30">
                  <p className="font-medium text-white hover:text-[#0891b2]">{c.title}</p>
                  <p className="mt-1 text-xs text-white/50">{c.toolIds.length} tools compared</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Disclosure */}
        <div className="mt-10 rounded-xl border border-white/10 bg-[#111] p-4 text-xs text-white/40">
          <span className="font-semibold text-white/60">Affiliate Disclosure:</span>{" "}
          Links on this page may be affiliate links. We earn a commission if you sign up through these links.
          This doesn&apos;t affect our editorial rankings — we test tools independently.
        </div>
      </div>
    </>
  );
}
