<?php
require_once __DIR__ . '/../data/data.php';
require_once __DIR__ . '/icons.php';
require_once __DIR__ . '/mockups.php';

$huidigePagina = basename($_SERVER['SCRIPT_NAME']);
$paginaTitel   = $paginaTitel ?? $site['naam'];
$headerLicht   = $headerLicht ?? false; // true = pagina zonder donkere hero
?>
<!DOCTYPE html>
<html lang="nl-BE">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= e($paginaTitel) ?> — <?= e($site['naam']) ?></title>
  <meta name="description" content="<?= e($site['naam']) ?>: de app om je workouts, voeding en voortgang bij te houden.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@1,125,800&family=Figtree:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css">
  <script>document.documentElement.classList.add('js');</script>
  <script src="assets/js/main.js" defer></script>
</head>
<body class="<?= $headerLicht ? 'page--licht' : '' ?>">
<a class="skip" href="#inhoud">Naar inhoud</a>

<header class="header" data-header>
  <div class="container header__inner">
    <a class="logo" href="index.php"><?= e(strtoupper($site['naam'])) ?></a>

    <nav class="nav" id="nav" data-nav aria-label="Hoofdnavigatie">
      <ul class="nav__list">
        <?php foreach ($navigatie as $bestand => $label): ?>
          <li><a href="<?= e($bestand) ?>" class="nav__link<?= $huidigePagina === $bestand ? ' is-actief' : '' ?>"<?= $huidigePagina === $bestand ? ' aria-current="page"' : '' ?>><?= e($label) ?></a></li>
        <?php endforeach; ?>
      </ul>
      <a class="btn btn--rood nav__cta" href="gids.php">Download</a>
    </nav>

    <button class="burger" type="button" aria-controls="nav" aria-expanded="false" aria-label="Menu openen" data-burger>
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<main id="inhoud">
