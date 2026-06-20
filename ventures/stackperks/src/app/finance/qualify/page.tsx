import type { Metadata } from 'next'
import QualifyClient from './QualifyClient'

export const metadata: Metadata = {
  title: 'See If You Qualify — Car Equity Credit Card | Mintbrooks',
  description: 'Check in 60 seconds if your car qualifies for a credit card up to $10,000. No hard credit pull. No deposit. Works in 36+ states.',
  alternates: { canonical: 'https://mintbrooks.com/finance/qualify' },
}

export default function QualifyPage() {
  return <QualifyClient />
}
