import { AnimateIn } from '@/components/ui/AnimateIn'

// ── Status badge ──────────────────────────────────────────────────────────
function Badge({ label, state }: { label: string; state: 'done' | 'active' | 'pending' }) {
  const c = {
    done:    { bg: 'rgba(110,171,140,0.10)', border: 'rgba(110,171,140,0.28)', text: 'var(--color-green)' },
    active:  { bg: 'rgba(0,32,69,0.07)',     border: 'rgba(0,32,69,0.18)',     text: 'var(--color-blue)' },
    pending: { bg: 'rgba(116,90,37,0.08)',   border: 'rgba(116,90,37,0.22)',   text: 'var(--color-amber)' },
  }[state]
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.28rem', padding: '0.18rem 0.5rem', background: c.bg, border: `1px solid ${c.border}`, borderRadius: '100px', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: c.text, letterSpacing: '0.04em', whiteSpace: 'nowrap', flexShrink: 0 }}>
      <span style={{ width: 4, height: 4, borderRadius: '50%', background: c.text, display: 'inline-block' }} aria-hidden="true" />
      {label}
    </span>
  )
}

// ── Operations Desk — 3-column unified window ─────────────────────────────
function OperationsDesk() {
  return (
    <div
      aria-label="GXC Operations Desk"
      style={{
        background: 'var(--color-bg-1)',
        border: '1px solid rgba(196,198,207,0.4)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 32px 64px -16px rgba(0,32,69,0.14), 0 4px 16px rgba(0,32,69,0.06)',
        width: '100%',
        maxWidth: '600px',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* ── Window chrome (navy) ────────────────────────── */}
      <div style={{ background: 'var(--color-blue)', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <div style={{ display: 'flex', gap: '0.3rem' }} aria-hidden="true">
            {['#E57373','#FFA726','#66BB6A'].map((c) => (
              <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, display: 'block' }} />
            ))}
          </div>
          <span style={{ color: 'white', fontFamily: 'var(--font-mono)', fontSize: '0.63rem', fontWeight: 600, letterSpacing: '0.08em' }}>GXC Operations</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-green)', display: 'inline-block' }} aria-hidden="true" />
          <span style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.1em' }}>SYSTEM AKTIV</span>
        </div>
      </div>

      {/* ── 3-column body ───────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 140px', minHeight: '300px' }}>

        {/* Col 1: Inbox ────────────────────────────────── */}
        <div style={{ borderRight: '1px solid var(--color-border)', background: 'var(--color-bg-2)' }}>
          <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-3)' }}>Eingang</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', padding: '0.06rem 0.35rem', background: 'var(--color-blue)', color: 'white', borderRadius: '100px' }}>2</span>
          </div>
          {/* Selected lead */}
          <div style={{ padding: '0.625rem 0.75rem', borderBottom: '1px solid var(--color-border)', background: 'rgba(0,32,69,0.04)', borderLeft: '2px solid var(--color-blue)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.2rem' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-green)', display: 'inline-block', flexShrink: 0 }} aria-hidden="true" />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>Thomas M.</span>
            </div>
            <p style={{ fontSize: '0.65rem', color: 'var(--color-text-3)', marginBottom: '0.2rem' }}>Elektrobetrieb</p>
            <span style={{ fontSize: '0.58rem', padding: '0.1rem 0.35rem', background: 'rgba(186,26,26,0.08)', border: '1px solid rgba(186,26,26,0.2)', borderRadius: '100px', color: 'var(--color-red)', fontFamily: 'var(--font-mono)' }}>Hoch</span>
          </div>
          {/* Second lead */}
          <div style={{ padding: '0.625rem 0.75rem', opacity: 0.55 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.2rem' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-text-3)', display: 'inline-block', flexShrink: 0 }} aria-hidden="true" />
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-2)' }}>Sarah L.</span>
            </div>
            <p style={{ fontSize: '0.65rem', color: 'var(--color-text-3)', marginBottom: '0.2rem' }}>Sanitär</p>
            <span style={{ fontSize: '0.58rem', color: 'var(--color-green)', fontFamily: 'var(--font-mono)' }}>Verarbeitet ✓</span>
          </div>
        </div>

        {/* Col 2: Lead Detail ──────────────────────────── */}
        <div style={{ borderRight: '1px solid var(--color-border)' }}>
          {/* Header */}
          <div style={{ padding: '0.5rem 0.875rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-3)' }}>Lead Detail</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', color: 'var(--color-border-3)' }}>#00847</span>
          </div>
          {/* Contact */}
          <div style={{ padding: '0.625rem 0.875rem', borderBottom: '1px solid var(--color-border)' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.01em', marginBottom: '0.125rem' }}>Thomas M.</p>
            <p style={{ fontSize: '0.68rem', color: 'var(--color-text-3)', marginBottom: '0.375rem' }}>Elektrobetrieb Feldkirch</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--color-text-2)', lineHeight: 1.45, fontStyle: 'italic' }}>
              &bdquo;Brauche kurzfristig Unterstützung — möglichst diese Woche.&ldquo;
            </p>
          </div>
          {/* Status badges */}
          <div style={{ padding: '0.5rem 0.875rem', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
              <Badge label="Erfasst" state="done" />
              <Badge label="Priorisiert" state="done" />
              <Badge label="Team info." state="done" />
              <Badge label="Follow-up" state="pending" />
            </div>
          </div>
          {/* Metrics */}
          <div style={{ padding: '0.5rem 0.875rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <div style={{ padding: '0.375rem', background: 'rgba(110,171,140,0.06)', border: '1px solid rgba(110,171,140,0.2)', borderRadius: '6px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.08em', color: 'var(--color-green)', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Reaktion</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text)' }}>2 Min.</p>
            </div>
            <div style={{ padding: '0.375rem', background: 'rgba(0,32,69,0.05)', border: '1px solid rgba(0,32,69,0.12)', borderRadius: '6px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.08em', color: 'var(--color-blue)', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Termin</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text)' }}>Mo 09:00</p>
            </div>
          </div>
        </div>

        {/* Col 3: Automation Status ────────────────────── */}
        <div style={{ background: 'var(--color-bg-2)' }}>
          <div style={{ padding: '0.5rem 0.625rem', borderBottom: '1px solid var(--color-border)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-3)' }}>Automation</span>
          </div>
          <div style={{ padding: '0.5rem 0.625rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {[
              { label: 'Lead erfasst', done: true },
              { label: 'Priorität OK', done: true },
              { label: 'CRM erstellt', done: true },
              { label: 'Team info.', done: true },
              { label: 'Follow-up', done: false },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: item.done ? 'rgba(110,171,140,0.12)' : 'transparent', border: `1.5px solid ${item.done ? 'var(--color-green)' : 'var(--color-border-2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">
                  {item.done && <svg width="7" height="7" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="var(--color-green)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </span>
                <span style={{ fontSize: '0.62rem', color: item.done ? 'var(--color-text-2)' : 'var(--color-text-3)' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Metrics bar ─────────────────────────────────── */}
      <div style={{ padding: '0.5rem 0.875rem', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-2)', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', color: 'var(--color-text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>Dieser Monat</span>
        {[{ n: '23', label: 'Anfragen' },{ n: '18', label: 'Termine' },{ n: '14', label: 'Aufträge' }].map(({ n, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-blue)', letterSpacing: '-0.02em' }}>{n}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', color: 'var(--color-text-3)' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section
      className="bg-mesh"
      style={{
        paddingTop: 'clamp(5rem, 10vw, 8rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        overflow: 'hidden',
      }}
      aria-label="GXC Systems"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">

          {/* Left — 5 cols ────────────────────────────── */}
          <div className="lg:col-span-5">
            <AnimateIn delay={0}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', background: 'rgba(110,171,140,0.1)', border: '1px solid rgba(110,171,140,0.25)', borderRadius: '100px', marginBottom: '2rem' }}>
                <span className="live-dot" style={{ width: 6, height: 6 }} aria-hidden="true" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, color: 'var(--color-green)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  System Aktiv: Q3 2026
                </span>
              </div>
            </AnimateIn>

            <AnimateIn delay={60}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.04em', color: 'var(--color-text)', marginBottom: '1.25rem' }}>
                Aus Anfragen<br />
                werden Aufträge.
                <br />
                <span style={{ color: 'var(--color-blue)' }}>Aus Chaos<br />wird ein System.</span>
              </h1>
            </AnimateIn>

            <AnimateIn delay={130}>
              <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--color-text-2)', marginBottom: '2rem' }}>
                GXC Systems baut Websites, Anfrage-Widgets, CRM-Workflows und Automationen für Betriebe, die schneller reagieren und Anfragen strukturiert in Termine und Aufträge verwandeln wollen.
              </p>
            </AnimateIn>

            <AnimateIn delay={200}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '1.75rem' }}>
                <a href="#kontakt" className="btn-primary" style={{ fontSize: '0.9rem' }}>
                  System-Demo anfragen
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>arrow_forward</span>
                </a>
                <a href="#ablauf" className="btn-secondary" style={{ fontSize: '0.875rem' }}>
                  Ablauf ansehen
                </a>
              </div>
            </AnimateIn>

            <AnimateIn delay={250}>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-3)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="6.5" stroke="var(--color-border-2)" />
                  <path d="M4 7l2 2 4-4" stroke="var(--color-green)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Für Handwerk, Dienstleister und lokale Betriebe im Dreiländereck.
              </p>
            </AnimateIn>
          </div>

          {/* Right — 7 cols ────────────────────────────── */}
          <div className="lg:col-span-7">
            <AnimateIn delay={100} direction="right">
              <OperationsDesk />
            </AnimateIn>
          </div>

        </div>
      </div>
    </section>
  )
}
