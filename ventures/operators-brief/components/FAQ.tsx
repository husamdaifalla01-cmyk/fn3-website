"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How is this different from every other AI newsletter?",
    a: "Most AI newsletters cover tools, trends, and opinions. The Operators Brief covers implementations — what a specific business actually built, what it cost, what broke, and what the ROI was. We don't cover AI news. We don't opine on AGI timelines. Every issue is a single case study written like a post-mortem. The specificity is the product.",
  },
  {
    q: "Are these real case studies or made-up scenarios?",
    a: "The case studies are based on real implementations, with company names and identifying details changed to protect the businesses involved. The problem structures, tool stacks, cost structures, and outcomes are real. We verify the numbers with the operators before publishing. If we can't verify it, we don't publish it.",
  },
  {
    q: "How technical do I need to be to implement these?",
    a: "Each issue specifies a 'technical requirement' level: no-code, low-code, or developer required. About 40% of case studies are implementable with no-code tools. Another 40% require someone who can use Zapier, Make, and basic API setups — a technically competent ops person. About 20% require a developer for 1–3 days.",
  },
  {
    q: "What industries are covered?",
    a: "We deliberately cover across industries so you develop pattern recognition rather than copying. The 12 issues in the first volume cover: marketing agencies, e-commerce, professional services (legal, accounting), healthcare, real estate, SaaS, hospitality, and property management. The methodology transfers across verticals.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No contracts, no cancellation fees. Cancel from the subscriber dashboard and your access continues until the end of the billing period. We don't do dark patterns or fake 'are you sure you want to cancel' retention flows.",
  },
  {
    q: "What's included in the ROI calculator?",
    a: "Pro subscribers get a Google Sheets template with the same ROI calculation framework used in every issue. Inputs: current process cost (time + labor), implementation cost, ongoing tool cost, estimated time savings. Output: payback period, net annual benefit, 3-year ROI. Pre-built for 8 common AI use cases.",
  },
  {
    q: "How do I access back issues as a Pro subscriber?",
    a: "All issues are available in your subscriber portal immediately after subscribing. They're full-text searchable, tagged by industry, function (sales, ops, support, finance), and technical complexity. When you're evaluating a specific project, you can find every relevant case study across the archive in under 2 minutes.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 bg-[#0d0d0d] border-b border-[#1e1e1e]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">
            FAQ
          </span>
          <h2 className="text-[36px] md:text-[44px] font-light text-[#f0ede8] mt-4">
            Questions operators ask.
          </h2>
        </div>

        <div className="space-y-1">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-[#1e1e1e] bg-[#0a0a0a]">
              <button
                className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-[#0d0d0d] transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-[14px] text-[#f0ede8] font-medium leading-snug">
                  {faq.q}
                </span>
                <span className="flex-shrink-0 mt-0.5 text-[#c9a84c] font-mono text-lg leading-none">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="text-[13px] text-[#9a9590] leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
