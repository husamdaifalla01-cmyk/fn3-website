import Link from "next/link";
import {
  FileText,
  DollarSign,
  Brain,
  Calendar,
  RefreshCw,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Complete Narratives",
    description:
      "Statement of need, program description, goals and objectives, evaluation plan — all in one click. Tailored to each funder's guidelines.",
  },
  {
    icon: DollarSign,
    title: "Budget Justification",
    description:
      "Line-by-line budget justification written in funder language. Shows impact per dollar.",
  },
  {
    icon: Brain,
    title: "Funder Intelligence",
    description:
      "Different funders want different things. NIH wants rigor. Community foundations want stories. GrantWriter knows the difference.",
  },
  {
    icon: Calendar,
    title: "Deadline Tracker",
    description:
      "Never miss a submission. Track all your active grants with status, deadline, and amount.",
  },
  {
    icon: RefreshCw,
    title: "Revision Assistant",
    description:
      "Paste reviewer feedback. GrantWriter rewrites the weak sections.",
  },
];

const testimonials = [
  {
    quote:
      "We raised $340,000 in our first year using GrantWriter AI. I used to spend 3 weeks on a major grant. Now it takes me 4 hours.",
    name: "Maria G.",
    title: "Development Director, community health nonprofit",
  },
  {
    quote:
      "The federal grant template alone is worth the subscription. It knows exactly what NIH wants in a narrative.",
    name: "Dr. James W.",
    title: "Research Administrator",
  },
  {
    quote:
      "We're a 2-person shop. GrantWriter lets us compete against organizations with 10-person development teams.",
    name: "Aisha T.",
    title: "Executive Director, youth services nonprofit",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$99",
    period: "/month",
    description: "Perfect for small nonprofits getting started with AI.",
    features: ["5 grants/month", "All templates", "1 user", "Email support"],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Professional",
    price: "$199",
    period: "/month",
    description: "For active development staff writing grants regularly.",
    features: [
      "20 grants/month",
      "Federal templates (NIH, NSF, SAMHSA)",
      "3 users",
      "Deadline tracker",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Team",
    price: "$299",
    period: "/month",
    description: "Unlimited power for high-volume grant shops.",
    features: [
      "Unlimited grants",
      "All features",
      "10 users",
      "Revision assistant",
      "Dedicated support",
    ],
    cta: "Start Free Trial",
    highlight: false,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">
              GrantWriter AI
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a
              href="#features"
              className="hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="hover:text-gray-900 transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="hover:text-gray-900 transition-colors"
            >
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className="text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-24 px-6 text-center bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-medium px-4 py-2 rounded-full mb-8">
            <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
            Trusted by 1,200+ nonprofits and research organizations
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Write grant proposals in{" "}
            <span className="text-emerald-600">hours, not weeks.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            GrantWriter AI generates complete narratives, executive summaries,
            evaluation plans, and budget justifications tailored to each funder
            — in under 60 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100"
            >
              Start writing grants
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Browse templates
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { stat: "3,200+", label: "grants written" },
              { stat: "$47M", label: "in funding secured by our users" },
              { stat: "68%", label: "first-submission success rate" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {item.stat}
                </div>
                <div className="text-sm text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything a grant writer needs
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              From federal proposals to community foundation letters, GrantWriter
              handles every section of every grant.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-8 rounded-2xl border border-gray-100 hover:border-emerald-100 hover:shadow-lg hover:shadow-emerald-50 transition-all"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
            {/* 6th card */}
            <div className="p-8 rounded-2xl bg-emerald-600 text-white">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-5">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Federal, Foundation &amp; More
              </h3>
              <p className="text-emerald-100 leading-relaxed">
                Templates for NIH, NSF, SAMHSA, community foundations, corporate
                grants, and government programs — all optimized for each funder
                type.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Grant writers love GrantWriter AI
            </h2>
            <p className="text-lg text-gray-500">
              Join thousands of nonprofits already winning more grants.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-gray-500">
              14-day free trial. No credit card required.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-8 rounded-2xl border-2 flex flex-col ${
                  plan.highlight
                    ? "border-emerald-500 shadow-xl shadow-emerald-100 relative"
                    : "border-gray-100"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-emerald-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-sm text-gray-600"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-colors ${
                    plan.highlight
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-emerald-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to write your next grant?
          </h2>
          <p className="text-emerald-100 text-lg mb-8">
            Join 1,200+ nonprofits using GrantWriter AI to win more funding in
            less time.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-50 transition-colors"
          >
            Start your free trial
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">GrantWriter AI</span>
          </div>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} GrantWriter AI. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-600">
              Terms
            </a>
            <a href="#" className="hover:text-gray-600">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
