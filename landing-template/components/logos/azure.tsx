import React from "react";

export default function Azure(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#0078D4" />
      <text x="12" y="16" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">
        AZ
      </text>
    </svg>
  );
}