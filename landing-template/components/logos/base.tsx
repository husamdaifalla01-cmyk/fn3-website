import React from "react";

export default function Base(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="12" fill="#0052FF"/>
      <path d="M12 5.5C8.41 5.5 5.5 8.41 5.5 12C5.5 15.59 8.41 18.5 12 18.5C15.39 18.5 18.17 15.85 18.47 12.5H12.75V11.5H18.47C18.17 8.15 15.39 5.5 12 5.5Z" fill="white"/>
    </svg>
  );
}
