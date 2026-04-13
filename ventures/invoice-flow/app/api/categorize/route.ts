import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'
import { ExtractedInvoiceData, CategorizationResult } from '@/types'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

type TargetSystem = 'quickbooks' | 'xero' | 'generic'

const XERO_COA = `
410 - Sales (income)
420 - Other Revenue (income)
425 - Interest Income (income)
400 - Direct Costs (cost of sales)
404 - Purchases (cost of sales)
408 - Cost of Goods Sold (cost of sales)
420 - Advertising (expense)
425 - Bank Fees (expense)
429 - Cleaning (expense)
433 - Consulting & Accounting (expense)
437 - Entertainment (expense)
441 - Freight & Courier (expense)
445 - General Expenses (expense)
449 - Insurance (expense)
453 - Interest Expense (expense)
461 - IT Software & Subscriptions (expense)
463 - Light, Power, Heating (expense)
469 - Motor Vehicle Expenses (expense)
471 - Office Expenses (expense)
473 - Postage & Delivery (expense)
477 - Printing & Stationery (expense)
479 - Rent (expense)
480 - Repairs & Maintenance (expense)
484 - Salaries (expense)
485 - Subscriptions (expense)
489 - Telephone & Internet (expense)
493 - Travel (expense)`

const QB_DEFAULT_COA = `6000 - Operating Expenses\n6010 - Office Supplies\n6020 - Software & Subscriptions\n6030 - Professional Services\n6040 - Marketing & Advertising\n6050 - Travel & Entertainment\n6060 - Utilities\n6070 - Rent & Facilities\n6080 - Insurance\n6090 - Equipment & Hardware\n6100 - Repairs & Maintenance\n6110 - Shipping & Postage\n6120 - Bank & Finance Charges`

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { invoice, chartOfAccounts, targetSystem = 'quickbooks' } = body as {
      invoice: ExtractedInvoiceData
      chartOfAccounts?: { code: string; name: string; account_type: string }[]
      targetSystem?: TargetSystem
    }

    let coaContext: string
    if (chartOfAccounts?.length) {
      coaContext = `\n\nAvailable GL codes (use these when possible):\n${chartOfAccounts
        .map((a) => `${a.code} - ${a.name} (${a.account_type})`)
        .join('\n')}`
    } else if (targetSystem === 'xero') {
      coaContext = `\n\nTarget system: Xero. Use Xero default chart of accounts (200-series income, 400-series expenses):\n${XERO_COA}`
    } else {
      coaContext = `\n\nTarget system: QuickBooks. Default GL codes to use:\n${QB_DEFAULT_COA}`
    }

    const outputNote =
      targetSystem === 'xero'
        ? '\nOutput gl_code must be a Xero account code (e.g. 461, 425, 479). Do not use 4-digit QuickBooks codes.'
        : targetSystem === 'quickbooks'
        ? '\nOutput gl_code must be a QuickBooks account code (e.g. 6020, 6110). Do not use 3-digit Xero codes.'
        : ''

    const prompt = `You are an expert accountant specializing in GL coding and invoice categorization. Categorize this invoice for accounting purposes.${outputNote}

Invoice Details:
- Vendor: ${invoice.vendor_name || 'Unknown'}
- Line Items: ${invoice.line_items?.map((li) => li.description).join(', ') || 'Not available'}
- Total: ${invoice.currency} ${invoice.total_amount}
- Payment Terms: ${invoice.payment_terms || 'N/A'}
- Invoice Date: ${invoice.invoice_date || 'Unknown'}
- Due Date: ${invoice.due_date || 'Unknown'}
${coaContext}

Vendor pattern rules (apply these first before general reasoning):
- Amazon Web Services, Google Cloud, Azure, DigitalOcean, Vercel, Netlify, Cloudflare → Software & Subscriptions / Infrastructure
- Stripe, PayPal, Square, Braintree → Bank & Finance Charges
- Slack, Notion, Figma, Linear, GitHub, Atlassian, Jira → Software & Subscriptions
- WeWork, Regus, IWG → Rent & Facilities
- FedEx, UPS, DHL, USPS → Shipping & Postage
- AT&T, Verizon, Comcast, T-Mobile → Utilities
- Google Ads, Meta, LinkedIn, Twitter/X → Marketing & Advertising
- Office Depot, Staples, Amazon (office supplies) → Office Supplies
- Dell, Apple, Lenovo, HP (hardware) → Equipment & Hardware
- Law firms, accounting firms, consultants → Professional Services

Analyze this invoice and return a JSON object with this exact structure:
{
  "gl_code": "6000",
  "expense_category": "Office Supplies",
  "confidence": 85,
  "reasoning": "Brief explanation of categorization referencing vendor name and line items",
  "anomalies": [
    {
      "type": "duplicate_risk",
      "description": "Description of the anomaly",
      "severity": "low|medium|high"
    }
  ]
}

Anomaly types to check for:
- "unusual_amount": Amount seems unusually high/low for this vendor type
- "new_vendor": First time seeing this vendor
- "missing_details": Critical invoice fields are missing (invoice number, date, vendor address)
- "round_number": Suspiciously round numbers (e.g. exactly $1000, $5000) that may indicate an estimate
- "future_date": Invoice date is in the future
- "overdue": Due date has passed

Return ONLY the JSON, no other text.`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : '{}'
    const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

    try {
      const result: CategorizationResult = JSON.parse(cleanText)
      return NextResponse.json({ success: true, data: result, targetSystem })
    } catch {
      return NextResponse.json(
        { success: false, error: 'Could not parse categorization' },
        { status: 422 }
      )
    }
  } catch (error) {
    console.error('Categorize error:', error)
    return NextResponse.json({ success: false, error: 'Categorization failed' }, { status: 500 })
  }
}
