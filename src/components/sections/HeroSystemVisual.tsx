'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const CARD_W = 158
const CARD_H = 62

const DAMPING    = 0.985
const MAX_SPEED  = 1.55
const CARD_REP_R = 188
const CARD_REP_K = 7800
const WALL_ZONE  = 44
const WALL_F     = 0.9
const NOISE      = 0.02
const EXCL_R     = 192
const EXCL_K     = 24000
const CAP_SPEED  = 2.8
const SNAP       = 24
const CAP_MIN    = 3400
const CAP_MAX    = 5200

const LEADS = [
  { id: 0, icon: 'email',         type: 'E-Mail',           name: 'Thomas M.',  detail: 'Badezimmer Renovierung', accent: '#aec7f5' },
  { id: 1, icon: 'chat',          type: 'WhatsApp',         name: 'Sarah L.',   detail: 'Terminanfrage · dringend', accent: '#86c4a4' },
  { id: 2, icon: 'description',   type: 'Kontaktformular',  name: 'K. Huber',   detail: 'Elektroinstallation',    accent: '#aec7f5' },
  { id: 3, icon: 'phone_missed',  type: 'Verpasster Anruf', name: 'Unbekannt',  detail: '+43 664 123 456',        accent: '#f0c090' },
  { id: 4, icon: 'call_received', type: 'Rückrufbitte',     name: 'J. Müller',  detail: 'Heizung · dringend',     accent: '#c0a8e8' },
  { id: 5, icon: 'event',         type: 'Terminwunsch',     name: 'A. Fischer', detail: 'Mo–Mi ab 14 Uhr',        accent: '#86c4a4' },
]

const FEED_ACTIONS = [
  'Lead erfasst',
  'Anliegen klassifiziert',
  'Priorität: Hoch',
  'CRM-Eintrag erstellt',
  'Team benachrichtigt',
  'Follow-up vorbereitet',
  'Termin vorbereitet',
  'Bestätigung gesendet',
]

type Phase = 'free' | 'targeted' | 'moving' | 'captured'
interface Phys { x: number; y: number; vx: number; vy: number }
interface FeedItem { action: string; lead: string; key: number }

// ── Shared octopus SVG (also imported by Navigation) ─────────────────────────
export function OctopusSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path d="M25 5 L75 5 L97 50 L75 95 L25 95 L3 50 Z"
        fill="rgba(8,20,52,0.12)" stroke="rgba(140,182,255,0.52)" strokeWidth="3.2"/>
      <path d="M29 11 L71 11 L91 50 L71 89 L29 89 L9 50 Z"
        fill="none" stroke="rgba(140,182,255,0.18)" strokeWidth="1.6"/>
      <ellipse cx="50" cy="29" rx="15.5" ry="21" fill="rgba(158,192,240,0.92)"/>
      <path d="M34.5 37 Q17 32 9 43 Q3 52 9 60 Q15 68 23 63"
        stroke="rgba(128,174,238,0.95)" strokeWidth="4.8" strokeLinecap="round" fill="none"/>
      <path d="M65.5 37 Q83 32 91 43 Q97 52 91 60 Q85 68 77 63"
        stroke="rgba(128,174,238,0.95)" strokeWidth="4.8" strokeLinecap="round" fill="none"/>
      <path d="M38 50 Q27 63 26 75 Q25 83 29 86"
        stroke="rgba(126,172,236,0.92)" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
      <path d="M45 54 Q36 67 36 79 Q36 86 40 88"
        stroke="rgba(126,172,236,0.92)" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
      <path d="M55 54 Q64 67 64 79 Q64 86 60 88"
        stroke="rgba(126,172,236,0.92)" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
      <path d="M62 50 Q73 63 74 75 Q75 83 71 86"
        stroke="rgba(126,172,236,0.92)" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
      <polyline points="29,86 29,90"
        stroke="rgba(112,165,232,0.78)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="29" cy="90" r="3.8" fill="rgba(60,148,255,0.96)"/>
      <polyline points="40,88 40,90 35,90 35,93"
        stroke="rgba(112,165,232,0.78)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="35" cy="93" r="3.8" fill="rgba(60,148,255,0.96)"/>
      <line x1="50" y1="50" x2="50" y2="91"
        stroke="rgba(112,165,232,0.62)" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="50" cy="91" r="3.8" fill="rgba(60,148,255,0.96)"/>
      <polyline points="60,88 60,90 65,90 65,93"
        stroke="rgba(112,165,232,0.78)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="65" cy="93" r="3.8" fill="rgba(60,148,255,0.96)"/>
      <polyline points="71,86 71,90"
        stroke="rgba(112,165,232,0.78)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="71" cy="90" r="3.8" fill="rgba(60,148,255,0.96)"/>
    </svg>
  )
}

function getSpawn(cw: number, ch: number, cmdCx: number, cmdCy: number): Phys {
  const M = 12
  const pool: [number, number][] = [
    [M, M], [cw - CARD_W - M, M],
    [M, ch * 0.3], [cw - CARD_W - M, ch * 0.3],
    [M, ch - CARD_H - M], [cw - CARD_W - M, ch - CARD_H - M],
    [cw * 0.28 - CARD_W / 2, M], [cw * 0.72 - CARD_W / 2, M],
    [cw * 0.28 - CARD_W / 2, ch - CARD_H - M],
    [cw * 0.72 - CARD_W / 2, ch - CARD_H - M],
  ].sort(() => Math.random() - 0.5) as [number, number][]

  for (const [x, y] of pool) {
    const cx = x + CARD_W / 2
    const cy = y + CARD_H / 2
    if (Math.hypot(cx - cmdCx, cy - cmdCy) > EXCL_R + 28
      && x >= 0 && x <= cw - CARD_W
      && y >= 0 && y <= ch - CARD_H) {
      return { x, y, vx: (Math.random() - 0.5) * 1.1, vy: (Math.random() - 0.5) * 1.1 }
    }
  }
  return { x: M, y: M, vx: 0.5, vy: 0.4 }
}

export function HeroSystemVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs     = useRef<(HTMLDivElement | null)[]>(Array(6).fill(null))
  const lineRefs     = useRef<(SVGLineElement | null)[]>(Array(6).fill(null))
  const physRef      = useRef<Phys[]>([
    { x: 12,  y: 18,  vx:  0.7, vy:  0.5 },
    { x: 358, y: 14,  vx: -0.6, vy:  0.7 },
    { x: 10,  y: 192, vx:  0.9, vy: -0.3 },
    { x: 358, y: 408, vx: -0.8, vy: -0.5 },
    { x: 12,  y: 482, vx:  0.6, vy: -0.8 },
    { x: 182, y: 538, vx:  0.4, vy: -0.7 },
  ])
  const phaseRef    = useRef<Phase[]>(Array(6).fill('free') as Phase[])
  const capturedRef = useRef<boolean[]>(Array(6).fill(false))
  const sizeRef     = useRef({ w: 540, h: 628 })
  const prevTRef    = useRef(0)

  const [phases, setPhases] = useState<Phase[]>(Array(6).fill('free') as Phase[])
  const [feed,   setFeed]   = useState<FeedItem[]>([])
  const [count,  setCount]  = useState(0)

  const setPhase = useCallback((idx: number, ph: Phase) => {
    phaseRef.current = phaseRef.current.map((v, i) => i === idx ? ph : v) as Phase[]
    setPhases(prev => prev.map((v, i) => i === idx ? ph : v) as Phase[])
  }, [])

  // ── RAF physics (delta-time normalised) ─────────────────────────────────────
  useEffect(() => {
    let rafId: number
    let alive = true

    const measure = () => {
      const el = containerRef.current
      if (el) { const r = el.getBoundingClientRect(); sizeRef.current = { w: r.width || 540, h: r.height || 628 } }
    }
    measure()
    window.addEventListener('resize', measure, { passive: true })

    const tick = (now: number) => {
      if (!alive) return
      const dt = Math.min((now - prevTRef.current) / 16.67, 2.4)
      prevTRef.current = now

      const { w: cw, h: ch } = sizeRef.current
      const cmdCx = cw / 2
      const cmdCy = ch * 0.47

      for (let i = 0; i < 6; i++) {
        const p  = physRef.current[i]
        const ph = phaseRef.current[i]

        if (ph === 'moving') {
          const dx = cmdCx - (p.x + CARD_W / 2)
          const dy = cmdCy - (p.y + CARD_H / 2)
          const d  = Math.hypot(dx, dy)
          if (d < SNAP && !capturedRef.current[i]) {
            capturedRef.current[i] = true
            const ci = i
            setTimeout(() => {
              if (!alive) return
              const action = FEED_ACTIONS[Math.floor(Math.random() * FEED_ACTIONS.length)]
              setFeed(f => [{ action, lead: LEADS[ci].name, key: Date.now() }, ...f].slice(0, 5))
              setCount(c => c + 1)
              setPhase(ci, 'captured')
              setTimeout(() => {
                if (!alive) return
                const sp = getSpawn(sizeRef.current.w, sizeRef.current.h, sizeRef.current.w / 2, sizeRef.current.h * 0.47)
                physRef.current[ci] = sp
                capturedRef.current[ci] = false
                setPhase(ci, 'free')
              }, 720)
            }, 0)
          } else if (!capturedRef.current[i] && d > 0) {
            const s = Math.min(CAP_SPEED, d * 0.09)
            p.vx = (dx / d) * s
            p.vy = (dy / d) * s
          }

        } else if (ph === 'free' || ph === 'targeted') {
          // card–card repulsion
          for (let j = 0; j < 6; j++) {
            if (j === i || phaseRef.current[j] === 'captured') continue
            const pj = physRef.current[j]
            const dx = (p.x + CARD_W / 2) - (pj.x + CARD_W / 2)
            const dy = (p.y + CARD_H / 2) - (pj.y + CARD_H / 2)
            const d  = Math.hypot(dx, dy)
            if (d < CARD_REP_R && d > 1) {
              const f = (CARD_REP_K / (d * d)) * 0.016 * dt
              p.vx += (dx / d) * f
              p.vy += (dy / d) * f
            }
          }
          // CMD exclusion zone
          const cdx = (p.x + CARD_W / 2) - cmdCx
          const cdy = (p.y + CARD_H / 2) - cmdCy
          const cd  = Math.hypot(cdx, cdy)
          if (cd < EXCL_R && cd > 1) {
            const f = (EXCL_K / (cd * cd)) * 0.016 * dt
            p.vx += (cdx / cd) * f
            p.vy += (cdy / cd) * f
          }
          // soft walls
          if (p.x < WALL_ZONE)                   p.vx += WALL_F * dt * (WALL_ZONE - p.x) / WALL_ZONE
          if (p.x > cw - CARD_W - WALL_ZONE)     p.vx -= WALL_F * dt * (p.x - (cw - CARD_W - WALL_ZONE)) / WALL_ZONE
          if (p.y < WALL_ZONE)                   p.vy += WALL_F * dt * (WALL_ZONE - p.y) / WALL_ZONE
          if (p.y > ch - CARD_H - WALL_ZONE)     p.vy -= WALL_F * dt * (p.y - (ch - CARD_H - WALL_ZONE)) / WALL_ZONE
          // noise + damp
          p.vx += (Math.random() - 0.5) * NOISE * dt
          p.vy += (Math.random() - 0.5) * NOISE * dt
          p.vx *= Math.pow(DAMPING, dt)
          p.vy *= Math.pow(DAMPING, dt)
          const spd = Math.hypot(p.vx, p.vy)
          if (spd > MAX_SPEED) { p.vx = p.vx / spd * MAX_SPEED; p.vy = p.vy / spd * MAX_SPEED }

        } else {
          p.vx = 0; p.vy = 0
        }

        p.x = Math.max(0, Math.min(cw - CARD_W, p.x + p.vx * dt))
        p.y = Math.max(0, Math.min(ch - CARD_H, p.y + p.vy * dt))

        const el = cardRefs.current[i]
        if (el) el.style.transform = `translate(${Math.round(p.x)}px,${Math.round(p.y)}px)`

        const ln = lineRefs.current[i]
        if (ln) {
          ln.setAttribute('x1', String(Math.round(p.x + CARD_W / 2)))
          ln.setAttribute('y1', String(Math.round(p.y + CARD_H / 2)))
          ln.setAttribute('x2', String(Math.round(cmdCx)))
          ln.setAttribute('y2', String(Math.round(cmdCy)))
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => { alive = false; cancelAnimationFrame(rafId); window.removeEventListener('resize', measure) }
  }, [setPhase])

  // ── capture scheduler ───────────────────────────────────────────────────────
  useEffect(() => {
    let alive = true
    const next = () => {
      if (!alive) return
      setTimeout(() => {
        if (!alive) return
        const free = phaseRef.current.map((p, i) => p === 'free' ? i : -1).filter(i => i >= 0)
        if (free.length > 0) {
          const idx = free[Math.floor(Math.random() * free.length)]
          setPhase(idx, 'targeted')
          setTimeout(() => { if (alive && phaseRef.current[idx] === 'targeted') setPhase(idx, 'moving') }, 1000)
        }
        next()
      }, CAP_MIN + Math.random() * (CAP_MAX - CAP_MIN))
    }
    const t = setTimeout(next, 2000)
    return () => { alive = false; clearTimeout(t) }
  }, [setPhase])

  // ── reset every 60 s ────────────────────────────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => { setCount(0); setFeed([]) }, 60000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(500px, 54vw, 680px)',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #070d1e 0%, #0b162e 55%, #080f27 100%)',
        borderRadius: 20,
        border: '1px solid rgba(140,182,255,0.1)',
        boxShadow: '0 28px 80px -16px rgba(0,0,0,0.55)',
      }}
    >
      <style>{`
        @keyframes ldot   { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes lfeed  { from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:none} }
        @keyframes lglow  {
          0%,100%{box-shadow:0 0 0 1px rgba(174,199,245,0.08),0 0 28px rgba(100,150,240,0.1),0 24px 56px -12px rgba(0,0,0,0.6)}
          50%    {box-shadow:0 0 0 1px rgba(174,199,245,0.16),0 0 46px rgba(100,150,240,0.18),0 24px 56px -12px rgba(0,0,0,0.6)}
        }
      `}</style>

      {/* Subtle dot grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 1 }} aria-hidden="true" />

      {/* Ambient orbs */}
      <div style={{ position: 'absolute', top: '-18%', left: '-10%', width: '52%', height: '52%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(100,148,240,0.055) 0%, transparent 70%)', filter: 'blur(44px)', pointerEvents: 'none', zIndex: 1 }} aria-hidden="true" />
      <div style={{ position: 'absolute', bottom: '-12%', right: '-8%', width: '42%', height: '42%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(100,190,155,0.045) 0%, transparent 70%)', filter: 'blur(44px)', pointerEvents: 'none', zIndex: 1 }} aria-hidden="true" />

      {/* SVG rail layer */}
      <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 14, overflow: 'visible' }}>
        {LEADS.map((_, i) => {
          const active = phases[i] === 'targeted' || phases[i] === 'moving'
          return (
            <line key={i} ref={el => { lineRefs.current[i] = el }}
              x1="0" y1="0" x2="0" y2="0"
              stroke={active ? 'rgba(174,199,245,0.38)' : 'rgba(174,199,245,0.055)'}
              strokeWidth={active ? 1.2 : 0.5}
              strokeDasharray={phases[i] === 'moving' ? '4 5' : '2 10'}
              style={{ transition: 'stroke 0.5s ease, stroke-width 0.4s ease' }}
            />
          )
        })}
      </svg>

      {/* ── Lead cards ── */}
      {LEADS.map((lead, i) => {
        const ph      = phases[i]
        const isActive = ph === 'targeted' || ph === 'moving'
        const isMoving = ph === 'moving'
        const isDone   = ph === 'captured'
        return (
          <div
            key={lead.id}
            ref={el => { cardRefs.current[i] = el }}
            style={{
              position: 'absolute', left: 0, top: 0,
              width: CARD_W, willChange: 'transform',
              backdropFilter: 'blur(12px) saturate(1.3)',
              background: isActive ? 'rgba(255,255,255,0.11)' : isDone ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.065)',
              border: isActive ? `1px solid ${lead.accent}66` : '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              boxShadow: isActive
                ? `0 8px 26px -6px rgba(0,0,0,0.45), 0 0 0 2px ${lead.accent}22`
                : '0 4px 14px -4px rgba(0,0,0,0.35)',
              padding: '0.5rem 0.68rem',
              zIndex: isActive ? 25 : isDone ? 5 : 12,
              opacity: isDone ? 0 : 1,
              transition: 'opacity 0.2s ease, border 0.35s ease, box-shadow 0.35s ease, background 0.35s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.36rem', marginBottom: '0.2rem' }}>
              <span style={{
                display: 'inline-block', width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                background: isActive ? '#4ade80' : lead.accent,
                boxShadow: isActive ? '0 0 6px #4ade80' : 'none',
                animation: isActive ? 'ldot 1.2s ease-in-out infinite' : 'none',
              }} />
              <span className="material-symbols-outlined" style={{ fontSize: '0.7rem', color: lead.accent, flexShrink: 0, fontVariationSettings: "'FILL' 1" }}>
                {lead.icon}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.54rem', fontWeight: 700, color: isActive ? 'rgba(255,255,255,0.88)' : lead.accent, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap', transition: 'color 0.3s' }}>
                {lead.type}
              </span>
            </div>
            <p style={{ fontSize: '0.61rem', color: isActive ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.45)', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'color 0.3s' }}>
              {lead.name} · {lead.detail}
            </p>
            {isMoving && (
              <div style={{ display: 'flex', gap: 3, marginTop: '0.22rem', alignItems: 'center' }}>
                {[0,1,2].map(d => (
                  <span key={d} style={{ display:'inline-block', width: 2.5, height: 2.5, borderRadius: '50%', background: '#4ade80', animation: `ldot 0.65s ${d*0.14}s ease-in-out infinite` }} />
                ))}
                <span style={{ fontSize: '0.47rem', color: '#4ade80', fontFamily: 'var(--font-mono)', marginLeft: 4 }}>Wird verarbeitet</span>
              </div>
            )}
          </div>
        )
      })}

      {/* ── Command Center (z:30, acts as exclusion occlusion) ── */}
      <div style={{
        position: 'absolute', top: '47%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 290, zIndex: 30,
        backdropFilter: 'blur(28px) saturate(1.9)',
        background: 'linear-gradient(160deg, rgba(10,20,50,0.98) 0%, rgba(7,14,38,0.99) 100%)',
        border: '1px solid rgba(140,182,255,0.2)',
        borderRadius: 18, overflow: 'hidden',
        animation: 'lglow 3.5s ease-in-out infinite',
      }}>
        {/* Header */}
        <div style={{ padding: '0.875rem 1rem 0.8rem', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)', display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '-5%', width: 90, height: 90, borderRadius: '50%', background: 'radial-gradient(circle, rgba(140,182,255,0.18) 0%, transparent 70%)', filter: 'blur(14px)', pointerEvents: 'none' }} />
          <div style={{ width: 44, height: 44, flexShrink: 0, borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gxc-octopus-logo.png"
              alt=""
              aria-hidden="true"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.76rem', fontWeight: 700, color: 'rgba(255,255,255,0.94)', letterSpacing: '-0.02em', marginBottom: '0.2rem', lineHeight: 1 }}>GXC Command Center</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.32rem' }}>
              <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 5px #4ade80', animation: 'ldot 2.8s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.46rem', color: 'rgba(74,222,128,0.9)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>System Aktiv</span>
            </div>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.43rem', color: 'rgba(255,255,255,0.2)', flexShrink: 0, position: 'relative', zIndex: 1 }}>v2.1</span>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem', padding: '0.75rem 1rem 0' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 9, padding: '0.5rem 0.625rem' }}>
            <p style={{ fontSize: '0.46rem', color: 'rgba(174,199,245,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', marginBottom: '0.1rem' }}>Neue Anfragen</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>{count}</p>
          </div>
          <div style={{ background: 'rgba(74,222,128,0.07)', borderRadius: 9, padding: '0.5rem 0.625rem', border: '1px solid rgba(74,222,128,0.12)' }}>
            <p style={{ fontSize: '0.46rem', color: 'rgba(74,222,128,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', marginBottom: '0.1rem' }}>Ø Reaktion</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: '#4ade80', lineHeight: 1 }}>&lt; 2 Min</p>
          </div>
        </div>

        {/* Live feed */}
        <div style={{ padding: '0.75rem 1rem', minHeight: 148 }}>
          <p style={{ fontSize: '0.44rem', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: '0.44rem' }}>Live Feed</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.36rem' }}>
            {feed.length === 0 ? (
              <p style={{ fontSize: '0.61rem', color: 'rgba(255,255,255,0.14)', fontStyle: 'italic' }}>Warte auf erste Anfrage...</p>
            ) : feed.map((item, j) => (
              <div key={item.key} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.38rem', opacity: Math.max(0.22, 1 - j * 0.2), animation: j === 0 ? 'lfeed 0.4s ease' : 'none' }}>
                <span style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: '#4ade80', flexShrink: 0, marginTop: '0.34rem' }} />
                <div>
                  <p style={{ fontSize: '0.64rem', color: 'rgba(255,255,255,0.88)', fontWeight: 600, lineHeight: 1.25 }}>{item.action}</p>
                  <p style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>{item.lead} · eben</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '0.45rem 1rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.46rem', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)' }}>Reset nach 60 s</span>
          <span style={{ fontSize: '0.46rem', color: '#4ade80', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.06em' }}>● LIVE</span>
        </div>
      </div>
    </div>
  )
}
