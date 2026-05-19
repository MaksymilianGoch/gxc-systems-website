import type { Metadata } from 'next'
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { ChatWidget } from '@/components/ChatWidget'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'GXC Systems — Prozessautomation für KMU im Dreiländereck',
    template: '%s | GXC Systems',
  },
  description:
    'GXC Systems automatisiert Anfragenerfassung, Terminbuchung und Kundenkommunikation für Handwerker und Dienstleister in Vorarlberg, der Ostschweiz und dem Bodenseeraum.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gxc-systems.com'),
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    siteName: 'GXC Systems',
    title: 'GXC Systems — Prozessautomation für KMU im Dreiländereck',
    description:
      'Jede Anfrage erfasst. Jeder Termin automatisch gebucht. Kein administratives Chaos mehr.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'GXC Systems',
  description:
    'Prozessautomation für KMU: Lead-Erfassung, Terminbuchung, Online-Präsenz und Kommunikationsautomation für Handwerker und Dienstleister im Dreiländereck.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gxc-systems.com',
  email: 'office@gxc-systems.com', // REVIEW
  areaServed: ['Vorarlberg', 'Ostschweiz', 'Liechtenstein', 'Bodenseeraum'],
  priceRange: '€€',
  serviceType: ['Prozessautomation', 'Websiteerstellung', 'Lead-Management', 'CRM-Integration'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`} lang="de">
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
          type="application/ld+json"
        />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            async
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            defer
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
