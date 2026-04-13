import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Operators Brief — AI Implementation Case Studies With Real Numbers",
  description:
    "Weekly deep-dives into real AI implementations. Actual ROI numbers, exact tools, what failed, what worked. For COOs, Ops Directors, and business owners building AI systems that make money.",
  keywords: [
    "AI implementation",
    "AI case studies",
    "ROI",
    "operations",
    "business automation",
    "AI for business",
  ],
  openGraph: {
    title: "The Operators Brief",
    description:
      "AI implementation case studies with real numbers. No hype. No theory. Just what worked.",
    type: "website",
    url: "https://theoperatorsbrief.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Operators Brief",
    description:
      "AI implementation case studies with real numbers. No hype. No theory. Just what worked.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg antialiased">{children}</body>
    </html>
  );
}
