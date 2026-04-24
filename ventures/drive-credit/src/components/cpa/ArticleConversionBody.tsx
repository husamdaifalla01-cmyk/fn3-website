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

// Category-weighted InlineCTA copy for editorial (non-CPA) niche articles.
const NICHE_CTA: Record<string, { heading: string; body: string; cta: string }> = {
  'home-decor': {
    heading: 'Furnishing on a budget? Check your credit options.',
    body: "If you're stretching budget across furniture and decor, a secured card that reports to all 3 bureaus funds the essentials while rebuilding your score.",
    cta: 'See your approval odds',
  },
  wellness: {
    heading: 'The move that cuts stress more than any supplement',
    body: 'Readers who rebuild their credit report noticeably lower financial stress within 90 days. Soft pull — no score impact.',
    cta: 'Check in 90 seconds',
  },
  beauty: {
    heading: "The glow-up that's actually long-term",
    body: 'Rebuilding credit is the un-Instagrammable glow-up with the biggest payoff. Under 640? Here\'s the fastest path through.',
    cta: 'See what you qualify for',
  },
  kitchen: {
    heading: 'Financing a kitchen upgrade without a 750 score',
    body: 'Appliance financing with bad credit is brutal. A credit-builder card that reports monthly to all 3 bureaus can fund it and rebuild your score in one move.',
    cta: 'Check your approval odds',
  },
  finance: {
    heading: 'See your real approval odds in 90 seconds',
    body: "Soft pull. No credit score impact. If your score is under 640, here are the lenders most likely to approve you right now.",
    cta: 'Check eligibility',
  },
}

const FUNNEL_BY_CATEGORY: Record<string, string> = {
  'home-decor': FUNNELS.yendo,
  wellness: FUNNELS.yendo,
  beauty: FUNNELS.yendo,
  kitchen: FUNNELS.yendo,
  finance: FUNNELS.yendo,
}

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
            const funnel = FUNNEL_BY_CATEGORY[cat] ?? FUNNELS.yendo
            return <InlineCTA key={i} heading={copy.heading} body={copy.body} href={funnel} cta={copy.cta} />
          }
          default:
            return null // unknown marker → drop silently
        }
      })}
    </>
  )
}
