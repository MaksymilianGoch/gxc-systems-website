const steps = [
  {
    id: 1,
    label: 'Website-\nBesucher',
    sublabel: 'kommt an',
    isStart: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 2,
    label: 'Anfrage',
    sublabel: 'erfasst',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    id: 3,
    label: 'CRM',
    sublabel: 'eingetragen',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    id: 4,
    label: 'Team',
    sublabel: 'informiert',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
  },
  {
    id: 5,
    label: 'Termin',
    sublabel: 'bestätigt',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M9 16l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 6,
    label: 'Follow-up',
    sublabel: 'gestartet',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
      </svg>
    ),
  },
  {
    id: 7,
    label: 'Auftrag',
    sublabel: 'abgeschlossen',
    isEnd: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
]

export function SystemFlowSection() {
  return (
    <section
      aria-label="Inquiry Pipeline: Von der Anfrage zum Auftrag"
      style={{
        background: 'var(--color-bg-1)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: '1.625rem 0',
      }}
    >
      <style>{`
        @keyframes pipelineFlow {
          0%   { left: -5px; opacity: 0; }
          6%   { opacity: 1; }
          94%  { opacity: 1; }
          100% { left: calc(100% + 5px); opacity: 0; }
        }
        .pipeline-connector {
          position: relative;
          flex: 1;
          height: 1px;
          background: var(--color-border-2);
          align-self: center;
          margin-top: -1.5rem;
          min-width: 10px;
          overflow: visible;
        }
        .pipeline-connector::after {
          content: '';
          position: absolute;
          top: 50%;
          left: -5px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--color-blue);
          transform: translateY(-50%);
          animation: pipelineFlow 3.2s ease-in-out infinite;
        }
        .pipeline-connector:nth-of-type(2)::after  { animation-delay: 0s; }
        .pipeline-connector:nth-of-type(4)::after  { animation-delay: 0.46s; }
        .pipeline-connector:nth-of-type(6)::after  { animation-delay: 0.92s; }
        .pipeline-connector:nth-of-type(8)::after  { animation-delay: 1.38s; }
        .pipeline-connector:nth-of-type(10)::after { animation-delay: 1.84s; }
        .pipeline-connector:nth-of-type(12)::after { animation-delay: 2.30s; }

        @media (max-width: 700px) {
          .pipeline-flow { flex-direction: column !important; align-items: center !important; }
          .pipeline-connector {
            width: 1px; height: 20px; flex: none;
            align-self: center; margin-top: 0; min-width: unset;
          }
          .pipeline-connector::after { animation: none; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pipeline-connector::after { animation: none; opacity: 0; }
        }
      `}</style>

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Label */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-text-3)',
            textAlign: 'center',
            marginBottom: '1.25rem',
          }}
        >
          Inquiry Pipeline — von der Anfrage zum Auftrag
        </p>

        {/* Pipeline */}
        <div
          className="pipeline-flow"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            overflowX: 'auto',
            paddingBottom: '0.25rem',
          }}
        >
          {steps.map((step, i) => {
            const isEnd = !!step.isEnd
            const isStart = !!step.isStart
            const nodeColor = isEnd ? 'var(--color-green)' : isStart ? 'var(--color-text-3)' : 'var(--color-blue)'
            const nodeBg = isEnd
              ? 'var(--color-green)'
              : 'var(--color-bg-1)'
            const iconColor = isEnd ? 'white' : nodeColor

            return (
              <>
                {/* Step node */}
                <div
                  key={step.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flexShrink: 0,
                    minWidth: '64px',
                  }}
                >
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      border: `1.5px solid ${isEnd ? 'var(--color-green)' : isStart ? 'var(--color-border-2)' : 'var(--color-border-2)'}`,
                      background: nodeBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: iconColor,
                      flexShrink: 0,
                      position: 'relative',
                    }}
                    aria-hidden="true"
                  >
                    {step.icon}
                    {isEnd && (
                      <span
                        style={{
                          position: 'absolute',
                          inset: -4,
                          borderRadius: '50%',
                          border: '1px solid rgba(47,125,90,0.3)',
                        }}
                      />
                    )}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    {step.label.split('\n').map((line) => (
                      <p
                        key={line}
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.72rem',
                          fontWeight: isEnd || isStart ? 600 : 600,
                          color: isEnd ? 'var(--color-green)' : 'var(--color-text)',
                          letterSpacing: '-0.01em',
                          lineHeight: 1.2,
                        }}
                      >
                        {line}
                      </p>
                    ))}
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.57rem',
                        color: isEnd ? 'var(--color-green)' : 'var(--color-text-3)',
                        letterSpacing: '0.04em',
                        marginTop: '0.1rem',
                      }}
                    >
                      {step.sublabel}
                    </p>
                  </div>
                </div>

                {/* Connector between nodes */}
                {i < steps.length - 1 && (
                  <div key={`c-${step.id}`} className="pipeline-connector" aria-hidden="true" />
                )}
              </>
            )
          })}
        </div>
      </div>
    </section>
  )
}
