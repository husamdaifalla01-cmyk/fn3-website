import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'
import { Invoice } from '@/types'

function escapeCSV(value: string | number | null | undefined): string {
  if (value == null) return ''
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function generateQuickBooksCSV(invoices: Invoice[]): string {
  // QuickBooks IIF format headers
  const headers = [
    'Date',
    'Vendor',
    'Invoice Number',
    'Due Date',
    'GL Account',
    'Category',
    'Description',
    'Amount',
    'Tax Amount',
    'Total',
    'Currency',
    'Status',
    'Confidence',
    'Notes',
  ]

  const rows = [headers.join(',')]

  for (const invoice of invoices) {
    const row = [
      escapeCSV(invoice.invoice_date),
      escapeCSV(invoice.vendor_name),
      escapeCSV(invoice.invoice_number),
      escapeCSV(invoice.due_date),
      escapeCSV(invoice.gl_code),
      escapeCSV(invoice.expense_category),
      escapeCSV(invoice.file_name),
      escapeCSV(invoice.subtotal),
      escapeCSV(invoice.tax_amount),
      escapeCSV(invoice.total_amount),
      escapeCSV(invoice.currency),
      escapeCSV(invoice.status),
      escapeCSV(invoice.confidence_score),
      escapeCSV(invoice.notes),
    ]
    rows.push(row.join(','))
  }

  return rows.join('\n')
}

function generateXeroCSV(invoices: Invoice[]): string {
  // Xero import format
  const headers = [
    '*ContactName',
    'EmailAddress',
    '*InvoiceNumber',
    '*InvoiceDate',
    '*DueDate',
    '*Description',
    '*Quantity',
    '*UnitAmount',
    'Discount',
    '*AccountCode',
    '*TaxType',
    'TrackingName1',
    'TrackingOption1',
    'Currency',
  ]

  const rows = [headers.join(',')]

  for (const invoice of invoices) {
    if (invoice.line_items && invoice.line_items.length > 0) {
      for (const item of invoice.line_items) {
        const row = [
          escapeCSV(invoice.vendor_name),
          '',
          escapeCSV(invoice.invoice_number),
          escapeCSV(invoice.invoice_date),
          escapeCSV(invoice.due_date),
          escapeCSV(item.description),
          escapeCSV(item.quantity),
          escapeCSV(item.unit_price),
          '',
          escapeCSV(item.gl_code || invoice.gl_code),
          'Tax Exclusive',
          '',
          '',
          escapeCSV(invoice.currency),
        ]
        rows.push(row.join(','))
      }
    } else {
      const row = [
        escapeCSV(invoice.vendor_name),
        '',
        escapeCSV(invoice.invoice_number),
        escapeCSV(invoice.invoice_date),
        escapeCSV(invoice.due_date),
        escapeCSV(invoice.file_name || 'Invoice'),
        '1',
        escapeCSV(invoice.subtotal),
        '',
        escapeCSV(invoice.gl_code),
        'Tax Exclusive',
        '',
        '',
        escapeCSV(invoice.currency),
      ]
      rows.push(row.join(','))
    }
  }

  return rows.join('\n')
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { invoiceIds, format = 'quickbooks' } = body as {
      invoiceIds: string[]
      format?: 'quickbooks' | 'xero'
    }

    if (!invoiceIds || invoiceIds.length === 0) {
      return NextResponse.json({ success: false, error: 'No invoice IDs provided' }, { status: 400 })
    }

    const supabase = createServerSupabase()

    const { data: invoices, error } = await supabase
      .from('invoices')
      .select('*, line_items(*)')
      .in('id', invoiceIds)

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    const csv =
      format === 'xero'
        ? generateXeroCSV(invoices as Invoice[])
        : generateQuickBooksCSV(invoices as Invoice[])

    // Mark invoices as exported
    await supabase
      .from('invoices')
      .update({ status: 'exported', updated_at: new Date().toISOString() })
      .in('id', invoiceIds)

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="invoices-export-${format}-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error('Export CSV error:', error)
    return NextResponse.json({ success: false, error: 'Export failed' }, { status: 500 })
  }
}
