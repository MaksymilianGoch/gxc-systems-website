import { AnimateIn } from '@/components/ui/AnimateIn'
import { Container } from '@/components/ui/Container'
import { ContactForm } from './ContactForm'

const TRUST_SIGNALS = [
  '30 Minuten — strukturiert und effizient',
  'Systemanalyse inklusive — kostenlos',
  'Alle Systeme bleiben in Ihrem Besitz',
]

export function ContactSection() {
  return (
    <section
      id="kontakt"
      className="section-y"
      style={{
        background:
          'radial-gradient(ellipse 100% 80% at 50% 0%, rgba(14,30,68,0.8) 0%, var(--color-bg) 60%)',
      }}
      aria-labelledby="contact-heading"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* LEFT: Copy + trust signals */}
          <div>
            <AnimateIn>
              <span className="accent-line" aria-hidden="true" />
              <p className="text-label mb-4">JETZT STARTEN</p>
              <h2
                id="contact-heading"
                className="text-display-sm mb-6"
                style={{ color: 'var(--color-text)' }}
              >
                Bereit, das System zu installieren,
                <br />
                bevor es Ihr Wettbewerber tut?
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--color-text-2)',
                  lineHeight: 1.75,
                  marginBottom: '2.5rem',
                }}
              >
                Lassen Sie uns 30 Minuten reden — kein Pitch, keine Folien. Wir schauen uns
                Ihren Betrieb an und sagen Ihnen ehrlich, wo das größte Leck ist.
                <br />
                <br />
                Keine ungebetenen Angebote danach.
              </p>
            </AnimateIn>

            <AnimateIn delay={80}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                  borderTop: '1px solid var(--color-border)',
                }}
              >
                {TRUST_SIGNALS.map((signal, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.875rem',
                      padding: '1rem 0',
                      borderBottom: '1px solid var(--color-border)',
                    }}
                  >
                    {/* Check mark */}
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        color: 'var(--color-blue)',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 7l3.5 3.5L12 3" />
                      </svg>
                    </span>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-text-2)',
                        lineHeight: 1.5,
                      }}
                    >
                      {signal}
                    </p>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>

          {/* RIGHT: Form panel */}
          <AnimateIn delay={120} direction="right">
            <div
              style={{
                background: 'var(--color-bg-2)',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                padding: '2.5rem',
              }}
            >
              <ContactForm dark />
            </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  )
}
