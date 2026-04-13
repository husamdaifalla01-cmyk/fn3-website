import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "AI Tools for Accountants 2026: Ranked & Reviewed | AI Tools Compass",
    template: "%s | AI Tools Compass — Accounting",
  },
  description:
    "47 AI tools for CPAs and accounting firms ranked and reviewed by practicing accountants. Honest comparisons for bookkeeping automation, AP automation, tax research, and more. Updated March 2026.",
  keywords: [
    "AI tools for accountants",
    "best AI for CPA",
    "accounting AI software 2026",
    "bookkeeping automation AI",
    "AI tax preparation software",
    "accounts payable automation",
    "AI for accounting firms",
    "CPA AI tools",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AI Tools Compass — Accounting",
    title: "AI Tools for Accountants 2026: Ranked & Reviewed",
    description:
      "Stop spending 4 hours on what AI does in 4 minutes. 47 accounting AI tools ranked by practicing CPAs — bookkeeping automation, AP automation, tax research, and more.",
    url: "https://ai-for-accountants.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools for Accountants 2026: Ranked & Reviewed",
    description:
      "47 accounting AI tools ranked by practicing CPAs. Honest reviews for bookkeeping automation, AP automation, tax research, and client communication.",
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
