import Link from "next/link";

const features = [
  {
    icon: "👤",
    title: "Employee Onboarding",
    description:
      "First-day checklist to 90-day plan. State-specific I-9 and W-4 guidance included.",
    href: "/onboarding",
  },
  {
    icon: "📋",
    title: "Policy Generator",
    description:
      "Employee handbook sections written in 60 seconds. Non-discrimination, PTO, remote work, disciplinary process.",
    href: "/policies",
  },
  {
    icon: "⭐",
    title: "Performance Reviews",
    description:
      "Fair, documented, legally defensible reviews. No bias. No blank page.",
    href: "/reviews",
  },
  {
    icon: "💼",
    title: "Job Descriptions",
    description:
      "EEOC-compliant JDs that attract the right candidates. Post to Indeed-ready.",
    href: "/jobs",
  },
  {
    icon: "📄",
    title: "Termination Docs",
    description:
      "Separation agreements, COBRA notices, final pay calculations. State law applied automatically.",
    href: "/termination",
  },
  {
    icon: "💬",
    title: "HR Q&A",
    description:
      "Ask anything. 'What's the notice period for a salaried employee in California?' Answered in seconds.",
    href: "/qa",
  },
];

const testimonials = [
  {
    quote:
      "I was the HR department at a 22-person company. HRMind turned what used to be a 3-hour task into 10 minutes.",
    name: "Lisa M.",
    title: "Office Manager",
  },
  {
    quote:
      "We hired our first employee in Texas. HRMind generated the offer letter, onboarding checklist, and handbook sections. I didn't have to google anything.",
    name: "Tom K.",
    title: "Founder",
  },
  {
    quote:
      "The performance review generator is worth the entire subscription. I used to dread these. Now I run them quarterly.",
    name: "Sarah J.",
    title: "Team Lead",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$149",
    period: "/month",
    description: "For small teams just getting started",
    features: [
      "5 employees",
      "All 6 HR tools",
      "1 user seat",
      "50-state law coverage",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$299",
    period: "/month",
    description: "For growing teams that need more",
    features: [
      "25 employees",
      "All 6 HR tools",
      "3 user seats",
      "50-state law coverage",
      "Slack notifications",
      "Priority email support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$499",
    period: "/month",
    description: "For teams that need it all",
    features: [
      "Unlimited employees",
      "All 6 HR tools",
      "Unlimited user seats",
      "50-state law coverage",
      "Slack notifications",
      "Priority phone & email support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HR</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">HRMind</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-gray-900 transition-colors">Testimonials</a>
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
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-20 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            AI-powered HR for small business
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Your first HR person shouldn&apos;t cost{" "}
            <span className="text-blue-600">$80,000/year.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            HRMind handles onboarding, policies, performance reviews, and job
            descriptions — compliantly — for $149/month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white text-lg px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg shadow-blue-200"
            >
              Start Free Trial — No Credit Card
            </Link>
            <a
              href="#features"
              className="border border-gray-200 text-gray-700 text-lg px-8 py-4 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors font-medium"
            >
              See How It Works
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">12,400+</div>
              <div className="text-sm text-gray-500 mt-1">HR documents generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">50</div>
              <div className="text-sm text-gray-500 mt-1">State employment law coverage</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">8 hrs/wk</div>
              <div className="text-sm text-gray-500 mt-1">Average time saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything HR. Nothing complicated.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Six tools that cover 90% of what a small business HR department actually does.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200 cursor-pointer"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-gray-50 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              HR managers love HRMind
            </h2>
            <p className="text-xl text-gray-600">
              From office managers to founders, here&apos;s what real users say.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  &quot;{t.quote}&quot;
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
      <section id="pricing" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Less than one hour of an HR consultant&apos;s time. Every month. For everything.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border-2 flex flex-col ${
                  plan.highlighted
                    ? "border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-200"
                    : "border-gray-200 bg-white"
                }`}
              >
                {plan.highlighted && (
                  <div className="text-blue-200 text-xs font-semibold uppercase tracking-wide mb-4">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3
                    className={`text-xl font-bold mb-1 ${
                      plan.highlighted ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm mb-4 ${
                      plan.highlighted ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-4xl font-bold ${
                        plan.highlighted ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm ${
                        plan.highlighted ? "text-blue-200" : "text-gray-500"
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <svg
                        className={`w-5 h-5 flex-shrink-0 ${
                          plan.highlighted ? "text-blue-200" : "text-blue-600"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span
                        className={`text-sm ${
                          plan.highlighted ? "text-blue-100" : "text-gray-600"
                        }`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className={`text-center py-3 px-6 rounded-xl font-semibold text-sm transition-colors ${
                    plan.highlighted
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Stop doing HR the hard way.
          </h2>
          <p className="text-blue-100 text-xl mb-8">
            Join thousands of small businesses that handle HR compliantly — without a full-time hire.
          </p>
          <Link
            href="/dashboard"
            className="bg-white text-blue-600 text-lg px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors font-semibold inline-block"
          >
            Start Your Free Trial Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">HR</span>
            </div>
            <span className="font-bold text-gray-900">HRMind</span>
          </div>
          <p className="text-sm text-gray-500">
            &copy; 2026 HRMind. Not legal advice. Consult an employment attorney for complex matters.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-700">Privacy</a>
            <a href="#" className="hover:text-gray-700">Terms</a>
            <a href="#" className="hover:text-gray-700">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
