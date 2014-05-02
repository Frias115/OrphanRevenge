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

      this.game.stage.backgroundColor = '#000000';

      this.bg = this.game.add.tileSprite(0, 0, 1024, 768, 'background');
      this.bg.fixedToCamera = true;
      

      //Carga de mapa
      this.map = this.game.add.tilemap('map');
      this.map.addTilesetImage('ground');
      this.map.addTilesetImage('platform');
      this.map.setCollisionByExclusion([0]);
      this.layer = this.map.createLayer('Tile Layer 1');
      this.layer.resizeWorld();

      //Creacion de jugador
      this.player = this.add.sprite(100, 1000, 'player');
      this.player.anchor.setTo(0.5, 0.5);
      this.player.health = 2

      //Creacion de Enemigos
      this.enemies = this.add.group();
      this.enemies.enableBody = true;
      this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
      this.enemies.setAll('body.collideWorldBounds', true);

        this.enemy=this.enemies.create(800,600, 'enemy');
        this.enemy.anchor.setTo(0.5,0.5);
        this.enemy.body.velocity.x = -150
        this.enemy1=this.enemies.create(1000,800, 'enemy');
        this.enemy1.anchor.setTo(0.5,0.5);
        this.enemy1.body.velocity.x = -150
        this.enemy2=this.enemies.create(1500,100, 'enemy');
        this.enemy2.anchor.setTo(0.5,0.5);
        //this.enemy2.body.velocity.x = -150
        /*this.enemy=this.enemies.create(570,100, 'enemy');
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
        this.enemy.anchor.setTo(0.5,0.5);*/

      //Creacion de la "caja" del arma, ataque principal
      this.weapon = this.add.sprite(this.player.x+35,this.player.y-20,'')
      
      //Activa las fisicas en objetos
      this.game.physics.enable([this.enemy,this.player,this.weapon], Phaser.Physics.ARCADE);

      //Caracteristicas enemigos
      this.enemies.setAll('body.gravity.y', 300);
      this.enemies.setAll('body.collideWorldBounds', true);

      //Caracteristicas personaje
      this.player.body.gravity.y = 300;
      this.player.body.drag.setTo(600, 0);
      this.player.body.collideWorldBounds = true;

      this.player.animations.add('right', [1,2,3,4,5], 8, true);
      this.player.animations.add('left', [1,2,3,4,5], 8, true);

      //Caracteristicas arma, ataque principal
      this.weapon.body.collideWorldBounds = true;
      this.weapon.body.drag.setTo(600, 0);
      this.weapon.body.setSize(90,40,0,0)

      //Variables salto
      this.canDoubleJump = true
      this.canVariableJump = true

      //Centrado de la camara en el personaje
      this.camera.follow(this.player);

    },

    update: function () {
      //Movimiento arma
      
      this.weapon.y = this.player.y - 20

      //Colisiones
      this.game.physics.arcade.collide(this.player, this.layer);
      this.game.physics.arcade.collide(this.enemies, this.layer);
      this.game.physics.arcade.collide(this.enemies, this.enemies);
      this.game.physics.arcade.collide(this.player, this.enemies);

      //Movimiento personaje
      if (this.input.keyboard.isDown(Phaser.Keyboard.A))
      {
        this.player.body.setSize(133,145,0,0)
        this.player.body.velocity.x = -150;
        this.weapon.body.velocity.x = -150
        this.weapon.x = this.player.x - 125
        this.weapon.y = this.player.y - 20
        if (this.facing != 'left')
        {
            this.player.animations.play('left');
            this.facing = 'left';
        }
      }
      else if (this.input.keyboard.isDown(Phaser.Keyboard.D))
      {
        this.player.body.setSize(133,145,0,0)
        this.player.body.velocity.x = 150;
        this.weapon.body.velocity.x = 150
        this.weapon.x = this.player.x + 35
        this.weapon.y = this.player.y - 20
        if (this.facing != 'right')
        {
            this.player.animations.play('right');
            this.facing = 'right';
        }
      }
      else
      {
        if (this.facing != 'idle')
        {
            this.player.animations.stop();

            if (this.facing == 'left')
            {
                this.player.body.setSize(90,145,0,0)
                this.player.frame = 0;
            }
            else
            {
                this.player.body.setSize(90,145,0,0)
                this.player.frame = 0;
            }

            this.facing = 'idle';
        }
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
        
      if (this.canDoubleJump || this.player.body.onFloor()) {
            // Jump when the player is touching the ground or they can double jump
            this.player.body.velocity.y = -350;

            // Disable ability to double jump if the player is jumping in the air
            if (!this.player.body.onFloor()) this.canDoubleJump = false;
          }
        }

      // Don't allow variable jump height after the jump button is released
      if (!this.input.keyboard.isDown(Phaser.Keyboard.W)) {
        this.canVariableJump = false;
      }
      
      if (this.enemy.body.x <= 600){
          this.enemy.body.velocity.x = +150
      } else if (this.enemy.body.x >= 900){
          this.enemy.body.velocity.x = -150
      }

      if (this.enemy1.body.x <= 0){
        this.enemy1.body.velocity.x = +150
      } else if (this.enemy1.body.x >= 1200){
          this.enemy1.body.velocity.x = -150
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

    render: function () {
      
      this.game.debug.body(this.enemies);
      this.game.debug.body(this.player);
      this.game.debug.body(this.weapon);
    }

  };

  window['orphan'] = window['orphan'] || {};
  window['orphan'].Game = Game;

}());
