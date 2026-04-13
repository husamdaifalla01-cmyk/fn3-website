import SignupFormInline from "./SignupFormInline";

export default function SignupForm() {
  return (
    <section id="signup" className="py-24 px-6 border-b border-[#1e1e1e]">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">
              Subscribe
            </span>
            <h2 className="text-[36px] md:text-[44px] font-light text-[#f0ede8] mt-4 leading-tight">
              Next issue drops
              <br />
              <span className="text-[#c9a84c]">this Tuesday.</span>
            </h2>
            <p className="text-[15px] text-[#9a9590] mt-6 leading-relaxed">
              Pro is $15/month — less than one billable hour. One workflow from one issue
              typically saves 3. Start free, upgrade when you see it.
            </p>

            {/* What you get in first email */}
            <div className="mt-6 border border-[#1e1e1e] p-5 bg-[#0d0d0d]">
              <p className="text-[11px] font-mono uppercase tracking-widest text-[#5a5550] mb-3">Your first email includes:</p>
              <div className="space-y-2">
                {[
                  "Issue #01 in full — the 8-hour reporting problem solved in 45 minutes",
                  "The ROI calculator spreadsheet template",
                  "Access to the full archive (Pro) or one issue/month (Free)",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 bg-[#c9a84c] flex-shrink-0 rounded-full" />
                    <span className="text-[13px] text-[#9a9590]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantee */}
            <div className="mt-5 flex items-start gap-3 border border-[#1e1e1e] p-5">
              <div className="w-1.5 h-1.5 bg-[#c9a84c] mt-1.5 flex-shrink-0" />
              <p className="text-[13px] text-[#9a9590] leading-relaxed">
                <strong className="text-[#f0ede8]">30-day refund guarantee.</strong> If you
                go Pro and don&apos;t find a single case study worth implementing in your
                first month, email us for a full refund. No questions.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <SignupFormInline variant="section" />

            <div className="mt-8 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
                <span className="text-[12px] text-[#5a5550]">No credit card until checkout. Cancel any time.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
                <span className="text-[12px] text-[#5a5550]">
                  Delivered every Tuesday at 8am ET.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
                <span className="text-[12px] text-[#5a5550]">
                  2,847 operators already reading.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
