'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/[0.06] bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-accent-sm">
                <span className="text-white font-bold text-sm">F3</span>
              </div>
              <span className="text-xl font-bold">
                <span className="gradient-text">FN3</span>
                <span className="text-text-secondary font-normal ml-1 text-sm">Agency</span>
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm mb-6">
              We deploy fully configured AI workforces for small and medium businesses — multiple specialized agents working 24/7 across Sales, Marketing, Support, and Operations. Built on Claude Max.
            </p>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Currently accepting Q2 2026 applications</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-5">Navigation</div>
            <ul className="space-y-3">
              {[
                { label: 'How it Works', href: '#solution' },
                { label: 'Departments', href: '#departments' },
                { label: 'ROI Calculator', href: '#roi' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Case Studies', href: '#case-studies' },
                { label: 'FAQ', href: '#faq' },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-5">Contact</div>
            <ul className="space-y-3 mb-8">
              <li>
                <a
                  href="mailto:hello@fn3.agency"
                  className="text-sm text-text-secondary hover:text-accent transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  hello@fn3.agency
                </a>
              </li>
            </ul>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNavClick('#apply')}
              className="w-full bg-accent hover:bg-accent-light text-white text-sm font-medium py-3 rounded-xl transition-all duration-200 shadow-accent-sm"
            >
              Apply for AI Workforce
            </motion.button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-text-muted">
            © 2026 FN3 Agency. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Terms of Service
            </a>
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <span>Built on</span>
              <span className="text-accent font-medium">Claude Max</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
