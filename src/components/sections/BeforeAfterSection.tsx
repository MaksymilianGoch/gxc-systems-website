import { AnimateIn } from '@/components/ui/AnimateIn'
import { Container } from '@/components/ui/Container'

interface ComparisonRow {
  before: string
  after: string
}

const ROWS: ComparisonRow[] = [
  {
    before: 'Anfragen kommen über WhatsApp, E-Mail, Telefon — keine zentrale Erfassung',
    after: 'Jede Anfrage aus allen Kanälen automatisch erfasst, strukturiert und weitergeleitet',
  },
  {
    before: 'Reaktionszeiten von Stunden oder Tagen',
    after: 'Automatische Antwort in unter 60 Sekunden versendet',
  },
  {
    before: 'Leads werden in Tabellen oder gar nicht erfasst',
    after: 'CRM automatisch befüllt — durchsuchbar, verfolgbar, verwertbar',
  },
  {
    before: 'Termine durch manuelles Hin-und-Her vereinbart',
    after: 'Buchungslink sofort gesendet — Kalender synchronisiert, Erinnerungen automatisiert',
  },
  {
    before: 'Follow-up hängt von Erinnerung und Disziplin ab',
    after: 'Follow-up-Sequenzen laufen planmäßig, unabhängig vom Volumen',
  },
  {
    before: 'Kein Überblick über Pipeline, Leistung oder Umsatz',
    after: 'Echtzeit-Dashboard — jeder Lead, jeder Status, jede Kennzahl',
  },
]

function XIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 2l10 10M12 2L2 12" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 7l3.5 3.5L12 3" />
    </svg>
  )
}

interface ColumnProps {
  variant: 'before' | 'after'
  rows: ComparisonRow[]
}

function Column({ variant, rows }: ColumnProps) {
  const isBefore = variant === 'before'

  const borderColor = isBefore ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)'
  const bgColor = isBefore ? 'rgba(239,68,68,0.03)' : 'rgba(16,185,129,0.03)'
  const headerBg = isBefore ? 'rgba(239,68,68,0.04)' : 'rgba(16,185,129,0.04)'
  const headerBorder = isBefore ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)'
  const labelColor = isBefore ? 'rgba(239,68,68,0.75)' : 'rgba(16,185,129,0.85)'
  const rowDivider = isBefore ? 'rgba(239,68,68,0.07)' : 'rgba(16,185,129,0.07)'
  const iconColor = isBefore ? 'rgba(239,68,68,0.65)' : 'rgba(16,185,129,0.85)'
  const textColor = isBefore ? 'var(--color-text-2)' : 'var(--color-text)'
  const label = isBefore ? 'OHNE SYSTEM' : 'MIT GXC SYSTEMS'

  return (
    <div
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
        flex: 1,
        minWidth: 0,
        overflow: 'hidden',
      }}
    >
      {/* Column header */}
      <div
        style={{
          padding: '1.25rem 1.5rem',
          borderBottom: `1px solid ${headerBorder}`,
          background: headerBg,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: labelColor,
          }}
        >
          {label}
        </p>
      </div>

      {/* Rows */}
      <div>
        {rows.map((row, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.875rem',
              padding: '1rem 1.5rem',
              borderBottom: i < rows.length - 1 ? `1px solid ${rowDivider}` : 'none',
            }}
          >
            <span
              style={{
                color: iconColor,
                marginTop: '0.15rem',
                flexShrink: 0,
                display: 'flex',
              }}
            >
              {isBefore ? <XIcon /> : <CheckIcon />}
            </span>
            <p
              style={{
                fontSize: '0.875rem',
                color: textColor,
                lineHeight: 1.6,
              }}
            >
              {isBefore ? row.before : row.after}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function BeforeAfterSection() {
  return (
    <section
      id="transformation"
      className="section-y"
      style={{ background: 'var(--color-bg)' }}
      aria-labelledby="transformation-heading"
    >
      <Container>
        {/* Header */}
        <AnimateIn>
          <div className="text-center mb-14">
            <p className="text-label mb-4">DIE VERÄNDERUNG</p>
            <h2
              id="transformation-heading"
              className="text-display-sm"
              style={{ color: 'var(--color-text)' }}
            >
              Der operative Unterschied
              <br />
              ist messbar.
            </h2>
          </div>
        </AnimateIn>

        {/* Desktop: side-by-side with separator */}
        <AnimateIn delay={80}>
          {/* Desktop layout */}
          <div className="hidden md:flex" style={{ alignItems: 'stretch', gap: 0 }}>
            <div style={{ flex: 1, borderRadius: '4px 0 0 4px', overflow: 'hidden' }}>
              <Column variant="before" rows={ROWS} />
            </div>

            {/* Separator */}
            <div
              aria-hidden="true"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '3.5rem',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: '1px',
                  flex: 1,
                  background:
                    'linear-gradient(to bottom, transparent 0%, var(--color-border-2) 35%, var(--color-border-2) 65%, transparent 100%)',
                }}
              />
              <div
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  background: 'var(--color-bg-2)',
                  border: '1px solid var(--color-border-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'var(--color-blue)',
                  fontSize: '0.75rem',
                }}
              >
                →
              </div>
              <div
                style={{
                  width: '1px',
                  flex: 1,
                  background:
                    'linear-gradient(to bottom, transparent 0%, var(--color-border-2) 35%, var(--color-border-2) 65%, transparent 100%)',
                }}
              />
            </div>

            <div style={{ flex: 1, borderRadius: '0 4px 4px 0', overflow: 'hidden' }}>
              <Column variant="after" rows={ROWS} />
            </div>
          </div>

          {/* Mobile layout: stacked */}
          <div className="flex flex-col md:hidden" style={{ gap: '0.5rem' }}>
            <div style={{ borderRadius: '4px' }}>
              <Column variant="before" rows={ROWS} />
            </div>
            <div
              aria-hidden="true"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.25rem 0',
                color: 'var(--color-blue)',
                fontSize: '1.25rem',
              }}
            >
              ↓
            </div>
            <div style={{ borderRadius: '4px' }}>
              <Column variant="after" rows={ROWS} />
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
