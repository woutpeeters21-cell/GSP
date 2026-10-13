// =====================================================================
// filters.js – aanbodpagina
// 1. Filters automatisch opbouwen uit de lijsten in cars.js
// 2. Bij elke wijziging: applyFilters()
//    lezen -> filteren -> sorteren -> tonen -> chips -> URL bijwerken
// 3. Filters overnemen uit de URL (links van de home werken zo)
// =====================================================================

const allCars = getAllCars();
const filterForm = document.getElementById("filterForm");
const sortSelect = document.getElementById("sortSelect");
const carList = document.getElementById("carList");
const PER_PAGE = 12;   // aantal auto's per pagina
let currentPage = 1;
let typeTimer;         // voor het wachten tijdens het typen

// ---------- Stappen voor de van/tot-dropdowns ----------
const steps = {
  prijs: [1000, 2500, 5000, 7500, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 75000, 100000],
  jaar: [],   // wordt hieronder gevuld: van dit jaar tot 1990, plus enkele oude jaren
  km: [5000, 10000, 25000, 50000, 75000, 100000, 150000, 200000],
  vermogen: [50, 75, 100, 150, 200, 250, 300, 400, 500],
  zit: [2, 4, 5, 7, 9],
  cc: [1000, 1200, 1400, 1600, 2000, 2500, 3000],
  cilinders: [2, 3, 4, 5, 6, 8, 10, 12],
  gewicht: [1000, 1250, 1500, 1750, 2000, 2500],
  co2: [0, 50, 100, 120, 140, 160, 200],
  verbruik: [3, 4, 5, 6, 7, 8, 10],
  range: [100, 200, 300, 400, 500],
  batterij: [20, 40, 60, 80, 100]
};
for (let jaar = new Date().getFullYear(); jaar >= 1990; jaar--) {
  steps.jaar.push(jaar);
}
steps.jaar.push(1980, 1970, 1960);

// Hoe een stap getoond wordt in de dropdown
function stepLabel(soort, waarde) {
  switch (soort) {
    case "prijs": return formatPrijs(waarde);
    case "km": return formatKm(waarde);
    case "vermogen": return waarde + " " + vermogenEenheid();
    case "zit": return waarde + " zitplaatsen";
    case "cc": return waarde.toLocaleString("nl-BE") + " cm³";
    case "cilinders": return waarde + " cilinders";
    case "gewicht": return waarde.toLocaleString("nl-BE") + " kg";
    case "co2": return "Max. " + waarde + " g/km";
    case "verbruik": return "Max. " + waarde + " l/100 km";
    case "range": return "Min. " + waarde + " km";
    case "batterij": return "Min. " + waarde + " kWh";
    default: return String(waarde);
  }
}

// De lijsten uit cars.js, zodat we ze via hun naam (data-options="...") kunnen vinden
const lijsten = {
  carrosserieTypes: carrosserieTypes,
  brandstoffen: brandstoffen,
  landen: landen,
  staten: staten,
  aandrijvingen: aandrijvingen,
  interieurKleuren: interieurKleuren,
  bekledingen: bekledingen,
  emissieklassen: emissieklassen,
  prijsBeoordelingen: prijsBeoordelingen
};

// Welk veld van een auto hoort bij welke checkbox-filter
const carField = {
  carrosserie: "carrosserie",
  brandstof: "brandstof",
  staat: "staat",
  aandrijving: "aandrijving",
  kleur: "kleur",
  interieur: "interieurKleur",
  bekleding: "bekleding",
  beoordeling: "prijsBeoordeling"
};

// Namen van de losse vinkjes, met de tekst voor hun chip
const singleLabels = {
  metaal: "Metaalkleur",
  lez: "LEZ-vriendelijk",
  snelladen: "Snelladen",
  boekje: "Onderhoudsboekje",
  nietRoker: "Niet-roker",
  ongevalvrij: "Ongevalvrij",
  carPass: "Car-Pass",
  gekeurd: "Gekeurd",
  garantie: "Met garantie",
  btw: "Btw aftrekbaar",
  financiering: "Financiering",
  metFotos: "Met foto's",
  metVideo: "Met video"
};

// =====================================================================
// 1. FILTERS OPBOUWEN
// =====================================================================

// Telt hoeveel auto's een bepaalde waarde hebben (bv. hoeveel "Diesel")
function countCars(veld, waarde) {
  return allCars.filter(function (car) {
    return car[veld] === waarde;
  }).length;
}

// Telt hoeveel auto's een bepaalde uitrusting hebben
function countEquipment(optie) {
  return allCars.filter(function (car) {
    return car.uitrusting.indexOf(optie) !== -1;
  }).length;
}

// Maakt alle checkbox-lijsten (carrosserie, brandstof, uitrusting...)
function buildCheckLists() {
  document.querySelectorAll(".check-list[data-options], .check-list[data-equip]").forEach(function (lijst) {
    const naam = lijst.dataset.name;
    const opties = lijst.dataset.equip ? uitrustingGroepen[lijst.dataset.equip] : lijsten[lijst.dataset.options];

    lijst.innerHTML = opties.map(function (optie) {
      const aantal = naam === "uitrusting" ? countEquipment(optie) : countCars(carField[naam], optie);
      const leeg = aantal === 0;
      return '<label class="' + (leeg ? "empty" : "") + '">' +
        '<input type="checkbox" name="' + naam + '" value="' + optie + '"' + (leeg ? " disabled" : "") + "> " +
        optie + ' <span class="count">' + aantal + "</span></label>";
    }).join("");
  });
}

// Maakt de gekleurde bolletjes voor de kleurfilter
function buildColorDots() {
  const plek = document.querySelector(".color-dots");
  kleuren.forEach(function (kleur) {
    const aantal = countCars("kleur", kleur.naam);

    const label = document.createElement("label");
    label.className = "color-dot" + (aantal === 0 ? " empty" : "");
    label.title = kleur.naam + " (" + aantal + ")";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "kleur";
    input.value = kleur.naam;
    input.disabled = aantal === 0;
    input.setAttribute("aria-label", kleur.naam + " (" + aantal + ")");

    const bolletje = document.createElement("span");
    bolletje.style.backgroundColor = kleur.code;

    label.appendChild(input);
    label.appendChild(bolletje);
    plek.appendChild(label);
  });
}

// Vult alle dropdowns met data-steps (van/tot) en data-list (vaste lijst)
function buildSelects() {
  filterForm.querySelectorAll("select[data-steps]").forEach(function (select) {
    const soort = select.dataset.steps;
    let html = '<option value="">' + select.dataset.first + "</option>";
    steps[soort].forEach(function (waarde) {
      html += '<option value="' + waarde + '">' + stepLabel(soort, waarde) + "</option>";
    });
    select.innerHTML = html;
  });

  filterForm.querySelectorAll("select[data-list]").forEach(function (select) {
    const voorvoegsel = select.dataset.prefix || "";
    let html = '<option value="">' + select.dataset.first + "</option>";
    lijsten[select.dataset.list].forEach(function (waarde) {
      html += '<option value="' + waarde + '">' + voorvoegsel + waarde + "</option>";
    });
    select.innerHTML = html;
  });
}

// Vult de merkenlijst, met het aantal auto's per merk
function buildBrands() {
  const select = filterForm.elements.merk;
  const merken = [];
  allCars.forEach(function (car) {
    if (merken.indexOf(car.merk) === -1) {
      merken.push(car.merk);
    }
  });
  merken.sort().forEach(function (merk) {
    const option = document.createElement("option");
    option.value = merk;
    option.textContent = merk + " (" + countCars("merk", merk) + ")";
    select.appendChild(option);
  });
}

// Vult de modellen van het gekozen merk. Zonder merk is de lijst uitgeschakeld.
function fillModels() {
  const merk = filterForm.elements.merk.value;
  const select = filterForm.elements.model;
  select.innerHTML = '<option value="">Alle modellen</option>';

  if (!merk) {
    select.disabled = true;
    return;
  }

  const modellen = [];
  allCars.forEach(function (car) {
    if (car.merk === merk && modellen.indexOf(car.model) === -1) {
      modellen.push(car.model);
    }
  });
  modellen.sort().forEach(function (model) {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    select.appendChild(option);
  });
  select.disabled = false;
}

// "pk" of "kW", afhankelijk van de schakelaar
function vermogenEenheid() {
  const gekozen = filterForm.querySelector('input[name="eenheid"]:checked');
  return gekozen && gekozen.value === "kw" ? "kW" : "pk";
}

// Past de tekst in de vermogen-dropdowns aan als je wisselt tussen pk en kW
function updateVermogenLabels() {
  filterForm.querySelectorAll('select[data-steps="vermogen"]').forEach(function (select) {
    Array.from(select.options).forEach(function (option) {
      if (option.value) {
        option.textContent = stepLabel("vermogen", Number(option.value));
      }
    });
  });
}

// =====================================================================
// 2. FILTERS LEZEN EN TOEPASSEN
// =====================================================================

// Leest alle waarden uit het formulier in één object
function readFilters() {
  const data = new FormData(filterForm);

  // Getal uit het formulier, of null als het veld leeg is
  function getal(naam) {
    const waarde = data.get(naam);
    return waarde === null || waarde === "" ? null : Number(waarde);
  }
  // Tekst uit het formulier (leeg = "")
  function tekst(naam) {
    return (data.get(naam) || "").trim();
  }
  // Is een los vinkje aangevinkt?
  function vinkje(naam) {
    return data.get(naam) === "1";
  }

  return {
    q: tekst("q").toLowerCase(),
    merk: tekst("merk"),
    model: tekst("model"),
    versie: tekst("versie").toLowerCase(),
    prijsVan: getal("prijsVan"),
    prijsTot: getal("prijsTot"),
    jaarVan: getal("jaarVan"),
    jaarTot: getal("jaarTot"),
    kmVan: getal("kmVan"),
    kmTot: getal("kmTot"),
    carrosserie: data.getAll("carrosserie"),
    brandstof: data.getAll("brandstof"),
    transmissie: tekst("transmissie"),
    postcode: tekst("postcode"),
    straal: getal("straal"),
    land: tekst("land"),
    staat: data.getAll("staat"),
    eenheid: tekst("eenheid") || "pk",
    vermogenVan: getal("vermogenVan"),
    vermogenTot: getal("vermogenTot"),
    deuren: tekst("deuren"),
    zitVan: getal("zitVan"),
    zitTot: getal("zitTot"),
    aandrijving: data.getAll("aandrijving"),
    ccVan: getal("ccVan"),
    ccTot: getal("ccTot"),
    cilinders: getal("cilinders"),
    gewichtVan: getal("gewichtVan"),
    gewichtTot: getal("gewichtTot"),
    kleur: data.getAll("kleur"),
    metaal: vinkje("metaal"),
    interieur: data.getAll("interieur"),
    bekleding: data.getAll("bekleding"),
    uitrusting: data.getAll("uitrusting"),
    euro: tekst("euro"),
    co2Tot: getal("co2Tot"),
    verbruikTot: getal("verbruikTot"),
    lez: vinkje("lez"),
    actieradius: getal("actieradius"),
    batterij: getal("batterij"),
    snelladen: vinkje("snelladen"),
    eigenaars: getal("eigenaars"),
    boekje: vinkje("boekje"),
    nietRoker: vinkje("nietRoker"),
    ongevalvrij: vinkje("ongevalvrij"),
    carPass: vinkje("carPass"),
    gekeurd: vinkje("gekeurd"),
    garantie: vinkje("garantie"),
    aanbieder: tekst("aanbieder"),
    online: getal("online"),
    beoordeling: data.getAll("beoordeling"),
    btw: vinkje("btw"),
    financiering: vinkje("financiering"),
    metFotos: vinkje("metFotos"),
    metVideo: vinkje("metVideo"),
    sort: tekst("sort")
  };
}

// Afstand in km tussen twee punten.
// We doen alsof België plat is (Pythagoras): 1 graad breedte ≈ 111 km
// en 1 graad lengte ≈ 73 km (op de breedte van België). Goed genoeg voor een straal.
function distanceKm(punt1, punt2) {
  const dy = (punt1.lat - punt2.lat) * 111;
  const dx = (punt1.lng - punt2.lng) * 73;
  return Math.sqrt(dx * dx + dy * dy);
}

// Mag deze auto in de lage-emissiezone (LEZ)? Vereenvoudigde regel:
// - elektrisch en waterstof: altijd
// - diesel (ook diesel-hybride): vanaf Euro 6
// - benzine, LPG, CNG en benzine-hybrides: vanaf Euro 3
function isLezOk(car) {
  if (car.brandstof === "Elektrisch" || car.brandstof === "Waterstof") {
    return true;
  }
  const klasse = emissieklassen.indexOf(car.emissieklasse);
  if (car.brandstof === "Diesel" || car.brandstof === "Hybride (elektrisch/diesel)") {
    return klasse >= emissieklassen.indexOf("Euro 6");
  }
  return klasse >= emissieklassen.indexOf("Euro 3");
}

// Controleert of één auto aan ALLE filters voldoet.
// Elk filter is een kleine controle: past de auto niet, dan meteen 'return false'.
// Een leeg filter (null, "" of lege lijst) laat elke auto door.
function matchesFilters(car, f) {
  // Zoekwoord: in merk, model, versie of omschrijving
  if (f.q) {
    const tekst = (car.merk + " " + car.model + " " + car.versie + " " + car.omschrijving + " " +
      car.uitrusting.join(" ")).toLowerCase();
    if (tekst.indexOf(f.q) === -1) return false;
  }

  // Merk, model en versie
  if (f.merk && car.merk !== f.merk) return false;
  if (f.model && car.model !== f.model) return false;
  if (f.versie && car.versie.toLowerCase().indexOf(f.versie) === -1) return false;

  // Prijs, bouwjaar en kilometerstand: tussen van en tot
  if (f.prijsVan !== null && car.prijs < f.prijsVan) return false;
  if (f.prijsTot !== null && car.prijs > f.prijsTot) return false;
  if (f.jaarVan !== null && car.inschrijvingJaar < f.jaarVan) return false;
  if (f.jaarTot !== null && car.inschrijvingJaar > f.jaarTot) return false;
  if (f.kmVan !== null && car.km < f.kmVan) return false;
  if (f.kmTot !== null && car.km > f.kmTot) return false;

  // Checkbox-lijsten: minstens één aangevinkte waarde moet passen
  if (f.carrosserie.length > 0 && f.carrosserie.indexOf(car.carrosserie) === -1) return false;
  if (f.brandstof.length > 0 && f.brandstof.indexOf(car.brandstof) === -1) return false;
  if (f.staat.length > 0 && f.staat.indexOf(car.staat) === -1) return false;
  if (f.aandrijving.length > 0 && f.aandrijving.indexOf(car.aandrijving) === -1) return false;
  if (f.kleur.length > 0 && f.kleur.indexOf(car.kleur) === -1) return false;
  if (f.interieur.length > 0 && f.interieur.indexOf(car.interieurKleur) === -1) return false;
  if (f.bekleding.length > 0 && f.bekleding.indexOf(car.bekleding) === -1) return false;
  if (f.beoordeling.length > 0 && f.beoordeling.indexOf(car.prijsBeoordeling) === -1) return false;

  // Transmissie, land en aanbieder: één keuze
  if (f.transmissie && car.transmissie !== f.transmissie) return false;
  if (f.land && car.land !== f.land) return false;
  if (f.aanbieder && car.aanbieder !== f.aanbieder) return false;

  // Locatie: alleen als de postcode bekend is én er een straal gekozen is
  if (f.postcode && f.straal !== null && postcodes[f.postcode]) {
    const plaatsAuto = postcodes[car.postcode];
    if (!plaatsAuto) return false;
    if (distanceKm(postcodes[f.postcode], plaatsAuto) > f.straal) return false;
  }

  // Vermogen: de data bewaart pk; bij kW rekenen we om (1 pk = 0,7355 kW)
  const vermogen = f.eenheid === "kw" ? Math.round(car.pk * 0.7355) : car.pk;
  if (f.vermogenVan !== null && vermogen < f.vermogenVan) return false;
  if (f.vermogenTot !== null && vermogen > f.vermogenTot) return false;

  // Deuren: "2/3", "4/5" of "6/7"
  if (f.deuren === "2/3" && car.deuren > 3) return false;
  if (f.deuren === "4/5" && (car.deuren < 4 || car.deuren > 5)) return false;
  if (f.deuren === "6/7" && car.deuren < 6) return false;

  // Zitplaatsen, cilinderinhoud, cilinders en gewicht
  if (f.zitVan !== null && car.zitplaatsen < f.zitVan) return false;
  if (f.zitTot !== null && car.zitplaatsen > f.zitTot) return false;
  if (f.ccVan !== null && car.cilinderinhoud < f.ccVan) return false;
  if (f.ccTot !== null && car.cilinderinhoud > f.ccTot) return false;
  if (f.cilinders !== null && car.cilinders !== f.cilinders) return false;
  if (f.gewichtVan !== null && car.gewicht < f.gewichtVan) return false;
  if (f.gewichtTot !== null && car.gewicht > f.gewichtTot) return false;

  // Metaalkleur
  if (f.metaal && !car.metaalkleur) return false;

  // Uitrusting: de auto moet ALLE aangevinkte opties hebben
  const heeftAlles = f.uitrusting.every(function (optie) {
    return car.uitrusting.indexOf(optie) !== -1;
  });
  if (!heeftAlles) return false;

  // Milieu: emissieklasse minimaal X (volgorde uit de lijst emissieklassen)
  if (f.euro && emissieklassen.indexOf(car.emissieklasse) < emissieklassen.indexOf(f.euro)) return false;
  if (f.co2Tot !== null && car.co2 > f.co2Tot) return false;
  if (f.verbruikTot !== null && car.verbruik > f.verbruikTot) return false;
  if (f.lez && !isLezOk(car)) return false;

  // Elektrisch
  if (f.actieradius !== null && (car.actieradius === null || car.actieradius < f.actieradius)) return false;
  if (f.batterij !== null && (car.batterij === null || car.batterij < f.batterij)) return false;
  if (f.snelladen && !car.snelladen) return false;

  // Historiek
  if (f.eigenaars !== null && car.vorigeEigenaars > f.eigenaars) return false;
  if (f.boekje && !car.onderhoudsboekje) return false;
  if (f.nietRoker && !car.nietRoker) return false;
  if (f.ongevalvrij && !car.ongevalvrij) return false;
  if (f.carPass && !car.carPass) return false;
  if (f.gekeurd && !car.gekeurd) return false;
  if (f.garantie && !(car.garantieMaanden > 0)) return false;

  // Advertentie
  if (f.online !== null && dagenSinds(car.datumOnline) > f.online) return false;
  if (f.btw && !car.btwAftrekbaar) return false;
  if (f.financiering && !car.financiering) return false;
  if (f.metFotos && car.fotos.length === 0) return false;
  if (f.metVideo && !car.video) return false;

  return true;
}

// Sorteert de lijst volgens de keuze in de dropdown
function sortCars(lijst, keuze) {
  switch (keuze) {
    case "prijs-op":
      lijst.sort(function (a, b) { return a.prijs - b.prijs; });
      break;
    case "prijs-af":
      lijst.sort(function (a, b) { return b.prijs - a.prijs; });
      break;
    case "km-op":
      lijst.sort(function (a, b) { return a.km - b.km; });
      break;
    case "jaar-af":
      lijst.sort(function (a, b) { return b.inschrijvingJaar - a.inschrijvingJaar; });
      break;
    case "jaar-op":
      lijst.sort(function (a, b) { return a.inschrijvingJaar - b.inschrijvingJaar; });
      break;
    case "pk-af":
      lijst.sort(function (a, b) { return b.pk - a.pk; });
      break;
    case "verbruik-op":
      lijst.sort(function (a, b) { return a.verbruik - b.verbruik; });
      break;
    default:
      // Standaard: nieuwste advertenties eerst
      lijst.sort(function (a, b) { return new Date(b.datumOnline) - new Date(a.datumOnline); });
  }
  return lijst;
}

// Het hoofdprogramma: wordt opgeroepen bij elke wijziging aan een filter
function applyFilters(naarEerstePagina) {
  if (naarEerstePagina) {
    currentPage = 1;
  }
  const f = readFilters();
  const result = sortCars(allCars.filter(function (car) {
    return matchesFilters(car, f);
  }), f.sort);

  showResults(result);
  showChips(f);
  updatePostcodeHint(f);
  toggleElectricGroup(f);
  updateUrl();
}

// =====================================================================
// 3. RESULTATEN TONEN
// =====================================================================

// Toont de auto's van de huidige pagina, het aantal en de paginering
function showResults(result) {
  const aantalPaginas = Math.max(1, Math.ceil(result.length / PER_PAGE));
  if (currentPage > aantalPaginas) {
    currentPage = aantalPaginas;
  }
  const start = (currentPage - 1) * PER_PAGE;
  const dezePagina = result.slice(start, start + PER_PAGE);

  document.getElementById("resultCount").textContent = result.length;
  carList.innerHTML = dezePagina.map(createCarCard).join("");
  document.getElementById("emptyState").hidden = result.length > 0;
  document.getElementById("showResults").textContent =
    "Toon " + result.length + (result.length === 1 ? " resultaat" : " resultaten");

  showPagination(aantalPaginas);
}

// Maakt de knoppen ‹ 1 2 3 ›
function showPagination(aantalPaginas) {
  const nav = document.getElementById("pagination");
  if (aantalPaginas <= 1) {
    nav.innerHTML = "";
    return;
  }
  let html = '<button type="button" data-page="' + (currentPage - 1) + '"' +
    (currentPage === 1 ? " disabled" : "") + ' aria-label="Vorige pagina">‹</button>';
  for (let i = 1; i <= aantalPaginas; i++) {
    html += '<button type="button" data-page="' + i + '"' + (i === currentPage ? ' class="active" aria-current="page"' : "") +
      ">" + i + "</button>";
  }
  html += '<button type="button" data-page="' + (currentPage + 1) + '"' +
    (currentPage === aantalPaginas ? " disabled" : "") + ' aria-label="Volgende pagina">›</button>';
  nav.innerHTML = html;
}

// Tekst van een chip voor een filterwaarde
function chipLabel(naam, waarde, f) {
  switch (naam) {
    case "q": return '"' + waarde + '"';
    case "versie": return "Versie: " + waarde;
    case "prijsVan": return "Vanaf " + formatPrijs(waarde);
    case "prijsTot": return "Tot " + formatPrijs(waarde);
    case "jaarVan": return "Bouwjaar vanaf " + waarde;
    case "jaarTot": return "Bouwjaar tot " + waarde;
    case "kmVan": return "Vanaf " + formatKm(waarde);
    case "kmTot": return "Tot " + formatKm(waarde);
    case "postcode": return "Binnen " + f.straal + " km van " + waarde;
    case "vermogenVan": return "Vanaf " + waarde + " " + vermogenEenheid();
    case "vermogenTot": return "Tot " + waarde + " " + vermogenEenheid();
    case "deuren": return waarde + " deuren";
    case "zitVan": return "Vanaf " + waarde + " zitplaatsen";
    case "zitTot": return "Tot " + waarde + " zitplaatsen";
    case "ccVan": return "Vanaf " + waarde + " cm³";
    case "ccTot": return "Tot " + waarde + " cm³";
    case "cilinders": return waarde + " cilinders";
    case "gewichtVan": return "Vanaf " + waarde + " kg";
    case "gewichtTot": return "Tot " + waarde + " kg";
    case "euro": return "Min. " + waarde;
    case "co2Tot": return "Max. " + waarde + " g/km CO₂";
    case "verbruikTot": return "Max. " + waarde + " l/100 km";
    case "actieradius": return "Min. " + waarde + " km bereik";
    case "batterij": return "Min. " + waarde + " kWh";
    case "eigenaars": return "Max. " + waarde + (waarde === "1" ? " eigenaar" : " eigenaars");
    case "online": return "Online sinds " + waarde + (waarde === "1" ? " dag" : " dagen");
    default: return singleLabels[naam] || waarde;
  }
}

// Toont de actieve filters als chips (met ✕ om ze te verwijderen)
function showChips(f) {
  const chips = [];
  new FormData(filterForm).forEach(function (waarde, naam) {
    // Deze velden krijgen geen eigen chip
    if (waarde === "" || naam === "sort" || naam === "eenheid" || naam === "straal") return;
    // Postcode alleen tonen als hij gebruikt wordt (bekende postcode + straal)
    if (naam === "postcode" && (f.straal === null || !postcodes[waarde])) return;
    chips.push({ naam: naam, waarde: waarde, label: chipLabel(naam, waarde, f) });
  });

  const plek = document.getElementById("activeChips");
  if (chips.length === 0) {
    plek.innerHTML = "";
  } else {
    plek.innerHTML = chips.map(function (chip) {
      return '<span class="chip">' + escapeHtml(chip.label) +
        '<button type="button" data-chip-name="' + chip.naam + '" data-chip-value="' + escapeHtml(chip.waarde) +
        '" aria-label="Filter ' + escapeHtml(chip.label) + ' verwijderen">✕</button></span>';
    }).join("") + '<button type="button" class="link-btn" id="chipsReset">Alles wissen</button>';
  }

  // Aantal actieve filters op de knop "Filters" (gsm)
  document.getElementById("filterCount").textContent = chips.length > 0 ? "(" + chips.length + ")" : "";
}

// Verwijdert één filter (na een klik op ✕ van een chip)
function removeFilter(naam, waarde) {
  document.querySelectorAll('[name="' + naam + '"]').forEach(function (input) {
    if (input.type === "checkbox") {
      if (input.value === waarde) input.checked = false;
    } else if (input.type === "radio") {
      input.checked = input.value === "";
    } else {
      input.value = "";
    }
  });
  if (naam === "merk") fillModels();
  if (naam === "postcode") filterForm.elements.straal.value = "";
  applyFilters(true);
}

// Alle filters terug leeg maken
function resetFilters() {
  filterForm.reset();
  sortSelect.value = "";
  fillModels();
  updateVermogenLabels();
  applyFilters(true);
}

// Uitleg onder de postcode: niet gevonden / kies een straal / binnen X km van ...
function updatePostcodeHint(f) {
  const hint = document.getElementById("postcodeHint");
  hint.classList.remove("error");
  if (!f.postcode) {
    hint.textContent = "Vul een postcode én een straal in.";
  } else if (!postcodes[f.postcode]) {
    hint.textContent = "Postcode niet gevonden. Probeer bv. 9120, 9000 of 2000.";
    hint.classList.add("error");
  } else if (f.straal === null) {
    hint.textContent = "Kies nog een straal rond " + postcodes[f.postcode].gemeente + ".";
  } else {
    hint.textContent = "Binnen " + f.straal + " km van " + postcodes[f.postcode].gemeente + ".";
  }
}

// De groep 'Elektrisch' is alleen zichtbaar als je een elektrische brandstof kiest
// (of als er al een elektrische filter ingevuld is)
function toggleElectricGroup(f) {
  const elektrisch = f.brandstof.indexOf("Elektrisch") !== -1 ||
    f.brandstof.indexOf("Plug-in hybride") !== -1 ||
    f.brandstof.indexOf("Waterstof") !== -1 ||
    f.actieradius !== null || f.batterij !== null || f.snelladen;
  document.getElementById("groupElektrisch").hidden = !elektrisch;
}

// =====================================================================
// 4. URL <-> FILTERS
// =====================================================================

// Zet de filters in de adresbalk, zodat je een gefilterde link kunt delen
function updateUrl() {
  const params = new URLSearchParams();
  new FormData(filterForm).forEach(function (waarde, naam) {
    if (waarde !== "" && !(naam === "eenheid" && waarde === "pk")) {
      params.append(naam, waarde);
    }
  });
  if (currentPage > 1) {
    params.set("pagina", currentPage);
  }
  const query = params.toString();
  try {
    history.replaceState(null, "", query ? "?" + query : window.location.pathname);
  } catch (e) {
    // Lukt niet als je de pagina rechtstreeks als bestand opent (file://). Met Live Server werkt het wel.
  }
}

// Zet één waarde uit de URL in het juiste formulierveld
function setField(naam, waarde) {
  document.querySelectorAll('[name="' + naam + '"]').forEach(function (input) {
    if (input.type === "checkbox" || input.type === "radio") {
      if (input.value === waarde) input.checked = true;
    } else {
      input.value = waarde;
    }
  });
}

// Leest de filters uit de URL (bv. aanbod.html?merk=BMW&brandstof=Diesel)
function loadFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  params.forEach(function (waarde, naam) {
    if (naam !== "model" && naam !== "pagina") {
      setField(naam, waarde);
    }
  });
  // Het model kan pas gekozen worden nadat de modellen van het merk geladen zijn
  fillModels();
  if (params.get("model")) {
    filterForm.elements.model.value = params.get("model");
  }
  updateVermogenLabels();
  currentPage = Number(params.get("pagina")) || 1;
}

// =====================================================================
// 5. KNOPPEN EN WEERGAVE
// =====================================================================

// Filterpaneel openen en sluiten op gsm
const filterPanel = document.getElementById("filterPanel");
const openFiltersBtn = document.getElementById("openFilters");

function setPanelOpen(open) {
  filterPanel.classList.toggle("open", open);
  document.body.classList.toggle("no-scroll", open);
  openFiltersBtn.setAttribute("aria-expanded", open);
  if (open) {
    document.getElementById("closeFilters").focus();
  }
}

// Rooster- of lijstweergave (keuze wordt onthouden in localStorage)
function setView(weergave) {
  carList.classList.toggle("list-view", weergave === "list");
  document.getElementById("viewGrid").classList.toggle("active", weergave !== "list");
  document.getElementById("viewList").classList.toggle("active", weergave === "list");
  document.getElementById("viewGrid").setAttribute("aria-pressed", weergave !== "list");
  document.getElementById("viewList").setAttribute("aria-pressed", weergave === "list");
  try {
    localStorage.setItem("av_view", weergave);
  } catch (e) {
    // Niet erg als het niet lukt: dan wordt de keuze gewoon niet onthouden
  }
}

function getSavedView() {
  try {
    return localStorage.getItem("av_view") || "grid";
  } catch (e) {
    return "grid";
  }
}

// ---------- Opstarten ----------
buildSelects();
buildBrands();
buildCheckLists();
buildColorDots();
loadFiltersFromUrl();
setView(getSavedView());
applyFilters(false);

// Elke wijziging aan een dropdown, vinkje of keuzeknop
filterForm.addEventListener("change", function (event) {
  const naam = event.target.name;
  if (naam === "merk") fillModels();
  if (naam === "eenheid") updateVermogenLabels();
  // Tekstvelden worden al tijdens het typen gefilterd (zie hieronder)
  if (event.target.type !== "text" && event.target.type !== "search") {
    applyFilters(true);
  }
});

// Tekstvelden: pas filteren als je 300 ms niet meer typt
filterForm.addEventListener("input", function (event) {
  if (event.target.type === "text" || event.target.type === "search") {
    clearTimeout(typeTimer);
    typeTimer = setTimeout(function () {
      applyFilters(true);
    }, 300);
  }
});

// Enter in een tekstveld mag de pagina niet herladen
filterForm.addEventListener("submit", function (event) {
  event.preventDefault();
  applyFilters(true);
});

// De sorteer-dropdown staat buiten het formulier, dus een eigen luisteraar
sortSelect.addEventListener("change", function () {
  applyFilters(true);
});

// Klik op ✕ van een chip, of op "Alles wissen" naast de chips
document.getElementById("activeChips").addEventListener("click", function (event) {
  const knop = event.target.closest("button");
  if (!knop) return;
  if (knop.id === "chipsReset") {
    resetFilters();
  } else {
    removeFilter(knop.dataset.chipName, knop.dataset.chipValue);
  }
});

document.getElementById("resetFilters").addEventListener("click", resetFilters);
document.getElementById("emptyReset").addEventListener("click", resetFilters);

// Paginering
document.getElementById("pagination").addEventListener("click", function (event) {
  const knop = event.target.closest("button[data-page]");
  if (!knop || knop.disabled) return;
  currentPage = Number(knop.dataset.page);
  applyFilters(false);
  document.getElementById("resultTitle").scrollIntoView({ behavior: "smooth", block: "start" });
});

// Filterpaneel op gsm
openFiltersBtn.addEventListener("click", function () {
  setPanelOpen(true);
});
document.getElementById("closeFilters").addEventListener("click", function () {
  setPanelOpen(false);
  openFiltersBtn.focus();
});
document.getElementById("showResults").addEventListener("click", function () {
  setPanelOpen(false);
  openFiltersBtn.focus();
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && filterPanel.classList.contains("open")) {
    setPanelOpen(false);
    openFiltersBtn.focus();
  }
});

// Rooster / lijst
document.getElementById("viewGrid").addEventListener("click", function () {
  setView("grid");
});
document.getElementById("viewList").addEventListener("click", function () {
  setView("list");
});
