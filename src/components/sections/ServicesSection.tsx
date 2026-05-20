import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

const modules = [
  {
    id: 'm1',
    index: '01',
    iconPath: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    title: 'Website',
    outcome: 'Deine Lead-Quelle ist strukturiert.',
    detail: 'Anfragen werden aktiv erfasst und sofort ins System geleitet — nicht in einem Kontaktformular vergessen.',
  },
  {
    id: 'm2',
    index: '02',
    iconPath: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
    title: 'Kontakt-Widget',
    outcome: 'Anfragen entstehen überall auf deiner Website.',
    detail: 'Das Widget ist auf jeder Unterseite sichtbar und einsatzbereit — nicht nur auf der Kontaktseite.',
  },
  {
    id: 'm3',
    index: '03',
    iconPath: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
    title: 'CRM',
    outcome: 'Du hast eine zentrale Übersicht über alles.',
    detail: 'Jeder Lead, Auftrag und Status an einem Ort — kein Suchen in Mails, kein verlorenes Excel.',
  },
  {
    id: 'm4',
    index: '04',
    iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    title: 'Automation',
    outcome: 'Prozesse laufen von selbst.',
    detail: 'Workflows tun zur richtigen Zeit das Richtige — ohne manuelles Weiterleiten, Erinnern oder Koordinieren.',
  },
  {
    id: 'm5',
    index: '05',
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Follow-up',
    outcome: 'Nichts wird vergessen.',
    detail: 'Automatische Reminder und Sequenzen sorgen dafür, dass kein Lead kühlt und kein Termin verloren geht.',
  },
  {
    id: 'm6',
    index: '06',
    iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Reporting',
    outcome: 'Du siehst, was funktioniert.',
    detail: 'Monatliche Reports mit klaren Metriken und konkreten Empfehlungen — keine Blackbox.',
  },
]

export function ServicesSection() {
  return (
    <section
      id="leistungen"
      className="section-y"
      style={{ background: 'var(--color-bg-1)' }}
      aria-labelledby="services-heading"
    >
      <Container>
        <AnimateIn>
          <div style={{ maxWidth: '42rem', marginBottom: '3rem' }}>
            <span className="accent-line" />
            <p className="text-label mb-4">6 Module — ein System</p>
            <h2
              id="services-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.875rem, 3.5vw, 3rem)',
                fontWeight: 700,
                color: 'var(--color-text)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                marginBottom: '0.875rem',
              }}
            >
              Jedes Modul löst ein
              <br />
              spezifisches Problem.
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-2)', lineHeight: 1.7 }}>
              Zusammen funktioniert dein Betrieb ohne Chaos.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m, i) => (
            <AnimateIn key={m.id} delay={i * 60}>
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      background: 'rgba(23,59,92,0.06)',
                      border: '1px solid rgba(23,59,92,0.12)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={m.iconPath} />
                    </svg>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-border-3)', letterSpacing: '0.1em' }}>
                    {m.index}
                  </span>
                </div>

                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--color-text)',
                      letterSpacing: '-0.02em',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {m.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--color-blue)',
                      letterSpacing: '-0.01em',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {m.outcome}
                  </p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-2)', lineHeight: 1.6 }}>
                    {m.detail}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={180}>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-3)', marginBottom: '1.25rem' }}>
              Wir beginnen dort, wo dein größtes Leck ist — nicht mit allen 6 auf einmal.
            </p>
            <a href="#kontakt" className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.875rem 2rem' }}>
              Größtes Leck finden →
            </a>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
