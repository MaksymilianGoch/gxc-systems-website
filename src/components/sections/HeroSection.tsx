'use client'

import dynamic from 'next/dynamic'
import { AnimateIn } from '@/components/ui/AnimateIn'

const HeroCanvasDynamic = dynamic(
  () => import('@/components/3d/HeroCanvas').then((m) => ({ default: m.HeroCanvasDynamic })),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
)

const outcomeBar = [
  { value: '< 5 min', label: 'Lead response time' },
  { value: '0 gaps', label: 'In data capture' },
  { value: '8× ROI', label: 'Typical system payback' },
]

const systemStatus = [
  { label: 'Lead Capture', status: 'ACTIVE' },
  { label: 'CRM Routing', status: 'ACTIVE' },
  { label: 'Workflow Engine', status: 'ACTIVE' },
  { label: 'Notifications', status: 'ACTIVE' },
]

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'var(--color-bg)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '5rem',
        paddingBottom: '4rem',
      }}
      aria-label="GXC Systems — Operational Infrastructure"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.3,
        }}
        aria-hidden="true"
      />

      {/* Radial depth gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 60% 50%, rgba(14,30,68,0.6) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* Left: Copy — 6 cols */}
          <div className="lg:col-span-6 xl:col-span-5">

            {/* Status row */}
            <AnimateIn delay={0}>
              <div className="flex items-center gap-3 mb-8">
                <span className="live-dot" aria-hidden="true" />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-3)',
                  }}
                >
                  Operational Systems — GXC/v2.4
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--color-green)',
                    marginLeft: 'auto',
                  }}
                >
                  ALL SYSTEMS NOMINAL
                </span>
              </div>
            </AnimateIn>

            {/* Headline */}
            <AnimateIn delay={80}>
              <h1 className="text-display mb-6" style={{ color: 'var(--color-text)' }}>
                Built for
                <br />
                <span className="gradient-text">Operational</span>
                <br />
                Control.
              </h1>
            </AnimateIn>

            {/* Subheadline */}
            <AnimateIn delay={160}>
              <p
                style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.65,
                  color: 'var(--color-text-2)',
                  maxWidth: '34rem',
                  marginBottom: '2.5rem',
                }}
              >
                GXC Systems builds AI-powered operational infrastructure for
                businesses where inefficiency is no longer affordable. Automated
                workflows, intelligent lead systems, and connected operations —
                engineered to run without friction.
              </p>
            </AnimateIn>

            {/* CTAs */}
            <AnimateIn delay={220}>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a href="#kontakt" className="btn-primary">
                  Request a System Demo
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="#ablauf" className="btn-secondary">
                  See How It Works
                </a>
              </div>
            </AnimateIn>

            {/* System status panel */}
            <AnimateIn delay={300}>
              <div
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  padding: '1rem 1.25rem',
                  background: 'rgba(12, 16, 24, 0.8)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.14em',
                    color: 'var(--color-text-3)',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  Core System Status
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {systemStatus.map((s) => (
                    <div key={s.label} className="flex items-center gap-2">
                      <span
                        className="live-dot"
                        style={{ width: 5, height: 5 }}
                        aria-hidden="true"
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          color: 'var(--color-text-2)',
                        }}
                      >
                        {s.label}
                      </span>
                      <span
                        style={{
                          marginLeft: 'auto',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.6rem',
                          color: 'var(--color-green)',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {s.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>

          {/* Right: 3D Canvas — 6 cols */}
          <div
            className="lg:col-span-6 xl:col-span-7"
            style={{ height: 'clamp(380px, 55vw, 580px)' }}
            aria-hidden="true"
          >
            <HeroCanvasDynamic />
          </div>
        </div>

        {/* Outcome bar */}
        <AnimateIn delay={380}>
          <div
            className="mt-16 pt-8 grid grid-cols-3 gap-8"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            {outcomeBar.map((o) => (
              <div key={o.value} className="text-center">
                <p
                  className="text-stat mb-1"
                  style={{ color: 'var(--color-blue)' }}
                >
                  {o.value}
                </p>
                <p
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--color-text-3)',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {o.label}
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
