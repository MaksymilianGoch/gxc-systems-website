'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

const PROBLEMS = [
  'Verpasste Anfragen — ich verliere Aufträge',
  'Terminchaos — Koordination kostet zu viel Zeit',
  'Zu langsame Reaktion',
  'Zu viel Admin-Arbeit',
  'Fehlende Übersicht',
  'Weiß nicht genau — bitte analysiert meinen Betrieb',
]

const TRUST = [
  { icon: 'schedule', text: '30 Minuten · kostenlos · unverbindlich' },
  { icon: 'thumb_up', text: 'Kein Pitch, keine Folien, kein Druck' },
  { icon: 'lock', text: 'DSGVO-konform · Daten bleiben dein Eigentum' },
]

function Input({ label, id, type = 'text', placeholder, required = true }: { label: string; id: string; type?: string; placeholder: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)', marginBottom: '0.375rem', letterSpacing: '-0.01em' }}>
        {label}{required && <span style={{ color: 'rgba(110,171,140,0.9)', marginLeft: '0.25rem' }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '0.75rem 1rem',
          fontSize: '0.9rem', color: '#1b1c1c',
          background: 'white',
          border: '1.5px solid rgba(255,255,255,0.15)',
          borderRadius: 'var(--radius-lg)',
          outline: 'none', fontFamily: 'var(--font-body)',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        }}
        onFocus={(e) => { e.target.style.borderColor = 'var(--color-green)'; e.target.style.boxShadow = '0 0 0 3px rgba(110,171,140,0.15)'; }}
        onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.boxShadow = 'none'; }}
      />
    </div>
  )
}

export function ContactSection() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSent(true)
  }

  return (
    <section
      id="kontakt"
      className="section-y"
      style={{ background: 'linear-gradient(135deg, #0d2040 0%, #0f2a50 40%, #122d54 100%)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Decorative orbs */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(110,171,140,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} aria-hidden="true" />
      <div style={{ position: 'absolute', bottom: '-5%', left: '-8%', width: '35vw', height: '35vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(174,199,245,0.07) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} aria-hidden="true" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Copy */}
          <AnimateIn direction="left">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-green)', display: 'block', marginBottom: '1.25rem' }}>
                  System-Analyse
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', fontWeight: 700, color: 'white', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '1.25rem' }}>
                  Lass uns über<br />
                  dein System<br />
                  <span style={{ color: 'var(--color-green)' }}>sprechen.</span>
                </h2>
                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: '28rem' }}>
                  Wir schauen uns deinen Betrieb an und sagen dir ehrlich, wo das größte Leck ist. Kein Pitch. Keine Folien.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {TRUST.map((t) => (
                  <div key={t.icon} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-lg)', background: 'rgba(110,171,140,0.12)', border: '1px solid rgba(110,171,140,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--color-green)' }}>{t.icon}</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)' }}>{t.text}</p>
                  </div>
                ))}
              </div>

              {/* Mini stats */}
              <div style={{ display: 'flex', gap: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                {[{ v: '< 4h', l: 'Reaktionszeit' }, { v: '100%', l: 'Datensicherheit' }].map(({ v, l }) => (
                  <div key={l}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '0.2rem' }}>{v}</p>
                    <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Right: Form */}
          <AnimateIn delay={120} direction="right">
            <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 'var(--radius-2xl)', padding: '2.25rem', boxShadow: '0 32px 64px -16px rgba(0,0,0,0.4)' }}>

              {sent ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(110,171,140,0.15)', border: '1.5px solid rgba(110,171,140,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1.75rem', color: 'var(--color-green)' }}>check_circle</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '0.625rem' }}>Nachricht angekommen.</h3>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                    Wir melden uns innerhalb von 4 Stunden an Werktagen. Kein Pitch — nur ehrliches Feedback zu deinem Betrieb.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                  <div style={{ marginBottom: '0.25rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'white', letterSpacing: '-0.025em', marginBottom: '0.375rem' }}>Kontakt aufnehmen</h3>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)' }}>Alle Felder mit * sind erforderlich.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Name" id="name" placeholder="Thomas M." />
                    <Input label="Betrieb" id="company" placeholder="Elektrobetrieb GmbH" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="E-Mail" id="email" type="email" placeholder="thomas@betrieb.at" />
                    <Input label="Telefon" id="phone" type="tel" placeholder="+43 664 ..." required={false} />
                  </div>

                  <div>
                    <label htmlFor="problem" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)', marginBottom: '0.375rem' }}>
                      Was beschäftigt dich? <span style={{ color: 'rgba(110,171,140,0.9)' }}>*</span>
                    </label>
                    <select
                      id="problem"
                      style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.9rem', color: '#1b1c1c', background: 'white', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-lg)', outline: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', appearance: 'none' }}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--color-green)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                    >
                      <option value="">Größtes Problem wählen...</option>
                      {PROBLEMS.map((p) => <option key={p}>{p}</option>)}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)', marginBottom: '0.375rem' }}>
                      Kurze Beschreibung <span style={{ color: 'rgba(110,171,140,0.9)' }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="z.B.: Ich bekomme täglich 5 Anfragen, verliere davon 2–3 weil ich zu spät antworte..."
                      style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#1b1c1c', background: 'white', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-lg)', outline: 'none', resize: 'none', fontFamily: 'var(--font-body)', lineHeight: 1.6, transition: 'border-color 0.15s ease, box-shadow 0.15s ease' }}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--color-green)'; e.target.style.boxShadow = '0 0 0 3px rgba(110,171,140,0.15)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem', background: loading ? 'rgba(110,171,140,0.7)' : 'var(--color-green)', color: '#0a1f3d', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', padding: '1rem', borderRadius: 'var(--radius-xl)', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.18s ease', boxShadow: '0 8px 32px -8px rgba(110,171,140,0.4)', marginTop: '0.25rem' }}
                    onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px -8px rgba(110,171,140,0.5)'; } }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px -8px rgba(110,171,140,0.4)'; }}
                  >
                    {loading
                      ? <><span className="material-symbols-outlined" style={{ fontSize: '1.1rem', animation: 'spin 1s linear infinite' }}>progress_activity</span> Wird gesendet...</>
                      : <><span>Analyse anfragen</span><span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>rocket_launch</span></>
                    }
                  </button>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </form>
              )}
            </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  )
}
