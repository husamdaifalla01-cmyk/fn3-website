import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-commerce Ops Brain | AI Operations for Shopify Merchants",
  description: "AI inventory forecasting, customer service automation, and product content for Shopify merchants. Prevent stockouts, automate WISMO tickets, generate copy. From $199/month.",
  openGraph: {
    title: "E-commerce Ops Brain | AI Operations for Shopify Merchants",
    description: "AI inventory forecasting, customer service automation, and product content for Shopify merchants. Prevent stockouts, automate WISMO tickets, generate copy. From $199/month.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "E-commerce Ops Brain",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "199",
    "highPrice": "399",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "312"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" style={{ background: '#080c14', color: '#f1f5f9' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        {children}
      </body>
    </html>
  );
}
