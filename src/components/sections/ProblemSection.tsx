import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

const problems = [
  {
    index: '01',
    title: 'Anfragen verschwinden.',
    body: 'WhatsApp, E-Mail, Anruf — keine zentrale Erfassung. Jeder dritte Kontakt geht verloren, bevor er zum Lead wird.',
  },
  {
    index: '02',
    title: 'Termine kosten unnötig Zeit.',
    body: 'Durchschnittlich 22 Minuten pro Buchung durch manuelle Koordination. Täglich.',
  },
  {
    index: '03',
    title: 'Angebote werden nicht nachgefasst.',
    body: 'Ohne automatisches Follow-up entscheiden sich 70% der Interessenten für die Konkurrenz — einfach weil diese schneller reagiert.',
  },
  {
    index: '04',
    title: 'Wachstum bricht das System.',
    body: 'Mehr Aufträge erzeugen mehr Chaos. Ohne Infrastruktur skaliert nur der Stresslevel.',
  },
]

export function ProblemSection() {
  return (
    <section
      className="section-y"
      style={{ background: 'var(--color-cream)' }}
      aria-labelledby="problem-heading"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left: Framing */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <AnimateIn>
              <div className="rule-gold mb-6" />
              <p className="text-label mb-4">Das Problem</p>
              <h2 id="problem-heading" className="text-display-sm mb-6" style={{ color: 'var(--color-text)' }}>
                Warum gute Betriebe Umsatz verlieren.
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-mid)' }}>
                Nicht wegen schlechter Arbeit. Wegen fehlender Systeminfrastruktur.
              </p>
            </AnimateIn>
          </div>

          {/* Right: Problem list */}
          <div className="lg:col-span-8 space-y-0">
            {problems.map((p, i) => (
              <AnimateIn key={p.index} delay={i * 80}>
                <div
                  className="py-8 flex gap-8 items-start"
                  style={{
                    borderBottom: i < problems.length - 1 ? '1px solid var(--color-line)' : 'none',
                  }}
                >
                  <span
                    className="text-xs shrink-0 mt-1 w-6"
                    style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}
                  >
                    {p.index}
                  </span>
                  <div>
                    <h3
                      className="font-semibold mb-2 text-lg"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', letterSpacing: '-0.015em' }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-mid)' }}>
                      {p.body}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
