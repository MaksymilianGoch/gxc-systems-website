'use client'

import { useState, useCallback } from 'react'
import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

// ── Types ─────────────────────────────────────────────────────────────────────

interface SliderConfig {
  id: keyof CalcState
  label: string
  min: number
  max: number
  step: number
  unit: string
  unitPosition: 'prefix' | 'suffix'
}

interface CalcState {
  verpassteAnfragen: number
  auftragswert: number
  antwortzeit: number
  abschlussrate: number
}

// ── Slider configuration ──────────────────────────────────────────────────────

const sliders: SliderConfig[] = [
  {
    id: 'verpassteAnfragen',
    label: 'Verpasste Anfragen pro Woche',
    min: 0,
    max: 50,
    step: 1,
    unit: '',
    unitPosition: 'suffix',
  },
  {
    id: 'auftragswert',
    label: 'Durchschnittlicher Auftragswert',
    min: 100,
    max: 5000,
    step: 50,
    unit: '€',
    unitPosition: 'prefix',
  },
  {
    id: 'antwortzeit',
    label: 'Aktuelle Antwortzeit',
    min: 1,
    max: 72,
    step: 1,
    unit: 'Std.',
    unitPosition: 'suffix',
  },
  {
    id: 'abschlussrate',
    label: 'Abschlussrate ohne System',
    min: 5,
    max: 80,
    step: 1,
    unit: '%',
    unitPosition: 'suffix',
  },
]

const DEFAULTS: CalcState = {
  verpassteAnfragen: 8,
  auftragswert: 800,
  antwortzeit: 24,
  abschlussrate: 20,
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function calcResults(state: CalcState) {
  const wöchentlich = state.verpassteAnfragen * state.auftragswert * (state.abschlussrate / 100)
  const jährlich = wöchentlich * 52
  const rückgewinnbar = jährlich * 0.65
  return { jährlich, rückgewinnbar }
}

function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value))
}

function formatValue(config: SliderConfig, value: number): string {
  const raw = config.id === 'auftragswert' ? formatEuro(value) : String(value)
  if (!config.unit) return raw
  return config.unitPosition === 'prefix' ? `${config.unit} ${raw}` : `${raw} ${config.unit}`
}

// ── Slider component ──────────────────────────────────────────────────────────

interface SliderRowProps {
  config: SliderConfig
  value: number
  onChange: (id: keyof CalcState, value: number) => void
}

function SliderRow({ config, value, onChange }: SliderRowProps) {
  const pct = ((value - config.min) / (config.max - config.min)) * 100

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label
          htmlFor={`slider-${config.id}`}
          style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-text-2)', letterSpacing: '0.01em' }}
        >
          {config.label}
        </label>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: 'var(--color-blue)',
            letterSpacing: '-0.01em',
            minWidth: '5rem',
            textAlign: 'right',
          }}
        >
          {formatValue(config, value)}
        </span>
      </div>

      <div style={{ position: 'relative', height: '4px', marginBottom: '0.25rem' }}>
        {/* Track background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '2px',
            background: 'var(--color-border)',
          }}
        />
        {/* Filled portion */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${pct}%`,
            borderRadius: '2px',
            background: 'var(--color-blue)',
            transition: 'width 0.08s ease',
          }}
        />
        <input
          id={`slider-${config.id}`}
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          onChange={(e) => onChange(config.id, Number(e.target.value))}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            opacity: 0,
            cursor: 'pointer',
            height: '100%',
            margin: 0,
            padding: 0,
          }}
          aria-label={config.label}
        />
        {/* Thumb */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${pct}%`,
            transform: 'translate(-50%, -50%)',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: 'var(--color-blue)',
            border: '2px solid var(--color-bg-1)',
            boxShadow: '0 0 0 3px rgba(23,59,92,0.15)',
            transition: 'left 0.08s ease',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
        <span style={{ fontSize: '0.62rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)' }}>
          {formatValue(config, config.min)}
        </span>
        <span style={{ fontSize: '0.62rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)' }}>
          {formatValue(config, config.max)}
        </span>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function LeadCalculatorSection() {
  const [state, setState] = useState<CalcState>(DEFAULTS)

  const handleChange = useCallback((id: keyof CalcState, value: number) => {
    setState((prev) => ({ ...prev, [id]: value }))
  }, [])

  const { jährlich, rückgewinnbar } = calcResults(state)

  return (
    <section
      id="rechner"
      className="section-y"
      style={{ background: 'var(--color-bg-2)' }}
      aria-labelledby="calc-heading"
    >
      <Container>
        <AnimateIn>
          <div style={{ maxWidth: '38rem', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <span className="accent-line" />
            <p className="text-label mb-4">Modellrechnung</p>
            <h2
              id="calc-heading"
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
              Was kostet dich das fehlende System?
            </h2>
            <p style={{ color: 'var(--color-text-2)', fontSize: '0.95rem', lineHeight: 1.65 }}>
              Berechne deinen jährlichen Umsatzverlust. Die Werte basieren auf deinen Eingaben — keine Garantien, nur eine Orientierung.
            </p>
          </div>
        </AnimateIn>

        {/* ── Two-column grid ───────────────────────────────── */}
        <AnimateIn delay={80}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: 'clamp(1.5rem, 4vw, 3rem)',
              alignItems: 'start',
            }}
          >
            {/* Left: Sliders */}
            <div
              style={{
                background: 'var(--color-bg-1)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: 'clamp(1.25rem, 3vw, 2rem)',
              }}
            >
              <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-3)', marginBottom: '1.75rem' }}>
                Deine Parameter
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                {sliders.map((config) => (
                  <SliderRow
                    key={config.id}
                    config={config}
                    value={state[config.id]}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </div>

            {/* Right: Result panel */}
            <div
              style={{
                position: 'sticky',
                top: '6rem',
                background: 'var(--color-bg-1)',
                border: '1px solid var(--color-border)',
                borderTop: '3px solid var(--color-blue)',
                borderRadius: '8px',
                padding: 'clamp(1.25rem, 3vw, 2rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              {/* Label */}
              <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-3)' }}>
                Geschätzter Jahresverlust
              </p>

              {/* Primary number */}
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: 'var(--color-text)',
                  }}
                  aria-live="polite"
                  aria-label={`${formatEuro(jährlich)} Euro Jahresverlust`}
                >
                  € {formatEuro(jährlich)}
                </span>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-3)', marginTop: '0.35rem' }}>
                  pro Jahr entgangener Umsatz (Modellrechnung)
                </p>
              </div>

              <div style={{ height: '1px', background: 'var(--color-border)' }} aria-hidden="true" />

              {/* Recoverable amount */}
              <div
                style={{
                  background: 'rgba(47,125,90,0.06)',
                  border: '1px solid rgba(47,125,90,0.18)',
                  borderRadius: '6px',
                  padding: '1rem 1.25rem',
                }}
              >
                <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-3)', marginBottom: '0.4rem' }}>
                  Davon strukturierbar mit GXC System
                </p>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(1.375rem, 3vw, 2rem)',
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-green)',
                  }}
                  aria-live="polite"
                  aria-label={`${formatEuro(rückgewinnbar)} Euro strukturierbar`}
                >
                  € {formatEuro(rückgewinnbar)}
                </span>
                <p style={{ fontSize: '0.7rem', color: 'var(--color-text-3)', marginTop: '0.3rem' }}>
                  geschätzter Richtwert — Grundlage: 65% der verpassten Anfragen strukturierbar
                </p>
              </div>

              {/* CTA */}
              <a href="#kontakt" className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.875rem 1.5rem', justifyContent: 'center' }}>
                System besprechen
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              {/* Disclaimer */}
              <p style={{ fontSize: '0.65rem', color: 'var(--color-text-3)', lineHeight: 1.5 }}>
                Modellrechnung auf Basis deiner Eingaben. Tatsächliche Ergebnisse hängen von Betrieb, Branche und Ausgangssituation ab.
              </p>
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
