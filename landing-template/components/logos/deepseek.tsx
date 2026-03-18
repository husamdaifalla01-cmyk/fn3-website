import React from "react";

export default function DeepSeek(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
      <text x="12" y="16" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">
        DS
      </text>
    </svg>
  );
}