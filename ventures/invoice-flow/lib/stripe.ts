import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-02-25.clover',
    })
  }
  return _stripe
}

// Keep backward-compat alias used by existing routes
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop]
  },
})

export const PRICE_IDS = {
  solo: {
    monthly: process.env.STRIPE_SOLO_MONTHLY_PRICE_ID!,
    annual: process.env.STRIPE_SOLO_ANNUAL_PRICE_ID!,
  },
  team: {
    monthly: process.env.STRIPE_TEAM_MONTHLY_PRICE_ID!,
    annual: process.env.STRIPE_TEAM_ANNUAL_PRICE_ID!,
  },
  firm: {
    monthly: process.env.STRIPE_FIRM_MONTHLY_PRICE_ID!,
    annual: process.env.STRIPE_FIRM_ANNUAL_PRICE_ID!,
  },
}
