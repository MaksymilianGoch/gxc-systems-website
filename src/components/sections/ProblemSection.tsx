import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function ProblemSection() {
  return (
    <section className="section-y" style={{ background: 'var(--color-bg-2)' }}>
      <Container>
        <AnimateIn>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.03em', marginBottom: '0.875rem' }}>
              Das kostet dich fehlende Struktur.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-2)', maxWidth: '38rem', margin: '0 auto' }}>
              Chaos ist kein Schicksal, sondern ein fehlendes System. Wir ersetzen manuelle Hektik durch automatisierte Präzision.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Chaos */}
          <AnimateIn delay={80}>
            <div style={{ background: 'var(--color-bg-1)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', opacity: 0.07 }}>
                <span className="material-symbols-outlined" style={{ fontSize: '7rem', color: 'var(--color-red)' }}>error</span>
              </div>
              <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-red)', marginBottom: '1rem' }}>Status: Chaos</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>Gestreute Anfragen</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { title: 'WhatsApp & Notizzettel', desc: 'Anfragen gehen verloren, weil sie niemand zentral erfasst.' },
                  { title: 'Stundenlanges Telefonieren', desc: 'Manuelle Terminabsprachen binden 8–12 Std. pro Woche.' },
                ].map((item) => (
                  <li key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: 'var(--color-red)', flexShrink: 0, marginTop: '0.05rem' }}>close</span>
                    <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.2rem' }}>{item.title}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-3)', lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>

          {/* Right: GXC System */}
          <AnimateIn delay={140}>
            <div style={{ background: 'var(--color-blue)', borderRadius: 'var(--radius-2xl)', padding: '2.5rem', position: 'relative', overflow: 'hidden', boxShadow: '0 24px 64px -12px rgba(0,32,69,0.3)' }}>
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', opacity: 0.08 }}>
                <span className="material-symbols-outlined" style={{ fontSize: '7rem', color: 'white' }}>auto_awesome</span>
              </div>
              <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-green)', marginBottom: '1rem' }}>Status: GXC Inbox</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 600, color: 'white', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>Zentralisierte Effizienz</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { title: 'Ein einziger Eingang', desc: 'Egal woher die Anfrage kommt — sie landet sicher im System.' },
                  { title: 'Autopilot-Terminierung', desc: 'Kunden buchen Termine selbst — synchronisiert mit deinem Kalender.' },
                ].map((item) => (
                  <li key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: 'var(--color-green)', flexShrink: 0, marginTop: '0.05rem' }}>check_circle</span>
                    <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'white', marginBottom: '0.2rem' }}>{item.title}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-blue-light)', lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  )
}
