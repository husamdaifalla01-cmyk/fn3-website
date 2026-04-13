import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Issue Archive — AI Workflow Case Studies With Real ROI | Operators Brief",
  description:
    "12 deep-dive AI workflow case studies across accounting, real estate, e-commerce, legal, and more. Real tools, real numbers. Issue #1 free — no card required.",
  keywords: [
    "AI workflow case studies",
    "AI ROI examples",
    "business automation examples",
    "AI implementation case studies",
    "AI for small business",
    "Claude API workflow examples",
  ],
  alternates: {
    canonical: "https://operators-brief.vercel.app/issues",
  },
  openGraph: {
    title: "Issue Archive — AI Workflow Case Studies | Operators Brief",
    description:
      "12 deep-dives into real AI implementations across industries. Exact tools, real ROI numbers, copy-paste prompts. Issue #1 free.",
    type: "website",
    url: "https://operators-brief.vercel.app/issues",
  },
};

const issues = [
  {
    number: "01",
    title: "How One CPA Firm 3x'd Revenue Per Partner Without Hiring",
    industry: "Accounting",
    timeToImplement: "11 days",
    free: true,
  },
  {
    number: "02",
    title: "How a 7-Figure DTC Brand Replaced 11 Support Staff With 3 AI Agents — CSAT Held at 4.7",
    industry: "E-commerce",
    timeToImplement: "3 weeks",
    free: false,
  },
  {
    number: "03",
    title: "The Solo Consultant Who 4x'd Client Capacity to $136K/Month — Without a Single Hire",
    industry: "Consulting",
    timeToImplement: "2 weeks",
    free: false,
  },
  {
    number: "04",
    title: "How a Law Firm Cut Contract Review From 2.5 Hours to 22 Minutes — 1,840 Billable Hours Recaptured",
    industry: "Legal",
    timeToImplement: "6 weeks",
    free: false,
  },
  {
    number: "05",
    title: "The Med Spa That Automated Patient Follow-Up and Recovered $18K/Month in Lapsed Bookings",
    industry: "Healthcare / Aesthetics",
    timeToImplement: "1 week",
    free: false,
  },
  {
    number: "06",
    title: "How a 3-Person Agency Scaled to 22 Clients by Automating 80% of Campaign Reporting",
    industry: "Marketing Agency",
    timeToImplement: "2 weeks",
    free: false,
  },
  {
    number: "07",
    title: "The Logistics Company That Cut Freight Quote Turnaround From 4 Hours to 9 Minutes",
    industry: "Logistics",
    timeToImplement: "3 weeks",
    free: false,
  },
  {
    number: "08",
    title: "The Solo CPA Who Went From 28 to 84 Bookkeeping Clients — Same Hours, 3× the Revenue",
    industry: "Accounting",
    timeToImplement: "10 days",
    free: false,
  },
  {
    number: "09",
    title: "How a Recruiting Firm Cut Candidate Screening Time by 70% and Placed 31% More Per Month",
    industry: "Recruiting",
    timeToImplement: "2 weeks",
    free: false,
  },
  {
    number: "10",
    title: "The SaaS Startup That Automated Onboarding and Reduced Churn From 8.4% to 3.1%",
    industry: "SaaS",
    timeToImplement: "4 weeks",
    free: false,
  },
  {
    number: "11",
    title: "How a Property Manager Used AI Lease Analysis to Avoid $140K in Bad Tenant Placements",
    industry: "Real Estate",
    timeToImplement: "3 weeks",
    free: false,
  },
  {
    number: "12",
    title: "The Insurance Broker Who Automated Policy Comparison and Added $28K/Month in Commissions",
    industry: "Insurance",
    timeToImplement: "2 weeks",
    free: false,
  },
];

export default function IssuesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Nav */}
      <div className="border-b border-[#1e1e1e] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] hover:text-[#d4b660] transition-colors">
            ← Operators Brief
          </Link>
          <a
            href="/#signup"
            className="font-mono text-[11px] tracking-widest uppercase bg-[#c9a84c] text-[#0a0a0a] px-4 py-2 hover:bg-[#d4b660] transition-colors"
          >
            Get All Issues — $15/mo
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-4">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">
            Issue Archive
          </span>
        </div>
        <h1 className="text-[32px] md:text-[44px] font-light text-[#f0ede8] leading-[1.1] tracking-tight mb-5">
          12 issues. 12 working blueprints.
        </h1>
        <p className="text-[16px] text-[#9a9590] leading-relaxed mb-10 max-w-xl">
          Every issue is a full workflow you can implement. Real business, real tools, real numbers. Issue #1 is free — no card required.
        </p>

        {/* Top CTA */}
        <div className="border border-[#c9a84c] bg-[#0d0d0d] p-5 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[14px] text-[#9a9590]">
            <span className="text-[#f0ede8] font-medium">Unlock all 12 issues + weekly new ones</span> — full archive, implementation checklists, copy-paste prompts.
          </p>
          <a
            href="/#signup"
            className="flex-shrink-0 bg-[#c9a84c] text-[#0a0a0a] text-[13px] font-medium py-2.5 px-6 hover:bg-[#d4b660] transition-colors whitespace-nowrap"
          >
            $15/month — Start Now →
          </a>
        </div>

        {/* Issue list */}
        <div className="space-y-3">
          {issues.map((issue) => (
            <div
              key={issue.number}
              className={`border transition-colors ${
                issue.free
                  ? "border-[#c9a84c] bg-[#0d0d0d] hover:border-[#d4b660]"
                  : "border-[#1e1e1e] bg-[#0a0a0a] hover:border-[#2a2a2a]"
              }`}
            >
              <div className="flex items-center gap-0">
                {/* Issue number */}
                <div className="flex-shrink-0 w-16 border-r border-[#1e1e1e] p-5 self-stretch flex items-center justify-center">
                  <span className={`font-mono text-[13px] ${issue.free ? "text-[#c9a84c]" : "text-[#2a2a2a]"}`}>
                    {issue.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 p-5">
                  <h2 className={`text-[14px] leading-snug mb-2 ${issue.free ? "text-[#f0ede8]" : "text-[#5a5550]"}`}>
                    {issue.title}
                  </h2>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-[#3a3530] uppercase tracking-wider">
                      {issue.industry}
                    </span>
                    <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
                    <span className="font-mono text-[10px] text-[#3a3530] uppercase tracking-wider">
                      {issue.timeToImplement} to implement
                    </span>
                  </div>
                </div>

                {/* CTA / lock */}
                <div className="flex-shrink-0 p-5">
                  {issue.free ? (
                    <Link
                      href="/issues/sample"
                      className="font-mono text-[11px] uppercase tracking-wider text-[#c9a84c] hover:text-[#d4b660] transition-colors whitespace-nowrap"
                    >
                      Free — Read Now →
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2 text-[#2a2a2a]">
                      {/* Lock icon */}
                      <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="6" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M3.5 6V4a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.2" />
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
        <div className="mt-12 border border-[#1e1e1e] bg-[#0d0d0d] p-8 text-center">
          <h3 className="text-[22px] font-light text-[#f0ede8] mb-3">
            Unlock all 12 issues + weekly new ones
          </h3>
          <p className="text-[14px] text-[#9a9590] mb-6 max-w-md mx-auto leading-relaxed">
            $15/month. Full archive from day one. New issue every Tuesday. Cancel any time, one click.
          </p>
          <a
            href="/#signup"
            className="inline-block bg-[#c9a84c] text-[#0a0a0a] text-[14px] font-medium py-3 px-10 hover:bg-[#d4b660] transition-colors"
          >
            $15/month — Start Now →
          </a>
          <p className="text-[12px] text-[#5a5550] mt-4">No credit card until checkout. Cancel any time.</p>
        </div>

      </div>
    </main>
  );
}
