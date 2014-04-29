(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.enemy = null;
    this.enemies = null;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
      , y = this.game.height / 2;
      //Inicio del sistema de fisicas
      this.game.physics.startSystem(Phaser.Physics.ARCADE); 

      //Carga de mapa
      this.map = this.game.add.tilemap('map');
      this.map.addTilesetImage('verde');
      this.map.setCollisionByExclusion([0]);
      this.layer = this.map.createLayer('Tile Layer 1');
      this.layer.resizeWorld();

      //Creacion de jugador
      this.player = this.add.sprite(x, y, 'player');
      this.player.anchor.setTo(0.5, 0.5);

      //Creacion de Enemigos
      this.enemies = this.add.group();
      this.enemies.enableBody = true;
      this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
      this.enemies.setAll('body.collideWorldBounds', true);

        this.enemy=this.enemies.create(500,100, 'enemy');
        this.enemy.anchor.setTo(0.5,0.5);
        this.enemy=this.enemies.create(550,100, 'enemy');
        this.enemy.anchor.setTo(0.5,0.5);
        this.enemy=this.enemies.create(560,100, 'enemy');
        this.enemy.anchor.setTo(0.5,0.5);
        this.enemy=this.enemies.create(570,100, 'enemy');
        this.enemy.anchor.setTo(0.5,0.5);
        this.enemy=this.enemies.create(580,100, 'enemy');
        this.enemy.anchor.setTo(0.5,0.5);
        this.enemy=this.enemies.create(590,100, 'enemy');
        this.enemy.anchor.setTo(0.5,0.5);
        this.enemy=this.enemies.create(550,100, 'enemy');
        this.enemy.anchor.setTo(0.5,0.5);
        this.enemy=this.enemies.create(550,100, 'enemy');
        this.enemy.anchor.setTo(0.5,0.5);
        this.enemy=this.enemies.create(550,100, 'enemy');
        this.enemy.anchor.setTo(0.5,0.5);

      //Creacion de la "caja" del arma, ataque principal
      this.weapon = this.add.sprite(this.player.x+15,this.player.y,'weapon')
      
      //Activa las fisicas en objetos
      this.game.physics.enable([this.enemy,this.player,this.weapon], Phaser.Physics.ARCADE);

      //Caracteristicas enemigos
      this.player.body.gravity.y = 300;
      this.enemies.setAll('body.gravity.y', 300);
      this.enemies.setAll('body.collideWorldBounds', true);

      //Caracteristicas personaje
      this.player.body.drag.setTo(600, 0);
      this.player.body.collideWorldBounds = true;

      //Caracteristicas arma, ataque principal
      this.weapon.body.collideWorldBounds = true;
      this.weapon.body.drag.setTo(600, 0);

      //Variables salto
      this.canDoubleJump = true
      this.canVariableJump = true

      //Centrado de la camara en el personaje
      this.camera.follow(this.player);

    },

    update: function () {
      //Movimiento arma
      this.weapon.x = this.player.x + 15
      this.weapon.y = this.player.y - 5

      //Colisiones
      this.game.physics.arcade.collide(this.player, this.layer);
      this.game.physics.arcade.collide(this.enemies, this.layer);
      this.game.physics.arcade.collide(this.enemies, this.enemies);
      this.game.physics.arcade.collide(this.player, this.enemies);

      //Movimiento personaje
      if (this.input.keyboard.isDown(Phaser.Keyboard.A))
      {
        this.player.body.velocity.x = -150
        this.weapon.body.velocity.x = -150
        this.weapon.x = this.player.x - 115
        this.weapon.y = this.player.y - 5
      }
      else if (this.input.keyboard.isDown(Phaser.Keyboard.D))
      {
        this.player.body.velocity.x = 150
        this.weapon.body.velocity.x = 150
        this.weapon.x = this.player.x + 15
        this.weapon.y = this.player.y - 5
      }

      //Ataque principal
      if (this.input.keyboard.isDown(Phaser.Keyboard.K))
      {
        this.physics.arcade.overlap(this.weapon, this.enemies, 
        function (player, enemy) {
              enemy.kill();
        }, null, this);
      }

      //Salto y doble salto
        // Set a variable that is true when the player is touching the ground
      if (this.player.body.onFloor()) this.canDoubleJump = true;

      if (this.input.keyboard.justPressed(Phaser.Keyboard.W, 1)) {
        // Allow the player to adjust his jump height by holding the jump button
        if (this.canDoubleJump) this.canVariableJump = true;
        this.weapon.y = this.player.y - 5
      if (this.canDoubleJump || this.player.body.onFloor()) {
            // Jump when the player is touching the ground or they can double jump
            this.player.body.velocity.y = -230;

            // Disable ability to double jump if the player is jumping in the air
            if (!this.player.body.onFloor()) this.canDoubleJump = false;
          }
        }

      // Don't allow variable jump height after the jump button is released
      if (!this.input.keyboard.isDown(Phaser.Keyboard.W)) {
        this.canVariableJump = false;
      }
      //Posicion del "caja" ataque principal
      






















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

    render: function () {
      
      this.game.debug.body(this.enemies);
      this.game.debug.body(this.player);
      this.game.debug.body(this.weapon);
    }

  };

  window['orphan'] = window['orphan'] || {};
  window['orphan'].Game = Game;

}());
