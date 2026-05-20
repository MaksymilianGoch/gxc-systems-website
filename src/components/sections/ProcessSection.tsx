'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

const steps = [
  {
    n: '01',
    title: 'Analyse',
    desc: 'Wir verstehen deinen Betrieb, bevor wir bauen.',
    duration: 'Woche 1',
    icon: 'search',
    what: [
      'Welche Anfragen kommen wie rein? (Telefon, Mail, Web?)',
      'Wie strukturierst du aktuell? (CRM, Zettel, Chaos?)',
      'Wo verlierst du am meisten Aufträge?',
      'Welche Tools nutzt du bereits?',
    ],
    result: 'Clarity Report — eine Seite, klare Prioritäten.',
    resultIcon: 'description',
  },
  {
    n: '02',
    title: 'Website & Widget',
    desc: 'Lead-Quelle und Erfassungspunkt werden eingerichtet.',
    duration: 'Woche 2',
    icon: 'web',
    what: [
      'Widget wird auf deiner Website eingebunden',
      'Anfrage-Formular mit deinen Leistungen eingerichtet',
      'Dringlichkeitsstufen & Kategorien konfiguriert',
      'Erste Tests mit echten Szenarien',
    ],
    result: 'Deine Website erfasst ab sofort jede Anfrage.',
    resultIcon: 'task_alt',
  },
  {
    n: '03',
    title: 'CRM-Struktur',
    desc: 'Alle Anfragen zentral, geordnet und sichtbar.',
    duration: 'Woche 2–3',
    icon: 'database',
    what: [
      'CRM wird aufgesetzt und mit Echtdaten befüllt',
      'Lead-Status-System eingerichtet (Neu / Aktiv / Abgeschlossen)',
      'Team-Zuweisungen und Benachrichtigungen konfiguriert',
      'Kalender-Integration verbunden',
    ],
    result: 'Du siehst jeden Lead auf einen Blick.',
    resultIcon: 'visibility',
  },
  {
    n: '04',
    title: 'Automation',
    desc: 'Prozesse laufen ohne manuellen Eingriff.',
    duration: 'Woche 3–4',
    icon: 'settings_suggest',
    what: [
      'Automatische Sofortantwort bei neuer Anfrage',
      'Follow-up-Sequenzen nach 48 / 72 Stunden',
      'Team-Benachrichtigungen per E-Mail & Push',
      'Abschluss-Bestätigung und Reporting automatisiert',
    ],
    result: 'Dein System arbeitet — auch wenn du auf der Baustelle bist.',
    resultIcon: 'auto_mode',
  },
]

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const handleClick = (idx: number) => {
    setActiveStep((prev) => (prev === idx ? null : idx))
  }

  const active = activeStep !== null ? steps[activeStep] : null

  return (
    <section id="ablauf" className="section-y" style={{ background: 'var(--color-bg)' }}>
      <style>{`
        @keyframes detailSlideDown {
          from { opacity: 0; transform: translateY(-10px); max-height: 0; }
          to   { opacity: 1; transform: translateY(0);    max-height: 600px; }
        }
        .process-card {
          transition: transform 0.22s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.22s ease,
                      border-color 0.18s ease,
                      background 0.18s ease;
        }
        .process-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px -10px rgba(0,32,69,0.13);
        }
        .process-card.active {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px -10px rgba(0,32,69,0.18);
        }
        .step-connector {
          position: relative;
          height: 2px;
          background: var(--color-border-2);
          flex: 1;
          align-self: center;
          margin-top: -3.5rem;
          min-width: 8px;
        }
        .step-connector.active-line {
          background: var(--color-blue);
        }
        @keyframes progressPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      <Container>
        <AnimateIn>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.03em', marginBottom: '0.875rem' }}>
              Vom ersten Klick bis zum Auftrag.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-2)' }}>
              Klicke auf einen Schritt — sieh, was genau passiert.
            </p>
          </div>
        </AnimateIn>

        {/* Step cards */}
        <AnimateIn delay={80}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }} className="grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const isActive = activeStep === i
              const isPast   = activeStep !== null && i < activeStep

              return (
                <button
                  key={step.n}
                  type="button"
                  onClick={() => handleClick(i)}
                  aria-expanded={isActive}
                  className={`process-card${isActive ? ' active' : ''}`}
                  style={{
                    background: isActive ? 'var(--color-blue)' : 'var(--color-bg-1)',
                    border: `1px solid ${isActive ? 'transparent' : isPast ? 'rgba(110,171,140,0.4)' : 'var(--color-border)'}`,
                    borderTop: `4px solid ${isActive ? 'var(--color-green)' : isPast ? 'var(--color-green)' : 'var(--color-blue)'}`,
                    borderRadius: 'var(--radius-xl)',
                    padding: '1.5rem 1.25rem',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  {/* Ghost number */}
                  <span style={{
                    position: 'absolute', top: '0.5rem', right: '0.875rem',
                    fontFamily: 'var(--font-display)', fontSize: '4.5rem', fontWeight: 900,
                    color: isActive ? 'rgba(255,255,255,0.08)' : 'rgba(0,32,69,0.06)',
                    lineHeight: 1, userSelect: 'none', transition: 'color 0.2s ease',
                  }}>{step.n}</span>

                  {/* Duration chip */}
                  <div style={{ marginBottom: '0.75rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: isActive ? 'var(--color-green)' : isPast ? 'var(--color-green)' : 'var(--color-text-3)',
                      transition: 'color 0.2s ease',
                    }}>{step.duration}</span>
                  </div>

                  {/* Icon + Title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1.2rem', color: isActive ? 'white' : 'var(--color-blue)', transition: 'color 0.2s ease' }}>{step.icon}</span>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: isActive ? 'white' : 'var(--color-text)', letterSpacing: '-0.02em', transition: 'color 0.2s ease' }}>{step.title}</h4>
                  </div>

                  <p style={{ fontSize: '0.78rem', color: isActive ? 'rgba(255,255,255,0.7)' : 'var(--color-text-3)', lineHeight: 1.55, transition: 'color 0.2s ease' }}>{step.desc}</p>

                  {/* Expand indicator */}
                  <div style={{ marginTop: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: isActive ? 'rgba(255,255,255,0.5)' : 'var(--color-text-3)', transition: 'color 0.2s ease' }}>
                      {isActive ? 'Schließen' : 'Details'}
                    </span>
                    <span className="material-symbols-outlined" style={{ fontSize: '0.875rem', color: isActive ? 'rgba(255,255,255,0.5)' : 'var(--color-text-3)', transform: isActive ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease, color 0.2s ease' }}>
                      expand_more
                    </span>
                  </div>

                  {/* Done check for past steps */}
                  {isPast && !isActive && (
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: 20, height: 20, borderRadius: '50%', background: 'rgba(110,171,140,0.15)', border: '1px solid rgba(110,171,140,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '0.75rem', color: 'var(--color-green)' }}>check</span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </AnimateIn>

        {/* Detail panel */}
        {active && (
          <div
            key={active.n}
            style={{
              background: 'var(--color-bg-1)',
              border: '1px solid var(--color-border)',
              borderLeft: '3px solid var(--color-blue)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              marginBottom: '1.5rem',
              animation: 'detailSlideDown 0.35s cubic-bezier(0.16,1,0.3,1)',
              overflow: 'hidden',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: What we do */}
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-blue)', marginBottom: '0.75rem' }}>
                  Schritt {active.n} — Was wir tun
                </p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
                  {active.title}
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500, color: 'var(--color-text-3)', letterSpacing: '0.06em', marginLeft: '0.75rem' }}>{active.duration}</span>
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {active.what.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: '0.625rem',
                        animation: `detailSlideDown 0.3s cubic-bezier(0.16,1,0.3,1) ${i * 55}ms both`,
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--color-green)', flexShrink: 0, marginTop: '0.05rem' }}>arrow_forward</span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--color-text-2)', lineHeight: 1.6 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Result */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(0,32,69,0.04)', border: '1px solid rgba(0,32,69,0.1)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-lg)', background: 'rgba(110,171,140,0.1)', border: '1px solid rgba(110,171,140,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--color-green)' }}>{active.resultIcon}</span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-green)' }}>Resultat</p>
                  </div>
                  <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)', lineHeight: 1.5, letterSpacing: '-0.01em' }}>
                    {active.result}
                  </p>
                </div>

                {/* Step navigation */}
                <div style={{ display: 'flex', gap: '0.625rem' }}>
                  {activeStep !== null && activeStep > 0 && (
                    <button
                      type="button"
                      onClick={() => setActiveStep(activeStep - 1)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.625rem 1rem', border: '1px solid var(--color-border-2)', borderRadius: 'var(--radius-lg)', fontSize: '0.8rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-text-2)', background: 'transparent', cursor: 'pointer', transition: 'all 0.15s ease' }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-3)'; e.currentTarget.style.color = 'var(--color-text)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-2)'; e.currentTarget.style.color = 'var(--color-text-2)'; }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>arrow_back</span>
                      Zurück
                    </button>
                  )}
                  {activeStep !== null && activeStep < steps.length - 1 && (
                    <button
                      type="button"
                      onClick={() => setActiveStep(activeStep + 1)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.625rem 1rem', background: 'var(--color-blue)', border: 'none', borderRadius: 'var(--radius-lg)', fontSize: '0.8rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'white', cursor: 'pointer', transition: 'background 0.15s ease', marginLeft: 'auto' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-blue-dim)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-blue)'; }}
                    >
                      Nächster Schritt
                      <span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>arrow_forward</span>
                    </button>
                  )}
                  {activeStep === steps.length - 1 && (
                    <a
                      href="#kontakt"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.625rem 1rem', background: 'var(--color-green)', borderRadius: 'var(--radius-lg)', fontSize: '0.8rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-blue)', marginLeft: 'auto' }}
                    >
                      Jetzt starten
                      <span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>rocket_launch</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress bar */}
        <AnimateIn delay={180}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', padding: '0 0.25rem' }}>
            {steps.map((s, i) => (
              <div
                key={s.n}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: i < steps.length - 1 ? 1 : 0 }}
              >
                <button
                  type="button"
                  onClick={() => handleClick(i)}
                  style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: activeStep !== null && i <= activeStep ? 'var(--color-blue)' : 'var(--color-bg-2)',
                    border: `2px solid ${activeStep !== null && i <= activeStep ? 'var(--color-blue)' : 'var(--color-border-2)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'all 0.22s ease',
                    boxShadow: activeStep === i ? '0 0 0 4px rgba(0,32,69,0.12)' : 'none',
                  }}
                  aria-label={`Schritt ${s.n}: ${s.title}`}
                >
                  {activeStep !== null && i < activeStep
                    ? <span className="material-symbols-outlined" style={{ fontSize: '0.75rem', color: 'white' }}>check</span>
                    : <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, color: activeStep !== null && i <= activeStep ? 'white' : 'var(--color-text-3)' }}>{String(i + 1)}</span>
                  }
                </button>
                {i < steps.length - 1 && (
                  <div style={{ flex: 1, height: 2, borderRadius: 2, background: activeStep !== null && i < activeStep ? 'var(--color-blue)' : 'var(--color-border)', transition: 'background 0.3s ease' }} />
                )}
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* Navy summary bar */}
        <AnimateIn delay={250}>
          <div style={{ background: 'var(--color-blue)', borderRadius: 'var(--radius-2xl)', padding: '1.75rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }} className="md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div>
                <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-blue-light)', marginBottom: '0.25rem' }}>Projektdauer</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>3–4 Wochen</p>
              </div>
              <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.12)' }} className="hidden md:block" />
              <div>
                <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-blue-light)', marginBottom: '0.25rem' }}>Live-Betrieb</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>Ab Woche 4</p>
              </div>
            </div>
            <a
              href="#kontakt"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-green)', color: 'var(--color-blue)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', padding: '0.875rem 1.75rem', borderRadius: 'var(--radius-xl)', transition: 'transform 0.15s ease', whiteSpace: 'nowrap', flexShrink: 0 }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
            >
              Ablauf besprechen
            </a>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
