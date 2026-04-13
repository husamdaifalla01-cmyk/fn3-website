import Anthropic from '@anthropic-ai/sdk'

export async function POST(req: Request) {
  const client = new Anthropic()
  const { message, customerName, ticketType, orderValue, storeInfo } = await req.json()

  const isHighValue = orderValue && parseFloat(orderValue) > 200

  const ticketInstructions: Record<string, string> = {
    wismo: `This is a WISMO ticket ("where is my order?"). The customer wants a status update on their shipment.
- Acknowledge the wait, provide any tracking info available, and give a clear next step.
- If the order appears delayed beyond the expected window, proactively apologize and offer a resolution (discount on next order or expedited re-ship if confirmed lost).
- Do not tell them to "check their tracking" without context — that feels dismissive.`,

    damaged_item: `The customer received a damaged item.
- Lead with a genuine apology — do not minimize the issue.
- Immediately offer a replacement shipment or full refund, their choice.
- Ask for a photo only if needed for the supplier claim, and frame it as optional.
- Do not ask them to ship the damaged item back.`,

    wrong_item: `The customer received the wrong item (wrong variant, wrong SKU, or wrong product entirely).
- Apologize for the fulfillment error — own the mistake fully.
- Confirm what they ordered vs. what arrived, then commit to sending the correct item with express shipping at no charge.
- Tell them to keep or donate the wrong item — do not make them deal with a return for your error.`,

    refund_request: `The customer is requesting a refund.
- Be empathetic and process-clear — do not make them justify the request.
- Confirm the refund timeline (typically 3–5 business days to original payment method).
- If the order is outside the return window, use discretion: for orders close to the boundary or for high-value customers, approve it anyway and note this as a goodwill exception.
- Offer store credit as an alternative if appropriate, but do not push it if they've asked for a refund.`,

    product_question: `The customer has a question about a product before or after purchase.
- Answer directly and specifically — do not give vague answers.
- If you don't have the information in context, tell them you'll follow up within a specific timeframe (e.g., "I'll confirm this with our team and reply within 2 hours").
- If relevant, link to the product page, sizing guide, or FAQ.`,

    complaint: `The customer is unhappy with their experience.
- Open with a genuine, specific apology — not a scripted one.
- Identify the root issue from their message and address it directly.
- Offer a concrete resolution: refund, replacement, store credit, or a combination.
- Do not be defensive. Do not make excuses. Take ownership and solve the problem.`,
  }

  const escalationNote = isHighValue
    ? `\n\nESCALATION FLAG: This customer's order value ($${orderValue}) exceeds $200 AOV threshold. Treat as a priority account. Be especially generous with the resolution offer — a goodwill gesture (10% future discount or free expedited re-ship) is warranted. Mention that you're personally handling this.`
    : ''

  const instructions = ticketInstructions[ticketType] || `Help the customer professionally. Address their specific concern, offer a clear resolution, and close with a next step.`

  const messageResult = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: `You are a customer service agent for the Shopify store "${storeInfo?.name || 'our store'}". Your replies are warm, direct, and human — never robotic or scripted. You match the brand voice: professional but approachable. You never use filler phrases like "I hope this email finds you well" or "Thank you for reaching out." You get straight to the point, resolve the issue, and close with a clear next action. You always sign off as the ${storeInfo?.name || 'Store'} Support Team.`,
    messages: [{
      role: 'user',
      content: `Handle this customer service ticket.

Customer name: ${customerName}
Ticket type: ${ticketType.toUpperCase()}
${orderValue ? `Order value: $${orderValue}` : ''}

Ticket instructions:
${instructions}${escalationNote}

Customer message:
"${message}"

Write the complete reply. No subject line needed — just the body. Under 200 words unless the situation requires more detail.`,
    }]
  })

  return Response.json({
    reply: messageResult.content[0].type === 'text' ? messageResult.content[0].text : '',
    escalated: isHighValue,
  })
}
