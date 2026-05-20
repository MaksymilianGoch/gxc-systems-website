'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

function formatEuro(v: number) {
  return new Intl.NumberFormat('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(v))
}

function Slider({
  label, value, min, max, step = 1, unit = '', prefix = false,
  onChange,
}: {
  label: string; value: number; min: number; max: number; step?: number
  unit?: string; prefix?: boolean; onChange: (v: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100
  const display = prefix ? `${unit} ${formatEuro(value)}` : `${value}${unit ? ' ' + unit : ''}`

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text)' }}>{label}</label>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-blue)' }}>{display}</span>
      </div>
      {/* Custom slider track */}
      <div style={{ position: 'relative', height: 8, borderRadius: 'var(--radius-full)', background: 'var(--color-bg-3)', cursor: 'pointer' }}>
        {/* Filled portion */}
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: 'var(--color-blue)', borderRadius: 'var(--radius-full)', transition: 'width 0.05s ease', pointerEvents: 'none' }} />
        {/* Thumb dot */}
        <div style={{ position: 'absolute', top: '50%', left: `${pct}%`, transform: 'translate(-50%, -50%)', width: 20, height: 20, borderRadius: '50%', background: 'var(--color-blue)', border: '3px solid white', boxShadow: '0 2px 8px rgba(0,32,69,0.3)', pointerEvents: 'none', transition: 'left 0.05s ease' }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', margin: 0, padding: 0 }}
          aria-label={label}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.375rem' }}>
        <span style={{ fontSize: '0.65rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)' }}>{prefix ? `${unit} ${min}` : `${min}${unit ? ' ' + unit : ''}`}</span>
        <span style={{ fontSize: '0.65rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)' }}>{prefix ? `${unit} ${max}` : `${max}${unit ? ' ' + unit : ''}`}</span>
      </div>
    </div>
  )
}

export function LeadCalculatorSection() {
  const [anfragen, setAnfragen] = useState(8)
  const [auftragswert, setAuftragswert] = useState(800)
  const [abschluss, setAbschluss] = useState(20)

  const jaehrlich = anfragen * auftragswert * (abschluss / 100) * 52
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
                Stelle deine Werte ein — sieh in Echtzeit, was du pro Jahr verlierst.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <Slider label="Verpasste Anfragen / Woche" value={anfragen} min={1} max={50} onChange={setAnfragen} />
                <Slider label="Ø Auftragswert" value={auftragswert} min={100} max={5000} step={50} unit="€" prefix onChange={setAuftragswert} />
                <Slider label="Abschlussrate ohne System" value={abschluss} min={5} max={80} unit="%" onChange={setAbschluss} />
              </div>

              <div style={{ marginTop: '2rem', padding: '1rem 1.25rem', background: 'rgba(0,32,69,0.04)', border: '1px solid rgba(0,32,69,0.1)', borderRadius: 'var(--radius-lg)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-3)', lineHeight: 1.6 }}>
                  Modellrechnung auf Basis deiner Eingaben. Tatsächliche Ergebnisse hängen von Betrieb, Branche und Ausgangssituation ab.
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Right: Result */}
          <AnimateIn delay={100} direction="right">
            <div style={{ background: 'var(--color-blue)', borderRadius: 'var(--radius-2xl)', padding: '2.5rem', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 32px 64px -16px rgba(0,32,69,0.35)' }}>
              <div style={{ position: 'absolute', top: '-3rem', right: '-3rem', width: '14rem', height: '14rem', borderRadius: '50%', background: 'rgba(110,171,140,0.08)', filter: 'blur(40px)', pointerEvents: 'none' }} aria-hidden="true" />

              <p style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(112,137,179,1)', marginBottom: '0.875rem' }}>
                Geschätzter Jahresverlust
              </p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.5rem' }} aria-live="polite">
                € {formatEuro(jaehrlich)}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'rgba(112,137,179,1)', marginBottom: '2rem' }}>Pro Jahr entgangener Umsatz</p>

              <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 'var(--radius-xl)', padding: '1.25rem 1.5rem', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem' }}>
                <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7ec4a0', marginBottom: '0.375rem' }}>
                  Davon strukturierbar mit GXC
                </p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.025em', color: '#7ec4a0', marginBottom: '0.25rem' }} aria-live="polite">
                  € {formatEuro(rueckgewinnbar)}
                </div>
                <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>
                  Geschätzter Richtwert: 65% der verpassten Anfragen strukturierbar
                </p>
              </div>

              {/* Breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                {[
                  { l: 'Anfragen/Wo.', v: anfragen },
                  { l: 'Auftragswert', v: `€ ${formatEuro(auftragswert)}` },
                  { l: 'Abschlussrate', v: `${abschluss}%` },
                ].map(({ l, v }) => (
                  <div key={l} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-lg)', padding: '0.625rem', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>{l}</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>{v}</p>
                  </div>
                ))}
              </div>

              <a href="#kontakt" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'white', color: 'var(--color-blue)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', padding: '1rem', borderRadius: 'var(--radius-xl)', transition: 'transform 0.15s ease', textDecoration: 'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}>
                System besprechen
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward</span>
              </a>
            </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  )
}
