export function getStripeClient() {
  const Stripe = require('stripe')
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
  })
}

export const PLANS = {
  starter: {
    name: 'Starter',
    price: 49,
    meetings: 20,
    users: 1,
    priceId: process.env.STRIPE_STARTER_PRICE_ID,
  },
  team: {
    name: 'Team',
    price: 99,
    meetings: 100,
    users: 5,
    priceId: process.env.STRIPE_TEAM_PRICE_ID,
  },
  agency: {
    name: 'Agency',
    price: 149,
    meetings: -1, // unlimited
    users: 20,
    priceId: process.env.STRIPE_AGENCY_PRICE_ID,
  },
}
