'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

const nodes = [
  {
    id: 'n1',
    index: '01',
    label: 'Anfrage erfasst',
    color: '#2563EB',
    iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    explain: {
      headline: 'Anfrage erfasst',
      text: 'Egal wie die Anfrage kommt — Website, Telefon, WhatsApp, E-Mail oder Chat. Alle Kanäle landen sofort und vollständig im System. Nichts geht verloren.',
      bullets: ['Website-Formular & Chat-Widget', 'Telefon-Ansage & Voicemail', 'E-Mail & WhatsApp', 'Alle Kanäle, ein Posteingang'],
      time: '< 30 Sekunden bis Erfassung',
    },
  },
  {
    id: 'n2',
    index: '02',
    label: 'Klassifizierung',
    color: '#7C3AED',
    iconPath: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    explain: {
      headline: 'Klassifizierung & Routing',
      text: 'Was braucht der Kunde? Reparatur, Beratung, Notfall? Das System versteht die Anfrage und leitet sie automatisch in die richtige Queue.',
      bullets: ['Art der Anfrage erkannt', 'Dringlichkeit eingeschätzt', 'Zuständige Person benachrichtigt', 'Keine manuelle Sortierung nötig'],
      time: 'Sofort, automatisch',
    },
  },
  {
    id: 'n3',
    index: '03',
    label: 'CRM-Eintrag',
    color: '#0891B2',
    iconPath: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
    explain: {
      headline: 'CRM-Eintrag erstellt',
      text: 'Alle Daten zentral erfasst: Name, Kontakt, Problem, Dringlichkeit, Status. Dein Team sieht jeden Lead auf einen Blick — nicht in drei verschiedenen Apps.',
      bullets: ['Kontaktdaten vollständig', 'Problem & Dringlichkeit notiert', 'Status: Neu / In Bearbeitung / Abgeschlossen', 'Verlauf dokumentiert'],
      time: 'Daten direkt verfügbar',
    },
  },
  {
    id: 'n4',
    index: '04',
    label: 'Team-Benachrichtigung',
    color: '#D97706',
    iconPath: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    explain: {
      headline: 'Team wird benachrichtigt',
      text: 'Dein Team kriegt sofort Bescheid — per E-Mail, Slack, oder direkt aufs Handy. Du entscheidest, wer was wann bekommt.',
      bullets: ['Push-Notification aufs Handy', 'E-Mail mit allen Details', 'Slack / Teams (optional)', 'Priorität sichtbar'],
      time: 'Innerhalb von Sekunden',
    },
  },
  {
    id: 'n5',
    index: '05',
    label: 'Automatische Antwort',
    color: '#10B981',
    iconPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    explain: {
      headline: 'Automatische Bestätigung',
      text: 'Dein Kunde kriegt sofort eine Antwort — auch um 22:00 Uhr. Termin-Link, Rückruf-Zeit, oder kurze Bestätigung. Keine Verzögerung, kein leerer Bildschirm.',
      bullets: ['Sofortantwort (unter 2 Minuten)', 'Termin-Link optional beigelegt', 'Personalisiert auf Anfrage-Typ', 'Kein generisches „Danke" — echte Info'],
      time: 'Antwort unter 2 Minuten',
    },
  },
  {
    id: 'n6',
    index: '06',
    label: 'Follow-up & Tracking',
    color: '#2563EB',
    iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    explain: {
      headline: 'Follow-up & Tracking',
      text: 'Erinnerungen, Nachverfolgungen, Reports. Alles automatisiert — nichts wird vergessen. Du siehst jeden Monat in einer Seite, was funktioniert.',
      bullets: ['Automatische Reminder', 'Offene Leads immer sichtbar', 'Monatliches Reporting', 'Optimierungshinweise'],
      time: 'Läuft dauerhaft, automatisch',
    },
  },
]

export function WorkflowSection() {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  const active = nodes.find((n) => n.id === activeNode)

  return (
    <section
      id="wie-es-funktioniert"
      className="section-y"
      style={{ background: 'var(--color-bg)' }}
      aria-labelledby="workflow-heading"
    >
      <Container>
        <AnimateIn>
          <div style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 3.5rem' }}>
            <span className="accent-line" style={{ margin: '0 auto 1.25rem' }} />
            <p className="text-label mb-4">Wie das System arbeitet</p>
            <h2
              id="workflow-heading"
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
              Dein Kunde hat eine Anfrage.
              <br />
              Das passiert dann:
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)' }}>
              Klick auf einen Schritt für Details.
            </p>
          </div>
        </AnimateIn>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          {/* Nodes row */}
          <AnimateIn delay={80}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
              role="group"
              aria-label="Workflow-Schritte"
            >
              {nodes.map((node, i) => (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                  aria-pressed={activeNode === node.id}
                  aria-controls={`workflow-explain-${node.id}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '1.5rem',
                    background: activeNode === node.id ? 'var(--color-bg-2)' : 'var(--color-bg-1)',
                    borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--color-border)' : 'none',
                    borderBottom: i < 3 ? '1px solid var(--color-border)' : 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.15s ease',
                    position: 'relative',
                  }}
                >
                  {/* Active indicator */}
                  {activeNode === node.id && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: node.color,
                      }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Icon circle */}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: `${node.color}14`,
                      border: `1px solid ${node.color}28`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={node.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={node.iconPath} />
                    </svg>
                  </div>

                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.58rem',
                        color: node.color,
                        letterSpacing: '0.14em',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {node.index}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                      }}
                    >
                      {node.label}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </AnimateIn>

          {/* Explain panel */}
          {active && (
            <AnimateIn key={active.id}>
              <div
                id={`workflow-explain-${active.id}`}
                style={{
                  background: 'var(--color-bg-1)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '2rem',
                  borderLeft: `3px solid ${active.color}`,
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: active.color,
                        marginBottom: '0.5rem',
                      }}
                    >
                      Schritt {active.index}
                    </p>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'var(--color-text)',
                        letterSpacing: '-0.025em',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {active.explain.headline}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-2)', lineHeight: 1.7 }}>
                      {active.explain.text}
                    </p>
                  </div>
                  <div>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                      {active.explain.bullets.map((b) => (
                        <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginTop: '0.15rem', flexShrink: 0 }} aria-hidden="true">
                            <path d="M3 8l4 4 6-6" stroke={active.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-2)', lineHeight: 1.55 }}>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.4rem 0.75rem',
                        background: `${active.color}10`,
                        border: `1px solid ${active.color}25`,
                        borderRadius: '3px',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: active.color, letterSpacing: '0.08em' }}>
                        ⏱ {active.explain.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          )}
        </div>

        {/* Bottom CTA */}
        <AnimateIn delay={200}>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="#kontakt" className="btn-primary" style={{ fontSize: '0.95rem', padding: '1rem 2.25rem' }}>
              System kennenlernen
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
