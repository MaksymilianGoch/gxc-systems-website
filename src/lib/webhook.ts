const WEBHOOK_URL = process.env.N8N_WEBHOOK_URL!
const TIMEOUT_MS = 10_000
const MAX_RETRIES = 2

export interface ContactFormData {
  name: string
  email: string
  phone: string
  company?: string
  requestType:
    | 'lead-engine'
    | 'terminbuchung'
    | 'online-praesenz'
    | 'kommunikations-hub'
    | 'vollpaket'
    | 'sonstiges'
  description: string
  gdprAccepted: boolean
}

export interface WebhookResult {
  success: boolean
  error?: string
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, { ...options, signal: controller.signal })
    return response
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function sendToN8n(payload: ContactFormData): Promise<WebhookResult> {
  if (!payload.gdprAccepted) {
    return { success: false, error: 'DSGVO-Zustimmung fehlt.' }
  }

  if (!WEBHOOK_URL) {
    console.error('[webhook] N8N_WEBHOOK_URL is not set')
    return { success: false, error: 'Webhook-URL nicht konfiguriert.' }
  }

  const body = JSON.stringify({
    ...payload,
    submittedAt: new Date().toISOString(),
    source: process.env.NEXT_PUBLIC_SITE_URL ?? 'unknown',
  })

  let lastError: string = 'Unbekannter Fehler.'

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetchWithTimeout(
        WEBHOOK_URL,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        },
        TIMEOUT_MS,
      )

      if (response.ok) {
        return { success: true }
      }

      lastError = `HTTP ${response.status}: ${response.statusText}`
      console.warn(`[webhook] Attempt ${attempt + 1} failed: ${lastError}`)
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        lastError = 'Anfrage hat das Zeitlimit überschritten (10s).'
      } else {
        lastError = err instanceof Error ? err.message : String(err)
      }
      console.warn(`[webhook] Attempt ${attempt + 1} error: ${lastError}`)
    }

    if (attempt < MAX_RETRIES) {
      await new Promise((resolve) => setTimeout(resolve, 500 * Math.pow(2, attempt)))
    }
  }

  console.error(`[webhook] All ${MAX_RETRIES + 1} attempts failed. Last error: ${lastError}`)
  return { success: false, error: lastError }
}
