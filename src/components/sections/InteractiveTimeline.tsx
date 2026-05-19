'use client'

import { useState } from 'react'
import { AnimateIn } from '@/components/ui/AnimateIn'

const PHASES = [
  {
    id: 'intake',
    phase: '01 — EINGANG',
    title: 'Erfassen',
    steps: [
      { n: '01', title: 'Anfrage eingegangen', desc: 'Webformular, Telefon, E-Mail oder Chat — einheitliche Erfassung aus jedem Kanal.' },
      { n: '02', title: 'KI-Klassifizierung', desc: 'Absicht erkannt. Priorität vergeben. Quelle protokolliert. Weiterleitungsregeln angewendet.' },
    ],
  },
  {
    id: 'process',
    phase: '02 — VERARBEITUNG',
    title: 'Weiterleiten',
    steps: [
      { n: '03', title: 'CRM-Eintrag', desc: 'Strukturierter Lead-Datensatz automatisch angelegt — keine manuelle Dateneingabe.' },
      { n: '04', title: 'Ablauf-Auslöser', desc: 'Automatisierte Sequenzen gestartet auf Basis von Lead-Typ, Quelle und Priorität.' },
      { n: '05', title: 'Team-Benachrichtigung', desc: 'Strukturierte Mitteilung innerhalb von Sekunden via Slack oder Telegram versandt.' },
    ],
  },
  {
    id: 'engage',
    phase: '03 — KOMMUNIKATION',
    title: 'Reagieren',
    steps: [
      { n: '06', title: 'Sofortantwort', desc: 'Professionelle Eingangsbestätigung automatisch versandt. Buchungslink inklusive.' },
      { n: '07', title: 'Termin vereinbart', desc: 'Kalender synchronisiert. Bestätigung versandt. Erinnerungen automatisch geplant.' },
      { n: '08', title: 'CRM aktualisiert', desc: 'Statusänderungen in Echtzeit. Keine manuellen Aktualisierungen. Keine veralteten Daten.' },
    ],
  },
  {
    id: 'close',
    phase: '04 — ABSCHLUSS',
    title: 'Abschließen',
    steps: [
      { n: '09', title: 'Angebot versandt', desc: 'Angebot erstellt und übermittelt. Follow-up für Tag 3 und Tag 7 eingeplant.' },
      { n: '10', title: 'Zahlung abgewickelt', desc: 'Stripe-Link ausgestellt. Zahlung bestätigt. Status auf Kunde aktualisiert.' },
      { n: '11', title: 'Gewonnen', desc: 'Kunden-Onboarding ausgelöst. Wiederkehrender Ablauf aktiviert. Zyklus abgeschlossen.' },
    ],
  },
]

export function InteractiveTimeline() {
  const [activePhase, setActivePhase] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  const currentPhase = PHASES[activePhase]
  const allSteps = PHASES.flatMap((p) => p.steps)
  const globalStep = PHASES.slice(0, activePhase).reduce((s, p) => s + p.steps.length, 0) + activeStep
  const totalSteps = allSteps.length
  const progress = ((globalStep + 1) / totalSteps) * 100

  return (
    <section
      id="ablauf"
      style={{ background: 'var(--color-bg)', padding: 'clamp(5rem, 9vw, 8rem) 0' }}
      aria-labelledby="timeline-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <AnimateIn>
          <div className="mb-14">
            <span className="accent-line" />
            <p className="text-label mb-4">UMSETZUNGSABLAUF</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2
                id="timeline-heading"
                className="text-display-sm"
                style={{ color: 'var(--color-text)' }}
              >
                Von der ersten Anfrage
                <br />
                zum abgeschlossenen Auftrag.
              </h2>
              <p
                style={{
                  color: 'var(--color-text-3)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  maxWidth: '22rem',
                }}
              >
                {String(globalStep + 1).padStart(2, '0')} von {String(totalSteps).padStart(2, '0')} Schritten · {currentPhase.phase}
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* Progress bar */}
        <div className="mb-10">
          <div style={{ height: '1px', background: 'var(--color-border)', borderRadius: '1px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, var(--color-blue), var(--color-cyan))',
                transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          </div>
        </div>

        {/* Phase selector */}
        <div
          className="flex gap-1 mb-10 overflow-x-auto"
          style={{ scrollbarWidth: 'none' }}
        >
          {PHASES.map((phase, i) => (
            <button
              key={phase.id}
              type="button"
              onClick={() => { setActivePhase(i); setActiveStep(0) }}
              style={{
                flex: '0 0 auto',
                padding: '0.5rem 1.25rem',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                border: '1px solid',
                borderColor: activePhase === i ? 'var(--color-blue)' : 'var(--color-border)',
                background: activePhase === i ? 'rgba(59,130,246,0.12)' : 'transparent',
                color: activePhase === i ? 'var(--color-blue)' : 'var(--color-text-3)',
                borderRadius: '3px',
                transition: 'all 0.15s ease',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {phase.title}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Active step detail — 7 cols */}
          <div className="lg:col-span-7">
            <div
              style={{
                border: '1px solid var(--color-border-2)',
                borderLeft: '2px solid var(--color-blue)',
                background: 'var(--color-bg-2)',
                borderRadius: '0 4px 4px 0',
                padding: '2.5rem',
                minHeight: '260px',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Decorative step number */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(5rem, 10vw, 8rem)',
                  fontWeight: 700,
                  lineHeight: 0.85,
                  color: 'rgba(59,130,246,0.06)',
                  letterSpacing: '-0.05em',
                  marginBottom: '1.5rem',
                  userSelect: 'none',
                }}
                aria-hidden="true"
              >
                {currentPhase.steps[activeStep]?.n}
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.62rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--color-blue)',
                  marginBottom: '1rem',
                }}
              >
                <span
                  style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-blue)', display: 'inline-block' }}
                  aria-hidden="true"
                />
                {currentPhase.phase}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  letterSpacing: '-0.025em',
                  marginBottom: '1rem',
                }}
              >
                {currentPhase.steps[activeStep]?.title}
              </h3>

              <p style={{ color: 'var(--color-text-2)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '36rem' }}>
                {currentPhase.steps[activeStep]?.desc}
              </p>

              {/* Navigation */}
              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    if (activeStep > 0) {
                      setActiveStep(activeStep - 1)
                    } else if (activePhase > 0) {
                      setActivePhase(activePhase - 1)
                      setActiveStep(PHASES[activePhase - 1].steps.length - 1)
                    }
                  }}
                  disabled={globalStep === 0}
                  className="btn-secondary"
                  style={{
                    opacity: globalStep === 0 ? 0.3 : 1,
                    padding: '0.6rem 1.25rem',
                    fontSize: '0.78rem',
                  }}
                >
                  ← Zurück
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (activeStep < currentPhase.steps.length - 1) {
                      setActiveStep(activeStep + 1)
                    } else if (activePhase < PHASES.length - 1) {
                      setActivePhase(activePhase + 1)
                      setActiveStep(0)
                    }
                  }}
                  disabled={globalStep === totalSteps - 1}
                  style={{
                    background: globalStep === totalSteps - 1 ? 'transparent' : 'var(--color-blue)',
                    color: globalStep === totalSteps - 1 ? 'var(--color-text-3)' : 'white',
                    border: `1px solid ${globalStep === totalSteps - 1 ? 'var(--color-border)' : 'var(--color-blue)'}`,
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.78rem',
                    padding: '0.6rem 1.25rem',
                    borderRadius: '4px',
                    cursor: globalStep === totalSteps - 1 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  Weiter →
                </button>
              </div>
            </div>
          </div>

          {/* Right: Step list — 5 cols */}
          <div className="lg:col-span-5 space-y-1">
            {currentPhase.steps.map((step, i) => (
              <button
                key={step.n}
                type="button"
                onClick={() => setActiveStep(i)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '1rem 1.25rem',
                  border: '1px solid',
                  borderColor: activeStep === i ? 'var(--color-border-2)' : 'var(--color-border)',
                  background: activeStep === i ? 'var(--color-bg-2)' : 'transparent',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.875rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: activeStep === i ? 'var(--color-blue)' : 'var(--color-text-3)',
                    marginTop: '2px',
                    minWidth: '1.5rem',
                  }}
                >
                  {step.n}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: activeStep === i ? 'var(--color-text)' : 'var(--color-text-2)',
                      marginBottom: '0.2rem',
                    }}
                  >
                    {step.title}
                  </p>
                  {activeStep === i && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-3)', lineHeight: 1.55 }}>
                      {step.desc}
                    </p>
                  )}
                </div>
              </button>
            ))}

            {/* Completion */}
            {globalStep === totalSteps - 1 && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  border: '1px solid rgba(16,185,129,0.25)',
                  background: 'rgba(16,185,129,0.04)',
                  borderRadius: '3px',
                }}
              >
                <p style={{ fontSize: '0.8rem', color: 'rgba(16,185,129,0.9)', fontFamily: 'var(--font-mono)' }}>
                  ✓ Vollständiger Systemzyklus abgeschlossen
                </p>
                <p style={{ fontSize: '0.72rem', color: 'var(--color-text-3)', marginTop: '0.25rem' }}>
                  Von der Anfrage zum gewonnenen Kunden — automatisiert.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
