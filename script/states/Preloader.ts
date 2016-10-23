module AdventureRoo {
    export class Preloader extends Phaser.State {
        public loadingText:Phaser.Text;

        constructor() {
            super();
        }

        public init():void {
            this.game.stage.backgroundColor = '#ffffff';

            this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
            this.game.scale.pageAlignHorizontally = true;


            this.game.load.onLoadStart.add(this.loadStart, this);
            this.game.load.onFileComplete.add(this.fileComplete, this);
            this.game.load.onLoadComplete.add(this.loadComplete, this);

            this.loadingText = this.game.add.text(32, 32, 'Click to start load', {fill: '#ffffff'});

            this.physics.startSystem(Phaser.Physics.ARCADE);
            //this.game.physics.arcade.gravity.y = 300;
        }

        public preload():void {
            this.game.load.tilemap('Level1', 'assets/atlases/level1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.tilemap('Level2', 'assets/atlases/level2.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.tilemap('Level3', 'assets/atlases/level3.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.spritesheet('Rat', 'assets/atlases/rat.png', 37, 30);
            this.game.load.spritesheet('Scorpion', 'assets/atlases/scorpion.png', 16, 15);
            this.game.load.spritesheet('Wall', 'assets/atlases/wall.png', 32, 32);
            this.game.load.spritesheet('Key', 'assets/atlases/key.png', 16, 12);
            this.game.load.spritesheet('Door', 'assets/atlases/door.png', 32, 32);
            this.game.load.spritesheet('Drink', 'assets/atlases/drink.png', 32, 32);
            this.game.load.spritesheet('Fixtures', 'assets/atlases/fixtures.png', 30, 30);
            this.game.load.spritesheet('Rewards', 'assets/atlases/reward.png', 26, 26);
            this.game.load.spritesheet('MainCharacter', 'assets/atlases/mainChar.png', 21, 31);
            this.game.load.image('StartButton', 'assets/images/startButton.png');
            this.game.load.image('NextButton', 'assets/images/nextButton.png');
            this.game.load.image('TryAgainButton', 'assets/images/tryagainButton.png');

            this.game.load.start();
        }

        public loadStart():void {
            this.loadingText.setText('Loading ......');
        }

        public fileComplete(progress:any, totalLoaded:any, totalFiles:any):void {
            this.loadingText.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
        }

        public loadComplete():void {
            this.loadingText.setText('Load Complete');

            this.game.state.start('TitleScreen');
        }

    }
}
