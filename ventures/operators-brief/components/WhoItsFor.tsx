export default function WhoItsFor() {
  const forItems = [
    {
      role: "COOs & Operations Directors",
      description:
        "You're responsible for the systems. You need to know which AI implementations actually hold up at scale and which ones collapse under real operational load.",
    },
    {
      role: "Founders & Business Owners",
      description:
        "You're making the build vs. buy calls. You need ROI data from businesses like yours — not theoretical models from consultants who've never run P&L.",
    },
    {
      role: "Heads of Finance & Accounting",
      description:
        "You're being asked to approve AI spend. You need to understand what a realistic cost-per-outcome looks like and how to structure the pilot budget.",
    },
    {
      role: "Department Heads Being Disrupted",
      description:
        "Your CEO just came back from a conference. You have 90 days to show you're ahead of this. You need real implementation blueprints, not blog posts.",
    },
    {
      role: "Consultants & Fractional Executives",
      description:
        "You advise businesses on operations. The Operators Brief keeps your recommendations grounded in what's actually working across industries right now.",
    },
    {
      role: "Technical Operators Building AI Systems",
      description:
        "You're the person who actually builds the thing after everyone else approves it. You need case studies with tool configs, API costs, and failure modes documented.",
    },
  ];

  const notForItems = [
    "People looking for prompts and hacks",
    "Early-stage startups with no operations yet",
    "Anyone who wants inspiration without implementation",
    "Followers of the 'AI will do everything' crowd",
  ];

  return (
    <section className="py-24 px-6 border-b border-[#1e1e1e]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">
            Readership
          </span>
          <h2 className="text-[36px] md:text-[44px] font-light text-[#f0ede8] mt-4 leading-tight">
            Built for operators,
            <br />
            not observers.
          </h2>
          <p className="text-[16px] text-[#9a9590] mt-4 max-w-xl leading-relaxed">
            The Operators Brief is written for people who are accountable for outcomes — not people
            who write about outcomes.
          </p>
        </div>

        {/* Who it's for grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1e1e1e]">
          {forItems.map((item) => (
            <div key={item.role} className="bg-[#0a0a0a] p-8">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-1.5 w-1.5 h-1.5 bg-[#c9a84c] flex-shrink-0" />
                <h3 className="text-[15px] font-medium text-[#f0ede8]">{item.role}</h3>
              </div>
              <p className="text-[13px] text-[#5a5550] leading-relaxed pl-[18px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Not for */}
        <div className="mt-12 border border-[#1e1e1e] p-8">
          <h3 className="text-[13px] font-mono uppercase tracking-widest text-[#5a5550] mb-5">
            This is not for you if:
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {notForItems.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="text-[#2a2a2a] text-lg">×</span>
                <span className="text-[14px] text-[#5a5550]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
