/**
 * Created by lp1lp on 7/6/15.
 */

var loadState = {
    preload: function() {
        var loadingLabel = this.game.add.text(this.game.world.centerX, 150, 'loading...', {
            font: '30px Arial',
            fill: '#ff4040'
        });
        loadingLabel.anchor.setTo(0.5, 0.5);

        var progressBar = this.game.add.sprite(this.game.world.centerX, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        this.game.load.setPreloadSprite(progressBar);

        //this.game.load.image('player', 'assets/ENRGA0.png');
        //this.game.load.image('player1', 'assets/green-ball.png');
        //this.game.load.image('player2', 'assets/1314063744989836278red ball.png');
        this.game.load.image('background', 'assets/tumblr_inline_nn85u7GugQ1rewzq7_500.png');
    },
    create: function(){
            this.game.state.start('menu');
    }
};