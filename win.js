'use strict';

var winState = {
  create: function() {
    bitmapTextCentered(40, 'engeexpa', 'You won!', 38);
    // Score
    game.add.image(170, 80, 'planet');
    bitmapTextCentered(300, 'engeexpa', 'Congratulations! You have saved the earth from', 25);
    bitmapTextCentered(330, 'engeexpa', 'the rubbish through ' + "10" + ' levels. You', 25);
    bitmapTextCentered(360, 'engeexpa', 'are a true nature-lover!', 25);

    bitmapTextCentered(489, 'engeexpa', 'Press ENTER to go to the menu', 18);

    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.exit, this);
    game.sound.stopAll();
    this.bgmSound = game.add.audio('win');
    this.bgmSound.play();
  },

  exit: function() {
    game.state.start('menu');
  }
};
