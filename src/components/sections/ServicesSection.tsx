'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'
import type { Service } from '@/types/content'

interface ServicesSectionProps { services: Service[] }

const moduleColors: Record<string, { bg: string; border: string; num: string }> = {
  'lead-engine':       { bg: 'rgba(25,100,114,0.06)',  border: 'rgba(25,100,114,0.18)',  num: '#196470' },
  'terminbuchung':     { bg: 'rgba(10,31,68,0.05)',    border: 'rgba(10,31,68,0.15)',    num: '#0A1F44' },
  'online-praesenz':   { bg: 'rgba(200,164,74,0.06)',  border: 'rgba(200,164,74,0.18)',  num: '#C8A44A' },
  'kommunikations-hub':{ bg: 'rgba(42,137,153,0.06)', border: 'rgba(42,137,153,0.18)', num: '#2A8999' },
}

const moduleIcons: Record<string, React.ReactNode> = {
  'lead-engine': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12 19.79 19.79 0 0 1 1.67 3.38 2 2 0 0 1 3.65 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1-1a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  'terminbuchung': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
    </svg>
  ),
  'online-praesenz': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  'kommunikations-hub': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const active = services.find((s) => s.id === activeId)

  return (
    <section
      id="leistungen"
      className="section-y"
      style={{ background: 'var(--color-surface)' }}
      aria-labelledby="services-heading"
    >
      <Container>

        {/* Premium Section Header — replaces dark bar */}
        <AnimateIn>
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10" style={{ background: 'var(--color-gold)' }} />
              <span className="text-label">Leistungen</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <h2 id="services-heading" className="text-display-sm" style={{ color: 'var(--color-text)' }}>
                Vier Module.<br />
                Ein System.
              </h2>
              <p style={{ color: 'var(--color-text-soft)', fontSize: '0.9rem', maxWidth: '28rem' }}>
                Klicken Sie auf ein Modul, um die vollständigen Funktionen und Ergebnisse zu sehen.
                Jedes Modul lässt sich einzeln einsetzen oder als integriertes Gesamtsystem.
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* Interactive Module Grid */}
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: activeId ? '1fr' : 'repeat(2, 1fr)',
            transition: 'grid-template-columns 0.4s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {activeId === null ? (
            // Default: 2×2 grid
            services.map((service, i) => {
              const colors = moduleColors[service.id] ?? moduleColors['lead-engine']
              return (
                <AnimateIn key={service.id} delay={i * 60}>
                  <button
                    type="button"
                    onClick={() => setActiveId(service.id)}
                    className="w-full text-left p-8 transition-all duration-300 group"
                    style={{
                      background: colors.bg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '4px',
                    }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div
                        className="p-2.5 rounded-sm"
                        style={{ color: colors.num, background: 'rgba(255,255,255,0.7)' }}
                      >
                        {moduleIcons[service.id]}
                      </div>
                      <span
                        className="text-xs font-mono mt-1"
                        style={{ color: colors.num, fontFamily: 'var(--font-mono)', opacity: 0.7 }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3
                      className="mb-2"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.35rem',
                        fontWeight: 550,
                        color: 'var(--color-text)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {service.title}
                    </h3>

                    <p
                      className="mb-4"
                      style={{ color: colors.num, fontSize: '0.875rem', fontWeight: 500 }}
                    >
                      {service.tagline}
                    </p>

                    <p style={{ color: 'var(--color-text-mid)', fontSize: '0.875rem', lineHeight: 1.65 }}>
                      {service.description}
                    </p>

                    <div
                      className="mt-5 flex items-center gap-2 text-xs font-semibold tracking-wide uppercase"
                      style={{ color: colors.num }}
                    >
                      <span>Details ansehen</span>
                      <span style={{ transition: 'transform 0.2s' }} className="group-hover:translate-x-1">→</span>
                    </div>
                  </button>
                </AnimateIn>
              )
            })
          ) : (
            // Expanded: full-width active module
            <div>
              {/* Back button */}
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="flex items-center gap-2 mb-6 text-sm font-medium link-teal"
              >
                ← Alle Module
              </button>

              {active && (() => {
                const colors = moduleColors[active.id] ?? moduleColors['lead-engine']
                const idx = services.findIndex((s) => s.id === active.id)
                return (
                  <div
                    className="p-8 md:p-12"
                    style={{
                      background: colors.bg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '4px',
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                      {/* Left: Identity */}
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div
                            className="p-3 rounded-sm"
                            style={{ color: colors.num, background: 'rgba(255,255,255,0.8)' }}
                          >
                            {moduleIcons[active.id]}
                          </div>
                          <span
                            className="text-xs"
                            style={{ color: colors.num, fontFamily: 'var(--font-mono)', opacity: 0.7 }}
                          >
                            Modul {String(idx + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                            fontWeight: 550,
                            color: 'var(--color-text)',
                            letterSpacing: '-0.025em',
                            marginBottom: '0.75rem',
                          }}
                        >
                          {active.title}
                        </h3>

                        <p style={{ color: colors.num, fontSize: '1rem', fontWeight: 500, marginBottom: '1.25rem' }}>
                          {active.tagline}
                        </p>

                        <p style={{ color: 'var(--color-text-mid)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                          {active.description}
                        </p>

                        <a
                          href="#kontakt"
                          className="inline-flex items-center gap-2 text-sm font-semibold btn-cta btn-press"
                          style={{ padding: '0.875rem 1.75rem' }}
                        >
                          Modul anfragen
                        </a>
                      </div>

                      {/* Right: Benefits */}
                      <div>
                        <p
                          className="mb-5 text-xs font-semibold tracking-[0.12em] uppercase"
                          style={{ color: 'var(--color-text-soft)' }}
                        >
                          Was enthalten ist
                        </p>
                        <div className="space-y-0">
                          {active.benefits.map((b, bi) => (
                            <div
                              key={b}
                              className="flex items-start gap-4 py-4"
                              style={{ borderBottom: bi < active.benefits.length - 1 ? `1px solid ${colors.border}` : 'none' }}
                            >
                              <span
                                style={{ color: colors.num, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', marginTop: '0.15rem' }}
                              >
                                {String(bi + 1).padStart(2, '0')}
                              </span>
                              <span style={{ color: 'var(--color-text-mid)', fontSize: '0.9rem', lineHeight: 1.55 }}>
                                {b}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* Other modules as small chips */}
              <div className="grid grid-cols-3 gap-3 mt-3">
                {services.filter((s) => s.id !== activeId).map((service) => {
                  const colors = moduleColors[service.id] ?? moduleColors['lead-engine']
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setActiveId(service.id)}
                      className="p-4 text-left transition-all duration-200"
                      style={{
                        background: 'rgba(0,0,0,0.02)',
                        border: `1px solid var(--color-line)`,
                        borderRadius: '3px',
                        opacity: 0.65,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.65')}
                    >
                      <div className="flex items-center gap-2 mb-2" style={{ color: colors.num }}>
                        <span style={{ width: 16, height: 16, display: 'flex' }}>{moduleIcons[service.id]}</span>
                      </div>
                      <p style={{ color: 'var(--color-text)', fontSize: '0.8rem', fontWeight: 600 }}>{service.title}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
