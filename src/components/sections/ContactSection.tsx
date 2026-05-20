'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function ContactSection() {
  const [sent, setSent] = useState(false)

  return (
    <section id="kontakt" className="section-y" style={{ background: 'var(--color-bg-2)' }}>
      <Container>
        <AnimateIn>
          <div style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 3rem' }}>
            <span className="accent-line" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '1rem' }}>
              System-Analyse.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-2)', lineHeight: 1.7 }}>
              Wir schauen uns deinen Betrieb an und sagen dir ehrlich, wo das größte Leck ist. Kein Pitch. Keine Folien. 30 Minuten, kostenlos.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={80}>
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '3.5rem', color: 'var(--color-green)', display: 'block', marginBottom: '1rem' }}>check_circle</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.625rem' }}>Deine Nachricht ist angekommen.</h3>
                <p style={{ color: 'var(--color-text-2)' }}>Wir melden uns innerhalb von 4 Stunden an Werktagen.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'name',    label: 'Dein Name',    type: 'text',  ph: 'z.B. Thomas M.' },
                    { id: 'company', label: 'Betrieb',      type: 'text',  ph: 'z.B. Elektrobetrieb GmbH' },
                    { id: 'email',   label: 'E-Mail',       type: 'email', ph: 'thomas@betrieb.at' },
                    { id: 'phone',   label: 'Telefon',      type: 'tel',   ph: '+43 664 ...' },
                  ].map((f) => (
                    <div key={f.id}>
                      <label htmlFor={f.id} style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.375rem' }}>{f.label}</label>
                      <input
                        id={f.id}
                        type={f.type}
                        placeholder={f.ph}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          fontSize: '0.9rem',
                          color: 'var(--color-text)',
                          background: 'var(--color-bg-1)',
                          border: '1px solid var(--color-border-2)',
                          borderRadius: 'var(--radius-lg)',
                          outline: 'none',
                          transition: 'border-color 0.15s ease',
                          fontFamily: 'var(--font-body)',
                        }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--color-blue)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--color-border-2)'; }}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="problem" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.375rem' }}>Was beschäftigt dich am meisten?</label>
                  <select id="problem" style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.9rem', color: 'var(--color-text)', background: 'var(--color-bg-1)', border: '1px solid var(--color-border-2)', borderRadius: 'var(--radius-lg)', outline: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                    <option value="">Größtes Problem wählen</option>
                    <option>Verpasste Anfragen — ich verliere Aufträge</option>
                    <option>Terminchaos — Koordination kostet zu viel Zeit</option>
                    <option>Langsame Reaktion — ich antworte zu spät</option>
                    <option>Zu viel Admin-Arbeit</option>
                    <option>Weiß nicht genau — sagt mir, wo mein Leck ist</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.375rem' }}>Kurze Beschreibung</label>
                  <textarea id="message" rows={3} placeholder="z.B.: Ich bekomme täglich 5 Anfragen, verliere davon 2–3..."
                    style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.9rem', color: 'var(--color-text)', background: 'var(--color-bg-1)', border: '1px solid var(--color-border-2)', borderRadius: 'var(--radius-lg)', outline: 'none', resize: 'none', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--color-blue)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--color-border-2)'; }}
                  />
                </div>

                <button
                  type="submit"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem', background: 'var(--color-blue)', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', padding: '1rem', borderRadius: 'var(--radius-xl)', border: 'none', cursor: 'pointer', transition: 'background 0.15s ease, transform 0.1s ease', boxShadow: '0 8px 32px -8px rgba(0,32,69,0.35)', marginTop: '0.5rem' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-blue-dim)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-blue)'; e.currentTarget.style.transform = 'none'; }}
                >
                  Analyse anfragen
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>rocket_launch</span>
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--color-text-3)' }}>
                  Kostenlos · Kein Pitch · Reaktion innerhalb von 4 Stunden an Werktagen.
                </p>
              </form>
            )}
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
