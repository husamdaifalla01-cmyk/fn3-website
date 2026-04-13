"use client";

import { useState } from "react";

export default function ROICalculator() {
  const [hours, setHours] = useState(4);
  const [rate, setRate] = useState(150);

  const monthlyHours = hours * 4.33;
  const monthlyValue = Math.round(monthlyHours * rate);
  const formattedValue = monthlyValue.toLocaleString();

  return (
    <section className="py-24 px-6 border-b border-[#1e1e1e]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">
            ROI Calculator
          </span>
          <h2 className="text-[32px] md:text-[40px] font-light text-[#f0ede8] mt-4 leading-[1.1]">
            What's one saved workflow worth to you?
          </h2>
        </div>

        <div className="border border-[#1e1e1e] bg-[#0d0d0d] p-8">

          {/* Slider 1 */}
          <div className="mb-10">
            <div className="flex items-end justify-between mb-4">
              <label className="text-[13px] text-[#9a9590] leading-snug max-w-sm">
                Hours/week you spend on reporting, client comms, or proposals
              </label>
              <span className="font-mono text-[28px] text-[#f0ede8] leading-none ml-6">
                {hours}<span className="text-[16px] text-[#5a5550]">h</span>
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full appearance-none h-px bg-[#2a2a2a] outline-none cursor-pointer"
              style={{
                accentColor: "#c9a84c",
              }}
            />
            <div className="flex justify-between mt-2">
              <span className="font-mono text-[10px] text-[#3a3530]">1h</span>
              <span className="font-mono text-[10px] text-[#3a3530]">20h</span>
            </div>
          </div>

          {/* Slider 2 */}
          <div className="mb-10">
            <div className="flex items-end justify-between mb-4">
              <label className="text-[13px] text-[#9a9590]">
                Your billable rate (or cost-equivalent hourly rate)
              </label>
              <span className="font-mono text-[28px] text-[#f0ede8] leading-none ml-6">
                ${rate}<span className="text-[16px] text-[#5a5550]">/hr</span>
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={500}
              step={10}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full appearance-none h-px bg-[#2a2a2a] outline-none cursor-pointer"
              style={{
                accentColor: "#c9a84c",
              }}
            />
            <div className="flex justify-between mt-2">
              <span className="font-mono text-[10px] text-[#3a3530]">$50</span>
              <span className="font-mono text-[10px] text-[#3a3530]">$500</span>
            </div>
          </div>

          {/* Output */}
          <div className="border border-[#c9a84c] bg-[#0a0a0a] p-6">
            <p className="text-[14px] text-[#9a9590] mb-3 leading-relaxed">
              You&apos;re leaving{" "}
              <span className="text-[#c9a84c] text-[22px] font-mono font-medium">
                ${formattedValue}/month
              </span>{" "}
              on the table.
              <br />
              Operators Brief shows you how to take it back.
            </p>
            <p className="font-mono text-[13px] text-[#5a5550]">
              ${rate}/hr × {hours}h/week × 4.3 weeks = ${formattedValue}/month. $15 vs. ${formattedValue}. That's the math.
            </p>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/#signup"
              className="inline-block bg-[#c9a84c] text-[#0a0a0a] text-[14px] font-medium py-3 px-8 hover:bg-[#d4b660] transition-colors"
            >
              Start Recovering That Time — $15/month
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
