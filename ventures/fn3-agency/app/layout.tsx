import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FN3 Agency | AI Automation Agency — Deploy 48 Agents in 5 Days',
  description:
    'FN3 Agency builds custom AI workforces for your business. Sales, operations, support, marketing, finance, HR — all 6 departments automated. Starting at $2,000 setup.',
  keywords: [
    'AI automation agency',
    'AI workforce',
    'AI agents',
    'business automation',
    'AI for small business',
    'AI deployment',
    'Claude AI',
    'AI consulting',
  ],
  openGraph: {
    title: 'FN3 Agency | AI Automation Agency — Deploy 48 Agents in 5 Days',
    description:
      'FN3 Agency builds custom AI workforces for your business. Sales, operations, support, marketing, finance, HR — all 6 departments automated. Starting at $2,000 setup.',
    type: 'website',
    locale: 'en_US',
    siteName: 'FN3 Agency',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FN3 Agency | AI Automation Agency — Deploy 48 Agents in 5 Days',
    description:
      'FN3 Agency builds custom AI workforces for your business. Sales, operations, support, marketing, finance, HR — all 6 departments automated. Starting at $2,000 setup.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'How long does deployment take?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'From signed agreement to live agents: 5 business days. Day 1–2 is discovery and intake (we map your workflows and tools). Days 3–4 is configuration and integration setup. Day 5 is QA testing. Monday morning, your agents are live. For Enterprise plans with complex integrations, allow up to 7 days.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What tools do you integrate with?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'We integrate with the tools your business already uses. On the Growth plan and above: HubSpot, Salesforce, Pipedrive, Google Workspace, Microsoft 365, Slack, Notion, Intercom, Zendesk, QuickBooks, and 30+ others. For Starter plans, we handle 2 core integrations. On Enterprise, we build custom integrations for any tool with an API.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Do I need technical knowledge to manage the agents?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No. You interact with your AI workforce through natural language in Slack or a simple dashboard — tell them what you need, review their output, set priorities. The only people who need to understand the technical infrastructure are us. You manage them like a team, not like software.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What if an agent makes a mistake?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "Agents are configured with guardrails for anything high-stakes: they draft, they don't send. For example, your sales agent drafts outreach emails for your review before they go out — until you've validated its judgment and want it to send autonomously. We design a 'trust ladder' during setup, starting conservative and expanding autonomy as you verify quality. Mistakes are caught by the system before they reach your customers.",
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is my business data secure?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "Yes. We use Claude Max via Anthropic's enterprise API, which does not train on your data. Business data is processed in memory only — never stored in agent context between sessions unless you explicitly configure a knowledge base. All integrations use read/write permissions you control. We sign NDAs with every client and can provide a data processing agreement for enterprise clients.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
