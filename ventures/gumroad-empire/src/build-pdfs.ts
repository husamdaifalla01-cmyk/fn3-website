import puppeteer from 'puppeteer'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { generatePDFHTML } from './pdf-template.js'

const PRODUCTS = [
  {
    id: 'vibe-coder-launch',
    contentFile: 'products/vibe-coder-launch/content.json',
    outputFile: 'output/vibe-coder-launch-playbook.pdf',
  },
  {
    id: 'ai-workforce-playbook',
    contentFile: 'products/ai-workforce-playbook/content.json',
    outputFile: 'output/ai-workforce-playbook.pdf',
  },
  {
    id: 'freelancer-multiplier',
    contentFile: 'products/freelancer-multiplier/content.json',
    outputFile: 'output/freelancer-multiplier-system.pdf',
  },
  {
    id: 'local-biz-ai-kit',
    contentFile: 'products/local-biz-ai-kit/content.json',
    outputFile: 'output/local-business-ai-kit.pdf',
  },
  {
    id: 'faceless-content-machine',
    contentFile: 'products/faceless-content-machine/content.json',
    outputFile: 'output/faceless-content-machine-2026.pdf',
  },
  {
    id: 'real-estate-agent-cc',
    contentFile: 'products/real-estate-agent-cc/content.json',
    outputFile: 'output/real-estate-agent-command-center.pdf',
  },
  {
    id: 'financial-advisor-cc',
    contentFile: 'products/financial-advisor-cc/content.json',
    outputFile: 'output/financial-advisor-command-center.pdf',
  },
  {
    id: 'personal-injury-attorney-cc',
    contentFile: 'products/personal-injury-attorney-cc/content.json',
    outputFile: 'output/personal-injury-attorney-command-center.pdf',
  },
  {
    id: 'executive-coach-cc',
    contentFile: 'products/executive-coach-cc/content.json',
    outputFile: 'output/executive-coach-command-center.pdf',
  },
]

async function buildPDF(productId: string) {
  const product = PRODUCTS.find(p => p.id === productId)
  if (!product) throw new Error(`Product not found: ${productId}`)

  const contentPath = path.resolve(product.contentFile)
  if (!existsSync(contentPath)) {
    console.log(`[${productId}] Content not ready yet, skipping`)
    return
  }

  console.log(`[${productId}] Building PDF...`)
  const content = JSON.parse(await readFile(contentPath, 'utf-8'))
  const html = generatePDFHTML(content)

  // Ensure output dir exists
  await mkdir('output', { recursive: true })

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  try {
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 })

    await page.pdf({
      path: product.outputFile,
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    })

    console.log(`[${productId}] PDF saved to ${product.outputFile}`)
  } finally {
    await browser.close()
  }
}

async function buildAll() {
  console.log('Building all PDFs...')
  for (const product of PRODUCTS) {
    try {
      await buildPDF(product.id)
    } catch (err) {
      console.error(`[${product.id}] Failed:`, err)
    }
  }
  console.log('Done.')
}

// Run
const target = process.argv[2]
if (target) {
  buildPDF(target).catch(console.error)
} else {
  buildAll().catch(console.error)
}
