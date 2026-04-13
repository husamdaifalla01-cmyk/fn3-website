import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = "https://invoice-flow-two-blush.vercel.app";

export const metadata: Metadata = {
  title: "InvoiceFlow | AI Invoice Processing for Accounting Firms",
  description:
    "AI-powered invoice extraction, GL coding, and QuickBooks/Xero export. Process 50 invoices in minutes. Built for accounting firms.",
  keywords: [
    "invoice processing automation",
    "automate invoice processing",
    "AI invoice processing",
    "GL coding software",
    "QuickBooks invoice export",
    "Xero invoice automation",
    "accounting automation",
    "accounts payable automation",
    "bookkeeping software",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "InvoiceFlow | AI Invoice Processing for Accounting Firms",
    description:
      "AI-powered invoice extraction, GL coding, and QuickBooks/Xero export. Process 50 invoices in minutes. Built for accounting firms.",
    url: siteUrl,
    siteName: "InvoiceFlow",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoiceFlow | AI Invoice Processing for Accounting Firms",
    description:
      "AI-powered invoice extraction, GL coding, and QuickBooks/Xero export. Process 50 invoices in minutes. Built for accounting firms.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "InvoiceFlow",
  url: siteUrl,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "AccountingApplication",
  operatingSystem: "Web",
  description:
    "AI-powered invoice processing software for accounting firms. Automatically extracts data from PDF and image invoices, assigns GL codes, detects duplicates, and exports to QuickBooks or Xero.",
  offers: [
    {
      "@type": "Offer",
      name: "Solo",
      price: "149",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "149",
        priceCurrency: "USD",
        billingIncrement: 1,
        unitCode: "MON",
      },
    },
    {
      "@type": "Offer",
      name: "Team",
      price: "299",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "299",
        priceCurrency: "USD",
        billingIncrement: 1,
        unitCode: "MON",
      },
    },
    {
      "@type": "Offer",
      name: "Firm",
      price: "499",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "499",
        priceCurrency: "USD",
        billingIncrement: 1,
        unitCode: "MON",
      },
    },
  ],
  featureList: [
    "AI invoice data extraction from PDF and image files",
    "Automatic GL code assignment",
    "Duplicate invoice detection",
    "QuickBooks IIF and CSV export",
    "Xero CSV export",
    "Batch invoice processing",
    "Approval workflow",
    "Anomaly alerts",
    "GL rules engine",
    "Client portal",
  ],
  screenshot: `${siteUrl}/og-screenshot.png`,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "47",
    bestRating: "5",
    worstRating: "1",
  },
  publisher: {
    "@type": "Organization",
    name: "InvoiceFlow",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0f0f14] text-[#e2e8f0]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
