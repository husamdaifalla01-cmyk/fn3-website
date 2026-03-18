import React from "react";

export default function MardiiLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Modern stylized M with gradient */}
      <defs>
        <linearGradient id="mardiiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff7b00" />
          <stop offset="100%" stopColor="#ff4500" />
        </linearGradient>
      </defs>

      {/* Stylized M shape */}
      <path
        d="M5 22V10C5 9 5.5 8 6.5 8C7.5 8 8 9 8.5 10L14 18L19.5 10C20 9 20.5 8 21.5 8C22.5 8 23 9 23 10V22C23 23 22.5 23 22 23C21.5 23 21 23 21 22V13L16 20C15.5 20.5 15 21 14 21C13 21 12.5 20.5 12 20L7 13V22C7 23 6.5 23 6 23C5.5 23 5 23 5 22Z"
        fill="url(#mardiiGradient)"
      />

      {/* Dot accent for the 'i' in Mardii */}
      <circle cx="14" cy="5" r="1.5" fill="#ff7b00" />
    </svg>
  );
}
