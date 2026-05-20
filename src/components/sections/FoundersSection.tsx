import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

/* ─── Founder Data ───────────────────────────────────────── */

interface Founder {
  initials: string
  name: string
  role: string
  bio: string
  tags: string[]
}

const founders: Founder[] = [
  {
    initials: 'MG',
    name: 'Maksymilian Goch',
    role: 'Gründer & Strategie',
    bio: 'Unternehmensstratege mit Fokus auf operative Systemarchitektur und automatisierte Akquise-Infrastruktur für KMU im Dreiländereck.',
    tags: ['Strategie', 'Systemdesign', 'Vertrieb'],
  },
  {
    initials: 'AC',
    name: 'Ariel Creuz',
    role: 'Co-Gründer & Technologie',
    bio: 'Technologie-Lead mit Fokus auf KI-gestützte Prozessarchitektur, Automatisierungssysteme und skalierbare Integrationen. Verantwortlich für die technische Umsetzung aller GXC-Systeme.',
    tags: ['KI-Systeme', 'Automatisierung', 'Infrastruktur'],
  },
]

const differentiators = [
  'Systemarchitektur statt Einzellösungen',
  'KI als Mittel — nicht als Botschaft',
  'Operativer Fokus, nicht technisches Featurebingo',
]

/* ─── Pilot Program Data ─────────────────────────────────── */

const pilotCards = [
  {
    index: '01',
    headline: 'Was Sie bekommen',
    items: [
      'Vollständige Systemanalyse Ihres Betriebs',
      'Aufbau des ersten operativen Moduls (Lead-Capture oder Terminlogik)',
      'CRM-Setup mit Echtdaten aus Ihrem Betrieb',
      'Monatliches Reporting während des Pilots',
      'Persönliche Begleitung durch beide Gründer',
    ],
    accent: 'var(--color-blue)',
  },
  {
    index: '02',
    headline: 'Was wir verlangen',
    items: [
      'Ehrliches Feedback während der Umsetzung',
      'Bereitschaft, Prozesse zu überdenken',
      'Einen Ansprechpartner mit Entscheidungskompetenz',
      'Bei messbarem Erfolg: eine dokumentierte Referenz',
      'Keine anderen Anforderungen',
    ],
    accent: 'var(--color-cyan)',
  },
  {
    index: '03',
    headline: 'Was es kostet',
    items: [
      'Reduzierte Pilotinvestition: ab 790 €',
      'Kein Retainer während des Pilots',
      'Volle Transparenz über Aufwand und Ergebnis',
      'Kein Vendor Lock-in — die Systeme gehören Ihnen',
      'Weiterer Ausbau optional, nie automatisch',
    ],
    accent: 'var(--color-amber)',
  },
]

/* ─── Sub-components ─────────────────────────────────────── */

function FounderCard({ founder, delay }: { founder: Founder; delay: number }) {
  return (
    <AnimateIn delay={delay} direction="up">
      <article
        style={{
          background: 'var(--color-bg-2)',
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          height: '100%',
        }}
      >
        {/* Photo placeholder — ready for real photo via CSS background */}
        <div
          style={{
            width: '100%',
            aspectRatio: '1 / 1',
            background: 'var(--color-bg-3)',
            border: '1px solid var(--color-border)',
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '2rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: 'var(--color-text-3)',
            }}
          >
            {founder.initials}
          </span>
        </div>

        <div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
              marginBottom: '0.25rem',
            }}
          >
            {founder.name}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-blue)',
            }}
          >
            {founder.role}
          </p>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-2)', lineHeight: 1.65, flex: 1 }}>
          {founder.bio}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: 'auto' }}>
          {founder.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-3)',
                border: '1px solid var(--color-border)',
                padding: '0.2rem 0.6rem',
                borderRadius: '2px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </AnimateIn>
  )
}

/* ─── Main export ─────────────────────────────────────────── */

export function FoundersSection() {
  return (
    <>
      {/* ── ÜBER UNS ─────────────────────────────────────── */}
      <section
        id="ueber-uns"
        className="section-y"
        style={{ background: 'var(--color-bg-1)' }}
        aria-labelledby="founders-heading"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

            <AnimateIn direction="left">
              <div>
                <span className="accent-line" />
                <p className="text-label mb-4">Über GXC Systems</p>
                <h2
                  id="founders-heading"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    marginBottom: '1.5rem',
                  }}
                >
                  Gebaut von Unternehmern.
                  <br />
                  Für Unternehmer.
                </h2>

                <p style={{ fontSize: '1rem', color: 'var(--color-text-2)', lineHeight: 1.7, marginBottom: '1rem' }}>
                  GXC Systems entstand aus einer einfachen Beobachtung: Die meisten KMU verlieren täglich Umsatz — nicht wegen mangelnder Qualität, sondern weil ihnen die operative Infrastruktur fehlt, die Anfragen systematisch erfasst, beantwortet und in Aufträge verwandelt.
                </p>
                <p style={{ fontSize: '1rem', color: 'var(--color-text-2)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                  Wir bauen diese Infrastruktur. Als verbundenes System — nicht als Ansammlung von Tools.
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0,
                    borderTop: '1px solid var(--color-border)',
                  }}
                >
                  {differentiators.map((d, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.875rem 0',
                        borderBottom: '1px solid var(--color-border)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.62rem',
                          color: 'var(--color-blue)',
                          minWidth: '1.5rem',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-2)' }}>{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {founders.map((f, i) => (
                <FounderCard key={f.initials} founder={f} delay={i * 100} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── PILOTPROGRAMM ────────────────────────────────── */}
      <section
        id="ergebnisse"
        className="section-y"
        style={{ background: 'var(--color-bg)' }}
        aria-labelledby="pilot-heading"
      >
        <Container>
          <AnimateIn>
            <div className="text-center mb-14" style={{ maxWidth: '42rem', margin: '0 auto 3.5rem' }}>
              <span className="accent-line" style={{ margin: '0 auto 1.25rem' }} />
              <p className="text-label mb-4">Pilotprogramm</p>
              <h2
                id="pilot-heading"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  letterSpacing: '-0.028em',
                  marginBottom: '1.25rem',
                }}
              >
                Drei Pilotplätze für Q3 2026.
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-2)', lineHeight: 1.7 }}>
                Wir nehmen aktuell drei Betriebe in unser Pilotprogramm auf. Reduzierte Investition, vollständige Dokumentation, gemeinsame Optimierung. Das Einzige, was wir verlangen: ehrliches Feedback und — bei Erfolg — eine Referenz.
              </p>
            </div>
          </AnimateIn>

          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ border: '1px solid var(--color-border)', borderRadius: '4px', overflow: 'hidden' }}
          >
            {pilotCards.map((card, i) => (
              <AnimateIn key={card.index} delay={i * 80}>
                <div
                  style={{
                    padding: '2rem',
                    borderRight: i < pilotCards.length - 1 ? '1px solid var(--color-border)' : 'none',
                    borderBottom: '0',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: card.accent,
                      }}
                    >
                      {card.index}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {card.headline}
                    </h3>
                  </div>

                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', flex: 1 }}>
                    {card.items.map((item) => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                        <span style={{ color: card.accent, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', marginTop: '0.15rem', flexShrink: 0 }}>→</span>
                        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-2)', lineHeight: 1.55 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={150}>
            <div className="text-center mt-10">
              <a
                href="#kontakt"
                className="btn-primary"
                style={{ fontSize: '0.95rem', padding: '1rem 2.25rem' }}
              >
                Pilotplatz anfragen
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </AnimateIn>
        </Container>
      </section>
    </>
  )
}
