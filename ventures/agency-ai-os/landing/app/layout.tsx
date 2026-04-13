import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Agency AI OS",
  "description": "Complete AI operating system for agency owners. 25 proposal templates, pricing methodology, 6-phase delivery framework, and objection scripts — everything needed to run a professional AI consulting practice.",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "297",
    "highPrice": "997",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "847"
  }
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agency AI OS — The Complete Operating System for AI Agency Owners",
  description:
    "Stop reinventing your business from scratch. Agency AI OS is the system that took consultants from guessing on pricing to closing $10K–$50K/month engagements — with confidence.",
  openGraph: {
    title: "Agency AI OS — The Complete Operating System for AI Agency Owners",
    description:
      "25 proposal templates, pricing methodology, client delivery framework, and an AI service menu. Everything you need to run a professional AI consulting practice.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
