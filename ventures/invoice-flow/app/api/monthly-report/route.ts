import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'
import { Invoice } from '@/types'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function formatCurrency(val: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { org_id, client_id, month, year } = body as {
      org_id: string
      client_id?: string
      month: number // 1-12
      year: number
    }

    if (!org_id || !month || !year) {
      return NextResponse.json({ success: false, error: 'org_id, month, and year required' }, { status: 400 })
    }

    if (month < 1 || month > 12) {
      return NextResponse.json({ success: false, error: 'month must be 1-12' }, { status: 400 })
    }

    const supabase = createServerSupabase()

    // Build date range for the requested month
    const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0]
    const endDate = new Date(year, month, 0).toISOString().split('T')[0]

    // Build date range for previous month (for MoM comparison)
    const prevMonth = month === 1 ? 12 : month - 1
    const prevYear = month === 1 ? year - 1 : year
    const prevStartDate = new Date(prevYear, prevMonth - 1, 1).toISOString().split('T')[0]
    const prevEndDate = new Date(prevYear, prevMonth, 0).toISOString().split('T')[0]

    let invoiceQuery = supabase
      .from('invoices')
      .select('*')
      .eq('org_id', org_id)
      .in('status', ['extracted', 'reviewed', 'exported'])
      .gte('invoice_date', startDate)
      .lte('invoice_date', endDate)

    let prevQuery = supabase
      .from('invoices')
      .select('*')
      .eq('org_id', org_id)
      .in('status', ['extracted', 'reviewed', 'exported'])
      .gte('invoice_date', prevStartDate)
      .lte('invoice_date', prevEndDate)

    if (client_id) {
      // Filter by client if provided (client_id stored on invoice if client portal is used)
      invoiceQuery = invoiceQuery.eq('client_id', client_id)
      prevQuery = prevQuery.eq('client_id', client_id)
    }

    const [{ data: invoices }, { data: prevInvoices }] = await Promise.all([invoiceQuery, prevQuery])

    const currentInvoices = (invoices as Invoice[]) || []
    const previousInvoices = (prevInvoices as Invoice[]) || []

    if (currentInvoices.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          report: `# Monthly Report — ${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}\n\nNo invoices found for this period.`,
          stats: { total: 0, count: 0 },
        },
      })
    }

    // Aggregate stats
    const totalSpend = currentInvoices.reduce((s, i) => s + (i.total_amount || 0), 0)
    const prevTotalSpend = previousInvoices.reduce((s, i) => s + (i.total_amount || 0), 0)
    const momChange = prevTotalSpend > 0 ? ((totalSpend - prevTotalSpend) / prevTotalSpend) * 100 : null

    // Group by category
    const byCategory = currentInvoices.reduce((acc: Record<string, { total: number; count: number }>, inv) => {
      const cat = inv.expense_category || 'Uncategorized'
      if (!acc[cat]) acc[cat] = { total: 0, count: 0 }
      acc[cat].total += inv.total_amount || 0
      acc[cat].count += 1
      return acc
    }, {})

    const prevByCategory = previousInvoices.reduce((acc: Record<string, number>, inv) => {
      const cat = inv.expense_category || 'Uncategorized'
      acc[cat] = (acc[cat] || 0) + (inv.total_amount || 0)
      return acc
    }, {})

    // Top vendors
    const byVendor = currentInvoices.reduce((acc: Record<string, number>, inv) => {
      const v = inv.vendor_name || 'Unknown'
      acc[v] = (acc[v] || 0) + (inv.total_amount || 0)
      return acc
    }, {})
    const topVendors = Object.entries(byVendor)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)

    // New vendors (not seen in prev month)
    const prevVendors = new Set(previousInvoices.map(i => i.vendor_name))
    const newVendors = [...new Set(currentInvoices.map(i => i.vendor_name).filter(v => v && !prevVendors.has(v)))]

    // Missing regular vendors (in prev month but not current)
    const currentVendors = new Set(currentInvoices.map(i => i.vendor_name))
    const missingVendors = [...new Set(previousInvoices.map(i => i.vendor_name).filter(v => v && !currentVendors.has(v)))]

    // High amount invoices (anomalies)
    const avgAmount = totalSpend / currentInvoices.length
    const highAmountInvoices = currentInvoices.filter(i => (i.total_amount || 0) > avgAmount * 2.5)

    const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' })

    // Prepare data summary for Claude
    const dataSummary = `
Month: ${monthName} ${year}
Total Invoices: ${currentInvoices.length}
Total Spend: ${formatCurrency(totalSpend)}
Previous Month Spend: ${prevTotalSpend > 0 ? formatCurrency(prevTotalSpend) : 'N/A'}
MoM Change: ${momChange !== null ? `${momChange > 0 ? '+' : ''}${momChange.toFixed(1)}%` : 'N/A (no prior month data)'}

EXPENSE BY CATEGORY:
${Object.entries(byCategory)
  .sort(([, a], [, b]) => b.total - a.total)
  .map(([cat, data]) => {
    const prev = prevByCategory[cat] || 0
    const change = prev > 0 ? ((data.total - prev) / prev * 100).toFixed(1) : null
    return `- ${cat}: ${formatCurrency(data.total)} (${data.count} invoices)${change ? ` [${parseFloat(change) > 0 ? '+' : ''}${change}% vs last month]` : ''}`
  }).join('\n')}

TOP 5 VENDORS BY SPEND:
${topVendors.map(([v, amt], i) => `${i + 1}. ${v}: ${formatCurrency(amt)}`).join('\n')}

NEW VENDORS THIS MONTH (${newVendors.length}):
${newVendors.length > 0 ? newVendors.map(v => `- ${v}`).join('\n') : 'None'}

VENDORS MISSING THIS MONTH (${missingVendors.length}):
${missingVendors.length > 0 ? missingVendors.slice(0, 10).map(v => `- ${v}`).join('\n') : 'None'}

UNUSUALLY LARGE INVOICES (${highAmountInvoices.length}):
${highAmountInvoices.map(i => `- ${i.vendor_name}: ${formatCurrency(i.total_amount || 0)} (${i.invoice_date})`).join('\n') || 'None'}
`

    const prompt = `You are an expert accountant preparing a monthly expense report for a client.
Based on the following data, write a professional, concise monthly reconciliation report in Markdown format.

The report should include:
1. Executive Summary (2-3 sentences)
2. Expense Summary by Category (table format)
3. Month-over-Month Analysis (highlight significant changes, trends)
4. Anomaly Notes (new vendors, missing regular vendors, unusually high amounts)
5. Top 5 Vendors by Spend
6. Key Recommendations (1-3 action items for the client)

Data:
${dataSummary}

Write the report in a professional but readable tone. Use specific numbers from the data. Keep it focused and actionable.`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    })

    const report = message.content[0].type === 'text' ? message.content[0].text : 'Report generation failed.'

    return NextResponse.json({
      success: true,
      data: {
        report,
        stats: {
          total: totalSpend,
          count: currentInvoices.length,
          prev_total: prevTotalSpend,
          mom_change: momChange,
          top_vendors: topVendors,
          by_category: byCategory,
          new_vendors: newVendors,
          missing_vendors: missingVendors,
        },
        period: { month, year, monthName },
      },
    })
  } catch (error) {
    console.error('Monthly report error:', error)
    return NextResponse.json({ success: false, error: 'Report generation failed' }, { status: 500 })
  }
}
