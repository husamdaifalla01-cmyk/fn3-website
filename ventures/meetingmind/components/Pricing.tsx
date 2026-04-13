'use client'

import Link from 'next/link'

const plans = [
  {
    name: 'Starter',
    price: 49,
    description: 'Perfect for solo consultants and freelancers',
    meetings: '20 meetings/month',
    users: '1 user',
    features: [
      'AI summary + action items',
      'Decision log',
      'Follow-up email draft',
      'Meeting history (90 days)',
      'One-click copy',
    ],
    cta: 'Start free trial',
    highlighted: false,
  },
  {
    name: 'Team',
    price: 99,
    description: 'For small teams who run multiple meetings weekly',
    meetings: '100 meetings/month',
    users: '5 users',
    features: [
      'Everything in Starter',
      'Slack export',
      'Team dashboard',
      'Meeting history (1 year)',
      'Priority support',
    ],
    cta: 'Start free trial',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Agency',
    price: 149,
    description: 'For agencies managing multiple clients',
    meetings: 'Unlimited meetings',
    users: '20 users',
    features: [
      'Everything in Team',
      'White-label follow-up emails',
      'Client workspaces',
      'Unlimited history',
      'Dedicated support',
    ],
    cta: 'Start free trial',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600">
            14-day free trial. No credit card required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-brand-600 text-white shadow-2xl shadow-brand-500/30 scale-105'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1.5 rounded-full">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-xl font-bold mb-1 ${
                    plan.highlighted ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm ${
                    plan.highlighted ? 'text-brand-100' : 'text-gray-500'
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span
                  className={`text-5xl font-bold ${
                    plan.highlighted ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  ${plan.price}
                </span>
                <span
                  className={`text-sm ${
                    plan.highlighted ? 'text-brand-100' : 'text-gray-500'
                  }`}
                >
                  /month
                </span>
              </div>

              <div
                className={`text-sm font-medium mb-1 ${
                  plan.highlighted ? 'text-brand-100' : 'text-gray-500'
                }`}
              >
                {plan.meetings} · {plan.users}
              </div>

              <ul className="space-y-3 my-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <span
                      className={plan.highlighted ? 'text-brand-100' : 'text-brand-500'}
                    >
                      ✓
                    </span>
                    <span
                      className={plan.highlighted ? 'text-brand-50' : 'text-gray-700'}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/analyze"
                className={`block w-full text-center font-semibold py-3 rounded-xl transition-colors ${
                  plan.highlighted
                    ? 'bg-white text-brand-600 hover:bg-brand-50'
                    : 'bg-brand-600 text-white hover:bg-brand-700'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          All plans include 14-day free trial. Cancel anytime.
        </p>
      </div>
    </section>
  )
}
