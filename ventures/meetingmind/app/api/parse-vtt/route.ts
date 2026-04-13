import { NextRequest, NextResponse } from 'next/server'

function parseVTT(vttContent: string): string {
  const lines = vttContent.split('\n')
  const textLines: string[] = []

  let skipNext = false

  for (const line of lines) {
    const trimmed = line.trim()

    // Skip WEBVTT header
    if (trimmed === 'WEBVTT' || trimmed.startsWith('WEBVTT ')) {
      continue
    }

    // Skip NOTE blocks
    if (trimmed.startsWith('NOTE')) {
      skipNext = true
      continue
    }

    // Skip empty lines that follow NOTE
    if (skipNext && trimmed === '') {
      skipNext = false
      continue
    }

    // Skip timestamp lines (format: 00:00:00.000 --> 00:00:00.000)
    if (trimmed.match(/^\d{2}:\d{2}:\d{2}[.,]\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}[.,]\d{3}/)) {
      continue
    }

    // Skip cue identifiers (lines that are just numbers or short ids before timestamps)
    if (trimmed.match(/^\d+$/) || trimmed.match(/^[a-f0-9-]{36}$/)) {
      continue
    }

    // Skip empty lines
    if (trimmed === '') {
      continue
    }

    // Remove HTML-like tags (e.g., <c>, <v Speaker Name>)
    const cleanedLine = trimmed
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .trim()

    if (cleanedLine) {
      textLines.push(cleanedLine)
    }
  }

  return textLines.join('\n')
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const fileName = file.name.toLowerCase()
    if (!fileName.endsWith('.vtt') && !fileName.endsWith('.txt')) {
      return NextResponse.json(
        { error: 'Only .vtt and .txt files are supported' },
        { status: 400 }
      )
    }

    const content = await file.text()

    let transcript: string
    if (fileName.endsWith('.vtt')) {
      transcript = parseVTT(content)
    } else {
      transcript = content
    }

    if (!transcript.trim()) {
      return NextResponse.json({ error: 'Could not extract text from file' }, { status: 400 })
    }

    return NextResponse.json({ transcript })
  } catch (error) {
    console.error('VTT parse error:', error)
    return NextResponse.json(
      { error: 'Failed to parse file. Please try again.' },
      { status: 500 }
    )
  }
}
