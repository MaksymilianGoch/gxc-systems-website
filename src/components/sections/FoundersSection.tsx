import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

// Content generiert von gemma4, reviewt und integriert
interface Founder {
  initials: string
  name: string
  role: string
  story: string
  realization: string
  focus: string
  tags: string[]
  photo: string | null
}

const founders: Founder[] = [
  {
    initials: 'MG',
    name: 'Maksymilian Goch',
    role: 'Gründer & Strategie',
    story: '5 Jahre im Betriebsvertrieb. Hat live gesehen, wie gute Handwerker täglich Aufträge verlieren — nicht wegen schlechter Qualität, sondern weil die Anfrage per WhatsApp kam und vergessen wurde. Weil der Konkurrent in 10 Minuten antwortete, er selbst erst in 2 Stunden.',
    realization: 'Das Problem ist nicht schlechte Arbeit. Das Problem ist fehlende Systeminfrastruktur.',
    focus: 'Wie bauen wir ein System, das echte, alltägliche Probleme von Betrieben löst?',
    tags: ['Strategie', 'Systemdesign', 'Vertrieb'],
    photo: null,
  },
  {
    initials: 'AC',
    name: 'Ariel Creuz',
    role: 'Co-Gründer & Technologie',
    story: '8 Jahre Automatisierungssysteme und KI-Integration gebaut. Kann die gesamte Infrastruktur — KI, Kalender, E-Mail, Telefon, Datenbank — in 2–3 Wochen aufbauen, was andere Agenturen 6 Monate kosten würde.',
    realization: 'Ihn interessiert nicht schöne Code-Architektur — ihn interessiert: Funktioniert das im Alltag des Betriebsinhabers?',
    focus: 'Wie bauen wir das, was nötig ist, so dass es wirklich läuft?',
    tags: ['KI-Systeme', 'Automatisierung', 'Infrastruktur'],
    photo: null,
  },
]

const sharedBelief =
  'Die meisten KMU brauchen keine Software. Sie brauchen ein System, das funktioniert — das ihnen Zeit spart, das ihnen Aufträge bringt. Nicht cool. Nicht innovativ. Sondern verdammt praktisch.'

const pilotCards = [
  {
    index: '01',
    headline: 'Was Sie bekommen',
    items: [
      'Vollständige Systemanalyse Ihres Betriebs',
      'Aufbau des ersten operativen Moduls',
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
      'Keine weiteren Anforderungen',
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

function FounderCard({ founder }: { founder: Founder }) {
  return (
    <article
      style={{
        background: 'var(--color-bg-2)',
        border: '1px solid var(--color-border)',
        borderRadius: '4px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Photo or clean monogram avatar */}
      <div
        style={{
          width: '100%',
          aspectRatio: '4/3',
          background: 'var(--color-bg-2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--color-border)',
        }}
        aria-hidden="true"
      >
        {founder.photo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={founder.photo}
            alt={`${founder.name} — ${founder.role}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(37,99,235,0.08)',
              border: '1.5px solid rgba(37,99,235,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--color-blue)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              {founder.initials}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            {founder.name}
          </h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--color-blue)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            {founder.role}
          </p>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-2)', lineHeight: 1.65 }}>
          {founder.story}
        </p>

        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
          <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.5rem', fontStyle: 'italic' }}>
            &bdquo;{founder.realization}&ldquo;
          </p>
          <p style={{ fontSize: '0.78rem', color: 'var(--color-text-3)' }}>
            Fokus: {founder.focus}
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: 'auto' }}>
          {founder.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-3)',
                border: '1px solid var(--color-border)',
                padding: '0.2rem 0.55rem',
                borderRadius: '2px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export function FoundersSection() {
  return (
    <>
      {/* ── ÜBER UNS ─────────────────────────────────────────── */}
      <section
        id="ueber-uns"
        className="section-y"
        style={{ background: 'var(--color-bg-1)' }}
        aria-labelledby="founders-heading"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20 items-start">

            <AnimateIn direction="left">
              <div>
                <span className="accent-line" />
                <p className="text-label mb-4">Wer baut das? Und warum?</p>
                <h2
                  id="founders-heading"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.875rem, 3.5vw, 3rem)',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    marginBottom: '1.75rem',
                  }}
                >
                  Gebaut von Unternehmern.
                  <br />
                  Für Unternehmer.
                </h2>

                <p style={{ fontSize: '1rem', color: 'var(--color-text-2)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  GXC entstand aus einer einfachen Beobachtung: Gute Betriebe verlieren täglich Aufträge — nicht wegen schlechter Qualität, sondern weil ihnen die operative Infrastruktur fehlt.
                </p>

                <blockquote
                  style={{
                    borderLeft: '2px solid var(--color-blue)',
                    paddingLeft: '1.25rem',
                    marginBottom: '2rem',
                  }}
                >
                  <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)', lineHeight: 1.55, fontStyle: 'italic' }}>
                    &bdquo;{sharedBelief}&ldquo;
                  </p>
                </blockquote>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {founders.map((f, i) => (
                <AnimateIn key={f.initials} delay={i * 100}>
                  <FounderCard founder={f} />
                </AnimateIn>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── PILOTPROGRAMM ────────────────────────────────────── */}
      <section
        id="ergebnisse"
        className="section-y"
        style={{ background: 'var(--color-bg)' }}
        aria-labelledby="pilot-heading"
      >
        <Container>
          <AnimateIn>
            <div style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto 3.5rem' }}>
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
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: card.accent }}>{card.index}</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
                      {card.headline}
                    </h3>
                  </div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                    {card.items.map((item) => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
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
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <a href="#kontakt" className="btn-primary" style={{ fontSize: '0.95rem', padding: '1rem 2.25rem' }}>
                Pilotplatz anfragen
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
