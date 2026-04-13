import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')
    const mediaType = file.type as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif' | 'application/pdf'

    // For PDFs, we use document type; for images, we use image type
    const isPDF = mediaType === 'application/pdf'

    const extractionPrompt = `You are an expert accounting data extraction system. Extract all invoice data from this document and return as JSON.

This document may be a multi-page PDF — scan ALL pages. Common formats include Stripe invoices, AWS billing statements, vendor invoices, utility bills, and professional services statements. Handle each format correctly:
- Stripe: charge description is the line item, look for "Amount Due" as total
- AWS: each service row is a separate line item, billing period is the invoice date range
- Multi-page PDFs: consolidate all line items from all pages into the line_items array

Return this exact JSON structure:
{
  "vendor_name": "",
  "vendor_address": "",
  "invoice_number": "",
  "invoice_date": "YYYY-MM-DD or null",
  "due_date": "YYYY-MM-DD or null",
  "subtotal": 0.00,
  "tax_amount": 0.00,
  "total_amount": 0.00,
  "currency": "USD",
  "line_items": [
    {
      "description": "",
      "quantity": 1,
      "unit_price": 0.00,
      "total": 0.00
    }
  ],
  "payment_terms": "",
  "notes": "",
  "confidence": 85
}

Rules:
- All monetary values must be numbers, not strings
- Dates must be in YYYY-MM-DD format or null if not found
- For multi-page documents, use the end date of the billing period as invoice_date
- confidence is 0-100 based on readability and completeness of extracted data
- If a field is not present, use null for strings and 0 for numbers
- Return ONLY the JSON object, no markdown, no explanation`

    const contentParts: Anthropic.MessageParam['content'] = isPDF
      ? [
          {
            type: 'document' as const,
            source: {
              type: 'base64' as const,
              media_type: 'application/pdf' as const,
              data: base64,
            },
          },
          {
            type: 'text' as const,
            text: extractionPrompt,
          },
        ]
      : [
          {
            type: 'image' as const,
            source: {
              type: 'base64' as const,
              media_type: mediaType as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif',
              data: base64,
            },
          },
          {
            type: 'text' as const,
            text: extractionPrompt,
          },
        ]

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: contentParts,
        },
      ],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : '{}'

    // Clean up potential markdown code blocks
    const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

    try {
      const extracted = JSON.parse(cleanText)
      return NextResponse.json({ success: true, data: extracted })
    } catch {
      console.error('Failed to parse AI response:', text)
      return NextResponse.json(
        { success: false, error: 'Could not parse invoice data', raw: text },
        { status: 422 }
      )
    }
  } catch (error) {
    console.error('Extract invoice error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process invoice' },
      { status: 500 }
    )
  }
}
