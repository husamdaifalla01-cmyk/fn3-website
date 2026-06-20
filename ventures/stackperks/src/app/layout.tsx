// Root layout — bare passthrough.
// The [locale]/layout.tsx renders <html> and <body> for all lifestyle routes.
// Finance/api/quiz routes have their own layout that provides the HTML shell.
import type { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
