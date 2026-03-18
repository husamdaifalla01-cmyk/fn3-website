import { Nav } from '@/components/nav'
import { HomeHero } from '@/components/home/hero'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Nav variant="home" />
      <HomeHero />
      <Footer />
    </main>
  )
}