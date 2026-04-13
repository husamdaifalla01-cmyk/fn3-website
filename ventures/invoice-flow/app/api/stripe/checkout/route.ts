import { NextResponse } from 'next/server'
import { stripe, PRICE_IDS } from '@/lib/stripe'
import { Plan } from '@/types'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { plan, billing, email, userId, orgId } = body as {
      plan: Plan
      billing: 'monthly' | 'annual'
      email: string
      userId: string
      orgId: string
    }

    const priceId = PRICE_IDS[plan][billing]

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success&plan=${plan}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?checkout=cancelled`,
      metadata: {
        userId,
        orgId,
        plan,
        billing,
      },
      subscription_data: {
        metadata: {
          userId,
          orgId,
          plan,
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
