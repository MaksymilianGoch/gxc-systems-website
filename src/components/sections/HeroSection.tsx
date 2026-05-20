import { AnimateIn } from '@/components/ui/AnimateIn'

// ── Badge ─────────────────────────────────────────────────────────────────
function Chip({ label, state }: { label: string; state: 'teal' | 'navy' | 'amber' | 'red' }) {
  return <span className={`chip chip-${state}`}><span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', display: 'inline-block', opacity: 0.8 }} />{label}</span>
}

// ── Operations Desk — full 3-panel unified window ─────────────────────────
function OperationsDesk() {
  return (
    <div
      aria-label="GXC Operations Desk"
      style={{
        background: 'var(--color-bg-1)',
        borderRadius: 'var(--radius-2xl)',
        border: '1px solid rgba(196,198,207,0.35)',
        boxShadow: '0 32px 80px -16px rgba(0,32,69,0.18), 0 8px 24px rgba(0,32,69,0.06)',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '680px',
      }}
    >
      {/* Window chrome */}
      <div style={{ background: 'var(--color-blue)', padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '6px' }} aria-hidden="true">
            {['#E57373','#FFA726','#66BB6A'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
          </div>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em' }}>GXC Operations</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--color-green)', display: 'block' }} />
          <span style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em' }}>SYSTEM AKTIV</span>
        </div>
      </div>

      {/* 3-panel body */}
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 150px' }}>

        {/* Panel 1: Inbox */}
        <div style={{ borderRight: '1px solid var(--color-border)', background: 'var(--color-bg-2)' }}>
          <div style={{ padding: '0.625rem 0.875rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-3)' }}>Eingang</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', padding: '0.1rem 0.45rem', background: 'var(--color-blue)', color: 'white', borderRadius: 'var(--radius-full)' }}>2</span>
          </div>
          {/* Selected lead */}
          <div style={{ padding: '0.75rem 0.875rem', borderBottom: '1px solid var(--color-border)', borderLeft: '3px solid var(--color-blue)', background: 'rgba(0,32,69,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-green)' }} aria-hidden="true" />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>Thomas M.</span>
            </div>
            <p style={{ fontSize: '0.68rem', color: 'var(--color-text-3)', marginBottom: '0.375rem' }}>Elektrobetrieb · Feldkirch</p>
            <Chip label="Hoch" state="red" />
          </div>
          {/* Second lead */}
          <div style={{ padding: '0.75rem 0.875rem', opacity: 0.5 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-text-3)' }} aria-hidden="true" />
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-2)' }}>Sarah L.</span>
            </div>
            <p style={{ fontSize: '0.68rem', color: 'var(--color-text-3)', marginBottom: '0.35rem' }}>Sanitär · Bregenz</p>
            <span style={{ fontSize: '0.65rem', color: 'var(--color-green)', fontFamily: 'var(--font-mono)' }}>Verarbeitet ✓</span>
          </div>
        </div>

        {/* Panel 2: Lead Detail */}
        <div style={{ borderRight: '1px solid var(--color-border)' }}>
          <div style={{ padding: '0.625rem 1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-3)' }}>Lead Detail</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-border-3)' }}>#00847</span>
          </div>
          <div style={{ padding: '0.875rem 1rem', borderBottom: '1px solid var(--color-border)' }}>
            <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.01em', marginBottom: '0.125rem' }}>Thomas M.</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--color-text-3)', marginBottom: '0.5rem' }}>Elektrobetrieb Feldkirch</p>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-2)', lineHeight: 1.5, fontStyle: 'italic' }}>
              &bdquo;Brauche kurzfristig Unterstützung — möglichst diese Woche.&ldquo;
            </p>
          </div>
          <div style={{ padding: '0.625rem 1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            <Chip label="Erfasst" state="teal" />
            <Chip label="Priorisiert" state="teal" />
            <Chip label="Team info." state="teal" />
            <Chip label="Follow-up" state="amber" />
          </div>
          <div style={{ padding: '0.625rem 1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(110,171,140,0.07)', border: '1px solid rgba(110,171,140,0.2)', borderRadius: 'var(--radius-md)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-green)', marginBottom: '0.15rem' }}>Reaktion</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text)' }}>2 Min.</p>
            </div>
            <div style={{ padding: '0.5rem', background: 'rgba(0,32,69,0.05)', border: '1px solid rgba(0,32,69,0.12)', borderRadius: 'var(--radius-md)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-blue)', marginBottom: '0.15rem' }}>Termin</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text)' }}>Mo 09:00</p>
            </div>
          </div>
        </div>

        {/* Panel 3: Automation */}
        <div style={{ background: 'var(--color-bg-2)' }}>
          <div style={{ padding: '0.625rem 0.75rem', borderBottom: '1px solid var(--color-border)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-3)' }}>Automation</span>
          </div>
          <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              ['Lead erfasst', true],
              ['Priorität OK', true],
              ['CRM erstellt', true],
              ['Team info.', true],
              ['Follow-up', false],
            ].map(([label, done]) => (
              <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: done ? 'rgba(110,171,140,0.12)' : 'transparent', border: `1.5px solid ${done ? 'var(--color-green)' : 'var(--color-border-2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {done && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="var(--color-green)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{ fontSize: '0.68rem', color: done ? 'var(--color-text-2)' : 'var(--color-text-3)' }}>{label as string}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics bar */}
      <div style={{ padding: '0.625rem 1.25rem', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-2)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--color-text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', flexShrink: 0 }}>Dieser Monat</span>
        {[{n:'23',l:'Anfragen'},{n:'18',l:'Termine'},{n:'14',l:'Aufträge'}].map(({n,l}) => (
          <div key={l} style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-blue)', letterSpacing: '-0.02em' }}>{n}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--color-text-3)' }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Hero Section ──────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section
      className="bg-mesh"
      style={{
        minHeight: '95vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'clamp(6rem, 11vw, 9rem)',
        paddingBottom: 'clamp(5rem, 9vw, 7rem)',
        overflow: 'hidden',
        position: 'relative',
      }}
      aria-label="GXC Systems"
    >
      {/* Decorative orbs */}
      <div className="orb orb-blue" style={{ width: '45vw', height: '45vw', top: '-15%', left: '-10%', opacity: 0.5 }} aria-hidden="true" />
      <div className="orb orb-teal" style={{ width: '30vw', height: '30vw', top: '10%', right: '-8%', opacity: 0.35 }} aria-hidden="true" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 xl:px-24 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-center">

          {/* Left — 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <AnimateIn delay={0}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.875rem', background: 'rgba(110,171,140,0.1)', border: '1px solid rgba(110,171,140,0.25)', borderRadius: 'var(--radius-full)' }}>
                <span className="live-dot" style={{ width: 7, height: 7 }} aria-hidden="true" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-green)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  System Aktiv · Q3 2026
                </span>
              </div>
            </AnimateIn>

            <AnimateIn delay={60}>
              <h1 className="text-display-hero" style={{ color: 'var(--color-text)' }}>
                Aus Anfragen<br />
                werden{' '}
                <span style={{ color: 'var(--color-blue)', fontStyle: 'italic' }}>Aufträge.</span>
              </h1>
            </AnimateIn>

            <AnimateIn delay={140}>
              <p className="text-body-lg" style={{ maxWidth: '36rem' }}>
                GXC Systems baut Websites, Anfrage-Widgets, CRM-Workflows und Automationen für Betriebe, die schneller reagieren und Anfragen strukturiert in Termine und Aufträge verwandeln wollen.
              </p>
            </AnimateIn>

            <AnimateIn delay={210}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', alignItems: 'center' }}>
                <a href="#kontakt" className="btn-primary">
                  System-Demo anfragen
                  <span className="material-symbols-outlined" style={{ fontSize: '1.15rem' }}>arrow_forward</span>
                </a>
                <a href="#ablauf" className="btn-secondary">
                  Ablauf ansehen
                </a>
              </div>
            </AnimateIn>

            <AnimateIn delay={260}>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-3)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="6.5" stroke="var(--color-border-2)" />
                  <path d="M4 7l2 2 4-4" stroke="var(--color-green)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Für Handwerk, Dienstleister und lokale Betriebe im Dreiländereck.
              </p>
            </AnimateIn>
          </div>

          {/* Right — 7 cols */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <AnimateIn delay={100} direction="right">
              <div className="floating">
                <OperationsDesk />
              </div>
            </AnimateIn>
          </div>

        </div>
      </div>
    </section>
  )
}
