'use client'

import dynamic from 'next/dynamic'
import { AnimateIn } from '@/components/ui/AnimateIn'

const HeroCanvasDynamic = dynamic(
  () => import('@/components/3d/HeroCanvas').then((m) => ({ default: m.HeroCanvasDynamic })),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
)

const kennzahlen = [
  { value: '< 2 Min.', label: 'Reaktionszeit auf Anfragen' },
  { value: '10+ Std.', label: 'Admin-Ersparnis pro Woche' },
  { value: '0', label: 'Verpasste Anfragen' },
]

const checks = [
  'Du bekommst Anfragen über Telefon, E-Mail oder WhatsApp — und merkst, dass einige verloren gehen',
  'Dein Team verbringt zu viel Zeit mit Koordination statt echter Arbeit',
  'Du möchtest, dass dein Betrieb auch nachts und am Wochenende reagiert',
  'Dir fehlt eine klare Übersicht über alle offenen Aufträge',
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
      {/* Raster */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.2,
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Links — 6 Spalten */}
          <div className="lg:col-span-6 xl:col-span-5">

            {/* Headline */}
            <AnimateIn delay={0}>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.25rem, 5vw, 4.25rem)',
                  fontWeight: 700,
                  lineHeight: 0.97,
                  letterSpacing: '-0.04em',
                  color: 'var(--color-text)',
                  marginBottom: '1.75rem',
                }}
              >
                Weniger Anfragen verloren.
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6, #2563EB, #1D4ED8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Schneller reagieren.
                </span>
                <br />
                Klarer organisiert.
              </h1>
            </AnimateIn>

            {/* Subheadline */}
            <AnimateIn delay={100}>
              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text-2)',
                  maxWidth: '34rem',
                  marginBottom: '1rem',
                }}
              >
                Wir bauen das System, das dein Betrieb braucht, um täglich keine Anfrage mehr zu verpassen, in unter 2 Minuten zu reagieren und deine Admin-Arbeit um 10+ Stunden pro Woche zu senken.
              </p>
            </AnimateIn>

            <AnimateIn delay={160}>
              <p
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  marginBottom: '1.75rem',
                }}
              >
                Das ist kein Software-Tool. Das ist deine operative Infrastruktur.
              </p>
            </AnimateIn>

            {/* Selbst-Identifikations-Checklist */}
            <AnimateIn delay={210}>
              <div
                style={{
                  marginBottom: '2.25rem',
                  padding: '1.25rem',
                  background: 'var(--color-bg-1)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                }}
              >
                <p
                  style={{
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-blue)',
                    marginBottom: '0.875rem',
                  }}
                >
                  Das ist für dich, wenn:
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {checks.map((c, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <span
                        style={{
                          color: 'var(--color-blue)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          marginTop: '0.1rem',
                          flexShrink: 0,
                        }}
                      >
                        →
                      </span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--color-text-2)', lineHeight: 1.55 }}>
                        {c}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>

            {/* CTAs */}
            <AnimateIn delay={270}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#kontakt"
                  className="btn-primary"
                  style={{ fontSize: '0.9rem', padding: '0.95rem 1.75rem' }}
                >
                  Kostenloses Erstgespräch buchen
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="#ablauf"
                  className="btn-secondary"
                  style={{ fontSize: '0.9rem', padding: '0.95rem 1.75rem' }}
                >
                  Wie es funktioniert
                </a>
              </div>
            </AnimateIn>
          </div>

          {/* Rechts — 3D */}
          <div
            className="hidden lg:block lg:col-span-6 xl:col-span-7"
            style={{ height: 'clamp(380px, 52vw, 560px)' }}
            aria-hidden="true"
          >
            <HeroCanvasDynamic />
          </div>
        </div>

        {/* Kennzahlen */}
        <AnimateIn delay={350}>
          <div
            className="mt-16 pt-8 grid grid-cols-3 gap-8"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            {kennzahlen.map((k) => (
              <div key={k.value} className="text-center">
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: 'var(--color-blue)',
                    marginBottom: '0.375rem',
                  }}
                >
                  {k.value}
                </p>
                <p
                  style={{
                    fontSize: '0.68rem',
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
