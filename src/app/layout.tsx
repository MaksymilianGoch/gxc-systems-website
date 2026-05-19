import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { ChatWidget } from '@/components/ChatWidget'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
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
    default: 'GXC Systems — Operative Infrastruktur für KMU im Dreiländereck',
    template: '%s | GXC Systems',
  },
  description:
    'Wir bauen für Handwerker und Dienstleister in Vorarlberg, der Ostschweiz, Liechtenstein und am Bodensee die digitalen Systeme, die jede Anfrage in einen Termin verwandeln. Lead-Erfassung, CRM, KI-Agenten und Prozessautomatisierung — als ein verbundenes System.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gxc-systems.com'),
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    siteName: 'GXC Systems',
    title: 'GXC Systems — Operative Infrastruktur für KMU im Dreiländereck',
    description: 'Jede Anfrage erfasst. Jeder Termin automatisiert. Auch wenn niemand ans Telefon geht.',
  },
  robots: { index: true, follow: true },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'GXC Systems',
  description: 'AI-powered operational infrastructure — workflow automation, CRM systems, AI agents.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gxc-systems.com',
  areaServed: ['Vorarlberg', 'Ostschweiz', 'Liechtenstein', 'Bodenseeraum'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      lang="de"
    >
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
