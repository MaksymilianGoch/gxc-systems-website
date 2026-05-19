'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'System', href: '#leistungen' },
  { label: 'Architecture', href: '#ablauf' },
  { label: 'Results', href: '#ergebnisse' },
  { label: 'About', href: '#ueber-uns' },
  { label: 'Pricing', href: '#preise' },
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
        background: scrolled
          ? 'rgba(7, 9, 15, 0.92)'
          : 'rgba(7, 9, 15, 0.6)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: scrolled ? 'var(--color-border)' : 'transparent',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <nav
          className="flex items-center justify-between"
          style={{ height: '4.5rem' }}
          aria-label="Main Navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="GXC Systems — Home"
          >
            {/* Icon mark */}
            <div
              style={{
                width: '32px',
                height: '32px',
                border: '1px solid rgba(59,130,246,0.4)',
                background: 'rgba(59,130,246,0.08)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="5" height="5" fill="#3B82F6" opacity="0.8" />
                <rect x="9" y="2" width="5" height="5" fill="#06B6D4" opacity="0.5" />
                <rect x="2" y="9" width="5" height="5" fill="#06B6D4" opacity="0.5" />
                <rect x="9" y="9" width="5" height="5" fill="#3B82F6" opacity="0.8" />
              </svg>
            </div>

            {/* Wordmark */}
            <div style={{ lineHeight: 1 }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  letterSpacing: '-0.03em',
                  color: 'var(--color-text)',
                }}
              >
                GXC Systems
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-3)',
                  marginTop: '2px',
                }}
              >
                Operational AI
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.825rem',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: 'var(--color-text-2)',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-2)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#kontakt"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.825rem',
                letterSpacing: '-0.01em',
                color: 'white',
                background: 'var(--color-blue)',
                padding: '0.55rem 1.25rem',
                borderRadius: '4px',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-blue-glow)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-blue)')}
            >
              Book a Demo
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen((p) => !p)}
            className="lg:hidden p-2 transition-colors"
            style={{ color: 'var(--color-text-2)' }}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            background: 'var(--color-bg)',
          }}
        >
          <div className="max-w-[1280px] mx-auto px-6 py-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'var(--color-text-2)',
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
              style={{ borderRadius: '4px' }}
            >
              Book a System Demo
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
