import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

// Content via gemma4, reviewed and adjusted
const phases = [
  {
    id: 'phase-1',
    week: 'Woche 1',
    name: 'Analyse',
    iconPath: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    description: 'Wir verstehen deinen Betrieb — bevor wir bauen.',
    bullets: [
      'Welche Anfragen kommen wie rein? (Telefon, Mail, Web?)',
      'Wie strukturierst du aktuell? (CRM, Zettel, Chaos?)',
      'Welche Tools nutzt du bereits?',
      'Was soll konkret besser werden?',
    ],
    result: 'Clarity Report — eine Seite, klare Prioritäten',
  },
  {
    id: 'phase-2',
    week: 'Woche 2–3',
    name: 'Aufbau',
    iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z',
    description: 'Wir bauen das System — du schaust zu oder gehst deiner Arbeit nach.',
    bullets: [
      'Widget & Kontaktformular eingebunden',
      'CRM aufgesetzt und konfiguriert',
      'Automation-Workflows gebaut',
      'Alle Integrationen verbunden (Kalender, Mail, etc.)',
    ],
    result: 'Live-System in Testumgebung',
  },
  {
    id: 'phase-3',
    week: 'Woche 3–4',
    name: 'Test & Training',
    iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    description: 'Wir testen gemeinsam — echte Szenarien, kein Labor.',
    bullets: [
      'Dein Team testet mit echten Szenarien',
      'Feinabstimmungen werden direkt gemacht',
      '30-minütiges Training (wie bedient man\'s?)',
      'Handbuch & FAQ für den Alltag',
    ],
    result: 'Team fit, System bereit',
  },
  {
    id: 'phase-4',
    week: 'Woche 4',
    name: 'Livegang',
    iconPath: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    description: 'Das System geht live — wir sind in der ersten Woche dabei.',
    bullets: [
      'System auf Production geschaltet',
      'Erste echte Anfragen laufen durch',
      'Wir monitoren und greifen bei Bedarf ein',
      'Kein Alleingelassen-Gefühl',
    ],
    result: 'Dein System läuft',
  },
  {
    id: 'phase-5',
    week: 'Laufend',
    name: 'Betreuung',
    iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    description: 'Wir kümmern uns — dein System wird immer besser.',
    bullets: [
      'Monatliche Reports (was funktioniert, was nicht?)',
      'Anpassungen auf neue Anforderungen',
      'Erweiterung bei Bedarf (neue Module)',
      'Direkter Kanal zu uns (kein Ticket-System)',
    ],
    result: 'System wird monatlich besser',
  },
]

export function ProcessSection() {
  return (
    <section
      id="ablauf"
      className="section-y"
      style={{ background: 'var(--color-bg-1)' }}
      aria-labelledby="process-heading"
    >
      <Container>
        <AnimateIn>
          <div style={{ maxWidth: '42rem', marginBottom: '3.5rem' }}>
            <span className="accent-line" />
            <p className="text-label mb-4">So bauen wir das für dich</p>
            <h2
              id="process-heading"
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
              Strukturierter Prozess.
              <br />
              Nicht Improvisation.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-2)', lineHeight: 1.7 }}>
              5 Phasen, klare Zeitrahmen, messbare Resultate — du weißt immer, wo wir stehen.
            </p>
          </div>
        </AnimateIn>

        <div style={{ position: 'relative' }}>
          {/* Vertical timeline line */}
          <div
            style={{
              position: 'absolute',
              left: '1.75rem',
              top: '2rem',
              bottom: '2rem',
              width: '1px',
              background: 'linear-gradient(to bottom, var(--color-border), var(--color-blue), var(--color-border))',
            }}
            aria-hidden="true"
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {phases.map((phase, i) => (
              <AnimateIn key={phase.id} delay={i * 80}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '3.5rem 1fr',
                    gap: '1.5rem',
                    paddingBottom: i < phases.length - 1 ? '2.5rem' : '0',
                  }}
                >
                  {/* Timeline dot + week */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', paddingTop: '0.25rem' }}>
                    <div
                      style={{
                        width: '2.25rem',
                        height: '2.25rem',
                        borderRadius: '50%',
                        background: 'var(--color-blue)',
                        border: '2px solid var(--color-bg-1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        zIndex: 1,
                        position: 'relative',
                      }}
                      aria-hidden="true"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={phase.iconPath} />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      background: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '6px',
                      padding: '1.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      <div>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.6rem',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--color-blue)',
                            display: 'block',
                            marginBottom: '0.2rem',
                          }}
                        >
                          Phase {i + 1} — {phase.week}
                        </span>
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: 'var(--color-text)',
                            letterSpacing: '-0.025em',
                          }}
                        >
                          {phase.name}
                        </h3>
                      </div>
                      <div
                        style={{
                          padding: '0.3rem 0.75rem',
                          background: 'rgba(37,99,235,0.07)',
                          border: '1px solid rgba(37,99,235,0.15)',
                          borderRadius: '3px',
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--color-blue)', letterSpacing: '0.06em' }}>
                          {phase.week}
                        </span>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-2)', lineHeight: 1.65, marginBottom: '1rem' }}>
                      {phase.description}
                    </p>

                    <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.4rem', marginBottom: '1rem' }}>
                      {phase.bullets.map((b) => (
                        <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <span style={{ color: 'var(--color-blue)', fontSize: '0.7rem', marginTop: '0.2rem', flexShrink: 0 }}>→</span>
                          <span style={{ fontSize: '0.82rem', color: 'var(--color-text-2)', lineHeight: 1.5 }}>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.35rem 0.65rem',
                        background: 'rgba(16, 185, 129, 0.07)',
                        border: '1px solid rgba(16, 185, 129, 0.15)',
                        borderRadius: '3px',
                      }}
                    >
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 6l3 3 5-5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#10B981', letterSpacing: '0.06em' }}>
                        Resultat: {phase.result}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>

        <AnimateIn delay={200}>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="#kontakt" className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.95rem 2rem' }}>
              Prozess starten
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
