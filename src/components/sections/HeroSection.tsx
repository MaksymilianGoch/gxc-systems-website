import { AnimateIn } from '@/components/ui/AnimateIn'

// ── Status badge ──────────────────────────────────────────────────────────
function Badge({ label, state }: { label: string; state: 'done' | 'active' | 'pending' }) {
  const c = {
    done:    { bg: 'rgba(47,125,90,0.08)',  border: 'rgba(47,125,90,0.22)',  text: 'var(--color-green)', dot: 'var(--color-green)' },
    active:  { bg: 'rgba(23,59,92,0.07)',   border: 'rgba(23,59,92,0.18)',   text: 'var(--color-blue)',  dot: 'var(--color-blue)' },
    pending: { bg: 'rgba(198,161,91,0.08)', border: 'rgba(198,161,91,0.22)', text: 'var(--color-amber)', dot: 'var(--color-amber)' },
  }[state]
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.28rem', padding: '0.16rem 0.45rem', background: c.bg, border: `1px solid ${c.border}`, borderRadius: '3px', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: c.text, letterSpacing: '0.04em', flexShrink: 0, whiteSpace: 'nowrap' }}>
      <span style={{ width: 4, height: 4, borderRadius: '50%', background: c.dot, display: 'inline-block', flexShrink: 0 }} aria-hidden="true" />
      {label}
    </span>
  )
}

// ── Nav rail icon ─────────────────────────────────────────────────────────
function NavIcon({ path, active }: { path: string; active?: boolean }) {
  return (
    <div style={{ width: 32, height: 32, borderRadius: '6px', background: active ? 'rgba(23,59,92,0.10)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--color-blue)' : 'var(--color-text-3)'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
      </svg>
    </div>
  )
}

// ── Operations Desk Preview ───────────────────────────────────────────────
function OperationsDesk() {
  return (
    <div
      aria-label="GXC Operations Desk — Systemvorschau"
      style={{
        background: 'var(--color-bg-1)',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 8px 40px -8px rgba(23,59,92,0.14), 0 2px 8px rgba(23,59,92,0.06)',
        maxWidth: '520px',
        width: '100%',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* ── Window chrome ─────────────────────────────── */}
      <div style={{ background: 'var(--color-bg-2)', borderBottom: '1px solid var(--color-border)', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <div style={{ display: 'flex', gap: '0.3rem' }} aria-hidden="true">
            {['#E8B4B8','#F5CBA7','#A9DFBF'].map((c) => (
              <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, display: 'block' }} />
            ))}
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.63rem', fontWeight: 600, color: 'var(--color-text-2)', letterSpacing: '0.06em' }}>GXC Operations</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-green)', display: 'inline-block' }} aria-hidden="true" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', color: 'var(--color-text-3)', letterSpacing: '0.08em' }}>SYSTEM AKTIV</span>
        </div>
      </div>

      {/* ── App body: nav rail + main panel ───────────── */}
      <div style={{ display: 'flex' }}>

        {/* Left nav rail */}
        <div style={{ width: 44, borderRight: '1px solid var(--color-border)', background: 'rgba(23,59,92,0.02)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', padding: '0.625rem 0' }} aria-hidden="true">
          {/* Inbox — active */}
          <NavIcon path="M22 13V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12c0 1.1.9 2 2 2h8M22 13l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 13" active />
          <NavIcon path="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          <NavIcon path="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
          <div style={{ flex: 1 }} />
          <NavIcon path="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </div>

        {/* Main panel */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Inbox header */}
          <div style={{ background: 'rgba(23,59,92,0.03)', borderBottom: '1px solid var(--color-border)', padding: '0.45rem 0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-3)' }}>Eingang</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', padding: '0.08rem 0.4rem', background: 'var(--color-blue)', color: 'white', borderRadius: '10px' }}>2 offen</span>
          </div>

          {/* Inquiry row */}
          <div style={{ padding: '0.75rem 0.875rem', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.3rem', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-green)', display: 'inline-block', flexShrink: 0 }} aria-hidden="true" />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>Thomas M.</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--color-text-3)' }}>Elektrobetrieb, Feldkirch</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
                <span style={{ fontSize: '0.58rem', padding: '0.1rem 0.38rem', background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.18)', borderRadius: '2px', color: 'var(--color-red)', fontFamily: 'var(--font-mono)' }}>Hoch</span>
                <span style={{ fontSize: '0.58rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)' }}>14:23</span>
              </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-2)', lineHeight: 1.5, marginBottom: '0.5rem', fontStyle: 'italic', paddingLeft: '1rem' }}>
              &bdquo;Brauche kurzfristig Unterstützung — möglichst diese Woche.&ldquo;
            </p>
            <div style={{ display: 'flex', gap: '0.4rem', paddingLeft: '1rem' }}>
              <span style={{ fontSize: '0.62rem', padding: '0.2rem 0.55rem', background: 'var(--color-blue)', color: 'white', borderRadius: '3px', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>Termin vorschlagen ↗</span>
              <span style={{ fontSize: '0.62rem', padding: '0.2rem 0.55rem', background: 'var(--color-bg-2)', border: '1px solid var(--color-border)', borderRadius: '3px', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)' }}>Antworten</span>
            </div>
          </div>

          {/* Processing indicator */}
          <div style={{ padding: '0.38rem 0.875rem', background: 'rgba(47,125,90,0.04)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '2px' }} aria-hidden="true">
              {[0.25,0.45,0.65,0.85,1].map((o,i) => (
                <span key={i} style={{ width: 3, height: 9, background: 'var(--color-green)', borderRadius: '1px', opacity: o }} />
              ))}
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--color-green)', letterSpacing: '0.06em' }}>Automatisch verarbeitet — &lt; 30 Sek.</span>
          </div>

          {/* CRM card */}
          <div style={{ padding: '0.75rem 0.875rem', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-3)' }}>CRM-Lead</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--color-border-3)' }}>#00847</span>
            </div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.01em', marginBottom: '0.5rem' }}>Thomas M. — Elektrobetrieb Feldkirch</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
              <Badge label="Erfasst" state="done" />
              <Badge label="Priorisiert" state="done" />
              <Badge label="Team informiert" state="done" />
              <Badge label="Follow-up bereit" state="pending" />
            </div>
          </div>

          {/* Appointment + follow-up */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ padding: '0.625rem 0.875rem', borderRight: '1px solid var(--color-border)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-3)', marginBottom: '0.35rem' }}>Termin</p>
              <div style={{ fontSize: '0.7rem', padding: '0.18rem 0.45rem', background: 'rgba(23,59,92,0.07)', border: '1px solid rgba(23,59,92,0.16)', borderRadius: '3px', color: 'var(--color-blue)', fontFamily: 'var(--font-mono)', fontWeight: 500, marginBottom: '0.2rem' }}>✓ Mo 09:00</div>
              <div style={{ fontSize: '0.67rem', color: 'var(--color-text-3)', paddingLeft: '0.2rem' }}>Di 14:00</div>
            </div>
            <div style={{ padding: '0.625rem 0.875rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-3)', marginBottom: '0.35rem' }}>Follow-up</p>
              <span style={{ fontSize: '0.62rem', padding: '0.18rem 0.45rem', background: 'rgba(198,161,91,0.08)', border: '1px solid rgba(198,161,91,0.22)', borderRadius: '2px', color: 'var(--color-amber)', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: '0.2rem' }}>● In 48 Std.</span>
              <p style={{ fontSize: '0.65rem', color: 'var(--color-text-3)', lineHeight: 1.35 }}>Automatisch aktiv</p>
            </div>
          </div>

          {/* ── Metrics bar (reporting proof) ─────────── */}
          <div style={{ padding: '0.55rem 0.875rem', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-2)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', color: 'var(--color-text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>Dieser Monat</span>
            <div style={{ display: 'flex', gap: '0.875rem', flex: 1 }}>
              {[
                { n: '23', label: 'Anfragen' },
                { n: '18', label: 'Termine' },
                { n: '14', label: 'Aufträge' },
              ].map(({ n, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-blue)', letterSpacing: '-0.02em' }}>{n}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', color: 'var(--color-text-3)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">

          {/* Left — 5 cols */}
          <div className="lg:col-span-5">
            <AnimateIn delay={0}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.75rem' }}>
                <span className="live-dot" aria-hidden="true" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-3)' }}>Operative Systeme für KMU</span>
              </div>
            </AnimateIn>

            <AnimateIn delay={60}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.035em', color: 'var(--color-text)', marginBottom: '1.25rem' }}>
                Aus Anfragen werden Aufträge.{' '}
                <span style={{ color: 'var(--color-blue)' }}>Aus Chaos wird ein System.</span>
              </h1>
            </AnimateIn>

            <AnimateIn delay={130}>
              <p style={{ fontSize: '0.975rem', lineHeight: 1.75, color: 'var(--color-text-2)', marginBottom: '1.5rem' }}>
                GXC baut das System, das Anfragen erfasst, zuordnet, beantwortet,
                nachverfolgt und in Termine und Aufträge verwandelt.
              </p>
            </AnimateIn>

            <AnimateIn delay={190}>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-3)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="6.5" stroke="var(--color-border-2)" />
                  <path d="M4 7l2 2 4-4" stroke="var(--color-green)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Für Handwerk, Dienstleister und lokale Betriebe im Dreiländereck.
              </p>
            </AnimateIn>

            <AnimateIn delay={240}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                <a href="#kontakt" className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.9rem 1.75rem' }}>
                  System-Demo anfragen
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="#ablauf" style={{ fontSize: '0.875rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-display)', fontWeight: 500, padding: '0.9rem 0.25rem', transition: 'color 0.15s ease' }}>
                  Ablauf ansehen →
                </a>
              </div>
            </AnimateIn>
          </div>

          {/* Right — 7 cols */}
          <div className="lg:col-span-7">
            <AnimateIn delay={120} direction="right">
              <OperationsDesk />
            </AnimateIn>
          </div>

        </div>
      </div>
    </section>
  )
}
