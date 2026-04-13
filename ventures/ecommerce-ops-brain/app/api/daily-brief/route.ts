import Anthropic from '@anthropic-ai/sdk'

export async function POST(req: Request) {
  const client = new Anthropic()
  const { salesSummary, storeInfo } = await req.json()

  const storeName = storeInfo?.name || 'your store'

  const prompt = `You are the AI operations manager for "${storeName}". Analyze the sales summary below and generate a concise morning operations briefing for the merchant. Today's date: ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}.

SALES SUMMARY INPUT:
${salesSummary}

Generate a structured morning briefing using EXACTLY this format:

---
GOOD MORNING. HERE'S WHAT NEEDS YOUR ATTENTION TODAY:

CRITICAL ALERTS
(List any SKUs with <7 days of stock remaining based on the data. If none found, write "No stockout alerts — inventory levels healthy." For each SKU at risk: "• [SKU/Product]: [X] days of stock remaining. Reorder immediately.")

OPEN TICKETS
(Based on any ticket or support data mentioned. State count and breakdown by type. If no data: "Review your helpdesk — flag any tickets unresolved >24 hours.")

REVENUE SNAPSHOT
(Compare yesterday's revenue to the 7-day average. State the % change with an up/down indicator: "↑ 14% above 7-day average" or "↓ 8% below 7-day average". If insufficient data, extrapolate from what's provided.)

CONTENT OPPORTUNITY
(Identify the top product mentioned that likely hasn't had copy refreshed recently, or flag the product with the most sales that deserves updated copy. State: "[Product] is your top performer — consider refreshing its description for higher conversion.")

RECOMMENDED ACTION
(One specific, actionable task with a direct link. Format: "→ [Action to take] — Go to [/path] to execute this now.")

---

Keep the entire briefing under 200 words. Be direct. No filler phrases. The merchant is reading this in 60 seconds.`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = message.content[0].type === 'text' ? message.content[0].text : ''

  return Response.json({ content })
}
