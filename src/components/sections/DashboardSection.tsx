import { AnimateIn } from '@/components/ui/AnimateIn'

const kpis = [
  { label: 'Anfragen heute', value: '11', sub: 'inkl. Rückrufen und Terminwünschen', icon: 'inbox' },
  { label: 'Termine bestätigt', value: '6',  sub: 'mit Kalender-Sync und E-Mail',       icon: 'event_available' },
  { label: 'Offene Schritte',   value: '4',  sub: 'für Rückruf oder Termin',             icon: 'pending_actions' },
]

const bars = [
  { d: 'MO', p: 40 }, { d: 'DI', p: 65 }, { d: 'MI', p: 50 },
  { d: 'DO', p: 88 }, { d: 'FR', p: 100 }, { d: 'SA', p: 28 }, { d: 'SO', p: 18 },
]

const feed = [
  { icon: 'language',       label: 'Neue Website-Anfrage', sub: 'Widget · Kernleistung',    time: '09:12' },
  { icon: 'event_available',label: 'Termin bestätigt',     sub: 'Kalender · E-Mail',        time: '10:03' },
  { icon: 'call',           label: 'Rückruf markiert',     sub: 'Lead-Übersicht · Team',    time: '11:28' },
  { icon: 'mark_email_read',label: 'Follow-up gesendet',   sub: 'Automation · Sequenz #3', time: '13:47' },
]

const nav = ['Übersicht', 'Neue Anfragen', 'Termine', 'Rückrufe', 'Berichte']

export function DashboardSection() {
  return (
    <section
      className="section-y"
      style={{ background: 'var(--color-bg-2)', overflow: 'hidden' }}
      aria-labelledby="dash-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 xl:px-24">

        <AnimateIn>
          <div style={{ textAlign: 'center', maxWidth: '52rem', margin: '0 auto 4rem' }}>
            <span className="accent-line" style={{ margin: '0 auto 1.5rem' }} />
            <p className="text-label mb-4">Lead-Übersicht</p>
            <h2 id="dash-heading" className="text-headline-lg" style={{ color: 'var(--color-text)', marginBottom: '1.25rem' }}>
              Volle Kontrolle über jeden Lead.
            </h2>
            <p className="text-body-lg" style={{ maxWidth: '38rem', margin: '0 auto' }}>
              Neue Anfragen werden strukturiert aufgenommen und als klare nächste Schritte an dein Team übergeben.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={80}>
          <div
            style={{
              background: 'var(--color-bg-1)',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid var(--color-border)',
              boxShadow: '0 32px 80px -16px rgba(0,32,69,0.12), 0 8px 24px rgba(0,32,69,0.06)',
              overflow: 'hidden',
            }}
          >
            {/* Chrome */}
            <div style={{ background: 'var(--color-blue)', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '6px' }} aria-hidden="true">
                {['#E57373','#FFA726','#66BB6A'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
              </div>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em' }}>
                GXC Operations — Lead-Übersicht
              </span>
            </div>

            {/* Body */}
            <div style={{ display: 'flex', minHeight: '560px' }}>

              {/* Sidebar */}
              <div style={{ width: '260px', flexShrink: 0, background: 'var(--color-blue)', padding: '2rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h3 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: '0.5rem' }}>Lead-Übersicht</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', lineHeight: 1.55 }}>Klare Sicht auf Anfragen, Termine und nächste Schritte.</p>
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                  {nav.map((item, i) => (
                    <div key={item} className={`dash-nav-item${i === 0 ? ' active' : ''}`}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: i === 0 ? 'var(--color-green)' : 'rgba(255,255,255,0.25)', display: 'inline-block', flexShrink: 0 }} />
                      {item}
                    </div>
                  ))}
                </nav>
                <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 'var(--radius-lg)', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ color: 'white', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.25rem' }}>System aktiv</p>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', lineHeight: 1.5 }}>Alle Leads werden automatisch erfasst und strukturiert.</p>
                </div>
              </div>

              {/* Content */}
              <div style={{ flex: 1, padding: '2rem', background: 'var(--color-bg-2)', display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>

                {/* Top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.025em' }}>
                    Behalten Sie den Überblick.
                  </h4>
                  <div style={{ background: 'var(--color-bg-1)', padding: '0.5rem 1.125rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.625rem', boxShadow: '0 2px 8px rgba(0,32,69,0.06)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-green)', fontSize: '1rem' }}>11</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-3)' }}>neue Vorgänge heute</span>
                  </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-3 gap-4">
                  {kpis.map((k) => (
                    <div key={k.label} style={{ background: 'var(--color-bg-1)', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', boxShadow: '0 2px 8px rgba(0,32,69,0.04)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)' }}>{k.label}</p>
                        <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--color-text-3)' }}>{k.icon}</span>
                      </div>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1, marginBottom: '0.375rem' }}>{k.value}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-3)', lineHeight: 1.4 }}>{k.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Chart + Feed */}
                <div className="grid grid-cols-5 gap-4" style={{ flex: 1 }}>
                  {/* Bar chart */}
                  <div style={{ gridColumn: 'span 3', background: 'var(--color-bg-1)', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                      <div>
                        <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: '0.25rem' }}>Nachfragefluss</p>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.025em' }}>Anfragen dieser Woche</p>
                      </div>
                      <span style={{ background: 'rgba(110,171,140,0.1)', color: 'var(--color-green)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: 700, border: '1px solid rgba(110,171,140,0.25)' }}>+12%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '0.5rem', flex: 1, minHeight: '100px', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
                      {bars.map(({ d, p }) => (
                        <div key={d} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                          <div style={{ width: '100%', borderRadius: '6px 6px 0 0', background: p >= 80 ? 'var(--color-green)' : `rgba(110,171,140,${0.15 + p / 200})`, height: `${p}%`, minHeight: '4px', transition: 'height 0.4s ease' }} />
                          <span style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)' }}>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Live feed */}
                  <div style={{ gridColumn: 'span 2', background: 'var(--color-bg-1)', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: '0.25rem' }}>Live-Feed</p>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>Was heute passiert</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                      {feed.map((item) => (
                        <div key={item.label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <div style={{ width: 34, height: 34, borderRadius: 'var(--radius-lg)', background: 'rgba(110,171,140,0.1)', border: '1px solid rgba(110,171,140,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--color-green)' }}>{item.icon}</span>
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.125rem' }}>
                              <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>{item.label}</p>
                              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)', flexShrink: 0, marginLeft: '0.5rem' }}>{item.time}</span>
                            </div>
                            <p style={{ fontSize: '0.72rem', color: 'var(--color-text-3)' }}>{item.sub}</p>
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
      </div>
    </section>
  )
}
