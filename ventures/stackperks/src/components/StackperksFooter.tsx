import Link from 'next/link'

const LINKS = [
  { section: 'Deals', items: [
    { label: 'Amazon Prime Young Adults', href: '/prime-young-adults' },
    { label: 'Student Credit Cards', href: '/student-credit-cards' },
    { label: 'Insurance Deals', href: '/insurance-deals' },
    { label: 'All Offers', href: '/articles' },
  ]},
  { section: 'Learn', items: [
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Blog', href: '/articles' },
    { label: 'FAQ', href: '/faq' },
  ]},
  { section: 'Company', items: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
  ]},
]

export default function StackperksFooter() {
  return (
    <footer
      style={{
        background: '#0a0918',
        borderTop: '1px solid rgba(167,139,250,0.10)',
        color: 'rgba(240,238,255,0.50)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 no-underline mb-4">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #10b981)', color: 'white' }}
              >
                S
              </div>
              <span className="font-black text-lg text-white" style={{ letterSpacing: '-0.02em' }}>
                Stack<span style={{ color: '#a78bfa' }}>perks</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed" style={{ maxWidth: '220px' }}>
              The best deals for 18–24-year-olds. Stack every perk. Pay nothing.
            </p>
          </div>

          {/* Nav sections */}
          {LINKS.map((section) => (
            <div key={section.section}>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-white" style={{ opacity: 0.5 }}>
                {section.section}
              </h4>
              <ul className="space-y-2.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm no-underline transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclosure + copyright */}
        <div
          className="border-t pt-8 space-y-3"
          style={{ borderColor: 'rgba(167,139,250,0.08)' }}
        >
          <p className="text-xs leading-relaxed" style={{ maxWidth: '680px' }}>
            <strong className="text-white" style={{ opacity: 0.6 }}>Independent guide:</strong>{' '}
            Stackperks is an independent guide. We are not affiliated with, endorsed by, or sponsored by Amazon.
            Amazon, Amazon Prime, and Prime are trademarks of Amazon.com, Inc. or its affiliates. Membership
            pricing, eligibility, and terms are set by Amazon and may change — always confirm current details
            on Amazon&apos;s own website before signing up.
          </p>
          <p className="text-xs leading-relaxed" style={{ maxWidth: '680px' }}>
            <strong className="text-white" style={{ opacity: 0.6 }}>Affiliate disclosure:</strong>{' '}
            Stackperks is an Amazon Associate and participates in affiliate programs with CJ Affiliate and MaxBounty.
            We earn a commission when you sign up through our links — at no cost to you. We only feature offers
            we&apos;ve verified as legitimate and valuable for the 18–24 age group.
          </p>
          <p className="text-xs">
            © {new Date().getFullYear()} Stackperks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
