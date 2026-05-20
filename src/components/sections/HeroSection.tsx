import { AnimateIn } from '@/components/ui/AnimateIn'

// ── Product Mockup — pure JSX, no images, no 3D ──────────────────────────
function ProductMockup() {
  return (
    <div
      aria-label="GXC System Vorschau"
      style={{
        background: 'var(--color-bg-2)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        fontFamily: 'var(--font-body)',
        maxWidth: '440px',
        width: '100%',
      }}
    >
      {/* ── Incoming inquiry card ──────────────────────────── */}
      <div
        style={{
          background: 'var(--color-bg-1)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '1rem',
          boxShadow: '0 1px 4px rgba(23,59,92,0.06)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--color-green)', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '0.01em' }}>
              Neue Anfrage
            </span>
          </div>
          <span style={{ fontSize: '0.65rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)' }}>14:23</span>
        </div>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.25rem' }}>
          Thomas M. — Elektrobetrieb, Feldkirch
        </p>
        <p style={{ fontSize: '0.78rem', color: 'var(--color-text-2)', lineHeight: 1.5, marginBottom: '0.75rem', fontStyle: 'italic' }}>
          &bdquo;Brauche kurzfristig Unterstützung — möglichst diese Woche.&ldquo;
        </p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.65rem', padding: '0.2rem 0.55rem', background: 'rgba(23,59,92,0.07)', border: '1px solid rgba(23,59,92,0.14)', borderRadius: '3px', color: 'var(--color-blue)', fontFamily: 'var(--font-mono)' }}>
            Termin vorschlagen
          </span>
          <span style={{ fontSize: '0.65rem', padding: '0.2rem 0.55rem', background: 'var(--color-bg-2)', border: '1px solid var(--color-border)', borderRadius: '3px', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)' }}>
            Sofort antworten
          </span>
        </div>
      </div>

      {/* ── Connector arrow ────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '0.75rem' }}>
        <div style={{ width: 1, height: 16, background: 'var(--color-border-2)' }} />
        <span style={{ fontSize: '0.6rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          automatisch verarbeitet
        </span>
      </div>

      {/* ── CRM + Notification row ─────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div
          style={{
            background: 'var(--color-bg-1)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '0.875rem',
            boxShadow: '0 1px 4px rgba(23,59,92,0.06)',
          }}
        >
          <p style={{ fontSize: '0.62rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            CRM
          </p>
          <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.4rem' }}>Thomas M.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.62rem', padding: '0.15rem 0.45rem', background: 'rgba(47,125,90,0.08)', border: '1px solid rgba(47,125,90,0.2)', borderRadius: '2px', color: 'var(--color-green)', fontFamily: 'var(--font-mono)', alignSelf: 'flex-start' }}>
              ● Erfasst
            </span>
            <span style={{ fontSize: '0.62rem', padding: '0.15rem 0.45rem', background: 'rgba(23,59,92,0.06)', border: '1px solid rgba(23,59,92,0.14)', borderRadius: '2px', color: 'var(--color-blue)', fontFamily: 'var(--font-mono)', alignSelf: 'flex-start' }}>
              Priorität: Hoch
            </span>
          </div>
        </div>

        <div
          style={{
            background: 'var(--color-bg-1)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '0.875rem',
            boxShadow: '0 1px 4px rgba(23,59,92,0.06)',
          }}
        >
          <p style={{ fontSize: '0.62rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            Team
          </p>
          <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.3rem' }}>Maks G. — 14:23</p>
          <p style={{ fontSize: '0.72rem', color: 'var(--color-text-2)', lineHeight: 1.45 }}>
            &bdquo;Neue Anfrage — bitte heute noch zurückrufen.&ldquo;
          </p>
        </div>
      </div>

      {/* ── Appointment + Follow-up row ────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div
          style={{
            background: 'var(--color-bg-1)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '0.875rem',
            boxShadow: '0 1px 4px rgba(23,59,92,0.06)',
          }}
        >
          <p style={{ fontSize: '0.62rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Termin
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <div style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem', background: 'rgba(23,59,92,0.07)', border: '1px solid rgba(23,59,92,0.18)', borderRadius: '3px', color: 'var(--color-blue)', fontWeight: 500 }}>
              ✓ Mo 15.01 — 09:00
            </div>
            <div style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem', background: 'var(--color-bg-2)', border: '1px solid var(--color-border)', borderRadius: '3px', color: 'var(--color-text-3)' }}>
              Di 16.01 — 14:00
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'var(--color-bg-1)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '0.875rem',
            boxShadow: '0 1px 4px rgba(23,59,92,0.06)',
          }}
        >
          <p style={{ fontSize: '0.62rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Follow-up
          </p>
          <span style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem', background: 'rgba(198,161,91,0.1)', border: '1px solid rgba(198,161,91,0.25)', borderRadius: '2px', color: 'var(--color-amber)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '0.35rem' }}>
            In 48 Std.
          </span>
          <p style={{ fontSize: '0.7rem', color: 'var(--color-text-3)', lineHeight: 1.4 }}>
            Automatische Erinnerung aktiv
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Hero Section ─────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section
      style={{
        background: 'var(--color-bg)',
        paddingTop: 'clamp(5rem, 10vw, 8rem)',
        paddingBottom: 'clamp(4rem, 8vw, 6rem)',
        overflow: 'hidden',
      }}
      aria-label="GXC Systems — Operative Systeme für KMU"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── Left: Copy ───────────────────────────────── */}
          <div>
            {/* Eyebrow */}
            <AnimateIn delay={0}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.75rem' }}>
                <span className="live-dot" aria-hidden="true" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-3)' }}>
                  Operative Systeme für KMU
                </span>
              </div>
            </AnimateIn>

            {/* H1 */}
            <AnimateIn delay={60}>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: '-0.035em',
                  color: 'var(--color-text)',
                  marginBottom: '1.25rem',
                }}
              >
                Aus Anfragen werden Aufträge.{' '}
                <span style={{ color: 'var(--color-blue)' }}>Aus Chaos wird ein System.</span>
              </h1>
            </AnimateIn>

            {/* Subheadline */}
            <AnimateIn delay={130}>
              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.75,
                  color: 'var(--color-text-2)',
                  maxWidth: '36rem',
                  marginBottom: '1.75rem',
                }}
              >
                GXC Systems baut Websites, Anfrage-Widgets, CRM-Workflows und Automationen
                für Betriebe, die schneller reagieren und Anfragen strukturiert in Termine
                und Aufträge verwandeln wollen.
              </p>
            </AnimateIn>

            {/* Trust line */}
            <AnimateIn delay={190}>
              <p
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--color-text-3)',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="6.5" stroke="var(--color-border-2)" />
                  <path d="M4 7l2 2 4-4" stroke="var(--color-green)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Für Handwerk, Dienstleister und lokale Betriebe im Dreiländereck.
              </p>
            </AnimateIn>

            {/* CTAs */}
            <AnimateIn delay={240}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                <a
                  href="#kontakt"
                  className="btn-primary"
                  style={{ fontSize: '0.9rem', padding: '0.9rem 1.75rem' }}
                >
                  System-Demo anfragen
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="#ablauf"
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-3)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    padding: '0.9rem 0.25rem',
                    transition: 'color 0.15s ease',
                  }}
                >
                  Ablauf ansehen →
                </a>
              </div>
            </AnimateIn>
          </div>

          {/* ── Right: Product mockup ─────────────────────── */}
          <AnimateIn delay={150} direction="right">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingLeft: '0',
              }}
            >
              <ProductMockup />
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  )
}
