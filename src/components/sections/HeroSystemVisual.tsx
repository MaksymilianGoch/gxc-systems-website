'use client'

import { useEffect, useState } from 'react'

const REQUESTS = [
  { id: 0, icon: 'email',        channel: 'E-Mail',            preview: 'Badezimmer Renovierung', contact: 'Thomas M.',  time: '14:23', statusDone: 'Lead erfasst' },
  { id: 1, icon: 'chat',         channel: 'WhatsApp',          preview: 'Wann kann ich Termin?',  contact: 'Sarah L.',   time: '14:19', statusDone: 'Priorität erkannt' },
  { id: 2, icon: 'description',  channel: 'Kontaktformular',   preview: 'Elektroinstallation',    contact: 'K. Huber',   time: '13:55', statusDone: 'Termin vorbereitet' },
  { id: 3, icon: 'phone_missed', channel: 'Verpasster Anruf',  preview: '+43 664 123 456',        contact: 'Unbekannt',  time: '13:41', statusDone: 'Follow-up aktiv' },
  { id: 4, icon: 'call_received',channel: 'Rückrufbitte',      preview: 'J. Müller · dringend',   contact: 'J. Müller',  time: '13:28', statusDone: 'Team benachrichtigt' },
]

// SVG viewBox: 0 0 520 560
// Card size: 176 × 72 px
// Card center = leftPct*520/100 + 88,  topPct*560/100 + 36
const LAYOUT = [
  { leftPct: 3,  topPct: 2,  svgCx: 104, svgCy: 47  },  // Email
  { leftPct: 56, topPct: 1,  svgCx: 379, svgCy: 42  },  // WhatsApp
  { leftPct: 0,  topPct: 43, svgCx: 88,  svgCy: 277 },  // Form
  { leftPct: 54, topPct: 64, svgCx: 369, svgCy: 394 },  // Call
  { leftPct: 3,  topPct: 64, svgCx: 104, svgCy: 394 },  // Callback
]

const CMD_X = 260
const CMD_Y = 278

interface FeedItem { statusDone: string; contact: string; key: number }
type Phase = 'idle' | 'active' | 'transmitting' | 'done'

export function HeroSystemVisual() {
  const [phases, setPhases] = useState<Phase[]>(Array(5).fill('idle') as Phase[])
  const [feed, setFeed] = useState<FeedItem[]>([])
  const [count, setCount] = useState(14)

  useEffect(() => {
    let alive = true
    let cursor = 0

    const runCard = () => {
      if (!alive) return
      const idx = cursor

      setPhases(p => p.map((v, i) => i === idx ? 'active' : v))

      const t1 = setTimeout(() => {
        if (!alive) return
        setPhases(p => p.map((v, i) => i === idx ? 'transmitting' : v))
      }, 750)

      const t2 = setTimeout(() => {
        if (!alive) return
        setPhases(p => p.map((v, i) => i === idx ? 'done' : v))
        setFeed(f => [
          { statusDone: REQUESTS[idx].statusDone, contact: REQUESTS[idx].contact, key: Date.now() },
          ...f,
        ].slice(0, 4))
        setCount(c => c + 1)
      }, 1950)

      const t3 = setTimeout(() => {
        if (!alive) return
        cursor = (cursor + 1) % 5
        const resetIdx = idx
        setTimeout(() => {
          if (!alive) return
          setPhases(p => p.map((v, i) => i === resetIdx && v === 'done' ? 'idle' : v))
        }, 3800)
        setTimeout(runCard, 550)
      }, 3550)

      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }

    const init = setTimeout(runCard, 1400)
    return () => { alive = false; clearTimeout(init) }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: 'clamp(460px, 46vw, 560px)' }}>
      <style>{`
        @keyframes hsvFloat0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes hsvFloat1 { 0%,100%{transform:translateY(-5px)} 50%{transform:translateY(6px)} }
        @keyframes hsvFloat2 { 0%,100%{transform:translateY(-3px)} 50%{transform:translateY(8px)} }
        @keyframes hsvFloat3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes hsvFloat4 { 0%,100%{transform:translateY(-6px)} 50%{transform:translateY(5px)} }
        @keyframes hsvDot   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.75)} }
        @keyframes hsvPing  { 0%,80%,100%{transform:scale(0.85);opacity:0.35} 40%{transform:scale(1.3) translateY(-2px);opacity:1} }
        @keyframes hsvFeed  { from{opacity:0;transform:translateY(-5px)} to{opacity:1;transform:none} }
        @keyframes hsvPulse { 0%,100%{box-shadow:0 32px 64px -16px rgba(0,0,0,0.45)} 50%{box-shadow:0 32px 64px -16px rgba(0,0,0,0.45),0 0 0 3px rgba(74,222,128,0.1)} }
      `}</style>

      {/* ── SVG rail layer ── */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 20 }}
        viewBox="0 0 520 560"
        preserveAspectRatio="xMidYMid meet"
        overflow="visible"
      >
        <defs>
          <filter id="hsv-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {LAYOUT.map((pos, i) => {
          const isLive = phases[i] === 'transmitting' || phases[i] === 'done'
          const isTransmit = phases[i] === 'transmitting'
          const path = `M ${pos.svgCx} ${pos.svgCy} L ${CMD_X} ${CMD_Y}`
          return (
            <g key={i}>
              <line
                x1={pos.svgCx} y1={pos.svgCy} x2={CMD_X} y2={CMD_Y}
                stroke={isLive ? 'rgba(74,222,128,0.38)' : 'rgba(174,199,245,0.13)'}
                strokeWidth={isLive ? 1.4 : 0.7}
                strokeDasharray={isLive ? '5 7' : '3 8'}
                style={{ transition: 'stroke 0.45s ease, stroke-width 0.3s ease' }}
              />
              {isTransmit && (
                <circle r="4.5" fill="#4ade80" opacity="0.92" filter="url(#hsv-glow)">
                  <animateMotion dur="1.15s" repeatCount="1" fill="freeze" path={path} />
                </circle>
              )}
            </g>
          )
        })}
      </svg>

      {/* ── Request cards ── */}
      {REQUESTS.map((req, i) => {
        const phase = phases[i]
        const isActive = phase === 'active' || phase === 'transmitting'
        const isDone   = phase === 'done'
        const isIdle   = phase === 'idle'
        const pos = LAYOUT[i]

        return (
          <div
            key={req.id}
            style={{
              position: 'absolute',
              left: `${pos.leftPct}%`,
              top:  `${pos.topPct}%`,
              width: 176,
              backdropFilter: 'blur(14px) saturate(1.5)',
              background: isDone
                ? 'rgba(237,252,244,0.97)'
                : isActive
                  ? 'rgba(255,255,255,0.97)'
                  : 'rgba(255,255,255,0.83)',
              border: isDone
                ? '1.5px solid rgba(74,222,128,0.42)'
                : isActive
                  ? '1.5px solid rgba(174,199,245,0.82)'
                  : '1px solid rgba(255,255,255,0.48)',
              borderRadius: 12,
              boxShadow: isActive
                ? '0 12px 36px -8px rgba(0,32,69,0.2), 0 0 0 3px rgba(174,199,245,0.1)'
                : isDone
                  ? '0 8px 24px -8px rgba(74,222,128,0.18)'
                  : '0 6px 20px -6px rgba(0,32,69,0.09)',
              padding: '0.625rem 0.8rem',
              zIndex: isActive ? 15 : isDone ? 13 : 10,
              transition: 'border 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, transform 0.3s ease',
              transform: isActive
                ? 'translateY(-5px) scale(1.04)'
                : isDone
                  ? 'translateY(-2px)'
                  : undefined,
              animation: isIdle
                ? `hsvFloat${i} ${6.2 + i * 0.9}s ease-in-out ${i * 0.8}s infinite`
                : 'none',
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
                fontSize: '0.58rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: isDone ? '#15803d' : isActive ? 'var(--color-blue)' : 'var(--color-text-3)',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                whiteSpace: 'nowrap',
                transition: 'color 0.3s ease',
              }}>
                {isDone ? req.statusDone : req.channel}
              </span>
            </div>

            <p style={{
              fontSize: '0.67rem',
              color: isDone ? '#4d7c60' : 'var(--color-text-2)',
              lineHeight: 1.4,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              opacity: isDone ? 0.75 : 1,
            }}>
              {req.contact} · {req.preview}
            </p>

            {phase === 'transmitting' && (
              <div style={{ display: 'flex', gap: 3, marginTop: '0.32rem', alignItems: 'center' }}>
                {[0, 1, 2].map(d => (
                  <span key={d} style={{
                    display: 'inline-block', width: 3, height: 3, borderRadius: '50%',
                    background: '#4ade80',
                    animation: `hsvPing 0.85s ${d * 0.18}s ease-in-out infinite`,
                  }} />
                ))}
                <span style={{ fontSize: '0.52rem', color: '#4ade80', fontFamily: 'var(--font-mono)', marginLeft: 5 }}>Verarbeite...</span>
              </div>
            )}
          </div>
        )
      })}

      {/* ── Command Center ── */}
      <div
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 256,
          backdropFilter: 'blur(24px) saturate(1.8)',
          background: 'linear-gradient(145deg, rgba(10,22,56,0.96) 0%, rgba(8,18,48,0.98) 100%)',
          border: '1px solid rgba(140,180,255,0.16)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 32px 64px -16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)',
          zIndex: 30,
          animation: 'hsvPulse 3.5s ease-in-out infinite',
        }}
      >
        {/* Title bar */}
        <div style={{
          padding: '0.7rem 0.875rem 0.65rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.025)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
              background: '#4ade80', boxShadow: '0 0 6px #4ade80',
              animation: 'hsvDot 2.8s ease-in-out infinite',
            }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.57rem', fontWeight: 700, color: 'rgba(255,255,255,0.82)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              GXC Command Center
            </span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.05em' }}>v2.1</span>
        </div>

        {/* Stats row */}
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

        {/* Live feed */}
        <div style={{ padding: '0.7rem 0.875rem', minHeight: 148 }}>
          <p style={{ fontSize: '0.46rem', color: 'rgba(255,255,255,0.26)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
            Live Feed
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {feed.length === 0 ? (
              <p style={{ fontSize: '0.63rem', color: 'rgba(255,255,255,0.16)', fontStyle: 'italic' }}>Warte auf erste Anfrage...</p>
            ) : feed.map((item, j) => (
              <div
                key={item.key}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  opacity: Math.max(0.3, 1 - j * 0.21),
                  animation: j === 0 ? 'hsvFeed 0.35s ease' : 'none',
                }}
              >
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '0.63rem', color: 'rgba(255,255,255,0.88)', fontWeight: 600, lineHeight: 1.25 }}>{item.statusDone}</p>
                  <p style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>{item.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom status bar */}
        <div style={{
          padding: '0.45rem 0.875rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: '0.48rem', color: 'rgba(255,255,255,0.22)', fontFamily: 'var(--font-mono)' }}>System aktiv seit 08:00</span>
          <span style={{ fontSize: '0.48rem', color: '#4ade80', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.06em' }}>● LIVE</span>
        </div>
      </div>
    </div>
  )
}
