# Profession AI Command Centers

Four deep, profession-specific AI prompt systems and workflow guides. These are not generic prompt packs. Each is a comprehensive operating system for using AI throughout a specific profession.

## Products

| Product | File | Price |
|---|---|---|
| Real Estate Agent AI Command Center | `products/real-estate-agent/content.json` | $97 |
| Financial Advisor AI Command Center | `products/financial-advisor/content.json` | $127 |
| Personal Injury Attorney AI Command Center | `products/personal-injury-attorney/content.json` | $147 |
| Executive Coach AI Command Center | `products/executive-coach/content.json` | $97 |

## Why These Products Work

Everyone in 2026 has ChatGPT. What they do not have is 500+ profession-specific prompts, tested workflows, and the exact system to use AI throughout their specific work. A realtor googling "AI for real estate" gets generic content. These give them the exact prompts that close deals, drafted for their specific context, challenges, and language.

The depth is the product. Generic prompt packs sell for $9. These sell for $97-$147 because they are built for one profession and go deep enough to justify the price on the first hour of use.

## File Structure

```
profession-command-centers/
  products/
    real-estate-agent/
      content.json          — 8 sections, 500+ prompts for RE agents
    financial-advisor/
      content.json          — 6 sections, compliance-aware prompts for RIAs
    personal-injury-attorney/
      content.json          — 6 sections, intake-to-settlement workflow prompts
    executive-coach/
      content.json          — 5 sections, session prep through marketing prompts
  README.md
```

## Publishing to Gumroad via the gumroad-empire Pipeline

These products use the same `content.json` format as the gumroad-empire products. To publish them, add entries to both pipeline files in `/ventures/gumroad-empire/src/`.

### Step 1: Copy content files into the gumroad-empire products directory

```bash
cp -r /ventures/profession-command-centers/products/real-estate-agent \
      /ventures/gumroad-empire/products/real-estate-agent

cp -r /ventures/profession-command-centers/products/financial-advisor \
      /ventures/gumroad-empire/products/financial-advisor

cp -r /ventures/profession-command-centers/products/personal-injury-attorney \
      /ventures/gumroad-empire/products/personal-injury-attorney

cp -r /ventures/profession-command-centers/products/executive-coach \
      /ventures/gumroad-empire/products/executive-coach
```

### Step 2: Add entries to `build-pdfs.ts`

Open `/ventures/gumroad-empire/src/build-pdfs.ts` and add these four objects to the `PRODUCTS` array:

```typescript
{
  id: 'real-estate-agent-command-center',
  contentFile: 'products/real-estate-agent/content.json',
  outputFile: 'output/real-estate-agent-ai-command-center.pdf',
},
{
  id: 'financial-advisor-command-center',
  contentFile: 'products/financial-advisor/content.json',
  outputFile: 'output/financial-advisor-ai-command-center.pdf',
},
{
  id: 'personal-injury-attorney-command-center',
  contentFile: 'products/personal-injury-attorney/content.json',
  outputFile: 'output/personal-injury-attorney-ai-command-center.pdf',
},
{
  id: 'executive-coach-command-center',
  contentFile: 'products/executive-coach/content.json',
  outputFile: 'output/executive-coach-ai-command-center.pdf',
},
```

### Step 3: Add entries to `publish-gumroad.ts`

Open `/ventures/gumroad-empire/src/publish-gumroad.ts` and add these four objects to the `PRODUCTS` array:

```typescript
{
  id: 'real-estate-agent-command-center',
  contentFile: 'products/real-estate-agent/content.json',
  pdfFile: 'output/real-estate-agent-ai-command-center.pdf',
  name: 'The Real Estate Agent AI Command Center',
  tags: ['real estate', 'realtor', 'ai prompts', 'listing descriptions', 'buyer conversion', 'real estate agent'],
  category: 'guides_and_tutorials',
},
{
  id: 'financial-advisor-command-center',
  contentFile: 'products/financial-advisor/content.json',
  pdfFile: 'output/financial-advisor-ai-command-center.pdf',
  name: 'The Financial Advisor AI Command Center',
  tags: ['financial advisor', 'ria', 'financial planning', 'ai prompts', 'wealth management', 'client communication'],
  category: 'guides_and_tutorials',
},
{
  id: 'personal-injury-attorney-command-center',
  contentFile: 'products/personal-injury-attorney/content.json',
  pdfFile: 'output/personal-injury-attorney-ai-command-center.pdf',
  name: 'The Personal Injury Attorney AI Command Center',
  tags: ['personal injury', 'attorney', 'lawyer', 'ai prompts', 'law firm', 'demand letter', 'intake'],
  category: 'guides_and_tutorials',
},
{
  id: 'executive-coach-command-center',
  contentFile: 'products/executive-coach/content.json',
  pdfFile: 'output/executive-coach-ai-command-center.pdf',
  name: 'The Executive Coach AI Command Center',
  tags: ['executive coaching', 'leadership coaching', 'coach', 'ai prompts', 'leadership development', 'ict'],
  category: 'guides_and_tutorials',
},
```

### Step 4: Build the PDFs

From `/ventures/gumroad-empire/`:

```bash
# Build all PDFs (including the new ones)
npx tsx src/build-pdfs.ts

# Or build a specific one
npx tsx src/build-pdfs.ts real-estate-agent-command-center
```

### Step 5: Publish to Gumroad

```bash
# Ensure GUMROAD_ACCESS_TOKEN is set in .env
npx tsx src/publish-gumroad.ts real-estate-agent-command-center
npx tsx src/publish-gumroad.ts financial-advisor-command-center
npx tsx src/publish-gumroad.ts personal-injury-attorney-command-center
npx tsx src/publish-gumroad.ts executive-coach-command-center
```

## Content Format Reference

Each `content.json` follows the gumroad-empire standard format:

```json
{
  "title": "...",
  "subtitle": "...",
  "tagline": "...",
  "price": 97,
  "how_to_use": "...",
  "sections": [
    {
      "title": "Section Title",
      "content": "Section overview...",
      "subsections": [
        {
          "title": "Subsection Title",
          "content": "Subsection overview...",
          "type": "framework | action-steps | warning | callout",
          "items": ["Complete prompt or action item..."]
        }
      ]
    }
  ]
}
```

The `items` array contains the actual prompts — fully written, copy-paste ready. This is the core content value: not descriptions of prompts, but complete prompts a professional can use immediately.
