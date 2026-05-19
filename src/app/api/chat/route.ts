import { type NextRequest, NextResponse } from 'next/server'

const OLLAMA_URL = process.env.OLLAMA_URL ?? 'http://localhost:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? 'gemma4'

const SYSTEM_PROMPT = `Du bist der digitale Assistent von GXC Systems, einer Agentur für Prozessautomation im Dreiländereck (Vorarlberg/AT, Ostschweiz/CH, Liechtenstein, Bodensee/DE).

Deine Aufgabe: Interessenten helfen herauszufinden, welche Leistungen für ihren Betrieb relevant sind, und sie — wenn sie bereit sind — zum kostenlosen Erstgespräch führen.

SPRACHE: Immer Deutsch, formell (Sie). Kein Denglisch.
LÄNGE: Kurz und präzise. Maximal 3–4 Sätze pro Antwort.
TON: Direkt, ehrlich, kein Marketing-Jargon.

LEISTUNGEN VON GXC SYSTEMS:
- Lead-Engine (ab 1.490 € im Starter): Automatische Lead-Erfassung → CRM → Sofortbenachrichtigung per Slack/Telegram
- Terminbuchung (im Starter enthalten): Calendly-Integration, Erinnerungen, kein Telefon-Pingpong mehr
- Online-Präsenz (ab Professional): Landingpage + Google Business Profile + lokale SEO
- Kommunikations-Hub (ab Professional): Follow-up-Sequenzen, automatische Angebots-Reminder
- Voice Agent (nur Vollsystem): KI nimmt Anrufe außerhalb der Geschäftszeiten entgegen

PAKETE:
- Starter: 1.490 € einmalig (Lead-Engine + Terminbuchung)
- Professional: 2.990 € einmalig + 249 €/Monat (Alle 4 Module + Website) — meistgewählt
- Vollsystem: 4.490 € einmalig + 399 €/Monat (Professional + Voice Agent + Priority Support)

REGELN:
- Nie Preise herunterhandeln oder Rabatte versprechen
- Bei konkretem Interesse immer auf das Erstgespräch hinweisen
- Keine Aussagen über Mitbewerber
- Nie behaupten, ein Mensch zu sein`

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface OllamaChunk {
  message?: { content: string }
  done: boolean
}

export async function POST(req: NextRequest): Promise<Response> {
  let messages: ChatMessage[]

  try {
    const body = (await req.json()) as { messages: ChatMessage[] }
    messages = body.messages
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 })
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'Keine Nachrichten.' }, { status: 400 })
  }

  let ollamaResponse: Response

  try {
    ollamaResponse = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    })
  } catch {
    return NextResponse.json(
      { error: 'Ollama nicht erreichbar. Bitte stellen Sie sicher, dass Ollama läuft.' },
      { status: 503 },
    )
  }

  if (!ollamaResponse.ok || !ollamaResponse.body) {
    return NextResponse.json(
      { error: `Ollama-Fehler: HTTP ${ollamaResponse.status}` },
      { status: 502 },
    )
  }

  // Ollama streams newline-delimited JSON — we forward only the text content
  const encoder = new TextEncoder()
  const upstreamBody = ollamaResponse.body

  const readable = new ReadableStream({
    async start(controller) {
      const reader = upstreamBody.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            if (!line.trim()) continue
            try {
              const chunk = JSON.parse(line) as OllamaChunk
              if (chunk.message?.content) {
                controller.enqueue(encoder.encode(chunk.message.content))
              }
            } catch {
              // skip malformed lines
            }
          }
        }
        controller.close()
      } catch (err) {
        controller.error(err)
      }
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache',
    },
  })
}
