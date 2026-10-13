// =====================================================================
// auth.js – registreren en inloggen (demo zonder server)
// Accounts worden in localStorage bewaard (sleutel av_users).
// LET OP: in een echte website bewaar je wachtwoorden NOOIT zo.
// Dan gebeurt dit op een server, versleuteld. Hier is het enkel een demo.
// =====================================================================

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

// Knopje met het oog: wachtwoord tonen of verbergen
document.querySelectorAll("[data-toggle]").forEach(function (knop) {
  knop.addEventListener("click", function () {
    const input = document.getElementById(knop.dataset.toggle);
    const tonen = input.type === "password";
    input.type = tonen ? "text" : "password";
    knop.setAttribute("aria-label", tonen ? "Wachtwoord verbergen" : "Wachtwoord tonen");
  });
});

// Ben je al ingelogd? Dan is deze pagina niet nodig.
if (getSession() && (registerForm || loginForm)) {
  showToast('Je bent al ingelogd. <a href="index.html">Naar home</a>');
}

// ---------- Registreren ----------
if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const velden = registerForm.elements;
    const voornaam = velden.voornaam.value.trim();
    const achternaam = velden.achternaam.value.trim();
    const email = velden.email.value.trim().toLowerCase();
    const wachtwoord = velden.wachtwoord.value;
    const users = loadList("av_users");
    let ok = true;

    // Controleer een veld; bij een fout onthouden we dat het formulier niet klopt
    function check(input, melding) {
      setFieldError(input, melding);
      if (melding) ok = false;
    }

    check(velden.voornaam, voornaam ? "" : "Vul je voornaam in.");
    check(velden.achternaam, achternaam ? "" : "Vul je achternaam in.");

    if (!isEmail(email)) {
      check(velden.email, "Vul een geldig e-mailadres in.");
    } else if (users.some(function (u) { return u.email === email; })) {
      check(velden.email, "Er bestaat al een account met dit e-mailadres.");
    } else {
      check(velden.email, "");
    }

    // Wachtwoord: minstens 8 tekens en minstens 1 cijfer
    check(velden.wachtwoord, wachtwoord.length >= 8 && /\d/.test(wachtwoord) ? "" : "Minstens 8 tekens met minstens 1 cijfer.");
    check(velden.wachtwoord2, velden.wachtwoord2.value === wachtwoord && wachtwoord ? "" : "De wachtwoorden zijn niet gelijk.");
    check(velden.akkoord, velden.akkoord.checked ? "" : "Je moet akkoord gaan met de voorwaarden.");

    if (!ok) {
      registerForm.querySelector(".field.invalid input").focus();
      return;
    }

    users.push({ voornaam: voornaam, achternaam: achternaam, email: email, wachtwoord: wachtwoord });
    saveData("av_users", users);
    // Meteen ingelogd na registreren
    localStorage.setItem("av_session", email);
    window.location.href = "index.html";
  });
}

// ---------- Inloggen ----------
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const velden = loginForm.elements;
    const email = velden.email.value.trim().toLowerCase();
    const wachtwoord = velden.wachtwoord.value;
    const fout = document.getElementById("loginError");

    setFieldError(velden.email, isEmail(email) ? "" : "Vul een geldig e-mailadres in.");
    setFieldError(velden.wachtwoord, wachtwoord ? "" : "Vul je wachtwoord in.");
    if (!isEmail(email) || !wachtwoord) {
      return;
    }

    const user = loadList("av_users").find(function (u) {
      return u.email === email && u.wachtwoord === wachtwoord;
    });

    if (!user) {
      fout.hidden = false;
      return;
    }
    fout.hidden = true;
    localStorage.setItem("av_session", user.email);
    window.location.href = "index.html";
  });
}
