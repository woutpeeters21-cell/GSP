// =====================================================================
// main.js – code die op ELKE pagina nodig is
// - hulpfuncties (localStorage, prijzen, foto's, autokaart)
// - navbar, hamburgermenu, login-status, favorieten
// - fade-in bij scrollen en toast-meldingen
// Wordt geladen NA cars.js en VOOR het script van de pagina zelf.
// =====================================================================

// ---------- Icoontjes (SVG-code) die JavaScript nodig heeft ----------
const icons = {
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  car: '<svg viewBox="0 0 64 32" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 22v-4c0-2 1.5-3.5 3.5-4l8-1.5 7-6c1.5-1.2 3-1.5 5-1.5h10c2.5 0 4.5 1 6 2.5l6 5.5 6 1c2 .4 4.5 2 4.5 4.5V22c0 1-1 2-2 2h-3"/><path d="M14 24H4"/><path d="M48 24H22"/><circle cx="18" cy="24" r="4"/><circle cx="52" cy="24" r="4"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  road: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 21 8 3M20 21 16 3M12 5v2M12 11v2M12 17v2"/></svg>',
  fuel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18M2 22h14M7 7h4"/><path d="M15 10h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V8l-3-3"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="5" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><path d="M5 7v12M12 7v12M19 7v5H5"/></svg>',
  power: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>',
  left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
  right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>'
};

// ---------- localStorage ----------

// Leest een lijst uit localStorage; geeft een lege lijst als er niets is of als het mislukt
function loadList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    return [];
  }
}

// Leest een object uit localStorage; geeft een leeg object als er niets is
function loadObject(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || {};
  } catch (e) {
    return {};
  }
}

// Bewaart een lijst of object in localStorage (als tekst)
function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    showToast("Opslaan is niet gelukt in deze browser.");
  }
}

// ---------- Auto's ----------

// Alle auto's: de vaste lijst uit cars.js + de advertenties uit het verkoopformulier
function getAllCars() {
  return cars.concat(loadList("av_userCars"));
}

// Zoekt één auto op basis van zijn id (geeft undefined als hij niet bestaat)
function findCar(id) {
  return getAllCars().find(function (car) {
    return car.id === id;
  });
}

// ---------- Opmaak van getallen ----------

// 27400 -> "€ 27.400"
function formatPrijs(getal) {
  return "€ " + Number(getal).toLocaleString("nl-BE");
}

// 68500 -> "68.500 km"
function formatKm(getal) {
  return Number(getal).toLocaleString("nl-BE") + " km";
}

// Aantal dagen tussen een datum ("2026-10-01") en vandaag
function dagenSinds(datumTekst) {
  const verschil = new Date() - new Date(datumTekst);
  return Math.floor(verschil / (1000 * 60 * 60 * 24));
}

// Maakt tekst veilig om in innerHTML te zetten (tegen kapotte HTML of scripts in formulieren)
function escapeHtml(tekst) {
  return String(tekst)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---------- Foto's ----------

// Geeft de link van foto nummer 'index' van een auto, in de gevraagde breedte.
// Bij Pexels passen we 'w=' in de link aan, zo laadt een kaart een kleinere foto.
function carPhoto(car, index, breedte) {
  const link = car.fotos && car.fotos[index];
  if (!link) {
    return "";
  }
  if (link.indexOf("images.pexels.com") !== -1 && link.indexOf("w=") !== -1) {
    return link.replace(/w=\d+/, "w=" + breedte);
  }
  return link;
}

// HTML van het grijze vak "Foto auto"
function placeholderHtml() {
  return '<div class="photo-placeholder">' + icons.car + "<span>Foto auto</span></div>";
}

// HTML van een foto, of het grijze vak als er geen link is
function photoHtml(link, alt) {
  if (!link) {
    return placeholderHtml();
  }
  return '<img src="' + escapeHtml(link) + '" alt="' + escapeHtml(alt) + '" loading="lazy">';
}

// Als een foto niet laadt (kapotte link), vervangen we ze door het grijze vak.
// 'true' = we luisteren in de capture-fase, want het error-event 'bubbelt' niet.
function setupImageFallback() {
  document.addEventListener("error", function (event) {
    const img = event.target;
    if (img.tagName === "IMG" && !img.classList.contains("no-fallback")) {
      const vak = document.createElement("div");
      vak.className = "photo-placeholder";
      vak.innerHTML = icons.car + "<span>Foto auto</span>";
      img.replaceWith(vak);
    }
  }, true);
}

// Zet de foto's uit 'siteFotos' (cars.js) als achtergrond op elementen met data-site-foto
function applySiteFotos() {
  document.querySelectorAll("[data-site-foto]").forEach(function (element) {
    const link = siteFotos[element.dataset.siteFoto];
    if (link) {
      // Bij een hero laten we de donkere laag (::before) erover vallen
      element.style.backgroundImage = "url('" + link + "')";
      element.classList.add("has-photo");
    }
  });

  // Ronde foto's (team): als er een link is, vervangen we de initialen door de foto
  document.querySelectorAll("[data-site-avatar]").forEach(function (element) {
    const link = siteFotos[element.dataset.siteAvatar];
    if (link) {
      element.innerHTML = '<img src="' + link + '" alt="' + element.getAttribute("aria-label") + '" class="no-fallback">';
    }
  });
}

// ---------- Autokaart ----------

// Maakt de HTML van één autokaart. Wordt gebruikt op home, aanbod, detail en favorieten.
function createCarCard(car) {
  const naam = car.merk + " " + car.model;
  const fav = isFavorite(car.id);

  // Badge: "Nieuw" als de advertentie max. 7 dagen online staat, anders de prijsbeoordeling
  let badge = "";
  if (dagenSinds(car.datumOnline) <= 7) {
    badge = '<span class="badge badge--orange">Nieuw</span>';
  } else if (car.prijsBeoordeling === "Topprijs" || car.prijsBeoordeling === "Goede prijs") {
    badge = '<span class="badge badge--green">' + car.prijsBeoordeling + "</span>";
  }

  return `
    <article class="car-card">
      <a class="car-card__link" href="auto.html?id=${car.id}">
        <div class="car-card__media">
          ${photoHtml(carPhoto(car, 0, 600), naam)}
          ${badge}
        </div>
        <div class="car-card__body">
          <h3>${escapeHtml(naam)}</h3>
          <p class="car-card__version">${escapeHtml(car.versie)}</p>
          <p class="car-card__meta">${car.inschrijvingJaar} · ${formatKm(car.km)} · ${car.brandstof}</p>
          <p class="car-card__meta">${car.transmissie} · ${car.pk} pk</p>
          <p class="car-card__place">${escapeHtml(car.gemeente)}</p>
          <div class="car-card__bottom">
            <span class="price">${formatPrijs(car.prijs)}</span>
            <span class="car-card__more">Bekijk</span>
          </div>
        </div>
      </a>
      <button type="button" class="fav-btn${fav ? " active" : ""}" data-fav="${car.id}"
        aria-pressed="${fav}" aria-label="${escapeHtml(naam)} bewaren als favoriet">${icons.heart}</button>
    </article>`;
}

// ---------- Login ----------

// E-mail van de ingelogde gebruiker, of "" als niemand ingelogd is
function getSession() {
  try {
    return localStorage.getItem("av_session") || "";
  } catch (e) {
    return "";
  }
}

// Het gebruiker-object van wie ingelogd is (of null)
function getCurrentUser() {
  const email = getSession();
  if (!email) {
    return null;
  }
  const user = loadList("av_users").find(function (u) {
    return u.email === email;
  });
  return user || null;
}

// Toont "Inloggen" of "Hallo, Jan + Uitloggen" in de navbar
function setupAuthNav() {
  const plek = document.querySelector(".nav-auth");
  if (!plek) {
    return;
  }
  const user = getCurrentUser();
  if (user) {
    plek.innerHTML =
      '<span class="nav-hello">Hallo, <strong>' + escapeHtml(user.voornaam) + "</strong></span>" +
      '<button type="button" class="btn btn--secondary btn--small nav-btn" id="logoutBtn">' + icons.logout +
      '<span class="nav-btn-text">Uitloggen</span></button>';
    document.getElementById("logoutBtn").addEventListener("click", function () {
      localStorage.removeItem("av_session");
      window.location.href = "index.html";
    });
  }
}

// ---------- Favorieten ----------

// Lijst met id's van de favorieten van de ingelogde gebruiker
function getFavorites() {
  const email = getSession();
  if (!email) {
    return [];
  }
  const alle = loadObject("av_favorites");
  return alle[email] || [];
}

// Is deze auto een favoriet?
function isFavorite(id) {
  return getFavorites().indexOf(id) !== -1;
}

// Zet een auto bij de favorieten of haalt hem eruit.
// Geeft true (toegevoegd), false (verwijderd) of null (niet ingelogd).
function toggleFavorite(id) {
  const email = getSession();
  if (!email) {
    return null;
  }
  const alle = loadObject("av_favorites");
  const lijst = alle[email] || [];
  const plaats = lijst.indexOf(id);
  if (plaats === -1) {
    lijst.push(id);
  } else {
    lijst.splice(plaats, 1);
  }
  alle[email] = lijst;
  saveData("av_favorites", alle);
  updateFavCount();
  return plaats === -1;
}

// Zet het aantal favorieten in het oranje bolletje in de navbar
function updateFavCount() {
  const bolletje = document.querySelector(".fav-count");
  if (!bolletje) {
    return;
  }
  const aantal = getFavorites().length;
  bolletje.textContent = aantal;
  bolletje.hidden = aantal === 0;
}

// Eén klik-luisteraar voor ALLE hartjes op de pagina (ook kaarten die later bijkomen)
function setupFavButtons() {
  document.addEventListener("click", function (event) {
    const knop = event.target.closest("[data-fav]");
    if (!knop) {
      return;
    }
    event.preventDefault();
    const id = Number(knop.dataset.fav);
    const resultaat = toggleFavorite(id);

    if (resultaat === null) {
      showToast('Log in om favorieten te bewaren. <a href="inloggen.html">Inloggen</a>');
      return;
    }

    // Alle hartjes van deze auto aanpassen (kan er meer dan één zijn op een pagina)
    document.querySelectorAll('[data-fav="' + id + '"]').forEach(function (hartje) {
      hartje.classList.toggle("active", resultaat);
      hartje.setAttribute("aria-pressed", resultaat);
      hartje.classList.remove("pop");
      void hartje.offsetWidth; // trucje: zo start de animatie opnieuw
      hartje.classList.add("pop");
    });

    showToast(resultaat ? "Bewaard bij je favorieten" : "Verwijderd uit je favorieten");
    // Laat andere scripts (bv. favorieten.html) weten dat er iets veranderd is
    document.dispatchEvent(new CustomEvent("favoritesChanged"));
  });
}

// ---------- Navbar ----------

// Navbar wordt iets donkerder als je meer dan 50px gescrold hebt
function setupNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) {
    return;
  }
  function check() {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }
  window.addEventListener("scroll", check);
  check();
}

// Hamburgermenu openen en sluiten (op gsm)
function setupHamburger() {
  const knop = document.querySelector(".hamburger");
  const menu = document.getElementById("navMenu");
  if (!knop || !menu) {
    return;
  }

  function zetOpen(open) {
    menu.classList.toggle("open", open);
    knop.setAttribute("aria-expanded", open);
    knop.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
  }

  knop.addEventListener("click", function () {
    zetOpen(!menu.classList.contains("open"));
  });

  // Klik op een link sluit het menu
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      zetOpen(false);
    });
  });

  // Escape sluit het menu
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menu.classList.contains("open")) {
      zetOpen(false);
      knop.focus();
    }
  });
}

// ---------- Fade-in bij scrollen ----------

// Elementen met class "reveal" krijgen class "visible" als ze in beeld komen (één keer)
function setupReveal() {
  const elementen = document.querySelectorAll(".reveal");

  // Oude browser zonder IntersectionObserver: meteen alles tonen
  if (!("IntersectionObserver" in window)) {
    elementen.forEach(function (el) {
      el.classList.add("visible");
    });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elementen.forEach(function (el) {
    observer.observe(el);
  });
}

// ---------- Toast-melding ----------

let toastTimer;

// Toont rechtsonder een korte melding die na 3 seconden verdwijnt.
// Let op: 'html' mag een link bevatten, dus nooit tekst van een gebruiker meegeven.
function showToast(html) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.innerHTML = html;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}

// ---------- Formulieren ----------

// Zet een veld op fout (rode rand + melding) of haalt de fout weg
function setFieldError(input, melding) {
  const veld = input.closest(".field");
  if (!veld) {
    return;
  }
  let foutTekst = veld.querySelector(".error-msg");
  if (!foutTekst) {
    foutTekst = document.createElement("span");
    foutTekst.className = "error-msg";
    veld.appendChild(foutTekst);
  }
  if (melding) {
    veld.classList.add("invalid");
    foutTekst.textContent = melding;
    input.setAttribute("aria-invalid", "true");
  } else {
    veld.classList.remove("invalid");
    foutTekst.textContent = "";
    input.removeAttribute("aria-invalid");
  }
}

// Eenvoudige controle van een e-mailadres: iets@iets.iets
function isEmail(tekst) {
  const apenstaart = tekst.indexOf("@");
  return apenstaart > 0 && tekst.lastIndexOf(".") > apenstaart + 1 && tekst.indexOf(" ") === -1;
}

// ---------- Opstarten ----------
setupImageFallback();
applySiteFotos();
setupNavbarScroll();
setupHamburger();
setupAuthNav();
updateFavCount();
setupFavButtons();
setupReveal();
