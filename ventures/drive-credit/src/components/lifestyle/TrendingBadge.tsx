import React from 'react'

interface TrendingBadgeProps {
  badge: 'trending' | 'featured' | 'new' | 'editors-pick'
  size?: 'sm' | 'md'
}

const BADGE_CONFIG: Record<
  TrendingBadgeProps['badge'],
  { background: string; color: string; border?: string; label: string }
> = {
  trending: {
    background: '#B8955A',
    color: '#ffffff',
    label: '↑ Trending',
  },
  featured: {
    background: '#1D3A2F',
    color: '#ffffff',
    label: '✦ Editor\'s Pick',
  },
  new: {
    background: 'rgba(253,250,246,0.9)',
    border: '1px solid #B8955A',
    color: '#1D3A2F',
    label: 'New',
  },
  'editors-pick': {
    background: 'rgba(29,58,47,0.08)',
    border: '1px solid rgba(29,58,47,0.2)',
    color: '#1D3A2F',
    label: '✦ Curated',
  },
}

export default function TrendingBadge({ badge, size = 'md' }: TrendingBadgeProps) {
  const config = BADGE_CONFIG[badge]
  const isSm = size === 'sm'

  return (
    <span
      style={{
        display: 'inline-block',
        whiteSpace: 'nowrap',
        borderRadius: '100px',
        padding: isSm ? '3px 8px' : '4px 10px',
        background: config.background,
        color: config.color,
        border: config.border ?? 'none',
        fontSize: isSm ? '8px' : '9px',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}
    >
      {config.label}
    </span>
  )
}
