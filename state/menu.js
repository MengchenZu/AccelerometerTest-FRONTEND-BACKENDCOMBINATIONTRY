/**
 * Created by lp1lp on 7/6/15.
 */

var menuState = {
    create: function(){
        this.game.add.image(0,0,'background');

        var nameLabel = this.game.add.text(this.game.world.centerX,70,'Accelerometer',{font:'70px Geo',fill:'#ff4040'});
        nameLabel.anchor.setTo(0.5,0.5);

        if(!localStorage.getItem('bestScore')){
            localStorage.setItem('bestScore',0);
        }
        if(!this.game.global.score>localStorage.getItem('bestScore')){
            localStorage.setItem('bestScore',this.game.global.score);
        }

        var text1 = 'score: ' + this.game.global.score + '\nbest score: ' + localStorage.getItem('bestScore');
        var scoreLabel = this.game.add.text(this.game.world.centerX,this.game.world.centerY,text1,{font: '25px Arial', fill:'#ff4040',align:'center'});
        scoreLabel.anchor.setTo(0.5,0.5);


        if(this.game.device.desktop){
            text2 = 'press the space to start';
        }else{        text2 = 'touch the screen to start';
        }


        var startLabel=this.game.add.text(this.game.world.centerX,this.game.world.height-80,text2,{font:'25px Arial',fill:'#ff4040'});
        startLabel.anchor.setTo(0.5,0.5);

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.addOnce(this.start,this);
        this.game.input.onDown.addOnce(this.start,this);
    },

    start:function(){
        this.game.state.start('play');
    }
}