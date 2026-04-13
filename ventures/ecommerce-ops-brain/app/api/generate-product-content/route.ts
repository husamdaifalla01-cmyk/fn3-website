import Anthropic from '@anthropic-ai/sdk'

export async function POST(req: Request) {
  const client = new Anthropic()
  const { productName, category, keyFeatures, targetAudience, contentType, storeInfo } = await req.json()

  const storeName = storeInfo ? JSON.parse(storeInfo).name : 'our store'

  const prompts: Record<string, string> = {
    product_description: `You are an expert Shopify copywriter. Your output is pasted directly into Shopify admin — no reformatting needed.

Product details:
- Product name: ${productName}
- Category: ${category}
- Key features: ${keyFeatures}
- Target audience: ${targetAudience}
- Store: ${storeName}

Generate the following — use the exact headers below so the merchant can copy-paste each section:

---
SHOPIFY PRODUCT DESCRIPTION
(~300 words, SEO-optimized. Lead with the customer's problem or desire, not the product specs. Weave in 2–3 high-intent search keywords naturally. End with a single clear call to action.)

---
SHOPIFY BULLET POINTS (5 bullets)
(Format: [Feature] — [Specific benefit to the buyer]. Lead with the most compelling benefit. Each bullet under 20 words.)

---
SHOPIFY SEO META DESCRIPTION
(Under 160 characters. Include the primary keyword and a reason to click. Do not start with the product name.)

---
SHOPIFY SEO PAGE TITLE
(Under 60 characters. Primary keyword first, then brand name.)`,

    collection_page: `You are a Shopify SEO copywriter. Write collection page copy ready to paste into Shopify admin.

Collection details:
- Collection name: ${productName}
- Category/niche: ${category}
- Key products in collection: ${keyFeatures}
- Target audience: ${targetAudience}
- Store: ${storeName}

Generate:

---
COLLECTION PAGE HEADLINE
(Under 10 words. Benefit-led, not category-led.)

---
COLLECTION PAGE DESCRIPTION
(150–200 words. Opens with the customer's intent, surfaces the breadth of the collection, includes 2–3 organic keywords. Ends with a subtle CTA. No salesy fluff.)

---
COLLECTION SEO META DESCRIPTION
(Under 160 characters. Keyword-first. Describes what the shopper will find.)

---
COLLECTION SEO PAGE TITLE
(Under 60 characters. Category keyword + store name.)`,

    abandoned_cart_email: `You are a Shopify email marketing expert. Write a 3-email abandoned cart recovery sequence for Klaviyo or Shopify Email. Output is ready to paste — include subject lines, preview text, and body copy.

Product details:
- Product left in cart: ${productName}
- Category: ${category}
- Key features / selling points: ${keyFeatures}
- Target audience: ${targetAudience}
- Store: ${storeName}

---
EMAIL 1 — SOFT REMINDER (Send: 1 hour after abandonment)
Subject line options (3):
Preview text:
Body: (Under 100 words. Warm, non-pushy. Remind them what they left behind. No discount yet.)

---
EMAIL 2 — URGENCY + SOCIAL PROOF (Send: 24 hours after abandonment)
Subject line options (3):
Preview text:
Body: (Under 150 words. Introduce scarcity or social proof. Still no discount — test this first.)

---
EMAIL 3 — FINAL OFFER (Send: 72 hours after abandonment)
Subject line options (3):
Preview text:
Body: (Under 150 words. Offer a time-limited discount or free shipping. Make the CTA unmissable.)`,

    ad_copy: `You are a performance marketing expert writing high-converting Shopify ad copy for Meta (Facebook/Instagram).

Product: ${productName}
Category: ${category}
Key Features: ${keyFeatures}
Target Audience: ${targetAudience}

Write 3 ad copy variants:

---
VARIANT 1 — PROBLEM/SOLUTION
Primary text (under 125 chars — the hook that stops the scroll):
Body copy (2–3 sentences: the solution and its impact):
CTA button text:
Headline (under 40 chars):

---
VARIANT 2 — SOCIAL PROOF
Primary text (open with a customer result or number):
Body copy:
CTA button text:
Headline:

---
VARIANT 3 — DIRECT RESPONSE
Primary text (lead with the offer or boldest claim):
Body copy:
CTA button text:
Headline:`,

    email_sequence: `You are an email marketing expert for Shopify stores. Write a 3-email product launch sequence ready for Klaviyo or Shopify Email.

Product: ${productName}
Category: ${category}
Key Features: ${keyFeatures}
Target Audience: ${targetAudience}
Store: ${storeName}

---
EMAIL 1 — AWARENESS (Send: Day 0)
Subject line options (3):
Preview text:
Body: (Under 150 words. Introduce the product with a compelling opening hook. Focus on the problem it solves, not the features.)

---
EMAIL 2 — CONSIDERATION (Send: Day 3)
Subject line options (3):
Preview text:
Body: (Under 150 words. Go deeper on benefits. Include social proof, a FAQ answer, or a use case story.)

---
EMAIL 3 — CONVERSION (Send: Day 7)
Subject line options (3):
Preview text:
Body: (Under 150 words. Drive urgency. Time-limited offer or low-stock signal. Single bold CTA.)`,

    social_post: `You are a social media expert for Shopify e-commerce brands.

Product: ${productName}
Category: ${category}
Key Features: ${keyFeatures}
Target Audience: ${targetAudience}

Generate:

---
INSTAGRAM CAPTION — LONG FORM
(150–200 words. Hook in the first line — no context or setup. Tell a micro-story or paint the before/after. End with a question or CTA that drives comments.)

---
INSTAGRAM CAPTION — SHORT FORM
(Under 50 words. Punchy. The hook IS the caption.)

---
HASHTAG SETS
Set 1 — Niche (15 hashtags, under 50K posts each):
Set 2 — Discovery (15 hashtags, 100K–1M posts):

---
TIKTOK HOOK OPTIONS (5 variants)
(First 3 seconds of spoken script. Pattern interrupt. Each under 15 words.)`,
  }

  const prompt = prompts[contentType] || prompts.product_description

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = message.content[0].type === 'text' ? message.content[0].text : ''

  return Response.json({ content })
}
