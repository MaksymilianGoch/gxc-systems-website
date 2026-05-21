'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// ── layout ────────────────────────────────────────────────────────────────────
const CARD_W = 148
const CARD_H = 68
const CMD_W  = 336   // 12 % larger (was 300)
const CMD_H  = 348   // proportional

// ── orbital parameters ────────────────────────────────────────────────────────
// orbit_rx must be > CMD_W/2 + CARD_W/2 + gap to keep cards outside the panel.
// We compute it dynamically in the RAF so it scales with container width.
const ORBIT_RY_RATIO = 0.78  // ry = rx * this ratio (ellipse aspect)
const BASE_VEL       = 0.0032 // rad / normalised-frame (60fps frame = 1.0)
const SPEEDS         = [1.0, 0.91, 1.10, 0.95, 1.06].map(s => s * BASE_VEL)
const INIT_ANGLES    = Array.from({ length: 5 }, (_, i) => (i * 2 * Math.PI) / 5)

// ── capture ───────────────────────────────────────────────────────────────────
const R_DECAY        = 0.93   // per normalised frame during spiral
const CAPTURE_MULT   = 2.6    // angular speed multiplier during spiral
const SNAP           = 22     // px — triggers capture completion
const CAP_MIN        = 3200
const CAP_MAX        = 4600

const REQUESTS = [
  { id: 0, icon: 'email',         channel: 'E-Mail',           preview: 'Badezimmer Renovierung', contact: 'Thomas M.', statusDone: 'Lead erfasst'        },
  { id: 1, icon: 'chat',          channel: 'WhatsApp',         preview: 'Wann kann ich Termin?',  contact: 'Sarah L.',  statusDone: 'Priorität erkannt'   },
  { id: 2, icon: 'description',   channel: 'Kontaktformular',  preview: 'Elektroinstallation',    contact: 'K. Huber',  statusDone: 'Termin vorbereitet'  },
  { id: 3, icon: 'phone_missed',  channel: 'Verpasster Anruf', preview: '+43 664 123 456',        contact: 'Unbekannt', statusDone: 'Follow-up aktiv'     },
  { id: 4, icon: 'call_received', channel: 'Rückrufbitte',     preview: 'J. Müller · dringend',   contact: 'J. Müller', statusDone: 'Team benachrichtigt' },
]

type Phase = 'orbit' | 'capture' | 'done'
interface CardOrbit { angle: number; r: number; angVel: number; phase: Phase }
interface FeedItem { statusDone: string; contact: string; key: number }

// ── Octopus SVG — redesigned to match reference image ─────────────────────────
export function OctopusSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      {/* Flat-top hexagon, transparent interior */}
      <path d="M25 5 L75 5 L97 50 L75 95 L25 95 L3 50 Z"
        fill="rgba(8,20,52,0.12)" stroke="rgba(140,182,255,0.52)" strokeWidth="3.2"/>
      <path d="M29 11 L71 11 L91 50 L71 89 L29 89 L9 50 Z"
        fill="none" stroke="rgba(140,182,255,0.18)" strokeWidth="1.6"/>

      {/* Body — large oval mantle */}
      <ellipse cx="50" cy="29" rx="15.5" ry="21" fill="rgba(158,192,240,0.92)"/>

      {/* Left side tentacle — bold S-curve hugging the hex edge */}
      <path d="M34.5 37 Q17 32 9 43 Q3 52 9 60 Q15 68 23 63"
        stroke="rgba(128,174,238,0.95)" strokeWidth="4.8" strokeLinecap="round" fill="none"/>
      {/* Right side tentacle — mirror */}
      <path d="M65.5 37 Q83 32 91 43 Q97 52 91 60 Q85 68 77 63"
        stroke="rgba(128,174,238,0.95)" strokeWidth="4.8" strokeLinecap="round" fill="none"/>

      {/* 4 front tentacles — converging down */}
      <path d="M38 50 Q27 63 26 75 Q25 83 29 86"
        stroke="rgba(126,172,236,0.92)" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
      <path d="M45 54 Q36 67 36 79 Q36 86 40 88"
        stroke="rgba(126,172,236,0.92)" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
      <path d="M55 54 Q64 67 64 79 Q64 86 60 88"
        stroke="rgba(126,172,236,0.92)" strokeWidth="3.8" strokeLinecap="round" fill="none"/>
      <path d="M62 50 Q73 63 74 75 Q75 83 71 86"
        stroke="rgba(126,172,236,0.92)" strokeWidth="3.8" strokeLinecap="round" fill="none"/>

      {/* PCB tree — right-angle traces → glowing endpoints */}
      {/* Left outer */}
      <polyline points="29,86 29,90"
        stroke="rgba(112,165,232,0.78)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="29" cy="90" r="3.8" fill="rgba(60,148,255,0.96)"/>

      {/* Left inner */}
      <polyline points="40,88 40,90 35,90 35,93"
        stroke="rgba(112,165,232,0.78)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="35" cy="93" r="3.8" fill="rgba(60,148,255,0.96)"/>

      {/* Centre vertical from body base */}
      <line x1="50" y1="50" x2="50" y2="91"
        stroke="rgba(112,165,232,0.62)" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="50" cy="91" r="3.8" fill="rgba(60,148,255,0.96)"/>

      {/* Right inner */}
      <polyline points="60,88 60,90 65,90 65,93"
        stroke="rgba(112,165,232,0.78)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="65" cy="93" r="3.8" fill="rgba(60,148,255,0.96)"/>

      {/* Right outer */}
      <polyline points="71,86 71,90"
        stroke="rgba(112,165,232,0.78)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="71" cy="90" r="3.8" fill="rgba(60,148,255,0.96)"/>
    </svg>
  )
}

export function HeroSystemVisual() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const cardRefs      = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null))
  const lineRefs      = useRef<(SVGLineElement | null)[]>(Array(5).fill(null))
  const orbRef        = useRef<CardOrbit[]>(
    INIT_ANGLES.map((angle, i) => ({ angle, r: 220, angVel: SPEEDS[i], phase: 'orbit' as Phase }))
  )
  const phaseRef      = useRef<Phase[]>(Array(5).fill('orbit') as Phase[])
  const capturedRef   = useRef<boolean[]>(Array(5).fill(false))
  const sizeRef       = useRef({ w: 560, h: 620 })
  const prevTimeRef   = useRef(0)

  const [phases, setPhases] = useState<Phase[]>(Array(5).fill('orbit') as Phase[])
  const [feed,   setFeed]   = useState<FeedItem[]>([])
  const [count,  setCount]  = useState(0)

  const setPhase = useCallback((idx: number, ph: Phase) => {
    phaseRef.current = phaseRef.current.map((v, i) => (i === idx ? ph : v)) as Phase[]
    setPhases(prev => prev.map((v, i) => (i === idx ? ph : v)) as Phase[])
  }, [])

  // ── orbital RAF (delta-time normalised) ────────────────────────────────────────
  useEffect(() => {
    let rafId: number
    let alive = true

    const measure = () => {
      const el = containerRef.current
      if (el) { const r = el.getBoundingClientRect(); sizeRef.current = { w: r.width || 560, h: r.height || 620 } }
    }
    measure()
    window.addEventListener('resize', measure, { passive: true })

    const tick = (now: number) => {
      if (!alive) return

      const raw  = now - prevTimeRef.current
      const dt   = Math.min(raw / 16.67, 2.5)   // normalised: 1 = 60 fps, clamped
      prevTimeRef.current = now

      const { w: cw, h: ch } = sizeRef.current
      const cmdCx = cw / 2
      const cmdCy = ch / 2

      // Compute orbit radius dynamically so cards orbit just outside the panel
      const minRX = CMD_W / 2 + CARD_W / 2 + 18   // 18 px clearance
      const maxRX = cw / 2 - CARD_W / 2 - 6        // 6 px from container edge
      const orbitRX = Math.max(minRX, Math.min(maxRX, 230))
      const orbitRY = orbitRX * ORBIT_RY_RATIO

      const orb = orbRef.current
      const ph  = phaseRef.current

      for (let i = 0; i < 5; i++) {
        const o     = orb[i]
        const phase = ph[i]

        if (phase === 'orbit') {
          o.angle += o.angVel * dt
          o.r = orbitRX   // snap to current orbit radius (handles resize)
        } else if (phase === 'capture') {
          // Frame-rate-independent exponential decay
          o.r     *= Math.pow(R_DECAY, dt)
          o.angle += o.angVel * CAPTURE_MULT * dt

          if (o.r < SNAP && !capturedRef.current[i]) {
            capturedRef.current[i] = true
            setTimeout(() => {
              if (!alive) return
              setFeed(f => [{ statusDone: REQUESTS[i].statusDone, contact: REQUESTS[i].contact, key: Date.now() }, ...f].slice(0, 4))
              setCount(c => c + 1)
              setPhase(i, 'done')
              setTimeout(() => {
                if (!alive) return
                o.angle = Math.random() * Math.PI * 2
                o.r     = orbitRX
                capturedRef.current[i] = false
                setPhase(i, 'orbit')
              }, 650)
            }, 0)
          }
        }
        // done: no movement

        // ── card position on ellipse ──
        const px = cmdCx + o.r * Math.cos(o.angle) - CARD_W / 2
        const py = cmdCy + o.r * (orbitRY / orbitRX) * Math.sin(o.angle) - CARD_H / 2

        const cardEl = cardRefs.current[i]
        if (cardEl) cardEl.style.transform = `translate(${Math.round(px)}px,${Math.round(py)}px)`

        const lineEl = lineRefs.current[i]
        if (lineEl) {
          lineEl.setAttribute('x1', String(Math.round(px + CARD_W / 2)))
          lineEl.setAttribute('y1', String(Math.round(py + CARD_H / 2)))
          lineEl.setAttribute('x2', String(Math.round(cmdCx)))
          lineEl.setAttribute('y2', String(Math.round(cmdCy)))
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => { alive = false; cancelAnimationFrame(rafId); window.removeEventListener('resize', measure) }
  }, [setPhase])

  // ── capture scheduler ──────────────────────────────────────────────────────────
  useEffect(() => {
    let alive = true
    const scheduleNext = () => {
      if (!alive) return
      const delay = CAP_MIN + Math.random() * (CAP_MAX - CAP_MIN)
      setTimeout(() => {
        if (!alive) return
        const orb = orbRef.current.map((o, i) => o.phase === 'orbit' ? i : -1).filter(i => i >= 0)
        if (orb.length > 0) {
          const idx = orb[Math.floor(Math.random() * orb.length)]
          orbRef.current[idx].phase = 'capture'
          setPhase(idx, 'capture')
        }
        scheduleNext()
      }, delay)
    }
    const init = setTimeout(scheduleNext, 2200)
    return () => { alive = false; clearTimeout(init) }
  }, [setPhase])

  // ── reset counter + feed every 60 s ───────────────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => { setCount(0); setFeed([]) }, 60000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: 'clamp(520px, 54vw, 660px)', overflow: 'hidden' }}>
      <style>{`
        @keyframes hsvDot  { 0%,100%{opacity:1;box-shadow:0 0 5px #4ade80} 50%{opacity:0.25;box-shadow:0 0 2px #4ade80} }
        @keyframes hsvFeed { from{opacity:0;transform:translateY(-5px)} to{opacity:1;transform:none} }
        @keyframes hsvPing { 0%,80%,100%{transform:scale(0.8);opacity:0.3} 40%{transform:scale(1.4) translateY(-2px);opacity:1} }
        @keyframes hsvGlow {
          0%,100% { box-shadow: 0 0 0 1px rgba(174,199,245,0.12), 0 0 28px rgba(120,165,255,0.14), 0 0 60px rgba(80,130,230,0.06), 0 24px 60px -12px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05); }
          50%     { box-shadow: 0 0 0 1px rgba(174,199,245,0.2),  0 0 44px rgba(120,165,255,0.24), 0 0 88px rgba(80,130,230,0.12), 0 24px 60px -12px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05); }
        }
      `}</style>

      {/* SVG rails */}
      <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5, overflow: 'visible' }}>
        {REQUESTS.map((_, i) => (
          <line key={i} ref={el => { lineRefs.current[i] = el }}
            x1="0" y1="0" x2="0" y2="0"
            stroke={phases[i] === 'capture' ? 'rgba(74,222,128,0.4)' : 'rgba(174,199,245,0.09)'}
            strokeWidth={phases[i] === 'capture' ? 1.4 : 0.6}
            strokeDasharray={phases[i] === 'capture' ? '5 6' : '3 10'}
            style={{ transition: 'stroke 0.5s ease, stroke-width 0.4s ease' }}
          />
        ))}
      </svg>

      {/* Request cards — below command center (z:8 < z:30) */}
      {REQUESTS.map((req, i) => {
        const phase     = phases[i]
        const isCapture = phase === 'capture'
        const isDone    = phase === 'done'
        return (
          <div key={req.id} ref={el => { cardRefs.current[i] = el }}
            style={{
              position: 'absolute', left: 0, top: 0,
              width: CARD_W, willChange: 'transform',
              backdropFilter: 'blur(14px) saturate(1.5)',
              background: isDone ? 'rgba(237,252,244,0.97)' : isCapture ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.84)',
              border: isDone ? '1.5px solid rgba(74,222,128,0.45)' : isCapture ? '1.5px solid rgba(174,199,245,0.85)' : '1px solid rgba(255,255,255,0.46)',
              borderRadius: 11,
              boxShadow: isCapture ? '0 10px 32px -8px rgba(0,32,69,0.2), 0 0 0 2px rgba(174,199,245,0.1)' : isDone ? '0 6px 20px -6px rgba(74,222,128,0.2)' : '0 5px 18px -5px rgba(0,32,69,0.1)',
              padding: '0.58rem 0.75rem',
              zIndex: 8,
              opacity: isDone ? 0 : 1,
              transition: 'opacity 0.22s ease, border 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.38rem', marginBottom: '0.24rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '0.78rem', color: isDone ? '#15803d' : isCapture ? 'var(--color-blue)' : '#94a3b8', fontVariationSettings: isDone ? "'FILL' 1" : "'FILL' 0", flexShrink: 0, transition: 'color 0.3s ease' }}>
                {isDone ? 'check_circle' : req.icon}
              </span>
              <span style={{ fontSize: '0.56rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: isDone ? '#15803d' : isCapture ? 'var(--color-blue)' : 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap', transition: 'color 0.3s ease' }}>
                {isDone ? req.statusDone : req.channel}
              </span>
            </div>
            <p style={{ fontSize: '0.64rem', color: isDone ? '#4d7c60' : 'var(--color-text-2)', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', opacity: isDone ? 0.75 : 1 }}>
              {req.contact} · {req.preview}
            </p>
            {isCapture && (
              <div style={{ display: 'flex', gap: 3, marginTop: '0.28rem', alignItems: 'center' }}>
                {[0,1,2].map(d => <span key={d} style={{ display: 'inline-block', width: 3, height: 3, borderRadius: '50%', background: '#4ade80', animation: `hsvPing 0.85s ${d*0.18}s ease-in-out infinite` }} />)}
                <span style={{ fontSize: '0.5rem', color: '#4ade80', fontFamily: 'var(--font-mono)', marginLeft: 4 }}>Verarbeite...</span>
              </div>
            )}
          </div>
        )
      })}

      {/* ── Command Center (z:30 — above cards, acts as orbital occlusion disk) ── */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: CMD_W,
        backdropFilter: 'blur(28px) saturate(1.9)',
        background: 'linear-gradient(160deg, rgba(12,26,62,0.97) 0%, rgba(8,18,50,0.99) 100%)',
        border: '1px solid rgba(140,182,255,0.22)',
        borderRadius: 22, overflow: 'hidden',
        zIndex: 30,
        animation: 'hsvGlow 3.5s ease-in-out infinite',
      }}>
        {/* Octopus header */}
        <div style={{ padding: '1rem 1.25rem 0.9rem', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'linear-gradient(160deg, rgba(140,180,255,0.08) 0%, rgba(255,255,255,0.01) 100%)', display: 'flex', alignItems: 'center', gap: '0.9rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '-5%', width: 110, height: 110, borderRadius: '50%', background: 'radial-gradient(circle, rgba(174,199,245,0.2) 0%, transparent 70%)', filter: 'blur(18px)', pointerEvents: 'none' }} />
          <div style={{ width: 52, height: 52, flexShrink: 0, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: -7, borderRadius: '50%', background: 'radial-gradient(circle, rgba(174,199,245,0.28) 0%, transparent 70%)', filter: 'blur(9px)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}><OctopusSVG size={52} /></div>
          </div>
          <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.94)', letterSpacing: '-0.02em', marginBottom: '0.22rem', lineHeight: 1 }}>GXC Command Center</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#4ade80', animation: 'hsvDot 2.8s ease-in-out infinite', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.47rem', color: 'rgba(74,222,128,0.88)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>System Aktiv</span>
            </div>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.43rem', color: 'rgba(255,255,255,0.2)', flexShrink: 0, position: 'relative', zIndex: 1 }}>v2.1</span>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', padding: '0.875rem 1.25rem 0' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '0.55rem 0.75rem' }}>
            <p style={{ fontSize: '0.49rem', color: 'rgba(174,199,245,0.65)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', marginBottom: '0.14rem' }}>Erfasst (Minute)</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>{count}</p>
          </div>
          <div style={{ background: 'rgba(74,222,128,0.07)', borderRadius: 10, padding: '0.55rem 0.75rem', border: '1px solid rgba(74,222,128,0.12)' }}>
            <p style={{ fontSize: '0.49rem', color: 'rgba(74,222,128,0.65)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', marginBottom: '0.14rem' }}>Ø Reaktion</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 700, color: '#4ade80', lineHeight: 1 }}>&lt; 2 Min</p>
          </div>
        </div>

        {/* Live feed */}
        <div style={{ padding: '0.875rem 1.25rem', minHeight: 156 }}>
          <p style={{ fontSize: '0.46rem', color: 'rgba(255,255,255,0.26)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>Live Feed</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem' }}>
            {feed.length === 0 ? (
              <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.15)', fontStyle: 'italic' }}>Warte auf erste Anfrage...</p>
            ) : feed.map((item, j) => (
              <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: Math.max(0.28, 1 - j * 0.22), animation: j === 0 ? 'hsvFeed 0.35s ease' : 'none' }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '0.64rem', color: 'rgba(255,255,255,0.88)', fontWeight: 600, lineHeight: 1.25 }}>{item.statusDone}</p>
                  <p style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>{item.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ padding: '0.5rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.47rem', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)' }}>Zähler reset nach 60 s</span>
          <span style={{ fontSize: '0.47rem', color: '#4ade80', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.06em' }}>● LIVE</span>
        </div>
      </div>
    </div>
  )
}
