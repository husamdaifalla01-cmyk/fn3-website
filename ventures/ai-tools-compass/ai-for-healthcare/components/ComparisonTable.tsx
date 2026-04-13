import { Tool } from "@/data/tools";

interface ComparisonTableProps {
  tools: Tool[];
  accentColor?: string;
}

function Cell({ value }: { value: string | boolean | number }) {
  if (typeof value === "boolean") {
    return <span className={value ? "text-green-400" : "text-red-400"}>{value ? "Yes" : "No"}</span>;
  }
  return <span className="text-white/80">{String(value)}</span>;
}

export default function ComparisonTable({ tools, accentColor = "#0891b2" }: ComparisonTableProps) {
  const rows: { label: string; getValue: (t: Tool) => string | boolean | number }[] = [
    { label: "Starting Price", getValue: (t) => `${t.pricing.startingPrice}${t.pricing.startingPrice !== "Custom" ? t.pricing.priceUnit : ""}` },
    { label: "Free Tier", getValue: (t) => t.pricing.free },
    { label: "Rating", getValue: (t) => `${t.rating}/5 (${t.reviewCount.toLocaleString()} reviews)` },
    { label: "HIPAA Compliant", getValue: (t) => t.hipaaCompliant },
    { label: "Best For", getValue: (t) => t.bestFor },
    { label: "Key Strength", getValue: (t) => t.pros[0] },
    { label: "Main Limitation", getValue: (t) => t.cons[0] },
    { label: "Enterprise Plan", getValue: (t) => t.pricing.enterprise },
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-[#111]">
            <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-white/50">Feature</th>
            {tools.map((tool, i) => (
              <th key={tool.id} className="p-4 text-left" style={{ borderTop: i === 0 ? `2px solid ${accentColor}` : undefined }}>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                    {tool.logoPlaceholder}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{tool.name}</p>
                    {tool.badge && <span className="text-xs font-medium" style={{ color: accentColor }}>{tool.badge}</span>}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={row.label} className={`border-b border-white/5 ${rowIdx % 2 === 0 ? "bg-[#0a0a0a]" : "bg-[#111]/50"}`}>
              <td className="p-4 text-white/50">{row.label}</td>
              {tools.map((tool) => (
                <td key={tool.id} className="p-4"><Cell value={row.getValue(tool)} /></td>
              ))}
            </tr>
          ))}
          <tr className="bg-[#111]">
            <td className="p-4 text-white/50">Learn More</td>
            {tools.map((tool) => (
              <td key={tool.id} className="p-4">
                <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow" className="inline-block rounded-lg px-4 py-2 text-xs font-medium text-white" style={{ backgroundColor: accentColor }}>
                  {tool.name} →
                </a>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
