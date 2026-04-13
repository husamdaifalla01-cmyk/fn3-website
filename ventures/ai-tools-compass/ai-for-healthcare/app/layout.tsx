import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "AI Tools for Healthcare Professionals 2026: Ranked & Reviewed | AI Tools Compass",
    template: "%s | AI Tools Compass — Healthcare",
  },
  description:
    "38 AI tools for physicians and healthcare organizations ranked and reviewed by practicing clinicians. HIPAA-compliant reviews for ambient documentation, clinical decision support, prior authorization, and population health. Updated March 2026.",
  keywords: [
    "AI tools for physicians 2026",
    "best AI clinical documentation",
    "ambient AI scribe",
    "healthcare AI tools",
    "HIPAA compliant AI",
    "AI prior authorization",
    "clinical decision support AI",
    "ambient documentation physicians",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AI Tools Compass — Healthcare",
    title: "AI Tools for Healthcare Professionals 2026: Ranked & Reviewed",
    description:
      "AI that handles admin so you can focus on patients. 38 healthcare AI tools ranked by practicing clinicians — ambient documentation, prior auth automation, clinical decision support, and more.",
    url: "https://ai-for-healthcare-pied.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools for Healthcare Professionals 2026: Ranked & Reviewed",
    description:
      "38 healthcare AI tools ranked by practicing clinicians. HIPAA-compliant reviews for ambient documentation, prior auth, clinical decision support, and population health.",
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
