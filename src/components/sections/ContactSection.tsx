import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { ContactForm } from './ContactForm'

const trustPoints = [
  { index: '01', text: 'Direkte Antwort in unter 4 Stunden an Werktagen' },
  { index: '02', text: '30 Tage kostenlose Anpassungsphase nach Go-Live' },
  { index: '03', text: 'Die Systeme gehören Ihnen — kein Lock-in' },
]

export function ContactSection() {
  return (
    <section
      id="kontakt"
      className="dark-section"
      style={{ paddingTop: 'clamp(5rem, 9vw, 7rem)', paddingBottom: 'clamp(5rem, 9vw, 7rem)' }}
      aria-labelledby="contact-heading"
    >
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left: Context + trust */}
          <div className="lg:col-span-5">
            <AnimateIn>
              <div
                className="h-px w-10 mb-6"
                style={{ background: 'var(--color-gold)' }}
              />
              <p
                className="text-xs font-semibold tracking-[0.14em] uppercase mb-5"
                style={{ color: 'var(--color-teal-light)' }}
              >
                Erstgespräch
              </p>
              <h2
                id="contact-heading"
                className="text-display-sm mb-6"
                style={{ color: 'white', letterSpacing: '-0.03em' }}
              >
                Bereit für
                <br />
                operative Klarheit?
              </h2>
              <p
                className="text-base leading-relaxed mb-12"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                30 Minuten. Kein Pitch. Sie bekommen eine ehrliche Analyse,
                welche Prozesse in Ihrem Betrieb sofort automatisiert werden können.
              </p>
            </AnimateIn>

            <AnimateIn delay={100}>
              <div className="space-y-5">
                {trustPoints.map((p) => (
                  <div
                    key={p.index}
                    className="flex items-start gap-4 pb-5"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <span
                      className="text-xs shrink-0 mt-0.5 w-5"
                      style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}
                    >
                      {p.index}
                    </span>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{p.text}</p>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <AnimateIn delay={120} direction="right">
              <div
                className="p-8 md:p-10"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: '2px',
                }}
              >
                <ContactForm dark />
              </div>
            </AnimateIn>
          </div>
        </div>
      </Container>
    </section>
  )
}
