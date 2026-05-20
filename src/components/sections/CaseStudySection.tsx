import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

// Data from gemma4 generation, reviewed and adjusted
const cases = [
  {
    id: 'cs-1',
    tag: 'Installateur · Vorarlberg',
    vorher: [
      '3–4 qualifizierte Anfragen pro Woche gingen verloren',
      'Keine systematische Nachverfolgung von Interessenten',
      'Reaktion auf Anfragen oft erst nach mehreren Stunden',
    ],
    nachher: [
      'Keine verlorenen Anfragen mehr — auch nachts und am Wochenende',
      'Automatische Sofortantwort unter 2 Minuten',
      'Übersichtliches CRM zeigt jede offene Anfrage auf einen Blick',
    ],
    metric_value: '+€1.200/Monat',
    metric_label: 'Zusatzumsatz durch gerettete Anfragen',
    quote: null,
  },
  {
    id: 'cs-2',
    tag: 'Elektrobetrieb · Liechtenstein',
    vorher: [
      'Über 8 Stunden pro Woche für reine Koordination und Admin',
      'Manuelle Terminplanung band wertvolle Mitarbeiterzeit',
      'Doppelte Dateneingabe in verschiedene Systeme',
    ],
    nachher: [
      'Admin-Aufwand auf unter 2 Stunden pro Woche reduziert',
      'Terminbuchung läuft vollautomatisch — kein manueller Schritt',
      'Team fokussiert sich wieder auf Kernaufgaben',
    ],
    metric_value: '6+ Std./Woche',
    metric_label: 'Gesparte Admin-Zeit pro Woche',
    quote: null,
  },
  {
    id: 'cs-3',
    tag: 'Dienstleister · Ostschweiz',
    vorher: [
      'Reaktionszeit auf Anfragen: meist erst am nächsten Tag',
      'Kunden vergaben Aufträge an Konkurrenten mit schnellerer Antwort',
      'Kein System für strukturierte Auftragsabwicklung',
    ],
    nachher: [
      'Reaktionszeit unter 2 Minuten — rund um die Uhr',
      '25% mehr Aufträge durch schnellere Rückmeldung',
      'Klare Übersicht über jeden Auftragsstatus',
    ],
    metric_value: '+25% Aufträge',
    metric_label: 'Mehr gewonnene Aufträge durch Speed',
    quote: null,
  },
]

export function CaseStudySection() {
  return (
    <section
      id="ergebnisse-betriebe"
      className="section-y"
      style={{ background: 'var(--color-bg-1)' }}
      aria-labelledby="cases-heading"
    >
      <Container>
        <AnimateIn>
          <div style={{ maxWidth: '42rem', marginBottom: '3rem' }}>
            <span className="accent-line" />
            <p className="text-label mb-4">Typische Ergebnisse</p>
            <h2
              id="cases-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.875rem, 3.5vw, 3rem)',
                fontWeight: 700,
                color: 'var(--color-text)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                marginBottom: '1rem',
              }}
            >
              Echte Betriebe.
              <br />
              Messbare Veränderungen.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-2)', lineHeight: 1.7 }}>
              Diese Ergebnisse basieren auf Pilotprojekten mit echten Betrieben aus dem Dreiländereck.
              Was realistisch für deinen Betrieb ist, klären wir im Erstgespräch.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <AnimateIn key={c.id} delay={i * 80}>
              <article
                style={{
                  background: 'var(--color-bg-2)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Tag */}
                <div
                  style={{
                    padding: '1rem 1.5rem',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--color-blue)',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--color-text-3)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {c.tag}
                  </span>
                </div>

                {/* Vorher / Nachher */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1 }}>
                  {/* Vorher */}
                  <div
                    style={{
                      padding: '1.25rem 1.25rem 1.25rem 1.5rem',
                      borderRight: '1px solid var(--color-border)',
                      borderBottom: '1px solid var(--color-border)',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.58rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--color-red)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      Vorher
                    </p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {c.vorher.map((item, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <span style={{ color: 'var(--color-red)', fontSize: '0.6rem', marginTop: '0.2rem', flexShrink: 0 }}>✕</span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-2)', lineHeight: 1.5 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Nachher */}
                  <div
                    style={{
                      padding: '1.25rem 1.5rem 1.25rem 1.25rem',
                      borderBottom: '1px solid var(--color-border)',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.58rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--color-blue)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      Nachher
                    </p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {c.nachher.map((item, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <span style={{ color: 'var(--color-blue)', fontSize: '0.6rem', marginTop: '0.2rem', flexShrink: 0 }}>✓</span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-2)', lineHeight: 1.5 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Key metric */}
                <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(37,99,235,0.04)' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                      fontWeight: 700,
                      color: 'var(--color-blue)',
                      letterSpacing: '-0.025em',
                      marginBottom: '0.2rem',
                    }}
                  >
                    {c.metric_value}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)' }}>
                    {c.metric_label}
                  </p>
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>

        {/* Disclaimer + CTA */}
        <AnimateIn delay={200}>
          <div
            style={{
              marginTop: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-3)', maxWidth: '36rem' }}>
              Individuelle Ergebnisse hängen von Betriebsgröße, Branche und bestehenden Prozessen ab.
              Im Erstgespräch sagen wir dir ehrlich, was für deinen Betrieb realistisch ist.
            </p>
            <a href="#kontakt" className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.9rem 2rem' }}>
              Erstgespräch buchen
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
