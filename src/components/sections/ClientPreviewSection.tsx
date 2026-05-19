'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimateIn } from '@/components/ui/AnimateIn'

type TabKey = 'anfragen' | 'termine' | 'umsatz'

const tabs: { key: TabKey; label: string; count: number }[] = [
  { key: 'anfragen', label: 'Anfragen', count: 11 },
  { key: 'termine', label: 'Termine', count: 6 },
  { key: 'umsatz', label: 'Abschlüsse', count: 4 },
]

const leads = [
  { name: 'Thomas K.', company: 'Sanitärtechnik Kronberger', status: 'Neu', statusColor: 'bg-teal/15 text-teal', time: 'vor 8 Min.', source: 'Webformular', initials: 'TK' },
  { name: 'Sandra M.', company: 'Kanzlei Mayer GmbH', status: 'Termin', statusColor: 'bg-blue-100 text-blue-500', time: 'vor 1 Std.', source: 'Google', initials: 'SM' },
  { name: 'Peter B.', company: 'Bau & Renovierung Böhm', status: 'Angebot', statusColor: 'bg-amber/15 text-amber', time: 'vor 3 Std.', source: 'Empfehlung', initials: 'PB' },
  { name: 'Anna W.', company: 'Physiotherapie Weiß', status: 'Gewonnen', statusColor: 'bg-green-100 text-green-700', time: 'gestern', source: 'Webformular', initials: 'AW' },
]

const appointments = [
  { time: 'Mo 09:00', name: 'Thomas K.', type: 'Erstgespräch', color: 'border-l-teal' },
  { time: 'Mo 14:00', name: 'Sandra M.', type: 'Projekt-Kick-off', color: 'border-l-blue-500' },
  { time: 'Di 10:30', name: 'Neue Buchung', type: 'Erstgespräch', color: 'border-l-teal' },
  { time: 'Mi 11:00', name: 'Peter B.', type: 'Angebotsbesprechung', color: 'border-l-amber' },
]

const revenue = [
  { label: 'Bauer Haustechnik', amount: '3.200 €', status: 'Bezahlt', bar: 80 },
  { label: 'Kanzlei Köhler', amount: '2.100 €', status: 'Bezahlt', bar: 52 },
  { label: 'MW Elektrotechnik', amount: '1.800 €', status: 'Ausstehend', bar: 45 },
  { label: 'Physiotherapie Weiß', amount: '2.990 €', status: 'In Arbeit', bar: 74 },
]

const descriptions: Record<TabKey, { headline: string; body: string }> = {
  anfragen: {
    headline: 'Jede Anfrage. Sofort erfasst.',
    body: 'Egal ob Webformular, E-Mail oder Anruf — jeder potenzielle Kunde landet automatisch in Ihrer Lead-Übersicht. Mit Status, Quelle und Zeitstempel. Kein manuelles Eintippen, kein Vergessen.',
  },
  termine: {
    headline: 'Ihr Kalender. Vollautomatisch befüllt.',
    body: 'Kunden buchen sich selbst einen Termin — Sie sehen nur den fertigen Kalendereintrag. Erinnerungen werden 24h und 1h vorher automatisch versendet. No-Show-Rate sinkt um bis zu 40%.',
  },
  umsatz: {
    headline: 'Angebote nachverfolgt. Aufträge gesichert.',
    body: 'Nach jedem Gespräch sendet das System automatisch das Angebot und fässt nach 3 und 7 Tagen nach. Kein Umsatz geht mehr verloren, weil jemand vergessen hat, nachzuhaken.',
  },
}

export function ClientPreviewSection() {
  const [activeTab, setActiveTab] = useState<TabKey>('anfragen')

  return (
    <section
      className="section-y overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FAFAF7 0%, var(--color-blue-50) 40%, #FAFAF7 100%)' }}
      aria-labelledby="preview-heading"
    >
      <Container>
        <AnimateIn>
          <div className="text-center mb-14">
            <SectionLabel>Ihr System nach dem Go-Live</SectionLabel>
            <h2 id="preview-heading" className="mt-4 mb-4 max-w-2xl mx-auto">
              So sieht Ihr Betrieb aus — von innen.
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Kein Chaos, keine überfüllten Postfächer. Nur ein übersichtliches System,
              das Ihnen täglich zeigt, was wichtig ist.
            </p>
          </div>
        </AnimateIn>

        {/* Dashboard Mockup */}
        <AnimateIn delay={150} direction="scale">
          <div className="rounded-2xl overflow-hidden border border-border shadow-2xl shadow-navy/12 max-w-5xl mx-auto">

            {/* Browser chrome */}
            <div className="bg-gray-100 border-b border-border px-4 py-2.5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-green-400" aria-hidden="true" />
              </div>
              <div className="flex-1 bg-white rounded-md mx-4 px-3 py-1 text-xs text-text-muted text-center">
                app.gxc-systems.com/{'{'}ihr-betrieb{'}'}
              </div>
            </div>

            <div className="flex min-h-[480px]">
              {/* Sidebar */}
              <div
                className="w-52 shrink-0 p-5 flex flex-col gap-1"
                style={{ background: 'linear-gradient(180deg, var(--color-navy-deep) 0%, var(--color-navy) 100%)' }}
              >
                <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4 px-2">
                  Ihr Betrieb
                </p>

                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 text-left ${
                      activeTab === tab.key
                        ? 'bg-white/15 text-white font-medium'
                        : 'text-white/55 hover:text-white/80 hover:bg-white/8'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                        activeTab === tab.key ? 'bg-teal/40 text-white' : 'bg-white/10 text-white/40'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}

                <div className="mt-auto pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 px-2">
                    <span className="live-dot" aria-hidden="true" />
                    <span className="text-xs text-white/50">System aktiv</span>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 bg-white p-6 overflow-hidden">
                {/* Top stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Offene Anfragen', value: '11', color: 'text-navy' },
                    { label: 'Termine diese Woche', value: '6', color: 'text-blue-500' },
                    { label: 'Abschlüsse', value: '4', color: 'text-teal' },
                  ].map((s) => (
                    <div key={s.label} className="bg-offwhite rounded-xl p-3">
                      <p className={`text-2xl font-heading font-semibold ${s.color}`}>{s.value}</p>
                      <p className="text-xs text-text-muted mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Tab content */}
                <div className="space-y-2">
                  {activeTab === 'anfragen' &&
                    leads.map((lead) => (
                      <div
                        key={lead.name}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50/60 transition-colors cursor-pointer border border-transparent hover:border-blue-100"
                      >
                        <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                          <span className="text-xs font-semibold text-navy">{lead.initials}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-navy truncate">{lead.name}</p>
                          <p className="text-xs text-text-muted truncate">{lead.company}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${lead.statusColor}`}>
                            {lead.status}
                          </span>
                          <span className="text-xs text-text-muted hidden sm:block">{lead.time}</span>
                        </div>
                      </div>
                    ))}

                  {activeTab === 'termine' &&
                    appointments.map((apt) => (
                      <div
                        key={apt.time + apt.name}
                        className={`flex items-center gap-4 p-3 rounded-lg border-l-2 bg-offwhite hover:bg-blue-50/60 transition-colors ${apt.color}`}
                      >
                        <div className="text-center shrink-0 w-14">
                          <p className="text-xs font-bold text-navy">{apt.time}</p>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-navy">{apt.name}</p>
                          <p className="text-xs text-text-muted">{apt.type}</p>
                        </div>
                        <span className="text-xs text-teal bg-teal/10 px-2 py-0.5 rounded-full">
                          Bestätigt
                        </span>
                      </div>
                    ))}

                  {activeTab === 'umsatz' &&
                    revenue.map((r) => (
                      <div key={r.label} className="p-3 rounded-lg bg-offwhite hover:bg-blue-50/60 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-navy">{r.label}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-navy">{r.amount}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              r.status === 'Bezahlt' ? 'bg-green-100 text-green-700' :
                              r.status === 'Ausstehend' ? 'bg-amber/15 text-amber' :
                              'bg-blue-100 text-blue-500'
                            }`}>
                              {r.status}
                            </span>
                          </div>
                        </div>
                        <div className="h-1.5 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${r.bar}%`,
                              background: 'linear-gradient(90deg, var(--color-teal) 0%, var(--color-blue-500) 100%)',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* Description below mockup */}
        <AnimateIn delay={200}>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto text-center md:text-left">
            <div>
              <h3 className="text-lg font-heading font-medium text-navy mb-2">
                {descriptions[activeTab].headline}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {descriptions[activeTab].body}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                '✓ Täglich 5 Minuten — mehr brauchen Sie nicht',
                '✓ Einrichtung fertig in 5–14 Werktagen',
                '✓ Kein technisches Wissen nötig',
              ].map((item) => (
                <p key={item} className="text-sm text-text-secondary">{item}</p>
              ))}
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}
