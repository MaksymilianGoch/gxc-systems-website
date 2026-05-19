import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'
import type { Testimonial } from '@/types/content'

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

interface TestimonialsSectionProps { testimonials: Testimonial[] }

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section
      id="ergebnisse"
      className="section-y"
      style={{ background: 'var(--color-cream)' }}
      aria-labelledby="testimonials-heading"
    >
      <Container>
        <AnimateIn>
          <div className="mb-14 pb-10" style={{ borderBottom: '1px solid var(--color-line)' }}>
            <div className="rule-gold mb-5" />
            <p className="text-label mb-3">Referenzen</p>
            <h2 id="testimonials-heading" className="text-display-sm max-w-lg" style={{ color: 'var(--color-text)' }}>
              Was Betriebe nach 30 Tagen berichten.
            </h2>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: 'var(--color-line)' }}>
          {testimonials.map((t, i) => (
            <AnimateIn key={t.id} delay={i * 100}>
              <figure
                className="p-8 flex flex-col gap-6 h-full"
                style={{ background: 'var(--color-surface)' }}
              >
                {/* Large quote mark */}
                <span
                  className="text-5xl leading-none select-none"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold)', opacity: 0.5 }}
                  aria-hidden="true"
                >
                  &#8220;
                </span>

                <blockquote className="flex-1">
                  <p
                    className="text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', fontStyle: 'italic', fontWeight: 400 }}
                  >
                    {t.quote}
                  </p>
                </blockquote>

                <figcaption
                  className="flex items-center gap-3 pt-5"
                  style={{ borderTop: '1px solid var(--color-line)' }}
                >
                  <div
                    className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0"
                    style={{ background: 'var(--color-navy)' }}
                  >
                    <span
                      className="text-xs font-bold text-white"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {getInitials(t.name)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-soft)' }}>
                      {t.role}, {t.company}
                    </p>
                  </div>
                  <span
                    className="ml-auto text-xs px-2 py-1"
                    style={{
                      color: 'var(--color-teal)',
                      background: 'color-mix(in srgb, var(--color-teal) 8%, transparent)',
                      border: '1px solid color-mix(in srgb, var(--color-teal) 20%, transparent)',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {t.projectType.split(' ')[0]}
                  </span>
                </figcaption>
              </figure>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
