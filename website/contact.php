<?php
$paginaTitel = 'Contact';
$headerLicht = true;
require __DIR__ . '/includes/header.php';

/* Formulier verwerken. Er wordt (nog) niets opgeslagen: geen database. */
$waarden  = ['naam' => '', 'email' => '', 'onderwerp' => '', 'bericht' => ''];
$fouten   = [];
$verstuurd = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    foreach ($waarden as $veld => $_) {
        $waarden[$veld] = trim((string) ($_POST[$veld] ?? ''));
    }

    if ($waarden['naam'] === '') {
        $fouten['naam'] = 'Vul je naam in.';
    }
    if (!filter_var($waarden['email'], FILTER_VALIDATE_EMAIL)) {
        $fouten['email'] = 'Vul een geldig e-mailadres in.';
    }
    if (!in_array($waarden['onderwerp'], $onderwerpen, true)) {
        $fouten['onderwerp'] = 'Kies een onderwerp.';
    }
    if (mb_strlen($waarden['bericht']) < 10) {
        $fouten['bericht'] = 'Je bericht moet minstens 10 tekens lang zijn.';
    }

    $verstuurd = empty($fouten);
}
?>

<section class="paginakop">
  <div class="container">
    <p class="eyebrow">Contact</p>
    <h1 class="titel titel--groot" data-woorden>Laat iets <span class="groen">horen</span></h1>
    <p class="paginakop__tekst">Een vraag, feedback of een bug gevonden? Stuur een bericht en je krijgt zo snel mogelijk antwoord.</p>
  </div>
</section>

<section class="sectie sectie--compact">
  <div class="container contact">
    <div class="contact__form reveal">
      <?php if ($verstuurd): ?>
        <div class="melding melding--ok" role="status">
          <p class="kaart__titel">Bedankt, <?= e($waarden['naam']) ?>!</p>
          <p>Je bericht over "<?= e($waarden['onderwerp']) ?>" is goed ontvangen. We antwoorden op <?= e($waarden['email']) ?>.</p>
          <a class="link-pijl" href="contact.php">Nog een bericht sturen <?= icoon('arrow') ?></a>
        </div>
      <?php else: ?>
        <?php if ($fouten): ?>
          <p class="melding melding--fout" role="alert">Niet alles is goed ingevuld. Kijk de velden hieronder na.</p>
        <?php endif; ?>
        <form method="post" action="contact.php" novalidate>
          <div class="veld<?= isset($fouten['naam']) ? ' veld--fout' : '' ?>">
            <label for="naam">Naam</label>
            <input id="naam" name="naam" type="text" autocomplete="name" value="<?= e($waarden['naam']) ?>" required>
            <?php if (isset($fouten['naam'])): ?><p class="veld__fout"><?= e($fouten['naam']) ?></p><?php endif; ?>
          </div>
          <div class="veld<?= isset($fouten['email']) ? ' veld--fout' : '' ?>">
            <label for="email">E-mail</label>
            <input id="email" name="email" type="email" autocomplete="email" value="<?= e($waarden['email']) ?>" required>
            <?php if (isset($fouten['email'])): ?><p class="veld__fout"><?= e($fouten['email']) ?></p><?php endif; ?>
          </div>
          <div class="veld<?= isset($fouten['onderwerp']) ? ' veld--fout' : '' ?>">
            <label for="onderwerp">Onderwerp</label>
            <select id="onderwerp" name="onderwerp" required>
              <option value="">Kies een onderwerp</option>
              <?php foreach ($onderwerpen as $o): ?>
                <option<?= $waarden['onderwerp'] === $o ? ' selected' : '' ?>><?= e($o) ?></option>
              <?php endforeach; ?>
            </select>
            <?php if (isset($fouten['onderwerp'])): ?><p class="veld__fout"><?= e($fouten['onderwerp']) ?></p><?php endif; ?>
          </div>
          <div class="veld<?= isset($fouten['bericht']) ? ' veld--fout' : '' ?>">
            <label for="bericht">Bericht</label>
            <textarea id="bericht" name="bericht" rows="5" required><?= e($waarden['bericht']) ?></textarea>
            <?php if (isset($fouten['bericht'])): ?><p class="veld__fout"><?= e($fouten['bericht']) ?></p><?php endif; ?>
          </div>
          <button class="btn btn--rood" type="submit">Verstuur bericht</button>
        </form>
      <?php endif; ?>
    </div>

    <aside class="contact__info reveal">
      <p class="eyebrow">Gegevens</p>
      <ul class="contact__lijst">
        <li><?= icoon('mail') ?><a href="mailto:<?= e($site['email']) ?>"><?= e($site['email']) ?></a></li>
        <li><?= icoon('school') ?><?= e($site['school']) ?>, klas <?= e($site['klas']) ?></li>
        <li><?= icoon('pin') ?>Beveren, België</li>
      </ul>
      <div class="contact__phone"><?= mockup('onboarding') ?></div>
    </aside>
  </div>
</section>

<?php require __DIR__ . '/includes/footer.php'; ?>
