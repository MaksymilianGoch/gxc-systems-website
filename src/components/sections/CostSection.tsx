import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

const costCards = [
  {
    index: '01',
    metric: '> 4 hours',
    label: 'Average business response to new inquiries',
    context: 'Industry benchmark: 80% of deals go to the first responder',
    accentColor: '#F59E0B',
    accentLabel: 'Response Time',
  },
  {
    index: '02',
    metric: '~ 35%',
    label: 'Leads lost due to no follow-up system',
    context: 'Manual tracking fails under volume and pressure',
    accentColor: '#EF4444',
    accentLabel: 'Lead Leakage',
  },
  {
    index: '03',
    metric: '8+ hrs/wk',
    label: 'Spent on manual scheduling, data entry and chasing',
    context: 'Time that compounds against operational capacity',
    accentColor: '#F59E0B',
    accentLabel: 'Admin Overhead',
  },
  {
    index: '04',
    metric: '2–3×',
    label: 'More conversions with automated follow-up vs manual',
    context: 'Systems do not tire, forget or deprioritize',
    accentColor: '#10B981',
    accentLabel: 'Conversion Gap',
  },
] as const

export function CostSection() {
  return (
    <section
      id="cost"
      className="section-y"
      style={{ background: 'var(--color-bg-1)' }}
      aria-labelledby="cost-heading"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: Framing copy — 5 cols */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <AnimateIn direction="left" delay={0}>
              <span className="accent-line" aria-hidden="true" />
              <p className="text-label mb-5">The Cost of Inaction</p>
              <h2
                id="cost-heading"
                className="text-display-sm mb-6"
                style={{ color: 'var(--color-text)' }}
              >
                Every day without a system
                <br />
                costs you more than
                <br />
                you measure.
              </h2>
              <p
                style={{
                  color: 'var(--color-text-2)',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  maxWidth: '32rem',
                  marginBottom: '2.5rem',
                }}
              >
                Missed leads, slow responses, manual admin and scattered tools do not just
                create frustration. They create measurable revenue loss.
              </p>

              {/* Separator */}
              <div
                style={{
                  height: '1px',
                  background: 'var(--color-border)',
                  marginBottom: '2rem',
                }}
                aria-hidden="true"
              />

              {/* CTA statement */}
              <p
                style={{
                  color: 'var(--color-text-2)',
                  fontSize: '0.9rem',
                  lineHeight: 1.75,
                  borderLeft: '2px solid var(--color-blue)',
                  paddingLeft: '1.25rem',
                }}
              >
                GXC Systems does not sell automation features. It builds the operational
                infrastructure that eliminates these gaps permanently.
              </p>
            </AnimateIn>
          </div>

          {/* Right: 2×2 cost card grid — 7 cols */}
          <div className="lg:col-span-7">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              role="list"
              aria-label="Cost of inaction metrics"
            >
              {costCards.map((card, i) => (
                <AnimateIn key={card.index} delay={i * 90} direction="up">
                  <div
                    className="panel"
                    role="listitem"
                    style={{
                      padding: '1.75rem',
                      borderRadius: '4px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Top accent strip */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: card.accentColor,
                        opacity: 0.7,
                      }}
                    />

                    {/* Card header row */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1.5rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.62rem',
                          letterSpacing: '0.12em',
                          color: 'var(--color-text-3)',
                        }}
                        aria-hidden="true"
                      >
                        {card.index}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.6rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: card.accentColor,
                          opacity: 0.85,
                        }}
                      >
                        {card.accentLabel}
                      </span>
                    </div>

                    {/* Metric */}
                    <p
                      className="text-stat"
                      style={{
                        color: card.accentColor,
                        marginBottom: '0.5rem',
                      }}
                    >
                      {card.metric}
                    </p>

                    {/* Label */}
                    <p
                      style={{
                        color: 'var(--color-text)',
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 500,
                        lineHeight: 1.45,
                        marginBottom: '1rem',
                      }}
                    >
                      {card.label}
                    </p>

                    {/* Context */}
                    <div
                      style={{
                        borderTop: '1px solid var(--color-border)',
                        paddingTop: '0.875rem',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          color: 'var(--color-text-3)',
                          lineHeight: 1.6,
                          letterSpacing: '0.01em',
                        }}
                      >
                        {card.context}
                      </p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
