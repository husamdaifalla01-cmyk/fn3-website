import { ImageResponse } from 'next/og'
import { ARTICLES, CATEGORY_META } from '@/lib/lifestyle/articles'

export const alt = 'Mintbrooks article'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const CATEGORY_COLORS: Record<string, { bg: string; accent: string }> = {
  'home-decor': { bg: '#EEF3F1', accent: '#2C4A3E' },
  'wellness':   { bg: '#F5EDE5', accent: '#7B5E4A' },
  'beauty':     { bg: '#F5EAF0', accent: '#8B4E6B' },
  'kitchen':    { bg: '#EDF2E5', accent: '#4A5E2C' },
  'finance':    { bg: '#EEF3F1', accent: '#1D3A2F' },
}
const DEFAULT_COLORS = { bg: '#FDFAF6', accent: '#B8955A' }

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug } = await params

  const article = ARTICLES.find((a) => a.slug === slug)

  const colors = article
    ? (CATEGORY_COLORS[article.category] ?? DEFAULT_COLORS)
    : DEFAULT_COLORS

  const categoryMeta = article
    ? CATEGORY_META[article.category as keyof typeof CATEGORY_META]
    : null

  const categoryLabel = categoryMeta?.label ?? 'Mintbrooks'
  const title = article?.title ?? 'Mintbrooks — Lifestyle & Home'

  // Truncate very long titles so they never overflow the card
  const displayTitle =
    title.length > 90 ? title.slice(0, 87).trimEnd() + '…' : title

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.bg,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          fontFamily: 'Georgia, "Times New Roman", serif',
          position: 'relative',
        }}
      >
        {/* ── Top row: wordmark ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: colors.accent,
              textTransform: 'uppercase',
            }}
          >
            Mintbrooks
          </span>
        </div>

        {/* ── Middle: category pill + article title ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {/* Category pill */}
          <div
            style={{
              display: 'flex',
            }}
          >
            <div
              style={{
                background: colors.accent,
                color: colors.bg,
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '8px 20px',
                borderRadius: 40,
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              {categoryLabel}
            </div>
          </div>

          {/* Article title */}
          <div
            style={{
              fontSize: displayTitle.length > 60 ? 52 : 60,
              fontWeight: 700,
              color: '#1a1a1a',
              lineHeight: 1.15,
              maxWidth: 960,
              letterSpacing: '-0.5px',
            }}
          >
            {displayTitle}
          </div>
        </div>

        {/* ── Bottom row: decorative rule + tagline ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Left decorative line */}
          <div
            style={{
              width: 48,
              height: 3,
              background: colors.accent,
              borderRadius: 2,
            }}
          />

          {/* Tagline */}
          <span
            style={{
              fontSize: 20,
              fontWeight: 400,
              color: colors.accent,
              letterSpacing: '0.06em',
              fontFamily: 'system-ui, sans-serif',
              opacity: 0.8,
            }}
          >
            mintbrooks.com
          </span>
        </div>

        {/* ── Background accent block (top-right corner decoration) ── */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 220,
            height: 220,
            background: colors.accent,
            opacity: 0.07,
            borderRadius: '0 0 0 100%',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
