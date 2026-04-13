import Link from "next/link";
import SignupFormInline from "./SignupFormInline";

export default function Hero() {
  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Issue badge */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">
            The weekly brief for operators
          </span>
          <span className="w-8 h-px bg-[#1e1e1e]" />
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">
            2,847 subscribers
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[42px] md:text-[64px] font-light leading-[1.05] tracking-tight text-[#f0ede8] mb-6">
          Real AI workflows.
          <br />
          Real numbers.
          <br />
          <span className="text-[#c9a84c]">No theory.</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-[18px] md:text-[20px] text-[#9a9590] font-light leading-relaxed max-w-2xl mb-4">
          Every Tuesday: one deep-dive case study — what a real business built, what it cost, what broke, and the exact ROI.
        </p>

        {/* Recent headlines */}
        <div className="mb-10 space-y-2 max-w-2xl">
          <p className="text-[13px] font-mono text-[#5a5550] uppercase tracking-wider mb-3">Recent issues:</p>
          {[
            "How a law firm cut contract review from 2.5 hrs to 22 min — 1,840 billable hours recaptured",
            "The DTC brand that replaced 11 support staff with 3 AI agents: $22K/month saved, CSAT held at 4.7",
            "A solo CPA went from 28 to 84 clients at the same price — $33,600/month, same hours worked",
          ].map((headline) => (
            <div key={headline} className="flex items-start gap-3">
              <span className="mt-1.5 w-1 h-1 bg-[#c9a84c] flex-shrink-0 rounded-full" />
              <span className="text-[14px] text-[#9a9590] leading-snug">{headline}</span>
            </div>
          ))}
        </div>

        {/* Latest issue card */}
        <div className="mb-10 border border-[#1e1e1e] bg-[#0d0d0d] hover:border-[#2a2a2a] transition-colors">
          <div className="border-b border-[#1e1e1e] px-5 py-2.5 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#c9a84c]">Latest Issue — #12</span>
            <span className="font-mono text-[10px] text-[#5a5550]">Published Mar 18, 2026</span>
          </div>
          <div className="px-5 py-4">
            <h3 className="text-[15px] font-medium text-[#f0ede8] mb-2 leading-snug">
              The Insurance Broker Who Automated Policy Comparison and Added $28K/Month in Commissions
            </h3>
            <p className="text-[13px] text-[#5a5550] leading-relaxed mb-4">
              A two-person brokerage built a Claude-powered comparison tool that cut quote research from 3 hours to 18 minutes per client. With the same work hours, they moved from 9 to 31 quotes per week — and closed $28K more in monthly commissions.
            </p>
            <Link
              href="/issues/sample"
              className="font-mono text-[12px] text-[#c9a84c] hover:text-[#d4b660] transition-colors uppercase tracking-wider"
            >
              Read a free sample →
            </Link>
          </div>
        </div>

        {/* Signup form */}
        <SignupFormInline variant="hero" />

        {/* Trust line */}
        <p className="mt-4 text-[13px] text-[#5a5550]">
          Less than one billable hour per month. Start free — no credit card required.
        </p>

        {/* Scroll indicator */}
        <div className="mt-20 flex items-center gap-4">
          <span className="w-px h-12 bg-[#1e1e1e]" />
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">
            Read a sample issue below
          </span>
        </div>
      </div>
    </section>
  );
}
