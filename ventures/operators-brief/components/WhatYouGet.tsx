export default function WhatYouGet() {
  const deliverables = [
    {
      label: "Weekly Case Study",
      description:
        "One real business, one AI implementation, end-to-end. Company type, problem, solution, and outcome — with enough specificity to adapt it to your operation.",
    },
    {
      label: "ROI Breakdown",
      description:
        "The actual numbers: hours saved, cost reduced, revenue generated. Always includes the implementation cost and a payback period calculation.",
    },
    {
      label: "Exact Tools Used",
      description:
        "Every issue lists the complete tool stack with pricing at the volume shown. No generic recommendations — the specific models, integrations, and configs that were used.",
    },
    {
      label: "Implementation Guide",
      description:
        "A step-by-step replication guide so you can take the case study back to your team on Monday. Assumes you have a technically competent person on staff.",
    },
    {
      label: "What Failed",
      description:
        "Every issue documents what they tried before this worked. The failure modes are often more valuable than the success — they tell you what to skip.",
    },
    {
      label: "Archive Access (Pro)",
      description:
        "All 12+ back issues with full search. When you're evaluating an AI project, find every case study in the archive relevant to your industry or function.",
    },
  ];

  return (
    <section className="py-24 px-6 border-b border-[#1e1e1e]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">
            What&apos;s Inside
          </span>
          <h2 className="text-[36px] md:text-[44px] font-light text-[#f0ede8] mt-4">
            Every issue is structured
            <br />
            the same way. On purpose.
          </h2>
          <p className="text-[16px] text-[#9a9590] mt-4 max-w-xl leading-relaxed">
            Operators don&apos;t have time for long-form essays they can&apos;t act on. Every issue
            has the same anatomy so you can extract value in 15 minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((item, i) => (
            <div key={item.label} className="relative">
              <div className="border border-[#1e1e1e] p-6 h-full bg-[#0d0d0d] hover:border-[#2a2a2a] transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-mono text-[11px] text-[#c9a84c] mt-1">0{i + 1}</span>
                  <h3 className="text-[15px] font-medium text-[#f0ede8]">{item.label}</h3>
                </div>
                <p className="text-[13px] text-[#5a5550] leading-relaxed pl-[28px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reading time note */}
        <div className="mt-10 flex items-center gap-6">
          <div className="w-px h-8 bg-[#1e1e1e]" />
          <p className="text-[13px] text-[#5a5550]">
            Average reading time: <span className="text-[#9a9590]">18 minutes.</span> Average
            implementation time for the case study:{" "}
            <span className="text-[#9a9590]">2–5 days with a technical resource.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
