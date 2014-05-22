(function() {
  'use strict';

  function Options() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Options.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.menuBg = this.game.add.tileSprite(0, 0, 1024, 768, 'menuBg');
      this.menuBg.fixedToCamera = true;

      this.input.onDown.add(this.onDown, this);

    },

    update: function () {

    },

    onDown: function () {
      window['orphan'].Global.health = 3;
      this.game.state.start('menu');
    }
  };

  window['orphan'] = window['orphan'] || {};
  window['orphan'].Options = Options;

}());
