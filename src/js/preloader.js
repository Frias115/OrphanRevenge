(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(320, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      this.load.spritesheet('player', 'assets/runViejoBueno.png', 133, 145); //133,145
      this.load.image('enemy','assets/enemy.png');
      this.load.image('weapon','assets/weapon.png');
      this.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('ground','assets/ground.png')
      this.load.image('platform','assets/platform.png')
      this.load.image('background','assets/background.png')
      this.load.audio('bgMusic', 'assets/backgroundMusic.mp3')
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['orphan'] = window['orphan'] || {};
  window['orphan'].Preloader = Preloader;

}());
