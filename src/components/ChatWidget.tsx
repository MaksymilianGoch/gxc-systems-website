'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const INITIAL_MESSAGE: Message = {
  id: 'init',
  role: 'assistant',
  content:
    'Guten Tag! Ich bin der digitale Assistent von GXC Systems. Womit kann ich Ihnen helfen? Sie können mich zum Beispiel fragen, welches Paket zu Ihrem Betrieb passt.',
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [unavailable, setUnavailable] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      inputRef.current?.focus()
    }
  }, [isOpen, messages, scrollToBottom])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text }
    const assistantId = (Date.now() + 1).toString()
    const assistantMsg: Message = { id: assistantId, role: 'assistant', content: '' }

    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput('')
    setIsLoading(true)

    const history = [
      ...messages.filter((m) => m.id !== 'init'),
      userMsg,
    ].map((m) => ({ role: m.role, content: m.content }))

    abortRef.current = new AbortController()

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: abortRef.current.signal,
      })

      if (response.status === 503) {
        setUnavailable(true)
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    'Der Chat ist momentan leider nicht verfügbar. Bitte nutzen Sie das Kontaktformular weiter unten.',
                }
              : m,
          ),
        )
        setIsLoading(false)
        return
      }

      if (!response.ok || !response.body) {
        throw new Error(`HTTP ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: accumulated } : m)),
        )
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content:
                  'Es gab einen technischen Fehler. Bitte versuchen Sie es noch einmal.',
              }
            : m,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, messages])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void sendMessage()
    }
  }

  const handleClose = () => {
    abortRef.current?.abort()
    setIsOpen(false)
  }

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] flex flex-col rounded-lg shadow-2xl border border-border overflow-hidden bg-offwhite"
          style={{ height: '500px' }}
          role="dialog"
          aria-label="GXC Systems Chat-Assistent"
          aria-modal="false"
        >
          {/* Header */}
          <div className="bg-navy px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center">
              <Bot size={16} className="text-white" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white leading-none">
                GXC Systems Assistent
              </p>
              <p className="text-xs text-white/50 mt-0.5">
                {isLoading ? 'Schreibt…' : 'Online'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="text-white/60 hover:text-white transition-colors p-1"
              aria-label="Chat schließen"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-teal text-white'
                      : 'bg-white border border-border text-navy shadow-sm'
                  }`}
                >
                  {msg.content || (
                    <span className="flex items-center gap-1.5 text-text-muted">
                      <Loader2 size={12} className="animate-spin" aria-hidden="true" />
                      <span className="text-xs">Tippt…</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-border bg-white px-3 py-3">
            {unavailable ? (
              <a
                href="#kontakt"
                onClick={handleClose}
                className="block w-full text-center text-sm text-teal underline underline-offset-2 py-2"
              >
                Zum Kontaktformular →
              </a>
            ) : (
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Ihre Frage…"
                  className="flex-1 resize-none text-sm border border-border rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent placeholder:text-text-muted text-navy bg-white min-h-[38px] max-h-[100px]"
                  aria-label="Nachricht eingeben"
                  disabled={isLoading}
                  style={{ overflowY: 'auto', lineHeight: '1.5' }}
                />
                <button
                  type="button"
                  onClick={() => void sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 bg-teal rounded-sm flex items-center justify-center text-white hover:bg-teal/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  aria-label="Nachricht senden"
                >
                  {isLoading ? (
                    <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                  ) : (
                    <Send size={15} aria-hidden="true" />
                  )}
                </button>
              </div>
            )}
            <p className="text-xs text-text-muted mt-1.5 text-center">
              Enter zum Senden · Shift+Enter für neue Zeile
            </p>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-teal rounded-full shadow-lg hover:bg-teal/90 hover:shadow-xl transition-all duration-200 flex items-center justify-center text-white"
        aria-label={isOpen ? 'Chat schließen' : 'Chat öffnen'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={22} aria-hidden="true" />
        ) : (
          <MessageCircle size={22} aria-hidden="true" />
        )}
      </button>
    </>
  )
}
