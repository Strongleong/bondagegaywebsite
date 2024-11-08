<?php

use Lib\Core\Config;
use Lib\Models\Boy;

require_once 'core.php';

$config = new Config('gachi');
$boys = [];

foreach ($config->get('boys') as $boy) {
  $boys[] = Boy::fromConfig($boy);
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Admin: BodageGayWebiste</title>
</head>

<body>
  <header>
    <h1>Gachi Admin</h1>
  </header>

  <div class="panels">
    <div class="panel">
      <div class="panel__title">Boys</div>

      <?php foreach ($boys as $boy) { ?>
        <div class="gachi">
          <div class="gachi__name"><?= $boy->getId() ?></div>

          <?php foreach ($boy->getImgPaths() as $img) { ?>
            <span><?= $img ?></span>
            <img class="gachi__img" src="/static/img/<?= $img ?>" />
          <?php } ?>

          <div class="gachi__audio">
            <?php foreach ($boy->getSoundPaths() as $sound) { ?>
              <span><?= $sound ?></span>
              <audio controls src="/static/audio/<?= $sound ?>"></audio>
            <?php } ?>
          </div>
        </div>
      <?php } ?>
    </div>

    <div class="panel">
      <div class="panel__title">Babies</div>

      <div class="form-group">
        <label for="babies_speed">Speed</label>
        <input id="babies_speed" type="range" min="0" max="4">
      </div>

      <div class="form-group">
        <label for="babies_speed-random">Random</label>
        <input type="checkbox" id="babies_speed-random">
      </div>
    </div>
  </div>

  <style>
    .panels {
      display: flex;
      gap: 15px;
      justify-content: space-evenly;
    }

    .panel {
      border: 2px solid black;
      border-radius: 15px;
      padding: 15px;
      /* box-shadow: box-shadow; */
    }

    .panel__title {
      font-weight: 800;
      border-bottom: 2px solid black;
      margin-bottom: 20px;
    }

    .gachi__img {
      width: 150px;
    }

    .gachi__audio {
      display: flex;
      flex-direction: column;
    }
  </style>
</body>

</html>
