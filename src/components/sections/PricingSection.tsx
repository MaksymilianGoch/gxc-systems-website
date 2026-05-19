import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

const pakete = [
  {
    id: 'starter',
    index: '01',
    name: 'Starter',
    preis: '1.490',
    zeitraum: 'einmalig',
    hinweis: null,
    retainer: null,
    zusammenfassung: 'Die zwei entscheidenden Bausteine für Betriebe, die mit Systemdenken anfangen wollen.',
    leistungen: [
      'Lead-Erfassung (Formular → CRM → Benachrichtigung)',
      'Terminbuchungssystem mit automatischen Erinnerungen',
      'Einfaches Airtable-CRM-Setup',
      'Einführung und Übergabedokumentation',
      '30 Tage Anpassungsphase nach Go-Live',
    ],
    cta: 'Starter anfragen',
    hervorgehoben: false,
  },
  {
    id: 'professional',
    index: '02',
    name: 'Professional',
    preis: '2.990',
    zeitraum: 'einmalig',
    hinweis: 'Meistgewählt',
    retainer: '+ 249 €/Monat',
    zusammenfassung: 'Das vollständige System für Betriebe, die professionell wachsen wollen.',
    leistungen: [
      'Alles aus Starter',
      'Professionelle Conversion-Landingpage',
      'Google Business Profil vollständig aufgebaut',
      'Lokale SEO-Optimierung für Ihr Einzugsgebiet',
      'Kommunikations-Modul (Follow-up-Automatisierung)',
      'Angebots-Erinnerung (Tag 3 und 7 automatisch)',
      'Monatliches Leistungs-Reporting',
    ],
    cta: 'Professional anfragen',
    hervorgehoben: true,
  },
  {
    id: 'vollsystem',
    index: '03',
    name: 'Vollsystem',
    preis: '4.490',
    zeitraum: 'einmalig',
    hinweis: 'Enterprise',
    retainer: '+ 399 €/Monat',
    zusammenfassung: 'Das komplette operative System inklusive KI-Sprachagent und Priority-Support.',
    leistungen: [
      'Alles aus Professional',
      'KI-Sprachagent (Anrufannahme rund um die Uhr)',
      'Komplexe E-Mail-Klassifizierung mit KI',
      'Priority Support (Reaktion unter 2 Stunden)',
      'Vierteljährliches Strategie-Review',
    ],
    cta: 'Vollsystem anfragen',
    hervorgehoben: false,
  },
]

export function PricingSection() {
  return (
    <section
      id="preise"
      className="section-y"
      style={{ background: 'var(--color-bg-1)' }}
      aria-labelledby="preise-heading"
    >
      <Container>

        <AnimateIn>
          <div className="mb-14">
            <span className="accent-line" />
            <p className="text-label mb-4">Investition</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2
                id="preise-heading"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 3.5vw, 3.25rem)',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  letterSpacing: '-0.028em',
                  lineHeight: 1.05,
                }}
              >
                Transparent. Einmalig.
                <br />
                Ohne Überraschungen.
              </h2>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text-3)',
                  maxWidth: '26rem',
                }}
              >
                Bei einem durchschnittlichen Auftragswert von 800 € entgehen Ihnen monatlich 1.600–2.400 €. Das Starter-Paket amortisiert sich nach Auftrag Nummer zwei.
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* Drei gleich große Karten */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3"
          style={{ border: '1px solid var(--color-border)', alignItems: 'stretch' }}
        >
          {pakete.map((paket, i) => (
            <AnimateIn key={paket.id} delay={i * 70}>
              <div
                className="flex flex-col h-full"
                style={{
                  background: paket.hervorgehoben ? 'var(--color-bg-3)' : 'var(--color-bg-2)',
                  position: 'relative',
                  borderRight: i < pakete.length - 1 ? '1px solid var(--color-border)' : 'none',
                  outline: paket.hervorgehoben ? '2px solid var(--color-blue)' : 'none',
                  outlineOffset: '-2px',
                  zIndex: paket.hervorgehoben ? 1 : 0,
                }}
              >
                {paket.hinweis && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-1px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: paket.hervorgehoben ? 'var(--color-blue)' : 'var(--color-cyan)',
                      color: 'white',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.75rem',
                      fontFamily: 'var(--font-mono)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {paket.hinweis}
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1">
                  <span
                    className="block mb-4"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: paket.hervorgehoben ? 'var(--color-text-2)' : 'var(--color-text-3)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {paket.index} — {paket.name}
                  </span>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                          fontWeight: 700,
                          color: 'var(--color-text)',
                          letterSpacing: '-0.03em',
                          lineHeight: 1,
                        }}
                      >
                        {paket.preis} €
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--color-text-3)',
                        marginTop: '0.4rem',
                      }}
                    >
                      {paket.zeitraum}
                      {paket.retainer && (
                        <span style={{ display: 'block', color: paket.hervorgehoben ? 'var(--color-blue-glow)' : 'var(--color-cyan)', marginTop: '0.25rem' }}>
                          {paket.retainer} Betreuung
                        </span>
                      )}
                    </p>
                  </div>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text-2)',
                      lineHeight: 1.65,
                      marginBottom: '1.75rem',
                    }}
                  >
                    {paket.zusammenfassung}
                  </p>

                  <ul className="flex-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '2rem' }}>
                    {paket.leistungen.map((l) => (
                      <li key={l} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            color: paket.hervorgehoben ? 'var(--color-blue-glow)' : 'var(--color-cyan)',
                            marginTop: '0.1rem',
                            flexShrink: 0,
                          }}
                        >
                          →
                        </span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--color-text-2)', lineHeight: 1.55 }}>
                          {l}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#kontakt"
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'center',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.825rem',
                      letterSpacing: '-0.01em',
                      padding: '0.8rem',
                      borderRadius: '3px',
                      border: paket.hervorgehoben ? 'none' : '1px solid var(--color-border-2)',
                      background: paket.hervorgehoben ? 'var(--color-blue)' : 'transparent',
                      color: paket.hervorgehoben ? 'white' : 'var(--color-text)',
                      transition: 'all 0.15s ease',
                      marginTop: 'auto',
                    }}
                  >
                    {paket.cta}
                  </a>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={180}>
          <div
            className="mt-8 flex flex-col sm:flex-row justify-between items-start gap-4 pt-6"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-3)' }}>
              Jedes Paket amortisiert sich nach dem ersten geretteten Auftrag.
              Die Systeme gehören Ihnen — kein Vendor Lock-in.
            </p>
            <a
              href="#kontakt"
              style={{
                fontSize: '0.78rem',
                fontWeight: 500,
                color: 'var(--color-blue)',
                whiteSpace: 'nowrap',
                textDecoration: 'none',
              }}
            >
              Paket im Erstgespräch klären →
            </a>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
