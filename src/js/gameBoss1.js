(function() {
  'use strict';

  function GameBoss1() {
    this.player = null;
    this.enemy = null;
    this.rats = null;
    this.boars = null;
    this.timer = 0
    this.t = 0
  }

  GameBoss1.prototype = {

    create: function () {
      var x = this.game.width / 2
      , y = this.game.height / 2;

      
      //Inicio del sistema de fisicas
      this.game.physics.startSystem(Phaser.Physics.ARCADE); 

      this.game.stage.backgroundColor = '#000000';

      this.bg = this.game.add.tileSprite(0, 0, 1024, 768, 'background');
      this.bg.fixedToCamera = true;
      

      //Carga de mapa
      this.map = this.game.add.tilemap('mapBoss1');
      this.map.addTilesetImage('groundCity');
      this.map.setCollisionByExclusion([0]);
      this.layer = this.map.createLayer('Tile Layer 1');
      this.layer.resizeWorld();

      //Musica de fondo
      this.music = this.add.audio('bgMusic')
      this.music.play('',0,0.5,true)

      //Creacion de jugador
      this.player = this.add.sprite(100, 1000, 'player');
      this.player.anchor.setTo(0.5, 0.5);
      this.player.health = 2

      //Creacion de Enemigos
      this.rats = this.add.group();
      this.rats.enableBody = true;
      this.rats.physicsBodyType = Phaser.Physics.ARCADE;
      this.rats.setAll('body.collideWorldBounds', true);

        this.rat=this.rats.create(800,600, 'enemy');
        this.rat.anchor.setTo(0.5,0.5);
        this.rat1=this.rats.create(1000,800, 'enemy');
        this.rat1.anchor.setTo(0.5,0.5);


      this.boars = this.add.group();
      this.boars.enableBody = true;
      this.boars.physicsBodyType = Phaser.Physics.ARCADE;
      this.boars.setAll('body.collideWorldBounds', true);

        this.boar=this.boars.create(1500,100, 'enemy');
        this.boar.anchor.setTo(0.5,0.5);


      this.crowns = this.add.group();
      this.crowns.enableBody = true;
      this.crowns.physicsBodyType = Phaser.Physics.ARCADE;
      this.crowns.setAll('body.collideWorldBounds', true);

        this.crown=this.crowns.create(1500,400, 'enemy');
        this.crown.anchor.setTo(0.5,0.5);


      this.spiders = this.add.group();
      this.spiders.enableBody = true;
      this.spiders.physicsBodyType = Phaser.Physics.ARCADE;
      this.spiders.setAll('body.collideWorldBounds', true);

        this.spider=this.spiders.create(1500,400, 'enemy');
        this.spider.anchor.setTo(0.5,0.5);

      //Creacion de la "caja" del arma, ataque principal
      this.weapon = this.add.sprite(this.player.x+35,this.player.y-20,'')
      
      //Activa las fisicas en objetos
      this.game.physics.enable([this.rats,this.boars,this.crowns,this.player,this.weapon], Phaser.Physics.ARCADE);

      //Caracteristicas enemigos
      this.rats.setAll('body.gravity.y', 300);
      this.rats.setAll('body.collideWorldBounds', true);
      this.rats.setAll('body.velocity.x', -150)

      this.boars.setAll('body.gravity.y', 300);
      this.boars.setAll('body.collideWorldBounds', true);
      this.boars.setAll('body.velocity.x', -150)

      this.crowns.setAll('body.collideWorldBounds', true);
      this.crowns.setAll('body.velocity.x', -150)

      this.crowns.setAll('body.collideWorldBounds', true);

      //Caracteristicas personaje
      this.player.body.gravity.y = 300;
      this.player.body.drag.setTo(600, 0);
      this.player.body.collideWorldBounds = true;

      this.player.animations.add('right', [1,2,3,4,5], 8, true)
      this.player.animations.add('left', [6,7,8,9,10], 8, true)
      this.player.animations.add('jumpR', [12,13,14,15], 8)
      this.player.animations.add('jumpL', [29,28,27,26], 8)
      this.player.animations.add('fallR', [17,18,19,20], 8)
      this.player.animations.add('fallL', [24,23,22,21], 8)
      this.player.animations.add('attackR', [30,31,32,33,34], 10)
      this.player.animations.add('attackL', [39,38,37,36,35], 10)

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
      //Colisiones
      this.game.physics.arcade.collide(this.rats, this.layer);
      this.game.physics.arcade.collide(this.boars, this.layer);
      this.game.physics.arcade.collide(this.crowns, this.layer);

      this.game.physics.arcade.collide(this.player, this.layer);

      this.game.physics.arcade.overlap(this.player, this.rats);
      this.game.physics.arcade.overlap(this.player, this.boars);
      this.game.physics.arcade.overlap(this.player, this.crowns);

      //Movimiento arma
      this.weapon.y = this.player.y - 20

      //Movimiento personaje
      if (this.input.keyboard.isDown(Phaser.Keyboard.A))
      {
        this.player.body.setSize(133,145,0,0)
        this.player.body.velocity.x = -150;
        this.weapon.body.velocity.x = -150
        this.weapon.x = this.player.x - 125
        this.weapon.y = this.player.y - 20
        if (this.facing !== 'left')
        {
            this.player.animations.play('left');
            this.facing = 'left';
            this.facingATT = 'left'
            this.facingJ = 'left'
        }
      }
      else if (this.input.keyboard.isDown(Phaser.Keyboard.D))
      {
        this.player.body.setSize(133,145,0,0)
        this.player.body.velocity.x = 150;
        this.weapon.body.velocity.x = 150
        this.weapon.x = this.player.x + 35
        this.weapon.y = this.player.y - 20
        if (this.facing !== 'right')
        {
            this.player.animations.play('right');
            this.facing = 'right';
            this.facingATT = 'right'
            this.facingJ = 'right'
        }
      }
      else
      {
        if (this.facing !== 'idle')
        {
            this.player.animations.stop();

            if (this.facing === 'left')
            {
                this.player.body.setSize(90,145,0,0)
                this.player.frame = 11;
                this.facingATT = 'left'
                this.facingJ = 'left'
            }
            else
            {
                this.player.body.setSize(90,145,0,0)
                this.player.frame = 0;
                this.facingATT = 'right'
                this.facingJ = 'right'
            }

            this.facing = 'idle';
        }
      }

      //Ataque principal
      if (this.input.keyboard.isDown(Phaser.Keyboard.K))
      {
        console.log(this.player.animations.currentAnim._frameIndex)

        this.checkATT = 'bleh'

      }
      else if (this.checkATT === 'bleh')
      {
        if (this.facingATT !== 'left')
        {
            this.player.animations.play('attackR');
            this.facingATT = 'right'
            this.checkATT = 'hue'
        } else if (this.facingATT !== 'right')
        {
            this.player.animations.play('attackL');
            this.facingATT = 'left'
            this.checkATT = 'hue'
        }

        if (this.player.animations.currentAnim._frameIndex >= 4)
        {
          this.physics.arcade.overlap(this.weapon, this.rats, 
          function (player, enemy) {
                enemy.kill();
          }, null, this);

          this.physics.arcade.overlap(this.weapon, this.boars, 
          function (player, enemy) {
                enemy.kill();
          }, null, this);

          this.physics.arcade.overlap(this.weapon, this.crowns, 
          function (player, enemy) {
                enemy.kill();
          }, null, this);
        }
      }
      else
      {
        if (this.player.animations.currentAnim.isFinished === true)
        {
            this.player.animations.stop('attackL');
            this.player.animations.stop('attackR');

            if (this.facingATT === 'left')
            {
                this.player.body.setSize(90,145,0,0)
                this.player.frame = 11;
                this.facingATT = 'left'
            }
            else
            {
                this.player.body.setSize(90,145,0,0)
                this.player.frame = 0;
                this.facingATT = 'right'
            }
        }
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
            this.checkJ = 'jumping'


            // Disable ability to double jump if the player is jumping in the air
            if (!this.player.body.onFloor()) this.canDoubleJump = false;
        }
      }
      else if (this.checkJ === 'jumping')
      {
        if (this.facingJ !== 'left')
        {
        this.player.animations.play('jumpR');
        this.facingJ = 'right'
        this.checkJ = 'hue'
        } else if (this.facingJ !== 'right')
        {
        this.player.animations.play('jumpL');
        this.facingJ = 'left'
        this.checkJ = 'hue'
        }
      }
      else
      {
        if (this.player.animations.currentAnim.isFinished === true)
        {
            this.player.animations.stop('jumpL');
            this.player.animations.stop('jumpR');

            if (this.facingJ === 'left')
            {
                this.player.body.setSize(90,145,0,0)
                this.player.frame = 11;
                this.facingJ = 'left'
            }
            else if (this.facingJ === 'right')
            {
                this.player.body.setSize(90,145,0,0)
                this.player.frame = 0;
                this.facingJ = 'right'
            }

            if (this.input.keyboard.isDown(Phaser.Keyboard.D) === true)
            {
              this.player.animations.play('right');
            }
            else if (this.input.keyboard.isDown(Phaser.Keyboard.A) === true)
            {
              this.player.animations.play('left');
            }

            this.checkJ = 'idle';
        }
      }


      // Don't allow variable jump height after the jump button is released
      if (!this.input.keyboard.isDown(Phaser.Keyboard.W)) {
        this.canVariableJump = false;
      }


      //Movimiento enemigos (Ver funcion)
      this.movement(this.boar, 1000, 2000, -200, true, 500, false)
      this.movement(this.rat, 600, 900, -150, false, 500, false)
      this.movement(this.rat1, 2, 1200, -150, false, 500, false)
      this.movement(this.crown, 2, 1200, -150, false, 100, true, 500, 600)
      

















/*if (this.input.keyboard.isDown(Phaser.Keyboard.K))
      {

        this.checkATT = 'bleh'

      }
      else if (this.checkATT === 'bleh')
      {
        if (this.facingATT !== 'left')
        {
            this.player.animations.play('attackR');
            this.facingATT = 'right'
            this.checkATT = 'hue'
        } else if (this.facingATT !== 'right')
        {
            this.player.animations.play('attackL');
            this.facingATT = 'left'
            this.checkATT = 'hue'
        }

        if (this.player.animations.currentAnim._frameIndex >= 4)
        {
          this.physics.arcade.overlap(this.weapon, this.rats, 
          function (player, enemy) {
                enemy.kill();
          }, null, this);

          this.physics.arcade.overlap(this.weapon, this.boars, 
          function (player, enemy) {
                enemy.kill();
          }, null, this);

          this.physics.arcade.overlap(this.weapon, this.crowns, 
          function (player, enemy) {
                enemy.kill();
          }, null, this);
        }
      }
      else
      {
        if (this.player.animations.currentAnim.isFinished === true)
        {
            this.player.animations.stop('attackL');
            this.player.animations.stop('attackR');

            if (this.facingATT === 'left')
            {
                this.player.body.setSize(90,145,0,0)
                this.player.frame = 11;
                this.facingATT = 'left'
            }
            else
            {
                this.player.body.setSize(90,145,0,0)
                this.player.frame = 0;
                this.facingATT = 'right'
            }
        }
      }*/



    /*if (this.input.keyboard.isDown(Phaser.Keyboard.K))
      {
        if (this.facingATT !== 'left')
        {
            this.player.animations.play('attackR');
            this.facingATT = 'right'
            this.checkATT = 'bleh'
        } else if (this.facingATT !== 'right')
        {
            this.player.animations.play('attackL');
            this.facingATT = 'left'
            this.checkATT = 'bleh'
        }

        if (this.player.animations.currentAnim._frameIndex >= 4)
        {
          this.physics.arcade.overlap(this.weapon, this.rats, 
          function (player, enemy) {
                enemy.kill();
          }, null, this);

          this.physics.arcade.overlap(this.weapon, this.boars, 
          function (player, enemy) {
                enemy.kill();
          }, null, this);

          this.physics.arcade.overlap(this.weapon, this.crowns, 
          function (player, enemy) {
                enemy.kill();
          }, null, this);
        }
      }
      else
      {
        if (this.checkATT !== 'idle')
        {
            this.player.animations.stop('attackL');
            this.player.animations.stop('attackR');

            if (this.facingATT === 'left')
            {
                this.player.body.setSize(90,145,0,0)
                this.player.frame = 11;
                this.facingATT = 'left'
            }
            else
            {
                this.player.body.setSize(90,145,0,0)
                this.player.frame = 0;
                this.facingATT = 'right'
            }

            this.checkATT = 'idle';
        }
      }*/




















































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

    movement: function (enemy, fromx, tox, vel, charge, distaceBW, flycharge, fromy, toy) {
      if (enemy.body.x <= fromx){
          enemy.body.velocity.x = (vel * -1)
      } else if (enemy.body.x >= tox){
          enemy.body.velocity.x = (vel)
      }

      if (charge === true){
        if(this.physics.arcade.distanceBetween(this.player, enemy)<=distaceBW)
        {  
          if (this.game.time.now < this.t){
            this.moveToObjectHM(enemy, this.player, 150, 500);
          }
        
          if (this.game.time.now > this.timer){
            this.t = this.game.time.now+500
            this.timer = this.game.time.now+4000
          }
        }
      }

      if (flycharge === true){
        if(this.physics.arcade.distanceBetween(this.player, enemy)<=distaceBW)
        {  
          if (this.game.time.now < this.t){
            this.physics.arcade.moveToObject(enemy, this.player, 150, 500);
          }
        
          if (this.game.time.now > this.timer){
            this.t = this.game.time.now+500
            this.timer = this.game.time.now+4000
          }
        }
        
        if (enemy.body.y <= fromy) {
          enemy.body.velocity.x = (vel * -1)
          enemy.body.velocity.y = 20
        } else if (enemy.body.y >= toy){
          enemy.body.velocity.x = (vel)
          enemy.body.velocity.y = -20
        }
      }
    },

    render: function () {
      
      //this.game.debug.body(this.rat);
      //this.game.debug.body(this.boar);
      this.game.debug.body(this.crown);
      this.game.debug.body(this.player);
      this.game.debug.body(this.weapon);
    },

    moveToObjectHM: function (displayObject, destination, speed, maxTime) {

        this._angle = Math.atan2(destination.y - displayObject.y, destination.x - displayObject.x);

        if (maxTime > 0)
        {
            //  We know how many pixels we need to move, but how fast?
            speed = this.physics.arcade.distanceBetween(displayObject, destination) / (maxTime / 1000);
        }

        displayObject.body.velocity.x = Math.cos(this._angle) * speed;
        

        return this._angle;

    },

  };

  window['orphan'] = window['orphan'] || {};
  window['orphan'].GameBoss1 = GameBoss1;

}());
