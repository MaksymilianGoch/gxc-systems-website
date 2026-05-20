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
            {/* Octopus logo — no background */}
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
              {/* Hexagon outline */}
              <path d="M50 4L91 27V73L50 96L9 73V27Z" fill="rgba(180,210,255,0.12)" stroke="rgba(140,190,255,0.5)" strokeWidth="2"/>
              {/* Body */}
              <ellipse cx="50" cy="36" rx="14" ry="17" fill="rgba(180,210,255,0.9)"/>
              {/* Eyes */}
              <circle cx="44" cy="33" r="3.5" fill="rgba(100,160,240,0.7)"/>
              <circle cx="56" cy="33" r="3.5" fill="rgba(100,160,240,0.7)"/>
              <circle cx="44.8" cy="33.8" r="1.5" fill="rgba(40,80,160,0.8)"/>
              {/* Wink right */}
              <path d="M54 33 Q56 35 58 33" stroke="rgba(40,80,160,0.8)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              {/* Smile */}
              <path d="M44 40 Q50 45 56 40" stroke="rgba(40,80,160,0.7)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              {/* Tentacles */}
              <path d="M38 50 Q30 60 26 72 Q24 78 28 80" stroke="rgba(160,200,255,0.85)" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <path d="M44 53 Q38 65 36 76 Q34 82 30 82" stroke="rgba(160,200,255,0.85)" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <path d="M50 54 Q50 68 50 78 Q50 84 46 86 M50 78 Q52 84 56 86" stroke="rgba(160,200,255,0.85)" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <path d="M56 53 Q62 65 64 76 Q66 82 70 82" stroke="rgba(160,200,255,0.85)" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <path d="M62 50 Q70 60 74 72 Q76 78 72 80" stroke="rgba(160,200,255,0.85)" strokeWidth="3" strokeLinecap="round" fill="none"/>
              {/* Side arms */}
              <path d="M36 42 Q22 40 14 46 Q10 50 14 54" stroke="rgba(160,200,255,0.8)" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <path d="M64 42 Q78 40 86 46 Q90 50 86 54" stroke="rgba(160,200,255,0.8)" strokeWidth="3" strokeLinecap="round" fill="none"/>
              {/* Circuit dots */}
              <circle cx="14" cy="54" r="3" fill="none" stroke="rgba(140,190,255,0.6)" strokeWidth="1.5"/>
              <circle cx="86" cy="54" r="3" fill="none" stroke="rgba(140,190,255,0.6)" strokeWidth="1.5"/>
              <circle cx="28" cy="82" r="3" fill="none" stroke="rgba(140,190,255,0.6)" strokeWidth="1.5"/>
              <circle cx="72" cy="82" r="3" fill="none" stroke="rgba(140,190,255,0.6)" strokeWidth="1.5"/>
              <circle cx="46" cy="88" r="3" fill="none" stroke="rgba(140,190,255,0.6)" strokeWidth="1.5"/>
              <circle cx="56" cy="88" r="3" fill="none" stroke="rgba(140,190,255,0.6)" strokeWidth="1.5"/>
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
