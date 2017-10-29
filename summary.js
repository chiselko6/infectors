'use strict';

var summaryState = {
  create: function() {
    var storage = new Storage();
    //game.add.image(0, 0, 'summary');
    bitmapTextCentered(
        90,
        'engeexpa',
        (game.global.is_lost ? 'YOU LOSE' : 'STAGE CLEARED'),
        38
    );
    if (game.global.is_lost) {
        // game.add.image(150, 130, 'trash');
        game.add.image(170, 150, 'lost-' + game.global.level.toString());
    }
    var bestMovesKey = ['level', game.global.level, 'moves'].join('.');
    var bestTimeKey = ['level', game.global.level, 'time'].join('.');

    var bestMoves = storage.read(bestMovesKey);
    var bestTime = storage.read(bestTimeKey);

    // Score
    var movesFont = uiFonts.TITLE;
    var timeFont = uiFonts.TITLE;
    if (!game.global.is_lost) {
        if (bestTime === null || game.global.time < bestTime) {
            timeFont = uiFonts.RECORD;
            bitmapTextCentered(360, uiFonts.RECORD, 'You have cleaned the garbage so fast!', 25);
            storage.save(bestTimeKey, game.global.time);
        }
        bitmapTextCentered(170, uiFonts.RECORD, 'Congratulations, you are done!', 25);
        bitmapTextCentered(200, uiFonts.RECORD, 'Thank you for helping our nature!', 25);
    }

    bitmapTextCentered(
        439,
        'engeexpa',
        (game.global.is_lost ? 'Press ENTER to play level one more time' : 'Press ENTER to play next level'),
        18
    );

    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.next, this);
    game.sound.stopAll();
    this.bgmSound = game.add.audio(game.global.is_lost ? 'finish' : 'finish_lost');
    this.bgmSound.play();

    game.global.level += (game.global.is_lost ? 0 : 1);
    storage.save('level.current', game.global.level);
  },

  next: function() {
    game.state.start('stageInfo');
  }
};
