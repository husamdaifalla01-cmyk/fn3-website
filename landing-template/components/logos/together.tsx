import React from "react";

export default function Together(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.83L18.17 12 12 18.17 5.83 12 12 5.83zm0 2.34L8.17 12 12 15.83 15.83 12 12 8.17z"/>
    </svg>
  );
}