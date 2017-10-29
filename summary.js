'use strict';

var summaryState = {
  create: function() {
    var storage = new Storage();
    //game.add.image(0, 0, 'summary');
    bitmapTextCentered(90, 'engeexpa', 'STAGE CLEARED', 38);

    var bestMovesKey = ['level', game.global.level, 'moves'].join('.');
    var bestTimeKey = ['level', game.global.level, 'time'].join('.');

    var bestMoves = storage.read(bestMovesKey);
    var bestTime = storage.read(bestTimeKey);

    // Score
    var movesFont = uiFonts.TITLE;
    var timeFont = uiFonts.TITLE;
    if (bestTime === null || game.global.time < bestTime) {
      timeFont = uiFonts.RECORD;
      bitmapTextCentered(360, uiFonts.RECORD, 'You have cleaned the garbage so fast!', 25);
      storage.save(bestTimeKey, game.global.time);
    }
    bitmapTextCentered(170, uiFonts.RECORD, 'Congratulations, you are done!', 25);
    bitmapTextCentered(200, uiFonts.RECORD, 'Thank you for helping our nature!', 25);

    bitmapTextCentered(439, 'engeexpa', 'Press ENTER to play next level', 18);

    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.next, this);
    game.sound.stopAll();
    this.bgmSound = game.add.audio('finish');
    this.bgmSound.play();

    game.global.level += 1;
    storage.save('level.current', game.global.level);
  },

  next: function() {
    game.state.start('stageInfo');
  }
};
