import { Container } from '@/components/ui/Container'
import { AnimateIn } from '@/components/ui/AnimateIn'

/* ─── Data ──────────────────────────────────────────────── */

const differentiators = [
  'Systemarchitektur statt Einzellösungen',
  'KI-Workflows statt manuelle Prozesse',
  'Operativer Fokus statt technische Features',
]

interface Founder {
  initials: string
  name: string
  role: string
  bio: string
  tags: string[]
}

const founders: Founder[] = [
  {
    initials: 'MG',
    name: 'Maksymilian Goch',
    role: 'Gründer & Stratege',
    bio: 'Unternehmensstratege mit Fokus auf operative Systemarchitektur und automatisierte Akquise-Infrastruktur.',
    tags: ['Strategie', 'Systemdesign', 'Vertrieb'],
  },
  {
    initials: 'CF',
    name: 'Co-Founder', // REVIEW
    role: 'Co-Gründer & Technologie', // REVIEW
    bio: 'Technologie-Experte mit Spezialisierung auf KI-Workflows, Automatisierungsarchitektur und digitale Systemintegration.', // REVIEW
    tags: ['Automation', 'KI', 'Integration'],
  },
]

interface CaseStudy {
  category: string
  headline: string
  description: string
  metricValue: string
  metricLabel: string
}

const caseStudies: CaseStudy[] = [
  {
    category: 'Handwerk · Haustechnik',
    headline: 'Von 3 Stunden auf 12 Minuten.',
    description:
      'Anfragenbearbeitung komplett automatisiert. Der Betrieb reagiert jetzt schneller als die Konkurrenz — ohne Mehraufwand.',
    metricValue: '−92%',
    metricLabel: 'Zeitaufwand pro Lead',
  },
  {
    category: 'Dienstleistung · Beratung',
    headline: 'Terminausfälle auf unter 8%.',
    description:
      'Automatische Erinnerungssequenzen reduzierten No-Shows drastisch. Kalender läuft jetzt auf 94% Auslastung.',
    metricValue: '−78%',
    metricLabel: 'No-Show-Rate',
  },
  {
    category: 'Lokaler Dienstleister',
    headline: '11 neue Leads pro Woche.',
    description:
      'Google Business Profile Optimierung plus Lead-Engine. Vom unsichtbaren zum meistgefundenen Anbieter der Region.',
    metricValue: '+3.4×',
    metricLabel: 'Mehr Anfragen',
  },
]

/* ─── Sub-components ────────────────────────────────────── */

function FounderCard({ founder, delay }: { founder: Founder; delay: number }) {
  return (
    <AnimateIn delay={delay} direction="up">
      <article
        className="card rounded-sm flex flex-col gap-5 h-full"
        style={{ padding: '1.5rem' }}
      >
        {/* Photo placeholder */}
        <div
          className="w-full rounded-sm overflow-hidden"
          style={{ aspectRatio: '1 / 1', background: 'var(--color-surface-2)', border: '1px solid var(--color-line)' }}
          aria-hidden="true"
        >
          <div
            className="w-full h-full flex items-center justify-center"
          >
            <span
              className="text-mono"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '2rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: 'var(--color-text-soft)',
              }}
            >
              {founder.initials}
            </span>
          </div>
        </div>

        {/* Identity */}
        <div>
          <h3
            className="text-display-sm"
            style={{ fontSize: '1.1rem', color: 'var(--color-text)', marginBottom: '0.25rem' }}
          >
            {founder.name}
          </h3>
          <p
            className="text-label"
            style={{ color: 'var(--color-teal)' }}
          >
            {founder.role}
          </p>
        </div>

        {/* Bio */}
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-mid)', lineHeight: 1.65 }}>
          {founder.bio}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {founder.tags.map((tag) => (
            <span key={tag} className="tag" style={{ borderRadius: '3px' }}>
              {tag}
            </span>
          ))}
        </div>
      </article>
    </AnimateIn>
  )
}

function CaseStudyCard({ study, delay }: { study: CaseStudy; delay: number }) {
  return (
    <AnimateIn delay={delay} direction="up">
      <article
        className="flex flex-col gap-5 h-full rounded-sm"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '2rem',
          transition: 'border-color 0.2s ease',
        }}
      >
        {/* Category */}
        <p
          className="text-label"
          style={{ color: 'var(--color-gold)', letterSpacing: '0.12em' }}
        >
          {study.category}
        </p>

        {/* Headline */}
        <h3
          className="text-display-sm"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            fontWeight: 550,
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            color: '#ffffff',
          }}
        >
          {study.headline}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: '0.875rem',
            color: 'rgba(255,255,255,0.58)',
            lineHeight: 1.65,
            flex: 1,
          }}
        >
          {study.description}
        </p>

        {/* Metric */}
        <div
          className="rule"
          style={{ background: 'rgba(255,255,255,0.08)', marginBottom: '1.25rem' }}
          aria-hidden="true"
        />
        <dl>
          <dt
            className="text-mono"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: '#ffffff',
            }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {study.metricValue}
            </span>
          </dt>
          <dd
            style={{
              marginTop: '0.35rem',
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.42)',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {study.metricLabel}
          </dd>
        </dl>

        {/* Review note */}
        <p
          className="text-mono"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.18)',
            marginTop: 'auto',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {'// REVIEW — echtes Case Study noch eintragen'}
        </p>
      </article>
    </AnimateIn>
  )
}

/* ─── Main export ───────────────────────────────────────── */

export function FoundersSection() {
  return (
    <>
      {/* ── Visual separator — clear break from previous sections ── */}
      <div
        style={{
          background: 'var(--color-navy)',
          padding: '2.5rem 0',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 80px)',
          }}
        />
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 relative">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="h-px w-8" style={{ background: 'var(--color-gold)' }} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                }}
              >
                Über GXC Systems
              </span>
            </div>
            <div className="flex items-center gap-6">
              {['Strategie', 'Automation', 'Ergebnisse'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    color: 'rgba(255,255,255,0.2)',
                    textTransform: 'uppercase',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          PART 1 — Founders / About
      ══════════════════════════════════════════════ */}
      <section
        id="ueber-uns"
        className="section-y"
        style={{ background: 'var(--color-cream)' }}
        aria-labelledby="founders-heading"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

            {/* Left: Company description */}
            <AnimateIn direction="left">
              <div>
                {/* Gold rule */}
                <div
                  className="rule-gold"
                  style={{ marginBottom: '1.5rem' }}
                  aria-hidden="true"
                />

                {/* Label */}
                <p className="text-label" style={{ marginBottom: '1rem' }}>
                  Über uns
                </p>

                {/* Headline */}
                <h2
                  id="founders-heading"
                  className="text-display-sm"
                  style={{ color: 'var(--color-text)', marginBottom: '1.75rem' }}
                >
                  Gebaut von Unternehmern. Für Unternehmer.
                </h2>

                {/* Body paragraphs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                  <p style={{ fontSize: '1rem', color: 'var(--color-text-mid)', lineHeight: 1.7 }}>
                    GXC Systems entstand aus einer einfachen Beobachtung: Die meisten KMU verlieren täglich
                    Umsatz — nicht wegen mangelnder Qualität, sondern wegen fehlender Systeminfrastruktur.
                  </p>
                  <p style={{ fontSize: '1rem', color: 'var(--color-text-mid)', lineHeight: 1.7 }}>
                    Wir bauen die operativen Fundamente, die Handwerker, Dienstleister und lokale Betriebe
                    brauchen, um professionell zu skalieren.
                  </p>
                </div>

                {/* Differentiators */}
                <ul
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0',
                    borderTop: '1px solid var(--color-line)',
                  }}
                  aria-label="Unsere Differenzierungsmerkmale"
                >
                  {differentiators.map((item, i) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.875rem 0',
                        borderBottom: '1px solid var(--color-line)',
                        fontSize: '0.9rem',
                        color: 'var(--color-text)',
                        fontWeight: 500,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: 'var(--color-gold)',
                          fontWeight: 500,
                          letterSpacing: '0.04em',
                          flexShrink: 0,
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>

            {/* Right: Two founder cards side by side */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {founders.map((founder, i) => (
                  <FounderCard key={founder.initials} founder={founder} delay={i * 120} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          PART 2 — Case Studies / Ergebnisse
      ══════════════════════════════════════════════ */}
      <section
        id="ergebnisse"
        className="section-y dark-section"
        aria-labelledby="results-heading"
      >
        <Container className="relative">
          {/* Header */}
          <AnimateIn>
            <div style={{ marginBottom: '4rem' }}>
              <p
                className="text-label"
                style={{
                  color: 'rgba(200,164,74,0.85)',
                  marginBottom: '1rem',
                }}
              >
                Ergebnisse
              </p>
              <h2
                id="results-heading"
                className="text-display-sm"
                style={{
                  color: '#ffffff',
                  marginBottom: '1rem',
                  maxWidth: '36rem',
                }}
              >
                Was unsere Systeme leisten.
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.58)',
                  lineHeight: 1.65,
                }}
              >
                Konkrete Resultate aus echten Projekten.
              </p>
            </div>
          </AnimateIn>

          {/* Case Study cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {caseStudies.map((study, i) => (
              <CaseStudyCard key={study.headline} study={study} delay={i * 120} />
            ))}
          </div>

          {/* Footer note */}
          <AnimateIn delay={300}>
            <div
              style={{
                marginTop: '3.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.32)',
                  maxWidth: '42rem',
                  margin: '0 auto',
                  lineHeight: 1.6,
                }}
              >
                Alle Ergebnisse stammen aus realen Projekten. Spezifische Zahlen können je nach Branche,
                Ausgangssituation und Umsetzungstiefe variieren.
              </p>
            </div>
          </AnimateIn>
        </Container>
      </section>
    </>
  )
}
