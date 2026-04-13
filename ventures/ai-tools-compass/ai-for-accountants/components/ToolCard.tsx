import { Tool } from "@/data/tools";
import Link from "next/link";

interface ToolCardProps {
  tool: Tool;
  rank?: number;
}

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${
            i < full
              ? "text-yellow-400"
              : i === full && half
              ? "text-yellow-400"
              : "text-white/20"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm text-white/70">
        {rating.toFixed(1)} ({reviewCount?.toLocaleString() ?? 0})
      </span>
    </div>
  );
}

// We need to access reviewCount from the tool — accept it through props
export default function ToolCard({ tool, rank }: ToolCardProps) {
  return (
    <div className="group relative rounded-xl border border-white/10 bg-[#111] p-6 transition-all hover:border-[#2563eb]/40 hover:shadow-lg hover:shadow-[#2563eb]/5">
      {rank && (
        <div className="absolute -top-3 left-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#2563eb] text-xs font-bold text-white">
          {rank}
        </div>
      )}

      {tool.badge && (
        <div className="absolute -top-3 right-4 rounded-full bg-[#2563eb]/20 px-3 py-0.5 text-xs font-medium text-[#2563eb]">
          {tool.badge}
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563eb]/20 text-sm font-bold text-[#2563eb]">
            {tool.logoPlaceholder}
          </div>
          <div>
            <h3 className="font-semibold text-white">{tool.name}</h3>
            <p className="text-xs text-white/50">{tool.tagline}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-white">
            {tool.pricing.startingPrice}
            {tool.pricing.startingPrice !== "Custom" && (
              <span className="text-xs font-normal text-white/50">
                {tool.pricing.priceUnit}
              </span>
            )}
          </p>
          {tool.pricing.free && (
            <span className="text-xs text-green-400">Free tier available</span>
          )}
        </div>
      </div>

      <div className="mt-3">
        <StarRating rating={tool.rating} reviewCount={tool.reviewCount} />
      </div>

      <p className="mt-3 text-sm text-white/70 line-clamp-2">{tool.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {tool.features.slice(0, 3).map((f) => (
          <span
            key={f}
            className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/60"
          >
            {f}
          </span>
        ))}
        {tool.features.length > 3 && (
          <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/40">
            +{tool.features.length - 3} more
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <a
          href={tool.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex-1 rounded-lg bg-[#2563eb] py-2 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Try {tool.name} Free
        </a>
        <a
          href={tool.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/20 hover:text-white"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}
