'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

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
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(248, 246, 243, 0.95)' : 'rgba(248, 246, 243, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: scrolled ? 'var(--color-border)' : 'transparent',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <nav
          className="flex items-center justify-between"
          style={{ height: '4.5rem' }}
          aria-label="Hauptnavigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="GXC Systems — Startseite"
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                border: '1px solid rgba(23,59,92,0.25)',
                background: 'rgba(23,59,92,0.07)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="5" height="5" fill="#173B5C" opacity="0.9" />
                <rect x="9" y="2" width="5" height="5" fill="#C6A15B" opacity="0.7" />
                <rect x="2" y="9" width="5" height="5" fill="#C6A15B" opacity="0.7" />
                <rect x="9" y="9" width="5" height="5" fill="#173B5C" opacity="0.9" />
              </svg>
            </div>

            <div style={{ lineHeight: 1 }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  letterSpacing: '-0.025em',
                  color: 'var(--color-text)',
                }}
              >
                GXC Systems
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--color-blue)',
                  marginTop: '2px',
                }}
              >
                Systeme für KMU
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.825rem',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <a
              href="#kontakt"
              className="nav-cta"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.825rem',
                letterSpacing: '-0.01em',
                color: 'white',
                padding: '0.55rem 1.2rem',
              }}
            >
              Erstgespräch buchen
            </a>
          </div>

          {/* Mobile */}
          <button
            type="button"
            onClick={() => setIsOpen((p) => !p)}
            className="lg:hidden p-2 nav-link"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {isOpen && (
        <div style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
          <div className="max-w-[1280px] mx-auto px-6 py-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 nav-link"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setIsOpen(false)}
              className="btn-primary mt-4 justify-center text-center"
            >
              Erstgespräch buchen
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
