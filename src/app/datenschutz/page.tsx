import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  robots: { index: false, follow: false },
}

export default function DatenschutzPage() {
  return (
    <section className="section-y">
      <Container className="max-w-2xl">
        <h1 className="mb-10">Datenschutzerklärung</h1>

        {/* REVIEW: DSGVO-konforme Datenschutzerklärung durch Rechtsanwalt oder datenschutz.org erstellen lassen */}
        {/* Muss erwähnen: n8n, Airtable, Plausible, Vercel, Calendly */}
        {/* Muss erwähnen: Auftragsverarbeitungsvertrag (AVV), EU-Server, Rechtsgrundlagen (Art. 6 DSGVO) */}
        {/* Muss erwähnen: Kontaktformular-Verarbeitung, Speicherdauer, Betroffenenrechte */}

        <div className="space-y-8 text-text-secondary text-sm leading-relaxed">
          <div>
            <h2 className="text-base font-heading font-medium text-navy mb-3">
              1. Verantwortlicher
            </h2>
            <p>
              Verantwortlicher im Sinne der DSGVO ist:
              <br />
              GXC Systems, [Adresse eintragen], E-Mail: office@gxc-systems.com {/* REVIEW */}
            </p>
          </div>

          <div>
            <h2 className="text-base font-heading font-medium text-navy mb-3">
              2. Erhebung und Verarbeitung personenbezogener Daten
            </h2>
            <p>
              Personenbezogene Daten werden ausschließlich erhoben, wenn Sie uns über das
              Kontaktformular kontaktieren. Die erhobenen Daten (Name, E-Mail-Adresse,
              Telefonnummer, Unternehmensname, Nachricht) werden zur Bearbeitung Ihrer
              Anfrage verwendet.
            </p>
            <p className="mt-3">
              Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO
              (Vertragsanbahnung) sowie Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
            </p>
          </div>

          <div>
            <h2 className="text-base font-heading font-medium text-navy mb-3">
              3. Eingesetzte Dienste und Auftragsverarbeiter
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong className="text-navy">Vercel</strong> — Hosting der Website (EU-Server
                verfügbar). Datenschutzinformationen: vercel.com/legal/privacy-policy
              </li>
              <li>
                <strong className="text-navy">n8n</strong> — Automatisierungsplattform für
                Webhook-Verarbeitung (EU-Cloud oder selbst gehostet).
              </li>
              <li>
                <strong className="text-navy">Airtable</strong> — CRM-System zur Lead-Speicherung
                (EU-Server). Datenschutzinformationen: airtable.com/privacy
              </li>
              <li>
                <strong className="text-navy">Plausible Analytics</strong> — DSGVO-konformes
                Webanalyse-Tool ohne Cookies, keine personenbezogenen Daten, keine
                Cross-Site-Tracking.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-heading font-medium text-navy mb-3">
              4. Cookies
            </h2>
            <p>
              Diese Website verwendet keine Marketing-Cookies und kein Cross-Site-Tracking.
              Das verwendete Analyse-Tool (Plausible) setzt keine Cookies und erhebt keine
              personenbezogenen Daten.
            </p>
          </div>

          <div>
            <h2 className="text-base font-heading font-medium text-navy mb-3">
              5. Ihre Rechte
            </h2>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung
              der Verarbeitung Ihrer Daten sowie das Recht auf Datenübertragbarkeit. Zur
              Ausübung dieser Rechte wenden Sie sich an: office@gxc-systems.com {/* REVIEW */}
            </p>
          </div>

          <div>
            <h2 className="text-base font-heading font-medium text-navy mb-3">
              6. Beschwerderecht
            </h2>
            <p>
              Sie haben das Recht, Beschwerde bei der österreichischen Datenschutzbehörde
              (dsb.gv.at) einzulegen.
            </p>
          </div>

          <p className="text-xs text-text-muted pt-4 border-t border-border">
            Stand: Mai 2026 {/* REVIEW: Datum aktuell halten */}
          </p>
        </div>
      </Container>
    </section>
  )
}
