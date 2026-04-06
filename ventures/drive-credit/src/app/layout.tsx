import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://mintbrooks.com";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Mintbrooks",
      url: SITE_URL,
      description: "Independent educational resource about car-secured credit products.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Mintbrooks",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export const metadata: Metadata = {
  title: "Mintbrooks — Use Your Car to Get a Real Credit Card",
  description: "Turn your car into a credit line. Get a Visa credit card using your vehicle as collateral — no hard credit pull to check eligibility. Available in 36+ states.",
  keywords: "car equity credit card, credit card bad credit, use car as collateral, no credit check credit card, credit card 500 credit score",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mintbrooks — Use Your Car to Get a Real Credit Card",
    description: "Turn your car into a credit line. No hard credit pull to check eligibility.",
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-default.png`,
        width: 1200,
        height: 630,
        alt: "Mintbrooks — Car-Secured Credit Cards for Bad Credit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mintbrooks — Use Your Car to Get a Real Credit Card",
    description: "Turn your car into a credit line. No hard credit pull to check eligibility.",
    images: [`${SITE_URL}/og-default.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ExitIntentPopup />
        {children}
        {/* Plausible Analytics */}
        <Script
          defer
          data-domain="mintbrooks.com"
          src="https://plausible.io/js/script.tagged-events.js"
          strategy="afterInteractive"
        />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
