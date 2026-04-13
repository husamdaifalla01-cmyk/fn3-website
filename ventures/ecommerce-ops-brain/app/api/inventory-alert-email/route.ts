import Anthropic from '@anthropic-ai/sdk'

interface SKUAtRisk {
  productTitle: string
  sku: string | null
  daysUntilStockout: number
  recommendedReorderQty: number
  urgencyLevel: 'critical' | 'warning' | 'ok'
  avgDailySales?: number
  currentStock?: number
  price?: number
}

interface AlertEmailInput {
  skusAtRisk: SKUAtRisk[]
  storeInfo?: { name?: string; supplierName?: string; supplierEmail?: string }
  deliveryDeadlineDays?: number
}

export async function POST(request: Request) {
  const client = new Anthropic()
  const body: AlertEmailInput = await request.json()
  const { skusAtRisk, storeInfo, deliveryDeadlineDays } = body

  const storeName = storeInfo?.name || 'Our Store'
  const supplierName = storeInfo?.supplierName || 'Supplier'
  const supplierEmail = storeInfo?.supplierEmail || 'supplier@example.com'
  const deadlineDays = deliveryDeadlineDays || 14

  const today = new Date()
  const deadlineDate = new Date(today.getTime() + deadlineDays * 24 * 60 * 60 * 1000)
  const deadlineStr = deadlineDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  const criticalSkus = skusAtRisk.filter(s => s.urgencyLevel === 'critical')
  const warningSkus = skusAtRisk.filter(s => s.urgencyLevel === 'warning')

  // Calculate total revenue at risk
  const totalRevenueAtRisk = skusAtRisk.reduce((sum, sku) => {
    if (sku.price && sku.avgDailySales && sku.daysUntilStockout < 999) {
      const daysOfRisk = Math.max(0, deadlineDays - sku.daysUntilStockout)
      return sum + (sku.price * sku.avgDailySales * daysOfRisk)
    }
    return sum
  }, 0)

  const skuDetails = skusAtRisk
    .filter(s => s.urgencyLevel !== 'ok')
    .map(sku => {
      const revenueImpact = sku.price && sku.avgDailySales && sku.daysUntilStockout < 999
        ? `$${(sku.price * sku.avgDailySales * Math.max(0, deadlineDays - sku.daysUntilStockout)).toFixed(0)}`
        : 'unknown'
      return `- ${sku.productTitle}${sku.sku ? ` (SKU: ${sku.sku})` : ''}
  Urgency: ${sku.urgencyLevel.toUpperCase()}
  Current stock: ${sku.currentStock ?? 'unknown'} units
  Days to stockout: ${sku.daysUntilStockout >= 999 ? 'No velocity data' : `${sku.daysUntilStockout} days`}
  Reorder quantity needed: ${sku.recommendedReorderQty} units
  Estimated revenue at risk if delayed: ${revenueImpact}`
    }).join('\n\n')

  const prompt = `You are the operations manager for "${storeName}". You need to write an urgent supplier reorder alert email.

SITUATION:
- ${criticalSkus.length} SKU(s) at CRITICAL stock level (stockout in 7 days or less)
- ${warningSkus.length} SKU(s) at WARNING level (stockout in 7–21 days)
- Required delivery deadline: ${deadlineStr} (${deadlineDays} days from today)
- Total estimated revenue at risk: ${totalRevenueAtRisk > 0 ? `$${totalRevenueAtRisk.toFixed(0)}` : 'significant'}
- Supplier: ${supplierName} (${supplierEmail})

SKUs requiring immediate reorder:
${skuDetails}

Write a complete, ready-to-send supplier alert email. Requirements:
1. Subject line: urgent, specific — include the word "URGENT" if any critical SKUs, number of SKUs, and the deadline date
2. Opening: State the reorder request immediately — no pleasantries beyond a brief greeting
3. Reorder table: For each SKU include product name, SKU, quantity needed, and required delivery date
4. Revenue consequence section: One paragraph stating the total revenue impact if delivery is delayed past the deadline
5. Deadline: State the exact required delivery date (${deadlineStr}) and that you need order confirmation within 24 hours for CRITICAL items, 48 hours for WARNING items
6. Closing: Firm but professional. Sign off as the Operations Team at ${storeName}

Format with clear sections. Under 300 words total. Subject line first, then email body.`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 768,
    messages: [{ role: 'user', content: prompt }],
  })

  const emailText = message.content[0].type === 'text' ? message.content[0].text : ''

  return Response.json({
    email: emailText,
    summary: {
      criticalCount: criticalSkus.length,
      warningCount: warningSkus.length,
      totalSkusAtRisk: skusAtRisk.filter(s => s.urgencyLevel !== 'ok').length,
      estimatedRevenueAtRisk: totalRevenueAtRisk,
      deliveryDeadline: deadlineStr,
    },
  })
}
