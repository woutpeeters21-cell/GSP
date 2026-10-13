# Plan portfoliosite — FitApp (GSP 6ADB)

## 1. Doel
Een website die uitlegt wat mijn fitness-tracking-app **FitApp** is en hoe je ze gebruikt.
Voor wie: sporters (beginners en gevorderden) die hun workouts en voeding willen bijhouden, en mijn leerkrachten die mijn GSP beoordelen.

## 2. Stijl
Volg `DESIGN.md`. Stijl in 3 woorden: **krachtig, strak, energiek**.

## 3. Referenties
1. **CORE MOVEMENT** (coremovementfluid.squarespace.com, html meegegeven) — wat ik overneem:
   hero over de volle breedte met foto en grote, schuine, vette titel in hoofdletters; klein label boven elke titel;
   groene marquee-band met lopende tekst; afwisselend foto links / tekst rechts; drie kaarten met foto;
   checklist met ► ; stats met grote cijfers; grote CTA-sectie onderaan; footer met `//` als scheiding.
2. **Pinterest-bord** (pin.it/4xjWfjxo7) — wat ik overneem: donkere groene sfeer, telefoon-mockups naast tekst, fitness-foto's met hoog contrast.
3. **App-wireframes** (`app.wireframes/`) — wat ik overneem: de schermen Dashboard, Actieve workout en Voedingsdagboek als telefoon-mockups op de site.

## 4. Stack
Wel: HTML, CSS, basis JavaScript (vanilla), PHP.
Niet: geen frameworks of libraries: geen React, geen Tailwind, geen Bootstrap, geen jQuery.

## 5. Wel bouwen
- Alle pagina's uit de navigatie (zie 7), in PHP met gedeelde `header.php` en `footer.php`.
- Navigatie met hamburgermenu op gsm.
- Filters + zoekveld op de pagina Functies (zie 8), in JavaScript.
- Contactformulier dat in PHP gevalideerd wordt en een bedankbericht toont.
- Alle teksten en voorbeelddata in **1 bestand**: `website/data/data.php` (PHP-arrays).
- Versie voor gsm en voor computer.

## 6. Niet bouwen
- Database, SQL, databaseverbinding.
- Login met echte accounts.
- De app zelf (die zit in `app.website/`).
- Pagina's die niet in de navigatie staan.

## 7. Pagina's en navigatie
Knoppen in volgorde (vast bovenaan): **Home – Functies – Gids – Over ons – Contact** + rode knop "Download".
Op gsm: hamburgermenu.

| Pagina | Bestand | Inhoud |
|---|---|---|
| Home | `index.php` | Hero met titel + 2 knoppen; marquee-band; "Wat is FitApp" (foto + tekst); 3 kernfuncties als kaarten; app-mockups (dashboard, workout, voeding); checklist "Alles in 1 app"; stats; testimonials (raster, geen carrousel); CTA-sectie |
| Functies | `functies.php` | Intro; filterbalk; raster met alle functies (uit must/should/could) als kaarten met categorie en prioriteit |
| Gids | `gids.php` | Stappenplan in 5 stappen (account → doel → workout loggen → voeding loggen → voortgang); bij elke stap een mockup of foto; FAQ met uitklapbare vragen (`<details>`) |
| Over ons | `over-ons.php` | Over mij (leerling 6ADB, GTI Beveren); waarom deze app; tijdlijn van het project; gebruikte technologie |
| Contact | `contact.php` | Contactformulier (naam, e-mail, onderwerp, bericht) met PHP-validatie en bedankbericht; contactgegevens |

## 8. Filters
Op de pagina **Functies**:

| Filter | Keuzes |
|---|---|
| Categorie | Alle, Training, Voeding, Voortgang, Account, Slim (AI & tools) |
| Prioriteit | Alle, Must have, Should have, Could have |
| Zoekveld | Zoeken op titel en beschrijving |

Filters werken samen (EN). Teller "x functies gevonden". Geen resultaat → melding.

## 9. Kleuren
Zeker wel: `#041F1E`, `#1E2D2F`, `#519E8A`, `#7EB09B`, `#EF233C` (enige accent), neutraal licht `#F3F6F4`, wit `#FFFFFF`.
Zeker niet: paars-roze kleurverlopen, neonkleuren, meer dan 1 accentkleur.

## 10. Foto's
Bronnen: Unsplash (sfeerfoto's), Pexels (foto's en video's), Pixabay (foto's en illustraties), Magnific (illustraties/iconen).
Stijl en formaat: echte mensen die trainen in een gym of gezond eten, donker en contrastrijk, liefst groene/neutrale tinten. Hero 16:9, kaarten 4:5, split-secties 4:5.
App-schermen: **geen** stockfoto's, maar CSS-mockups op basis van mijn wireframes.
Laadt een foto niet → donker grijsgroen vlak met de juiste afmetingen en de zoekterm erop. Ik vervang die later.
Alle foto-URL's staan in `data.php` zodat ik ze op 1 plek kan vervangen.

## 11. Motion
| Waar | Wat | Wanneer | Hoe lang |
|---|---|---|---|
| Hero | Titel verschijnt woord per woord | Bij laden | 0,5 s per woord, 0,08 s vertraging |
| Scrollen | Secties schuiven 24px omhoog en faden in | Bij in beeld komen | 0,5 s |
| Hover | Kaarten 6px omhoog, foto zoomt 1.05; knoppen wisselen kleur | Bij hover | 0,25 s |
| Marquee | Tekstband loopt horizontaal | Altijd | 40 s per lus |
| Navigatie | Menu klapt vloeiend open op gsm | Bij klik | 0,3 s |

Bij `prefers-reduced-motion` staan alle animaties uit.

## 12. Regels voor het design
Wel: veel witruimte; max. 2 lettertypes (Archivo + Figtree); echte teksten over de app; rustige animaties; SVG-iconen.
Niet: lorem ipsum; carrousels en pop-ups; emoji's als iconen; animaties die het lezen storen.

## Mappenstructuur
```
website/
  index.php  functies.php  gids.php  over-ons.php  contact.php
  includes/header.php  includes/footer.php
  data/data.php            ← alle voorbeelddata (later: database)
  assets/css/style.css
  assets/js/main.js
```
Lokaal testen: `php -S localhost:8000 -t website`
