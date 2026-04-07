'use client'

import { useState, useEffect } from 'react'
import { OFFERS, buildAffiliateUrl } from '@/lib/offers'
import { trackAffiliateClick, appendClickId } from '@/lib/analytics'

// States where Yendo is NOT available
const EXCLUDED_STATES = new Set([
  'AK', 'HI', 'IA', 'LA', 'ME', 'MD', 'MA', 'MN', 'MO', 'NJ', 'NY', 'OK', 'SD', 'WI',
])

const US_STATES = [
  ['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'],
  ['CA', 'California'], ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'],
  ['DC', 'Washington DC'], ['FL', 'Florida'], ['GA', 'Georgia'], ['HI', 'Hawaii'],
  ['ID', 'Idaho'], ['IL', 'Illinois'], ['IN', 'Indiana'], ['IA', 'Iowa'],
  ['KS', 'Kansas'], ['KY', 'Kentucky'], ['LA', 'Louisiana'], ['ME', 'Maine'],
  ['MD', 'Maryland'], ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'],
  ['MS', 'Mississippi'], ['MO', 'Missouri'], ['MT', 'Montana'], ['NE', 'Nebraska'],
  ['NV', 'Nevada'], ['NH', 'New Hampshire'], ['NJ', 'New Jersey'], ['NM', 'New Mexico'],
  ['NY', 'New York'], ['NC', 'North Carolina'], ['ND', 'North Dakota'], ['OH', 'Ohio'],
  ['OK', 'Oklahoma'], ['OR', 'Oregon'], ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'],
  ['SC', 'South Carolina'], ['SD', 'South Dakota'], ['TN', 'Tennessee'], ['TX', 'Texas'],
  ['UT', 'Utah'], ['VT', 'Vermont'], ['VA', 'Virginia'], ['WA', 'Washington'],
  ['WV', 'West Virginia'], ['WI', 'Wisconsin'], ['WY', 'Wyoming'],
]

type Step = 1 | 2 | 3 | 'result-yes' | 'result-no-state' | 'result-no-car'

function ProgressBar({ step }: { step: number }) {
  const pct = Math.min(100, Math.round((step / 3) * 100))
  return (
    <div className="w-full h-1.5 rounded-full mb-8" style={{ background: 'rgba(255,255,255,0.1)' }}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, background: '#d97706' }}
      />
    </div>
  )
}

const WHAT_HAPPENS_NEXT = [
  {
    q: 'What happens after I click the button?',
    a: "You'll land on Yendo's secure website. They'll ask for your car's make, model, year, and mileage to estimate your equity — no money, no commitment, no impact on your credit score.",
  },
  {
    q: 'Will this hurt my credit score?',
    a: "No. Yendo's eligibility check is a soft pull only. It does not appear on your credit report and has zero impact on your score.",
  },
  {
    q: 'How long does it take?',
    a: "About 2 minutes. You'll see your estimated credit limit on the spot. If you want to move forward with a full application, that step takes another 5–10 minutes.",
  },
  {
    q: 'What if my car has a lien?',
    a: "Yendo can still work with cars that have a lien — as long as you have equity in the vehicle. They'll assess your payoff balance and remaining equity during the check.",
  },
]

function WhatHappensNext() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.07em' }}>
        WHAT HAPPENS NEXT
      </p>
      <div className="flex flex-col gap-2">
        {WHAT_HAPPENS_NEXT.map((item, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
            >
              <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {item.q}
              </span>
              <span className="ml-3 flex-shrink-0 text-xs" style={{ color: '#d97706' }}>
                {open === i ? '▲' : '▼'}
              </span>
            </button>
            {open === i && (
              <div className="px-4 pb-3">
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {item.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function QualifyPage() {
  const [step, setStep] = useState<Step>(1)
  const [state, setState] = useState('')
  const [geoDetected, setGeoDetected] = useState(false)

  // Auto-detect state from IP on mount
  useEffect(() => {
    fetch('/api/geo')
      .then((r) => r.json())
      .then((data: { state: string | null; eligible: boolean | null }) => {
        if (data.state) {
          setState(data.state)
          setGeoDetected(true)
        }
      })
      .catch(() => {
        // Silently fail — user selects manually
      })
  }, [])

  const YENDO_QUALIFY = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'social', 'qualify-quiz-result')
  const SLAM_QUALIFY = buildAffiliateUrl(OFFERS.slamDunk.url, 'organic', 'social', 'qualify-quiz-fallback')

  function handleYendoClick() {
    const clickId = trackAffiliateClick('qualify-quiz', 'yendo')
    const url = appendClickId(YENDO_QUALIFY, clickId)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  function handleSlamDunkClick() {
    const clickId = trackAffiliateClick('qualify-quiz', 'slamDunk')
    const url = appendClickId(SLAM_QUALIFY, clickId)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const stepNum = typeof step === 'number' ? step : 4

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: '#1c1917' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-xl font-black tracking-tight text-white">
            Mint<span style={{ color: '#fbbf24' }}>brooks</span>
          </span>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-7"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {/* Step 1: Own a car? */}
          {step === 1 && (
            <>
              <ProgressBar step={1} />
              <p className="text-xs font-semibold mb-3" style={{ color: '#d97706', letterSpacing: '0.08em' }}>
                QUESTION 1 OF 3
              </p>
              <h1 className="text-2xl font-black text-white mb-2 leading-tight">
                Do you own a car?
              </h1>
              <p className="text-sm mb-7" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Any make or model — as long as you own it.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="w-full py-4 rounded-xl font-bold text-white text-base transition-all active:scale-95"
                  style={{ background: '#d97706' }}
                >
                  Yes, I own a car ✓
                </button>
                <button
                  onClick={() => setStep('result-no-car')}
                  className="w-full py-4 rounded-xl font-semibold text-sm transition-all active:scale-95"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.6)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  No, I don&apos;t have a car
                </button>
              </div>
            </>
          )}

          {/* Step 2: Which state? */}
          {step === 2 && (
            <>
              <ProgressBar step={2} />
              <p className="text-xs font-semibold mb-3" style={{ color: '#d97706', letterSpacing: '0.08em' }}>
                QUESTION 2 OF 3
              </p>
              <h1 className="text-2xl font-black text-white mb-2 leading-tight">
                Which state do you live in?
              </h1>
              <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Eligibility varies by state.
                {geoDetected && (
                  <span
                    className="ml-2 inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399' }}
                  >
                    📍 Auto-detected
                  </span>
                )}
              </p>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full py-3 px-4 rounded-xl text-sm mb-5 appearance-none"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: state ? 'white' : 'rgba(255,255,255,0.4)',
                }}
              >
                <option value="">Select your state...</option>
                {US_STATES.map(([code, name]) => (
                  <option key={code} value={code} style={{ background: '#292524', color: 'white' }}>
                    {name}
                  </option>
                ))}
              </select>
              <button
                disabled={!state}
                onClick={() => {
                  if (EXCLUDED_STATES.has(state)) {
                    setStep('result-no-state')
                  } else {
                    setStep(3)
                  }
                }}
                className="w-full py-4 rounded-xl font-bold text-white text-base transition-all active:scale-95 disabled:opacity-40"
                style={{ background: '#d97706' }}
              >
                Continue →
              </button>
            </>
          )}

          {/* Step 3: Credit score? */}
          {step === 3 && (
            <>
              <ProgressBar step={3} />
              <p className="text-xs font-semibold mb-3" style={{ color: '#d97706', letterSpacing: '0.08em' }}>
                QUESTION 3 OF 3
              </p>
              <h1 className="text-2xl font-black text-white mb-2 leading-tight">
                What&apos;s your credit situation?
              </h1>
              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
                This check is <strong style={{ color: 'white' }}>soft pull only</strong> — it won&apos;t affect your score.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'No credit history yet', tag: 'no-history' },
                  { label: 'Credit score under 580', tag: 'bad-credit' },
                  { label: 'Score 580–669 (Fair)', tag: 'fair-credit' },
                  { label: 'Score 670+ (Good/Excellent)', tag: 'good-credit' },
                ].map(({ label, tag }) => (
                  <button
                    key={tag}
                    onClick={() => setStep('result-yes')}
                    className="w-full py-3.5 px-4 rounded-xl text-sm font-semibold text-left transition-all active:scale-95"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.85)',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Result: Qualifies */}
          {step === 'result-yes' && (
            <>
              <div className="text-center mb-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
                  style={{ background: 'rgba(52,211,153,0.15)' }}
                >
                  ✓
                </div>
                <h1 className="text-2xl font-black text-white mb-2">
                  You likely qualify!
                </h1>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Based on your answers, you may be eligible for a{' '}
                  <strong style={{ color: 'white' }}>$500–$10,000 car-secured Visa card</strong>.
                  The eligibility check is completely free and won&apos;t hurt your credit score.
                </p>
              </div>

              {/* Social proof trust strip */}
              <div
                className="rounded-xl px-4 py-3 mb-4 flex flex-col gap-2"
                style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.15)' }}
              >
                <div className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  <span style={{ color: '#34d399' }}>✓</span>
                  <span><strong style={{ color: 'white' }}>Most car owners</strong> who apply get approved for $1,000+</span>
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  <span style={{ color: '#34d399' }}>✓</span>
                  <span><strong style={{ color: 'white' }}>No hard pull</strong> — your credit score is safe</span>
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  <span style={{ color: '#34d399' }}>✓</span>
                  <span><strong style={{ color: 'white' }}>2-minute check</strong> — see your limit instantly</span>
                </div>
              </div>

              <button
                onClick={handleYendoClick}
                className="w-full py-4 rounded-xl font-bold text-white text-base mb-3 transition-all active:scale-95"
                style={{ background: '#d97706' }}
              >
                See If My Car Qualifies →
              </button>
              <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Soft pull only &bull; No effect on credit score &bull; Takes 2 minutes
              </p>
              <p className="text-xs text-center mt-4" style={{ color: 'rgba(255,255,255,0.2)' }}>
                #ad &bull; Mintbrooks may earn a commission from referrals at no cost to you.
              </p>
              <WhatHappensNext />
            </>
          )}

          {/* Result: State not supported */}
          {step === 'result-no-state' && (
            <>
              <div className="text-center mb-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
                  style={{ background: 'rgba(251,191,36,0.12)' }}
                >
                  ⚠
                </div>
                <h1 className="text-2xl font-black text-white mb-2">
                  Not available in {state} yet
                </h1>
                <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  The car-secured card isn&apos;t available in your state right now. But you still have options — here are bad-credit loan alternatives that work in all 50 states.
                </p>
              </div>
              <button
                onClick={handleSlamDunkClick}
                className="w-full py-4 rounded-xl font-bold text-white text-base mb-3 transition-all active:scale-95"
                style={{ background: '#7c3aed' }}
              >
                See My Loan Options →
              </button>
              <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
                #ad &bull; Mintbrooks may earn a commission from referrals.
              </p>
            </>
          )}

          {/* Result: No car */}
          {step === 'result-no-car' && (
            <>
              <div className="text-center mb-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
                  style={{ background: 'rgba(251,191,36,0.12)' }}
                >
                  🔍
                </div>
                <h1 className="text-2xl font-black text-white mb-2">
                  No car? We still have options.
                </h1>
                <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Car-secured cards require vehicle ownership. But there are bad-credit personal loan options that don&apos;t require a car — and they work in all 50 states.
                </p>
              </div>
              <button
                onClick={handleSlamDunkClick}
                className="w-full py-4 rounded-xl font-bold text-white text-base mb-3 transition-all active:scale-95"
                style={{ background: '#7c3aed' }}
              >
                See My Options →
              </button>
              <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
                #ad &bull; Mintbrooks may earn a commission from referrals.
              </p>
            </>
          )}
        </div>

        {/* FTC footer */}
        <p className="text-xs text-center mt-5" style={{ color: 'rgba(255,255,255,0.18)' }}>
          Mintbrooks is an independent educational site. We are not a lender.
          Results are not a guarantee of approval.{' '}
          <a href="/" style={{ color: 'rgba(255,255,255,0.3)' }}>
            mintbrooks.com
          </a>
        </p>
      </div>
    </div>
  )
}
