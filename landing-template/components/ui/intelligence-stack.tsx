"use client";

import React from "react";
import { cn } from "@/lib/utils";
import CardSwap, { Card } from "./card-swap";

interface IntelligenceStackProps {
  className?: string;
}

export default function IntelligenceStack({ className }: IntelligenceStackProps) {
  return (
    <>
      {/* Mobile View */}
      <div className={cn("relative w-full h-[350px] z-50 block md:hidden -mt-28 mb-12", className)}>
        <CardSwap
          width={220}
          height={140}
          cardDistance={40}
          verticalDistance={25}
          delay={2000}
          pauseOnHover={false}
          skewAmount={2}
          easing="elastic"
        >
          {/* Mobile Card 1 - Alert Feed */}
          <Card className="!bg-white !text-black shadow-xl border-2 border-gray-200 overflow-hidden [&_*]:!text-black" data-light-theme="true">
            <div className="h-full flex flex-col">
              <div className="px-2 py-1 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-xs font-semibold text-gray-900">Alert Feed</span>
                </div>
              </div>
              <div className="px-2 py-1 bg-red-50 border-b border-red-100">
                <div className="grid grid-cols-3 gap-1 text-center">
                  <div><div className="text-xs font-bold text-red-600">12</div></div>
                  <div><div className="text-xs font-bold text-orange-500">8</div></div>
                  <div><div className="text-xs font-bold text-yellow-600">24h</div></div>
                </div>
              </div>
              <div className="flex-1 overflow-hidden bg-white">
                <div className="p-1.5 border-b border-gray-100">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    <div className="font-semibold text-gray-900 text-xs">OpenAI</div>
                  </div>
                  <div className="font-medium text-gray-900 text-xs">Model deprecated</div>
                </div>
                <div className="p-1.5 border-b border-gray-100">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    <div className="font-semibold text-gray-900 text-xs">Google</div>
                  </div>
                  <div className="font-medium text-gray-900 text-xs">Rate limits cut 97%</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Mobile Card 2 - Financial Impact */}
          <Card className="!bg-white !text-black shadow-xl border-2 border-gray-200 overflow-hidden [&_*]:!text-black" data-light-theme="true">
            <div className="h-full flex flex-col">
              <div className="px-2 py-1 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="text-xs font-semibold text-gray-900">Financial Impact</span>
                </div>
              </div>
              <div className="space-y-1.5 flex-1 p-2">
                <div className="bg-gray-50 rounded-lg p-1.5">
                  <div className="font-semibold text-gray-900 text-xs">OpenAI 20% increase</div>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div>
                    <div className="text-xs text-gray-600">Current</div>
                    <div className="text-sm font-bold text-gray-900">$4,230</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">New</div>
                    <div className="text-sm font-bold text-red-500">$5,076</div>
                  </div>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-1.5">
                  <div className="text-red-500 font-semibold text-xs">+$846/month</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Mobile Card 3 - Risk Dashboard */}
          <Card className="!bg-white !text-black shadow-xl border-2 border-gray-200 overflow-hidden [&_*]:!text-black" data-light-theme="true">
            <div className="p-2 h-full flex flex-col">
              <div className="flex items-center gap-1 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <h3 className="text-xs font-semibold text-gray-900">Risk Dashboard</h3>
              </div>
              <div className="space-y-1.5 flex-1">
                {[
                  { vendor: "OpenAI", score: 54, color: "bg-red-500", textColor: "text-red-500" },
                  { vendor: "Anthropic", score: 72, color: "bg-orange-500", textColor: "text-orange-500" },
                  { vendor: "Mistral", score: 84, color: "bg-yellow-500", textColor: "text-yellow-500" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className={`w-1 h-1 rounded-full ${item.color}`} />
                    <div className="font-medium w-12 text-xs text-gray-900">{item.vendor}</div>
                    <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.score}%` }} />
                    </div>
                    <div className={`w-6 text-right font-bold text-xs ${item.textColor}`}>{item.score}</div>
                  </div>
                ))}
              </div>
              <div className="mt-2 pt-1.5 border-t border-gray-200">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">ADES Score:</span>
                  <span className="font-bold text-orange-500">68</span>
                </div>
              </div>
            </div>
          </Card>
        </CardSwap>
      </div>

      {/* Tablet View */}
      <div className={cn("relative w-full h-[350px] z-50 hidden md:block lg:hidden", className)}>
        <CardSwap
          width={380}
          height={280}
          cardDistance={80}
          verticalDistance={25}
          delay={4000}
          pauseOnHover={true}
          skewAmount={2.5}
          easing="elastic"
        >
          {/* Tablet cards - copy of desktop with medium sizing */}
          <Card className="!bg-white !text-black shadow-xl border-2 border-gray-200 overflow-hidden [&_*]:!text-black" data-light-theme="true">
            <div className="h-full flex flex-col">
              <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                    <span className="text-base font-semibold text-gray-900">Alert Feed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Connected
                  </div>
                </div>
              </div>
              <div className="px-4 py-1.5 bg-red-50 border-b border-red-100">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-base font-bold text-red-600">12</div>
                    <div className="text-xs text-gray-600">Breaking</div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-orange-500">8</div>
                    <div className="text-xs text-gray-600">Major</div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-yellow-600">24h</div>
                    <div className="text-xs text-gray-600">Window</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-hidden bg-white">
                <div className="p-2.5 border-b border-gray-100 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">OpenAI</div>
                        <div className="text-xs text-gray-600">GPT-4o</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600">2h ago</div>
                  </div>
                  <div className="font-medium text-gray-900 text-sm">Model deprecated</div>
                  <div className="text-xs text-gray-700">16 days notice • $847/mo</div>
                </div>
                <div className="p-2.5 border-b border-gray-100 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">Google</div>
                        <div className="text-xs text-gray-600">Gemini API</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600">4h ago</div>
                  </div>
                  <div className="font-medium text-gray-900 text-sm">Rate limits cut 97%</div>
                  <div className="text-xs text-gray-700">Service disruption</div>
                </div>
              </div>
              <div className="px-4 py-1.5 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-gray-700">Monitoring 6 providers</span>
                  </div>
                  <div className="text-gray-600">Last sync: 30s ago</div>
                </div>
              </div>
            </div>
          </Card>
          {/* Add other tablet cards similarly */}
        </CardSwap>
      </div>

      {/* Desktop View */}
      <div className={cn("relative w-full h-[450px] z-50 hidden lg:block", className)}>
        <CardSwap
          width={520}
          height={380}
          cardDistance={140}
          verticalDistance={40}
          delay={4000}
          pauseOnHover={true}
          skewAmount={4}
          easing="elastic"
        >
        {/* Card 1 - Alert Feed */}
        <Card className="!bg-white !text-black shadow-xl border-2 border-gray-200 overflow-hidden [&_*]:!text-black" data-light-theme="true">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-lg font-semibold text-gray-900">Alert Feed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Connected
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="px-5 py-2 bg-red-50 border-b border-red-100">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-red-600">12</div>
                  <div className="text-xs text-gray-600">Breaking</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-orange-500">8</div>
                  <div className="text-xs text-gray-600">Major</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-600">24h</div>
                  <div className="text-xs text-gray-600">Window</div>
                </div>
              </div>
            </div>

            {/* Alert List */}
            <div className="flex-1 overflow-hidden bg-white">
              <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">OpenAI</div>
                      <div className="text-xs text-gray-600">GPT-4o</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">2h ago</div>
                </div>
                <div className="font-medium text-gray-900 text-sm">Model deprecated</div>
                <div className="text-xs text-gray-700">16 days notice • $847/mo</div>
              </div>

              <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Google</div>
                      <div className="text-xs text-gray-600">Gemini API</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">4h ago</div>
                </div>
                <div className="font-medium text-gray-900 text-sm">Rate limits cut 97%</div>
                <div className="text-xs text-gray-700">Service disruption</div>
              </div>

              <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Anthropic</div>
                      <div className="text-xs text-gray-600">Claude 3.5</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">1d ago</div>
                </div>
                <div className="font-medium text-gray-900 text-sm">Pricing restructure</div>
                <div className="text-xs text-gray-700">TCO +23% • $1,234/mo</div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-2 border-t border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-gray-700">Monitoring 6 providers</span>
                </div>
                <div className="text-gray-600">Last sync: 30s ago</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Card 2 - Financial Impact Calculator */}
        <Card className="!bg-white !text-black shadow-xl border-2 border-gray-200 overflow-hidden [&_*]:!text-black" data-light-theme="true">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                <h3 className="text-lg font-semibold text-gray-900">Financial Impact Calculator</h3>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">Scenario</div>
                <div className="font-semibold text-gray-900">OpenAI 20% price increase</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Current monthly</div>
                  <div className="text-2xl font-bold text-gray-900">$4,230</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">New monthly</div>
                  <div className="text-2xl font-bold text-red-500">$5,076</div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <div className="text-red-500 font-semibold">+$846/month increase</div>
                <div className="text-sm text-gray-700">$10,152 additional annual cost</div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-600">Vendor concentration risk</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">OpenAI</span>
                    <span className="font-semibold text-gray-900">67%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-[67%] transition-all duration-1000" />
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="text-green-500 font-semibold">⚡ Mitigation: Diversify to Mistral</div>
                <div className="text-sm text-gray-700">Potential savings: $1,234/month</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Card 3 - Risk Dashboard */}
        <Card className="!bg-white !text-black shadow-xl border-2 border-gray-200 overflow-hidden [&_*]:!text-black" data-light-theme="true">
          <div className="p-5 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              <h3 className="text-lg font-semibold text-gray-900">Risk Dashboard</h3>
            </div>

            <div className="space-y-4 flex-1">
              {[
                { vendor: "OpenAI", score: 54, risk: "High Risk", color: "bg-red-500", textColor: "text-red-500" },
                { vendor: "Anthropic", score: 72, risk: "Elevated", color: "bg-orange-500", textColor: "text-orange-500" },
                { vendor: "Mistral", score: 84, risk: "Watch", color: "bg-yellow-500", textColor: "text-yellow-500" },
                { vendor: "Groq", score: 91, risk: "Stable", color: "bg-green-500", textColor: "text-green-500" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <div className="font-medium w-20 text-gray-900">{item.vendor}</div>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <div className={`w-8 text-right font-bold tabular-nums ${item.textColor}`}>
                    {item.score}
                  </div>
                  <div className={`w-20 text-right text-xs font-semibold ${item.textColor}`}>
                    {item.risk}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Cost Impact:</span>
                <span className="font-semibold text-gray-900">$2,847/mo exposed</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-600">Your ADES Score:</span>
                <span className="font-bold text-orange-500">68</span>
              </div>
            </div>
          </div>
        </Card>
        </CardSwap>
      </div>
    </>
  );
}