/* FitApp — basis JavaScript, geen libraries */
document.addEventListener('DOMContentLoaded', function () {
  var minderBeweging = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header donker bij scrollen ---------- */
  var header = document.querySelector('[data-header]');
  function checkScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  checkScroll();
  window.addEventListener('scroll', checkScroll, { passive: true });

  /* ---------- Hamburgermenu ---------- */
  var burger = document.querySelector('[data-burger]');
  var nav = document.querySelector('[data-nav]');
  function zetMenu(open) {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
    document.body.classList.toggle('menu-open', open);
  }
  burger.addEventListener('click', function () {
    zetMenu(!nav.classList.contains('is-open'));
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') zetMenu(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 960) zetMenu(false);
  });

  /* ---------- Titel woord per woord ---------- */
  document.querySelectorAll('[data-woorden]').forEach(function (titel) {
    if (minderBeweging) return;
    var teller = 0;
    function splits(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (kind) {
        if (kind.nodeType === 3) {
          var fragment = document.createDocumentFragment();
          kind.textContent.split(/(\s+)/).forEach(function (deel) {
            if (deel.trim() === '') {
              fragment.appendChild(document.createTextNode(deel));
            } else {
              var span = document.createElement('span');
              span.className = 'woord';
              span.style.setProperty('--i', teller++);
              span.textContent = deel;
              fragment.appendChild(span);
            }
          });
          node.replaceChild(fragment, kind);
        } else if (kind.nodeType === 1) {
          splits(kind);
        }
      });
    }
    splits(titel);
  });

  /* ---------- Secties schuiven in beeld ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !minderBeweging) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-zichtbaar');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-zichtbaar'); });
  }

  /* ---------- Cijfers tellen op ---------- */
  var tellers = document.querySelectorAll('[data-tel]');
  if ('IntersectionObserver' in window && !minderBeweging) {
    var telObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var doel = parseInt(el.getAttribute('data-tel'), 10);
        var start = null;
        function stap(tijd) {
          if (!start) start = tijd;
          var p = Math.min((tijd - start) / 900, 1);
          el.textContent = Math.round(doel * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(stap);
        }
        requestAnimationFrame(stap);
        telObserver.unobserve(el);
      });
    }, { threshold: 0.6 });
    tellers.forEach(function (el) { telObserver.observe(el); });
  }

  /* ---------- Rusttimer in de workout-mockup ---------- */
  document.querySelectorAll('[data-timer]').forEach(function (el) {
    if (minderBeweging) return;
    var seconden = 84;
    setInterval(function () {
      seconden = seconden > 0 ? seconden - 1 : 90;
      var m = Math.floor(seconden / 60);
      var s = seconden % 60;
      el.textContent = '0' + m + ':' + (s < 10 ? '0' : '') + s;
    }, 1000);
  });

  /* ---------- Filters op de pagina Functies ---------- */
  var form = document.querySelector('[data-filters]');
  if (form) {
    var kaarten = document.querySelectorAll('[data-functies] .functie');
    var teller = document.querySelector('[data-teller]');
    var leeg = document.querySelector('[data-leeg]');

    function filter() {
      var categorie = form.querySelector('input[name="categorie"]:checked').value;
      var prioriteit = form.querySelector('input[name="prioriteit"]:checked').value;
      var zoek = form.querySelector('input[name="zoek"]').value.trim().toLowerCase();
      var aantal = 0;

      kaarten.forEach(function (kaart) {
        var tekst = kaart.textContent.toLowerCase();
        var past =
          (categorie === 'alle' || kaart.dataset.categorie === categorie) &&
          (prioriteit === 'alle' || kaart.dataset.prioriteit === prioriteit) &&
          (zoek === '' || tekst.indexOf(zoek) !== -1);
        kaart.hidden = !past;
        if (past) aantal++;
      });

      teller.textContent = aantal;
      leeg.hidden = aantal > 0;

      /* URL bijwerken zodat je een filter kan delen */
      var params = new URLSearchParams();
      if (categorie !== 'alle') params.set('categorie', categorie);
      if (prioriteit !== 'alle') params.set('prioriteit', prioriteit);
      if (zoek) params.set('zoek', zoek);
      var query = params.toString();
      history.replaceState(null, '', location.pathname + (query ? '?' + query : ''));
    }

    form.addEventListener('change', filter);
    form.addEventListener('input', filter);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      filter();
    });
  }
});
