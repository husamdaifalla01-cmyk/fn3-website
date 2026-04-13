import { Tool } from "@/data/tools";

interface ToolCardProps {
  tool: Tool;
  rank?: number;
}

export default function ToolCard({ tool, rank }: ToolCardProps) {
  return (
    <div className="group relative rounded-xl border border-white/10 bg-[#111] p-6 transition-all hover:border-[#059669]/40 hover:shadow-lg hover:shadow-[#059669]/5">
      {rank && (
        <div className="absolute -top-3 left-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#059669] text-xs font-bold text-white">
          {rank}
        </div>
      )}
      {tool.badge && (
        <div className="absolute -top-3 right-4 rounded-full bg-[#059669]/20 px-3 py-0.5 text-xs font-medium text-[#059669]">
          {tool.badge}
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#059669]/20 text-sm font-bold text-[#059669]">
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
              <span className="text-xs font-normal text-white/50">{tool.pricing.priceUnit}</span>
            )}
          </p>
          {tool.pricing.free && <span className="text-xs text-green-400">Free tier available</span>}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1">
        {"★".repeat(Math.round(tool.rating))}
        <span className="ml-1 text-sm text-white/70">{tool.rating} ({tool.reviewCount.toLocaleString()})</span>
      </div>

      <p className="mt-3 text-sm text-white/70 line-clamp-2">{tool.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {tool.features.slice(0, 3).map((f) => (
          <span key={f} className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/60">{f}</span>
        ))}
        {tool.features.length > 3 && (
          <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/40">+{tool.features.length - 3} more</span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <a
          href={tool.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex-1 rounded-lg bg-[#059669] py-2 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
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
