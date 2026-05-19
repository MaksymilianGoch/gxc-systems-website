'use client'

import { useState, useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'

const STEPS = [
  { id: 1, phase: 'AUFMERKSAMKEIT', title: 'Website', desc: 'Der Interessent findet Sie über Google oder eine persönliche Empfehlung. Ihr erster digitaler Eindruck entscheidet über Vertrauen oder Absprung.' },
  { id: 2, phase: 'AUFMERKSAMKEIT', title: 'Formular', desc: 'Kontaktformular ausgefüllt in 60 Sekunden. Name, E-Mail, Anliegen — strukturiert, direkt, ohne Reibung.' },
  { id: 3, phase: 'VERARBEITUNG', title: 'Webhook', desc: 'Die Anfrage wird sofort an das Automatisierungssystem übergeben. Keine Sekunde Verzögerung, keine menschliche Intervention nötig.' },
  { id: 4, phase: 'VERARBEITUNG', title: 'CRM', desc: 'Ein Lead-Datensatz wird automatisch in Airtable angelegt — vollständig, sortiert, mit Zeitstempel und Quelle.' },
  { id: 5, phase: 'VERARBEITUNG', title: 'Benachrichtigung', desc: 'Sie erhalten in Sekunden eine strukturierte Meldung per Slack oder Telegram mit allen Kontaktdaten.' },
  { id: 6, phase: 'KOMMUNIKATION', title: 'E-Mail', desc: 'Der Interessent bekommt sofort eine professionelle Eingangsbestätigung — mit Buchungslink für den nächsten Schritt.' },
  { id: 7, phase: 'KOMMUNIKATION', title: 'Terminbuchung', desc: 'Er bucht direkt einen Gesprächstermin. Kein Hin-und-Her, kein Telefonieren, keine Zeitverschwendung.' },
  { id: 8, phase: 'KOMMUNIKATION', title: 'CRM-Update', desc: 'Der Lead-Status wird automatisch auf "Termin vereinbart" gesetzt. Ihr CRM bleibt immer aktuell.' },
  { id: 9, phase: 'ABSCHLUSS', title: 'Angebot', desc: 'Nach dem Gespräch: Angebot wird vorbereitet, versendet und nach 3 und 7 Tagen automatisch nachgefasst.' },
  { id: 10, phase: 'ABSCHLUSS', title: 'Zahlung', desc: 'Auftragserteilung und Zahlungsabwicklung per Stripe-Link. Status automatisch auf "Kunde" gesetzt.' },
  { id: 11, phase: 'ABSCHLUSS', title: 'Betreuung', desc: 'Laufende Optimierung, Monitoring und monatliches Reporting. Das System wird mit Ihrem Betrieb besser.' },
]

const PHASES = ['AUFMERKSAMKEIT', 'VERARBEITUNG', 'KOMMUNIKATION', 'ABSCHLUSS']

const PHASE_COLORS: Record<string, string> = {
  AUFMERKSAMKEIT: '#196470',
  VERARBEITUNG:   '#C8A44A',
  KOMMUNIKATION:  '#2A8999',
  ABSCHLUSS:      '#0A1F44',
}

export function InteractiveTimeline() {
  const [activeStep, setActiveStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const current = STEPS[activeStep]
  const progress = ((activeStep + 1) / STEPS.length) * 100
  const phaseColor = PHASE_COLORS[current.phase]

  useEffect(() => {
    if (!isAutoPlaying) return
    autoRef.current = setTimeout(() => {
      if (activeStep < STEPS.length - 1) {
        setActiveStep((s) => s + 1)
      } else {
        setIsAutoPlaying(false)
      }
    }, 2200)
    return () => { if (autoRef.current) clearTimeout(autoRef.current) }
  }, [activeStep, isAutoPlaying])

  const goTo = (i: number) => {
    setIsAutoPlaying(false)
    setActiveStep(i)
  }

  const toggleAuto = () => {
    if (activeStep === STEPS.length - 1) setActiveStep(0)
    setIsAutoPlaying((p) => !p)
  }

  return (
    <section
      id="ablauf"
      className="dark-section"
      style={{ paddingTop: 'clamp(5rem, 9vw, 7rem)', paddingBottom: 'clamp(5rem, 9vw, 7rem)' }}
      aria-labelledby="timeline-heading"
    >
      <Container className="relative">

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-10" style={{ background: 'var(--color-gold)' }} />
            <span
              className="text-xs font-semibold tracking-[0.14em] uppercase"
              style={{ color: 'var(--color-teal-light)' }}
            >
              Ihr System-Ablauf
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              id="timeline-heading"
              style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 550, letterSpacing: '-0.03em', lineHeight: 1.1 }}
            >
              Einmal einrichten.<br />
              Dauerhaft automatisiert.
            </h2>
            <button
              type="button"
              onClick={toggleAuto}
              className="flex items-center gap-3 text-xs font-semibold tracking-[0.1em] uppercase px-5 py-2.5 shrink-0 btn-press transition-all duration-200"
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                color: isAutoPlaying ? 'var(--color-gold)' : 'rgba(255,255,255,0.7)',
                borderColor: isAutoPlaying ? 'rgba(200,164,74,0.5)' : 'rgba(255,255,255,0.2)',
                borderRadius: '2px',
                background: isAutoPlaying ? 'rgba(200,164,74,0.08)' : 'transparent',
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: isAutoPlaying ? 'var(--color-gold)' : 'rgba(255,255,255,0.4)' }}
              />
              {isAutoPlaying ? 'Pause' : activeStep === STEPS.length - 1 ? 'Neustart' : 'Abspielen'}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs"
              style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}
            >
              Schritt {String(activeStep + 1).padStart(2, '0')} von {STEPS.length}
            </span>
            <span
              className="text-xs"
              style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}
            >
              {current.phase}
            </span>
          </div>
          <div
            className="h-0.5 w-full rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, var(--color-teal), ${phaseColor})`,
                transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          </div>
        </div>

        {/* Main content: Big step card + step dots */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Large active step */}
          <div className="lg:col-span-7">
            <div
              className="p-8 md:p-10"
              style={{
                border: `1px solid ${phaseColor}40`,
                borderLeft: `3px solid ${phaseColor}`,
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '0 4px 4px 0',
                minHeight: '280px',
                transition: 'border-color 0.4s ease',
              }}
            >
              {/* Step number — huge decorative */}
              <div
                className="mb-6 leading-none select-none"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(4rem, 8vw, 6.5rem)',
                  fontWeight: 700,
                  color: `${phaseColor}20`,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.85,
                }}
                aria-hidden="true"
              >
                {String(activeStep + 1).padStart(2, '0')}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs px-2 py-0.5"
                  style={{
                    color: phaseColor,
                    background: `${phaseColor}18`,
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.1em',
                    borderRadius: '2px',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  {current.phase}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 550,
                  color: 'white',
                  letterSpacing: '-0.025em',
                  marginBottom: '1rem',
                }}
              >
                {current.title}
              </h3>

              <p
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  maxWidth: '38rem',
                }}
              >
                {current.desc}
              </p>

              {/* Prev / Next */}
              <div className="flex items-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => goTo(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="text-xs font-semibold tracking-wide uppercase px-4 py-2 transition-all duration-150"
                  style={{
                    color: activeStep === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)',
                    border: '1px solid',
                    borderColor: activeStep === 0 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.18)',
                    borderRadius: '2px',
                    background: 'transparent',
                  }}
                >
                  ← Zurück
                </button>
                <button
                  type="button"
                  onClick={() => goTo(Math.min(STEPS.length - 1, activeStep + 1))}
                  disabled={activeStep === STEPS.length - 1}
                  className="text-xs font-semibold tracking-wide uppercase px-4 py-2 transition-all duration-150"
                  style={{
                    color: activeStep === STEPS.length - 1 ? 'rgba(255,255,255,0.2)' : 'white',
                    border: '1px solid',
                    borderColor: activeStep === STEPS.length - 1 ? 'rgba(255,255,255,0.08)' : phaseColor,
                    background: activeStep === STEPS.length - 1 ? 'transparent' : `${phaseColor}20`,
                    borderRadius: '2px',
                  }}
                >
                  Weiter →
                </button>
              </div>
            </div>
          </div>

          {/* Right: Phase groups + step dots */}
          <div className="lg:col-span-5 space-y-5">
            {PHASES.map((phase) => {
              const phaseSteps = STEPS.filter((s) => s.phase === phase)
              const pc = PHASE_COLORS[phase]
              const isActivePhase = current.phase === phase
              return (
                <div
                  key={phase}
                  className="transition-opacity duration-300"
                  style={{ opacity: isActivePhase ? 1 : 0.45 }}
                >
                  <p
                    className="mb-2 text-xs font-semibold tracking-[0.14em] uppercase"
                    style={{ color: isActivePhase ? pc : 'rgba(255,255,255,0.25)' }}
                  >
                    {phase}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {phaseSteps.map((step) => {
                      const idx = STEPS.findIndex((s) => s.id === step.id)
                      const isDone = idx < activeStep
                      const isCurrent = idx === activeStep
                      return (
                        <button
                          key={step.id}
                          type="button"
                          onClick={() => goTo(idx)}
                          className="flex items-center gap-2 px-3 py-1.5 transition-all duration-200"
                          style={{
                            borderRadius: '3px',
                            fontSize: '0.78rem',
                            fontWeight: isCurrent ? 700 : 500,
                            border: `1px solid ${isCurrent ? pc : isDone ? `${pc}40` : 'rgba(255,255,255,0.08)'}`,
                            background: isCurrent ? `${pc}20` : isDone ? `${pc}08` : 'transparent',
                            color: isCurrent ? 'white' : isDone ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)',
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{
                              background: isCurrent ? pc : isDone ? `${pc}80` : 'rgba(255,255,255,0.2)',
                            }}
                          />
                          <span
                            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', marginRight: '2px' }}
                          >
                            {String(step.id).padStart(2, '0')}
                          </span>
                          {step.title}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* Completion state */}
            {activeStep === STEPS.length - 1 && (
              <div
                className="mt-4 p-4"
                style={{
                  border: '1px solid rgba(34,197,94,0.3)',
                  background: 'rgba(34,197,94,0.06)',
                  borderRadius: '3px',
                }}
              >
                <p className="text-sm font-medium" style={{ color: 'rgba(134,239,172,0.9)' }}>
                  ✓ Vollständiger System-Ablauf
                </p>
                <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Von der ersten Anfrage bis zum laufenden Auftrag — automatisiert.
                </p>
              </div>
            )}
          </div>
        </div>

      </Container>
    </section>
  )
}
