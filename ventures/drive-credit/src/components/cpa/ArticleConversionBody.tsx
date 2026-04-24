import React from 'react'
import ArticleQuiz from './ArticleQuiz'
import CompareTable from './CompareTable'
import EmailCapture from './EmailCapture'
import DecisionMatrix from './DecisionMatrix'
import InlineCTA from './InlineCTA'

// Funnel URLs keyed by offer_id. Kept in one place so every component gets
// the same tracking/redirect links.
const FUNNELS: Record<string, string> = {
  yendo: 'https://mintbrooks.com/finance/build-credit-with-your-car?utm_source=editorial&utm_medium=article&utm_campaign=yendo',
  slamdunk_finance: 'https://mintbrooks.com/finance/debt-consolidation-check?utm_source=editorial&utm_medium=article&utm_campaign=slamdunk',
  fastloansgroup: 'https://afflat3e1.com/trk/lnk/39C31C1E-2822-4350-B92A-2693C829ED6A/?o=19452&c=918277&a=769106&k=0D8EA126D9B01D64D99AED932BF002E5&l=20426&aff_sub=cpa_editorial',
  fast_cash_online: 'https://afflat3e3.com/trk/lnk/39C31C1E-2822-4350-B92A-2693C829ED6A/?o=12940&c=918277&a=769106&k=CBCB19B53F865FD4B516A6030205801C&l=13434&aff_sub=cpa_editorial',
  comparemefunds: 'https://afflat3e1.com/trk/lnk/39C31C1E-2822-4350-B92A-2693C829ED6A/?o=18576&c=918277&a=769106&k=ED393B6EF2DE462C0A98B2528BBEA265&l=19773&aff_sub=cpa_editorial',
  lifefunds_net_loans_up_to_50k_revshare_us: 'https://mintbrooks.com/finance/personal-loans-up-to-50k?utm_source=editorial&utm_medium=article&utm_campaign=lifefunds',
}

// Score-routed quiz destinations: Q1 credit-score band → best-fit lender.
const QUIZ_ROUTES = {
  under_500: FUNNELS.yendo,
  '500_580': FUNNELS.slamdunk_finance,
  '580_640': FUNNELS.fast_cash_online,
  '640_plus': FUNNELS.comparemefunds,
} as const

// Extra MaxBounty tracking links not in the main FUNNELS map (used only for
// niche-routed CTAs).
const MB_LINKS = {
  lifefunds:  'https://afflat3e1.com/trk/lnk/39C31C1E-2822-4350-B92A-2693C829ED6A/?o=16048&c=918277&a=769106&k=677670208C2E38CB550EBD7BB9366C82&l=18044&aff_sub=editorial_niche',
  sweeps_1k:  'https://tracking.maxbounty.com/aff_c?offer_id=17164&aff_id=769106&url_id=1&aff_sub=editorial_niche',
}

// Category-weighted InlineCTA copy + funnel. Matched by reader mindset, not
// topical label — MaxBounty inventory is finance-heavy, so we pair each niche
// with the finance/loan offer whose framing fits the reader's likely intent.
const NICHE_CTA: Record<string, { heading: string; body: string; cta: string; funnel: string }> = {
  'home-decor': {
    heading: 'Planning bigger purchases? See what you qualify for.',
    body: "Furniture, renovations, the piece you've been putting off — personal loans up to $50K with soft-pull pre-qualification. No score impact to check.",
    cta: 'See loan offers',
    funnel: FUNNELS.lifefunds_net_loans_up_to_50k_revshare_us,
  },
  wellness: {
    heading: 'Need a spa day? Enter to win $1,000.',
    body: "Free entry. Email only. No credit check, no card — just a 30-second form. US residents 18+. Real treat-yourself money.",
    cta: 'Enter to win',
    funnel: MB_LINKS.sweeps_1k,
  },
  beauty: {
    heading: 'Before the haul — enter to win $1,000.',
    body: "Free to enter. Single email, no credit check. US residents 18+. Use it on the routine you've been eyeing.",
    cta: 'Enter to win',
    funnel: MB_LINKS.sweeps_1k,
  },
  kitchen: {
    heading: 'Appliance died? Get funded in 24 hours.',
    body: "Refrigerator, dishwasher, oven — personal loans up to $50K with bad-credit approval and same-day funding. Soft pull, no score impact.",
    cta: 'Check approval odds',
    funnel: FUNNELS.fastloansgroup,
  },
  finance: {
    heading: 'See your real approval odds in 90 seconds',
    body: "Soft pull. No credit score impact. If your score is under 640, here's the lender most likely to approve you right now.",
    cta: 'Check eligibility',
    funnel: FUNNELS.yendo,
  },
  gift_ideas: {
    heading: 'Before you buy — enter to win a $1,000 gift card',
    body: "Free entry. Email only. No credit check, no card, no catch — just a 30-second form. US residents 18+.",
    cta: 'Enter to win',
    funnel: MB_LINKS.sweeps_1k,
  },
}

// Legacy alias — kept for existing call sites. Resolves via NICHE_CTA above.
const FUNNEL_BY_CATEGORY: Record<string, string> = Object.fromEntries(
  Object.entries(NICHE_CTA).map(([k, v]) => [k, v.funnel])
)

export type ConvProps = {
  html: string
  offerId?: string          // present for CPA articles
  categorySlug?: string     // 'home-decor' | 'wellness' | 'beauty' | 'kitchen' | 'finance' | other
}

/**
 * Split the article body on MB_* marker comments and render prose chunks via
 * dangerouslySetInnerHTML, interleaving real React interactive components.
 *
 * Supported markers (emitted by cpa_generator.py / editorial_generator.py):
 *   <!--MB_QUIZ-->       — score-routed 3-step quiz (CPA only)
 *   <!--MB_COMPARE-->    — 4-lender comparison table
 *   <!--MB_EMAIL-->      — email capture with Resend submit
 *   <!--MB_URGENCY-->    — (deprecated; silently stripped)
 *   <!--MB_DECIDE-->     — decision matrix (CPA only)
 *   <!--MB_CTA:cat-->    — category-weighted inline CTA (niche articles)
 */
const MARKER_RE = /<!--\s*MB_([A-Z]+)(?::([a-z0-9_-]+))?\s*-->/g

export default function ArticleConversionBody({ html, offerId, categorySlug }: ConvProps) {
  const isCPA = Boolean(offerId && FUNNELS[offerId])
  const articleFunnel = isCPA && offerId ? FUNNELS[offerId] : (FUNNEL_BY_CATEGORY[categorySlug ?? ''] ?? FUNNELS.yendo)

  // Split the string on markers, keeping both prose and markers in order.
  const pieces: Array<{ kind: 'html'; body: string } | { kind: 'marker'; name: string; arg?: string }> = []
  let last = 0
  let m: RegExpExecArray | null
  while ((m = MARKER_RE.exec(html)) !== null) {
    if (m.index > last) pieces.push({ kind: 'html', body: html.slice(last, m.index) })
    pieces.push({ kind: 'marker', name: m[1], arg: m[2] })
    last = m.index + m[0].length
  }
  if (last < html.length) pieces.push({ kind: 'html', body: html.slice(last) })

  // Render
  return (
    <>
      {pieces.map((p, i) => {
        if (p.kind === 'html') {
          if (!p.body.trim()) return null
          return <div key={i} className="article-body affiliate-body" dangerouslySetInnerHTML={{ __html: p.body }} />
        }
        switch (p.name) {
          case 'QUIZ':
            if (!isCPA) return null
            return <ArticleQuiz key={i} offerId={offerId!} routes={QUIZ_ROUTES} fallback={articleFunnel} />
          case 'COMPARE':
            return <CompareTable key={i} />
          case 'EMAIL': {
            const src = isCPA ? `cpa_${offerId}` : 'articles'
            return <EmailCapture key={i} source={src} variant={isCPA ? 'cpa' : 'editorial'} />
          }
          case 'DECIDE':
            return <DecisionMatrix key={i} />
          case 'CTA': {
            const cat = p.arg || categorySlug || 'finance'
            const copy = NICHE_CTA[cat] ?? NICHE_CTA.finance
            return <InlineCTA key={i} heading={copy.heading} body={copy.body} href={copy.funnel} cta={copy.cta} />
          }
          default:
            return null // unknown marker → drop silently
        }
      })}
    </>
  )
}
