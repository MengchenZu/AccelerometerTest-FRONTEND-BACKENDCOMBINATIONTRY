/**
 * Created by lp1lp on 7/6/15.
 */

var game = new Phaser.Game(480,320,Phaser.AUTO,'gameDiv');

game.global = {
    score: 0
};

game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('play',playState);

game.state.start('boot');