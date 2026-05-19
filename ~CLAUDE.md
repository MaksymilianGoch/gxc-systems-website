# CLAUDE.md

## Project: GXC Systems

B2B-Agentur im Dreiländereck (Vorarlberg/AT, Eastern Switzerland/CH, Liechtenstein, Bodensee/DE). Kern-Offering: Anfragen-zu-Auftrag-System für Service-SMEs — AI-Chat, Termin-Automation, Website/SEO, Google Business Optimization.

---

## Mission

Aufbau eines profitablen, skalierbaren Geschäfts durch:

1. **Authority etablieren** — Premium-Positionierung statt austauschbares SaaS-Gefühl
2. **Leads konvertieren** — Klare Pfade zum Abschluss in jedem Touchpoint
3. **Operative Exzellenz** — Jede Lieferung sofort einsatzfähig, keine Halbarbeit

Wenn eine Entscheidung zwischen Optionen steht: **beide Anforderungen müssen erfüllt sein**. Nicht eines auf Kosten des anderen.

---

## Global Rules

### Inhalt & Sprache
1. **Sprache: Deutsch.** Sie + förmlich, aber nicht steif. Zielgruppe: Handwerker, Dienstleister-SMEs, regionale Unternehmer. Kein Denglisch, kein Consulting-Jargon.
2. **Outcome Language.** Niemals Tools oder Features in den Vordergrund. Immer: Was hat der Kunde davon? In Zahlen, wenn möglich.
3. **Keine Platzhalter.** Kein "Lorem Ipsum", kein "TBD", kein "Beispieltext hier". Wenn ein Default nötig ist: produktiv nutzbar formulieren und mit `// REVIEW` markieren.
4. **Honest, specific, direct.** Keine Fluff-Formulierungen. Keine vagen Versprechen. Konkret oder weglassen.

### Design & Anmutung
5. **Premium über Template-Look.** McKinsey-editorial: Serif-Headlines, ruhige Typografie, viel Whitespace, gezielte Datenvisualisierung. Keine Gradient-Blobs, keine animierten Hero-Sections, keine Stock-Photos mit lachenden Laptop-Menschen.
6. **Brand-Palette:** Navy `#0A1F44`, Teal `#1B6E7A`, Amber `#D4A155` (sparsam), Off-White Background `#FAFAF7`.
7. **Typografie:** Serif für Headlines (z. B. Fraunces, Source Serif), Sans für Body (Inter). Gewicht 500–600 für Headlines, nicht 700+.

### Arbeitsweise
8. **Operativ entscheiden, dokumentieren, weitermachen.** Bei Unklarheit: triff die operative Entscheidung, dokumentiere sie in `DECISIONS.md`, frage nicht für Kleinigkeiten.
9. **Bestehende Inhalte werden nie umformuliert** ohne explizite Anweisung. Nur Frontmatter/Struktur darf ergänzt werden — markiert mit `// AUTO-ADDED — REVIEW`.
10. **Quality Gate vor jedem Push.** Build läuft, Lint clean, keine `any` in TypeScript, keine Tippfehler im deutschen Content.

### Commits
11. **Format:** `type(scope): message`
12. **Types:** `feat`, `fix`, `docs`, `refactor`, `style`, `content`, `perf`, `seo`, `chore`
13. **Commit-Sprache:** Englisch. Inhalt-Sprache: Deutsch.

### Was NICHT
14. Keine generischen AI-Phrasen ("Let's dive into...", "It's worth noting that...")
15. Keine Theorie ohne Execution-Pfad
16. Keine Rückfragen für offensichtliche Entscheidungen
17. Kein "soll ich..." — entweder tun oder kurz Entscheidung melden

---

## Repository Structure

Alle spezifischen Regeln, Konventionen und Details stehen in untergeordneten Dateien: