import { Metadata } from "next";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import { realEstateTools, getFeaturedTools } from "@/data/tools";
import { realEstateComparisons } from "@/data/comparisons";
import { realEstateCategories } from "@/data/categories";

export const metadata: Metadata = {
  title: "AI Tools for Real Estate Agents 2026: Ranked & Reviewed",
  description:
    "AI tools that actually close deals, not just generate leads. 43 real estate AI tools ranked by practicing agents — CRM, lead gen, listing copy, predictive analytics, and client retention.",
};

const SITE_STATS = {
  toolsReviewed: 43,
  comparisonsPublished: 9,
  lastUpdated: "March 2026",
  professionalsHelped: "18,200+",
};

export default function HomePage() {
  const featuredTools = getFeaturedTools();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-white/10 bg-gradient-to-b from-[#111] to-[#0a0a0a] py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#059669]/30 bg-[#059669]/10 px-4 py-1.5 text-sm text-[#059669]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#059669]" />
              Updated {SITE_STATS.lastUpdated} — {SITE_STATS.toolsReviewed} tools reviewed
            </div>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
              AI tools that actually
              <br />
              <span className="text-[#059669]">close deals, not just generate leads</span>
            </h1>

            <p className="mt-6 text-lg text-white/60 md:text-xl">
              The only AI tools guide written by and for real estate agents and teams.
              We test every tool against real workflows — CRM, lead qualification,
              listing descriptions, predictive prospecting, client retention — and tell
              you exactly what converts.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/compare/best-ai-crm-for-real-estate-agents"
                className="rounded-xl bg-[#059669] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#059669]/25 transition-opacity hover:opacity-90"
              >
                Find Your Best AI Tool
              </Link>
              <Link
                href="#comparisons"
                className="rounded-xl border border-white/20 px-8 py-4 text-base font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                Browse All Comparisons
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{SITE_STATS.toolsReviewed} tools tested</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Updated weekly</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>FTC-compliant affiliate disclosure</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{SITE_STATS.professionalsHelped} agents helped</span>
              </div>
            </div>

            {/* Hero Email Capture */}
            <div className="mt-10 mx-auto max-w-xl">
              <p className="mb-3 text-sm font-medium text-white/70">
                Get our weekly roundup of the best new AI tools for real estate agents
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[#059669] focus:outline-none"
                />
                <button className="rounded-lg bg-[#059669] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 whitespace-nowrap">
                  Subscribe free
                </button>
              </div>
              <p className="mt-2 text-xs text-white/40">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Point Stats Bar */}
      <section className="border-b border-white/10 bg-[#0d0d0d] py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#059669]">5 min</p>
              <p className="mt-1 text-sm text-white/60">window before a lead goes cold — AI responds in 5 seconds</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#059669]">48%</p>
              <p className="mt-1 text-sm text-white/60">of leads never get a follow-up call from an agent</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#059669]">3.3%</p>
              <p className="mt-1 text-sm text-white/60">average spend savings agents find with AI tools</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#059669]">60 sec</p>
              <p className="mt-1 text-sm text-white/60">to write a listing description — vs. 60 minutes manually</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Browse by Category
            </h2>
            <p className="mt-2 text-white/60">
              Find AI tools for your specific real estate workflow
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {realEstateCategories.map((cat) => (
              <div
                key={cat.id}
                className="group rounded-xl border border-white/10 bg-[#111] p-5 transition-all hover:border-[#059669]/30"
              >
                <div className="text-2xl">{cat.icon}</div>
                <h3 className="mt-3 font-semibold text-white">{cat.name}</h3>
                <p className="mt-1 text-sm text-white/60">{cat.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-white/40">{cat.toolCount} tools</span>
                  <span className="text-xs text-[#059669]">{cat.topUseCase}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="border-t border-white/10 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Top Rated AI Tools for Real Estate
              </h2>
              <p className="mt-2 text-white/60">
                Our top picks for 2026 — tested by practicing agents
              </p>
            </div>
            <span className="hidden text-sm text-[#059669] md:block">
              Updated {SITE_STATS.lastUpdated}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* All Comparisons */}
      <section id="comparisons" className="border-t border-white/10 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              All Comparison Guides
            </h2>
            <p className="mt-2 text-white/60">
              In-depth comparisons for every real estate AI use case
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {realEstateComparisons.map((comparison) => (
              <Link
                key={comparison.slug}
                href={`/compare/${comparison.slug}`}
                className="group rounded-xl border border-white/10 bg-[#111] p-5 transition-all hover:border-[#059669]/30"
              >
                <div className="mb-3 inline-block rounded-full bg-[#059669]/10 px-3 py-1 text-xs font-medium text-[#059669]">
                  {comparison.category.replace(/-/g, " ")}
                </div>
                <h3 className="font-semibold text-white group-hover:text-[#059669] transition-colors">
                  {comparison.title}
                </h3>
                <p className="mt-2 text-sm text-white/60 line-clamp-2">
                  {comparison.summary}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-white/40">
                  <span>{comparison.toolIds.length} tools compared</span>
                  <span>Updated {comparison.lastUpdated}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="border-t border-white/10 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-2xl border border-[#059669]/20 bg-[#111] p-8 md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                New AI tools every week — stay ahead
              </h2>
              <p className="mt-3 text-white/60">
                The real estate AI landscape changes fast. Join {SITE_STATS.professionalsHelped} agents who trust us to keep them current.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-lg border border-white/20 bg-[#0a0a0a] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#059669] focus:outline-none"
                />
                <button className="rounded-lg bg-[#059669] px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90">
                  Get Weekly Updates
                </button>
              </div>
              <p className="mt-3 text-xs text-white/40">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* All Tools Grid */}
      <section className="border-t border-white/10 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              All Reviewed Tools
            </h2>
            <p className="mt-2 text-white/60">
              Every tool we&apos;ve tested and written about
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {realEstateTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
