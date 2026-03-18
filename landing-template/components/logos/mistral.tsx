import React from "react";

export default function Mistral(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="2" y="2" width="5" height="5" fill="#ff7000"/>
      <rect x="9" y="2" width="5" height="5" fill="#ff7000"/>
      <rect x="16" y="2" width="6" height="5" fill="#ff7000"/>
      <rect x="2" y="9" width="5" height="5" fill="#ff7000"/>
      <rect x="9" y="9" width="5" height="5" fill="#ff7000"/>
      <rect x="16" y="9" width="6" height="5" fill="#ff7000"/>
      <rect x="9" y="16" width="5" height="6" fill="#ff7000"/>
      <rect x="16" y="16" width="6" height="6" fill="#ff7000"/>
    </svg>
  );
}
