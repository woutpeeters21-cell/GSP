# Bouwplan – AutoVerkoop (portfoliowebsite)

> **Voor de AI-bouwer:** lees dit hele document voor je begint. Bouw de site in de volgorde van de fases (sectie 12). Volg de regels in sectie 1 strikt: dit is een schoolproject van een leerling uit het 6de jaar, dus de code moet leesbaar, eenvoudig en goed uitgelegd zijn.

---

## 0. Samenvatting

| Onderdeel | Keuze |
|---|---|
| Concept | Website voor tweedehandsauto's in het Waasland waar je auto's kunt **kopen** en **verkopen** |
| Naam / logo | **AUTOVERKOOP** – "De beste prijzen" (oranje autologo in een afgerond vierkant) |
| Stijl | **Donker & premium**: donkere achtergronden, grote heldenfoto, veel ruimte, strakke kaarten |
| Kleuren | **Donkerblauw + oranje** (zie sectie 3) |
| Stack | **HTML5, CSS3, basis-JavaScript**. Geen frameworks, geen libraries, geen build tools |
| Navigatie | **Vaste balk bovenaan** (sticky) + **hamburgermenu** op gsm |
| Filters | **Zoveel mogelijk werkend**, gebaseerd op AutoScout24 (zie sectie 7) |
| Foto's | **Rechtstreekse links** naar Pexels (eerste keuze) en Pixabay |
| Animaties | **Subtiel**: hover-effecten en zachte fade-in bij scrollen |
| Data | Auto's in een **JS-array** (`cars.js`), nieuwe advertenties, accounts en favorieten in **localStorage** |

---

## 1. Regels voor de bouwer

1. **Alleen HTML, CSS en basis-JavaScript.** Geen React, Vue, jQuery, Bootstrap, Tailwind, Sass of npm.
2. **Basis-JS betekent:** `const`/`let`, functies, arrays, objecten, `for`/`forEach`, `filter`, `map`, `sort`, `if/else`, `addEventListener`, `querySelector`, `classList`, `innerHTML`/`createElement`, template strings, `localStorage`, `JSON.parse`/`JSON.stringify`, `URLSearchParams`, `IntersectionObserver`. Geen classes, modules (`import`/`export`), `async/await`, `fetch` of andere geavanceerde technieken.
3. **Elk JS-bestand wordt met een gewone `<script src="...">` onderaan de `<body>` geladen.** `cars.js` altijd als eerste.
4. **Commentaar in het Nederlands** boven elke functie en boven elk CSS-blok, kort en duidelijk ("// Toont alle auto's die aan de filters voldoen").
5. **Namen in het Nederlands of Engels, maar consequent.** Advies: Engelse codenamen (`renderCars`, `.card`), Nederlandse teksten op de site.
6. **Semantische HTML**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<form>`, `<label>`.
7. **Responsive**, mobile first: werkt vanaf 360px breed tot desktop (1280px+).
8. **Toegankelijk**: elke afbeelding een `alt`, elke input een `<label>`, zichtbare focusstijl, goed kleurcontrast.
9. **Geen inline CSS of inline JS** (`style="..."` of `onclick="..."`).
10. **Alle teksten in het Nederlands** (Vlaamse woorden: "gsm", "wagen", "occasie", "inschrijving").

---

## 2. Mappenstructuur

Alles komt in de map `website/`.

```
website/
├── index.html            ← Home
├── aanbod.html           ← Overzicht van alle auto's + filters
├── auto.html             ← Detailpagina van één auto (auto.html?id=12)
├── verkopen.html         ← Formulier om je auto te koop te zetten
├── over-ons.html         ← Over het bedrijf
├── contact.html          ← Contactformulier + gegevens + kaart
├── inloggen.html         ← Inloggen
├── registreren.html      ← Account aanmaken
├── favorieten.html       ← Opgeslagen auto's (alleen als ingelogd)
├── css/
│   └── style.css         ← Eén stylesheet voor de hele site
├── js/
│   ├── cars.js           ← De array met alle auto's + lijsten (merken, uitrusting...)
│   ├── main.js           ← Op elke pagina: navbar, hamburger, fade-in, login-status
│   ├── home.js           ← Snelzoeken en "nieuwste aanbod" op de home
│   ├── filters.js        ← Alle filterlogica op aanbod.html
│   ├── detail.js         ← Detailpagina invullen
│   ├── sell.js           ← Verkoopformulier + opslaan in localStorage
│   ├── auth.js           ← Registreren, inloggen, uitloggen
│   └── contact.js        ← Validatie contactformulier
└── img/
    └── logo.svg          ← Logo (enige lokale afbeelding)
```

---

## 3. Huisstijl

### 3.1 Kleuren (CSS-variabelen in `:root`)

De site is donker en premium, met het blauw en oranje uit het originele ontwerp.

```css
:root {
  /* Achtergronden (van donker naar lichter) */
  --bg:          #0B1220;  /* pagina-achtergrond, bijna zwart-blauw */
  --surface:     #131C2E;  /* kaarten, filterpaneel */
  --surface-2:   #1B2740;  /* inputs, hover op kaarten */
  --border:      #2A3A57;  /* randen en scheidingslijnen */

  /* Merkkleuren */
  --blue:        #1F3A5F;  /* hoofdkleur: navbar, footer, banners */
  --blue-light:  #3B6EA8;  /* links, actieve filters */
  --orange:      #E07B39;  /* accent: knoppen, prijzen, logo */
  --orange-hover:#F08C4A;  /* hover op oranje knoppen */

  /* Tekst */
  --text:        #F2F4F8;  /* gewone tekst */
  --text-muted:  #A7B1C2;  /* kleine info (km, jaar, brandstof) */

  /* Meldingen */
  --success:     #3BB273;
  --error:       #E5484D;
}
```

**Gebruik:**
- Oranje **alleen** voor acties en prijzen (knoppen, prijs op kaarten, actieve tab-lijn). Niet voor grote vlakken.
- Navbar: `--bg` met 85% dekking + `backdrop-filter: blur(8px)`; na scrollen een `--border`-lijn onderaan.
- Footer en "Verkoop je auto"-banner: `--blue`.

### 3.2 Lettertypes (Google Fonts)

- **Titels en logo:** `Barlow Condensed` (600, 700) – hoekig en sportief, past bij het logo.
- **Tekst:** `Inter` (400, 500, 600).

| Element | Grootte (desktop / gsm) |
|---|---|
| h1 (hero) | 56px / 34px |
| h2 (sectietitel) | 36px / 26px |
| h3 (kaarttitel) | 20px / 18px |
| Tekst | 16px |
| Kleine info | 14px |
| Prijs op kaart | 22px, `--orange`, 700 |

### 3.3 Vormen en ruimte

- Afronding: kaarten `12px`, knoppen en inputs `8px`, badges `999px`.
- Ruimte tussen secties: `96px` desktop, `64px` gsm.
- Max. breedte van de inhoud: `1200px`, gecentreerd, `16px` marge links en rechts op gsm.
- Schaduw op kaarten: `0 8px 24px rgba(0,0,0,.35)`.

### 3.4 Knoppen

| Soort | Uitzicht |
|---|---|
| Primair | Oranje achtergrond, witte tekst, 700. Bv. "Zoeken", "Bekijk", "Plaats advertentie" |
| Secundair | Transparant, `--border` rand, witte tekst. Bv. "Meer info" |
| Icoonknop | Rond, 40×40px, voor favoriet (hartje) en hamburger |

Icoontjes: inline SVG (zelf getekend of van [Lucide](https://lucide.dev), gekopieerd als SVG-code, geen library laden).

---

## 4. Navigatie

### 4.1 Navbar (op elke pagina, zelfde HTML)

```
[Logo AUTOVERKOOP]   Home  Aanbod  Verkopen  Over ons  Contact      [♡] [Inloggen]
```

- **Sticky**: `position: sticky; top: 0;` met hoge `z-index`.
- Actieve pagina krijgt een **oranje lijn** onder de link (class `active`, met de hand gezet per pagina).
- "Inloggen" is een oranje knop. Als iemand ingelogd is, toont `main.js` in de plaats: **"Hallo, Jan"** + knop **"Uitloggen"**.
- Hartje (♡) linkt naar `favorieten.html` met een klein oranje bolletje met het aantal favorieten.
- Bij scrollen voorbij 50px: class `scrolled` op de navbar (iets donkerder + lijn onderaan).

### 4.2 Hamburgermenu (onder 900px)

- De links verdwijnen, een hamburgerknop (3 streepjes) verschijnt rechts.
- Klik → menu schuift van boven open (volle breedte, links onder elkaar, grote klikvlakken van 48px hoog).
- Het icoon wordt een kruisje. Klik op een link of op Escape sluit het menu.
- `aria-expanded="true/false"` op de knop.

### 4.3 Footer (op elke pagina)

Drie kolommen (onder elkaar op gsm), achtergrond `--blue`:
1. Logo + "Jouw adres voor gekeurde tweedehandswagens in het Waasland."
2. **Menu:** Home, Aanbod, Verkopen, Over ons, Contact
3. **Contact:** Straatnaam 1, 9120 Beveren-Waas · 03 123 45 67 · info@autoverkoop.be

Onderaan: `© GTI Beveren 2026-2027 – Portfolioproject`.

---

## 5. Pagina's

### 5.1 Home – `index.html`

1. **Hero** (volle breedte, 85vh hoog, min. 560px)
   - Grote donkere autofoto als achtergrond met een donkere gradient eroverheen (links donkerder, zodat de tekst leesbaar is).
   - Titel: **"De beste auto's voor de beste prijzen"**
   - Ondertitel: "Koop of verkoop je wagen snel, veilig en zonder gedoe."
   - **Snelzoekbalk** (kaart met `--surface`): Merk ▾ · Model ▾ · Max. prijs ▾ · Bouwjaar vanaf ▾ · knop **"Zoeken"** (toont het aantal: "Toon 24 auto's").
     - Model-lijst vult zich pas als er een merk gekozen is.
     - Klik op Zoeken → `aanbod.html?merk=BMW&model=320d&prijsTot=30000&jaarVan=2019`.
   - Twee knoppen eronder: **"Bekijk aanbod"** (primair) en **"Verkoop je auto"** (secundair).
2. **Cijfers** (4 blokken naast elkaar, 2×2 op gsm): "500+ auto's verkocht", "10+ jaar ervaring", "100% gekeurd", "4.8/5 klantenscore".
3. **Ons nieuwste aanbod**: de 8 nieuwste auto's (gesorteerd op `datumOnline`) als kaarten (zie 6.1) + knop "Bekijk alle auto's".
4. **Zoek op carrosserie**: rij met tegels (Stadswagen, Berline, Break, SUV, Coupé, Cabrio, Monovolume) met een icoon; klik → `aanbod.html?carrosserie=SUV`.
5. **Merken**: tegels met de logo's of namen van Mercedes-Benz, BMW, Audi, Volkswagen, Jeep, Toyota, Peugeot, Volvo. Klik → `aanbod.html?merk=Audi`. Logo's als tekst in `Barlow Condensed` als er geen vrije logo-afbeelding is (merklogo's zijn beschermd).
6. **Waarom kiezen voor ons?** 3 kaarten met icoon: "Gekeurde wagens", "Eenvoudige financiering", "Persoonlijke service".
7. **Hoe werkt het?** 4 stappen met nummer en pijl ertussen: 1. Zoek je auto → 2. Bekijk de details → 3. Neem contact op → 4. Rij weg.
8. **Klantenreviews**: 3 kaarten met sterren, quote, naam en gemeente (Beveren, Sint-Niklaas, Temse).
9. **Banner "Wil je je auto verkopen?"** (`--blue`, autofoto rechts): "Plaats gratis je advertentie in 5 minuten." + knop **"Verkoop je auto"**.
10. Footer.

### 5.2 Aanbod – `aanbod.html` (de belangrijkste pagina)

**Opbouw desktop:** filterpaneel links (300px breed, sticky, eigen scrollbalk) – resultaten rechts.
**Opbouw gsm:** knop **"Filters (3)"** bovenaan; klik → filterpaneel schuift als volledig scherm open van links, met onderaan een vaste knop **"Toon 24 resultaten"**.

**Bovenaan de resultaten:**
- Titel: "**24** auto's gevonden"
- **Actieve filters als chips**: `BMW ✕` `Diesel ✕` `< € 30.000 ✕` + link "Alles wissen".
- **Sorteren** ▾ (zie 7.4).
- **Weergave**: rooster (standaard) of lijst (icoonknoppen).

**Resultaten:**
- Rooster van kaarten (3 kolommen desktop, 2 tablet, 1 gsm).
- **Paginering**: 12 auto's per pagina, knoppen `‹ 1 2 3 ›`.
- **Geen resultaten**: icoon + "Geen auto's gevonden met deze filters." + knop "Filters wissen".

Zie sectie 7 voor alle filters.

### 5.3 Detailpagina – `auto.html?id=12`

`detail.js` leest `id` uit de URL met `URLSearchParams`, zoekt de auto in `cars` (en in de localStorage-advertenties) en vult de pagina. Bestaat de id niet → melding "Deze auto bestaat niet (meer)" + knop naar het aanbod.

1. **Kruimelpad**: Home › Aanbod › BMW 320d
2. **Fotogalerij** (links, 60%): grote foto + rij kleine foto's eronder. Klik op een kleine foto → wordt de grote foto (actieve krijgt een oranje rand). Pijltjes links/rechts.
3. **Infoblok** (rechts, 40%, sticky):
   - Titel "BMW 320d Touring M Sport", ondertitel met versie
   - Prijs groot in oranje, met badge van de prijsbeoordeling ("Goede prijs")
   - Kerngegevens met icoontjes: inschrijving 03/2020 · 68.500 km · Diesel · Automatisch · 190 pk
   - Knoppen: **"Contacteer verkoper"** (scrolt naar het formulier), **♡ Bewaar**, **Deel** (kopieert de link naar het klembord + melding "Link gekopieerd")
   - Verkoper: naam, type (Handelaar/Particulier), gemeente, telefoon
4. **Tabs**: Overzicht · Technische gegevens · Uitrusting · Omschrijving
   - *Technische gegevens*: tabel met alle velden uit het data-object (carrosserie, deuren, zitplaatsen, kleur, interieur, aandrijving, cilinderinhoud, vermogen kW/pk, verbruik, CO₂, emissieklasse, gewicht, vorige eigenaars, ...).
   - *Uitrusting*: lijst met vinkjes, verdeeld in groepen (Comfort, Veiligheid, Multimedia, Extra).
5. **Financiering-rekenmachine** (eenvoudig): sliders voor voorschot en looptijd (12–84 maanden), vaste rente 5,9% → toont "± € 412 / maand". Formule in commentaar uitleggen.
6. **Contactformulier**: naam, e-mail, telefoon, bericht (vooraf ingevuld: "Ik heb interesse in de BMW 320d ..."). Na verzenden: groene melding, formulier leeg.
7. **Vergelijkbare auto's**: 4 kaarten van hetzelfde merk of dezelfde carrosserie (niet de auto zelf).

### 5.4 Verkopen – `verkopen.html`

1. **Hero klein**: "Verkoop je auto snel en gratis" + 3 voordelen met icoon.
2. **Formulier in 4 stappen** met voortgangsbalk bovenaan (1 Auto · 2 Details · 3 Foto's & prijs · 4 Contact). Knoppen "Vorige" / "Volgende". Volgende pas mogelijk als de verplichte velden van die stap ingevuld zijn.
   - **Stap 1 – Auto:** merk ▾, model ▾, versie, eerste inschrijving (maand + jaar), kilometerstand, brandstof, transmissie, carrosserie.
   - **Stap 2 – Details:** vermogen (pk), deuren, zitplaatsen, kleur, interieur, aandrijving, emissieklasse, vorige eigenaars, staat (onderhoudsboekje, ongevalvrij, niet-roker als checkboxes), **uitrusting** (checkboxes in groepen).
   - **Stap 3 – Foto's & prijs:** 1 tot 5 foto-URL's (Pexels/Pixabay-link plakken) met meteen een voorbeeld; vraagprijs; omschrijving (max. 1000 tekens, met teller).
   - **Stap 4 – Contact:** naam, e-mail, telefoon, gemeente + postcode, particulier/handelaar.
3. **Overzicht** voor het plaatsen: alle ingevulde gegevens + knop **"Plaats advertentie"**.
4. **Na plaatsen:** object wordt toegevoegd in localStorage (sectie 9), met nieuw `id` en `datumOnline = vandaag`. Melding "Je advertentie staat online!" + knoppen "Bekijk je advertentie" (`auto.html?id=...`) en "Naar het aanbod".
5. **Mijn advertenties** (onderaan, alleen als er al advertenties zijn): lijstje met eigen advertenties + knop **"Verwijderen"** (met `confirm()`).

Validatie: verplichte velden met rode rand en foutmelding eronder; prijs en km moeten positieve getallen zijn; jaar tussen 1950 en het huidige jaar.

### 5.5 Over ons – `over-ons.html`

- Hero met foto van een showroom: "Over AutoVerkoop".
- Ons verhaal (2 alinea's, fictief bedrijf in Beveren-Waas sinds 2014).
- Cijfers (zelfde blokken als home).
- Onze waarden: Eerlijk · Gekeurd · Persoonlijk (3 kaarten).
- Het team: 3 kaarten met foto, naam en functie (fictief).
- Banner "Kom langs in onze showroom" → knop naar Contact.

### 5.6 Contact – `contact.html`

- Twee kolommen (onder elkaar op gsm):
  - **Links**: formulier met naam, e-mail, telefoon (optioneel), onderwerp ▾ (Auto kopen / Auto verkopen / Financiering / Andere), bericht. Validatie in `contact.js`, groene melding na verzenden.
  - **Rechts**: adres, telefoon, e-mail, **openingsuren** (tabel ma–za, zondag gesloten; vandaag vet gemarkeerd via JS `new Date().getDay()`).
- Google Maps-kaart van Beveren-Waas via `<iframe>` (embed-link), met afgeronde hoeken.

### 5.7 Inloggen – `inloggen.html` en Registreren – `registreren.html`

**Alleen een demo zonder server.** Toon op beide pagina's een klein grijs zinnetje: "Demo: gegevens worden enkel in je eigen browser bewaard."

- Gecentreerde kaart op een donkere autofoto-achtergrond.
- **Registreren:** voornaam, achternaam, e-mail, wachtwoord, wachtwoord herhalen, checkbox "Ik ga akkoord met de voorwaarden".
  Controles: e-mail bevat `@` en `.`, wachtwoord min. 8 tekens met 1 cijfer, wachtwoorden zijn gelijk, e-mail bestaat nog niet. Knop "toon wachtwoord" (oogje).
- **Inloggen:** e-mail + wachtwoord. Fout → "E-mail of wachtwoord klopt niet." Juist → sessie opslaan, doorsturen naar `index.html`.
- Link tussen beide pagina's ("Nog geen account? Registreer").

### 5.8 Favorieten – `favorieten.html`

- Niet ingelogd → "Log in om je favorieten te bekijken" + knop.
- Ingelogd → kaarten van alle bewaarde auto's, met knop om te verwijderen. Leeg → "Je hebt nog geen favorieten."

---

## 6. Componenten

### 6.1 Autokaart (gebruikt op home, aanbod, detail, favorieten)

```
┌──────────────────────────┐
│ [foto 16:10]   [♡]       │  ← badge linksboven: "Nieuw" / "Goede prijs"
├──────────────────────────┤
│ BMW 320d                 │  h3
│ Touring M Sport          │  versie, muted
│ 2020 · 68.500 km · Diesel│  muted, 14px
│ Automatisch · 190 pk     │
│ € 27.400        [Bekijk] │  prijs oranje + kleine knop
└──────────────────────────┘
```

- Maak de kaart met **één functie** `createCarCard(car)` in `main.js` die een HTML-string teruggeeft. Hergebruik die overal.
- Prijs altijd netjes: `car.prijs.toLocaleString('nl-BE')` → `€ 27.400`. Kilometers idem: `68.500 km`.
- Hele kaart klikbaar (link naar `auto.html?id=...`); het hartje werkt apart (`event.preventDefault()`).
- Foto: `loading="lazy"`, `object-fit: cover`, vaste verhouding `aspect-ratio: 16 / 10`.

### 6.2 Andere herbruikbare onderdelen

- **Badge** (`.badge`, `.badge--orange`, `.badge--green`)
- **Chip** voor actieve filters (`.chip` met ✕-knop)
- **Melding / toast** (`showToast('Link gekopieerd')`): rechtsonder, verdwijnt na 3 seconden
- **Sectietitel** met kleine oranje lijn eronder (`.section-title`)
- **Formulierveld** (`.field` met label, input, foutmelding)

---

## 7. Filters (gebaseerd op AutoScout24.be)

### 7.1 Hoe de filters moeten werken

1. Alle filters staan in één `<form id="filterForm">` op `aanbod.html`.
2. Elke wijziging (`input` / `change`) roept **`applyFilters()`** op:
   1. Lees alle waarden uit het formulier in één object `filters`.
   2. `const result = allCars.filter(car => matchesFilters(car, filters));`
   3. Sorteer `result` volgens de gekozen sortering.
   4. Toon de juiste pagina (12 per pagina), het aantal resultaten en de chips.
   5. Zet de filters in de URL met `history.replaceState` (zodat je een gefilterde link kunt delen en "terug" werkt).
3. Bij het laden van de pagina: lees de URL-parameters en vul het formulier (zo werken de links van de home).
4. `matchesFilters(car, filters)` bestaat uit **één kleine controle per filter**, met commentaar. Een leeg filter laat elke auto door. Voorbeeld:
   ```js
   // Prijs: auto moet tussen min en max liggen
   if (filters.prijsVan && car.prijs < filters.prijsVan) return false;
   if (filters.prijsTot && car.prijs > filters.prijsTot) return false;
   // Brandstof: minstens één aangevinkte brandstof moet passen
   if (filters.brandstof.length > 0 && !filters.brandstof.includes(car.brandstof)) return false;
   ```
5. **Aantal per optie**: toon achter checkboxes hoeveel auto's er zijn, bv. `Diesel (14)`. Opties met 0 worden grijs.
6. Filtergroepen zijn **uitklapbaar** (`<details>`/`<summary>`); de eerste 8 groepen staan standaard open, de rest dicht onder **"Meer filters"**.
7. Knop **"Alle filters wissen"** bovenaan het paneel (`form.reset()` + `applyFilters()`).
8. Tekstvelden (zoekwoord, postcode) pas filteren na 300 ms niet typen (eenvoudige `setTimeout`/`clearTimeout`).

### 7.2 Volledige filterlijst

Kolom **"Werkt"**: ✅ = werkt echt in JS. Alle filters hieronder werken, omdat elk veld ook in het data-object van een auto staat (sectie 8).

#### Basis (altijd zichtbaar)

| # | Filter | Type | Opties / waarden | Werkt |
|---|---|---|---|---|
| 1 | **Zoeken** (vrij zoekwoord) | tekstveld | zoekt in merk, model, versie en omschrijving | ✅ |
| 2 | **Merk** | dropdown | Alle merken uit de data, alfabetisch, met aantal | ✅ |
| 3 | **Model** | dropdown | Pas actief na merkkeuze; alleen modellen van dat merk | ✅ |
| 4 | **Modelversie** | tekstveld | bv. "M Sport", "AMG Line", "S line" | ✅ |
| 5 | **Prijs** | van / tot (dropdowns) | € 1.000 · 2.500 · 5.000 · 7.500 · 10.000 · 15.000 · 20.000 · 25.000 · 30.000 · 40.000 · 50.000 · 75.000 · 100.000+ | ✅ |
| 6 | **Eerste inschrijving (bouwjaar)** | van / tot | 1990 … huidig jaar | ✅ |
| 7 | **Kilometerstand** | van / tot | 0 · 5.000 · 10.000 · 25.000 · 50.000 · 75.000 · 100.000 · 150.000 · 200.000+ km | ✅ |
| 8 | **Carrosserie** | checkboxes met icoon | Stadswagen · Berline · Break · SUV/Terreinwagen · Coupé · Cabrio · Monovolume · Bestelwagen · Andere | ✅ |
| 9 | **Brandstof** | checkboxes | Benzine · Diesel · Elektrisch · Hybride (elektrisch/benzine) · Hybride (elektrisch/diesel) · Plug-in hybride · LPG · CNG · Waterstof · Ethanol · Andere | ✅ |
| 10 | **Transmissie** | knoppen (radio) | Alle · Automatisch · Handgeschakeld · Halfautomatisch | ✅ |
| 11 | **Locatie** | postcode + straal | Postcode (tekst) + straal: 10 · 20 · 50 · 100 · 200 km · heel België | ✅ (zie 7.3) |
| 12 | **Land** | dropdown | België · Nederland · Luxemburg · Duitsland · Frankrijk | ✅ |

#### Voertuig

| # | Filter | Type | Opties / waarden | Werkt |
|---|---|---|---|---|
| 13 | **Staat / type voertuig** | checkboxes | Occasie · Nieuw · Demowagen · Dagtoelating · Oldtimer · Bedrijfswagen | ✅ |
| 14 | **Vermogen** | van / tot + schakelaar pk/kW | 50 · 75 · 100 · 150 · 200 · 250 · 300 · 400 · 500+ pk (kW = pk × 0,7355) | ✅ |
| 15 | **Aantal deuren** | knoppen | 2/3 · 4/5 · 6/7 | ✅ |
| 16 | **Aantal zitplaatsen** | van / tot | 2 · 4 · 5 · 7 · 9 | ✅ |
| 17 | **Aandrijving** | checkboxes | Voorwielaandrijving · Achterwielaandrijving · Vierwielaandrijving (4x4) | ✅ |
| 18 | **Cilinderinhoud** | van / tot | 1.000 · 1.200 · 1.400 · 1.600 · 2.000 · 2.500 · 3.000+ cm³ | ✅ |
| 19 | **Aantal cilinders** | dropdown | 3 · 4 · 5 · 6 · 8 · 10 · 12 | ✅ |
| 20 | **Leeggewicht** | van / tot | 1.000 · 1.250 · 1.500 · 1.750 · 2.000 · 2.500+ kg | ✅ |

#### Exterieur & interieur

| # | Filter | Type | Opties / waarden | Werkt |
|---|---|---|---|---|
| 21 | **Kleur exterieur** | gekleurde bolletjes (checkbox) | Beige · Blauw · Bruin · Brons · Geel · Grijs · Groen · Rood · Zwart · Zilver · Paars · Wit · Oranje · Goud | ✅ |
| 22 | **Metaalkleur** | checkbox | Enkel metaalkleur | ✅ |
| 23 | **Kleur interieur** | checkboxes | Beige · Zwart · Grijs · Bruin · Rood · Blauw · Wit · Andere | ✅ |
| 24 | **Bekleding** | checkboxes | Stof · Leder · Halfleder · Alcantara · Velours · Andere | ✅ |

#### Uitrusting (checkboxes in groepen, auto moet **alle** aangevinkte opties hebben)

| # | Groep | Opties | Werkt |
|---|---|---|---|
| 25 | **Comfort** | Airco · Automatische klimaatregeling · Cruise control · Adaptieve cruise control · Stoelverwarming · Stuurverwarming · Elektrische stoelen · Elektrische ramen · Keyless entry · Panoramadak · Schuifdak · Elektrische achterklep · Lederen stuur | ✅ |
| 26 | **Veiligheid** | ABS · ESP · Parkeersensoren voor · Parkeersensoren achter · Achteruitrijcamera · 360°-camera · Dodehoekdetectie · Rijstrookassistent · Noodremassistent · Verkeersbordherkenning · Isofix · LED-koplampen · Xenon · Mistlampen | ✅ |
| 27 | **Multimedia** | Navigatiesysteem · Bluetooth · Apple CarPlay · Android Auto · DAB-radio · USB · Head-up display · Draadloos laden · Premium audio | ✅ |
| 28 | **Extra** | Trekhaak · Lichtmetalen velgen · Sportpakket · Sportstoelen · Dakrails · Getint glas · Winterbanden · Alarm | ✅ |

#### Milieu & verbruik

| # | Filter | Type | Opties / waarden | Werkt |
|---|---|---|---|---|
| 29 | **Emissieklasse** | dropdown (minimaal) | Euro 1 · Euro 2 · Euro 3 · Euro 4 · Euro 5 · Euro 6 · Euro 6d-TEMP · Euro 6d | ✅ |
| 30 | **CO₂-uitstoot** | tot | 0 · 50 · 100 · 120 · 140 · 160 · 200+ g/km | ✅ |
| 31 | **Verbruik (gecombineerd)** | tot | 3 · 4 · 5 · 6 · 7 · 8 · 10+ l/100 km | ✅ |
| 32 | **LEZ-vriendelijk** (Antwerpen/Gent/Brussel) | checkbox | Alleen wagens toegelaten in de lage-emissiezone (berekend uit brandstof + emissieklasse, regel in commentaar) | ✅ |

#### Elektrisch (alleen tonen als "Elektrisch" of "Plug-in hybride" aangevinkt is)

| # | Filter | Type | Opties / waarden | Werkt |
|---|---|---|---|---|
| 33 | **Actieradius (WLTP)** | vanaf | 100 · 200 · 300 · 400 · 500+ km | ✅ |
| 34 | **Batterijcapaciteit** | vanaf | 20 · 40 · 60 · 80 · 100 kWh | ✅ |
| 35 | **Snelladen** | checkbox | Ondersteunt DC-snelladen | ✅ |

#### Historiek & staat

| # | Filter | Type | Opties / waarden | Werkt |
|---|---|---|---|---|
| 36 | **Vorige eigenaars** | dropdown (maximaal) | 1 · 2 · 3 · 4+ | ✅ |
| 37 | **Volledige onderhoudshistoriek** | checkbox | Onderhoudsboekje aanwezig | ✅ |
| 38 | **Niet-rokerswagen** | checkbox | | ✅ |
| 39 | **Ongevalvrij** | checkbox | Toon geen schadewagens | ✅ |
| 40 | **Car-Pass aanwezig** | checkbox | (Belgisch km-attest) | ✅ |
| 41 | **Technische keuring** | checkbox | Gekeurd voor verkoop | ✅ |
| 42 | **Garantie** | checkbox | Met garantie (aantal maanden staat op de detailpagina) | ✅ |

#### Aanbieder & advertentie

| # | Filter | Type | Opties / waarden | Werkt |
|---|---|---|---|---|
| 43 | **Aanbieder** | knoppen | Alle · Handelaar · Particulier | ✅ |
| 44 | **Online sinds** | dropdown | Altijd · 1 dag · 3 dagen · 7 dagen · 14 dagen · 30 dagen | ✅ |
| 45 | **Prijsbeoordeling** | checkboxes | Topprijs · Goede prijs · Eerlijke prijs · Boven marktprijs | ✅ |
| 46 | **Btw aftrekbaar** | checkbox | | ✅ |
| 47 | **Leasing / financiering mogelijk** | checkbox | | ✅ |
| 48 | **Met foto's** | checkbox | Alleen advertenties met minstens 1 foto | ✅ |
| 49 | **Met video** | checkbox | | ✅ |

### 7.3 Speciale filters uitgelegd

- **Locatie (postcode + straal):** zonder server kun je geen echte afstand berekenen. Oplossing met basis-JS: maak in `cars.js` een klein object `postcodes` met de coördinaten (lat/lng) van ±20 gemeenten (Beveren, Sint-Niklaas, Temse, Antwerpen, Gent, Lokeren, Dendermonde, Mechelen, Brussel, Leuven, Brugge, Hasselt, ...). Elke auto heeft een `postcode`. Bereken de afstand met een eenvoudige functie `distanceKm(lat1, lng1, lat2, lng2)` (Pythagoras met 1° breedte ≈ 111 km en 1° lengte ≈ 73 km in België – leg dit uit in commentaar). Onbekende postcode → melding "Postcode niet gevonden" en geen afstandsfilter.
- **Model:** als het merk verandert, wordt de modellijst opnieuw opgebouwd en het gekozen model gewist.
- **pk/kW-schakelaar:** de data bewaart altijd `pk`; bij kW wordt de ingevoerde waarde omgerekend voor het vergelijken.
- **Uitrusting:** `filters.uitrusting.every(optie => car.uitrusting.includes(optie))`.

### 7.4 Sorteren

Dropdown met:
- Standaard (nieuwste advertenties eerst)
- Prijs: laag → hoog
- Prijs: hoog → laag
- Kilometerstand: laag → hoog
- Bouwjaar: nieuw → oud
- Bouwjaar: oud → nieuw
- Vermogen: hoog → laag
- Verbruik: laag → hoog

Gebruik `result.sort((a, b) => a.prijs - b.prijs)` enzovoort, in één `switch`.

---

## 8. Data – `js/cars.js`

### 8.1 Eén auto-object (alle velden zijn nodig voor de filters)

```js
const cars = [
  {
    id: 1,
    merk: "BMW",
    model: "320d",
    versie: "Touring M Sport",
    prijs: 27400,
    inschrijvingMaand: 3,
    inschrijvingJaar: 2020,
    km: 68500,
    carrosserie: "Break",
    brandstof: "Diesel",
    transmissie: "Automatisch",
    staat: "Occasie",
    pk: 190,
    deuren: 5,
    zitplaatsen: 5,
    aandrijving: "Achterwielaandrijving",
    cilinderinhoud: 1995,
    cilinders: 4,
    gewicht: 1615,
    kleur: "Zwart",
    metaalkleur: true,
    interieurKleur: "Zwart",
    bekleding: "Halfleder",
    uitrusting: ["Navigatiesysteem", "Achteruitrijcamera", "Apple CarPlay", "Stoelverwarming", "LED-koplampen", "Trekhaak"],
    emissieklasse: "Euro 6d-TEMP",
    co2: 122,
    verbruik: 4.7,
    actieradius: null,        // alleen bij elektrisch / plug-in
    batterij: null,           // kWh
    snelladen: false,
    vorigeEigenaars: 1,
    onderhoudsboekje: true,
    nietRoker: true,
    ongevalvrij: true,
    carPass: true,
    gekeurd: true,
    garantieMaanden: 12,
    aanbieder: "Handelaar",   // of "Particulier"
    verkoperNaam: "AutoVerkoop Beveren",
    telefoon: "03 123 45 67",
    postcode: "9120",
    gemeente: "Beveren-Waas",
    land: "België",
    datumOnline: "2026-10-01",  // JJJJ-MM-DD
    prijsBeoordeling: "Goede prijs",
    btwAftrekbaar: false,
    financiering: true,
    video: false,
    fotos: [
      "https://images.pexels.com/photos/XXXXXXX/pexels-photo-XXXXXXX.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    omschrijving: "Zeer goed onderhouden BMW 320d Touring ..."
  }
];
```

### 8.2 Hoeveel auto's

- Minstens **30 auto's**, zodat elke filter iets toont en de paginering zichtbaar is.
- Verdeling: ± 12 merken (Mercedes-Benz, BMW, Audi, Volkswagen, Jeep, Toyota, Peugeot, Renault, Volvo, Tesla, Kia, Ford), alle carrosserietypes, alle brandstoffen behalve waterstof/ethanol minstens 1 keer, prijzen van € 4.500 tot € 95.000, bouwjaren 2008–2026, mix handelaar/particulier, gemeenten over heel Vlaanderen.
- De 4 auto's uit het originele ontwerp moeten erin zitten:
  - Mercedes-Benz A180 – 2020 – 54.200 km – Benzine – € 24.750
  - BMW 320d – 2020 – 68.500 km – Diesel – € 27.400
  - Audi A3 Sportback – 2022 – 25.300 km – Hybride – € 29.900
  - Jeep Renegade – 2019 – 81.000 km – Benzine – € 17.500
- Realistische gegevens (een Fiat 500 heeft geen 400 pk).

### 8.3 Vaste lijsten in `cars.js`

Zet alle opties uit sectie 7.2 als arrays bovenaan `cars.js` (`const brandstoffen = [...]`, `const kleuren = [...]`, `const uitrustingGroepen = { Comfort: [...], ... }`). `filters.js` bouwt de checkboxes **automatisch** op uit die arrays (geen honderden regels HTML met de hand). Het verkoopformulier gebruikt dezelfde lijsten.

---

## 9. localStorage

Alle sleutels beginnen met `av_`. Lees altijd met een veilige functie:

```js
// Leest een lijst uit localStorage; geeft een lege lijst als er niets is of als het mislukt
function loadList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    return [];
  }
}
```

| Sleutel | Inhoud |
|---|---|
| `av_userCars` | Array met auto-objecten van het verkoopformulier (zelfde velden als 8.1, `id` vanaf 1000, extra veld `eigenaarEmail`) |
| `av_users` | Array van `{ voornaam, achternaam, email, wachtwoord }` (demo – in het echt nooit wachtwoorden zo bewaren; zet dit in commentaar) |
| `av_session` | E-mail van de ingelogde gebruiker, of niets |
| `av_favorites` | Object `{ "jan@mail.be": [1, 5, 1003] }` – favorieten per gebruiker |
| `av_view` | `"grid"` of `"list"` – gekozen weergave op het aanbod |

Op `aanbod.html`, `auto.html` en de home: `const allCars = cars.concat(loadList('av_userCars'));`

**Favoriet-hartje zonder login** → toast "Log in om favorieten te bewaren" + link naar inloggen.

---

## 10. Foto's

### 10.1 Bronnen

- **Pexels** – https://www.pexels.com/ (eerste keuze: rechtstreekse links mogen en werken stabiel)
- **Pixabay** – https://pixabay.com/ (tweede keuze)

Beide zijn gratis te gebruiken zonder naamsvermelding, maar zet in de footer toch: "Foto's: Pexels & Pixabay".

### 10.2 Hoe linken

- **Pexels**: open een foto → rechtsklik op de grote foto → "Afbeeldingsadres kopiëren". Het adres ziet er zo uit:
  `https://images.pexels.com/photos/<ID>/pexels-photo-<ID>.jpeg?auto=compress&cs=tinysrgb&w=1200`
  Pas `w=` aan: **`w=1920`** voor de hero, **`w=1200`** voor de detailgalerij, **`w=600`** voor kaarten.
- **Pixabay**: open een foto → rechtsklik → "Afbeeldingsadres kopiëren" (`https://cdn.pixabay.com/photo/...jpg`). Pixabay raadt hotlinken af en links kunnen veranderen; gebruik het dus alleen als Pexels niets geschikts heeft.
- **Verzin nooit een foto-ID.** Gebruik alleen links die je echt geopend hebt en die werken.
- **Elke auto krijgt een foto van hetzelfde merk en model** (of minstens dezelfde soort wagen en kleur). Klopt de kleur niet, pas dan `kleur` in de data aan.
- **Reservefoto** als een link stuk is: `onerror` via JS (niet inline) op elke `<img>` van een auto → vervangen door een grijs vak met de tekst "Foto auto" (zoals in het originele ontwerp), in CSS gemaakt.

### 10.3 Zoektermen

| Plaats | Zoekterm (Pexels / Pixabay) | Sfeer |
|---|---|---|
| Hero home | `black car night city`, `sports car dark` | Donker, avond, lichten, auto van opzij of schuin vooraan |
| Hero verkopen | `car keys hand`, `car dealership` | Warm, vertrouwen |
| Hero over ons | `car showroom`, `car dealership interior` | Licht in een donkere ruimte |
| Inloggen/registreren | `car headlights dark` | Heel donker, weinig details (tekst moet leesbaar blijven) |
| Banner verkopen | `white car side view isolated` | Auto op neutrale achtergrond |
| Team | `portrait businessman`, `portrait woman smiling` | Natuurlijke portretten |
| Reviews | `portrait person smiling` | Kleine ronde foto's |
| Auto's | `<merk> <model>`, bv. `bmw 3 series`, `mercedes a class`, `audi a3`, `jeep renegade`, `tesla model 3`, `volkswagen golf` | 3 tot 5 foto's per auto voor de galerij |

---

## 11. Animaties (subtiel)

Alles met CSS `transition` (0.2–0.3 s, `ease`) en één `IntersectionObserver`. Geen animatielibraries.

| Waar | Effect |
|---|---|
| Knoppen | Hover: kleur iets lichter (`--orange-hover`) + `translateY(-1px)`. Klik: `scale(.98)` |
| Links in navbar | Oranje lijn groeit van links naar rechts onder de link (`::after` met `transform: scaleX`) |
| Autokaarten | Hover: kaart gaat 4px omhoog, schaduw wordt groter, foto zoomt licht in (`scale(1.05)` binnen `overflow: hidden`) |
| Merk- en carrosserietegels | Hover: rand wordt oranje |
| Secties | **Fade-in bij scrollen**: elementen met class `.reveal` starten met `opacity: 0; transform: translateY(20px)` en krijgen class `.visible` als ze in beeld komen (IntersectionObserver in `main.js`, elk element maar één keer) |
| Navbar | Achtergrond wordt zacht donkerder bij scrollen |
| Hamburgermenu | Schuift open met `max-height`- of `transform`-transitie; streepjes draaien naar een kruis |
| Filterpaneel gsm | Schuift in van links (`transform: translateX(-100%)` → `0`) |
| Galerij detail | Grote foto wisselt met een korte fade (`opacity`) |
| Hartje favoriet | Kort "popje" (`scale(1.2)` → `1`) bij aanklikken |
| Toast | Schuift in van onder en verdwijnt na 3 s |

**Verplicht:**

```css
/* Minder beweging voor wie dat instelt op zijn toestel */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition: none !important; animation: none !important; }
  .reveal { opacity: 1; transform: none; }
}
```

---

## 12. Bouwvolgorde (fases)

Werk fase per fase en test na elke fase in de browser (desktop **en** gsm-weergave via DevTools).

1. **Basis** – mappenstructuur, `style.css` met variabelen, reset, lettertypes, knoppen, `.container`. Navbar + hamburger + footer in `index.html`, dan dezelfde HTML kopiëren naar alle pagina's.
2. **Data** – `cars.js` met minstens 30 auto's, echte fotolinks en alle vaste lijsten.
3. **Kaart** – `createCarCard(car)` in `main.js` + CSS van de kaart.
4. **Home** – alle secties van 5.1, snelzoeken werkend met URL-parameters.
5. **Aanbod** – layout, filters automatisch opbouwen, `applyFilters()`, sorteren, chips, paginering, URL-synchronisatie, filterpaneel op gsm.
6. **Detail** – galerij, tabs, technische tabel, uitrusting, rekenmachine, vergelijkbare auto's.
7. **Accounts** – registreren, inloggen, uitloggen, navbar-status, favorieten.
8. **Verkopen** – formulier in 4 stappen, validatie, opslaan, mijn advertenties.
9. **Over ons + Contact** – inhoud, formulier, openingsuren, kaart.
10. **Afwerking** – animaties, reservefoto's, toegankelijkheid, alles testen met de checklist hieronder.

---

## 13. Testchecklist (opleveren als alles ✔ is)

**Algemeen**
- [ ] Alle 9 pagina's openen zonder fouten in de console (F12).
- [ ] Navbar en footer zijn op elke pagina gelijk; actieve pagina is gemarkeerd.
- [ ] Hamburgermenu werkt onder 900px en sluit met Escape.
- [ ] Geen horizontale scrollbalk op 360px breed.
- [ ] Alle afbeeldingen laden; een kapotte link toont het grijze "Foto auto"-vak.
- [ ] Toetsenbord: alles bereikbaar met Tab, focus is zichtbaar.

**Filters**
- [ ] Elke filter uit 7.2 verandert het resultaat (test er minstens 1 per groep).
- [ ] Combinaties werken (bv. BMW + Diesel + < € 30.000 + Automatisch).
- [ ] Model-dropdown toont alleen modellen van het gekozen merk.
- [ ] Aantal resultaten en chips kloppen; ✕ op een chip verwijdert die filter.
- [ ] Gefilterde URL kopiëren en in nieuw tabblad openen geeft hetzelfde resultaat.
- [ ] Snelzoeken op de home komt op het aanbod met de juiste filters ingevuld.
- [ ] Sorteren werkt voor alle 8 opties; paginering werkt.
- [ ] "Geen resultaten" verschijnt bij een onmogelijke combinatie.

**Kopen & verkopen**
- [ ] Detailpagina werkt voor elke id; foute id geeft een nette melding.
- [ ] Nieuwe advertentie verschijnt meteen in het aanbod én blijft na herladen.
- [ ] Eigen advertentie verwijderen werkt.
- [ ] Registreren → inloggen → favoriet bewaren → uitloggen → opnieuw inloggen: favoriet is er nog.
- [ ] Alle formulieren tonen duidelijke foutmeldingen en een succesmelding.

---

## 14. Bronnen

- Ontwerp: eigen Figma-ontwerp "AutoVerkoop – De beste prijzen" (GTI Beveren) + inspiratie van donkere autowebsites (grote heldenfoto, kaarten met prijs in accentkleur, reviews, app-/verkoopbanner).
- Filters: [AutoScout24.be](https://www.autoscout24.be/nl/) – filterpaneel van de zoekresultaten, vertaald naar dit project.
- Foto's: [Pexels](https://www.pexels.com/) en [Pixabay](https://pixabay.com/).
- Lettertypes: [Google Fonts](https://fonts.google.com/) – Barlow Condensed en Inter.
