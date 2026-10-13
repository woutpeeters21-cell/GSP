// =====================================================================
// contact.js – contactformulier controleren + openingsuren
// =====================================================================

const contactForm = document.getElementById("contactForm");

// Markeert de rij van vandaag in de openingsuren (0 = zondag, 1 = maandag, ...)
function highlightToday() {
  const vandaag = new Date().getDay();
  const rij = document.querySelector('#hours tr[data-day="' + vandaag + '"]');
  if (rij) {
    rij.classList.add("today");
    rij.cells[0].textContent += " (vandaag)";
  }
}

// Controleert het formulier bij het verzenden
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const velden = contactForm.elements;
  let ok = true;

  // Controleer een veld; bij een fout onthouden we dat het formulier niet klopt
  function check(input, melding) {
    setFieldError(input, melding);
    if (melding) ok = false;
  }

  check(velden.naam, velden.naam.value.trim() ? "" : "Vul je naam in.");
  check(velden.email, isEmail(velden.email.value.trim()) ? "" : "Vul een geldig e-mailadres in.");
  const telefoon = velden.telefoon.value.trim();
  check(velden.telefoon, telefoon === "" || telefoon.replace(/\D/g, "").length >= 9 ? "" : "Vul een geldig telefoonnummer in.");
  check(velden.onderwerp, velden.onderwerp.value ? "" : "Kies een onderwerp.");
  check(velden.bericht, velden.bericht.value.trim().length >= 10 ? "" : "Schrijf een bericht van minstens 10 tekens.");

  const succes = document.getElementById("contactSuccess");
  if (!ok) {
    succes.hidden = true;
    contactForm.querySelector(".field.invalid input, .field.invalid select, .field.invalid textarea").focus();
    return;
  }
  succes.hidden = false;
  contactForm.reset();
});

// Fout weghalen zodra je een veld aanpast
contactForm.addEventListener("input", function (event) {
  if (event.target.closest(".field.invalid")) {
    setFieldError(event.target, "");
  }
});

highlightToday();
