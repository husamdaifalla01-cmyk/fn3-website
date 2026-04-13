import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The 10 Best Operators Brief Issues of All Time | Operators Brief",
  description:
    "The 10 highest-rated, most-shared issues — law firms saving $140K, restaurants cutting labor 18%, CPA firms tripling revenue. Issues 1–3 free.",
  keywords: [
    "best AI workflow case studies",
    "top AI business automation",
    "AI ROI examples",
    "best AI for small business",
    "operators brief best issues",
  ],
  alternates: {
    canonical: "https://operators-brief.vercel.app/best-of",
  },
  openGraph: {
    title: "The 10 Best Operators Brief Issues of All Time",
    description:
      "Curated: the 10 highest-rated issues across law, accounting, restaurants, real estate, and more. Issues 1–3 free to read.",
    type: "website",
    url: "https://operators-brief.vercel.app/best-of",
  },
  twitter: {
    card: "summary_large_image",
    title: "The 10 Best Operators Brief Issues of All Time",
    description:
      "Real businesses, real ROI numbers. The most-shared AI workflow deep-dives — curated.",
  },
};

const issues = [
  {
    rank: 1,
    number: "01",
    title: "How One CPA Firm 3x'd Revenue Per Partner Without Hiring",
    industry: "Accounting",
    keyMetric: "Tripled revenue per partner — same headcount",
    readTime: "8 min",
    free: true,
    href: "/issues/sample",
  },
  {
    rank: 2,
    number: "11",
    title: "How a Property Manager Used AI Lease Analysis to Avoid $140K in Bad Tenant Placements",
    industry: "Real Estate",
    keyMetric: "Avoided $140K in bad tenant placements",
    readTime: "9 min",
    free: true,
    href: "/issues/real-estate-lead-qualification-ai",
  },
  {
    rank: 3,
    number: "04",
    title: "How a Law Firm Cut Contract Review From 2.5 Hours to 22 Minutes",
    industry: "Legal",
    keyMetric: "1,840 billable hours recaptured per year",
    readTime: "10 min",
    free: true,
    href: "/issues/how-accountants-cut-reporting-time",
  },
  {
    rank: 4,
    number: "02",
    title: "How a 7-Figure DTC Brand Replaced 11 Support Staff With 3 AI Agents — CSAT Held at 4.7",
    industry: "E-commerce",
    keyMetric: "Replaced 11 staff, CSAT held at 4.7/5",
    readTime: "11 min",
    free: false,
    href: null,
  },
  {
    rank: 5,
    number: "08",
    title: "The Solo CPA Who Went From 28 to 84 Bookkeeping Clients — Same Hours, 3× the Revenue",
    industry: "Accounting",
    keyMetric: "3x revenue in 10 days of implementation",
    readTime: "8 min",
    free: false,
    href: null,
  },
  {
    rank: 6,
    number: "05",
    title: "The Med Spa That Automated Patient Follow-Up and Recovered $18K/Month in Lapsed Bookings",
    industry: "Healthcare / Aesthetics",
    keyMetric: "Recovered $18K/month in lapsed bookings",
    readTime: "7 min",
    free: false,
    href: null,
  },
  {
    rank: 7,
    number: "03",
    title: "The Solo Consultant Who 4x'd Client Capacity to $136K/Month — Without a Single Hire",
    industry: "Consulting",
    keyMetric: "$136K/month revenue, no new hires",
    readTime: "9 min",
    free: false,
    href: null,
  },
  {
    rank: 8,
    number: "10",
    title: "The SaaS Startup That Automated Onboarding and Reduced Churn From 8.4% to 3.1%",
    industry: "SaaS",
    keyMetric: "Churn cut from 8.4% to 3.1%",
    readTime: "10 min",
    free: false,
    href: null,
  },
  {
    rank: 9,
    number: "06",
    title: "How a 3-Person Agency Scaled to 22 Clients by Automating 80% of Campaign Reporting",
    industry: "Marketing Agency",
    keyMetric: "7x client capacity with same team",
    readTime: "8 min",
    free: false,
    href: null,
  },
  {
    rank: 10,
    number: "12",
    title: "The Insurance Broker Who Automated Policy Comparison and Added $28K/Month in Commissions",
    industry: "Insurance",
    keyMetric: "Added $28K/month in new commissions",
    readTime: "9 min",
    free: false,
    href: null,
  },
];

export default function BestOfPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Nav */}
      <div className="border-b border-[#1e1e1e] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] hover:text-[#d4b660] transition-colors"
          >
            ← Operators Brief
          </Link>
          <a
            href="/#signup"
            className="font-mono text-[11px] tracking-widest uppercase bg-[#c9a84c] text-[#0a0a0a] px-4 py-2 hover:bg-[#d4b660] transition-colors"
          >
            Read Them All — $15/mo
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-4">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">
            Best Of
          </span>
        </div>
        <h1 className="text-[32px] md:text-[44px] font-light text-[#f0ede8] leading-[1.1] tracking-tight mb-5">
          The 10 Best Operators Brief Issues of All Time
        </h1>
        <p className="text-[16px] text-[#9a9590] leading-relaxed mb-4 max-w-xl">
          Curated by reader rating and share count. Issues 1–3 are free to read now. Issues 4–10 are unlocked with Pro.
        </p>
        <p className="text-[13px] text-[#5a5550] font-mono mb-10">
          Last updated March 2026 · 51+ issues published
        </p>

        {/* Top CTA */}
        <div className="border border-[#c9a84c] bg-[#0d0d0d] p-5 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[14px] text-[#9a9590]">
            <span className="text-[#f0ede8] font-medium">Read all 10 now</span> — plus 51 more issues, new one every Tuesday.
          </p>
          <a
            href="/#signup"
            className="flex-shrink-0 bg-[#c9a84c] text-[#0a0a0a] text-[13px] font-medium py-2.5 px-6 hover:bg-[#d4b660] transition-colors whitespace-nowrap"
          >
            $15/month — Start Now →
          </a>
        </div>

        {/* Issue list */}
        <div className="space-y-4">
          {issues.map((issue) => (
            <div
              key={issue.rank}
              className={`border transition-colors ${
                issue.free
                  ? "border-[#c9a84c] bg-[#0d0d0d]"
                  : "border-[#1e1e1e] bg-[#0a0a0a]"
              }`}
            >
              <div className="flex items-stretch gap-0">
                {/* Rank */}
                <div className="flex-shrink-0 w-14 border-r border-[#1e1e1e] flex items-center justify-center">
                  <span
                    className={`font-mono text-[22px] font-light ${
                      issue.rank <= 3 ? "text-[#c9a84c]" : "text-[#2a2a2a]"
                    }`}
                  >
                    {issue.rank}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`font-mono text-[10px] uppercase tracking-wider ${
                        issue.free ? "text-[#c9a84c]" : "text-[#3a3530]"
                      }`}
                    >
                      {issue.industry}
                    </span>
                    <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
                    <span className="font-mono text-[10px] text-[#3a3530] uppercase tracking-wider">
                      {issue.readTime} read
                    </span>
                    {issue.free && (
                      <>
                        <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#c9a84c]">
                          Free
                        </span>
                      </>
                    )}
                  </div>
                  <h2
                    className={`text-[15px] leading-snug mb-3 ${
                      issue.free ? "text-[#f0ede8]" : "text-[#5a5550]"
                    }`}
                  >
                    {issue.title}
                  </h2>
                  {/* Key metric */}
                  <div
                    className={`inline-flex items-center gap-2 border px-3 py-1.5 ${
                      issue.free
                        ? "border-[#2a2a22] bg-[#111108]"
                        : "border-[#1a1a1a] bg-[#0a0a0a]"
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] ${
                        issue.free ? "text-[#c9a84c]" : "text-[#2a2a2a]"
                      }`}
                    >
                      ↑
                    </span>
                    <span
                      className={`font-mono text-[11px] ${
                        issue.free ? "text-[#9a9590]" : "text-[#2a2a2a]"
                      }`}
                    >
                      {issue.free ? issue.keyMetric : "Unlock to see the result"}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex-shrink-0 p-5 flex items-center">
                  {issue.free && issue.href ? (
                    <Link
                      href={issue.href}
                      className="font-mono text-[11px] uppercase tracking-wider text-[#c9a84c] hover:text-[#d4b660] transition-colors whitespace-nowrap"
                    >
                      Read Now →
                    </Link>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-[#2a2a2a]">
                      <svg
                        width="12"
                        height="14"
                        viewBox="0 0 12 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="1"
                          y="6"
                          width="10"
                          height="7"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        />
                        <path
                          d="M3.5 6V4a2.5 2.5 0 0 1 5 0v2"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        />
                      </svg>
                      <span className="font-mono text-[10px] uppercase tracking-wider">Pro</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 border border-[#c9a84c] bg-[#0d0d0d] p-8 text-center">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-4">
            Unlock Issues 4–10
          </div>
          <h3 className="text-[24px] font-light text-[#f0ede8] mb-3">
            Read them all — $15/month
          </h3>
          <p className="text-[14px] text-[#9a9590] mb-6 max-w-md mx-auto leading-relaxed">
            Full access to all 51+ back issues, new issue every Tuesday, copy-paste prompts and ROI spreadsheets. Cancel any time.
          </p>
          <a
            href="/#signup"
            className="inline-block bg-[#c9a84c] text-[#0a0a0a] text-[14px] font-medium py-3 px-10 hover:bg-[#d4b660] transition-colors"
          >
            $15/month — Unlock All 10 →
          </a>
          <p className="text-[12px] text-[#5a5550] mt-4">
            No credit card until checkout. Cancel any time, one click.
          </p>
        </div>

        {/* Internal links */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/issues"
            className="flex-1 border border-[#1e1e1e] p-4 text-center text-[13px] text-[#9a9590] hover:border-[#2a2a2a] hover:text-[#f0ede8] transition-colors"
          >
            Browse all 51+ issues →
          </Link>
          <Link
            href="/what-you-get"
            className="flex-1 border border-[#1e1e1e] p-4 text-center text-[13px] text-[#9a9590] hover:border-[#2a2a2a] hover:text-[#f0ede8] transition-colors"
          >
            What's included in Pro →
          </Link>
        </div>
      </div>
    </main>
  );
}
