import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MeetingMind — AI Meeting Intelligence for Small Teams',
  description:
    'Paste your transcript. Get a summary, action items with owners, decisions, and a ready-to-send follow-up email in 30 seconds.',
  keywords: 'meeting notes, action items, meeting summary, AI meeting assistant, follow-up email',
  openGraph: {
    title: 'MeetingMind — AI Meeting Intelligence',
    description: 'Turn meeting transcripts into summaries, action items, and follow-up emails instantly.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
