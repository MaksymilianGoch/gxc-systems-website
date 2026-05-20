import { AnimateIn } from '@/components/ui/AnimateIn'

export function HeroSection() {
  return (
    <section
      className="bg-mesh"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'clamp(7rem, 12vw, 9rem)',
        paddingBottom: 'clamp(4rem, 7vw, 6rem)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(214,227,255,0.5) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} aria-hidden="true" />
      <div style={{ position: 'absolute', top: '5%', right: '-5%', width: '35vw', height: '35vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(110,171,140,0.18) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} aria-hidden="true" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 xl:px-24 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Copy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <AnimateIn delay={0}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.875rem', background: 'rgba(251,249,248,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(196,198,207,0.35)', borderRadius: 'var(--radius-full)' }}>
                <span className="live-dot" style={{ width: 7, height: 7 }} aria-hidden="true" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  System Aktiv: Q3 2026
                </span>
              </div>
            </AnimateIn>

            <AnimateIn delay={60}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 5.5vw, 4.75rem)', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.04em', color: 'var(--color-text)' }}>
                Aus Anfragen<br />
                werden<br />
                <span style={{ fontStyle: 'italic', color: 'var(--color-blue)' }}>Aufträge.</span>
              </h1>
            </AnimateIn>

            <AnimateIn delay={130}>
              <p style={{ fontSize: '1.125rem', lineHeight: 1.75, color: 'var(--color-text-2)', maxWidth: '32rem' }}>
                GXC baut das System, das Anfragen erfasst, zuordnet, beantwortet und in Termine verwandelt. Für Betriebe, die wachsen — ohne mehr Personal.
              </p>
            </AnimateIn>

            <AnimateIn delay={200}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <a href="#kontakt" className="btn-primary">
                  System-Demo anfragen
                  <span className="material-symbols-outlined" style={{ fontSize: '1.15rem' }}>arrow_forward</span>
                </a>
                <a href="#ablauf" className="btn-secondary">Ablauf ansehen</a>
              </div>
            </AnimateIn>
          </div>

          {/* Right: Floating glass cards */}
          <div style={{ position: 'relative', height: 'clamp(400px, 52vw, 560px)', display: 'none' }} className="lg:block">

            {/* Card 1: Inquiry Inbox — top right */}
            <div
              className="floating"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '380px',
                backdropFilter: 'blur(16px)',
                background: 'rgba(255,255,255,0.88)',
                border: '1px solid rgba(255,255,255,0.5)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: '0 24px 64px -12px rgba(0,32,69,0.15)',
                padding: '1.25rem',
                zIndex: 30,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(196,198,207,0.25)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-blue)', fontSize: '0.875rem' }}>Inquiry Inbox</span>
                <span style={{ background: 'var(--color-blue)', color: 'white', fontSize: '0.65rem', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-mono)' }}>2 Offen</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                <div style={{ background: 'rgba(245,243,243,0.8)', padding: '0.75rem', borderRadius: 'var(--radius-lg)', borderLeft: '3px solid var(--color-green)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text)' }}>Thomas M. · Elektro</span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)' }}>14:23</span>
                  </div>
                  <p style={{ fontSize: '0.72rem', color: 'var(--color-text-3)', fontStyle: 'italic', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    &bdquo;Brauche kurzfristig Unterstützung...&ldquo;
                  </p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.4)', padding: '0.625rem', borderRadius: 'var(--radius-lg)', opacity: 0.65 }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text)' }}>Sarah L. · Sanitär</span>
                  <p style={{ fontSize: '0.72rem', color: 'var(--color-text-3)' }}>Anfrage verarbeitet ✓</p>
                </div>
              </div>
            </div>

            {/* Card 2: Lead detail — bottom left */}
            <div
              style={{
                position: 'absolute',
                bottom: '2rem',
                left: 0,
                width: '420px',
                backdropFilter: 'blur(16px)',
                background: 'rgba(255,255,255,0.88)',
                border: '1px solid rgba(255,255,255,0.5)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: '0 24px 64px -12px rgba(0,32,69,0.18)',
                padding: '1.25rem',
                zIndex: 40,
                animation: 'float 7s ease-in-out 2s infinite',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0 }}>TM</div>
                <div>
                  <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-blue)', letterSpacing: '-0.01em' }}>Thomas M. — Lead #00847</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--color-text-3)' }}>Status: Automatisch verarbeitet</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                <div style={{ background: 'rgba(110,171,140,0.1)', padding: '0.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(110,171,140,0.22)' }}>
                  <p style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-green)', marginBottom: '0.25rem' }}>Antwortzeit</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)' }}>&lt; 30 Sek.</p>
                </div>
                <div style={{ background: 'rgba(0,32,69,0.05)', padding: '0.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(0,32,69,0.1)' }}>
                  <p style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-blue)', marginBottom: '0.25rem' }}>Termin</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)' }}>Mo 09:00 Uhr</p>
                </div>
              </div>
            </div>

            {/* Card 3: Workflow Active — center */}
            <div
              style={{
                position: 'absolute',
                top: '40%',
                left: '22%',
                width: '260px',
                backdropFilter: 'blur(16px)',
                background: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.4)',
                borderTop: '2px solid var(--color-green)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: '0 20px 48px -12px rgba(0,32,69,0.12)',
                padding: '1rem',
                zIndex: 20,
                animation: 'float 8.5s ease-in-out 1s infinite',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--color-green)', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text)' }}>Workflow Aktiv</span>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {['CRM-Eintrag erstellt', 'Team informiert', 'Follow-up bereit'].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--color-text-3)' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-green)', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
