<?php
/*
 * Alle voorbeelddata van de site staat in dit ene bestand.
 * Later kan dit vervangen worden door een database, zonder de pagina's te herschrijven.
 */

$site = [
    'naam'     => 'FitApp',
    'slogan'   => 'Track. Train. Progress.',
    'email'    => 'info@fitapp.be',
    'school'   => 'GTI Beveren',
    'klas'     => '6ADB',
    'jaar'     => date('Y'),
];

$navigatie = [
    'index.php'    => 'Home',
    'functies.php' => 'Functies',
    'gids.php'     => 'Gids',
    'over-ons.php' => 'Over ons',
    'contact.php'  => 'Contact',
];

/*
 * Foto's: Unsplash / Pexels / Pixabay / Magnific.
 * 'zoek' = de zoekterm die op het grijze vlak verschijnt als een foto niet laadt.
 * Zet je foto's in website/assets/img/ met de naam uit 'src' (bv. hero.jpg).
 */
$fotos = [
    'hero'     => ['src' => 'assets/img/hero.jpg', 'alt' => 'Sporter in een donkere gym klaar voor een deadlift', 'zoek' => 'hero.jpg · Unsplash: dark gym workout'],
    'wat'      => ['src' => 'assets/img/wat.jpg', 'alt' => 'Sporter bekijkt haar routines in de app tussen de dumbbells', 'zoek' => 'wat.jpg · Unsplash: woman workout phone'],
    'training' => ['src' => 'assets/img/training.jpg', 'alt' => 'Sporter met twee dumbbells in een industriële gym', 'zoek' => 'training.jpg · Pexels: dumbbell training'],
    'voeding'  => ['src' => 'assets/img/voeding.jpg', 'alt' => 'Kipspiesjes op rijst in een witte schaal', 'zoek' => 'voeding.jpg · Unsplash: healthy meal bowl'],
    'voortgang'=> ['src' => 'assets/img/voortgang.jpg', 'alt' => 'Kettlebell van 50 lbs op de vloer van een gym', 'zoek' => 'voortgang.jpg · Pixabay: gym progress'],
    'over'     => ['src' => 'assets/img/over.jpg', 'alt' => 'Rij dumbbells in een rek in de gym', 'zoek' => 'over.jpg · Unsplash: gym training'],
    'cta'      => ['src' => 'assets/img/cta.jpg', 'alt' => 'Sporter klaar om te starten', 'zoek' => 'cta.jpg · Pexels: athlete gym'],
];

/* Drie kernfuncties op de homepagina */
$kernfuncties = [
    ['titel' => 'Workouts loggen', 'foto' => 'training',  'tekst' => 'Noteer per oefening je sets, reps en gewicht. De rusttimer start automatisch na elke set.', 'link' => 'functies.php?categorie=training'],
    ['titel' => 'Voeding bijhouden', 'foto' => 'voeding',  'tekst' => 'Zoek voedingsmiddelen, pas de portie aan en zie je calorieën en macro\'s per dag.', 'link' => 'functies.php?categorie=voeding'],
    ['titel' => 'Voortgang zien',  'foto' => 'voortgang', 'tekst' => 'Grafieken van je gewicht, trainingsvolume en persoonlijke records per week, maand of jaar.', 'link' => 'functies.php?categorie=voortgang'],
];

/* Alle functies (uit must-could-should.md) */
$categorieen = [
    'training'  => 'Training',
    'voeding'   => 'Voeding',
    'voortgang' => 'Voortgang',
    'account'   => 'Account',
    'slim'      => 'Slim',
];

$prioriteiten = [
    'must'   => 'Must have',
    'should' => 'Should have',
    'could'  => 'Could have',
];

$functies = [
    ['titel' => 'Account aanmaken',          'categorie' => 'account',   'prioriteit' => 'must',   'icoon' => 'user',     'tekst' => 'Maak in een minuut een account aan en stel je doel, niveau en apparatuur in.'],
    ['titel' => 'Inloggen',                  'categorie' => 'account',   'prioriteit' => 'must',   'icoon' => 'lock',     'tekst' => 'Log veilig in en vind al je workouts en maaltijden terug op elk toestel.'],
    ['titel' => 'Workouts loggen',           'categorie' => 'training',  'prioriteit' => 'must',   'icoon' => 'dumbbell', 'tekst' => 'Start een workout en vink set na set af. Alles wordt automatisch opgeslagen.'],
    ['titel' => 'Sets, reps en gewicht',     'categorie' => 'training',  'prioriteit' => 'must',   'icoon' => 'list',     'tekst' => 'Grote invoervelden voor gewicht en herhalingen, ook met zweethanden.'],
    ['titel' => 'Rusttimer',                 'categorie' => 'training',  'prioriteit' => 'must',   'icoon' => 'timer',    'tekst' => 'Na elke set loopt de rusttimer. Je krijgt een signaal als je weer mag.'],
    ['titel' => 'Routines',                  'categorie' => 'training',  'prioriteit' => 'must',   'icoon' => 'repeat',   'tekst' => 'Bewaar je vaste schema\'s zoals Push Day of Leg Day en start ze met 1 tik.'],
    ['titel' => 'Voeding loggen',            'categorie' => 'voeding',   'prioriteit' => 'must',   'icoon' => 'bowl',     'tekst' => 'Voeg maaltijden toe aan ontbijt, lunch, diner of snacks.'],
    ['titel' => 'Voedingsmiddelen zoeken',   'categorie' => 'voeding',   'prioriteit' => 'must',   'icoon' => 'search',   'tekst' => 'Zoek in een grote lijst voedingsmiddelen en pas de portie aan.'],
    ['titel' => 'Dagelijkse totalen',        'categorie' => 'voeding',   'prioriteit' => 'must',   'icoon' => 'pie',      'tekst' => 'Zie in een oogopslag je calorieën, eiwitten, koolhydraten en vetten.'],
    ['titel' => 'Dashboard',                 'categorie' => 'voortgang', 'prioriteit' => 'must',   'icoon' => 'grid',     'tekst' => 'Je dag in 1 scherm: workout van vandaag, voeding en je streak.'],
    ['titel' => 'Voortgangsgrafieken',       'categorie' => 'voortgang', 'prioriteit' => 'must',   'icoon' => 'chart',    'tekst' => 'Volg je gewicht, volume en records per week, maand of jaar.'],
    ['titel' => 'Barcodescanner',            'categorie' => 'voeding',   'prioriteit' => 'should', 'icoon' => 'barcode',  'tekst' => 'Scan de barcode op de verpakking en het product staat er meteen in.'],
    ['titel' => 'AI-coach',                  'categorie' => 'slim',      'prioriteit' => 'should', 'icoon' => 'spark',    'tekst' => 'Persoonlijk advies op basis van je doel, je trainingen en je voeding.'],
    ['titel' => '1RM-calculator',            'categorie' => 'slim',      'prioriteit' => 'should', 'icoon' => 'calc',     'tekst' => 'Bereken je maximale gewicht voor 1 herhaling zonder het te testen.'],
    ['titel' => 'Plate calculator',          'categorie' => 'slim',      'prioriteit' => 'should', 'icoon' => 'plates',   'tekst' => 'Welke schijven moet je op de stang leggen? De app rekent het uit.'],
    ['titel' => 'Lichaamsmetingen',          'categorie' => 'voortgang', 'prioriteit' => 'should', 'icoon' => 'ruler',    'tekst' => 'Noteer je gewicht en omtrekken en zie hoe je lichaam verandert.'],
    ['titel' => 'Fotoherkenning voeding',    'categorie' => 'voeding',   'prioriteit' => 'could',  'icoon' => 'camera',   'tekst' => 'Neem een foto van je bord en de app schat wat erop ligt.'],
    ['titel' => 'Sociale functies',          'categorie' => 'account',   'prioriteit' => 'could',  'icoon' => 'users',    'tekst' => 'Deel routines en records met vrienden en motiveer elkaar.'],
    ['titel' => 'Gamification',              'categorie' => 'voortgang', 'prioriteit' => 'could',  'icoon' => 'trophy',   'tekst' => 'Verdien badges en houd je streak vol voor extra motivatie.'],
    ['titel' => 'Wearable-integratie',       'categorie' => 'slim',      'prioriteit' => 'could',  'icoon' => 'watch',    'tekst' => 'Koppel je smartwatch voor hartslag, stappen en slaap.'],
];

/* Checklist op de homepagina */
$checklist = [
    'Workouts loggen met sets, reps en gewicht',
    'Rusttimer die automatisch start',
    'Eigen routines bewaren en starten',
    'Calorieën en macro\'s per dag',
    'Barcodescanner voor voedingsmiddelen',
    'Grafieken en persoonlijke records',
    'AI-coach met persoonlijk advies',
    '1RM- en plate calculator',
];

/* Voorbeeldcijfers */
$stats = [
    ['cijfer' => 20,  'suffix' => '+', 'label' => 'Functies in 1 app'],
    ['cijfer' => 3,   'suffix' => '',  'label' => 'Tikken om een set te loggen'],
    ['cijfer' => 100, 'suffix' => '%', 'label' => 'Gratis voor leerlingen'],
];

/* Voorbeeldreacties van testgebruikers (fictief) */
$reacties = [
    ['tekst' => 'Eindelijk geen notitieboekje meer in de gym. Ik zie meteen wat ik vorige week tilde.', 'naam' => 'Testgebruiker — 17 jaar'],
    ['tekst' => 'De rusttimer is super handig. Ik rust nu echt 90 seconden in plaats van 5 minuten op mijn gsm.', 'naam' => 'Testgebruiker — 18 jaar'],
    ['tekst' => 'Door het voedingsdagboek weet ik eindelijk hoeveel eiwit ik eet. De barcodescanner is top.', 'naam' => 'Testgebruiker — 19 jaar'],
];

/* Gids: stappenplan */
$stappen = [
    ['titel' => 'Maak je account', 'mockup' => 'onboarding', 'tekst' => 'Download FitApp en maak een account aan. Kies je doel (spiermassa, afvallen, sterker worden of conditie), je ervaringsniveau en welke apparatuur je hebt.'],
    ['titel' => 'Bekijk je dashboard', 'mockup' => 'dashboard', 'tekst' => 'Op je dashboard zie je de workout van vandaag, je calorieën en je streak. Vanaf hier start je alles met 1 tik.'],
    ['titel' => 'Log je workout', 'mockup' => 'workout', 'tekst' => 'Start een routine. Vul per set je gewicht en reps in en tik op "Set voltooid". De rusttimer loopt meteen.'],
    ['titel' => 'Houd je voeding bij', 'mockup' => 'voeding', 'tekst' => 'Zoek een voedingsmiddel of scan de barcode. Kies de portie en de app telt je calorieën en macro\'s op.'],
    ['titel' => 'Volg je voortgang', 'mockup' => 'voortgang', 'tekst' => 'Bekijk grafieken per week, maand of jaar. Nieuwe persoonlijke records krijgen een trofee.'],
];

/* Gids: veelgestelde vragen */
$faq = [
    ['vraag' => 'Is FitApp gratis?', 'antwoord' => 'Ja. FitApp is een schoolproject (GSP) en is gratis te gebruiken.'],
    ['vraag' => 'Werkt de app ook zonder gym?', 'antwoord' => 'Ja. Bij het aanmaken van je account kies je welke apparatuur je hebt. Zonder apparatuur krijg je oefeningen met je eigen lichaamsgewicht.'],
    ['vraag' => 'Wat doet de AI-coach precies?', 'antwoord' => 'De AI-coach kijkt naar je doel, je trainingen en je voeding en geeft tips, bijvoorbeeld een lichtere training na een zware dag. Hij vervangt geen arts of diëtist.'],
    ['vraag' => 'Kan ik mijn eigen routines maken?', 'antwoord' => 'Ja. Je voegt oefeningen toe, zet ze in de juiste volgorde en stelt sets en reps in. Daarna start je de routine met 1 tik.'],
    ['vraag' => 'Wat gebeurt er met mijn gegevens?', 'antwoord' => 'Je gegevens worden alleen gebruikt om de app te laten werken. In de instellingen kies je zelf wat je deelt.'],
];

/* Over ons: tijdlijn van het project */
$tijdlijn = [
    ['periode' => 'September', 'titel' => 'Onderzoek', 'tekst' => 'Bestaande fitness-apps vergeleken en een lijst met must, should en could haves gemaakt.'],
    ['periode' => 'Oktober',   'titel' => 'Wireframes & design', 'tekst' => 'Tien app-schermen uitgetekend en de stijl van deze website vastgelegd in DESIGN.md en plan.md.'],
    ['periode' => 'November',  'titel' => 'Bouwen', 'tekst' => 'De website en de app gebouwd met HTML, CSS, JavaScript en PHP.'],
    ['periode' => 'December',  'titel' => 'Testen & database', 'tekst' => 'Testen met echte gebruikers en de database koppelen.'],
];

$technologie = ['HTML', 'CSS', 'JavaScript', 'PHP'];

/* Contactformulier: onderwerpen */
$onderwerpen = ['Vraag over de app', 'Feedback', 'Een bug melden', 'Iets anders'];

/* Kleine helper: foto met grijs vlak als fallback */
function foto(string $key, string $class = ''): string
{
    global $fotos;
    $f = $fotos[$key];
    return '<figure class="foto ' . $class . '" data-zoek="' . htmlspecialchars($f['zoek']) . '">'
        . '<img src="' . htmlspecialchars($f['src']) . '" alt="' . htmlspecialchars($f['alt']) . '" loading="lazy" onerror="this.parentNode.classList.add(\'foto--leeg\');this.remove()">'
        . '</figure>';
}

function e(string $tekst): string
{
    return htmlspecialchars($tekst, ENT_QUOTES, 'UTF-8');
}
