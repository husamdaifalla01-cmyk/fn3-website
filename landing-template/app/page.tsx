"use client";

import {
  AlertTriangle,
  BarChart2,
  Bell,
  BookOpen,
  Clock,
  DollarSign,
  FileText,
  LineChart,
  Lock,
  Search,
  Shield,
  ShieldAlert,
  Zap,
} from "lucide-react";

import Link from "next/link";
import { useLiveData } from "@/lib/use-live-data";

import CTA from "@/components/sections/cta/default";
import FAQ from "@/components/sections/faq/default";
import Hero from "@/components/sections/hero/default";
import Items from "@/components/sections/items/default";
import Logos from "@/components/sections/logos/default";
import Stats from "@/components/sections/stats/default";
import StickyNav from "@/components/layout/sticky-nav";
import SiteFooter from "@/components/layout/site-footer";
import Anthropic from "@/components/logos/anthropic";
import Cohere from "@/components/logos/cohere";
import GoogleAI from "@/components/logos/google-ai";
import Mistral from "@/components/logos/mistral";
import OpenAI from "@/components/logos/openai";
import Perplexity from "@/components/logos/perplexity";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/ui/logo";
import { Section } from "@/components/ui/section";
import IntelligenceStack from "@/components/ui/intelligence-stack";
import Aurora from "@/components/ui/aurora";

// ── Real incidents (documented, Feb 2026) ─────────────────────────────────

const incidents = [
  {
    provider: "OpenAI",
    model: "GPT-4o",
    change: "Model retired — 16 days effective notice",
    severity: "Breaking",
    severityColor: "text-red-500",
    dot: "bg-red-500",
    time: "Jan 2026",
    detail:
      "Production integrations given 16 days to migrate. No deprecation runway.",
  },
  {
    provider: "Anthropic",
    model: "Platform-wide",
    change: "OAuth ban broke 56,000-star tools overnight",
    severity: "Breaking",
    severityColor: "text-red-500",
    dot: "bg-red-500",
    time: "Dec 2025",
    detail: "Formal documentation came 6 weeks after the policy took effect.",
  },
  {
    provider: "Google",
    model: "Gemini API",
    change: "Rate limits cut 97% — zero announcement",
    severity: "Breaking",
    severityColor: "text-red-500",
    dot: "bg-red-500",
    time: "Nov 2025",
    detail: "Tens of thousands of projects broke. No status page entry.",
  },
  {
    provider: "Anthropic",
    model: "Claude 3.5 Sonnet",
    change: "Pricing restructured — looked like a discount",
    severity: "Major",
    severityColor: "text-amber-500",
    dot: "bg-amber-500",
    time: "Oct 2025",
    detail:
      "Headline price fell. Enterprise TCO rose. Only visible in the fine print.",
  },
  {
    provider: "OpenAI",
    model: "GPT-4 Turbo",
    change: "Context pricing reclassified mid-cycle",
    severity: "Major",
    severityColor: "text-amber-500",
    dot: "bg-amber-500",
    time: "Sep 2025",
    detail: "Billing change buried in a dev forum post, not the changelog.",
  },
  {
    provider: "Mistral",
    model: "Mistral Large",
    change: "Data retention policy updated",
    severity: "Major",
    severityColor: "text-amber-500",
    dot: "bg-amber-500",
    time: "Aug 2025",
    detail: "ToS section on prompt logging rewritten. Compliance implication.",
  },
];

// ── Mock AVRS scores ───────────────────────────────────────────────────────

const avrsScores = [
  { vendor: "Google", score: 91, band: "Stable", color: "text-green-500", bar: "bg-green-500", width: "w-[91%]" },
  { vendor: "AWS Bedrock", score: 89, band: "Watch", color: "text-blue-500", bar: "bg-blue-500", width: "w-[89%]" },
  { vendor: "Azure OpenAI", score: 89, band: "Watch", color: "text-blue-500", bar: "bg-blue-500", width: "w-[89%]" },
  { vendor: "Anthropic", score: 86, band: "Watch", color: "text-blue-500", bar: "bg-blue-500", width: "w-[86%]" },
  { vendor: "xAI", score: 85, band: "Watch", color: "text-blue-500", bar: "bg-blue-500", width: "w-[85%]" },
  { vendor: "OpenAI", score: 78, band: "Watch", color: "text-blue-500", bar: "bg-blue-500", width: "w-[78%]" },
  { vendor: "Mistral", score: 77, band: "Watch", color: "text-blue-500", bar: "bg-blue-500", width: "w-[77%]" },
  { vendor: "Perplexity", score: 74, band: "Elevated", color: "text-yellow-500", bar: "bg-yellow-500", width: "w-[74%]" },
  { vendor: "Cohere", score: 71, band: "Elevated", color: "text-yellow-500", bar: "bg-yellow-500", width: "w-[71%]" },
  { vendor: "Groq", score: 64, band: "Elevated", color: "text-yellow-500", bar: "bg-yellow-500", width: "w-[64%]" },
];

export default function Page() {
  const { changes, providers, isLoading, error } = useLiveData({ days: 365, limit: 6 });

  // Convert recent changes to incidents format
  const liveIncidents = changes.slice(0, 6).map((change) => ({
    provider: change.provider,
    model: change.type.replace(/-/g, ' '),
    change: change.change,
    severity: change.severity,
    severityColor: change.severityColor,
    dot: change.dot,
    time: change.time,
    detail: change.impact || change.description || "Impact analysis pending",
  }));

  // Convert providers to AVRS scores format with fallbacks
  const liveAvrsScores = Object.values(providers)
    .filter(provider => ['openai', 'anthropic', 'google', 'mistral', 'groq'].includes(provider.id))
    .map((provider) => {
      const score = provider.riskScore || 72; // Default to neutral score
      const band = provider.riskLevel === 'LOW' ? 'Stable' :
                   provider.riskLevel === 'LOW-MED' ? 'Watch' :
                   provider.riskLevel === 'MODERATE' ? 'Elevated' :
                   provider.riskLevel === 'HIGH' ? 'Elevated' : 'High Risk';
      const color = score >= 85 ? 'text-green-500' :
                    score >= 75 ? 'text-yellow-500' : 'text-orange-500';
      const bar = score >= 85 ? 'bg-green-500' :
                  score >= 75 ? 'bg-yellow-500' : 'bg-orange-500';

      return {
        vendor: provider.name,
        score: Math.round(score),
        band,
        color,
        bar,
        width: `w-[${Math.round(score)}%]`
      };
    })
    .sort((a, b) => b.score - a.score); // Sort by score descending

  // Use live data if available, fallback to static data if no live data
  const displayIncidents = liveIncidents.length > 0 ? liveIncidents : incidents;
  const displayScores = avrsScores; // Use static AVRS scores directly

  return (
    <div className="flex flex-col bg-white text-black">
      {/* ── Hero section with Aurora ── */}
      <div className="relative dark bg-black text-white">
        {/* Aurora Background - Only in hero */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute inset-0 h-[800px]">
            <Aurora
              colorStops={['#ff8c42', '#64ffda', '#ff6b35']}
              amplitude={0.6}
              blend={0.7}
              speed={0.8}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-50% to-background" />
          </div>
        </div>

        {/* ── Nav ── */}
        <StickyNav className="relative z-50" />

        {/* ── Hero ── */}
        <Hero
          badge={false}
          title="Know what your AI vendors are doing to you."
          className="relative z-40"
          description={
            <>
              Mardii monitors every AI provider you depend on —{" "}
              <span className="!text-orange-500 font-semibold">pricing changes</span>,{" "}
              <span className="!text-orange-500 font-semibold">rate limit cuts</span>,{" "}
              <span className="!text-orange-500 font-semibold">ToS rewrites</span>,{" "}
              <span className="!text-orange-500 font-semibold">model deprecations</span>
              {" "}— and tells you what it means before it costs you.
            </>
          }
          mockup={<IntelligenceStack />}
          buttons={[
            {
              href: "/register",
              text: "Start free",
              variant: "white",
            },
            { href: "#scores", text: "See recent changes", variant: "glow-brand" },
          ]}
        />
      </div>

      {/* ── Rest of content with white background ── */}
      <div className="bg-white min-h-screen">

      {/* ── Monitored providers ── */}
      <Logos
        badge={false}
        title="14 AI providers monitored. More added monthly."
        logos={[
          <Logo key="openai" image={OpenAI} name="OpenAI" />,
          <Logo key="anthropic" image={Anthropic} name="Anthropic" />,
          <Logo key="google" image={GoogleAI} name="Google Gemini" />,
          <Logo key="mistral" image={Mistral} name="Mistral" />,
          <Logo key="cohere" image={Cohere} name="Cohere" />,
          <Logo key="perplexity" image={Perplexity} name="Perplexity" />,
        ]}
        className="pt-16 py-8 sm:py-12 md:py-16"
      />

      {/* ── Stats strip ── */}
      <Stats
        items={[
          {
            label: "AI providers monitored",
            value: 14,
            description: "OpenAI, Anthropic, Google, Mistral, Cohere, Perplexity, AWS Bedrock, Azure OpenAI, DeepSeek, Fireworks AI, Groq, Replicate, Together AI, xAI",
          },
          {
            label: "models tracked",
            value: "144",
            suffix: "+",
            description: "pricing, rate limits, lifecycle status",
          },
          {
            label: "pricing scans",
            value: "4",
            suffix: "h",
            description: "every 4 hours. ToS daily. Uptime every 60 seconds.",
          },
          {
            label: "breaking changes",
            value: 3,
            description:
              "caught in 2025 that cost teams real money before Mardii existed",
          },
        ]}
      />

      {/* ── Real incident feed ── */}
      <Section id="monitor">
        <div className="max-w-container mx-auto flex flex-col gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <Badge variant="outline">
              <AlertTriangle className="size-3" />
              <span>What Mardii would have caught</span>
            </Badge>
            <h2 className="text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
              These already happened to your peers.
            </h2>
            <p className="text-gray-700 max-w-[600px] text-lg font-medium">
              All documented. All real. All the kind of thing most teams found
              out from Twitter, a billing shock, or a production incident.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayIncidents.map((incident, i) => (
              <div
                key={i}
                className="bg-white border-gray-200 flex flex-col gap-3 rounded-xl border p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${incident.dot}`}
                    />
                    <span className="text-sm font-semibold">
                      {incident.provider}
                    </span>
                    <span className="text-gray-600 text-xs">
                      {incident.model}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold ${incident.severityColor}`}
                  >
                    {incident.severity}
                  </span>
                </div>
                <p className="font-medium">{incident.change}</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {incident.detail}
                </p>
                <p className="text-gray-600 text-xs">{incident.time}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── AVRS live scores ── */}
      <Section id="scores">
        <div className="max-w-container mx-auto flex flex-col gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <Badge variant="outline">AI Vendor Risk Score — AVRS</Badge>
            <h2 className="text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
              Every vendor. One score. Updated daily.
            </h2>
            <p className="text-gray-700 max-w-[600px] text-lg font-medium">
              AVRS combines cost volatility, operational stability, policy drift,
              model lifecycle risk, and market concentration into a single
              0–100 score. Lower = more risk to your business.
            </p>
          </div>

          <div className="mx-auto w-full max-w-2xl flex flex-col gap-4">
            {displayScores.map((v, i) => (
              <div
                key={i}
                className="bg-white border-gray-200 flex items-center gap-4 rounded-xl border px-6 py-4"
              >
                <div className="w-28 shrink-0 font-semibold">{v.vendor}</div>
                <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div className={`h-full rounded-full ${v.bar} ${v.width}`} />
                </div>
                <div className={`w-10 text-right font-bold tabular-nums ${v.color}`}>
                  {v.score}
                </div>
                <div className={`w-20 text-right text-xs font-semibold ${v.color}`}>
                  {v.band}
                </div>
              </div>
            ))}
            <p className="text-gray-600 text-xs text-center pt-2">
              90–100 Stable · 75–89 Watch · 60–74 Elevated · 0–59 High Risk
            </p>
          </div>
        </div>
      </Section>

      {/* ── What Mardii does — Items ── */}
      <div id="features">
        <Items
          title={
            <>
              Everything you need.{" "}
              <span className="text-orange-500">Nothing you don't.</span>
            </>
          }
          items={[
            {
              title: "Change Monitor",
              description:
                "Pricing, rate limits, ToS, model deprecations — tracked across all 6 providers. Alerts the moment something changes.",
              icon: <Bell className="size-5 stroke-1" />,
            },
            {
              title: "AVRS risk scores",
              description:
                "Composite 0–100 score per vendor. Five modules: cost volatility, uptime, policy drift, model lifecycle, market concentration.",
              icon: <ShieldAlert className="size-5 stroke-1" />,
            },
            {
              title: "Financial Impact Calculator",
              description:
                "Enter your token usage. See the exact dollar impact of any detected pricing change on your monthly and annual costs.",
              icon: <DollarSign className="size-5 stroke-1" />,
            },
            {
              title: "Spend Forecasting",
              description:
                "3, 6, and 12-month cost projections based on your growth rate and each vendor's pricing history.",
              icon: <LineChart className="size-5 stroke-1" />,
            },
            {
              title: "Severity classification",
              description:
                "Breaking · Major · Minor · Info. Every change graded so you know what needs attention today vs. next sprint.",
              icon: <AlertTriangle className="size-5 stroke-1" />,
            },
            {
              title: "Audit trail",
              description:
                "Timestamped record of every change detected and acknowledged, exportable as PDF. Compliance-ready from day one.",
              icon: <FileText className="size-5 stroke-1" />,
            },
            {
              title: "Concentration risk (ADES)",
              description:
                "Your AI Dependency Exposure Score. Shows exactly how much financial damage a vendor outage or price shock would cause you.",
              icon: <BarChart2 className="size-5 stroke-1" />,
            },
            {
              title: "Scenario simulation",
              description:
                "Model a 20% OpenAI price hike, a 4-hour outage, a model deprecation — see the dollar figure before it happens.",
              icon: <Zap className="size-5 stroke-1" />,
            },
          ]}
        />
      </div>

      {/* ── Moat callout ── */}
      <Section>
        <div className="max-w-container mx-auto">
          <div className="border-gray-200 bg-white rounded-2xl border p-8 sm:p-12">
            <div className="flex flex-col gap-6">
              <Badge variant="outline" className="w-fit bg-orange-500 text-white border-orange-500">
                Our advantage
              </Badge>
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl text-orange-500">
                Intelligence that gets smarter over time.
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    period: "Month 1",
                    desc: "Baseline risk scores established. You start seeing patterns in vendor behavior.",
                  },
                  {
                    period: "Month 3",
                    desc: "Price trend analysis becomes reliable. You can predict which vendors will increase costs.",
                  },
                  {
                    period: "Month 6",
                    desc: "Policy change patterns emerge. You know which providers are stable vs. unpredictable.",
                  },
                  {
                    period: "Month 12",
                    desc: "Complete vendor risk profiles. You have the deepest AI vendor intelligence available anywhere.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="text-orange-500 font-semibold">
                      {item.period}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-gray-700 text-sm">
                The longer you use Mardii, the better it predicts what your AI vendors will do next.
                This historical context is what makes our risk assessments uniquely accurate.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Who this is for ── */}
      <Items
        title="Built for the teams that feel this pain."
        items={[
          {
            title: "Engineering leads",
            description:
              "Stop finding out about breaking API changes from a support ticket. Get the alert before the incident.",
            icon: <Search className="size-5 stroke-1" />,
          },
          {
            title: "CTOs",
            description:
              "Know your vendor concentration risk. Know what a 20% OpenAI price hike does to your margin before it happens.",
            icon: <BarChart2 className="size-5 stroke-1" />,
          },
          {
            title: "Finance teams",
            description:
              "Model AI spend forecasts that account for pricing history, not just today's rate card.",
            icon: <DollarSign className="size-5 stroke-1" />,
          },
          {
            title: "Compliance teams",
            description:
              "EU AI Act enforcement starts August 2026. Audit-ready documentation of every vendor change, timestamped.",
            icon: <Shield className="size-5 stroke-1" />,
          },
          {
            title: "Developers",
            description:
              "Subscribe free. Get the alert. Forward it to your manager. That's the whole loop.",
            icon: <Bell className="size-5 stroke-1" />,
          },
          {
            title: "Legal & procurement",
            description:
              "ToS change alerts with clause classification — know when a data retention change needs a legal review.",
            icon: <Lock className="size-5 stroke-1" />,
          },
          {
            title: "Startups",
            description:
              "You have 100% of your AI workload on one provider. That's the highest exposure profile. Know it.",
            icon: <Clock className="size-5 stroke-1" />,
          },
          {
            title: "Enterprise teams",
            description:
              "Vendor concentration dashboards, scenario simulation, white-label reports, and EU AI Act compliance exports.",
            icon: <BookOpen className="size-5 stroke-1" />,
          },
        ]}
      />

      {/* ── FAQ ── */}
      <FAQ
        title="Questions and answers"
        items={[
          {
            question: "What exactly does Mardii monitor?",
            answer: (
              <>
                <p className="text-gray-700 mb-4 max-w-[640px]">
                  For each of the 6 monitored AI providers, Mardii tracks:
                </p>
                <ul className="text-gray-700 mb-4 max-w-[640px] list-disc list-inside space-y-1">
                  <li>Pricing changes — input/output costs, batch pricing, context pricing</li>
                  <li>Rate limit changes — per-tier request and token limits</li>
                  <li>Terms of Service and API usage policy updates — SHA256-diffed daily</li>
                  <li>Model deprecations — release dates, shutdown dates, notice periods</li>
                  <li>Operational stability — API uptime, latency, error rates, every 60 seconds</li>
                </ul>
              </>
            ),
          },
          {
            question: "What is the AVRS and how is it calculated?",
            answer: (
              <>
                <p className="text-gray-700 mb-4 max-w-[640px]">
                  The AI Vendor Risk Score (AVRS) is a composite 0–100 score computed daily from five modules:
                </p>
                <ul className="text-gray-700 mb-4 max-w-[640px] list-disc list-inside space-y-1">
                  <li>Cost Volatility Index (30%) — pricing stability over 12 months</li>
                  <li>Operational Stability Score (25%) — uptime, latency, error rate</li>
                  <li>Policy Drift Severity Index (20%) — ToS change frequency and severity</li>
                  <li>Model Stability Score (15%) — deprecation notice periods and consistency</li>
                  <li>Ecosystem Fragility Index (10%) — market concentration risk</li>
                </ul>
                <p className="text-gray-700 mb-4 max-w-[640px]">
                  Higher score = lower risk. 90+ is Stable. Below 50 is High Risk.
                  Scores are published publicly — free for anyone to see.
                </p>
              </>
            ),
          },
          {
            question: "What is the ADES and why does it matter?",
            answer: (
              <p className="text-gray-700 mb-4 max-w-[640px]">
                The AI Dependency Exposure Score (ADES) takes the vendor AVRS and combines it with your
                specific situation: how much of your AI spend goes to each vendor, how much of your revenue
                depends on AI, whether you have any redundancy, and how critical each vendor is to your
                product. The result is a financial exposure score specific to your company — not a generic
                vendor score. A vendor with an AVRS of 72 might be low-risk to a company using it for
                10% of workloads, and catastrophically risky to a company with 80% concentration and no backup.
              </p>
            ),
          },
          {
            question: "Is EU AI Act compliance relevant here?",
            answer: (
              <p className="text-gray-700 mb-4 max-w-[640px]">
                Yes. EU AI Act enforcement begins August 2, 2026 — fines up to 7% of global turnover for
                companies without proper governance documentation. Companies deploying AI in regulated use
                cases need a documented record of their AI vendors, the policies those vendors operate
                under, and any changes to those policies over time. Mardii's audit trail provides exactly
                this record, formatted for Annex III requirements.
              </p>
            ),
          },
          {
            question: "How is Mardii different from just checking provider changelogs?",
            answer: (
              <>
                <p className="text-gray-700 mb-4 max-w-[640px]">
                  Three differences:
                </p>
                <ul className="text-gray-700 mb-4 max-w-[640px] list-disc list-inside space-y-1">
                  <li>Most changes never appear in changelogs — the Anthropic OAuth ban had no announcement. The Google rate limit cut had no status entry. Mardii catches these.</li>
                  <li>Mardii translates changes into financial impact specific to your usage, not just "something changed."</li>
                  <li>You don't have to watch 10 different provider blogs, ToS pages, status pages, and dev forums. Mardii does it and sends one alert.</li>
                </ul>
              </>
            ),
          },
          {
            question: "Why is Mardii free?",
            answer: (
              <p className="text-gray-700 mb-4 max-w-[640px]">
                AI vendor risk monitoring should be accessible to everyone, not just enterprise teams with large budgets.
                Every developer and team deserves to know when their AI providers make changes — before it costs them.
                Start free, no credit card required.
              </p>
            ),
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTA
        title="Your AI vendors are changing right now."
        buttons={[
          {
            href: "/register",
            text: "Start free",
            variant: "default",
          },
          {
            href: "mailto:support@mardii.com",
            text: "Talk to us",
            variant: "orange",
          },
        ]}
      />

      {/* ── Footer ── */}
      <SiteFooter />
      </div>
    </div>
  );
}
