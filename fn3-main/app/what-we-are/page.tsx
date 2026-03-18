import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { PageHero } from '@/components/page-hero'
import { Philosophy } from '@/components/what-we-are/philosophy'
import { ReferenceModels } from '@/components/what-we-are/reference-models'
import { OperatingPrinciples } from '@/components/what-we-are/operating-principles'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'What We Are',
  description: 'FN3 is not an agency, a studio, or a fund. It\'s an operational holding company built to prove that AI-first operations at scale are possible with a small, precise team.',
}

export default function WhatWeAre() {
  return (
    <main>
      <Nav variant="chapter" />
      <PageHero
        chapterLabel="Chapter 01 — What We Are"
        title="The Company Behind the System"
        description="FN3 is a lean operational holding company. Not defined by its ventures — defined by the operating model that runs them. Built to prove that AI-first operations at scale are possible with a small, precise team."
      />
      <Philosophy />
      <ReferenceModels />
      <OperatingPrinciples />
      <Footer />
    </main>
  )
}
