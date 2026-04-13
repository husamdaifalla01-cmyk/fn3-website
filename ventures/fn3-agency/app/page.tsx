'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import HowItWorks from '@/components/HowItWorks'
import Departments from '@/components/Departments'
import ROICalculator from '@/components/ROICalculator'
import ROIProof from '@/components/ROIProof'
import IndustryResults from '@/components/IndustryResults'
import VideoPlaceholder from '@/components/VideoPlaceholder'
import QualificationQuiz from '@/components/QualificationQuiz'
import Pricing from '@/components/Pricing'
import CaseStudies from '@/components/CaseStudies'
import FAQ from '@/components/FAQ'
import ApplicationForm from '@/components/ApplicationForm'
import Footer from '@/components/Footer'
import InstantQuote from '@/components/InstantQuote'
import NewsletterCapture from '@/components/NewsletterCapture'

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Departments />
      <ROICalculator />
      <ROIProof />
      <IndustryResults />
      <VideoPlaceholder />
      <QualificationQuiz />
      <Pricing />
      <CaseStudies />
      <NewsletterCapture />
      <FAQ />
      <ApplicationForm />
      <Footer />
      <InstantQuote />
    </main>
  )
}
