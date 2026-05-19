'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { FileText, Zap, Database, Bell, Mail, CalendarCheck, CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/ui/Container'

// ── Types ────────────────────────────────────────────────────────────────────

type NodeState = 'idle' | 'active' | 'done'
type SimStatus = 'idle' | 'running' | 'done'

interface FlowNode {
  id: number
  icon: React.ReactNode
  label: string
  sublabel: string
}

// ── Data ─────────────────────────────────────────────────────────────────────

const ICON_PROPS = { size: 20, strokeWidth: 1.5 }

const FLOW_NODES: FlowNode[] = [
  { id: 1, icon: <FileText {...ICON_PROPS} />,     label: 'Website-Formular', sublabel: 'Anfrage eingeht' },
  { id: 2, icon: <Zap {...ICON_PROPS} />,          label: 'n8n Webhook',      sublabel: 'Sofort ausgelöst' },
  { id: 3, icon: <Database {...ICON_PROPS} />,     label: 'CRM (Airtable)',   sublabel: 'Lead angelegt' },
  { id: 4, icon: <Bell {...ICON_PROPS} />,         label: 'Slack-Alert',      sublabel: 'Team benachrichtigt' },
  { id: 5, icon: <Mail {...ICON_PROPS} />,         label: 'E-Mail an Kunden', sublabel: 'Bestätigung gesendet' },
  { id: 6, icon: <CalendarCheck {...ICON_PROPS} />,label: 'Terminbuchung',    sublabel: 'Kalender geöffnet' },
  { id: 7, icon: <CheckCircle2 {...ICON_PROPS} />, label: 'Auftrag',          sublabel: 'Prozess abgeschlossen' },
]

const NODE_DELAY_MS = 500
const ARROW_ANIM_MS = 400

// ── Arrow component ───────────────────────────────────────────────────────────

interface FlowArrowProps {
  active: boolean
  done: boolean
}

function FlowArrow({ active, done }: FlowArrowProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        width: 'clamp(1.25rem, 3vw, 2.5rem)',
        position: 'relative',
        height: '3px',
      }}
      aria-hidden="true"
    >
      {/* Static line */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: '6px',
          height: '1.5px',
          transform: 'translateY(-50%)',
          background: done
            ? 'var(--color-teal)'
            : active
              ? 'var(--color-teal)'
              : 'var(--color-line)',
          transition: 'background 0.3s ease',
        }}
      />
      {/* Arrow head */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 0,
          height: 0,
          borderTop: '4px solid transparent',
          borderBottom: '4px solid transparent',
          borderLeft: `6px solid ${done || active ? 'var(--color-teal)' : 'var(--color-line)'}`,
          transition: 'border-left-color 0.3s ease',
        }}
      />
      {/* Travelling dot */}
      {active && !done && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: 'var(--color-gold)',
            transform: 'translateY(-50%)',
            animation: `travelDot ${ARROW_ANIM_MS}ms ease-in forwards`,
          }}
        />
      )}
    </div>
  )
}

// ── Node component ────────────────────────────────────────────────────────────

interface NodeCardProps {
  node: FlowNode
  state: NodeState
  index: number
}

function NodeCard({ node, state }: NodeCardProps) {
  const isActive = state === 'active'
  const isDone = state === 'done'
  const isIdle = state === 'idle'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        minWidth: 'clamp(72px, 12vw, 110px)',
        flex: '0 1 auto',
        position: 'relative',
      }}
      role="listitem"
      aria-label={`${node.label}: ${state === 'idle' ? 'wartend' : state === 'active' ? 'aktiv' : 'abgeschlossen'}`}
    >
      {/* Icon box */}
      <div
        style={{
          width: 'clamp(48px, 8vw, 64px)',
          height: 'clamp(48px, 8vw, 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isDone
            ? 'color-mix(in srgb, var(--color-teal) 12%, white)'
            : isActive
              ? 'white'
              : 'var(--color-surface)',
          border: isDone
            ? '1.5px solid var(--color-teal)'
            : isActive
              ? '2px solid var(--color-teal)'
              : '1px solid var(--color-line)',
          boxShadow: isActive
            ? '0 4px 20px -4px color-mix(in srgb, var(--color-teal) 40%, transparent)'
            : isDone
              ? '0 2px 10px -3px color-mix(in srgb, var(--color-teal) 20%, transparent)'
              : 'none',
          transition: 'background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease',
          position: 'relative',
        }}
      >
        <span style={{ color: isDone ? 'var(--color-teal)' : isActive ? 'var(--color-teal)' : 'var(--color-text-soft)' }}>
          {node.icon}
        </span>
        {/* Active pulse ring */}
        {isActive && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: '-4px',
              border: '2px solid var(--color-teal)',
              animation: 'ringPulse 1.2s ease-out infinite',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      {/* Label */}
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontSize: 'clamp(0.6rem, 1.2vw, 0.72rem)',
            fontWeight: isDone || isActive ? 600 : 500,
            color: isDone
              ? 'var(--color-teal)'
              : isActive
                ? 'var(--color-text)'
                : isIdle
                  ? 'var(--color-text-soft)'
                  : 'var(--color-text)',
            lineHeight: 1.3,
            letterSpacing: '0.01em',
            transition: 'color 0.3s ease, font-weight 0.3s ease',
          }}
        >
          {node.label}
        </p>
        <p
          style={{
            fontSize: 'clamp(0.55rem, 1vw, 0.63rem)',
            color: isDone ? 'color-mix(in srgb, var(--color-teal) 70%, var(--color-text-soft))' : 'var(--color-text-soft)',
            marginTop: '0.15rem',
            transition: 'color 0.3s ease',
          }}
        >
          {node.sublabel}
        </p>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function WorkflowSimulatorSection() {
  const [nodeStates, setNodeStates] = useState<NodeState[]>(
    Array(FLOW_NODES.length).fill('idle') as NodeState[]
  )
  const [arrowStates, setArrowStates] = useState<boolean[]>(
    Array(FLOW_NODES.length - 1).fill(false)
  )
  const [status, setStatus] = useState<SimStatus>('idle')
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  // Cleanup on unmount
  useEffect(() => {
    return () => { timeoutsRef.current.forEach(clearTimeout) }
  }, [])

  const clearAll = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }, [])

  const reset = useCallback(() => {
    clearAll()
    setNodeStates(Array(FLOW_NODES.length).fill('idle') as NodeState[])
    setArrowStates(Array(FLOW_NODES.length - 1).fill(false))
    setStatus('idle')
  }, [clearAll])

  const play = useCallback(() => {
    if (status === 'running') return
    reset()
    setStatus('running')

    // Schedule each node and arrow activation
    // Pattern per step i (0-indexed):
    //   - at i * (NODE_DELAY_MS): activate node i
    //   - at i * NODE_DELAY_MS + NODE_DELAY_MS/2: activate arrow i (if exists)
    //   - at (i+1) * NODE_DELAY_MS: mark node i as done, activate node i+1

    const totalNodes = FLOW_NODES.length
    const schedule: ReturnType<typeof setTimeout>[] = []

    for (let i = 0; i < totalNodes; i++) {
      const baseTime = i * (NODE_DELAY_MS + ARROW_ANIM_MS)

      // Activate current node
      const t1 = setTimeout(() => {
        setNodeStates((prev) => {
          const next = [...prev] as NodeState[]
          next[i] = 'active'
          return next
        })
      }, baseTime)
      schedule.push(t1)

      // Activate arrow after node lights up
      if (i < totalNodes - 1) {
        const t2 = setTimeout(() => {
          setArrowStates((prev) => {
            const next = [...prev]
            next[i] = true
            return next
          })
          // Mark previous node done once arrow fires
          setNodeStates((prev) => {
            const next = [...prev] as NodeState[]
            if (next[i] === 'active') next[i] = 'done'
            return next
          })
        }, baseTime + NODE_DELAY_MS)
        schedule.push(t2)
      }

      // Final node: mark done and finish
      if (i === totalNodes - 1) {
        const t3 = setTimeout(() => {
          setNodeStates((prev) => {
            const next = [...prev] as NodeState[]
            next[i] = 'done'
            return next
          })
          setStatus('done')
        }, baseTime + NODE_DELAY_MS)
        schedule.push(t3)
      }
    }

    timeoutsRef.current = schedule
  }, [status, reset])

  return (
    <>
      {/* Keyframes injected via a style tag — no external lib needed */}
      <style>{`
        @keyframes travelDot {
          0%   { left: 0%;   opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes ringPulse {
          0%   { opacity: 0.8; transform: scale(1); }
          100% { opacity: 0;   transform: scale(1.25); }
        }
        @keyframes completeFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section
        id="simulator"
        className="section-y"
        style={{ background: 'var(--color-cream)' }}
        aria-labelledby="sim-heading"
      >
        <Container>

          {/* ── Section header ──────────────────────────────────── */}
          <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)', maxWidth: '42rem' }}>
            <p className="text-label" style={{ marginBottom: '1rem' }}>
              SYSTEM-SIMULATION
            </p>
            <div className="rule-gold" style={{ marginBottom: '1.5rem' }} aria-hidden="true" />
            <h2
              id="sim-heading"
              className="text-display-sm"
              style={{ marginBottom: '1rem' }}
            >
              Ihr Prozess in Echtzeit.
            </h2>
            <p style={{ color: 'var(--color-text-mid)', fontSize: '1rem', lineHeight: 1.65 }}>
              Jede Anfrage durchläuft automatisch diese 7 Stationen — ohne manuellen Eingriff.
            </p>
          </div>

          {/* ── Flow diagram ────────────────────────────────────── */}
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-line)',
              padding: 'clamp(1.75rem, 4vw, 3rem)',
              marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            {/* Nodes row — scrollable on mobile */}
            <div
              role="list"
              aria-label="Automatisierungsschritte"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 0,
                overflowX: 'auto',
                paddingBottom: '0.5rem',
                scrollbarWidth: 'none',
              }}
            >
              {FLOW_NODES.map((node, i) => (
                <div
                  key={node.id}
                  style={{ display: 'flex', alignItems: 'center', gap: 0 }}
                >
                  <NodeCard
                    node={node}
                    state={nodeStates[i]}
                    index={i}
                  />
                  {i < FLOW_NODES.length - 1 && (
                    <FlowArrow
                      active={arrowStates[i]}
                      done={nodeStates[i] === 'done' && nodeStates[i + 1] !== 'idle'}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Controls row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--color-line)',
              }}
            >
              {/* Completion message */}
              <div style={{ minHeight: '1.5rem' }}>
                {status === 'done' && (
                  <p
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--color-teal)',
                      animation: 'completeFade 0.4s ease forwards',
                    }}
                    role="status"
                    aria-live="polite"
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '20px',
                        height: '20px',
                        background: 'var(--color-teal)',
                        borderRadius: '50%',
                        color: 'white',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                      }}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    System abgeschlossen — in unter 10 Sekunden
                  </p>
                )}
                {status === 'running' && (
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--color-text-soft)',
                      fontStyle: 'italic',
                    }}
                    role="status"
                    aria-live="polite"
                  >
                    Verarbeitung läuft…
                  </p>
                )}
                {status === 'idle' && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-soft)' }}>
                    Drücken Sie Play, um die Simulation zu starten.
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                {status === 'done' && (
                  <button
                    onClick={reset}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: 'transparent',
                      border: '1px solid var(--color-line)',
                      color: 'var(--color-text-mid)',
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      padding: '0.6rem 1.1rem',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s ease, color 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-teal)'
                      e.currentTarget.style.color = 'var(--color-teal)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-line)'
                      e.currentTarget.style.color = 'var(--color-text-mid)'
                    }}
                    aria-label="Simulation zurücksetzen"
                  >
                    ↺ Zurücksetzen
                  </button>
                )}

                <button
                  onClick={play}
                  disabled={status === 'running'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: status === 'running' ? 'color-mix(in srgb, var(--color-teal) 60%, transparent)' : 'var(--color-teal)',
                    color: 'white',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    padding: '0.7rem 1.5rem',
                    border: 'none',
                    cursor: status === 'running' ? 'not-allowed' : 'pointer',
                    letterSpacing: '0.01em',
                    transition: 'background 0.15s ease, transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (status !== 'running') {
                      e.currentTarget.style.background = 'var(--color-teal-light)'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = status === 'running'
                      ? 'color-mix(in srgb, var(--color-teal) 60%, transparent)'
                      : 'var(--color-teal)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                  aria-label="Simulation starten"
                >
                  {status === 'running' ? (
                    <>
                      <span
                        aria-hidden="true"
                        style={{
                          display: 'inline-block',
                          width: '14px',
                          height: '14px',
                          border: '2px solid rgba(255,255,255,0.4)',
                          borderTopColor: 'white',
                          borderRadius: '50%',
                          animation: 'spin 0.7s linear infinite',
                        }}
                      />
                      Läuft…
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true" style={{ fontSize: '0.78rem' }}>▶</span>
                      {status === 'done' ? 'Erneut abspielen' : 'Play'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ── Stats row ───────────────────────────────────────── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1px',
              background: 'var(--color-line)',
              border: '1px solid var(--color-line)',
            }}
          >
            {[
              {
                value: '⌀ 4 Sek.',
                label: 'von Formular bis CRM-Eintrag',
                note: 'vollautomatisch',
              },
              {
                value: '⌀ 8 Sek.',
                label: 'bis zur Slack-Benachrichtigung',
                note: 'inkl. Formatierung',
              },
              {
                value: '0 Schritte',
                label: 'keine Unterbrechung Ihrer Arbeit',
                note: 'manuell',
              },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: 'var(--color-surface)',
                  padding: 'clamp(1.25rem, 2.5vw, 1.75rem) clamp(1.25rem, 2.5vw, 2rem)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    marginBottom: '0.4rem',
                  }}
                >
                  {stat.value}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-mid)', lineHeight: 1.4 }}>
                  {stat.label}
                </p>
                <p
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-teal)',
                    marginTop: '0.3rem',
                  }}
                >
                  {stat.note}
                </p>
              </div>
            ))}
          </div>

        </Container>
      </section>

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
