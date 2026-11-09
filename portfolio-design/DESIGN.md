# DESIGN.md — FitApp infosite

Gebaseerd op de referentiesite **CORE MOVEMENT** (Squarespace-template), aangepast naar mijn eigen kleuren, teksten en onderwerp: een website die uitleg geeft over mijn fitness-tracking-app.

Stijl in 3 woorden: **krachtig, strak, energiek**.

---

## 1. Kleuren

| Token | Hex | Gebruik |
|---|---|---|
| `--c-ink` | `#041F1E` | Donkerste achtergrond (hero, footer, donkere secties) |
| `--c-dark` | `#1E2D2F` | Tweede donkere tint: kaarten op donker, tekst op licht |
| `--c-green` | `#519E8A` | Merkkleur: eyebrow-labels, iconen, lijnen, marquee-band |
| `--c-mint` | `#7EB09B` | Lichte merkkleur: hover op links, grafieken, tags |
| `--c-red` | `#EF233C` | **Enige accentkleur**: primaire knoppen, cijfers die opvallen |
| `--c-light` | `#F3F6F4` | Lichte achtergrond (afgeleid, neutraal grijsgroen) |
| `--c-white` | `#FFFFFF` | Tekst op donker, kaarten op licht |

Regels:
- Rood `#EF233C` alleen voor de primaire knop en max. 1 highlight per sectie.
- Afwisselen tussen donkere (`#041F1E`) en lichte (`#F3F6F4`) secties, zoals de referentie.
- Niet: paars-roze kleurverlopen, neonkleuren, andere accentkleuren.

## 2. Typografie (max. 2 lettertypes)

| Rol | Lettertype | Instellingen |
|---|---|---|
| Titels, knoppen, labels | **Archivo** (Google Fonts, `wdth 125` = expanded) | 800, *italic*, UPPERCASE, letter-spacing −0.01em, line-height 0.95 |
| Lopende tekst | **Figtree** (Google Fonts) | 400 / 600, line-height 1.6 |

Vervangt Aktiv Grotesk Extended + Sofia Pro uit de referentie.

Schaal (clamp, mobiel → desktop):
- `h1` hero: 2.8rem → 7rem
- `h2` sectietitel: 2.2rem → 4.5rem
- `h3` kaart: 1.25rem → 1.6rem
- Eyebrow-label: 0.8rem, Figtree 600, uppercase, letter-spacing 0.18em, kleur `--c-green`
- Body: 1rem → 1.125rem

Titelpatroon uit de referentie: klein eyebrow-label erboven, daaronder een titel over 2–3 regels waarvan **1 woord** in groen of omlijnd (outline-tekst).

## 3. Spacing & layout

- Container: max 1240px, zijpadding 24px (mobiel 16px).
- Sectie-padding: 120px boven/onder desktop, 72px mobiel.
- Grid: 12 kolommen desktop, 1 kolom mobiel. Breakpoints: 640px, 960px.
- Veel witruimte; tekstblokken max 60 tekens breed.

## 4. Componenten

- **Header**: vast bovenaan, transparant op de hero, wordt `--c-ink` bij scrollen. Logo links, links midden/rechts, rode CTA-knop rechts. Gsm: hamburgermenu dat vloeiend opent.
- **Knoppen**: rechthoekig (radius 0), Archivo 800 italic uppercase 0.85rem, padding 18px 32px.
  - Primair: achtergrond `--c-red`, tekst wit; hover: achtergrond wit, tekst `--c-ink`.
  - Secundair: rand 2px wit/donker, transparant; hover: gevuld.
- **Marquee-band**: groene band (`--c-green`) met herhalende tekst "TRACK · TRAIN · PROGRESS ·" in Archivo italic, loopt traag horizontaal.
- **Kaarten**: radius 0, foto bovenaan (4:5), titel + korte tekst + link "Lees meer →". Hover: kaart 6px omhoog, foto zoomt 1.05.
- **Checklist**: items met `►` in `--c-green` (zoals "Meet Dr. Laura" in de referentie).
- **Stats**: groot cijfer (Archivo 800 italic, `--c-red`), label in uppercase eronder.
- **Telefoon-mockup**: CSS-gebouwd toestel met schermen uit mijn wireframes (geen stockfoto van de app).
- **Filterchips**: rechthoekig, rand `--c-dark`; actief = gevuld `--c-green`.
- **Formulier**: velden met alleen onderlijn, label erboven in eyebrow-stijl.

## 5. Beweging

- Duur 0,2 – 0,5 s, easing `cubic-bezier(.2,.7,.2,1)`.
- Hero-titel verschijnt woord per woord bij laden.
- Secties schuiven zacht in beeld (24px omhoog + fade) bij scrollen.
- Kaarten lichten op bij hover; knoppen wisselen van kleur.
- Marquee loopt traag (40 s per lus).
- `prefers-reduced-motion`: alle animaties uit.
