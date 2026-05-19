import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

const metrics = [
  { stat: '14', unit: 'Tage', label: 'bis zum Live-System' },
  { stat: '∅ 6', unit: 'Std./Woche', label: 'zurückgewonnen' },
  { stat: '0', unit: 'Leads', label: 'gehen verloren' },
]

const capabilities = [
  'Lead-Erfassung & CRM-Integration',
  'Terminautomation & Kalender-Workflows',
  'KI-gestützte Kundenkommunikation',
  'Angebots- & Zahlungslogik',
]

export function HeroSection() {
  return (
    <section
      className="dark-section"
      style={{ paddingTop: 'clamp(5rem, 9vw, 7rem)', paddingBottom: 'clamp(4rem, 7vw, 6rem)' }}
      aria-label="GXC Systems — Automatisierungsinfrastruktur"
    >
      <Container className="relative">

        {/* Top meta row */}
        <AnimateIn delay={0}>
          <div className="flex items-center gap-4 mb-12">
            <div className="flex items-center gap-2">
              <span className="dot-live" aria-hidden="true" />
              <span
                className="text-xs font-medium tracking-[0.12em] uppercase"
                style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}
              >
                Aktiv im Dreiländereck
              </span>
            </div>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <span
              className="text-xs tracking-[0.12em] uppercase"
              style={{ color: 'rgba(200,164,74,0.7)', fontFamily: 'var(--font-mono)' }}
            >
              Vorarlberg · Ostschweiz · Bodensee
            </span>
          </div>
        </AnimateIn>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: Headline + CTA — 7 cols */}
          <div className="lg:col-span-7">
            <AnimateIn delay={60}>
              <h1 className="text-display text-white mb-8" style={{ color: 'white' }}>
                Ihre Betriebsprozesse.
                <br />
                <span style={{ color: 'var(--color-teal-light)' }}>Vollständig automatisiert.</span>
              </h1>
            </AnimateIn>

            <AnimateIn delay={140}>
              <p
                className="text-lg leading-relaxed mb-10 max-w-xl"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                GXC Systems baut die operative Infrastruktur, die Handwerker und
                Dienstleister brauchen — von der ersten Anfrage bis zum abgeschlossenen Auftrag.
                Kein manueller Aufwand. Keine verpassten Leads.
              </p>
            </AnimateIn>

            <AnimateIn delay={200}>
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-14">
                <a
                  href="#kontakt"
                  className="inline-flex items-center gap-2 font-semibold btn-cta btn-press"
                  style={{ fontSize: '0.95rem', padding: '1rem 2rem', letterSpacing: '0.01em' }}
                >
                  Kostenloses Erstgespräch
                </a>
                <a
                  href="#leistungen"
                  className="inline-flex items-center gap-2 font-medium btn-ghost-white"
                  style={{ fontSize: '0.95rem', padding: '1rem 2rem' }}
                >
                  Leistungen ansehen →
                </a>
              </div>
            </AnimateIn>

            {/* Metrics row */}
            <AnimateIn delay={280}>
              <div
                className="grid grid-cols-3 gap-px"
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
              >
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="pt-6 pr-6"
                  >
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span
                        className="text-3xl font-bold leading-none"
                        style={{ fontFamily: 'var(--font-mono)', color: 'white' }}
                      >
                        {m.stat}
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}
                      >
                        {m.unit}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>

          {/* Right: System capabilities panel — 5 cols */}
          <div className="lg:col-span-5">
            <AnimateIn delay={320} direction="right">
              <div
                className="rounded-sm overflow-hidden"
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                {/* Panel header */}
                <div
                  className="flex items-center justify-between px-5 py-3"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <span
                    className="text-xs tracking-[0.12em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}
                  >
                    System — Übersicht
                  </span>
                  <div className="flex gap-1.5">
                    {['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.12)', 'rgba(200,164,74,0.5)'].map((c, i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{ background: c }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>

                {/* Capabilities list */}
                <div className="p-6 space-y-0">
                  {capabilities.map((cap, i) => (
                    <div
                      key={cap}
                      className="flex items-center gap-5 py-4"
                      style={{
                        borderBottom: i < capabilities.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                      }}
                    >
                      <span
                        className="shrink-0 w-7 text-center"
                        style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="font-medium flex-1"
                        style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem' }}
                      >
                        {cap}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5"
                        style={{
                          color: 'var(--color-teal-light)',
                          background: 'rgba(26, 100, 114, 0.2)',
                          fontFamily: 'var(--font-mono)',
                          borderRadius: '2px',
                        }}
                      >
                        aktiv
                      </span>
                    </div>
                  ))}
                </div>

                {/* Panel footer */}
                <div
                  className="flex items-center gap-2 px-5 py-3"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <span className="dot-live" aria-hidden="true" />
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)' }}>
                    GXC Automation Core — v2.4
                  </span>
                </div>
              </div>
            </AnimateIn>

            {/* Below panel: trust note */}
            <AnimateIn delay={400} direction="right">
              <p className="mt-5 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Einrichtung in 5–14 Werktagen. 30 Tage kostenlose Anpassungsphase.
                Keine Abo-Falle — die Systeme gehören Ihnen.
              </p>
            </AnimateIn>
          </div>
        </div>
      </Container>
    </section>
  )
}
