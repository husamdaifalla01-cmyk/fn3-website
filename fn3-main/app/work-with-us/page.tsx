import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { PageHero } from '@/components/page-hero'
import { ContactSection } from '@/components/work-with-us/contact-section'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Work With Us',
  description: "No intake form. No discovery call booking widget. If FN3 is the right fit, reach out directly.",
}

export default function WorkWithUs() {
  return (
    <main>
      <Nav variant="chapter" />
      <PageHero
        chapterLabel="Chapter 04 — Work With Us"
        title="Let's Talk Operations"
        description="No intake form. No discovery call booking widget. If you've read this far, you know if FN3 is the right fit. Reach out directly."
      />
      <ContactSection />
      <Footer />
    </main>
  )
}
