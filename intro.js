'use strict';

var introState = {
  create: function() {
    this.printText('Governments of all countries turned a blind eye on environmental problems last 100 years.' +
        "           Eventually, planet became so contaminated with garbage that there " +
        'was no clean place without any rubbish. Some places even became unsuitable to li ve due to garbage toxic emissions. ' +
        'In order to pre vent expansion of those zones and appearing new  ones, the governments all over the planet had to  take drastic measures. They made separate waste  collection obligatory and created special squads'
        + '  of the guardians of nature whose goal would be  to clean up the risk territories.' +
        ' It is the necessa ry first step because recycling of mixed rubbish is unprofitable, but if gar' +
        'bage is separated into different elements, its recycling will even make money for fighting environmental problems.');
    setTimeout(function() {
      bitmapTextCentered(550, uiFonts.TITLE, 'Press ENTER to continue', 18);
    }, 8800);
  },

  start: function() {
    game.state.start('stageInfo');
  },

  printText: function(text) {
    var i = 0;
    var x = 0, y = 0;
    var WIDTH = 620, CHAR_LEN = 12;
    var self = this;

    function runPrint() {
      setTimeout(function() {
        var label = self.printChar(x, y, text[i]);
        i++;
        if (x + label.textWidth + CHAR_LEN > WIDTH) {
          x = 0;
          y += 29;
        } else {
          x += label.textWidth + 3;
        }
        if (i < text.length) {
          runPrint();
        } else {
          var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
          enterKey.onDown.addOnce(self.start, self);
        }
      }, 10);
    }
    runPrint();
  },

  printChar: function(x, y, char) {
    return game.add.bitmapText(x, y, uiFonts.TITLE, char, 20);
  }
};
