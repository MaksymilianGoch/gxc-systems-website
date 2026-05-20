import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

// Content via gemma4, reviewed
const problems = [
  {
    id: 'p1',
    iconPath: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.08 1.18 2 2 0 012.07 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91M18 6L23 1M23 6L18 1',
    headline: 'Anfragen gehen verloren',
    text: 'WhatsApp um 14:00, du siehst sie um 16:30. Zu spät — der Auftrag ist weg. Passiert 2–3 Mal pro Monat, ohne dass du es merkst.',
    impact: '2–4 verpasste Aufträge/Monat',
  },
  {
    id: 'p2',
    iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 5v5l4 2',
    headline: 'Zu langsame Reaktion',
    text: 'Bis dein Team die Anfrage sieht, sind Stunden vergangen. Der First-Responder gewinnt — nicht immer der Bessere.',
    impact: 'First-Responder-Vorteil verloren',
  },
  {
    id: 'p3',
    iconPath: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    headline: 'Manuelle Terminabsprachen',
    text: '„Hast du Montag Zeit?" — 8–12 Stunden pro Woche reine Koordination. Dein Team telefoniert statt zu arbeiten.',
    impact: '8–12 Stunden/Woche verloren',
  },
  {
    id: 'p4',
    iconPath: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
    headline: 'Informationen überall',
    text: 'Anfragen in WhatsApp, Mails, Zetteln, Excel. Kein zentrales System. Dein Team sucht statt zu liefern.',
    impact: 'Fehler, Lücken, Frustration',
  },
  {
    id: 'p5',
    iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    headline: 'Keine Nachverfolgung',
    text: '„Hatten wir nicht noch einen Interessenten?" Follow-up passiert nur, wenn jemand erinnert. Leads kühlen aus und werden vergessen.',
    impact: 'Verpasste Folgegeschäfte',
  },
]

export function ProblemSection() {
  return (
    <section
      id="probleme"
      className="section-y"
      style={{ background: 'var(--color-bg-1)' }}
      aria-labelledby="problem-heading"
    >
      <Container>
        <AnimateIn>
          <div style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 3.5rem' }}>
            <span className="accent-line" style={{ margin: '0 auto 1.25rem' }} />
            <p className="text-label mb-4">Warum du täglich Umsatz verlierst</p>
            <h2
              id="problem-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.875rem, 3.5vw, 3rem)',
                fontWeight: 700,
                color: 'var(--color-text)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                marginBottom: '1rem',
              }}
            >
              Das kostet dich fehlende Struktur —
              <br />
              jeden Tag.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-2)', lineHeight: 1.7 }}>
              Fünf Probleme. Alle davon passieren gerade in Betrieben wie deinem.
              Kein Vorwurf — kein System.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <AnimateIn key={p.id} delay={i * 70}>
              <div
                style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  padding: '1.75rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    background: 'rgba(220, 38, 38, 0.06)',
                    border: '1px solid rgba(220, 38, 38, 0.14)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={p.iconPath} />
                  </svg>
                </div>

                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      letterSpacing: '-0.02em',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {p.headline}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-2)', lineHeight: 1.65 }}>
                    {p.text}
                  </p>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.3rem 0.6rem',
                    background: 'rgba(220, 38, 38, 0.06)',
                    border: '1px solid rgba(220, 38, 38, 0.12)',
                    borderRadius: '3px',
                    alignSelf: 'flex-start',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-red)', letterSpacing: '0.06em' }}>
                    {p.impact}
                  </span>
                </div>
              </div>
            </AnimateIn>
          ))}

          {/* Solution card — fills 6th slot */}
          <AnimateIn delay={5 * 70}>
            <div
              style={{
                background: 'var(--color-blue)',
                borderRadius: '6px',
                padding: '1.75rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '0.75rem' }}>
                  Die Lösung
                </p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'white', letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: '0.75rem' }}>
                  Das ist kein Software-Problem.
                  <br />Das ist ein System-Problem.
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.65 }}>
                  GXC löst System-Probleme. Ein Gespräch zeigt dir, wo dein größtes Leck ist.
                </p>
              </div>
              <a
                href="#kontakt"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  background: 'white',
                  color: 'var(--color-blue)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  alignSelf: 'flex-start',
                }}
              >
                Systemgespräch buchen →
              </a>
            </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  )
}
