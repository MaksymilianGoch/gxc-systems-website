import { AnimateIn } from '@/components/ui/AnimateIn'
import { Container } from '@/components/ui/Container'

const kpis = [
  { label: 'Anfragen heute', value: '11', sub: 'inkl. Rückrufen und Terminwünschen' },
  { label: 'Termine bestätigt', value: '6', sub: 'mit Kalender-Sync und E-Mail' },
  { label: 'Offene Schritte', value: '4', sub: 'für Rückruf oder Termin' },
]

const barData = [
  { day: 'MO', pct: 40 },
  { day: 'DI', pct: 62 },
  { day: 'MI', pct: 50 },
  { day: 'DO', pct: 88 },
  { day: 'FR', pct: 100 },
  { day: 'SA', pct: 28 },
  { day: 'SO', pct: 18 },
]

const liveFeed = [
  { icon: 'language', label: 'Neue Website-Anfrage', sub: 'Kernleistung · Widget', time: '09:12', color: 'var(--color-green)' },
  { icon: 'event_available', label: 'Termin bestätigt', sub: 'Kalender · E-Mail', time: '10:03', color: 'var(--color-blue-glow)' },
  { icon: 'call', label: 'Rückruf markiert', sub: 'Lead-Übersicht · Team', time: '11:28', color: 'var(--color-amber)' },
]

const navItems = [
  { label: 'Übersicht', active: true },
  { label: 'Neue Anfragen' },
  { label: 'Termine' },
  { label: 'Rückrufe' },
]

export function DashboardSection() {
  return (
    <section
      className="section-y"
      style={{ background: 'var(--color-bg-2)', overflow: 'hidden' }}
      aria-labelledby="dashboard-heading"
    >
      <Container>
        <AnimateIn>
          <div style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto 3.5rem' }}>
            <span className="accent-line" style={{ margin: '0 auto 1.25rem' }} />
            <p className="text-label mb-3">Lead-Übersicht</p>
            <h2 id="dashboard-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '0.875rem' }}>
              Volle Kontrolle über jeden Lead.
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-2)', lineHeight: 1.7 }}>
              Neue Anfragen werden strukturiert aufgenommen und als klare nächste Schritte an dein Team übergeben.
            </p>
          </div>
        </AnimateIn>

        {/* Dashboard window */}
        <AnimateIn delay={80}>
          <div
            style={{
              background: 'var(--color-bg-1)',
              borderRadius: '20px',
              boxShadow: '0 32px 64px -16px rgba(0,32,69,0.12), 0 4px 16px rgba(0,32,69,0.06)',
              border: '1px solid var(--color-border)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Chrome bar */}
            <div style={{ background: 'var(--color-blue)', padding: '0.625rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.3rem' }} aria-hidden="true">
                {['#E57373','#FFA726','#66BB6A'].map((c) => (
                  <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, display: 'block' }} />
                ))}
              </div>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.08em' }}>
                GXC Operations — Lead-Übersicht
              </span>
            </div>

            {/* Dashboard body */}
            <div className="flex flex-col lg:flex-row" style={{ minHeight: '520px' }}>

              {/* Sidebar */}
              <div className="dash-sidebar" style={{ width: '100%', maxWidth: '240px', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', flexShrink: 0 }}>
                <div>
                  <h3 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '0.375rem' }}>
                    Lead-Übersicht
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', lineHeight: 1.5 }}>
                    Klare Sicht auf Anfragen, Termine und nächste Schritte.
                  </p>
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                  {navItems.map((item) => (
                    <div key={item.label} className={`dash-nav-item${item.active ? ' active' : ''}`}>
                      {item.active && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-green)', display: 'inline-block', flexShrink: 0 }} aria-hidden="true" />}
                      {!item.active && <span style={{ width: 6, height: 6, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.3)', display: 'inline-block', flexShrink: 0 }} aria-hidden="true" />}
                      {item.label}
                    </div>
                  ))}
                </nav>
                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '0.875rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ color: 'white', fontWeight: 700, fontSize: '0.78rem', marginBottom: '0.25rem' }}>System aktiv</p>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.68rem', lineHeight: 1.5 }}>Leads bleiben für das Team an einem Ort sichtbar.</p>
                </div>
              </div>

              {/* Content */}
              <div style={{ flex: 1, padding: '1.5rem', background: 'var(--color-bg-2)', display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: 0 }}>
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
                    Behalten Sie den Überblick.
                  </h4>
                  <div style={{ background: 'var(--color-bg-1)', padding: '0.375rem 0.875rem', borderRadius: '100px', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 1px 4px rgba(0,32,69,0.06)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-green)', fontSize: '0.9rem' }}>11</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-3)' }}>neue Vorgänge heute</span>
                  </div>
                </div>

                {/* KPI row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {kpis.map((k) => (
                    <div key={k.label} style={{ background: 'var(--color-bg-1)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: '0 1px 4px rgba(0,32,69,0.04)' }}>
                      <p style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: '0.375rem' }}>{k.label}</p>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1, marginBottom: '0.25rem' }}>{k.value}</p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--color-text-3)' }}>{k.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Chart + Live feed */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ flex: 1 }}>
                  {/* Bar chart */}
                  <div style={{ gridColumn: 'span 2', background: 'var(--color-bg-1)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: '0 1px 4px rgba(0,32,69,0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div>
                        <p style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: '0.2rem' }}>Nachfragefluss</p>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>Anfragen dieser Woche</p>
                      </div>
                      <span style={{ background: 'rgba(110,171,140,0.1)', color: 'var(--color-green)', padding: '0.2rem 0.625rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700, border: '1px solid rgba(110,171,140,0.25)' }}>+12%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '0.375rem', height: '120px', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>
                      {barData.map(({ day, pct }) => (
                        <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem', flex: 1 }}>
                          <div style={{ width: '100%', background: pct === 100 ? 'var(--color-green)' : `rgba(110,171,140,${0.15 + pct / 200})`, borderRadius: '4px 4px 0 0', height: `${pct}%`, transition: 'height 0.3s ease', minHeight: '4px' }} />
                          <span style={{ fontSize: '0.58rem', fontWeight: 700, color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)' }}>{day}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Live feed */}
                  <div style={{ background: 'var(--color-bg-1)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: '0 1px 4px rgba(0,32,69,0.04)' }}>
                    <p style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: '0.25rem' }}>Live-Feed</p>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.01em', marginBottom: '1rem' }}>Was heute passiert</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                      {liveFeed.map((item) => (
                        <div key={item.label} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                          <div style={{ width: 30, height: 30, borderRadius: '50%', background: `rgba(110,171,140,0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(110,171,140,0.2)' }} aria-hidden="true">
                            <span className="material-symbols-outlined" style={{ fontSize: '0.9rem', color: item.color }}>
                              {item.icon}
                            </span>
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>{item.label}</p>
                              <span style={{ fontSize: '0.62rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)', flexShrink: 0, marginLeft: '0.25rem' }}>{item.time}</span>
                            </div>
                            <p style={{ fontSize: '0.68rem', color: 'var(--color-text-3)' }}>{item.sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
