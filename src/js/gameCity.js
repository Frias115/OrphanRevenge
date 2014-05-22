(function() {
  'use strict';

  function GameCity() {
    this.player = null;
    this.enemy = null;
    this.rats = null;
    this.boars = null;
    this.timer = 0
    this.t = 0
    this.relocate = true;
  }

  GameCity.prototype = {

    create: function () {
      var x = this.game.width / 2
      , y = this.game.height / 2;

      
      //Inicio del sistema de fisicas
      this.game.physics.startSystem(Phaser.Physics.ARCADE); 

      this.game.stage.backgroundColor = '#000000';

      this.bg = this.game.add.tileSprite(0, 0, 1024, 768, 'background');
      this.bg.fixedToCamera = true;
      

      //Carga de mapa
      this.map = this.game.add.tilemap('map2');
      this.map.addTilesetImage('groundCity');
      this.map.addTilesetImage('platformCity');
      this.map.setCollisionByExclusion([0]);
      this.layer = this.map.createLayer('Tile Layer 1');
      this.layer.resizeWorld();

      //Musica de fondo

      //Creacion de jugador
      this.player = this.add.sprite(0, 0, 'player');//100,500
      this.player.anchor.setTo(0.5, 0.5);

      //Creacion de Enemigos
      this.rats = this.add.group();
      this.rats.enableBody = true;
      this.rats.physicsBodyType = Phaser.Physics.ARCADE;
      this.rats.setAll('body.collideWorldBounds', true);



      this.boars = this.add.group();
      this.boars.enableBody = true;
      this.boars.physicsBodyType = Phaser.Physics.ARCADE;
      this.boars.setAll('body.collideWorldBounds', true);

        this.boar=this.boars.create(3100,1400, 'enemy');
        this.boar.anchor.setTo(0.5,0.5);
        this.boar1=this.boars.create(1100, 1400, 'enemy');
        this.boar1.anchor.setTo(0.5,0.5);


      this.crowns = this.add.group();
      this.crowns.enableBody = true;
      this.crowns.physicsBodyType = Phaser.Physics.ARCADE;
      this.crowns.setAll('body.collideWorldBounds', true);

        this.crown=this.crowns.create(3100,400, 'crown');
        this.crown.anchor.setTo(0.5,0.5);
        this.crown1=this.crowns.create(2000, 700, 'crown');
        this.crown1.anchor.setTo(0.5,0.5);


      this.spiders = this.add.group();
      this.spiders.enableBody = true;
      this.spiders.physicsBodyType = Phaser.Physics.ARCADE;
      this.spiders.setAll('body.collideWorldBounds', true);



      //Creacion de la "caja" del arma, ataque principal
      this.weapon = this.add.sprite(this.player.x+35,this.player.y-20,'')
      
      //Activa las fisicas en objetos
      this.game.physics.enable([this.rats,this.boars,this.crowns,this.player,this.weapon], Phaser.Physics.ARCADE);

      //Caracteristicas enemigos
      this.rats.setAll('body.gravity.y', 300);
      this.rats.setAll('body.velocity.x', -150)

      this.boars.setAll('body.gravity.y', 300);
      this.boars.setAll('body.velocity.x', -150)

      this.crowns.setAll('body.velocity.x', -150)


      this.crown.animations.add('flyL', [8,7,6,5,4,3,2,1,0], 8, true)
      this.crown.animations.add('flyR', [9,10,11,12,13,14,15,16,17], 8, true)
      this.crown1.animations.add('flyL', [8,7,6,5,4,3,2,1,0], 8, true)
      this.crown1.animations.add('flyR', [9,10,11,12,13,14,15,16,17], 8, true)

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
      this.weapon.body.setSize(50,90,0,0)

      this.healthTxt = this.add.bitmapText(20, 20, 'minecraftia', 'Health: ' );
      this.healthTxt.fixedToCamera = true

      //Variables salto
      this.canDoubleJump = true
      this.canVariableJump = true

      //Centrado de la camara en el personaje
      this.camera.follow(this.player);

    },

    update: function () {
      if (this.relocate === true){
        this.player.x = -4000
        this.player.y = 500
        this.relocate = false
      }

      //Colisiones
      this.game.physics.arcade.collide(this.rats, this.layer);
      this.game.physics.arcade.collide(this.boars, this.layer);
      this.game.physics.arcade.collide(this.crowns, this.layer);

      this.game.physics.arcade.collide(this.player, this.layer);

      if (this.invincibility === false)
      {
      this.game.physics.arcade.overlap(this.player, this.rats,
        function (player, enemy) {
                window['orphan'].Global.health -= 1
                this.invincibility = true
                this.invTimer = this.game.time.now + 1500
          }, null, this)
      this.game.physics.arcade.overlap(this.player, this.boars,
        function (player, enemy) {
                window['orphan'].Global.health -= 1 
                this.invincibility = true
                this.invTimer = this.game.time.now + 1500
          }, null, this)
      this.game.physics.arcade.overlap(this.player, this.crowns,
          function (player, enemy) {
                window['orphan'].Global.health -= 1
                this.invincibility = true
                this.invTimer = this.game.time.now + 1500
          }, null, this)
      }
      else
      {
        if (this.game.time.now > this.invTimer){
          this.invincibility = false
          this.invTimer = this.game.time.now + 1500
        }
      }

      this.healthTxt.setText ('Health: ' + window['orphan'].Global.health)

      if(window['orphan'].Global.health === 0)
      {
       this.game.state.start('menu');
      }

      //Movimiento arma
      this.weapon.y = this.player.y - 40

      //Movimiento personaje
      if (this.input.keyboard.isDown(Phaser.Keyboard.A))
      {
        this.player.body.setSize(133,145,0,0)
        this.player.body.velocity.x = -150;
        this.weapon.body.velocity.x = -150
        this.weapon.x = this.player.x - 85
        this.weapon.y = this.player.y - 40
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
        this.weapon.y = this.player.y - 40
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
      console.log(this.player.animations.currentAnim._frameIndex)
      //Ataque principal
      if (this.input.keyboard.isDown(Phaser.Keyboard.K))
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

        if (this.player.animations.currentAnim._frameIndex >= 0)
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
      this.movement(this.boar, 2500, 3500, -200, true, 250, false)
      this.movement(this.boar1, 800, 1500, -200, true, 250, false)
      this.movement(this.crown, 2500, 3500, -150, false, 250, true, 350, 650)
      this.movement(this.crown1, 1500, 2200, -150, false, 250, true, 600, 800)
      














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





    },

    movement: function (enemy, fromx, tox, vel, charge, distaceBW, flycharge, fromy, toy) {
      if (enemy.body.x <= fromx){
          enemy.body.velocity.x = (vel * -1)
          if (flycharge === true)
          {
            enemy.animations.play('flyR');
          }
      } else if (enemy.body.x >= tox){
          enemy.body.velocity.x = (vel)
          if (flycharge === true)
          {
            enemy.animations.play('flyL');
          }
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
          enemy.animations.play('flyR');
        } else if (enemy.body.y >= toy){
          enemy.body.velocity.x = (vel)
          enemy.body.velocity.y = -20
          enemy.animations.play('flyL');
        }
      }
    },

    render: function () {
      
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
  window['orphan'].GameCity = GameCity;

}());
