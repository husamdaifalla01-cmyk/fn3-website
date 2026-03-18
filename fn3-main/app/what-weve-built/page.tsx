import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { PageHero } from '@/components/page-hero'
import { VenturesIntro } from '@/components/what-weve-built/ventures-intro'
import { VenturesList } from '@/components/what-weve-built/ventures-list'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: "What We've Built",
  description: 'Five ventures running on the FN3 operating model. Different industries, same infrastructure. Proof the system works.',
}

export default function WhatWeveBuilt() {
  return (
    <main>
      <Nav variant="chapter" />
      <PageHero
        chapterLabel="Chapter 02 — What We've Built"
        title="The System In The Wild"
        description="Five ventures. Each one a live test of the FN3 operating model. Different industries, same infrastructure. This is what the system looks like when it runs."
      />
      <VenturesIntro />
      <VenturesList />
      <Footer />
    </main>
  )
}
