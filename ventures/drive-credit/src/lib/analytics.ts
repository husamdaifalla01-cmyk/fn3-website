/**
 * Unified analytics event tracking for Plausible + GA4 + MaxBounty click ID.
 *
 * Usage:
 *   import { trackEvent, trackAffiliateClick, generateClickId } from '@/lib/analytics'
 *   trackEvent('affiliate_link_click', { placement: 'homepage-hero', offer: 'yendo' })
 *   trackEvent('email_subscribe', { source: 'exit-intent' })
 */

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(
  eventName: string,
  props?: Record<string, string>,
) {
  // Plausible custom event
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props })
  }

  // GA4 custom event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, props)
  }
}

// ─── MaxBounty Click ID System ─────────────────────────────────────────────

const CLICK_ID_KEY = 'dc_click_id'
const CLICK_ID_TS_KEY = 'dc_click_id_ts'
const CLICK_ID_TTL = 30 * 60 * 1000 // 30 minutes

/**
 * Generate a unique click ID for MaxBounty subid tracking.
 * Format: dc_<timestamp>_<random4hex> — short, unique, sortable.
 */
export function generateClickId(): string {
  const ts = Date.now().toString(36)
  const rand = Math.random().toString(16).slice(2, 6)
  return `dc_${ts}_${rand}`
}

/**
 * Get or create a click ID. Persists in localStorage for 30 min
 * so multiple clicks in the same session share one ID.
 */
export function getOrCreateClickId(): string {
  if (typeof window === 'undefined') return generateClickId()

  try {
    const existing = localStorage.getItem(CLICK_ID_KEY)
    const ts = localStorage.getItem(CLICK_ID_TS_KEY)

    if (existing && ts && Date.now() - Number(ts) < CLICK_ID_TTL) {
      return existing
    }

    const id = generateClickId()
    localStorage.setItem(CLICK_ID_KEY, id)
    localStorage.setItem(CLICK_ID_TS_KEY, String(Date.now()))
    return id
  } catch {
    return generateClickId()
  }
}

/**
 * Append subid (click ID) to an affiliate URL for MaxBounty conversion tracking.
 */
export function appendClickId(url: string, clickId: string): string {
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}subid=${encodeURIComponent(clickId)}`
}

/**
 * Fire click tracking to our API endpoint (fire-and-forget).
 */
export function sendClickToApi(clickId: string, placement: string, offer: string) {
  if (typeof window === 'undefined') return

  fetch('/api/track-click', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      click_id: clickId,
      placement,
      offer,
      timestamp: new Date().toISOString(),
      referrer: document.referrer || '',
      url: window.location.href,
    }),
  }).catch(() => {}) // fire-and-forget, never block UX
}

/**
 * Track an affiliate link click with placement context.
 * Now also generates a click ID and logs to our API.
 * Returns the click ID so callers can append it to URLs.
 */
export function trackAffiliateClick(placement: string, offer: string = 'yendo'): string {
  const clickId = getOrCreateClickId()
  trackEvent('affiliate_link_click', { placement, offer, click_id: clickId })
  sendClickToApi(clickId, placement, offer)
  return clickId
}

/**
 * Track an email subscribe conversion.
 */
export function trackEmailSubscribe(source: string) {
  trackEvent('email_subscribe', { source })
}
