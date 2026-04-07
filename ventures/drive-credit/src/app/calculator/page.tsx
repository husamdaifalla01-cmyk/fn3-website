import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import CarCalculator from '@/components/CarCalculator'
import { YENDO_CALCULATOR_PAGE, SLAM_DUNK_CALCULATOR_PAGE } from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'Car Equity Credit Calculator — How Much Credit Can Your Car Get You?',
  description: 'Free calculator: see how much credit you could get using your car as collateral. Takes 60 seconds. No credit score check.',
}

export default function CalculatorPage() {
  return (
    <>
      <NavBar />
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="text-center mb-12">
          <div className="section-label">Free Tool</div>
          <h1 className="text-3xl md:text-5xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>Car Equity Credit Estimator</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#78716c' }}>See how much credit your car could unlock in 60 seconds. No credit check. No commitment.</p>
        </div>
        <CarCalculator yendoUrl={YENDO_CALCULATOR_PAGE} slamDunkUrl={SLAM_DUNK_CALCULATOR_PAGE} />
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-xl font-black mb-4" style={{ color: '#1c1917' }}>How We Calculate Your Estimate</h2>
          <p className="mb-4 text-sm leading-relaxed" style={{ color: '#78716c' }}>This calculator uses average depreciation curves for US vehicles to estimate your car's current market value. We then apply a typical loan-to-value range (50–70%) to estimate a potential credit line.</p>
          <p className="mb-4 text-sm leading-relaxed" style={{ color: '#78716c' }}>The actual credit limit you receive depends on your specific vehicle's condition, mileage, market demand in your area, and Yendo's underwriting criteria at the time of application.</p>
          <p className="text-sm leading-relaxed" style={{ color: '#a8a29e' }}>Estimates are for educational purposes only and do not represent a loan or credit offer. Apply directly to see your actual approved limit. The initial application uses a soft inquiry and does not affect your credit score.</p>
        </div>
      </section>
    </>
  )
}
