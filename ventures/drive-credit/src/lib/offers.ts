// Affiliate offer tracking URLs
// UTM params appended at render time via buildAffiliateUrl(baseUrl, source, medium, campaign)

const YENDO_BASE = 'https://afflat3e3.com/trk/lnk/39C31C1E-2822-4350-B92A-2693C829ED6A/?o=27618&c=918277&a=769106&k=D083BC665DB0EC415E23BE307260F10E&l=36989'
const SLAM_DUNK_BASE = 'https://afflat3e3.com/trk/lnk/39C31C1E-2822-4350-B92A-2693C829ED6A/?o=11384&c=918277&a=769106&k=D6769605225263EA1944C850E28B6F38&l=11476'

/**
 * Build a tracked affiliate URL with UTM parameters.
 * source  = traffic origin     e.g. 'tiktok' | 'instagram' | 'organic' | 'email'
 * medium  = channel type       e.g. 'video' | 'social' | 'email' | 'seo'
 * campaign= content identifier e.g. 'car-equity-hook-v1' | 'homepage-hero'
 *
 * Note: subid (MaxBounty click ID) is appended at click-time by AffiliateLink
 * or appendClickId(), NOT at build-time. This keeps pre-built URLs cacheable.
 */
export function buildAffiliateUrl(
  baseUrl: string,
  source: string,
  medium: string,
  campaign: string,
): string {
  const separator = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${separator}utm_source=${encodeURIComponent(source)}&utm_medium=${encodeURIComponent(medium)}&utm_campaign=${encodeURIComponent(campaign)}`
}

export const OFFERS = {
  yendo: {
    name: 'Yendo Credit Card',
    cpl: 112.50,
    url: YENDO_BASE,
    cta: 'Check If My Car Qualifies',
    ctaSecondary: 'See My Credit Limit',
    description: 'Use your car equity to get a real Visa credit card — no hard credit pull to check eligibility.',
    maxCredit: 10000,
    minCredit: 500,
  },
  slamDunk: {
    name: 'Slam Dunk Loans',
    cpl: 9.00,
    url: SLAM_DUNK_BASE,
    cta: 'Get Emergency Cash Now',
    description: 'Personal loans up to $50,000 — fast decision, any credit welcome.',
  },
}

// Pre-built TikTok campaign URLs — one per content pillar video
// Each gets a unique utm_campaign so we can trace which video drives conversions
export const TIKTOK_CAMPAIGN_URLS = {
  // Video 1: Education — "Your Car Equity Secret"
  carEquitySecret: buildAffiliateUrl(YENDO_BASE, 'tiktok', 'video', 'car-equity-secret-v1'),
  // Video 2: Empathy — "The Credit System is Broken"
  creditSystemBroken: buildAffiliateUrl(YENDO_BASE, 'tiktok', 'video', 'credit-system-broken-v1'),
  // Video 3: Proof — "Car as Collateral — How It Actually Works"
  howItWorksProof: buildAffiliateUrl(YENDO_BASE, 'tiktok', 'video', 'how-it-works-proof-v1'),
  // Video 4: Urgency — "Limited to 36 States"
  stateAvailability: buildAffiliateUrl(YENDO_BASE, 'tiktok', 'video', 'state-availability-v1'),
} as const

// States where Yendo is available (excludes AK, HI, IA, LA, ME, MD, MA, MN, MO, NJ, NY, OK, SD, WI)
export const YENDO_ELIGIBLE_STATES = [
  'AL','AR','AZ','CA','CO','CT','DC','DE','FL','GA','ID','IL','IN','KS',
  'KY','MI','MS','MT','NC','ND','NE','NH','NM','NV','OH','OR','PA','RI',
  'SC','TN','TX','UT','VA','VT','WA','WV','WY'
]

export const YENDO_EXCLUDED_STATES = ['AK','HI','IA','LA','ME','MD','MA','MN','MO','NJ','NY','OK','SD','WI']

// Car value estimator (rough model-year depreciation)
export function estimateCarValue(year: number, condition: 'excellent'|'good'|'fair'|'poor'): number {
  const currentYear = 2026
  const age = currentYear - year
  const baseValues: Record<string, number> = {
    excellent: 28000,
    good: 22000,
    fair: 15000,
    poor: 8000,
  }
  const base = baseValues[condition]
  const depreciation = Math.pow(0.85, age) // 15% per year
  return Math.round(base * depreciation)
}

// Yendo credit line estimate: typically 50–75% of car value, $500–$10k cap
export function estimateCreditLine(carValue: number): { low: number; high: number } {
  const low = Math.min(10000, Math.max(500, Math.round(carValue * 0.50 / 100) * 100))
  const high = Math.min(10000, Math.max(500, Math.round(carValue * 0.70 / 100) * 100))
  return { low, high }
}
