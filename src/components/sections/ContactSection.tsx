import { AnimateIn } from '@/components/ui/AnimateIn'
import { Container } from '@/components/ui/Container'
import { ContactForm } from './ContactForm'

const trustSignals = [
  '30 Minuten — strukturiert und effizient',
  'Kein Pitch, keine Folien, kein Sales-Druck',
  'Du behältst 100% Eigentum an deinen Daten & Systemen',
  'Wenn es nicht passt, sagen wir das ehrlich',
]

export function ContactSection() {
  return (
    <section
      id="kontakt"
      className="section-y"
      style={{ background: 'var(--color-bg-1)' }}
      aria-labelledby="contact-heading"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* Left: Copy + trust signals */}
          <div>
            <AnimateIn>
              <span className="accent-line" aria-hidden="true" />
              <p className="text-label mb-4">Systemgespräch buchen</p>
              <h2
                id="contact-heading"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.875rem, 3.5vw, 3rem)',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  marginBottom: '1.25rem',
                }}
              >
                Lass uns über dein
                <br />
                System sprechen.
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--color-text-2)',
                  lineHeight: 1.75,
                  marginBottom: '2.5rem',
                }}
              >
                30 Minuten, unverbindlich, kostenlos.
                Wir schauen uns deinen Betrieb an und sagen dir ehrlich, wo das größte Leck ist
                und was realistisch möglich ist.
                <br /><br />
                Kein ungebetenes Angebot danach. Kein Druck.
                Wenn es nicht passt, sagen wir das auch klar.
              </p>
            </AnimateIn>

            <AnimateIn delay={80}>
              <div style={{ borderTop: '1px solid var(--color-border)' }}>
                {trustSignals.map((signal, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.875rem',
                      padding: '0.9rem 0',
                      borderBottom: '1px solid var(--color-border)',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        width: '20px',
                        height: '20px',
                        background: 'rgba(23,59,92,0.07)',
                        border: '1px solid rgba(23,59,92,0.14)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="var(--color-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-2)', lineHeight: 1.5 }}>
                      {signal}
                    </p>
                  </div>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn delay={150}>
              <div
                style={{
                  marginTop: '2rem',
                  padding: '1.25rem',
                  background: 'var(--color-bg-2)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                }}
              >
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-3)', marginBottom: '0.5rem' }}>
                  Reaktionszeit
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-2)', lineHeight: 1.6 }}>
                  Innerhalb von <strong style={{ color: 'var(--color-text)' }}>4 Stunden</strong> an Werktagen.
                  Falls dringend:{' '}
                  <a href="mailto:office@gxc-systems.com" style={{ color: 'var(--color-blue)', textDecoration: 'underline' }}>
                    office@gxc-systems.com
                  </a>
                </p>
              </div>
            </AnimateIn>
          </div>

          {/* Right: Form panel */}
          <AnimateIn delay={120} direction="right">
            <div
              style={{
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '2.25rem',
                boxShadow: '0 4px 24px -8px rgba(0,0,0,0.06)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  letterSpacing: '-0.025em',
                  marginBottom: '1.5rem',
                }}
              >
                Systemgespräch anfragen
              </h3>
              <ContactForm />
            </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  )
}
