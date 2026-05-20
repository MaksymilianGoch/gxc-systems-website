import { AnimateIn } from '@/components/ui/AnimateIn'

const events = [
  {
    id: 'e1',
    time: '14:23:04',
    icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
    label: 'Anfrage eingetroffen',
    detail: 'Thomas M. — GXC Anfrage-Widget',
    meta: '< 5 Sek. nach Absenden',
    metaColor: 'var(--color-green)',
  },
  {
    id: 'e2',
    time: '14:23:09',
    icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
    label: 'CRM-Eintrag erstellt',
    detail: 'Lead #00847 · Priorität: Hoch erkannt',
    meta: 'Automatisch',
    metaColor: 'var(--color-blue)',
  },
  {
    id: 'e3',
    time: '14:23:11',
    icon: 'M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0',
    label: 'Team benachrichtigt',
    detail: 'Maks G. — Push-Nachricht + E-Mail',
    meta: '< 10 Sek.',
    metaColor: 'var(--color-green)',
  },
  {
    id: 'e4',
    time: '14:25:38',
    icon: 'M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6',
    label: 'Antwort gesendet',
    detail: 'Terminvorschlag übermittelt',
    meta: '2 Min. Reaktionszeit',
    metaColor: 'var(--color-green)',
  },
  {
    id: 'e5',
    time: '14:38:12',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    label: 'Termin bestätigt',
    detail: 'Mo 15.01 · 09:00 — Thomas M.',
    meta: 'Kalender synchronisiert',
    metaColor: 'var(--color-blue)',
  },
  {
    id: 'e6',
    time: '14:38:12',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    label: 'Follow-up eingeplant',
    detail: 'Erinnerung in 48 Std. — automatisch',
    meta: 'Kein manueller Schritt',
    metaColor: 'var(--color-amber)',
    isLast: true,
  },
]

const outcomes = [
  { label: 'Reaktionszeit', value: '2 Min.', color: 'var(--color-green)' },
  { label: 'Termin', value: '✓ Bestätigt', color: 'var(--color-green)' },
  { label: 'Admin-Aufwand', value: '0 Min.', color: 'var(--color-blue)' },
  { label: 'Follow-up', value: '● Aktiv', color: 'var(--color-amber)' },
]

export function SystemFlowSection() {
  return (
    <section
      aria-labelledby="live-example-heading"
      style={{
        background: 'var(--color-bg-1)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: 'clamp(2.5rem, 5vw, 3.5rem) 0',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left — timeline */}
          <div className="lg:col-span-7">
            <AnimateIn>
              <div style={{ marginBottom: '1.75rem' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-blue)', marginBottom: '0.5rem' }}>
                  Live Beispielanfrage
                </p>
                <h2 id="live-example-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: '0.5rem' }}>
                  So läuft eine Anfrage durch das System.
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-2)' }}>
                  Automatisch. Vollständig. In unter 2 Minuten.
                </p>
              </div>
            </AnimateIn>

            {/* Event timeline */}
            <div style={{ position: 'relative' }}>
              {/* Vertical line */}
              <div
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '1.25rem',
                  bottom: '1.25rem',
                  width: '1px',
                  background: `linear-gradient(to bottom, var(--color-border-2), var(--color-green))`,
                }}
                aria-hidden="true"
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {events.map((ev, i) => (
                  <AnimateIn key={ev.id} delay={i * 60}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '0.875rem', paddingBottom: ev.isLast ? 0 : '1rem' }}>
                      {/* Icon dot */}
                      <div
                        style={{
                          width: '2rem',
                          height: '2rem',
                          borderRadius: '50%',
                          background: ev.isLast ? 'var(--color-green)' : 'var(--color-bg-1)',
                          border: `1.5px solid ${ev.isLast ? 'var(--color-green)' : 'var(--color-border-2)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          zIndex: 1,
                          position: 'relative',
                        }}
                        aria-hidden="true"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ev.isLast ? 'white' : 'var(--color-text-3)'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <path d={ev.icon} />
                        </svg>
                      </div>

                      {/* Event content */}
                      <div
                        style={{
                          background: 'var(--color-bg)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '6px',
                          padding: '0.625rem 0.875rem',
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.01em', marginBottom: '0.125rem' }}>{ev.label}</p>
                          <p style={{ fontSize: '0.72rem', color: 'var(--color-text-2)' }}>{ev.detail}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.2rem', flexShrink: 0 }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', color: 'var(--color-text-3)' }}>{ev.time}</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: ev.metaColor, whiteSpace: 'nowrap' }}>{ev.meta}</span>
                        </div>
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </div>

          {/* Right — outcome card */}
          <div className="lg:col-span-5">
            <AnimateIn delay={200}>
              <div
                style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderTop: '3px solid var(--color-green)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'sticky',
                  top: '5.5rem',
                }}
              >
                {/* Card header */}
                <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border)' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-3)', marginBottom: '0.25rem' }}>Ergebnis</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>Anfrage Thomas M.</p>
                </div>

                {/* Metrics */}
                <div style={{ padding: '0.25rem 0' }}>
                  {outcomes.map((o, i) => (
                    <div
                      key={o.label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.7rem 1.25rem',
                        borderBottom: i < outcomes.length - 1 ? '1px solid var(--color-border)' : 'none',
                      }}
                    >
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-text-2)' }}>{o.label}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: o.color }}>{o.value}</span>
                    </div>
                  ))}
                </div>

                {/* Final outcome */}
                <div
                  style={{
                    padding: '1rem 1.25rem',
                    borderTop: '1px solid var(--color-border)',
                    background: 'rgba(47,125,90,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text)' }}>Auftrag</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-green)' }}>✓ Erhalten</span>
                </div>

                {/* Context note */}
                <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--color-border)' }}>
                  <p style={{ fontSize: '0.68rem', color: 'var(--color-text-3)', lineHeight: 1.55 }}>
                    Typisches Ergebnis aus Pilotprojekten. Individuelle Ergebnisse hängen von Betrieb und Ausgangssituation ab.
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>

        </div>
      </div>
    </section>
  )
}
