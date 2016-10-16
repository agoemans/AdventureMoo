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
        }

        public preload():void {
            this.game.load.tilemap('Level1', 'assets/atlases/level1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.tilemap('Level2', 'assets/atlases/level2.json', null, Phaser.Tilemap.TILED_JSON);

            this.game.load.spritesheet('Tile1', 'assets/atlases/tile1.png', 30, 30);
            this.game.load.spritesheet('Tile2', 'assets/atlases/tile2.png', 30, 30);
            this.game.load.spritesheet('Tile3', 'assets/atlases/tile3.png', 30, 30, 1);
            this.game.load.spritesheet('Tile4', 'assets/atlases/tile4.png', 30, 30, 1);
            this.game.load.spritesheet('Rat', 'assets/atlases/rat.png', 31, 20);
            this.game.load.spritesheet('Fixtures', 'assets/atlases/fixtures.png', 30, 30);
            this.game.load.spritesheet('Rewards', 'assets/atlases/reward.png', 26, 26);
            this.game.load.spritesheet('MainCharacter', 'assets/atlases/mainChar.png', 21, 31);
            this.game.load.image('Button', 'assets/images/button.png');

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
