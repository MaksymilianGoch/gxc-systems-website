import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

const steps = [
  {
    n: '01',
    label: 'Analyse',
    description: 'Wir verstehen deinen Betrieb, bevor wir bauen.',
    color: 'var(--color-blue)',
    isLive: false,
  },
  {
    n: '02',
    label: 'Website & Widget',
    description: 'Lead-Quelle und Erfassungspunkt werden eingerichtet.',
    color: 'var(--color-blue)',
    isLive: false,
  },
  {
    n: '03',
    label: 'CRM-Struktur',
    description: 'Alle Anfragen zentral, geordnet und sichtbar.',
    color: 'var(--color-blue)',
    isLive: false,
  },
  {
    n: '04',
    label: 'Automation',
    description: 'Prozesse laufen ohne manuellen Eingriff.',
    color: 'var(--color-blue)',
    isLive: false,
  },
  {
    n: '05',
    label: 'Testphase',
    description: 'Echte Szenarien, letzte Anpassungen.',
    color: 'var(--color-blue)',
    isLive: false,
  },
  {
    n: '06',
    label: 'Livegang',
    description: 'Dein System ist aktiv — wir sind dabei.',
    color: 'var(--color-green)',
    isLive: true,
  },
  {
    n: '07',
    label: 'Optimierung',
    description: 'Monatliche Reports, kontinuierliche Verbesserung.',
    color: 'var(--color-warning)',
    isLive: false,
  },
]

export function ProcessSection() {
  return (
    <section
      id="ablauf"
      className="section-y"
      style={{ background: 'var(--color-bg-1)' }}
      aria-labelledby="process-heading"
    >
      <style>{`
        @keyframes pipelineDot {
          0%   { left: -4px; opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { left: calc(100% + 4px); opacity: 0; }
        }
        .pipe-connector {
          position: relative;
          flex: 1;
          height: 2px;
          background: var(--color-border);
          align-self: flex-start;
          margin-top: 15px;
          min-width: 12px;
          overflow: visible;
          flex-shrink: 1;
        }
        .pipe-connector::after {
          content: '';
          position: absolute;
          top: 50%;
          left: -4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-blue);
          transform: translateY(-50%);
          animation: pipelineDot 3.5s ease-in-out infinite;
        }
        .pipe-connector:nth-of-type(2)::after  { animation-delay: 0s; }
        .pipe-connector:nth-of-type(4)::after  { animation-delay: 0.5s; }
        .pipe-connector:nth-of-type(6)::after  { animation-delay: 1.0s; }
        .pipe-connector:nth-of-type(8)::after  { animation-delay: 1.5s; }
        .pipe-connector:nth-of-type(10)::after { animation-delay: 2.0s; }
        .pipe-connector:nth-of-type(12)::after { animation-delay: 2.5s; }

        @media (max-width: 900px) {
          .pipe-flow { flex-direction: column !important; align-items: flex-start !important; gap: 0 !important; }
          .pipe-connector {
            width: 2px;
            height: 24px;
            flex: none;
            align-self: auto;
            margin-top: 0;
            margin-left: 15px;
          }
          .pipe-connector::after {
            top: -4px;
            left: 50%;
            transform: translateX(-50%);
            animation: none;
            opacity: 0;
          }
          .pipe-step { flex-direction: row !important; align-items: flex-start !important; gap: 0.875rem !important; }
          .pipe-step-text { text-align: left !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pipe-connector::after { animation: none; opacity: 0; }
        }
      `}</style>

      <Container>
        <AnimateIn>
          <div style={{ maxWidth: '44rem', marginBottom: '3.5rem' }}>
            <span className="accent-line" />
            <p className="text-label mb-4">Umsetzungsablauf</p>
            <h2
              id="process-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 700,
                color: 'var(--color-text)',
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                marginBottom: '0.875rem',
              }}
            >
              Vom ersten Klick bis zum
              <br />
              abgeschlossenen Auftrag.
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-2)', lineHeight: 1.7 }}>
              Jede Anfrage läuft durch einen klaren Prozess: erfassen, zuordnen,
              benachrichtigen, terminieren, nachfassen und dokumentieren.
            </p>
          </div>
        </AnimateIn>

        {/* ── Pipeline ─────────────────────────────────────── */}
        <AnimateIn delay={80}>
          <div
            className="pipe-flow"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 0,
              overflowX: 'auto',
              paddingBottom: '0.5rem',
            }}
          >
            {steps.map((step, i) => (
              <>
                {/* Step */}
                <div
                  key={step.n}
                  className="pipe-step"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.625rem',
                    flexShrink: 0,
                    maxWidth: '110px',
                  }}
                >
                  {/* Circle */}
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: `2px solid ${step.color}`,
                      background: step.isLive ? step.color : 'var(--color-bg-1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      position: 'relative',
                    }}
                    aria-hidden="true"
                  >
                    {step.isLive ? (
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3 6-6" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.58rem',
                          fontWeight: 600,
                          color: step.color,
                          letterSpacing: '0.04em',
                        }}
                      >
                        {step.n}
                      </span>
                    )}
                    {/* Live pulse */}
                    {step.isLive && (
                      <span
                        style={{
                          position: 'absolute',
                          inset: -4,
                          borderRadius: '50%',
                          border: `1.5px solid ${step.color}`,
                          opacity: 0.35,
                        }}
                      />
                    )}
                  </div>

                  {/* Label + description */}
                  <div className="pipe-step-text" style={{ textAlign: 'center' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: step.isLive ? step.color : 'var(--color-text)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        marginBottom: '0.3rem',
                      }}
                    >
                      {step.label}
                      {step.isLive && (
                        <span
                          style={{
                            display: 'inline-block',
                            marginLeft: '0.3rem',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: step.color,
                            verticalAlign: 'middle',
                          }}
                        />
                      )}
                    </p>
                    <p
                      style={{
                        fontSize: '0.68rem',
                        color: 'var(--color-text-3)',
                        lineHeight: 1.4,
                        letterSpacing: '-0.005em',
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector */}
                {i < steps.length - 1 && (
                  <div key={`p-${step.n}`} className="pipe-connector" aria-hidden="true" />
                )}
              </>
            ))}
          </div>
        </AnimateIn>

        {/* ── Summary row ──────────────────────────────────── */}
        <AnimateIn delay={160}>
          <div
            style={{
              marginTop: '3rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1px',
              background: 'var(--color-border)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            {[
              { label: 'Typische Projektdauer', value: '3–4 Wochen' },
              { label: 'Live-Betrieb ab', value: 'Woche 4' },
              { label: 'Betreuung danach', value: 'Laufend, kündbar' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: 'var(--color-bg-1)',
                  padding: '1.25rem 1.5rem',
                }}
              >
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-3)', marginBottom: '0.375rem' }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={220}>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href="#kontakt" className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.875rem 2rem' }}>
              Ablauf besprechen
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
