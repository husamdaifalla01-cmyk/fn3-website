import { Nav } from '@/components/nav'
import { HomeHero } from '@/components/home/hero'
import { IdentityStrip } from '@/components/home/identity-strip'
import { MethodSection } from '@/components/home/method-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Nav variant="home" />
      <HomeHero />
      <IdentityStrip />
      <MethodSection />
      <Footer />
    </main>
  )
}