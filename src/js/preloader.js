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

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this)
      this.load.setPreloadSprite(this.asset)
      this.load.spritesheet('player', 'assets/player.png', 168, 145); //133,145
      this.load.spritesheet('crown', 'assets/crown.png', 124, 145);
      this.load.image('enemy','assets/enemy.png')
      this.load.image('menuBg','assets/menuBg.png')
      this.load.image('startButton','assets/startButton.png')
      this.load.image('optionsButton','assets/optionsButton.png')
      this.load.image('creditsButton','assets/creditsButton.png')
      this.load.tilemap('map1', 'assets/Map3.json', null, Phaser.Tilemap.TILED_JSON)
      this.load.tilemap('map2', 'assets/Map4.json', null, Phaser.Tilemap.TILED_JSON)
      this.load.tilemap('mapBoss1', 'assets/MapBoss1.json', null, Phaser.Tilemap.TILED_JSON)
      this.load.image('ground','assets/ground.png')
      this.load.image('platform','assets/platform.png')
      this.load.image('groundCity','assets/groundCity.png')
      this.load.image('platformCity','assets/platformCity.png')
      this.load.image('background','assets/background.png')
      this.load.audio('bgMusic', 'assets/backgroundMusic.mp3')
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml')
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
