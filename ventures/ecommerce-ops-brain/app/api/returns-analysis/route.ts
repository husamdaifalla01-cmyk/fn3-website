import Anthropic from '@anthropic-ai/sdk'

export async function POST(req: Request) {
  const client = new Anthropic()
  const { returnsData, storeInfo } = await req.json()

  const storeName = storeInfo?.name || 'your store'

  const prompt = `You are an e-commerce operations analyst for "${storeName}". Analyze the return/refund data below and identify patterns that the merchant can act on.

RETURNS DATA:
${returnsData}

Generate a structured returns intelligence report using EXACTLY this format:

---
RETURNS INTELLIGENCE REPORT

TOP RETURN REASONS BY PRODUCT
(For each product with 2+ returns, list: "• [Product]: [Top reason] ([X]% of returns for this product)")

SIZE & FIT ISSUES
(Scan for any complaints about sizing. If found: "SIZE ALERT: [Product] — multiple customers report [issue]. Recommended fix: Update product description to include: [specific copy suggestion]." If none: "No sizing pattern detected.")

QUALITY ISSUE CLUSTERS
(Identify any product with repeated quality complaints. If found: "QUALITY FLAG: [Product] — [X] returns mention [issue]. Action: [recommendation]. If none: "No quality clusters detected.")

DESCRIPTION GAPS (PREVENTION OPPORTUNITIES)
(Identify 2-3 specific product description updates that would prevent future returns based on the data. Format: "• [Product]: Add '[specific detail to add]' — would address [X]% of returns.")

POLICY RECOMMENDATIONS
(Based on return reason breakdown, recommend 1-2 policy changes. Example: "If >30% of returns are 'changed mind', consider marking select items Final Sale." Be specific to the data provided.)

---

Be specific. Use the actual product names and reasons from the data. If data is sparse, extrapolate conservatively and flag the assumption.`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1536,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = message.content[0].type === 'text' ? message.content[0].text : ''

  return Response.json({ content })
}
