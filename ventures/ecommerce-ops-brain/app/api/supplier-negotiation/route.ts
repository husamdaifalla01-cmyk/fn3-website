import Anthropic from '@anthropic-ai/sdk'

export async function POST(req: Request) {
  const client = new Anthropic()
  const { supplierName, currentPrice, orderVolume, competitorPrice, storeInfo } = await req.json()

  const storeName = storeInfo ? JSON.parse(storeInfo).name : 'our store'

  const prompt = `You are a skilled procurement negotiator for ${storeName}.

Supplier: ${supplierName}
Current price: ${currentPrice}
Our monthly order volume: ${orderVolume}
Competitor price (if known): ${competitorPrice || 'Not specified'}

Write a professional, data-backed negotiation email requesting better pricing.

The email should:
1. Open by acknowledging the positive business relationship
2. Reference our order volume and growth trajectory as leverage
3. Cite specific data points (volume, payment history, long-term partnership potential)
4. Make a specific price reduction request (target 10-15% reduction or price-match if competitor price given)
5. Offer something in return (longer purchase orders, faster payment terms, exclusivity)
6. Set a clear timeline for response
7. Close professionally

Make it firm but diplomatic. This should read like it was written by a seasoned procurement professional, not AI.

Format:
Subject: [subject line]

[email body]`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  const email = message.content[0].type === 'text' ? message.content[0].text : ''

  return Response.json({ email, content: email })
}
