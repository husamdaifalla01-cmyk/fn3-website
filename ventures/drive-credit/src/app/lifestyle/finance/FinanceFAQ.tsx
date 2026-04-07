'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'How does DriveCredit work?',
    a: 'DriveCredit lets you use your vehicle as collateral for a real Visa credit card. You keep driving your car — there\'s no title transfer. The card reports to all three credit bureaus, helping you build credit history.',
  },
  {
    q: 'Does checking my eligibility affect my credit score?',
    a: 'No. Checking if you qualify uses a soft pull, which has no impact on your credit score. Only if you choose to proceed does a hard inquiry occur.',
  },
  {
    q: 'What credit score do I need?',
    a: 'DriveCredit is designed for people rebuilding or establishing credit. There\'s no minimum credit score requirement to check eligibility.',
  },
  {
    q: 'How is this different from a secured credit card?',
    a: 'With a secured card, your cash deposit is the collateral and you lose access to those funds. With DriveCredit, your vehicle is the collateral — your cash stays in your pocket.',
  },
  {
    q: 'How long does it take to see credit score improvement?',
    a: 'Most cardholders see measurable improvement within 3-6 months of consistent on-time payments and low utilization.',
  },
]

export default function FinanceFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  const toggle = (i: number) => setOpen(open === i ? null : i)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {FAQS.map((faq, i) => (
        <div
          key={i}
          style={{
            borderBottom: '1px solid rgba(26,23,20,0.08)',
          }}
        >
          <button
            onClick={() => toggle(i)}
            aria-expanded={open === i}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              padding: '24px 0',
              textAlign: 'left',
            }}
          >
            <span
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(16px, 2vw, 19px)',
                fontWeight: 700,
                color: '#1A1714',
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
              }}
            >
              {faq.q}
            </span>
            <span
              aria-hidden="true"
              style={{
                flexShrink: 0,
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: '1.5px solid rgba(29,58,47,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s, border-color 0.2s',
                background: open === i ? '#1D3A2F' : 'transparent',
                borderColor: open === i ? '#1D3A2F' : 'rgba(29,58,47,0.25)',
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{
                  transition: 'transform 0.3s ease',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
              >
                <path
                  d="M6 2v8M2 6h8"
                  stroke={open === i ? '#FDFAF6' : '#1D3A2F'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </button>

          {/* Answer panel */}
          <div
            style={{
              overflow: 'hidden',
              maxHeight: open === i ? '400px' : '0',
              transition: 'max-height 0.35s ease',
            }}
          >
            <p
              style={{
                fontSize: '16px',
                color: '#6B6557',
                lineHeight: 1.75,
                margin: '0 0 24px',
                maxWidth: '640px',
                paddingRight: '44px',
              }}
            >
              {faq.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
