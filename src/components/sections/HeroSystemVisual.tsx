'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const CARD_W      = 160
const CARD_H      = 60
const TARGET_SPD  = 0.82   // px / normalised frame (60 fps = 1.0)
const WALL_PAD    = 10
const EXCL_R      = 196    // CMD exclusion circle radius
const MIN_CARD_D  = 178    // min centre-to-centre distance between cards
const CAP_SPEED   = 2.8
const SNAP        = 22
const CAP_MIN     = 3600
const CAP_MAX     = 5400
const CMD_H       = 340    // fixed height for scanner SVG

const LEADS = [
  { id: 0, icon: 'email',         type: 'E-MAIL',           name: 'Thomas M.',  detail: 'Badezimmer Renovierung', accent: '#aec7f5' },
  { id: 1, icon: 'chat',          type: 'WHATSAPP',         name: 'Sarah L.',   detail: 'Terminanfrage · dringend', accent: '#86c4a4' },
  { id: 2, icon: 'description',   type: 'KONTAKTFORMULAR',  name: 'K. Huber',   detail: 'Elektroinstallation',    accent: '#aec7f5' },
  { id: 3, icon: 'phone_missed',  type: 'VERPASSTER ANRUF', name: 'Unbekannt',  detail: '+43 664 123 456',        accent: '#f0c090' },
  { id: 4, icon: 'call_received', type: 'RÜCKRUFBITTE',     name: 'J. Müller',  detail: 'Heizung · dringend',     accent: '#c0a8e8' },
  { id: 5, icon: 'event',         type: 'TERMINWUNSCH',     name: 'A. Fischer', detail: 'Mo–Mi ab 14 Uhr',        accent: '#86c4a4' },
]

const FEED_ACTIONS = [
  'Lead erfasst', 'Anliegen klassifiziert', 'Priorität: Hoch',
  'CRM-Eintrag erstellt', 'Team benachrichtigt', 'Follow-up vorbereitet',
  'Termin vorbereitet', 'Bestätigung gesendet',
]

type Phase = 'free' | 'targeted' | 'moving' | 'captured'
interface Phys { x: number; y: number; vx: number; vy: number }
interface FeedItem { action: string; lead: string; key: number }

// ── Octopus SVG — no background fill (transparent hex) ──────────────────────
export function OctopusSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path d="M25 5 L75 5 L97 50 L75 95 L25 95 L3 50 Z"
        fill="none" stroke="rgba(140,182,255,0.52)" strokeWidth="3.2"/>
      <path d="M29 11 L71 11 L91 50 L71 89 L29 89 L9 50 Z"
        fill="none" stroke="rgba(140,182,255,0.18)" strokeWidth="1.6"/>
      <ellipse cx="50" cy="29" rx="15.5" ry="21" fill="rgba(158,192,240,0.92)"/>
      <path d="M34.5 37 Q17 32 9 43 Q3 52 9 60 Q15 68 23 63"
        stroke="rgba(128,174,238,0.95)" strokeWidth="4.8" strokeLinecap="round" fill="none"/>
      <path d="M65.5 37 Q83 32 91 43 Q97 52 91 60 Q85 68 77 63"
        stroke="rgba(128,174,238,0.95)" strokeWidth="4.8" strokeLinecap="round" fill="none"/>
      <path d="M38 50 Q27 63 26 75 Q25 83 29 86" stroke="rgba(126,172,236,0.92)" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
      <path d="M45 54 Q36 67 36 79 Q36 86 40 88" stroke="rgba(126,172,236,0.92)" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
      <path d="M55 54 Q64 67 64 79 Q64 86 60 88" stroke="rgba(126,172,236,0.92)" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
      <path d="M62 50 Q73 63 74 75 Q75 83 71 86" stroke="rgba(126,172,236,0.92)" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
      <polyline points="29,86 29,90" stroke="rgba(112,165,232,0.78)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="29" cy="90" r="3.8" fill="rgba(60,148,255,0.96)"/>
      <polyline points="40,88 40,90 35,90 35,93" stroke="rgba(112,165,232,0.78)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="35" cy="93" r="3.8" fill="rgba(60,148,255,0.96)"/>
      <line x1="50" y1="50" x2="50" y2="91" stroke="rgba(112,165,232,0.62)" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="50" cy="91" r="3.8" fill="rgba(60,148,255,0.96)"/>
      <polyline points="60,88 60,90 65,90 65,93" stroke="rgba(112,165,232,0.78)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="65" cy="93" r="3.8" fill="rgba(60,148,255,0.96)"/>
      <polyline points="71,86 71,90" stroke="rgba(112,165,232,0.78)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="71" cy="90" r="3.8" fill="rgba(60,148,255,0.96)"/>
    </svg>
  )
}

function mkPhys(x: number, y: number, angle: number): Phys {
  return { x, y, vx: TARGET_SPD * Math.cos(angle), vy: TARGET_SPD * Math.sin(angle) }
}

function getSpawn(cw: number, ch: number, cmdCx: number, cmdCy: number): Phys {
  const M = 10
  const pool: [number, number, number][] = [
    [M, M, 0.4], [cw - CARD_W - M, M, 2.8],
    [M, ch * 0.32, 5.8], [cw - CARD_W - M, ch * 0.32, 3.7],
    [M, ch - CARD_H - M, 0.7], [cw - CARD_W - M, ch - CARD_H - M, 4.0],
    [cw * 0.3 - CARD_W / 2, M, 1.5],
    [cw * 0.7 - CARD_W / 2, ch - CARD_H - M, 4.7],
  ].sort(() => Math.random() - 0.5) as [number, number, number][]
  for (const [x, y, angle] of pool) {
    const dist = Math.hypot(x + CARD_W / 2 - cmdCx, y + CARD_H / 2 - cmdCy)
    if (dist > EXCL_R + 30) return mkPhys(x, y, angle + (Math.random() - 0.5) * 0.5)
  }
  return mkPhys(M, M, 0.4)
}

export function HeroSystemVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs     = useRef<(HTMLDivElement | null)[]>(Array(6).fill(null))
  const lineRefs     = useRef<(SVGLineElement | null)[]>(Array(6).fill(null))
  const scannerRef   = useRef<SVGRectElement>(null)
  const physRef      = useRef<Phys[]>([
    mkPhys(12,  12,  0.42),
    mkPhys(368, 12,  2.78),
    mkPhys(8,   194, 5.76),
    mkPhys(368, 406, 3.67),
    mkPhys(8,   488, 0.84),
    mkPhys(182, 530, 4.61),
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

  // ── RAF — billiard physics ──────────────────────────────────────────────────
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

      const phys = physRef.current
      const ph   = phaseRef.current

      // ── 1. Integrate ───────────────────────────────────────────────────────
      for (let i = 0; i < 6; i++) {
        const p = phys[i]; const phase = ph[i]
        if (phase === 'free' || phase === 'targeted') {
          p.x += p.vx * dt; p.y += p.vy * dt
        } else if (phase === 'moving' && !capturedRef.current[i]) {
          const dx = cmdCx - (p.x + CARD_W / 2)
          const dy = cmdCy - (p.y + CARD_H / 2)
          const d  = Math.hypot(dx, dy)
          if (d < SNAP) {
            capturedRef.current[i] = true
            const ci = i
            setTimeout(() => {
              if (!alive) return
              setFeed(f => [{ action: FEED_ACTIONS[Math.floor(Math.random() * FEED_ACTIONS.length)], lead: LEADS[ci].name, key: Date.now() }, ...f].slice(0, 5))
              setCount(c => c + 1)
              setPhase(ci, 'captured')
              setTimeout(() => {
                if (!alive) return
                const sp = getSpawn(sizeRef.current.w, sizeRef.current.h, sizeRef.current.w / 2, sizeRef.current.h * 0.47)
                phys[ci] = sp
                capturedRef.current[ci] = false
                setPhase(ci, 'free')
              }, 700)
            }, 0)
          } else if (d > 0) {
            const s = Math.min(CAP_SPEED, d * 0.085) * dt
            p.x += (dx / d) * s; p.y += (dy / d) * s
          }
        }
      }

      // ── 2. Wall reflection ────────────────────────────────────────────────
      for (let i = 0; i < 6; i++) {
        const p = phys[i]; const phase = ph[i]
        if (phase !== 'free' && phase !== 'targeted') continue
        if (p.x <= WALL_PAD)                    { p.x = WALL_PAD;                    if (p.vx < 0) p.vx = -p.vx }
        else if (p.x >= cw - CARD_W - WALL_PAD) { p.x = cw - CARD_W - WALL_PAD;    if (p.vx > 0) p.vx = -p.vx }
        if (p.y <= WALL_PAD)                    { p.y = WALL_PAD;                    if (p.vy < 0) p.vy = -p.vy }
        else if (p.y >= ch - CARD_H - WALL_PAD) { p.y = ch - CARD_H - WALL_PAD;    if (p.vy > 0) p.vy = -p.vy }
      }

      // ── 3. CMD exclusion — circle reflection ──────────────────────────────
      for (let i = 0; i < 6; i++) {
        const p = phys[i]; const phase = ph[i]
        if (phase !== 'free' && phase !== 'targeted') continue
        const cdx = (p.x + CARD_W / 2) - cmdCx
        const cdy = (p.y + CARD_H / 2) - cmdCy
        const cd  = Math.hypot(cdx, cdy)
        if (cd < EXCL_R && cd > 0.1) {
          const nx = cdx / cd, ny = cdy / cd
          const scale = (EXCL_R + 1) / cd
          p.x = cmdCx + cdx * scale - CARD_W / 2
          p.y = cmdCy + cdy * scale - CARD_H / 2
          const dot = p.vx * nx + p.vy * ny
          if (dot < 0) { p.vx -= 2 * dot * nx; p.vy -= 2 * dot * ny }
        }
      }

      // ── 4. Card–card elastic collision ────────────────────────────────────
      for (let i = 0; i < 6; i++) {
        const phase_i = ph[i]
        if (phase_i === 'captured' || phase_i === 'moving') continue
        for (let j = i + 1; j < 6; j++) {
          const phase_j = ph[j]
          if (phase_j === 'captured' || phase_j === 'moving') continue
          const pi = phys[i], pj = phys[j]
          const dx = (pi.x + CARD_W / 2) - (pj.x + CARD_W / 2)
          const dy = (pi.y + CARD_H / 2) - (pj.y + CARD_H / 2)
          const d  = Math.hypot(dx, dy)
          if (d < MIN_CARD_D && d > 0.1) {
            const nx = dx / d, ny = dy / d
            const dot = (pi.vx - pj.vx) * nx + (pi.vy - pj.vy) * ny
            if (dot < 0) {
              pi.vx -= dot * nx; pi.vy -= dot * ny
              pj.vx += dot * nx; pj.vy += dot * ny
            }
            const ov = (MIN_CARD_D - d) / 2 + 0.5
            pi.x += nx * ov; pi.y += ny * ov
            pj.x -= nx * ov; pj.y -= ny * ov
          }
        }
      }

      // ── 5. Speed normalise + DOM update ───────────────────────────────────
      let minProx = 9999
      for (let i = 0; i < 6; i++) {
        const p = phys[i]; const phase = ph[i]
        if (phase === 'free' || phase === 'targeted') {
          const spd = Math.hypot(p.vx, p.vy)
          if (spd > 0.01) { p.vx = p.vx / spd * TARGET_SPD; p.vy = p.vy / spd * TARGET_SPD }
          const cd = Math.hypot((p.x + CARD_W / 2) - cmdCx, (p.y + CARD_H / 2) - cmdCy)
          const prox = Math.max(0, cd - EXCL_R)
          if (prox < minProx) minProx = prox
        }
        if (phase !== 'captured') {
          const el = cardRefs.current[i]
          if (el) el.style.transform = `translate(${Math.round(p.x)}px,${Math.round(p.y)}px)`
        }
        const ln = lineRefs.current[i]
        if (ln) {
          ln.setAttribute('x1', String(Math.round(p.x + CARD_W / 2)))
          ln.setAttribute('y1', String(Math.round(p.y + CARD_H / 2)))
          ln.setAttribute('x2', String(Math.round(cmdCx)))
          ln.setAttribute('y2', String(Math.round(cmdCy)))
        }
      }

      // Scanner proximity reaction (direct DOM — no re-render)
      const prox01 = Math.max(0, 1 - minProx / 65)
      const sc = scannerRef.current
      if (sc) {
        sc.setAttribute('stroke', `rgba(174,199,245,${(0.1 + prox01 * 0.42).toFixed(2)})`)
        sc.setAttribute('stroke-width', (0.6 + prox01 * 0.9).toFixed(1))
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => { alive = false; cancelAnimationFrame(rafId); window.removeEventListener('resize', measure) }
  }, [setPhase])

  // ── Capture scheduler ───────────────────────────────────────────────────────
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
          setTimeout(() => { if (alive && phaseRef.current[idx] === 'targeted') setPhase(idx, 'moving') }, 1100)
        }
        next()
      }, CAP_MIN + Math.random() * (CAP_MAX - CAP_MIN))
    }
    const t = setTimeout(next, 2200)
    return () => { alive = false; clearTimeout(t) }
  }, [setPhase])

  useEffect(() => {
    const iv = setInterval(() => { setCount(0); setFeed([]) }, 60000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: 'clamp(500px, 54vw, 680px)', overflow: 'hidden', background: 'linear-gradient(145deg, #060c1c 0%, #0a1428 55%, #070e22 100%)', borderRadius: 20, border: '1px solid rgba(140,182,255,0.09)', boxShadow: '0 28px 72px -16px rgba(0,0,0,0.55)' }}
    >
      <style>{`
        @keyframes scanTravel { from{stroke-dashoffset:1260} to{stroke-dashoffset:0} }
        @keyframes cornerBlink { 0%,100%{opacity:0.18} 50%{opacity:0.52} }
        @keyframes dataShimmer { 0%{background-position:-180px 0} 100%{background-position:180px 0} }
        @keyframes capturePulse { 0%,100%{opacity:0.55} 50%{opacity:1} }
        @keyframes feedSlide { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:none} }
        @keyframes sysDot { 0%,100%{opacity:1} 50%{opacity:0.28} }
      `}</style>

      {/* Dot grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.042) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 1 }} aria-hidden="true" />
      {/* Ambient orbs */}
      <div style={{ position: 'absolute', top: '-18%', left: '-10%', width: '50%', height: '50%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(100,148,240,0.05) 0%, transparent 70%)', filter: 'blur(44px)', pointerEvents: 'none', zIndex: 1 }} aria-hidden="true" />
      <div style={{ position: 'absolute', bottom: '-12%', right: '-8%', width: '40%', height: '40%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(100,190,155,0.04) 0%, transparent 70%)', filter: 'blur(44px)', pointerEvents: 'none', zIndex: 1 }} aria-hidden="true" />

      {/* SVG rails */}
      <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 14, overflow: 'visible' }}>
        {LEADS.map((_, i) => {
          const active = phases[i] === 'targeted' || phases[i] === 'moving'
          return (
            <line key={i} ref={el => { lineRefs.current[i] = el }}
              x1="0" y1="0" x2="0" y2="0"
              stroke={active ? 'rgba(174,199,245,0.35)' : 'rgba(174,199,245,0.05)'}
              strokeWidth={active ? 1.1 : 0.45}
              strokeDasharray={phases[i] === 'moving' ? '4 5' : '2 12'}
              style={{ transition: 'stroke 0.5s ease, stroke-width 0.4s ease' }}
            />
          )
        })}
      </svg>

      {/* ── Lead cards — data-packet style ── */}
      {LEADS.map((lead, i) => {
        const ph = phases[i]
        const isActive  = ph === 'targeted' || ph === 'moving'
        const isMoving  = ph === 'moving'
        const isDone    = ph === 'captured'
        return (
          <div
            key={lead.id}
            ref={el => { cardRefs.current[i] = el }}
            style={{
              position: 'absolute', left: 0, top: 0,
              width: CARD_W, willChange: 'transform',
              background: isActive
                ? 'rgba(12,22,52,0.92)'
                : 'rgba(10,18,44,0.80)',
              borderTop: `1px solid ${isActive ? lead.accent + '60' : 'rgba(174,199,245,0.12)'}`,
              borderRight: `1px solid ${isActive ? lead.accent + '30' : 'rgba(174,199,245,0.08)'}`,
              borderBottom: `1px solid ${isActive ? lead.accent + '20' : 'rgba(174,199,245,0.06)'}`,
              borderLeft: `2px solid ${isActive ? lead.accent : lead.accent + '55'}`,
              borderRadius: 3,
              boxShadow: isActive
                ? `0 0 20px -5px ${lead.accent}25, inset 0 1px 0 rgba(255,255,255,0.04)`
                : 'inset 0 1px 0 rgba(255,255,255,0.03)',
              padding: '0.44rem 0.62rem',
              zIndex: isActive ? 25 : isDone ? 5 : 12,
              opacity: isDone ? 0 : 1,
              transition: 'opacity 0.18s ease, border-color 0.35s ease, box-shadow 0.35s ease',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Top row: type + signal status */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{
                  display: 'inline-block', width: 4, height: 4, borderRadius: 0, flexShrink: 0,
                  background: isActive ? '#4ade80' : lead.accent,
                  boxShadow: isActive ? '0 0 5px #4ade80' : 'none',
                  animation: isActive ? 'capturePulse 0.8s ease-in-out infinite' : 'none',
                }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 700, color: isActive ? lead.accent : lead.accent + 'bb', letterSpacing: '0.08em' }}>
                  {lead.type}
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: isMoving ? '#4ade80cc' : 'rgba(174,199,245,0.35)', letterSpacing: '0.06em' }}>
                {isMoving ? 'ACQUIRING' : 'SIG:OK'}
              </span>
            </div>
            {/* Name + detail */}
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: isActive ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.38)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '0.01em' }}>
              {lead.name} — {lead.detail}
            </div>
            {/* Data shimmer line at bottom */}
            <div style={{
              height: 1, marginTop: '0.3rem',
              background: `linear-gradient(90deg, transparent 0%, ${lead.accent}66 50%, transparent 100%)`,
              backgroundSize: '120px 100%', backgroundRepeat: 'no-repeat',
              animation: isActive ? 'dataShimmer 1.4s linear infinite' : 'none',
              opacity: isActive ? 1 : 0.3,
            }} />
          </div>
        )
      })}

      {/* ── Command Center ── */}
      <div style={{
        position: 'absolute', top: '47%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 290, height: CMD_H, zIndex: 30,
        backdropFilter: 'blur(28px) saturate(1.8)',
        background: 'linear-gradient(160deg, rgba(9,19,48,0.98) 0%, rgba(6,12,36,0.99) 100%)',
        borderRadius: 18, overflow: 'hidden',
        boxShadow: '0 24px 60px -12px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}>
        {/* ── Scanning field SVG overlay ── */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2, borderRadius: 18 }}
          viewBox={`0 0 290 ${CMD_H}`}
          preserveAspectRatio="none"
        >
          {/* Travelling scan line */}
          <rect
            ref={scannerRef}
            x="0.5" y="0.5" width="289" height={CMD_H - 1} rx="17.5"
            fill="none"
            stroke="rgba(174,199,245,0.1)"
            strokeWidth="0.6"
            strokeDasharray="85 1175"
            style={{ animation: 'scanTravel 5s linear infinite' }}
          />
          {/* Corner brackets */}
          {[
            `M1 32 L1 1 L32 1`,
            `M258 1 L289 1 L289 32`,
            `M289 ${CMD_H - 32} L289 ${CMD_H - 1} L258 ${CMD_H - 1}`,
            `M32 ${CMD_H - 1} L1 ${CMD_H - 1} L1 ${CMD_H - 32}`,
          ].map((d, idx) => (
            <path key={idx} d={d} fill="none"
              stroke="rgba(174,199,245,0.22)" strokeWidth="1.4"
              style={{ animation: `cornerBlink 2.4s ${idx * 0.6}s ease-in-out infinite` }}
            />
          ))}
        </svg>

        {/* CMD content (above scanner SVG) */}
        <div style={{ position: 'relative', zIndex: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ padding: '0.875rem 1rem 0.8rem', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
            <div style={{ position: 'absolute', top: '-30%', left: '-5%', width: 85, height: 85, borderRadius: '50%', background: 'radial-gradient(circle, rgba(140,182,255,0.14) 0%, transparent 70%)', filter: 'blur(14px)', pointerEvents: 'none' }} />
            <div style={{ width: 42, height: 42, flexShrink: 0, position: 'relative', zIndex: 1 }}>
              <OctopusSVG size={42} />
            </div>
            <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.76rem', fontWeight: 700, color: 'rgba(255,255,255,0.93)', letterSpacing: '-0.02em', marginBottom: '0.2rem', lineHeight: 1 }}>GXC Command Center</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.32rem' }}>
                <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 4px #4ade80', animation: 'sysDot 2.8s ease-in-out infinite' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(74,222,128,0.88)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>System Aktiv</span>
              </div>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'rgba(255,255,255,0.18)', flexShrink: 0, position: 'relative', zIndex: 1 }}>v2.1</span>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem', padding: '0.7rem 0.9rem 0', flexShrink: 0 }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '0.48rem 0.6rem', border: '1px solid rgba(174,199,245,0.08)' }}>
              <p style={{ fontSize: '0.44rem', color: 'rgba(174,199,245,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', marginBottom: '0.1rem' }}>Neue Anfragen</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>{count}</p>
            </div>
            <div style={{ background: 'rgba(74,222,128,0.06)', borderRadius: 6, padding: '0.48rem 0.6rem', border: '1px solid rgba(74,222,128,0.1)' }}>
              <p style={{ fontSize: '0.44rem', color: 'rgba(74,222,128,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', marginBottom: '0.1rem' }}>Ø Reaktion</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: '#4ade80', lineHeight: 1 }}>&lt; 2 Min</p>
            </div>
          </div>

          {/* Live feed */}
          <div style={{ padding: '0.7rem 0.9rem', flex: 1, minHeight: 0 }}>
            <p style={{ fontSize: '0.42rem', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: '0.44rem' }}>Live Feed</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.34rem' }}>
              {feed.length === 0
                ? <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.13)', fontFamily: 'var(--font-mono)', fontStyle: 'italic' }}>Awaiting signal...</p>
                : feed.map((item, j) => (
                  <div key={item.key} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.38rem', opacity: Math.max(0.2, 1 - j * 0.2), animation: j === 0 ? 'feedSlide 0.38s ease' : 'none' }}>
                    <span style={{ width: 3, height: 3, borderRadius: 0, background: '#4ade80', flexShrink: 0, marginTop: '0.38rem' }} />
                    <div>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600, lineHeight: 1.25, letterSpacing: '0.01em' }}>{item.action}</p>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(174,199,245,0.35)' }}>{item.lead} · eben</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Footer */}
          <div style={{ padding: '0.44rem 0.9rem', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <span style={{ fontSize: '0.44rem', color: 'rgba(255,255,255,0.18)', fontFamily: 'var(--font-mono)' }}>Reset nach 60 s</span>
            <span style={{ fontSize: '0.44rem', color: '#4ade80', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.06em' }}>● LIVE</span>
          </div>
        </div>
      </div>
    </div>
  )
}
