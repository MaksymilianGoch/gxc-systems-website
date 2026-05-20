const steps = [
  {
    id: 1,
    label: 'Anfrage',
    sublabel: 'eingeht',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    id: 2,
    label: 'CRM',
    sublabel: 'erfasst',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    id: 3,
    label: 'Team',
    sublabel: 'informiert',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
  },
  {
    id: 4,
    label: 'Termin',
    sublabel: 'bereit',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M9 16l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 5,
    label: 'Follow-up',
    sublabel: 'gestartet',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
      </svg>
    ),
  },
]

export function SystemFlowSection() {
  return (
    <section
      aria-label="Systemablauf: Von der Anfrage zum Auftrag"
      style={{
        background: 'var(--color-bg-1)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: '2rem 0',
      }}
    >
      <style>{`
        @keyframes travelDot {
          0%   { left: 0%; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .flow-connector {
          position: relative;
          flex: 1;
          height: 1px;
          background: var(--color-border-2);
          margin: 0 0.25rem;
          align-self: center;
          margin-top: -1.25rem;
          overflow: visible;
        }
        .flow-connector::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-blue);
          transform: translate(-50%, -50%);
          animation: travelDot 2.8s ease-in-out infinite;
        }
        .flow-connector:nth-child(2)::after { animation-delay: 0s; }
        .flow-connector:nth-child(4)::after { animation-delay: 0.55s; }
        .flow-connector:nth-child(6)::after { animation-delay: 1.1s; }
        .flow-connector:nth-child(8)::after { animation-delay: 1.65s; }

        /* Mobile: vertical connectors */
        @media (max-width: 767px) {
          .flow-connector {
            width: 1px;
            height: 1.5rem;
            flex: none;
            align-self: center;
            margin: 0 auto;
            margin-top: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .flow-connector::after { animation: none; }
        }
      `}</style>

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Label above */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-text-3)',
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}
        >
          Wie eine Anfrage durch das System läuft
        </p>

        {/* Flow nodes + connectors */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 0,
            flexWrap: 'nowrap',
          }}
          className="flow-row"
        >
          <style>{`
            @media (max-width: 767px) {
              .flow-row {
                flex-direction: column;
                align-items: center;
                gap: 0;
              }
            }
          `}</style>

          {steps.map((step, i) => (
            <>
              {/* Node */}
              <div
                key={step.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  minWidth: '5rem',
                }}
              >
                {/* Circle */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--color-bg-1)',
                    border: '1.5px solid var(--color-border-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-blue)',
                    flexShrink: 0,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {step.icon}
                  {/* Active dot on last node */}
                  {step.id === 5 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: 'var(--color-green)',
                        border: '1.5px solid var(--color-bg-1)',
                      }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Label */}
                <div style={{ textAlign: 'center' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2,
                    }}
                  >
                    {step.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      color: 'var(--color-text-3)',
                      letterSpacing: '0.06em',
                      marginTop: '0.1rem',
                    }}
                  >
                    {step.sublabel}
                  </p>
                </div>
              </div>

              {/* Connector between nodes */}
              {i < steps.length - 1 && (
                <div key={`connector-${step.id}`} className="flow-connector" aria-hidden="true" />
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  )
}
