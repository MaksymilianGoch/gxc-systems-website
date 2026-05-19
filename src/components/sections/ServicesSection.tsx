'use client'

import { useState } from 'react'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { Container } from '@/components/ui/Container'

interface Module {
  index: string
  id: string
  title: string
  tagline: string
  detail: string
  outcomes: string[]
}

const MODULES: Module[] = [
  {
    index: '01',
    id: 'ai-agent-systems',
    title: 'KI-Agenten-Systeme',
    tagline: 'Intelligente Prozessautomatisierung mit eigenständiger Entscheidungsfähigkeit',
    detail:
      'KI-Agenten, die Leads qualifizieren, Anfragen weiterleiten, Abläufe auslösen und Standardkommunikation ohne menschlichen Eingriff abwickeln. Aufgebaut auf Ihrer Geschäftslogik, trainiert auf Ihren Prozessen.',
    outcomes: [
      'Lead-Qualifizierung vollständig automatisiert',
      'Reaktionszeit unter 60 Sekunden',
      'Rund-um-die-Uhr-Verfügbarkeit ohne Personalkosten',
    ],
  },
  {
    index: '02',
    id: 'workflow-automation',
    title: 'Prozessautomatisierung',
    tagline: 'Durchgängige Prozessausführung ohne manuelle Koordination',
    detail:
      'Mehrstufige Abläufe, die von der Anfrage bis zum Ergebnis laufen — Buchungsbestätigungen, Nachverfolgungssequenzen, Statusmeldungen und interne Benachrichtigungen — alle ausgelöst durch Geschäftsereignisse.',
    outcomes: [
      'Keine Nachverfolgung geht verloren',
      'Über 8 Stunden Verwaltungsaufwand pro Woche eingespart',
      'Vollständiges Protokoll aller Vorgänge',
    ],
  },
  {
    index: '03',
    id: 'crm-lead-management',
    title: 'CRM & Lead-Management',
    tagline: 'Strukturierte Pipeline vom Erstkontakt bis zum Abschluss',
    detail:
      'Jeder Lead wird erfasst, kategorisiert, zugewiesen und verfolgt. Automatische Statusübergänge, Nachverfolgungserinnerungen und Leistungsberichte sind vom ersten Tag an integriert.',
    outcomes: [
      '100 % Lead-Erfassungsrate',
      'Pipeline-Übersicht in Echtzeit',
      'Keine manuelle Dateneingabe',
    ],
  },
  {
    index: '04',
    id: 'websites-digital-presence',
    title: 'Website & Digitale Präsenz',
    tagline: 'Auf Konversion ausgelegte digitale Infrastruktur',
    detail:
      'Websites, die als operative Systeme gebaut werden — nicht als Broschüren. Von Beginn an integriert mit Lead-Erfassung, CRM-Weiterleitung und Buchungssystemen.',
    outcomes: [
      'Leads werden automatisch erfasst',
      'Reibungsloser Buchungsablauf',
      'Google-Unternehmensprofil optimiert',
    ],
  },
  {
    index: '05',
    id: 'integrations-infrastructure',
    title: 'Integrationen & Infrastruktur',
    tagline: 'Alle Ihre Systeme — verbunden und koordiniert',
    detail:
      'API-Integrationen zwischen Ihren bestehenden Werkzeugen — Kalender, E-Mail, Zahlung, Kommunikation — orchestriert über eine zentrale Automatisierungsschicht.',
    outcomes: [
      'Manuelle Synchronisation entfällt',
      'Einheitliche Datenquelle',
      'Skalierbar ohne zusätzliches Personal',
    ],
  },
]

export function ServicesSection() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="leistungen"
      className="section-y"
      style={{ background: 'var(--color-bg-1)' }}
      aria-labelledby="services-heading"
    >
      <Container>
        {/* Header */}
        <AnimateIn>
          <div className="mb-14 max-w-2xl">
            <span className="accent-line" aria-hidden="true" />
            <p className="text-label mb-4">OPERATIVE MODULE</p>
            <h2
              id="services-heading"
              className="text-display-sm mb-5"
              style={{ color: 'var(--color-text)' }}
            >
              Fünf Module.
              <br />
              Ein Betriebssystem für Ihren Betrieb.
            </h2>
            <p style={{ color: 'var(--color-text-2)', fontSize: '1rem', lineHeight: 1.7 }}>
              Jedes Modul löst ein konkretes operatives Problem. Gemeinsam beseitigen sie die
              Reibung zwischen Kundenabsicht und Geschäftsergebnis.
            </p>
          </div>
        </AnimateIn>

        {/* Module list */}
        <div
          role="list"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          {MODULES.map((mod, i) => {
            const isOpen = openId === mod.id
            return (
              <AnimateIn key={mod.id} delay={i * 50}>
                <div
                  role="listitem"
                  style={{
                    borderBottom: '1px solid var(--color-border)',
                    background: isOpen ? 'var(--color-bg-2)' : 'var(--color-bg-1)',
                    borderLeft: isOpen
                      ? '2px solid var(--color-blue)'
                      : '2px solid transparent',
                    transition: 'background 0.25s ease, border-color 0.2s ease',
                  }}
                >
                  {/* Row trigger */}
                  <button
                    type="button"
                    onClick={() => toggle(mod.id)}
                    aria-expanded={isOpen}
                    aria-controls={`module-detail-${mod.id}`}
                    className="w-full text-left"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      padding: '1.5rem 1.5rem 1.5rem 1.25rem',
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!isOpen) {
                        ;(e.currentTarget.parentElement as HTMLElement).style.borderBottomColor =
                          'var(--color-border-2)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isOpen) {
                        ;(e.currentTarget.parentElement as HTMLElement).style.borderBottomColor =
                          'var(--color-border)'
                      }
                    }}
                  >
                    {/* Index */}
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--color-blue)',
                        letterSpacing: '0.08em',
                        flexShrink: 0,
                        width: '2rem',
                      }}
                    >
                      {mod.index}
                    </span>

                    {/* Title + tagline */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                          fontWeight: 600,
                          color: 'var(--color-text)',
                          letterSpacing: '-0.02em',
                          marginBottom: '0.2rem',
                        }}
                      >
                        {mod.title}
                      </p>
                      <p
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--color-text-2)',
                          lineHeight: 1.5,
                        }}
                      >
                        {mod.tagline}
                      </p>
                    </div>

                    {/* Expand arrow */}
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        color: 'var(--color-text-3)',
                        fontSize: '1rem',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 6l4 4 4-4" />
                      </svg>
                    </span>
                  </button>

                  {/* Expandable detail panel */}
                  <div
                    id={`module-detail-${mod.id}`}
                    role="region"
                    aria-hidden={!isOpen}
                    style={{
                      maxHeight: isOpen ? '600px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    <div
                      style={{
                        padding: '0 1.25rem 2rem 4.5rem',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '0.9rem',
                          color: 'var(--color-text-2)',
                          lineHeight: 1.75,
                          marginBottom: '1.5rem',
                          maxWidth: '56rem',
                        }}
                      >
                        {mod.detail}
                      </p>

                      {/* Outcomes */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.6rem',
                        }}
                      >
                        {mod.outcomes.map((outcome) => (
                          <div
                            key={outcome}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                            }}
                          >
                            <span
                              aria-hidden="true"
                              style={{
                                color: 'var(--color-green)',
                                fontSize: '0.85rem',
                                flexShrink: 0,
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M2 7l3.5 3.5L12 3" />
                              </svg>
                            </span>
                            <span
                              style={{
                                fontSize: '0.85rem',
                                color: 'var(--color-text)',
                                fontWeight: 500,
                              }}
                            >
                              {outcome}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
