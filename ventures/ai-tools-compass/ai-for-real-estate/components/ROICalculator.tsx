"use client";

import { useState } from "react";

export default function ROICalculator() {
  const [leadsPerMonth, setLeadsPerMonth] = useState(50);
  const [currentConversionRate, setCurrentConversionRate] = useState(2);
  const [avgCommission, setAvgCommission] = useState(9000);
  const [listingsPerMonth, setListingsPerMonth] = useState(3);

  const currentDealsFromLeads = (leadsPerMonth * currentConversionRate) / 100;
  const aiConversionRate = Math.min(currentConversionRate * 1.5, 15);
  const aiDealsFromLeads = (leadsPerMonth * aiConversionRate) / 100;
  const extraDealsPerMonth = aiDealsFromLeads - currentDealsFromLeads;
  const leadRevenueLift = extraDealsPerMonth * avgCommission;

  const listingTimeSavedHours = listingsPerMonth * 1.5; // 90 min per listing on copy/comms
  const listingTimeSavedValue = listingTimeSavedHours * 150; // $150/hour agent value

  const totalMonthlySavings = leadRevenueLift + listingTimeSavedValue;
  const toolCosts = 700;
  const netMonthly = totalMonthlySavings - toolCosts;
  const annualROI = (netMonthly * 12) / (toolCosts * 12) * 100;

  return (
    <div className="rounded-2xl border border-[#059669]/20 bg-[#111] p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">ROI Calculator</h2>
        <p className="mt-1 text-white/60">Estimate your monthly gain from real estate AI tools.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Leads per month</label>
            <div className="flex items-center gap-3">
              <input type="range" min={5} max={500} step={5} value={leadsPerMonth} onChange={(e) => setLeadsPerMonth(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#059669]" />
              <span className="w-16 text-right text-sm font-semibold text-white">{leadsPerMonth}</span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Current lead-to-close conversion (%)</label>
            <div className="flex items-center gap-3">
              <input type="range" min={0.5} max={10} step={0.5} value={currentConversionRate} onChange={(e) => setCurrentConversionRate(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#059669]" />
              <span className="w-16 text-right text-sm font-semibold text-white">{currentConversionRate}%</span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Average commission per transaction ($)</label>
            <div className="flex items-center gap-3">
              <input type="range" min={3000} max={30000} step={500} value={avgCommission} onChange={(e) => setAvgCommission(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#059669]" />
              <span className="w-20 text-right text-sm font-semibold text-white">${avgCommission.toLocaleString()}</span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">New listings per month</label>
            <div className="flex items-center gap-3">
              <input type="range" min={1} max={20} step={1} value={listingsPerMonth} onChange={(e) => setListingsPerMonth(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#059669]" />
              <span className="w-16 text-right text-sm font-semibold text-white">{listingsPerMonth}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[#0a0a0a] p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/50">Monthly Impact Estimate</h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-white/70">Improved lead conversion (+50%)</span>
              <span className="text-sm font-semibold text-green-400">+${Math.round(leadRevenueLift).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/70">Listing prep time saved ({Math.round(listingTimeSavedHours)}h)</span>
              <span className="text-sm font-semibold text-green-400">+${Math.round(listingTimeSavedValue).toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-3">
              <span className="text-sm text-white/70">AI tool costs (est.)</span>
              <span className="text-sm font-semibold text-red-400">-${toolCosts.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-[#059669]/10 p-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-white/80">Net monthly gain</span>
              <span className="text-2xl font-bold text-[#059669]">${Math.round(netMonthly).toLocaleString()}</span>
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-xs text-white/50">Annual ROI</span>
              <span className="text-lg font-bold text-green-400">{Math.round(annualROI)}%</span>
            </div>
          </div>

          <p className="mt-3 text-xs text-white/40">Based on industry-reported conversion rate improvements from AI-assisted follow-up. Actual results vary.</p>
        </div>
      </div>
    </div>
  );
}
