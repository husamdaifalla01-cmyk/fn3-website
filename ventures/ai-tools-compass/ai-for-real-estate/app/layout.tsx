import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "AI Tools for Real Estate Agents 2026: Ranked & Reviewed | AI Tools Compass",
    template: "%s | AI Tools Compass — Real Estate",
  },
  description:
    "43 AI tools for real estate agents ranked and reviewed by practicing agents. Honest comparisons for CRM, lead generation, listing descriptions, predictive analytics, and client retention. Updated March 2026.",
  keywords: [
    "AI tools for real estate agents",
    "best AI for realtors 2026",
    "real estate CRM AI",
    "AI lead generation real estate",
    "listing description AI",
    "real estate predictive analytics",
    "AI for real estate teams",
    "real estate technology 2026",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AI Tools Compass — Real Estate",
    title: "AI Tools for Real Estate Agents 2026: Ranked & Reviewed",
    description:
      "AI tools that actually close deals, not just generate leads. 43 real estate AI tools ranked by practicing agents — CRM, lead gen, listing copy, predictive analytics, and more.",
    url: "https://ai-for-real-estate.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools for Real Estate Agents 2026: Ranked & Reviewed",
    description:
      "43 real estate AI tools ranked by practicing agents. Honest reviews for CRM, lead generation, listing descriptions, and predictive analytics.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a] text-white">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
