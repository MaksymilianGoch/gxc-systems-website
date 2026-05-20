import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

const stationen = [
  {
    index: '01',
    name: 'Anfrage',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="2" width="14" height="16" rx="1" />
        <line x1="6" y1="7" x2="14" y2="7" />
        <line x1="6" y1="10" x2="14" y2="10" />
        <line x1="6" y1="13" x2="10" y2="13" />
      </svg>
    ),
  },
  {
    index: '02',
    name: 'KI-Klassifizierung',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 3 L14 8 L10 13 L6 8 Z" />
        <line x1="14" y1="8" x2="18" y2="6" />
        <line x1="14" y1="8" x2="18" y2="10" />
        <line x1="6" y1="8" x2="2" y2="6" />
        <line x1="6" y1="8" x2="2" y2="10" />
      </svg>
    ),
  },
  {
    index: '03',
    name: 'CRM-Eintrag',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="10" cy="5" rx="7" ry="2.5" />
        <path d="M3 5 L3 10" />
        <path d="M17 5 L17 10" />
        <ellipse cx="10" cy="10" rx="7" ry="2.5" />
        <path d="M3 10 L3 15" />
        <path d="M17 10 L17 15" />
        <ellipse cx="10" cy="15" rx="7" ry="2.5" />
      </svg>
    ),
  },
  {
    index: '04',
    name: 'Ablauf ausgelöst',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="10" cy="10" r="3" />
        <path d="M10 2 L10 4" />
        <path d="M10 16 L10 18" />
        <path d="M2 10 L4 10" />
        <path d="M16 10 L18 10" />
        <path d="M4.22 4.22 L5.64 5.64" />
        <path d="M14.36 14.36 L15.78 15.78" />
        <path d="M15.78 4.22 L14.36 5.64" />
        <path d="M5.64 14.36 L4.22 15.78" />
      </svg>
    ),
  },
  {
    index: '05',
    name: 'Antwort versandt',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="5" width="12" height="10" rx="1" />
        <path d="M14 9 L18 7 L18 13 L14 11" />
      </svg>
    ),
  },
  {
    index: '06',
    name: 'Termin gebucht',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="14" height="13" rx="1" />
        <line x1="3" y1="8" x2="17" y2="8" />
        <line x1="7" y1="2" x2="7" y2="6" />
        <line x1="13" y1="2" x2="13" y2="6" />
        <path d="M7 12 L9 14 L13 10" />
      </svg>
    ),
  },
  {
    index: '07',
    name: 'Auftrag',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" />
        <path d="M6.5 10.5 L9 13 L13.5 8" />
      </svg>
    ),
  },
]

const stats = [
  { value: '⌀ 23 Sek.', label: 'Von Formular bis CRM-Eintrag' },
  { value: '⌀ 41 Sek.', label: 'Bis zur automatischen Antwort' },
  { value: '0', label: 'Manuelle Schritte nötig' },
]

// 6 connectors between 7 stations, staggered delays 0s … 3.5s
const connectorDelays = ['0s', '0.7s', '1.4s', '2.1s', '2.8s', '3.5s']

export function PipelineSection() {
  return (
    <section
      id="pipeline-demo"
      className="section-y"
      style={{ background: 'var(--color-bg-1)' }}
      aria-labelledby="pipeline-heading"
    >
      {/* Keyframe styles scoped to this section */}
      <style>{`
        @keyframes travelDot {
          0%   { left: -8px;   opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { left: calc(100% + 8px); opacity: 0; }
        }

        @keyframes travelDotVertical {
          0%   { top: -8px;   opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { top: calc(100% + 8px); opacity: 0; }
        }

        .pipeline-connector {
          position: relative;
          flex: 1;
          height: 1px;
          background: var(--color-border-2);
          align-self: center;
          min-width: 24px;
          overflow: visible;
        }

        .pipeline-connector::after {
          content: '';
          position: absolute;
          right: -1px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 3.5px solid transparent;
          border-bottom: 3.5px solid transparent;
          border-left: 5px solid var(--color-border-3);
        }

        .pipeline-packet {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-blue);
          box-shadow: 0 0 8px 2px rgba(37,99,235,0.6);
          animation: travelDot 5s ease-in-out infinite;
          pointer-events: none;
        }

        /* Vertical pipeline (mobile) */
        .pipeline-connector-v {
          position: relative;
          width: 1px;
          height: 40px;
          background: var(--color-border-2);
          align-self: center;
          margin: 0 auto;
          overflow: visible;
        }

        .pipeline-connector-v::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 3.5px solid transparent;
          border-right: 3.5px solid transparent;
          border-top: 5px solid var(--color-border-3);
        }

        .pipeline-packet-v {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-blue);
          box-shadow: 0 0 8px 2px rgba(37,99,235,0.6);
          animation: travelDotVertical 5s ease-in-out infinite;
          pointer-events: none;
          margin-left: -4px;
        }

        .pipeline-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          background: var(--color-bg-2);
          border: 1px solid var(--color-border);
          border-radius: 3px;
          padding: 1.25rem 0.875rem;
          width: 110px;
          flex-shrink: 0;
          transition: border-color 0.2s ease;
        }

        .pipeline-node:hover {
          border-color: var(--color-border-3);
        }

        .pipeline-node-name {
          font-family: var(--font-display);
          font-size: 0.64rem;
          font-weight: 600;
          color: var(--color-text-2);
          text-align: center;
          line-height: 1.3;
          letter-spacing: -0.005em;
        }

        .pipeline-stat-value {
          font-family: var(--font-mono);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-blue);
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .pipeline-stat-label {
          font-size: 0.75rem;
          color: var(--color-text-3);
          line-height: 1.45;
          margin-top: 0.3rem;
        }
      `}</style>

      <Container>
        {/* Header */}
        <AnimateIn>
          <div className="mb-14 text-center">
            <span className="accent-line" style={{ margin: '0 auto 1.25rem' }} />
            <p className="text-label mb-4">LIVE-PROZESS-VORSCHAU</p>
            <h2
              id="pipeline-heading"
              className="text-display-sm"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-text)',
                marginBottom: '1rem',
                whiteSpace: 'pre-line',
              }}
            >
              {'So läuft eine Anfrage\ndurch unser System.'}
            </h2>
            <p
              style={{
                fontSize: '0.9rem',
                color: 'var(--color-text-3)',
                maxWidth: '36rem',
                margin: '0 auto',
                lineHeight: 1.65,
              }}
            >
              Vom Erstkontakt bis zur Bestätigung — ohne manuellen Eingriff.
            </p>
          </div>
        </AnimateIn>

        {/* Pipeline — Desktop (horizontal) */}
        <AnimateIn delay={80}>
          <div
            style={{
              overflowX: 'auto',
              paddingBottom: '1rem',
            }}
          >
            {/* Desktop layout */}
            <div
              className="hidden md:flex"
              style={{
                alignItems: 'center',
                gap: 0,
                minWidth: 'max-content',
                margin: '0 auto',
                justifyContent: 'center',
              }}
              role="list"
              aria-label="Prozess-Pipeline"
            >
              {stationen.map((station, i) => (
                <div
                  key={station.index}
                  style={{ display: 'flex', alignItems: 'center', gap: 0 }}
                >
                  {/* Node */}
                  <div className="pipeline-node" role="listitem">
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        color: 'var(--color-blue)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {station.index}
                    </span>
                    <span
                      style={{
                        color: 'var(--color-text-2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {station.icon}
                    </span>
                    <span className="pipeline-node-name">{station.name}</span>
                  </div>

                  {/* Connector (after each station except the last) */}
                  {i < stationen.length - 1 && (
                    <div className="pipeline-connector">
                      <span
                        className="pipeline-packet"
                        style={{
                          animationDelay: connectorDelays[i],
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile layout — vertical */}
            <div
              className="flex md:hidden flex-col"
              style={{
                alignItems: 'stretch',
                gap: 0,
                maxWidth: '240px',
                margin: '0 auto',
              }}
              role="list"
              aria-label="Prozess-Pipeline"
            >
              {stationen.map((station, i) => (
                <div key={station.index} style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Node */}
                  <div
                    className="pipeline-node"
                    role="listitem"
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      gap: '0.75rem',
                      padding: '1rem 1.25rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        color: 'var(--color-blue)',
                        letterSpacing: '0.05em',
                        flexShrink: 0,
                      }}
                    >
                      {station.index}
                    </span>
                    <span
                      style={{
                        color: 'var(--color-text-2)',
                        display: 'flex',
                        alignItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {station.icon}
                    </span>
                    <span className="pipeline-node-name" style={{ textAlign: 'left' }}>
                      {station.name}
                    </span>
                  </div>

                  {/* Vertical connector */}
                  {i < stationen.length - 1 && (
                    <div className="pipeline-connector-v">
                      <span
                        className="pipeline-packet-v"
                        style={{
                          animationDelay: connectorDelays[i],
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* Stats row — desktop: 3 columns with dividers, mobile: stacked */}
        <AnimateIn delay={160}>
          {/* Desktop */}
          <div
            className="mt-14 hidden sm:grid sm:grid-cols-3"
            style={{
              borderTop: '1px solid var(--color-border)',
              paddingTop: '2.5rem',
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  textAlign: 'center',
                  padding: '0 1.5rem',
                  borderRight:
                    i < stats.length - 1 ? '1px solid var(--color-border)' : 'none',
                }}
              >
                <p className="pipeline-stat-value">{stat.value}</p>
                <p className="pipeline-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div
            className="mt-14 flex flex-col sm:hidden gap-6"
            style={{
              borderTop: '1px solid var(--color-border)',
              paddingTop: '2.5rem',
            }}
          >
            {stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p className="pipeline-stat-value">{stat.value}</p>
                <p className="pipeline-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
