import Link from 'next/link'

const links = {
  system: [
    { label: 'AI Agent Systems', href: '/#leistungen' },
    { label: 'Workflow Automation', href: '/#leistungen' },
    { label: 'CRM & Lead Management', href: '/#leistungen' },
    { label: 'Websites & Digital Presence', href: '/#leistungen' },
    { label: 'Integrations', href: '/#leistungen' },
  ],
  company: [
    { label: 'Architecture', href: '/#ablauf' },
    { label: 'Results', href: '/#ergebnisse' },
    { label: 'About', href: '/#ueber-uns' },
    { label: 'Pricing', href: '/#preise' },
    { label: 'Book a Demo', href: '/#kontakt' },
  ],
  legal: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
  ],
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer
      style={{
        background: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Top */}
        <div
          className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div
                style={{
                  width: 28, height: 28,
                  border: '1px solid rgba(59,130,246,0.35)',
                  background: 'rgba(59,130,246,0.07)',
                  borderRadius: '3px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="5" height="5" fill="#3B82F6" opacity="0.8" />
                  <rect x="9" y="2" width="5" height="5" fill="#06B6D4" opacity="0.5" />
                  <rect x="2" y="9" width="5" height="5" fill="#06B6D4" opacity="0.5" />
                  <rect x="9" y="9" width="5" height="5" fill="#3B82F6" opacity="0.8" />
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
                GXC Systems
              </span>
            </Link>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-3)', lineHeight: 1.65, marginBottom: '1.25rem', maxWidth: '18rem' }}>
              AI-powered operational infrastructure for businesses where inefficiency is no longer affordable.
            </p>
            <div className="flex items-center gap-2">
              <span className="live-dot" style={{ width: 5, height: 5 }} aria-hidden="true" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--color-text-3)', letterSpacing: '0.1em' }}>
                SYSTEMS ONLINE
              </span>
            </div>
          </div>

          {/* System links */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-text-3)', marginBottom: '1.25rem' }}>System</p>
            <ul className="space-y-2.5">
              {links.system.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="link-dim" style={{ fontSize: '0.82rem' }}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-text-3)', marginBottom: '1.25rem' }}>Company</p>
            <ul className="space-y-2.5">
              {links.company.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="link-dim" style={{ fontSize: '0.82rem' }}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-text-3)', marginBottom: '1.25rem' }}>Contact</p>
            <a
              href="mailto:office@gxc-systems.com"
              style={{ fontSize: '0.82rem', color: 'var(--color-text-2)', display: 'block', marginBottom: '0.75rem' }}
            >
              office@gxc-systems.com
            </a>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-3)', lineHeight: 1.6 }}>
              Vorarlberg · Ostschweiz<br />Liechtenstein · Bodenseeraum
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--color-text-3)', letterSpacing: '0.06em' }}>
            © {year} GXC Systems. All rights reserved.
          </p>
          <div className="flex gap-5">
            {links.legal.map((l) => (
              <a key={l.href} href={l.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--color-text-3)', letterSpacing: '0.06em' }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
