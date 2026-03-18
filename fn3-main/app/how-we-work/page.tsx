import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { PageHero } from '@/components/page-hero'
import { OfferStatement } from '@/components/how-we-work/offer-statement'
import { CapabilitiesList } from '@/components/how-we-work/capabilities-list'
import { EngagementProcess } from '@/components/how-we-work/engagement-process'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'How We Work',
  description: 'Six capabilities. One integrated system. The same operational intelligence FN3 uses to run its ventures, available to external clients.',
}

export default function HowWeWork() {
  return (
    <main>
      <Nav variant="chapter" />
      <PageHero
        chapterLabel="Chapter 03 — How We Work"
        title="The Operating Model, Available"
        description="The same operational intelligence FN3 uses to run its ventures is available to external clients. Six service capabilities. One integrated system. No agency overhead."
      />
      <OfferStatement />
      <CapabilitiesList />
      <EngagementProcess />
      <Footer />
    </main>
  )
}
