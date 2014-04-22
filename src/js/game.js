(function() {
  'use strict';

  function Game() {
    this.player = null;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
      , y = this.game.height / 2;

      this.game.physics.startSystem(Phaser.Physics.ARCADE); 

      this.map = this.game.add.tilemap('prueba');
      this.map.addTilesetImage('tiles-1');
      this.layer = this.map.createLayer('Tile Layer 1');
      this.layer.resizeWorld();


      this.game.physics.arcade.gravity.y = 200;

      this.player = this.add.sprite(x, y, 'player');
      this.player.anchor.setTo(0.5, 0.5);

      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
      
      this.player.body.collideWorldBounds = true;

      this.player.body.drag.setTo(600, 0);

      this.canDoubleJump = true
      this.canVariableJump = true

      this.camera.follow(this.player);

    },

    update: function () {

      if (this.input.keyboard.isDown(Phaser.Keyboard.A))
      {
        this.player.body.velocity.x = -200
      }
      else if (this.input.keyboard.isDown(Phaser.Keyboard.D))
      {
        this.player.body.velocity.x = 200
      }


        // Set a variable that is true when the player is touching the ground
      var onTheGround = this.player.body.touching.down;
      if (onTheGround) this.canDoubleJump = true;

      if (this.input.keyboard.justPressed(Phaser.Keyboard.W, 1)) {
      // Allow the player to adjust his jump height by holding the jump button
        if (this.canDoubleJump) this.canVariableJump = true;

        if (this.canDoubleJump || onTheGround) {
            // Jump when the player is touching the ground or they can double jump
            this.player.body.velocity.y = -340;

            // Disable ability to double jump if the player is jumping in the air
            if (!onTheGround) this.canDoubleJump = false;
          }
        }

    // Keep y velocity constant while the jump button is held for up to 400 ms
    if (this.canVariableJump && this.input.keyboard.justPressed(Phaser.Keyboard.W, 400)) {
      this.player.body.velocity.y = -340;
    }

    // Don't allow variable jump height after the jump button is released
    if (!this.input.keyboard.isDown(Phaser.Keyboard.W)) {
      this.canVariableJump = false;
    }



















      /*var x, y, cx, cy, dx, dy, angle, scale;

      x = this.input.position.x;
      y = this.input.position.y;
      cx = this.world.centerX;
      cy = this.world.centerY;

      angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
      this.player.angle = angle;

      dx = x - cx;
      dy = y - cy;
      scale = Math.sqrt(dx * dx + dy * dy) / 100;

      this.player.scale.x = scale * 0.6;
      this.player.scale.y = scale * 0.6;*/
    },

    onInputDown: function () {
      this.game.state.start('menu');
    }

  };

  window['orphan'] = window['orphan'] || {};
  window['orphan'].Game = Game;

}());
