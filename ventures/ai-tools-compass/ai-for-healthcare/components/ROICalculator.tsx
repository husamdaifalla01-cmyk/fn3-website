"use client";

import { useState } from "react";

export default function ROICalculator() {
  const [physiciansCount, setPhysiciansCount] = useState(3);
  const [docHoursPerDay, setDocHoursPerDay] = useState(2.5);
  const [priorAuthPerWeek, setPriorAuthPerWeek] = useState(20);
  const [physicianRate, setPhysicianRate] = useState(250);

  const docTimeSavedHoursMonthly = physiciansCount * docHoursPerDay * 0.65 * 22; // 65% reduction, 22 work days
  const docSavingsValue = docTimeSavedHoursMonthly * physicianRate;

  const priorAuthStaffHoursSaved = priorAuthPerWeek * 0.7 * 4.33; // 70% reduction monthly
  const priorAuthSavings = priorAuthStaffHoursSaved * 35; // staff rate $35/hr

  const totalMonthlySavings = docSavingsValue + priorAuthSavings;
  const toolCosts = physiciansCount * 350; // ~$350/physician/month all-in
  const netMonthly = totalMonthlySavings - toolCosts;
  const annualROI = (netMonthly * 12) / (toolCosts * 12) * 100;

  return (
    <div className="rounded-2xl border border-[#7c3aed]/20 bg-[#111] p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">ROI Calculator</h2>
        <p className="mt-1 text-white/60">Estimate your monthly savings from healthcare AI adoption.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Number of physicians</label>
            <div className="flex items-center gap-3">
              <input type="range" min={1} max={50} step={1} value={physiciansCount} onChange={(e) => setPhysiciansCount(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#7c3aed]" />
              <span className="w-16 text-right text-sm font-semibold text-white">{physiciansCount}</span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Documentation hours per physician per day</label>
            <div className="flex items-center gap-3">
              <input type="range" min={0.5} max={5} step={0.5} value={docHoursPerDay} onChange={(e) => setDocHoursPerDay(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#7c3aed]" />
              <span className="w-16 text-right text-sm font-semibold text-white">{docHoursPerDay}h</span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Prior auth requests per week (practice total)</label>
            <div className="flex items-center gap-3">
              <input type="range" min={5} max={200} step={5} value={priorAuthPerWeek} onChange={(e) => setPriorAuthPerWeek(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#7c3aed]" />
              <span className="w-16 text-right text-sm font-semibold text-white">{priorAuthPerWeek}</span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Physician hourly value ($/hr)</label>
            <div className="flex items-center gap-3">
              <input type="range" min={100} max={500} step={25} value={physicianRate} onChange={(e) => setPhysicianRate(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#7c3aed]" />
              <span className="w-20 text-right text-sm font-semibold text-white">${physicianRate}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[#0a0a0a] p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/50">Monthly Impact Estimate</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-white/70">Documentation time saved ({Math.round(docTimeSavedHoursMonthly)}h)</span>
              <span className="text-sm font-semibold text-green-400">+${Math.round(docSavingsValue).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/70">Prior auth staff time saved ({Math.round(priorAuthStaffHoursSaved)}h)</span>
              <span className="text-sm font-semibold text-green-400">+${Math.round(priorAuthSavings).toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-3">
              <span className="text-sm text-white/70">AI tool costs (~${Math.round(toolCosts/physiciansCount)}/physician)</span>
              <span className="text-sm font-semibold text-red-400">-${toolCosts.toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-[#7c3aed]/10 p-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-white/80">Net monthly savings</span>
              <span className="text-2xl font-bold text-[#7c3aed]">${Math.round(netMonthly).toLocaleString()}</span>
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-xs text-white/50">Annual ROI</span>
              <span className="text-lg font-bold text-green-400">{Math.round(annualROI)}%</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-white/40">Based on published studies on ambient AI documentation and prior auth automation. Actual savings vary.</p>
        </div>
      </div>
    </div>
  );
}
