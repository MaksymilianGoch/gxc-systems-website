'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  id: string
}

const GREETING: Message = {
  role: 'assistant',
  id: 'greeting',
  content: 'Guten Tag! Ich bin der GXC-Assistent. Wie kann ich Ihnen helfen? Ich beantworte Fragen zu unseren Systemen, Preisen und dem Ablauf.',
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0.625rem 0.875rem', background: 'white', borderRadius: '12px 12px 12px 2px', width: 'fit-content', border: '1px solid var(--color-border)', boxShadow: '0 1px 4px rgba(0,32,69,0.06)' }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-text-3)', display: 'block', animation: `typingBounce 1.2s ease-in-out ${i * 0.18}s infinite` }} />
      ))}
      <style>{`@keyframes typingBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}`}</style>
    </div>
  )
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 120)
  }, [isOpen])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setError(false)

    const userMsg: Message = { role: 'user', content: text, id: Date.now().toString() }
    const history = [...messages, userMsg]
    setMessages(history)
    setLoading(true)

    const assistantId = (Date.now() + 1).toString()
    setMessages((prev) => [...prev, { role: 'assistant', content: '', id: assistantId }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
      })

      if (!res.ok || !res.body) {
        setError(true)
        setMessages((prev) => prev.filter((m) => m.id !== assistantId))
        setLoading(false)
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setMessages((prev) =>
          prev.map((m) => m.id === assistantId ? { ...m, content: m.content + chunk } : m)
        )
      }
    } catch {
      setError(true)
      setMessages((prev) => prev.filter((m) => m.id !== assistantId))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @keyframes chatPulse{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.6)}}
        @keyframes chatSlideUp{from{opacity:0;transform:translateY(16px) scale(0.97)}to{opacity:1;transform:none}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      {/* Floating button */}
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        aria-label={isOpen ? 'Chat schließen' : 'GXC-Assistent öffnen'}
        style={{
          position: 'fixed', bottom: '1.75rem', right: '1.75rem', zIndex: 9999,
          width: 56, height: 56, borderRadius: '50%',
          background: isOpen ? 'var(--color-blue-dim)' : 'var(--color-blue)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px -8px rgba(0,32,69,0.5)',
          transition: 'background 0.18s ease, transform 0.18s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '1.5rem', color: 'white', transition: 'transform 0.22s ease', transform: isOpen ? 'rotate(45deg)' : 'none' }}>
          {isOpen ? 'close' : 'chat'}
        </span>
        {!isOpen && <span style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '1.5px solid rgba(0,32,69,0.25)', animation: 'chatPulse 2.5s ease-out infinite' }} />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '5.5rem', right: '1.75rem', zIndex: 9998,
          width: 'min(380px, calc(100vw - 2rem))',
          height: 'min(520px, calc(100vh - 8rem))',
          background: 'white', borderRadius: 'var(--radius-2xl)',
          boxShadow: '0 32px 80px -16px rgba(0,32,69,0.22), 0 8px 24px rgba(0,32,69,0.1)',
          border: '1px solid rgba(196,198,207,0.4)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          animation: 'chatSlideUp 0.28s cubic-bezier(0.16,1,0.3,1)',
        }}>

          {/* Header */}
          <div style={{ background: 'var(--color-blue)', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(110,171,140,0.2)', border: '1.5px solid rgba(110,171,140,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--color-green)' }}>smart_toy</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: 'white', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem' }}>GXC Assistent</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-green)', display: 'block' }} />
                <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-mono)' }}>gemma4 · Open Source</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.45)', padding: '0.2rem', borderRadius: '6px', display: 'flex', transition: 'color 0.15s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'white'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>close</span>
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'var(--color-bg)' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '0.5rem' }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(0,32,69,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '0.75rem', color: 'var(--color-blue)' }}>smart_toy</span>
                  </div>
                )}
                <div style={{
                  maxWidth: '80%', padding: '0.625rem 0.875rem',
                  borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  background: msg.role === 'user' ? 'var(--color-blue)' : 'white',
                  color: msg.role === 'user' ? 'white' : 'var(--color-text)',
                  fontSize: '0.83rem', lineHeight: 1.65,
                  border: msg.role === 'assistant' ? '1px solid var(--color-border)' : 'none',
                  boxShadow: msg.role === 'assistant' ? '0 1px 4px rgba(0,32,69,0.06)' : 'none',
                  fontFamily: 'var(--font-body)', wordBreak: 'break-word', whiteSpace: 'pre-wrap',
                }}>
                  {msg.content || (msg.role === 'assistant' && loading ? '' : msg.content)}
                </div>
              </div>
            ))}
            {loading && <TypingDots />}
            {error && (
              <div style={{ textAlign: 'center', padding: '0.5rem', fontSize: '0.72rem', color: 'var(--color-red)', background: 'rgba(186,26,26,0.06)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(186,26,26,0.15)' }}>
                Verbindungsfehler — Ollama lokal starten.
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--color-border)', background: 'white', display: 'flex', gap: '0.625rem', flexShrink: 0 }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Frage stellen... (Enter)"
              disabled={loading}
              style={{ flex: 1, padding: '0.625rem 0.875rem', fontSize: '0.85rem', color: 'var(--color-text)', background: 'var(--color-bg-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', outline: 'none', fontFamily: 'var(--font-body)', transition: 'border-color 0.15s ease' }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--color-blue)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--color-border)'; }}
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{ width: 38, height: 38, borderRadius: 'var(--radius-lg)', background: input.trim() && !loading ? 'var(--color-blue)' : 'var(--color-border)', border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.15s ease' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: input.trim() && !loading ? 'white' : 'var(--color-text-3)' }}>
                {loading ? 'progress_activity' : 'send'}
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
