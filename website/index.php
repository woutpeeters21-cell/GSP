<?php
$paginaTitel = 'Home';
require __DIR__ . '/includes/header.php';
?>

<!-- HERO -->
<section class="hero">
  <?= foto('hero', 'hero__foto') ?>
  <div class="container hero__inhoud">
    <p class="eyebrow eyebrow--licht">Fitness tracking voor elke sporter</p>
    <h1 class="hero__titel" data-woorden>Train slimmer. <span class="outline">Zie</span> je groei.</h1>
    <p class="hero__tekst">Met <?= e($site['naam']) ?> houd je je workouts, voeding en voortgang bij in 1 app. Geen notitieboekje meer in de gym.</p>
    <div class="knoppen">
      <a class="btn btn--rood" href="gids.php">Zo werkt het</a>
      <a class="btn btn--lijn" href="functies.php">Alle functies</a>
    </div>
  </div>
</section>

<div class="marquee" aria-hidden="true">
  <div class="marquee__track">
    <?php for ($i = 0; $i < 8; $i++): ?><span>Track</span><span>Train</span><span>Progress</span><?php endfor; ?>
  </div>
</div>

<!-- WAT IS FITAPP -->
<section class="sectie">
  <div class="container split">
    <div class="split__media reveal"><?= foto('wat') ?></div>
    <div class="split__tekst reveal">
      <p class="eyebrow">Wat is <?= e($site['naam']) ?>?</p>
      <h2 class="titel">Jouw <span class="groen">trainings&shy;dagboek</span> op zak</h2>
      <p><?= e($site['naam']) ?> is een fitness-tracking-app voor sporters die serieus willen vooruitgaan. Je logt elke set, je ziet wat je eet en je volgt je records in duidelijke grafieken.</p>
      <p>Of je nu spiermassa wil opbouwen, wil afvallen of sterker wil worden: de app past zich aan jouw doel, niveau en apparatuur aan.</p>
      <a class="link-pijl" href="over-ons.php">Lees meer over het project <?= icoon('arrow') ?></a>
    </div>
  </div>
</section>

<!-- KERNFUNCTIES -->
<section class="sectie sectie--licht">
  <div class="container">
    <div class="sectie__kop reveal">
      <p class="eyebrow">Kernfuncties</p>
      <h2 class="titel">Drie dingen. <span class="groen">Eén app.</span></h2>
    </div>
    <div class="kaarten">
      <?php foreach ($kernfuncties as $k): ?>
        <a class="kaart reveal" href="<?= e($k['link']) ?>">
          <?= foto($k['foto'], 'kaart__foto') ?>
          <div class="kaart__body">
            <h3 class="kaart__titel"><?= e($k['titel']) ?></h3>
            <p><?= e($k['tekst']) ?></p>
            <span class="link-pijl">Bekijk functies <?= icoon('arrow') ?></span>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- APP-SCHERMEN -->
<section class="sectie sectie--donker">
  <div class="container">
    <div class="sectie__kop sectie__kop--midden reveal">
      <p class="eyebrow">Een kijkje in de app</p>
      <h2 class="titel">Gemaakt voor <span class="outline">de gym</span></h2>
      <p class="sectie__intro">Grote knoppen, grote cijfers en hoog contrast. Zo log je een set in 3 tikken, ook tussen twee zware sets door.</p>
    </div>
    <div class="phones">
      <div class="phones__item reveal"><?= mockup('dashboard') ?><p class="phones__label">Dashboard</p></div>
      <div class="phones__item phones__item--midden reveal"><?= mockup('workout') ?><p class="phones__label">Actieve workout</p></div>
      <div class="phones__item reveal"><?= mockup('voeding') ?><p class="phones__label">Voedingsdagboek</p></div>
    </div>
  </div>
</section>

<!-- CHECKLIST -->
<section class="sectie">
  <div class="container split split--omgekeerd">
    <div class="split__tekst reveal">
      <p class="eyebrow">Alles in 1 app</p>
      <h2 class="titel">Alles wat je <span class="groen">nodig</span> hebt</h2>
      <ul class="checklist">
        <?php foreach ($checklist as $item): ?>
          <li><?= e($item) ?></li>
        <?php endforeach; ?>
      </ul>
      <a class="btn btn--donker" href="functies.php">Bekijk alle functies</a>
    </div>
    <div class="split__media reveal"><?= foto('over') ?></div>
  </div>
</section>

<!-- STATS -->
<section class="sectie sectie--licht">
  <div class="container">
    <div class="sectie__kop reveal">
      <p class="eyebrow">In cijfers</p>
      <h2 class="titel">Snel. Simpel. <span class="groen">Sterk.</span></h2>
    </div>
    <div class="stats">
      <?php foreach ($stats as $s): ?>
        <div class="stat reveal">
          <p class="stat__cijfer"><span data-tel="<?= (int) $s['cijfer'] ?>"><?= (int) $s['cijfer'] ?></span><?= e($s['suffix']) ?></p>
          <p class="stat__label"><?= e($s['label']) ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- REACTIES -->
<section class="sectie">
  <div class="container">
    <div class="sectie__kop reveal">
      <p class="eyebrow">Testgebruikers</p>
      <h2 class="titel">Wat ze <span class="groen">zeggen</span></h2>
    </div>
    <div class="reacties">
      <?php foreach ($reacties as $r): ?>
        <figure class="reactie reveal">
          <blockquote><?= e($r['tekst']) ?></blockquote>
          <figcaption>— <?= e($r['naam']) ?></figcaption>
        </figure>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta">
  <?= foto('cta', 'cta__foto') ?>
  <div class="container cta__inhoud reveal">
    <p class="eyebrow eyebrow--licht">Start vandaag</p>
    <h2 class="titel titel--groot">Begin je <span class="outline">fitness</span> verhaal</h2>
    <p class="cta__tekst">Maak je account, kies je doel en log je eerste workout. In de gids leggen we elke stap uit.</p>
    <a class="btn btn--rood" href="gids.php">Bekijk de gids</a>
  </div>
</section>

<?php require __DIR__ . '/includes/footer.php'; ?>
