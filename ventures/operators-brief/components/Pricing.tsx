export default function Pricing() {
  const freeFeatures = [
    "1 full issue per month",
    "Access to issue #01 immediately",
    "Plain text email delivery",
    "Unsubscribe any time",
  ];

  const proFeatures = [
    "Every issue, every week",
    "Full archive (all 51+ back issues)",
    "ROI calculator spreadsheet template",
    "Implementation checklists (PDF)",
    "Searchable issue database",
    "Priority Q&A: ask questions about case studies",
    "Cancel any time, no questions asked",
  ];

  const teamsFeatures = [
    "Everything in Pro × 5 seats",
    "Share with your whole ops team",
    "Team discussion threads per issue",
    "1 dedicated onboarding call",
    "Bulk implementation checklists",
    "Ideal for agencies + consulting firms",
    "Cancel any time",
  ];

  return (
    <section id="pricing" className="py-24 px-6 border-b border-[#1e1e1e]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">
            Pricing
          </span>
          <h2 className="text-[36px] md:text-[44px] font-light text-[#f0ede8] mt-4">
            Less than one billable hour.
            <br />
            One workflow saves you three.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Free tier */}
          <div className="border border-[#1e1e1e] p-8">
            <div className="mb-6">
              <div className="font-mono text-[11px] tracking-widest uppercase text-[#5a5550] mb-3">
                Free
              </div>
              <div className="flex items-end gap-2">
                <span className="text-[48px] font-light text-[#f0ede8] leading-none">$0</span>
                <span className="text-[14px] text-[#5a5550] mb-2">/month</span>
              </div>
              <p className="text-[13px] text-[#5a5550] mt-3 leading-relaxed">
                One issue a month to see what this is. No commitment required.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {freeFeatures.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 text-[#2a2a2a] flex-shrink-0"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path d="M2 7L6 11L12 3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <span className="text-[13px] text-[#9a9590]">{f}</span>
                </div>
              ))}
            </div>

            <a
              href="#signup"
              className="block text-center border border-[#1e1e1e] text-[#9a9590] text-[14px] py-3 px-6 hover:border-[#2a2a2a] hover:text-[#f0ede8] transition-colors"
            >
              Subscribe Free
            </a>
          </div>

          {/* Pro tier */}
          <div className="border border-[#c9a84c] p-8 relative">
            {/* Most popular badge */}
            <div className="absolute -top-px left-8 right-8 h-px bg-[#c9a84c]" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-[#c9a84c] text-[#0a0a0a] text-[10px] font-mono font-medium tracking-widest uppercase px-3 py-1">
                Most Popular
              </span>
            </div>

            <div className="mb-6 mt-2">
              <div className="font-mono text-[11px] tracking-widest uppercase text-[#c9a84c] mb-3">
                Pro
              </div>
              <div className="flex items-end gap-2">
                <span className="text-[48px] font-light text-[#f0ede8] leading-none">$15</span>
                <span className="text-[14px] text-[#9a9590] mb-2">/month</span>
              </div>
              <p className="text-[13px] text-[#9a9590] mt-3 leading-relaxed">
                $15/month. No credit card until checkout. Cancel any time — one click, no friction.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {proFeatures.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 text-[#c9a84c] flex-shrink-0"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path d="M2 7L6 11L12 3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <span className="text-[13px] text-[#9a9590]">{f}</span>
                </div>
              ))}
            </div>

            <a
              href="#signup"
              className="block text-center bg-[#c9a84c] text-[#0a0a0a] text-[14px] font-medium py-3 px-6 hover:bg-[#d4b660] transition-colors"
            >
              Start Pro — $15/month
            </a>
          </div>

          {/* Teams tier */}
          <div className="border border-[#1e1e1e] p-8 relative">
            <div className="mb-6">
              <div className="font-mono text-[11px] tracking-widest uppercase text-[#5a5550] mb-3">
                Teams
              </div>
              <div className="flex items-end gap-2">
                <span className="text-[48px] font-light text-[#f0ede8] leading-none">$49</span>
                <span className="text-[14px] text-[#5a5550] mb-2">/month</span>
              </div>
              <p className="text-[13px] text-[#5a5550] mt-3 leading-relaxed">
                Up to 5 seats. Share with your whole ops team — everyone gets full access.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {teamsFeatures.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 text-[#5a5550] flex-shrink-0"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path d="M2 7L6 11L12 3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <span className="text-[13px] text-[#9a9590]">{f}</span>
                </div>
              ))}
            </div>

            <div className="border border-[#1e1e1e] bg-[#0d0d0d] p-3 mb-4">
              <p className="text-[11px] text-[#5a5550] font-mono leading-relaxed">
                Ideal for: agencies running team meetings, consulting firms, COO + ops team.
              </p>
            </div>

            <a
              href="mailto:team@operators-brief.com?subject=Teams%20Plan"
              className="block text-center border border-[#1e1e1e] text-[#9a9590] text-[14px] py-3 px-6 hover:border-[#2a2a2a] hover:text-[#f0ede8] transition-colors"
            >
              Get Teams — $49/month
            </a>
          </div>
        </div>

        {/* ROI callout */}
        <div className="mt-8 border border-[#1e1e1e] p-6 bg-[#0d0d0d]">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <p className="text-[14px] text-[#9a9590] leading-relaxed">
                <strong className="text-[#f0ede8]">The math:</strong> Pro is $180/year. The average
                case study documents $40K–$120K in annual savings. If you implement one thing from
                one issue this year, you&apos;ve made back the subscription at 200x.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="font-mono text-[11px] text-[#5a5550] uppercase tracking-wider">
                Avg. documented ROI
              </div>
              <div className="font-mono text-[32px] text-[#c9a84c] number-stat">222x</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
