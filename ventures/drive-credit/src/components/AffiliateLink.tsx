'use client'

import { trackAffiliateClick, appendClickId } from '@/lib/analytics'
import type { AnchorHTMLAttributes } from 'react'

interface AffiliateLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Analytics placement identifier, e.g. "homepage-hero" */
  placement: string
  /** Offer name for analytics, defaults to "yendo" */
  offer?: string
}

/**
 * Drop-in replacement for <a> that:
 * 1. Fires affiliate_link_click to Plausible + GA4
 * 2. Generates a MaxBounty click ID (subid) and appends it to the URL
 * 3. Logs the click to /api/track-click for conversion attribution
 */
export default function AffiliateLink({
  placement,
  offer = 'yendo',
  onClick,
  href,
  children,
  ...props
}: AffiliateLinkProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // Track + get click ID (also fires to /api/track-click)
    const clickId = trackAffiliateClick(placement, offer)

    // Rewrite the href to include subid before navigation
    if (href) {
      const trackedUrl = appendClickId(href, clickId)
      e.currentTarget.href = trackedUrl
    }

    onClick?.(e)
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener"
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  )
}
