// =====================================================================
// favorites.js – pagina met de bewaarde auto's
// =====================================================================

const favContent = document.getElementById("favContent");

// Toont de favorieten (of een melding als je niet ingelogd bent / niets bewaard hebt)
function showFavorites() {
  if (!getSession()) {
    favContent.innerHTML =
      '<div class="empty-state">' + icons.heart +
      "<h3>Log in om je favorieten te bekijken</h3>" +
      '<p class="muted">Met een gratis account bewaar je de auto\'s die je leuk vindt.</p>' +
      '<a href="inloggen.html" class="btn btn--primary">Inloggen</a></div>';
    return;
  }

  const favorieten = getFavorites().map(findCar).filter(function (car) {
    return car !== undefined;   // auto's die intussen verwijderd zijn, laten we weg
  });

  if (favorieten.length === 0) {
    favContent.innerHTML =
      '<div class="empty-state"><h3>Je hebt nog geen favorieten.</h3>' +
      '<p class="muted">Klik op het hartje bij een auto om hem te bewaren.</p>' +
      '<a href="aanbod.html" class="btn btn--primary">Naar het aanbod</a></div>';
    return;
  }

  favContent.innerHTML = '<div class="car-grid car-grid--3">' + favorieten.map(createCarCard).join("") + "</div>";
}

showFavorites();
// Als je hier een hartje uitklikt, verdwijnt de auto meteen uit de lijst
document.addEventListener("favoritesChanged", showFavorites);
