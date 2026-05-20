'use client'

import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

const steps = [
  { n: '01', title: 'Analyse',      desc: 'Wir verstehen deinen Betrieb, bevor wir bauen.' },
  { n: '02', title: 'Website & Widget', desc: 'Lead-Quelle und Erfassungspunkt werden eingerichtet.' },
  { n: '03', title: 'CRM-Struktur', desc: 'Alle Anfragen zentral, geordnet und sichtbar.' },
  { n: '04', title: 'Automation',   desc: 'Prozesse laufen ohne manuellen Eingriff.' },
]

export function ProcessSection() {
  return (
    <section id="ablauf" className="section-y" style={{ background: 'var(--color-bg)' }}>
      <Container>
        <AnimateIn>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.03em', marginBottom: '0.875rem' }}>
              Vom ersten Klick bis zum Auftrag.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-2)' }}>
              Ein klarer, transparenter Prozess in sieben Schritten.
            </p>
          </div>
        </AnimateIn>

        {/* Step cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5" style={{ marginBottom: '1.5rem' }}>
          {steps.map((step, i) => (
            <AnimateIn key={step.n} delay={i * 70}>
              <div
                style={{
                  background: 'var(--color-bg-1)',
                  border: '1px solid var(--color-border)',
                  borderTop: `4px solid var(--color-blue)`,
                  borderRadius: 'var(--radius-xl)',
                  padding: '1.5rem 1.25rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px -8px rgba(0,32,69,0.12)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <span style={{ position: 'absolute', top: '0.5rem', right: '0.875rem', fontFamily: 'var(--font-display)', fontSize: '4.5rem', fontWeight: 900, color: 'rgba(0,32,69,0.06)', lineHeight: 1, userSelect: 'none' }}>{step.n}</span>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>{step.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-3)', lineHeight: 1.55 }}>{step.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Navy summary bar */}
        <AnimateIn delay={250}>
          <div style={{ background: 'var(--color-blue)', borderRadius: 'var(--radius-2xl)', padding: '1.75rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }} className="md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div>
                <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-blue-light)', marginBottom: '0.25rem' }}>Projektdauer</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>3–4 Wochen</p>
              </div>
              <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.12)' }} className="hidden md:block" />
              <div>
                <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-blue-light)', marginBottom: '0.25rem' }}>Live-Betrieb</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>Ab Woche 4</p>
              </div>
            </div>
            <a
              href="#kontakt"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-green)', color: 'var(--color-blue)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', padding: '0.875rem 1.75rem', borderRadius: 'var(--radius-xl)', transition: 'transform 0.15s ease', whiteSpace: 'nowrap', flexShrink: 0 }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
            >
              Ablauf besprechen
            </a>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
