'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

// ── Types ─────────────────────────────────────────────────────────────────
type Leistung = 'website' | 'crm' | 'automation' | 'vollsystem' | null
type Dringlichkeit = 'sofort' | 'woche' | 'monat' | 'info' | null
type Kontakt = 'rueckruf' | 'termin' | 'email' | null

// ── Config ────────────────────────────────────────────────────────────────
const LEISTUNGEN: { id: Leistung; label: string }[] = [
  { id: 'website', label: 'Website & Widget' },
  { id: 'crm', label: 'CRM & Leads' },
  { id: 'automation', label: 'Automation' },
  { id: 'vollsystem', label: 'Vollsystem' },
]

const DRINGLICHKEITEN: { id: Dringlichkeit; label: string; urgency: string }[] = [
  { id: 'sofort', label: 'Sofort (heute/morgen)', urgency: 'Hoch' },
  { id: 'woche', label: 'Diese Woche', urgency: 'Mittel' },
  { id: 'monat', label: 'Nächsten Monat', urgency: 'Niedrig' },
  { id: 'info', label: 'Nur Information', urgency: 'Info' },
]

const KONTAKT_OPTIONS: { id: Kontakt; label: string }[] = [
  { id: 'rueckruf', label: 'Rückruf gewünscht' },
  { id: 'termin', label: 'Terminvorschlag' },
  { id: 'email', label: 'E-Mail genügt' },
]

// ── Chip selector ─────────────────────────────────────────────────────────
function Chip({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '0.4rem 0.9rem',
        borderRadius: '4px',
        border: `1px solid ${selected ? 'var(--color-blue)' : 'var(--color-border-2)'}`,
        background: selected ? 'rgba(23,59,92,0.07)' : 'var(--color-bg-1)',
        color: selected ? 'var(--color-blue)' : 'var(--color-text-3)',
        fontSize: '0.78rem',
        fontFamily: 'var(--font-display)',
        fontWeight: selected ? 600 : 400,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        letterSpacing: '-0.01em',
      }}
    >
      {selected && (
        <span style={{ marginRight: '0.35rem', fontSize: '0.6rem' }}>✓</span>
      )}
      {label}
    </button>
  )
}

// ── Status step ───────────────────────────────────────────────────────────
function StatusStep({
  step,
  label,
  detail,
  active,
  completed,
}: {
  step: number
  label: string
  detail: string
  active: boolean
  completed: boolean
}) {
  const color = completed
    ? 'var(--color-green)'
    : active
    ? 'var(--color-blue)'
    : 'var(--color-border-3)'

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.875rem',
        padding: '0.75rem 0',
        borderBottom: '1px solid var(--color-border)',
        opacity: active || completed ? 1 : 0.45,
        transition: 'opacity 0.4s ease',
      }}
    >
      {/* Icon circle */}
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: `1.5px solid ${color}`,
          background: (active || completed) ? `${color}12` : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.3s ease',
        }}
        aria-hidden="true"
      >
        {completed ? (
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7l3 3 6-6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : active ? (
          <svg width="10" height="10" viewBox="0 0 10 10">
            <circle cx="5" cy="5" r="3" fill={color} />
          </svg>
        ) : (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--color-text-3)' }}>
            {String(step).padStart(2, '0')}
          </span>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: '0.82rem',
            fontWeight: active || completed ? 600 : 400,
            color: active || completed ? 'var(--color-text)' : 'var(--color-text-3)',
            letterSpacing: '-0.01em',
            transition: 'color 0.3s ease',
          }}
        >
          {label}
        </p>
        {(active || completed) && (
          <p
            style={{
              fontSize: '0.7rem',
              color: 'var(--color-text-3)',
              marginTop: '0.15rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {detail}
          </p>
        )}
      </div>

      {(active || completed) && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: color,
            letterSpacing: '0.1em',
            flexShrink: 0,
            marginTop: '0.1rem',
          }}
        >
          {completed ? '✓' : '●'}
        </span>
      )}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────
export function WidgetDemoSection() {
  const [leistung, setLeistung] = useState<Leistung>(null)
  const [dringlichkeit, setDringlichkeit] = useState<Dringlichkeit>(null)
  const [description, setDescription] = useState('')
  const [kontakt, setKontakt] = useState<Kontakt>(null)
  const [submitted, setSubmitted] = useState(false)

  const urgencyLabel =
    DRINGLICHKEITEN.find((d) => d.id === dringlichkeit)?.urgency ?? ''

  const step1 = !!leistung
  const step2 = !!dringlichkeit
  const step3 = description.trim().length >= 8
  const step4 = !!kontakt
  const step5 = submitted

  const canSubmit = step1 && step2 && step3 && step4

  function reset() {
    setLeistung(null)
    setDringlichkeit(null)
    setDescription('')
    setKontakt(null)
    setSubmitted(false)
  }

  return (
    <section
      id="demo"
      className="section-y"
      style={{ background: 'var(--color-bg)' }}
      aria-labelledby="demo-heading"
    >
      <Container>
        <AnimateIn>
          <div style={{ maxWidth: '42rem', marginBottom: '3rem' }}>
            <span className="accent-line" />
            <p className="text-label mb-4">Live-Demo</p>
            <h2
              id="demo-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 700,
                color: 'var(--color-text)',
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                marginBottom: '0.875rem',
              }}
            >
              Dein Kunde hat eine Frage.
              <br />
              Das passiert dann.
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-2)', lineHeight: 1.7 }}>
              Links: wie einfach es für deinen Kunden ist.
              Rechts: was im Hintergrund passiert.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={80}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: '1.5rem',
              alignItems: 'stretch',
            }}
          >
            {/* ── LEFT: Widget ─────────────────────────────────── */}
            <div
              style={{
                background: 'var(--color-bg-1)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 2px 16px -4px rgba(23,59,92,0.08)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Widget header */}
              <div
                style={{
                  padding: '1rem 1.25rem',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  background: 'var(--color-bg-2)',
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '6px',
                    background: 'var(--color-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="2" width="5" height="5" fill="white" opacity="0.9" />
                    <rect x="9" y="2" width="5" height="5" fill="white" opacity="0.6" />
                    <rect x="2" y="9" width="5" height="5" fill="white" opacity="0.6" />
                    <rect x="9" y="9" width="5" height="5" fill="white" opacity="0.9" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
                    GXC Anfrage-Widget
                  </p>
                  <p style={{ fontSize: '0.62rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)' }}>
                    Demo — keine echte Anfrage
                  </p>
                </div>
              </div>

              {submitted ? (
                /* ── Success state ── */
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2.5rem 1.5rem',
                    gap: '1rem',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      background: 'rgba(47,125,90,0.1)',
                      border: '1.5px solid rgba(47,125,90,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    aria-hidden="true"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="var(--color-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.375rem' }}>
                      Anfrage simuliert.
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-2)', lineHeight: 1.6 }}>
                      Das System hätte jetzt sofort reagiert.
                      In echten Betrieben dauert das unter 30 Sekunden.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    style={{
                      marginTop: '0.5rem',
                      fontSize: '0.78rem',
                      color: 'var(--color-blue)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.25rem',
                    }}
                  >
                    ← Nochmal versuchen
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                  {/* Step 1 */}
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
                      Welche Leistung interessiert dich?
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {LEISTUNGEN.map((l) => (
                        <Chip
                          key={l.id}
                          label={l.label}
                          selected={leistung === l.id}
                          onClick={() => setLeistung(leistung === l.id ? null : l.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div style={{ opacity: step1 ? 1 : 0.4, transition: 'opacity 0.3s ease' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
                      Wie dringend ist es?
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {DRINGLICHKEITEN.map((d) => (
                        <Chip
                          key={d.id}
                          label={d.label}
                          selected={dringlichkeit === d.id}
                          onClick={() => step1 && setDringlichkeit(dringlichkeit === d.id ? null : d.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div style={{ opacity: step2 ? 1 : 0.4, transition: 'opacity 0.3s ease' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
                      Kurz beschreiben — worum geht es?
                    </p>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => step2 && setDescription(e.target.value)}
                      placeholder="z.B.: Ich verliere Anfragen, weil ich nicht schnell genug antworte..."
                      style={{
                        width: '100%',
                        padding: '0.625rem 0.75rem',
                        fontSize: '0.8rem',
                        color: 'var(--color-text)',
                        background: 'var(--color-bg)',
                        border: `1px solid ${step3 ? 'var(--color-blue)' : 'var(--color-border-2)'}`,
                        borderRadius: '4px',
                        resize: 'none',
                        fontFamily: 'var(--font-body)',
                        lineHeight: 1.55,
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                      }}
                    />
                  </div>

                  {/* Step 4 */}
                  <div style={{ opacity: step3 ? 1 : 0.4, transition: 'opacity 0.3s ease' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
                      Wie sollen wir dich erreichen?
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {KONTAKT_OPTIONS.map((k) => (
                        <Chip
                          key={k.id}
                          label={k.label}
                          selected={kontakt === k.id}
                          onClick={() => step3 && setKontakt(kontakt === k.id ? null : k.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="button"
                    disabled={!canSubmit}
                    onClick={() => canSubmit && setSubmitted(true)}
                    style={{
                      marginTop: 'auto',
                      padding: '0.8rem 1.25rem',
                      background: canSubmit ? 'var(--color-blue)' : 'var(--color-border)',
                      color: canSubmit ? 'white' : 'var(--color-text-3)',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '0.875rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      cursor: canSubmit ? 'pointer' : 'not-allowed',
                      letterSpacing: '-0.01em',
                      transition: 'background 0.2s ease, color 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      justifyContent: 'center',
                    }}
                  >
                    Anfrage simulieren
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* ── RIGHT: System status ──────────────────────────── */}
            <div
              style={{
                background: 'var(--color-bg-2)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 2px 16px -4px rgba(23,59,92,0.06)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Status header */}
              <div
                style={{
                  padding: '1rem 1.25rem',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: submitted ? 'var(--color-green)' : (step1 ? 'var(--color-blue)' : 'var(--color-border-3)'),
                      display: 'inline-block',
                      transition: 'background 0.3s ease',
                    }}
                    aria-hidden="true"
                  />
                  <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
                    Systemstatus
                  </p>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-text-3)', letterSpacing: '0.1em' }}>
                  {submitted ? 'ABGESCHLOSSEN' : step1 ? 'AKTIV' : 'WARTEND'}
                </span>
              </div>

              {/* Status steps */}
              <div style={{ padding: '0.25rem 1.25rem 1.25rem', flex: 1 }}>
                <StatusStep
                  step={1}
                  label="Lead erfasst"
                  detail={leistung ? `Kategorie: ${LEISTUNGEN.find(l => l.id === leistung)?.label}` : ''}
                  active={step1}
                  completed={step2 || step5}
                />
                <StatusStep
                  step={2}
                  label="Priorität erkannt"
                  detail={urgencyLabel ? `Dringlichkeit: ${urgencyLabel}` : ''}
                  active={step2}
                  completed={step3 || step5}
                />
                <StatusStep
                  step={3}
                  label="CRM-Eintrag erstellt"
                  detail="Anfrage wird dokumentiert"
                  active={step3}
                  completed={step4 || step5}
                />
                <StatusStep
                  step={4}
                  label="Team benachrichtigt"
                  detail={kontakt === 'rueckruf' ? 'Rückruf eingeplant' : kontakt === 'termin' ? 'Terminvorschlag vorbereitet' : kontakt === 'email' ? 'E-Mail in Bearbeitung' : ''}
                  active={step4}
                  completed={step5}
                />
                <StatusStep
                  step={5}
                  label="Follow-up vorbereitet"
                  detail="Automatische Erinnerung in 48 Stunden"
                  active={step5}
                  completed={false}
                />
              </div>

              {/* Note at bottom */}
              {!submitted && (
                <div
                  style={{
                    padding: '0.875rem 1.25rem',
                    borderTop: '1px solid var(--color-border)',
                    background: 'var(--color-bg-1)',
                  }}
                >
                  <p style={{ fontSize: '0.68rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
                    {!step1
                      ? 'Wähle links eine Leistung aus — das System reagiert sofort.'
                      : !step2
                      ? 'Dringlichkeit auswählen → Priorität wird erkannt.'
                      : !step3
                      ? 'Beschreibe dein Anliegen → CRM-Eintrag wird erstellt.'
                      : !step4
                      ? 'Kontaktweg auswählen → Team wird informiert.'
                      : 'Alle Schritte bereit. Anfrage simulieren →'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
