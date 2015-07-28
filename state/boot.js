/**
 * Created by lp1lp on 7/6/15.
 */

var bootState = {
    preload: function(){
        this.game.load.image('progressBar','assets/indeterminate-progress-bar.png');
    },

    create: function(){
        this.game.stage.backgroundColor = '#FFFFFF';
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        if(!this.game.device.desktop){ this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.setScreenSize(true);
        }
        this.game.state.start('load');
    }
};