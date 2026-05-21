'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const CARD_W = 176
const CARD_H = 72
const ORBIT_RX = 188        // horizontal orbit radius (card centres from cmd centre)
const ORBIT_RY = 155        // vertical orbit radius
const BASE_VEL = 0.0038     // rad / frame  (~27 s full orbit)
const SPEEDS = [1.0, 0.91, 1.09, 0.95, 1.05].map(s => s * BASE_VEL)
const INIT_ANGLES = Array.from({ length: 5 }, (_, i) => (i * 2 * Math.PI) / 5)
const CAPTURE_MULT = 3.8    // angular speed boost during spiral-in
const R_DECAY = 0.908       // radius decay per frame
const SNAP = 26             // px — triggers capture completion
const CAP_MIN = 3000        // ms
const CAP_MAX = 4400        // ms

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

// Shared octopus SVG — used in header
function OctopusSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      {/* Flat-top hexagon */}
      <path d="M25 6 L75 6 L97 50 L75 94 L25 94 L3 50 Z"
        fill="rgba(174,199,245,0.1)" stroke="rgba(140,182,255,0.48)" strokeWidth="2.5"/>
      <path d="M29 12 L71 12 L91 50 L71 88 L29 88 L9 50 Z"
        fill="none" stroke="rgba(140,182,255,0.17)" strokeWidth="1.4"/>
      {/* Head */}
      <ellipse cx="50" cy="32" rx="17" ry="23" fill="rgba(174,199,245,0.92)"/>
      {/* Left eye — closed wink (filled almond) */}
      <path d="M37 28 Q41 23.5 45 28 Q41 32.5 37 28 Z" fill="rgba(18,58,152,0.88)"/>
      {/* Right eye — winking arc */}
      <path d="M53.5 26 Q57.5 32 61.5 26" stroke="rgba(18,58,152,0.88)" strokeWidth="2.3" strokeLinecap="round" fill="none"/>
      {/* Smile */}
      <path d="M43 39 Q50 45 57 39" stroke="rgba(20,62,155,0.72)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* Side tentacles — S-curves curling upward */}
      <path d="M34 41 Q16 37 10 45 Q4 53 9 59 Q14 65 20 61" stroke="rgba(150,190,255,0.86)" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
      <path d="M66 41 Q84 37 90 45 Q96 53 91 59 Q86 65 80 61" stroke="rgba(150,190,255,0.86)" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
      {/* 4 front tentacles */}
      <path d="M38 54 Q30 66 29 77 Q28 84 32 86" stroke="rgba(155,195,255,0.88)" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <path d="M45 57 Q39 70 39 81 Q39 87 43 88" stroke="rgba(155,195,255,0.88)" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <path d="M55 57 Q61 70 61 81 Q61 87 57 88" stroke="rgba(155,195,255,0.88)" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <path d="M62 54 Q70 66 71 77 Q72 84 68 86" stroke="rgba(155,195,255,0.88)" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      {/* PCB traces — right-angle symmetric routing */}
      <polyline points="32,86 28,86 28,91"    stroke="rgba(136,181,255,0.6)"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="28" cy="91" r="2.8" fill="none" stroke="rgba(136,181,255,0.56)" strokeWidth="1.3"/>
      <polyline points="32,86 32,90 36,90 36,93" stroke="rgba(136,181,255,0.56)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="36" cy="93" r="2.8" fill="none" stroke="rgba(136,181,255,0.52)" strokeWidth="1.3"/>
      <polyline points="43,88 43,93"          stroke="rgba(136,181,255,0.54)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="43" cy="93" r="2.8" fill="none" stroke="rgba(136,181,255,0.5)"  strokeWidth="1.3"/>
      <polyline points="57,88 57,93"          stroke="rgba(136,181,255,0.54)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="57" cy="93" r="2.8" fill="none" stroke="rgba(136,181,255,0.5)"  strokeWidth="1.3"/>
      <polyline points="68,86 68,90 64,90 64,93" stroke="rgba(136,181,255,0.56)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="64" cy="93" r="2.8" fill="none" stroke="rgba(136,181,255,0.52)" strokeWidth="1.3"/>
      <polyline points="68,86 72,86 72,91"    stroke="rgba(136,181,255,0.6)"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="72" cy="91" r="2.8" fill="none" stroke="rgba(136,181,255,0.56)" strokeWidth="1.3"/>
    </svg>
  )
}

export function HeroSystemVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs     = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null))
  const lineRefs     = useRef<(SVGLineElement | null)[]>(Array(5).fill(null))
  const orbRef       = useRef<CardOrbit[]>(
    INIT_ANGLES.map((angle, i) => ({ angle, r: ORBIT_RX, angVel: SPEEDS[i], phase: 'orbit' as Phase }))
  )
  const phaseRef     = useRef<Phase[]>(Array(5).fill('orbit') as Phase[])
  const capturedRef  = useRef<boolean[]>(Array(5).fill(false))
  const sizeRef      = useRef({ w: 520, h: 580 })

  const [phases, setPhases] = useState<Phase[]>(Array(5).fill('orbit') as Phase[])
  const [feed,   setFeed]   = useState<FeedItem[]>([])
  const [count,  setCount]  = useState(0)

  const setPhase = useCallback((idx: number, ph: Phase) => {
    phaseRef.current = phaseRef.current.map((v, i) => (i === idx ? ph : v)) as Phase[]
    setPhases(prev => prev.map((v, i) => (i === idx ? ph : v)) as Phase[])
  }, [])

  // ── orbital RAF ───────────────────────────────────────────────────────────────
  useEffect(() => {
    let rafId: number
    let alive = true

    const measure = () => {
      const el = containerRef.current
      if (el) { const r = el.getBoundingClientRect(); sizeRef.current = { w: r.width || 520, h: r.height || 580 } }
    }
    measure()
    window.addEventListener('resize', measure, { passive: true })

    const tick = () => {
      if (!alive) return
      const { w: cw, h: ch } = sizeRef.current
      const cmdCx = cw / 2
      const cmdCy = ch / 2
      const orb   = orbRef.current
      const ph    = phaseRef.current
      const ratio = ORBIT_RY / ORBIT_RX

      for (let i = 0; i < 5; i++) {
        const o     = orb[i]
        const phase = ph[i]

        if (phase === 'orbit') {
          o.angle += o.angVel
        } else if (phase === 'capture') {
          o.r     *= R_DECAY
          o.angle += o.angVel * CAPTURE_MULT

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
                o.r     = ORBIT_RX
                capturedRef.current[i] = false
                setPhase(i, 'orbit')
              }, 700)
            }, 0)
          }
        }
        // phase === 'done': no movement, card fades out

        // ── compute position ──
        const px = cmdCx + o.r * Math.cos(o.angle) - CARD_W / 2
        const py = cmdCy + o.r * ratio * Math.sin(o.angle) - CARD_H / 2

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

  // ── capture scheduler ─────────────────────────────────────────────────────────
  useEffect(() => {
    let alive = true

    const scheduleNext = () => {
      if (!alive) return
      const delay = CAP_MIN + Math.random() * (CAP_MAX - CAP_MIN)
      setTimeout(() => {
        if (!alive) return
        const orbiting = orbRef.current.map((o, i) => o.phase === 'orbit' ? i : -1).filter(i => i >= 0)
        if (orbiting.length > 0) {
          const idx = orbiting[Math.floor(Math.random() * orbiting.length)]
          orbRef.current[idx].phase = 'capture'
          setPhase(idx, 'capture')
        }
        scheduleNext()
      }, delay)
    }

    const init = setTimeout(scheduleNext, 2000)
    return () => { alive = false; clearTimeout(init) }
  }, [setPhase])

  // ── count + feed reset every 60 s ─────────────────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => { setCount(0); setFeed([]) }, 60000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: 'clamp(500px, 52vw, 640px)', overflow: 'hidden' }}>
      <style>{`
        @keyframes hsvDot  { 0%,100%{opacity:1} 50%{opacity:0.25} }
        @keyframes hsvFeed { from{opacity:0;transform:translateY(-5px)} to{opacity:1;transform:none} }
        @keyframes hsvPing { 0%,80%,100%{transform:scale(0.8);opacity:0.3} 40%{transform:scale(1.4) translateY(-2px);opacity:1} }
        @keyframes hsvGlow {
          0%,100% { box-shadow: 0 0 0 1px rgba(174,199,245,0.12), 0 0 32px rgba(140,180,255,0.15), 0 0 72px rgba(100,150,240,0.08), 0 36px 72px -16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06); }
          50%     { box-shadow: 0 0 0 1px rgba(174,199,245,0.2),  0 0 48px rgba(140,180,255,0.24), 0 0 96px rgba(100,150,240,0.14), 0 36px 72px -16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06); }
        }
      `}</style>

      {/* ── SVG rails ── */}
      <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 20, overflow: 'visible' }}>
        {REQUESTS.map((_, i) => (
          <line
            key={i}
            ref={el => { lineRefs.current[i] = el }}
            x1="0" y1="0" x2="0" y2="0"
            stroke={phases[i] === 'capture' ? 'rgba(74,222,128,0.45)' : 'rgba(174,199,245,0.1)'}
            strokeWidth={phases[i] === 'capture' ? 1.5 : 0.7}
            strokeDasharray={phases[i] === 'capture' ? '5 6' : '3 9'}
            style={{ transition: 'stroke 0.4s ease, stroke-width 0.3s ease' }}
          />
        ))}
      </svg>

      {/* ── Request cards ── */}
      {REQUESTS.map((req, i) => {
        const phase     = phases[i]
        const isCapture = phase === 'capture'
        const isDone    = phase === 'done'
        return (
          <div
            key={req.id}
            ref={el => { cardRefs.current[i] = el }}
            style={{
              position: 'absolute', left: 0, top: 0,
              width: CARD_W,
              willChange: 'transform',
              backdropFilter: 'blur(14px) saturate(1.5)',
              background: isDone ? 'rgba(237,252,244,0.97)' : isCapture ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.82)',
              border: isDone ? '1.5px solid rgba(74,222,128,0.45)' : isCapture ? '1.5px solid rgba(174,199,245,0.85)' : '1px solid rgba(255,255,255,0.46)',
              borderRadius: 12,
              boxShadow: isCapture ? '0 12px 36px -8px rgba(0,32,69,0.22), 0 0 0 3px rgba(174,199,245,0.12)' : isDone ? '0 8px 24px -8px rgba(74,222,128,0.22)' : '0 6px 20px -6px rgba(0,32,69,0.1)',
              padding: '0.625rem 0.8rem',
              zIndex: (isCapture || isDone) ? 8 : 35,
              opacity: isDone ? 0 : 1,
              transition: 'opacity 0.25s ease, border 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.28rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '0.82rem', color: isDone ? '#15803d' : isCapture ? 'var(--color-blue)' : '#94a3b8', fontVariationSettings: isDone ? "'FILL' 1" : "'FILL' 0", flexShrink: 0, transition: 'color 0.3s ease' }}>
                {isDone ? 'check_circle' : req.icon}
              </span>
              <span style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: isDone ? '#15803d' : isCapture ? 'var(--color-blue)' : 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap', transition: 'color 0.3s ease' }}>
                {isDone ? req.statusDone : req.channel}
              </span>
            </div>
            <p style={{ fontSize: '0.67rem', color: isDone ? '#4d7c60' : 'var(--color-text-2)', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', opacity: isDone ? 0.75 : 1 }}>
              {req.contact} · {req.preview}
            </p>
            {isCapture && (
              <div style={{ display: 'flex', gap: 3, marginTop: '0.32rem', alignItems: 'center' }}>
                {[0,1,2].map(d => <span key={d} style={{ display: 'inline-block', width: 3, height: 3, borderRadius: '50%', background: '#4ade80', animation: `hsvPing 0.85s ${d*0.18}s ease-in-out infinite` }} />)}
                <span style={{ fontSize: '0.52rem', color: '#4ade80', fontFamily: 'var(--font-mono)', marginLeft: 5 }}>Verarbeite...</span>
              </div>
            )}
          </div>
        )
      })}

      {/* ── Command Center (large, z-index above background, below orbiting cards) ── */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        backdropFilter: 'blur(28px) saturate(1.9)',
        background: 'linear-gradient(160deg, rgba(12,26,62,0.97) 0%, rgba(8,18,50,0.99) 100%)',
        border: '1px solid rgba(140,182,255,0.22)',
        borderRadius: 20, overflow: 'hidden',
        zIndex: 30,
        animation: 'hsvGlow 3.5s ease-in-out infinite',
      }}>
        {/* Octopus header */}
        <div style={{ padding: '1rem 1.125rem 0.875rem', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'linear-gradient(160deg, rgba(140,180,255,0.08) 0%, rgba(255,255,255,0.01) 100%)', display: 'flex', alignItems: 'center', gap: '0.875rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '-5%', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(174,199,245,0.22) 0%, transparent 70%)', filter: 'blur(16px)', pointerEvents: 'none' }} />
          <div style={{ width: 50, height: 50, flexShrink: 0, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', background: 'radial-gradient(circle, rgba(174,199,245,0.3) 0%, transparent 70%)', filter: 'blur(8px)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <OctopusSVG size={50} />
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 700, color: 'rgba(255,255,255,0.94)', letterSpacing: '-0.02em', marginBottom: '0.22rem', lineHeight: 1 }}>GXC Command Center</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 5px #4ade80', animation: 'hsvDot 2.8s ease-in-out infinite', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: 'rgba(74,222,128,0.88)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>System Aktiv</span>
            </div>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.44rem', color: 'rgba(255,255,255,0.2)', flexShrink: 0, position: 'relative', zIndex: 1 }}>v2.1</span>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', padding: '0.8rem 1.125rem 0' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 9, padding: '0.5rem 0.75rem' }}>
            <p style={{ fontSize: '0.5rem', color: 'rgba(174,199,245,0.65)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', marginBottom: '0.12rem' }}>Erfasst (Minute)</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>{count}</p>
          </div>
          <div style={{ background: 'rgba(74,222,128,0.07)', borderRadius: 9, padding: '0.5rem 0.75rem', border: '1px solid rgba(74,222,128,0.12)' }}>
            <p style={{ fontSize: '0.5rem', color: 'rgba(74,222,128,0.65)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', marginBottom: '0.12rem' }}>Ø Reaktion</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, color: '#4ade80', lineHeight: 1 }}>&lt; 2 Min</p>
          </div>
        </div>

        {/* Live feed */}
        <div style={{ padding: '0.8rem 1.125rem', minHeight: 152 }}>
          <p style={{ fontSize: '0.47rem', color: 'rgba(255,255,255,0.26)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>Live Feed</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem' }}>
            {feed.length === 0 ? (
              <p style={{ fontSize: '0.63rem', color: 'rgba(255,255,255,0.16)', fontStyle: 'italic' }}>Warte auf erste Anfrage...</p>
            ) : feed.map((item, j) => (
              <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: Math.max(0.28, 1 - j * 0.22), animation: j === 0 ? 'hsvFeed 0.35s ease' : 'none' }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.88)', fontWeight: 600, lineHeight: 1.25 }}>{item.statusDone}</p>
                  <p style={{ fontSize: '0.53rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>{item.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ padding: '0.5rem 1.125rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.48rem', color: 'rgba(255,255,255,0.22)', fontFamily: 'var(--font-mono)' }}>Zähler reset nach 60 s</span>
          <span style={{ fontSize: '0.48rem', color: '#4ade80', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.06em' }}>● LIVE</span>
        </div>
      </div>
    </div>
  )
}
