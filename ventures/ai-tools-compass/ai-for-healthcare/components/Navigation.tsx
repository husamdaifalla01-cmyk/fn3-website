"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">
              AI Tools<span className="text-[#0891b2]">Compass</span>
            </span>
            <span className="rounded bg-[#0891b2]/20 px-2 py-0.5 text-xs font-medium text-[#0891b2]">
              Healthcare
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link href="/compare/best-ai-ambient-documentation-tools" className="text-sm text-white/70 transition-colors hover:text-white">
              AI Scribes
            </Link>
            <Link href="/compare/best-ai-for-clinical-decision-support" className="text-sm text-white/70 transition-colors hover:text-white">
              Clinical AI
            </Link>
            <Link href="/compare/best-ai-for-prior-authorization" className="text-sm text-white/70 transition-colors hover:text-white">
              Prior Auth
            </Link>
            <Link href="#newsletter" className="rounded-lg bg-[#0891b2] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
              Weekly Updates
            </Link>
          </div>

          <button className="rounded p-2 text-white/70 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              <Link href="/compare/best-ai-ambient-documentation-tools" className="text-sm text-white/70" onClick={() => setMenuOpen(false)}>AI Scribes</Link>
              <Link href="/compare/best-ai-for-clinical-decision-support" className="text-sm text-white/70" onClick={() => setMenuOpen(false)}>Clinical AI</Link>
              <Link href="/compare/best-ai-for-prior-authorization" className="text-sm text-white/70" onClick={() => setMenuOpen(false)}>Prior Auth</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
