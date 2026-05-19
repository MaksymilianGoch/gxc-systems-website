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
    title: 'AI Agent Systems',
    tagline: 'Intelligent process automation with decision-making capability',
    detail:
      'AI agents that qualify leads, route inquiries, trigger workflows and handle standard communications without human intervention. Built on your business logic, trained on your processes.',
    outcomes: [
      'Lead qualification automated',
      'Response time < 60 seconds',
      '24/7 availability without staff cost',
    ],
  },
  {
    index: '02',
    id: 'workflow-automation',
    title: 'Workflow Automation',
    tagline: 'End-to-end process execution without manual coordination',
    detail:
      'Multi-step workflows that run from inquiry to outcome — booking confirmations, follow-up sequences, status updates and internal notifications — all triggered by business events.',
    outcomes: [
      'Zero dropped follow-ups',
      '8+ hours/week admin eliminated',
      'Full audit trail',
    ],
  },
  {
    index: '03',
    id: 'crm-lead-management',
    title: 'CRM & Lead Management',
    tagline: 'Structured pipeline from first contact to closed deal',
    detail:
      'Every lead captured, categorized, assigned and tracked. Automated status transitions, follow-up reminders and performance reporting built in from day one.',
    outcomes: [
      '100% lead capture rate',
      'Pipeline visibility in real time',
      'No manual data entry',
    ],
  },
  {
    index: '04',
    id: 'websites-digital-presence',
    title: 'Websites & Digital Presence',
    tagline: 'Conversion-engineered digital infrastructure',
    detail:
      'Websites built as operational systems — not brochures. Integrated with lead capture, CRM routing and booking systems from launch.',
    outcomes: [
      'Leads captured automatically',
      'Zero-friction booking flow',
      'Google Business profile optimized',
    ],
  },
  {
    index: '05',
    id: 'integrations-infrastructure',
    title: 'Integrations & Infrastructure',
    tagline: 'All your tools, connected and coordinated',
    detail:
      'API integrations between your existing tools — calendar, email, payment, communication — orchestrated through a central automation layer.',
    outcomes: [
      'Eliminate manual sync',
      'Single source of truth',
      'Scales without adding headcount',
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
            <p className="text-label mb-4">OPERATIONAL MODULES</p>
            <h2
              id="services-heading"
              className="text-display-sm mb-5"
              style={{ color: 'var(--color-text)' }}
            >
              Five systems.
              <br />
              One operational layer.
            </h2>
            <p style={{ color: 'var(--color-text-2)', fontSize: '1rem', lineHeight: 1.7 }}>
              Each module solves a specific operational problem. Together, they eliminate the
              friction between customer intent and business outcome.
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
