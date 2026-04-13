import Anthropic from '@anthropic-ai/sdk'

interface Product {
  id: string
  title: string
  sku: string | null
  current_stock: number
  avg_daily_sales: number | null
  reorder_point: number | null
  supplier: string | null
  lead_time_days: number | null
}

interface ForecastResult {
  productId: string
  productTitle: string
  daysUntilStockout: number
  recommendedReorderQty: number
  urgencyLevel: 'critical' | 'warning' | 'ok'
  supplierEmail: string
}

function getDaysUntilStockout(product: Product): number {
  if (!product.avg_daily_sales || product.avg_daily_sales === 0) return 999
  return Math.floor(product.current_stock / product.avg_daily_sales)
}

function getUrgencyLevel(product: Product): 'critical' | 'warning' | 'ok' {
  const days = getDaysUntilStockout(product)
  if (days <= 7 || product.current_stock === 0) return 'critical'
  if (days <= 21 || product.current_stock < (product.reorder_point || 0)) return 'warning'
  return 'ok'
}

function getRecommendedReorderQty(product: Product): number {
  const dailySales = product.avg_daily_sales || 1
  const leadTime = product.lead_time_days || 14
  const safetyStock = dailySales * 14
  const reorderQty = dailySales * (leadTime + 30) + safetyStock - product.current_stock
  return Math.max(Math.ceil(reorderQty), 50)
}

export async function POST(request: Request) {
  const client = new Anthropic()
  const { products, storeInfo } = await request.json()

  const results: ForecastResult[] = []

  for (const product of products) {
    const days = getDaysUntilStockout(product)
    const urgency = getUrgencyLevel(product)
    const reorderQty = getRecommendedReorderQty(product)

    const emailPrompt = `You are the operations manager for the Shopify store "${storeInfo?.name || 'our store'}".

You need to place an urgent reorder with a supplier. Use the following inventory data to write a precise, professional reorder email:

- Product: ${product.title}
- SKU: ${product.sku || 'N/A'}
- Supplier: ${product.supplier || 'our supplier'}
- Current stock: ${product.current_stock} units
- Average daily velocity: ${product.avg_daily_sales} units/day
- Days to stockout: ${days === 999 ? 'No sales velocity data — flag as dead stock candidate' : `${days} days`}
- Reorder point threshold: ${product.reorder_point ?? 'not set'}
- Supplier lead time: ${product.lead_time_days ?? 14} days
- Requested reorder quantity: ${reorderQty} units
- Urgency level: ${urgency.toUpperCase()}

Write a concise, firm supplier reorder email. Requirements:
1. Subject line that conveys urgency proportional to the urgency level
2. Open with the specific reorder request — no pleasantries
3. Include the SKU, quantity, and required delivery date calculated from today plus lead time
4. If urgency is CRITICAL, request expedited shipping and state the revenue impact of a stockout
5. If urgency is WARNING, note the trend and request standard priority
6. Close with a clear response deadline (24 hours for CRITICAL, 48 hours for WARNING)
7. Sign off as the operations team of ${storeInfo?.name || 'our store'}

Under 180 words. Format as a ready-to-send email with Subject on the first line.`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      messages: [{ role: 'user', content: emailPrompt }],
    })

    const emailText = message.content[0].type === 'text' ? message.content[0].text : ''

    results.push({
      productId: product.id,
      productTitle: product.title,
      daysUntilStockout: days,
      recommendedReorderQty: reorderQty,
      urgencyLevel: urgency,
      supplierEmail: emailText,
    })
  }

  return Response.json({ results })
}
