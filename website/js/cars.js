// =====================================================================
// cars.js – alle gegevens van de site
// Dit bestand wordt op ELKE pagina als eerste geladen.
// =====================================================================

// Geeft de datum van 'aantal' dagen geleden terug als tekst (JJJJ-MM-DD).
// Zo blijven de advertenties altijd 'recent' en werkt de filter 'Online sinds'.
function dagenGeleden(aantal) {
  const datum = new Date();
  datum.setDate(datum.getDate() - aantal);
  return datum.toISOString().slice(0, 10);
}

// ---------------------------------------------------------------------
// FOTO'S VAN DE SITE
// Plak hier links van Pexels (https://www.pexels.com/) of Pixabay.
// Rechtsklik op een foto > 'Afbeeldingsadres kopiëren'.
// Een lege tekst "" toont een donkere achtergrond of een grijs vak.
// ---------------------------------------------------------------------
const siteFotos = {
  heroHome: "",      // home: donkere auto 's avonds in de stad
  heroVerkopen: "",  // verkopen: autosleutels in een hand
  heroOverOns: "",   // over ons: showroom
  auth: "",          // inloggen/registreren: koplampen in het donker
  banner: "",        // banner 'Verkoop je auto': witte auto van opzij
  team1: "",         // teamlid 1 (portret)
  team2: "",         // teamlid 2 (portret)
  team3: "",         // teamlid 3 (portret)
};

// ---------------------------------------------------------------------
// VASTE LIJSTEN – gebruikt door de filters en het verkoopformulier
// ---------------------------------------------------------------------
const carrosserieTypes = [
  "Stadswagen", "Berline", "Break", "SUV/Terreinwagen", "Coupé", "Cabrio", "Monovolume",
  "Bestelwagen", "Andere"
];

const brandstoffen = [
  "Benzine", "Diesel", "Elektrisch", "Hybride (elektrisch/benzine)", "Hybride (elektrisch/diesel)",
  "Plug-in hybride", "LPG", "CNG", "Waterstof", "Ethanol", "Andere"
];

const transmissies = [
  "Automatisch", "Handgeschakeld", "Halfautomatisch"
];

const landen = [
  "België", "Nederland", "Luxemburg", "Duitsland", "Frankrijk"
];

const staten = [
  "Occasie", "Nieuw", "Demowagen", "Dagtoelating", "Oldtimer", "Bedrijfswagen"
];

const aandrijvingen = [
  "Voorwielaandrijving", "Achterwielaandrijving", "Vierwielaandrijving"
];

// Kleuren met de kleurcode voor de bolletjes in de filter
const kleuren = [
  { naam: "Beige", code: "#d9c7a3" },
  { naam: "Blauw", code: "#2f5fa8" },
  { naam: "Bruin", code: "#6b4423" },
  { naam: "Brons", code: "#a86b32" },
  { naam: "Geel", code: "#f2c230" },
  { naam: "Grijs", code: "#7a8191" },
  { naam: "Groen", code: "#2f7d4f" },
  { naam: "Rood", code: "#c62f2f" },
  { naam: "Zwart", code: "#111111" },
  { naam: "Zilver", code: "#c0c5cc" },
  { naam: "Paars", code: "#6a3fa0" },
  { naam: "Wit", code: "#f5f5f5" },
  { naam: "Oranje", code: "#e07b39" },
  { naam: "Goud", code: "#c9a227" }
];

const interieurKleuren = [
  "Beige", "Zwart", "Grijs", "Bruin", "Rood", "Blauw", "Wit", "Andere"
];

const bekledingen = [
  "Stof", "Leder", "Halfleder", "Alcantara", "Velours", "Andere"
];

// Uitrusting per groep
const uitrustingGroepen = {
  Comfort: [
    "Airco", "Automatische klimaatregeling", "Cruise control", "Adaptieve cruise control",
    "Stoelverwarming", "Stuurverwarming", "Elektrische stoelen", "Elektrische ramen",
    "Keyless entry", "Panoramadak", "Schuifdak", "Elektrische achterklep", "Lederen stuur"
  ],
  Veiligheid: [
    "ABS", "ESP", "Parkeersensoren voor", "Parkeersensoren achter", "Achteruitrijcamera",
    "360°-camera", "Dodehoekdetectie", "Rijstrookassistent", "Noodremassistent",
    "Verkeersbordherkenning", "Isofix", "LED-koplampen", "Xenon", "Mistlampen"
  ],
  Multimedia: [
    "Navigatiesysteem", "Bluetooth", "Apple CarPlay", "Android Auto", "DAB-radio", "USB",
    "Head-up display", "Draadloos laden", "Premium audio"
  ],
  Extra: [
    "Trekhaak", "Lichtmetalen velgen", "Sportpakket", "Sportstoelen", "Dakrails", "Getint glas",
    "Winterbanden", "Alarm"
  ]
};

// Emissieklassen van oud (vuil) naar nieuw (proper). De volgorde is belangrijk voor de filter!
const emissieklassen = [
  "Euro 1", "Euro 2", "Euro 3", "Euro 4", "Euro 5", "Euro 6", "Euro 6d-TEMP", "Euro 6d"
];

const prijsBeoordelingen = [
  "Topprijs", "Goede prijs", "Eerlijke prijs", "Boven marktprijs"
];

// Merken die je kunt kiezen in het verkoopformulier
const verkoopMerken = [
  "Alfa Romeo", "Audi", "BMW", "Citroën", "Dacia", "Fiat", "Ford", "Honda", "Hyundai", "Jeep",
  "Kia", "Land Rover", "Mazda", "Mercedes-Benz", "Mini", "Nissan", "Opel", "Peugeot", "Porsche",
  "Renault", "Seat", "Skoda", "Smart", "Tesla", "Toyota", "Volkswagen", "Volvo", "Andere"
];

// ---------------------------------------------------------------------
// POSTCODES – nodig voor de filter 'Locatie + straal'
// lat = breedtegraad, lng = lengtegraad (coördinaten van het centrum)
// ---------------------------------------------------------------------
const postcodes = {
  "9120": { gemeente: "Beveren-Waas", lat: 51.211, lng: 4.256 },
  "9100": { gemeente: "Sint-Niklaas", lat: 51.165, lng: 4.143 },
  "9140": { gemeente: "Temse", lat: 51.125, lng: 4.212 },
  "2000": { gemeente: "Antwerpen", lat: 51.219, lng: 4.402 },
  "9000": { gemeente: "Gent", lat: 51.054, lng: 3.717 },
  "9160": { gemeente: "Lokeren", lat: 51.104, lng: 3.991 },
  "9200": { gemeente: "Dendermonde", lat: 51.028, lng: 4.101 },
  "2800": { gemeente: "Mechelen", lat: 51.026, lng: 4.477 },
  "1000": { gemeente: "Brussel", lat: 50.846, lng: 4.352 },
  "3000": { gemeente: "Leuven", lat: 50.879, lng: 4.7 },
  "8000": { gemeente: "Brugge", lat: 51.209, lng: 3.225 },
  "3500": { gemeente: "Hasselt", lat: 50.931, lng: 5.338 },
  "8500": { gemeente: "Kortrijk", lat: 50.828, lng: 3.265 },
  "2300": { gemeente: "Turnhout", lat: 51.322, lng: 4.944 },
  "9300": { gemeente: "Aalst", lat: 50.938, lng: 4.04 },
  "2500": { gemeente: "Lier", lat: 51.131, lng: 4.57 },
  "8400": { gemeente: "Oostende", lat: 51.215, lng: 2.928 },
  "3600": { gemeente: "Genk", lat: 50.965, lng: 5.5 },
  "9700": { gemeente: "Oudenaarde", lat: 50.845, lng: 3.605 },
  "2900": { gemeente: "Schoten", lat: 51.252, lng: 4.501 },
  "4811": { gemeente: "Breda (NL)", lat: 51.589, lng: 4.776 },
  "52062": { gemeente: "Aken (DE)", lat: 50.776, lng: 6.084 }
};

// ---------------------------------------------------------------------
// ALLE AUTO'S
// fotos: plak hier 1 tot 5 links per auto, bv.
// fotos: ["https://images.pexels.com/photos/ID/pexels-photo-ID.jpeg?auto=compress&cs=tinysrgb&w=1200"]
// ---------------------------------------------------------------------
const cars = [
  {
    id: 1, merk: "Mercedes-Benz", model: "A180", versie: "Business Solution",
    prijs: 24750, inschrijvingMaand: 4, inschrijvingJaar: 2020, km: 54200, staat: "Occasie",
    carrosserie: "Stadswagen", brandstof: "Benzine", transmissie: "Automatisch",
    pk: 136, deuren: 5, zitplaatsen: 5, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 1332, cilinders: 4, gewicht: 1375,
    kleur: "Zilver", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Achteruitrijcamera",
      "Stoelverwarming"
    ],
    emissieklasse: "Euro 6d-TEMP", co2: 128, verbruik: 5.6,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "9120", gemeente: "Beveren-Waas", land: "België",
    datumOnline: dagenGeleden(1), prijsBeoordeling: "Goede prijs",
    btwAftrekbaar: false, financiering: true, video: false,
    fotos: [],
    omschrijving: "Compacte en zuinige A-Klasse met het grote MBUX-scherm. Altijd onderhouden bij de officiële dealer."
  },
  {
    id: 2, merk: "BMW", model: "320d", versie: "Touring M Sport",
    prijs: 27400, inschrijvingMaand: 3, inschrijvingJaar: 2020, km: 68500, staat: "Occasie",
    carrosserie: "Break", brandstof: "Diesel", transmissie: "Automatisch",
    pk: 190, deuren: 5, zitplaatsen: 5, aandrijving: "Achterwielaandrijving",
    cilinderinhoud: 1995, cilinders: 4, gewicht: 1615,
    kleur: "Zwart", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Halfleder",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Adaptieve cruise control",
      "Stoelverwarming", "Keyless entry", "Achteruitrijcamera", "Dodehoekdetectie",
      "Elektrische achterklep", "Elektrische stoelen", "Head-up display", "Draadloos laden",
      "Premium audio", "Getint glas", "Alarm", "Trekhaak", "Sportpakket", "Sportstoelen"
    ],
    emissieklasse: "Euro 6d-TEMP", co2: 122, verbruik: 4.7,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "9120", gemeente: "Beveren-Waas", land: "België",
    datumOnline: dagenGeleden(2), prijsBeoordeling: "Goede prijs",
    btwAftrekbaar: false, financiering: true, video: true,
    fotos: [],
    omschrijving: "Sportieve en ruime break met M Sport-pakket. Ideaal voor gezin en lange ritten."
  },
  {
    id: 3, merk: "Audi", model: "A3 Sportback", versie: "40 TFSI e S line",
    prijs: 29900, inschrijvingMaand: 9, inschrijvingJaar: 2022, km: 25300, staat: "Occasie",
    carrosserie: "Stadswagen", brandstof: "Plug-in hybride", transmissie: "Automatisch",
    pk: 204, deuren: 5, zitplaatsen: 5, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 1395, cilinders: 4, gewicht: 1575,
    kleur: "Grijs", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Halfleder",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Adaptieve cruise control",
      "Stoelverwarming", "Keyless entry", "Achteruitrijcamera", "Dodehoekdetectie",
      "Elektrische achterklep", "Elektrische stoelen", "Head-up display", "Draadloos laden",
      "Premium audio", "Getint glas", "Alarm", "Sportpakket", "Sportstoelen"
    ],
    emissieklasse: "Euro 6d", co2: 30, verbruik: 1.3,
    actieradius: 66, batterij: 13, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 24,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "9100", gemeente: "Sint-Niklaas", land: "België",
    datumOnline: dagenGeleden(3), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: false, financiering: true, video: false,
    fotos: [],
    omschrijving: "Stekkerhybride: elke dag elektrisch naar het werk, en toch zorgeloos op vakantie."
  },
  {
    id: 4, merk: "Jeep", model: "Renegade", versie: "1.0 T3 Longitude",
    prijs: 17500, inschrijvingMaand: 5, inschrijvingJaar: 2019, km: 81000, staat: "Occasie",
    carrosserie: "SUV/Terreinwagen", brandstof: "Benzine", transmissie: "Handgeschakeld",
    pk: 120, deuren: 5, zitplaatsen: 5, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 999, cilinders: 3, gewicht: 1320,
    kleur: "Rood", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Dakrails", "Trekhaak"
    ],
    emissieklasse: "Euro 6d-TEMP", co2: 140, verbruik: 6.1,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 2, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 0,
    aanbieder: "Particulier", verkoperNaam: "Tom Verstraeten", telefoon: "0470 12 34 56",
    postcode: "9140", gemeente: "Temse", land: "België",
    datumOnline: dagenGeleden(4), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: false, financiering: false, video: false,
    fotos: [],
    omschrijving: "Stoere compacte SUV met hoge zitpositie. Nieuwe banden en net een grote beurt gehad."
  },
  {
    id: 5, merk: "Volkswagen", model: "Golf", versie: "1.5 TSI Life",
    prijs: 22900, inschrijvingMaand: 6, inschrijvingJaar: 2021, km: 41000, staat: "Occasie",
    carrosserie: "Stadswagen", brandstof: "Benzine", transmissie: "Handgeschakeld",
    pk: 130, deuren: 5, zitplaatsen: 5, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 1498, cilinders: 4, gewicht: 1290,
    kleur: "Wit", metaalkleur: false, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen"
    ],
    emissieklasse: "Euro 6d", co2: 125, verbruik: 5.5,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "2000", gemeente: "Antwerpen", land: "België",
    datumOnline: dagenGeleden(5), prijsBeoordeling: "Goede prijs",
    btwAftrekbaar: false, financiering: true, video: false,
    fotos: [],
    omschrijving: "De Golf 8: digitale cockpit, veel veiligheidssystemen en een zuinige motor."
  },
  {
    id: 6, merk: "Volkswagen", model: "Polo", versie: "1.0 TSI Comfortline",
    prijs: 14950, inschrijvingMaand: 6, inschrijvingJaar: 2019, km: 62000, staat: "Occasie",
    carrosserie: "Stadswagen", brandstof: "Benzine", transmissie: "Handgeschakeld",
    pk: 95, deuren: 5, zitplaatsen: 5, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 999, cilinders: 3, gewicht: 1150,
    kleur: "Blauw", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter"
    ],
    emissieklasse: "Euro 6d-TEMP", co2: 112, verbruik: 4.9,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "9160", gemeente: "Lokeren", land: "België",
    datumOnline: dagenGeleden(12), prijsBeoordeling: "Topprijs",
    btwAftrekbaar: false, financiering: true, video: false,
    fotos: [],
    omschrijving: "Ideale eerste wagen: zuinig, betrouwbaar en goedkoop in verzekering."
  },
  {
    id: 7, merk: "Tesla", model: "Model 3", versie: "Long Range AWD",
    prijs: 34900, inschrijvingMaand: 2, inschrijvingJaar: 2021, km: 58000, staat: "Occasie",
    carrosserie: "Berline", brandstof: "Elektrisch", transmissie: "Automatisch",
    pk: 440, deuren: 4, zitplaatsen: 5, aandrijving: "Vierwielaandrijving",
    cilinderinhoud: 0, cilinders: 0, gewicht: 1844,
    kleur: "Wit", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Leder",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Adaptieve cruise control",
      "Stoelverwarming", "Keyless entry", "Achteruitrijcamera", "Dodehoekdetectie",
      "Elektrische achterklep", "Elektrische stoelen", "Head-up display", "Draadloos laden",
      "Premium audio", "Getint glas", "Alarm", "Panoramadak"
    ],
    emissieklasse: "Euro 6d", co2: 0, verbruik: 0,
    actieradius: 580, batterij: 75, snelladen: true,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "2800", gemeente: "Mechelen", land: "België",
    datumOnline: dagenGeleden(6), prijsBeoordeling: "Goede prijs",
    btwAftrekbaar: true, financiering: true, video: true,
    fotos: [],
    omschrijving: "Volledig elektrisch met een groot bereik. Autopilot en gratis updates via internet."
  },
  {
    id: 8, merk: "Toyota", model: "Yaris", versie: "1.5 Hybrid Dynamic",
    prijs: 19500, inschrijvingMaand: 6, inschrijvingJaar: 2022, km: 23000, staat: "Occasie",
    carrosserie: "Stadswagen", brandstof: "Hybride (elektrisch/benzine)", transmissie: "Automatisch",
    pk: 116, deuren: 5, zitplaatsen: 5, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 1490, cilinders: 3, gewicht: 1110,
    kleur: "Rood", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Achteruitrijcamera"
    ],
    emissieklasse: "Euro 6d", co2: 92, verbruik: 4.0,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 24,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "9000", gemeente: "Gent", land: "België",
    datumOnline: dagenGeleden(8), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: false, financiering: true, video: false,
    fotos: [],
    omschrijving: "Zeer zuinige stadswagen met zelfopladende hybride motor. Rijdt in de stad vaak elektrisch."
  },
  {
    id: 9, merk: "Toyota", model: "RAV4", versie: "2.5 Hybrid AWD-i Style",
    prijs: 38900, inschrijvingMaand: 6, inschrijvingJaar: 2021, km: 49000, staat: "Occasie",
    carrosserie: "SUV/Terreinwagen", brandstof: "Hybride (elektrisch/benzine)", transmissie: "Automatisch",
    pk: 222, deuren: 5, zitplaatsen: 5, aandrijving: "Vierwielaandrijving",
    cilinderinhoud: 2487, cilinders: 4, gewicht: 1690,
    kleur: "Grijs", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Leder",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Adaptieve cruise control",
      "Stoelverwarming", "Keyless entry", "Achteruitrijcamera", "Dodehoekdetectie",
      "Elektrische achterklep", "Elektrische stoelen", "Head-up display", "Draadloos laden",
      "Premium audio", "Getint glas", "Alarm", "Trekhaak", "Dakrails"
    ],
    emissieklasse: "Euro 6d", co2: 126, verbruik: 5.6,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "3000", gemeente: "Leuven", land: "België",
    datumOnline: dagenGeleden(15), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: false, financiering: true, video: false,
    fotos: [],
    omschrijving: "Ruime gezins-SUV met vierwielaandrijving en hybride zuinigheid."
  },
  {
    id: 10, merk: "Peugeot", model: "208", versie: "1.2 PureTech Allure",
    prijs: 16900, inschrijvingMaand: 6, inschrijvingJaar: 2021, km: 33000, staat: "Occasie",
    carrosserie: "Stadswagen", brandstof: "Benzine", transmissie: "Handgeschakeld",
    pk: 100, deuren: 5, zitplaatsen: 5, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 1199, cilinders: 3, gewicht: 1090,
    kleur: "Geel", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen"
    ],
    emissieklasse: "Euro 6d", co2: 118, verbruik: 5.2,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "9300", gemeente: "Aalst", land: "België",
    datumOnline: dagenGeleden(9), prijsBeoordeling: "Goede prijs",
    btwAftrekbaar: false, financiering: true, video: false,
    fotos: [],
    omschrijving: "Opvallende 208 met 3D-cockpit. Jong, weinig kilometers en volledige historiek."
  },
  {
    id: 11, merk: "Peugeot", model: "3008", versie: "1.5 BlueHDi GT Line",
    prijs: 23500, inschrijvingMaand: 6, inschrijvingJaar: 2020, km: 87000, staat: "Occasie",
    carrosserie: "SUV/Terreinwagen", brandstof: "Diesel", transmissie: "Automatisch",
    pk: 130, deuren: 5, zitplaatsen: 5, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 1499, cilinders: 4, gewicht: 1430,
    kleur: "Blauw", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Achteruitrijcamera",
      "Elektrische achterklep"
    ],
    emissieklasse: "Euro 6d-TEMP", co2: 120, verbruik: 4.6,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "9200", gemeente: "Dendermonde", land: "België",
    datumOnline: dagenGeleden(20), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: false, financiering: true, video: false,
    fotos: [],
    omschrijving: "Stijlvolle SUV met GT Line-uitrusting en grote koffer."
  },
  {
    id: 12, merk: "Renault", model: "Clio", versie: "1.0 TCe Zen",
    prijs: 12450, inschrijvingMaand: 6, inschrijvingJaar: 2020, km: 52000, staat: "Occasie",
    carrosserie: "Stadswagen", brandstof: "Benzine", transmissie: "Handgeschakeld",
    pk: 100, deuren: 5, zitplaatsen: 5, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 999, cilinders: 3, gewicht: 1150,
    kleur: "Oranje", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter"
    ],
    emissieklasse: "Euro 6d-TEMP", co2: 118, verbruik: 5.2,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 0,
    aanbieder: "Particulier", verkoperNaam: "Lisa Maes", telefoon: "0485 77 21 09",
    postcode: "8500", gemeente: "Kortrijk", land: "België",
    datumOnline: dagenGeleden(2), prijsBeoordeling: "Topprijs",
    btwAftrekbaar: false, financiering: false, video: false,
    fotos: [],
    omschrijving: "Wendbare Clio in Valencia-oranje. Verkocht wegens aankoop bedrijfswagen."
  },
  {
    id: 13, merk: "Renault", model: "Kangoo", versie: "1.5 dCi Grand Confort",
    prijs: 11900, inschrijvingMaand: 6, inschrijvingJaar: 2018, km: 124000, staat: "Bedrijfswagen",
    carrosserie: "Bestelwagen", brandstof: "Diesel", transmissie: "Handgeschakeld",
    pk: 95, deuren: 4, zitplaatsen: 2, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 1461, cilinders: 4, gewicht: 1360,
    kleur: "Wit", metaalkleur: false, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Trekhaak"
    ],
    emissieklasse: "Euro 6", co2: 120, verbruik: 4.6,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "9100", gemeente: "Sint-Niklaas", land: "België",
    datumOnline: dagenGeleden(25), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: true, financiering: true, video: false,
    fotos: [],
    omschrijving: "Lichte vracht met tussenschot en laadruimte van 3 m³. Btw aftrekbaar."
  },
  {
    id: 14, merk: "Volvo", model: "XC60", versie: "T8 Recharge Inscription",
    prijs: 46900, inschrijvingMaand: 6, inschrijvingJaar: 2021, km: 39000, staat: "Occasie",
    carrosserie: "SUV/Terreinwagen", brandstof: "Plug-in hybride", transmissie: "Automatisch",
    pk: 390, deuren: 5, zitplaatsen: 5, aandrijving: "Vierwielaandrijving",
    cilinderinhoud: 1969, cilinders: 4, gewicht: 2150,
    kleur: "Bruin", metaalkleur: true, interieurKleur: "Beige", bekleding: "Leder",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Adaptieve cruise control",
      "Stoelverwarming", "Keyless entry", "Achteruitrijcamera", "Dodehoekdetectie",
      "Elektrische achterklep", "Elektrische stoelen", "Head-up display", "Draadloos laden",
      "Premium audio", "Getint glas", "Alarm", "Panoramadak", "360°-camera", "Trekhaak",
      "Stuurverwarming"
    ],
    emissieklasse: "Euro 6d", co2: 48, verbruik: 2.1,
    actieradius: 50, batterij: 18.8, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "2500", gemeente: "Lier", land: "België",
    datumOnline: dagenGeleden(7), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: true, financiering: true, video: false,
    fotos: [],
    omschrijving: "Luxueuze en veilige SUV met 390 pk. Volledig uitgerust, als nieuw."
  },
  {
    id: 15, merk: "Volvo", model: "V60", versie: "B4 Momentum",
    prijs: 31500, inschrijvingMaand: 6, inschrijvingJaar: 2021, km: 54000, staat: "Occasie",
    carrosserie: "Break", brandstof: "Hybride (elektrisch/diesel)", transmissie: "Automatisch",
    pk: 197, deuren: 5, zitplaatsen: 5, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 1969, cilinders: 4, gewicht: 1780,
    kleur: "Zilver", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Adaptieve cruise control",
      "Stoelverwarming", "Keyless entry", "Achteruitrijcamera", "Dodehoekdetectie",
      "Elektrische achterklep", "Elektrische stoelen", "Head-up display", "Draadloos laden",
      "Premium audio", "Getint glas", "Alarm", "Trekhaak"
    ],
    emissieklasse: "Euro 6d", co2: 128, verbruik: 4.9,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "9000", gemeente: "Gent", land: "België",
    datumOnline: dagenGeleden(18), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: false, financiering: true, video: false,
    fotos: [],
    omschrijving: "Elegante break met mild-hybride diesel. Perfect voor veel kilometers."
  },
  {
    id: 16, merk: "Kia", model: "EV6", versie: "77 kWh GT-Line",
    prijs: 41900, inschrijvingMaand: 6, inschrijvingJaar: 2022, km: 28000, staat: "Occasie",
    carrosserie: "SUV/Terreinwagen", brandstof: "Elektrisch", transmissie: "Automatisch",
    pk: 229, deuren: 5, zitplaatsen: 5, aandrijving: "Achterwielaandrijving",
    cilinderinhoud: 0, cilinders: 0, gewicht: 2000,
    kleur: "Groen", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Adaptieve cruise control",
      "Stoelverwarming", "Keyless entry", "Achteruitrijcamera", "Dodehoekdetectie",
      "Elektrische achterklep", "Elektrische stoelen", "Head-up display", "Draadloos laden",
      "Premium audio", "Getint glas", "Alarm"
    ],
    emissieklasse: "Euro 6d", co2: 0, verbruik: 0,
    actieradius: 528, batterij: 77.4, snelladen: true,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 60,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "3500", gemeente: "Hasselt", land: "België",
    datumOnline: dagenGeleden(1), prijsBeoordeling: "Goede prijs",
    btwAftrekbaar: false, financiering: true, video: true,
    fotos: [],
    omschrijving: "Laadt van 10 naar 80% in 18 minuten. Nog 5 jaar fabrieksgarantie."
  },
  {
    id: 17, merk: "Kia", model: "Picanto", versie: "1.0 Pulse",
    prijs: 9950, inschrijvingMaand: 6, inschrijvingJaar: 2018, km: 67000, staat: "Occasie",
    carrosserie: "Stadswagen", brandstof: "Benzine", transmissie: "Handgeschakeld",
    pk: 67, deuren: 5, zitplaatsen: 4, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 998, cilinders: 3, gewicht: 935,
    kleur: "Wit", metaalkleur: false, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter"
    ],
    emissieklasse: "Euro 6", co2: 106, verbruik: 4.6,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 0,
    aanbieder: "Particulier", verkoperNaam: "Sarah De Smet", telefoon: "0496 43 18 72",
    postcode: "8400", gemeente: "Oostende", land: "België",
    datumOnline: dagenGeleden(30), prijsBeoordeling: "Topprijs",
    btwAftrekbaar: false, financiering: false, video: false,
    fotos: [],
    omschrijving: "Klein, zuinig en makkelijk te parkeren. Perfect voor in de stad."
  },
  {
    id: 18, merk: "Ford", model: "Mustang", versie: "5.0 V8 GT Fastback",
    prijs: 49900, inschrijvingMaand: 6, inschrijvingJaar: 2019, km: 34000, staat: "Occasie",
    carrosserie: "Coupé", brandstof: "Benzine", transmissie: "Automatisch",
    pk: 450, deuren: 2, zitplaatsen: 4, aandrijving: "Achterwielaandrijving",
    cilinderinhoud: 5038, cilinders: 8, gewicht: 1765,
    kleur: "Rood", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Leder",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Adaptieve cruise control",
      "Stoelverwarming", "Keyless entry", "Achteruitrijcamera", "Dodehoekdetectie",
      "Elektrische achterklep", "Elektrische stoelen", "Head-up display", "Draadloos laden",
      "Premium audio", "Getint glas", "Alarm", "Sportpakket", "Sportstoelen"
    ],
    emissieklasse: "Euro 6d-TEMP", co2: 270, verbruik: 12.1,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "4811", gemeente: "Breda (NL)", land: "Nederland",
    datumOnline: dagenGeleden(11), prijsBeoordeling: "Boven marktprijs",
    btwAftrekbaar: false, financiering: true, video: true,
    fotos: [],
    omschrijving: "Echte V8 met een geweldige sound. Altijd binnen gestald."
  },
  {
    id: 19, merk: "Ford", model: "Focus Clipper", versie: "1.0 EcoBoost Titanium",
    prijs: 15900, inschrijvingMaand: 6, inschrijvingJaar: 2019, km: 79000, staat: "Occasie",
    carrosserie: "Break", brandstof: "Benzine", transmissie: "Handgeschakeld",
    pk: 125, deuren: 5, zitplaatsen: 5, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 999, cilinders: 3, gewicht: 1300,
    kleur: "Grijs", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen"
    ],
    emissieklasse: "Euro 6d-TEMP", co2: 115, verbruik: 5.0,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 2, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "2300", gemeente: "Turnhout", land: "België",
    datumOnline: dagenGeleden(22), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: false, financiering: true, video: false,
    fotos: [],
    omschrijving: "Praktische break met veel koffieruimte en Titanium-uitrusting."
  },
  {
    id: 20, merk: "BMW", model: "X5", versie: "xDrive45e M Sport",
    prijs: 64900, inschrijvingMaand: 6, inschrijvingJaar: 2021, km: 45000, staat: "Occasie",
    carrosserie: "SUV/Terreinwagen", brandstof: "Plug-in hybride", transmissie: "Automatisch",
    pk: 394, deuren: 5, zitplaatsen: 5, aandrijving: "Vierwielaandrijving",
    cilinderinhoud: 2998, cilinders: 6, gewicht: 2510,
    kleur: "Zwart", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Leder",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Adaptieve cruise control",
      "Stoelverwarming", "Keyless entry", "Achteruitrijcamera", "Dodehoekdetectie",
      "Elektrische achterklep", "Elektrische stoelen", "Head-up display", "Draadloos laden",
      "Premium audio", "Getint glas", "Alarm", "Panoramadak", "360°-camera", "Trekhaak",
      "Sportpakket", "Stuurverwarming"
    ],
    emissieklasse: "Euro 6d", co2: 36, verbruik: 1.6,
    actieradius: 80, batterij: 24, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "2900", gemeente: "Schoten", land: "België",
    datumOnline: dagenGeleden(5), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: true, financiering: true, video: false,
    fotos: [],
    omschrijving: "Topuitvoering met M Sport-pakket. Tot 80 km elektrisch rijden."
  },
  {
    id: 21, merk: "BMW", model: "420i", versie: "Cabrio M Sport",
    prijs: 42900, inschrijvingMaand: 6, inschrijvingJaar: 2021, km: 22000, staat: "Occasie",
    carrosserie: "Cabrio", brandstof: "Benzine", transmissie: "Automatisch",
    pk: 184, deuren: 2, zitplaatsen: 4, aandrijving: "Achterwielaandrijving",
    cilinderinhoud: 1998, cilinders: 4, gewicht: 1735,
    kleur: "Blauw", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Leder",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Adaptieve cruise control",
      "Stoelverwarming", "Keyless entry", "Achteruitrijcamera", "Dodehoekdetectie",
      "Elektrische achterklep", "Elektrische stoelen", "Head-up display", "Draadloos laden",
      "Premium audio", "Getint glas", "Alarm", "Sportpakket", "Sportstoelen"
    ],
    emissieklasse: "Euro 6d", co2: 150, verbruik: 6.6,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "8000", gemeente: "Brugge", land: "België",
    datumOnline: dagenGeleden(13), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: false, financiering: true, video: false,
    fotos: [],
    omschrijving: "Open rijden in stijl. Stoffen dak opent in 18 seconden."
  },
  {
    id: 22, merk: "Mercedes-Benz", model: "C 220 d", versie: "Avantgarde",
    prijs: 29900, inschrijvingMaand: 6, inschrijvingJaar: 2019, km: 92000, staat: "Occasie",
    carrosserie: "Berline", brandstof: "Diesel", transmissie: "Automatisch",
    pk: 194, deuren: 4, zitplaatsen: 5, aandrijving: "Achterwielaandrijving",
    cilinderinhoud: 1950, cilinders: 4, gewicht: 1600,
    kleur: "Zilver", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Leder",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Adaptieve cruise control",
      "Stoelverwarming", "Keyless entry", "Achteruitrijcamera", "Dodehoekdetectie",
      "Elektrische achterklep", "Elektrische stoelen", "Head-up display", "Draadloos laden",
      "Premium audio", "Getint glas", "Alarm"
    ],
    emissieklasse: "Euro 6d-TEMP", co2: 117, verbruik: 4.5,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "1000", gemeente: "Brussel", land: "België",
    datumOnline: dagenGeleden(40), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: false, financiering: true, video: false,
    fotos: [],
    omschrijving: "Comfortabele berline met krachtige en zuinige diesel."
  },
  {
    id: 23, merk: "Mercedes-Benz", model: "V 250 d", versie: "Avantgarde Lang",
    prijs: 54900, inschrijvingMaand: 6, inschrijvingJaar: 2020, km: 71000, staat: "Occasie",
    carrosserie: "Monovolume", brandstof: "Diesel", transmissie: "Automatisch",
    pk: 190, deuren: 5, zitplaatsen: 7, aandrijving: "Achterwielaandrijving",
    cilinderinhoud: 2143, cilinders: 4, gewicht: 2200,
    kleur: "Zwart", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Leder",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Adaptieve cruise control",
      "Stoelverwarming", "Keyless entry", "Achteruitrijcamera", "Dodehoekdetectie",
      "Elektrische achterklep", "Elektrische stoelen", "Head-up display", "Draadloos laden",
      "Premium audio", "Getint glas", "Alarm", "Trekhaak"
    ],
    emissieklasse: "Euro 6d-TEMP", co2: 186, verbruik: 7.1,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "2800", gemeente: "Mechelen", land: "België",
    datumOnline: dagenGeleden(16), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: true, financiering: true, video: false,
    fotos: [],
    omschrijving: "Zeven ruime zitplaatsen en twee elektrische schuifdeuren. Ideaal als luchthavenshuttle of grote familie."
  },
  {
    id: 24, merk: "Mercedes-Benz", model: "280 SL", versie: "Pagode",
    prijs: 89500, inschrijvingMaand: 6, inschrijvingJaar: 1969, km: 128000, staat: "Oldtimer",
    carrosserie: "Cabrio", brandstof: "Benzine", transmissie: "Automatisch",
    pk: 170, deuren: 2, zitplaatsen: 2, aandrijving: "Achterwielaandrijving",
    cilinderinhoud: 2778, cilinders: 6, gewicht: 1360,
    kleur: "Wit", metaalkleur: false, interieurKleur: "Rood", bekleding: "Leder",
    uitrusting: [
      "Lederen stuur"
    ],
    emissieklasse: "Euro 1", co2: 290, verbruik: 13.5,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 3, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: false, gekeurd: true, garantieMaanden: 0,
    aanbieder: "Particulier", verkoperNaam: "Marc Claes", telefoon: "0475 90 11 23",
    postcode: "9700", gemeente: "Oudenaarde", land: "België",
    datumOnline: dagenGeleden(60), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: false, financiering: false, video: true,
    fotos: [],
    omschrijving: "Volledig gerestaureerde klassieker met hardtop. Ingeschreven als oldtimer."
  },
  {
    id: 25, merk: "Audi", model: "Q5", versie: "40 TDI quattro S line",
    prijs: 44500, inschrijvingMaand: 6, inschrijvingJaar: 2022, km: 36000, staat: "Occasie",
    carrosserie: "SUV/Terreinwagen", brandstof: "Diesel", transmissie: "Automatisch",
    pk: 204, deuren: 5, zitplaatsen: 5, aandrijving: "Vierwielaandrijving",
    cilinderinhoud: 1968, cilinders: 4, gewicht: 1880,
    kleur: "Grijs", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Leder",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Adaptieve cruise control",
      "Stoelverwarming", "Keyless entry", "Achteruitrijcamera", "Dodehoekdetectie",
      "Elektrische achterklep", "Elektrische stoelen", "Head-up display", "Draadloos laden",
      "Premium audio", "Getint glas", "Alarm", "Trekhaak", "Sportpakket"
    ],
    emissieklasse: "Euro 6d", co2: 160, verbruik: 6.1,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "3600", gemeente: "Genk", land: "België",
    datumOnline: dagenGeleden(3), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: false, financiering: true, video: false,
    fotos: [],
    omschrijving: "Sportieve SUV met quattro-vierwielaandrijving en S line-pakket."
  },
  {
    id: 26, merk: "Audi", model: "A6 Avant", versie: "40 TDI Sport",
    prijs: 39900, inschrijvingMaand: 6, inschrijvingJaar: 2021, km: 61000, staat: "Occasie",
    carrosserie: "Break", brandstof: "Hybride (elektrisch/diesel)", transmissie: "Automatisch",
    pk: 204, deuren: 5, zitplaatsen: 5, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 1968, cilinders: 4, gewicht: 1760,
    kleur: "Zwart", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Leder",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Adaptieve cruise control",
      "Stoelverwarming", "Keyless entry", "Achteruitrijcamera", "Dodehoekdetectie",
      "Elektrische achterklep", "Elektrische stoelen", "Head-up display", "Draadloos laden",
      "Premium audio", "Getint glas", "Alarm"
    ],
    emissieklasse: "Euro 6d", co2: 138, verbruik: 5.3,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "9120", gemeente: "Beveren-Waas", land: "België",
    datumOnline: dagenGeleden(27), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: true, financiering: true, video: false,
    fotos: [],
    omschrijving: "Luxueuze break met virtual cockpit en matrix-LED. Ideale bedrijfswagen."
  },
  {
    id: 27, merk: "Volkswagen", model: "ID.3", versie: "Pro 58 kWh",
    prijs: 26900, inschrijvingMaand: 6, inschrijvingJaar: 2022, km: 21000, staat: "Occasie",
    carrosserie: "Stadswagen", brandstof: "Elektrisch", transmissie: "Automatisch",
    pk: 204, deuren: 5, zitplaatsen: 5, aandrijving: "Achterwielaandrijving",
    cilinderinhoud: 0, cilinders: 0, gewicht: 1800,
    kleur: "Wit", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen"
    ],
    emissieklasse: "Euro 6d", co2: 0, verbruik: 0,
    actieradius: 425, batterij: 58, snelladen: true,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "9140", gemeente: "Temse", land: "België",
    datumOnline: dagenGeleden(4), prijsBeoordeling: "Goede prijs",
    btwAftrekbaar: false, financiering: true, video: false,
    fotos: [],
    omschrijving: "Elektrische stadswagen met de ruimte van een middenklasser."
  },
  {
    id: 28, merk: "Dacia", model: "Sandero", versie: "1.0 TCe ECO-G Expression",
    prijs: 13450, inschrijvingMaand: 8, inschrijvingJaar: 2026, km: 900, staat: "Demowagen",
    carrosserie: "Stadswagen", brandstof: "LPG", transmissie: "Handgeschakeld",
    pk: 100, deuren: 5, zitplaatsen: 5, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 999, cilinders: 3, gewicht: 1150,
    kleur: "Blauw", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter"
    ],
    emissieklasse: "Euro 6d", co2: 113, verbruik: 6.8,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 36,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "9120", gemeente: "Beveren-Waas", land: "België",
    datumOnline: dagenGeleden(1), prijsBeoordeling: "Topprijs",
    btwAftrekbaar: false, financiering: true, video: false,
    fotos: [],
    omschrijving: "Demowagen van onze showroom. Rijdt op benzine én goedkope LPG."
  },
  {
    id: 29, merk: "Fiat", model: "Panda", versie: "0.9 TwinAir Natural Power",
    prijs: 7950, inschrijvingMaand: 6, inschrijvingJaar: 2016, km: 98000, staat: "Occasie",
    carrosserie: "Stadswagen", brandstof: "CNG", transmissie: "Handgeschakeld",
    pk: 80, deuren: 5, zitplaatsen: 4, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 875, cilinders: 2, gewicht: 1050,
    kleur: "Groen", metaalkleur: false, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix"
    ],
    emissieklasse: "Euro 6", co2: 86, verbruik: 4.5,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 2, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 0,
    aanbieder: "Particulier", verkoperNaam: "Pieter Wouters", telefoon: "0478 55 62 30",
    postcode: "9160", gemeente: "Lokeren", land: "België",
    datumOnline: dagenGeleden(33), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: false, financiering: false, video: false,
    fotos: [],
    omschrijving: "Rijdt op aardgas (CNG): erg goedkoop per kilometer."
  },
  {
    id: 30, merk: "Toyota", model: "Mirai", versie: "Premium",
    prijs: 34900, inschrijvingMaand: 6, inschrijvingJaar: 2021, km: 31000, staat: "Occasie",
    carrosserie: "Berline", brandstof: "Waterstof", transmissie: "Automatisch",
    pk: 182, deuren: 4, zitplaatsen: 5, aandrijving: "Achterwielaandrijving",
    cilinderinhoud: 0, cilinders: 0, gewicht: 1900,
    kleur: "Blauw", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Leder",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Adaptieve cruise control",
      "Stoelverwarming", "Keyless entry", "Achteruitrijcamera", "Dodehoekdetectie",
      "Elektrische achterklep", "Elektrische stoelen", "Head-up display", "Draadloos laden",
      "Premium audio", "Getint glas", "Alarm"
    ],
    emissieklasse: "Euro 6d", co2: 0, verbruik: 0,
    actieradius: 650, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "2000", gemeente: "Antwerpen", land: "België",
    datumOnline: dagenGeleden(45), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: true, financiering: true, video: false,
    fotos: [],
    omschrijving: "Rijdt op waterstof en stoot alleen waterdamp uit. Tanken in 5 minuten."
  },
  {
    id: 31, merk: "Opel", model: "Corsa", versie: "1.2 Enjoy",
    prijs: 4500, inschrijvingMaand: 6, inschrijvingJaar: 2009, km: 165000, staat: "Occasie",
    carrosserie: "Stadswagen", brandstof: "Benzine", transmissie: "Handgeschakeld",
    pk: 80, deuren: 3, zitplaatsen: 5, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 1229, cilinders: 4, gewicht: 1100,
    kleur: "Zilver", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix"
    ],
    emissieklasse: "Euro 4", co2: 145, verbruik: 6.1,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 4, onderhoudsboekje: false, nietRoker: false, ongevalvrij: false,
    carPass: true, gekeurd: false, garantieMaanden: 0,
    aanbieder: "Particulier", verkoperNaam: "Kevin Janssens", telefoon: "0468 20 44 15",
    postcode: "9100", gemeente: "Sint-Niklaas", land: "België",
    datumOnline: dagenGeleden(50), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: false, financiering: false, video: false,
    fotos: [],
    omschrijving: "Kleine schade aan de achterbumper. Rijdt nog goed, ideaal als goedkope eerste wagen of voor export."
  },
  {
    id: 32, merk: "Porsche", model: "911", versie: "Carrera S",
    prijs: 95000, inschrijvingMaand: 6, inschrijvingJaar: 2019, km: 41000, staat: "Occasie",
    carrosserie: "Coupé", brandstof: "Benzine", transmissie: "Automatisch",
    pk: 450, deuren: 2, zitplaatsen: 4, aandrijving: "Achterwielaandrijving",
    cilinderinhoud: 2981, cilinders: 6, gewicht: 1515,
    kleur: "Grijs", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Leder",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Adaptieve cruise control",
      "Stoelverwarming", "Keyless entry", "Achteruitrijcamera", "Dodehoekdetectie",
      "Elektrische achterklep", "Elektrische stoelen", "Head-up display", "Draadloos laden",
      "Premium audio", "Getint glas", "Alarm", "Sportpakket", "Sportstoelen", "Schuifdak"
    ],
    emissieklasse: "Euro 6d-TEMP", co2: 206, verbruik: 9.0,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "Sportwagen Center Aken", telefoon: "+49 241 123 456",
    postcode: "52062", gemeente: "Aken (DE)", land: "Duitsland",
    datumOnline: dagenGeleden(9), prijsBeoordeling: "Goede prijs",
    btwAftrekbaar: true, financiering: true, video: true,
    fotos: [],
    omschrijving: "Porsche Approved met sportuitlaat en Sport Chrono-pakket."
  },
  {
    id: 33, merk: "Smart", model: "Fortwo", versie: "1.0 Passion",
    prijs: 8950, inschrijvingMaand: 6, inschrijvingJaar: 2017, km: 48000, staat: "Occasie",
    carrosserie: "Stadswagen", brandstof: "Benzine", transmissie: "Halfautomatisch",
    pk: 71, deuren: 3, zitplaatsen: 2, aandrijving: "Achterwielaandrijving",
    cilinderinhoud: 999, cilinders: 3, gewicht: 880,
    kleur: "Zwart", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Panoramadak"
    ],
    emissieklasse: "Euro 6", co2: 99, verbruik: 4.3,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "1000", gemeente: "Brussel", land: "België",
    datumOnline: dagenGeleden(14), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: false, financiering: true, video: false,
    fotos: [],
    omschrijving: "Parkeren wordt een plezier. Met panoramisch glazen dak."
  },
  {
    id: 34, merk: "Skoda", model: "Octavia Combi", versie: "2.0 TDI Style",
    prijs: 36900, inschrijvingMaand: 10, inschrijvingJaar: 2026, km: 10, staat: "Nieuw",
    carrosserie: "Break", brandstof: "Diesel", transmissie: "Automatisch",
    pk: 150, deuren: 5, zitplaatsen: 5, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 1968, cilinders: 4, gewicht: 1450,
    kleur: "Groen", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Adaptieve cruise control",
      "Stoelverwarming", "Keyless entry", "Achteruitrijcamera", "Dodehoekdetectie",
      "Elektrische achterklep", "Elektrische stoelen", "Head-up display", "Draadloos laden",
      "Premium audio", "Getint glas", "Alarm", "Trekhaak"
    ],
    emissieklasse: "Euro 6d", co2: 118, verbruik: 4.5,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 0, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: false, gekeurd: true, garantieMaanden: 24,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "9120", gemeente: "Beveren-Waas", land: "België",
    datumOnline: dagenGeleden(0), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: false, financiering: true, video: false,
    fotos: [],
    omschrijving: "Gloednieuw uit stock, meteen leverbaar."
  },
  {
    id: 35, merk: "Hyundai", model: "i20", versie: "1.0 T-GDi Twist",
    prijs: 19950, inschrijvingMaand: 9, inschrijvingJaar: 2026, km: 50, staat: "Dagtoelating",
    carrosserie: "Stadswagen", brandstof: "Benzine", transmissie: "Handgeschakeld",
    pk: 100, deuren: 5, zitplaatsen: 5, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 998, cilinders: 3, gewicht: 1100,
    kleur: "Rood", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen"
    ],
    emissieklasse: "Euro 6d", co2: 119, verbruik: 5.3,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 0, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 60,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "9300", gemeente: "Aalst", land: "België",
    datumOnline: dagenGeleden(6), prijsBeoordeling: "Topprijs",
    btwAftrekbaar: false, financiering: true, video: false,
    fotos: [],
    omschrijving: "Dagtoelating: nieuwe wagen met flinke korting en volledige fabrieksgarantie."
  },
  {
    id: 36, merk: "Volkswagen", model: "Touran", versie: "1.5 TSI Comfortline",
    prijs: 21900, inschrijvingMaand: 6, inschrijvingJaar: 2019, km: 72000, staat: "Occasie",
    carrosserie: "Monovolume", brandstof: "Benzine", transmissie: "Automatisch",
    pk: 150, deuren: 5, zitplaatsen: 7, aandrijving: "Voorwielaandrijving",
    cilinderinhoud: 1498, cilinders: 4, gewicht: 1500,
    kleur: "Grijs", metaalkleur: true, interieurKleur: "Zwart", bekleding: "Stof",
    uitrusting: [
      "Airco", "Elektrische ramen", "ABS", "ESP", "Isofix", "Bluetooth", "USB",
      "Parkeersensoren achter", "Automatische klimaatregeling", "Cruise control",
      "Navigatiesysteem", "Apple CarPlay", "Android Auto", "DAB-radio", "Lichtmetalen velgen",
      "LED-koplampen", "Noodremassistent", "Rijstrookassistent", "Verkeersbordherkenning",
      "Lederen stuur", "Parkeersensoren voor", "Mistlampen", "Trekhaak", "Dakrails"
    ],
    emissieklasse: "Euro 6d-TEMP", co2: 140, verbruik: 6.2,
    actieradius: null, batterij: null, snelladen: false,
    vorigeEigenaars: 1, onderhoudsboekje: true, nietRoker: true, ongevalvrij: true,
    carPass: true, gekeurd: true, garantieMaanden: 12,
    aanbieder: "Handelaar", verkoperNaam: "AutoVerkoop Beveren", telefoon: "03 123 45 67",
    postcode: "9200", gemeente: "Dendermonde", land: "België",
    datumOnline: dagenGeleden(19), prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: false, financiering: true, video: false,
    fotos: [],
    omschrijving: "Zeven zitplaatsen in een compact formaat. Achterste stoelen klappen weg in de vloer."
  }
];
