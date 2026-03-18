import * as React from "react";

interface FN3LogoProps {
  className?: string;
  variant?: "full" | "icon" | "wordmark";
  theme?: "light" | "dark";
}

export default function FN3Logo({
  className,
  variant = "full",
  theme = "light"
}: FN3LogoProps) {
  const textColor = theme === "light" ? "text-gray-900" : "text-white";
  const gradientFrom = theme === "light" ? "#0ea5e9" : "#38bdf8";
  const gradientTo = theme === "light" ? "#0284c7" : "#0ea5e9";

  if (variant === "icon") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="fn3-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradientFrom} />
              <stop offset="100%" stopColor={gradientTo} />
            </linearGradient>
          </defs>
          {/* Outer hexagon */}
          <path
            d="M20 2L35 12V28L20 38L5 28V12L20 2Z"
            fill="url(#fn3-gradient)"
            stroke="none"
          />
          {/* Inner pattern */}
          <g transform="translate(20,20)">
            {/* Three interconnected nodes representing Flow, Nexis, 3 */}
            <circle cx="-6" cy="-4" r="3" fill="white" fillOpacity="0.9" />
            <circle cx="6" cy="-4" r="3" fill="white" fillOpacity="0.9" />
            <circle cx="0" cy="6" r="3" fill="white" fillOpacity="0.9" />

            {/* Connecting lines */}
            <path
              d="M-3,-4 L3,-4 M-3,-1 L-1,3 M3,-1 L1,3"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.8"
              fill="none"
            />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === "wordmark") {
    return (
      <div className={`flex items-center ${className}`}>
        <span className={`text-2xl font-bold ${textColor}`}>
          <span style={{
            background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Flow
          </span>
          <span className={textColor}>Nexis</span>
          <span style={{
            background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            3
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <div className="relative">
        <svg
          width="32"
          height="32"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="fn3-gradient-full" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradientFrom} />
              <stop offset="100%" stopColor={gradientTo} />
            </linearGradient>
          </defs>
          {/* Outer hexagon */}
          <path
            d="M20 2L35 12V28L20 38L5 28V12L20 2Z"
            fill="url(#fn3-gradient-full)"
            stroke="none"
          />
          {/* Inner pattern */}
          <g transform="translate(20,20)">
            {/* Three interconnected nodes */}
            <circle cx="-6" cy="-4" r="3" fill="white" fillOpacity="0.9" />
            <circle cx="6" cy="-4" r="3" fill="white" fillOpacity="0.9" />
            <circle cx="0" cy="6" r="3" fill="white" fillOpacity="0.9" />

            {/* Connecting lines */}
            <path
              d="M-3,-4 L3,-4 M-3,-1 L-1,3 M3,-1 L1,3"
              stroke="white"
              strokeWidth="1.5"
              strokeOpacity="0.8"
              fill="none"
            />
          </g>
        </svg>
        {/* Subtle glow effect */}
        <div
          className="absolute inset-0 rounded-lg blur-sm opacity-30"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`
          }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span className={`text-xl font-bold leading-tight ${textColor}`}>
          <span style={{
            background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Flow
          </span>
          <span className={textColor}>Nexis</span>
          <span style={{
            background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            3
          </span>
        </span>
        <span className={`text-xs font-medium opacity-70 ${textColor}`}>
          Platform of Platforms
        </span>
      </div>
    </div>
  );
}