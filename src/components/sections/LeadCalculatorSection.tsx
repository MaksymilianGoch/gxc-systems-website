'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

function formatEuro(v: number) {
  return new Intl.NumberFormat('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(v))
}

export function LeadCalculatorSection() {
  const [anfragen, setAnfragen] = useState(8)
  const [auftragswert, setAuftragswert] = useState(800)

  const jaehrlich = anfragen * auftragswert * 0.2 * 52
  const rueckgewinnbar = jaehrlich * 0.65

  return (
    <section id="rechner" className="section-y" style={{ background: 'var(--color-bg-1)' }}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Sliders */}
          <AnimateIn direction="left">
            <div>
              <span className="accent-line" />
              <p className="text-label mb-3">Modellrechnung</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                Was kostet dich das fehlende System?
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-2)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                Berechne deinen jährlichen Umsatzverlust. Die Werte basieren auf deinen Eingaben — eine Orientierung für deinen Betrieb.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)' }}>Verpasste Anfragen / Woche</label>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-blue)', fontFamily: 'var(--font-mono)' }}>{anfragen}</span>
                  </div>
                  <input type="range" min={1} max={50} value={anfragen} onChange={(e) => setAnfragen(Number(e.target.value))}
                    style={{ width: '100%', height: '6px', appearance: 'none', background: `linear-gradient(to right, var(--color-blue) ${(anfragen/50)*100}%, var(--color-border-2) ${(anfragen/50)*100}%)`, borderRadius: 'var(--radius-full)', outline: 'none', cursor: 'pointer' }} />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)' }}>Ø Auftragswert</label>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-blue)', fontFamily: 'var(--font-mono)' }}>€ {formatEuro(auftragswert)}</span>
                  </div>
                  <input type="range" min={100} max={5000} step={50} value={auftragswert} onChange={(e) => setAuftragswert(Number(e.target.value))}
                    style={{ width: '100%', height: '6px', appearance: 'none', background: `linear-gradient(to right, var(--color-blue) ${((auftragswert-100)/4900)*100}%, var(--color-border-2) ${((auftragswert-100)/4900)*100}%)`, borderRadius: 'var(--radius-full)', outline: 'none', cursor: 'pointer' }} />
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Right: Dark navy result card */}
          <AnimateIn delay={100} direction="right">
            <div style={{ background: 'var(--color-blue)', borderRadius: 'var(--radius-2xl)', padding: '2.5rem', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 32px 64px -16px rgba(0,32,69,0.35)' }}>
              {/* Decorative orb */}
              <div style={{ position: 'absolute', top: '-3rem', right: '-3rem', width: '12rem', height: '12rem', borderRadius: '50%', background: 'rgba(110,171,140,0.08)', filter: 'blur(40px)', pointerEvents: 'none' }} aria-hidden="true" />

              <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-blue-light)', marginBottom: '1rem' }}>
                Geschätzter Jahresverlust
              </p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.5rem' }}
                aria-live="polite">
                € {formatEuro(jaehrlich)}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-blue-light)', marginBottom: '2rem' }}>Pro Jahr entgangener Umsatz (Modellrechnung)</p>

              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-xl)', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.75rem' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-green)', marginBottom: '0.375rem' }}>
                  Davon strukturierbar mit GXC
                </p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: '0.375rem' }}
                  aria-live="polite">
                  € {formatEuro(rueckgewinnbar)}
                </div>
                <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
                  Grundlage: 65% der verpassten Anfragen strukturierbar
                </p>
              </div>

              <a href="#kontakt" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'white', color: 'var(--color-blue)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', padding: '1rem', borderRadius: 'var(--radius-xl)', transition: 'background 0.15s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-amber-container)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; }}>
                System besprechen
              </a>
            </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  )
}
