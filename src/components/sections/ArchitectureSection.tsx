import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

const stages = [
  {
    index: '01',
    phase: 'Input',
    label: 'Business Inquiry',
    description: 'Web form, phone, email or chat — every entry point captured',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Arrow entering a rectangle */}
        <rect x="2" y="5" width="14" height="12" rx="1.5" />
        <path d="M16 11h4M17 8.5l3 2.5-3 2.5" />
      </svg>
    ),
  },
  {
    index: '02',
    phase: 'AI Processing',
    label: 'Intent Classification',
    description: 'AI agent analyzes, prioritizes and routes based on business rules',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Branching paths */}
        <circle cx="4" cy="11" r="2" />
        <circle cx="18" cy="5" r="2" />
        <circle cx="18" cy="17" r="2" />
        <path d="M6 11h4l4-6M10 11l4 6" />
      </svg>
    ),
  },
  {
    index: '03',
    phase: 'CRM Entry',
    label: 'Lead Registered',
    description: 'Structured data stored with source, timestamp and priority',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Database cylinder */}
        <ellipse cx="11" cy="5.5" rx="7" ry="2.5" />
        <path d="M4 5.5v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-5" />
        <path d="M4 10.5v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-5" />
      </svg>
    ),
  },
  {
    index: '04',
    phase: 'Routing',
    label: 'Workflow Trigger',
    description: 'Automated sequences activated: assignment, notification, follow-up',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Gear / cog */}
        <circle cx="11" cy="11" r="3" />
        <path d="M11 2v2M11 18v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M2 11h2M18 11h2M4.22 17.78l1.42-1.42M16.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    index: '05',
    phase: 'Communication',
    label: 'Response Dispatched',
    description: 'Instant confirmation, booking link or agent handoff — sub-minute',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Outgoing arrow */}
        <path d="M2 11h16M14 6l6 5-6 5" />
        <path d="M2 6v10" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    index: '06',
    phase: 'Tracking',
    label: 'Pipeline Updated',
    description: 'Status tracked, reminders set, no lead falls through',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Bar chart */}
        <rect x="2" y="13" width="4" height="6" rx="0.5" />
        <rect x="9" y="8" width="4" height="11" rx="0.5" />
        <rect x="16" y="3" width="4" height="16" rx="0.5" />
      </svg>
    ),
  },
  {
    index: '07',
    phase: 'Outcome',
    label: 'Revenue Realized',
    description: 'Closed deal, booked appointment or qualified disqualification',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Checkmark circle */}
        <circle cx="11" cy="11" r="9" />
        <path d="M7 11l3 3 5-5" />
      </svg>
    ),
  },
] as const

export function ArchitectureSection() {
  return (
    <section
      id="architecture"
      className="section-y"
      style={{ background: 'var(--color-bg)' }}
      aria-labelledby="architecture-heading"
    >
      {/* Subtle grid background */}
      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.15,
        }}
        aria-hidden="true"
      />

      <Container className="relative">

        {/* Section header — centered */}
        <AnimateIn direction="up" delay={0}>
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <span
              className="accent-line"
              style={{ margin: '0 auto 1.25rem' }}
              aria-hidden="true"
            />
            <p className="text-label mb-5">System Architecture</p>
            <h2
              id="architecture-heading"
              className="text-display-sm"
              style={{
                color: 'var(--color-text)',
                maxWidth: '36rem',
                margin: '0 auto 1.25rem',
              }}
            >
              One operating layer.
              <br />
              Every process connected.
            </h2>
            <p
              style={{
                color: 'var(--color-text-2)',
                fontSize: '1rem',
                lineHeight: 1.7,
                maxWidth: '30rem',
                margin: '0 auto',
              }}
            >
              GXC builds a connected operational system — not isolated tools.
            </p>
          </div>
        </AnimateIn>

        {/* Flow diagram */}
        <div
          role="list"
          aria-label="System architecture stages"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 0,
            position: 'relative',
          }}
          className="hidden lg:grid"
        >
          {/* Connector track line behind the cards */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '4rem',
              left: 'calc(100% / 14)',
              right: 'calc(100% / 14)',
              height: '1px',
              background: 'var(--color-border-2)',
              zIndex: 0,
            }}
          />

          {/* Moving data-flow dot on the connector */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 'calc(4rem - 3px)',
              left: 'calc(100% / 14)',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--color-cyan)',
              boxShadow: '0 0 8px var(--color-cyan)',
              zIndex: 1,
              animation: 'arch-dot-flow 4s linear infinite',
            }}
          />

          {stages.map((stage, i) => (
            <AnimateIn key={stage.index} delay={i * 70} direction="up">
              <div
                role="listitem"
                style={{
                  position: 'relative',
                  zIndex: 2,
                  padding: '0 0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                {/* Stage node */}
                <div
                  className="panel"
                  style={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                    background: i === stages.length - 1
                      ? 'rgba(16, 185, 129, 0.08)'
                      : 'var(--color-bg-2)',
                    borderColor: i === stages.length - 1
                      ? 'rgba(16, 185, 129, 0.3)'
                      : 'var(--color-border)',
                    color: i === stages.length - 1
                      ? 'var(--color-green)'
                      : 'var(--color-blue)',
                    flexShrink: 0,
                  }}
                >
                  {stage.icon}
                </div>

                {/* Index + phase */}
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.58rem',
                    letterSpacing: '0.12em',
                    color: 'var(--color-text-3)',
                    marginBottom: '0.25rem',
                    textTransform: 'uppercase',
                  }}
                >
                  {stage.index} / {stage.phase}
                </p>

                {/* Label */}
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    lineHeight: 1.3,
                    marginBottom: '0.6rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {stage.label}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.68rem',
                    color: 'var(--color-text-2)',
                    lineHeight: 1.55,
                    maxWidth: '9rem',
                  }}
                >
                  {stage.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div
          role="list"
          aria-label="System architecture stages"
          className="flex flex-col gap-0 lg:hidden"
        >
          {stages.map((stage, i) => (
            <AnimateIn key={stage.index} delay={i * 60} direction="left">
              <div
                role="listitem"
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'flex-start',
                  padding: '1.25rem 0',
                  borderBottom:
                    i < stages.length - 1
                      ? '1px solid var(--color-border)'
                      : 'none',
                  position: 'relative',
                }}
              >
                {/* Vertical connector */}
                {i < stages.length - 1 && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '1.625rem',
                      top: '3.5rem',
                      bottom: 0,
                      width: '1px',
                      background: 'var(--color-border)',
                    }}
                  />
                )}

                {/* Node */}
                <div
                  className="panel"
                  style={{
                    width: '2.75rem',
                    height: '2.75rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    background: i === stages.length - 1
                      ? 'rgba(16, 185, 129, 0.08)'
                      : 'var(--color-bg-2)',
                    borderColor: i === stages.length - 1
                      ? 'rgba(16, 185, 129, 0.3)'
                      : 'var(--color-border)',
                    color: i === stages.length - 1
                      ? 'var(--color-green)'
                      : 'var(--color-blue)',
                  }}
                >
                  {stage.icon}
                </div>

                {/* Text */}
                <div style={{ paddingTop: '0.125rem' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.12em',
                      color: 'var(--color-text-3)',
                      textTransform: 'uppercase',
                      marginBottom: '0.2rem',
                    }}
                  >
                    {stage.index} / {stage.phase}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      letterSpacing: '-0.015em',
                      lineHeight: 1.3,
                      marginBottom: '0.35rem',
                    }}
                  >
                    {stage.label}
                  </p>
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--color-text-2)',
                      lineHeight: 1.6,
                    }}
                  >
                    {stage.description}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Footer note */}
        <AnimateIn delay={520} direction="up">
          <div
            style={{
              marginTop: '3.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--color-border)',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--color-text-3)',
                letterSpacing: '0.06em',
              }}
            >
              Average time from inquiry to structured CRM entry:{' '}
              <span style={{ color: 'var(--color-cyan)' }}>&lt; 30 seconds.</span>
            </p>
          </div>
        </AnimateIn>

      </Container>

      {/* Scoped keyframe for the desktop dot animation */}
      <style>{`
        @keyframes arch-dot-flow {
          0%   { left: calc(100% / 14); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { left: calc(100% - 100% / 14 - 6px); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
