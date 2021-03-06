'use strict';

/*
chg1 = red
chg2 = blue
chg3 = green
*/
var playState = {
  create: function() {
    this.map = null;
    this.player = null;
    this.sceneDelay = 500;
    this.muted = false;
    this.bgmPool = new AudioPool(['track1', 'track2', 'track3', 'track4', 'track5', 'track6']);
    game.sound.stopAll();
    this.bgmPool.randomPlay(true);
    this.initialViruses = 0;

    game.global.moves = 0;
    game.global.time = 0;

    groups.viruses = game.add.group();
    groups.capsules = game.add.group();
    groups.hud = game.add.group();

    groups.viruses.enableBody = true;
    groups.capsules.enableBody = true;

    this.map = game.add.tilemap(game.global.level.toString());
    this.map.addTilesetImage('walls', 'walls');
    this.map.addTilesetImage('grounds', 'grounds');
    groups.walls = this.map.createLayer('Walls');
    this.map.createLayer('Grounds');
    this.map.setCollisionBetween(1, 18, true, 'Walls');

    var self = this;
    this.map.objects['Capsules'].forEach(function(e) {
      var y = e.y - self.map.tileHeight;
      var cap = new Capsule(e.x, y, e.properties.type, self.map);
    });

    this.map.objects['Viruses'].forEach(function(e) {
      var y = e.y - self.map.tileHeight;
      var virus = new Virus(e.x, y, e.properties.type);
      self.initialViruses++;
    });

    game.world.bringToTop(groups.walls);
    game.world.bringToTop(groups.capsules);
    game.world.bringToTop(groups.viruses);

    var e = this.map.objects['Hero'][0];
    var y = e.y - this.map.tileHeight;
    var facing = e.properties.facing || DIRECTION.DOWN;
    var variant = e.properties.color;
    this.player = new Hero(e.x, y, variant, facing, this.map);

    //Ingame menu shortcuts
    this.quitKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    this.quitKey.onUp.add(this.quitGame, this);

    this.restartKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
    this.restartKey.onUp.add(this.restartGame, this);

    this.muteKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
    this.muteKey.onUp.add(this.muteGame, this);

    //groups.walls.debug = true;
    this.pausedGame = false;
    this.pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.pauseKey.onUp.add(this.togglePause, this);

    this.ingameMenu = new IngameMenu(this);
    this.hud = new HUD();
    this.tutorial = new Tutorial(this.player);

    var current_y = 50;
    this.map.objects['Viruses'].forEach(function(e) {
      var y = e.y - self.map.tileHeight;
      var virus = new Virus(0, current_y, e.properties.type);
      game.add.bitmapText(25, current_y, uiFonts.TITLE, ' - ' + e.properties.description, 24);
      current_y += 50;
    });

    bitmapTextCentered(
        40,
        'engeexpa',
        'You have ' + game.global.maxTurnsLevel[game.global.level - 1].toString() + " moves.",
        20
    );
  },

  update: function() {
    this.hud.update();
    this.tutorial.update();
    game.global.time += game.time.elapsed;
    if (groups.viruses.length === this.initialViruses) {
      this.sceneDelay -= game.time.elapsed;
      if (this.sceneDelay <= 0) {
        if (game.global.level === game.global.totalLevels) {
          game.state.start('win');
        } else {
          game.global.is_lost = false;
          game.state.start('summary');
        }
      }
    } else {
      if (game.global.moves > game.global.maxTurnsLevel[game.global.level - 1]) {
        game.global.is_lost = true;
        game.state.start('summary');
      }
    }
  },

  pauseUpdate: function() {
    if (this.pausedGame) {
      this.ingameMenu.update();
    }
  },

  togglePause: function() {
    this.pausedGame = !this.pausedGame;
    if (this.pausedGame) {
      this.ingameMenu.show();
    } else {
      this.ingameMenu.hide();
    }
    game.paused = this.pausedGame;
  },

  restartGame: function() {
    game.state.start('play');
  },

  quitGame: function() {
    game.state.start('menu');
  },

  muteGame: function() {
    this.muted = !this.muted;

    if (this.muted) {
      this.bgmPool.stop();
    } else {
      this.bgmPool.resume();
    }
  },

  //render: function() {
  //  game.debug.body(this.player);
  //  game.debug.bodyInfo(this.player, 10, 20);
  //}
};
