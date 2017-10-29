'use strict';

var LEVEL_DESCRIPTION_DELAY = 5000;

var stageInfo = {
  create: function() {
    this.level = game.global.level;
    game.add.image(0, 0, 'level-' + this.level.toString());
    var levelDescription = game.cache.getText('stage-' + this.level);
    bitmapTextCentered(330, uiFonts.TITLE, levelDescription)
    setTimeout(this.start, LEVEL_DESCRIPTION_DELAY);
  },

  start: function() {
    game.state.start('play');
  }
}
