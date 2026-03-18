import * as React from "react";

interface FN3LogoProProps {
  className?: string;
  variant?: "full" | "icon" | "wordmark";
  theme?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
}

export default function FN3LogoPro({
  className,
  variant = "full",
  theme = "light",
  size = "md"
}: FN3LogoProProps) {
  const textColor = theme === "light" ? "#1f2937" : "#ffffff";
  const accentColor = theme === "light" ? "#0ea5e9" : "#38bdf8";

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl"
  };

  if (variant === "icon") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg
          className={sizeClasses[size]}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="fn3-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>

          {/* Main shape - modern hexagon */}
          <path
            d="M24 3L41 13.5V34.5L24 45L7 34.5V13.5L24 3Z"
            fill="url(#fn3-gradient)"
            stroke="none"
          />

          {/* Inner symbol - interconnected network */}
          <g transform="translate(24,24)">
            {/* Core nodes */}
            <circle cx="0" cy="-8" r="2.5" fill="white" fillOpacity="0.95" />
            <circle cx="-7" cy="4" r="2.5" fill="white" fillOpacity="0.95" />
            <circle cx="7" cy="4" r="2.5" fill="white" fillOpacity="0.95" />

            {/* Connection lines */}
            <path
              d="M0,-5.5 L-4.5,1.5 M0,-5.5 L4.5,1.5 M-4.5,1.5 L4.5,1.5"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.9"
              strokeLinecap="round"
            />

            {/* Center dot */}
            <circle cx="0" cy="0" r="1" fill="white" fillOpacity="0.8" />
          </g>

          {/* Outer glow */}
          <path
            d="M24 3L41 13.5V34.5L24 45L7 34.5V13.5L24 3Z"
            fill="none"
            stroke="url(#fn3-gradient)"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
        </svg>
      </div>
    );
  }

  if (variant === "wordmark") {
    return (
      <div className={`flex items-center ${className}`}>
        <h1 className={`${textSizes[size]} font-bold`} style={{ color: textColor }}>
          <span style={{ color: accentColor }}>Flow</span>
          <span>Nexis</span>
          <span style={{ color: accentColor }}>3</span>
        </h1>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <div className="relative">
        <svg
          className={sizeClasses[size]}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="fn3-gradient-full" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>

          {/* Main hexagon */}
          <path
            d="M24 3L41 13.5V34.5L24 45L7 34.5V13.5L24 3Z"
            fill="url(#fn3-gradient-full)"
            stroke="none"
          />

          {/* Inner network symbol */}
          <g transform="translate(24,24)">
            <circle cx="0" cy="-8" r="2.5" fill="white" fillOpacity="0.95" />
            <circle cx="-7" cy="4" r="2.5" fill="white" fillOpacity="0.95" />
            <circle cx="7" cy="4" r="2.5" fill="white" fillOpacity="0.95" />

            <path
              d="M0,-5.5 L-4.5,1.5 M0,-5.5 L4.5,1.5 M-4.5,1.5 L4.5,1.5"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.9"
              strokeLinecap="round"
            />

            <circle cx="0" cy="0" r="1" fill="white" fillOpacity="0.8" />
          </g>
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <h1 className={`${textSizes[size]} font-bold leading-tight`} style={{ color: textColor }}>
          <span style={{ color: accentColor }}>Flow</span>
          <span>Nexis</span>
          <span style={{ color: accentColor }}>3</span>
        </h1>
        <span
          className="text-xs font-medium opacity-70 leading-tight"
          style={{ color: textColor }}
        >
          Platform of Platforms
        </span>
      </div>
    </div>
  );
}