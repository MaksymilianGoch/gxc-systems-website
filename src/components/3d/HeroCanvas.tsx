'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

const OperationalCore = dynamic(
  () => import('./OperationalCore').then((mod) => ({ default: mod.OperationalCore })),
  { ssr: false }
)

function FallbackSVG() {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      aria-hidden="true"
    >
      <svg viewBox="0 0 400 400" width="100%" height="100%" style={{ maxWidth: '420px', opacity: 0.35 }}>
        <defs>
          <radialGradient id="cg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="160" fill="url(#cg)" />
        <circle cx="200" cy="200" r="60" fill="none" stroke="#3B82F6" strokeWidth="0.5" opacity="0.5" />
        <circle cx="200" cy="200" r="100" fill="none" stroke="#06B6D4" strokeWidth="0.3" opacity="0.3" />
        <circle cx="200" cy="200" r="140" fill="none" stroke="#3B82F6" strokeWidth="0.2" opacity="0.2" />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          const x = 200 + 130 * Math.cos(rad)
          const y = 200 + 130 * Math.sin(rad)
          return (
            <g key={i}>
              <line x1="200" y1="200" x2={x} y2={y} stroke="#3B82F6" strokeWidth="0.3" opacity="0.2" />
              <circle cx={x} cy={y} r="4" fill="#3B82F6" opacity="0.5" />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export function HeroCanvas() {
  return (
    <div className="w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.5, 7], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <OperationalCore />
        </Suspense>
      </Canvas>
    </div>
  )
}

export function HeroCanvasDynamic() {
  return (
    <Suspense fallback={<FallbackSVG />}>
      <HeroCanvas />
    </Suspense>
  )
}
