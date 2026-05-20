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
            <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-lg)', background: 'var(--color-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px -2px rgba(0,32,69,0.3)' }}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="5" height="5" fill="white" opacity="0.95" />
                <rect x="9" y="2" width="5" height="5" fill="rgba(110,171,140,0.9)" />
                <rect x="2" y="9" width="5" height="5" fill="rgba(110,171,140,0.9)" />
                <rect x="9" y="9" width="5" height="5" fill="white" opacity="0.95" />
              </svg>
            </div>
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
