(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.menuBg = this.game.add.tileSprite(0, 0, 1024, 768, 'menuBg');
      this.menuBg.fixedToCamera = true;

      this.startButton = this.add.button(200, 370, 'startButton', function(){window['orphan'].Global.health = 3; this.game.state.start('game');}, this);
    
      this.optionsButton = this.add.button(200, 470, 'optionsButton', function(){this.game.state.start('options');}, this);

      this.creditsButton = this.add.button(200, 570, 'creditsButton', function(){this.game.state.start('credits');}, this);



      /*this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'Example Game' );
      this.titleTxt.align = 'center';
      this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'minecraftia', 'START');
      this.startTxt.align = 'center';
      this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;*/

      //this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function () {
      window['orphan'].Global.health = 3;
      this.game.state.start('game');
    }
  };

  window['orphan'] = window['orphan'] || {};
  window['orphan'].Menu = Menu;

}());
