import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

const tiers = [
  {
    id: 't1',
    name: 'Starter',
    tagline: 'Dein erstes System, das funktioniert.',
    price: '1.490 €',
    priceNote: 'einmalig',
    monthly: null,
    badge: null,
    for: 'Kleiner Betrieb, erster Einstieg, schnelle Wirkung',
    features: [
      'Kontakt-Widget auf deiner Website',
      'CRM-Setup mit Echtdaten',
      'Basis-Automation (Benachrichtigungen)',
      'Terminbuchung automatisiert',
      '30 Tage kostenlose Anpassungen',
      '1x Onboarding-Session (30 Min.)',
    ],
    roi: 'Modellrechnung: Bereits wenige gerettete Anfragen können die Investition ausgleichen.',
    cta: 'Starter anfragen',
    featured: false,
    accentColor: '#5F5B53',
  },
  {
    id: 't2',
    name: 'Professional',
    tagline: 'Das vollständige System für wachsende Betriebe.',
    price: '2.990 €',
    priceNote: 'einmalig',
    monthly: '249 € / Monat Betreuung',
    badge: 'Meistgewählt',
    for: 'Mehrere Mitarbeiter, wachsender Betrieb, maximale Wirkung',
    features: [
      'Alles aus Starter, plus:',
      'Landingpage optimiert für Anfragen',
      'Google Business Profil verbunden',
      'E-Mail + WhatsApp Automation',
      'Follow-up Sequenzen',
      'Monatliches Reporting',
    ],
    roi: 'Modellrechnung auf Basis deiner Anfrage- und Abschlussquote — im Erstgespräch besprechen wir, was realistisch ist.',
    cta: 'Professional anfragen',
    featured: true,
    accentColor: '#173B5C',
    scarcity: 'Nächster freier Platz: Herbst 2026',
  },
  {
    id: 't3',
    name: 'Vollsystem',
    tagline: 'Maximale Automatisierung für ambitionierte Betriebe.',
    price: '4.490 €',
    priceNote: 'einmalig',
    monthly: '399 € / Monat Betreuung',
    badge: 'Premium',
    for: 'Höchste Automatisierung, Voice Agent, Priority Support',
    features: [
      'Alles aus Professional, plus:',
      'Voice Agent (24/7 Telefonbearbeitung)',
      'Erweiterte Workflow-Automatisierung',
      'Priority Support (4h Reaktionszeit)',
      'Quartalsweise Strategie-Review',
      'Unbegrenzte Anpassungen',
    ],
    roi: 'Ersetzt den Bedarf an einer Teilzeitkraft für Admin-Aufgaben.',
    cta: 'Vollsystem anfragen',
    featured: false,
    accentColor: '#102A42',
  },
]

export function PricingSection() {
  return (
    <section
      id="preise"
      className="section-y"
      style={{ background: 'var(--color-bg)' }}
      aria-labelledby="pricing-heading"
    >
      <style>{`
        .pricing-card {
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease;
        }
        .pricing-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px -12px rgba(0,0,0,0.12);
        }
        .pricing-featured {
          transform: translateY(-6px);
          box-shadow: 0 12px 48px -12px rgba(23,59,92,0.22);
        }
        .pricing-featured:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 60px -12px rgba(23,59,92,0.30);
        }
      `}</style>

      <Container>
        <AnimateIn>
          <div style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 3.5rem' }}>
            <span className="accent-line" style={{ margin: '0 auto 1.25rem' }} />
            <p className="text-label mb-4">Transparente Investition</p>
            <h2
              id="pricing-heading"
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
              Zahlt sich nach 2–4 Wochen selbst.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-2)', lineHeight: 1.7 }}>
              Keine versteckten Kosten. Kein Vendor Lock-in. Du kannst jederzeit kündigen.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier, i) => (
            <AnimateIn key={tier.id} delay={i * 80}>
              <div
                className={`pricing-card ${tier.featured ? 'pricing-featured' : ''}`}
                style={{
                  background: tier.featured ? 'var(--color-blue)' : 'var(--color-bg-1)',
                  border: `1px solid ${tier.featured ? 'transparent' : 'var(--color-border)'}`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* Badge */}
                {tier.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      padding: '0.2rem 0.6rem',
                      background: tier.featured ? 'rgba(255,255,255,0.2)' : `${tier.accentColor}14`,
                      border: `1px solid ${tier.featured ? 'rgba(255,255,255,0.3)' : `${tier.accentColor}28`}`,
                      borderRadius: '3px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.58rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: tier.featured ? 'white' : tier.accentColor,
                      }}
                    >
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Header */}
                <div style={{ padding: '1.75rem 1.75rem 1.25rem' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: tier.featured ? 'white' : 'var(--color-text)',
                      letterSpacing: '-0.025em',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {tier.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.825rem',
                      color: tier.featured ? 'rgba(255,255,255,0.75)' : 'var(--color-text-2)',
                      lineHeight: 1.5,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {tier.tagline}
                  </p>

                  {/* Price */}
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                        fontWeight: 700,
                        color: tier.featured ? 'white' : 'var(--color-text)',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {tier.price}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: tier.featured ? 'rgba(255,255,255,0.6)' : 'var(--color-text-3)',
                        marginLeft: '0.5rem',
                      }}
                    >
                      {tier.priceNote}
                    </span>
                  </div>
                  {tier.monthly && (
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: tier.featured ? 'rgba(255,255,255,0.65)' : 'var(--color-text-3)',
                        marginBottom: '0.25rem',
                      }}
                    >
                      + {tier.monthly}
                    </p>
                  )}
                  <p
                    style={{
                      fontSize: '0.72rem',
                      color: tier.featured ? 'rgba(255,255,255,0.55)' : 'var(--color-text-3)',
                      fontStyle: 'italic',
                      marginTop: '0.25rem',
                    }}
                  >
                    Für: {tier.for}
                  </p>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: tier.featured ? 'rgba(255,255,255,0.15)' : 'var(--color-border)', margin: '0 1.75rem' }} />

                {/* Features */}
                <div style={{ padding: '1.25rem 1.75rem' }}>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.25rem' }}>
                    {tier.features.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ marginTop: '0.15rem', flexShrink: 0 }} aria-hidden="true">
                          <path d="M3 8l4 4 6-6" stroke={tier.featured ? 'rgba(255,255,255,0.8)' : 'var(--color-green)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span
                          style={{
                            fontSize: '0.825rem',
                            color: tier.featured ? 'rgba(255,255,255,0.85)' : 'var(--color-text-2)',
                            lineHeight: 1.5,
                          }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* ROI */}
                  <div
                    style={{
                      padding: '0.75rem',
                      background: tier.featured ? 'rgba(255,255,255,0.1)' : 'rgba(16,185,129,0.06)',
                      border: `1px solid ${tier.featured ? 'rgba(255,255,255,0.15)' : 'rgba(16,185,129,0.14)'}`,
                      borderRadius: '4px',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.78rem',
                        color: tier.featured ? 'rgba(255,255,255,0.85)' : 'var(--color-green)',
                        lineHeight: 1.55,
                        fontStyle: 'italic',
                      }}
                    >
                      {tier.roi}
                    </p>
                  </div>

                  {/* Scarcity */}
                  {tier.scarcity && (
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        color: tier.featured ? 'rgba(255,255,255,0.55)' : 'var(--color-amber)',
                        letterSpacing: '0.08em',
                        marginBottom: '1rem',
                      }}
                    >
                      ⚡ {tier.scarcity}
                    </p>
                  )}

                  {/* CTA */}
                  <a
                    href="#kontakt"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.875rem',
                      background: tier.featured ? 'white' : 'transparent',
                      color: tier.featured ? 'var(--color-blue)' : 'var(--color-text)',
                      border: `1px solid ${tier.featured ? 'transparent' : 'var(--color-border-2)'}`,
                      borderRadius: '4px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      letterSpacing: '-0.01em',
                      transition: 'opacity 0.15s ease, border-color 0.15s ease',
                      textAlign: 'center',
                    }}
                  >
                    {tier.cta}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Bottom note */}
        <AnimateIn delay={200}>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-3)', maxWidth: '36rem', margin: '0 auto' }}>
              Nicht sicher, welches Paket passt? Im Erstgespräch sagen wir dir ehrlich,
              womit du den größten Hebel hast — ohne Übertreibung.
            </p>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
