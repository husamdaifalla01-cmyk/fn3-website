"use client";

import Aurora from "./aurora";

export default function AuroraHeroBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <Aurora
        colorStops={["#ff8c42", "#64ffda", "#ff6b35"]}
        amplitude={0.6}
        blend={0.7}
        speed={0.8}
      />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black" />
    </div>
  );
}
