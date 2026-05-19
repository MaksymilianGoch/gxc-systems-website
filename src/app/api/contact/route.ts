import { type NextRequest, NextResponse } from 'next/server'
import { sendToN8n } from '@/lib/webhook'
import { validateContactForm, isFormValid } from '@/lib/validation'
import type { ContactFormData } from '@/lib/webhook'

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 })
  }

  const data = body as Partial<ContactFormData>
  const errors = validateContactForm(data)

  if (!isFormValid(errors)) {
    return NextResponse.json({ error: 'Validierung fehlgeschlagen.', errors }, { status: 422 })
  }

  const result = await sendToN8n(data as ContactFormData)

  if (!result.success) {
    return NextResponse.json(
      { error: result.error ?? 'Webhook-Fehler.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
