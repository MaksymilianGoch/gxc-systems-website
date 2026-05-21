'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'System', href: '#wie-es-funktioniert' },
  { label: 'Ablauf', href: '#ablauf' },
  { label: 'Pilotprogramm', href: '#ergebnisse' },
  { label: 'Über uns', href: '#ueber-uns' },
  { label: 'Preise', href: '#preise' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled ? 'blur(20px) saturate(1.8)' : 'blur(12px)',
        background: scrolled ? 'rgba(251,249,248,0.92)' : 'rgba(251,249,248,0.7)',
        borderBottom: `1px solid ${scrolled ? 'rgba(196,198,207,0.3)' : 'transparent'}`,
        boxShadow: scrolled ? '0 2px 32px -8px rgba(0,32,69,0.1)' : 'none',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 xl:px-24">
        <nav className="flex items-center justify-between" style={{ height: '5rem' }} aria-label="Hauptnavigation">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" aria-label="GXC Systems">
            {/* Octopus logo */}
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
              {/* Outer hexagon (flat-top: points L/R) */}
              <path d="M28 8 L72 8 L94 50 L72 92 L28 92 L6 50 Z"
                fill="rgba(174,199,245,0.1)" stroke="rgba(140,182,255,0.45)" strokeWidth="2.5"/>
              {/* Inner hexagon ring */}
              <path d="M31 14 L69 14 L88 50 L69 86 L31 86 L12 50 Z"
                fill="none" stroke="rgba(140,182,255,0.17)" strokeWidth="1.4"/>
              {/* Body / head */}
              <ellipse cx="50" cy="37" rx="16" ry="20" fill="rgba(174,199,245,0.9)"/>
              {/* Left eye — open */}
              <circle cx="42.5" cy="32" r="4" fill="rgba(88,142,224,0.65)"/>
              <circle cx="43.5" cy="33" r="1.9" fill="rgba(18,60,155,0.88)"/>
              {/* Right eye — winking */}
              <path d="M52.5 29.5 Q56.5 34.5 60 29.5"
                stroke="rgba(18,60,155,0.85)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
              {/* Smile */}
              <path d="M43 41 Q50 47 57 41"
                stroke="rgba(22,65,158,0.7)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
              {/* Left side tentacle */}
              <path d="M34 42 Q18 40 12 46 Q7 51 12 56"
                stroke="rgba(152,192,255,0.82)" strokeWidth="3" strokeLinecap="round" fill="none"/>
              {/* Right side tentacle */}
              <path d="M66 42 Q82 40 88 46 Q93 51 88 56"
                stroke="rgba(152,192,255,0.82)" strokeWidth="3" strokeLinecap="round" fill="none"/>
              {/* 4 front tentacles */}
              <path d="M39 55 Q33 65 30 76"
                stroke="rgba(158,198,255,0.87)" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
              <path d="M46 57 Q42 68 40 80"
                stroke="rgba(158,198,255,0.87)" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
              <path d="M54 57 Q58 68 60 80"
                stroke="rgba(158,198,255,0.87)" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
              <path d="M61 55 Q67 65 70 76"
                stroke="rgba(158,198,255,0.87)" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
              {/* Circuit traces — outer left */}
              <polyline points="30,76 24,79 20,84" stroke="rgba(138,183,255,0.58)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="20" cy="84" r="2.3" fill="none" stroke="rgba(138,183,255,0.54)" strokeWidth="1.2"/>
              <line x1="30" y1="76" x2="28" y2="84" stroke="rgba(138,183,255,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="28" cy="84" r="2.3" fill="none" stroke="rgba(138,183,255,0.54)" strokeWidth="1.2"/>
              {/* Circuit traces — inner left */}
              <polyline points="40,80 37,86 32,90" stroke="rgba(138,183,255,0.58)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="32" cy="90" r="2.3" fill="none" stroke="rgba(138,183,255,0.54)" strokeWidth="1.2"/>
              {/* Circuit traces — center (body bottom) */}
              <polyline points="50,57 50,74 46,80" stroke="rgba(138,183,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <line x1="50" y1="74" x2="54" y2="80" stroke="rgba(138,183,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="46" cy="80" r="2.3" fill="none" stroke="rgba(138,183,255,0.48)" strokeWidth="1.2"/>
              <circle cx="54" cy="80" r="2.3" fill="none" stroke="rgba(138,183,255,0.48)" strokeWidth="1.2"/>
              {/* Circuit traces — inner right */}
              <polyline points="60,80 63,86 68,90" stroke="rgba(138,183,255,0.58)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="68" cy="90" r="2.3" fill="none" stroke="rgba(138,183,255,0.54)" strokeWidth="1.2"/>
              {/* Circuit traces — outer right */}
              <polyline points="70,76 76,79 80,84" stroke="rgba(138,183,255,0.58)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="80" cy="84" r="2.3" fill="none" stroke="rgba(138,183,255,0.54)" strokeWidth="1.2"/>
              <line x1="70" y1="76" x2="72" y2="84" stroke="rgba(138,183,255,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="72" cy="84" r="2.3" fill="none" stroke="rgba(138,183,255,0.54)" strokeWidth="1.2"/>
            </svg>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.03em', color: 'var(--color-text)', lineHeight: 1 }}>GXC Systems</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-green)', marginTop: '2px' }}>Systeme für KMU</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-4">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.875rem', background: 'rgba(110,171,140,0.1)', border: '1px solid rgba(110,171,140,0.25)', borderRadius: 'var(--radius-full)' }}>
              <span className="live-dot" style={{ width: 6, height: 6 }} aria-hidden="true" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, color: 'var(--color-green)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>System Aktiv</span>
            </div>
            <a href="#kontakt" className="nav-cta">System-Demo anfragen</a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((p) => !p)}
            className="lg:hidden p-2"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
            style={{ color: 'var(--color-text-3)' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>
              {isOpen ? 'close' : 'menu'}
            </span>
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div style={{ borderTop: '1px solid var(--color-border)', background: 'rgba(251,249,248,0.97)', backdropFilter: 'blur(20px)' }}>
          <div className="max-w-[1440px] mx-auto px-6 py-6 flex flex-col gap-1">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setIsOpen(false)} className="block py-3 nav-link" style={{ borderBottom: '1px solid var(--color-border)', fontSize: '1rem' }}>
                {l.label}
              </a>
            ))}
            <a href="#kontakt" onClick={() => setIsOpen(false)} className="btn-primary mt-4 justify-center">
              System-Demo anfragen
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
