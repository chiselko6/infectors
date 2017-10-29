'use strict';

var loadState = {
  preload: function() {
    bitmapTextCentered(150, 'engeexpa', 'Loading...', 30);

    var progressBar = game.add.sprite(game.world.centerX, 200, 'progressbar');
    progressBar.anchor.setTo(0.5, 0.5);
    game.load.setPreloadSprite(progressBar);

    game.load.bitmapFont('zerothre', 'assets/fonts/zerothre.png', 'assets/fonts/zerothre.fnt');
    game.load.bitmapFont('record', 'assets/fonts/record.png', 'assets/fonts/record.fnt');

    game.load.image('title', 'assets/images/title.png');
    for (var i = 1; i <= game.global.totalLevels; i++) {
      game.load.image('level-' + i.toString(), 'assets/images/level-' + i.toString() + '.png');
    }
    for (var i = 1; i <= game.global.totalLevels; i++) {
      game.load.image('lost-' + i.toString(), 'assets/images/lost/'+i.toString() + '.jpg');
    }

    game.load.image('walls', 'assets/images/walls.png');
    game.load.image('grounds', 'assets/images/grounds.png');
    game.load.image('summary', 'assets/images/summary.png');
    game.load.image('trash', 'assets/images/trash_earth.jpg');
    game.load.image('menu', 'assets/images/menu.png');
    game.load.image('cursor', 'assets/images/cursor.png');
    game.load.image('planet', 'assets/images/green1.jpg');
    game.load.image('hud', 'assets/images/hud.png');
    game.load.image('arrowleft', 'assets/images/arrow-left.png');
    game.load.image('arrowright', 'assets/images/arrow-right.png');

    game.load.spritesheet('hero', 'assets/images/character.png', 32, 32);
    game.load.spritesheet('capsules', 'assets/images/capsules.png', 32, 32);
    game.load.spritesheet('viruses', 'assets/images/viruses.png', 32, 32);
    game.load.spritesheet('transformation', 'assets/images/transformation.png', 32, 32);

    // SFX
    game.load.audio('capture', 'assets/sounds/capture.mp3');
    game.load.audio('changer', 'assets/sounds/changer.mp3');
    game.load.audio('walking', 'assets/sounds/walking.mp3');
    game.load.audio('option', 'assets/sounds/cursor.mp3');
    game.load.audio('select', 'assets/sounds/select.mp3');
    game.load.audio('win', 'assets/sounds/win.mp3');
    game.load.audio('blocked', 'assets/sounds/blocked.mp3');

    // BGM
    game.load.audio('main', 'assets/sounds/main.mp3', 0.75, true);
    game.load.audio('finish', 'assets/sounds/finish.mp3', 0.75);
    game.load.audio('finish_lost', 'assets/sounds/finish.mp3', 0.75);
    game.load.audio('track1', 'assets/sounds/track1.mp3', 0.75, true);
    game.load.audio('track2', 'assets/sounds/track2.mp3', 0.75, true);
    game.load.audio('track3', 'assets/sounds/track3.mp3', 0.75, true);
    game.load.audio('track4', 'assets/sounds/track4.mp3', 0.75, true);
    game.load.audio('track5', 'assets/sounds/track5.mp3', 0.75, true);
    game.load.audio('track6', 'assets/sounds/track6.mp3', 0.75, true);


    // stages info
    for (var i = 1; i <= game.global.totalLevels; i++) {
      game.load.text('stage-' + i.toString(), 'assets/stages/' + i.toString() + '.txt')
    }

    for (var i=1; i<=game.global.totalLevels; i++) {
      // var levelToLoad = (i===1)? 1: i+3;
      var levelToLoad = i;
      game.load.tilemap(i.toString(), 'assets/maps/' + (levelToLoad).toString() + '.json', null, Phaser.Tilemap.TILED_JSON);
    }
  },

  create: function() {
    game.state.start('menu');
  }
};
