'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'var(--color-bg)',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '5rem',
        paddingBottom: '4rem',
      }}
      aria-label="GXC Systems — Operative Systeme für KMU"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.35,
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 w-full relative">

        {/* Eyebrow */}
        <AnimateIn delay={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
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
              Operative Systeme für KMU — Dreiländereck
            </span>
          </div>
        </AnimateIn>

        {/* Headline */}
        <AnimateIn delay={60}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.75rem, 6.5vw, 5.5rem)',
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              color: 'var(--color-text)',
              marginBottom: '1.75rem',
              maxWidth: '18ch',
            }}
          >
            Aus Website-Besuchern
            {' '}
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
            {' '}— automatisch.
          </h1>
        </AnimateIn>

        {/* Subtext + pipeline */}
        <AnimateIn delay={130}>
          <p
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: 'var(--color-text-2)',
              maxWidth: '38rem',
              marginBottom: '0.75rem',
            }}
          >
            Nicht Automation für Techniker. Sondern das System, das dein Betrieb braucht —
            damit keine Anfrage mehr verloren geht.
          </p>
          <p
            style={{
              fontSize: '0.875rem',
              lineHeight: 1.6,
              color: 'var(--color-text-3)',
              maxWidth: '36rem',
              marginBottom: '2.25rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.04em',
            }}
          >
            Website → Widget → CRM → Automation → Follow-up → Auftrag
          </p>
        </AnimateIn>

        {/* Trust line — before CTAs */}
        <AnimateIn delay={190}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.25rem',
              padding: '0.6rem 1rem',
              background: 'var(--color-bg-1)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              rowGap: '0.4rem',
            }}
          >
            {['Kostenlos', 'Kein Pitch', '30 Minuten'].map((item, i) => (
              <span
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.8rem',
                  color: 'var(--color-text-2)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {i > 0 && (
                  <span style={{ color: 'var(--color-border-3)', marginRight: '0.25rem' }}>·</span>
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
          <div className="flex flex-col sm:flex-row gap-3 items-start">
            <a
              href="#kontakt"
              className="btn-primary"
              style={{ fontSize: '0.95rem', padding: '1rem 2rem' }}
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
                fontSize: '0.9rem',
                color: 'var(--color-text-3)',
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                padding: '1rem 0.25rem',
                transition: 'color 0.15s ease',
              }}
            >
              So funktioniert es →
            </a>
          </div>
        </AnimateIn>

        {/* Stats row */}
        <AnimateIn delay={310}>
          <div
            className="mt-16 pt-8 grid grid-cols-3 gap-8"
            style={{ borderTop: '1px solid var(--color-border)', maxWidth: '36rem' }}
          >
            {[
              { value: '< 2 Min.', label: 'Reaktionszeit auf Anfragen' },
              { value: '10+ Std.', label: 'Admin-Ersparnis pro Woche' },
              { value: '0', label: 'Verpasste Anfragen' },
            ].map((k) => (
              <div key={k.value}>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
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
                    fontSize: '0.65rem',
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
