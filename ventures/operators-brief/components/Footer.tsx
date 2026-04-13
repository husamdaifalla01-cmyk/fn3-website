export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border border-[#1e1e1e] flex items-center justify-center">
              <span className="text-[#5a5550] text-xs font-mono">OB</span>
            </div>
            <div>
              <div className="text-[13px] font-medium text-[#9a9590]">The Operators Brief</div>
              <div className="text-[11px] font-mono text-[#5a5550]">
                AI implementation case studies — weekly
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6">
            <a href="#sample" className="text-[12px] text-[#5a5550] hover:text-[#9a9590] transition-colors">
              Sample Issue
            </a>
            <a href="#pricing" className="text-[12px] text-[#5a5550] hover:text-[#9a9590] transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-[12px] text-[#5a5550] hover:text-[#9a9590] transition-colors">
              FAQ
            </a>
            <a href="mailto:hello@theoperatorsbrief.com" className="text-[12px] text-[#5a5550] hover:text-[#9a9590] transition-colors">
              Contact
            </a>
            <a href="/privacy" className="text-[12px] text-[#5a5550] hover:text-[#9a9590] transition-colors">
              Privacy
            </a>
          </div>
        </div>

        <hr className="border-[#1e1e1e] my-8" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-[11px] font-mono text-[#5a5550]">
            © 2026 The Operators Brief. All rights reserved.
          </p>
          <p className="text-[11px] text-[#5a5550]">
            Read by 2,847 operators in 47 countries. New issue every Tuesday.
          </p>
        </div>
      </div>
    </footer>
  );
}
