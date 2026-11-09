</main>

<div class="marquee marquee--donker" aria-hidden="true">
  <div class="marquee__track">
    <?php for ($i = 0; $i < 8; $i++): ?><span><?= e(strtoupper($site['slogan'])) ?></span><?php endfor; ?>
  </div>
</div>

<footer class="footer">
  <div class="container footer__grid">
    <div>
      <a class="logo logo--groot" href="index.php"><?= e(strtoupper($site['naam'])) ?></a>
      <p class="footer__tekst">De app om je workouts, voeding en voortgang bij te houden. Een GSP-project van <?= e($site['klas']) ?>, <?= e($site['school']) ?>.</p>
    </div>
    <div>
      <p class="eyebrow">Pagina's</p>
      <ul class="footer__links">
        <?php foreach ($navigatie as $bestand => $label): ?>
          <li><a href="<?= e($bestand) ?>"><?= e($label) ?></a></li>
        <?php endforeach; ?>
      </ul>
    </div>
    <div>
      <p class="eyebrow">Contact</p>
      <ul class="footer__links">
        <li><a href="mailto:<?= e($site['email']) ?>"><?= e($site['email']) ?></a></li>
        <li><?= e($site['school']) ?></li>
      </ul>
    </div>
  </div>
  <div class="container footer__onder">
    <p>&copy; <?= e($site['jaar']) ?> <?= e(strtoupper($site['naam'])) ?> &nbsp;//&nbsp; Design door een leerling <?= e($site['klas']) ?></p>
    <p>Foto's: Unsplash, Pexels, Pixabay &nbsp;//&nbsp; Fictieve voorbeelddata</p>
  </div>
</footer>
</body>
</html>
