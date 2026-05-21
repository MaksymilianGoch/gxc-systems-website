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
              <path d="M25 6 L75 6 L97 50 L75 94 L25 94 L3 50 Z" fill="rgba(174,199,245,0.1)" stroke="rgba(140,182,255,0.48)" strokeWidth="2.5"/>
              <path d="M29 12 L71 12 L91 50 L71 88 L29 88 L9 50 Z" fill="none" stroke="rgba(140,182,255,0.17)" strokeWidth="1.4"/>
              <ellipse cx="50" cy="32" rx="17" ry="23" fill="rgba(174,199,245,0.92)"/>
              <path d="M37 28 Q41 23.5 45 28 Q41 32.5 37 28 Z" fill="rgba(18,58,152,0.88)"/>
              <path d="M53.5 26 Q57.5 32 61.5 26" stroke="rgba(18,58,152,0.88)" strokeWidth="2.3" strokeLinecap="round" fill="none"/>
              <path d="M43 39 Q50 45 57 39" stroke="rgba(20,62,155,0.72)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
              <path d="M34 41 Q16 37 10 45 Q4 53 9 59 Q14 65 20 61" stroke="rgba(150,190,255,0.86)" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
              <path d="M66 41 Q84 37 90 45 Q96 53 91 59 Q86 65 80 61" stroke="rgba(150,190,255,0.86)" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
              <path d="M38 54 Q30 66 29 77 Q28 84 32 86" stroke="rgba(155,195,255,0.88)" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
              <path d="M45 57 Q39 70 39 81 Q39 87 43 88" stroke="rgba(155,195,255,0.88)" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
              <path d="M55 57 Q61 70 61 81 Q61 87 57 88" stroke="rgba(155,195,255,0.88)" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
              <path d="M62 54 Q70 66 71 77 Q72 84 68 86" stroke="rgba(155,195,255,0.88)" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
              <polyline points="32,86 28,86 28,91" stroke="rgba(136,181,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="28" cy="91" r="2.8" fill="none" stroke="rgba(136,181,255,0.56)" strokeWidth="1.3"/>
              <polyline points="32,86 32,90 36,90 36,93" stroke="rgba(136,181,255,0.56)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="36" cy="93" r="2.8" fill="none" stroke="rgba(136,181,255,0.52)" strokeWidth="1.3"/>
              <line x1="43" y1="88" x2="43" y2="93" stroke="rgba(136,181,255,0.54)" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="43" cy="93" r="2.8" fill="none" stroke="rgba(136,181,255,0.5)" strokeWidth="1.3"/>
              <line x1="57" y1="88" x2="57" y2="93" stroke="rgba(136,181,255,0.54)" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="57" cy="93" r="2.8" fill="none" stroke="rgba(136,181,255,0.5)" strokeWidth="1.3"/>
              <polyline points="68,86 68,90 64,90 64,93" stroke="rgba(136,181,255,0.56)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="64" cy="93" r="2.8" fill="none" stroke="rgba(136,181,255,0.52)" strokeWidth="1.3"/>
              <polyline points="68,86 72,86 72,91" stroke="rgba(136,181,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="72" cy="91" r="2.8" fill="none" stroke="rgba(136,181,255,0.56)" strokeWidth="1.3"/>
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
