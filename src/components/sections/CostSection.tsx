import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

// Content generiert von gemma4, reviewt und integriert
const scenarios = [
  {
    index: '01',
    title: 'Der verpasste Auftrag',
    story: [
      'Montag, 14:30 Uhr. Ein guter Kunde schreibt dir eine WhatsApp: „Brauche einen Installateur Mittwoch. Gibt\'s noch Platz?"',
      'Du siehst die Nachricht erst um 16:45 Uhr. Zu spät — er hat schon jemand anderen bestellt.',
      'Das passiert 2–3 Mal pro Monat. Du verlierst es nie, weil du es nie weißt.',
    ],
    loss: '€2.000–€4.000',
    lossLabel: 'pro Monat einfach weg',
    solution: 'Nachricht rein → sofort Benachrichtigung auf dein Handy → 5 Minuten später geantwortet → Der Auftrag ist dein.',
  },
  {
    index: '02',
    title: 'Das Terminchaos',
    story: [
      '"Hast du schon angerufen?" — "Wann hatte er Zeit?" — "War\'s Freitag oder nächste Woche?"',
      '10–12 Stunden pro Woche, die dein Team in reine Koordination steckt — Zeit, die nicht in echte Arbeit fließt.',
    ],
    loss: '€350–€420',
    lossLabel: 'pro Woche Koordinations-Overhead',
    solution: 'Anfrage rein → automatisch Termin-Link zum Kunden → Kalender sync → keine manuellen Rückfragen mehr.',
  },
  {
    index: '03',
    title: 'Die fehlende Nachverfolgung',
    story: [
      'Interessent schreibt: „Können Sie ein Angebot machen?" — Dein Team schreibt das auf einen Zettel.',
      'Drei Tage später: Zettel weg. Anfrage vergessen. Der Kunde hat inzwischen jemand anderen beauftragt.',
    ],
    loss: '€2.000–€4.000',
    lossLabel: 'pro Monat durch vergessene Angebote',
    solution: 'Alle Anfragen zentral sichtbar. Follow-ups automatisiert. Nichts wird vergessen.',
  },
]

const totals = [
  { label: 'Verpasste Anfragen', value: '€3.000–€5.000/Monat' },
  { label: 'Koordinations-Overhead', value: '€1.400/Monat' },
  { label: 'Vergessene Follow-Ups', value: '€2.000–€4.000/Monat' },
]

export function CostSection() {
  return (
    <section
      className="section-y"
      style={{ background: 'var(--color-bg-1)' }}
      aria-labelledby="cost-heading"
    >
      <Container>

        <AnimateIn>
          <div className="mb-12">
            <span className="accent-line" />
            <p className="text-label mb-4">Der Preis des Nichtstuns</p>
            <h2
              id="cost-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.875rem, 3.5vw, 3.25rem)',
                fontWeight: 700,
                color: 'var(--color-text)',
                letterSpacing: '-0.03em',
                lineHeight: 1.03,
                maxWidth: '36rem',
                marginBottom: '1rem',
              }}
            >
              Was kostet dich das System-Fehlen — jeden Tag?
            </h2>
            <p style={{ color: 'var(--color-text-2)', fontSize: '1rem', maxWidth: '32rem' }}>
              Drei Szenarien. Alle davon passieren gerade in Betrieben wie deinem.
            </p>
          </div>
        </AnimateIn>

        {/* Szenarien */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-12">
          {scenarios.map((sc, i) => (
            <AnimateIn key={sc.index} delay={i * 80}>
              <div
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
                <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--color-blue)', letterSpacing: '0.1em' }}>
                    {sc.index}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.02em', marginTop: '0.375rem' }}>
                    {sc.title}
                  </h3>
                </div>

                <div style={{ padding: '1.25rem 1.5rem', flex: 1 }}>
                  {sc.story.map((line, j) => (
                    <p
                      key={j}
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-text-2)',
                        lineHeight: 1.65,
                        marginBottom: j < sc.story.length - 1 ? '0.75rem' : 0,
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', background: 'rgba(239,68,68,0.04)' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#EF4444', letterSpacing: '-0.025em' }}>
                    {sc.loss}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                    {sc.lossLabel}
                  </p>
                </div>

                <div style={{ padding: '1rem 1.5rem', background: 'rgba(37,99,235,0.04)' }}>
                  <p style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Mit GXC System:
                  </p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-2)', lineHeight: 1.6 }}>
                    {sc.solution}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Gesamtrechnung */}
        <AnimateIn delay={200}>
          <div style={{ background: 'var(--color-bg-2)', border: '1px solid var(--color-border-2)', borderRadius: '4px', padding: '2rem 2.5rem' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-text-3)', marginBottom: '1rem' }}>
                  Die Gesamtrechnung — konservativ kalkuliert
                </p>
                {totals.map((t) => (
                  <div key={t.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-2)' }}>{t.label}</span>
                    <span style={{ fontSize: '0.875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text)', fontWeight: 600 }}>{t.value}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.875rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)' }}>Gesamt</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: '#EF4444', letterSpacing: '-0.02em' }}>
                    €6.400–€10.400/Monat
                  </span>
                </div>
              </div>

              <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '2rem' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-2)', lineHeight: 1.7, marginBottom: '1rem' }}>
                  Das Professional-Paket kostet einmalig{' '}
                  <strong style={{ color: 'var(--color-text)' }}>€2.990</strong>. Es zahlt sich nach{' '}
                  <strong style={{ color: 'var(--color-text)' }}>2–4 Wochen</strong> selbst.
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', fontWeight: 600, marginBottom: '1.5rem' }}>
                  Danach? Das Geld ist deins.
                </p>
                <a href="#kontakt" className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.8rem 1.5rem' }}>
                  System kennenlernen →
                </a>
              </div>
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
