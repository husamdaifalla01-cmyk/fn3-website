import React from "react";

export default function HuggingFace(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3 6c.83 0 1.5.67 1.5 1.5S9.83 11 9 11s-1.5-.67-1.5-1.5S8.17 8 9 8zm6 0c.83 0 1.5.67 1.5 1.5S15.83 11 15 11s-1.5-.67-1.5-1.5S14.17 8 15 8zm-3 8c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/>
    </svg>
  );
}