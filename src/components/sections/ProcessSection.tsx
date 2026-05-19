import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimateIn } from '@/components/ui/AnimateIn'

const processGroups = [
  {
    groupLabel: 'Aufmerksamkeit',
    color: 'from-teal/20 to-transparent',
    steps: [
      { step: '01', title: 'Website', description: 'Der Interessent findet Sie über Google oder eine Empfehlung.' },
      { step: '02', title: 'Formular', description: 'Er füllt das Kontaktformular aus. Name, E-Mail, Anliegen — 60 Sekunden.' },
    ],
  },
  {
    groupLabel: 'Verarbeitung',
    color: 'from-blue-500/20 to-transparent',
    steps: [
      { step: '03', title: 'Webhook', description: 'Die Anfrage wird sofort an das System übergeben. Keine Sekunde Verzögerung.' },
      { step: '04', title: 'CRM', description: 'Ein Lead-Datensatz wird automatisch in Airtable angelegt — sortiert, vollständig.' },
      { step: '05', title: 'Benachrichtigung', description: 'Sie erhalten in Sekunden eine strukturierte Meldung per Slack oder Telegram.' },
    ],
  },
  {
    groupLabel: 'Kommunikation',
    color: 'from-teal-light/20 to-transparent',
    steps: [
      { step: '06', title: 'E-Mail', description: 'Der Interessent bekommt sofort eine professionelle Eingangsbestätigung.' },
      { step: '07', title: 'Termin', description: 'Er bucht direkt einen Gesprächstermin. Kein Hin-und-Her.' },
      { step: '08', title: 'Update', description: 'Der CRM-Datensatz wird automatisch auf "Termin vereinbart" gesetzt.' },
    ],
  },
  {
    groupLabel: 'Abschluss',
    color: 'from-amber/20 to-transparent',
    steps: [
      { step: '09', title: 'Angebot', description: 'Angebot wird vorbereitet, versendet und automatisch nachgefasst.' },
      { step: '10', title: 'Zahlung', description: 'Auftragserteilung und Zahlungsabwicklung. Status auf "Kunde" gesetzt.' },
      { step: '11', title: 'Betreuung', description: 'Laufende Optimierung. Das System wird mit Ihrem Betrieb besser.' },
    ],
  },
]

export function ProcessSection() {
  return (
    <section
      id="ablauf"
      className="section-y relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--color-navy-deep) 0%, var(--color-navy) 100%)' }}
      aria-labelledby="process-heading"
    >
      {/* Decorative blue gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, #1B6E7A 18%, transparent) 0%, transparent 70%)' }}
        aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, #2A7FCC 12%, transparent) 0%, transparent 70%)' }}
        aria-hidden="true" />

      <Container className="relative">
        <AnimateIn>
          <div className="mb-14 text-center">
            <SectionLabel light>Ihr Ablauf</SectionLabel>
            <h2 id="process-heading" className="mt-4 mb-4 text-white max-w-2xl mx-auto">
              Von der ersten Anfrage bis zum laufenden Auftrag.
            </h2>
            <p className="text-white/60 max-w-xl mx-auto text-lg">
              11 Schritte. Vollständig automatisiert. Sie entscheiden einmal — danach läuft es.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processGroups.map((group, gi) => (
            <AnimateIn key={group.groupLabel} delay={gi * 120}>
              <div className={`rounded-xl p-5 bg-gradient-to-b ${group.color} border border-white/8`}>
                <p className="text-xs font-semibold tracking-widest uppercase text-amber/80 mb-5">
                  {group.groupLabel}
                </p>
                <ol className="space-y-5">
                  {group.steps.map((item) => (
                    <li key={item.step}>
                      <div className="flex items-start gap-3">
                        <span
                          className="text-xl font-heading font-semibold shrink-0 pt-0.5 leading-none"
                          style={{
                            background: 'linear-gradient(135deg, #D4A155, #4DBBD0)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                          aria-hidden="true"
                        >
                          {item.step}
                        </span>
                        <div>
                          <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                          <p className="text-xs text-white/50 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={200}>
          <div className="mt-14 pt-10 border-t border-white/10 text-center">
            <p className="text-white/40 text-sm max-w-lg mx-auto">
              Jeder Schritt ist konfigurierbar. Wir bauen das System nach Ihren Abläufen — nicht umgekehrt.
            </p>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
