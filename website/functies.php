<?php
$paginaTitel = 'Functies';
$headerLicht = true;
require __DIR__ . '/includes/header.php';

/* Filters uit de URL (werkt ook zonder JavaScript) */
$gekozenCategorie  = $_GET['categorie'] ?? 'alle';
$gekozenPrioriteit = $_GET['prioriteit'] ?? 'alle';
$zoekterm          = trim($_GET['zoek'] ?? '');

if (!isset($categorieen[$gekozenCategorie]))   $gekozenCategorie = 'alle';
if (!isset($prioriteiten[$gekozenPrioriteit])) $gekozenPrioriteit = 'alle';

function past(array $f, string $cat, string $prio, string $zoek): bool
{
    if ($cat !== 'alle' && $f['categorie'] !== $cat) return false;
    if ($prio !== 'alle' && $f['prioriteit'] !== $prio) return false;
    if ($zoek !== '' && mb_stripos($f['titel'] . ' ' . $f['tekst'], $zoek) === false) return false;
    return true;
}

$aantal = count(array_filter($functies, fn($f) => past($f, $gekozenCategorie, $gekozenPrioriteit, $zoekterm)));
?>

<section class="paginakop">
  <div class="container">
    <p class="eyebrow">Functies</p>
    <h1 class="titel titel--groot" data-woorden>Alles wat <span class="groen">FitApp</span> kan</h1>
    <p class="paginakop__tekst">Van je eerste set tot je nieuwste record. Filter op categorie of prioriteit, of zoek een functie op naam.</p>
  </div>
</section>

<section class="sectie sectie--compact">
  <div class="container">
    <form class="filters" method="get" action="functies.php" data-filters>
      <fieldset class="filters__groep">
        <legend class="eyebrow">Categorie</legend>
        <div class="chips">
          <label class="chip"><input type="radio" name="categorie" value="alle" <?= $gekozenCategorie === 'alle' ? 'checked' : '' ?>><span>Alle</span></label>
          <?php foreach ($categorieen as $sleutel => $label): ?>
            <label class="chip"><input type="radio" name="categorie" value="<?= e($sleutel) ?>" <?= $gekozenCategorie === $sleutel ? 'checked' : '' ?>><span><?= e($label) ?></span></label>
          <?php endforeach; ?>
        </div>
      </fieldset>

      <fieldset class="filters__groep">
        <legend class="eyebrow">Prioriteit</legend>
        <div class="chips">
          <label class="chip"><input type="radio" name="prioriteit" value="alle" <?= $gekozenPrioriteit === 'alle' ? 'checked' : '' ?>><span>Alle</span></label>
          <?php foreach ($prioriteiten as $sleutel => $label): ?>
            <label class="chip"><input type="radio" name="prioriteit" value="<?= e($sleutel) ?>" <?= $gekozenPrioriteit === $sleutel ? 'checked' : '' ?>><span><?= e($label) ?></span></label>
          <?php endforeach; ?>
        </div>
      </fieldset>

      <div class="filters__zoek">
        <label class="eyebrow" for="zoek">Zoeken</label>
        <div class="zoekveld">
          <?= icoon('search') ?>
          <input type="search" id="zoek" name="zoek" value="<?= e($zoekterm) ?>" placeholder="Bv. timer, barcode, grafiek">
        </div>
        <button class="btn btn--donker filters__knop" type="submit">Filter</button>
      </div>
    </form>

    <p class="filters__teller" aria-live="polite"><span data-teller><?= $aantal ?></span> functies gevonden</p>

    <div class="functies" data-functies>
      <?php foreach ($functies as $f): ?>
        <article class="functie" data-categorie="<?= e($f['categorie']) ?>" data-prioriteit="<?= e($f['prioriteit']) ?>"<?= past($f, $gekozenCategorie, $gekozenPrioriteit, $zoekterm) ? '' : ' hidden' ?>>
          <div class="functie__top">
            <span class="functie__icoon"><?= icoon($f['icoon']) ?></span>
            <span class="tag tag--<?= e($f['prioriteit']) ?>"><?= e($prioriteiten[$f['prioriteit']]) ?></span>
          </div>
          <h3 class="functie__titel"><?= e($f['titel']) ?></h3>
          <p><?= e($f['tekst']) ?></p>
          <p class="functie__cat"><?= e($categorieen[$f['categorie']]) ?></p>
        </article>
      <?php endforeach; ?>
    </div>

    <p class="leeg" data-leeg<?= $aantal ? ' hidden' : '' ?>>Geen functies gevonden. Probeer een andere zoekterm of zet de filters op "Alle".</p>
  </div>
</section>

<section class="sectie sectie--donker">
  <div class="container split">
    <div class="split__tekst reveal">
      <p class="eyebrow">Must, should, could</p>
      <h2 class="titel">Wat betekent <span class="outline">prioriteit?</span></h2>
      <p>Bij het plannen van de app heb ik elke functie een prioriteit gegeven. <strong>Must have</strong> zit zeker in de eerste versie. <strong>Should have</strong> komt erbij als er tijd is. <strong>Could have</strong> zijn ideeën voor later.</p>
      <a class="btn btn--rood" href="gids.php">Bekijk de gids</a>
    </div>
    <div class="split__media split__media--phone reveal"><?= mockup('voortgang') ?></div>
  </div>
</section>

<?php require __DIR__ . '/includes/footer.php'; ?>
