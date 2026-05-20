'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

const founders = [
  {
    initials: 'MG',
    name: 'Maksymilian Goch',
    role: 'GXC Strategy',
    roleLabel: 'Operations Strategy',
    photo: null,
    tags: ['Founder', 'Vertrieb', 'Technische Integration'],
    bio: 'Maksymilian verantwortet Strategie, Vertrieb und technische Integration bei GXC Systems. Als BWL-Student in Liechtenstein verbindet er betriebswirtschaftliches Denken mit dem Aufbau operativer Systeme für lokale Betriebe.',
    details: [
      { icon: 'school',      text: 'BWL Student — Liechtenstein' },
      { icon: 'handshake',   text: 'Vertrieb & Kundenbeziehungen' },
      { icon: 'integration_instructions', text: 'Technische Integration' },
      { icon: 'lightbulb',   text: 'Strategie & Systemdesign' },
    ],
  },
  {
    initials: 'AC',
    name: 'Ariel Creuz',
    role: 'GXC Technology',
    roleLabel: 'Systems Architect',
    photo: null,
    tags: ['Co-Founder', 'CTO', 'Implementierung'],
    bio: 'Ariel ist Co-Founder und CTO von GXC Systems. Als HTLer mit tiefem technischen Fundament übernimmt er Technik-Integration, Systemoptimierung und die vollständige Implementierung der operativen Infrastruktur.',
    details: [
      { icon: 'terminal',     text: 'HTL-Absolvent · Technische Ausbildung' },
      { icon: 'engineering',  text: 'CTO & Systemarchitektur' },
      { icon: 'tune',         text: 'Optimierung & Automatisierung' },
      { icon: 'build',        text: 'Implementierung & Integration' },
    ],
  },
]

const CASE_STUDIES = [
  { tag: 'Elektrobetrieb', title: 'Installateur Vorarlberg', metric: '+42%', metricLabel: 'Lead-Konvertierung', desc: 'Früher versackten Anfragen in der Mailbox. Heute bekommt jeder Kunde innerhalb von 2 Minuten eine Antwort. Pro Woche werden 15 Stunden Admin-Zeit gespart.', stats: [{ v: '85%', l: 'Automatisierung' }, { v: '< 5 Min', l: 'Response-Time' }, { v: '60+', l: 'Leads / Monat' }] },
  { tag: 'Haustechnik', title: 'Elektro Liechtenstein', metric: '−70%', metricLabel: 'Admin-Aufwand', desc: 'Die zentrale GXC Inbox hat das Chaos beendet. Jeder Techniker weiß genau, was als nächstes zu tun ist.', stats: [{ v: '100%', l: 'Transparenz' }, { v: '0%', l: 'Datenverlust' }, { v: '3.5x', l: 'ROI (Y1)' }] },
]

function FounderCard({ founder, isSelected, onClick }: { founder: typeof founders[0]; isSelected: boolean; onClick: () => void }) {
  return (
    <div>
      {/* Photo card — clickable */}
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isSelected}
        style={{
          width: '100%',
          aspectRatio: '4/5',
          borderRadius: 'var(--radius-2xl)',
          overflow: 'hidden',
          position: 'relative',
          cursor: 'pointer',
          border: 'none',
          padding: 0,
          display: 'block',
          boxShadow: isSelected
            ? '0 0 0 3px #4ade80, 0 20px 60px -12px rgba(0,9,27,0.5)'
            : '0 16px 48px -12px rgba(0,9,27,0.4)',
          transition: 'box-shadow 0.25s ease, transform 0.22s ease',
          transform: isSelected ? 'translateY(-4px)' : 'none',
        }}
      >
        {/* Dark navy background */}
        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg, #0a1a35 0%, #0d2040 50%, #122d54 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {/* Subtle grid overlay */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} aria-hidden="true" />
          {/* Orb */}
          <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '60%', height: '40%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} aria-hidden="true" />

          {/* Initials */}
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', fontWeight: 700, color: 'rgba(255,255,255,0.18)', letterSpacing: '-0.05em', position: 'relative', zIndex: 1, userSelect: 'none' }}>
            {founder.initials}
          </span>

          {/* Click hint */}
          {!isSelected && (
            <div style={{ position: 'absolute', top: '0.875rem', right: '0.875rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-lg)', padding: '0.3rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>touch_app</span>
              <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>PROFIL</span>
            </div>
          )}
        </div>

        {/* Name overlay */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 1.25rem', background: 'linear-gradient(to top, rgba(0,9,27,0.9) 0%, transparent 100%)' }}>
          <p style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem', textAlign: 'left' }}>{founder.name}</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', textAlign: 'left' }}>{founder.roleLabel}</p>
        </div>
      </button>

      {/* Bio panel — expands below card */}
      {isSelected && (
        <div
          style={{
            marginTop: '0.875rem',
            background: 'white',
            border: '1px solid var(--color-border)',
            borderTop: '2px solid #4ade80',
            borderRadius: 'var(--radius-xl)',
            padding: '1.25rem',
            boxShadow: '0 8px 32px -8px rgba(0,32,69,0.12)',
            animation: 'bioSlideDown 0.3s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <style>{`@keyframes bioSlideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}`}</style>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.875rem' }}>
            {founder.tags.map((t) => (
              <span key={t} style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', fontWeight: 700, padding: '0.18rem 0.55rem', background: 'rgba(0,32,69,0.07)', border: '1px solid rgba(0,32,69,0.14)', borderRadius: 'var(--radius-full)', color: 'var(--color-blue)' }}>{t}</span>
            ))}
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-2)', lineHeight: 1.7, marginBottom: '1rem' }}>{founder.bio}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {founder.details.map((d) => (
              <div key={d.text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '0.875rem', color: '#4ade80', flexShrink: 0 }}>{d.icon}</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-2)' }}>{d.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function FoundersSection() {
  const [selectedFounder, setSelectedFounder] = useState<number | null>(null)

  return (
    <section id="ueber-uns" className="section-y" style={{ background: 'var(--color-bg)' }}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

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

              <div style={{ padding: '1rem', background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: '#4ade80', marginTop: '0.1rem', flexShrink: 0 }}>touch_app</span>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-2)' }}>
                  Klicke auf ein Profil, um mehr über Rolle und Hintergrund zu erfahren.
                </p>
              </div>

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
                  <FounderCard
                    founder={f}
                    isSelected={selectedFounder === i}
                    onClick={() => setSelectedFounder(selectedFounder === i ? null : i)}
                  />
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>

        {/* Case studies */}
        <div id="ergebnisse" style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid var(--color-border)' }}>
          <AnimateIn>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
                Pilot-Ergebnisse.
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-2)' }}>Beispielhafte Systemeffekte aus typischen Einsatzszenarien.</p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CASE_STUDIES.map((cs) => (
              <AnimateIn key={cs.title} delay={80}>
                <div style={{ background: 'var(--color-bg-2)', borderRadius: 'var(--radius-2xl)', padding: '2rem', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ display: 'inline-block', background: 'var(--color-green)', color: '#0a1a35', fontSize: '0.62rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>{cs.tag}</span>
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
                  <p style={{ fontSize: '0.68rem', color: 'var(--color-text-3)', marginTop: '0.875rem', fontStyle: 'italic' }}>Ergebnisse aus Pilotprojekten. Individuelle Ergebnisse variieren.</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
