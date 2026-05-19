import { AnimateIn } from '@/components/ui/AnimateIn'
import { Container } from '@/components/ui/Container'

interface DisciplinePanel {
  title: string
  content: string
  items: string[]
}

const PANELS: DisciplinePanel[] = [
  {
    title: 'Strukturierte Lieferung',
    content:
      'Jedes System wird nach einer definierten Umsetzungssequenz ausgeliefert — Analyse, Architektur, Entwicklung, Test, Inbetriebnahme, Übergabe. Keine Improvisation.',
    items: [
      '01 — Betriebsanalyse',
      '02 — Systemarchitektur',
      '03 — Entwicklung & Integration',
      '04 — Test & Qualitätssicherung',
      '05 — Inbetriebnahme & Einweisung',
    ],
  },
  {
    title: 'Professionelle Infrastruktur',
    content:
      'EU-gehostet, DSGVO-konform. API-first-Architektur. Alle Integrationen dokumentiert. Systeme verbleiben im Eigentum des Kunden.',
    items: [
      'Ausschließlich EU-Server',
      'Auftragsverarbeitungsverträge inklusive',
      'Keine Herstellerbindung',
      'Vollständige Übergabedokumentation',
      'Alle Zugangsdaten verbleiben beim Kunden',
    ],
  },
  {
    title: 'Messbare Ergebnisse',
    content:
      'Wir liefern keine Software. Wir liefern operative Verbesserungen mit messbaren unternehmerischen Kennzahlen — definiert zu Beginn jedes Projekts.',
    items: [
      'Vereinbarte KPIs vor Projektbeginn',
      '30-Tage-Nachbetrachtung nach Launch inklusive',
      'Optimierungsfahrplan wird bereitgestellt',
      'Laufender Support verfügbar',
      'Pilotprojekte zur Eignungsprüfung möglich',
    ],
  },
]

export function TrustSection() {
  return (
    <section
      id="standards"
      className="section-y"
      style={{ background: 'var(--color-bg-1)' }}
      aria-labelledby="trust-heading"
    >
      <Container>
        {/* Header */}
        <AnimateIn>
          <div className="mb-14 max-w-2xl">
            <span className="accent-line" aria-hidden="true" />
            <p className="text-label mb-4">ARBEITSWEISE</p>
            <h2
              id="trust-heading"
              className="text-display-sm"
              style={{ color: 'var(--color-text)' }}
            >
              Wie wir bauen.
              <br />
              Warum es hält.
            </h2>
          </div>
        </AnimateIn>

        {/* 3 discipline panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{
            background: 'var(--color-border)',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {PANELS.map((panel, i) => (
            <AnimateIn key={panel.title} delay={i * 80}>
              <div
                className="panel"
                style={{
                  padding: '2rem',
                  height: '100%',
                  borderRadius: 0,
                  border: 'none',
                }}
              >
                {/* Panel index */}
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--color-blue)',
                    letterSpacing: '0.1em',
                    marginBottom: '1rem',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </p>

                {/* Title */}
                <h3
                  className="text-title"
                  style={{
                    color: 'var(--color-text)',
                    marginBottom: '1rem',
                  }}
                >
                  {panel.title}
                </h3>

                {/* Body */}
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-2)',
                    lineHeight: 1.7,
                    marginBottom: '1.75rem',
                  }}
                >
                  {panel.content}
                </p>

                {/* Divider */}
                <div
                  className="h-rule"
                  style={{ marginBottom: '1.5rem' }}
                  aria-hidden="true"
                />

                {/* Mono list */}
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                  }}
                >
                  {panel.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--color-text-2)',
                        letterSpacing: '0.02em',
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
