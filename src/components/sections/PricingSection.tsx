'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

const tiers = [
  {
    id: 't1',
    name: 'Starter',
    tagline: 'Dein erstes System, das funktioniert.',
    setupPrice: '1.490 €',
    monthlyBase: null,
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
  },
  {
    id: 't2',
    name: 'Professional',
    tagline: 'Das vollständige System für wachsende Betriebe.',
    setupPrice: '2.990 €',
    monthlyBase: 249,
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
    scarcity: 'Nächster freier Platz: Herbst 2026',
  },
  {
    id: 't3',
    name: 'Vollsystem',
    tagline: 'Maximale Automatisierung für ambitionierte Betriebe.',
    setupPrice: '4.490 €',
    monthlyBase: 399,
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
  },
]

function formatEuro(v: number) {
  return new Intl.NumberFormat('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v)
}

export function PricingSection() {
  const [annual, setAnnual] = useState(false)

  return (
    <section
      id="preise"
      className="section-y"
      style={{ background: 'linear-gradient(135deg, #0d2040 0%, #0f2a50 40%, #122d54 100%)', position: 'relative', overflow: 'hidden' }}
      aria-labelledby="pricing-heading"
    >
      {/* Decorative orbs */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,222,128,0.05) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} aria-hidden="true" />
      <div style={{ position: 'absolute', bottom: '-5%', left: '-8%', width: '35vw', height: '35vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(174,199,245,0.06) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} aria-hidden="true" />

      <style>{`
        .pricing-card {
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease;
        }
        .pricing-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px -12px rgba(0,0,0,0.25);
        }
        .pricing-featured {
          transform: translateY(-6px);
          box-shadow: 0 4px 0 0 #4ade80, 0 20px 64px -12px rgba(0,0,0,0.35);
        }
        .pricing-featured:hover {
          transform: translateY(-10px);
          box-shadow: 0 4px 0 0 #4ade80, 0 28px 72px -12px rgba(0,0,0,0.4);
        }
        .toggle-track {
          transition: background 0.2s ease;
        }
        .toggle-thumb {
          transition: left 0.2s ease;
        }
      `}</style>

      <Container>
        <AnimateIn>
          <div style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 3rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4ade80', display: 'block', marginBottom: '1.25rem' }}>System-Ausbaustufen</span>
            <h2
              id="pricing-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.875rem, 3.5vw, 3rem)',
                fontWeight: 700,
                color: 'white',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                marginBottom: '1rem',
              }}
            >
              Wähle, wie weit dein<br />Anfrage-System ausgebaut wird.
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
              Vom einfachen Erfassungssystem bis zum vollständigen Betriebs-Cockpit.
            </p>
          </div>
        </AnimateIn>

        {/* Billing toggle */}
        <AnimateIn delay={60}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', justifyContent: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: annual ? 400 : 600, color: annual ? 'rgba(255,255,255,0.45)' : 'white', transition: 'all 0.2s ease' }}>Monatlich</span>

            <button
              type="button"
              onClick={() => setAnnual((p) => !p)}
              aria-checked={annual}
              role="switch"
              aria-label="Jährliche Abrechnung umschalten"
              className="toggle-track"
              style={{
                width: 52, height: 28, borderRadius: 14,
                background: annual ? '#4ade80' : 'rgba(255,255,255,0.2)',
                border: 'none', cursor: 'pointer', position: 'relative', padding: 0, flexShrink: 0,
              }}
            >
              <div
                className="toggle-thumb"
                style={{
                  position: 'absolute', top: 4,
                  left: annual ? 28 : 4,
                  width: 20, height: 20, borderRadius: '50%', background: 'white',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
                }}
              />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: annual ? 600 : 400, color: annual ? 'white' : 'rgba(255,255,255,0.45)', transition: 'all 0.2s ease' }}>Jährlich</span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700,
                color: '#4ade80', background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)',
                padding: '0.1rem 0.45rem', borderRadius: '4px',
                opacity: annual ? 1 : 0.4, transition: 'opacity 0.2s ease',
              }}>−12%</span>
            </div>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start" style={{ paddingBottom: '0.5rem' }}>
          {tiers.map((tier, i) => {
            const monthlyPrice = tier.monthlyBase
              ? (annual ? Math.round(tier.monthlyBase * 0.88) : tier.monthlyBase)
              : null

            return (
              <AnimateIn key={tier.id} delay={i * 80}>
                <div
                  className={`pricing-card ${tier.featured ? 'pricing-featured' : ''}`}
                  style={{
                    background: 'white',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  {/* Green badge for featured */}
                  {tier.badge && tier.featured && (
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.22rem 0.65rem', background: '#4ade80', borderRadius: '4px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0a1a35', fontWeight: 700 }}>
                        {tier.badge}
                      </span>
                    </div>
                  )}

                  {/* Badge for non-featured */}
                  {tier.badge && !tier.featured && (
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.2rem 0.6rem', background: 'rgba(0,32,69,0.07)', border: '1px solid rgba(0,32,69,0.14)', borderRadius: '4px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-blue)', fontWeight: 700 }}>
                        {tier.badge}
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div style={{ padding: '1.75rem 1.75rem 1.25rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.025em', marginBottom: '0.25rem' }}>
                      {tier.name}
                    </h3>
                    <p style={{ fontSize: '0.825rem', color: 'var(--color-text-2)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                      {tier.tagline}
                    </p>

                    {/* Setup price */}
                    <div style={{ marginBottom: '0.375rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.03em' }}>
                        {tier.setupPrice}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-text-3)', marginLeft: '0.5rem' }}>
                        Anbringungskosten
                      </span>
                    </div>

                    {/* Monthly price */}
                    {monthlyPrice !== null && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: tier.featured ? '#0a7038' : 'var(--color-text-2)', fontWeight: 600 }}>
                          + {formatEuro(monthlyPrice)} € / Monat Betreuung
                        </p>
                        {annual && (
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#16a34a', background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.25)', padding: '0.1rem 0.35rem', borderRadius: '3px' }}>
                            Jährlich
                          </span>
                        )}
                      </div>
                    )}

                    <p style={{ fontSize: '0.72rem', color: 'var(--color-text-3)', fontStyle: 'italic', marginTop: '0.25rem' }}>
                      Für: {tier.for}
                    </p>
                  </div>

                  {/* Divider */}
                  <div style={{ height: '1px', background: 'var(--color-border)', margin: '0 1.75rem' }} />

                  {/* Features */}
                  <div style={{ padding: '1.25rem 1.75rem' }}>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.25rem' }}>
                      {tier.features.map((f) => (
                        <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ marginTop: '0.15rem', flexShrink: 0 }} aria-hidden="true">
                            <path d="M3 8l4 4 6-6" stroke="#4ade80" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span style={{ fontSize: '0.825rem', color: 'var(--color-text-2)', lineHeight: 1.5 }}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* ROI */}
                    <div style={{ padding: '0.75rem', background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.18)', borderRadius: '6px', marginBottom: '1.25rem' }}>
                      <p style={{ fontSize: '0.78rem', color: 'var(--color-green)', lineHeight: 1.55, fontStyle: 'italic' }}>
                        {tier.roi}
                      </p>
                    </div>

                    {/* Scarcity */}
                    {'scarcity' in tier && (tier as typeof tiers[1]).scarcity && (
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#92400e', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                        ⚡ {(tier as typeof tiers[1]).scarcity}
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
                        background: tier.featured ? '#4ade80' : 'transparent',
                        color: tier.featured ? '#0a1a35' : 'var(--color-text)',
                        border: `1px solid ${tier.featured ? 'transparent' : 'var(--color-border-2)'}`,
                        borderRadius: '6px',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        letterSpacing: '-0.01em',
                        transition: 'opacity 0.15s ease, transform 0.15s ease',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}
                    >
                      {tier.cta}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </AnimateIn>
            )
          })}
        </div>

        {/* Bottom note */}
        <AnimateIn delay={200}>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', maxWidth: '36rem', margin: '0 auto' }}>
              Nicht sicher, welches Paket passt? Im Erstgespräch sagen wir dir ehrlich,
              womit du den größten Hebel hast — ohne Übertreibung.
            </p>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
