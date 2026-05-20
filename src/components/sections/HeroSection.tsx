'use client'

import dynamic from 'next/dynamic'
import { AnimateIn } from '@/components/ui/AnimateIn'

const HeroCanvasDynamic = dynamic(
  () => import('@/components/3d/HeroCanvas').then((m) => ({ default: m.HeroCanvasDynamic })),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
)

const kennzahlen = [
  { value: '< 5 Min.', label: 'Reaktionszeit auf Anfragen' },
  { value: '0 Lücken', label: 'Bei der Erfassung von Kontakten' },
  { value: '8× ROI', label: 'Typischer System-Rückfluss' },
]

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'var(--color-bg)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '5rem',
        paddingBottom: '4rem',
      }}
      aria-label="GXC Systems — Operative Infrastruktur"
    >
      {/* Raster-Hintergrund */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.25,
        }}
        aria-hidden="true"
      />

      {/* Tiefengradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 60% 50%, rgba(14,30,68,0.55) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* Links: Copy — 6 Spalten */}
          <div className="lg:col-span-6 xl:col-span-5">

            <AnimateIn delay={0}>
              <div className="flex items-center gap-3 mb-8">
                <span className="live-dot" aria-hidden="true" />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-3)',
                  }}
                >
                  GXC Systems · Dreiländereck
                </span>
              </div>
            </AnimateIn>

            <AnimateIn delay={80}>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontWeight: 700,
                  lineHeight: 1.0,
                  letterSpacing: '-0.035em',
                  color: 'var(--color-text)',
                  marginBottom: '1.5rem',
                }}
              >
                Anfrage rein.
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 60%, #1D4ED8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Termin raus.
                </span>
                <br />
                Automatisch.
              </h1>
            </AnimateIn>

            <AnimateIn delay={160}>
              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text-2)',
                  maxWidth: '34rem',
                  marginBottom: '2.5rem',
                }}
              >
                Wir bauen für KMU im Dreiländereck die operative Infrastruktur, die jede Anfrage erfasst, automatisch beantwortet und in einen Termin verwandelt. Auch nachts. Auch am Wochenende. Auch wenn niemand ans Telefon kommt.
              </p>
            </AnimateIn>

            <AnimateIn delay={220}>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a href="#kontakt" className="btn-primary" style={{ fontSize: '0.925rem', padding: '0.95rem 1.75rem' }}>
                  Kostenlose Systemanalyse anfragen
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="#ablauf" className="btn-secondary" style={{ fontSize: '0.925rem', padding: '0.95rem 1.75rem' }}>
                  So funktioniert es
                </a>
              </div>
            </AnimateIn>
          </div>

          {/* Rechts: 3D-Canvas — 6 Spalten */}
          <div
            className="hidden lg:block lg:col-span-6 xl:col-span-7"
            style={{ height: 'clamp(360px, 52vw, 560px)' }}
            aria-hidden="true"
          >
            <HeroCanvasDynamic />
          </div>
        </div>

        {/* Kennzahlen-Leiste */}
        <AnimateIn delay={340}>
          <div
            className="mt-16 pt-8 grid grid-cols-3 gap-8"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            {kennzahlen.map((k) => (
              <div key={k.value} className="text-center">
                <p
                  className="text-stat mb-1"
                  style={{ color: 'var(--color-blue)' }}
                >
                  {k.value}
                </p>
                <p
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--color-text-3)',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {k.label}
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
