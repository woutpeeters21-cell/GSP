<?php
$paginaTitel = 'Gids';
$headerLicht = true;
require __DIR__ . '/includes/header.php';
?>

<section class="paginakop">
  <div class="container">
    <p class="eyebrow">Gids</p>
    <h1 class="titel titel--groot" data-woorden>Zo werkt <span class="groen">FitApp</span></h1>
    <p class="paginakop__tekst">In 5 stappen van download naar je eerste persoonlijke record.</p>
    <ol class="stappen-nav">
      <?php foreach ($stappen as $i => $s): ?>
        <li><a href="#stap-<?= $i + 1 ?>"><span><?= str_pad($i + 1, 2, '0', STR_PAD_LEFT) ?></span><?= e($s['titel']) ?></a></li>
      <?php endforeach; ?>
    </ol>
  </div>
</section>

<?php foreach ($stappen as $i => $s): ?>
<section class="sectie stap <?= $i % 2 ? 'sectie--licht' : '' ?>" id="stap-<?= $i + 1 ?>">
  <div class="container split <?= $i % 2 ? 'split--omgekeerd' : '' ?>">
    <div class="split__tekst reveal">
      <p class="stap__nummer"><?= str_pad($i + 1, 2, '0', STR_PAD_LEFT) ?></p>
      <p class="eyebrow">Stap <?= $i + 1 ?> van <?= count($stappen) ?></p>
      <h2 class="titel"><?= e($s['titel']) ?></h2>
      <p><?= e($s['tekst']) ?></p>
    </div>
    <div class="split__media split__media--phone reveal"><?= mockup($s['mockup']) ?></div>
  </div>
</section>
<?php endforeach; ?>

<section class="sectie sectie--donker">
  <div class="container faq-grid">
    <div class="reveal">
      <p class="eyebrow">Veelgestelde vragen</p>
      <h2 class="titel">Nog <span class="outline">vragen?</span></h2>
      <p>Staat je vraag er niet bij? Stuur ons een bericht.</p>
      <a class="btn btn--rood" href="contact.php">Contact</a>
    </div>
    <div class="faq reveal">
      <?php foreach ($faq as $v): ?>
        <details class="faq__item">
          <summary><?= e($v['vraag']) ?><span class="faq__plus" aria-hidden="true"></span></summary>
          <p><?= e($v['antwoord']) ?></p>
        </details>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php require __DIR__ . '/includes/footer.php'; ?>
