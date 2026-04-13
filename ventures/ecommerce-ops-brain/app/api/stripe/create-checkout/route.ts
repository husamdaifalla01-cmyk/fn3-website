import Stripe from 'stripe'

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  const PRICE_IDS = {
    launch: process.env.STRIPE_LAUNCH_PRICE_ID || 'price_launch_placeholder',
    scale: process.env.STRIPE_SCALE_PRICE_ID || 'price_scale_placeholder',
  }

  const { plan, userId, userEmail } = await req.json()

  const priceId = PRICE_IDS[plan as keyof typeof PRICE_IDS]

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: userEmail,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgrade=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: {
      user_id: userId,
      price_id: priceId,
    },
    subscription_data: {
      trial_period_days: 14,
      metadata: {
        user_id: userId,
      },
    },
  })

  return Response.json({ url: session.url })
}
