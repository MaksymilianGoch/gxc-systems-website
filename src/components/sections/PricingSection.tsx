import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

const tiers = [
  {
    id: 'starter',
    index: '01',
    name: 'Starter',
    price: '1.490',
    period: 'einmalig',
    note: null,
    monthly: null,
    summary: 'Die zwei entscheidenden Bausteine für Betriebe, die anfangen wollen zu automatisieren.',
    items: [
      'Lead-Engine (Webformular → CRM → Benachrichtigung)',
      'Terminbuchungssystem mit automatischen Erinnerungen',
      'Einfaches Airtable-CRM-Setup',
      'Einführung + Übergabedokumentation',
      '30 Tage Anpassungsphase nach Go-Live',
    ],
    cta: 'Starter anfragen',
    featured: false,
  },
  {
    id: 'professional',
    index: '02',
    name: 'Professional',
    price: '2.990',
    period: 'einmalig',
    note: 'Meistgewählt',
    monthly: '+ 249 €/Monat',
    summary: 'Das vollständige System für Betriebe, die professionell skalieren wollen.',
    items: [
      'Alles aus Starter',
      'Professionelle Conversion-Landingpage',
      'Google Business Profile vollständig aufgebaut',
      'Lokale SEO-Optimierung für Ihr Einzugsgebiet',
      'Kommunikations-Hub (Follow-up-Automatisierung)',
      'Angebots-Reminder (3 + 7 Tage automatisch)',
      'Monatliches Performance-Reporting',
    ],
    cta: 'Professional anfragen',
    featured: true,
  },
  {
    id: 'vollsystem',
    index: '03',
    name: 'Vollsystem',
    price: '4.490',
    period: 'einmalig',
    note: 'Enterprise',
    monthly: '+ 399 €/Monat',
    summary: 'Das komplette Automatisierungssystem inklusive KI-Voice-Agent und Priority-Support.',
    items: [
      'Alles aus Professional',
      'AI Voice Agent (24/7-Anrufannahme)',
      'Komplexe E-Mail-Klassifizierung mit KI',
      'Priority Support (Reaktion < 2 Stunden)',
      'Vierteljährliches Strategie-Review',
    ],
    cta: 'Vollsystem anfragen',
    featured: false,
  },
]

export function PricingSection() {
  return (
    <section
      id="preise"
      className="section-y"
      style={{ background: 'var(--color-cream)' }}
      aria-labelledby="pricing-heading"
    >
      <Container>

        {/* Header */}
        <AnimateIn>
          <div className="mb-14">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-10" style={{ background: 'var(--color-gold)' }} />
              <span className="text-label">Investition</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 id="pricing-heading" className="text-display-sm" style={{ color: 'var(--color-text)' }}>
                Transparent.<br />Einmalig. Ohne Überraschungen.
              </h2>
              <p className="text-sm max-w-xs" style={{ color: 'var(--color-text-soft)' }}>
                Betriebe ohne System verlieren durchschnittlich
                2–3 Aufträge pro Monat.
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* Equal-height 3-column grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-px"
          style={{ background: 'var(--color-line)', alignItems: 'stretch' }}
        >
          {tiers.map((tier, i) => (
            <AnimateIn key={tier.id} delay={i * 80}>
              <div
                className="flex flex-col h-full"
                style={{
                  background: tier.featured ? 'var(--color-navy)' : 'var(--color-surface)',
                  position: 'relative',
                  boxShadow: tier.featured
                    ? '0 0 0 2px var(--color-navy), 0 20px 60px -12px rgba(10,31,68,0.35)'
                    : 'none',
                  zIndex: tier.featured ? 1 : 0,
                }}
              >
                {/* Featured badge */}
                {tier.note && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-1px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: tier.featured ? 'var(--color-gold)' : 'var(--color-teal)',
                      color: tier.featured ? 'var(--color-charcoal)' : 'white',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: '0.22rem 0.75rem',
                      fontFamily: 'var(--font-mono)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {tier.note}
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1">
                  {/* Index */}
                  <span
                    className="block mb-4 text-xs"
                    style={{
                      color: tier.featured ? 'rgba(255,255,255,0.3)' : 'var(--color-text-soft)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {tier.index} — {tier.name}
                  </span>

                  {/* Price */}
                  <div className="mb-6 pb-6" style={{ borderBottom: `1px solid ${tier.featured ? 'rgba(255,255,255,0.1)' : 'var(--color-line)'}` }}>
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                          fontWeight: 700,
                          color: tier.featured ? 'white' : 'var(--color-text)',
                          letterSpacing: '-0.03em',
                          lineHeight: 1,
                        }}
                      >
                        {tier.price} €
                      </span>
                    </div>
                    <p
                      className="text-xs mt-1.5"
                      style={{
                        color: tier.featured ? 'rgba(255,255,255,0.4)' : 'var(--color-text-soft)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {tier.period}
                      {tier.monthly && (
                        <span
                          className="block mt-0.5"
                          style={{ color: tier.featured ? 'rgba(200,164,74,0.8)' : 'var(--color-teal)' }}
                        >
                          {tier.monthly} Betreuung
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Summary */}
                  <p
                    className="text-sm leading-relaxed mb-7"
                    style={{ color: tier.featured ? 'rgba(255,255,255,0.6)' : 'var(--color-text-mid)' }}
                  >
                    {tier.summary}
                  </p>

                  {/* Items — flex-1 so cards stretch equally */}
                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="text-xs shrink-0 mt-0.5"
                          style={{
                            color: tier.featured ? 'rgba(200,164,74,0.8)' : 'var(--color-teal)',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          →
                        </span>
                        <span
                          className="text-xs leading-relaxed"
                          style={{ color: tier.featured ? 'rgba(255,255,255,0.65)' : 'var(--color-text-mid)' }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA — pinned to bottom */}
                  <a
                    href="#kontakt"
                    className={`block w-full text-center text-xs font-semibold tracking-[0.1em] uppercase py-3.5 btn-press mt-auto ${tier.featured ? 'btn-outline-white' : 'btn-outline-dark'}`}
                  >
                    {tier.cta}
                  </a>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={200}>
          <div
            className="mt-8 flex flex-col sm:flex-row justify-between items-start gap-4 pt-6"
            style={{ borderTop: '1px solid var(--color-line)' }}
          >
            <p className="text-xs" style={{ color: 'var(--color-text-soft)' }}>
              Jedes Paket amortisiert sich nach dem ersten geretteten Auftrag.
              Die Systeme gehören Ihnen — kein Vendor-Lock-in.
            </p>
            <a href="#kontakt" className="text-xs font-medium whitespace-nowrap link-teal">
              Paket im Erstgespräch klären →
            </a>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
