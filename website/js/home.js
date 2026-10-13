// =====================================================================
// home.js – startpagina
// - snelzoeken (merk, model, max. prijs, bouwjaar) met live aantal
// - de 8 nieuwste auto's
// - aantal auto's per merk op de merktegels
// =====================================================================

const homeCars = getAllCars();

const qsForm = document.getElementById("quickSearch");
const qsMerk = document.getElementById("qsMerk");
const qsModel = document.getElementById("qsModel");
const qsPrijs = document.getElementById("qsPrijs");
const qsJaar = document.getElementById("qsJaar");
const qsSubmit = document.getElementById("qsSubmit");

// Voegt een <option> toe aan een <select>
function addOption(select, value, text) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = text;
  select.appendChild(option);
}

// Lijst zonder dubbels, alfabetisch gesorteerd
function uniqueSorted(lijst) {
  return lijst.filter(function (item, index) {
    return lijst.indexOf(item) === index;
  }).sort();
}

// Vult de dropdowns van het snelzoeken
function fillQuickSearch() {
  const merken = uniqueSorted(homeCars.map(function (car) { return car.merk; }));
  merken.forEach(function (merk) {
    addOption(qsMerk, merk, merk);
  });

  [5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 75000, 100000].forEach(function (prijs) {
    addOption(qsPrijs, prijs, formatPrijs(prijs));
  });

  const ditJaar = new Date().getFullYear();
  for (let jaar = ditJaar; jaar >= 2005; jaar--) {
    addOption(qsJaar, jaar, jaar);
  }
}

// Vult de modellen van het gekozen merk (of zet de lijst uit als er geen merk is)
function fillModels() {
  qsModel.innerHTML = '<option value="">Alle modellen</option>';
  if (!qsMerk.value) {
    qsModel.disabled = true;
    return;
  }
  const modellen = uniqueSorted(homeCars
    .filter(function (car) { return car.merk === qsMerk.value; })
    .map(function (car) { return car.model; }));
  modellen.forEach(function (model) {
    addOption(qsModel, model, model);
  });
  qsModel.disabled = false;
}

// Telt hoeveel auto's passen bij het snelzoeken en zet dat op de knop
function updateCount() {
  const aantal = homeCars.filter(function (car) {
    if (qsMerk.value && car.merk !== qsMerk.value) return false;
    if (qsModel.value && car.model !== qsModel.value) return false;
    if (qsPrijs.value && car.prijs > Number(qsPrijs.value)) return false;
    if (qsJaar.value && car.inschrijvingJaar < Number(qsJaar.value)) return false;
    return true;
  }).length;
  qsSubmit.textContent = "Toon " + aantal + (aantal === 1 ? " auto" : " auto's");
}

// Bij het zoeken: lege velden weglaten, zodat de link kort en netjes blijft
function submitQuickSearch(event) {
  event.preventDefault();
  const params = new URLSearchParams();
  [qsMerk, qsModel, qsPrijs, qsJaar].forEach(function (select) {
    if (select.value) {
      params.set(select.name, select.value);
    }
  });
  window.location.href = "aanbod.html" + (params.toString() ? "?" + params.toString() : "");
}

// Toont de 8 nieuwste advertenties
function showNewest() {
  const nieuwste = homeCars.slice().sort(function (a, b) {
    return new Date(b.datumOnline) - new Date(a.datumOnline);
  }).slice(0, 8);
  document.getElementById("newestGrid").innerHTML = nieuwste.map(createCarCard).join("");
}

// Zet onder elk merk hoeveel auto's we ervan hebben
function showBrandCounts() {
  document.querySelectorAll("[data-brand-count]").forEach(function (label) {
    const aantal = homeCars.filter(function (car) {
      return car.merk === label.dataset.brandCount;
    }).length;
    label.textContent = aantal + (aantal === 1 ? " auto" : " auto's");
  });
}

// ---------- Opstarten ----------
fillQuickSearch();
updateCount();
showNewest();
showBrandCounts();

qsMerk.addEventListener("change", function () {
  fillModels();
  updateCount();
});
qsModel.addEventListener("change", updateCount);
qsPrijs.addEventListener("change", updateCount);
qsJaar.addEventListener("change", updateCount);
qsForm.addEventListener("submit", submitQuickSearch);
