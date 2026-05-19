import { AnimateIn } from '@/components/ui/AnimateIn'
import { Container } from '@/components/ui/Container'

interface DisciplinePanel {
  title: string
  content: string
  items: string[]
}

const PANELS: DisciplinePanel[] = [
  {
    title: 'Structured Delivery',
    content:
      'Every system is delivered through a defined implementation sequence — audit, architecture, build, test, deploy, handover. No improvisation.',
    items: [
      '01 — Operations audit',
      '02 — System architecture',
      '03 — Build & integration',
      '04 — Testing & QA',
      '05 — Deployment & training',
    ],
  },
  {
    title: 'Enterprise-Grade Infrastructure',
    content:
      'EU-hosted, GDPR-compliant. API-first architecture. All integrations documented. Systems owned by the client.',
    items: [
      'EU servers only',
      'Data processing agreements included',
      'No vendor lock-in',
      'Full handover documentation',
      'Client retains all credentials',
    ],
  },
  {
    title: 'Measurable Results',
    content:
      'We do not deliver software. We deliver operational improvements with measurable business outcomes defined at the start of each project.',
    items: [
      'Agreed KPIs before build begins',
      '30-day post-launch review included',
      'Optimization roadmap provided',
      'Ongoing support available',
      'Pilot projects available for qualification',
    ],
  },
]

export function TrustSection() {
  return (
    <section
      id="standards"
      className="section-y"
      style={{ background: 'var(--color-bg-1)' }}
      aria-labelledby="trust-heading"
    >
      <Container>
        {/* Header */}
        <AnimateIn>
          <div className="mb-14 max-w-2xl">
            <span className="accent-line" aria-hidden="true" />
            <p className="text-label mb-4">OPERATING STANDARDS</p>
            <h2
              id="trust-heading"
              className="text-display-sm"
              style={{ color: 'var(--color-text)' }}
            >
              How we build.
              <br />
              Why it lasts.
            </h2>
          </div>
        </AnimateIn>

        {/* 3 discipline panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{
            background: 'var(--color-border)',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {PANELS.map((panel, i) => (
            <AnimateIn key={panel.title} delay={i * 80}>
              <div
                className="panel"
                style={{
                  padding: '2rem',
                  height: '100%',
                  borderRadius: 0,
                  border: 'none',
                }}
              >
                {/* Panel index */}
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--color-blue)',
                    letterSpacing: '0.1em',
                    marginBottom: '1rem',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </p>

                {/* Title */}
                <h3
                  className="text-title"
                  style={{
                    color: 'var(--color-text)',
                    marginBottom: '1rem',
                  }}
                >
                  {panel.title}
                </h3>

                {/* Body */}
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-2)',
                    lineHeight: 1.7,
                    marginBottom: '1.75rem',
                  }}
                >
                  {panel.content}
                </p>

                {/* Divider */}
                <div
                  className="h-rule"
                  style={{ marginBottom: '1.5rem' }}
                  aria-hidden="true"
                />

                {/* Mono list */}
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                  }}
                >
                  {panel.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--color-text-2)',
                        letterSpacing: '0.02em',
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
