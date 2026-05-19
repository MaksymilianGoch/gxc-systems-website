# CLAUDE.md

## Project Type: Next.js Marketing Website

Premium B2B-Website. Solo-Build mit Claude Code. Deployment Vercel.

---

## Mission

Liefere eine Website, die zwei Dinge gleichzeitig erreicht:

1. **Authority etablieren** — Premium-Anmutung, editorial Layout, keine Template-Optik
2. **Leads konvertieren** — Klarer Pfad zum Termin/Kontakt in jedem Touchpoint

Wenn Authority und Conversion im Konflikt stehen: **beide Anforderungen müssen erfüllt sein**.

---

## Global Rules

### Inhalt
1. **Sprache: Deutsch.** Sie + förmlich, nicht steif. Kein Denglisch, kein Consulting-Jargon.
2. **Outcome Language.** Niemals Tools/Features im Vordergrund. Immer: Was hat der Kunde davon? In Zahlen wenn möglich.
3. **Keine Platzhalter.** Kein Lorem Ipsum, kein "TBD". Wenn Default nötig: produktiv formulieren, mit // REVIEW markieren.
4. **Honest, specific, direct.** Konkret oder weglassen.

### Design
5. **Premium über Template-Look.** McKinsey-editorial: Serif-Headlines, Whitespace, gezielte Datenvisualisierung. Keine Gradient-Blobs, keine animierten Hero-Sections, keine Stock-Photos mit lachenden Menschen.
6. **Design-System ist Pflicht.** Farben, Typo, Spacings stehen in docs/DESIGN.md. Niemals davon abweichen ohne Eintrag in DECISIONS.md.

### Code
7. **TypeScript strict.** Keine any, keine @ts-ignore.
8. **Server Components default.** "use client" nur wenn nötig (Forms, Embeds, State).
9. **Performance ist nicht verhandelbar.** Lighthouse Performance >= 95, LCP < 1.5s, kein Layout Shift.

### Arbeitsweise
10. **Operativ entscheiden, dokumentieren, weitermachen.** Bei Unklarheit: Entscheidung treffen, in DECISIONS.md eintragen, nicht blockieren.
11. **Bestehende Inhalte nie umformulieren** ohne explizite Anweisung.
12. **Keine Rückfragen für offensichtliche Entscheidungen.** "Soll ich..." -> entweder tun oder kurz Entscheidung melden.

### Commits
13. **Format:** type(scope): message — Englisch.
14. **Types:** feat, fix, docs, refactor, style, content, perf, seo, chore.
15. **Commit-Cadence:** Nach jeder logisch abgeschlossenen Einheit, nicht erst am Ende.

---

## What This Site Is NOT

- Kein Blog mit SEO-Spam-Artikeln
- Kein Pricing-Calculator-Spielzeug
- Keine "Trusted by"-Logo-Wand ohne echte Kunden
- Kein Cookie-Banner-Trigger (Plausible statt GA)

---

## Repository Structure

Spezifische Regeln in untergeordneten Files:

```
.
├── CLAUDE.md              # Diese Datei — globale Mission + Regeln
├── DECISIONS.md           # Operative Entscheidungen mit Datum
├── docs/
│   ├── STACK.md           # Tech-Stack, Versionen, Architektur
│   ├── DESIGN.md          # Design-System (Farben, Typo, Layout)
│   ├── CONTENT.md         # Tone of Voice, Sprachregeln
│   ├── SEO.md             # SEO-Standards, Metadata
│   ├── COMPONENTS.md      # Component-Convention
│   └── WORKFLOW.md        # Session-Workflow mit Claude Code
└── .claude/
    └── commands/          # Reusable Slash-Commands
```

---

## Workflow

Bei jeder Session:

1. **Lies CLAUDE.md komplett** — globale Regeln immer aktiv.
2. **Lies relevante docs/*.md** — abhängig von der Aufgabe.
3. **Bei Konflikt zwischen docs/ und CLAUDE.md:** CLAUDE.md gewinnt.
4. **Bei Konflikt zwischen User-Prompt und CLAUDE.md:** User gewinnt, aber Konflikt kurz benennen.

Detaillierter Workflow in docs/WORKFLOW.md.

---

## Operator Context

Owner: Sales/Strategy-Background, kein Programming-Studium. Technische Outputs müssen entweder selbsterklärend funktionieren oder auf Business-Ebene erklärbar sein. Keine Erklärungen "wie der Code intern funktioniert" — nur "was er liefert und wie ich ihn nutze".

**Bei Unsicherheit:** Lieber operative Entscheidung treffen und dokumentieren, als blockieren.
