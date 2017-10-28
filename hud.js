'use strict';

var HUD = function() {
  Phaser.Sprite.call(this, game, 0, 416, 'hud', 0);

  var textSize = 26;
  var y = 435;
  this.fixedToCamera = true;
  this.levelLabel = game.add.bitmapText(35, y, uiFonts.HUD, 'Level: ' + game.global.level.toString(), textSize);
  game.add.bitmapText(465, y, uiFonts.HUD, 'Moves: ', textSize);
  this.movesLabel = game.add.bitmapText(570, y, uiFonts.HUD, game.global.moves.toString(), textSize);

  groups.hud.add(this);
};

HUD.prototype = Object.create(Phaser.Sprite.prototype);
HUD.prototype.constructor = HUD;

HUD.prototype.update = function() {
  this.movesLabel.setText(game.global.moves.toString());
};
