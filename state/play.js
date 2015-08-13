/**
 * Created by lp1lp on 7/6/15.
 */

var playState = {
    create: function(){
        this.game.global.score = 0;
        //this.game.world.setBounds(0,0,480,320);
        this.game.world.setBounds(0,0,1600,1600);
        this.game.add.tileSprite(0,0,this.game.world.width,this.game.world.height,'background');

        //this.game.camera.bounds.setTo(-this.game.width/2,-this.game.height/2,this.game.world.width+this.game.width,this.game.world.height+this.game.height);
        this.speed_base = 5000;
        this.mass = 20;
        this.speed = this.speed_base / this.mass;
        this.x = this.game.world.randomX;
        this.y = this.game.world.randomY;

        this.color = this.generateColor();
        this.generateEnemy();
        this.generateParticle();
        this.generateSprite(this.mass, this.x, this.y);

        this.cursor = this.game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,Phaser.Keyboard.DOWN,Phaser.Keyboard.LEFT,Phaser.Keyboard.RIGHT]);
        /*this.createWorld();
        if(!game.device.desktop){
            this.addMobileInputs();
        }*/

        var text1 = 'score: ' + this.game.global.score;
        this.scoreLabel = this.game.add.text(0, 0,text1,{font: '25px Arial', fill:'#ff4040',align:'center'});
        this.scoreLabel.anchor.setTo(0,0);
        this.scoreLabel.fixedToCamera = 1;
    },

    generateSprite: function(size,x,y) {
        var circle = this.generateCircle1(this.color,size);

        this.player = this.game.add.sprite(x,y,circle);
        this.player.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.player);
        //this.setCollision();
        this.player.color = this.color;
        this.player.mass = size;
        this.player.speed_base = 5000;
        this.player.speed = this.player.speed_base / this.player.mass;
        this.player.body.collideWorldBounds = true;
        this.game.camera.follow(this.player);
    },

    generateParticle: function(){
       this.particles = this.game.add.group();
       //this.game.physics.arcade.enable(this.particles);
        this.particles.enableBody = true;
        for(var i = 0;i < 200; i++) {
            this.color = this.generateColor();
            var circle2 = this.generateCircle2(this.color);
            this.particle = this.particles.create(this.game.world.randomX, this.game.world.randomY, circle2);
            this.particle.anchor.setTo(0.5,0.5);
            this.particle.color = this.color;
        }
    },

    generateEnemy: function(){
        this.enemies = this.game.add.group();
        this.game.physics.arcade.enable(this.enemies);
        this.enemies.enableBody = true;
        for(var i = 0;i < 10; i++) {
            this.color = this.generateColor();
            var mass = this.game.rnd.integerInRange(this.mass * 0.5,this.mass * 3);
            var circle3 = this.generateCircle3(this.color, mass);
            this.enemy = this.enemies.create(this.game.world.randomX, this.game.world.randomY, circle3);
            this.enemy.anchor.setTo(0.5,0.5);
            this.enemy.color = this.color;
            this.enemy.mass = mass;
        }
    },

     generateColor: function(){
        var color = ['#0000FF','#FF0000','#00FF00'];
        return color[this.game.rnd.integerInRange(0,2)];
    },

    generateCircle1: function(color,size){
        var bitmapSize = this.mass * 2 * size / 20;
        var circle = this.game.add.bitmapData(bitmapSize,bitmapSize);
        circle.ctx.fillStyle = this.color;
        circle.ctx.beginPath();
        //circle.ctx.arc(this.mass,this.mass,this.mass,0,Math.PI*2,true);
        circle.ctx.arc(bitmapSize/2,bitmapSize/2,bitmapSize/2,0,Math.PI*2,true);
        circle.ctx.closePath();
        circle.ctx.fill();
        return circle;
    },

    generateCircle2: function(color){
        var bitmapSize2 = this.mass * 0.2 * 2;
        var circle2 = this.game.add.bitmapData(bitmapSize2,bitmapSize2);
        //circle2.ctx.fillStyle = this.color;
        circle2.ctx.fillStyle = color;
        circle2.ctx.beginPath();
        //circle2.ctx.arc(this.mass*0.6,this.mass*0.6,this.mass*0.6,0,Math.PI*2,true);
        circle2.ctx.arc(bitmapSize2/2,bitmapSize2/2,bitmapSize2/2,0,Math.PI*2,true);
        circle2.ctx.closePath();
        circle2.ctx.fill();
        return circle2;
    },

    generateCircle3: function(color, mass){
        var bitmapSize3 = mass * 2;
        var circle3 = this.game.add.bitmapData(bitmapSize3,bitmapSize3);
        //var randomValue = this.game.rnd.integerInRange(this.mass*0.6,this.mass*20);
        //var RV1 = randomValue;
        //circle3.ctx.fillStyle = this.color;
        circle3.ctx.fillStyle = color;
        circle3.ctx.beginPath();
        //circle3.ctx.arc(RV1,RV1,RV1,0,Math.PI*2,true);
        circle3.ctx.arc(bitmapSize3/2,bitmapSize3/2,bitmapSize3/2,0,Math.PI*2,true);
        circle3.ctx.closePath();
        circle3.ctx.fill();
        return circle3;
    },


     /*setCollision: function(){
        this.sprite.body.setCircle(this.sprite.width/2);
        this.sprite.body.fixedRotation = false;
        this.sprite.body.setCollisionGroup(this.groupCollision[0]);
        this.sprite.body.collides(this.groupCollision[1],this.enemyCallback,this);
    },*/

     /*enemyCallback: function(body1,body2) {
         if (body2.sprite.alive && this.sprite.mass - (this.sprite.mass * 0.2) > body2.sprite.mass) {
             this.mass += body2.sprite.mass;
             this.speed = this.sprite.speed_base / this.sprite.mass;
             this.x = this.sprite.x;
             this.y = this.sprite.y;

             this.sprite.kill();
             this.generateSprite();

             var enemy = {
                 speed: body2.sprite.speed,
                 mass: body2.sprite.mass,
                 color: body2.sprite.color,
                 x: body2.sprite.x,
                 y: body2.sprite.y,
                 height: body2.sprite.height,
                 width: body2.sprite.width,
                 killed: body2.sprite.killed
             };

             body2.sprite.kill();
         } else if (this.sprite.alive && body2.sprite.mass - (body2.sprite.mass * 0.2) > this.sprite.mass) {
             this.sprite.kill();
         }
     },*/

     update: function() {
         this.game.physics.arcade.overlap(this.player, this.particles, this.collisionParticle, null, this);
         this.game.physics.arcade.overlap(this.player, this.enemies, this.collisionEnemy, null, this);

         this.color = this.generateColor();
         if(this.enemies.length < 10) this.addenemy();
         if(this.particles.length < 200) this.addparticle();

         this.movePlayerMouse();
         this.moveEnemies();
         this.moveParticles();

         this.setGravity();
     },

    addparticle: function() {
        var circle2 = this.generateCircle2(this.color);
        this.particle = this.particles.create(this.game.world.randomX, this.game.world.randomY, circle2);
        this.particle.color = this.color;
        this.particle.anchor.setTo(0.5,0.5);
    },

    addenemy: function() {
        var mass = this.game.rnd.integerInRange(this.mass * 0.5,this.mass * 3);
        var circle3 = this.generateCircle3(this.color, mass);
        this.enemy = this.enemies.create(this.game.world.randomX, this.game.world.randomY, circle3);
        this.enemy.anchor.setTo(0.5,0.5);
        this.enemy.mass = mass;
    },

    collisionParticle: function(player,particle) {
        var mass = 20;
        if(particle.color == this.player.color) {
            this.game.global.score += 5;
            this.scoreLabel.text =  'score: ' + this.game.global.score;
            mass = this.player.mass + 1;
        }
        else {
            mass = this.player.mass;
        }
        this.particles.remove(particle);
        var x = this.player.x;
        var y = this.player.y;
        this.player.kill();
        this.generateSprite(mass,x,y);
    },

    collisionEnemy: function(player,enemy) {
        mass = this.player.mass * 0.5;
        if(mass < 20) mass = 20;
        this.enemies.remove(enemy);
        var x = this.player.x;
        var y = this.player.y;
        this.player.kill();
        this.generateSprite(mass,x,y);
    },

    moveEnemies: function() {
        for(var i = 0;i < this.enemies.length; i++) {
            this.enemy = this.enemies.getAt(i);
            this.enemy.body.velocity.x = 0;
            this.enemy.body.velocity.y = 0;
        }
    },

    moveParticles: function () {
        for(var i = 0;i < this.particles.length; i++) {
            this.particle = this.particles.getAt(i);
            this.particle.body.velocity.x = 0;
            this.particle.body.velocity.y = 0;
        }
    },

    movePlayerMouse: function() {
        var x = this.game.input.mousePointer.x + this.game.camera.x - this.player.x;
        var y = this.game.input.mousePointer.y + this.game.camera.y - this.player.y;

        if(!this.game.math.fuzzyEqual(x, 0, 4)) {
            this.player.body.velocity.x = this.player.speed * x / Math.sqrt(x * x + y * y);
        }
        else {
            this.player.body.velocity.x = 0;
        }
        if(!this.game.math.fuzzyEqual(y, 0, 4)) {
            this.player.body.velocity.y = this.player.speed * y / Math.sqrt(x * x + y * y);
        }
        else {
            this.player.body.velocity.y = 0;
        }
    },

    setGravity: function() {
        for(var i = 0;i < this.enemies.length; i++) {
            this.enemy = this.enemies.getAt(i);
            var x = this.enemy.x - this.player.x;
            var y = this.enemy.y - this.player.y;
            var r = Math.sqrt(x * x + y * y);
            if(r < 5 * this.enemy.mass) {
                this.player.body.velocity.x += x * this.enemy.mass * 20000/ (r * r * r);
                this.player.body.velocity.y += y * this.enemy.mass * 20000/ (r * r * r);
            }
            if(r < 5 * this.player.mass) {
                this.enemy.body.velocity.x -= x * this.player.mass * 20000/ (r * r * r);
                this.enemy.body.velocity.y -= y * this.player.mass  * 20000/ (r * r * r);
            }
        }

        for(i = 0;i < this.particles.length; i++) {
            this.particle = this.particles.getAt(i);
            x = this.particle.x - this.player.x;
            y = this.particle.y - this.player.y;
            r = Math.sqrt(x * x + y * y);
            if(r < 5 * this.player.mass) {
                this.particle.body.velocity.x -= x * this.player.mass * 20000/ (r * r * r);
                this.particle.body.velocity.y -= y * this.player.mass  * 20000/ (r * r * r);
            }
        }
    },

       addEnemy: function(){
           var enemy = this.enemies.getFirstDead();
           if(!enemy){
               return;
           }
           enemy.anchor.setTo(0.5,0.5);
           enemy.reset(this.x,this.y);
           enemy.body.velocity.x = this.enemies.speed*Phaser.Math.randomSign();
           enemy.checkWorldBounds = true;
           enemy.outOfBoundKill = true;

       },

        quitgame: function(){
            this.game.state.start('menu');
        },

        render: function(){

        }
}