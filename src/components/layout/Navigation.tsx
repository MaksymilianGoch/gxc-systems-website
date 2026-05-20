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
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(251,249,248,0.92)' : 'rgba(251,249,248,0.75)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(196,198,207,0.3)' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 24px -4px rgba(0,32,69,0.08)' : 'none',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <nav className="flex items-center justify-between" style={{ height: '4.5rem' }} aria-label="Hauptnavigation">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" aria-label="GXC Systems — Startseite">
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                background: 'var(--color-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="5" height="5" fill="white" opacity="0.9" />
                <rect x="9" y="2" width="5" height="5" fill="rgba(110,171,140,0.85)" />
                <rect x="2" y="9" width="5" height="5" fill="rgba(110,171,140,0.85)" />
                <rect x="9" y="9" width="5" height="5" fill="white" opacity="0.9" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.025em', color: 'var(--color-text)', lineHeight: 1.1 }}>
                GXC Systems
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-green)', marginTop: '1px' }}>
                Systeme für KMU
              </div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
            ))}
          </div>

          {/* System Aktiv pill + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.25rem 0.75rem', background: 'rgba(110,171,140,0.1)', border: '1px solid rgba(110,171,140,0.25)', borderRadius: '100px' }}>
              <span className="live-dot" style={{ width: 6, height: 6 }} aria-hidden="true" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', fontWeight: 700, color: 'var(--color-green)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                System Aktiv
              </span>
            </div>
            <a href="#kontakt" className="nav-cta">
              System-Demo anfragen
            </a>
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
        <div style={{ borderTop: '1px solid var(--color-border)', background: 'rgba(251,249,248,0.98)', backdropFilter: 'blur(16px)' }}>
          <div className="max-w-[1440px] mx-auto px-6 py-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 nav-link"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                {link.label}
              </a>
            ))}
            <a href="#kontakt" onClick={() => setIsOpen(false)} className="btn-primary mt-4 justify-center text-center">
              System-Demo anfragen
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
