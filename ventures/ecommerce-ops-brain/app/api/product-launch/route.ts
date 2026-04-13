import Anthropic from '@anthropic-ai/sdk'

export async function POST(req: Request) {
  const client = new Anthropic()
  const { productName, description, targetCustomer, pricePoint, differentiators, storeInfo } = await req.json()

  const storeName = storeInfo?.name || 'our store'

  const prompt = `You are a senior e-commerce launch strategist for "${storeName}". Generate a complete product launch asset package for the product below. Everything you write goes directly into Shopify, Klaviyo, and social media — no editing needed.

PRODUCT DETAILS:
- Name: ${productName}
- Description: ${description}
- Target customer: ${targetCustomer}
- Price point: ${pricePoint}
- Key differentiators: ${differentiators}

Generate ALL of the following — use the exact section headers so the merchant can copy each section independently:

---
SECTION 1: SHOPIFY PRODUCT DESCRIPTION
(~280 words. Lead with the customer's desire or problem, not the product. Weave in 2-3 high-intent search keywords naturally. End with a single clear CTA. Shopify-ready.)

---
SECTION 2: SEO META TITLE + DESCRIPTION
Meta Title (under 60 chars, keyword first):
Meta Description (under 160 chars, include keyword + reason to click, don't start with product name):

---
SECTION 3: LAUNCH EMAIL
Subject line options (3 variants — curiosity, direct, and urgency angles):
Preview text:
Email body (under 180 words. Problem → solution → proof → CTA. Written for Klaviyo or Shopify Email. Include [FIRST NAME] personalization token.):

---
SECTION 4: SOCIAL MEDIA POSTS
Instagram caption (150-180 words. Hook in line 1. Micro-story. CTA at end. 5 relevant hashtags.):

TikTok hook (first 3 seconds of spoken script — under 15 words, pattern interrupt):

Twitter/X thread (3 tweets. Tweet 1: bold hook. Tweet 2: the insight/proof. Tweet 3: CTA + link prompt. Each tweet under 280 chars.):

---
SECTION 5: PRODUCT-SPECIFIC ABANDONED CART EMAIL
Subject line options (3):
Preview text:
Body (under 130 words. Specific to this product's benefits. Soft urgency. No generic "you left something behind" opener.):

---
SECTION 6: FAQ SECTION (5 Questions)
(The 5 most likely questions a buyer would ask before purchasing this product. Honest, specific answers. Format as Q: / A: pairs. Each answer under 60 words.)

---

Write everything as ready-to-use copy. Be specific to this product — no generic placeholders.`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 3000,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = message.content[0].type === 'text' ? message.content[0].text : ''

  return Response.json({ content })
}
