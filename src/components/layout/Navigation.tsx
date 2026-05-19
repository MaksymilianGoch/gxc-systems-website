'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Ablauf', href: '#ablauf' },
  { label: 'Ergebnisse', href: '#ergebnisse' },
  { label: 'Über uns', href: '#ueber-uns' },
  { label: 'Preise', href: '#preise' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg shadow-black/20' : ''
      }`}
      style={{ background: 'var(--color-charcoal)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        <nav className="flex items-center justify-between h-[4.5rem] md:h-20" aria-label="Hauptnavigation">

          {/* Logo — premium SVG wordmark */}
          <Link href="/" aria-label="GXC Systems — Startseite" className="flex items-center group">
            <svg
              width="160"
              height="40"
              viewBox="0 0 160 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="transition-opacity duration-200 group-hover:opacity-90"
            >
              <defs>
                <linearGradient id="gxc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#C8D8F0" />
                  <stop offset="100%" stopColor="#7BAEE0" />
                </linearGradient>
              </defs>
              {/* GXC — bold, large */}
              <text
                x="0"
                y="26"
                fontFamily="Georgia, 'Times New Roman', serif"
                fontSize="28"
                fontWeight="700"
                fill="url(#gxc-grad)"
                letterSpacing="-1"
              >
                GXC
              </text>
              {/* SYSTEMS — tracked, smaller */}
              <text
                x="1"
                y="38"
                fontFamily="'Inter', system-ui, sans-serif"
                fontSize="9"
                fontWeight="600"
                fill="rgba(255,255,255,0.45)"
                letterSpacing="3.5"
              >
                SYSTEMS
              </text>
            </svg>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium tracking-[0.1em] uppercase transition-colors duration-150"
                style={{ color: 'rgba(255,255,255,0.55)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#kontakt"
              className="text-xs font-semibold tracking-[0.1em] uppercase px-5 py-2.5 transition-all duration-200 btn-press"
              style={{
                background: 'var(--color-teal)',
                color: 'white',
                borderRadius: '2px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-teal-light)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-teal)')}
            >
              Erstgespräch
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen((p) => !p)}
            className="lg:hidden p-2 transition-colors"
            style={{ color: 'rgba(255,255,255,0.7)' }}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-nav"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-sm font-medium"
                style={{
                  color: 'rgba(255,255,255,0.65)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setIsOpen(false)}
              className="mt-4 block text-center text-xs font-semibold tracking-[0.1em] uppercase py-3"
              style={{
                background: 'var(--color-teal)',
                color: 'white',
                borderRadius: '2px',
              }}
            >
              Erstgespräch buchen
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
