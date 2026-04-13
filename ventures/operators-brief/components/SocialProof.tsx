export default function SocialProof() {
  const stats = [
    { value: "2,847", label: "Operators Subscribed" },
    { value: "4.9★", label: "Average Rating" },
    { value: "47", label: "Countries Reading" },
    { value: "12", label: "Issues Published" },
  ];

  const quotes = [
    {
      text: "The only AI newsletter I read every word of. The specificity is insane — actual tool configs, actual cost breakdowns.",
      author: "Director of Operations, Series B SaaS",
      initials: "MR",
    },
    {
      text: "I've implemented 3 of the case studies directly. One of them saved us 18 hours/week in Q4.",
      author: "COO, 60-person logistics company",
      initials: "TK",
    },
    {
      text: "Issue #11 on lease risk analysis paid for two years of this subscription in the first month. We declined 4 applicants we would have approved. That's a lot of avoided pain.",
      author: "Principal, 200-unit property management firm",
      initials: "AW",
    },
  ];

  return (
    <section className="border-y border-[#1e1e1e] bg-[#0d0d0d]">
      {/* Stats bar */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-[#1e1e1e]">
          {stats.map((stat) => (
            <div key={stat.label} className="md:px-8 first:pl-0 last:pr-0">
              <div className="font-mono text-[28px] font-medium text-[#f0ede8] tracking-tight number-stat">
                {stat.value}
              </div>
              <div className="text-[12px] text-[#5a5550] mt-1 font-mono uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-[#1e1e1e]" />

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <div
              key={q.author}
              className="border border-[#1e1e1e] p-6 bg-[#0a0a0a]"
            >
              <p className="text-[14px] text-[#9a9590] leading-relaxed mb-5">
                &ldquo;{q.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-[#1e1e1e] flex items-center justify-center">
                  <span className="font-mono text-[10px] text-[#5a5550]">{q.initials}</span>
                </div>
                <span className="text-[12px] text-[#5a5550]">{q.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
