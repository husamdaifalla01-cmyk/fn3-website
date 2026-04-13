"use client";

import { useState } from "react";

export default function ROICalculator() {
  const [invoicesPerMonth, setInvoicesPerMonth] = useState(200);
  const [bookkeepingHours, setBookkeepingHours] = useState(20);
  const [hourlyRate, setHourlyRate] = useState(75);
  const [researchHoursPerWeek, setResearchHoursPerWeek] = useState(5);

  const manualInvoiceCost = invoicesPerMonth * 13; // $13 avg per manual invoice
  const aiInvoiceCost = invoicesPerMonth * 3.5; // $3.50 avg with AI
  const invoiceSavings = manualInvoiceCost - aiInvoiceCost;

  const bookkeepingHoursSaved = bookkeepingHours * 0.75; // 75% reduction
  const bookkeepingSavings = bookkeepingHoursSaved * hourlyRate;

  const researchHoursSaved = researchHoursPerWeek * 0.6 * 4.33; // 60% reduction, monthly
  const researchSavings = researchHoursSaved * hourlyRate;

  const totalMonthlySavings = invoiceSavings + bookkeepingSavings + researchSavings;
  const toolCosts = 200; // rough monthly cost for a solid AI stack
  const netMonthlySavings = totalMonthlySavings - toolCosts;
  const annualROI = (netMonthlySavings * 12) / (toolCosts * 12) * 100;

  return (
    <div className="rounded-2xl border border-[#2563eb]/20 bg-[#111] p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">ROI Calculator</h2>
        <p className="mt-1 text-white/60">
          Estimate your monthly savings from AI adoption. Based on industry benchmarks.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Invoices processed per month
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={10}
                max={2000}
                step={10}
                value={invoicesPerMonth}
                onChange={(e) => setInvoicesPerMonth(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#2563eb]"
              />
              <span className="w-16 text-right text-sm font-semibold text-white">
                {invoicesPerMonth}
              </span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Monthly bookkeeping hours
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={5}
                max={200}
                step={5}
                value={bookkeepingHours}
                onChange={(e) => setBookkeepingHours(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#2563eb]"
              />
              <span className="w-16 text-right text-sm font-semibold text-white">
                {bookkeepingHours}h
              </span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Billable rate or staff cost ($/hour)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={25}
                max={300}
                step={5}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#2563eb]"
              />
              <span className="w-16 text-right text-sm font-semibold text-white">
                ${hourlyRate}
              </span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Tax research hours per week
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={20}
                step={1}
                value={researchHoursPerWeek}
                onChange={(e) => setResearchHoursPerWeek(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#2563eb]"
              />
              <span className="w-16 text-right text-sm font-semibold text-white">
                {researchHoursPerWeek}h/wk
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[#0a0a0a] p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/50">
            Monthly Savings Breakdown
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-white/70">AP Automation savings</span>
              <span className="text-sm font-semibold text-green-400">
                +${invoiceSavings.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/70">Bookkeeping automation</span>
              <span className="text-sm font-semibold text-green-400">
                +${bookkeepingSavings.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/70">Research time savings</span>
              <span className="text-sm font-semibold text-green-400">
                +${Math.round(researchSavings).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-3">
              <span className="text-sm text-white/70">AI tool costs (est.)</span>
              <span className="text-sm font-semibold text-red-400">
                -${toolCosts.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-[#2563eb]/10 p-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-white/80">Net monthly savings</span>
              <span className="text-2xl font-bold text-[#2563eb]">
                ${netMonthlySavings.toLocaleString()}
              </span>
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-xs text-white/50">Annual ROI</span>
              <span className="text-lg font-bold text-green-400">
                {Math.round(annualROI)}%
              </span>
            </div>
          </div>

          <p className="mt-3 text-xs text-white/40">
            Estimates based on IOFM benchmarks. Actual savings vary by workflow and adoption.
          </p>
        </div>
      </div>
    </div>
  );
}
