import { AnimateIn } from '@/components/ui/AnimateIn'
import { HeroSystemVisual } from './HeroSystemVisual'

export function HeroSection() {
  return (
    <section
      className="bg-mesh"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'clamp(7rem, 12vw, 9rem)',
        paddingBottom: 'clamp(4rem, 7vw, 6rem)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(214,227,255,0.5) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} aria-hidden="true" />
      <div style={{ position: 'absolute', top: '5%', right: '-5%', width: '35vw', height: '35vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(110,171,140,0.18) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} aria-hidden="true" />

      {/* Paper planes */}
      <style>{`
        @keyframes flyLoop1 {
          0%   { transform: translate(0, 0) rotate(-15deg); opacity: 0; }
          5%   { opacity: 0.7; }
          30%  { transform: translate(18vw, -8vh) rotate(-8deg); }
          55%  { transform: translate(38vw, -18vh) rotate(-20deg); }
          80%  { transform: translate(60vw, -6vh) rotate(-10deg); opacity: 0.6; }
          95%  { opacity: 0; }
          100% { transform: translate(80vw, -14vh) rotate(-15deg); opacity: 0; }
        }
        @keyframes flyLoop2 {
          0%   { transform: translate(0, 0) rotate(-10deg); opacity: 0; }
          8%   { opacity: 0.55; }
          35%  { transform: translate(20vw, 10vh) rotate(-18deg); }
          60%  { transform: translate(45vw, 2vh) rotate(-6deg); }
          85%  { transform: translate(68vw, 12vh) rotate(-14deg); opacity: 0.45; }
          95%  { opacity: 0; }
          100% { transform: translate(85vw, 8vh) rotate(-10deg); opacity: 0; }
        }
        @keyframes flyLoop3 {
          0%   { transform: translate(0, 0) rotate(-20deg); opacity: 0; }
          6%   { opacity: 0.5; }
          40%  { transform: translate(25vw, -15vh) rotate(-10deg); }
          65%  { transform: translate(50vw, -25vh) rotate(-22deg); }
          88%  { transform: translate(72vw, -12vh) rotate(-16deg); opacity: 0.4; }
          95%  { opacity: 0; }
          100% { transform: translate(90vw, -18vh) rotate(-20deg); opacity: 0; }
        }
        @keyframes flyLoop4 {
          0%   { transform: translate(0, 0) rotate(-5deg); opacity: 0; }
          10%  { opacity: 0.45; }
          45%  { transform: translate(30vw, 18vh) rotate(-14deg); }
          70%  { transform: translate(55vw, 8vh) rotate(-4deg); }
          90%  { transform: translate(75vw, 20vh) rotate(-10deg); opacity: 0.35; }
          95%  { opacity: 0; }
          100% { transform: translate(92vw, 16vh) rotate(-5deg); opacity: 0; }
        }
        @keyframes flyLoop5 {
          0%   { transform: translate(0, 0) rotate(-12deg); opacity: 0; }
          7%   { opacity: 0.6; }
          38%  { transform: translate(22vw, -5vh) rotate(-20deg); }
          62%  { transform: translate(48vw, -12vh) rotate(-8deg); }
          86%  { transform: translate(70vw, -2vh) rotate(-18deg); opacity: 0.5; }
          95%  { opacity: 0; }
          100% { transform: translate(88vw, -8vh) rotate(-12deg); opacity: 0; }
        }
      `}</style>

      {[
        { style: { top: '20%', left: '-6%', animation: 'flyLoop1 9s ease-in-out 0s infinite' }, scale: 1 },
        { style: { top: '55%', left: '-4%', animation: 'flyLoop2 11s ease-in-out 2.5s infinite' }, scale: 0.7 },
        { style: { top: '12%', left: '-5%', animation: 'flyLoop3 13s ease-in-out 5s infinite' }, scale: 0.85 },
        { style: { top: '72%', left: '-5%', animation: 'flyLoop4 10s ease-in-out 1.2s infinite' }, scale: 0.6 },
        { style: { top: '38%', left: '-4%', animation: 'flyLoop5 12s ease-in-out 7s infinite' }, scale: 0.75 },
      ].map((plane, i) => (
        <div key={i} style={{ position: 'absolute', pointerEvents: 'none', ...plane.style }} aria-hidden="true">
          <svg width={Math.round(52 * plane.scale)} height={Math.round(44 * plane.scale)} viewBox="0 0 52 44" fill="none">
            {/* Paper plane shape */}
            <path d="M2 22 L50 2 L32 22 L50 42 Z" fill="white" fillOpacity="0.88"/>
            <path d="M32 22 L2 22 L20 30 Z" fill="white" fillOpacity="0.65"/>
            <path d="M2 22 L50 2" stroke="rgba(200,220,255,0.5)" strokeWidth="0.5"/>
            <path d="M32 22 L50 2" stroke="rgba(180,210,255,0.4)" strokeWidth="0.5"/>
            <path d="M32 22 L20 30" stroke="rgba(200,220,255,0.4)" strokeWidth="0.5"/>
            <path d="M20 30 L2 22" stroke="rgba(180,210,255,0.35)" strokeWidth="0.5"/>
            {/* Fold lines */}
            <line x1="32" y1="22" x2="26" y2="16" stroke="rgba(160,200,255,0.4)" strokeWidth="0.5"/>
            <line x1="32" y1="22" x2="26" y2="28" stroke="rgba(160,200,255,0.35)" strokeWidth="0.5"/>
          </svg>
          {/* Glow behind plane */}
          <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,235,255,0.3) 0%, transparent 70%)', filter: 'blur(8px)' }} />
        </div>
      ))}

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 xl:px-24 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Copy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <AnimateIn delay={0}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.875rem', background: 'rgba(251,249,248,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(196,198,207,0.35)', borderRadius: 'var(--radius-full)' }}>
                <span className="live-dot" style={{ width: 7, height: 7 }} aria-hidden="true" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  System Aktiv: Q3 2026
                </span>
              </div>
            </AnimateIn>

            <AnimateIn delay={60}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 5.5vw, 4.75rem)', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.04em', color: 'var(--color-text)' }}>
                Aus Anfragen<br />
                werden<br />
                <span style={{ fontStyle: 'italic', color: 'var(--color-blue)' }}>Aufträge.</span>
              </h1>
            </AnimateIn>

            <AnimateIn delay={130}>
              <p style={{ fontSize: '1.125rem', lineHeight: 1.75, color: 'var(--color-text-2)', maxWidth: '32rem' }}>
                GXC baut das System, das Anfragen erfasst, zuordnet, beantwortet und in Termine verwandelt. Für Betriebe, die wachsen — ohne mehr Personal.
              </p>
            </AnimateIn>

            <AnimateIn delay={200}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <a href="#kontakt" className="btn-primary">
                  System-Demo anfragen
                  <span className="material-symbols-outlined" style={{ fontSize: '1.15rem' }}>arrow_forward</span>
                </a>
                <a href="#ablauf" className="btn-secondary">Ablauf ansehen</a>
              </div>
            </AnimateIn>
          </div>

          {/* Right: System Visual */}
          <div className="hidden lg:block">
            <HeroSystemVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
