"use client";

import { useState } from "react";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e1e1e] bg-[#0a0a0a]/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border border-[#c9a84c] flex items-center justify-center">
            <span className="text-[#c9a84c] text-xs font-mono font-medium">OB</span>
          </div>
          <span className="text-[#f0ede8] text-sm font-medium tracking-wide">
            The Operators Brief
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#sample"
            className="text-[#9a9590] text-sm hover:text-[#f0ede8] transition-colors"
          >
            Sample Issue
          </a>
          <a
            href="#pricing"
            className="text-[#9a9590] text-sm hover:text-[#f0ede8] transition-colors"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="text-[#9a9590] text-sm hover:text-[#f0ede8] transition-colors"
          >
            FAQ
          </a>
          <a
            href="#signup"
            className="bg-[#c9a84c] text-[#0a0a0a] text-sm font-medium px-4 py-2 hover:bg-[#d4b660] transition-colors"
          >
            Subscribe Free
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#9a9590] hover:text-[#f0ede8]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {menuOpen ? (
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#1e1e1e] bg-[#0a0a0a] px-6 py-4 flex flex-col gap-4">
          <a href="#sample" className="text-[#9a9590] text-sm hover:text-[#f0ede8]" onClick={() => setMenuOpen(false)}>
            Sample Issue
          </a>
          <a href="#pricing" className="text-[#9a9590] text-sm hover:text-[#f0ede8]" onClick={() => setMenuOpen(false)}>
            Pricing
          </a>
          <a href="#faq" className="text-[#9a9590] text-sm hover:text-[#f0ede8]" onClick={() => setMenuOpen(false)}>
            FAQ
          </a>
          <a
            href="#signup"
            className="bg-[#c9a84c] text-[#0a0a0a] text-sm font-medium px-4 py-2 text-center hover:bg-[#d4b660] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Subscribe Free
          </a>
        </div>
      )}
    </nav>
  );
}
