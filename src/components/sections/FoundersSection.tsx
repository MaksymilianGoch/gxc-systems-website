'use client'

import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

const founders = [
  { initials: 'MG', name: 'Maksymilian Goch', role: 'GXC Strategy', roleLabel: 'Operations Strategy', photo: null },
  { initials: 'AC', name: 'Ariel Creuz',      role: 'GXC Technology', roleLabel: 'Systems Architect',  photo: null },
]

export function FoundersSection() {
  return (
    <section id="ueber-uns" className="section-y" style={{ background: 'var(--color-bg)' }}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Copy */}
          <AnimateIn direction="left">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-green)' }}>
                Die Architekten
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.04em', lineHeight: 1.05 }}>
                Zwei Köpfe,<br />ein System.
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--color-text-2)', lineHeight: 1.75, maxWidth: '30rem' }}>
                Maksymilian und Ariel kombinieren strategische Prozessberatung mit Technologieentwicklung, um den Betrieb auf Autopilot Realität werden zu lassen.
              </p>
              <div className="grid grid-cols-2 gap-4" style={{ marginTop: '0.5rem' }}>
                {founders.map((f) => (
                  <div key={f.name} style={{ background: 'var(--color-bg-1)', padding: '0.875rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', boxShadow: '0 2px 8px rgba(0,32,69,0.04)' }}>
                    <p style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: '0.25rem' }}>{f.role}</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-blue)' }}>{f.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Right: Photo cards */}
          <AnimateIn delay={120}>
            <div className="grid grid-cols-2 gap-4">
              {founders.map((f, i) => (
                <div key={f.name} style={{ marginTop: i === 1 ? '3rem' : 0 }}>
                  <div style={{ aspectRatio: '4/5', background: 'var(--color-bg-3)', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', position: 'relative', boxShadow: '0 16px 48px -12px rgba(0,32,69,0.18)' }}>
                    {/* Placeholder — waiting for real photos */}
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(145deg, var(--color-bg-3) 0%, var(--color-bg-4) 100%)' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 700, color: 'var(--color-text-3)' }}>{f.initials}</span>
                    </div>
                    {/* Overlay */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem', background: 'linear-gradient(to top, rgba(0,9,27,0.85) 0%, transparent 100%)' }}>
                      <p style={{ color: 'white', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.125rem' }}>{f.name}</p>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>{f.roleLabel}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>

        </div>

        {/* Pilot cards — ergebnisse section */}
        <div id="ergebnisse" style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid var(--color-border)' }}>
          <AnimateIn>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
                Pilot-Ergebnisse.
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-2)' }}>
                Beispielhafte Systemeffekte aus typischen Einsatzszenarien.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { tag: 'Elektrobetrieb', title: 'Installateur Vorarlberg', metric: '+42%', metricLabel: 'Lead-Konvertierung', desc: 'Früher sind Anfragen in der Mailbox versackt. Heute bekommt jeder Kunde innerhalb von 2 Minuten eine Antwort. Pro Woche werden 15 Stunden Admin-Zeit gespart.', stats: [{ v: '85%', l: 'Automatisierung' }, { v: '< 5 Min', l: 'Response-Time' }, { v: '60+', l: 'Leads / Monat' }] },
              { tag: 'Haustechnik', title: 'Elektro Liechtenstein', metric: '−70%', metricLabel: 'Admin-Aufwand', desc: 'Die zentrale GXC Inbox hat das Chaos beendet. Jeder Techniker weiß genau, was als nächstes zu tun ist. Keine Rückfragen, keine verlorenen Notizen.', stats: [{ v: '100%', l: 'Transparenz' }, { v: '0%', l: 'Datenverlust' }, { v: '3.5x', l: 'ROI (Y1)' }] },
            ].map((cs) => (
              <AnimateIn key={cs.title} delay={80}>
                <div style={{ background: 'var(--color-bg-2)', borderRadius: 'var(--radius-2xl)', padding: '2rem', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ display: 'inline-block', background: 'var(--color-green)', color: 'var(--color-blue-dim)', fontSize: '0.62rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>{cs.tag}</span>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>{cs.title}</h4>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-green)' }}>{cs.metric}</p>
                      <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-3)', fontWeight: 700 }}>{cs.metricLabel}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-2)', lineHeight: 1.65, marginBottom: '1.25rem', fontStyle: 'italic' }}>&bdquo;{cs.desc}&ldquo;</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                    {cs.stats.map((s) => (
                      <div key={s.l}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-blue)', marginBottom: '0.125rem' }}>{s.v}</p>
                        <p style={{ fontSize: '0.68rem', color: 'var(--color-text-3)' }}>{s.l}</p>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.68rem', color: 'var(--color-text-3)', marginTop: '0.875rem', fontStyle: 'italic' }}>Ergebnisse basieren auf Pilotprojekten. Tatsächliche Ergebnisse hängen von Betrieb und Ausgangssituation ab.</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
