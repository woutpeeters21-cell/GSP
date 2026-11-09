<?php
$paginaTitel = 'Over ons';
$headerLicht = true;
require __DIR__ . '/includes/header.php';
?>

<section class="paginakop">
  <div class="container">
    <p class="eyebrow">Over ons</p>
    <h1 class="titel titel--groot" data-woorden>Een app gemaakt <span class="groen">door een sporter</span></h1>
    <p class="paginakop__tekst"><?= e($site['naam']) ?> is mijn GSP-project in <?= e($site['klas']) ?> aan <?= e($site['school']) ?>.</p>
  </div>
</section>

<section class="sectie sectie--compact">
  <div class="container split">
    <div class="split__media reveal"><?= foto('over') ?></div>
    <div class="split__tekst reveal">
      <p class="eyebrow">Waarom deze app?</p>
      <h2 class="titel">Van notitieboekje naar <span class="groen">app</span></h2>
      <p>Als ik train, wil ik weten wat ik de vorige keer tilde. Bestaande apps zijn vaak te druk, kosten geld of tracken alleen training óf voeding.</p>
      <p>Daarom bouw ik een app die alles samenbrengt: workouts, voeding en voortgang, met een rustig en duidelijk design dat werkt in de gym.</p>
      <ul class="checklist">
        <li>Leerling <?= e($site['klas']) ?> — Applicatie- en databeheer</li>
        <li><?= e($site['school']) ?></li>
        <li>Thema: AI motion graphics design</li>
      </ul>
    </div>
  </div>
</section>

<section class="sectie sectie--licht">
  <div class="container">
    <div class="sectie__kop reveal">
      <p class="eyebrow">Het project</p>
      <h2 class="titel">Van idee tot <span class="groen">app</span></h2>
    </div>
    <ol class="tijdlijn">
      <?php foreach ($tijdlijn as $t): ?>
        <li class="tijdlijn__item reveal">
          <p class="tijdlijn__periode"><?= e($t['periode']) ?></p>
          <h3 class="kaart__titel"><?= e($t['titel']) ?></h3>
          <p><?= e($t['tekst']) ?></p>
        </li>
      <?php endforeach; ?>
    </ol>
  </div>
</section>

<section class="sectie sectie--donker">
  <div class="container">
    <div class="sectie__kop reveal">
      <p class="eyebrow">Technologie</p>
      <h2 class="titel">Gebouwd <span class="outline">zonder</span> frameworks</h2>
      <p class="sectie__intro">De website en de app zijn gebouwd met de basis van het web. De database wordt later gekoppeld.</p>
    </div>
    <ul class="tech">
      <?php foreach ($technologie as $t): ?>
        <li class="reveal"><?= e($t) ?></li>
      <?php endforeach; ?>
    </ul>
  </div>
</section>

<?php require __DIR__ . '/includes/footer.php'; ?>
