export const mockStore = {
  id: 'mock-store-1',
  owner_id: 'mock-user-1',
  store_name: 'Velocity Athletics',
  shopify_domain: 'velocity-athletics.myshopify.com',
  annual_revenue_estimate: '$500K-$1M',
  plan: 'scale',
  created_at: new Date().toISOString(),
}

export const mockProducts = [
  {
    id: '1',
    store_id: 'mock-store-1',
    shopify_product_id: 'sp_001',
    title: 'Pro Training Shorts',
    sku: 'PTS-001',
    current_stock: 12,
    reorder_point: 50,
    avg_daily_sales: 4.2,
    supplier: 'Pacific Sportswear Co.',
    lead_time_days: 14,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    store_id: 'mock-store-1',
    shopify_product_id: 'sp_002',
    title: 'Compression Tights',
    sku: 'CT-002',
    current_stock: 8,
    reorder_point: 40,
    avg_daily_sales: 3.8,
    supplier: 'Pacific Sportswear Co.',
    lead_time_days: 14,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    store_id: 'mock-store-1',
    shopify_product_id: 'sp_003',
    title: 'Performance Hoodie',
    sku: 'PH-003',
    current_stock: 145,
    reorder_point: 60,
    avg_daily_sales: 2.1,
    supplier: 'Summit Apparel Ltd.',
    lead_time_days: 21,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    store_id: 'mock-store-1',
    shopify_product_id: 'sp_004',
    title: 'Running Vest',
    sku: 'RV-004',
    current_stock: 3,
    reorder_point: 30,
    avg_daily_sales: 2.9,
    supplier: 'Summit Apparel Ltd.',
    lead_time_days: 21,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    store_id: 'mock-store-1',
    shopify_product_id: 'sp_005',
    title: 'Sports Bra Elite',
    sku: 'SBE-005',
    current_stock: 67,
    reorder_point: 45,
    avg_daily_sales: 5.3,
    supplier: 'Pacific Sportswear Co.',
    lead_time_days: 14,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    store_id: 'mock-store-1',
    shopify_product_id: 'sp_006',
    title: 'Training Tank Top',
    sku: 'TTT-006',
    current_stock: 220,
    reorder_point: 80,
    avg_daily_sales: 6.7,
    supplier: 'Pacific Sportswear Co.',
    lead_time_days: 14,
    created_at: new Date().toISOString(),
  },
  {
    id: '7',
    store_id: 'mock-store-1',
    shopify_product_id: 'sp_007',
    title: 'Gym Bag Pro',
    sku: 'GBP-007',
    current_stock: 0,
    reorder_point: 25,
    avg_daily_sales: 1.8,
    supplier: 'AccessoryHub Inc.',
    lead_time_days: 30,
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    store_id: 'mock-store-1',
    shopify_product_id: 'sp_008',
    title: 'Resistance Bands Set',
    sku: 'RBS-008',
    current_stock: 34,
    reorder_point: 40,
    avg_daily_sales: 3.1,
    supplier: 'AccessoryHub Inc.',
    lead_time_days: 30,
    created_at: new Date().toISOString(),
  },
]

export const mockTickets = [
  {
    id: 't1',
    store_id: 'mock-store-1',
    customer_email: 'sarah.m@gmail.com',
    customer_name: 'Sarah Mitchell',
    subject: 'Want to return my order',
    original_message: "Hi, I received my order #4521 yesterday but the size is completely wrong. I ordered a medium but received a large. I need to return this and get the right size. Can you help me?",
    ai_draft_reply: null,
    status: 'pending' as const,
    ticket_type: 'return' as const,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 't2',
    store_id: 'mock-store-1',
    customer_email: 'james.k@hotmail.com',
    customer_name: 'James Kowalski',
    subject: 'Order hasn\'t arrived yet',
    original_message: "I placed order #4498 over 2 weeks ago and still haven't received it. The tracking shows it's been sitting at a distribution center for 5 days. This is really frustrating, I needed these for a race this weekend.",
    ai_draft_reply: null,
    status: 'pending' as const,
    ticket_type: 'shipping' as const,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 't3',
    store_id: 'mock-store-1',
    customer_email: 'priya.s@yahoo.com',
    customer_name: 'Priya Sharma',
    subject: 'Question about compression tights',
    original_message: "Hi! I'm interested in the Compression Tights but wanted to know if they're suitable for marathon training. I do about 60 miles a week and need something that will hold up. Also what's the difference between the S and M size? I'm usually a size 6-8.",
    ai_draft_reply: null,
    status: 'pending' as const,
    ticket_type: 'product_question' as const,
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 't4',
    store_id: 'mock-store-1',
    customer_email: 'mike.d@gmail.com',
    customer_name: 'Mike Davidson',
    subject: 'Very unhappy with quality',
    original_message: "I'm extremely disappointed. The training shorts I bought started falling apart after just 3 washes. The stitching on the waistband is completely unraveling. For $65 I expected much better quality. I want a refund immediately.",
    ai_draft_reply: null,
    status: 'pending' as const,
    ticket_type: 'complaint' as const,
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 't5',
    store_id: 'mock-store-1',
    customer_email: 'lisa.t@icloud.com',
    customer_name: 'Lisa Torres',
    subject: 'Loved my order!',
    original_message: "Just wanted to say the sports bra is incredible. I've tried dozens of brands and this is the best support I've ever had. Already recommended to my whole running group. When will you restock the blue colorway?",
    ai_draft_reply: "Hi Lisa,\n\nThank you so much for your kind words — this genuinely made our day! We're thrilled the Sports Bra Elite is working so well for your training.\n\nRegarding the blue colorway, we're expecting a restock in approximately 3-4 weeks. We'd love to notify you the moment it's back — shall I add you to the priority notification list?\n\nThanks again for recommending us to your running group. It means the world to us!\n\nWarm regards,\nVelocity Athletics Support Team",
    status: 'replied' as const,
    ticket_type: 'product_question' as const,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
]

export function getDaysUntilStockout(product: typeof mockProducts[0]): number {
  if (!product.avg_daily_sales || product.avg_daily_sales === 0) return 999
  return Math.floor(product.current_stock / product.avg_daily_sales)
}

export function getUrgencyLevel(product: typeof mockProducts[0]): 'critical' | 'warning' | 'ok' {
  const days = getDaysUntilStockout(product)
  if (days <= 7 || product.current_stock === 0) return 'critical'
  if (days <= 21 || product.current_stock < (product.reorder_point || 0)) return 'warning'
  return 'ok'
}

export function getRecommendedReorderQty(product: typeof mockProducts[0]): number {
  const dailySales = product.avg_daily_sales || 1
  const leadTime = product.lead_time_days || 14
  const safetyStock = dailySales * 14
  const reorderQty = dailySales * (leadTime + 30) + safetyStock - product.current_stock
  return Math.max(Math.ceil(reorderQty), 50)
}
