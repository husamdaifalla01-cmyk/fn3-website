import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return new Response(`Webhook Error: ${(err as Error).message}`, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const customerId = session.customer as string
    const priceId = session.metadata?.price_id
    const userId = session.metadata?.user_id

    if (userId && priceId) {
      const plan = priceId === process.env.STRIPE_SCALE_PRICE_ID ? 'scale' : 'launch'
      await supabase
        .from('stores')
        .update({ plan })
        .eq('owner_id', userId)
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    const userId = subscription.metadata?.user_id

    if (userId) {
      await supabase
        .from('stores')
        .update({ plan: 'free' })
        .eq('owner_id', userId)
    }
  }

  return new Response('ok', { status: 200 })
}
