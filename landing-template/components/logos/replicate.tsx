import React from "react";

export default function Replicate(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93L12 7.83V4.07zm4.87 2.93c.48.87.8 1.84.93 2.87L15.17 12l2.63-3.87zM19.93 13c-.13 1.03-.45 2-.93 2.87L16.17 12 19.93 13zm-2.93 4.87c-.87.48-1.84.8-2.87.93L12 16.17l3.87 2.63z"/>
    </svg>
  );
}