"use client";

import { useState } from "react";

interface Props {
  variant?: "hero" | "section";
}

export default function SignupFormInline({ variant = "section" }: Props) {
  const [email, setEmail] = useState("");
  const [tier, setTier] = useState<"free" | "pro">("free");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tier }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setEmail("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to subscribe. Try again.";
      setStatus("error");
      setErrorMsg(message);
    }
  };

  if (status === "success") {
    return (
      <div className="border border-[#c9a84c]/30 bg-[#c9a84c]/5 p-5 max-w-md">
        <p className="text-[14px] text-[#c9a84c] font-medium mb-2">
          You&apos;re in.
        </p>
        <p className="text-[13px] text-[#9a9590] leading-relaxed">
          Issue #01 is on its way — the full case study on cutting client reporting from 8 hours to 45 minutes. Check your inbox in the next few minutes.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
      {/* Tier selector */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setTier("free")}
          className={`flex-1 py-2 text-[12px] font-mono uppercase tracking-wider border transition-colors ${
            tier === "free"
              ? "border-[#c9a84c] text-[#c9a84c] bg-[#c9a84c]/5"
              : "border-[#1e1e1e] text-[#5a5550] hover:border-[#2a2a2a]"
          }`}
        >
          Free — $0
        </button>
        <button
          type="button"
          onClick={() => setTier("pro")}
          className={`flex-1 py-2 text-[12px] font-mono uppercase tracking-wider border transition-colors ${
            tier === "pro"
              ? "border-[#c9a84c] text-[#c9a84c] bg-[#c9a84c]/5"
              : "border-[#1e1e1e] text-[#5a5550] hover:border-[#2a2a2a]"
          }`}
        >
          Pro — $15/mo
        </button>
      </div>

      {/* Email input + button */}
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-3 text-[14px] bg-[#111111] border border-[#1e1e1e] text-[#f0ede8] placeholder-[#5a5550] focus:outline-none focus:border-[#c9a84c] transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-[#c9a84c] text-[#0a0a0a] text-[13px] font-medium px-5 py-3 hover:bg-[#d4b660] disabled:opacity-50 transition-colors whitespace-nowrap"
        >
          {status === "loading" ? "..." : tier === "pro" ? "Start Pro" : "Subscribe Free"}
        </button>
      </div>

      {errorMsg && (
        <p className="text-[12px] text-red-400">{errorMsg}</p>
      )}
    </form>
  );
}
