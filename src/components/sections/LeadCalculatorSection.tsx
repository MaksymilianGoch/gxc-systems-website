'use client'

import { useState, useCallback } from 'react'
import { Container } from '@/components/ui/Container'

// ── Types ────────────────────────────────────────────────────────────────────

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

// ── Slider configuration ─────────────────────────────────────────────────────

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

// ── Helpers ──────────────────────────────────────────────────────────────────

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

// ── Slider component ─────────────────────────────────────────────────────────

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
          style={{
            fontSize: '0.82rem',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.65)',
            letterSpacing: '0.01em',
          }}
        >
          {config.label}
        </label>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--color-gold)',
            letterSpacing: '0.02em',
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
            background: 'rgba(255,255,255,0.12)',
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
            background: 'linear-gradient(90deg, var(--color-teal), var(--color-gold))',
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
            background: 'var(--color-gold)',
            border: '2px solid var(--color-charcoal)',
            boxShadow: '0 0 0 3px rgba(200, 164, 74, 0.25)',
            transition: 'left 0.08s ease',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '4px',
        }}
      >
        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.28)', fontFamily: 'var(--font-mono)' }}>
          {formatValue(config, config.min)}
        </span>
        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.28)', fontFamily: 'var(--font-mono)' }}>
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
      className="section-y dark-section"
      aria-labelledby="calc-heading"
    >
      <Container className="relative">

        {/* ── Section header ─────────────────────────────────── */}
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="text-label" style={{ color: 'var(--color-gold)', marginBottom: '1rem' }}>
            ANALYSE
          </p>
          <div className="rule-gold" style={{ marginBottom: '1.5rem' }} aria-hidden="true" />
          <h2
            id="calc-heading"
            className="text-display-sm"
            style={{ color: 'white', maxWidth: '34rem', marginBottom: '1rem' }}
          >
            Was kostet dich das fehlende System?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.50)', maxWidth: '30rem', fontSize: '1rem', lineHeight: 1.65 }}>
            Berechne deinen jährlichen Umsatzverlust durch manuelle Prozesse.
          </p>
        </div>

        {/* ── Two-column grid ─────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'start',
          }}
        >

          {/* Left: Sliders ─────────────────────────────────────── */}
          <div
            style={{
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            <p
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                marginBottom: '2rem',
              }}
            >
              Parameter einstellen
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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

          {/* Right: Result panel ────────────────────────────────── */}
          <div
            style={{
              position: 'sticky',
              top: '6rem',
              background: 'linear-gradient(135deg, rgba(25,100,112,0.18) 0%, rgba(10,31,68,0.25) 100%)',
              border: '1px solid rgba(200, 164, 74, 0.28)',
              padding: 'clamp(1.75rem, 3.5vw, 3rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
            }}
          >
            {/* Gold accent top bar */}
            <div
              aria-hidden="true"
              style={{
                height: '2px',
                background: 'linear-gradient(90deg, var(--color-gold), transparent)',
                margin: '-clamp(1.75rem, 3.5vw, 3rem)',
                marginBottom: 0,
              }}
            />

            {/* Label */}
            <p
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
              }}
            >
              Geschätzte Jahresverluste durch fehlende Automation
            </p>

            {/* Primary number */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.4rem',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: 'white',
                  }}
                  aria-live="polite"
                  aria-label={`${formatEuro(jährlich)} Euro Jahresverlust`}
                >
                  € {formatEuro(jährlich)}
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.42)',
                  marginTop: '0.4rem',
                  letterSpacing: '0.01em',
                }}
              >
                pro Jahr entgangener Umsatz
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} aria-hidden="true" />

            {/* Recoverable amount */}
            <div
              style={{
                background: 'rgba(25, 100, 112, 0.20)',
                border: '1px solid rgba(25, 100, 112, 0.35)',
                padding: '1.25rem 1.5rem',
              }}
            >
              <p
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.45)',
                  marginBottom: '0.5rem',
                }}
              >
                davon rückgewinnbar mit GXC System
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-gold)',
                    transition: 'color 0.15s ease',
                  }}
                  aria-live="polite"
                  aria-label={`${formatEuro(rückgewinnbar)} Euro rückgewinnbar`}
                >
                  € {formatEuro(rückgewinnbar)}
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.35)',
                  marginTop: '0.35rem',
                }}
              >
                bei 65% Lead-Rückgewinnung (Branchendurchschnitt)
              </p>
            </div>

            {/* CTA */}
            <a
              href="#kontakt"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: 'var(--color-gold)',
                color: 'var(--color-charcoal)',
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.02em',
                padding: '0.9rem 1.75rem',
                textDecoration: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.15s ease, transform 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-gold-light)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-gold)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Verluste stoppen
              <span aria-hidden="true" style={{ fontWeight: 400 }}>→</span>
            </a>

            {/* Disclaimer */}
            <p
              style={{
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.25)',
                lineHeight: 1.5,
              }}
            >
              Schätzung basierend auf Branchendurchschnittswerten. Tatsächliche Ergebnisse können abweichen.
            </p>
          </div>
        </div>

        {/* ── Trust note ──────────────────────────────────────── */}
        <div
          style={{
            marginTop: 'clamp(2.5rem, 5vw, 4rem)',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          {[
            { value: '4–8 Std.', label: 'Verwaltungszeit gespart pro Woche' },
            { value: '< 30 Sek.', label: 'Reaktionszeit nach Anfrage' },
            { value: '0', label: 'Anfragen gehen verloren' },
          ].map((stat) => (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--color-gold)',
                  letterSpacing: '-0.01em',
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.40)',
                  letterSpacing: '0.01em',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
