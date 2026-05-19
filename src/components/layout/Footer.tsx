import Link from 'next/link'
import { Container } from '@/components/ui/Container'

const navLinks = [
  { label: 'Leistungen', href: '/#leistungen' },
  { label: 'Ablauf', href: '/#ablauf' },
  { label: 'Ergebnisse', href: '/#ergebnisse' },
  { label: 'Über uns', href: '/#ueber-uns' },
  { label: 'Preise', href: '/#preise' },
  { label: 'Kontakt', href: '/#kontakt' },
]

const legalLinks = [
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--color-charcoal)', color: 'white' }}>
      <Container>
        {/* Top */}
        <div
          className="py-14 flex flex-col md:flex-row md:items-start md:justify-between gap-10"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div
                className="w-7 h-7 flex items-center justify-center shrink-0"
                style={{
                  border: '1.5px solid rgba(200,164,74,0.5)',
                  background: 'rgba(200,164,74,0.07)',
                }}
              >
                <span
                  className="text-xs font-bold"
                  style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}
                >
                  GX
                </span>
              </div>
              <span
                className="font-semibold text-white"
                style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', letterSpacing: '-0.02em' }}
              >
                GXC Systems
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Operative Systemarchitektur und Prozessautomation
              für Betriebe im Dreiländereck.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="dot-live" aria-hidden="true" />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)' }}>
                Vorarlberg · Ostschweiz · Bodensee
              </span>
            </div>
          </div>

          {/* Nav + Legal */}
          <div className="flex flex-col sm:flex-row gap-12">
            <div>
              <p
                className="text-xs font-semibold tracking-[0.14em] uppercase mb-4"
                style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)' }}
              >
                Navigation
              </p>
              <ul className="space-y-2.5">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm link-white-muted"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p
                className="text-xs font-semibold tracking-[0.14em] uppercase mb-4"
                style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)' }}
              >
                Rechtliches
              </p>
              <ul className="space-y-2.5">
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-sm link-white-muted">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.25)' }}>Kontakt</p>
                <a
                  href="mailto:office@gxc-systems.com" // REVIEW
                  className="text-xs link-white-muted"
                >
                  office@gxc-systems.com {/* REVIEW */}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p
            className="text-xs"
            style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)' }}
          >
            © {year} GXC Systems. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.12)' }}>
            Systematisiert. Automatisiert. Skaliert.
          </p>
        </div>
      </Container>
    </footer>
  )
}
