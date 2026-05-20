import { type NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `Du bist der digitale Assistent von GXC Systems, einer Agentur für operative Systeme im Dreiländereck (Vorarlberg/AT, Ostschweiz/CH, Liechtenstein, Bodensee/DE).

Deine Aufgabe: Interessenten helfen herauszufinden, welche Leistungen für ihren Betrieb relevant sind, und sie zum kostenlosen Erstgespräch führen.

SPRACHE: Immer Deutsch, Du-Form. Kein Denglisch.
LÄNGE: Kurz und präzise. Maximal 3–4 Sätze pro Antwort.
TON: Direkt, ehrlich, kein Marketing-Jargon.

GXC SYSTEMS ANGEBOT:
- Anfrage-Widget + CRM: Jede Anfrage wird automatisch erfasst, priorisiert und ins System gespielt
- Terminbuchung: Automatisch, ohne Telefon-Pingpong
- Team-Benachrichtigungen: Sofort, per Push oder E-Mail
- Follow-up Automation: Kein Lead kühlt aus
- Reporting: Monatliche Übersicht über Anfragen, Termine und Aufträge

PAKETE:
- Starter: 1.490 € einmalig (Widget + CRM + Terminbuchung)
- Professional: 2.990 € einmalig + 249 €/Monat (Vollsystem + Landingpage)
- Vollsystem: 4.490 € einmalig + 399 €/Monat (alles + Voice Agent + Priority Support)

GRÜNDER:
- Maksymilian Goch: Founder, Vertrieb & technische Integration, BWL Student in Liechtenstein
- Ariel Creuz: Co-Founder & CTO, Technik-Integration, Optimierung, Implementierung, HTLer

REGELN:
- Nie Preise herunterhandeln
- Bei Interesse immer auf kostenloses Erstgespräch hinweisen
- Keine Aussagen über Mitbewerber
- Nie behaupten, ein Mensch zu sein`

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
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

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: 'Kein API-Key konfiguriert. Bitte ANTHROPIC_API_KEY in Vercel setzen.' },
      { status: 503 },
    )
  }

  const encoder = new TextEncoder()

  const readable = new ReadableStream({
    async start(controller) {
      try {
        const stream = await client.messages.stream({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 512,
          system: SYSTEM_PROMPT,
          messages: messages.map(({ role, content }) => ({ role, content })),
        })

        for await (const chunk of stream) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(chunk.delta.text))
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
