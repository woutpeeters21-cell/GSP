// =====================================================================
// detail.js – detailpagina van één auto (auto.html?id=12)
// Leest de id uit de URL, zoekt de auto en bouwt de hele pagina op.
// =====================================================================

const detailMain = document.getElementById("detail");
const carId = Number(new URLSearchParams(window.location.search).get("id"));
const car = findCar(carId);

const RENTE = 0.059;     // vaste jaarrente voor de financiering (5,9%)
let photoIndex = 0;      // welke foto is nu groot zichtbaar

// Lijst met alle foto's van de auto (minstens één "lege" voor het grijze vak)
function getPhotos() {
  return car.fotos.length > 0 ? car.fotos : [""];
}

// Eén regel in een tabel met technische gegevens
function specRow(label, waarde) {
  return "<tr><th scope=\"row\">" + label + "</th><td>" + escapeHtml(waarde) + "</td></tr>";
}

// Toont "Ja" of "Nee"
function jaNee(waarde) {
  return waarde ? "Ja" : "Nee";
}

// Maand en jaar als "03/2020"
function inschrijving() {
  return String(car.inschrijvingMaand).padStart(2, "0") + "/" + car.inschrijvingJaar;
}

// HTML van de fotogalerij
function galleryHtml() {
  const fotos = getPhotos();
  const naam = car.merk + " " + car.model;
  let html = '<div class="gallery-main" id="galleryMain">' + photoHtml(carPhoto(car, 0, 1200), naam + " – foto 1");

  if (fotos.length > 1) {
    html += '<button type="button" class="icon-btn gallery-arrow gallery-arrow--prev" id="prevPhoto" aria-label="Vorige foto">' + icons.left + "</button>" +
      '<button type="button" class="icon-btn gallery-arrow gallery-arrow--next" id="nextPhoto" aria-label="Volgende foto">' + icons.right + "</button>" +
      '<span class="gallery-counter" id="photoCounter">1 / ' + fotos.length + "</span>";
  }
  html += "</div>";

  if (fotos.length > 1) {
    html += '<div class="thumbs">' + fotos.map(function (link, i) {
      return '<button type="button" class="thumb' + (i === 0 ? " active" : "") + '" data-index="' + i + '" aria-label="Toon foto ' + (i + 1) + '">' +
        photoHtml(carPhoto(car, i, 300), "") + "</button>";
    }).join("") + "</div>";
  }
  return html;
}

// HTML van het infoblok rechts (prijs, kerngegevens, knoppen, verkoper)
function infoHtml() {
  const kw = Math.round(car.pk * 0.7355);
  const fav = isFavorite(car.id);
  const badgeKleur = car.prijsBeoordeling === "Boven marktprijs" ? "" : " badge--green";

  return `
    <aside class="card info-box">
      <h1>${escapeHtml(car.merk + " " + car.model)}</h1>
      <p class="version">${escapeHtml(car.versie)}</p>
      <div class="info-price">
        <span class="price">${formatPrijs(car.prijs)}</span>
        <span class="badge${badgeKleur}">${car.prijsBeoordeling}</span>
        ${car.btwAftrekbaar ? '<span class="badge badge--blue">Btw aftrekbaar</span>' : ""}
      </div>
      <ul class="key-facts">
        <li>${icons.calendar}<span>${inschrijving()}</span></li>
        <li>${icons.road}<span>${formatKm(car.km)}</span></li>
        <li>${icons.fuel}<span>${car.brandstof}</span></li>
        <li>${icons.gear}<span>${car.transmissie}</span></li>
        <li>${icons.power}<span>${car.pk} pk (${kw} kW)</span></li>
        <li>${icons.pin}<span>${escapeHtml(car.gemeente)}</span></li>
      </ul>
      <div class="info-actions">
        <a href="#contact" class="btn btn--primary">Contacteer verkoper</a>
        <button type="button" class="icon-btn${fav ? " active" : ""}" data-fav="${car.id}" aria-pressed="${fav}" aria-label="Bewaar als favoriet">${icons.heart}</button>
        <button type="button" class="icon-btn" id="shareBtn" aria-label="Deel deze auto">${icons.share}</button>
      </div>
      <div class="seller">
        <span class="avatar" aria-hidden="true">${escapeHtml(car.verkoperNaam.charAt(0))}</span>
        <div>
          <strong>${escapeHtml(car.verkoperNaam)}</strong>
          <span>${car.aanbieder} · ${escapeHtml(car.gemeente)}</span>
          <span><a href="tel:${escapeHtml(car.telefoon.replace(/\s/g, ""))}">${escapeHtml(car.telefoon)}</a></span>
        </div>
      </div>
    </aside>`;
}

// Tab "Overzicht": de belangrijkste gegevens als blokjes
function overviewHtml() {
  const items = [
    ["Carrosserie", car.carrosserie],
    ["Kleur", car.kleur + (car.metaalkleur ? " (metaal)" : "")],
    ["Deuren / zitplaatsen", car.deuren + " / " + car.zitplaatsen],
    ["Aandrijving", car.aandrijving],
    ["Emissieklasse", car.emissieklasse],
    ["Verbruik", car.verbruik > 0 ? car.verbruik + " l/100 km" : "—"],
    ["Vorige eigenaars", car.vorigeEigenaars],
    ["Staat", car.staat]
  ];
  if (car.actieradius) {
    items.push(["Actieradius", car.actieradius + " km"]);
  }

  let badges = "";
  if (car.onderhoudsboekje) badges += '<span class="badge badge--green">Onderhoudsboekje</span>';
  if (car.carPass) badges += '<span class="badge badge--green">Car-Pass</span>';
  if (car.gekeurd) badges += '<span class="badge badge--green">Gekeurd voor verkoop</span>';
  if (car.ongevalvrij) badges += '<span class="badge badge--green">Ongevalvrij</span>';
  if (car.nietRoker) badges += '<span class="badge">Niet-roker</span>';
  if (car.garantieMaanden > 0) badges += '<span class="badge badge--orange">' + car.garantieMaanden + " maanden garantie</span>";
  if (!car.ongevalvrij) badges += '<span class="badge">Schadewagen</span>';

  return '<div class="overview-grid">' + items.map(function (item) {
    return '<div class="overview-item"><span>' + item[0] + "</span><strong>" + escapeHtml(item[1]) + "</strong></div>";
  }).join("") + '</div><div class="check-row">' + badges + "</div>";
}

// Tab "Technische gegevens": twee tabellen naast elkaar
function specsHtml() {
  const links = [
    ["Merk", car.merk],
    ["Model", car.model],
    ["Versie", car.versie || "—"],
    ["Eerste inschrijving", inschrijving()],
    ["Kilometerstand", formatKm(car.km)],
    ["Carrosserie", car.carrosserie],
    ["Deuren", car.deuren],
    ["Zitplaatsen", car.zitplaatsen],
    ["Kleur exterieur", car.kleur + (car.metaalkleur ? " metaal" : "")],
    ["Kleur interieur", car.interieurKleur],
    ["Bekleding", car.bekleding],
    ["Staat", car.staat]
  ];
  const rechts = [
    ["Brandstof", car.brandstof],
    ["Transmissie", car.transmissie],
    ["Aandrijving", car.aandrijving],
    ["Vermogen", car.pk + " pk (" + Math.round(car.pk * 0.7355) + " kW)"],
    ["Cilinderinhoud", car.cilinderinhoud > 0 ? car.cilinderinhoud.toLocaleString("nl-BE") + " cm³" : "—"],
    ["Cilinders", car.cilinders > 0 ? car.cilinders : "—"],
    ["Leeggewicht", car.gewicht > 0 ? car.gewicht.toLocaleString("nl-BE") + " kg" : "—"],
    ["Verbruik (gecombineerd)", car.verbruik > 0 ? car.verbruik + " l/100 km" : "—"],
    ["CO₂-uitstoot", car.co2 + " g/km"],
    ["Emissieklasse", car.emissieklasse],
    ["Vorige eigenaars", car.vorigeEigenaars],
    ["Onderhoudsboekje", jaNee(car.onderhoudsboekje)],
    ["Car-Pass", jaNee(car.carPass)]
  ];
  if (car.batterij) rechts.push(["Batterij", car.batterij + " kWh"]);
  if (car.actieradius) rechts.push(["Actieradius (WLTP)", car.actieradius + " km"]);
  if (car.actieradius) rechts.push(["Snelladen (DC)", jaNee(car.snelladen)]);

  function tabel(rijen) {
    return '<table class="spec-table"><tbody>' + rijen.map(function (rij) {
      return specRow(rij[0], rij[1]);
    }).join("") + "</tbody></table>";
  }
  return '<div class="spec-grid">' + tabel(links) + tabel(rechts) + "</div>";
}

// Tab "Uitrusting": per groep een lijst met vinkjes
function equipmentHtml() {
  let html = '<div class="equip-groups">';
  Object.keys(uitrustingGroepen).forEach(function (groep) {
    const aanwezig = uitrustingGroepen[groep].filter(function (optie) {
      return car.uitrusting.indexOf(optie) !== -1;
    });
    if (aanwezig.length > 0) {
      html += "<div><h3>" + groep + '</h3><ul class="equip-list">' + aanwezig.map(function (optie) {
        return "<li>" + optie + "</li>";
      }).join("") + "</ul></div>";
    }
  });
  html += "</div>";
  if (car.uitrusting.length === 0) {
    html = '<p class="muted">De verkoper heeft geen uitrusting opgegeven.</p>';
  }
  return html;
}

// Tab "Omschrijving"
function descriptionHtml() {
  if (!car.omschrijving) {
    return '<p class="muted">Geen omschrijving.</p>';
  }
  // Nieuwe regels uit het verkoopformulier tonen als <br>
  return "<p>" + escapeHtml(car.omschrijving).replace(/\n/g, "<br>") + "</p>";
}

// Alle tabs samen
function tabsHtml() {
  const tabs = [
    ["overzicht", "Overzicht", overviewHtml()],
    ["technisch", "Technische gegevens", specsHtml()],
    ["uitrusting", "Uitrusting (" + car.uitrusting.length + ")", equipmentHtml()],
    ["omschrijving", "Omschrijving", descriptionHtml()]
  ];
  let knoppen = "";
  let panelen = "";
  tabs.forEach(function (tab, i) {
    knoppen += '<button type="button" class="tab-btn" role="tab" id="tab-' + tab[0] + '" aria-controls="panel-' + tab[0] +
      '" aria-selected="' + (i === 0) + '"' + (i === 0 ? "" : ' tabindex="-1"') + ">" + tab[1] + "</button>";
    panelen += '<div class="tab-panel" role="tabpanel" id="panel-' + tab[0] + '" aria-labelledby="tab-' + tab[0] + '"' +
      (i === 0 ? "" : " hidden") + ">" + tab[2] + "</div>";
  });
  return '<section class="tabs"><div class="tab-list" role="tablist" aria-label="Info over de auto">' + knoppen + "</div>" + panelen + "</section>";
}

// Rekenmachine voor de financiering
function calcHtml() {
  const maxVoorschot = Math.floor(car.prijs * 0.8 / 500) * 500;
  return `
    <section class="detail-section" aria-labelledby="calcTitle">
      <div class="section-title"><h2 id="calcTitle">Financiering berekenen</h2></div>
      <div class="card calc">
        <div class="form-grid">
          <div class="field">
            <div class="range-label"><label for="voorschot">Voorschot</label><output id="voorschotOut" for="voorschot"></output></div>
            <input type="range" id="voorschot" min="0" max="${maxVoorschot}" step="500" value="${Math.min(2500, maxVoorschot)}">
          </div>
          <div class="field">
            <div class="range-label"><label for="looptijd">Looptijd</label><output id="looptijdOut" for="looptijd"></output></div>
            <input type="range" id="looptijd" min="12" max="84" step="12" value="60">
          </div>
          <p class="demo-note">Vaste rente van 5,9% per jaar. Dit is een voorbeeld, geen officieel aanbod.
          ${car.financiering ? "" : "<br>Deze verkoper biedt zelf geen financiering aan; vraag het aan je bank."}</p>
        </div>
        <div class="calc-result">
          <small>Geschat maandbedrag</small>
          <strong id="maandBedrag">€ 0</strong>
          <small id="calcDetail"></small>
        </div>
      </div>
    </section>`;
}

// Contactformulier onderaan
function contactHtml() {
  const bericht = "Hallo, ik heb interesse in de " + car.merk + " " + car.model + " " + car.versie +
    " (" + formatPrijs(car.prijs) + "). Is de auto nog beschikbaar?";
  return `
    <section class="detail-section" id="contact" aria-labelledby="contactTitle">
      <div class="section-title"><h2 id="contactTitle">Contacteer de verkoper</h2></div>
      <form class="card" id="detailContact" novalidate>
        <div class="form-grid form-grid--3">
          <div class="field">
            <label for="d-naam">Naam <span class="required">*</span></label>
            <input type="text" id="d-naam" name="naam" autocomplete="name" required>
            <span class="error-msg"></span>
          </div>
          <div class="field">
            <label for="d-email">E-mail <span class="required">*</span></label>
            <input type="email" id="d-email" name="email" autocomplete="email" required>
            <span class="error-msg"></span>
          </div>
          <div class="field">
            <label for="d-telefoon">Telefoon</label>
            <input type="tel" id="d-telefoon" name="telefoon" autocomplete="tel">
            <span class="error-msg"></span>
          </div>
          <div class="field field--full">
            <label for="d-bericht">Bericht <span class="required">*</span></label>
            <textarea id="d-bericht" name="bericht" required>${escapeHtml(bericht)}</textarea>
            <span class="error-msg"></span>
          </div>
        </div>
        <div class="form-success mt" id="detailSuccess" role="status" hidden>Bedankt! ${escapeHtml(car.verkoperNaam)} neemt snel contact met je op.</div>
        <button type="submit" class="btn btn--primary mt">Bericht versturen</button>
      </form>
    </section>`;
}

// Vergelijkbare auto's: zelfde merk of zelfde carrosserie, prijs zo dicht mogelijk bij deze auto
function similarHtml() {
  const lijst = getAllCars().filter(function (ander) {
    return ander.id !== car.id && (ander.merk === car.merk || ander.carrosserie === car.carrosserie);
  }).sort(function (a, b) {
    return Math.abs(a.prijs - car.prijs) - Math.abs(b.prijs - car.prijs);
  }).slice(0, 4);

  if (lijst.length === 0) {
    return "";
  }
  return '<section class="detail-section" aria-labelledby="similarTitle"><div class="section-title"><h2 id="similarTitle">Vergelijkbare auto\'s</h2></div>' +
    '<div class="car-grid car-grid--4">' + lijst.map(createCarCard).join("") + "</div></section>";
}

// ---------- Interactie ----------

// Toont foto nummer 'index' groot (met een korte fade)
function showPhoto(index) {
  const fotos = getPhotos();
  // Rondgaan: na de laatste foto komt de eerste
  photoIndex = (index + fotos.length) % fotos.length;

  const groot = document.querySelector("#galleryMain img");
  const nieuweLink = carPhoto(car, photoIndex, 1200);
  if (groot && nieuweLink) {
    groot.classList.add("fading");
    setTimeout(function () {
      groot.src = nieuweLink;
      groot.alt = car.merk + " " + car.model + " – foto " + (photoIndex + 1);
      groot.classList.remove("fading");
    }, 150);
  }

  document.querySelectorAll(".thumb").forEach(function (thumb, i) {
    thumb.classList.toggle("active", i === photoIndex);
  });
  const teller = document.getElementById("photoCounter");
  if (teller) {
    teller.textContent = (photoIndex + 1) + " / " + fotos.length;
  }
}

function setupGallery() {
  const vorige = document.getElementById("prevPhoto");
  const volgende = document.getElementById("nextPhoto");
  if (vorige) {
    vorige.addEventListener("click", function () { showPhoto(photoIndex - 1); });
    volgende.addEventListener("click", function () { showPhoto(photoIndex + 1); });
  }
  document.querySelectorAll(".thumb").forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      showPhoto(Number(thumb.dataset.index));
    });
  });
}

// Tabs wisselen (ook met de pijltjestoetsen)
function setupTabs() {
  const knoppen = document.querySelectorAll(".tab-btn");

  function kies(knop) {
    knoppen.forEach(function (andere) {
      const actief = andere === knop;
      andere.setAttribute("aria-selected", actief);
      andere.tabIndex = actief ? 0 : -1;
      document.getElementById(andere.getAttribute("aria-controls")).hidden = !actief;
    });
  }

  knoppen.forEach(function (knop, i) {
    knop.addEventListener("click", function () {
      kies(knop);
    });
    knop.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        const stap = event.key === "ArrowRight" ? 1 : -1;
        const volgende = knoppen[(i + stap + knoppen.length) % knoppen.length];
        kies(volgende);
        volgende.focus();
      }
    });
  });
}

// Maandbedrag berekenen met de formule voor een lening (annuïteit):
//   maand = bedrag × r / (1 − (1 + r)^−n)
//   bedrag = prijs − voorschot, r = jaarrente / 12, n = aantal maanden
function updateCalc() {
  const voorschot = Number(document.getElementById("voorschot").value);
  const maanden = Number(document.getElementById("looptijd").value);
  const bedrag = car.prijs - voorschot;
  const r = RENTE / 12;
  const perMaand = bedrag > 0 ? bedrag * r / (1 - Math.pow(1 + r, -maanden)) : 0;

  document.getElementById("voorschotOut").textContent = formatPrijs(voorschot);
  document.getElementById("looptijdOut").textContent = maanden + " maanden";
  document.getElementById("maandBedrag").textContent = "± " + formatPrijs(Math.round(perMaand));
  document.getElementById("calcDetail").textContent = "Te lenen: " + formatPrijs(bedrag);
}

// Link kopiëren naar het klembord
function setupShare() {
  document.getElementById("shareBtn").addEventListener("click", function () {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(function () {
        showToast("Link gekopieerd");
      }, function () {
        showToast("Kopiëren lukte niet. Kopieer de link uit de adresbalk.");
      });
    } else {
      showToast("Kopieer de link uit de adresbalk.");
    }
  });
}

// Contactformulier controleren
function setupContactForm() {
  const form = document.getElementById("detailContact");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let ok = true;

    const naam = form.elements.naam;
    const email = form.elements.email;
    const bericht = form.elements.bericht;

    setFieldError(naam, naam.value.trim() ? "" : "Vul je naam in.");
    setFieldError(email, isEmail(email.value.trim()) ? "" : "Vul een geldig e-mailadres in.");
    setFieldError(bericht, bericht.value.trim().length >= 10 ? "" : "Schrijf een bericht van minstens 10 tekens.");
    if (!naam.value.trim() || !isEmail(email.value.trim()) || bericht.value.trim().length < 10) {
      ok = false;
    }

    if (ok) {
      document.getElementById("detailSuccess").hidden = false;
      form.elements.naam.value = "";
      form.elements.email.value = "";
      form.elements.telefoon.value = "";
      bericht.value = "";
    }
  });
}

// ---------- Opstarten ----------
if (!car) {
  // Foute of verdwenen id
  document.title = "Auto niet gevonden – AutoVerkoop";
  detailMain.innerHTML =
    '<div class="empty-state mt">' +
    "<h1>Deze auto bestaat niet (meer)</h1>" +
    '<p class="muted">Misschien is hij al verkocht of is de link fout.</p>' +
    '<a href="aanbod.html" class="btn btn--primary">Naar het aanbod</a></div>';
} else {
  const naam = car.merk + " " + car.model;
  document.title = naam + " – AutoVerkoop";

  detailMain.innerHTML =
    '<nav class="breadcrumb" aria-label="Kruimelpad"><ol>' +
    '<li><a href="index.html">Home</a></li><li><a href="aanbod.html">Aanbod</a></li>' +
    '<li aria-current="page">' + escapeHtml(naam) + "</li></ol></nav>" +
    '<div class="detail-layout"><div>' + galleryHtml() + "</div>" + infoHtml() + "</div>" +
    tabsHtml() + calcHtml() + contactHtml() + similarHtml();

  setupGallery();
  setupTabs();
  setupShare();
  setupContactForm();
  updateCalc();
  document.getElementById("voorschot").addEventListener("input", updateCalc);
  document.getElementById("looptijd").addEventListener("input", updateCalc);
}
