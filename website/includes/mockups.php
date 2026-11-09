<?php
/* Telefoon-mockups gebouwd met HTML/CSS op basis van de wireframes in app.wireframes/ */
function mockup(string $scherm): string
{
    ob_start();
    ?>
<div class="phone" aria-label="Voorbeeldscherm van de app: <?= e($scherm) ?>" role="img">
  <div class="phone__notch"></div>
  <div class="phone__screen">
  <?php if ($scherm === 'onboarding'): ?>
    <p class="ph-logo">FITAPP</p>
    <p class="ph-title">Wat is je doel?</p>
    <p class="ph-sub">Bereik je doel stap voor stap.</p>
    <ul class="ph-options">
      <li class="is-on">Spiermassa</li>
      <li>Afvallen</li>
      <li>Sterker worden</li>
      <li>Conditie</li>
    </ul>
    <div class="ph-dots"><i class="is-on"></i><i></i><i></i><i></i></div>
    <span class="ph-btn">Volgende</span>

  <?php elseif ($scherm === 'dashboard'): ?>
    <p class="ph-hello">Goedemorgen, Alex</p>
    <div class="ph-card ph-ring-card">
      <div class="ph-ring" style="--p:65"><span>65%</span></div>
      <div><strong>Vandaag</strong><small>Dagelijks doel</small></div>
    </div>
    <div class="ph-card ph-card--dark">
      <small>Jouw workout</small>
      <strong>Upper Body</strong>
      <small>45 min · 6 oefeningen</small>
      <span class="ph-btn ph-btn--sm">Start workout</span>
    </div>
    <div class="ph-kpis">
      <div class="ph-card"><small>Voeding</small><strong>1.820</strong><small>kcal</small></div>
      <div class="ph-card"><small>Streak</small><strong>7</strong><small>dagen</small></div>
    </div>
    <div class="ph-tabbar"><i class="is-on"></i><i></i><i></i><i></i></div>

  <?php elseif ($scherm === 'workout'): ?>
    <div class="ph-top"><span>Workout</span><span>3 / 8</span></div>
    <div class="ph-progress"><i style="width:37%"></i></div>
    <p class="ph-title">Bench press</p>
    <table class="ph-sets">
      <tr class="is-done"><td>Set 1</td><td>60 kg</td><td>10</td></tr>
      <tr class="is-done"><td>Set 2</td><td>60 kg</td><td>10</td></tr>
      <tr><td>Set 3</td><td>60 kg</td><td>8</td></tr>
    </table>
    <div class="ph-inputs"><label>Gewicht<b>60</b></label><label>Reps<b>8</b></label></div>
    <span class="ph-btn">Set voltooid</span>
    <p class="ph-timer"><small>Rust</small><b data-timer>01:24</b></p>

  <?php elseif ($scherm === 'voeding'): ?>
    <p class="ph-hello">Voeding — Vandaag</p>
    <p class="ph-kcal"><b>1.820</b> / 2.200 kcal</p>
    <div class="ph-bar"><i style="width:83%"></i></div>
    <ul class="ph-macros">
      <li>Eiwit <span>120 / 160 g</span><div class="ph-bar ph-bar--sm"><i style="width:75%"></i></div></li>
      <li>Koolh. <span>180 / 240 g</span><div class="ph-bar ph-bar--sm"><i style="width:75%"></i></div></li>
      <li>Vet <span>55 / 70 g</span><div class="ph-bar ph-bar--sm"><i style="width:79%"></i></div></li>
    </ul>
    <p class="ph-meal">Ontbijt</p>
    <p class="ph-row">Havermout <span>350 kcal</span></p>
    <p class="ph-row">Banaan <span>100 kcal</span></p>
    <p class="ph-meal">Lunch</p>
    <p class="ph-row">Kip + rijst <span>550 kcal</span></p>
    <span class="ph-btn ph-btn--sm">+ Voeding toevoegen</span>

  <?php elseif ($scherm === 'voortgang'): ?>
    <p class="ph-hello">Mijn voortgang</p>
    <div class="ph-tabs"><span>Week</span><span class="is-on">Maand</span><span>Jaar</span></div>
    <svg class="ph-chart" viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true">
      <polyline points="0,20 30,24 60,22 90,34 120,40 150,52 200,58" fill="none" stroke="currentColor" stroke-width="3"/>
    </svg>
    <div class="ph-bars"><i style="--h:40%"></i><i style="--h:70%"></i><i style="--h:55%"></i><i style="--h:90%"></i><i style="--h:65%"></i><i style="--h:80%"></i><i style="--h:100%"></i></div>
    <div class="ph-kpis">
      <div class="ph-card"><small>Workouts</small><strong>12</strong></div>
      <div class="ph-card"><small>Records</small><strong>4</strong></div>
    </div>
    <p class="ph-row">Bench press <span>80 kg</span></p>
    <p class="ph-row">Squat <span>100 kg</span></p>
  <?php endif; ?>
  </div>
</div>
    <?php
    return ob_get_clean();
}
