import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { HomeHero } from '@/components/home/hero'
import { IdentityStrip } from '@/components/home/identity-strip'
import { MethodSection } from '@/components/home/method-section'
import { NumbersStrip } from '@/components/home/numbers-strip'
import { ChapterEntry } from '@/components/home/chapter-entry'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'FN3 — Operational Intelligence',
  description: 'FN3 builds and deploys AI-powered operational intelligence. Agents, automation, and systems that make businesses run at a level most teams never reach.',
  openGraph: { title: 'FN3 — Operational Intelligence' },
}

export default function Home() {
  return (
    <main>
      <Nav variant="home" />
      <HomeHero />
      <IdentityStrip />
      <MethodSection />
      <NumbersStrip />
      <ChapterEntry />
      <Footer />
    </main>
  )
}
