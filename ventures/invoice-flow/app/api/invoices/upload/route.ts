import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const orgId = formData.get('orgId') as string
    const userId = formData.get('userId') as string

    if (!file || !orgId || !userId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = createServerSupabase()

    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop()
    const filePath = `${orgId}/${userId}/${Date.now()}.${fileExt}`

    const bytes = await file.arrayBuffer()
    const { error: uploadError } = await supabase.storage
      .from('invoices')
      .upload(filePath, bytes, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      return NextResponse.json(
        { success: false, error: 'Failed to upload file' },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from('invoices').getPublicUrl(filePath)

    // Create invoice record
    const { data: invoice, error: dbError } = await supabase
      .from('invoices')
      .insert({
        org_id: orgId,
        uploaded_by: userId,
        file_path: filePath,
        file_name: file.name,
        file_url: urlData.publicUrl,
        status: 'processing',
        currency: 'USD',
        is_duplicate: false,
        anomalies: [],
      })
      .select()
      .single()

    if (dbError) {
      console.error('DB insert error:', dbError)
      return NextResponse.json(
        { success: false, error: 'Failed to create invoice record' },
        { status: 500 }
      )
    }

    // Increment monthly count
    await supabase.rpc('increment_invoice_count', { org_uuid: orgId })

    return NextResponse.json({ success: true, invoice })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 })
  }
}
