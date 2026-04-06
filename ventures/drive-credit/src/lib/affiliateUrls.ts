/**
 * Pre-built affiliate URLs with UTM attribution.
 * Import from here instead of using OFFERS.*.url directly.
 *
 * Naming: YENDO_<PAGE>_<PLACEMENT> or SLAM_DUNK_<PAGE>_<PLACEMENT>
 * source  = traffic channel (organic, tiktok, instagram, email, etc.)
 * medium  = format (seo, video, social, email)
 * campaign = exact placement identifier for analytics
 */
import { OFFERS, buildAffiliateUrl } from './offers'

// ─── Homepage ──────────────────────────────────────────────────────────────
export const YENDO_HOMEPAGE_NAV       = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'homepage-nav')
export const YENDO_HOMEPAGE_HERO      = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'homepage-hero')
export const YENDO_HOMEPAGE_CALCULATOR = buildAffiliateUrl(OFFERS.yendo.url,   'organic', 'seo', 'homepage-calculator')
export const YENDO_HOMEPAGE_HOW_IT_WORKS = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'homepage-how-it-works')
export const YENDO_HOMEPAGE_TESTIMONIALS = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'homepage-testimonials')
export const YENDO_HOMEPAGE_DEMO      = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'homepage-demo')
export const YENDO_HOMEPAGE_FINAL_CTA = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'homepage-final-cta')
export const YENDO_EXIT_POPUP         = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'exit-intent-popup')

export const SLAM_DUNK_HOMEPAGE_CALCULATOR = buildAffiliateUrl(OFFERS.slamDunk.url, 'organic', 'seo', 'homepage-calculator')
export const SLAM_DUNK_HOMEPAGE_FOOTER     = buildAffiliateUrl(OFFERS.slamDunk.url, 'organic', 'seo', 'homepage-footer')

// ─── Calculator page ────────────────────────────────────────────────────────
export const YENDO_CALCULATOR_PAGE    = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'calculator-page')
export const SLAM_DUNK_CALCULATOR_PAGE = buildAffiliateUrl(OFFERS.slamDunk.url,'organic', 'seo', 'calculator-page')

// ─── Bad credit guide ────────────────────────────────────────────────────────
export const YENDO_BAD_CREDIT_HERO    = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'bad-credit-guide-hero')
export const YENDO_BAD_CREDIT_CARD    = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'bad-credit-guide-card')
export const YENDO_BAD_CREDIT_CTA     = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'bad-credit-guide-cta')

// ─── 500 credit score guide ─────────────────────────────────────────────────
export const YENDO_500_HERO           = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', '500-score-guide-hero')
export const YENDO_500_CARD           = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', '500-score-guide-card')
export const YENDO_500_CTA            = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', '500-score-guide-cta')

// ─── Use car as collateral ──────────────────────────────────────────────────
export const YENDO_COLLATERAL_CTA     = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'collateral-guide-cta')

// ─── No credit history guide ────────────────────────────────────────────────
export const YENDO_NO_CREDIT_HERO     = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'no-credit-guide-hero')
export const YENDO_NO_CREDIT_CARD     = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'no-credit-guide-card')
export const YENDO_NO_CREDIT_CTA      = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'no-credit-guide-cta')

// ─── Credit card no deposit guide ───────────────────────────────────────────
export const YENDO_NO_DEPOSIT_HERO    = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'no-deposit-guide-hero')
export const YENDO_NO_DEPOSIT_CTA     = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'no-deposit-guide-cta')

// ─── Emergency cash guide ────────────────────────────────────────────────────
export const SLAM_DUNK_EMERGENCY_CARD  = buildAffiliateUrl(OFFERS.slamDunk.url, 'organic', 'seo', 'emergency-guide-card')
export const SLAM_DUNK_EMERGENCY_CTA   = buildAffiliateUrl(OFFERS.slamDunk.url, 'organic', 'seo', 'emergency-guide-cta')
export const YENDO_EMERGENCY_CARD      = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'emergency-guide-card')
export const YENDO_EMERGENCY_CTA       = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'emergency-guide-cta')

// ─── How it works page ───────────────────────────────────────────────────────
export const YENDO_HOW_IT_WORKS_CTA   = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'how-it-works-cta')

// ─── Bad credit no deposit guide ───────────────────────────────────────────
export const YENDO_BAD_CREDIT_NO_DEPOSIT_HERO = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'bad-credit-no-deposit-hero')
export const YENDO_BAD_CREDIT_NO_DEPOSIT_CTA  = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'bad-credit-no-deposit-cta')

// ─── Car equity credit card reviews ────────────────────────────────────────
export const YENDO_CAR_EQUITY_REVIEW_HERO = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'car-equity-review-hero')
export const YENDO_CAR_EQUITY_REVIEW_CTA  = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'car-equity-review-cta')

// ─── Yendo review page ─────────────────────────────────────────────────────
export const YENDO_REVIEW_HERO = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'yendo-review-hero')
export const YENDO_REVIEW_CTA  = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'yendo-review-cta')

// ─── How to build credit with bad credit guide ───────────────────────────────
export const YENDO_BUILD_CREDIT_HERO = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'build-credit-guide-hero')
export const YENDO_BUILD_CREDIT_CTA  = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'build-credit-guide-cta')

// ─── Car equity vs secured cards comparison ───────────────────────────────────
export const YENDO_COMPARISON_HERO = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'comparison-page-hero')
export const YENDO_COMPARISON_TABLE = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'comparison-page-table')
export const YENDO_COMPARISON_CTA  = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'comparison-page-cta')

// ─── TikTok / social traffic (set utm_source dynamically per video) ──────────
// Usage: buildAffiliateUrl(OFFERS.yendo.url, 'tiktok', 'video', 'car-equity-hook-v1')
export { buildAffiliateUrl }

// ─── Qualify quiz page ────────────────────────────────────────────────────────
export const YENDO_QUALIFY_QUIZ       = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'social', 'qualify-quiz-result')
export const SLAM_DUNK_QUALIFY_QUIZ   = buildAffiliateUrl(OFFERS.slamDunk.url, 'organic', 'social', 'qualify-quiz-fallback')
