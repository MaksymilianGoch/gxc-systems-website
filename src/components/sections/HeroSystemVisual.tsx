'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// ── card geometry ────────────────────────────────────────────────────────────
const CARD_W = 176
const CARD_H = 72

// ── physics constants ─────────────────────────────────────────────────────────
const DAMPING       = 0.989    // velocity decay per frame
const MAX_SPEED     = 2.6      // px/frame cap (idle)
const REP_R         = 215      // card–card repulsion radius
const REP_K         = 11000    // card–card repulsion strength
const CMD_REP_R     = 162      // command-center exclusion radius
const CMD_REP_K     = 18000    // command-center repulsion
const WALL_ZONE     = 58       // soft-wall push zone (px from edge)
const WALL_FORCE    = 1.4      // wall push multiplier
const NOISE         = 0.038    // random drift per frame
const ACTIVE_DAMP   = 0.90     // extra slow-down while 'active'
const DONE_DAMP     = 0.72     // rapid stop while 'done'
const TX_SPEED      = 3.4      // transmitting approach speed (px/frame)
const SNAP_DIST     = 30       // px from center → trigger done

const REQUESTS = [
  { id: 0, icon: 'email',         channel: 'E-Mail',           preview: 'Badezimmer Renovierung', contact: 'Thomas M.', statusDone: 'Lead erfasst'        },
  { id: 1, icon: 'chat',          channel: 'WhatsApp',         preview: 'Wann kann ich Termin?',  contact: 'Sarah L.',  statusDone: 'Priorität erkannt'   },
  { id: 2, icon: 'description',   channel: 'Kontaktformular',  preview: 'Elektroinstallation',    contact: 'K. Huber',  statusDone: 'Termin vorbereitet'  },
  { id: 3, icon: 'phone_missed',  channel: 'Verpasster Anruf', preview: '+43 664 123 456',        contact: 'Unbekannt', statusDone: 'Follow-up aktiv'     },
  { id: 4, icon: 'call_received', channel: 'Rückrufbitte',     preview: 'J. Müller · dringend',   contact: 'J. Müller', statusDone: 'Team benachrichtigt' },
]

// Starting positions (spread around the center exclusion zone)
const INIT: { x: number; y: number; vx: number; vy: number }[] = [
  { x: 14,  y: 22,  vx: 1.1,  vy: 0.6  },
  { x: 328, y: 16,  vx: -0.9, vy: 0.7  },
  { x: 6,   y: 250, vx: 1.3,  vy: -0.4 },
  { x: 328, y: 435, vx: -1.0, vy: -0.7 },
  { x: 14,  y: 435, vx: 0.8,  vy: -1.0 },
]

type Phase = 'idle' | 'active' | 'transmitting' | 'done'
interface FeedItem { statusDone: string; contact: string; key: number }

// Spawn a card at a random edge far from center
function edgeSpawn(cw: number, ch: number): { x: number; y: number; vx: number; vy: number } {
  const side = Math.floor(Math.random() * 4)
  const rand = Math.random
  switch (side) {
    case 0: return { x: rand() * (cw - CARD_W - 30) + 15, y: 12,             vx: (rand() - 0.5) * 1.8, vy: rand() * 1.2 + 0.4 }
    case 1: return { x: cw - CARD_W - 12,                  y: rand() * (ch - CARD_H - 30) + 15, vx: -(rand() * 1.2 + 0.4), vy: (rand() - 0.5) * 1.8 }
    case 2: return { x: rand() * (cw - CARD_W - 30) + 15, y: ch - CARD_H - 12, vx: (rand() - 0.5) * 1.8, vy: -(rand() * 1.2 + 0.4) }
    default: return { x: 12,                                y: rand() * (ch - CARD_H - 30) + 15, vx: rand() * 1.2 + 0.4,  vy: (rand() - 0.5) * 1.8 }
  }
}

export function HeroSystemVisual() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const cardRefs      = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null))
  const lineRefs      = useRef<(SVGLineElement | null)[]>(Array(5).fill(null))
  const physRef       = useRef(INIT.map(p => ({ ...p })))
  const phaseRef      = useRef<Phase[]>(Array(5).fill('idle') as Phase[])
  const arrivedRef    = useRef<boolean[]>(Array(5).fill(false))
  const sizeRef       = useRef({ w: 520, h: 560 })

  const [phases, setPhases] = useState<Phase[]>(Array(5).fill('idle') as Phase[])
  const [feed,   setFeed]   = useState<FeedItem[]>([])
  const [count,  setCount]  = useState(14)

  // Sync phaseRef → React state
  const setPhase = useCallback((idx: number, ph: Phase) => {
    phaseRef.current = phaseRef.current.map((v, i) => (i === idx ? ph : v)) as Phase[]
    setPhases(prev => prev.map((v, i) => (i === idx ? ph : v)) as Phase[])
  }, [])

  // ── physics RAF ──────────────────────────────────────────────────────────────
  useEffect(() => {
    let rafId: number
    let alive = true

    const measure = () => {
      const el = containerRef.current
      if (el) {
        const r = el.getBoundingClientRect()
        sizeRef.current = { w: r.width || 520, h: r.height || 560 }
      }
    }
    measure()
    window.addEventListener('resize', measure, { passive: true })

    const tick = () => {
      if (!alive) return
      const { w: cw, h: ch } = sizeRef.current
      const cmdCx = cw / 2
      const cmdCy = ch / 2
      const phys = physRef.current
      const ph   = phaseRef.current

      for (let i = 0; i < 5; i++) {
        const p     = phys[i]
        const phase = ph[i]
        const cx    = p.x + CARD_W / 2
        const cy    = p.y + CARD_H / 2

        if (phase === 'transmitting') {
          const dx   = cmdCx - cx
          const dy   = cmdCy - cy
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < SNAP_DIST && !arrivedRef.current[i]) {
            arrivedRef.current[i] = true
            // Trigger done + reset (deferred from RAF to avoid setState in hot loop)
            setTimeout(() => {
              if (!alive) return
              setFeed(f => [{ statusDone: REQUESTS[i].statusDone, contact: REQUESTS[i].contact, key: Date.now() }, ...f].slice(0, 4))
              setCount(c => c + 1)
              setPhase(i, 'done')
              setTimeout(() => {
                if (!alive) return
                const spawn = edgeSpawn(cw, ch)
                phys[i].x  = spawn.x
                phys[i].y  = spawn.y
                phys[i].vx = spawn.vx
                phys[i].vy = spawn.vy
                arrivedRef.current[i] = false
                setPhase(i, 'idle')
              }, 680)
            }, 0)
          } else if (dist > 0 && !arrivedRef.current[i]) {
            // Constant-speed approach with ease-in on close range
            const speed = Math.min(TX_SPEED, dist * 0.12)
            p.vx = (dx / dist) * speed
            p.vy = (dy / dist) * speed
          }

        } else if (phase === 'idle') {
          // ── card–card repulsion ──
          for (let j = 0; j < 5; j++) {
            if (j === i) continue
            const pj   = phys[j]
            const dx   = cx - (pj.x + CARD_W / 2)
            const dy   = cy - (pj.y + CARD_H / 2)
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < REP_R && dist > 1) {
              const f = (REP_K / (dist * dist)) * 0.016
              p.vx += (dx / dist) * f
              p.vy += (dy / dist) * f
            }
          }

          // ── command-center repulsion ──
          const cdx  = cx - cmdCx
          const cdy  = cy - cmdCy
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy)
          if (cdist < CMD_REP_R && cdist > 1) {
            const f = (CMD_REP_K / (cdist * cdist)) * 0.016
            p.vx += (cdx / cdist) * f
            p.vy += (cdy / cdist) * f
          }

          // ── soft-wall push ──
          if (p.x < WALL_ZONE)              p.vx += WALL_FORCE * (WALL_ZONE - p.x) / WALL_ZONE
          if (p.x > cw - CARD_W - WALL_ZONE) p.vx -= WALL_FORCE * (p.x - (cw - CARD_W - WALL_ZONE)) / WALL_ZONE
          if (p.y < WALL_ZONE)              p.vy += WALL_FORCE * (WALL_ZONE - p.y) / WALL_ZONE
          if (p.y > ch - CARD_H - WALL_ZONE) p.vy -= WALL_FORCE * (p.y - (ch - CARD_H - WALL_ZONE)) / WALL_ZONE

          // ── noise ──
          p.vx += (Math.random() - 0.5) * NOISE
          p.vy += (Math.random() - 0.5) * NOISE

          // ── damping + speed cap ──
          p.vx *= DAMPING
          p.vy *= DAMPING
          const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
          if (spd > MAX_SPEED) { p.vx = p.vx / spd * MAX_SPEED; p.vy = p.vy / spd * MAX_SPEED }

        } else if (phase === 'active') {
          p.vx *= ACTIVE_DAMP
          p.vy *= ACTIVE_DAMP

        } else if (phase === 'done') {
          p.vx *= DONE_DAMP
          p.vy *= DONE_DAMP
        }

        // ── integrate ──
        p.x += p.vx
        p.y += p.vy
        p.x = Math.max(0, Math.min(cw - CARD_W, p.x))
        p.y = Math.max(0, Math.min(ch - CARD_H, p.y))

        // ── update DOM ──
        const cardEl = cardRefs.current[i]
        if (cardEl) cardEl.style.transform = `translate(${Math.round(p.x)}px,${Math.round(p.y)}px)`

        const lineEl = lineRefs.current[i]
        if (lineEl) {
          lineEl.setAttribute('x1', String(Math.round(p.x + CARD_W / 2)))
          lineEl.setAttribute('y1', String(Math.round(p.y + CARD_H / 2)))
          lineEl.setAttribute('x2', String(Math.round(cmdCx)))
          lineEl.setAttribute('y2', String(Math.round(cmdCy)))
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => { alive = false; cancelAnimationFrame(rafId); window.removeEventListener('resize', measure) }
  }, [setPhase])

  // ── phase-cycle timer ─────────────────────────────────────────────────────────
  useEffect(() => {
    let alive = true
    let cursor = 0

    const runCard = () => {
      if (!alive) return
      const idx = cursor
      setPhase(idx, 'active')

      const t1 = setTimeout(() => { if (alive) setPhase(idx, 'transmitting') }, 800)
      // cursor advances independently; the physics loop handles done/idle transitions
      const t2 = setTimeout(() => {
        if (!alive) return
        cursor = (cursor + 1) % 5
        setTimeout(runCard, 500)
      }, 3800)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }

    const init = setTimeout(runCard, 1600)
    return () => { alive = false; clearTimeout(init) }
  }, [setPhase])

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: 'clamp(460px, 46vw, 560px)', overflow: 'hidden' }}
    >
      <style>{`
        @keyframes hsvDot  { 0%,100%{opacity:1} 50%{opacity:0.28} }
        @keyframes hsvFeed { from{opacity:0;transform:translateY(-5px)} to{opacity:1;transform:none} }
        @keyframes hsvPing { 0%,80%,100%{transform:scale(0.8);opacity:0.3} 40%{transform:scale(1.35) translateY(-2px);opacity:1} }
        @keyframes hsvCmd  { 0%,100%{box-shadow:0 28px 56px -16px rgba(0,0,0,0.5)} 50%{box-shadow:0 28px 56px -16px rgba(0,0,0,0.5),0 0 0 3px rgba(74,222,128,0.09)} }
      `}</style>

      {/* SVG rail layer — no viewBox: px coords = container px coords */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 20, overflow: 'visible' }}
      >
        <defs>
          <filter id="hsv-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {REQUESTS.map((_, i) => {
          const isLive = phases[i] === 'transmitting'
          return (
            <line
              key={i}
              ref={el => { lineRefs.current[i] = el }}
              x1="0" y1="0" x2="0" y2="0"
              stroke={isLive ? 'rgba(74,222,128,0.42)' : 'rgba(174,199,245,0.1)'}
              strokeWidth={isLive ? 1.5 : 0.7}
              strokeDasharray={isLive ? '5 7' : '3 9'}
              style={{ transition: 'stroke 0.4s ease, stroke-width 0.3s ease' }}
            />
          )
        })}
      </svg>

      {/* Request cards — positioned at (0,0); RAF sets transform */}
      {REQUESTS.map((req, i) => {
        const phase    = phases[i]
        const isActive = phase === 'active' || phase === 'transmitting'
        const isDone   = phase === 'done'
        return (
          <div
            key={req.id}
            ref={el => { cardRefs.current[i] = el }}
            style={{
              position: 'absolute',
              left: 0, top: 0,
              width: CARD_W,
              willChange: 'transform',
              backdropFilter: 'blur(14px) saturate(1.5)',
              background: isDone
                ? 'rgba(237,252,244,0.97)'
                : isActive
                  ? 'rgba(255,255,255,0.97)'
                  : 'rgba(255,255,255,0.82)',
              border: isDone
                ? '1.5px solid rgba(74,222,128,0.45)'
                : isActive
                  ? '1.5px solid rgba(174,199,245,0.85)'
                  : '1px solid rgba(255,255,255,0.46)',
              borderRadius: 12,
              boxShadow: isActive
                ? '0 12px 36px -8px rgba(0,32,69,0.22), 0 0 0 3px rgba(174,199,245,0.12)'
                : isDone
                  ? '0 8px 24px -8px rgba(74,222,128,0.22)'
                  : '0 6px 20px -6px rgba(0,32,69,0.1)',
              padding: '0.625rem 0.8rem',
              zIndex: isActive ? 25 : isDone ? 22 : 10,
              opacity: isDone ? 0 : 1,
              transition: 'opacity 0.25s ease, border 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
              cursor: 'default',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.28rem' }}>
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: '0.82rem',
                  color: isDone ? '#15803d' : isActive ? 'var(--color-blue)' : '#94a3b8',
                  fontVariationSettings: isDone ? "'FILL' 1" : "'FILL' 0",
                  flexShrink: 0,
                  transition: 'color 0.3s ease',
                }}
              >
                {isDone ? 'check_circle' : req.icon}
              </span>
              <span style={{
                fontSize: '0.58rem', fontFamily: 'var(--font-mono)', fontWeight: 700,
                color: isDone ? '#15803d' : isActive ? 'var(--color-blue)' : 'var(--color-text-3)',
                textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap',
                transition: 'color 0.3s ease',
              }}>
                {isDone ? req.statusDone : req.channel}
              </span>
            </div>
            <p style={{
              fontSize: '0.67rem', color: isDone ? '#4d7c60' : 'var(--color-text-2)',
              lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              opacity: isDone ? 0.75 : 1,
            }}>
              {req.contact} · {req.preview}
            </p>
            {phase === 'transmitting' && (
              <div style={{ display: 'flex', gap: 3, marginTop: '0.32rem', alignItems: 'center' }}>
                {[0, 1, 2].map(d => (
                  <span key={d} style={{
                    display: 'inline-block', width: 3, height: 3, borderRadius: '50%', background: '#4ade80',
                    animation: `hsvPing 0.85s ${d * 0.18}s ease-in-out infinite`,
                  }} />
                ))}
                <span style={{ fontSize: '0.52rem', color: '#4ade80', fontFamily: 'var(--font-mono)', marginLeft: 5 }}>
                  Verarbeite...
                </span>
              </div>
            )}
          </div>
        )
      })}

      {/* Command Center — fixed at CSS center, above cards */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 256,
        backdropFilter: 'blur(24px) saturate(1.8)',
        background: 'linear-gradient(145deg, rgba(10,22,56,0.96) 0%, rgba(8,18,48,0.98) 100%)',
        border: '1px solid rgba(140,180,255,0.16)',
        borderRadius: 16, overflow: 'hidden',
        boxShadow: '0 32px 64px -16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)',
        zIndex: 30,
        animation: 'hsvCmd 3.5s ease-in-out infinite',
      }}>
        {/* Title bar */}
        <div style={{ padding: '0.7rem 0.875rem 0.65rem', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.025)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80', animation: 'hsvDot 2.8s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.57rem', fontWeight: 700, color: 'rgba(255,255,255,0.82)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>GXC Command Center</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: 'rgba(255,255,255,0.28)' }}>v2.1</span>
        </div>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem', padding: '0.7rem 0.875rem 0' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '0.45rem 0.6rem' }}>
            <p style={{ fontSize: '0.48rem', color: 'rgba(174,199,245,0.65)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', marginBottom: '0.12rem' }}>Heute erfasst</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>{count}</p>
          </div>
          <div style={{ background: 'rgba(74,222,128,0.07)', borderRadius: 8, padding: '0.45rem 0.6rem', border: '1px solid rgba(74,222,128,0.12)' }}>
            <p style={{ fontSize: '0.48rem', color: 'rgba(74,222,128,0.65)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', marginBottom: '0.12rem' }}>Ø Reaktion</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: '#4ade80', lineHeight: 1 }}>&lt; 2 Min</p>
          </div>
        </div>
        {/* Feed */}
        <div style={{ padding: '0.7rem 0.875rem', minHeight: 148 }}>
          <p style={{ fontSize: '0.46rem', color: 'rgba(255,255,255,0.26)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>Live Feed</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {feed.length === 0 ? (
              <p style={{ fontSize: '0.63rem', color: 'rgba(255,255,255,0.16)', fontStyle: 'italic' }}>Warte auf erste Anfrage...</p>
            ) : feed.map((item, j) => (
              <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: Math.max(0.28, 1 - j * 0.22), animation: j === 0 ? 'hsvFeed 0.35s ease' : 'none' }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '0.63rem', color: 'rgba(255,255,255,0.88)', fontWeight: 600, lineHeight: 1.25 }}>{item.statusDone}</p>
                  <p style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>{item.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Bottom bar */}
        <div style={{ padding: '0.45rem 0.875rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.48rem', color: 'rgba(255,255,255,0.22)', fontFamily: 'var(--font-mono)' }}>System aktiv seit 08:00</span>
          <span style={{ fontSize: '0.48rem', color: '#4ade80', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.06em' }}>● LIVE</span>
        </div>
      </div>
    </div>
  )
}
