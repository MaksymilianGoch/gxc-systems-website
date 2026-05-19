import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Impressum',
  robots: { index: false, follow: false },
}

export default function ImpressumPage() {
  return (
    <section className="section-y">
      <Container className="max-w-2xl">
        <h1 className="mb-10">Impressum</h1>

        {/* REVIEW: Pflichtangaben nach österreichischem E-Commerce-Gesetz §5 ECG eintragen */}
        {/* Benötigt: Firmenname, Rechtsform, Adresse, UID-Nummer, Geschäftsführer */}
        {/* Benötigt: Kontakt E-Mail + Telefon, Gewerbebehörde, Kammerzugehörigkeit */}

        <div className="prose prose-sm max-w-none space-y-6 text-text-secondary">
          <div>
            <h2 className="text-base font-heading font-medium text-navy mb-2">
              Angaben gemäß § 5 ECG
            </h2>
            <p>
              GXC Systems {/* REVIEW */}
              <br />
              [Rechtsform eintragen] {/* REVIEW */}
              <br />
              [Straße und Hausnummer] {/* REVIEW */}
              <br />
              [PLZ Ort], Österreich {/* REVIEW */}
            </p>
          </div>

          <div>
            <h2 className="text-base font-heading font-medium text-navy mb-2">Kontakt</h2>
            <p>
              E-Mail:{' '}
              <a
                href="mailto:office@gxc-systems.com" // REVIEW
                className="text-teal hover:underline"
              >
                office@gxc-systems.com {/* REVIEW */}
              </a>
              <br />
              Telefon: [Telefonnummer eintragen] {/* REVIEW */}
            </p>
          </div>

          <div>
            <h2 className="text-base font-heading font-medium text-navy mb-2">
              Unternehmensgegenstand
            </h2>
            <p>
              Prozessautomation, Websiteerstellung und digitale Systemarchitektur für kleine
              und mittlere Unternehmen.
            </p>
          </div>

          <div>
            <h2 className="text-base font-heading font-medium text-navy mb-2">
              Umsatzsteuer-Identifikationsnummer
            </h2>
            <p>[UID-Nummer eintragen] {/* REVIEW */}</p>
          </div>

          <div>
            <h2 className="text-base font-heading font-medium text-navy mb-2">Behörde</h2>
            <p>
              Gewerbebehörde: [Bezirkshauptmannschaft / Magistrat eintragen] {/* REVIEW */}
              <br />
              Mitglied der Wirtschaftskammer Vorarlberg {/* REVIEW */}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
