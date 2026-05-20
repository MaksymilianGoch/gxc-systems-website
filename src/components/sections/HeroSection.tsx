'use client'

import dynamic from 'next/dynamic'
import { AnimateIn } from '@/components/ui/AnimateIn'

const HeroCanvasDynamic = dynamic(
  () => import('@/components/3d/HeroCanvas').then((m) => ({ default: m.HeroCanvasDynamic })),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
)

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
      aria-label="GXC Systems — Operative Betriebssysteme für KMU"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.4,
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left — 6 cols */}
          <div className="lg:col-span-6 xl:col-span-5">

            {/* Eyebrow */}
            <AnimateIn delay={0}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                <span className="live-dot" aria-hidden="true" />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-3)',
                  }}
                >
                  Operative Systeme für KMU im Dreiländereck
                </span>
              </div>
            </AnimateIn>

            {/* Headline */}
            <AnimateIn delay={60}>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                  fontWeight: 700,
                  lineHeight: 1.0,
                  letterSpacing: '-0.04em',
                  color: 'var(--color-text)',
                  marginBottom: '1.5rem',
                }}
              >
                Aus Website-Besuchern
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  strukturierte Aufträge
                </span>
                <br />
                — automatisch.
              </h1>
            </AnimateIn>

            {/* Subtext */}
            <AnimateIn delay={130}>
              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text-2)',
                  maxWidth: '34rem',
                  marginBottom: '0.75rem',
                }}
              >
                Nicht Automation für Techniker. Sondern das System, das dein Betrieb braucht.
              </p>
              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: 'var(--color-text-3)',
                  maxWidth: '32rem',
                  marginBottom: '2rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Website → Widget → CRM → Automation → Follow-up → Auftrag.
              </p>
            </AnimateIn>

            {/* Trust line — BEFORE CTAs */}
            <AnimateIn delay={180}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  padding: '0.625rem 1rem',
                  background: 'var(--color-bg-2)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  marginBottom: '1.75rem',
                  flexWrap: 'wrap',
                  rowGap: '0.5rem',
                }}
              >
                {['Kostenlos', 'Kein Pitch', '30 Minuten'].map((item, i) => (
                  <span
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.78rem',
                      color: 'var(--color-text-2)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {i > 0 && (
                      <span style={{ color: 'var(--color-border-3)', marginRight: '0.5rem' }}>·</span>
                    )}
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6l3 3 5-5" stroke="var(--color-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>
            </AnimateIn>

            {/* CTAs */}
            <AnimateIn delay={240}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#kontakt"
                  className="btn-primary"
                  style={{ fontSize: '0.9rem', padding: '0.95rem 1.75rem' }}
                >
                  Systemgespräch buchen
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="#wie-es-funktioniert"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.875rem',
                    color: 'var(--color-text-3)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    padding: '0.95rem 0.25rem',
                    transition: 'color 0.15s ease',
                  }}
                >
                  So funktioniert es →
                </a>
              </div>
            </AnimateIn>
          </div>

          {/* Right — 3D canvas */}
          <div
            className="hidden lg:block lg:col-span-6 xl:col-span-7"
            style={{ height: 'clamp(380px, 52vw, 560px)' }}
            aria-hidden="true"
          >
            <HeroCanvasDynamic />
          </div>
        </div>

        {/* Bottom stats */}
        <AnimateIn delay={320}>
          <div
            className="mt-16 pt-8 grid grid-cols-3 gap-8"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            {[
              { value: '< 2 Min.', label: 'Reaktionszeit auf Anfragen' },
              { value: '10+ Std.', label: 'Admin-Ersparnis pro Woche' },
              { value: '0', label: 'Verpasste Anfragen' },
            ].map((k) => (
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
