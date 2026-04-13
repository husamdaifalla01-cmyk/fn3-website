import 'dotenv/config'
import { readFile, readdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { createReadStream } from 'fs'
import FormData from 'form-data'
import fetch from 'node-fetch'

const GUMROAD_API = 'https://api.gumroad.com/v2'
const ACCESS_TOKEN = process.env.GUMROAD_ACCESS_TOKEN

if (!ACCESS_TOKEN) {
  console.error('❌ GUMROAD_ACCESS_TOKEN not set in .env')
  process.exit(1)
}

interface GumroadProduct {
  id: string
  name: string
  price: number
  description: string
  published: boolean
  url: string
}

const PRODUCTS = [
  {
    id: 'vibe-coder-launch',
    contentFile: 'products/vibe-coder-launch/content.json',
    pdfFile: 'output/vibe-coder-launch-playbook.pdf',
    name: "The Vibe Coder's Launch Playbook",
    tags: ['launch', 'indie hacker', 'saas', 'product', 'vibe coding', 'marketing', 'startup'],
    category: 'guides_and_tutorials',
  },
  {
    id: 'ai-workforce-playbook',
    contentFile: 'products/ai-workforce-playbook/content.json',
    pdfFile: 'output/ai-workforce-playbook.pdf',
    name: 'Deploy Your AI Workforce: Non-Technical Playbook',
    tags: ['ai agents', 'automation', 'n8n', 'make', 'workflow', 'business', 'no code'],
    category: 'guides_and_tutorials',
  },
  {
    id: 'freelancer-multiplier',
    contentFile: 'products/freelancer-multiplier/content.json',
    pdfFile: 'output/freelancer-multiplier-system.pdf',
    name: 'The AI Freelancer Multiplier System',
    tags: ['freelancing', 'freelancer', 'rates', 'ai', 'business', 'consulting', 'income'],
    category: 'guides_and_tutorials',
  },
  {
    id: 'local-biz-ai-kit',
    contentFile: 'products/local-biz-ai-kit/content.json',
    pdfFile: 'output/local-business-ai-kit.pdf',
    name: 'Local Business AI Operations Kit',
    tags: ['local business', 'restaurant', 'salon', 'gym', 'real estate', 'ai', 'operations'],
    category: 'guides_and_tutorials',
  },
  {
    id: 'faceless-content-machine',
    contentFile: 'products/faceless-content-machine/content.json',
    pdfFile: 'output/faceless-content-machine-2026.pdf',
    name: 'The Faceless Content Machine: 2026 Edition',
    tags: ['faceless content', 'youtube', 'passive income', 'content creation', 'ai', 'automation'],
    category: 'guides_and_tutorials',
  },
  {
    id: 'real-estate-agent-cc',
    contentFile: 'products/real-estate-agent-cc/content.json',
    pdfFile: 'output/real-estate-agent-command-center.pdf',
    name: 'The Real Estate Agent AI Command Center',
    tags: ['real estate', 'realtor', 'ai prompts', 'listing', 'buyers', 'lead generation', 'scripts'],
    category: 'guides_and_tutorials',
  },
  {
    id: 'financial-advisor-cc',
    contentFile: 'products/financial-advisor-cc/content.json',
    pdfFile: 'output/financial-advisor-command-center.pdf',
    name: 'The Financial Advisor AI Command Center',
    tags: ['financial advisor', 'wealth management', 'ai prompts', 'compliance', 'client communication'],
    category: 'guides_and_tutorials',
  },
  {
    id: 'personal-injury-attorney-cc',
    contentFile: 'products/personal-injury-attorney-cc/content.json',
    pdfFile: 'output/personal-injury-attorney-command-center.pdf',
    name: 'The Personal Injury Attorney AI Command Center',
    tags: ['personal injury', 'attorney', 'lawyer', 'legal', 'ai prompts', 'intake', 'demand letter'],
    category: 'guides_and_tutorials',
  },
  {
    id: 'executive-coach-cc',
    contentFile: 'products/executive-coach-cc/content.json',
    pdfFile: 'output/executive-coach-command-center.pdf',
    name: 'The Executive Coach AI Command Center',
    tags: ['executive coach', 'coaching', 'leadership', 'ai prompts', 'business coach', 'ICF'],
    category: 'guides_and_tutorials',
  },
]

function buildDescription(content: any): string {
  const sections = content.sections?.slice(0, 3).map((s: any) => `• ${s.title}`).join('\n') || ''
  return `
${content.subtitle}

"${content.tagline}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT'S INSIDE:

${sections}
${content.sections?.slice(3).map((s: any) => `• ${s.title}`).join('\n') || ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOT ANOTHER GENERIC GUIDE.

Every framework, script, and template in this guide is specific, actionable, and ready to use today. No filler. No theory. Just what works in 2026.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT YOU GET:

✅ ${content.sections?.length || 7} comprehensive sections
✅ Frameworks you can implement immediately
✅ Real scripts and templates
✅ 2026-current tool recommendations
✅ Quick Start Guide (first win in 30 minutes)
✅ Lifetime updates included

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"${content.tagline}"

Instant PDF download. No subscriptions. Use it today.
  `.trim()
}

async function createProduct(productConfig: typeof PRODUCTS[0]): Promise<GumroadProduct> {
  if (!existsSync(productConfig.contentFile)) {
    throw new Error(`Content file not found: ${productConfig.contentFile}`)
  }

  const content = JSON.parse(await readFile(productConfig.contentFile, 'utf-8'))
  const priceInCents = content.price * 100

  const formData = new URLSearchParams({
    access_token: ACCESS_TOKEN!,
    name: productConfig.name,
    price: priceInCents.toString(),
    description: buildDescription(content),
    published: 'true',
    tags: productConfig.tags.join(','),
    shown_on_profile: 'true',
    require_shipping: 'false',
  })

  const response = await fetch(`${GUMROAD_API}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData,
  })

  const data = await response.json() as any
  if (!data.success) {
    throw new Error(`Gumroad API error: ${JSON.stringify(data)}`)
  }

  console.log(`[${productConfig.id}] Product created: ${data.product.id} — ${data.product.url}`)
  return data.product
}

async function uploadFile(productId: string, pdfPath: string): Promise<void> {
  if (!existsSync(pdfPath)) {
    console.warn(`[${productId}] PDF not found at ${pdfPath}, skipping file upload`)
    return
  }

  const form = new FormData()
  form.append('access_token', ACCESS_TOKEN!)
  form.append('file', createReadStream(pdfPath), {
    filename: path.basename(pdfPath),
    contentType: 'application/pdf',
  })

  const response = await fetch(`${GUMROAD_API}/products/${productId}/files`, {
    method: 'POST',
    headers: form.getHeaders(),
    body: form,
  })

  const data = await response.json() as any
  if (!data.success) {
    throw new Error(`File upload error: ${JSON.stringify(data)}`)
  }

  console.log(`[${productId}] PDF uploaded successfully`)
}

async function enableDiscovery(productId: string): Promise<void> {
  const response = await fetch(`${GUMROAD_API}/products/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      access_token: ACCESS_TOKEN!,
      shown_on_profile: 'true',
      published: 'true',
    }),
  })

  const data = await response.json() as any
  if (!data.success) {
    console.warn(`[${productId}] Could not enable discovery:`, data.message)
  } else {
    console.log(`[${productId}] Discovery enabled`)
  }
}

async function publishAll() {
  console.log('🚀 Publishing all products to Gumroad...\n')

  const results: Array<{ id: string; gumroadId: string; url: string }> = []

  for (const product of PRODUCTS) {
    try {
      console.log(`\n📦 Processing: ${product.name}`)

      // Create the product listing
      const gumroadProduct = await createProduct(product)

      // Upload the PDF file
      await uploadFile(gumroadProduct.id, product.pdfFile)

      // Enable discovery
      await enableDiscovery(gumroadProduct.id)

      results.push({
        id: product.id,
        gumroadId: gumroadProduct.id,
        url: gumroadProduct.url,
      })
    } catch (err) {
      console.error(`\n❌ Failed to publish ${product.id}:`, err)
    }
  }

  console.log('\n\n✅ PUBLISHED PRODUCTS:\n')
  for (const r of results) {
    console.log(`  ${r.id}: ${r.url}`)
  }

  // Save results for reference
  await import('fs/promises').then(fs =>
    fs.writeFile('output/gumroad-products.json', JSON.stringify(results, null, 2))
  )
}

publishAll().catch(console.error)
