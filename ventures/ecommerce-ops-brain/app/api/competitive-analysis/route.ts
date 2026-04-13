import Anthropic from '@anthropic-ai/sdk'

export async function POST(req: Request) {
  const client = new Anthropic()
  const { productName, yourPrice, competitorUrl1, competitorUrl2, competitorUrl3, storeInfo } = await req.json()

  const storeName = storeInfo ? JSON.parse(storeInfo).name : 'our store'

  const prompt = `You are a brand positioning strategist for "${storeName}". The merchant sells "${productName}" at ${yourPrice}. They have three competitor URLs for reference (you cannot crawl them, but use them as domain/brand signals to reason about likely positioning and price ranges).

COMPETITOR CONTEXT:
- Competitor A URL: ${competitorUrl1 || 'Not provided'}
- Competitor B URL: ${competitorUrl2 || 'Not provided'}
- Competitor C URL: ${competitorUrl3 || 'Not provided'}

Based on what you can infer from the URLs (domain name, brand, likely market segment) and the merchant's price point of ${yourPrice}, generate a complete competitive positioning narrative.

Use EXACTLY this format:

---
COMPETITIVE POSITIONING ANALYSIS

PRICE POSITION
(State ${storeName}'s price relative to what competitors at these URLs likely charge, based on their brand signals. Example: "At ${yourPrice}, you're positioned as [value leader / mid-market / premium]. [Competitor A domain] typically targets [segment] at a higher/lower price point.")

POSITIONING NARRATIVE
(2-3 sentences the merchant can use verbatim in marketing copy. Lead with the price angle. Example: "At ${yourPrice} vs. [Competitor A]'s typical $X range, your angle is value leadership without compromising quality.")

SUGGESTED TAGLINES (3 options)
(Short, punchy, price-aware taglines the merchant can test. Each under 10 words.)

MESSAGING ANGLES (3 angles)
(Three distinct marketing angles — one for price-conscious buyers, one for quality-first buyers, one for brand story buyers. Each: angle name + 1-sentence hook.)

AD COPY HEADLINE (Best angle for paid ads)
(One ready-to-use headline under 40 characters that captures the positioning.)

WHERE TO LEAD WITH PRICE
(Specific placements: "Lead with price on [channel] because [reason]. Don't lead with price on [channel] — lead with [benefit] instead.")

---

Be specific. Reference the competitor domain names directly. Give the merchant copy they can use today.`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1200,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = message.content[0].type === 'text' ? message.content[0].text : ''

  return Response.json({ content })
}
