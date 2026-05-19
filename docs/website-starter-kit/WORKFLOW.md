# WORKFLOW.md

Wie du mit Claude Code an einem Website-Projekt arbeitest.
Solo-Workflow, optimiert für Geschwindigkeit + Sauberkeit.

---

## Session-Start (jedes Mal)

1. Öffne das Projekt in Claude Code / Antigravity.
2. Erster Prompt der Session:
   "Lies CLAUDE.md und docs/. Bestätige kurz das Setup, dann warten auf Anweisung."
3. Claude bestätigt Setup in 3-4 Zeilen (keine Roman-Antwort).
4. Du gibst Tagesziel in 1-2 Sätzen.

Beispiel-Tagesziel:
"Heute: Hero-Section + Problem-Section auf der Homepage.
Fertig = beide Sections deployed auf Vercel Preview."

---

## Build-Modus: Sections

Marketing-Sites werden in Sections gebaut, nicht in "Pages".
Eine Section = abgeschlossene Einheit (Hero, Pricing, CTA, etc.).

### Workflow pro Section

1. Section definieren:
   - Was ist das Outcome für den Besucher?
   - Welcher CTA / nächster Schritt?
   - Welcher Inhalt? (Stichpunkte reichen — Claude formuliert aus)

2. Claude baut Section in einer Iteration komplett:
   - Component erstellen
   - In Page einbinden
   - Lokal testen

3. Du prüfst:
   - Sieht es premium aus? (nicht generisch)
   - Konvertiert es? (klarer nächster Schritt)
   - Mobile sauber? (375px)

4. Iteration oder Commit:
   - Bei Issues: konkrete Korrektur ("Headline zu lang, max 8 Wörter")
   - Bei OK: feat(home): add hero section

5. Push wenn Quality Gate erfüllt (siehe STACK.md).

---

## Commit-Cadence

Committe nach jeder logisch abgeschlossenen Einheit, nicht erst am Ende.

Faustregel: Wenn du jetzt sagst "das funktioniert" -> committen.

Beispiele guter Cadence:

  feat(home): add hero section with primary CTA
  content(home): refine hero headline and subhead
  feat(home): add problem section with 3 pain points
  style(home): adjust spacing between hero and problem
  seo: add OG tags for homepage

Anti-Pattern: Ein Mega-Commit "feat: build website".

---

## Decision-Handling

Wann eine Entscheidung in DECISIONS.md gehört:

- Abweichung von STACK.md (z. B. zusätzliche Dependency)
- Abweichung von DESIGN.md (z. B. neue Farbe)
- Strukturelle Wahl ohne klaren Default
- Trade-off zwischen Authority und Conversion

Format pro Eintrag:

  ## YYYY-MM-DD — [Kurztitel]
  Context: Was war die Situation?
  Decision: Was wurde entschieden?
  Reason: Warum diese Option?
  Alternatives: Was wurde verworfen?

---

## Anti-Patterns (was du nicht tun sollst)

1. Mehrere Sections parallel angehen.
   Eine Section fertig -> committen -> nächste.
2. "Mach mal was Schönes" ohne Briefing.
   Claude braucht Outcome + Constraints, nicht Freiraum.
3. Polish vor Substanz.
   Erst Content + Struktur, dann Animations + Micro-Interactions.
4. Niemand testet Mobile.
   Bei jeder Section: 375px-Check, nicht erst am Ende.
5. Endlos-Iteration.
   Wenn nach 3 Runden nicht stimmt: Decision in DECISIONS.md,
   anders aufsetzen, neu bauen.

---

## Daily Wrap-Up (Ende jeder Session)

Bevor du Claude schließt:

1. Letzter Commit + Push.
2. DECISIONS.md aktualisiert? (falls Entscheidungen anstanden)
3. Offene Punkte als Issue / Notiz: Was war nicht fertig?
4. Vercel Preview gecheckt: Letzter Stand wirklich deployed?

---

## Notfall-Patterns

"Claude versteht mich nicht"
  -> Zurück zur Outcome-Frage: "Was soll der Besucher
     nach dieser Section tun?"

"Code wird zu komplex"
  -> Stoppen. Frage: "Welcher Teil ist überflüssig?" Reduzieren.

"Es sieht generisch aus"
  -> Referenz-Sites zeigen (Stripe.com, Linear.app).
     Nicht beschreiben — zeigen.

"Performance bricht ein"
  -> Lighthouse lokal. Bottleneck identifizieren.
     Bilder zuerst (next/image korrekt nutzen).
