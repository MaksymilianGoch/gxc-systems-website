'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimateIn } from '@/components/ui/AnimateIn'

// ── Types ─────────────────────────────────────────────────────────────────
interface FeedEntry {
  id: string
  icon: string
  label: string
  sub: string
  time: string
  isNew?: boolean
}

interface KPI {
  label: string
  value: number
  target: number
  sub: string
  icon: string
  detail: string[]
}

// ── Initial data ──────────────────────────────────────────────────────────
const INITIAL_FEED: FeedEntry[] = [
  { id: '1', icon: 'language',        label: 'Neue Website-Anfrage',  sub: 'Widget · Kernleistung',   time: '09:12' },
  { id: '2', icon: 'event_available', label: 'Termin bestätigt',      sub: 'Kalender · E-Mail',       time: '10:03' },
  { id: '3', icon: 'call',            label: 'Rückruf markiert',      sub: 'Lead-Übersicht · Team',   time: '11:28' },
  { id: '4', icon: 'mark_email_read', label: 'Follow-up gesendet',    sub: 'Automation · Sequenz #3', time: '13:47' },
]

const FEED_POOL: Omit<FeedEntry, 'id' | 'time' | 'isNew'>[] = [
  { icon: 'language',        label: 'Neue Website-Anfrage',  sub: 'Widget · Kernleistung' },
  { icon: 'event_available', label: 'Termin bestätigt',      sub: 'Kalender · E-Mail' },
  { icon: 'call',            label: 'Rückruf eingeplant',    sub: 'Lead-Übersicht · Team' },
  { icon: 'mark_email_read', label: 'Follow-up gesendet',    sub: 'Automation · Sequenz #2' },
  { icon: 'priority_high',   label: 'Lead priorisiert',      sub: 'KI-Routing · Hoch' },
  { icon: 'schedule',        label: 'Erinnerung versendet',  sub: 'Automation · 48 Std.' },
  { icon: 'person_add',      label: 'Neuer Kontakt erfasst', sub: 'CRM · Automatisch' },
  { icon: 'task_alt',        label: 'Anfrage abgeschlossen', sub: 'Status · Auftrag' },
]

const BAR_DATA = [
  { d: 'MO', v: 5 }, { d: 'DI', v: 8 }, { d: 'MI', v: 6 },
  { d: 'DO', v: 11 }, { d: 'FR', v: 13 }, { d: 'SA', v: 4 }, { d: 'SO', v: 2 },
]

const NAV_ITEMS = [
  { id: 'overview',   label: 'Übersicht' },
  { id: 'leads',      label: 'Neue Anfragen' },
  { id: 'termine',    label: 'Termine' },
  { id: 'rueckrufe',  label: 'Rückrufe' },
  { id: 'berichte',   label: 'Berichte' },
]

const SAMPLE_LEADS = [
  { name: 'Thomas M.',   type: 'Elektrobetrieb', msg: 'Brauche kurzfristig Unterstützung', prio: 'Hoch',    time: '14:23', status: 'Neu' },
  { name: 'Sarah L.',    type: 'Sanitär',         msg: 'Terminanfrage für nächste Woche',  prio: 'Mittel',  time: '13:10', status: 'In Bearbeitung' },
  { name: 'Klaus W.',    type: 'Malerbetrieb',    msg: 'Angebot für Großauftrag',           prio: 'Hoch',    time: '11:45', status: 'Neu' },
  { name: 'Petra B.',    type: 'Reinigung',       msg: 'Regelmäßige Reinigung gesucht',    prio: 'Niedrig', time: '10:30', status: 'Verarbeitet' },
  { name: 'Martin F.',   type: 'Installateur',    msg: 'Notfall: Rohrbruch',               prio: 'Kritisch',time: '09:58', status: 'Neu' },
]

const SAMPLE_TERMINE = [
  { name: 'Thomas M.',   typ: 'Erstgespräch',    datum: 'Mo 26.05 · 09:00', kanal: 'Vor Ort' },
  { name: 'Klaus W.',    typ: 'Angebotspräsent.',datum: 'Mo 26.05 · 14:00', kanal: 'Video' },
  { name: 'Sarah L.',    typ: 'Folgetermin',     datum: 'Di 27.05 · 10:00', kanal: 'Telefon' },
  { name: 'Petra B.',    typ: 'Erstgespräch',    datum: 'Mi 28.05 · 11:30', kanal: 'Video' },
]

const SAMPLE_RUECKRUFE = [
  { name: 'Martin F.',  grund: 'Notfall-Rückruf', fälligkeit: 'Sofort',       prio: 'Kritisch' },
  { name: 'Klaus W.',   grund: 'Angebotsfragen',  fälligkeit: 'Heute 16:00',  prio: 'Hoch' },
  { name: 'Sarah L.',   grund: 'Terminbestätig.', fälligkeit: 'Morgen 10:00', prio: 'Mittel' },
]

// ── Utility ───────────────────────────────────────────────────────────────
function nowTime() {
  const d = new Date()
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}

function prioColor(p: string) {
  if (p === 'Kritisch') return 'var(--color-red)'
  if (p === 'Hoch') return '#c9822b'
  if (p === 'Niedrig') return 'var(--color-text-3)'
  return 'var(--color-blue-mid)'
}

// ── Animated counter ──────────────────────────────────────────────────────
function useCounter(target: number, duration = 900) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return val
}

// ── KPI card ──────────────────────────────────────────────────────────────
function KpiCard({ kpi, onClick, expanded }: { kpi: KPI; onClick: () => void; expanded: boolean }) {
  const displayVal = useCounter(kpi.value)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--color-bg-1)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-xl)',
        border: `1px solid ${hovered || expanded ? 'rgba(0,32,69,0.2)' : 'var(--color-border)'}`,
        boxShadow: hovered || expanded ? '0 12px 32px -8px rgba(0,32,69,0.14)' : '0 2px 8px rgba(0,32,69,0.04)',
        transform: hovered ? 'translateY(-3px) scale(1.01)' : 'none',
        transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <p style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-3)' }}>{kpi.label}</p>
        <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: hovered ? 'var(--color-blue)' : 'var(--color-text-3)', transition: 'color 0.2s ease' }}>{kpi.icon}</span>
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1, marginBottom: '0.375rem' }}>
        {displayVal}
      </p>
      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-3)' }}>{kpi.sub}</p>
      {expanded && (
        <div style={{ marginTop: '0.875rem', paddingTop: '0.875rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {kpi.detail.map((d) => (
            <p key={d} style={{ fontSize: '0.72rem', color: 'var(--color-text-2)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-green)', display: 'inline-block', flexShrink: 0 }} />
              {d}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Bar chart ─────────────────────────────────────────────────────────────
function BarChart() {
  const [animated, setAnimated] = useState(false)
  const [tooltip, setTooltip] = useState<{ day: string; val: number; idx: number } | null>(null)
  const maxV = Math.max(...BAR_DATA.map((b) => b.v))

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '0.5rem', height: '120px', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)', position: 'relative' }}>
      {BAR_DATA.map(({ d, v }, i) => {
        const pct = animated ? (v / maxV) * 100 : 0
        const isHigh = v === maxV
        const isHovered = tooltip?.idx === i
        return (
          <div
            key={d}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1, position: 'relative' }}
            onMouseEnter={() => setTooltip({ day: d, val: v, idx: i })}
            onMouseLeave={() => setTooltip(null)}
          >
            {/* Tooltip */}
            {isHovered && (
              <div style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-blue)', color: 'white', padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-md)', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(0,32,69,0.2)', zIndex: 10, pointerEvents: 'none' }}>
                {v} Anfragen
              </div>
            )}
            <div
              style={{
                width: '100%',
                borderRadius: '5px 5px 0 0',
                background: isHigh ? 'var(--color-green)' : isHovered ? 'rgba(110,171,140,0.65)' : `rgba(110,171,140,${0.15 + (v / maxV) * 0.4})`,
                height: `${pct}%`,
                minHeight: '4px',
                transition: `height ${0.5 + i * 0.06}s cubic-bezier(0.16,1,0.3,1), background 0.2s ease`,
              }}
            />
            <span style={{ fontSize: '0.6rem', fontWeight: 700, color: isHovered ? 'var(--color-text)' : 'var(--color-text-3)', fontFamily: 'var(--font-mono)', transition: 'color 0.2s ease' }}>{d}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── Feed item ─────────────────────────────────────────────────────────────
function FeedItem({ item }: { item: FeedEntry }) {
  return (
    <div
      style={{
        display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
        animation: item.isNew ? 'feedSlideIn 0.4s cubic-bezier(0.16,1,0.3,1)' : 'none',
      }}
    >
      <style>{`
        @keyframes feedSlideIn {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-lg)', background: item.isNew ? 'rgba(110,171,140,0.18)' : 'rgba(110,171,140,0.08)', border: `1px solid ${item.isNew ? 'rgba(110,171,140,0.35)' : 'rgba(110,171,140,0.15)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s ease' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '0.95rem', color: 'var(--color-green)' }}>{item.icon}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.1rem' }}>
          <p style={{ fontSize: '0.78rem', fontWeight: item.isNew ? 700 : 600, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>{item.label}</p>
          <span style={{ fontSize: '0.62rem', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)', flexShrink: 0, marginLeft: '0.5rem' }}>{item.time}</span>
        </div>
        <p style={{ fontSize: '0.7rem', color: 'var(--color-text-3)' }}>{item.sub}</p>
      </div>
    </div>
  )
}

// ── View: Übersicht ───────────────────────────────────────────────────────
function OverviewView({ kpis, feed, onKpiClick, expandedKpi }: { kpis: KPI[]; feed: FeedEntry[]; onKpiClick: (id: string) => void; expandedKpi: string | null }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="grid grid-cols-3 gap-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} kpi={k} onClick={() => onKpiClick(k.label)} expanded={expandedKpi === k.label} />
        ))}
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div style={{ gridColumn: 'span 3', background: 'var(--color-bg-1)', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
            <div>
              <p style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-3)', marginBottom: '0.25rem' }}>Nachfragefluss</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.025em' }}>Anfragen dieser Woche</p>
            </div>
            <span style={{ background: 'rgba(110,171,140,0.1)', color: 'var(--color-green)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(110,171,140,0.25)' }}>+12%</span>
          </div>
          <BarChart />
        </div>
        <div style={{ gridColumn: 'span 2', background: 'var(--color-bg-1)', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <p style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-3)' }}>Live-Feed</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>Was heute passiert</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflow: 'hidden' }}>
            {feed.slice(0, 5).map((item) => <FeedItem key={item.id} item={item} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── View: Neue Anfragen ───────────────────────────────────────────────────
function LeadsView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.025em' }}>Neue Anfragen</p>
        <span style={{ background: 'var(--color-blue)', color: 'white', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-full)' }}>5 offen</span>
      </div>
      {SAMPLE_LEADS.map((lead) => (
        <div key={lead.name} style={{ background: 'var(--color-bg-1)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'flex-start', gap: '1rem', transition: 'box-shadow 0.2s ease', cursor: 'pointer' }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px -6px rgba(0,32,69,0.12)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--color-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0 }}>
            {lead.name.split(' ').map(w => w[0]).join('')}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text)' }}>{lead.name} <span style={{ fontWeight: 400, color: 'var(--color-text-3)', fontSize: '0.78rem' }}>· {lead.type}</span></p>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--color-text-3)' }}>{lead.time}</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-2)', marginBottom: '0.375rem' }}>{lead.msg}</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.62rem', padding: '0.12rem 0.5rem', borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-mono)', background: `${prioColor(lead.prio)}15`, color: prioColor(lead.prio), border: `1px solid ${prioColor(lead.prio)}30` }}>{lead.prio}</span>
              <span style={{ fontSize: '0.62rem', padding: '0.12rem 0.5rem', borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-mono)', background: 'rgba(110,171,140,0.1)', color: 'var(--color-green)', border: '1px solid rgba(110,171,140,0.25)' }}>{lead.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── View: Termine ─────────────────────────────────────────────────────────
function TermineView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>Bevorstehende Termine</p>
      {SAMPLE_TERMINE.map((t, i) => (
        <div key={i} style={{ background: 'var(--color-bg-1)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-lg)', background: 'rgba(0,32,69,0.07)', border: '1px solid rgba(0,32,69,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--color-blue)' }}>event</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.125rem' }}>{t.name} — {t.typ}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-3)' }}>{t.datum} · {t.kanal}</p>
          </div>
          <span style={{ fontSize: '0.68rem', padding: '0.22rem 0.65rem', borderRadius: 'var(--radius-full)', background: 'rgba(110,171,140,0.1)', color: 'var(--color-green)', border: '1px solid rgba(110,171,140,0.25)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>Bestätigt</span>
        </div>
      ))}
    </div>
  )
}

// ── View: Rückrufe ────────────────────────────────────────────────────────
function RueckrufeView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>Offene Rückrufe</p>
      {SAMPLE_RUECKRUFE.map((r, i) => (
        <div key={i} style={{ background: 'var(--color-bg-1)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-xl)', border: `1px solid ${r.prio === 'Kritisch' ? 'rgba(186,26,26,0.25)' : 'var(--color-border)'}`, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-lg)', background: `${prioColor(r.prio)}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: prioColor(r.prio) }}>call</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.125rem' }}>{r.name} — {r.grund}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-3)' }}>Fälligkeit: {r.fälligkeit}</p>
          </div>
          <span style={{ fontSize: '0.68rem', padding: '0.22rem 0.65rem', borderRadius: 'var(--radius-full)', background: `${prioColor(r.prio)}12`, color: prioColor(r.prio), border: `1px solid ${prioColor(r.prio)}28`, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{r.prio}</span>
        </div>
      ))}
    </div>
  )
}

// ── View: Berichte ────────────────────────────────────────────────────────
function BerichteView() {
  const metrics = [
    { label: 'Anfragen diesen Monat', value: '89', trend: '+18%', trendUp: true },
    { label: 'Durchschn. Reaktionszeit', value: '1:47 Min.', trend: '−23%', trendUp: true },
    { label: 'Terminquote', value: '68%', trend: '+9%', trendUp: true },
    { label: 'Offene Follow-ups', value: '12', trend: '−5', trendUp: true },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.025em', marginBottom: '0.25rem' }}>Monatsbericht — Mai 2026</p>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((m) => (
          <div key={m.label} style={{ background: 'var(--color-bg-1)', padding: '1.25rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
            <p style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: '0.5rem' }}>{m.label}</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1, marginBottom: '0.375rem' }}>{m.value}</p>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-green)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{m.trend} ggü. Vormonat</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Dashboard Section ────────────────────────────────────────────────
export function DashboardSection() {
  const [activeNav, setActiveNav] = useState('overview')
  const [feed, setFeed] = useState<FeedEntry[]>(INITIAL_FEED)
  const [expandedKpi, setExpandedKpi] = useState<string | null>(null)
  const [kpis, setKpis] = useState<KPI[]>([
    { label: 'ANFRAGEN HEUTE',    value: 11, target: 11, sub: 'inkl. Rückrufen und Terminwünschen', icon: 'inbox',           detail: ['8 über Website-Widget', '2 per Telefon', '1 per E-Mail'] },
    { label: 'TERMINE BESTÄTIGT', value: 6,  target: 6,  sub: 'mit Kalender-Sync und E-Mail',       icon: 'event_available', detail: ['4 Erstgespräche', '2 Folgetermine', 'Nächster: Mo 09:00'] },
    { label: 'OFFENE SCHRITTE',   value: 4,  target: 4,  sub: 'für Rückruf oder Termin',             icon: 'pending_actions', detail: ['2 Rückrufe ausstehend', '1 Angebot senden', '1 Follow-up fällig'] },
  ])
  const feedIdRef = useRef(100)

  // Demo mode: add feed entry every 5–8s
  useEffect(() => {
    const addEntry = () => {
      const pool = FEED_POOL[Math.floor(Math.random() * FEED_POOL.length)]
      const newEntry: FeedEntry = { ...pool, id: String(++feedIdRef.current), time: nowTime(), isNew: true }
      setFeed((prev) => {
        const updated = [newEntry, ...prev.slice(0, 9)]
        return updated
      })
      // Remove isNew flag after animation
      setTimeout(() => {
        setFeed((prev) => prev.map((e) => e.id === newEntry.id ? { ...e, isNew: false } : e))
      }, 600)
      // Occasionally bump a KPI
      if (Math.random() > 0.6) {
        setKpis((prev) => {
          const idx = Math.floor(Math.random() * prev.length)
          return prev.map((k, i) => i === idx ? { ...k, value: k.value + 1 } : k)
        })
      }
    }
    const min = 5000, max = 8000
    let timer: ReturnType<typeof setTimeout>
    const schedule = () => {
      timer = setTimeout(() => { addEntry(); schedule(); }, min + Math.random() * (max - min))
    }
    schedule()
    return () => clearTimeout(timer)
  }, [])

  const handleKpiClick = useCallback((label: string) => {
    setExpandedKpi((prev) => prev === label ? null : label)
  }, [])

  const renderContent = () => {
    switch (activeNav) {
      case 'leads':     return <LeadsView />
      case 'termine':   return <TermineView />
      case 'rueckrufe': return <RueckrufeView />
      case 'berichte':  return <BerichteView />
      default:          return <OverviewView kpis={kpis} feed={feed} onKpiClick={handleKpiClick} expandedKpi={expandedKpi} />
    }
  }

  return (
    <section className="section-y" style={{ background: 'var(--color-bg-2)', overflow: 'hidden' }} aria-labelledby="dash-heading">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 xl:px-24">
        <AnimateIn>
          <div style={{ textAlign: 'center', maxWidth: '52rem', margin: '0 auto 4rem' }}>
            <span className="accent-line" style={{ margin: '0 auto 1.5rem' }} />
            <p className="text-label mb-4">Lead-Übersicht</p>
            <h2 id="dash-heading" className="text-headline-lg" style={{ color: 'var(--color-text)', marginBottom: '1.25rem' }}>Volle Kontrolle über jeden Lead.</h2>
            <p className="text-body-lg" style={{ maxWidth: '38rem', margin: '0 auto' }}>
              Neue Anfragen werden strukturiert aufgenommen und als klare nächste Schritte an dein Team übergeben.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={80}>
          <div style={{ background: 'var(--color-bg-1)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-border)', boxShadow: '0 32px 80px -16px rgba(0,32,69,0.12)', overflow: 'hidden' }}>
            {/* Chrome */}
            <div style={{ background: 'var(--color-blue)', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '6px' }} aria-hidden="true">
                {['#E57373','#FFA726','#66BB6A'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
              </div>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em' }}>GXC Operations — Lead-Übersicht</span>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--color-green)', boxShadow: '0 0 8px rgba(110,171,140,0.6)', animation: 'glow-pulse 2.5s ease-in-out infinite' }} />
                <span style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em' }}>DEMO AKTIV</span>
              </div>
            </div>

            {/* Body */}
            <div style={{ display: 'flex', minHeight: '560px' }}>
              {/* Sidebar */}
              <div style={{ width: '240px', flexShrink: 0, background: 'var(--color-blue)', padding: '1.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h3 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: '0.5rem' }}>Lead-Übersicht</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', lineHeight: 1.55 }}>Klare Sicht auf Anfragen, Termine und nächste Schritte.</p>
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', flex: 1 }} aria-label="Dashboard Navigation">
                  {NAV_ITEMS.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => { setActiveNav(id); setExpandedKpi(null); }}
                      aria-current={activeNav === id ? 'page' : undefined}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.6rem',
                        padding: '0.6rem 0.875rem', borderRadius: 'var(--radius-lg)',
                        background: activeNav === id ? 'rgba(255,255,255,0.14)' : 'transparent',
                        border: `1px solid ${activeNav === id ? 'rgba(255,255,255,0.15)' : 'transparent'}`,
                        color: activeNav === id ? 'white' : 'rgba(255,255,255,0.55)',
                        fontSize: '0.875rem', fontFamily: 'var(--font-body)', fontWeight: activeNav === id ? 600 : 400,
                        cursor: 'pointer', textAlign: 'left', width: '100%',
                        transition: 'all 0.18s ease',
                      }}
                      onMouseEnter={(e) => { if (activeNav !== id) { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; } }}
                      onMouseLeave={(e) => { if (activeNav !== id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; } }}
                    >
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: activeNav === id ? 'var(--color-green)' : 'rgba(255,255,255,0.25)', flexShrink: 0, transition: 'background 0.2s ease' }} />
                      {label}
                    </button>
                  ))}
                </nav>
                <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 'var(--radius-lg)', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ color: 'white', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.25rem' }}>System aktiv</p>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', lineHeight: 1.5 }}>Leads werden automatisch erfasst und strukturiert.</p>
                </div>
              </div>

              {/* Main panel */}
              <div style={{ flex: 1, padding: '2rem', background: 'var(--color-bg-2)', display: 'flex', flexDirection: 'column', gap: '0', minWidth: 0, overflowY: 'auto' }}>
                {/* Top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.025em' }}>
                    Behalten Sie den Überblick.
                  </h4>
                  <div style={{ background: 'var(--color-bg-1)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.625rem', boxShadow: '0 2px 8px rgba(0,32,69,0.06)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-green)', fontSize: '1rem' }}>
                      {kpis[0].value}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-3)' }}>neue Vorgänge heute</span>
                  </div>
                </div>

                {/* Content with transition */}
                <div style={{ flex: 1, animation: 'fadeIn 0.3s ease' }} key={activeNav}>
                  <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }`}</style>
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
