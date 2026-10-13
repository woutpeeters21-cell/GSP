// =====================================================================
// sell.js – verkoopformulier in 4 stappen + overzicht
// De nieuwe advertentie wordt bewaard in localStorage (sleutel av_userCars).
// =====================================================================

const sellForm = document.getElementById("sellForm");
const panels = document.querySelectorAll(".step-panel");
const prevBtn = document.getElementById("prevStep");
const nextBtn = document.getElementById("nextStep");
const AANTAL_FOTOS = 5;
let currentStep = 1;

// Lijsten die in de dropdowns van het formulier komen (data-list="...")
const sellLists = {
  verkoopMerken: verkoopMerken,
  brandstoffen: brandstoffen,
  transmissies: transmissies,
  carrosserieTypes: carrosserieTypes,
  kleuren: kleuren.map(function (kleur) { return kleur.naam; }),
  interieurKleuren: interieurKleuren,
  bekledingen: bekledingen,
  aandrijvingen: aandrijvingen,
  emissieklassen: emissieklassen
};

// ---------- Formulier opbouwen ----------

// Vult alle dropdowns met data-list
function buildSellSelects() {
  sellForm.querySelectorAll("select[data-list]").forEach(function (select) {
    let html = '<option value="">' + select.dataset.first + "</option>";
    sellLists[select.dataset.list].forEach(function (waarde) {
      html += '<option value="' + waarde + '">' + waarde + "</option>";
    });
    select.innerHTML = html;
  });
}

// Checkboxes voor de uitrusting, per groep
function buildEquipment() {
  const plek = document.getElementById("sellEquipment");
  plek.innerHTML = Object.keys(uitrustingGroepen).map(function (groep) {
    return "<fieldset><legend>" + groep + '</legend><div class="check-grid">' +
      uitrustingGroepen[groep].map(function (optie) {
        return '<label class="check"><input type="checkbox" name="uitrusting" value="' + optie + '"> ' + optie + "</label>";
      }).join("") + "</div></fieldset>";
  }).join("");
}

// 5 velden voor foto-links, elk met een klein voorbeeld
function buildPhotoInputs() {
  let html = "";
  for (let i = 1; i <= AANTAL_FOTOS; i++) {
    html += '<div class="photo-input-row">' +
      '<div class="photo-preview" id="preview' + i + '">' + placeholderHtml() + "</div>" +
      '<div class="field"><label for="s-foto' + i + '">Foto ' + i + (i === 1 ? " (hoofdfoto)" : "") + "</label>" +
      '<input type="url" id="s-foto' + i + '" name="foto" data-preview="preview' + i + '" placeholder="https://images.pexels.com/photos/...">' +
      '<span class="error-msg"></span></div></div>';
  }
  document.getElementById("photoInputs").innerHTML = html;
}

// Suggesties voor het model, op basis van de auto's van dat merk in ons aanbod
function updateModelSuggestions() {
  const merk = sellForm.elements.merk.value;
  const modellen = [];
  getAllCars().forEach(function (car) {
    if (car.merk === merk && modellen.indexOf(car.model) === -1) {
      modellen.push(car.model);
    }
  });
  document.getElementById("modelSuggestions").innerHTML = modellen.map(function (model) {
    return '<option value="' + escapeHtml(model) + '">';
  }).join("");
}

// ---------- Stappen ----------

// Toont stap 'nummer' en past de voortgangsbalk en knoppen aan
function showStep(nummer) {
  currentStep = nummer;
  panels.forEach(function (panel) {
    panel.hidden = Number(panel.dataset.step) !== nummer;
  });

  // Voortgangsbalk: stappen 1 tot 4 (het overzicht telt als 'alles klaar')
  document.querySelectorAll("#stepper li").forEach(function (li, i) {
    li.classList.toggle("done", i + 1 < nummer);
    li.classList.toggle("current", i + 1 === nummer);
  });

  prevBtn.hidden = nummer === 1 || nummer === 6;
  nextBtn.hidden = nummer === 6;
  nextBtn.textContent = nummer === 5 ? "Plaats advertentie" : (nummer === 4 ? "Naar overzicht" : "Volgende");
  document.getElementById("stepButtons").hidden = nummer === 6;

  sellForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Controleert alle velden van één stap. Geeft true als alles in orde is.
function validateStep(nummer) {
  const panel = sellForm.querySelector('.step-panel[data-step="' + nummer + '"]');
  let ok = true;
  const ditJaar = new Date().getFullYear();

  // Controleer één veld en onthoud of er een fout was
  function check(input, melding) {
    setFieldError(input, melding);
    if (melding) {
      if (ok) input.focus();   // de cursor naar de eerste fout
      ok = false;
    }
  }

  panel.querySelectorAll("input, select, textarea").forEach(function (input) {
    const waarde = input.value.trim();
    const naam = input.name;

    if (input.type === "checkbox" || input.type === "radio") {
      return;
    }
    if (input.required && waarde === "") {
      check(input, "Dit veld is verplicht.");
      return;
    }
    // Extra controles per veld
    if (naam === "inschrijvingJaar" && (Number(waarde) < 1950 || Number(waarde) > ditJaar)) {
      check(input, "Kies een jaar tussen 1950 en " + ditJaar + ".");
    } else if ((naam === "km" || naam === "vorigeEigenaars") && Number(waarde) < 0) {
      check(input, "Geef een positief getal.");
    } else if ((naam === "pk" || naam === "prijs") && Number(waarde) <= 0) {
      check(input, "Geef een getal groter dan 0.");
    } else if (naam === "email" && !isEmail(waarde)) {
      check(input, "Vul een geldig e-mailadres in.");
    } else if (naam === "postcode" && !/^\d{4}$/.test(waarde)) {
      check(input, "Een Belgische postcode heeft 4 cijfers.");
    } else if (naam === "telefoon" && waarde.replace(/\D/g, "").length < 9) {
      check(input, "Vul een geldig telefoonnummer in.");
    } else if (naam === "foto" && waarde !== "" && waarde.indexOf("http") !== 0) {
      check(input, "Een link begint met http:// of https://");
    } else {
      setFieldError(input, "");
    }
  });
  return ok;
}

// ---------- Advertentie maken ----------

// Getal uit een veld, of 0 als het leeg is
function numberField(naam) {
  return Number(sellForm.elements[naam].value) || 0;
}

// Tekst uit een veld
function textField(naam) {
  return sellForm.elements[naam].value.trim();
}

// Is een vinkje aangevinkt?
function checkedField(naam) {
  return sellForm.elements[naam].checked;
}

// Maakt een auto-object met DEZELFDE velden als in cars.js
function buildCar() {
  const eigen = loadList("av_userCars");
  // Nieuwe id: 1 hoger dan de hoogste id (eigen advertenties starten vanaf 1000)
  let hoogste = 999;
  eigen.forEach(function (car) {
    if (car.id > hoogste) hoogste = car.id;
  });

  const fotos = [];
  sellForm.querySelectorAll('input[name="foto"]').forEach(function (input) {
    if (input.value.trim()) fotos.push(input.value.trim());
  });
  const uitrusting = [];
  sellForm.querySelectorAll('input[name="uitrusting"]:checked').forEach(function (input) {
    uitrusting.push(input.value);
  });

  const postcode = textField("postcode");
  const brandstof = textField("brandstof");

  return {
    id: hoogste + 1,
    merk: textField("merk"),
    model: textField("model"),
    versie: textField("versie"),
    prijs: numberField("prijs"),
    inschrijvingMaand: numberField("inschrijvingMaand"),
    inschrijvingJaar: numberField("inschrijvingJaar"),
    km: numberField("km"),
    staat: "Occasie",
    carrosserie: textField("carrosserie"),
    brandstof: brandstof,
    transmissie: textField("transmissie"),
    pk: numberField("pk"),
    deuren: numberField("deuren"),
    zitplaatsen: numberField("zitplaatsen"),
    aandrijving: textField("aandrijving"),
    cilinderinhoud: numberField("cilinderinhoud"),
    cilinders: 0,
    gewicht: 0,
    kleur: textField("kleur"),
    metaalkleur: checkedField("metaalkleur"),
    interieurKleur: textField("interieurKleur"),
    bekleding: textField("bekleding"),
    uitrusting: uitrusting,
    emissieklasse: textField("emissieklasse"),
    co2: numberField("co2"),
    verbruik: numberField("verbruik"),
    actieradius: null,
    batterij: null,
    snelladen: false,
    vorigeEigenaars: numberField("vorigeEigenaars"),
    onderhoudsboekje: checkedField("onderhoudsboekje"),
    nietRoker: checkedField("nietRoker"),
    ongevalvrij: checkedField("ongevalvrij"),
    carPass: checkedField("carPass"),
    gekeurd: checkedField("gekeurd"),
    garantieMaanden: 0,
    aanbieder: sellForm.querySelector('input[name="aanbieder"]:checked').value,
    verkoperNaam: textField("verkoperNaam"),
    telefoon: textField("telefoon"),
    postcode: postcode,
    gemeente: textField("gemeente"),
    land: "België",
    datumOnline: dagenGeleden(0),
    prijsBeoordeling: "Eerlijke prijs",
    btwAftrekbaar: false,
    financiering: false,
    video: false,
    fotos: fotos,
    omschrijving: textField("omschrijving"),
    eigenaarEmail: textField("email")
  };
}

// Toont alle ingevulde gegevens in het overzicht (stap 5)
function showSummary() {
  const car = buildCar();
  const rijen = [
    ["Auto", car.merk + " " + car.model + " " + car.versie],
    ["Eerste inschrijving", car.inschrijvingMaand + "/" + car.inschrijvingJaar],
    ["Kilometerstand", formatKm(car.km)],
    ["Brandstof", car.brandstof],
    ["Transmissie", car.transmissie],
    ["Carrosserie", car.carrosserie],
    ["Vermogen", car.pk + " pk"],
    ["Deuren / zitplaatsen", car.deuren + " / " + car.zitplaatsen],
    ["Kleur", car.kleur + (car.metaalkleur ? " (metaal)" : "")],
    ["Interieur", car.interieurKleur + ", " + car.bekleding],
    ["Aandrijving", car.aandrijving],
    ["Emissieklasse", car.emissieklasse],
    ["Uitrusting", car.uitrusting.length + " opties"],
    ["Foto's", car.fotos.length],
    ["Vraagprijs", formatPrijs(car.prijs)],
    ["Verkoper", car.verkoperNaam + " (" + car.aanbieder + ")"],
    ["Contact", car.eigenaarEmail + " · " + car.telefoon],
    ["Locatie", car.postcode + " " + car.gemeente]
  ];
  document.getElementById("summary").innerHTML = rijen.map(function (rij) {
    return "<div><dt>" + rij[0] + "</dt><dd>" + escapeHtml(rij[1]) + "</dd></div>";
  }).join("");
}

// Bewaart de advertentie in localStorage
function placeAd() {
  const car = buildCar();
  const eigen = loadList("av_userCars");
  eigen.push(car);
  saveData("av_userCars", eigen);

  document.getElementById("viewNewAd").href = "auto.html?id=" + car.id;
  showStep(6);
  showMyAds();
}

// ---------- Mijn advertenties ----------

// Lijst met de advertenties die in deze browser geplaatst zijn
function showMyAds() {
  const eigen = loadList("av_userCars");
  const sectie = document.getElementById("myAdsSection");
  sectie.hidden = eigen.length === 0;

  document.getElementById("myAds").innerHTML = eigen.map(function (car) {
    return `
      <article class="my-ad">
        <div class="my-ad__media">${photoHtml(carPhoto(car, 0, 300), car.merk + " " + car.model)}</div>
        <div class="my-ad__info">
          <h3>${escapeHtml(car.merk + " " + car.model)}</h3>
          <p>${car.inschrijvingJaar} · ${formatKm(car.km)} · ${car.brandstof}</p>
          <p class="price">${formatPrijs(car.prijs)}</p>
        </div>
        <div class="my-ad__actions">
          <a href="auto.html?id=${car.id}" class="btn btn--secondary btn--small">Bekijk</a>
          <button type="button" class="btn btn--danger btn--small" data-delete="${car.id}">Verwijderen</button>
        </div>
      </article>`;
  }).join("");
}

// Verwijdert een eigen advertentie (na bevestiging)
function deleteAd(id) {
  if (!confirm("Ben je zeker dat je deze advertentie wilt verwijderen?")) {
    return;
  }
  const eigen = loadList("av_userCars").filter(function (car) {
    return car.id !== id;
  });
  saveData("av_userCars", eigen);
  showMyAds();
  showToast("Advertentie verwijderd");
}

// ---------- Opstarten ----------
buildSellSelects();
buildEquipment();
buildPhotoInputs();
showMyAds();

// Als je ingelogd bent, vullen we je naam en e-mail alvast in
const ingelogd = getCurrentUser();
if (ingelogd) {
  sellForm.elements.verkoperNaam.value = ingelogd.voornaam + " " + ingelogd.achternaam;
  sellForm.elements.email.value = ingelogd.email;
}

sellForm.elements.merk.addEventListener("change", updateModelSuggestions);

// Volgende: eerst controleren, dan verder
nextBtn.addEventListener("click", function () {
  if (currentStep === 5) {
    placeAd();
    return;
  }
  if (!validateStep(currentStep)) {
    return;
  }
  if (currentStep === 4) {
    showSummary();
  }
  showStep(currentStep + 1);
});

prevBtn.addEventListener("click", function () {
  showStep(currentStep - 1);
});

// Enter in een veld = volgende stap (en niet de pagina herladen)
sellForm.addEventListener("submit", function (event) {
  event.preventDefault();
  nextBtn.click();
});

// Fout weghalen zodra je een veld aanpast
sellForm.addEventListener("input", function (event) {
  if (event.target.closest(".field.invalid")) {
    setFieldError(event.target, "");
  }

  // Voorbeeld van een foto tonen zodra je een link plakt
  if (event.target.name === "foto") {
    const voorbeeld = document.getElementById(event.target.dataset.preview);
    const link = event.target.value.trim();
    voorbeeld.innerHTML = link.indexOf("http") === 0 ? '<img src="' + escapeHtml(link) + '" alt="Voorbeeld">' : placeholderHtml();
  }

  // Tekenteller van de omschrijving
  if (event.target.name === "omschrijving") {
    document.getElementById("charCount").textContent = event.target.value.length + " / 1000";
  }
});

// Klik op "Verwijderen" bij een eigen advertentie
document.getElementById("myAds").addEventListener("click", function (event) {
  const knop = event.target.closest("[data-delete]");
  if (knop) {
    deleteAd(Number(knop.dataset.delete));
  }
});
