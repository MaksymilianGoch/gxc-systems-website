'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

// ── Node data ─────────────────────────────────────────────────────────────
const nodes = [
  {
    id: 'n1',
    index: '01',
    label: 'Anfrage\nempfangen',
    typeLabel: 'TRIGGER',
    typeColor: '#2F7D5A',
    iconPath: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
    explain: {
      headline: 'Anfrage empfangen',
      text: 'Jeder Kanal landet hier: Website-Formular, Telefon, WhatsApp, E-Mail. Das System erkennt die Anfrage sofort — nichts geht verloren, auch nicht nachts oder am Wochenende.',
      bullets: ['Website & Chat-Widget', 'Telefon & Voicemail', 'E-Mail & WhatsApp', 'Erfassung in unter 30 Sekunden'],
    },
  },
  {
    id: 'n2',
    index: '02',
    label: 'Daten\nprüfen',
    typeLabel: 'FILTER',
    typeColor: '#C9822B',
    iconPath: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
    explain: {
      headline: 'Daten prüfen',
      text: 'Was braucht der Kunde? Welche Dringlichkeit? Das System erkennt Art und Priorität der Anfrage automatisch und sortiert sie in die richtige Queue — ohne manuelles Eingreifen.',
      bullets: ['Art der Anfrage erkannt', 'Dringlichkeit eingestuft', 'Vollständigkeit geprüft', 'Automatisches Routing'],
    },
  },
  {
    id: 'n3',
    index: '03',
    label: 'CRM-Eintrag\nerstellen',
    typeLabel: 'ACTION',
    typeColor: '#173B5C',
    iconPath: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
    explain: {
      headline: 'CRM-Eintrag erstellen',
      text: 'Alle Daten werden zentral gespeichert. Name, Kontakt, Problem, Dringlichkeit, Status — ein Eintrag, der den gesamten Auftragsverlauf dokumentiert. Kein Post-it, kein verlorenes Excel.',
      bullets: ['Kontaktdaten vollständig', 'Problem & Priorität notiert', 'Status: Neu / Aktiv / Abgeschlossen', 'Verlauf dauerhaft sichtbar'],
    },
  },
  {
    id: 'n4',
    index: '04',
    label: 'Team\ninformieren',
    typeLabel: 'NOTIFY',
    typeColor: '#2F7D5A',
    iconPath: 'M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0',
    explain: {
      headline: 'Team informieren',
      text: 'Die zuständige Person bekommt sofort Bescheid — per E-Mail, direkt aufs Handy oder in Slack. Reaktionszeit unter 2 Minuten, auch wenn gerade jemand auf der Baustelle ist.',
      bullets: ['Push-Benachrichtigung ums Handy', 'E-Mail mit allen Details', 'Slack / Teams optional', 'Priorität direkt sichtbar'],
    },
  },
  {
    id: 'n5',
    index: '05',
    label: 'Antwort\nsenden',
    typeLabel: 'OUTPUT',
    typeColor: '#0F4C6B',
    iconPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    explain: {
      headline: 'Antwort senden',
      text: 'Der Kunde bekommt sofort eine Rückmeldung — auch um 22 Uhr. Termin-Link, Rückruf-Zeit oder Bestätigung. Nicht nach Stunden. Nicht „morgen früh".',
      bullets: ['Sofortantwort unter 2 Minuten', 'Termin-Link optional beigelegt', 'Personalisiert auf Anfrage-Typ', 'Kein leeres Postfach beim Kunden'],
    },
  },
  {
    id: 'n6',
    index: '06',
    label: 'Follow-up\nstarten',
    typeLabel: 'SCHEDULE',
    typeColor: '#C9822B',
    iconPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    explain: {
      headline: 'Follow-up starten',
      text: 'Nichts wird vergessen. Das System plant automatisch Erinnerungen, Nachfass-Nachrichten und Status-Updates — so lange, bis der Auftrag abgeschlossen ist.',
      bullets: ['Automatische Reminder', 'Offene Anfragen immer sichtbar', 'Follow-up-Sequenz gestartet', 'Monatliches Reporting'],
    },
  },
]

// ── Node card ─────────────────────────────────────────────────────────────
function NodeCard({
  node,
  isActive,
  onClick,
}: {
  node: (typeof nodes)[0]
  isActive: boolean
  onClick: () => void
}) {
  const lines = node.label.split('\n')
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '0.75rem',
        padding: '1rem',
        width: '148px',
        minWidth: '148px',
        background: isActive ? 'var(--color-bg-1)' : 'var(--color-bg-1)',
        border: `1.5px solid ${isActive ? node.typeColor : 'var(--color-border)'}`,
        borderRadius: '8px',
        cursor: 'pointer',
        textAlign: 'left',
        boxShadow: isActive
          ? `0 0 0 3px ${node.typeColor}18, 0 4px 16px -4px rgba(23,59,92,0.12)`
          : '0 1px 4px -1px rgba(23,59,92,0.06)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Colored top strip — n8n style */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: node.typeColor,
        }}
        aria-hidden="true"
      />

      {/* Type badge */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.52rem',
          letterSpacing: '0.14em',
          color: node.typeColor,
          marginTop: '0.25rem',
        }}
      >
        {node.typeLabel}
      </span>

      {/* Icon */}
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '6px',
          background: `${node.typeColor}12`,
          border: `1px solid ${node.typeColor}28`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={node.typeColor} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d={node.iconPath} />
        </svg>
      </div>

      {/* Label */}
      <div>
        {lines.map((line) => (
          <p
            key={line}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Index */}
      <span
        style={{
          position: 'absolute',
          bottom: '0.625rem',
          right: '0.625rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          color: 'var(--color-border-3)',
          letterSpacing: '0.1em',
        }}
      >
        {node.index}
      </span>
    </button>
  )
}

// ── Main component ────────────────────────────────────────────────────────
export function WorkflowSection() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeNode = nodes.find((n) => n.id === activeId)

  return (
    <section
      id="wie-es-funktioniert"
      className="section-y"
      style={{ background: 'var(--color-bg-1)' }}
      aria-labelledby="workflow-heading"
    >
      <style>{`
        @keyframes packetTravel {
          0%   { left: -4px; opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { left: calc(100% + 4px); opacity: 0; }
        }
        .wf-connector {
          position: relative;
          flex: 1;
          height: 1px;
          background: var(--color-border-2);
          align-self: center;
          margin-top: -1.5rem;
          min-width: 16px;
          overflow: visible;
        }
        .wf-connector::before {
          content: '';
          position: absolute;
          right: -4px;
          top: 50%;
          transform: translateY(-50%);
          border-left: 5px solid var(--color-border-2);
          border-top: 3px solid transparent;
          border-bottom: 3px solid transparent;
        }
        .wf-connector::after {
          content: '';
          position: absolute;
          top: 50%;
          left: -4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-blue);
          transform: translateY(-50%);
          animation: packetTravel 2.4s ease-in-out infinite;
        }
        .wf-connector:nth-of-type(2)::after  { animation-delay: 0s; }
        .wf-connector:nth-of-type(4)::after  { animation-delay: 0.48s; }
        .wf-connector:nth-of-type(6)::after  { animation-delay: 0.96s; }
        .wf-connector:nth-of-type(8)::after  { animation-delay: 1.44s; }
        .wf-connector:nth-of-type(10)::after { animation-delay: 1.92s; }

        /* Mobile: vertical connectors */
        @media (max-width: 900px) {
          .wf-flow { flex-direction: column; align-items: center; }
          .wf-connector {
            width: 1px;
            height: 28px;
            flex: none;
            align-self: center;
            margin-top: 0;
            min-width: unset;
          }
          .wf-connector::before {
            right: unset;
            left: 50%;
            bottom: -4px;
            top: unset;
            transform: translateX(-50%);
            border-left: 3px solid transparent;
            border-right: 3px solid transparent;
            border-top: 5px solid var(--color-border-2);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .wf-connector::after { animation: none; opacity: 0; }
        }
      `}</style>

      <Container>
        <AnimateIn>
          <div style={{ maxWidth: '42rem', marginBottom: '3rem' }}>
            <span className="accent-line" />
            <p className="text-label mb-4">Wie das System arbeitet</p>
            <h2
              id="workflow-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 700,
                color: 'var(--color-text)',
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                marginBottom: '0.75rem',
              }}
            >
              Sechs Schritte. Vollautomatisch.
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-2)', lineHeight: 1.7 }}>
              Klick auf einen Schritt für Details.
            </p>
          </div>
        </AnimateIn>

        {/* ── Node diagram ─────────────────────────────────── */}
        <AnimateIn delay={80}>
          <div
            className="wf-flow"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 0,
              overflowX: 'auto',
              paddingBottom: '0.5rem',
            }}
            role="group"
            aria-label="Workflow-Schritte"
          >
            {nodes.map((node, i) => (
              <>
                <NodeCard
                  key={node.id}
                  node={node}
                  isActive={activeId === node.id}
                  onClick={() => setActiveId(activeId === node.id ? null : node.id)}
                />
                {i < nodes.length - 1 && (
                  <div key={`c-${node.id}`} className="wf-connector" aria-hidden="true" />
                )}
              </>
            ))}
          </div>
        </AnimateIn>

        {/* ── Explanation panel ─────────────────────────────── */}
        {activeNode && (
          <AnimateIn key={activeNode.id} delay={0}>
            <div
              style={{
                marginTop: '1.5rem',
                background: 'var(--color-bg)',
                border: `1px solid ${activeNode.typeColor}30`,
                borderLeft: `3px solid ${activeNode.typeColor}`,
                borderRadius: '8px',
                padding: '1.5rem 2rem',
              }}
              id={`explain-${activeNode.id}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: activeNode.typeColor,
                      display: 'block',
                      marginBottom: '0.375rem',
                    }}
                  >
                    {activeNode.typeLabel} — Schritt {activeNode.index}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'var(--color-text)',
                      letterSpacing: '-0.025em',
                      marginBottom: '0.625rem',
                    }}
                  >
                    {activeNode.explain.headline}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-2)', lineHeight: 1.7 }}>
                    {activeNode.explain.text}
                  </p>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignSelf: 'center' }}>
                  {activeNode.explain.bullets.map((b) => (
                    <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none" style={{ marginTop: '0.15rem', flexShrink: 0 }} aria-hidden="true">
                        <path d="M2.5 7l3 3 6-6" stroke={activeNode.typeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ fontSize: '0.875rem', color: 'var(--color-text-2)', lineHeight: 1.55 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimateIn>
        )}

        {/* ── Bottom CTA ────────────────────────────────────── */}
        <AnimateIn delay={160}>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href="#kontakt" className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.875rem 2rem' }}>
              System kennenlernen
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
